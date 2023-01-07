---
autoGroup-0: 基础知识
title: JS 异步错误捕获二三事
---
## 引入
我们都知道try catch无法捕获setTimeout异步任务中的错误，那其中的原因是什么？以及异步代码在js中特别常见的，我们该怎么做？

## 无法捕获的情况
```js
funciton main() {
    try {
        setTimeout(() => {
            throw new Error('async error')
        }, 1000)
    } catch(e) {
        console.log(e, 'err');
        console.log('continue...')
    }
}
main();
```
<span style="color: red">这段代码中,setTimeout的回调函数抛出一个错误，并不会在catch中捕获，会导致程序直接报错崩掉</span>

所以说在js中try catch并不是说写上一个就可以高枕无忧了。难道每个函数都要写吗？那什么情况下try catch无法捕获error呢？

### 异步任务
- <span style="color: red">宏任务的回调函数中的错误无法捕获</span>

    上面例子稍微改一下，主任务中写一段try catch，然后调用异步任务task，task会在以每秒之后抛出一个错误
    ```js
    // 异步任务
    const task = () => {
        setTimeout(() => {
            throw new Error('async error')
        }, 1000)
    }
    // 主任务
    function main() {
        try {
            task();
        } catch(e) {
            console.log(e, 'err');
            console.log('continue...')
        }
    }
    ```
    这种情况下main是无法catch error的，这跟浏览器的执行机制有关。<span style="color: red">异步任务由eventloop加入任务队列，并取出入栈(js主进程)执行，而当task取出执行的时候，main的栈已经退出了，也就是上下文环境已经改变，所以main无法捕获task的错误</span>

    事件回调，请求回调同属tasks，所以道理是一样的。
- <span style="color: red">微任务(promise)的回调</span>

    ```js
    // 返回一个promise对象
    const promiseFetch = () => {
        new Promise(resolve => {
            resolve9();
        })
    }
    function main() {
        try {
            // 回调函数里抛出错误
            promiseFetch().then(() => {
                throw new Error('err');
            })
        } catch(e) {
            console.log(e, 'error');
            console.log('continue...')
        }
    }
    ```
    promise的任务,也就是then里面的回调函数，抛出错误同样也无法catch.<span style="color: red">因为微任务队列是在两个task之间清空的，所以then入栈的时候，main函数已经出栈了</span>

### 并不是回调函数无法try catch
很多人可能有一个误解，因为大部分遇到无法catch的情况，都发生在回调函数，就任务回调函数不能catch

不全对，看一个最普通的例子
```js
// 定义一个fn，参数是函数
const fn = (cb: () => void) => {
    cb();
}
function main() {
    try {
        // 传入callback，fn执行回调用，并排除错误
        fn(() => {
            throw new Error('123');
        })
    } catch(e) {
        console.log('error')
    }
}
main();
```
结果当然是可以catch的。因为callback执行的时候，跟main还在同一次事件循环中，即一个eventloop tick，所以上下文没有变化，错误可以catch。<span style="color: red">根本原因还是同步代码，并没有遇到异步任务。</span>

## promsie 异步捕获
### 构造函数
```js
function main1() {
    try {
        new Promsie(() => {
            throw new Error('promise1 error')
        })
    } catch(e) {
        console.log(e.message)
    }
}

function main2() {
    try {
        Promise.reject('promise2 error');
    } catch(e) {
        console.log(e.message)
    }
}
```
以上两个try catch都不能捕获到error,因为promise内部的错误不会冒泡出来，而是呗promise吃掉了，只有通过promise.catch才可以捕获，**所以用promise一定要写catch啊**。

然后我们在来看一下使用promise.catch的两段代码
```js
// reject
const p1 = new Promise((resolve, reject) => {
    if(1) {
        reject();
    }
})
p1.catch(e => console.log('p1 error'))

// 第二段
const p2 = new Promise((resolve, reject) => {
    if(1) {
        throw new Error('p2 error')
    }
})
p2.catch(e => console.log('p2 error'))
```
promise 内部的无论是 reject 或者 throw new Error，都可以通过 catch 回调捕获。

