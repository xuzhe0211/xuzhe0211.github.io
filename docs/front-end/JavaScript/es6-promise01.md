---
autoGroup-13: ES6
title: Promise必备知识汇总和面试情况
---

## 写在前面
Javascript异步编程先后经历了四个阶段，分别是callback阶段，Promise阶段，Genterator阶段和Async/Await阶段。Callback很快被发现存在回调地狱和控制权问题，Promise就是在这个时间出现，用以解决这些问题，Promise并非一个新事物，而是按照一个规范出现的类，这个规范有很多，如Promise/A,Promise/B,Promise/D以及PormiseA的升级版Promise/A+,最终ES6中采用PromiseA+规范。后来出现的Generator函数以及Async函数也是以Promise为基础的进一步封装，可见Promise在异步编程中的重要性

关于Promise的资料有很多，但是每个人理解不一样，不同的思路也会有不一样的收货。这篇文章会着重写一下Promise的实现以及笔者在日常使用中的新的体会

## 实现Promise

### 规范解读
Promise/A+规范主要分为术语、要求和注意事项三个部分,我们重点看一下第二部分也就是要求部分，以笔者的理解大概说明一下，具体细节参照完整版的Promise/A+标准

1. Promise有三种状态pedding、fulfilled、rejected。(为了一致性，此文章称fulfilled状态为resolved状态)
    - 状态只能是pedding到resolved或者pedding到rejected
    - 状态一旦转换完成，不能再次转换
2. Promise拥有一个then方法，用于处理resolved和rejected状态下的值
    - then方法接收两个参数onFulfilled和onRejected，这两个参数变量类型是函数，如果不是函数将会被忽略，并且这两个参数都是可选的
    - then方法必须返回一个新的promise，记作Promise2，这也保证了then方法可以在同一个promise上多次调用(ps：规范只要求返回promise,并没有明确要求返回一个新的promise,这里为了跟ES6实现保持一致，我们也返回一个新的promise)
    - onResolved/onRejected有返回值则把返回值定义为x，并执行[[Rresolve]](proimse2, x);
    - onResolved/onRejected运行出错，则把Promise2设置为rejected状态
    - onResolveed/onRejected不是函数，则需要把promise1的状态传递下去
3. 不同的promise实现可以的交互
    - 规范中成这一步操作为promise解决过程，函数标识为[[Resolve]](promise,x),promise为要返回的新的promise对象，x为onResolved/onRejected的返回值。如果x有then方法且看上去像一个promise，我就就把x当成一个promise的对象，即thenable对象，这种情况下尝试让promise接受x的状态。如果x不是thenable对象，就用x的值来执行promise
    - [[Resolve]](promise, x)函数具体运行规则
        - 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise;
        - 如果 x 为 Promise ，则使 promise 接受 x 的状态;
        - 如果 x 为对象或者函数，取x.then的值，如果取值时出现错误，则让promise进入rejected状态，如果then不是函数，说明x不是thenable对象，直接以x的值resolve，如果then存在并且为函数，则把x作为then函数的作用域this调用，then方法接收两个参数，resolvePromise和rejectPromise，如果resolvePromise被执行，则以resolvePromise的参数value作为x继续调用[[Resolve]](promise, value)，直到x不是对象或者函数，如果rejectPromise被执行则让promise进入rejected状态；
        - 如果x不是对象或者函数，直接就用x的值来执行promise

### 代码实现

规范解读第1条，代码实现
```
class Promise {
    // 定义Promise状态，初始值为pending
    status = 'pending';
    // 状态转换时携带的值，因为在then方法中需要处理Promise成功或失败时的值，所以需要一个全局遍历存储这个值
    data = '';

    // Promise构造函数，传入参数为一个可执行的函数
    constructor(exector) {
        // resolve函数负责把状态转换为resolved
        function resolve(value) {
            this.status = 'resolved';
            this.data = value;
        }
        // reject函数负责吧状态转换成rejected
        function reject(reason) {
            this.status = 'rejected';
            this.data = reason;
        }
        // 直接执行exector函数，参数为处理函数resolve, reject。因为exector执行过程中有可能出错，错误情况需要执行reject
        try {
            exector(resolve, reject);
        } catch(e) {
            reject(e);
        }
    }
}
```
第1条实现完毕，相对简单，配合代码注释很容易立即

