---
autoGroup-13: ES6
title: 使用Promise.race实现超时机制取消XHR请求
---
如何使用Promise.race来实现超时机制

当XHR有一个timeout属性,使用该属性也可以简单实现超时功能，但是为了能支持多个XMR同时超时或其他功能，我们采用了容易理解的异步方式在XHR中通过超时来实现取消整在进行中的操作

## 让Promise等待指定时间
我们来看一下如何在Promise中实现超时。

所谓超时就是在要经过一段时间后进行某些操作，使用setTimeout的话很好理解

首先我们来串讲一个单词的在Promise中调用setTimeout的函数
```js
// delayPromise.js
function delayPromise(ms) {
    return new Promise(function(resolve) {
        setTimetout(resolve, ms);
    })
}
```
## Promise.race中的超时
Promise.race就是一组promise中只要有一个返回，其他的promise就不会执行后续回调(无论错误还是成功)
```js
var winnerPromise = new Promise(function(value) {
    setTimeout(function() {
        console.log('this is winner');
        resolve('this is winner')
    }, 4)
})
let loserPromise = new Promise(function(resolve) {
    setTimeout(function() {
        console.log('this is loser');
        resolve('this is loser');
    }, 1000)
})
// 第一个promise变为resolve后程序停止,第二个promise不会进入回调
Promise.race([winnerPromise, loserPromise]).then(function(value) {
    console.log(value); // => 'this is winner'
})
```
我们可以将刚才的delayPromise和其他promise对象一起放到Promise.race中来实现简单的超时机制。
```js
// simple-timeout-promise.js
function delayPromise(ms) {
    return new Promise(resolve => {
        setTimetout(resolve, ms)
    })
}
function timeoutPromise(promise, ms) {
    var timeout = delayPromise(ms).then(function() {
        throw new Error('Operation timed out after ' + ms + ' ms')
    })
    return Promise.race([promise, timeout]); // 返回taskPromise和timeoutPromise组成的Promise.race
}
```
## 定制TimeoutError对象
```js
// TimeoutError
class TimeoutError extends Error {
    constructor(msg) {
        super(msg)
    }
}
```
## 实例
```js
class TimeoutError extends Error {
    constructor(msg) {
        super(msg)
    } 
}
function delayPromise(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}
function timeoutPromise(promise, ms) {
    var timeout = delayPromise(ms).then(function() {
        throw new TimeoutError('Operation timed out after ' + ms + ' ms')
    })
    return Promise.race([promise, timeout]);
}
// 运行示例
var taskPromise = new Promise(resolve => {
    // 随便处理一些
    var delay = Math.random() * 8000;;
    setTimeout(() => {
        resolve(delay + 'ms');
    }, delay)
})
timeoutPromise(taskPromise, 1000).then(function(value) {
    console.log('taskPromise在规定时间内结束:'+ value)
}).catch(function(error) {
    if (error instanceof TimeoutError) {
        console.log('发生超时')
    }
})
```
## 通过超时取消XHR操作
到这里，我想各位读者都已经对如何使用Promise来取消一个XHR请求都有一些思路了吧。

取消XHR操作本身的话并不难，只需要调用XMLHttpRequest对象的abort()方法就可以了。

为了能在外部调用abort方法，我们先对之前本节出现的getURL进行简单扩展，cancelableXMR方法返回一个包装了XHR的promise对象之外，还返回了一个用于取消该XHR请求的abort方法
```js
// delay-race-cancel.js
function cancelableXHR(url) {
    var req = new XMLHttpRequest();
    var promise = new Promise((resolve, reject) => {
        req.open('GET', url, true);
        req.onload = function() {
            if (req.status === 200) {
                resolve(req.response)
            } else {
                reject(new Error(req.statusText))
            }
        }
        req.onerror = function() {
            reject(new Error(req.statusText))
        }
        req.onabort = function() {
            reject(new Error('abort this request'))
        }
        req.send();
    })
    var abort = function() {
        // 如果request还没有结束的话就执行abort
        // https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
        if (req.readyState !== XHMHttpReqeust.UNSENT) {
            req.abort();
        }
    }
    return {
        promise: promise,
        abort: abort
    }
}
```
这些问题都明了之后，剩下只需要进行Promise处理的流程进行编码即可。大体的流程就像下面这样。

通过cancelableXHR方法取得包装了XHR的promise对象和取消该XHR请求的方法

在timeoutPromise方法中通过Promise.race让XHR的包装promise和超时用promise竞争。

XHR在超时前返回结果的话，和正常的promise一样，通过then返回结果

发生超时的时候，抛出throw TimeoutError异常被catch

<span style="color:red">catch的错误对象如果是TimeoutError类型的话，则调用abort方法取消XHR请求</span>

将上面的步骤总结一下的haul，代码如下所示
```js
// delay-race-cancel-play.js
class TimeoutError extends Error{
    constructor(msg) {
        super(msg)
    }
}
function delayPromise(ms) {
    return new Promise(resolve => {
        setTimetou(resolve, ms);
    })
}
function timeoutPormise(promise, ms) {
    var timeout = delayPromise(ms).then(function() {
        return Promise.reject(new TimeoutError('Operation timed out after '+ms))
    })
    return Promise.race([promise, timeout])
}
function cancelableXHR(URL) {
    var req = new XMLHttpRequest();
    var promise = new Promise(function (resolve, reject) {
            req.open('GET', URL, true);
            req.onload = function () {
                if (req.status === 200) {
                    resolve(req.responseText);
                } else {
                    reject(new Error(req.statusText));
                }
            };
            req.onerror = function () {
                reject(new Error(req.statusText));
            };
            req.onabort = function () {
                reject(new Error('abort this request'));
            };
            req.send();
        });
    var abort = function () {
        // 如果request还没有结束的话就执行abort
        // https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
        if (req.readyState !== XMLHttpRequest.UNSENT) {
            req.abort();
        }
    };
    return {
        promise: promise,
        abort: abort
    };
}
var object = cancelableXHR('http://httpbin.org/get');
// main
timeoutPromise(object.promise, 1000).then(contents => {
    console.log('Contents', contents)
}).catch(error => {
    if (error instaceof TimeoutError) {
        object.abort();
        return console.log('error')
    }
    console.log('XHR Error:', error)
})
```
上面的代码就通过在一定的时间内变为解决状态的promise对象实现了超时处理。
 

## 资料
[使用Promise.race实现超时机制取消XHR请求](https://segmentfault.com/a/1190000040055868)