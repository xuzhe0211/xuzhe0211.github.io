---
autoGroup-0: 基础知识
title: JS中的this详解
---
## 简介
在绝大数情况下，函数的调用方式决定了this值。this不能在执行期间被复制，并且在每次函数被调用时this的值也可能会不同。

- <span style="color: blue">this的值表示当前执行环境对象，而与声明环境无关,所以this代表的对象要等函数运行。类似定义函数时的参数列表，只有在函数调用时才传入真正的对象。</span>
- <span style="color: blue">this 关键字虽然会根据环境变化，**但它始终代表的是调用当前函数的对象**</span>

## 全局环境
无论是否在严格模式下，在全局执行环境中(在任何函数体外部)，this都指向全局对象
```js
console.log(this === window); // true
```
## 函数环境中的this
<span style="color: red">**在函数内部， this的值取决于函数被调用的方式**</span>

### 函数环境中的this
在非严格模式下, this 的值不是由该调用设置的， 所以this 的值默认指向全局对象
```js
function fn() {
    return this;
}
fun() === window;
```
在严格模式下，<span style="color: red">**this将保持他进入执行环境时的值，所以this将会默认为undefined**</span>
```js
function f2() {
    'use strict'
    return this;
}
fn2() === undefined
```
<span style="color: red">**在严格模式下，如果 this 没有执行环境定义，那它将保持为undefined。**</span>

如果想把 this 的值从一个环境传到另一个，就要用 call 或者 apply 方法
```js
// 将一个对象作为call和apply的第一个参数，thsi将会被绑定到这个对象
var obj = {a: 'Custom'};

var a = 'Global';

function whatsThis(arg) {
    return this.a;
}
whatsThis(); // Global
whatsThis.call(obj); // Custom
whatsThis.apply(obj); // Custom
```
<span style="color: blue">当一个函数在其主体中使用this关键字时，可以使用函数继承自 Function.prototype 的call或apply方法将 this 值绑定到调用中的特定对象。</span>

使用call 和apply 函数的时候，如果传递给 this 的值不是一个对象，JavaScript会尝试使用内部 toObject 操作 将其转换为对象。
```js
function bar() {
    console.log(Object.prototype.toString.call(this));
}
bar.call(7); // [object Number]
```
### bind方法
ES5引入了 Function.prototype.bind。<span style="color: red">**调用f.bind(someObject)会创建一个与f 具有相同函数体和作用域的函数，但是在这个新函数中，this将永久的被绑定到了bind的第一个参数**，无论这个函数是如何被调用的</span>
```js
function f() {
    return this.a;
}

var g = f.bind({ a: 'azerty' });
console.log(g()); // azerty;

var h = g.bind({ a: 'yoo' }); // bind只生效一次，所以此处bind无效
console.log(h()); // azerty

var o = { a: 37, f: f, g: g, h: h }
console.log(o.f(), o.g(), o.h()); // 37, azerty, azerty
```

### 剪头函数
在剪头函数中，this与普通函数的指向不同，它与封闭词法环境的this保持一致。<span style="color: blue">在剪头函数中，this指向创建时所在的环境，这同样适用于在其他函数内所创建的剪头函数；**在普通函数中，this指向执行时的环境**</span>

剪头函数被调用的时候，不会自动绑定一个this对象。剪头函数没有自己的this，它的this都是捕获其所在上下文的this值

举例子
```js
var foo = () => this;
console.log(foo() === window); // true

// 作为对象的一个方法调用
var obj = { foo: foo }
console.log(obj.foo() === window); // true;

// 使用call来设定this
console.log(foo.call(obj) === window); // true;

// 使用bind 设定this
foo = foo.bind(obj);
console.log(foo() === window); // true;
```
第二个🌰
```js
// bar返回一个函数，这个函数返回this
// 这个返回的函数是以剪头函数创建的
// 所以它的this被绑定到了外层函数的this
var obj = {
    bar: function() {
        var x = () => this;
        return x;
    }
}
//作为obj对象的一个方法来调用bar，把它的this绑定到obj。将返回的函数的引用复制给fn
var fn = obj.bar();
//直接调用fn而不设置this
//通常不适用箭头函数的情况，默认为全局对象
//若在严格模式则为undefined
console.log(fn() === obj);	//true

//如果只是引用obj的方法，而没有调用它
var fn2 = obj.bar;		//fn2 = function() {var x = (() => this); return x;}
//调用箭头函数后，this指向window,因为它从bar继承了this
console.log(fn2() === window);	/true
```
### 作为对象的方法
当函数作为对象里的方法被调用时，他们的this是调用该函数的对象

