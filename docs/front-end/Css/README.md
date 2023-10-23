---
title: Css命名规范
---

## CSS BEM命名规范
来源：[原文档](https://www.cnblogs.com/jianxian/p/11084305.html)

1. 前沿

  BEM是一个简单又非常有用的命名约定。让你的前端代码更容易阅读和理解，更容易协作，更容易控制，更加健壮和明确，而且更加严密。

2. 主体

  **什么是BEM命名规范**

  BEM是块(block)、元素(element)、修饰符(modifier)的缩写，由Yandex团队提出的一种前端CSS命名方法论。

  **BEM命名模式**

  ```css
  .block {}
  .block__element {}
  .block--modifier {}
  ```
  - block代表了更高级别的抽象或组件。
  - block__element代表.block的后代，用于形成一个完整的.block整体
  - block--modifier代表.block的不同状态或不同版本。

  使用两个连字符和下划线而不是一个，是为了让你自己的块可以用单个连字符来界定。如：
  ```css
  .sub-block__element {}
  .sub-block--modifier {}
  ```
  **BEM命名法的好处**

  BEM的关键是，可以获得更多的描述和更加清晰的结构，从其名字就可以知道某个标记的含义。通过查看HTML代码中的class属性，就能知道元素之间的关联。
  ```html
  //常规的命名示例
  <div class="article">
      <div class="body">
          <button class="button-primary"></button>
          <button class="button-success"></button>
      </div>
  </div>
  ```
  这种写法从DOM结构和类命名可以了解每个元素的意义，但无法明确真实的层级关系。在css定义时，也必须依靠层级选择器来限定约束作用域，以避免跨组件的样式污染

  使用BEM命名方法
  ```html
  <div class="article">
      <div class="article__body">
          <div class="tag"></div>
          <button class="article__button--primary"></button>
          <button class="article__button--success"></button>
      </div>
  </div>
  ```
  通过BEM命名方式，模块层级关系简单清晰，而且css书写上也不必做过多的层级选择

  **如何使用BEM命名法**

  并不是每个地方都应该使用BEM命名方式。当需要明确关联性的模块关系时，应当使用BEM格式。

  比如只是一条公共的单独的样式，就没有使用BEM格式的意义：
  ```css
  .hide{
      display:none !important;
  }
  ```

  **在css预处理器中使用BEM格式**

  BEM的一个槽点是，命名方式长而难看，书写不雅。相比BEM格式带来的便利来说，我们应客观看待。

  而且，一般来说会通过LESS/SASS等预处理器语言来编写CSS，利用其语言特性书写起来要简单的很多。
  ```css
  .article{
      max-width:1200px;
      &__body{
          padding:20px;
      }
      &__button{
          padding:5px 8px;
          &--primary{background:blue}
          &--success{background:green;}
      }
  }
  ```
  在当前流行的Vue.js/React/Angular等前端框架中，都有CSS组件级作用域的编译实现，其基本原理均为利用CSS属性选择器特性，为不同的组件生成不同的属性选择器。

  当你选择了这种局部作用域的写法时，在较小的组件中，BEM格式可能显的没那么重要，但对于公共的、全局性的模块样式定义，还是推荐使用BEM格式。

  另外，对于对外发布的公共组件来说，一般为了风格的可定制型，都不会使用这种局部作用域方式来定义组件样式，此时使用BEM格式会大显其彩

## CSS自定义字体

前提条件：必须要先有字体文件，比如.ttf文件，叫UI给或者自己下载

1. 使用@font-face引入字体文件，并且定义该字体的名称：myFirstFont
```css
@font-face{
	font-family: myFirstFont;
    src: url('你自己的字体文件路径.ttf');
}
```
2. 使用
```html
<body>
	<div>这是默认字体</div>
    <div class="my_font">这是自定义字体</div>
    <div class="my_font">哈哈哈</div>
</body>
<style>
	@font-face{
    	font-family: myFirstFont;
        src: url('你自己的字体文件路径.ttf')；
    }
    .box{font-faimily: myFirstFont}
</style>
```
[真正了解@font face里font-weight的作用](/front-end/Css/css-font-face.html)

## 资料
[关于BEM中常见的十个问题以及如何避免](https://www.w3cplus.com/css/battling-bem-extended-edition-common-problems-and-how-to-avoid-them.html)