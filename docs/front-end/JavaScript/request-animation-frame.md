---
title: JS实现持续动画效果
---

## animation(Css)

### 兼容性与属性

> 猛戳[这里](https://caniuse.com/?search=animation)查看兼容性

+ animation-name: 动画名称
+ animation-duration: 动画时长
+ animation-timing-function: 动画执行方式
+ animation-delay: 动画延迟时间
+ animation-iteration-count: 动画执行次数
+ animation-direction: 是否反向执行动画
+ animation-fill-node: 动画执行前后的样式

```
.box {
    width: 200px;
    heigh: 200px;
    background-color: aqua;
    position:absolute;
    left: 0;
    top: 0;
    animation: test 3s linear 2s infinite;
}

@keyframes test {
    from {}
    to {
        width: 50px;
        height: 50px;
        background-color: red;
        opacity: 0.5;
        left: 500px;
        top: 500px;
    }
}

<div class="box"></div>
```

## requestAnimationFrame(JS)

### 兼容性与基本概念

- 优势: 
    - 浏览器可以优化并行的动画动作，更合理的重新排列动作序列，并把能够合并的动作放在一个渲染周期内完成，从而呈现出更流畅的效果
    - 一旦页面不处于浏览器的当前标签，就会停止刷新，这就节省了CPU、GPU和电力

- 使用
    - 持续调用requestAnimFrame即可
    - 可以使用cancelAnimationFrame清除动画

### 举例

```
#anim  {
    position: absolute;
    left: 0;
    width: 150px;
    height: 150px;
    line-height: 150px;
    background: aqua;
    color: white;
    border-radius: 10px;
    padding: 1em;
}

<div id="anim">Click here to start animation</div>

// 兼容处理
window.requestAnimFrame = (function() {
    return (
        window.requestAnimationFrame || 
        window.wikitRequestAnimationFrame || 
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback, element) {
            window.setTimeout(callback, 1000/ 60);
        }
    )
})()

var elem = document.getElementById('anim');
var startTime = undefined;

function render(time) {
    time = Date.now();
    if (startTime === undefined) {
        startTime = time;
    }
    elem.style.left = ((time - startTime) / 10) % 300 + 'px';
    elem.style.top = ((time - startTime) / 10) % 300 + 'px';
    elem.style.borderRadius = ((time - startTime) / 10) % 300 + 'px';
    elem.style.opacity = Math.floor((time - startTime / 100)) % 2 === 0 ? 1 : 0.3
}

elem.onclick = function() {
  (function animloop() {
    render()
    requestAnimFrame(animloop)
  })()
}
```
[参考文档](https://www.jianshu.com/p/fa5512dfb4f5)

### window.requestAnimationFrame

[参考地址](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)

window.requestAnimationFrame()告诉浏览器--你希望执行一个动画,并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

:::danger
注意:若你想在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用window.requestAnimationFrame();
:::

当你准备更新动画时你应该调用此方法。这将使浏览器在下一次重绘之前调用你传入该方法的动画函数(即你的回调函数)。
回调函数执行次数通常是每秒60次，但在大多数遵循W3C建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数想匹配。为了提高性能和电池寿命，因此在大多数浏览器中，当requestAnimationFrame()运行在后台标签页或者隐藏的iframe里时，requestAnimationFrame()会被暂时停用以提升性能和电池寿命。

回调函数会被传入DOMHighResTimeStamp参数，DOMHighResTimeStamp指示当前被requestAnimationFrame()排序的回调函数被触发的时间。在同一个帧中的多个回调函数，他们每一个都会接受到一个相同的时间戳，即使在计算上一个回调函数的工作负载期间已经消耗了一些事件。该时间戳是一个十进制数，单位是毫秒，最小精度是1ms

:::danger
请确保总是使用第一个参数(或其他获得当前事件的方法)计算每次调用之间的时间间隔，否则动画在高刷新率的屏幕中会运行的更快，请参考下面里的做法
:::

#### 语法

:::tip
window.requestAnimationFrame(callback);
:::

##### 参数
- callback

下一次重绘之前更新动画帧所调用的函数(即上面所说的回调函数)。该回调函数会被传入DOMHighResTimeStamp参数，该参数与performance.now()的返回值相同，它表示requestAnimationFrame()开始去执行回调函数的时刻。

- 返回值

一个long正数，请求ID，是返回列表中唯一的标识。是个非零值，没别的意义。你可以传这个值给window.cancelAnimationFrame()以取消回调函数。

##### 范例

```
const element = document.getElementById('some-element-you-want-to-animate');
let start;

function step(timestamp) {
    if (start === undefined) {
        start = timestamp;
    }
    const elapased = timestamp - start;

    // 这里使用`Math.min()`确保元素刚好停在200px的位置
    element.style.transform = `translateX(${Math.min(0.1 * elapsed, 200)}px)`;

    // 在两秒后停止动画
    if (elapsed < 2000) {
        window.requestAnimationFrame(step);
    }
}

window.requestAnimationFrame(step);
```