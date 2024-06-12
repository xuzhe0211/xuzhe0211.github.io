---
autoGroup-15: 播放器
title: 前端流式传输播放音视频
---
## 前言
在Javascript之外的后端语言中，流是一个很普遍的概念，通过流我们可以将数据分段传输，如此以来我们不必等到数据全部传输完毕在处理，当第一批数据传输到我们手上的时候，我们就可以开始使用了。

在前端领域，流则可以在网络请求中发挥巨大的作用,当传输一些音视频大文件时，请求的时间是很长的。如果用户是下载文件那么长耗时没什么问题，但如果用户想点播音视频呢，通过流我们不必等到传输完毕,可以在传输过程中处理数据并展示给用户，大大优化了体验。

在JS早期，想要实现流我们需要自己造轮子，如果JS也有了Stream API用于处理流，且Fetch更深全面支持了Stream API。其response.body中负责携带数据的ReadableStream就是一个二进制数据流。搭配专为流媒体播放而生的MediaSource API,使得前端也有了很强的流媒体能力。

## ReadableStream的处理
Fetch方法的response响应对象中，数据都以ReadableStream的二进制流存储，response对象提供了json()、formData()、text()等多重转换方法，通常情况下根据响应的ContentType,转换成我们想要的数据类型进行处理，一些简单的网络请求我们便会这样做，由于数据量娇小，转换时间往往较短。

除此之外我们还能通过Stream API,直接从ReadabledStream中读取数据，当HTTP(s)连接建立，我们拿到response的那一刻，数据传输就开始了，数据会以二进制流的形式不断添加到ReadableStream中。我们可以通过ReadableStream.getReader()获取一个流的读取器，此时该流会被锁定，只允许我们获得的这个读取器读取。在通过读取器的read()方法，循环读取流，分段拿去数据，实现流式传输，看一段示例代码：
```js
window.fetch(url, fetchOption).then((response) => {
    if(!response.ok) {
        throw new Error('网络连接失败');
    } else {
        const reader = response.body.getReader(); // 使用读取器

        // 声明处理函数
        const processRead = async (params) => {
            const {done, value} = params;
            if(!done) {
                // 此时value就是读取到的数据，再次进行处理
                // 处理完毕后递归进行下一次处理
                await reader.read().then(processRead);
            } else {
                console.log('可读流读取完毕')
            }
        }

        // 开始读取
        reader.read().then(processRead)
    }
})
```

## 资料
[前端流式传输播放音视频](https://juejin.cn/post/7182849913846251575)