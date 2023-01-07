---
title: CSS盒模型（详解）
---
## 什么是CSS盒模型
css盒模型由里到外包括: content(内容)、padding(内边距)、border(边框)、margin(外边框)四个部分

css盒模型有两种:<span style="color: red">标准模型(浏览器模型) + IE模型</span>

## 标准模型 + IE模型的区别
IE盒模型与W3C盒模型的唯一区别就是元素的宽度，元素的width = border + padding + content

::: danger
标准盒子模型(content-box): 内容就是盒子的边界

IE盒子模型(border-box): 边框才是盒子模型

标准盒子模型(content-box)： 元素的宽度width = 内容高度

IE盒子模型(border-box): 元素的宽度width = 内容高度 + padding + border
:::

- CSS如何设置两种盒模型

    ```css
    /* 在不设置box-sizing的情况下，box-sizing 默认是(标准盒子)content-box . */

    /* 标准盒模型 */
    box-sizing: content-box;
    /* IE模型 */
    box-sizing: border-box;
    ```
- JS如何设置/获取盒模型对应宽高

    ```js
    dom.style.width/height
    // 缺点:仅适用于内联样式的
    dom.currentStyle.width/height
    //优点：获取渲染之后的运行的结果，相对更准确
    //缺点：只有IE浏览器支持
    window.getComputedStyle(dom).width/height
    //优点：原理和2相同，但兼容性更好
    dom.getBoundingClientRect().width/height
    //原理同上，经常用于计算元素的绝对位置（根据视窗左顶点获得），getBoundingClientRect()方法可获得四个值：left/top/width/height
    ```
## 根据盒模型
1. 什么是BFC

    BFC是块级格式化上下文的意思。它是CSS 2.1规范中的一个概念，它决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用。

2. 触发BFC的条件

    - 浮动元素float值不为none
    - 定位元素postion值不为static和absolute
    - display属性值为flex、inline-block、table、table-cell等于table相关的值
    - overflow值不为visible。 (overflow值为hidden/auto/scroll设置这些属性的box都会产生BFC)

3. BFC原理

    - 在BFC这个元素垂直方向的边距会发生重叠(垂直方向上地距离由margin决定，在同一个BFC的box 中，相邻的两个box的边距会重叠)
    - BFC的区域不会float元素的box重叠
    - BFC在页面上是一个独立的容器，其内外的元素不会相互影响
    - 计算BFC高度时，浮动元素参与计算
4. 常用应用场景

    - 清除浮动 
    - 外边距合并问题：解决兄弟元素垂直方向边距重叠 （给子元素增加了父元素div）外边距将不会重叠
    
    - 解决margin重叠问题（添加独立BFC）
    - 解决浮动高度塌陷问题（在父元素添加overflow：hidden



## 资料
[CSS盒模型（详解）](https://blog.csdn.net/qq_44171586/article/details/123313415)