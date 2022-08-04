---
autoGroup-5: JS名词理解
title: 在你身边你左右 --函数式编程别烦恼
---
在学之前，你可以先问自己几个问题，或者当做一场面试，看看下面这些问题，你该怎么回答
- 你能说出对Javascript工程师比较重要的两种编程范式吗？
- 什么是函数式编程
- 函数式编程和面向对象各有什么优点和不足呢？
- 你了解闭包吗？你经常在那些地方使用？闭包和柯里化有什么关系
- 如果我们想封装一个像underscorede的防抖的函数该怎么实现
- 你怎么理解函子的概念？Monad函子又有什么作用？
- 下面代码的运行结果是什么？
```javascript
var Container = function(x) { this.__value = x;}
Container.of = x => new Container(x);

Container.prototype.map = function(f) {
    console.log(f);
    return Container.of(this.__value);
}

Container.of(3).map(x => x + 1).map(x => 'Result is' + x)
console.log(Container.of(3).map(x=>x+1).map(x => 'Result is ' + x))
```

## 函数式编程(FP)思想
<span style="color: blue">面向对象(OOP)可以理解为是对数据的抽象，比如把一个人抽象成一个Object，关注的是数据。函数式编程是一种过程抽象的思维，就是对当前动作去抽象，关注的是动作</span>
:::tip
举个例子: 如果一个数a=1,我们希望执行+3(f函数)，然后在*5(g函数)，最后得到结果result是20

数据抽象，我们关注的是对这个数据:a = 1 经过f处理得到a = 4,在经过g处理得到a = 20;

过程抽象，我们关注的是过程:a要执行两个f,g操作，先将fg合并成一个k操作，然后a直接执行K，得到a = 20
:::

**问题:f和g合并成了K，那么可以合并的函数需要符合什么条件呢？下面就讲到了纯函数的这个概念**

## 纯函数
<span style="color: blue">定义:一个函数如果输入参数确定，输出结果是唯一确定的，那么他就是纯函数</span>

<span style="color: blue">特点:无状态，无副作用，无关时序，幂等(无论调用多少次，结果相同)</span>

下面哪些是纯函数
```javascript
let arr = [1,2,3];
arr.slice(0, 3); // 是纯函数
arr.splice(0, 3) // 不是纯函数，对外有影响

function add(x, y) { // 是纯函数
    return x + y; // 无状态，无副作用，无关时序，幂等;输入参数确定，输出结果是唯一确定
}

let count = 0;
function addCount() { // 不是纯函数
    count++; // 输出不确定、有副作用
}

function random(min, max) { // 不是纯函数
    return Math.floor(Math.radom() * ( max - min)) + min; // 输出不确定，但注意它没有副作用
}

function setColor(el, color) { // 不是纯函数
    el.style.color = color; // 直接操作了DOM，对外有副作用
}
```
是不是很简单，接下来我们加一个需求？

如果最后一个函数，你希望批量去操作一组li并且还有许多这样的需求要改，写一个公共函数？
```javascript
function change(fn, els, color) {
    Array.from(els).map((item) => (fn(item, color)))
}
change(setColor, oLi, 'blue')
```
**那么问题来了这个函数是纯函数吗？**

首先无论输入什么，输出的都是undefined，接下来我们分析一下对外部有没有影响，我们发现，在函数里并没有直接影响，但是调用setColor对外面产生了影响。那么change到底算不算纯函数呢？

<span style="color:blue">答案当然不算，这里我们强调一点，纯函数的依赖必须是无影响的，也就是说，在内部引用的函数也不能对外部造成影响</span>

## 柯里化
<span style="color: blue">定义：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数</span>

```javascript
const curry = func => (judye = (...args) => args.length === func.length ? func(...args) : (...args2) => judye(...args, ...args2))
const add = (a, b, c) => a + b + c;
const curryAdd = curry(add);
console.log(curryAdd(1)(2)(3)); // 6

function add(x, y) {
    return x + y;
}
add(1,2)；

// 柯里化之后
function addX(x) {
    return function(y) {
        return x + y;
    }
}
var newAdd = addX(2);
newAdd(1);
```
现在我们回头来看上一节的问题？

