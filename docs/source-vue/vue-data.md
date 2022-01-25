---
autoGroup-1: Tips API
title: vue数据依赖
---

1. initState的过程中,将props、computed、data等属性通过Object.defineProperty来改造其getter/setter属性，并为每一个响应式属性实例化一个Observer观察者，这个Oberver内部dep记录了这个响应式属性的所有依赖。

2. 当响应式属性调用setter函数时，通过dep.notify()方法去遍历所有依赖，调用watcher.update去完成数据动态响应
