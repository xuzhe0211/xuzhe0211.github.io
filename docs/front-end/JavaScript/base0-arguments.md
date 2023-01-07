---
autoGroup-0: 基础知识
title: JS 的形参与实参
---
在《Javascript权威指南》中这样定义：<span style="color: blue">参数有形参(parameter)和实参(arguments)的区别，形参相当于函数中定义的变量，实参是在运行时的函数调用时传入的参数</span>

说白了就是，形参就是函数声明时的变量，实参是我们调用该函数时传入的具体参数。

```js
// 声明函数add时，a、b就是形参。调用函数add(1,2),1,2就是实参
function add(a, b) {
    return a + b;
}
add(1, 2)
```
1. <span style="color: blue">实参为原始值。当实参为原始值时，此时形参为实参的拷贝。因此，函数体内形参值的改变并不会影响实参</span>

    ```js
    function test(str) {
        str = 'chinese';
        return str;
    }
    const str1 = 'china';
    const str2 = test(str1);
    console.log(str1); // china;
    console.log(str2); // chinese;
    ```
2. <span style="color: blue">实参为引用值。当实参为引用值时,此时形参为实参内存地址的拷贝。因此，函数体内形参值的变化在一定情况下会影响实参</span>

    ```js
    function test(obj) {
        // 形参obj的值实际上为实参obj的内存引用，及形参和实参同时指向同一个内存地址
        obj.name = 'typescript'; // 此时改变的为形参与实参同时指向的那个内存地址中的值
        // 所以此时也到值实参的name属性发生了变化
        obj = { // 此时对形参obj进行重新赋值，给与了它一个新的内存地址
            name: 'react', // 从此之后的形参将于实参完全解绑，两者之间不在存在联系
            star: 13000;
        }
        obj.star = 20000; // 所以这里仅仅是改变了形参的star属性
        return obj;
    }
    const obj1 = {
        name: 'javascript',
        start: 10000,
    }
    const obj2 = test(obj1);
    console.log(obj1); // {name: 'typescript', star: 10000}
    console.log(obj2); // {name: 'react', star: 20000}
    ```


## 拓展
**arguments对象的length属性显示实参的个数，函数的length属性显示形参的个数**

Javascript定义了arguments对象，用于在函数内部执行，使用argument.length 可以快速获取函数的的实参个数，使用arguments[n]可以获取实参的值

为了预防用户随意传递参数，可以在函数内部判断形参和实参的个数是否一致

```js
// 判断形参和实参个数是否一致
function add(a, b) {
    if(add.length === arguments.length) { // 判断形参个数如果和实参个数不一致，则抛出错误
        throw new Error('形参与实参个数不一致，请重新调用函数!');
    } else {
        return a + b;
    }
}
try {
    console.log(add(2, 3, 4)); // 尝试调用函数，形参和实参个数不一致，会抛出错误提示
} catch(e) {
    console.log(e.message) // 捕获异常信息
}
```


## 资料
[JS 的形参与实参](https://juejin.cn/post/6844903959124033543)

[深入理解js中函数中的形参与实参](https://blog.csdn.net/liwenfei123/article/details/71941367)