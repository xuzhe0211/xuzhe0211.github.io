---
autoGroup-1: Tips API
title: PetiteVue
---

## 正常vue开发
1. 引入vue库
2. 定义Counter组件
3. 定义vue实例
4. 响应数据绑定
```
<script src="vue。js"></script>

<div id="counter">
    Counter: {{counter}}
    <button @click="counter++">inc</button>
</div>

<script>
const Counter = {
    data() {
        return {counter: 0}
    }
}
Vue.createApp(Counter).mount('#counter')
</script>
```

## petiteVue

```
<script src="petitle-vue.js" defer init></script>

<div id="counter" v-scope="{counter: 0}">
    Counter: {{counter}}
    <button @click="counter++">inc</button>
</div>
```