规范解读第二条，代码实现
```
/**
* 拥有一个then方法
* then方法提供: 状态为resolved时的回调函数onResolved,状态为rejected的onRejected
* 返回一个新的promise
**/
then(onResolved, onRejected) {
    // 设置then的默认参数，默认参数实现Promise的指的穿透
    onResolved = typeof onResolved === 'function' ? onResolved : function(e) {return e};
    onRejected = typeof onRejected === 'function' ? onRejected : function(e) {return e};

    let promise2;

    promise2 = new Promise((resolve, reject) => {
        // 如果状态为resolved，则执行onResolved
        if(this.status === 'resolved') {
            try {
                // onResolved/onRejected有返回值则把返回值定义为x
                const x = onResolved(this.data);
                // 执行[[resolve]](promise2, x)
                resolvePromise(promise2, x, resolve, reject);
            } catch(e) {
                reject(e);
            }
        }
        // 如果状态为rejected,则执行rejected
        if(this.status === 'rejected') {
            try {
                const x = onRejected(this.data);
                resolvePromise(promise2, x, resolve, reject);
            } catch(e) {
                reject(e);
            }
        }
    })
    return promise2;
}
```
现在我们就按照规范解读第2条，实现了上述代码，上述代码很可能明显是有问题的，问题如下
1. resolvePromise未定义
2. then方法执行的时候，promise可能仍然处于pending状态，因为exector中可能存在异步操作(实际情况大部分为异步操作)，这样就导致了onResolved/onRejected失去了执行时机；
3. onResolved/onRejected这两个函数需要异步调用(官方Promise实现的回调函数总是异步调用的)