<span style="color: red">这里要跟我们最开始微任务的栗子区分，promise 的微任务指的是 then 的回调，而此处是 Promise 构造函数传入的第一个参数，new Promise 是同步执行的。</span>

### then
那么then之后的错误如何回调呢？
```js
function main3() {
    Promise.resolve(true).then(() => {
        try {
            throw new Error('then');
        } catch(e) {
            return e;
        }
    }).then(e => console.log(e.message));
}
```
只能是在回调函数内部catch错误，并把错误信息返回，error会传递到下一个then的回调

### 用Promise捕获异步错误
```js
const p3 = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('async error')
    }, 1000)
})
function main3() {
    p3().catch(e => console.log(e))
}
main3()
```
把异步操作用Promise包装，通过内部判断，把错误reject，在外面通过promise.catch 捕获

## async/await 的异常捕获
首先我们模拟一个请求失败的函数fetchFailure，fetch函数通常都是返回一个promise

main 函数改成 async，catch 去捕获 fetchFailure reject 抛出的错误。能不能获取到呢。
```js
const fetchFailure = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        if(1) reject('fetch failure...')   
    })
})
async function main() {
    try {
        const res = await fetchFailure();
        console.log(res, 'res');;
    } catch(e) {
        console.log(e, 'e.message')
    }
}
main();
```
async 函数会被编译成好几段，根据 await 关键字，以及 catch 等，比如 main 函数就是拆成三段。

1.fetchFailure 2. console.log(res) 3. catch

通过step来控制迭代的进度，比如"next",就是往下走一次，从1->2，异步是通过Promise.then()控制的，你可以理解为就是一个Promise链，感兴趣的可以去研究一下。关键是生成器也有一个"throw"的状态，当Promsie的状态reject后，会想上冒泡，直到step('throw'),然后catch里的代码console.log(e, 'e.message'); 执行。

明显感觉 async/await 的错误处理更优雅一些，当然也是内部配合使用了 Promise。

### 更进一步
async 函数处理异步流程是利器，但是它也不会自动去catch错误，需要我们自己写try catch,如果每个函数都写一个，也挺麻烦的，比如业务中异步函数会很多

首先想到的是try catch，以及catch后的逻辑抽取出来。
```js
const handler = async (fn: any) => {
    try {
        return await fn();
    } catch(e) {
        // do th
        console.log(e, 'e.message');
    }
}
async function main() {
    const res = await handler(fetchFailure);
    console.log(res, 'res')
}
```
<span style="color: red">写一个高阶函数包裹fetchFailure，高级函数复用逻辑，比如此处的try catch，然后执行传入的参数--函数即可</span>

