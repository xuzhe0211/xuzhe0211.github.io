---
autoGroup-0: 基础知识
title: Nodejs中的this详解
---
<span style="color: red">以下内容都是关于在nodejs中的this而非javascript中this,nodejs中的this和在浏览器中javascript中的this是不一样的</span>

- 在全局中的this

    ```js
    console.log(this); // {}
    this.num = 10;
    console.log(this.num); // 10
    console.log(global.num); // umdefined
    ```
    <span style="color: red">**全局中的this默认的是空对象。并且在全局中this与global对象没有任何的关系，那么全局中的this究竟指向的是谁？(module.export)**</span>
- 在函数中的this

    ```js
    function fn() {
        this.num = 10;
    }
    fn();
    console.log(this); // {}
    console.log(this.num); // undefined
    console.log(global.num); // 10
    ```
    <span style="color: red">在函数中的this指向的是global对象，和全局中的this不是同一个对象，简单来说，**你在函数中通过this定义的变量就是相当于给global添加了一个属性, 此时与全局中的this已经没有关系了**</span>
    ```js
    // 示例
    function fn() {
        function fn2() {
            this.age = 18;
        }
        fn2();
        console.log(this); // global
        console.log(this.age); //. 18;
        console.log(global.age); // 18
    }
    fn();
    // 对吧，在函数中this指向的是global
    ```
- 构造函数中的this

    ```js
    function Fn() {
        this.num = 998;
    }
    var fn = new Fn();
    console.log(fn.num); // 998;
    console.log(global.num); // undefined
    ```
    <span style="color: red">在构造函数中this指向的是它的实例，而不是global</span>

## 全局中的this指向的是module.exports
我们现在可以聊聊关于全局中的this了，说到全局中的this，其实和Nodejs中的作用域有一些关系,如果你想了解Nodejs中关于作用域的信息可以看[探讨Nodejs中的作用域问题](https://blog.csdn.net/u011927449/article/details/107912099)

```js
this.num = 10;
console.log(module.exports); // {num: 10}
console.log(module.exports.num)
```

## 相关
[一道经典的this面试题](/front-end/interview/demo3-this.html)