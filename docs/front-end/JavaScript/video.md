---
autoGroup-15: 播放器
title:  ffmpeg 工具ffplay
---

```shell
# ffmpeg 安装
brew install ffmpeg 
# ffplay
ffplay https://cdn.polyspeak.ai/speakmaster/e0e7b6071783ce6fc6f80a9ef42f931e.mp3
```
- 简单的媒体播放器
- 用法 ffplay [options] input_file
- 查看官方帮助文档 ffplay -h

    - Main options
    - Advanced options
    - AVOptions

## 播放多媒体文件
1. 播放本地文件
    - ffplay test.flv
    - ffplay -window_title "text window" test.flv #指定播放窗口名称

2. 播放网络流
    - ffplay rtmp://58.200.131.2:1935/livetv/cctv6
3. 禁用音频或者视频
    - ffplay -an test.flv # 禁用音频
    - ffplay -vn test.flv # 禁用视频
4. 指令编码器
    - ffplay -vcodec h264 test.flv # 指定h264编码器
5. 播放 YUV 数据
    - ffplay -pixel_format yuv420p -video_size 1280x720 -framerate 5 1280x720_yuv420p.yuv
6. 播放 RGB 数据
    - ffplay -pixel_format rgb24 -video_size 1280x720 -framerate 5 1280x720_rgb24.rgb
7. 播放 pcm 数据
    - ffplay -ar 44100 -ac 2 -f s16le 44100_2_s16le.pcm




## 资料
[ffmpeg 工具ffplay](https://www.cnblogs.com/faithlocus/p/15518520.html)