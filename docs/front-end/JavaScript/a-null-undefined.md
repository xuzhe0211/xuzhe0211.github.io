---
title: JavaScript中为什么null==0为false而null>=0为true
---
最近利用空闲的时间，回顾了一下JS基础的一些知识，发现<span style="color: orange">关系运算符</span>跟相等运算符在针对null,undefined这两个特殊的数据类型时，所呈现的结果都不一样
```js
// 关系运算符
null >= 0 // true;
undefined >= 0 // false;

// 相等运算符
null === 0 // false
undefined === 0 // false;
```
我们来进行对比一下发现
```js
// Number(null) // 0 即 0 >= 0  ===true
// Number(undefined) // Nan  即NaN >= 0 ===false
null >= null // Number(null) >= Number(null) 即 0 >= 0 ===true
undefined >= undefined // Number(undefined) >= Number(undefined) 即NaN >= NaN false!(注意：NaN不等于NaN);


null == undefined // true
null == null // true
undefined == undefined // true
null == 0; // false
undefined == 0 // false
```
<span style="color: red">在关系运算符中，null、undefined会被Number()强制转换成数字类型</span>

<span style="color: red">在相等运算符中，null、undefined则不会转成数字类型，而是经过特殊处理后转化为false(当然，与自身对比，或者是null与undefined对比，即都为true)</span>

## 其他判断
1. 为什么"false == []" 和"false == ![]" 都返回true

    ```js
    console.log(false == []) // true
    console.log(false == ![]) // true
    ```
    让我简要解释下它是如何工作的。

    <span style="color: red">当我们遇到一个布尔值和一个对象进行比较时，会将这两个值转换为数字进行最后的比较，</span>

    所以它会经历这些步骤
    ```js
    // 1. Convert false to a number to get 0
    // 2. Convert [] to a number to get 0
    // 3. '0' == 0 Returns true
    console.log(false == []) // true
    // 1. The result of executing "![]" is false
    // 2. false == false Returns true
    console.log(false == ![]) // true
    ```
2. 为什么'[] == ![]' 返回true

    1 == !1的结果是什么? 'fatfish' == !'fatfish'返回是什么

    为什么空数组如此特别
    ```js
    // 1. The result of executing '![]' is false
    // 2. Next, compare '[] == false'
    // 3. Convert [] to a number to get 0
    // 4. Convert false to a number to get 0
    // 5. '0' == 0 Returns true
    console.log([] == ![])
    ```
3. 关于奇怪的try catch

    请想一想，getName执行返回的是你的好朋友 fatfish ，还是我们的好朋友medium？
    ```js
    const getName = () => {
        try {
            return 'fatfish'
        } finally {
            return 'medium'
        }
    }
    getName(); // medium
    ```
    我想你猜对了，答案是“fatfish”。不，不是！答案是“medium”。

    <span style="color: red">这是因为在 try...catch...finally语句中，finally子句无论是否抛出异常都会被执行。另外如果抛出异常，即使没有catch子句处理异常，finally子句中的语句也会被执行</span>

4. 关于箭头函数

    是的，问题很简单，你回看到fatfish被打印出来了
    ```js
    const fn = () => 'fatfish';
    console.log(fn); // fatfish
    ```
    但我想请你尝试回答这段代码会输出什么？
    ```js
    const fn = () => {};
    console.log(fn()) // undefined
    ```
    请问'{}'是最终结果嘛？

    不幸的是，这不是我们想象的那样。未定义是最后的赢家

    因为{}是fn函数的一个包含块，所以它等价于下面的代码
    ```js
    const fn = () => {

    }
    console.log(fn()) // understand
    ```
5. 为什么JSON.stringify('fatfish') !== 'fatfish'

    name1 会等于 name2嘛？
    ```js
    const name1 = JSON.stringify('fatfish');
    const name2 = 'fatfish';

    console.log(name1 === name2); // false;
    ```
    我真的很困惑，为什么name1不等于name2
    ```js
    const name1 = JSON.stringify('fatfish'); // '"fatfish"'
    const name2 = 'fatfish'

    console.log(name1 === name2); // '"fatfish"' === 'fatfish' => false
    ```
    请小心使用JSON.stringify 与字符串进行比较，它会让你陷入困境

## 资料
[JavaScript中为什么null==0为false而null>=0为true](https://blog.csdn.net/weixin_43065804/article/details/95891728)

[NaN是什么](/front-end/JavaScript/tips-isNaN.html#isnan方法的含义-如何判断一个值严格等于nan)

[ry-catch-finally和return的执行顺序](/front-end/JavaScript/base0-tfinally.html#try-catch-finally和return的执行顺序)