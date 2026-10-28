---
autoGroup-8: 网络
title: 一文看懂 SSE 流式传输
category:
  - 前端技术
tag:
  - javascript
  - 前端
---

在web开发中，实时数据传输变得越来越重要。无论是股票市场的实时更新、在线聊天应用的即使消息，还是物联网设备的数据流，实时通信都扮演者关键角色。传统的HTTP请求--相应模型在处理实时数据时显的力不从心，而WebSocket和Server-Sent Event(SSE)则是两种常见的解决方案。本文将深入探讨SSE流式传输，帮助你全面理解这一技术

## 技术背景
### HTTP请求-响应模型的局限性
传统的HTTP请求-响应模型是无状态的,每次请求都是独立的,服务器在响应后就会关闭连接。这种模型在处理静态内容时非常高效，但是在需要实时更新的场景中显的力不从心。为了实现实时通信，开发者通常会会使用轮训(Polliing)或长轮训(long Polliing)技术。

- 轮训(Polling)：客户端定期向服务器发送请求，检查是否有新数据。这种方法简单但效率低下，因为大多数请求都会返回空结果
- 长轮训(Long Polling): 客户端发送请求后，服务器保持连接直到有新数据可用。这种方法比轮训更高效，但仍然存在延迟和资源占用问题。

### WebSocket
WebSocket是一种全双工通信协议，允许客户端和服务器之间建立持有连接，双方可以随时发送数据。WebSocket解决了HTTP请求-响应模型的局限性，适用于需要频繁双向通信的场景。然而，WebSocket的实现相对复杂，且在某些情况下可能过于重量级。

### Server-Sent Events(SSE)
Server-Sent Events(SSE)是一种基于 HTTP 协议的单向通信技术，允许服务器向客户端推送实时更新。SSE通过保持HTTP连接并持续发送数据来实现实时通信，适用于需要频繁更新但不需要客户端频繁响应的场景。

## SSE的工作原理
<span style="color: blue;font-weigth:bold">SSE基于HTTP协议，使用的是标准的HTTP请求和响应。客户端通过发送一个普通的HTTP请求来订阅服务器的事件流,服务器则通过保持这个连接并持续发送数据来实现实时更新。</span>

### 客户端实现
在客户端，使用Javascript的EventSource对象来处理SSE。以下是一个简单的示例
```js
if(typeof(EventSource) !== 'undefined') {
    var source = new EventSource('server-endpoint');

    source.onmessage = function(event) {
        console.log('New message: ' + event.data);
    }

    source.onerror = function(event) {
        console.error('Error occurred: ', event);
    }
} else {
    console.log('SSE not supported in this browser');
}
```
#### 代码详解
1. 检查浏览器支持: 首先检查浏览器是否支持 EventSource 对象。如果不支持，输出一条信息

    ```js
    if(typeof(EventSource) !== 'undefined'){}
    ```
2. 创建 EventSource实例：如果浏览器支持EventSource,创建一个新的EventSource实例，传入服务器端的SSE端点URL。
 
    ```js
    var source = new EventSource('server-endpoint');
    ```
3. 处理消息事件：为source对象的onmessage事件添加一个处理函数，当服务器发送新消息时，这个函数会被调用

    ```js
    source.onmessage = function(event) {
        console.log('New message: ' + event.data);
    }
    ```
4. 处理错误事件：为source对象的onerror事件添加一个处理函数，当发生错误时，这个函数会被调用

    ```js
    source.onerror = function(event) {
        console.error('Error occurred: ', event);
    }
    ```

### 服务器实现
在服务器端，SSE的实现相对简单。以下是一个使用Node.js和Express的示例

```js
const express = require('express');
const app = express();

app.get('/server-endpoint', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendEvent = data => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    }

    // 模拟实时数据
    const intervalId = setInterval(() => {
        sendEvent({ message: 'Hello, SSE!'});
    }, 1000);

    req.on('close', () => {
        clearInterval(intervalId);
    })
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
})
```
#### 代码详解
1. 引入 Express 模块: 首先引入 Express 模块并创建一个Express 应用实例

    ```js
    const express = require('express');
    const app = express();
    ```
2. 定义SSE端点: 定义一个GET请求的处理函数，当客户端请求 /server-endpoint 时触发

    ```js
    app.get('/server-endpoint', (req, res) => {})
    ```

3. 设置响应头：设置响应头以告知客户端是一个SSE流

    ```js
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    ```

4. 定义发送事件的函数：定义一个 sendEvent 函数，用户向客户端发送数据

    ```js
    const sendEvent = data => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    }
    ```

5. 模拟实时数据：使用 setInterval 模拟每秒发送一次数据给客户端

    ```js
    const intervalId = setInterval(() => {
        sendEvent({ message: 'Hello, SSE!'});
    })
    ```
6. 处理连接关闭：当客户端关闭连接时，清除定时器以释放资源

    ```js
    req.on('close', () => {
        clearInterval(intervalId);
    })
    ```
7. 启动服务器：启动服务器，监听3000端口

    ```js
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    })
    ```
