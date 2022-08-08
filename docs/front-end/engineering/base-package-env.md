---
autoGroup-0: 基础
title: package.json中browser,module, main字段优先级
---
## browser VS module VS main
前端开发中使用到npm包那可算是家常便饭，而使用到npm包总免不了接触到package.json包配置文件。那么这里就有一个问题，当我们在不同环境下import一个npm包时，到底加载的是npm包的哪个文件？老司机很快的给出答案：**main字段中指定的文件**

然后我们清楚npm包其实又分为：
- 只允许在客户端使用的
- 只允许服务端使用的
- 浏览器/服务端都可以使用
如果我们需要开发一个npm包同时兼容支持web端和server端，**需要在不同环境下加载npm包的入口文件**，显然一个main字段已经不能满足我们的需求

本文就来说下这几个字段的使用场景，以及同时同在这几个字段时候，他们的优先级

## 文件优先级
在说package.json之前，先说下文件优先级

由于我们使用的模块规范有ESM和commonJS两种，为了能在node环境下原生执行ESM规范的脚本文件，.mjs文件就应运而生。

<span style="color: blue">当存在index.mjs和index.js这种同名不同后缀的文件时，import './index'或者require('./index')是会优先加载index.mjs文件的</span>

<span style="color: blue">也就是:**优先级mjs > js**</span>

## browser, module和main字段
### 字段定义
- main：定义了npm包的入口文件，browser环境和node环境均可使用
- module:定义npm包的ESM规范的入口文件，browser和node环境均可使用
- browser:定义npm包在browser环境下的入口文件

### 使用场景与优先级
首先，我们假定npm包test有一下目录结构
```
----- lib
   |-- index.browser.js
   |-- index.browser.mjs
   |-- index.js
   |-- index.mjs
```
其中*.js是使用commonJS规范的语法(require('xxxx')), *.mjs是用ESM规范的语法(import 'xxx')

其中package.json文件
```
"main": "lib/index.js", // main
"module": "lib/index.mjs", // module

// browser 可定义成和 main/module 字段一一对应的映射对象，也可以直接定义为字符串
"browser": {
  "./lib/index.js": "./lib/index.browser.js", // browser+cjs
  "./lib/index.mjs": "./lib/index.browser.mjs"  // browser+mjs
},

// "browser": "./lib/index.browser.js" // browser
```
根据以上配置，那么其实我们的package.json指定的入口可以有
- main
- module
- browser
- browser + cjs
- browser + mjs

这5种情况。下面说下具体使用场景

### webpack + web + ESM
这是我们最常见的使用模型，通过webpack打包构建我们的web应用，模块语法使用ESM

当我们加载
```
import test from 'test'
```
实际上的加载优先级是**browser = browser + mjs > module > browser + cjs > main**

也就是说webpack会根据这个顺序会寻找字段指定的文件，知道找到为止。

然而实际上的情况能比这个更加复杂。具体可以参考流程图

![流程图](./images/5cffb5222d1a8.jpeg)

### webpack + web + commonJS
```
const test = require('test')
```
事实上，构建web应用时，使用ESM或者commonJS模块规范对于加载优先级没有任何影响

优先级依然是 **browser = browser+mjs > module > browser+cjs > main**

### webpack + node + ESM/commonJS
我们清楚，使用webpack构建项目的时，有一个target选项，默认为web，即进行web应用构建

当我们需要进行一些同构项目，或者其他node项目构建的时，我们需要将webpack.config.js的target选项设置为node进行构建
```
import test from 'test'
// 或者 const test = require('test')
```
**优先级是module > main**

### node + commonJS
通过node test.js直接执行脚本
```
const test = require('test')
```
**只有main字段有效**

### node + ESM
通过 --experimental-modules 可以让 node 执行 ESM 规范的脚本(必须是 mjs 文件后缀) 
`node --experimental-modules test.mjs
```
import test from 'test'
```
**只有mian字段有效**

## 总结
- 如果npm包导出的是ESM规范的包，使用module
- 如果 npm 包只在 web 端使用，并且严禁在 server 端使用，使用 browser。
- 如果 npm 包只在 server 端使用，使用 main
- 如果 npm 包在 web 端和 server 端都允许使用，使用 browser 和 main
- 其他更加复杂的情况，如npm 包需要提供 commonJS 与 ESM 等多个规范的多个代码文件，请参考上述使用场景或流程图

## 资料
[package.json中browser,module, main字段优先级](https://www.cnblogs.com/qianxiaox/p/14041717.html)