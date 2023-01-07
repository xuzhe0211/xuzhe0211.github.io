---
autoGroup-1: 面试问题示例
title: 一道经典的this面试题
---
```js
var number = 5;
var obj = {
    number: 3,
    fn1: (function () {
        var number;
        this.number *= 2;
        number = number * 2;
        number = 3;
        return function () {
            var num = this.number;
            this.number *= 2;
            console.log(num);
            number *= 3;
            console.log(number);
        }
    })()
}
var fn1 = obj.fn1;
fn1.call(null);
obj.fn1();
console.log(window.number);
// node环境中 -- NaN、9、3、27、5
// 浏览器环境--10、9、3、27、20
```
1. 首先匿名自执行函数运行后，变为

    ```js
    var number = 5;
    var obj = {
        number: 3,
        fn1: function() {
            var num = this.number;
            this.number *= 2;
            console.log(num);
            number *= 3;
            console.log(number);
        }
    }
    // 此时
    this.number *= 2; // this为window,所以window.number = 10;
    number = number * 2; // 那么,number为NaN
    number = 3; // number为3；
    // so
    window.number = 10;
    number = 3;
    ```
    

## 资料
[一道经典的this面试题](https://www.jianshu.com/p/bd6e9c692fbc)

[如何准确判断this指向的是什么？](https://zhuanlan.zhihu.com/p/355523685)

[Node中this](/front-end/JavaScript/base0-a-this-node.html)