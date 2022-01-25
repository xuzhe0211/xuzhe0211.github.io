---
autoGroup-1: Css Tips
title: css Object-fit
---

## 实例
```
img.a {
    width: 200px;
    height: 200px;
    object-fit: cover;
}
```

## 说明
object-fit属性指定元素内容应该如何去适应指定容器的高度和宽度

object-fit 一般用于img和video标签，一般可以对这些元素进行保留原始比例的剪切、缩放或直接拉伸等。

你可以通过使用[object-postion](https://www.runoob.com/cssref/pr-object-position.html)属性来切换被替换元素的内容对象在元素框内的对齐方式

值|描述
---|---
fill|默认，不保证保持原有的比例，内容拉伸填充整个内容容器
contain| 保持原有尺寸比例。内容被缩放
cover|保持原有尺寸比例。但部分内容被裁切
none|保持原有元素内容的长度和宽度，也就是说内容不会被重置。
scale-down|保持原有尺寸比例。内容的尺寸与none或contain中的一个相同，取决于他们之间谁得到的对象尺寸会更小一些
intial| 设置默认值
inherit|从该元素的父元素继承属性
