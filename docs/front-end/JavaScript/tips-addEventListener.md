---
autoGroup-16: Tips/方法实现
title: addEventListener 的第三个参数，提升页面滚动性能
---
## demo
```html
<div id="id1" style="width: 200px;height: 200px; position:absolute;top:100px;left: 100px;background-color:blue; z-index: 4">
    <div id="id2" style="width: 200px;height: 200px;position:absolute;top: 20px;left:70px;background:green; z-index:1">
</div>
```
addEventListener中的第三个参数是useCapture,一个bool类型。当为false时为冒泡获取(由里向外)，true为capture方式(由外向里)

```js
document.addEventListener('id1').addEventListener('click', function() {console.log('id1')}; false);

document.addEventListener('id2').addEventListener('click', function() {console.log('id2')}, false);
```

点击id2的结果是id2, id1

```js
document.getElementById('id1').addEventListener('click', function() {console.log('id1')},true);

document.getElementById('id2').addEventListener('click', function() {console.log('id2')}, true);
```
结果是id1, id2;

## 概念

**DOM方法addEventListener()和removeEventListener()是用来分配和删除事件的函数**。这两个方法都需要三个参数，分别为事件名称(String)、要触发的事件处理函数(Function)、指定事件处理函数的时期或阶段(boolean)。

DOM事件流如图

![DOM事件流如图](./images/110857551929664.png)

addEventListener 用来在页面中监听事件，它的参数签名是这样的：
```js
target.addEventListener(tpye, listener[, useCapture]);
```
但是如果你现在去查询MDN的文档却发现是这样写的：
```js
target.addEventListener(type, listener[, options]);
target.addEventListener(type, listener[, useCapture]);
```
<span style="color:blue">最后一个参数 useCapture 在很久之前是必填的，后来的规范将useCapture变成了选填。useCapture参数用来控制监听器是在捕获阶段执行还是冒泡阶段执行，true 为捕获阶段，false为冒泡阶段，变成选填后默认值为false(冒泡阶段)，因为传true的情况太少了</span>

此过程称为事件传播。如果我们为每个元素都绑定事件，那么在事件冒泡过程中，子元素最先响应事件，然后依次向父元素冒泡。

在事件处理函数中，会传递Event对象作为参数，而这个参数最常用的2个方法就是event.preventDefault()和event.stopPropagation()

- stopPropagation()阻止事件传播
- preventDefault()阻止事件的默认行为

在移动网页中，我们经常使用的就是touch系列的事件，如：
- touchstart
- touchmove
- touchend
- touchcancel

我们使用如下方式绑定touchstart事件：
```js
div.addEventListener('touchstart', function(e) {
    // do sth.
})
```
由于第三个参数没有传值，那么默认就是false，也就是这个事件在冒泡阶段被处理，如果调用了stopPropagation()则div的父元素就无法接收到这个事件

那么如果我们调用了preventDefault()呢？如果你曾经给超链接a标签绑定过click事件应该就知道发生什么了。当a标签点击时，它的默认行为是跳转到href指定的连接，如果我们调用了preventDefault就阻止了a标签点击事件的默认行为(如果你使用jquery通过return false可以阻止事件默认行为，但是深记You Might Not Need jQuery)

<span style="color: red">如果我们在touchstart事件调用preventDefault会怎样呢？这时页面会禁止，不会滚动或缩放。那么问题来了：浏览器无法预先知道一个监听器会不会调用preventDefault()，它需要等监听器执行完后，在去执行默认行为，而监听器执行是耗时的，这样就会导致页面卡顿</span>

这段翻译的太专业了，你可以这么理解：当你触摸滑动页面时，页面应该跟随手指一起滚动。而此时你绑定了一个 touchstart 事件，你的事件大概执行 200 毫秒。这时浏览器就犯迷糊了：如果你在事件绑定函数中调用了 preventDefault，那么页面就不应该滚动，如果你没有调用 preventDefault，页面就需要滚动。但是你到底调用了还是没有调用，浏览器不知道。只能先执行你的函数，等 200 毫秒后，绑定事件执行完了，浏览器才知道，“哦，原来你没有阻止默认行为，好的，我马上滚”。此时，页面开始滚。

而且 Chrome 做了统计：
:::tip
在 Android 版 Chrome 浏览器的 touch 事件监听器的页面中，80% 的页面都不会调用 preventDefault 函数来阻止事件的默认行为。在滑动流畅度上，有 10% 的页面增加至少 100ms 的延迟，1% 的页面甚至增加 500ms 以上的延迟。
:::
也就是说，当浏览器等待执行事件的默认行为时，大部分情况是白等了。如果 Web 开发者能够提前告诉浏览器：“我不调用 preventDefault 函数来阻止事件事件行为”，那么浏览器就能快速生成事件，从而提升页面性能。

Chrome官方有个视频测试：https://www.youtube.com/watch?v=NPM6172J22g （需科学上网）

<span style="color: blue">而passive就是为此而生的。在WIGG的demo中提到，即使滚动事件里面写一个死循环，浏览器也能够正常处理页面滚动</span>

在最新的DOM规范中，事件绑定函数的第三个参数编程了对象
```js
target.addEventListener(type, listener[, options])
```
<span style="color: red">我们可以通过传递passive为true来明确告诉浏览器，事件处理程序不会调用preventDefault来阻止默认滑动行为</span>

在Chrome浏览器中，如果发现耗时超过100毫秒的非passive的监视器，会在DevTools里面警告你加上{passive: true}.

Chrome51和Firefox49已经支持passive属性，如果浏览器不支持有人做了非常巧妙的polyfill
```js
var supportsPassive = false;
try {
    var opts = Object.defineProperty({}, 'passive', {
        get: function() {
            supportsPassive = true
        }
    })
    window.addEventListener('test', null, opts)
} catch(e) {}

elem.addEventListener('touchstart', fn, supportsPassive ? {passive: true} :  false)
```


## 资料
[addEventListener 的第三个参数，提升页面滚动性能](https://github.com/justjavac/the-front-end-knowledge-you-may-not-know/blob/master/archives/006-web-scrolling-performance-optimization-passive-event-listeners.md)


