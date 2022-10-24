---
autoGroup-15: 播放器
title: WebRTC和WebSocket有什么关系和区别？
---
这两种技术本质上就是半毛线关系都没有，除了他们都可以在web中用之外。

这两个技术的重点，不在名字里的web，而是名字中web之外的另一个词，即使**socket和rtc**。

socket和rtc有多大区别，这两种技术就有多大区别。

<span style="color: red">websocket本质上就是借助于http建立一个tcp的连接，然后在这个tcp连接中传websocket这中特定协议格式的二进制分帧数据。简单来说，websocket就是封装了tcp来给web的JavaScript用</span>

<span style="color: red">**webrtc则主要是给rtc封装了个web的JavaScript接口。底层webrtc的库需要完成全部rtc相关的逻辑，包括p2p连接，音视频的采集,处理，编码，解码，传输，拥塞控制等等一大堆东西。另外，传输层协议，webrtc主要在用udp，而不是websocket的tcp**</span>

但说它们一点关系也没有，其实也不一定。**有些webrtc的部署方案中，会把websocket用作信令协议的传输通道**

## 资料
[WebRTC和WebSocket有什么关系和区别？](https://www.zhihu.com/question/424264607)