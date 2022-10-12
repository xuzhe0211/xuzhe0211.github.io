---
autoGroup-16: Tips/方法实现
title: 一道经典的面试题1
---
## 简介
```js
function test() {
    console.log(this)
}
test() // this指向window
new test() // this指向test

// 实例二
window.name = 'sensors'

function AAA() {
  this.name = 'test';

  this.getName = function() {
    console.log(this.name);
  }
}

const aaa = new AAA();
const bbb = aaa.getName;
bbb();// sensors

```
首先要明确的是[new 一个对象](/front-end/JavaScript/tips-object.html#new-一个对象)过程，只有在new一个对象才会改变this指向；

示例二中虽然已经new AAA()，aaa调用aaa.getName()是指向AAA的，但aaa.getName赋值给了变量b,b的this是指向全局的

## 题目
```js
function Foo() {
    getName = function() { console.log(1); }
    return this;
}
Foo.getName = function() { console.log(2); }
Foo.prototype.getName = function() {console.log(3)}
var getName = function() {console.log(4)}
function getName() {console.log(5)};

Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
getName() // 1
new Foo.getName(); // 2
new Foo().getName(); // 3
```
把上面的代码分为两部分
- 代码部分
- 问题部分

先看代码部分
```js
function Foo() {
    getName = function() { console.log(1);}
    return this;
} 
Foo.getName = function() {console.log(2)}
Foo.prototype.getName = function() {console.log(3)}
var getName = function() {console.log(4)};
function getName() {console.log(5)}
```
基于以下原因：
- <span style="color: red">函数提升和变量提升</span>
- <span style="color: red">函数提升优先级高于变量提升</span>
- <span style="color: red">函数提升不会被变量提升的声明覆盖</span>

改造上面代码
```js
function Foo() {
    getName = function() {console.log(1)};
    return this;
}

function getName() { console.log(5);} // 注意这里

var getName; // 这里

Foo.getName = function() {console.log(2)};
Foo.prototype.getName = function() {console.log(3)}

getName = function() {console.log(4)}; // 这里
```
然后在看问题部分
1. Foo.getName()

    这个没有什么好说的，执行下面的代码
    ```js
    Foo.getName = function() { console.log(2)}
    ```
    所以输出2

2. getName() 

    所以在看上面的代码，getName被赋值为function() {console.log(4)};所以输出4；

3. Foo().getName()

    这个分两部分:Foo()和.getName();
    ```js
    function Foo() {
        getName = function() {console.log(1)};
        return this;
    }
    ```
    执行这个代码之后，getName被重新赋值为function() {console.log(1)},然后返回this;

    <span style="color: red">这个this指的是谁？？Foo函数调用，没有使用new，所以这个this指的是全局this</span>

    所以现在这个代码变成了全局的getName()的调用，就是赋值的那个getName的函数的调用 所以输出1

4. getName();

    这个现在跟【3】中的getName是一样的 所以输出1

5. new Foo.getName();

    这个写法比较迷惑人，转换一下，就是new (Foo.getName()), 什么意思呢？就相当于
    ```js
    var a = Foo.getName;
    new a();
    ```
    所以答案就清楚了  输出2

6. new Foo().getName()

    这个比较简单，简单拆分一下
    ```js
    var obj = new Foo();
    obj.getName();
    ```
    obj原型链上存在一个getName函数，Foo.prototype.getName = function() {console.log(3)} 所以输出3


所以答案就是：2,4， 1,1,2,3

## 练习
```js
function Foo() {
    try{
        console.log('内部1', this.a());
        console.log('内部2', this.a())
    } catch(err) {
        console.error(err);
    }
    this.a = function() {
        console.log('内部3');
    }
    Foo.a = function() {
        console.log('内部4')
    }
    return Foo;
}
Foo.a = function() {
    console.log('外部5')
}
Foo.prototype.a = function() {
    console.log('外6')
}
Foo.a(); // 外部5
var foo = new Foo(); // 外6   内部1 undefined  外6 内部2 undefined this.a()   Foo.prototype.a 没有return 
foo.a(); // 内部4
Foo.a();// 内部4


// 测试 demo
function test() {
    console.log('test')
}
console.log(1, test())
```

## 参考
[new 一个对象](/front-end/JavaScript/tips-object.html#new-一个对象)

[ES6 class的严格模式](/front-end/JavaScript/es6-strict.html#严格模式)