如果我们不让setColor在change函数里去执行，那么change不就是纯函数了
```javascript
function change(fn, els, color) {
    Array.from(els).map(item => fn(item, color));
}
change(setColor, oLi, 'blue');

// 柯里化之后
function change(fn) {
    return function(els, color) {
        Array.from(els).map(item => fn(item, color))
    }
}
var newSetColor = change(setColor);
newSetColor(oLi, 'blue')
```
- <span style="color:blue">我们先分析柯里化(curry)过程。在之前change函数中fn,els，color三个参数，每次调用的时候我们都希望参数fn值是setColor,因为我们想把不同的颜色给到不同的DOM上。我们的最外层的参数选择了fn，这样返回的函数就不用在输入fn值啦。</span>
- <span style="color:blue">接下来我们分析提纯的这个过程，改写后无论fn输入是什么，都return出唯一确定的函数，并且在change这个函数中，值执行了return这个语句，setColor函数并未在change上执行，所以change对外也不产生影响。显然change这个时候是一个纯函数。</span>
- <span style="color:blue">最后如果我们抛弃柯里化的概念，这里就是一个最典型的闭包用法而已。而change函数的意义就是我们可以通过它把一类setColor函数批量去改成newSetColor这样符合新需求的函数</span>

上面那个例子是直接重写了change函数，能不能直接在原来change的基础上通过一个函数改成newSetColor呢？
```javascript
function change(fn, els, color) {
    Array.from(els).map(item => fn(item, color));
}

// 通过一个curry函数
var changeCurry = curry(change);
var newSetColor = changeCurry(setColor);
newSetColor(oLi,"blue")
```
哇！真的有这种函数吗？当然作为帮助函数（helper function），lodash 或 ramda都有啊。我们在深入的系列的课程中会动（chao）手（xi）写一个。

**问题：处理上一个问题时，我们将一个函数作为参数传到另一个函数中去处理，这好像在函数式编程中很常见，他们有什么规律吗？**

## 高阶函数
<span style="color: blue">定义:函数当参数，把传入的函数做一个封装，然后返回这个封装函数，达到更高程序的抽象</span>

很显然上一节用传入fn的changge函数就是一个高级函数，显然它是穿函数，对外没有副作用。可能你这么将并不能让你真正去理解高阶函数，举几个例子

### 等价函数
<span style="color: blue">定义：调用函数本身的地方都可以其等价函数</span>

```javascript
function __equal__(fn) {
    return function(...args) {
        return fn.apply(this.args);
    }
}
// 第一种
function add(x, y) {
    return x + y;
}
var addnew1 = __equal__(add);
console.log(add(1,2));
console.log(addnew1(1,2));

// 第二种
let obj = {
    x: 1,
    y: 2,
    add: function() {
        console.log(this);
        return this.x + this.y;
    }
}
var addnew2 = __equal__(obj.add);
console.log(obj.add()); // 3
console.log(addnew2.call(obj)) // 3
```
<span style="color: red">第一种不考虑this</span>
- equal(add): 让等价(equal)函数传入原始函数形式闭包，返回一个新的函数addnew1
- addnew(1,2): addnew1中传入参数，在fn中调用，fn变量指向原始函数

<span style="color: red">第二种考虑this</span>
- addnew2.call(obj):让__equal__函数返回的addnew2函数在obj的环境中执行，也就是fn.apply(this, args)中的父级函数中this，指向obj
- fn.apply(this, args)中，this是一个变量，继承父级，父级指向obj，所以在obj的环境中调用fn
- fn就是闭包形成指向obj.add

好了，看懂代码后，我们发现，这好像和直接把函数赋值给一个变量没啥区别，那么等价函数有什么好处呢？

<span style="color: red">等价函数的拦截和监控</span>
```javascript
function __watch__(fn) {
    // 偷偷干点啥
    return function(...args) {
        // 偷偷干点啥
        let ret = fn.apply(this.args);
        // 偷偷干点啥
        return ret;
    }
}
```
我们知道，上面本质就是等价函数，fn执行结果没有任务问题。但是可以在执行前后，偷偷做点事情，比如console.log('我执行了')

