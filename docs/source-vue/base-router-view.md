---
title: Vue router-view key属性解释
---

router-view作用，你可以router-view当做是一个容器，它渲染的组件是你使用vue-router指定的
```html
<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key">
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.fullPath
    }
  }
}
</script>
```
这里router-view有一个key的属性，这里key的属性作用是：
1. **<span style="color: blue">不设置router-view的key属性</span>**

  由于Vue会复用相同组件，即/page/1 => /page/2 或者 /page?id=1 => /page?id=2 这类链接跳转时，将不在执行created，mounted之类的钩子，这时候你需要在路由组件中，添加beforeRouteUpdate钩子来执行响应方法拉去数据

  相关钩子顺序：beforeRouteUpdate

2.** <span style="color: blue">设置router-view的key属性值为$route.path</span>**
  
  **从/page/1 => /page/2，由于这两个路由的$route.path并不一样，所以组件被强制不复用，相关钩子顺序为:beforeRouteUpdate => created => mounted**

  从/page?id=1 => /page?id=2，由于这两个路由的$route.path一样，所以和没设置key属性一样，会复用组件,相关钩子顺序为:beforeRouteUpdate

3. **<span style="color: blue">设置router-view的key属性值为$route.fullPath</span>**

  从/page/1 => /page/2，由于这两个路由的$route.fullPath并不一样，所以组件被强制不复用，相关钩子加载顺序为：beforeRouteUpdate => created => mounted

  从/page?id=1 => /page?id=2，由于这两个路由的$route.fullPath并不一样，所以组件被强制不复用，相关钩子加载顺序为:beforeRouteUpdate => created => mounted