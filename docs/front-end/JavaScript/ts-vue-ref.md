---
autoGroup-13: TypeScript
title: Vue3+Ts 项目中 定义 ref 实例 的类型
---
## 前言
在vue3的项目当中，有时候需要使用ref获取到组件的实例对象。当结合 typescript 使用时就需要进行类型的定义才能访问到实例的成员。

就我目前知道的就有三种方式：
- <span style="color: red">自定义类型</span>
- <span style="color: red">使用InstanceType</span>
- <span style="color: red">通过组件的setup函数自动推断</span>

```html
<!-- 组件 child.vue -->
<script lang="ts">
    export default defineComponent({
        setup() {
            const num = ref(0);
            return {
                num
            }
        }
    })
</script>

<!-- 使用的页面 -->
<template>
    <child ref="childRef"/>
</template>
<script lang="ts">
    export default defineComponent({
        setup() {
            const childRef = ref(null); 

            onMounted(() => {
                childRef.value.num; // 如果没有定义类型，这里就无法访问到num
            })
        }
    })
</script>
```
## 自定义类型
当然 我们也可以直接定义 child.vue 组件实例的类型

直接在 child.vue 中定义类型 ChildCtx

```html
<!-- 组件child.vue -->
<script lang="ts">
    // 定义类型
    export interface ChildCtx {
        num: number;
    }

    export default defineComponent({
        setup() {
            const num = ref(0);

            return {
                num
            }
        }
    })
</script>
```
在使用的时候

```html
<template>
    <child ref="childRef"/>
</template>
<script lang="ts">
    import {defineComponent, onMounted} from 'vue';
    import {ChildCtx}, Child from './child.vue';

    export default defineComponent({
        components: {Child},
        setup() {
            // 定义类型
            const childRef = ref<null | ChildCtx>(null);

            onMounted(() => {
                childRef.value?.num; // 这里可以访问到num属性
            })
        }
    })
</script>
```
## 使用InstanceType
InstanceType&lt;T&gt;是ts自带的类型，能够直接获取组件完整的实例类型

```js
import Child from './child.vue';
import {ElImage} from 'elment-plus';

type ElImageCtx = InstanceType<typeof ElImage>;
type ChildCtx = InstanceType<type Child>;

//...
setup() {
    const child = ref<null | ChildCtx>(null);
    const elImgRef = ref<null |  ElImagesCtx>(null);

    onMounted(() => {
        child.value?.num; // 可以直接访问到
        elImgRef.value?.// 对于element 组件，可以访问到很多的属性
    })
}
```
## 通过组件的setup函数自动推断
这样做好像不太好。。。只是提供了一种思路，日常使用的话 用 InstanceType<T> 就好了哈。

```html
<template>
    <child ref="childRef"/>
</template>
<script>
    import {defineComponent, onMounted} from 'vue';
    import Child from './child.vue';

    // 根据组件自动推断
    type ChildCtx = Exclude<ReturnType<Required<typeof Child>['setup']>, void | RenderFunction | Promise<any>>;

    export default   defineComponent({
        components: {Child},
        setup(){
         //定义类型
         const childRef = ref<null | ChildCtx>(null);
         
         onMouned(() => {
            childRef.value?.num; // 这里可以访问到 num 属性
         })
        }
        
     })
</script>
```


## 资料
[Vue3+Ts 项目中 定义 ref 实例 的类型](https://juejin.cn/post/6978035248487464974)