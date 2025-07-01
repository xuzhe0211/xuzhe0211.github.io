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

## 混入方式
### less
```less
// unit.less
@designWidth: 375;

.px2vw(@name, @px) {
    @{name}: unit((@px/ @designWidth * 100), vw);
}

// test.less
@import 'unit.less';

div {
    .px2vw(width, 50);
    .px2vw(height, 50);
}
```
- demo 

    ```less
    // insertFormData.less
    .inser-form-data() {
        width: 588px;
        margin: 80px auto 100px;

        &-title {
            font-size: 32px;
            font-weight: 600;
            color: #fff;
            line-height: 38px;
            margin-bottom: 40px;
            text-align: center;

            p {
                font-size: 18px;
                color: #a0a5b9;
                font-weight: 400;
                line-height: 21px;
                text-align: center;
                margin: 20px 0 0;
            }
        }
        &-footer {
            margin-top: 30px;
        }
    }
    .button(@color, @background, @border:none) {
        width: 100%;
        height: 52px;
        background: @background;
        font-size: 18px;
        font-weight: 600;
        color: @color;
        border-radius: 8px;
        border-color: @border;
        padding: 14px 25px;
        cursor: pointer;

        &:hover {
            background: @background;
        }

        &:focus {
            background: @background;
            color: @color;
        }

        &[disabled],
        &[disabled]:hover {
            opacity: 0.8;
            cursor: not-allowed;
            background: #3c3a4d !important;
            border: none;
        }
    }

    // index.less
    @import url('@/assets/styles/mixins/insertFormData.less');

    .reportDetail {
        position: relative;
        .inser-form-data();

        width: 1200px;

        :deep(.el-button) {
            height: 42px !important;
        }

        :deep(.el-progress-bar__inner) {
            .is-text {
                display: none;
            }
        }
    }
    ```
### SCSS
@mixin 用于定义要复用的样式块，@include用于调用这些样式块。

因历史遗留原因，mixin的名字和Sass标识符一样，连字符(hyphens)- 和下划线(underscores)_ 被视为完全相同

定义 mixin 的语法
```scss
// 不需要传参数时，复用固定的样式代码
@mixin <name> {
    //...
}

// 或

// 需要使用传递参数，动态复用样式代码
@mixin name(arg1, arg2, ..., argN) {
    // ...
}

// 使用mixin的语法
@include <name>

// 或
@include <name>(arg1, arg2, ...)
```

使用示例
```scss
// a.scss
@mixin input {
    padding: 10px;
    color: #333;
}
@mixin button ($color, $fontSize) {
    color: $color;
    font-size: $fontSize;
}


// 使用
@use 'a';
.input {
    @include a.input;
}

.button {
    @include a.button(red, 18px);
}
```
demo1
```scss
@mixin form-data-container() {
    position: relative;
}
@mixin data-adv-container() {
    .line {
        margin: 64px 0;
    }
}


// 使用
@import '@/assets/scss/mixins/form-data-container.scss';
.query {
    @include form-data-container();
}
```