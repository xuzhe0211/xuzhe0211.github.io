---
title: rollup和webpack
---
## rollup和wepack的区别
- 特性
    - rollup所有资源放在同一个地方，一次性加载，利用tree-shaking特性来剔除未使用的代码，减少冗余
    - webpack 拆分代码、按需加载 webpack2已经逐渐支持tree-shake
    - rollup
        1. 打包你的js文件时候如果发现你的无用变量，会将其删掉
        2. 可以将你的js中的代码，编译成你想要的格式
    - webpack
        1. 代码拆分
        2. 静态资源导入(如js、css、图片、字体等)
- 应用场景
    项目(特别是类库)只有js，而没有其他的静态资源文件，使用webpack就有点大材小用了，因为webpack bundle文件的体积略大，运行略慢，可读性略低这时候 [rollup](https://github.com/rollup/rollup)就是一种不错的解决方案

## Rollup的好处
- Tree shaking:自动移除未使用的代码，输出更小的文件
- Scope Hoisting：所有模块构建在一个函数内，执行效率更高
- Config文件支持ESM模块格式书写
- 可以一次输出多重格式:IIFE,AMD,CJS,UMD,ESM
- Development与production版本：.js.min.js
- 文档精简

## 基础插件
- rollup-plugin-alias:提供module名称和resolve功能
- rollup-plugin-babel: 提供 Babel 能力, 需要安装和配置 Babel (这部分知识不在本文涉及)
- rollup-plugin-eslint: 提供 ESLint 能力, 需要安装和配置 ESLint (这部分知识不在本文涉及)
- rollup-plugin-node-resolve: 解析 node_modules 中的模块
- rollup-plugin-commonjs: 转换 CJS -> ESM, 通常配合上面一个插件使用
- rollup-plugin-replace: 类比 Webpack 的 DefinePlugin , 可在源码中通过 process.env.NODE_ENV 用于构建区分 Development 与 Production 环境.
- rollup-plugin-filesize: 显示 bundle 文件大小
- rollup-plugin-uglify: 压缩 bundle 文件
- rollup-plugin-serve: 类比 webpack-dev-server, 提供静态服务器能力

[rollup](https://www.rollupjs.com/)

[webpack](https://www.webpackjs.com/)

[rollup打包产物解析及原理（对比webpack）](https://juejin.cn/post/7054752322269741064)