然后，加上回调函数的参数传递，以及返回值遵守 first-error，向 node/go 的语法看齐。如下：
```js
const handleTryCatch = (fn: (...args: any[]) => Promise<{}>) => async (...args: any[]) => {
  try {
    return [null, await fn(...args)];
  } catch(e) {
    console.log(e, 'e.messagee');
    return [e];
  }
}

async function main () {
  const [err, res] = await handleTryCatch(fetchFailure)('');
  if(err) {
    console.log(err, 'err');
    return;
  }
  console.log(res, 'res');
}
```
但是还有几个问题，一个是catch后的逻辑，这块还不支持自定义，再就是返回值总要判断一下，是否有 error，也可以抽象一下。 所以我们可以在高阶函数的 catch 处做一下文章，比如加入一些错误处理的回调函数支持不同的逻辑，然后一个项目中错误处理可以简单分几类，做不同的处理，就可以尽可能的复用代码了。
```js
// 1. 三阶函数。第一次传入错误处理的 handle，第二次是传入要修饰的 async 函数，最后返回一个新的 function。
const handleTryCatch = (handle: (e: Error) => void = errorHandler) => {
    (fn: (...args: any[]) => Promise<{}>) => async(...args: any[]) => {
        try {
            return [null, await fn(...args)];
        } catch(e) {
            return [handle(e)]
        }
    }
}
// 2. 定义各种各样的错误类型
// 我们可以把错误信息格式化，成为代码里可以处理的样式，比如包含错误和错误信息
class DbError extends Error {
    public errmsg: string
    public errno: number;
    constructor(msg: string, code: number) {
        super(msg);
        this.errmsg = msg || 'db_error_msg';
        this.errno = code || 20010
    }
}
class ValidateError extends Error {
    public errmsg: string;
    public errno: number;
    constructor(msg: string, code: number) {
        super(msg);
        this.errmsg = msg || 'validated_error_msg';
        this.errno = code || 20010;
    }
}
// 3. 错误处理的逻辑，这可能只是其中一类。通常错误处理都是按功能需求来划分
//    比如请求失败（200 但是返回值有错误信息），比如 node 中写 db 失败等。
const errorHandle = (e: Error) => {
  // do something
  if(e instanceof ValidatedError || e instanceof DbError) {
    // do sth
    return e;
  }
  return {
    code: 101,
    errmsg: 'unKnown'
  };
}   

const usualHandleTryCatch = handleTryCatch(errorHandle);

// 以上的代码都是多个模块复用的，那实际的业务代码可能只需要这样。
async function main () {
  const [error, res] = await usualHandleTryCatch(fetchFail)(false);
  if(error) {
    // 因为 catch 已经做了拦截，甚至可以加入一些通用逻辑，这里甚至不用判断 if error
    console.log(error, 'error');
    return;
  }
  console.log(res, 'res');
}
```
解决了一些错误逻辑的复用问题之后，即封装成不同的错误处理器即可。但是这些处理器在使用的时候，因为都是高阶函数，可以使用 es6 的装饰器写法。

不过装饰器只能用于类和类的方法，所以如果是函数的形式，就不能使用了。不过在日常开发中，比如 React 的组件，或者 Mobx 的 store，都是以 class 的形式存在的，所以使用场景挺多的。

比如改成类装饰器：
```js
const asyncErrorWrapper = (errorHandler: (e: Error) => void = errorHandler) => (target: Function) => {
    const props = Object.getOwnPropertyNames(target.prototype);
    props.forEach(prop => {
        var value = target.prototype[prop];
        if(Object.prototype.toString.call(value) === '[object AsyncFunction]'){
            target.prototype[prop] = async (...args: any[]) => {
            try{
                return await value.apply(this,args);
            }catch(err){
                return errorHandler(err);
            }
        }
    })
}
@asyncErrorWrapper(errorHandle)
class Store {
  async getList (){
    return Promise.reject('类装饰：失败了');
  }
}

const store = new Store();

async function main() {
  const o = await store.getList();
}
main();
```
## koa 的错误处理
如果对 koa 不熟悉，可以选择跳过不看。

koa 中当然也可以用上面 async 的做法，不过通常我们用 koa 写 server 的时候，都是处理请求，一次 http 事务会掉起响应的中间件，所以 koa 的错误处理很好的利用了中间件的特性。

比如我的做法是，第一个中间件为捕获 error，因为洋葱模型的缘故，第一个中间件最后仍会执行，而当某个中间件抛出错误后，我期待能在此捕获并处理。
```js
// 第一个中间件
const errorCatch = async (ctx, next) => {
    try {
        await next();
    } catch(e) {
        // 在此捕获error路由，throw出的Error
        console.log(e, e.message, 'error');
        ctx.body = 'error'
    }
}
app.use(errorCatch)

// logger
app.use(async (ctx, next) => {
    console.log(ctx.req.body, 'body');
    await next();
})

// router 的某个中间件
router.get('/error', async (ctx, next) => {
  if(1) {
    throw new Error('错误测试')
  }
  await next();
})
```
为什么在第一个中间件写上try catch,就可以捕获前面中间件throw出的错误。首先我们前面async/await的地方解释过，async中await handler()，handler函数内部的throw new Error或者Promise.reject()是可以被async的catch捕获的。。所以只需要 next 函数能够拿到错误，并抛出就可以了，那看看 next 函数。

