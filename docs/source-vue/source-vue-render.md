---
autoGroup-9: vue原理
title: vue源码学习-vnode的挂载和更新流程
---
## 概述
本文主要介绍在视图的渲染过程中，Vue是如何把vnode解析并挂载到页面中。我们通过一个最简单的例子来分析主要流程
```html
<div id="app">
    {{someVar}}
</div>
<script type="text/javascript">
    new Vue({
        el: '#app',
        data: {
            someVar: 'init'
        },
        mounted() {
            setTimeout(() => this.someVar = 'changed', 3000);
        }
    })
</script>
```
页面初始会显示"init"字符串，3秒之后，会更新为"changed"字符串。

为了便于理解，将流程分为两个阶段
1. 首次渲染，生成vnode,并将其挂载到页面中
2. 再次渲染，根据更新后的数据，再次生成vnode，并将其更新到页面中

## 第一阶段
### 流程
```js
vm.$mount(vm.$el) => render => compileToFunctions(template).render => updateComponent() => vnode => render() => vm._update(vnode) => patch(vm.$el, vnode)
```

## 第二阶段
### 流程
```js
updateComponent => vnode => render() => vm._update(vnode) => patch(oldVnode,vnode);
```

## 资料
[vue 声明周期](/source-vue/vue-statement.html#vue的父子组件生命周期)

[vue源码学习-vnode的挂载和更新流程](https://www.cnblogs.com/zhaoran/p/7600849.html)