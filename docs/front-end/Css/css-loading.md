---
autoGroup-1: Css Tips
title: css 实现 loading效果
---

在推特上面看到 [T. Afif](https://twitter.com/ChallengesCss) 介绍的十个 Loading 效果。如上图。

Yeah，很赞哦，挺实用的，遂记录下来。

为保证运行正常，咱先规定下：

```css
* {
    box-sizing: border-box;
}
```
## 1. 平滑加载

![效果](./images/e3b31b04c2fd4e5db25ba60a1c74011a~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.gif)

```html
<div class="progress-1"></div>
```
```css
.progress-1 {
  width:120px;
  height:20px;
  background:
   linear-gradient(#000 0 0) 0/0% no-repeat
   #ddd;
  animation:p1 2s infinite linear;
}
@keyframes p1 {
    100% {background-size:100%}
}
```
1. linear-gradient(#000 0 0) 你可以理解为 linear-gradient(#000 0 100%)，如果还不熟悉，复制 linear-gradient(#000 0 50%, #f00 50% 0) ，替换原先的部分跑一下。觉得 linear-gradient(#000 0 0) 别扭的话，直接写 #000 即可。
2. 0/0% 是 background-position: 0;/background-size: 0; 的简写。

## 按步加载
![效果](./images/5dfccdf274914f79938d2c5cf53e2a15~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.gif)

```html
<div class="progress-2"></div>
```
```css
.progress-2 {
  width:120px;
  height:20px;
  border-radius: 20px;
  background:
   linear-gradient(orange 0 0) 0/0% no-repeat
   lightblue;
  animation:p2 2s infinite steps(10);
}
@keyframes p2 {
    100% {background-size:110%}
}
```
1. steps(10) 是 step(10, end) 的简写，指明刚开始没有，所以有第2点的处理
2. 100% {background-size:110%} 添加多一个 step 的百分比，上面的 step 是 10，所以是100% + (1/10)*100% = 110%

## 条纹加载
![效果](./images/1ab64cefdecc49faac0dfd892ce922e0~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.gif)

```html
<div class="progress-3"></div>
```
```css
.progress-3 {
  width:120px;
  height:20px;
  border-radius: 20px;
  background:
   repeating-linear-gradient(135deg,#f03355 0 10px,#ffa516 0 20px) 0/0% no-repeat,
   repeating-linear-gradient(135deg,#ddd 0 10px,#eee 0 20px) 0/100%;
  animation:p3 2s infinite;
}
@keyframes p3 {
    100% {background-size:100%}
}
```
repeating-linear-gradient(135deg,#ddd 0 10px,#eee 0 20px) 0/100%; 画出灰色的斑马线条纹，repeating-linear-gradient(135deg,#f03355 0 10px,#ffa516 0 20px) 0/0% no-repeat 则是进度条加载的条纹。

## 虚线加载
![效果](./images/44b07578c83948f1b690695efe374e50~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.gif)