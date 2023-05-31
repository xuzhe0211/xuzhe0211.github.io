---
autoGroup-7: 浏览器
title: 面试官：前端跨页面通信，你知道哪些方法？
---
## 引言
在浏览器中,我们可以同时打开多个Tab页,每个Tab页可以粗略理解为一个"独立"的运行环境，即使是全局对象也不会在多个Tab间共享。然而有些时候，我们希望能够在这些"独立“的Tab页面之间同步页面的数据、信息或状态

正如下面的例子：我在列表页点击收藏后，对应的详情页按钮会自动更新为已收藏状态；类似的，在详情页点击收藏后，列表页中按钮也会更新

![demo](./images/169d767c01990c37~tplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0.jpg)

这就是我们所说的前端跨页面通信。

你知道哪些页面通信的方式呢？如果不清楚，下面我就带大家来看看七种跨页面通信的方式

## 一、同源页面间的跨页面通信
> 以下各种方式的[在线Demo可以戳这里](https://alienzhou.github.io/cross-tab-communication/)

浏览器的同源策略在下述的一些跨页面通信方法中依然存在限制。因此，我们先来看看，在满足同源策略的情况下，都有哪些技术可以用来实现跨页面通信
### 1. BroadCast Channel
BroadCast Channel可以帮我们创建一个用于广播的通信频道。当所有页面都监听同一个频道的消息时，其中某一个页面通过它发送的消息就会被其他所有页面收到。它的API和用法都非常简单。

下面的方式就可以创建一个标识为 AlienZHOU的频道
```js
const bc = new BroadcastChannel('AlienZHOU');
```
各个页面可以通过onmessage来监听被广播的消息
```js
bc.onmessage = function(e) {
    const data = e.data;
    const text = `[receive] ${data.msg} --- tab ${data.from}`;
    console.log('[BroadcastChannel] receive message:', text)
}
```
要发送消息时值需要调用实例上的postMessage方法既可
```js
bc.postMessage(mydata)
```
Broadcast Channel 的具体的使用方式可以看这篇[《【3分钟速览】前端广播式通信：Broadcast Channel》](https://juejin.cn/post/6844903811228663815)。

### 2. Service Worker
Service Worker是一个可以长期运行在后台的Worker,能够实现与页面的双向通信。多页面共享间的Service Worker可以共享，将Service Worker作为消息的处理中心(中央站)即可实现广播效果

> Service Worker 也是 PWA 中的核心技术之一，由于本文重点不在 PWA ，因此如果想进一步了解 Service Worker，可以阅读我之前的文章[【PWA学习与实践】(3) 让你的WebApp离线可用](https://juejin.cn/post/6844903588691443725)。

首先，需要在页面注册Service Worker
```js
// 页面逻辑
navigator.serviceWorker.register('../util.sw.js').then(function() {
    console.log('Service Worker 注册成功')
})
```
其中../util.sw.js是对应Service Worker脚本。Service Worker本身并不自动具备"广播通信"的功能，需要我们添加些代码，将其改造成消息中转站

```js
// util.sw.js Service Worker逻辑
self.addEventListener('message', function(e) {
    console.log('service worker receiver message', e.data);
    e.waitUntil(
        self.clients.matchAll().then(function(clients) {
            if (!clients || clients.length === 0) {
                return;
            }
            clients.forEach(function (client) {
                client.postMessage(e.data);
            });
        })
    )
})
```
我们在Service Worker中监听了message事件，获取页面(从Service Worker的角度叫client)发送的消息。然后通过self.clients.matchAll()获取当前注册了该Service Worker的所有页面，通过调用每个Client(即页面)的postMessage方法，想页面发送消息。这样就把从一处（某个Tab页面）收到的消息通知给了其他页面。

处理完Service Worker，我们需要在页面监听Service Worker发送来的消息
```js
navigator.serviceWorker.addEventListener('message', function(e) {
    const data = e.data;
    const text = '[receive] ' + data.msg + '---tab ' + data.from;
    console.log('[Service Worker] receive message:', text);
})
```
最后，当需要同步消息时，可以调用 Service Worker 的postMessage方法：
```js
navigator.serviceWorker.controller.postMessage(mydata)
```

### 2. LocalStorage



## 资料
[面试官：前端跨页面通信，你知道哪些方法？](https://juejin.cn/post/6844903811232825357)