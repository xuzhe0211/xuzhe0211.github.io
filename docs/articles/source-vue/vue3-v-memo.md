---
autoGroup-0: Vue3
title: v-memo
category:
  - 源码学习
tag:
  - vue
  - 源码
---

v-if,v-show控制的是是否渲染,而真正的性能瓶颈，往往在于是否需要重新渲染

面对这个问题，v-if和v-show显的有些无力，而Vue3有一个专门解决此问题的指令：v-memo

## 什么是v-memo
v-memo是一个指令,作用是有条件的跳过一个元素或组件的更新，语法如下：

```html
<div v-memo="[depA, depB]">
    ...
</div>
```
v-memo接收一个依赖数组，只有当数组至少一个值与上次渲染相比发生了变化，Vue才会重新渲染这个div及其子节点。否则将跳过diff过程

## v-memo 的使用场景
v-memo不是用来替代v-if或v-show的，它是专门解决那些令人棘手的渲染性能问题。

其最经典、最有效的应用场景就是优化超长v-for列表，假设有一个包含100个用户的列表，每个用户都有name和status(在线/离线)两个属性

- 没有 v-memo版本

   ```html
    <template>
        <div v-for="user in users" :key="user.id">
            <span>{{ user.name }}</span>
            <span>{{ user.status }}</span>
        </div>
    </template>
   ```
   当用户状态发生变化时，整个列表都会重新渲染，即使只有1个用户的状态发生了变化;Vue理论上需要遍历整个列表，为每个节点创建新的VNode并diff

- 有 v-memo版本

   ```html
    <template>
        <div v-for="user in users" :key="user.id" v-memo="[user.status]">
            <span>{{ user.name }}</span>
            <span>{{ user.status }}</span>
        </div>
    </template>
   ```
   需要注意的是 
   ```js
   v-memo="[user.status]"
   ```
   当某个用户的status改变时，只有他对应的div的v-memo依赖项发生变化，于是只有这个div会被重新渲染，Vue会直接跳过其他999个用户的整个更新过程。

   通过一行代码，我们将O(n)的更新检查开销，降低到O(1)

## 对比
v-once本质上就是v-memo的一个特例，v-once等同于 v-meo="[]"。因为依赖数组是空的，它永远不会改变，所以组件只会在首次渲染后被永远冻结。

v-if 和 v-show 的争论，解决的是“有或无”的渲染问题，但现代前端应用中，更大的性能挑战来自于“多与少”的更新问题。