---
autoGroup-0: 概念
title: 递归--函数递归优化，JavaScript中应该如何写递归？
---
:::danger
一些同学可能一看到递归就想到了O(logn)，其实并不是这样，递归算法的时间复杂度本质上是要看: **递归的次数 * 每次递归中的操作次数**。

1:1 2:1
菲波那切数列：从第三项起，任何一个数字均是其前两个数字的和数
:::
```js
F(0) = 0, F(1) = 1;
F(N) = F(N - 1) + F(N - 2), N > 2; 
```
以最基础的菲波那切数列为例，这个题很经典了，递归和dp的数学例子，也是家常便饭
```js
function fib(num) {
    console.log(i++);
    if (num == 1 || num === 2) {
        return 1;
    }
    return fib(num - 1) + fib(num - 2) // O(2n)
}
```
最普通的递归存在大量计算,所以，最优解是使用动态规划来做，用空间换时间
```js
function fib(num) {
    const dp = new Array(num + 1);
    dp[1] = 1;
    dp[2]= 1;
    for (let i = 3; i < n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[num];
}
```
在很多情况下，递归比dp更容易写出来，如果你恰好想用递归来解决问题，采用缓存来递归剪枝也可以得到最优解

恰巧前端非常多的与缓存打交道，也希望你在一些这些递归剪枝方法中，掌握缓存--这个每一个jser的必修课

:::tip
剪枝法的思想就是将可以确定不需要考虑的元素剪掉，每次迭代剪掉一些，直到找到最终解
:::
[剪枝法--中位数](https://blog.csdn.net/qq_38595253/article/details/123744045)
## 闭包缓存
写递归的时候往往需要一个全局变量来辅助，这个变量大多数情况下就是缓存
```js
const m = Object.create(null); // 使用全局变量存储
function fib(num) {
    if (m[num]) {
        return m[num];
    }
    if (num == 1 || num === 2) {
        return 1;
    }
    return m[num] = fib(num - 1) + fib(num - 2);
}
```
全局变量造成全局污染是我们不想见的，我们更希望这个递归函数具备独立解决问题的能力

所以我们采用函数嵌套的方式，将这个变量塞到里面
```js
function fib(num) {
    const m = Object.create(null);
    function _fib(num) {
        if(m[num]) {
            return m[num];
        }
        if (num === 1 || num === 2) {
            return 1;
        }
        return n[num] = _fib(num - 1) + _fib(num - 2)
    }
    return _fib(num)
}
```
## 参数默认值，尾递归
用于区分第一次调用和后续调用，使用参数默认值也是一种常见方式
```js
function fib(num, m = Object.create(null)) { // //第一次使用的时候是1个参数 后续都是2个参数
    if(m[num]) return m[num];
    let res;
    if (num == 1 || num === 2) {
        return 1;
    }
    else {
        if (m[num]) {
            return m[num]
        } else {
            return m[num] = fib(num - 1) + fib(num - 2)
        }
    }
}
```
## 自记忆函数memoization
JS中，函数 与 对象的区别，只有函数多一个 invokable 属性，表示其是可调用的，利用该特性，可以在函数属性上做缓存。

不涉及到随机数、网络请求等，一种自变量（入参），往往只对应着一个（返回值）。
```js

function fib(num){
  fib.m = fib.m || Object.create(null);
  if(fib.m[num]) return fib.m[num];

  
  if(num === 1  || num === 2){
    return 1;
  }
  else
    return fib.m[num] = fib(num-1) + fib(num-2);
}
```
## 其他
[扁平数组和树形结构转换](/front-end/Code/tree-02.html#转换算法)

[JavaScript 如何查找对象中某个 value 并返回路径上所有的 key值？](/front-end/interview/coding.html#javascript-如何查找对象中某个-value-并返回路径上所有的-key值)
## 资料
[fly163学习](https://www.fly63.com/)

[关于递归算法的时间复杂度，你还不够了解！](https://www.bilibili.com/read/cv12382768)