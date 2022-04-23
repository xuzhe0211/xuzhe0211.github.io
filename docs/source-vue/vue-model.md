---
autoGroup-1: Tips API
title: v-model
---

## v-model和sync修饰符
**场景**

在用vue开发的过程中我们经常会遇到父子组件公用同一变量的情况，那么在这种情况下，我们肯定会想直接把变量传过来用，因为是单向数据流所以子组件修改这个变量，会报错

**问题**

对于这种问题，我们就可以在父组件中用v-model或者用一个属性加上sync修饰符并在组组件使用$emit('x:update', v)来解决，这两个东西有什么区别

**结论**

个人认为两者只是语法上的区别，一次来实现两个组件之间的数据的流动，sync更灵活一点，如果是v-model的话子组件只能用value来接这个参数了，sync随意

**延伸**

官方说到：组件实例的作用域是独立的，这意味着不能(也不该)在组组件的模板内引用父组件的数据，父组件需要更多的prop才能下发到子组件内

## 自定义组件的v-model
一个组件上的<span style="color:#d63200">v-model</span>默认会利用名为<span style="color:#d63200">value</span>的prop和名为<span style="color:#d63200">input</span>的事件，但是像单选框、复选框等类型的输入控件可能会将<span style="color:#d63200">value</span> attribute用于<span style="color: blue">不同的目的</span>.<span style="color:#d63200">model</span>选项可以用来避免这样的冲突
```javascript
Vue.component('base-checkbox', {
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        checked: Boolean
    },
    template: `
        <input 
            type="checkbox"
            v-bind:checked = "checked"
            v-on:change="$emit('change', $event.target.checked)"
    `
})
```
现在在这个组件上使用<span style="color:#d63200">v-model</span>的时候
```javascript
<base-checkbox v-model="lovingVue"></base-checkbox>
```
这里的<span style="color:#d63200">lovingVue</span>的值将会传入这个名为<span style="color:#d63200">checked</span>的prop。同时当<span style="color:#d63200">&lt;base-checkbox&gt;</span>触发一个<span style="color:#d63200">change</span>时间并附带一个新的值的时候，这个<span style="color:#d63200">lovingVue</span>的property将会更新

:::danger
注意你仍然需要在组件的 props 选项里声明 checked 这个 prop。
:::

## 资料
[vue自定义组件v-model](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)