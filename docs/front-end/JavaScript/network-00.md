---
autoGroup-8: 网络
title: 简介、重点
---
HTTP流(HTTP streaming)是一种通过HTTP协议实现实时数据传输的技术。它允许服务器将数据以流的形式实时传输给客户端，而无需等待完整的响应。

HTTP流可以通过一下几种方式实现
1. Server-Send Events(服务器推送事件)：使用EventSource API,客户端通过与服务器建立长连接，服务器可以实时的向客户端推送数据。服务器可以周期性的发送事件，客户端通过监听事件来接收数据。

2. WebSocket: WebSocket是一种双向通信协议,允许服务器和客户端之间进行实时的双向数据传输。与传统的HTTP请求/响应模式不同，WebSocket保持长连接，服务器和客户端可以随时发送数据。

3. HTTP/2:HTTP/2协议引入了二进制分帧机制，允许多个请求/响应在同一个连接上并行进行。者提供了更高效的数据传输，使用服务器可以更快的向客户端发送数据

这些技术可以用于实现实时聊天、实时数据更新、实时推送等场景，其中服务器可以将数据以流的形式发送给客户端，而不需要等待完整的响应。这样可以实现实时的数据传输，提高用户体验。

需要注意的是，HTTP流的实现可能需要服务器和客户端的特定支持，因此在开发应用程序时，需要确保所选择的技术和工具支持HTTP流。


[什么是流式传输](/front-end/JavaScript/network-stream-fetch.html)

[Server-Sent Event教程](/front-end/JavaScript/network-wserver-sentevents.html)