---
autoGroup-8: 网络
title: 什么是流式传输 ？
---
## 前言
当下 chatGPT 是最热门的一款语言模型，可以用于自然语言处理任务，如对话生成、文本摘要、机器翻译等。ChatGPT的特点是可以根据输入文本动态生成输出，因此采用流式传输方式，一边生成一边输出结果

## 什么是流式传输

## node中的流式传输
在Node.js中，流式传输是一种处理数据的有效方式，它可以实现高效的数据处理和传输，特别适用于大型数据或网络通信场景。通过使用流(Stream)，你可以逐个的处理数据，而无需一次性加载整个数据集到内存中

node 为我们提供了四种类型的流：
1. 可读流 Readable Stream: 用于从数据源(如文件、接口请求等)读取数据。
2. 可写流
3. 双工流
4. 转换流

### 流式文件读写
```js
const fs = require('fs');

// 创建可读流读取文件
const readableStream = fs.createReadStream('input.txt');

// 创建可写流将内容写入文件
const writeStream = fs.createWriteStream('output.txt');

// 监听可读流的「data」事件，读取数据块病写入到可写流中
readableStream.on('data', chunk => {
    writableStream.write(chunk);
})

// 监听可读流的 end 事件，表示文件读取完成
readableStream.on('end',() => {
    writableStream.end();
})
```

### 请求的流式响应
当我们在使用node作为服务器时,也可以通过流式传输完成接口的响应。这种方式被称为流式相应或流式输出。

使用流式响应可以提供更高的响应速度和更低的内存占用，在请求接口时，服务端不会一次性将完整的内容发送给客户端，而是将数据分块生成，并逐个的发送。

以下是一个Node示例，展示了如何使用流式相应来输出数据
```js
import express from 'express';

const app = express();

// node 服务端接口路径
app.post('/chatStream', async (request, response) => {
    console.log(request.body);
    // 设置返回的响应头位流式传输
    response.setHeader('Content-Type', 'application/octet-stream');

    const data = '你好啊';

    const interval = setInterval(() => {
        response.write(data);
    }, 3000);

    setTimeout(() => {
        clearInterval(interval);
        response.write('又什么可以帮你的吗？');
        response.end();
    }, 5000)

    // 关闭输出流
    response.end();

})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
```




[什么是流式传输](https://juejin.cn/post/7241514309716803644#comment)