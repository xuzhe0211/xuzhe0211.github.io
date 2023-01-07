---
autoGroup-1: 面试问题示例
title: 一道奇怪的JS面试题---块级作用域
---
```js
var a = 0;
if(true) {
    a = 1;
    function a() { return '123'}
    a = 21;
    console.log(a)
}
console.log(a)
```
按照正常思路，我们应该考虑变量提升

即是说，代码等价于如下效果
```js
function a() {return '123'};
var a = 0;
if(true) {
    a = 1;
    a = 21;
    console.log(a); // 21
}
console.log(a); // 21
```
但话说回来，把函数声明写在判断语句中，如果{}被看做代码块的话

那么函数的声明应在代码块内做提升

即是说，代码等价于如下效果
```js
var a = 0;
if(true) {
    function a() {return '123'};
    a = 1;
    a = 21;
    console.log(a); // 21
}
console.log(a); // 0
```
然而实际的结果却不是这样的

先来看看IE的结果
```js
21
21;
// 以上打印结果为IE浏览器10 版本
```
但是到了IE11和最新的edge浏览器就变了
```js
21
function a() {return '123'}
// 以上打印结果为IE浏览器 11版本和edge浏览器
```
<span style="color: blue">显然IE11认为，函数声明为全局，并且函数也没有进行提升，而是当成了表达式</span>

因此，代码等价于
```js
var a = 0;
if(true) {
    let a1 = 1;
    window.a = function() {return '123'};
    a1 = 21;
    console.log(a); // 21
}
console.log(a); // fn...
```
我们在测试谷歌和火狐浏览器
```js
21
1 
// 以上打印结果为chrome浏览器 
```
<span style="color: blue">谷歌浏览器跟火狐一致认为，直到出现了函数声明，变量a才出现了局部作用</span>

<span style="color: blue">**函数依然被当成了表达式，而不是一个声明**</span>

即是说，代码等价于如下
```js
var a = 0;
if(true) {
    a = 1;
    let a1 = function() {return '123'};
    a1 = 21;
    console.log(a1); // 21
}
console.log(a); // 1
```

## 总结
<span style="color: red">**当函数被声明在判断语句内部时，所有浏览器都将函数声明当成表达式(赋值声明)，并且对于是否为全局声明，也有分歧**</span>

## 结论
永远不要把函数定义在条件判断中


## 资料
[一道奇怪的JS面试题](https://www.jianshu.com/p/a2f49c4ca8f0)

[有意思的面试题](https://www.jianshu.com/search?q=%E4%B8%80%E9%81%93%E5%A5%87%E6%80%AA%E7%9A%84JS%E9%9D%A2%E8%AF%95%E9%A2%98&page=1&type=note)