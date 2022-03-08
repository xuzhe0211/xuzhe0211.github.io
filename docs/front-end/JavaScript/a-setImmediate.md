---
title: js中setImmediate是干嘛的
---

> 这个api你可以看成是setTimeout，虽然在调用时机上不同，但基本可以认为是一样的，毕竟也只有IE才支持这个api。

该方法用来把一些需要长时间运行的操作放在一个回调函数里，在浏览器完成后面的其他语句后，就立刻执行这个回调函数
```
var immediateID = setImmediate(func, [param1, param2, ...]);
var immediateID = setImmediate(func)
```
- immediateID 是这次setImmediate方法设置的唯一ID,可以作为 window.clearImmediate 的参数.
- func 是将要执行的回调函数

参数param1 param2...都会直接传给参数func

window.clearImmediate方法可以用来取消通过setImmediate设置的将要执行的语句，就想window.clearTimeout对英语window.setTimeout一样。

该方法可以用来替代setTimeout(0)方法来滞后完成一些需要占用大量cpu时间的操作，下面的Javascript可以用来兼容那些不支持setImmediate方法的浏览器
```
if(!window.setImmediate) {
  window.setImmediate = function(func, args){
    return window.setTimeout(func, 0, args);
  };
  window.clearImmediate = window.clearTimeout;
}
```
## 资料
[setImmediate](https://www.jianshu.com/p/d207df1ca19e)