---
autoGroup-15: 播放器
title: HTTP-FLV初探
---
## 目前几种视频流的简单对比

协议|httpflv|rtmp|hls|dash
---|---|---|---|---
传输方式|http流|tcp流|http|http
视频封装格式|flv|flv tag|TS文件|Mp4 3gp webm
延迟|低|低|高|高
数据分段|连续流|连续流|切片文|切片文件
Html5播放|可通过html5解封包播放(flv.js)|不支持|可通过html5解封包播放(hls.js)|如果dash文件列表是mp4webm文件，可直接播放

## 文档
[HTTP-FLV初探](https://www.cnblogs.com/saysmy/p/7851911.html)
