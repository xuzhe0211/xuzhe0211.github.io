---
autoGroup-13: ES6
title: Promise与async的区别
---
- 执行async函数返回的都是Promise对象
    - return的只要不是promise对象，那么返回的则是成功的promise对象

        ```js
        async function test() {
            return 1
        }
        test().then(res => {
            console.log(res);
        })
        ```
    - async函数返回的是error，那么返回的是失败的Promise

        ```js
        async function test() {
            throw new Error('err');
        }
        test().then(res => {
            console.log(res)    
        }, reason => {
            console.log(reason) // err
        })
        ```
    - async函数返回的是Promise对象，则根据这个对象的状态来决定Promise状态

        ```js
        async function test() {
            return Promise.reject('reject');
        }
        test().then(res => {
            console.log(res); // reject
        })
        ```
- Promise.then成功的情况下对应await

    ```js
    async function test() {
        const p = Promsie.resolve(3);
        p.then(data => {
            console.log(data); // 3
        })
        const data = await p;
        console.lgo(data); // 3
    }
    test();
    ```
- Promise.catch异常的情况对应async中的try catch

    ```js
    async function test() {
        const p = Promise.reject(6);

        try {
            const data = await p;
            console.log('成功的data', data)
        } catch(error) {
            console.log('错误原因:', error); // 错误原因6
        }
    }
    test()；
    ```
- async/await 更符合同步语义，容易理解，使得异步代码更想是同步代码
- async/await是基于promise实现的
- async/await是生成器的语法糖，拥有内置执行器，不需要额外的调用，直接会自动调用并返回一个promise对象