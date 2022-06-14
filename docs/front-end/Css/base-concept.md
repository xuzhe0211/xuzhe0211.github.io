---
title: BFC、IFC、GFC和FFC
---
## 前言
FC的全称是：<span style="color: blue">Formatting Contexts</span>，译为格式化上下文，是W3C CSS2.1规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相关作用

**<span style="color: blue">『CSS2.1中只有BFC和IFC,CSS3中才有GFC和FFC』</span>**

## 前置概念
### Box(CSS布局基本单位)
:::tip
简单来讲，我们看到的所有页面都是由一个个Box组合而成的，元素的类型和display属性决定了Box类型
:::
- <span style="color: blue">block-level Box: 当元素的CSS属性display 为block，list-item或table时，它是块级元素block-level。块级元素(比如&lt;p&gt;)视觉上呈现为块，竖直排列。每个块级至少生成一个块级盒(block-level Box)参与BFC,称为主要块级盒(principal block-level box).一些元素，比如&lt;li&gt;生成额外的盒来放置项目符号，不过多数元素只生成一个主要块级盒</span>
- <span style="color: blue">Inline-level Box: 当元素的CSS属性display的计算值为inline,inline-block或inine-table时，称它为」行内级元素「。视觉上它将内容与其他行内级元素配列为多行。典型的如段落内容，有文本或图片，都是行内级元素。行内级元素生成行内级盒(inline-level boxes),参与行内格式化上下文IFC</span>
- <span style="color: blue">flex container: 当元素的CSS属性display的计算值为flex或inline-flex，称它为」弹性容器「。display:flex这个值会导致一个元素生成一个块级(block-level)弹性容器框。display:inline-flex这个值会导致一个元素生成一个行内级(inline-level)弹性容器框</span>
- <span style="color: blue">grid container: 当元素的CSS属性display的计算值为grid或inline-grid，称它为」栅格容器「</span>


## 总结
一般来说，「FFC能做的事情，通过GFC都能搞定，反过来GFC能做的事通过FFC也能实现。」通常弹性布局使用FFC，二维网格布局使用GFC，所有的FFC与GFC也是一个BFC，在遵循自己的规范的情况下，向下兼容BFC规范。



## 资料
[BFC、IFC、GFC和FFC](https://mp.weixin.qq.com/s/MU520QT9hUEm8CwL-beWlg)