---
autoGroup-1: Tips API
title: vue-$forceUpdate
category:
  - 源码学习
tag:
  - vue
  - 源码
---


vue强制更新

添加this.$forceUpdate();进行强制渲染，效果实现。因为数据层次太多，render函数没有自动更新，需要手动强制更新。

调用强制更新方法this.$forceUpdate()会更新视图和数据，触发updated生命周期.





