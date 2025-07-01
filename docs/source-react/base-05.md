---
title: 如何使用流式渲染技术提升用户体验
---
## 什么是流式渲染
流式渲染主要思想是将HTML文档分块(chunk)并逐步发送到客户端，而不是等待整个页面生成后再发送

流式渲染并不是什么新鲜技术。早在90年代，网页浏览器就已经开始使用这个方式来处理HTML文档。

在SPA(单页应用)流行的时代，由于SPA的核心是客户端动态的渲染内容，流式渲染没有得到太多的关注。如今，随着服务端渲染相关技术的成熟，流式渲染成为可以显著提升首屏加载性能的利器.

下面这个gif可以直观的看到不使用流式渲染和使用流式渲染的差异

![流式渲染](./images/af90ef3e127d496db6d6b25c38b9f38b~tplv-k3u1fbpfcp-jj-mark_3024_0_0_0_q75.gif)

## Node.js实现简单流式渲染
:::tip
HTTP是Node.js中一等公民，其设计时考虑到了流式传输和低延迟。这使得Node.js非常适合作为Web库或框架的基础---Node官网
:::
Node.js在设计之初就考虑到了流式传输数据，考虑如下代码：
```js
const Koa = require('koa');
const app = new Koa();

// 假设数据需要 5秒的时间来获取
renderAsyncString = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('<h1>Hello World</h1>')
        }, 5000)
    })
}

app.use(async (ctx, next) => {
    ctx.type = 'html';
    ctx.body = await renderAsyncString();
    await next();
})

app.listen(3000, () => {
    console.log('App is listening on port 3000')
})
```
这是一个简化的业务场景，运行起来后，会在5秒的白屏后显示一段hello world文字。

没有用户会喜欢一个会白屏5秒的网页，在 [web.de](https://web.dev/articles/ttfb?hl=zh-cn#how-to-improve-ttfb)对TTFB的介绍中，加载第一个字节的时间应该在800ms内才是良好的web网站服务。

我们可以利用流式渲染技术来改善这一点,先通过渲染一个loading或者骨架屏之类的东西来改善用户体验。查看改进后的代码

```js
const Koa = require('koa');
const app = new Koa();
const Stream = require('stream');

// 假设数据需要 5秒的时间来获取
renderAsyncString = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('<h1>Hello World</h1>')
        }, 5000)
    })
}

app.use(async (ctx, next) => {
    const rs = new Stream.Readable();
    rs._read = () => {};
    ctx.type = 'html';
    rs.push('<h1>loading...</h1>');
    ctx.body = rs;
    renderAsyncString().then(string => {
        rs.push(`<script>
            document.querySelector('h1').innerHTML = '${string}'
        </script>`)
    })
})

app.listen(3000, () => {
    console.log('App is listening on port 3000');
})
```
使用流式渲染后，这个页面最初显示 loading... 然后在5秒后更新为 hello world.

需要注意的是：Safari浏览器对于何时触发流式传输可能有一些限制(以下内容为找到官方说明，通过实践总结得到)：

- 传输的chunk需大于512字节
- 传输的内容需能够在屏幕上实际渲染，例如 &lt;div style="display: none;"&gt;...&lt;/div&gt; 可能是不生效的

## 声明式 Shadow DOM,不依赖javascript实现
上面的代码中，我们用到一些javascript，本质上我们需要预先渲染一部分html标签作为占位，之后在用新的html标签去替换他们。这用javascript很好实现，如果我们禁用了javascript呢？

这可能需要一些 [shadow dom](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)的技巧!很多组件化设计前端框架都有 slot 的概念，在 Shadow DOM 中也提供了 slot 标签，可以用于创建可插入的 Web Components。在 chrome11 版本以上，我们可以使用声明式 Shadow DOM,不依赖javascript，在服务器端使用 shadow DOM。一个声明式 Shadow DOM 的例子：

```html
<template shadowrootmode="open">
    <header>Header</header>
    <main>
        <slot name="hole"></slot>
    </main>
    <footer>Footer</footer>
</template>

<div slot="hole">插入一段文字！</div>
```
渲染结果如下：

![渲染结果](./images/091534f589ac42a6af55cc90ddc6ba22~tplv-k3u1fbpfcp-jj-mark_3024_0_0_0_q75.png)

可以看到，我们的文字被插入在了slot标签中，利用声明式 Shadow DOM,我们可以改写上面的例子

```js
const Koa = require('koa');
const app = new Koa();
const Stream = require('stream');

// 假设数据需要 5 秒的时间来获取
renderAsyncString = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('<h1>Hello World</h1>');
    }, 5000);
  })
}

app.use(async (ctx, next) => {
  const rs = new Stream.Readable();
  rs._read = () => {};
  ctx.type = 'html';
  rs.push(`
  <template shadowrootmode="open">
    <slot name="hole"><h1>loading</h1></slot>
  </template>
  `);
  ctx.body = rs;
  renderAsyncString().then((string) => {
    rs.push(`<h1 slot="hole">${string}</h1>`);
    rs.push(null);
  })
});

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
```
运行这段代码，和之前的代码结果完全一致，不同的，当我们禁用掉浏览器的javascript，代码也一样正常运行

> 声明式 Shadow DOM 是一个比较新的特新个，可以在这篇[文档](https://developer.chrome.com/docs/css-ui/declarative-shadow-dom)中看到更多内容

## react 实现流式渲染
我们换个视角看看react,react18之后在框架层面上支持了流式渲染，下面是使用next.js改写上面的代码
```js
import { Suspense } from 'react'

const renderAsyncString = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Hello World!');
    }, 5000);
  })
}

async function Main() {
  const string = await renderAsyncString();
  return <h1>{string}</h1>
}

export default async function App() {
  return (
    <Suspense fallback={<h1>loading...</h1>} >
      <Main />
    </Suspense>
  )
}
```
运行这段代码，和之前的嗲吗结果完全一致，同样也不需要运行任何客户端的Javascript代码

关于React的流式渲染在这里能看到官方 [技术层面](https://github.com/reactwg/react-18/discussions/37)上的解释，本文作为对于流式渲染的概览，不作更细致的讲解。

## 总结
本文从理论上探讨了流式渲染相关实现方案，理论上，流式渲染很简单。HTTP 标准和 Node.js 很早之前就支持了这一特性。但在工程实践中，它很复杂。例如对于 react 来说，流式渲染不仅仅需要 react 作为 UI 来支持，也需要借助 nextjs 这种元框架（meta framework）提供服务端的能力。

[原文](https://juejin.cn/post/7347009547741495350)