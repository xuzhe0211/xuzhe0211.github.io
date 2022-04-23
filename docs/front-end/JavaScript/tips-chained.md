---
autoGroup-16: Tips/方法实现
title: js的链式调用和流程控制
---

实现下面的函数

new Test('test').firstSleep(3).sleep(5).eat('dinner');

实现

```js
class T {
    tasks = []
    constructor(name) {
        let fn = () => {
            console.log(name);
            this.next();
        }
        this.tasks.push(fn);
        setTimeout(() => {
            this.next();
        })
        return this;
    }
    sleep(delay) {
        let fn = () => {
            setTimeout(() => {
                this.next();
            }, delay)
        }
        this.tasks.push(fn);
        return this;
    }
    eat(name) {
        let fn = () => {
            console.log(name);
            this.next();
        }
        this.tasks.push(fn);
        return this;
    }
    next() {
        let fn = this.tasks.shift();
        fn && fn();
    }
}
```

## 参考

[js的链式调用和流程控制](https://www.cnblogs.com/zxk5625/p/10144824.html)