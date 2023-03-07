---
autoGroup-0: 基础知识
title: JS中的call、apply、bind方法详解
---
<span style="color: red">bind是返回对应函数，便于稍后调用;apply、call则是立即调用；</span>

## apply、call
<span style="color: blue">在javascript中，call和apply都是为了改变某个函数运行时的上下文(context)而存在的，换句话说，**就是为了改变函数体内部this的指向**</span>

JavaScript的一大特点是，函数存在「定义时上下文」和「运行时上下文」以及「上下文是可以改变的」这样的概念
```js
function fruits() {};

fruits.prototype = {
    color: 'red',
    say: function() {
        console.log('My color is ' + this.color)
    }
}
var apply = new fruits;
apply.say(); // My color is red
```
但是如果我们有一个对象 banana = { color: 'yellow' },我们不想对他重新定义say方法，那么我们可以通过call或apply用apply的say方法
```js
banana = { color: 'yellow' }

app.say.call(banana); // My color is yellow
app.sya.apply(banane); // My color is yellow
```
所以，我们看出call和apply是为了动态改变this而出现的，当一个object没有某个方法(本栗子中banana没有say方法)，但是其他的有(本栗子中apple有say方法)，我们可以借助call、apply用其他对象的方法来操作

## apply、call区别
对于apply、call二者而言，作用完全一样，只是接受参数的方式不太一样。例如，有一个函数定义如下：
```js
var func = function(arg1, arg2) {}
```
我们可以通过如下方式来调用
```js
func.call(this, arg1, arg2);
func.apply(this, [arg1, arg2]);
```
其中this是你想指定的上下文，他可以是任何一个JavaScript对象(JavaScript中一切皆对象)，call需要把参数按顺序传递进去，而apply则是把参数放在数组里。

## apply、call实例
1. 数组之间追加

    ```js
    var array1 = [12, 'foo', {name: 'Joe'}, -2458];
    var array2 = ['Doe', 555, 100];
    Array.prototype.push.apply(array1, array2);
    // array1 值为[12, 'foo', {name: 'Joe'}, -2458, 'Doe', 555, 100]
    ```

2. 获取数组中的最大值和最小值

    ```js
    var numbers = [5, 458, 120, -215];
    var maxInNumbers = Math.max.apply(Math, numbers); // 458
    var maxInNumbers = Math.max.call(Math, 5, 458, 120, -215); // 458
    ```
    number本身没有max方法，但是Math有，我们可以借助call、apply使用其方法。

3. 验证是否是数组(前提是toString()方法没有被重写过)

    ```js
    functionisArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
    ```

4. 类(伪)数组使用数组方法

    ```js
    var domNodes = Array.prototype.slice.call(document.getElementsByTagName('*'))
    ```
    Javascript中存在一种名为伪数组的对象结构。比较特别的是arguments对象，还有像调用getElementsByTagName, document.childNodes之类的，他们返回NodeList对象都属于伪数组。不能用Array下的push,pop等方法。

    但是我们能通过Array.prototype.slice.call转换为真正的数组的带有length属性的对象，这样domNodes就可以应用Array下的所有方法了

5. 面试题

    定义一个log方法，让它可以代理console.log方法，常见的解决方法
    ```js
    function log(msg) {
        console.log(msg);
    }
    log(1); // 1
    log(1, 2); // 1
    ```
    上面方法可以解决最基本的需求，但是当传入参数的个数是不确定的时候，上面的方法就失效了，这个时候就可以考虑使用apply或call，注意这里传入多少个参数是不确定的，所以apply是最好的
    ```js
    function log() {
        console.log.apply(console, arguments);
    }
    log(1); // 1
    log(1, 2) // 1 2
    ```
    接下来的要求是给每一个log消息添加一个app的前缀，比如
    ```js
    log('hello world'); // (app)hello world
    ```
    该怎么做比较优雅呢？这个时候需要用到arguments参数是个伪数组，通过Array.prototype.slice.call转化为标准数组，在使用数组方法unshift
    ```js
    functon log() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift('(app)');

        console.log.apply(console, args);
    }
    ```

## bind
在讨论bind()方法之前我们先来看一道题目
```js
var altwrite = document.write;
altwrite('hello')
```
结果：<span style="color: red">Uncaught TypeError: Illegal invocation</span>

<span style="color: red">**altwrite()函数改变this的指向global或window对象，导致执行时提示非法调用异常，正确防范就是使用bind()方法**</span>
```js
altwrite.bind(document)('hello')
```
当然也可以使用call()方法
```js
altwrite.call(document, 'hello');
```

### 绑定函数
<span style="color:blue">bind()最简单的用法是创建一个函数，使这个函数不论怎么调用都有同样的this值。</span>常见的错误就想上面的例子一样，将方法从对象中拿出来，然后调用，并且希望this指向原来的对象。如果不做特殊处理，一般会丢失原来的对象。使用bind()方法能够很漂亮的解决这个问题：

```js
this.num = 9;
var mymodule = {
    num: 81,
    getNum: function() {
        console.log(this.num);
    }
}
mymodule.getNum(); // 81

var getNum = mymodule.getNum;
getNum(); // 9,因为这个例子中，this指向全局对象

var boundGetNum = getNum.bind(mymodule);
boundGetNum(); // 81
```
bind()方法与apply和call很相似，也是可以改变函数体里的this的指向。

MDN的解释是：<span style="color: blue">bind()方法会创建一个新函数，称为绑定函数，当调用这个绑定函数时，绑定函数会以创建它时传入 bind()方法的第一个参数作为 this，传入 bind() 方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。</span>

