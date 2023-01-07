---
autoGroup-9: vue原理
title: vue组件中的方法执行顺序是怎么样的？data和props执行顺序
---

在vue的源码中的initState初始化方法中就有执行的一个顺序

[见源码]( https://github.com/vuejs/vue/blob/dev/src/core/instance/state.js#L48-L62)

<span style="color: red;font-weight:bold">Props -> Methods -> Data -> Computed -> Watch</span>

![initState初始化方法顺序](./images/20200703174539735.png)