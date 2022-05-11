---
autoGroup-12: 工程化知识卡片
title: webpack Compiler与Compilation
---
## Compiler
Compiler模块是Webpack的支柱引擎,它继承自Tapable类(可以注册和调用插件),可以通过CLI或者Node API传递的所有参数创建出一个Compiler实例,调用该实例的run触发所有编译工作，所有的加载(loading)、打包(bundling)、写入(writing)工作均委托给各种插件。常用的方法和属性有run()、watch()、hooks、context等

## Compilation
此外还有Compilation模块，它也是扩展(extend)自Tapable类，它会被Compiler实例用来创建一次资源版本构建。compilation实例能够访问所有的模块和它们的依赖(大部分是循环依赖)。它会对应用程序的依赖图中所有模块进行字面上的编译。在编译阶段，模块会被加载(loaded)、封存(sealed)、优化(optimized)、分块(chunked)、哈希(hashed)和重新创建(restored)

## compiler对象与compilation对象的区别
- compiler对象代表了完整的webpack环境配置。这个对象在启动webpack时被一次性建立，并配置好所有可操作的设置，包括options，loader和plugin。当在webpack环境中应用一个插件时，插件将收到此compiler对象的引用。可以使用它来访问webpack的主环境
- compilation对象代表一次资源版本构建。当运行webpack开发环境中间件时，每当检测到一个文件变化，就会创建一个新的compilation，从而生成一组新的编译资源。一个compilation对象表现了当前的模块资源、编译生成资源、变化的文件以及被跟踪依赖的状态信息。compilation对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用

## 示例
```js
// 可以从webpack package中import 导入
import {Compiler} from 'webpack';

// 创建一个新的compiler实例
const compiler = new Compiler();

// 填充所有必备的 options 选项
compiler.options = {...};

// 运行结束后执行回调
const callback = (err, stats) => {
  console.log('Compiler 已经完成执行。');
  // 显示 stats……
};

// compiler 的 run 调用，并传入 callback
compiler.run(callback);

```

## 资料
[webpack plugin 从入门到入门 之compiler与compilation](https://juejin.cn/post/7068930184887402509)

[webpack Compiler与Compilation](https://juejin.cn/post/7066817682280022024)

[webpack详解](https://juejin.cn/post/6844903573675835400)

