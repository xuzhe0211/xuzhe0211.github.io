---
autoGroup-16: Tips/方法实现
title: 关于setInterval不准确问题
---

在js中如果打算使用setInterval进行倒数，计时等功能有可能是不准确的，因为setInterval的回调函数并不是到时后立即执行，而是等系统计算空闲下来后才会执行。而下一次触发时间则是在setInterval回调函数执行完毕之后才开始计时

所以如果setInterval内执行的计算过于耗时，或者有其他耗时任务在执行，setInterval的计时会越来越不准，延时很厉害

```
var startTime = new Date().getTime();
var count = 0;
setInterval(() => {
    var i = 0;
    i++
},0)
setInterval(() => {
    count++;
    console.log(new Date().getTime() - (startTime + count * 1000))
}, 1000)
```
输出一下，延时会越来越大

![setInterval](./images/4089724-b57a457a21c94336.jpg)

为了js里可以使用相对准确的计时功能，我们可以用setTimeout代理setInterval,并在每次触发及时修正，可以减少累积的误差

```
var startTime = new Date().getTime()
     var count = 0;
     setInterval(function(){
         var i =0;
         while(i++ < 100000000);
     }, 0);
     function fixed() {
        count++;
        var offset = new Date().getTime() - (startTime + count * 1000);
        var nextTime = 1000 - offset;
        if (nextTime < 0) nextTime = 0;
        setTimeout(fixed, nextTime);
        
        console.log(new Date().getTime() - (startTime + count * 1000));
    }
    setTimeout(fixed, 1000);
```

## 资料
[原文](https://www.jianshu.com/p/f5bd2ec8fc1e)