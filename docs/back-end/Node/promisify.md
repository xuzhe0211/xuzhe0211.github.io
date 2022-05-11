---
title: promisify函数
---

::: tip
将原本需要通过传入回调参数来实现回调执行（或者叫同步执行）改为利用promise的.then的方式来调用,从而实现逻辑上的同步操作。
:::

## 异步函数promise化

```js
// 第一种
module.exports = function promisify(fn) {
    return function (...args) {
        return new Promise(function (resolve,reject) {
            args.push(function (err,...arg) {
                if(err){
                    reject(err)
                }else{
                    resolve(...arg);
                }
            });
            fn.apply(null, args);
        })
    }
}
// 第二种
module.exports = function promisify(fn) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            let callback = function(...args) {
                resolve(args); // 注意不能用...运算符 只能传入一个参数
            }
            fn.apply(null, [...args, callback]);
        })
    }
}
```

## 实例

### 例子1

```js
// foo 可以是任何需要调用回调函数的函数
function foo(str1, str2, callback) {
    setTimeout(() => {
        console.log('setTimeout');
        // callback函数是通过最后一个参数这个位置来识别的，与callback名字无关
        callback(str1, str2)
    }, 1000);
}

// 这里的agent已经不是foo函数，而是我们在promisify中返回的自定义匿名函数
// 所以不需要纠结是否传入callback函数。
let agent = promisify(foo);

agent('hello', 'world').then(res => {
    console.log(res);
})
```
输出结果：

```js
setTimeout
[ 'hello', 'world' ]
```


### 例子2

```js
function fun(arg, callback) {
    try {
        // aaa()
        callback(null, 'result')
    } catch (error) {
        callback(error)
    }
    console.log('fs ' + arg)
}

const promise = promisify(fun)

// await方式
setTimeout(async () => {
    try {
        await promise('./aaa.txt', (err, data) => {
            console.log(err ? 'read err' : `${data}1`);
        })
    } catch (error) {
        console.log('catch err', error)
    }
})
```
