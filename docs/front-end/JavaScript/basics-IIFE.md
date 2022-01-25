---
autoGroup-5: JS名词理解
title: JS的IIFE
---

## 定义
IIFE：Immediately Invoked Function Expression 意为立即调用的函数表达式，也就是说，声明函数的同时立即调用函数。

```
// 不采用IIFE的函数声明和函数调用
function foo() {
    var a = 10;
    console.log(a);
}
foo();

//IIFE的函数调用
(function() {
    var a = 10;
    console.log(a);
})()
```

函数的声明和IIFE的区别在于，在函数的声明中，我们首先看到的是function关键字，而IIFE我们首先看到的是左边的(.也就是说，使用一对()将函数声明括起来，使得JS编译器不在认为这是一个函数声明，而是一个IIFE,即需要立即执行的声明函数。

二者达到的目的是相同的，都是声明了一个函数foo随后调用函数foo。

## 为什么需要IIFE

如果只是为了执行一个函数，显然IIFE所带来的好处有限。实际上，IIFE的出现弥补JS在scope方面的缺陷:JS只有全局作用域(global scope)、函数作用域(function scope)。从ES6开始才有块级作用域。对比现在流行的其他面向对象的语言可以看出，JS在访问控制那么脆弱!那么如何实现作用域的隔离呢？在JS中，只有function, 只有function才能实现作用域隔离，因此如果要将一段代码中的变量、函数等定义隔离出来，只能将这段时间封装在一个函数中

在我们通常的理解中，将代码封装到函数中的目的是为了复用。在JS中，当然声明函数的目的在大多数情况下也是为了复用，但是迫于JS作用域控制手段的贫乏，我们也经常看到只使用一次的函数:这通常的目的是为了隔离作用域！既然只能只使用一次，那么立即执行好了，既然只是用一次，函数的名字也省略了，这就是IIFE的由来

## IIFE的常见形式
根据最后表示函数执行的一对()位置的不同，常见的IIFE写法有两种
```
(function(a) {
    console.log(a)
})('1')

// 第二种
(function(a) {
    console.log(a)
}(2))
```

这两种写法效果完全一样，使用哪种写法取决于你的风格，貌似第一种比较常见

其实IIFE不限于()表现形式[1]，但是还是遵守约定俗称的习惯比较好

## IIFE的函数名和参数
根据《You Don’t Know JS:Scope & Clouses》[2]的说法，尽量避免使用匿名函数。但是IIFE确实只执行一次，给IIFE起个名字有些画蛇添足了。如果非要给IIFE起个名字，干脆就叫IIFE好了。
IIFE可以带（多个）参数，比如下面的形式：
```
var a = 2;
(function IIFE(global) {
    var a = 3;
    console.log(a);
    console.log(global.a)
})(window)
console.log(a)
```

## IIFE构造单例模式

JS的模块就是函数，常见的定义如下
```
function myModule() {
    var someThing = '123';
    var otherThing = [1,2,3]；

    function doSomeThing() {
        console.log(someThing);
    }

    function doOtherThing() {
        console.log(otherThing);
    }

    return {
        doSomeThing:doSomeThing,
        doOtherThing:doOtherThing
    }
}

var foo = myModule();
foo.doSomeThing();
foo.doOtherThing();

var foo1 = myModule();
foo1.doSomeThing();
```

如果需要一个单例模式，可以利用IIFE
```
var myModule = (function() {
    var someThing = "123";
  var otherThing = [1,2,3];

  function doSomeThing(){
    console.log(someThing);
  }

  function doOtherThing(){
    console.log(otherThing);
  }

  return {
    doSomeThing:doSomeThing,
    doOtherThing:doOtherThing
  }
})()

myModule.doSomeThing();
myModule.doOtherThing();
```

## 小结
IIFE的目的是为了隔离作用域，防止污染全局命名空间

[IIFE立即调用函数表达式](https://developer.mozilla.org/zh-CN/docs/Glossary/IIFE)