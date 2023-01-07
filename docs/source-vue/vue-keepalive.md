---
autoGroup-1: Tips API
title: vue-keepalive
---

当组件在keep-alive内被切换时组件的activated、deactivated这两个生命周期钩子函数会被执行

## 使用
<span style="color: red">tab切换、列表分页在第xx页跳转返回使用keep-alive</span>


:::danger
mitt vue3 通信

command+.  vue自动import引入
:::

## activated deactivated
:::tip
activated、deactivated这两个生命周期函数一定是要在**使用了keep-alive组件后才有的**，否则则不存在当引入keep-alive的时候，<span style="color: red">页面第一次进入，钩子的触发顺序created->mounted->activated,退出时触发deactivated。**当再次进入(前进或后退)时，只触发activated**</span>
:::


[keep-alive用法以及activated,deactivated生命周期的讲解](https://blog.csdn.net/yuan_jlj/article/details/118187147)

[vue keep-alive实现动态缓存以及缓存销毁](https://segmentfault.com/a/1190000019788203)