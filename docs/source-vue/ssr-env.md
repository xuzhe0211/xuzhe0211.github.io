---
autoGroup-10: ssr
title: NodeJS SSR服务端渲染：公共代码区分客户端和服务端
---
在实现SSR服务端渲染时，一些代码会在两端都被加载，在这些公共代码中，如果用到了window等服务端没有的属性方法，那么服务端就会报错，反之亦然。以下提供了我在实践中想到的几种方案
- typeof 判断是否为undefined

    ```js
    if(typeof window !== 'undefined') {
        // 客户端
    } else {
        // 服务端
    }
    ```
- 分别在两端的全局对象上挂载一个判断变量

    服务端在全局对象global声明，客户端在全局对象window声明
    ```js
    // 服务端
    global.__CLIENT = false;
    // 客户端
    window.__CLIENT = true;

    // 在公共代码中判断是客户端还是服务端
    if(__CLIENT) {
        // 客户端
    } else {
        // 服务端
    }
    ```