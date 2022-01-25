---
autoGroup-16: Tips/方法实现
title: js的链式调用和流程控制
---

实现下面的函数

new Test('test').firstSleep(3).sleep(5).eat('dinner');

实现

```
function Test(name) {
    this.task = [];
    let fn = () => {
        console.log(name);
        this.next();
    }
    this.task.push(fn);
    setTimeout(() => {
        this.next();
    })
    return this;
}

Test.prototype.firstSleep = function(timer) {
    console.time('firstSleep');
    let that = this;
    let fn = () => {
        setTimeout(() => {
            console.timeEnd('firstSleep');
            that.next();
        }, timer * 1000)
    }
    this.task.unshift(fn);
    return this;
}

Test.prototype.sleep = function(timer) {
    console.time('sleep');
    let that = this;
    let fn = () => {
        setTimeout(() => {
            console.timeEnd('sleep');
            that.next();
        }, timer * 1000)
    }
    this.task.push(fn);
    return this;
}

Test.prototype.eat = function(dinner) {
    let that = this;
    let fn = () => {
        console.log(dinner);
        that.next();
    }
    this.task.push(fn);
    return this;
}

Test.prototype.next = function(dinner) {
    let fn = this.task.shift();
    fn && fn();
}
```

## 参考

[js的链式调用和流程控制](https://www.cnblogs.com/zxk5625/p/10144824.html)