---
autoGroup-16: Tips/方法实现
title: 实现一个bind
---


## 概括

1. bind() 返回一个新函数，并不会立即执行
2. bind的第一个参数将作为他运行时的this，之后的一系列参数将会在传递的实参钱传入作为他的参数
3. bind返回函数作为构造函数，就是可以new的，bind时指定的this值就会消失，但传入的参数依然有效 


## 代码

```js
Function.prototype.bind = function(context, arg) {
    var arg = Array.prototype.slice.call(arguments, 1);
    var fn = this;
    var bound = function(...newArg) {
        arg = arg.concat(Array.prototype.slice.call(newArg));
        return fn.apply(context, arg)
    }
    var F = function() {}; // 在new一个bind会生成新函数，必须的条件就是要继承原函数的原型，因此...
    F.prototype = fn.prototype;
    bound.prototype = new F();
    return bound
}
```

[参考文档](https://www.cnblogs.com/goloving/p/9380076.html)

## bind使用

### bind和curring，函数柯里化

```js
function add(a, b, c) {
    var i = a + b + c;
    console.log(i);
    return i;
}
var func = add.bind(undefined, 100); // 给add()传了第一个参数a
func(1, 2); // 103，继续传入b和c

var func2 = func.bind(undefined, 200); // 给func2传入第一个参数，也就是b，此前func已有参数a =100
func2(10); // 310,继续传入c, 100+200+10
```
可以利用此种特性方便代码重用，如下，可以不同的页面只需要配置某几项，前面几项固定的配置可以选择用bind函数先绑定好，将一个复杂的函数拆分成简单的子函数

```js
function getConfig(colors, size, otherOptions) {
    console.log(colors, size, otherOptions);
}
var defaultConfig = getConfig.bind(null, '#cc0000', '1024*768');
defaultConfig('123')
defaultConfig('456')
```
### bind和new

```js
function foo() {
    this.b = 100;
    console.log(this.a);
    return this.a;
}

const func = foo.bind({a: 1});
func(); // 1
new func(); //undefined {b: 100},可以看到此时上面的bind并不起作用
```
<span style="color: red">**函数中的return除非返回的是个对象，否则通过new返回的是个this，指向一个空对象，空对象原型指向foo.prototype, 空对象的b属性是100.也就是说通过new的方式创建一个对象，bind()函数在this层面并不起作用，但是需要注意在参数层面上扔起作用。**</span>

```js
function foo(c) {
    this.b = 100;
    console.log(this.a);
    console.log(c);
    return this.a;
}

const funnc = foo.bind({a: 1}, 20);
new func(); // undefined 20,通过new创建对象func,bind绑定的c依旧起作用
```