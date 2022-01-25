---
title: Webpack 实现 Tree shaking 的前世今生
---
## 前言
如果看过rollup系列的这篇文章，会发现无用代码去哪了？ 项目减重之rollup的Tree-shaking,那你一定对tree-shaking不陌生了。

众所周知，原本不支持tree-shaking的webpack在它2.x版本也实现了tree-shaking，好奇心来了，rollup从一开始就实现了tree-shaking，而webpack则是看到rollup的打包瘦身效果之后，到了2.x彩食鲜，那么二者实现tree-shaking的原理是一样吗？

**Tree-shaking实现机制**

快读浏览官方文档和一众文章后，发现webpack实现tree-shaking的方式还不止一种，但是都与rollup不同。

早起webpack的配置使用并不简单，也因此曾有webpack配置工程师的戏称，虽然现在webpack的配置被极大简化了，webpack也宣称0配置，但如果涉及复杂全面的打包功能，并非0配置可以实现了。了解其功能原理及配置极为有用，接下来了解webpack实现tree-shaking的原理吧

## Tree-shaking---rollup VS Webpack

- rollup在编译打包过程中分析程序流，得益于ES6静态模块(exports和imports不能在运行时修改)，我们在打包就可以确定哪些代码我们需要的
- webpack本身在打包时只能标记为使用的代码而不移除，而识别代码未使用标记并完成tree-shaking的其实是UglifyJS、babili、terser这类压缩代码的工具。简单来说，就是压缩工具读取webpack打包结果，在压缩之前移除bundle中未使用的代码。

我们提到标记未使用的，也提到了UglifyJS、babili、terser等压缩工具，那么webpack与压缩工具怎么实现tree-shaking的呢？先来了解下webpack实现tree-shaking的前世今生吧

## Webpack实现Tree-shaking的三个阶段

### 第一阶段UglifyJS
webpack标记代码 + babel转义ES5 -> UglifyJS压缩删除无用代码；

关于早期版本的Webpack实现Tree-shaking可以参考这篇文章[如何在webpack2中使用tree-shaking](https://blog.craftlab.hu/how-to-do-proper-tree-shaking-in-webpack-2-e27852af8b21)，掘金也有翻译版，当然如果不愿意花时间考古，也可以看下这个总结

- UglifyJS不支持ES6及以上，需要用Babel将代码编译为ES5,然后再用UglifyJS来清除无用代码
- 通过Babel将代码编译为ES5，但又要让ES6模块不受Babel预设(preset)的影响:配置Babel不装换module，对应的配置webpack的plugins配置
- 为了避免副作用，将其标记为pure(无副作用),以便UglifyJS能够处理，主要是webpack的编译过程组织了对类进行tree-shaking，它仅对函数起作用，后来通过支持类编译后的赋值标记为@__PURE__解决这个问题

### 第二阶段BabelMinify
wepack标记代码->Babili(即BabelMinify)压缩删除无用代码；

Babili后来被重命名为BabelMinify，是基于Babel的代码压缩工具，而Babel已经通过我们的解析器Babylon理解了新语法，同时又在babili继承了UglifyJs的压缩功能，本质上实现了和UglifyJS一样的功能，但使用babili又不必在转义，而是直接压缩代码，使代码体积更小

一般使用Babili替代uglify有Babili插件式和babel-loader预设两种方式。在官方文档最后有说明，Babel Minify最适合针对最新浏览器(具有完整的ES+支持)，也可以与通常的Babel es2015预设一起使用，以首先向下编译代码。

在webpack中使用babel-loader，然后在引入minify作为一个preset会比直接使用BabelMinify WebpackPlugin(下一个就讲到)执行更快，因为babel-minify处理文件体积会更小

### Terser
webpack标记代码->Terser压缩删除无用代码(webpack5已内置)

Terser是一个用于ES6+的Javascript解析器和mangler/compressor工具包。如果你看到这个[issue](https://github.com/webpack-contrib/terser-webpack-plugin/issues/15),就会知道放弃ugily而头像terser怀抱的人越来越多，其原因也很清楚

- uglify不在进行位置且不支持ES6+语法
- webpack默认内置配置了terser插件实现代码压缩关于副作用，从webpack4正式版本扩展了未使用模块检测能力，通过package.json的'sideEffects'属性作为标记，向compiler提供提示，表明项目中的那些文件是'pure(纯正ES2015模块)'，由此可以安全的删除文件中未使用的部分

webpack4的时候还要手动配置一下压缩插件，但最新的webpack5已经内置实现了tree-shaking啦，在生产环境下无需配置即可实现tree-shaking

webpack的Tree-shaking流程

## Webpack标记代码

总的来说,webpack对代码进行标记,主要是对import & exports语句标记为3类：
- 所有import标记为/* harmony import */
- 所有被使用过的export标记为/* harmony export([type]) */,其中[type]和webpack内部有关，可能是binding,immutable等等
- 没被使用过的export标记为/* unused harmony export[FuncName] */,其中[Function]为export的方法名称



## 资料
[webpack实现Tree shaking前世今生](https://blog.csdn.net/csdnnews/article/details/118502179)

[webpack构建之tree-shaking的原理是什么](https://blog.csdn.net/leelxp/article/details/108099238)

[Webpack 和 Rollup：一样但又不同](https://www.136.la/jingpin/show-91533.html)

[rollup和webpack](https://segmentfault.com/a/1190000022227140)

[webpack 如何优雅的使用tree-shaking（摇树优化）](https://blog.csdn.net/haodawang/article/details/77199980)