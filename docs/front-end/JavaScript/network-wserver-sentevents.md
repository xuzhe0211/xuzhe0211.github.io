---
autoGroup-8: 网络
title: Server-Sent Events 教程
---
服务器向浏览器推送消息，除了WebSocket，还有一种方法：Server-Sent Events(以下简称SSE).本文介绍它的用法

![SSE](/images/bg2017052701.png)

## SSE本质
严格来说，HTTP协议无法做到服务主动推送消息。但是，有一种变通的方法，就是服务器向客户端声明，接下来要发送的是流信息(streaming).

也就是说，发送的不是一次性的数据包，而是一个数据流，会连续不断的发送过来。这时，客户端不会关闭连接，会一直等着服务器发过来的新的数据流，视频播放就是这样的的例子。本质上，这种通信就是以流信息的方式，完成一次用时很长的下载。

SSE就是利用这种机制，使用流信息向浏览器推送信息。它给予HTTP协议，目前除了IE/Edge,其他浏览器都支持。

## SSE的特点

## 资料
[Server-Sent Events 教程](https://www.ruanyifeng.com/blog/2017/05/server-sent_events.html)