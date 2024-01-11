---
autoGroup-16: Tips/方法实现
title: JavaScript parseFloat() 函数
---

## 定义和用法
parseFloat()函数即系字符串并返回浮点数。

此函数确定指定字符串中的第一个字符是否为数字。如果是，它会解析字符串直到到达数字的末尾，并将数字作为数字而不是字符串返回。

> 注意，住返回字符串中的第一个数字!

:::tip
注释: 允许前导和尾随空格
注释: 如果第一个字符不能转换为数字，parseFloat()返回NaN
:::

## 示例
```js
var a = parseFloat("10") // 10
var b = parseFloat("10.00") // 10
var c = parseFloat("10.33") // 10.33
var d = parseFloat("34 45 66") // 34 
var e = parseFloat(" 60 ") // 60
var f = parseFloat("40 years") // 40
var g = parseFloat("He was 40") // NaN
```