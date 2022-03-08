---
autoGroup-16: Tips/方法实现
title: Settimeout第三个或者更多个参数
---
在使用setTimeout()方法的时候，都是传两个参数一个参数是函数，第二个参数是毫秒数，表示异步处理过多少毫秒执行第一个函数参数.

后来有看到有人给setTimeout()传第三个参数，不清楚传第三个参数是干嘛的，于是就学习了一下。第三个或者更多参数都是第一个函数的参数,详情请看https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout

```
function test(x, y) {
  console.log(x, y)
}

setTimeout(test, 1000, 2, 3)
```
上面的例子将传2，3给test函数并打印出来。

**注意：setTimeout()函数返回值是一个数值，每次执行返回值不一样， 是唯一的标识，方便clearTimeout()函数对该表示的定时器进行删除**

## 资料
[原文](https://www.cnblogs.com/erduyang/p/7384622.html)