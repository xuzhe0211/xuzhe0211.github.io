---
autoGroup-1: 性能指标-调试
title: 前端性能优化指标
---

## 指标
### FP
FP,全程First Paint,翻译为首次绘制，是时间线上的第一个时间点，它代表网页的第一个像素渲染到屏幕上所用的时间，也就是页面在屏幕上首次发生视觉变化的时间。

#### 统计逻辑

通过performance.getEntriesByType('paint'),取第一个paint的时间。

```js
function getFPTime() {
    const timings = performance.getEntriesByType('paint')[0];
    return timings ? Math.round(timings.startTime) : null
}
```

### FCP

FCP,全称First Contentful Paint，翻译为首次内容绘制，顾名思义，它代表浏览器第一次向屏幕绘内容

注意：只有首次绘制文本、图片(包含背景图)、非白色的canvas或SVG时才被算作FCP

#### 统计逻辑

通过performance.getEntriesByTyps('paint'),取第二个paint的时间，或通过Mutation Observer观察到首次节点变动的时间

```js
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
- MutationObserver 接口提供了监视对 DOM 树所做更改的能力。它被设计为旧的 Mutation Events 功能的替代品，该功能是 DOM3 Events 规范的一部分。
- [https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)
- https://javascript.ruanyifeng.com/dom/mutationobserver.html

:::tip
FP和FCP这两个指标之间的主要区别是：FP是当浏览器开始绘制内容到屏幕上的时候，只要视觉上开始发生变化，无论是什么内容触发的视觉变化，在这一刻，这个时间点，叫做FP

相比之下，FCP指的是浏览器首次绘制来自DOM的内容。例如文本、图片，SVG，canvas元素等，这个时间点叫做FCP

FP和FCP可能是相同的时间，也可能是先FP后FCP
:::

### FMP
FMP,全称First Meaningful Paint,翻译为首次有意义的绘制，是页面主要内容出现在屏幕上的时间，这是用户感知加载体检的主要指标。目前尚无标准化的定义，因为很难以通用的方式去确定各种类型的页面的关键内容。

### FID
FID,全称First Input delay，翻译为首次输入延迟，是测量用户首次与您的站点交互时的时间(即当他们单击链接、点击按钮、使用自定义的js驱动控件时)到浏览器实际能够回应这种交互的时间。

#### 统计逻辑
方式一，通过performanceObserver(目前支持性为88.79%)观察类型为first-input的entry，获得其startTime、duration等参数即可

方式二：初始化时为特定时间类型(click/touch/keydown)绑定通用统计逻辑事件，开始调用时从event.timeStamp取开始处理的时间(这个时间就是首次输入延迟时间),在时间处理中注册requestIdleCallback时间回调onIdleCallback被执行时，当前时间减去时间的event，timeStamp即为duration时间
```js
// 方式一
function getFIDTime() {
    const timings = performance.getEntriesByType('first-input')[0];
    return timings ? timings : null;
}
// 方式二
['click', 'touch', 'keydown'].forEach(eventType => {
    window.addEventListener(eventType, eventHandler)
})
function eventHandler(e) {
    const eventTime = e.timeStamp;
    window.requestIdleCallback(onIdleCallback.bind(this, eventTime, e));
}
function onIdleCallback(eventTime, e) {
    const now = window.performance.now();
    const duration = now - eventTime;

    return {
        duration: Math.round(duration),
        timestamp: Math.round(eventTime)
    }

    ['click','touch','keydown'].forEach(eventType => {
        window.removeEventListener(eventType, eventHandle);
    });
} 
```
### TTI
TTI,全称是Time To Interactive 翻译为可交互时间，指的是应用在视觉上都已经渲染出来了，完全可以响应用户的输入了。是衡量应用加载所需时间并能够快速响应用户交互的指标

### FCI
FCI,全称First CPU Idle，翻译为首次CPU空闲时间 代表一个网页已经满足了最小程序的与用户发生交互行为的时刻。当我们打开一个网页，我们并不需要等到一个网页完全加载好了，每一个元素都已经完成了渲染，然后再去与网页进行交互行为。网页满足了我们基本的交互的时间点是衡量网页性能的一个重要指标
### FPS
FPS,全程Frames Per Second，翻译为每秒帧率，表示的是每秒钟画面更新的次数，当今大多数设备的屏幕刷新率是60次/秒

参考标准
- 帧率能够达到50-60FPS的动画将会相当流畅，让人倍感舒服
- 帧率在30~50 FPS之间的动画，因个人敏感程度不同，舒适度因人而异
- 帧率在30 FPS一下的动画，让人感觉到明显的卡顿和不舒氏
- 帧率波动很大的动画，也会让人感觉到卡顿

#### 逻辑统计
利用requestAnimationFrame，循环调用，当now大于lastTime+1s时，计算FPS。若小于某个阈值则可以认为当前帧率较差，若连续小于某个阈值，则停止统计，当前页面处于卡顿状态，进入卡顿处理逻辑

更多具体参考：

https://www.cnblogs.com/coco1s/p/8029582.html

## 设备信息
从window.navigator.userAgent中可以获取用户设备信息，如图:
![设备信息-window.navigator.userAgent](./images/performace-01.jpg)

从window.navigator.connection中可以获取设备网络信息

![navigator.connection](./images/performace-02.jpg)

从window.devicePixelRatio可以获取设备像素比
## 上报策略
### pv/uv
监听各种页面切换的情况，SPA页面可以监听hashChange

### 性能数据/设备信息/网络状态
- 在页面离开前上报:beforeUnload/visibilityChange/pagehide...+sendBeancon/ajax
- img标签+切片+压缩
## 总结

![总结](./images/performace-03.jpg)

[前端性能优化指标](https://mp.weixin.qq.com/s/wDKKj5R8SYm-_75Zn1y30A)

[还在看那些老掉牙的性能优化文章么？这些最新性能指标了解下](https://juejin.cn/post/6850037270729359367)