**问题：等价函数可以用于拦截和监控，哪有具体的例子吗？**

### 节流函数
前端开发中会遇到一些频繁的事件触发，为了解决这个问题，一般有两种解决方案
- <span style="color: blue">throttle问题</span>
- <span style="color: blue">debounce问题</span>
```javascript
function throttle(fn, wait) {
    var timer;
    return function(...args) {
        if(!timer) {
            timer = setTimeout(() => timer = null, wait);
            return fn.apply(this, args);
        }
    }
}
// const debounce = (fn, wait) => {
//     let timer = null;
//     return function() {
//         clearTimeout(timer)
//         timer = setTimeout(() => fn, wait);
//     }
// }
const fn = function() {console.log('btn clicked')}
const btn = document.getElementById('btn');
btn.onclick = throttle(fn, 5000);
```
分析代码
- 首先我们定义了一个timer
- 当timer不存在的时候，执行if判断里函数
- setTimeout给timer赋一个id值，fn也执行了
- 如果继续点击，timer存在，if判断里函数不执行
- 当时间到了，setTimeout的回调函数清空timer，此时再去执行if判断里函数

所以我们通过对等价函数监控和拦截很好的实现了节流(throttle)函数。而对函数fn执行的结果丝毫没有影响。那如何写出防抖函数呢？

**问题，像这样的节流函数，在我平时的项目中直接写就好了，你封装成这样一个函数似乎还麻烦了呢？**

## 命令式与声明式
在平时，如果我们不借助方法函数去实现节流函数，我们可能会直接怎么去实现节流函数
```javascript
var timer;
btn.onclick = function() {
    timer = setTimeout(() => timer = null, 5000);
    console.log('btn clicked')
}
```
那么与之前的高阶函数有什么区别呢？

很显然，在下面的这例子中，我们每次在需要做节流的时候，我们每次都需要这样重新写一次代码。告诉 程序如何执行。而上面的高阶函数的例子，我们定义好了一个功能函数之后，我们只需要告诉程序，你要做 什么就可以啦。

- <span style="color: blue">命令式:上面例子就是命令式</span>
- <span style="color: blue">声明式：高阶函数的额例子就是声明式</span>
那下面大家看看，如果遍历一个数组，打印出每个数组中的元素，如何用两种方法实现呢？
```javascript
// 命令式
var arr = [1,2,3];
for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
}

// 声明式
array.forEach(i => console.log(i));
```
看到forEach是不是很熟悉，原来我们早就在大量使用函数式编程啦。

这里我们可以先停下来从头回顾一下，函数式编程。

- <span style="color: red">函数式编程，更关注的是动作，比如我们定义的节流函数，就是把节流的这个动作抽象出来</span>
- <span style="color: red">**所以这样的函数必须要输入和输出确定且对外界没有副作用，我们吧这样的函数叫做纯函数**</span>
- <span style="color: red">**对于不纯函数的提纯的过程中，用到了柯里化的方法**</span>
- <span style="color: red">我们柯里化过程中，我们传进去的参数恰恰是一个函数，返回的也是一个函数，这就叫高阶函数</span>
- <span style="color: red">高阶函数往往能抽象下厨想节流这样的功能函数</span>
- **<span style="color: blue">声明式就是在使用这些功能函数</span>**

**问题：现在我们对函数编程有了初步了解，但还没有感受到的它的厉害，还记得我们之前讲的纯函数可以合并吗？下一节 我们就去实现它**

## 组合(compose)
```javascript
function double(x) {
    return x * 2;
}
function add5(x) {
    return x + 5;
}
double(add5(1))
```
上面的代码我们实现的是完成了两个动作，不过我们觉得这样写double(add5(x))，不是很舒服。 换一个角度思考，我们是不是可以把函数合并在一起。 我们定义了一个compose函数
```javascript
function compose(f, g) {
    return function(x) {
        return f(g(x))
    }
}
```
有了compose这个函数，显然我们可以把double和add5合并到一起
```javascript
var numDeal = compose(double,add5)
numDeal(1)
```
- 首先我们知道compose合并的double，add5是从右往左执行的
- 所以1先执行了加5，在完成了乘2

