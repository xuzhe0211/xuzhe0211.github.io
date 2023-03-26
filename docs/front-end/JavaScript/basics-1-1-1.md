---
autoGroup-5: JS名词理解
title: 函数声明与函数表达式
---
在Javascript中定义一个函数有四种方式
- 函数声明
- 函数表达式
- ES6里箭头函数
- new Function()

## 函数声明
- 语法

    ```js
    function 函数名(参数){
        要执行的代码
    }
    ```
- 调用
    1. 函数名(参数)
    2. 函数名.call(函数名，参数)
    3. new 函数名(参数)
    4. 定时器
    5. 把函数声明编程函数表达式在调用
    6. ES6里的模板字符串
    ```js
    function fn(text) {
        console.log(text);
    }

    fn('直接调用');

    fn.call(fn, '用call调用');

    fn.apply(fn, ['用apply调用'])

    new fn('用new调用');

    setTimeout(fn('用定时器调用'));

    (function fn(text){
        console.log(text);
    })('转成函数表达式后调用');

    fn`用模版字符串调用`;   //ES6里语法
    ```
## 函数表达式
- 语法

    ```js
    var/let/const 变量=function(参数) {
        要执行的代码
    }
    ```
- 调用

    1. 函数名(参数)
    2. 函数名.call(函数名,参数)
    3. 函数名.apply(函数名,[参数])
    4. new 函数名(参数)
    5. 直接在后面加上一对小括号
    6. 定时器
    7. ES6里的模版字符串
    8. 以被赋值的形式出现（根据具体形式调用）
    ```js
    const fn=function(text){
        console.log(text);
    };

    fn('直接调用');

    fn.call(fn,'用call调用');

    fn.apply(fn,['用apply调用']);

    new fn('用new调用');

    const fn2=function(text){
        console.log(text);
    }('直接在后面加小括号调用');

    setTimeout(fn('用定时器调用'));

    fn`用模版字符串调用`;

    document.onclick=function(){
        console.log('以被赋值的形式出现也是一个函数表达式');
    };
    ```
## 函数声明与函数表达式的区别
1. 函数声明必须带有标识符(函数名称),函数表达式则可以省略
    - **表达式里的名字不能在函数外面用，只能在函数内部用**
    - <span style="color: red">函数有一个name属性，指向紧跟在function关键字之后的那个函数名。如果函数表达式没有名字，那name属性指向变量名</span>
2. 函数声明会被与解析，函数表达式不会
```js
// 1. 名字
// 函数声明必须带名字
function fn() {}
// function() {} // 报错,没有名字

// 函数表达式可以没有名字
let fn1 = function() {};
(function(){})
!function(){};

// 表达式名字的作用
let fn2 = function newFn() {
    console.log(newFn); // 可以在这里面用。但有一个作用就是在这里用递归
}
fn(); 
// newFn(); // 报错，不能在外面用

// name属性
console.log(
    fn.name, // fn
    fn1.name, // fn1 表达式没有名字，name属性指向表达式变量名
    f2.name, // newFn
)

// 2. 预解析
fn3();
function fn3() {
    console.log('fn3')
}

// fn4() // 报错， 不会被预解析
let fn4 = function() {
    console.log('fn4')
}
```

## 自执行函数
自执行函数也叫立即调用的函数表达式(IIFE).它的作用为我们不用主动的去调用函数，它会自己调用，对于做模块化、处理组件是非常有用的。

首先来看一个问题，调用函数最简单的方法就是加一对小括号，那我在末尾加一对括号后，这个函数能否调用呢
```js
function fn() {
    console.log(1)
}(); // 报错

const fn2 = function() {
    console.log('表达式执行')
}(); // 执行函数
```
函数声明不能直接调用的原因
- 小括号里只能放表达式，不能放语句
- function关键字即可以当作语句，也可以当作表达式。但js规定function关键字出现在行首，一律解释成语句

### 解决方法：不要让function出现在行首
1. 用括号把function主体括起来，转成表达式。后面加括号运行
2. 借助运算符（new + - ! ~ typeof , && ||...）---- 因为运算符会把表达式执行，执行后得出结果后才能运算

```js
//小括号里只能放表达式
(
    if(true){
        console.log(1);
    }
)//报错，括号里不能放语句

(1);
(1+2);
([1]);
({});

function fn(){
    console.log('函数声明执行');
}(1);    //符合语法，但是函数不会执行


//想要执行就必需把函数声明转成表达式，而小括号里只能放表达式，利用这个特征把函数放在一对括号里，再加一对括号就能执行
(function fn(){
    console.log('函数声明执行');
})();
//或者这样也可以执行
(function fn(){
    console.log('函数声明执行');
}());
```
只要把函数声明转成表达式，再加上括号就可以声明。那就有很多稀奇古怪的方式来执行函数
```js
0+function(text){
    console.log(text);
}('与数字相加变成表达式');

true&&function(text){
    console.log(text);
}('利用逻辑运算符变成表达式');

false||function(text){
    console.log(text);
}('利用逻辑运算符变成表达式');

0,function(text){
    console.log(text);
}('利用逗号运算符变成表达式');

//二进制位取反运算符
~function(text){
    console.log(text);
}('前面加上+-!~变成表达式');

new function(text){
    console.log(text);
}('利用new运算符变成表达式');

typeof function(text){
    console.log(text);
}('利用typeof运算符变成表达式');
```