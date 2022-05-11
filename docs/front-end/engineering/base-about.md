---
autoGroup-0: 基础
title: npm安装相关问题
---

## 为什么yarn 比npm快
<span style="color: red">yarn 感觉要比 npm 快很多，这是因为 **yarn 采用并行安装依赖的方式，而 npm 是串行**。 在缓存机制上，目前差异性并不是很大，都会读取本地缓存。</span>

<span style="color: red">pnpm避免了一些包的重复安装--比yarn更快一些</span>

[Yarn vs npm：你需要知道的一切 - 知乎专栏](https://zhuanlan.zhihu.com/p/23493436)

## npm 模块安装机制
[npm模块安装机制，为什么输入npm install就可以自动安装对应的模块](/front-end/interview/dachanng3.html#简单题)

## npm 查看依赖的包的相关版本
```js
> npm ls webpack
```
[npm run](/front-end/engineering/base-script.html#npm-run-的其他问题)