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

    连等操作是从右向左执行的，相当于b = 10、let a = b;很明显b没有声明就直接被赋值了，所以会隐式创建为一个全局变量，函数内的也是一样，并没有声明b,直接就对b赋值了，因为作用域链，会一层一层想上查找，找到了全局的b，所以全局的b就被修改为了20了，而函数内的a因为重新声明了，所以只能局部变量，不影响全局，所以a还是10；

## 第四题
```js
var a = {n : 1};
var b = a;
a.x = a = {x: 2}
console.log(a.x); // undefined
console.log(b.x); // {x: 2}
```
- 答案

    undefined、 {x: 2}

- 解析

    反正按照网上大部分的解释是因为.运算符优先级最高，所以先执行a.x，此时a、b共同指向的{n: 1}编程了{n: 1, x: undefined}然后按照连等操作从右到左执行代码：a = {n: 2},显然a现在指向了一个新对象，然后a.x = a,因为a.x最开始执行过了，所以这里其实等价于：{n: 1, x: undefined}.x = b.x = a = {n: 2}

## 第五题
```js
var arr = [0, 1,2];
arr[10] = 10;
console.log(arr.filter(x => {
    return x === undefined
}))
```
- 答案

    []

- 解析

    这题比较简单，arr[10] = 10,那么索引3- 9位置上都是undefined，arr[3]等打印出来也确实是undefined，但是，这里其实涉及到ECMAScript版本不同对应方法行为不同的问题，<span style="color: red">**ES6之前的遍历方法都会跳过数组未赋值过的位置，也就是空位，但是ES6新增的for of方法就不会跳过**</span>

## 第六题
```js
var name = 'World';
;(function() {
    if (typeof name === 'undefined') {
        var name = 'Jack';
        console..info('Goodbye' + name)
    } else {
        console.info('Hello' + name)
    }
})()
```
- 答案

    Goobye Jack
- 解析

    这道题考察的是变量提升的问题，var声明变量时会把变量自动提升到当前作用域顶部，所以函数内的name虽然是在if分支内声明的，但是也会提升到外层，因为和全局的变量name重名，所以访问不到外层的name，因为最后已声明未赋值的值都为undefined，导致if的第一个分支满足条件

## 第七题
```js
console.log(1 + NaN); // NaN
console.log('1' + 3); // 13
consooe.log(1 + undefined); // NaN  执行第三步 Number(undefind) == NaN
console.log(1 + null); // 1; Number(null) === 0
console.log(1 + {}); // 1[object Object]; Object.prototype.toString.apply({}) == [object Object]
console.log(1 + []) // 1  var arr = [] arr.toString() == ''
console.log([] + {}) // [object Object];
```
- 答案

    NaN、13、NaN、1, 1[object Object]、1、[object Object]
- 解析

    这道题考察的显然是+号的行为

    1. <span style="color: red">如果有一个操作符是字符串，那么就把另一个操作符转成字符串执行操作</span>

    2. <span style="color: red">如果有一个操作符是对象，那么调用对象的valueOf方法转成初始值,如果没有改方法或调用后仍为非元只是，则调用toString方法</span>

    3. <span style="color: red">其他情况下这个两个服都会转成数组执行加法操作</span>

## 第八题
```js
var a = {}, b = {key = 'b'}, c = {key: 'c'};
a[b] = 123
a[c] = 456
console.log(a[b]); // 456
```
- 答案
     
     456
- 解析

    对象有两种方法设置和引用属性，obj.name和obj['name'],方括号里可以字符串、数字和变量设置是表达式等，但是最终计算出来的是一个字符串，对于上面的b和c，他们两个都是对象，所以会调用toString方法转换为字符串，对象转字符串和数组不一样，和内容无关,结果都是[object Object] 所以a[b] = a[c] = a['object Object']

## 第九题
```js
var out = 25;
var inner = {
    out: 20,
    func: function() {
        var out = 30;
        return this.out;
    }
}
console.log((inner.func, inner.func)()); // 25
console.log(inner.func()); // 20
console.log((inner.func)()); // 20
console.log((inner.func = inner.func)()) // 25
```
- 答案

    25、 20、 20、 25

- 解析

    1. 逗号操作符会返回表达式中的最后一个值，这里为inner.func对应的函数，注意是函数本身，然后执行函数，该函数并不是通过对象的方法调用，而是在全局环境下调用，所以this指向window，打印出来的当然是window下的out
    2. 这个显然是以对象的方法调用，那么this指向该对象
    3. 加了个括号，看起来有点迷惑人，但实际(inner.func)和inner.func是完全相等的，所以还是作为对象的方法调用
    4. 复制表达式和逗号表达式类似，都是返回的值本身，所以也相对于在全局环境下调用函数

## 第九题1
```js
function timer() {
    this.s1 = 0;
    this.s2 = 0
    setInterval(() => {
        this.s1++;
    }, 1000)
    setInterval(function(){
        this.s2++; // this 指向function
    }, 1000)
}

var t = new timer()
setTimeout(() => console.log(t.s1), 3100); // 3
setTimeout(() => console.log(t.s2), 3100) // 0
```
## 第十题
```js
let {a, b, c} = {c: 3, b: 2, a : 1};
console.log(a, b, c); // 1, 2,3
```
- 答案

    1,2,3
- 解析

    这道题考察的是变量解构复制的问题，<span style="color: red">数组解构复制是按位置对应的，而对象只要变量与属性同名，顺序随意</span>

## 第十一题
```js
console.log(Object.assign([1,2,3], [4,5]));
```
- 答案

    [4,5,3]
- 解析

    是不是从来没用assign方法合并过数组？assign方法可以用于处理数组，不过会把数组是为对象，比如这里会把目标数组视为是属性为0、1、2的对象，所以源数组的0、1属性的额值覆盖了目标对象的值
    
## 资料
[JS 烧脑面试题大赏](https://mp.weixin.qq.com/s/vQIDqAaLA2cl6VzHC4E3JQ)