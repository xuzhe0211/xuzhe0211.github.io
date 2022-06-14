---
title: 大厂coding2
---
## 实现一个异步求和函数
[实现一个异步求和函数](/front-end/interview/coding.html#已知一个函数asyncadd-实现一个函数sum达到预期效果)

## 实现颜色转换rgb(255,255,255) -> '#FFFFFF'的多种思路
仔细观察本题，本题可分为三个步骤：

- 从 rgb(255, 255, 255) 中提取出 r=255 、 g=255 、 b=255
- 将 r 、 g 、 b 转换为十六进制，不足两位则补零
- 组合 #
```js
// 组合一---这个就可以
function rgb2hex(sRGB) {
    var rgb = sRGB.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
    return rgb.reduce((acc, cur) => {
        var hex = (cur < 16 ? '0' : '') + Number(cur).toString(16);
        return acc + hex
    }, '#').toUpperCase();
}

// 测试
rgb2hex('rgb(255, 255, 255)'); // '#FFFFFF';
rgb2hex('rgb(16, 10, 255)'); // '#100AFF'

// 组合二
function rgb2hex(sRGB) {
    const rgb = sRGB.match(/\d+/g);
    const hex = n => {
        return ('0' + Number(n).toString(16)).slice(-2); // slice(-2) 获取字符串最后两个字符
    }
    return rgb.reduce((acc, cur) => acc + hex(cur), '#').toUpperCase();
}
// 测试
rgb2hex('rgb(255, 255, 255)')
// "#FFFFFF"
rgb2hex('rgb(16, 10, 255)')
// "#100AFF"
```
## 如何模拟实现Array.prototype.splice
```js
Array.prototype._splice = function(start, deleteCount, ...addList) {
    if(start < 0) {
        if(Math.abs(start) > this.length) {
            start = 0;
        } else {
            start += this.length;
        }
    }
    if(typeof deleteCount === 'undefined') {
        deleteCount = this.length - start;
    }
    const removeList =  this.slice(start, start + deleteCount)
    const right = this.slice(start + deleteCount)
    let addIndex = start

    addList.concat(right).forEach(item => {
        this[addIndex] = item
        addIndex++
    })
    this.length = addIndex

    return removeList
}
```

## 输出以下代码运行结果，为什么？如果希望每隔 1s 输出一个结果，应该如何改造？注意不可改动 square 方法 
```js

const list = [1, 2, 3]
const square = num => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num)
    }, 1000)
  })
}

function test() {
  list.forEach(async x=> {
    const res = await square(x)
    console.log(res)
  })
}
test()
```
<span style="color: red">forEach是不能阻塞的，默认是请求并行发起,所以同时输出1、4、9</span>

串行解决方案
```js
async function test() {
    for(let i = 0; i < list.length; i++) {
        const x = list[i];
        const res = await square(x);
        console.log(res);
    }
}
```
当然，也可以用for of语法，就是帅：
```js
async function test() {
    for(let x of list) {
        const res = await square(x);
        console.log(res);
    }
}
```
还有一个更硬核点的，也是axios源码里所用到的，利用promise本身的链式调用来实现串行
```js
let promise = Promise.resolve();
function test(i = 0) {
    if(i === list.length) return;
    promise = promise.then(() =>  square(list[i]));
    test(i + 1);
}
test();
```
## 实现一个批量请求函数 multiRequest(urls, maxNum)
要求如下：

- 要求最大并发数 maxNum
- 每当有一个请求返回，就留下一个空位，可以增加新的请求
- 所有请求完成后，结果按照 urls 里面的顺序依次打出

```js
function multiRequest(urls, maxNum) {
    let ret = [];
    let i = 0; 
    let resolve;
    const promise = new Promise(r => resolve = r); // 第一种使用
    // const promise = new Promise(resolve => { // 第二种使用
        const addTask = () => {
            if(i >= urls.length) {
                return resolve();
            }
            const task = request(urls[i++]).finally(() => {
                addTask();
            })
            ret.push(task);
        }
        while(i < maxNum) {
            addTask();
        }
    // })
    return promise.then(() => Promise.all(ret))
}
// 模拟请求
function request(url) {
    return new Promise(r => {
        const time = Math.random() * 1000;
        setTimeout(() => r(url), time)
    })
}

const p1 = new Promise(r => setTimeout(r, 1000, 'fn1'))
const p2 = new Promise(r => setTimeout(r, 1000, 'fn2'))
const p3 = new Promise(r => setTimeout(r, 1000, 'fn3'))
const p4 = new Promise(r => setTimeout(r, 1000, 'fn4'))
multiRequest([p1, p2, p3, p4], 4).then(()=>{
  console.log('finish')
})
```
## Promise并行限制1
```js
const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler()

const addTask = (time, order) => {
  scheduler.add(() => timeout(time))
    .then(() => console.log(order))
}

// 限制同一时刻只能执行2个task
addTask(4000, '1')
addTask(3500, '2')
addTask(4000, '3')
addTask(3000, '4')
.....

//Scheduler ？
//4秒后打印1
//3.5秒打印2
//3进入队列，到7.5秒打印3 
//...

//解答
class Scheduler {
    constructor(){
        this.tasks = [];
        this.maxlimit = 2;
    }
    async add(promiseFunction){
        this.tasks.push(promiseFunction)
    }
    sqeueTask() {
        this.tasks.reduce((promise, task) => {
            return promise.then(task);
        }, Promise.resolve())
    }
}

const timeout = time => new Promise(resolve => setTimeout(resolve, time))

const scheduler = new Scheduler();

const addTask = (time, order) => {
    scheduler.add(() => timeout(time).then(() => console.log(order)))
}
addTask(4000, '1')
addTask(3500, '2')
addTask(4000, '3')
addTask(3000, '4')
//Scheduler ？
//4秒后打印1
//3.5秒打印2
//3进入队列，到7.5秒打印3 
//...
scheduler.sqeueTask();
```
解答
```js
class Scheduler {
    constructor() {
        // 整个队列，存放任务的队列
        this.queue = [];
        // 最大可以并行的数量
        this.maxNum = 2;
        // 表示当前并行的数量
        this.curNum = 0;
    }
    //向队列中添加任务
    add(promiseCreator) {
        this.queue.push(promiseCreator);
    }
    // 开始执行
    start() {
        for(let i = 0; i < this.maxNum; i++) {
            this.getNext();
        }
    }
    // 执行下一个
    getNext() {
        if(this.queue && this.queue.length && this.maxNum > this.curNum) {
            this.curNum++;
            this.queue.shift()().then(() => {
                this.curNum--;
                this.getNext();
            })
        }
    }
}
const timeout = time => new Promise(resolve => setTimeout(resolve, time))

const scheduler = new Scheduler();

const addTask = (time, order) => {
    scheduler.add(() => timeout(time).then(() => console.log(order)))
}
addTask(1000, 1);
addTask(500, 2);
addTask(300, 3);
addTask(400, 4); // log: 2 3 1 4

scheduler.start();


// 第二？
class Scheduler {
    constructor(){
        this.tasks = [];
        this.maxlimit = 2;
    }
    async add(promiseFunc){
        if(this.tasks.length >= this.maxlimit) {
            return Promise.race(this.tasks).then(() => this.add(promiseFunc))
        }
        let rt = promiseFunc().then(() => this.tasks.splice(this.tasks.indexOf(rt), 1));
        this.tasks.push(rt);
        return rt;
    }
}
const scheduler = new Scheduler();
const timeout = (time) => {
    return new Promise((r) => setTimeout(r, time));
};
const addTask = (time, order) => {
    scheduler.add(() => timeout(time)).then(() => console.log(order));
};
// addTask(1000, 1);
// addTask(500, 2);
// addTask(300, 3);
// addTask(400, 4); // log: 2 3 1 4
```

## 修改以下 print 函数，使之输出 0 到 99，或者 99 到 0 

要求：
1. 只能修改 setTimeout 到 Math.floor(Math.random() * 1000 的代码

2. 不能修改 Math.floor(Math.random() * 1000

3. 不能使用全局变量

```js
function print(n){
  setTimeout(() => {
    console.log(n);
  }, Math.floor(Math.random() * 1000));
}
for(var i = 0; i < 100; i++){
  print(i);
}
```
解决
```js
function print(n){
  setTimeout((() => {
    console.log(n)
    return ()=>{} // 其实Math.floor(Math.random() * 1000) 这个return的函数  外面的函数正常执行 因为call的n所以n顺序为1-99
    // return () => {
    //     console.log(n, 'x')
    // }
  }).call(n,[]), Math.floor(Math.random() * 1000));
}
for(var i = 0; i < 100; i++){
  print(i);
}

```


## 资料
[字节编程](https://github.com/Advanced-Frontend/Daily-Interview-Question/labels/%E5%AD%97%E8%8A%82)