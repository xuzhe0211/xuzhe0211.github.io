---
autoGroup-13: WebAPI
title: 前端最重要的几个 Observer
---
Javascript的Observer模式扮演者至关重要的角色,Observer模式允许开发者监听对象的变化，并在变化时自动执行相应的操作。这种机制在前端开发中尤为重要，尤其是在处理动态数据、用户交互和异步操作时。

接下来盘点一下Javascript中那些至关重要的Observer

## MutationObserver 监听DOM变化
MutationObserver是Javascript中用于监听DOM树变化的接口。它可以在DOM节点被添加、删除或修改时触发回调函数。与旧的Mutation Events相比，MutationObserver更加高效和灵活

### 使用场景
- 动态加载内容时，监听新元素的插入
- 监听元素属性变化，如class、style等
- 监听子节点的变化，如添加或删除子元素

实例代码
```js
// 获取需要观察的目标元素
const targetNode = document.getElementById('target');

// 配置观察选项：监听属性变化、子节点以及子树的变化
const config = {
    attributes: true,
    childList: true,
    subtree: true
}

// 定义回调函数，当观察到变化时执行
const callback = function(mutationsList, observer) {
    // 遍历所有观察到的变化
    for(let mutation of mutationsList) {
        if(mutation.type === 'childList') {
            console.log('子节点发生变化')
        } else if(mutation.type === 'attributes'){
            console.log('属性发生变化:', mutation.attributeName)
        }
    }
}

// 创建MutationObserver实例，并传入回调函数
const observer = new MutationObserver(callback);

// 开始观察目标节点，传入配置项
observer.observe(targetNode, config);

// 如果需要停止观察，可以调用disconnect方法
observer.disconnect();
```
## IntersectionObserver 监听元素可见性
IntersectionObserver用于监听目标元素与其祖先元素或视口的交叉状态。它可以帮助开发者判断元素是否进入或者离开窗口，从而实现懒加载、无限滚动等功能

### 使用场景
- 图片懒加载:当图片进入视口时在加载
- 无限滚动:监听列表底部元素，触发加载更多内容
- 广告曝光统计:统计广告元素的曝光次数

```js
// 获取需要观察的目标元素
const target = document.getElementById('lazy-images');

// 配置观察选项
const options = {
    root: null, // 根元素，默认为视口
    rootMargin: '0px', // 根元素的外边距
    threshold: 0.5 // 交叉比例阈值，当目标元素进入或离开根元素的50%时触发回调
}
// 定义回调函数，当目标元素与视口交叉时执行
const callback = function(entries, observer) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            console.log('元素进入视口');
            //加载图片(将data-src的值赋给src)
            entry.target.src = entry.target.dataset.src;
            observer.unobserve(entry.target);
        }
    })
}
// 创建IntersectionObserver实例，并传入回调函数和配置项
const observer = new IntersectionObserver(callback, options);

// 开始观察目标元素
observer.observe(target);
```
## ResizeObserver 监听元素尺寸变化
ResizeObserver用于监听元素尺寸变化。与传统的window.resize事件不同，ResizeObserver可以精确监听单个元素的尺寸变化，而不受页面其他部分影响

### 使用场景
- 响应式布局：根据元素尺寸动态调整布局
- 图表重绘：当容器尺寸变化时，重新绘制图表
- 自适应组件：根据父容器尺寸调整子组件大小

```js
// 获取需要观察的目标元素
const target = document.getElementById('resizeable');

// 定义回调函数，当目标元素尺寸变化时执行
const callback = function(entries, observer) {
    for(let entry of entries) {
        // 获取元素新尺寸
        const {
            width,
            height
        } = entry.contentRect;
        console.log(`元素新尺寸: ${width}x${height}`);
    }
}
// 创建ResizeObserver实例，并传入回调函数
const observer = new ResizeObserver(callback);  

// 开始观察目标元素
observer.observe(target);
```
## PerformanceObserver 监听性能指标
PerformanceObserver 用于监听性能相关的指标，如资源加载时间、首次绘制时间等。它可以帮助开发者分析和优化页面性能

### 使用场景
- 监控页面加载性能
- 分析资源加载时间
- 监控场任务和用户交互延迟

```js
// 定义回调函数，当性能指标变化时执行
const callback = function(list, observer) {
    for(let entry of list.getEntries()) {
        console.log(`性能指标: ${entry.name}, 耗时: ${entry.duration}`);
    }
}
// 创建PerformanceObserver实例，并传入回调函数
const observer = new PerformanceObserver(callback);

// 开始观察性能指标
observer.observe({
    entryTypes: ['resource', 'paint', 'longtask']
});

// 停止观察性能指标
observer.disconnect();
```
