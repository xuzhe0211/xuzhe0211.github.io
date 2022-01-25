---
autoGroup-1: 调试
title: 前端性能优化指标
---

## FP
FP,全程First Paint,翻译为首次绘制，是时间线上的第一个时间点，它代表网页的第一个像素渲染到屏幕上所用的时间，也就是页面在屏幕上首次发生视觉变化的时间。

### 统计逻辑

通过performance.getEntriesByType('paint'),取第一个paint的时间。

```
function getFPTime() {
    const timings = performance.getEntriesByType('paint')[0];
    return timings ? Math.round(timings.startTime) : null
}
```

## FCP

FCP,全称First Contentful Paint，翻译为首次内容绘制，顾名思义，它代表浏览器第一次向屏幕绘内容

注意：只有首次绘制文本、图片(包含背景图)、非白色的canvas或SVG时才被算作FCP

### 统计逻辑

通过performance.getEntriesByTyps('paint'),取第二个paint的时间，或通过Mutation Observer观察到首次节点变动的时间

```
const domEntries = [];
const observer = new MutationObserver(mutationsList) => {
    for (var mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
        }
        if (mutation.type == 'addedNodes') {
            //TODO新增了节点，做处理，计算此时的可见性/位置/出现时间等信息，然后 push 进数组
            ...
            domEntries.push(mutation)
        }
    }
}
function getFPTime(){
    const timings = performance.getEntriesByType('paint');
    if(timings.length > 1)return timings[1]
    return timings ? Math.round(timings.startTime) : null
    //伪代码,算 DOM 变化时的最小那个时间，即节点首次变动的时间
    return Math.round(domEntries.length ? Math.min(...domEntries.map(entry => entry.time)) : 0);
}
```
MutationObserver 理解及使用补充:
- https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver
- https://javascript.ruanyifeng.com/dom/mutationobserver.html

:::tip
FP和FCP这两个指标之间的主要区别是：FP是当浏览器开始绘制内容到屏幕上的时候，只要视觉上开始发生变化，无论是什么内容触发的视觉变化，在这一刻，这个时间点，叫做FP

相比之下，FCP指的是浏览器首次绘制来自DOM的内容。例如文本、图片，SVG，canvas元素等，这个时间点叫做FCP

FP和FCP可能是相同的时间，也可能是先FP后FCP
:::

## FMP
FMP,全称First Meaningful Paint,翻译为首次有意义的绘制，是页面主要内容出现在屏幕上的时间，这是用户感知加载体检的主要指标。目前尚无标准化的定义，因为很难以通用的方式去确定各种类型的页面的关键内容。

## FPS
FPS,全程Frames Per Second，翻译为每秒帧率，表示的是每秒钟画面更新的次数，当今大多数设备的屏幕刷新率是60次/秒

参考标准
- 帧率能够达到50-60FPS的动画将会相当流畅，让人倍感舒服
- 帧率在30~50 FPS之间的动画，因个人敏感程度不同，舒适度因人而异
- 帧率在30 FPS一下的动画，让人感觉到明显的卡顿和不舒氏
- 帧率波动很大的动画，也会让人感觉到卡顿

### 逻辑统计
利用requestAnimationFrame，循环调用，当now大于lastTime+1s时，计算FPS。若小于某个阈值则可以认为当前帧率较差，若连续小于某个阈值，则停止统计，当前页面处于卡顿状态，进入卡顿处理逻辑

更多具体参考：

https://www.cnblogs.com/coco1s/p/8029582.html



[前端性能优化指标](https://mp.weixin.qq.com/s/wDKKj5R8SYm-_75Zn1y30A)

[还在看那些老掉牙的性能优化文章么？这些最新性能指标了解下](https://juejin.cn/post/6850037270729359367)