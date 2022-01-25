---
autoGroup-2: 框架
title: 浅析koa的洋葱模型实现
---

## 前言

Koa被认为是第二代node web framework，它最大的特点就是独特的中间件流程控制,是一个典型的洋葱模型。koa和koa2中间件的思路是一样的，但是实现方式有所区别,koa2在node7.6之后更是可以直接用async/await来替代generator使用中间件，本文以最后一种情况举例

## 洋葱模型
下面两张图是网上找的，很清晰的表情一个请求是如果和经过中间件最后生成响应的，这种模式开发和使用中间件都是非常方便的

![洋葱模型1](./images/2892151181-5ab48de7b5013_fix732.png)

![洋葱模型2](./images/2474077171-5ab493c984bf8_fix732.png)

来看一个koa2的demo
```
const Koa = require('koa');

const app = new Koa();
const PORT = 3000;

// #1
app.use(async (ctx, next) => {
    console.log(1);
    await next();
    console.log(1);
})
// #2
app.use(async (ctx, next) => {
    console.log(2);
    await next();
    cosnole.log(2);
})
app.use(async (ctx, next) => {
    console.log(3);
})

app.listen(PORT);
console.log(`http://locaalhost:${PORT}`);
```
访问http://localhost:3000,控制台打印：
```
1
2
3
2
1
```
怎么样，是不是有一点点感觉了。当程序运行到await next()的时候就会暂停当前程序，进入下一个中间件，处理完之后才会回过头来继续处理。也就是说,当一个请求进入，#1会被第一个和最后一个经过，#2则是会被第二和倒数第二个经过，一次类推

## 实现
koa的实现有几个重要的点
1. context的保存和传递
2. 中间件的管理和next的实现

翻看源码我们发现

app.listen使用了this.callback来生成node的httpServer的回调函数
```
listen(...args) {
    debug('listen');
    const server = http.createServer(this.callback());
    return server.listen(...args);
}
```
那就再来看this.callback
```
callback() {
    const fn = compose(this.middleware);

    if (!this.listeners('error').length)  this.on('error', this.onerror);

    const handleRequest = (req, res) => {
        const ctx = this.createContext(req, res);
        return this.handleRequest(ctx, fn);
    }
    return handleRequest
}
```
这里compose处理了一下this.middleware,创建了ctx并赋值为createContext的返回值，最后返回hanldRequest。

this.middleware看起来应该是中间件的集合，查了下代码，果不其然
```
this.middleware = [];


use(fn) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
    if (isGeneratorFunction(fn)) {
        deprecate('Support for generators will be removed in v3. ' +
                'See the documentation for examples of how to convert old middleware ' +
                'https://github.com/koajs/koa/blob/master/docs/migration.md'));
        fn = conver(fn);
    }
    debug('use %s', fn._name || fn.name || '-');
    this.middleware.push(fn);
    return this;
}
```
抛开兼容和判断，这段代码只做了一件事
```
use(fn) {
    this.middle.push(fn);
    return this
}
```
原来当我们app.use的时候，只是把方法存在了一个数组里。

那么compose又是什么呢。跟踪源码可以看到compose来自koa-compose模块，代码也不多(去掉了一些不影响主逻辑的判断)
```
function compose(middleware) {
    return function(context, next) {
        let index = -1;
        return dispatch(0);

        function dispatch(i) {
            if (i < index) return Promise.reject(new Error('next() called multiple times'));
            index = i;
            let fn = middleware[i];
            if (i === middleware.length) fn = next;
            if (!fn) return Promise.resolve();
            try {
                return Promise.resolve(fn(context, function next() {
                    return dispatch(i + 1);
                }))
            } catch(err) {
                return Promise.reject(err);
            }
        }
    }
}
```
比较关键的就是这个dispatch函数了，它将遍历整个middle，然后将context和dispatch(i + 1)传递给middleware中的方法
```
return Promise.resolve(fn(context, function next() {
    return dispath(i + 1);
}))
```
这段代码很巧妙的实现了两点

1. 将'context'一路传下去给中间件
2. 将'middleware'中的下一个中间件fn作为未来的next的返回值

这两点也是洋葱模型实现的核心。

再往下看代码实际上没有太多花样了

createContext和handleRequest做的实际上是把ctx和中间件进行绑定，也就是第一次调用compose返回值的地方

```
createContext(req, res) {
    const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.reponse);
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url;
    context.cookies = new Cookies(req, res, {
      keys: this.keys,
      secure: request.secure
    });
    request.ip = request.ips[0] || req.socket.remoteAddress || '';
    context.accept = request.accept = accepts(req);
    context.state = {};
    return context;
}
handleRequest(ctx, fnMiddleware) {
    const res = ctx.res;
    res.statusCode = 404;
    const onerror = err => ctx.onerror(err);
    const handleResponse = () => respond(ctx);
    onFinished(res, onerror);
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
}
```

## 资料
[浅析koa的洋葱模型实现](https://segmentfault.com/a/1190000013981513)

[天天造轮子](https://juejin.cn/post/6893338774088974343)