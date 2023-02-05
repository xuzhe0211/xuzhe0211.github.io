---
autoGroup-0: Vue3
title: 浅析Vue3中如何通过v-model实现父子组件的双向数据绑定及利用computed简化父子组件双向绑定 
---
## vue2中sync修饰符的功能在vue3中如何呈现
1. sync修饰符回顾

    :::tip
    1. vue规则：props是单向向下绑定的,子组件不能修改props接收过来的外部数据
    2. 如果在子组件中修改props，Vue会向你发出一个警告。(无法通过修改子组件的props来更改父组件)而若需要在组组件更新数据时通知父组件同步更新，需要结合$emit和v-on实现
    3. 而sync修饰符的作用则是简化时间声明及监听的写法
    :::
    如下例子,比较sync和正常修改数据通知外层的写法：可以看到sync修饰符确实简便了很多
    ```html
    // 父组件
    <template>
        <div>数量： {{num}}</div>
        <!-- <ChildComponent :num="num" @increase="num = $event"/> -->
        <ChildComponent :num.sync="num"/>
    </template>

    // 子组件
    <template>
        <div @click="addNum">接收数量</div>
    </template>
    <script>
        export default {
            props: ['num'],
            //data() {
                //return {
                    //childNum: this.num
                //}
            //},
            methods: {
                addNum() {
                    //this.childNum++;
                    //this.$emit('increase', this.childNum)
                    this.$emit('update:num', this.num + 1)
                }
            }
        }
    </script>
    ```
2. sync的语法糖功能在vue3中图和编写使用

    vue3中，通过v-model:propName实现自定义组件间数据的双向绑定。使用方法：
    1. 父组件通过"v-model:绑定的属性名"传递数据属性，支持绑定多个属性
    2. 子组件配置emits，通过"update:属性名"的格式定义更新事件

## 如何通过v-model实现父子组件的双向数据绑定
Vue3父子组件双向数据绑定写法做了些许改变，同时也支持多个数据双向绑定
### 1.单个数据双向绑定
```js
// 父组件
// v-model 没有指定参数名，子组件默认参数名是modelValue
<ChildComp v-model="search"/>
```
:::danger
需要注意的是：
1. 子组件也并不是直接拿props传的变量直接用，而是需要声明一个响应式变量-通过ref(props.modelValue)声明基于props传的变量值为初始化值的响应式数据
2. 且如果父组件传的是异步数据的话，还需要对其进行监听
3. 当子组件数据改变时需要通过emit('update:modelValue', e) 去修改父组件数据实现双向绑定
:::

```html
<template>
    <div>
        <input v-model="sea" @input="valChange(sea)"/>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
export default defineComponent({
    name: 'ChildComp',
    props: {
        modelValue: { // 父组件v-model没有指定参数名，则默认是modelValue
            type: String, 
            default: ''
        }
    },
    setup(props, { emit }) {
        // input初始化
        const sea = ref(props.modelValue);
        // 如果父组件传过来的数据是异步获取的，则需要进行监听
        watch(() => props.modelValue, () => sea.value = props.modelValue);
        // 数据双向绑定
        function valChange(e: string) {
            emit('update:modelValue', e);
        }
        return {
            sea,
            valChange
        }
    }
})
</script>
```
### 多个数据双向绑定--与但数据绑定差别不大
```js
// 父组件
<ChildComp v-model="search" v-model:address="addr" />
```

```js
export default defineComponent({
    // 子组件对应为
    props: {
        modelValue: { // 父组件 v-model 没有指定参数名，则默认是modelValue
            type: String,
            default: ''
        },
        address: { // 父组件 v-model 有指定参数名，则指定参数名
            type: String,
            default: ''
        }
    }
    setup(props, { emit }) {
        // input 初始化
        const sea = ref(props.modelValue);
        const add = ref(props.address);
        // 如果父组件传过来的数据是异步获取的，需要进行监听
        watch(() => props.modelValue, () => { sea.value = props.modelValue; });
        watch(() => props.address, () => { add.value = props.address });

        // 数据双向绑定
        emit('upate:modelValue', e);
        emit('update:address', e);
    }
})
```
### 3.利用computed简化父子组件双向数据绑定
上面是通过ref声明响应式数据，其实可以通过computed计算属性的 get/set 去简化操作。如下：
```js
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['update:modelValue']);
const show = computed({
    get() {
        return props.modelValue
    }, 
    set(v) {
        emit('update:modelValue', v)
    }
})
```
## 资料
[浅析Vue3中如何通过v-model实现父子组件的双向数据绑定及利用computed简化父子组件双向绑定 ](https://www.cnblogs.com/goloving/p/15514672.html)