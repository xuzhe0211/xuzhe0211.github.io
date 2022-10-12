---
autoGroup-13: ES6
title: ES6---扩展运算符
---
扩展运算符，即...运算符是ES6新增的一个语法，<span style="color: red">其主要作用是将数组或对象进行展开(这种说话也许不太准确)</span>，希望通过下面的总结让你明白下面用法

## 1. 替代apply方法，一般在函数调用时候处理参数
假设我们的参数刚好是一个数组
```javascript
var args = [1,2,3]
```
然后我们需要返回这个参数数组中所有元素之和，那么ES5的做法
```javascript
function addFun(x, y, z) {
    return x + y + z
}
var args = [1, 2, 3]

// 两种调用方式
// 1. 这种方式在参数较少的情况下还能应付
addFun(args[0], args[1], args[2]);

// 2. 用apply方法直接传入数组
addFun.apply(null, args);
```
apply方法能很好的结果参数过多的问题，但是前提是你需要清楚apply和call区别

ES6使用扩展运算符
```javascript
function addFun(x, y, z) {
    return x + y + z;
}
var args = [1,2,3]
addFun(...args);
```
这里的...运算符是将args数组拆开成的单个元素进行计算

## 2. 剩余参数(rest运算符)，主要针对函数形参
<span style="color: blue">**剩余参数运算符和扩展运算符都是...，但是使用起来却不一样，可以简单的理解为剩余参数运算符和扩展运算符是相反的，扩展运算符是把数组和对象进行展开，而剩余参数运算符是把多个元素'合并'起来**</span>

主要用于不定参数，可以理解为arguments的替代品，因此ES6不在使用arguments对象
```javascript
let demoFun = function(...args) {
    for (let item of args) {
        console.log(item)
    }
}
demoFun(1,2,3); // 1,2,3

// 二
let demoFun = function(argA, ...args) {
    console.log(argA);
    console.log(args)
}

demoFun(1, 2, 3);
// 1
// [2, 3]
```
配合结构使用时，把它理解为整体一个元素就行了
```javascript
var [a, ...rest] = [1,2,3,4]

// 这里...rest整体看成一个元素
console.log(a) // 1
console.log(rest); // [2,3,4]
```

## 3. 数组连接、合并
连接数组，使用push将数组添加到另一个数组的尾部
```javascript
var arr1 = [1,2,3];
var arr2 = [4, 5,6]

// ES5处理方式
Array.prototype.push.apply(arr1, arr2);
console.log(arr1) // [1,2,3,4,5,6]

// ES6处理方式
arr1.push(...arr2);
console.log(arr1); // [1,2,3,4,5,6]
```
合并数组(代替concat方法)
```javascript
var arr1 = ['a', 'b', 'c'];
var arr2 = ['d', 'e', 'f'];

// ES5合并
var es5Arr = arr1.concat(arr2);
console.log(es5Arr); // ['a', 'b', 'c', 'd', 'e', 'f'];

// ES6合并
var es6Arr = [...arr1, ...arr2];
console.log(es6Arr); // ['a', 'b', 'c', 'd', 'e', 'f']
```
## 4. 数组和对象拷贝
数组拷贝
```javascript
var arr1 = [1,2,3]; 
var arr2 = [...arr1];

console.log(arr1 === arr2) // false;
arr2.push(4); // 修改arr2,不会影响arr1的值

console.log(arr1); // [1,2,3]
console.log(arr2); // [1,2,3,4]
```
对象也一样
```javascript
var obj1 = {
    a: 1, 
    b: 2
}
var obj2 = {...obj1};

console.log(obj1 === obj2); // false;

obj2.c = 3;  // 修改obj2不会影响obj1;
console.log(obj1); // {a: 1, b: 2}
console.log(obj2); // {a: 1, b: 2, c: 3}
```
<span style="color: red">扩展运算符拷贝是浅拷贝，只对数组或对象的第一层结构起作用</span>

## 5. 字符串转数组
```javascript
var str = 'hello';

// ES5处理方式
var es5Arr = str.split('');
console.log(es5Arr); // ['h', 'e', 'l', 'l', 'o'];

// es6处理方式
var es6Arr = [...str];
console.log(es6Arr); // ['h', 'e', 'l', 'l', 'o']
```
...运算符的常用方法和场景如上，其他的使用方法就不做过多介绍了，比如map、伪数组转化，有兴趣的朋友可以自己查查资料，其实本质上用法都差不多，总结起来就是：**<span style="color: blue">三点放在形参或者等号左边为rest运算符，放在实参或者等号右边为spread运算符，或者说，放在被赋值的一方为rest运算符，放在赋值的一方为扩展运算符</span>**


## 资料
[ES6扩展运算符](https://segmentfault.com/a/1190000020259974)

[arguments & 剩余参数](/front-end/JavaScript/tips-arguments.html#剩余参数)