那么这时候就有几个问题
- <span style="color: red">这只使用一个采纳数，如果是多个参数怎么办？有的同学已经想到了柯里化</span>
- <span style="color: red">还有这只是两个函数，如果是多个函数怎么办。知道reduce用法的同学，可能已经有了思路</span>
- **<span style="color: red">compose是从右往左执行，我想左往又行不行？当然它还有个专门的名字管道(pipe)函数</span>**

**问题：现在我们想完成一些功能都需要去合并函数，而且合并的函数还会有一定顺序，我们能不能像JQ的链式调用那样去处理数据呢。**

## 函子(Functor)
讲到函子，我们首先回到我们的问题上来。之前我们执行函数通常是下面这样
```javascript
function double(x) {
    return x * 2;
}
function add5(x) {
    return x + 5;
}
double(add5(1))
// 或者
var a = add5(1);
double(a);
```
那现在我们想以数据为核心，一个动作一个动作去执行
```javascript
(5).add5().double();
```
显然，如果能这样执行函数的话，就舒服多啦。那么我们知道，这样去调用要满足
- <span style="color: blue">(5)必须是一个引用类型，因为需要挂载方法</span>
- <span style="color: blue">引用类型上要有可以调用的方法</span>

我们试着去给他创建一个引用类型
```javascript
class Num{
    constructor(value) {
        this.value = value;
    }
    add5() {
        return this.value + 5;
    }
    double() {
        return this.value * 2
    }
}
var num = new Num(5);
num.add5()
```
我们发现这个时候有一个问题，就是我们经过调用后，返回的就是一个值了，我们没有办法进行下一步处理。所以我们需要返回一个对象。
```javascript
class Num{
    constructor(value) {
        this.value = value;
    }
    add5() {
        return new Num(this.value + 5)
    }
    double() {
        return new Num(this.value * 2)
    }
}
var num = new Num(2);
num.add5().double()
```
- <span style="color: blue">我们通过new Num,创建了一个num一样类型的实例</span>
- <span style="color: blue">把处理的值，作为参数传了进去从而改变this.value的值</span>
- <span style="color: blue">我们把这个对象返了回去，可以继续调用方法去处理函数</span>

我们发现，new Num(this.value + 5)中对this.value的处理，完全可以通过传进去一个函数进行处理

并且在真实情况中，我们也不可能为每个实例都创建这样有不同方法的构造函数，我们需要一个统一的一个方法
```javascript
class Num{
       constructor (value) {
          this.value = value ;
       }      
       map (fn) {
         return new Num(fn(this.value))
       }
    }
var num = new Num(2);
num.map(add5).map(double)
```
我们创建了一个map方法，把处理的函数fn传了进去。这样我们就完美实现了，我们设想的功能。

最后我们整理下这个函数
```javascript
class Functor {
    constructor(value) {
        this.value = value;
    }
    map(fn) {
        return Functor.of(fn(this.value))
    }
}
Functor.of = function(val) {
    return new Functor(val);
}
Functor.of(5).map(add5).map(double);
```
- <span style="color: blue">我们把原来的构造函数Num的名字改成了Functor</span>
- <span style="color: blue">我们给new Functor(val)封住了一个方法Functor.of</span>

现在Functor.of(5).map(add5).map(double)去调用函数。有没有觉得很爽。

哈哈，更爽的是，你已经不知不觉把函子的概念学完了。<span style="color: red">上面的这个例子总的Functor就是函子</span>。现在我们来总结一下吧，它有哪些特点

- <span style="color: blue">Functor是一个容器，它包含了值，就是this.value.(想一想你最开的new Num(5))</span>
- <span style="color: blue">Functor具有map方法。该方法将容器里面的每一个值，映射到另一个容器。(想一想你在里面是不是new Num(fn(this.value)))</span>
- **<span style="color: blue">函数式编程里面的运算，都是通过函子完成，即运行不直接针对值，而是针对这个值的容器---函子。(想一想你是不是没有直接操作值)</span>**
- <span style="color: blue">函子本身具有对外接口(map方法)，各种函数就是运算符，通过接口接入容器，引发容器里面的值的变形(说的就是你传进去的那个函数把this.value给处理了)</span>
- <span style="color: blue">函数式编程一般约定，函子有一个of方法，用来生成新的容器。(就是最后整理了一下函数嘛)</span>

