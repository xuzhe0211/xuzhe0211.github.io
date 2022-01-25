---
autoGroup-15: 播放器
title: 开发过程中视频、音频问题
---

## 一般问题

- 视频在第三方浏览器会造成浏览器劫持
- 音频在微信下不能自动播放
- home键切换到主屏播放没有停止问题
- ios不允许没有用户操作行为的事件

## 解决方法

1. 微信下自动播放
```
document.addEventListener('visibilitychange', () => {
    audio.play();
})
```

2. 切换home键播放问题

```
document.addEventListener('visiblitychange', () => {
    if (document.hidden) {
        console.log('页面非激活，暂停播放');
    } else {
        console.log('页面激活，继续播放')
    }
})
```
