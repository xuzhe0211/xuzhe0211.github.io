---
autoGroup-16: Tips/方法实现
title: arguments&剩余参数
---

## Function.arguments

:::tip
function.arguments属性代表传入函数的实参，它是一个类数组对象。
:::

### 描述

function.arguments已经被废弃了，现在推荐的做法是使用函数内部可用的arguments对象来访问函数的实参。

在函数递归调用的时候(在某一刻同意函数运行了多次，也就是有多套实参)，那么arguments属性值是最近一次该函数调用时传入的实参。

如果函数不再执行期间，那么该函数的arguments属性的值是null

```
function f(n) {g(n - 1);}

funciton g(n) {
    console.log('before: ' + g.arguments[0]);
    if (n > 0) { f(n); }
    console.log('after ' + g.arguments[0]);
}

console.log(`函数退出后的arguments属性值：${g.arguments}`);
// 输出
// brefore: 1
// brefore: 0
// after: 0
// after: 1
// 函数退出后的arguments属性值：null
```

## Arguments对象

arguments是一个对应于传递给函数的参数的类数组对象

```
function func1(a, b, c) {
    console.log(arguments[0]);
    // expected ouput: 1

    console.log(arguments[1]);
    // expected output: 2

    console.log(arguments[3]);
    // expected output: 3
}
func1(1, 2, 3);
```

### 描述

arguments对象是所有(非箭头)函数中都可用的局部变量。你可以用arguments对象在函数中引用函数的参数。此对象包含传递给函数的每一个参数，第一个参数在索引0处。例如，如果一个函数传递了三个参数，你可以以如下方式引用他们：
```
arguments[0];
arguments[1];
arguments[2];
```
参数也可以被设置
```
arguments[1] = 'new value'
```

arguments对象不是一个Array。它类似于Array，但除了length属性和索引属性之后没有任何Array属性。例如，它没有pop方法。但是它可以被转换成一个真正的Array

```
var args = Array.prototype.slice.call(arguments);
var args = [].slcie.call(arguments);

// ES2015
const args = Array.from(arguments);
const args = [...arguments];
```

::: warning
对参数使用slice会阻止某些JavaScript引擎中的优化(比如V8-[更多信息](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments))。如果你关心性能，尝试通过遍历arguments对象来构造一个新的数组。另一种方法是使用被忽视的Array构造函数作为一个函数

```
var  args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
```
:::

如果调用的参数多余正式声明的参数，则可以使用arguments对象。这种技术对于可以传递可变变量的参数的函数很有用。使用arguments.length来确定传递给函数参数的个数，然后使用arguments对象处理每个参数。要确定函数签名中(输入)参数的数量，请使用Function.length属性

#### 对参数使用typeof

typeof参数返回'object'

#### 对参数使用扩展语法

#### 属性

1. arguments.callee
    - 指向参数所属的当前执行的函数
    - 指向调用当前函数的函数
2. arguments.length
    - 传递给函数的参数变量
3. arguments[@@interator]
    - 返回一个新的Array迭代器对象，该对象包含参数中每个索引的值

[原文地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)

## 剩余参数

剩余参数语法允许我们将一个不定数量的参数表示为一个数组。

```
function sum(...theArgs) {
    return theArgs.reduce((previous, currents) => {
        return previout + current;
    })
}

console.log(sum(1, 2, 3));
// expected output: 6

console.log(sum(1,2,3,4));
expected output: 10
```
### 语法

```
function (a, b, ...theArgs) {
    // ....
}
```

### 描述

如果函数的最后一个命名参数以...为前缀，则它将成为一个由剩余参数组成的真数组，其中从0(包括)到theArgs.length(排除)的元素由传递给函数的实际参数提供。

在上面例子，theArgs将收集该函数的第三个参数(因为第一个参数被映射到a,而第二个参数映射到b)和所有后续参数

### 剩余参数和arguments对象的区别

剩余参数和arguments对象之间的区别主要有三个

+ 剩余参数只包含那些没有对应形参的是实参，而arguments对象包含了传递给函数的所有实参。
+ arguments对象不是一个真正的数组，而剩余参数是真正是的Array示例，也就是说你能够在它上面直接使用所有的数组方法，比如sort，map， forEach或pop
+ arguments对象还有一个附件的属性(入callee属性)

### 从arguments到数组

引入了剩余参数来减少由参数引起的样板代码

```
function f(a, b) {
    var normalArray = Array.prototype.slice.call(arguments)// or
    var normalArray = [].slice.call(arguments);
    // or
    var normalArray = Array.for(arguments);

    var first = normalArray.shift(); // ok
    var first = arguments.shift(); // Error
}

function f(...args) {
    var normalArray = args;
    var fist = normalArray.shift(); // ok
}
```

### 结构剩余参数

剩余参数可以被结构，这意味着他们的数据可以被姐报道不同的变量中,[结构赋值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

```
function f(...[a, b, c]) {
    return a + b + c;
}
f(1); // NAN
f(1, 2, 3); // 6
f(1,2,3,4); // 6
```

### 示例

因为theArg是个数组，所以你可以使用length属性得到剩余参数的个数

```
function fun1(...theArgs) {
    alert(theArgs.length)
}
func1(); // 弹出0
fun1(5); // 弹出1
fun1(5, 6, 7); // 弹出3
```

下例中，剩余参数包含了从第二个到最后的所有实参，然后用第一个实参依次乘以他们:

```
function multiply(mutiplier, ...theArgs) {
    return theArgs.map(function (element) {
        return mutiplier * element;
    })
}
var arr = multiply(2, 1, 2, ,3);
console.log(arr); // [2,4,6]
```

下面例子演示了你可以在剩余参数上使用任意的数组防范，而arguments对象不可以

```
function sortRestArgs(...theArgs) {
    var sortedArgs = theArgs.sort();
    return sortedArgs;
}

alert(sortRestArgs(5, 3,7, 1));

function sortArguments() {
    var sortedArgs = arguments.sort();
    return sortedArgs; // 不会执行到这里
}
alert(sortArguments(5, 3, 7, 1)); // 抛出TypeError异常：arguments.sort is not a function
```
