---
autoGroup-10: webpack中的小技巧
title: webpack模块化原理解析(五)---webpack对循环依赖的处理
---

[原文](https://zacharykwan.com/2018/03/08/webpack%E5%8E%9F%E7%90%86/webpack%E6%A8%A1%E5%9D%97%E5%8C%96%E5%8E%9F%E7%90%86%E8%A7%A3%E6%9E%90%EF%BC%88%E4%BA%94%EF%BC%89%E2%80%94%E2%80%94%20webpack%E5%AF%B9%E5%BE%AA%E7%8E%AF%E4%BE%9D%E8%B5%96%E7%9A%84%E5%A4%84%E7%90%86%E6%95%88%E6%9E%9C/)

:::tip
一般开发不容易遇到循环依赖的情况，可随着项目达到一定的复杂度后，尤其是依赖关系复杂的大项目，很容易出现循环依赖的情况

这篇文章先说下循环依赖的概念、循环呢依赖在commonjs和ES Module的表现，最后在说一下webpack对循环依赖的处理
:::

## 何谓循环依赖

所谓循环依赖，即比如a脚本d的执行依赖b脚本，而b脚本的执行又依赖a脚本。而世界上Node.js[官网](https://nodejs.org/api/modules.html#modules_cycles)就给出了循环依赖的例子

### Commonjs规范

a.js
```
console.log('a starting');
exports.done = false;
const b = require('./b.js');
console.log('in a, b.done = %j', b.done);
exports.done = true;
console.log('a.done');
```

b.js

```
console.log('b starting');
exports.done = false;
const a = require('./a.js');
console.log('in b, a.donw = %j', a.done);
exports.done = true;
console.log('b done');
```

main.js
```
console.log('main starting');
const a = require('./a.js');
const b = require('./b.js');
console.log()
```
先不使用webpack打包，先在Node.js环境下运行
```
$ node main.js

main starting
a starting
b starting
in b, a.done = false
b done
in a, b.done = true
a done
in main, a done = true, b.done = true
```

在这个例子中，并没有出现死循环的现场，这是由于commonjs规范的两个特性。第一运行时加载，第二缓存已加载的模块。一下是整个流程的分析过程

1. 执行main.js，打印main starting
2. 加载a.js， a.js打印 a starting, 导出a.done为false
3. a.js加载b.js，由此开始执行b.js，打印b starting,导出b.done为false
4. b.js加载a.js，因为此前a.js已经加载完毕，这里b.js读取的是a.js的缓存内容，程序并没有跑回去a.js
5. 读取a.js缓存为a.done = false,打印 in b, a.done = false,接着导出b.done为true,打印b done，完成b.js的流程
6. 回到a.js流程，b.done为true，打印 in a, b.done = true,导出a.done为false,打印a done
7. 回到main.js流程，因为b.js已经被加载，所以这里不重复执行b.js。
8. main.js打印in main, a.done = true, b.done = true.

### ES Module规范

```
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar);
export let foo = 'foo';

//b.mjs
import {foo} from './a';
console.log('b.mjs');
console.log(foo);
export let bar = 'bar';
```

在node环境下执行
```
$ node --experimental-modules a.mjs
(node:53995) ExperimentalWarning: The ESM module loader is experimental.
b.mjs
ReferenceError: foo is not defined
```
这个例子是取自于阮一峰大神[ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/module-loader#%E5%BE%AA%E7%8E%AF%E5%8A%A0%E8%BD%BD)教程。在这个ES Module例子中，出现了报错提示ReferenceError: foo is not defined，提示foo变量未定义，这是为什么呢？

以下是阮大神的解释

:::tip
首先，执行a.mjs以后，引擎发现它加载了b.mjs，因此会优先执行b.mjs，然后在执行a.mjs。接着执行b.mjs的时候，已知它从a.mjs输入了foo接口，这时不会去执行a.mjs，从而认为这个接口已经存在了，继续往下执行。执行到第三行console.log(foo)的时候，才发现这个接口根本没有定义，因此报错
:::

说实话，这段话我是反反复复看了很久，研读了很久，一直没搞懂接着，执行b.mjs的时候，已知它从a.mjs输入了foo接口，这时不会去执行a.mjs，而是认为这个接口已经存在了，继续往下执行。这话的意思。

后来直到我把 a.mjs 改为：

```
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar);
export var foo = 'foo';
```

运行结果为：
```
$ node --experimental-modules a.mjs
(node:56529) ExperimentalWarning: The ESM module loader is experimental.
b.mjs
undefined
a.mjs
bar
```

区别在于，定义 foo 从 let 改为 var，实现了foo 变量提升，这时候打印 foo 为 undefined。

这时候再结合ES Modules 的特性：ES Modules 模块输出的是值的引用，输出接口动态绑定，在编译时执行。这样是不是可以得出这样的结论：

:::tip
更改后的例子：执行a.mjs,第一句马上加载b.mjs，这时a.mjs被引擎解析为创建了变量提升的foo变量的引用，输出foo变量，foo变量为undefined；然后b.mjs中a.mjs导出的引用复制给了foo。

更改前的例子：执行 a.mjs，第一句马上加载 b.mjs，由于 foo变量使用 let 定义，引擎解析创建了没有任何变量的引用，不输出任何变量；在 b.mjs 把“没有任何变量“赋值给了 foo，这里 foo 当然未定义，所以报错提示 foo 未定义。
:::

## webpack对循环依赖的处理

好了，说完循环依赖的概念，那么对于webpack进行项目构建的项目，webpack是否能够预见到循环依赖呢

```
$ ../../node_modules/.bin/webpack
Hash: 6d7e8b3d767ab90792a7
Version: webpack 3.4.0
Time: 51ms
    Asset     Size  Chunks             Chunk Names
bundle.js  3.55 kB       0  [emitted]  main
   [0] ./a.js 163 bytes {0} [built]
   [1] ./b.js 163 bytes {0} [built]
   [2] ./index.js 560 bytes {0} [built]
```
答案是没有的。而且将打包代码执行，其执行结果跟上面的一模一样。失望的 webpack，居然检测不了循环加载。在这里举例的是 commonjs 例子，ES Modules 经试验也展现同样的结果。

但方法总比困难多，在这里推荐使用 webpack 插件 circular-dependency-plugin ，能够检测所有存在循环依赖的地方，尽早检测错误，省去大量 debug 的时间。

```
 ../../node_modules/.bin/webpack
Hash: 6d7e8b3d767ab90792a7
Version: webpack 3.4.0
Time: 51ms
    Asset     Size  Chunks             Chunk Names
bundle.js  3.55 kB       0  [emitted]  main
   [0] ./a.js 163 bytes {0} [built]
   [1] ./b.js 163 bytes {0} [built]
   [2] ./index.js 560 bytes {0} [built]

ERROR in Circular dependency detected:
a.js -> b.js -> a.js

ERROR in Circular dependency detected:
b.js -> a.js -> b.js
```