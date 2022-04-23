---
autoGroup-10: webpack中的小技巧
title: cache-loader、hard-source-webpack-plugin、webpack5缓存的区别是什么
---
## 背景
随着Babel、TypeScript、VueLoader，Terser等编译、转义技术的大规模使用，Webpack的编译时间正在不断膨胀。为了优化编译速度，社区主要有两种方案
- 通过把loader的处理结果缓存到本地磁盘，来加速二次编译
- 通过预编译dll让webpack跳过一些模块的编译，来加速编译

这些方案在一定程度上解决了编译速度慢的问题，但随之而来的是成堆的配置，严重影响了webpack的使用体验。

与此同时，社区出现了一些新兴的编译技术，比如Snowpack，它使用浏览器原生的ES Module实现了O(1)时间的编译，对于“苦Webpack久已”的那些人来说简直不要太有吸引力。

但是这对Webpack来说是一种挑战，面对可能会被蚕食的用户市场，Webpack5的内置缓存方案终于出来了。

## 插件简介
<span style="color: red">HardSourceWebpackPlugin是webpack插件，用于为模块提供中间缓存</span>。为了查看结果，您需要实用次插件运行两次

webpack:第一次构建将花费正常时间。第二个版本将明显更快。适用于在开发模式developmentent和生产模式production下。速度提升效果是原来的好几倍

### 使用hard-source-wbepack-plugin
```js
npm install --save-dev hard-source-webpack-plugin
// 或
yarn add --dev hard-source-webpack-plugin

const hardSourceWebpackPlugin = require('head-source-webpack-plugin');
const isDev = process.env.NODE_ENV === 'developmentent';

module.export = {
    configureWebpack: wbepackConfig => {
        var plugins = [];
        plugins.push(new hardSourceWebpackPlugin())
        webpackConfig.plugins = [...webpackConfig.plugins, ...plugins]
    }
}
```
## cache-loader简介
<span style="color: red">缓存加载器的编译的结果，避免重新编译</span>

### 使用
```js
npm install --save-dev cache-loader

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['cache-loader', 'babel-loader'],
                include: path.resolve('src')
            }
        ]
    }
}
```
## webpack5
### 长效缓存和编译缓存
长效缓存是浏览器层面的缓存，Webpack通过optimization的splitChunks和runtimeChunk的配置，让编译输出的文件具有稳定的hash名称，从而让浏览器能长期有效、安全的复用缓存，达到加速页面加载的效果。

编译缓存是编译时的缓存，Webpack通过在首次编译后把结果缓存起来，在后续编译时复用缓存，从而达到加速编译的效果。

webpack5的内置缓存以及本文讨论的，都是编译缓存

### webpack4的缓存方案
在使用webpack4以及之前的版本，我们都会注意到这样的现象
```
代码热更新很快
npm run start慢
npm run build慢
```
这种现象的本质是：<span style="color: red">webpack4在运行时是有缓存的，只不过缓存只存在在内存中。所以一单webpack的运行程序关闭，这些缓存就丢失了。这就导致我们npm run start/build 的时候根本无缓存可用</span>

<span style="color: blue">所以，解决问题的办法就是把这些webpack编译过程中产生的缓存持久化到本地磁盘、数据库或者云端。这里涉及到两点：**要持久化什么，持久化到哪里**</span>

webpack本身已经有一套缓存方案，只是不够完善，**不支持持久化**。站在现在的角度来看，我们应该去完善webpack核心代码，补充上持久化缓存的作用，使用一套缓存方案解决所有问题，这是显而易见的

<span style="color: red">然而，当时社区好像没搞清楚"要持久化什么"这个问题，他们没有在webpack核心代码上乏力，而是选择了外部解决。于是出现了cache-loader、dll等技术，虽然一定程度上解决了问题，但却引入了过多的复杂性</span>

### webpack的缓存方案
实际上, "要持久化什么"这个问题从一开始就是显而易见的：<span style="color: blue">是webpack运行时存在于内存中的那些缓存，不是loader的产物，更不是dll</span>.因此，webpack5提供了一套持久化抽象，并提供了几个实现：
- <span style="color:blue">IdleFileCachePlugin: 持久化到本地硬盘</span>
- <span style="color:blue">MemoreCachePlugin:持久化到内存</span>

<span style="color:blue">根据webpack运行环境的不同，在dev开发时依旧使用MemoryCachePlugin，而在build时使用IdleFileCachePlugin</span>

webpack5直接从内部核心代码的层面，统一了持久化缓存的方案，有效降低了缓存配置的复杂性。除此之外，由于所有被webpack处理的模块都会被缓存，我们npm run start/build的二次编译速度远超cache-loader，同时dll也可以退出舞台了。

<span style="color: red">**webpack4时之所以要有dll，是因为cache-loader并能覆盖所有的模块，只能对个别别被loader处理的模块进行缓存。而那些通用库是没法被cache-loader处理的，所以只能通过dll的方式来预编译**</span>

实际上webpack5的内置缓存方案无论从性能还是安全上都要好于cache-loader:
- <span style="color: red">性能上:由于被webpack处理的模块都会缓存，缓存的覆盖了要高的多</span>
- <span style="color: red">安全上:由于cache-loader使用了基于mtime的缓存验证机制，导致在CI环境中缓存经常会失效，但是webpack5采用了基于文本内容的etag缓存验证机制，解决了这个问题。具体使用[查看官网](https://webpack.docschina.org/configuration/cache/)</span>


## 资料
[webpack-HardSourceWebpackPlugin和cache-loader插件优化开发模式的构建速度](https://blog.csdn.net/weixin_42471170/article/details/113307504)

[webpack优化策略---比较重要](https://www.jianshu.com/p/cef540b31c38)

[webpack5官方文档--cache](https://webpack.docschina.org/configuration/cache/)
