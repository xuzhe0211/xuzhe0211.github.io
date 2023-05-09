---
autoGroup-0: Vue3
title: vue3 动态绑定 Ref，通过变量来获取对应 Ref
---
正常情况，我们需要在vue中获得某个dom或者组件，我们会通过先绑定ref然后在通过绑定后的名字来获取这个dom。

但是，如果我们在v-for中绑定ref的话，那么这个ref就会存在多个，比如我们点击事件让对应的显示/隐藏的话，我们很难找到这个对应的元素，

这时我们就需要动态绑定这个ref(比如ref1, ref2，ref3等等)，那么我们可以通过如下代码实现
```html
// vue3 
<script setup lang="ts">
const myRefs = ref(<any>{})
const getRefs = (el: any) => {
    if ((el && el.$attrs['name'] >= 0) || (el && el.$attrs['name'])) {
        myRefs[el.$attrs['name']] = el
    }
}

// 通过 myRefs['div:序号'] 获取ref
let index = 1
myRefs[`ref:${index}`]

</script>

<template>
    <div v-for="i in 10">
        <div :name="'ref:'+i" :ref="getRefs"></div>
    </div>
</template>
```