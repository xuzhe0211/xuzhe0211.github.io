---
autoGroup-16: Tips/方法实现
title: 创建一个对象过程
---

## new 一个对象

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}
var person = new Person('hellen', 32);
```

## new 对象过程

1. 创建一个空对象

```js
var obj = new Object();
```

2. 让Person中的this指向obj,并执行Person的函数体

```js
var result = Person.apply(obj, arguments);
```

3. 设置原型链，将obj的__proto__成员指向了Perons函数对象的prototype成员对象

```js
obj.__proto = Person.prototype;
```

4. 判断Person的返回值类型，如果是值类型，返回obj。如果是引用类型，就返回这个引用类型的对象

```js
if (typeof result === 'object')
    person = result
else 
    person = obj;
```


## 实例
```js
function foo(){
    this.a = 1;
    return {
        a: 4,
        b: 5
    }
}
foo.prototype.a = 6;
foo.prototype.b = 7;
foo.prototype.c = 8;

var f = new foo();
console.log(f.a)
console.log(f.b)
console.log(f.c)

// 4,5 undefined
```

[new操作符](/front-end/interview/dachang2.html#简单)

## JS中new函数后带括号和不带括号的区别
我们都知道，js中可以使用new来创建实例。通常，new实例化的时候后面需要加括号。但是有些情况下后面带不带括号是一样的
```js
function Parent() {
    this.num = 1;
}
console.log(new Parent()); // 输出Parent对象: {num: 1}
console.log(new Parent); // 输出Parent对象: {num: 1}
```
但是，有时就出现问题
```js
function Parent() {
    this.num = 1;
}
console.log(new Parent().num); // 1;
console.log(new Parent.num); // 报错
```
结果分析

<span style="color: red">从报错信息来看，new Parent.num执行顺序是这样的：**先执行Parent.num, 此时返回的结果是undefined;后执行new，因为new后面必须跟着构造函数，所以new undefined会报错**</span>

> new Parent().num 相当于(new Parent()).num，所以结果返回1

> 从结果来看，new Parent.num代码相当于new (Parent.num); new Parent().num相当于(new Parent()).num

<span style="color: red">**由此看来 new的构造函数后跟着括号优先级会提升**</span>


[JS中new函数后带括号和不带括号的区别](https://www.jianshu.com/p/f84989f0bc39)