---
title: RxJS
---
在现代前端开发中，我们面临着复杂的异步场景:用户输入事件、AJAX请求、WebSocket通信、动画时序控制... 传统的回调函数和Promise在处理这些场景时，容易出现「回调地狱」和难以维护的问题

RxJS(Reactive Extensions for Javascript)作为响应式编程的经典实现，通过可组合的 Observable 序列，为我们提供了更优雅的异步解决方案

## 核心概念解析
### Observable(可观察对象)
Observerable 是RxJS的核心，代表一个可观察的数据流。它具备三个重要特征
- 惰性执行:只有被订阅才会启动
- 可推送多个值:通过next方法连续发送
- 支持完成/错误通知

```js
import { Observable } from 'rxjs';

// 创建Observable
const numberObservable = new Observable(subscriber => {
    let count = 0;
    const timer = setInterval(() => {
        subscriber.next(count++);
        if(count > 5) {
            subscriber.complete();
            clearInterval(timer);
        }
    }, 1000)
})

// 订阅Observable
const subscription = numberObservable.subscribe({
    next: value => console.log(`Received: ${value}`),
    error: err => console.error(`Error: ${err}`),
    complete: () => console.log('Completed!')
})

/**
 * 输出
 * Received: 0 (1秒后)
 * Received: 1 (1秒后)
 * ...
 * Received: 6 (6秒后)
 * Stream completed
 */
```
### Observer(观察者)
Observer是包含三个回调方法的对象，用于处理Observable发出的不同通知
```js
const observer = {
    next:value => {/**处理数据 */},
    error:err => {/**处理错误 */},
    complete:() => {/**处理完成 */}
}
```
### Subscription(订阅)
Subscription表示 Observable的执行,通过 unsubscribe() 可以提前终止数据流

```js
// 取消订阅
setTimeout(() => {
    subscription.unsubscribe();
    console.log('Unsubscribed!');
}, 2500)
/**
 * 输出
 * Received: 0 
 * Received: 1 
 * Unsubscribed!
 */
```
## 强大的操作符体系
RxJS提供了了超过100个操作符，以下是常见的分类
### 1. 创建型操作符
```js
import { fromEvent, interval } from 'rxjs';

// DOM事件转 Observable
const click$ = fromEvent(document, 'click');

// 定时器 Observable
const timer$ = interval(1000);
```
### 过滤性操作符

[原文](https://mp.weixin.qq.com/s/7oj-RhIRJWIVO7MWjiG8DQ)