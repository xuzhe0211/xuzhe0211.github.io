---
autoGroup-10: webpack中的小技巧
title: 如何使用 splitChunks 精细控制代码分割
---
前端小伙伴都知道，Wie了降低包大小，经常会把依赖的前端模块独立打包，比如把vue、vue-router打到一个单独的包vendor中。另外，常会将存在多个路由的复杂页面的每个页面都单独打一个包，只有访问某个页面的时候，再去下载该页面的js包，以此来加快首页的渲染。

无论是react还是vue都提供了完善的工具，帮我们屏蔽了繁琐的配置工作。当我们对代码进行构建时，已经自动帮我们完成了代码的拆分工作。

所以，很多小伙伴并不知道背后到底发生了什么事。至于为什么这么拆分，到底如何控制代码的拆分，更是一头雾水了

## 问题测验
讲解开始之前，大家先看一个问题。如果你已经知道问题的答案，而且明白为什么，就不必往下阅读了。如果不知道答案或者知道答案，但不知道原因。那么，强烈建议阅读本文。
```js
// webpack.config.js
const path = require('path');
const HtmpWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: { app: './src/index.js' },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }, 
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: {
        new HtmlWebpackPlugin()
    }
}
```

```js
// index.js
import "vue"
import(/*webpackChunkName: 'a' */ "./a");
import(/*webpackChunkName: 'b' */ "./b");

// a.js
import "vue-router";
import "./someModule"; // 模块大小大于30kb

// b.js
import "vuex";
import "./someModule"; // 模块大小大于30kb

// someModule.js
// 该模块大小超过30kb
// ...
```
## 代码分割的三种形式
webpack中以下三种常见的代码分割形式：
- 入口起点: 使用entry配置手动的分离代码
- 动态导入: 通过模块的内联函数调用来分离代码
- 防止重复: 使用splitChunks 去重和分离chunk

第一种方式，很简单，只需要在entry里配置多个入口既可
```js
entry: { app: './index.js', app1: './index1.js' }
```
第二种方式，就是在代码中自动将使用 import() 加载的模块分离成独立的包
```js
// ....
import('./a')

// ...
```
第三种方式，是使用 splitChunks 插件，插件分离规则，然后 webpack 自动将满足规则的 chunk 分离，一切都是自动完成的。

前两种拆分方式，很容易理解。本文主要针对第三种方式进行讨论

## splitChunks代码拆分
### splitChunks 默认配置
```js
splitChunks: {
    // 表示选择哪些chunks进行分割，可选值有:async、initial 和 all
    chunks: 'async',
    //  表示新分离出的chunk必须大于等于minSize 默认为30000，约30KB
    minSize: 30000,
    // 表示一个模块至少应被minChunks个chunk所包含才能分割。默认为1
    minChunks: 1,
    // 表示按需加载文件时，并行请求的最大数目。默认为5
    maxAsyncRequests: 5,
    // 表示加载入口文件时，并行请求的最大数目。默认为3。
    maxInitialRequests: 3,
    // 表示拆分出的chunk的名称连接符。默认为~,如chunk~vendors.js
    automaticNameDelimiter: '~',
    // 设置chunk的文件名。默认为true。当为true时，splitChunks基于chunk和cacheGroups的key自动命名。
    name: true,
    // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块，就分配到该组。模块可以被多个组引用，但最终会根据priority来决定打包到哪个组中。默认将所有来自 node_modules目录的模块打包至vendors组，将两个以上的chunk所共享的模块打包至default组。
    cacheGroups: {
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
        },
        // 
    default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
        }
    }
}
```
以上配置，可以概括为如下4个条件




## 资料
[如何使用 splitChunks 精细控制代码分割](https://juejin.cn/post/6844904103848443912#heading-2)