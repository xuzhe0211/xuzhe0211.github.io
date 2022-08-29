---
autoGroup-13: TypeScript
title: 编译ts代码用tsc还是babel
---
编译TypeScript代码用什么编译器？

那还用说，肯定是ts自带的compiler。

但其实babel也能编译ts代码，那用babel和tsc编译ts有什么区别呢？

我们分别来看一下

## tsc的编译流程
typescript compiler的编译流程是这样的

![typeScript compiler](./images/ts1.png)

源码要先用Scanner进行词法分析，拆分成一个个不能细分的单词，叫做token。

然后Parser进行语法分析，组装成抽象语法树(Abstract Syntax Tree)AST;

之后做语义分析，包括用binder进行作用域分析，和有Checker做类型检查。如果有类型的错误，就是在Cheker这个阶段报的。

如果有Transformer插件(tsc支持custom transform),会在Checker之后调用，可以对AST做各种增删改

类型检查通过后就会用Emmiter把AST打印成目标代码，生成类型声明文件d.ts，还有sourcemap

:::tip
sourcemap的作用是映射源码和目标代码的代码位置，这样调试的时候打断点可以定位到相应的源码。线上报错的时候也能更加sourcemap定位源码报错的位置
:::
tsc生成AST可以用astexplorer.net可视化的查看

![astexplorer](./images/ts02.jpg)

生成的目标代码和 d.ts 和报错信息也可以用 ts playground 来直接查看：

![生成目标js](./images/ts03.jpg)
![生成目标d.ts](./images/ts04.jpg)
![生成目标](./images/ts05.jpg)

大概了解了 tsc 的编译流程，我们再来看下 babel 的：

## babel的编译流程
babel的编译流程是这样的：
![babel编译流程](./images/babel01.png)

源码经过Parser做词法分析和语法分析，生成token和AST

AST会做语义分析生成作用域信息，然后调用Transformer进行AST转换。

最后会用 Generator把AST打印成目标代码并生成sourcemap。

babel的AST和Token也可以用astexplorer.net可视化查看

![astexplorer](./images/babel02.jpg)

如果想看到 tokens，需要点开设置，开启 tokens：

![token](./images/babel03.jpg)

而且 babel 也有 playground（babel 的叫 repl） 可以直接看编译之后生成的代码：

![babel playground](./images/babel04.jpg)

其实对比下tsc的编译流程，区别不大

Parser对应tsc的Scanner和Parser，都是做词法分析和语法分析，只不过babel没有细分

Transform阶段做语义和代码转换，对应tsc的Binder和Transformer。<span style="color: blue">**只不过babel不会做类型检查，没有Checker**</span>

Generator做目标代码和sourcemap，对应的tsc的Emmiter。<span style="color: blue">**只不过没有类型信息，不会生成d.ts**</span>

对比两者的编译流程，会发现babel除了不做类型检查和生成类型声明之外，tsc能做的事情，babel都能做。

看起来好像是这样，但是baben和tsc实现这些功能还是有区别的

## babel和tsc的区别

抛开类型检查和生成d.ts这两babel不支持的功能不谈，我们看下其他功能的对比，

分别对比下语法支持和代码生成两方面

### 语法支持

tsc默认支持最新的es规范的语法和一些还在草案阶段的语法(比如decorators)，想支持新语法就要生成tsc版本

babel是通过@babel/preset-env按照目标环境targets的配置自动引入需要用到的插件来支持标准语法，对于还在草案阶段的语法需要单独引入@babel/proposal-xxx的插件来支持。

所以如果只是用标准语法，那用tsc或者babel都行，但是如果想用一些草案阶段的语法，tsc可能很多都不支持，而babel却可以引入@babel/proposal-xx的插件来支持。

从支持语法特性上来说，babel更多一些

### 代码生成
tsc生成没有做polyfill的处理，想做兼容就需要在入口引入一下core-js(polyfill实现)
```js
import 'core-js';

Promise.resolve
```
babel的@babel-parset-env可以根据targets的配置来自动引入需要的插件，引入需要用到的core-js模块

![ts](./images/ts06.jpg)

引入方式可以通过 useBuiltIns 来配置：

entry是在入口引入根据targets过滤处的所有需要用的core-js.

usage则是每个模块按照使用到了哪些来按需引入
```js
module.exports = {
    presets: [
        [
            '@babel/preset-typescript',
            '@babel/preset-env',
            {
                targets: '目标环境'，
                useBuiltIns: 'entry' // usage
            }
        ]
    ]
}
```
此外，babel会注入一些helper代码，可以通过@babel/plugin-transform-runtime插件抽离出来，从@babel/runtime包引入

使用transform-runtime之前
![ts](./images/ts07.jpg)

使用transform-runtime之后
![ts](./images/ts08.jpg)

> transform runtime顾名思义就是transform to runtime，转换从runtime包引入heler代码的方法

所以一般babel都会这么配
```js
module.exports = {
    presets: [
        [
            '@babel/preset-typescript',
            '@babel/preset-env',
            {
                targets: '目标环境',
                useBuiltIns: 'usage' // ‘entry’
            }
        ]
    ],
    plugins: [ '@babel/plugin-transform-runtime']
}
```
当然，这里不是讲 babel 怎么配置，我们绕回主题，babel 和 tsc 生成代码的区别：

<span style="color: blue">**tsc 生成的代码没有做 polyfill 的处理，需要全量引入 core-js，而 babel 则可以用 @babel/preset-env 根据 targets 的配置来按需引入 core-js 的部分模块，所以生成的代码体积更小。**</span>

看起来用 babel 编译 ts 代码全是优点？

也不全是，babel 有一些 ts 语法并不支持：

## babel不支持的ts语法




## 资料
[编译ts代码用tsc还是babel](https://mp.weixin.qq.com/s/uSwgwCMahgeMKq1tiIYOww)