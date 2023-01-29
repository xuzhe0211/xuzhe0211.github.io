---
autoGroup-0: Vue3
title: vue3新增的一个defineExpose
---
这个方法是vue3 3.2+版本新增的，大概意思就是在&lt;script setup&gt;组件中明确要暴露出去的属性，使用defineExpose编译器宏，简单的用法如下
```html
// 子组件代码片段
<script setup>
    import { ref } from 'vue';

    function childFn() {
        console.log('我是子组件');
    }

    const msg = 'hello world';
    const num = ref(0);

    defineExpose({
        msg, 
        num
    })
</script>

// 父组件代码片段
<Index ref="I"></Index>

<script setup>
    import Index from './index.vue';

    const I = ref(null);

    function test() {
        console.log(I.value.msg); // hello world
    }
</script>
```

