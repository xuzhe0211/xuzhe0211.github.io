---
title: 最忌对前端构建工具的一些理解
---
## 构建工具的前世今生
谈到构建工具，大家首先想到的肯定就是webpack以及现在最🔥的Vite。webpack，功能强大，生态丰富，从面世到今天，一直很受大家欢迎；Vite采用unbundle构建模式，带来了极致的开发体验，给开发人员以新的选择

在这两个构建工具之外，还有其他构建工具，如和webpack、Vite类似的Rollup、parcel、EsBuilder，自动化构建工具grund、gulp，以及更加救援的YUI Tool.

这些工具的存在，构成了前端构建工具的发展史

### YUI Tool + Ant
YUI Tool是07年左右出现的一个构建工具，功能比较简单，用于压缩混淆css和js代码，需要配合java的Ant使用。

当时web应用开发主要采用JSP,还不想现在这样前后端分离，通常是右java开发人员编写js、css代码，前端都是和后端java代码放在一起。因此前端代码的压缩混淆也就是基于java实现了

### Grunt/Gulp
Grunp/Gulp都是运行在node环境上的自动化工具

在开发过程中，我们可以将一些常见操作如<span style="color: red">解析html</span>、<span style="color: red">es6代码转换为es5</span>、<span style="color: red">less/sass代码转换为css代码</span>、<span style="color: red">代码检查</span>、<span style="color: red">代码压缩</span>、<span style="color: red">代码混淆</span>配置成一些列任务，然后通过Grunp/Gulp自动执行这些任务。

Grunt 和 Gulp 的不通电
- 使用Grunt的过程中，会产生一些中间态的临时文件。一些任务生成临时文件，其他任务可能会基于临时文件在做处理生成最终的构建后文件，导致多次I/O
- Gulp有文件流的概念，通过管道将多个任务和操作连接起来，不会产生临时文件，减少了I/O操作，流程更清晰，更纯粹，大大加快了构建速度

### webpack/Rollup/Parcel
<span style="color: blue">webpack、Rollup、Parcel统称为静态模块打包器</span>

这一类的构建工具，通常需要指定入口-entry，然后以entry为起点，通过分析整个项目内各个源文件之间的依赖关系，构建一个模块依赖图-module graph，然后再将module graph分离为三种类型的bundle: entry 所在的 initial bundle、lazy load 需要的 async bundle 和自定义分离规则的 custome bundle。

这几个构建工具个有优势
- webpack大而全，配置灵活，生态丰富，是构建工具的首选
- Parcel号称零配置，使用简单，适合不太需要定制化构建项目使用
- Rollup推崇ESM标准开发，打包出来的代码干净，适合于组件库开发

### Vite/Esbuild
新一代构建工具

esbuild，基于go语言实现，代码直接编译成机器码(不用像js那样先解析为字节码，在编译成机器码)，构建速速比webpack快

vite，开发模式下借助浏览器对ESM的支持，采用nobundle的方式进行构建，能提供极致的开发体验；生成模式下则基于rollup进行构建

## js 模块化的发展史和构建工具的变化
javascript语言设计之初，只是作为一个简单的脚本语言来丰富网站的功能，



## 资料
[原文](https://juejin.cn/post/7121279495494959111)