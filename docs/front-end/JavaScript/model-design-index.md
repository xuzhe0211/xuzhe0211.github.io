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
- 目标

    增强已有方案

- 应用场景

    ts装饰器、react高级组件
- 代码示例

    就像高阶组件一样，使用了hoc包裹后我们可以给组件添加一些额外的能力，例如css样式或className，不适用也不影响原组件使用
    ```js
    class Decorator {
        construtor(component) {
            this.component = component;
        }
        upgrade() {
            this.component.className = 'pro-botton';
            return this.component;
        }
    }
    new Decorator(new Button()).upgrade();
    ```

[参考地址](/front-end/JavaScript/ts-anotation.html)

## 代理模式
- 目标

    为对象架设拦截，拒绝直接访问

- 应用场景

    proxy、Object.defineProperty、事件代理

- 代码示例

    像王者农药，在没有防沉迷系统之前，玩家是可以直接登录游戏的，上了该系统之后就不允许玩家直接进行登录了，因此需要对游戏类进行下拦截，在符合时放开
    ```js
    class Game {
        start() {
            console.log('开始游戏')
        }
    }
    class User {
        constructor(age) {
            this.age = age;
        } 
        login(game) {
            game.start(this);
        }
    }
    class ProxyGame {
        start(player) {
            if(player.age < 14) {
                console.error('放弃吧，你不配')
            } else {
                new Game().start();
            }
        }
    }
    const su = new User(27);
    su.login(new ProxyGame());
    ```
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
## 命令模式
<span style="color: red">简单来说，命令模式将方法、数据封装到单一的对象中，对调用方与执行方进行解耦，达到职责分离的牡蛎</span>

以顾客在餐厅吃饭为例子

- 顾客点餐时，选择想吃的才，提交一份点餐单
- 厨师收到这份菜单后根据内容做菜

<span style="color: blue">期间，顾客和厨师之间没有见面交谈，而是通过一份点餐单来形成联系，这份点餐单就是一个命令对象，这样的交互模式就是命令模式</span>



[命令模式](/front-end/JavaScript/a-edit-revocation-revert.html#功能分析)

## 资料
[大厂设计模式](/front-end/interview/dachanng3.html#js的四种设计模式)

[策略模式](https://www.cnblogs.com/yuzhongyu/p/14203862.html)

[前端需要了解的9种设计模式](https://zhuanlan.zhihu.com/p/133263261)