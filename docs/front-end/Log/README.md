---
title: 前端监控
---

## 常见问题
1. 白屏
2. 加载时间
3. 服务端接口监控

## 前端监控、统计为什么要用gif
1. 防止跨域
    原则上能收集信息用什么方式都行，但是get、post、head等方式可能存在跨域
2. 图片不用插入页面
    js、css、ttf创建节点后要插入到dom后，才能发送资源请求，图片则不用，创建节点后就能发起请求
    ```javascript
    var img = new Image();
    img.src = '123'; // 到这一步会发送图片请求

    document.body.appendChild(img)
    ```
3. gif体积最小
    - 图片最好是透明的，避免对页面有影响，体积夜宵
    - 最小1*1像素透明图片，bmp74字节，png67字节，git43字节
4. 方式简单，后端只要放一个图，甚至不用图，nginx直接返回一个图
5. 如果并发量大，不会堵塞其他请求。

缺点：能记录的内容太少


## 文档
[前端首页白屏问题](https://blog.csdn.net/qq_24147051/article/details/79214773)

[大前端时代前端监控的最佳实践](https://mp.weixin.qq.com/s/YiKRY_LDURY0uONtEhkUfg)

[前端监控和概念统计](https://zhuanlan.zhihu.com/p/134132381)