解决办法
1. 根据规范解读第3条，定义并实现resolvePromise函数
2. then方法执行时如果promise仍然处于pending状态，则把处理函数进行储存，等resolve/reject函数真正执行的时候在调用
3. promise.then属于微任务，这里我们为了方便，用宏任务setTimeout来代替实现异步，具体细节特别推荐**[这篇文章](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651228065&idx=2&sn=0db2e69aa9344d4b086e9d98301aebad&scene=21#wechat_redirect)**

好了，有了解决办法，我们就把代码进一步完善
```
class Promise {
    // 定义Promise状态变量，初始值为pending
    status: 'pending';
    // 因为在then方法中需要处理Promise成功或失败的值，素以需要一个全局变量存储这个值
    data: '';
    // Promise resolve时的回调函数集
    onResolvedCallback = [];
    // Promise reject时的回调函数集
    onRejectedCallback = [];
    
    // Promise构造函数，传入参数为一下可执行的函数
    constructor(exector) {
        // resolve函数负责把状态转换为resolved
        function resolve(value) {
            this.status = 'resolved';
            this.data = value;
            for (const func of this.onResolvedCallback) {
                func(this.data);
            }
        }
        // reject函数负责把状态转换为rejected
        function reject(reason) {
            this.status = 'rejected';
            this.data = reason;
            for (const func of this.onRejectedCallback) {
                func(this.data);
            }
        }
        // 直接执行exector函数，参数为处理函数resolve, reject。因为exector执行过程可能会出错，错误处理需要执行reject
        try{
            exector(resolve, reject);
        } catch(e) {
            reject(e);
        }
    }
    /**
    * 拥有一个then方法
    * then方法提供: 状态为resolved时的回调函数onResolved，状态为rejected时的回调函数onRejected
    * 返回一个新的promise
    **/
    then(onResolved, onRejected) {
        // 设置then的默认参数，默认参数实现Promise的值的穿透
        onResolved = typeof onResolved === 'function' ? onResolved : function(e) {return e};
        onRejected = typeof onRejected === 'function' ? onRejected : function(e) {return e};

        let promise2;

        promise2 = new Promise((resolve, reject) => {
            // 如果状态为resolved， 则执行onResolved;
            if (this.status === 'resolved') {
                setTimeout(() => {
                    try {
                        // onResolved/onRejected有返回值则把返回值定义为x
                        const x = onResolve(this.data);
                        // 执行[[Resolve]](promis2, x);
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                }, 0)
            }
            // 如果状态为rejected，则执行onRejected
            if(this.status === 'rejected') {
                setTimeout(() => {
                    try {
                        const x = onReject(this.data);
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                }, 0);
            }
            // 如果状态为pending，则把处理函数进行存储
            if(this.status === 'pending') {
                this.onResolvedCallback.push(() => {
                    setTimeout(() => {
                        try{
                            const x = onResolved(this.data);
                            this.resolvePromise(promise2, x, resolve, reject);
                        }catch(e) {
                            reject(e);
                        }
                    }, 0)
                })
                this.onRejectedCallback.push(() => {
                    setTimeout(() => {
                         try {
                            const x = onRejected(this.data);
                            this.resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                            }
                    }, 0);
                })
            }
        })
        return promise2
    }
    // [[Resolve]](promise2, x)函数
    resolvePromise(promise2, x, resolve, reject) {

    }
}
```
至此，规范中关于then的部分就全部实现完毕了。代码添加了详细的注释，参考注释不难理解。

规范解读第3条，代码实现
```
// [[Resolve]](promise2, x)函数
resolvePromise(promise2, x, resolve, reject) {
    let called = false;

    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise!'));
    }

    // 如果x仍为Promise情况
    if(x instanceof Promise) {
        // 如果x的状态还没有确定，那么它是有可能被一个thenable决定最终状态和值，所以需要继续调用resolvePromise
        if(x.status === 'pending') {
            x.then(function(value) {
                resolvePromise(promise2, value, resolve, reject);
            }, reject);
        } else {
            // 如果x状态已经确定了直接取他的状态
            x.then(resolve, reject);
        }
        return;
    }

    if (x !== null && (Object.prototype.toString(x) === '[object Object]' || Object.prototype.toString(x) === '[object Function]')) {
        try {
            // 因为x.then有可能是一个getter，这种情况下多次读取就有可能产生副作用，所以通过变量called进行控制
            const then = x.then;
            // then是函数，那就说明x是thenable，继续执行resolvePromise函数，知道x为普通值
            if(typeof then === 'function') {
                then.call(x, (y) => {
                    if (called) return;
                    called = true;
                    this.resolvePromise(promise2, y, resolve, reject);
                }, r => {
                    if (called)  return;
                    calle = true;
                    reject(r);
                })
            } else {
                // 如果then不是函数，那就说明x不是thenable，直接resolve(x);
                if (called) return;
                called = true;
                resolve(x);
            }
        } catch(e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}
```
这一步骤非常简单，只要按照规范转换成代码即可。

最后，完整的Promise按照规范就实现完毕了，是的，规范里没有规定catche、promise.resolve、Promise.reject、promise.all等方法，接下来，我们就看看这些方法

## Promise其他方法的实现

### catch方法
catch方法是对then方法的封装，只用于接收reject(reason)中的中的错误信息。因为在then方法中的onRejected参数是可不传的，不传的情况下，错误信息会依次往后传递，知道有onRejected函数接收位置，因此在写promise链式调用的时候，then方法不传onRejected函数，只需要在末尾加一个catch()就可以了，这样在该链条中promise发生的错误都会被最后的catch捕获到
```
catch(onRejected) {
    return this.then(null, onRejected);
}
```

### done方法
catch在promise链式调用的末尾调用，用于捕获链条中的错误信息，但是catch方法内部也可能出现错误，所以有些promise实现中增加了一个方法done,done相当于提供了一个不会出错的catch方法，并且不在返回一个promise，一般用来结束promise链
```
done() {
    this.catch(reson => {
        console.log('done', reason);
        throw reason;
    })
}
```

### finally方法
finally方法用于无论是resolve还是reject，finall y的参数函数都会被执行
```
finally(fn) {
    return this.then(value => {
        fn();
        return value;
    }, reason => {
        fn();
        throw reason;
    })
}
```
### Promise.all方法
Promise.all方法接受一个promise数组，返回一个新的promise2，并发执行数组中的全部promise，所有promise状态都为resolved时，promise2状态为resolved并返回全部promise结果，结果顺序和promise数组顺序一致。如果有一个promise为rejected状态，则整个promise2进入rejected状态
```
static all(promiseList) {
    return new Promise((resolve, reject) => {
        const result = [];
        let i = 0;
        for (cosnt p of promiseList) {
            p.then(value => {
                result[i] = value;
                if (result.length === promiseList.length) {
                    resolve(result)
                }
            }, reject)
        }
        i++;
    })
}
```

### Promise.race方法
Promise.race方法接收一个promise数组，返回一个新的promise2，顺序执行数组中的promise，有一个primise状态确定，promise2状态即确定，并且同这个promise状态一致
```
static race(promiseList) {
    return new Promise((resolve, reject) => {
        for (const p of promiseList) {
            p.then(value => {
                resolve(value)
            }, reject)
        }
    })
}
```
### Promise.resolve方法/Promisereject
Promise.resolve用来生成一个resolved完成态的promise，Promise.reject用来生成一个rejected失败态的promise
```
static resolve(value) {
    let promise
    promise = new Promise((resolve, reject) => {
        this.reoslvePromise(promise, value, resolve, reject);
    })
    return promise;
}

static reject(reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    })
}
```
常用的方法基本就这些，Promise还有很多扩展方法，这里就不一一展示，基本上都是对then方法的进一步封装，只要你的then方法没有问题，其他方法就都可以依赖then方法实现。

## Promise面试相关


面试相关问题，笔者只说一下我司这几年的情况，并不能代表全部情况，参考即可。Promise是我司前端开发职位，nodejs开发职位，全栈开发职位，必问的一个知识点，主要问题会分布在Promise介绍、基础使用方法以及深层次的理解三个方面，问题一般在3-5个，根据面试者回答情况会适当增减。

### 简单介绍下promise
Promise是异步编程的一种解决方案，比传统的解决方案--回调函数和时间--更核心和更强大。它是由社区最早提出和实现，ES6将其写进了语言标准，统一了用法，原生提供了promise对象。有了promise对象，就可以将异步编程以同步操作的流程表达出来了，避免了蹭蹭嵌套的回调函数。此外Promise对象提供了同意的接口，使得控制异步操作更加容易(当然了也可以简单介绍下promise状态，有什么方法，callback存在什么问题等)

### 实现一个简单的，支持异步链式调用的Promise类
这个答案不是固定的，可以参考最简实现 Promise，支持异步链式调用

### Promise.then在Event Loop中的执行顺序

JS中风味两种任务类型：Macrotask和microtask，其中macrotaks包含：主代码块，setTimeout,setInterval setImmediate等(setImmediate规定：在下一次Event Loop(宏任务)触发)；microtask包含：promise,process.nextTick等(在node环境下，process.nextTick优先于高于Promise) Event Loop中执行一个macrotask任务(栈中没有就从时间队列中获取)执行过程中如果遇到microtask，就把他添加到微任务的任务队列中，macrotaks任务执行完毕后，立即执行当前为任务队列中的所有microtask任务(依次执行)，然后开始下一个macrotask任务(从事件队列中获取)浏览器运行机制可参考**[这篇文章](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651228065&idx=2&sn=0db2e69aa9344d4b086e9d98301aebad&scene=21#wechat_redirect)**

### promise的一些静态方法

Promise.deferred、Promise.all、Promise.race、Promise.resolve、Promise.reject等

### Promise存在哪些缺点

1. 无法取消Promise，一点新建它就会立即执行，无法中途取消
2. 如果不设置回调函数，Promise内部抛出错误，不会反应到外部
3. 吞掉错误或异常，错误只能顺序处理，即便在Promise链最后添加catch方法，依然可能存在无法捕获的错误(catch内部可能出现错误)
4. 阅读代码不是一眼能看懂，你会看到一堆then，必须自己在then的回调函数理清逻辑

### 使用Promise进行顺序(sequence)处理
1. 使用async函数配合await或者使用generator函数配合yield
2. 使用promise.then通过for循环或者Array.prototype.reduce实现

因为Promise.all是同时运行多个promsie对象，所以对于这种并发的数量，小程序是有限制的，一次只能并发10个，所以如果想突破这种限制，可以进行顺序执行每个Promise。

```
function sequenceTasks(tasks) {
    function recordValue(results, value) {
        results.push(value);
        return results;
    }
    var pushValue = recordValue.bind(null, []);
    return tasks.reduce(function (promise, task) {
        return promise.then(task).then(pushValue);
    }, Promise.resolve());
}
```
测试代码
```
function test(result, name) {
    result.push(name);
    return result;
}
var fn = test.bind(null, [])
console.log(fn('1'))

function sequenceTasks(tasks) {
    function recordValue(results, value) {
        results.push(value);
        return results;
    }
    var pushValue = recordValue.bind(null, []);
    return tasks.reduce(function (promise, task) {
        return promise.then(task).then(pushValue);
    }, Promise.resolve());
}
var request = {
    comment: function() {
        return new Promise(resolve => {
            setTimeout( () => {
                resolve(1)
            }, 2000)
        })
    },
    people: function() {
        return new Promise(resolve => {
            setTimeout( () => {
                resolve(3)
            }, 3000)
        })
    }
}
function main() {
    return sequenceTasks([request.comment, request.people]);
}
// 运行示例
main().then(function (value) {
    console.log(value);
}).catch(function(error){
    console.error(error);
});
```
- 提问概率：90%（我司提问概率极高的题目，即能考察面试者对promise的理解程度，又能考察编程逻辑，最后还有bind和reduce等方法的运用）
- 评分标准：说出任意解决方法即可，其中只能说出async函数和generator函数的可以得到20%的分数，可以用promise.then配合for循环解决的可以得到60%的分数，配合Array.prototype.reduce实现的可以得到最后的20%分数。

[使用Promise进行顺序(sequence)处理](https://www.kancloud.cn/kancloud/promises-book/44249)

[使用Promise进行顺序(sequence)处理](https://blog.csdn.net/nvidiacuda/article/details/96429347)

### 如何停止一个Promise链
再要停止的promise链位置添加一个方法，返回一个永远不执行resolve或reject的promise，那么这个promise永远处于pending状态，所以永远也不会执行then或者catch了，这样就停止了一个promise链
```
Promise.cancel = Promise.stop = function() {
    return new Proise(function() {})
}
```

### Promise链上返回的最后一个Promise出错了怎么办
catch在promise立案时调用的末尾调用，用于捕获链条中的错误信息，但是catch方法内部也可能出现错误，所有有些promise实现增加了一个done，done相当于提供了一个不会出错的catch方法，并且不再返回一个promise，一般用来结束promise链
```
done() {
    this.catch(reason => {
        console.log('done', reason);
        throw reason;
    })
}
```

### Promise存在哪些使用技巧或者最佳实践
1. 链式promise要返回一个promise，而不只是构造一个promise。
2. 合理的使用promise.all和Promise.race等方法
3. 在写promise链式调用的时候，then方法不传onRejected函数，只需要在末尾加一个catch就可以了这样在链条中的promise发生的错误都会被最后的catch捕获到。如果catch代码有出现错误的话，需要在联调末尾加done函数



## 资料
[原文](https://mp.weixin.qq.com/s/rhqc-4e8hpapHJWmsCWQKQ)

[http://liubin.org/promises-book](http://liubin.org/promises-book)

[https://github.com/xieranmaya/blog/issues/3](https://github.com/xieranmaya/blog/issues/3)

[https://segmentfault.com/a/1190000016550260](https://github.com/xieranmaya/blog/issues/3)