```js
// compose是传入中间件的数组，最终形成中间件链的，next控制游标
compose(middlewares) {
    return context => {
        let index = 0;
        // 为了每个中间件都可以是异步调用，即 `await next()` 这种写法，每个 next 都要返回一个 promise 对象
        function next(index) {
            let func = middlewares[index];
            try {
                return new Promise((resolve, reject) => {
                    if(index >= middlewares.length) return reject('next is inexistence');
                    // 在此处写 try catch，因为是写到 Promise 构造体中的，所以抛出的错误能被 catch
                    resolve(func(context, () => next(index + 1)))
                })
            } catch(e) {
                // 捕获到错误，返回错误
                return Promise.reject(err);
            }
        }
    }
}
```
next 函数根据 index，取出当前的中间件执行。中间件函数如果是 async 函数，同样的转化为 generator 执行，内部的异步代码顺序由它自己控制，而我们知道 async 函数的错误是可以通过 try catch 捕获的，所以在 next 函数中加上 try catch 捕获中间件函数的错误，再 return 抛出去即可。所以我们才可以在第一个中间件捕获。详细代码可以看下简版 koa

然后 koa 还提供了 ctx.throw 和全局的 app.on 来捕获错误。

如果你没有写错误处理的中间件，那可以使用 ctx.throw 返回前端，不至于让代码错误。

但是 throw new Error 也是有优势的，因为某个中间件的代码逻辑中，一旦出现我们不想让后面的中间件执行，直接给前端返回，直接抛出错误即可，让通用的中间件处理，反正都是错误信息。
```js
// 定义不同的错误类型，在此可以捕获，并处理。
const errorCatch = async(ctx, next) => {
  try {
    await next();
 } catch (err) {
    const { errmsg, errno, status = 500, redirect } = err;
    
    if (err instanceof ValidatedError || err instanceof DbError || err instanceof AuthError || err instanceof RequestError) {
      ctx.status = 200;
      ctx.body = {
        errmsg,
        errno,
      };
      return;
    }
    ctx.status = status;
    if (status === 302 && redirect) {
      console.log(redirect);
      ctx.redirect(redirect);
    }
    if (status === 500) {
      ctx.body = {
        errmsg: err.message,
        errno: 90001,
      };
      ctx.app.emit('error', err, ctx);
    }
  }
}

app.use(errorCatch);

// logger
app.use(async (ctx, next) => {
  console.log(ctx.req.body, 'body');
  await next();
})

// 通过 ctx.throw
app.use(async (ctx, next) => {
  //will NOT log the error and will return `Error Message` as the response body with status 400
  ctx.throw(400,'Error Message');
}); 

// router 的某个中间件
router.get('/error', async (ctx, next) => {
  if(1) {
    throw new Error('错误测试')
  }
  await next();
})

// 最后的兜底
app.on('error', (err, ctx) => {
  /* centralized error handling:
   *   console.log error
   *   write error to log file
   *   save error and request information to database if ctx.request match condition
   *   ...
  */
});
```

## 总结
[本文的代码都存放于此](https://github.com/wiseowner/js-asynchronization-error)

总的来说，目前 async 结合 promise 去处理 js 的异步错误会是比较方便的。另外，成熟的框架（react、koa）对于错误处理都有不错的方式，尽可能去看一下官方是如何处理的。

这只是我对 js 中处理异步错误的一些理解。不过前端的需要捕获异常的地方有很多，比如前端的代码错误，cors 跨域错误，iframe 的错误，甚至 react 和 vue 的错误我们都需要处理，以及异常的监控和上报，以帮助我们及时的解决问题以及分析稳定性。采取多种方案应用到我们的项目中，让我们不担心页面挂了，或者又报 bug 了，才能安安稳稳的去度假休息😆

## 资料 
[JS 异步错误捕获二三事](https://juejin.cn/post/6844903830409183239#heading-0)