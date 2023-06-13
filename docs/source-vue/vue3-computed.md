---
autoGroup-0: Vue3
title: 巧用 computed 计算属性，实现代码简洁高效
---
在日常使用Vue开发项目的时候，计算属性computed是一个非常常用的特性，它的主要作用是对数据进行处理，然后返回新的数据，这样就不需要在模板中写过多的逻辑代码，从而使得模板简洁，可读性更强。

## 1.计算属性的基本用法
计算属性的用法很简单，分为四个部分：getter、setter、onTrack、onTrigger

- get:计算属性的getter函数,当计算属性的依赖发生改变时，会执行该函数，返回计算属性的值。
- set:计算属性的setter函数，当直接修改计算属性的值时,会执行该函数。
- onTrack: 计算属性的依赖被追踪时，会执行该函数
- onTrigger: 当计算属性的依赖项发生改变时，会执行该函数

```js
import { computed } from 'vue';

const count = ref(0);

const plusOne = computed({
    get() {
        return count.value + 1;
    },
    set(val) {
        count.value = val - 1;
    },
    onTrack(e) {
        debugger;
    },
    onTrigger(e) {
        debugger;
    }
})
console.log(plusOne.value) // 1
console.log(count.value) // 0

plusOne.value = 1
console.log(plusOne.value) // 1
console.log(count.value) // 0
```
这里我们最常用的就是get，可以简写如下
```js
const plusOne = computed(() => count.value + 1);
```
onTrack和onTrigger一般用于调试，当我们想要知道计算属性的依赖项发生了什么变化时，可以在这两个函数中打断点调试

具体可以参考官网“
- [计算属性](https://cn.vuejs.org/guide/essentials/computed.html)
- [计算属性调试](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html#computed-debugging)

在官网上给出了一些计算属性的使用场景，以及一些计算属性的注意事项，这里如果卷一些的话，可以看一下，下面我就来分享一些我在使用计算属性时的一些小技巧

## 2.计算属性的小技巧
### 2.1 监听多个数据的变化
```js
// 多个数据想要同时监听
const a = ref(1);
const b = ref(2);
const c = ref(3);

// 将其合并为一个计算属性
const multiply = computed(() => {
    return {
        a: a.value,
        b: b.value,
        c: c.value
    }
})

// 监听计算属性的变化
watch(
    () => multiply.value,
    (val) => {
        console.log(val)
    }
)

// 修改数据
a.value = 2 // { a: 2, b: 2, c: 3 }
b.value = 3 // { a: 2, b: 3, c: 3 }
c.value = 4 // { a: 2, b: 3, c: 4 }
```
### 2.2监听对象的部分属性
```js
const obj1 = ref({
    a: 1, 
    b: 2,
    c: 3,
})
const obj2 = ref({
    a: 1,
    b: 2, 
    c: 3
})

// 监听对象的部分属性
const combine = computed(() => {
    return {
        a: obj1.value.a,
        b: obj2.value.b
    }
})

// 监听计算属性的变化
watch(
    () => multiply.value,
    (val) => {
        console.log(val)
    }
)

// 修改数据
a.value = 2 // { a: 2, b: 2, c: 3 }
b.value = 3 // { a: 2, b: 3, c: 3 }
c.value = 4 // { a: 2, b: 3, c: 4 }
```
### 2.2监听对象的部分属性
```js
const obj1 = ref({
    a: 1, 
    b: 2, 
    c: 3
})

const obj2 = ref({
    a: 1,
    b: 2, 
    c: 3
})

// 监听对象的部分属性
const combine = computed(() => {
    return {
        a: obj1.value.a,
        b: obj2.value.b
    }
})

// 监听计算属性的变化
watch(
    () => combine.value,
    (val) => {
        console.log(val)
    }
)

// 修改数据
obj1.value.a = 2 // { a: 2, b: 2 }
obj1.value.b = 3 // 无输出
obj1.value.c = 4 // 无输出
obj2.value.a = 2 // 无输出
obj2.value.b = 3 // { a: 2, b: 3 }
obj2.value.c = 4 // 无输出
```
> 可以多个对象结合监听部分字段的变化，这样就不需要手动判断具体修改的是哪个对象的哪个字段了。

### 2.3监听数组的部分元素
```js
const arr1 = ref([1, 2, 3])
const arr2 = ref([1, 2, 3])

// 监听数组的部分元素
const combine = computed(() => {
    return [
        arr1.value[0],
        arr2.value[1],
    ]
})

// 监听计算属性的变化
watch(
    () => combine.value,
    (val) => {
        console.log(val)
    }
)

// 修改数据
arr1.value[0] = 2 // [2, 2]
arr1.value[1] = 3 // 无输出
arr1.value[2] = 4 // 无输出
arr2.value[0] = 2 // 无输出
arr2.value[1] = 3 // [2, 3]
arr2.value[2] = 4 // 无输出
```

### 2.4 缓存与更新
```js
// 这是一个大对象，我不需要它是响应式的，但是我需要它能响应式的更新
const list = new Array(100).fill(0).map((item, index) => ({key: index, value: item}))

// 强制刷新
const forceFlush = ref(0);
const cache = computed(() => {
    forceFlush.value; // 这里使用一下，什么都不干就行
    
    // 这里会对大对象进行一系列的计算，然后给结果缓存下来方便使用
    const cache = list.reduce((prev, curr) => {
        prev[curr.key] = curr;
        return prev
    }, {})
    
    // 这里就方便直接通过 key 获取
    return (key) => {
        return cache[key] || {}
    }
})

console.log(cache.value(0).value); // 0

// 这里是不会更新的
list[0] = {key: 0, value: 1};
console.log(cache.value(0).value); // 0

// 给一个刷新信号就可以了
forceFlush.value++;
console.log(cache.value(0).value); // 1
```

### 2.5 双向绑定
```js
const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
    get() {
        return props.modelValue;
    },
    set(val) {
        emit('update:modelValue', val)
    }
})
value.value = 'hello';
```
:::tip
双向绑定需要配合 defineEmit(['update: modelValue']) 来使用，每次调用 emit('update:modelValue', val) 很麻烦

现在使用computed就可以实现 value.value = value 这种方式直接修改，很符合直观也满足了单向数据流的原则
:::

## 原文
[原文](https://juejin.cn/post/7242516121768165435)