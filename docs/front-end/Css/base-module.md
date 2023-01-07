---
title: scss、sass、less的对比与区别 
---
[原文](https://www.cnblogs.com/shenting/p/10590359.html)

## 什么是Sass和Less
Sass和Less都属于CSS预处理器。

CSS预处理定义了一种新的语言，其基本思想是，是一种专门的编程语言，为css增加了一个写编程的特性，将css作为目标生成文件，然后开发者就只要使用这种语言进行CSS的编码工作。**通俗的说就是"用一种专门的编程语言，进行Web页面样式设计，在通过编译器转化为正常的CSS文件，以供项目使用"**

## 为什么使用CSS预处理器
<span style="color: red">CSS只是一种标记语言，不是编程语言，因此不可以自定义变量，不可以引用等</span>

### CSS具有一下缺点
- <span style="color: blue">语法不够强大，比如无法嵌套书写，导致模块化开发中需要书写很多重复的选择器</span>
- <span style="color: blue">没有变量和合理的样式复用机制，使得逻辑上相关的属性值必须以字面量的形式重复输出，导致难以维护</span>

这就导致了我们在工作中五端增加了许多工作量。而使用CSS预处理器，提供CSS缺失的样式复用机制、减少冗余代码，提高样式代码的可维护性。大大提高了开发效率

但是CSS预处理器也不是万金油，CSS的好处在于简便、随时随地被使用和调试。预编译CSS步骤的加入，让我们开发工作流中多了一个环节，调试也变得麻烦。更大的问题在于，预编译很容易造成后代选择器的滥用

## Sass和Less的区别
### 不同之处
- Less环境较Sass简单

    Sass的安装需要安装Ruby环境，Less基于Javascript,是需要引入Less.js累处理代码输出css到浏览器，也可以在开发环节使用Less，然后编译成css文件，直接放在项目中

- Less使用较Sass简单

    Less并没有裁剪CSS原有的特性，而是在现有CSS语法的基础上，为CSS加入程序式语言的特性
- Sass功能较Less强大

    1. sass有变量和作用域
    2. sass有函数的概念
    3. 进程控制 -- 条件、循环遍历、继承、引用
    4. 数据结构--map、数组

- Less和Sass处理机制不一样
    
    前者是通过客户端处理的,后者是通过服务端处理的，相比较之下前者解析会比后者慢一点

<span style="color: red">**关于变量在Less和Sass中唯一的区别就是Less用@，Sass用$**</span>

### 相同之处
Less和Sass在语法上有些共性，比如下面这些
- 混入(Mixins)--class中的class
- 参数混入--可以传递参数的class，就像函数一样
- 嵌套规则--Class中嵌套class，从而减少重复的代码
- 运算--CSS中用上数学
- 颜色功能--可以编辑颜色
- 名字空间(namespace)--分组样式，从而可以被调用
- Javascript赋值--可以在CSS中使用Javascript表达式赋值
