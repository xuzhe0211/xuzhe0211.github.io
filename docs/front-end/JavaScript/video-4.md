---
autoGroup-15: 播放器
title: Videojs
---

## videojs的一些监听事件汇总

```
// my-player---页面video标签的id
// options --- 播放器配置参数

var playerVideo = videojs('my-player', options, function onPlayerReady() {
    videojs.log('Your player is ready!');

    this.on('loadstart', function() {
        console.log('开始请求数据');
    })

    this.on('progress', function() {
        console.log('正在请求数据');
    })

    this.on('loadedmetadata', function() {
        console.log('获取资源长度完成')；
    })

    this.on('canplaythrough', function() {
        console.log('视频源数据加载完成');
    });

    this.on('waiting', function() {
        console.log('等待数据');
    });

    this.on('play', function() {
        console.log('视频开始播放');
    });

    this.on('playing', function() {
        console.log('视频播放中');
    });

    this.on('pause', function() {
        console.log('视频暂停播放');
    });

    this.on('ended', function() {
        console.log('视频播放结束');
    });

    this.on('error', funnction() {
        console.log('加载错误')；
    });

    this.on('seeking', function() {
        console.log('视频跳转中');
    });

    this.on('seeked', function() {
        console.log('视频跳转结束');
    });

    this.on('ratechange', function() {
        console.log('播放速率改变');
    });

    this.on('timeupdate', function() {
        console.log('播放时长改变');
    });

    this.on('volumechange', function() {
        console.log('音量改变');
    });

    this.on('stalled', function() {
        console.log('网速异常');
    });
})
```
:::tip
自动播放播放顺序

pay

canpay 

loadstart 

waiting 

seeking

seekabel

:::


## vue截取video视频中的某一帧
```
<template>
<div>
    <video src="../assets/video.mp4" controls style="width: 300px"></video>
    <img :src="imgSrc">
    <div>
        <button @click="cutPicture">
            截图
        </button>
    </div>
    <canvas id="myCanvas" width="343" height="200"></canvas>
</div>
</template>
<script>
export default {
    name: 'video',
    data() {
        return {
            imgSrc: ''
        }
    },
    methods: {
        // 截取当前帧的图片
        cutPicture() {
            const v = document.querySelector('video');
            const canvas = document.getElementById('mycanvas');
            cosnt ctx = canvas.getContext('2d');
            ctx.drawImage(v, 0, 0, 343, 200);
            const oGrayImg = canvas.toDataURL('image/jpeg');
            this.imgSrc = oGrayImg;
        }
    }
}
</script>
```