### 设置响应头的详细解释
```js
res.setHeader('Content-Type', 'text/event-stream');
res.setHeader('Cache-Control', 'no-cache');
res.setHeader('Connection', 'keep-alive');
```
1. res.setHeader('Content-Type', 'text/event-stream');

    这行代码设置了响应头的 Content-Type 为 text/event-stream,这是SSE(Server-Sent Events)流的MIME类型。它告诉客户端(通常是浏览器)，服务器将发送的是一个事件流，而不是普通的HTML、JSON或其他类型的内容
    - 作用：告诉客户端这是一个SSE流，客户端会根据这个MIME类型来处理接收到的数据
    - 重要性：这是实现SSE的关键步骤之一，客户端需要知道如何解析和处理从服务器接收到的数据

2. res.setHeader('Cache-Control', 'no-cache');

    这行嗲吗设置了 Cache-Control 头为 no-cache，目的是防止浏览器或其他中间代理缓存了SSE流
    - 作用：确保每次请求都能从服务器获取最新的数据，而不是从缓存中读取
    - 重要性：实时数据传输要求数据是最新的，缓存可能会导致客户端接收到过时的数据，从而影响实时性

3. res.setHeader('Connection', 'keep-alive');

    这行代码设置了Connection头为 keep-alive，目的是保持HTTP连接不断开。
    - 作用：保持客户端和服务器之间的链接持续打开，以便服务器可以持续发送数据。
    - 重要性：SSE依赖于持久的HTTP链接来推送实时数据，如果链接关闭，sse流就会中断

## SSE的优缺点
### 优点
1. 简单易用：SSE使用标准的HTTP协议，客户端和服务端的视线都非常简单
2. 自动重连：EventSource 对象会在连接断开时候自动尝试重连。
3. 轻量级：相比WebSocket，SSE更加轻量级，适合频繁但数据量较小的更新。

### 缺点
1. 单向通信：SSE只能从服务器向客户端推送数据，无法实现双向通信
2. 浏览器兼容性：虽然大多数现代浏览器都支持SSE，但扔有一些老旧浏览器不支持
3. 连接数限制：由于SSE基于HTTP协议，浏览器对同一域名的并发连接数有限制

## 使用场景
SSE非常适合以下场景
1. 实时通知：如新闻网站的实时更新、社区媒体的通知等；
2. 数据流：如股票市场的实时诗句、物联网设备的数据流等
3. 日志监控：如服务器日志的实时监控、应用程序的实时日志等

## GPT场景中的SSE使用
在GPT(Generative Pre-trained Transformer)场景中，SSE也有着广泛的应用。GPT模型通常用于生成文本、回答问题、对话等任务，这些任务有时需要实时更新数据或状态。以下是具体的用用场景：

1. 实时对话生成：在聊天机器人或对话系统中，使用SSE可以实现服务器向客户端推送实时生成的对话内容。这样，用户可以在对话过程中实时看到生成的回复，而不需要等待整个对话的生成完毕

2. 实时文本:在文本生成应用中，如写作助手或自动补全工具，使用SSE可以实现服务器向客户端推送实时生成的文本片段。用户可以在输入过程中看到生成的建议或补全内容

3. 实时状态更新：实时状态更新：在需要实时监控 GPT 模型状态的应用中，如训练过程监控或生成任务进度显示，使用 SSE 可以实现服务器向客户端推送实时状态更新。这样，用户可以实时了解模型的训练进度或生成任务的完成情况。

### 示例：实时对话生成
以下是一个使用SSE实现实时对话的生成示例

**客户端代码**
```js
if(typeof(EventSource) !== 'undefined') {
    var source = new EventSource('/gpt-endpoint');

    source.onmessage = function(event) {
        const data = JSON.parse(event.data);
        displayMessage(data.message);
    }

    source.onerror = function(event) {
        console.error('Error occurred: ', event);
    }
} else {
    console.log('SSE not supported in this browser')
}

function displayMessage(message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
}
```
**服务器端代码**
```js
const express = require('express');
const app = express();
const { generateResponse } = require('./gpt-model'); // 假设有一个gpt模型生成函数

app.get('/gpt-endpoint', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendEvent = data => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    }

    // 模拟实时对话生成
    const intervalId = setInterval(() => {
        const response = await generateResponse('用户输入的对话内容');
        sendEvent({ message: response});
    }, 1000)

    req.on('close', () => {
        clearInterval(intervalId)
    })
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})
```
1. 客户端代码：使用 EventSource 对象订阅服务器端的SSE端点，并在接收到新消息时更新对话内容
2. 服务器端代码：定义一个SSE端点，并使用 setInterval 模拟每秒生成一次对话内容并推送给客户端

## 结语
Server-Send Event(SSE)是一种简单而高效的实时数据传输技术，适用于需要频繁更新但不需要双向通信的场景。在 GPT 场景中，SSE 可以用于实现实时对话生成、实时文本生成和实时状态更新等功能，提升用户体验和应用性能。通过本文的介绍，相信你已经对 SSE 的工作原理、实现方法以及在 GPT 场景中的应用有了全面的了解。在实际开发中，可以根据具体需求选择合适的实时通信技术，提升应用的用户体验和性能。




[原文](https://juejin.cn/post/7404739357083156516)