直接来看看具体如何使用，在常见的单体模式中，通常我们会使用 _this , that , self 等保存 this ，这样我们可以在改变了上下文之后继续引用到它。 像这样：
```js
var foo = {
    bar : 1,
    eventBind: function(){
        var _this = this;
        $('.someClass').on('click',function(event) {
            /* Act on the event */
            console.log(_this.bar);     //1
        });
    }
}
```
由于Javascript特有的机制，上下文环境在eventBind:function() {}过度到$('.someClass').on('click',function(event) { }) 发生了改变，上述使用变量保存 this 这些方式都是有用的，也没有什么问题。当然使用 bind() 可以更加优雅的解决这个问题：
```js
var foo = {
    bar : 1,
    eventBind: function(){
        $('.someClass').on('click',function(event) {
            /* Act on the event */
            console.log(this.bar);      //1
        }.bind(this));
    }
}
```
在上述代码里，bind() 创建了一个函数，当这个click事件绑定在被调用的时候，它的 this 关键词会被设置成被传入的值（这里指调用bind()时传入的参数）。因此，这里我们传入想要的上下文 this(其实就是 foo )，到 bind() 函数中。然后，当回调函数被执行的时候， this 便指向 foo 对象。再来一个简单的栗子：
```js
var bar = function(){
console.log(this.x);
}
var foo = {
x:3
}
bar(); // undefined
var func = bar.bind(foo);
func(); // 3
```
这里我们创建了一个新的函数 func，当使用 bind() 创建一个绑定函数之后，它被执行的时候，它的 this 会被设置成 foo ， 而不是像我们调用 bar() 时的全局作用域。

### 偏函数(Partial Functions)
Partial Functions也叫Partial Applications，这里截取一段关于偏函数的定义：
```
Partial application can be described as taking a function that accepts some number of arguments, binding values to one or more of those arguments, and returning a new function that only accepts the remaining, un-bound arguments.
```
这是一个很好的特性，使用bind()我们设定函数的预定义参数，然后调用的时候传入其他参数即可
```js
function list() {
    return Array.prototype.slice.call(arguments);
}
var list1 = list(1,2,3); //[1,2,3]

// 预定义参数37
var leadingThirtysevenList = list.bind(undefined, 37);

var list2 = leadingThirtyseventList();  // [37]
var list2 = leadingThirtyseventList(1,2,3); // [37, 1,2,3]
```
### 和setTimeout一起使用
```js
function Bloomer() {
    this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// 1秒后调用declear函数
Bloomer.prototype.bloom = function() {
    window.setTimeout(this.declear.bind(this), 100); // bind(this) 注意这里
}

Bloomer.prototype.declare = function() {
    console.log(`我有${this.petalCount}朵花瓣!`)
}
var bloo = new Bloomer();
bloo.bloom(); // 我有5朵花瓣
```
注意:对于时间处理函数和setInterval方法也可以使用上面方法

### 绑定函数作为构造函数
绑定函数也适用于使用new操作符来构造目标函数的实例。当使用绑定函数来构造实例，注意:this会被忽略，但是传入的参数仍然可用。
```js
function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype.toString = function() {
    console.log(this.x + ',' + this.y)
}
var p = new Point(1,2);
p.toString(); // '1,2'


var emptyObj = {};
var YAxisPoint = Point.bind(emptyObj, 0);
// 实例中的例子不支持
// 原生bind支持
var YAxisPoint = Point.bind(null, 0);

var axisPoint = new YAxisPoint(5);
axisPoint.toString(); // 0.5

axisPoint instaceof Point // true
axisPoint instaceof YAxisPoint // true
new Point(17, 42) instaceof YAxisPoint // true
```
### 捷径
bind()也可以为需要特定this值的函数创造捷径

例如要将一个类数组对象转换为真正的数组，可能的例子如下

```js
var slice = Array.prototype.slice;
// ...
slice.call(arguments);
```
如果使用bind()的话，情况变得简单
```js
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.call.bind(unboundSlice);

// ...
slice(arguments);
```
## 实现
// dosomething  具体实现不写了

有个有趣的问题，如果连续bind()两次，亦或者是连续bind()三次那么输出的值是什么呢？想这样
```js
var bar = function(){
    console.log(this.x);
}
var foo = {
    x:3
}
var sed = {
    x:4
}
var func = bar.bind(foo).bind(sed);
func(); // 3
 
var fiv = {
    x:5
}
var func = bar.bind(foo).bind(sed).bind(fiv);
func(); //3
```
答案是，两次都仍将输出3,而非期待中的4和5.原因是，在Javascript中，多次bind()是无效的。更深层次的原因，bind()的实现，相当于使用函数在内部包了一个call、apply，第二次相当于在包住第一次bind()，故第二次以后的bind是无法生效的。


## apply、call、bind比较
那么apply、call、bind三者相比较，之间又有什么异同呢？使用apply、call,何时使用bind呢？最简单的例子
```js
var obj = {
    x: 81,
}
var foo = {
    getX: function() {
        return this.x
    }
}
console.log(foo.getX.bind(obj)()); // 81
console.log(foo.getX.call(obj));    //81
console.log(foo.getX.apply(obj));   //81
```
三个输出的都是81,但是注意看使用bind()方法，他后面多了对括号。

也就是说，区别是，当你希望改变上下文环境之后并非立即执行，而是回调执行的时候，使用bind()方法。而apply/call则会立即执行函数。

在总结一下
- <span style="color: red">apply、call、bind三者都是用来改变函数的this对象的指向的。</span>
- <span style="color: red">apply、call、bind三者第一个参数都是this要指向的对象，也就是想指定的上下文</span>
- <span style="color: red">apply、call、bind三者都可以利用后续参数传参</span>
- <span style="color: red">bind是返回对应函数，便于稍后调用；apply、call则是立即调用</span>



## 资料
[原文](https://segmentfault.com/a/1190000018270750)