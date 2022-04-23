---
title: unhandledrejection
---

当[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)被reject且没有reject处理器的时候，会触发unhandledrejection事件；这可能发生在window下，但也可能发生在[Workder](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker)中。这对于调试回退错误处理非常有用

-|-
---|---
是否冒泡| NO
是否可以取消|Yes
接口|[PromiseRejectionEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/PromiseRejectionEvent)
事件处理器属性|[onunhandlerejection](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onunhandledrejection)

## 使用备注
unhandledrejection继承PromiseRejectionEvent，而[PromiseRejectionEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/PromiseRejectionEvent)又继承自[Event](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)。因此unhandledrejection含有PromiseRejectionEvent和Event的属性和方法

## 基本的异常上报
此实例只是将有关未处理的Promise rejection信息打印到控制台
```javascript
window.addEventListener('unhandledrejection', event => {
    console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
})
```
您还可以使用 onunhandledrejection (en-US) 事件处理程序属性来设置事件侦听器:
```javascript
window.onunhandledrejection = event => {
  console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
};
```
## 防止默认处理
许多环境(例如 Node.js ) 默认情况下会向控制台打印未处理的 Promise rejections。您可以通过添加一个处理程序来防止 unhandledrejection 这种情况的发生，该处理程序除了您希望执行的任何其他任务之外，还可以调用 preventDefault() 来取消该事件，从而防止该事件冒泡并由运行时的日志代码处理。这种方法之所以有效，是因为 unhandledrejection 是可以取消的
```javascript
window.addEventListener('unhandledrejection', function (event) {
  // ...您的代码可以处理未处理的拒绝...

  // 防止默认处理（例如将错误输出到控制台）

  event.preventDefault();
});
```