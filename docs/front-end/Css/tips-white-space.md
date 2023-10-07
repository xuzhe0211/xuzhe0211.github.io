---
autoGroup-1: Css Tips
title: css 解决页面渲染多个空格只显示一个空格问题
---
```css
p {
    white-space: pre;
}
```
![文档](https://www.runoob.com/cssref/pr-text-white-space.html)

## 示例
规定段落中的文本不进行换行
```css
p {
    white-space: nowrap;
}
```
值|描述
---|---
normal | 默认。空白会被浏览器忽略
pre | 空白会被浏览器保留。其行为方式类似HTML中的&lt;pre&gt;标签
nowrap | 文本不会换行，文本会在同一行上继续，知道遇到&lt;br&gt;标签位置
pre-wrap | 保留空白符序列，但是正常的进行换行
pre-line | 合并空白符序列，但是保留换行符
inherit | 规定应该从父元素集成white-space 属性的值