**问题：我们实现了一个通用的函子，现在别问问题，我们趁热打铁，在学一个函子**

###  Maybe函子
我们知道，在做字符串处理的时候，如果一个字符串是null，那么对它进行toUpperCase();就会报错
```javascript
Functor.of(null).map(function(s) {
    return s.toUpperCase();
})
```
那么我们在Functor函子上去进行调用，同样也会报错。

那么我们有没有办法在函子里把空值过滤掉呢？
```javascript
class Maybe {
    constructor(value) {
        this.value = value;
    }
    map(fn) {
        return this.value ? Maybe.of(fn(this.value)) ? Maybe.of(null);
    }
}
Maybe.of = function(value) { 
    return new Maybe(value)
}
var a = Maybe.of(null).map(function(s) {
    return s.toUpperCase();
})
```
我们看到只需要把设置一个空值过滤，就可以完成这样一个Maybe函子。

所以各种不同类型的函子，会完成不同的功能。学到这，<span style="color: red">我们发现，每个函子并没有直接去操作需要处理的数据，也没有参与到处理数据的函数中来</span>

而是在这中间做了一层拦截和过滤。这和我们的高阶函数是不是有点像呢？所以你现在对函数是编程是不是有了更深的了解呢？

现在我们就用函数式编程做个小练习：我们有一个字符串li，我们希望处理成大写的字符串，然后加载到id到text的div上
```javascript
var str = 'li';
Maybe.of(str).map(toUpperCase).map(html('text'))
```
如果在有编写好的Maybe函子和两个功能函数的时候，我们只需要一行代码就可以搞定了

那么下面看看，我们的依赖函数吧
```javascript
let ? = id => Maybe.of(document.getElementById(id));

class Maybe {
    constructor(value) {
        this.value = value;
    }
    map(fn) {
        return this.value ? Maybe.of(fn(this.value)) : Maybe.of(null)
    }
    static of(value) {
        return new Maybe(value)
    }
}
let toUpperCase = str => str.toUpperCase();
let html = id => html => {
    ?(id).map(dom => {
        dom.innerHTML = html;
    })
}
```
我们分析一下代码
- <span style="color: blue">因为Maybe.of(document.getElementById(id))我们经常会用到，所以用双$封装了一下</span>
- <span style="color: blue">然后是一个很熟悉的Maybe函子，这里of用的Class的静态方法</span>
- <span style="color: blue">toUpperCase是一个普通纯函数（es6如果不是很好的同学，可以用babel ）编译成es5</span>
- <span style="color: blue">html是一个高阶函数，我们先传入目标dom的id然后会返回一个函数将，字符串挂在到目标dom上</span>

```javascript
var html = function(id) {
   return function (html) {
      ?(id).map(function (dom) {
         dom.innerHTML = html;
      });
   };
};
```
大家再来想一个问题 Maybe.of(str).map(toUpperCase).map(html('text'))最后的值是什么呢？

我们发现最后没有处理的函数没有返回值，所以最后结果应该是 Maybe {__value: undefined};
这里面给大家留一个问题，我们把字符串打印在div上之后想继续操作字符串该怎么办呢？

**问题：在理解了函子这个概念之后，我们来学习本文最后一节内容。有没有很开心**



## Monad函子
Monad函子也是一个函子，其实很原理简单，只不过它的功能比较重要。那我们来看看它与其它的 有什么不同吧

我们先来看这样一个例子，手敲在控制台打印一下。
```javascript
var a = Maybe.of(Maybe.of(Maybe.of('str')));
console.log(a);
console.log(a.map(fn))
console.log(a.map(fn).map(fn))

function fn(e){ return e.value }
```

join()方法

## 资料
[在你身边你左右 --函数式编程别烦恼](https://juejin.cn/post/6844903621507678216#heading-0)