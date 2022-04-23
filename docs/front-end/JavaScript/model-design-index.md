---
autoGroup-14: 设计模式
title: 常用模式
---

## 发布订阅者模式
[参考](/front-end/interview/dachang2.html#简单)

[前端JS高频面试题---1.发布-订阅模式](https://segmentfault.com/a/1190000039732840)
```js
class EventEmitter {
    constructor() {
        this.events = {};
    }
    // 实现订阅
    on(type, callBack) {
        if (!this.events[type]) {
            this.events[type] = [callBack];
        } else {
            this.events[type].push(callBack);
        }
    }
    // 删除订阅
    off(type, callBack) {
        if (!this.events[type]) return;
        this.events[type] = this.events[type].filter((item) => {
            return item !== callBack;
        });
    }
    // 只执行一次订阅事件
    once(type, callBack) {
        function fn(...args) {
            callBack(...args);
            this.off(type, fn);
        }
        this.on(type, fn);
    }
    // 触发事件
    emit(type, ...rest) {
        this.events[type] &&
        this.events[type].forEach((fn) => fn.apply(this, rest));
    }
}
const event = new EventEmitter();

const handle = (...rest) => {
  console.log(rest);
};

event.on("click", handle);

event.emit("click", 1, 2, 3, 4);

event.off("click", handle);

event.emit("click", 1, 2);

event.once("dbClick", () => {
  console.log(123456);
});
event.emit("dbClick");
event.emit("dbClick");
```

## 单例模式
```js
class CreatUser{
	constructor(name) {
        this.name = name;
        this.getName();
    }
    getName() {
    	console.log(this.name)
    }
}
var ProxyMode = (function(){
	var instance = null;
    return function(name) {
    	if(!instance) {
        	instance = new CreatUser(name);
        }
        return instance;
    }
})()

var p = new ProxyMode(1);
p.getName(); // 1

var p1 = new ProxyMode(2);
p1.getName(); // 1

```

## 装饰器模式

[参考地址](/front-end/JavaScript/ts-anotation.html)

## 策略模式
策略模式指对象有某个行为，但是在不同的场景中，该行为有不同的实现方案 比如选项的合并策略
```js
var strategies = {
    's': function(salary) {
        return salary * 4
    },
    'A': function(salary) {
        return salary * 7
    },
    'B': function(salary) {
        return salary * 2
    }
}
var calculateBonus = function(level, salary) {
    return strategies[level](salary)；
}
console.log(calculateBonus('S', 20000)); // 输出 80000
```

[大厂设计模式](/front-end/interview/dachanng3.html#js的四种设计模式)

[策略模式](https://www.cnblogs.com/yuzhongyu/p/14203862.html)

[前端需要了解的9种设计模式](https://zhuanlan.zhihu.com/p/133263261)