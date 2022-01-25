---
autoGroup-16: Tips/方法实现
title: 日常必备的JS工具函数大全
---

## 为元素添加on方法

```
Element.prototype.on = Element.prototype.addEventListener;

NodeList.prototype.on = function(event, fn) {
    []['forEach'].call(this, function(el) {
        el.on(event, fn);
    })
    return this;
}
```

## 为元素添加trigger方法
```
Element.prototype.trigger = function(type, data) {
    var event = document.createEvennt('HTMLEvents');
    event.initEvent(type, true, true);
    event.data = data || {};
    event.eventName = type;
    event.target = this;
    this.dispatchEvent(event);
    return this;
}
NodeList.prototype.trigger = function(event) {
    []['forEach'].call(this, function(e) {
        el['trigger'](event);
    })
    return this;
}
```

## 资料
[原文](https://mp.weixin.qq.com/s/F6HYjmXF99Zk2PTfBgjfBA)