---
title: JavaScript中为什么null==0为false而null>=0为true
---
最近利用空闲的时间，回顾了一下JS基础的一些知识，发现<span style="color: orange">关系运算符</span>跟相等运算符在针对null,undefined这两个特殊的数据类型时，所呈现的结果都不一样
```js
// 关系运算符
null >= 0 // true;
undefined >= 0 // false;

// 相等运算符
null === 0 // false
undefined === 0 // false;
```
我们来进行对比一下发现
```js
// Number(null) // 0 即 0 >= 0  ===true
// Number(undefined) // Nan  即NaN >= 0 ===false
null >= null // Number(null) >= Number(null) 即 0 >= 0 ===true
undefined >= undefined // Number(undefined) >= Number(undefined) 即NaN >= NaN false!(注意：NaN不等于NaN);


null === undefined // true
null === null // true
undefined === undefined // true
null === 0; // false
undefined === 0 // false
```
<span style="color: red">在关系运算符中，null、undefined会被Number()强制转换成数字类型</span>

<span style="color: red">在相等运算符中，null、undefined则不会转成数字类型，而是经过特殊处理后转化为false(当然，与自身对比，或者是null与undefined对比，即都为true)</span>


## 资料
[JavaScript中为什么null==0为false而null>=0为true](https://blog.csdn.net/weixin_43065804/article/details/95891728)

[NaN是什么](/front-end/JavaScript/tips-isNaN.html#isnan方法的含义-如何判断一个值严格等于nan)