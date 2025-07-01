---
title: 关于JS浮点数运算不精确的原因和解决方案
---

<span style="color: red">**说明JS浮点数精度的缺失实际上是因为浮点数的小数部分无法用二进制很精准的转换出来，而以近似值来进行运算的话，肯定就存在精度问题**</span>

Javascript中的数字(Number类型)采用IEEE 754双精度浮点数(64位)标准进行表示。这种表示方式虽然强大，但也带来了一些常见的精度问题。

## IEEE 754浮点数表示法
- 1位：符号位(0表示正数，1表示负数)
- 11位：指数位(用于表示指数，偏移值为1023)
- 52位：尾数位(也成为小数部分或有效数字，隐含一个前导1)

## 资料
[原文](https://zhuanlan.zhihu.com/p/272108051)

[小数部分二进制计算](https://jingyan.baidu.com/article/eb9f7b6dc692e9c79264e878.html)

[JavaScript中最大的数有多大](https://www.pengrl.com/p/20040/)