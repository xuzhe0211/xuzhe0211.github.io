---
autoGroup-1: 面试问题示例
title: JS 烧脑面试题大赏
---

## 第一题
```js
let a = 1;
function b(a) {
    a = 2;
    console.log(a);
}
b(a); // 2
console.log(a) // 1

// 测试
let a = 1
function b() {
  a = 2
}
b()
console.log(a) // 2 主要是考察函数scope作用域

```
- 答案 

    2、1
- 解析

    **首先基本类型数据是按值传递的**,所以执行b函数时，b的参数a接收的值为1，参数a相当于函数内部的变量，**当本作用域有和上层作用域同名的变量时，无法访问到上层变量。所以函数内无论怎么修改a，都不会影响上层**，所以函数内部打印的a是2， 外面打印的扔是1.

## 第二题
```js
function a(b = c, c = 1) {
    console.log(b, c);
}
a()
```
- 答案

    报错
- 解析

    当函数多个参数设置默认值实际上跟按顺序定义变量一样，所以会存在暂时性死区的问题，即前面定义的变量不能引用后面还未定义的变量，而后面的可以访问前面的

## 第三题
```js
let a = b = 10;
;(function() {
    let a = b = 20;
})()
console.log(a);
console.log(b)
```
- 答案

    10, 20
- 解析

    连等操作是从右向左执行的，相当于b = 10、let a = b;很明显b没有声明就直接被赋值了

## 资料
[JS 烧脑面试题大赏](https://mp.weixin.qq.com/s/vQIDqAaLA2cl6VzHC4E3JQ)