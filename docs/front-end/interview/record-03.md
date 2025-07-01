---
autoGroup-0: 面试记录
title: 现在面试都问什么「字节、蚂蚁、美团、滴滴面试小记」
---
## 字节
### 一面
- typeof类型判断情况

    ```js
    typeof 1 // Number
    typeof '1' // String
    typeof true // Boolean
    typeof undefined // undefined
    typeof null // object;
    typeof {} // object;
    typeof [] // Object
    typeof function() {} // function
    ```
    [参考](/front-end/JavaScript/tips-typeof.html)
- 代码执行请

    ```js
    let a = 0, b = 0;
    function fn(a) {
        fn = function fn2(b) { // 重写 闭包
            alert(++a+b)
        }
        alert(a++);
    }
    fn(1); // 1
    fn(2); // 5

    alert(a++); // 0
    ```

- 编程题：实现add方法

    ```js
    const timeout = time => new Promise(resolve => setTimeout(resolve, time));

    // 实现
    class Scheduler {
        // 方法一
        constructor() {
            this.curCount = 0;
            this.limitMax = 2;
            this.tasks = [];
        }
        add(fn) {
            this.tasks.push(fn)
        }
        start() {
            for(let i = 0; i < this.limitMax; i++) {
                this.next();
            }
        }
        next() {
            if(this.tasks.length && this.limitMax > this.curCount) {
                this.curCount++;
                this.tasks.shift()().then(() => {
                    this.curCount--;
                    this.next();
                })
            }
        }
        // 方法二
        constructor() {
            this.tasks = [];
            this.limitMax = 2;
        }
        async add(promiseFunc) {
            if(this.tasks.length >= this.limitMax) {
                return Promise.race(this.tasks).then(() => this.add(promiseFunc))
            }
            let rt = promiseFunc().then(() => this.tasks.splice(this.tasks.indexOf(rt), 1));
            this.tasks.push(rt);
            return ret;
        }
    }
    // demo
    const scheduler = new Scheduler();
    const addTask = (time, order) => {
        scheduler.add(() => timeout(time).then(() => {
            console.log(order);
        }))
    }
    // 限制统一时刻只能执行2个task
    addTask(4000, '1')
    addTask(3500, '2')
    addTask(4000, '3')
    addTask(3000, '4')
    //4秒后打印1
    //3.5秒打印2
    //3进入队列，到7.5秒打印3 
    //...
    ```
    [参考](/front-end/interview/coding2.html#promise并行限制1)
    
- require('xxx')查找包过程
    
    [require('xxx') 查找包过程](/front-end/engineering/base-require.html)

- 判断是否有环
    ```js
    const fn = head=> {
        let set = new Set();
        let cur = head;
        while(cur) {
            if(set.has(cur)) return true;
            set.add(cur);
            cur = cur.next;
        }
        return false;
    }
    ```
7. Vue use实现逻辑
8. vue中nextTick实现原理
9. vue组件中的data为什么是一个方法

### 二面
- 聊Fultter、React Native、对比、绘制、原生API、性能考虑、webView、静态文件分包加载更新、本地静态文件服务器
- 编程手写:路径添加删除的数据结构和方法
- 编程手写：Alert组件设计，避免多次重复弹出
- [AMD、CDM、UMD、Commonjs、ES Module模块化对比，手写兼容多种模块](/front-end/JavaScript/basics-module-1.html)
- 手写 Proxy 实现数据劫持
- 手写 deepClone
- 聊项目难点

## 美团
- 部分翻转

    ```js
    // 输入
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9,10];
    const n = 3;
    // 输出
    [10, 7, 8,9,4,5,6,1,2,3]
    // 解法--单指针
    const fn = (arr, n) => {
        let newArr = [];
        let left = 0;
        let len = arr.length;
        while(left < len) {
            let temp;
            if(left + 3 > len) temp = arr.slice(left)
            temp = arr.slice(left, left + 3);
            newArr.push(temp.reverse());
            left += 3;
        }
        return newArr.reverse().flat()
    }
    ```
- 数组去重

    ```js
    // 数组去重
    // 1. Set
    // 2. filter O(n2)
    // 3. Map
    // 4. js 对象
    const arr = [1, 1, 2, 3, '1', x, y, z];
    const x = { a: 100 }
    const y = { a : 100 }
    const z = x
    const arr2 = [x, y, z]

    function uniq(arr) {
        // TODO:
        let map = {};
        return arr.filter((item, index, arr) => {
            return map.hasOwnProperty(typeof item + item) ? false : map[typeof item + item] = true
        })
    }
    ```
    [JavaScript 数组去重的方法（12 种方法，史上最全）](/front-end/interview/record-unique.html)

- 如何判断是new还是函数调用

    ```js
    function foo(){
        // new 调用 or 函数调用
        if(this instanceof foo) {
            console.log('new')
            return;
        }
        console.log('直接调用')
    }
    new foo();
    foo();

    // 思路1： new.target;
    // 思路2： instanceof;
    // 思路3：constructor
    ```
- 以下函数调用会发生什么情况

    ```js
    function foo() {
        foo();
    }

    function foo2() {
        setTimeout(() => {
            foo2();
        }, 0);
    }

    foo();    //会有问题？内存溢出 
    foo2();  // 会有问题？不会内存溢出 内存泄露
    // 什么原因？
    ```
    [内存溢出VS内存泄露](/front-end/JavaScript/basics-3-0.html)

- requestAnimationFrame 与 requestIdleCallback 含义及区别
- 聊chrome进程模型，新开一个tab会有那些线程
- 聊Composition layers是什么？独立的layer有什么好处
- 一个透半明背景图片下面有一个按钮，如果发生点击事件后，怎么让按钮触发事件响应

## 资料
[原文](https://mp.weixin.qq.com/s/t8Id1E0tSMxcqiCs_O6uwg)

[github](https://github.com/lvisei/ant-fe-interview)

[博客](https://github.com/lvisei/blog)