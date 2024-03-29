---
autoGroup-7: 浏览器
title: requestIdleCallback和requestAnimationFrame详解
---
## 页面流畅与FPS
页面是一帧一帧绘制出来的,当每秒绘制的帧数(FPS)达到60时，页面是流畅的，小于这个值时，用户会感觉到卡顿

1s 60帧,所以每一帧分到的时间是1000/60≈16ms。所以我们书写代码时力求不让一帧的工作量超过16ms

## Frame(帧)
<span style="color: red">那么浏览器每一帧都需要完成哪些工作？</span>

![浏览器一帧完成哪些任务](./images/1665129770681.jpg)

通过上图可看到,一帧内需要完成如下六个步骤的任务
- <span style="color: blue">处理用户的交互</span>
- <span style="color: blue">JS解析执行</span>
- <span style="color: blue">帧开始---窗口尺寸变更，页面滚动等的处理</span>
- <span style="color: blue">requestAnimationFrame(RAF)</span>
- <span style="color: blue">布局</span>
- <span style="color: blue">绘制</span>

## requestIdleCallback
<span style="color: red">上面六个步骤完成后没超过16ms，说明时间有富裕，此时会执行requestIdleCallback里注册的任务</span>

![requestIdleCallback](./images/1665130198731.jpg)

从上图也可看出，<span style="color: blue">**和requestAnimationFrame 每一帧必定会执行不同,requestIdleCallback是捡浏览器空闲来执行任务**</span>

如此一来，假如浏览器一直处于非常忙碌的状态，requestIdleCallback注册的任务有可能永远不会执行。此时可通过设置timeout(见下面API介绍)来保证执行
---
## API
```js
var handle = window.requestIdleCallback(callback[, options]);
```
- <span style="color: blue">callback:回调，即空闲时需要执行的任务，该回调接收一个IdleDeadline对象作为入参。其中IdleDeadline对象包含</span>
    - didTimeout,布尔值，表示任务是否超时,结合timeRemaining使用
    - timeRemaining()，表示当前帧剩余的时间，也可以理解为留给任务的时间还有多少
- <span style="color: blue">options: 目前options只有一个参数</span>
    - timeout。表示超过这个时间后，如果任务还没执行，则强制执行，不必等待空闲

> IdleDeadline 对象参考[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/IdleDeadline)

```js
requestIdleCallback(myNonEssentialWork, {timeout: 2000});
// 任务队列
const tasks = [
    () => {
        console.log("第一个任务");
    },
    () => {
        console.log("第二个任务");
    },
    () => {
        console.log("第三个任务");
    },
];
​
function myNonEssentialWork(deadline) {
    // 如果帧内有富裕的时间，或者超时
    while((deadline.timeRemaining() > 0 || !deadline.didTimeout) && tasks.length > 0) {  // deadline.didTimeout为true的时候超时
        work();
    }
    if(tasks.length > 0) {
        requestIdleCallback(myNonEssentialWork);
    }
}

function work() {
    tasks.shift()();
    console.log('执行任务')
}
```
<span style="color: red">超时的情况，其实就是浏览器很忙，没有空闲时间，此时会等待指定的timeout那么久再执行，通过入参deadline拿到的didTimeout会为true,同时timeRemaining()返回的也是0。超时的情况下如果继续执行的话，肯定会出现卡顿的，因为必然会将一帧的时间拉长。</span>

## cancelIdleCallback
与setTimeout类似，返回一个唯一的id，可通过cancelIdleCallback来取消任务

## 总结
一些低优先级的任务可使用requestIdleCallback等浏览器不忙的时候来执行，同时因为时间有限，它所执行的任务应该尽量能够量化，细分的微任务(mirco task)；

<span style="color: red">**因为它发生在一帧的最后，此时页面布局已经完成，所以不建议在 requestIdleCallback里在操作DOM，这样会导致页面再次重绘**</span>。**DOM操作建议在RAF中进行**。同时，操作DOM所需要的耗时是不确定的，因为会导致重新计算布局和视图的绘制，所以这类操作不具备可预测性

<span style="color: red">**Promise也不建议在这里面进行，因为Promise的回调属性Event Loop中优先级较高的一种微任务，会在requestIdleCallback结束时立即执行，不管此时是否还有富裕的时间，这样有很大可能会让一帧超过16ms**</span>

### window.requestAnimationFrame
在没有requestAnimationFrame方法的时候，执行动画，我们可能使用 setTimeout或 setInterval 来触发视觉变化；但是这种做法的问题是：回调函数执行的时间是不固定的，可能刚好就在末尾，或者直接就不执行了，经常会引起丢帧而导致页面卡顿

![requestAnimationFrame](./images/1665134282756.jpg)

归根到底发生上面的问题的原因在于时机，也就是浏览器要如何对回调函数进行响应。<span style="color: blue">**setTimeout或setInterl 是使用定时器来触发回调函数的，而定时器并无法保证能够准确无误的执行，有许多因素会影响它的运行时机，比如说:当有同步代码执行时，会先等同步代码执行完毕，异步队列中没有其他任务，才会轮到自己执行。**</span>。并且，我们知道每一次重新渲染的最佳时间大约是16.6ms，如果定时器的时间间隔过短，就会造成[过度渲染](https://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%E5%8A%A8%E7%94%BB%E7%AE%97%E6%B3%95/),增加开销；过长又会延迟渲染，使动画不流畅

<span style="color: blue">requestAnimationFrame 方法不同与 setTimeout 或 setInterval，它是由系统来决定回调函数的执行时机的，会请求浏览器在下一次重新渲染之前执行回调函数。无论设备的刷新率是多少，requestAnimationFrame 的时间间隔都会紧跟屏幕刷新一次所需要的时间</span>；例如某一设备的刷新率是 75 Hz，那这时的时间间隔就是 13.3 ms（1 秒 / 75 次）。**需要注意的是这个方法虽然能够保证回调函数在每一帧内只渲染一次，但是如果这一帧有太多任务执行，还是会造成卡顿的；因此它只能保证重新渲染的时间间隔最短是屏幕的刷新时间**。

requestAnimationFrame 方法的具体说明可以看 MDN 的相关文档，下面通过一个网页动画的示例来了解一下如何使用。

```js
let offsetTop = 0;
const div = document.querySelector('.div');
const run = () => {
    div.style.transform = `translate3d(0, ${offsetTip += 10}px, 0)`;
    window.requestAnimationFrame(run);
}
run();
```
如果想要实现动画效果，每一次执行回调函数，必须要再次调用 requestAnimationFrame 方法；与 setTimeout 实现动画效果的方式是一样的，只不过不需要设置时间间隔。



## 资料
[时间分片](/front-end/JavaScript/basices-time-siicing.html)

[requestIdleCallback和requestAnimationFrame详解](https://www.cnblogs.com/cangqinglang/p/13877078.html)