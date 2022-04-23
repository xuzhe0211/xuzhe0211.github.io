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


## 总结
一般来说，「FFC能做的事情，通过GFC都能搞定，反过来GFC能做的事通过FFC也能实现。」通常弹性布局使用FFC，二维网格布局使用GFC，所有的FFC与GFC也是一个BFC，在遵循自己的规范的情况下，向下兼容BFC规范。



## 资料
[BFC、IFC、GFC和FFC](https://mp.weixin.qq.com/s/MU520QT9hUEm8CwL-beWlg)