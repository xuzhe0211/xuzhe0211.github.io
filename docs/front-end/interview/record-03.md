---
autoGroup-0: 面试记录
title: 现在面试都问什么「字节、蚂蚁、美团、滴滴面试小记」
---
## 字节
### 一面
1. typeof 类型判断情况

    [参考](/front-end/JavaScript/tips-typeof.html)
2. 代码执行情况

    ```js
    let a = 0, b = 0;
    function fn(a) {
        fn = function fn2(b) {
            alert(++a+b); // 3 + 2
        }
        alert(a++) // 1
    }
    fn(1); // 1 
    fn(2); // 5
    ```
3. 代码执行情况

    ```js
    async function async1() {
        console.log('async1 start');
        await new Promise(resolve => {
            console.log('promise1');
        })
        console.log('async1 success');
        return 'async1 end'
    }
    console.log('script start');
    async1().then(res => console.log(res));
    console.log('script end');

    // script start
    // async1 start
    // promise1
    // script end

    // 测试
    const sleep = () => {
        return new Promise(resolve => {
            setTimeout(resolve, 1000)
        })
    }
    async function test() {
        await new Promise(resolve => {
            resolve(); // resolve 存在的请求下 默认返回 return里面的内容
            console.log('promise1')
        })
        console.log('test')
        return '11'
    }
    // test().then(res => {
    //     console.log(res)
    // })
    ```
4. 编程题：实现add方法

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
    ```
    [参考](/front-end/interview/coding2.html#promise并行限制1)
5. [require('xxx') 查找包过程](/front-end/engineering/base-require.html)
6. 判断是否有环
7. Vue use实现逻辑
8. vue中nextTick实现原理
9. vue组件中的data为什么是一个方法

### 二面


## 资料
[原文](https://mp.weixin.qq.com/s/t8Id1E0tSMxcqiCs_O6uwg)