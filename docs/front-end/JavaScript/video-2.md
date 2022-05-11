---
autoGroup-15: 播放器
title: WebRTC--使用webRTC构建简单的前端视频通讯
---

[原文地址](https://www.cnblogs.com/cangqinglang/p/11313965.html)

在传统的web应用中，浏览器与浏览器之间是无法直接相互通信的，必须借助服务器的帮助，但是随着WebRTC在各大浏览器中的普及，这一现在得到改变，WebRTC(Web Real-Time Communication, web实时通信)，是一个支持网页浏览器之间进行实时数据传输(包括音频、视频、数据流)的技术，谷歌于2011年5月开放了工程的源码，目前在各大浏览器的最新版得到不同程度的支持。

## 关于WebRTC的一些基本概念

传统的视频推流的技术实现一般是这样的:客户端采集视频数据，推流到服务器上,服务器在根据情况将视频数据推送到其他客户端上。

<span style="color: red">**但webRTC却截然不同，它可以在客户端之间直接搭建基于UDP的数据通道，经过简单的接收流程之后，可以在不同设备间的两个浏览器内直接传输任意数据。**</span>

这其中的[流程](/front-end/JavaScript/video-2-1.html)包括

- <span style="color: blue">采集视频流数据，创建一个RTCPeerConnection</span>

- <span style="color: blue">创建一个SDP offer和响应的回应</span>

- <span style="color: blue">为双方找到ICE候选路径</span>

- <span style="color: blue">成功创建一个webrtc连接</span>

下面我们介绍其中涉及的一些关键词

1. RTCPeerConnection对象

RTCPeerConnection对象是WebRTC API的入口，它负责创建、维护一个WebRtc连接，以及在这个连接中的数据传输。目前新版本的浏览器大都支持了这一对象，但是由于目前API还不稳定，所以需要加入各个浏览器内核的前缀，例如Chrome中我们使用webkitRTCPeerConnection来访问它。

2. 会话描述协议(SDP)

为了连接其他用户，我们必须要对其他用户的设备情况有所了解，比如音频视频的编码的解码器、使用何种编码格式、使用何种网络、设备的数据处理能力，所哟我们需要一个名片来获得用户的所有信息,而SDP为我们提供了这些功能。

一个SDP的握手由一个offer和一个answer组成。

3. 网络通信引擎(ICE)

通讯的两侧可能处于不同的网络环境中，有时会存在好几层的访问控制、防火墙、路由调整，所以我们需要一种方法在复杂的网络环境中找到对象，并且连接到相应的目标。WebRTC使用了集成STUN、TURN的ICE来进行双方的数据通信。

## 创建一个RTCPeerConnection

首先我们的目标是在同一个页面中创建两个实时视频，一个的数据直接来自你的摄像头,另一个的数据来自本地创建的WebRct连接。看起来是这样的：

```html
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <style type="text/css">
        #theirs{
            position: absolute;
            top: 100px;
            left: 100px;
            width: 500px;
        }
        #yours{
            position: absolute;
            top: 120px;
            left: 480px;
            width: 100px;
            z-index: 9999;
            border:1px solid #ddd;
        }
    </style>
</head>
<body>
<video id="yours" autoplay></video>
<video id="theirs" autoplay></video>
</body>
<script type="text/javascript" src="./main.js"></script>
</html>
```

下面我们创建一个main.js文件，先封装一个各浏览器的userMedia和RTCPeerConnection对象
```js
function hasUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.msGetUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    return !!navigator.getUserMedia
}

function hasRTCPeerConnection() {
    window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection || window.msRTCPeerConnection;
    return !!window.RTCPeerConnection;
}
```

然后我们需要浏览器调用系统的摄像头API getUserMedia获得媒体流，注意要打开浏览器的摄像头限制。Chrome由于安全问题，智能在https下或者locahost下打开摄像头
```js
var yourVideo = document.getElementById('yours');
var theirVideo = document.getElementById('theirs');
if (hasUserMedia()) {
    navigator.getUserMedia({ video: true, audio: false },
        stream => {
            yourVideo.src = window.URL.createObjectURL(stream);
            if (hasRTCPeerConnection()) {
                // 稍后我们实现 startPeerConnection
                startPeerConnection(stream);
            } else {
                alert("没有RTCPeerConnection API");
            }
        },
        err => {
            console.log(err);
        }
    )
}else{
    alert("没有userMedia API")
}
```
没有意外的话，现在应该能在页面中看到一个视频了。

下一步是实现 startPeerConnection 方法，建立传输视频数据所需要的 ICE 通信路径，这里我们以 Chrome 为例：