```js
var o = {
    prop: 37,
    f: function() {
        return this.prop;
    }
}
console.log(o.f()); // 37;
```
函数时从o的f成员调用才是重点。

同样，this的绑定只受最靠近的成员应用的影响
```js
o.b = { g: o.f, prop: 42};
console.log(o.b.g()); // 42
```
这个栗子说明，这与它是对象o的成员没有什么关系，最靠近的引用才是最重要的。

## 原型链中的this
对于在对象原型链上某处定义的方法，同样的概念也使用。如果该方法存在于一个对象的原型链上，那么this指向的是调用这个方法的对象，就像是该方法在对象上一样
```js
var o = {
    f: function() {
        return this.a + this.b;
    }
}
var p = Object.create(o);
p.a = 1;
p.b = 4;

console.log(p.f()); // 5
```
在这个栗子中，对象p没有属于自己的属性，它的f属性继承自它的原型。虽然在对于f的查找过程中，最终是在o中找到的f属性，但是查找股从横首先从p.f的引用开始，所以函数中的this指向p。也就是说f是作为p的方法调用的，所以它的this指向了p。这是JavaScript的原型继承中的一个有趣的特征。

## getter与setter中的this
同样的概念适用于，当函数在一个getter或者setter中被调用。用作getter或setter的函数都会把this绑定到设置或获取属性的对象。

```js
function sum() {
  return this.a + this.b + this.c;
}

var o = {
  a: 1,
  b: 2,
  c: 3,
  get average() {
    return (this.a + this.b + this.c) / 3;
  }
};

Object.defineProperty(o, 'sum', {
    get: sum, enumerable: true, configurable: true
})

console.log(o.average, o.sum);	//logs 2, 6
```

## 作为构造函数
当一个函数用作构造函数时（使用new关键字），它的this被绑定到正在构造的新对象。

虽然构造器返回的默认值是this所指的对象，但是也可以手动地返回其他的对象（如果返回值不是一个对象，则返回this对象）。

```js
function C() {
    this.a = 37;
}

var o = new C();
console.log(o.a);	//logs 37

function C2() {
    this.a = 37;
    return {a:38};
}

o = new C2();
console.log(o.a);	//logs 38
```
在这个栗子中，在调用构造函数的过程中，手动的设置了返回对象，所以默认对象就被丢弃了。this.a = 37;这条语句虽然执行了，但是对于外部没有任何影响。


## 作为一个DOM事件处理函数
当函数被用作事件处理函数时，它的this指向触发事件的元素。

## 作为一个内联事件处理函数
当代码被内联on-event处理函数调用时，它的this指向监听器所在的DOM元素：

```js
<button onclick="alert(this.tagName.toLowerCase());">
  Show this
</button>
```
这个栗子的alert会显示button。只有外层代码中的this是这样设置的：
```js
<button onclick="alert((function() {return this})());">
  Show inner this
</button>
```
在这种情况下，没有设置内部函数的this，所以它指向window/global对象，非严格模式下，调用的函数未设置this时指向的默认对象。

## 资料
[JS中的this详解](https://www.cnblogs.com/bzsheng/p/12080060.html)

[JavaScript this关键字](https://www.runoob.com/js/js-this.html)


[class 严格模式](/front-end/JavaScript/es6-strict.html#严格模式)

[一道算法题](/front-end/JavaScript/tips-foo.html#简介)

[一道js闭包面试题的学习](/front-end/interview/demo3-2.html)