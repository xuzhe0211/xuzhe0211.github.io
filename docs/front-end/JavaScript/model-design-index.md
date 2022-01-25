---
autoGroup-14: 设计模式
title: 常用模式
---

## 发布订阅者模式
```
let pubSub = {
	subs: [],
    subscribe(key, fn) {
    	if(!this.subs[key]) {
        	this.subs[key] = [];
        }
        this.subs[key].push(fn);
    },
    publish(...arg){
    	let args = arg;
        let key = args.shift();
        let fns = this.subs[key];
        if (!fns || fns.length <= 0) return;
        for (let i = 0, len = fns.length; i< len; i++) {
        	fns[i](args);
        }
    },
    unSubscribe(key) {
    	delete this.subs[key];
    }
}
//测试
pubSub.subscribe('name', name=> {
	console.log(`your name is ${name}`);
})
pubSub.subscribe('gender', gender => {
	console.log(`your name is ${gender}`);
})
pubSub.publish('name', 'leaf33');
pubSub.publish('gender', '18')

// 简单实现
let obj = {};
const $on = (name, fn) => {
    if (!obj[name]) {
        obj[name] = [];
    }
    obj[name].push(fn);
}
const $emit = (name, val) => {
    if (obj[name]) {
        obj[name].map(fn => {
            fn(val)
        })
    }
}
```

## 单例模式
```
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
```
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
[策略模式](https://www.cnblogs.com/yuzhongyu/p/14203862.html)