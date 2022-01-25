---
autoGroup-0: Vue3
title: Vue3中watch与watchEffect有什么区别
---

你可以认为他们都是同一个任务的两种不同形态，底层的实现是一样的
- watch - 显式指定依赖源，依赖源更新时执行回调函数
- watchEffect - 自动收集依赖源，依赖源更新时重新执行自身

### 响应式依赖收集
首先需要了解一下Vue3的响应式是怎么工作的。很多文章都详细讲过这个部分了，这里就简单过一下。这里有个简化版的ref的实现
```
const ref = (initialValue) => {
    let _value = initialValue;

    return {
        get value() {
            track(this, 'value'); // 收集依赖
            return _value;
        },
        set value {
            _value = value;
            trigger(this, 'value'); // 触发依赖
        }
    }
}
```
访问数据时，track被呼叫并记录下访问了的字段。而当写入数据时，trigger被呼叫并触发之前所依赖了这个字段所绑定事件更新(即effect - computed, watch, watchEffect底层都是effect),他们会被记录在一个群居的WeekMap中，这里就不展开了，感兴趣的可以看源码
```
const counter = ref(1);

console.log(counter.value); // `track()`被呼叫
counter.value = 2; // `trigger()`被呼叫
```
当我们需要函数里的依赖时,只需要记录函数执行的过程中track()被呼叫的次数(和对应的对象与字段)即可。例如：
```
const counter = ref(1);

function foo() {
    console.log(counter.value);
}

function collectDeps() {
    startTracking();
    foo(); // 在这个过程中，counter被收集
    stopTracking();
}
```
这样便可以知道foo这个函数依赖了counter

### Watch
一个generalised的watch API应该是这样的(其他类似直接接受ref或reative作为桉树的其实都是糖)
```
watch(
    () => { /* 依赖源收集函数 */},
    () => { /* 依赖源改变时的回调函数*/ }
)
```
这里的依赖源函数只会执行一次，回调函数会在每次改变的时候触发，但是并不对函调函数进行依赖收集。也就说，依赖源和回调函数之间并不一定要有直接关系

### WatchEffect
watchEffect相当于将watch的依赖源和回调函数合并，当任何你有用到的响应时依赖更新时，该回调函数变回重新执行，该回调函数便会重新执行。不同于watch,watchEffect的回调函数会被立即执行(即{immediate: true})
```
watchEffect(
    () => { /* 依赖源同时是回调函数 */}
)
```
以下两种用法在行为上基本等价
```
watchEffect(
    () => console.log(counter.value)
)

watch(
    () => counter.value,
    () => console.log(counter.value),
    { immdediate: true }
)
```
与watch不同的一点是，在watchEffect中依赖源会被重复执行，动态增加的依赖也会被收集，例如：
```
const counter = ref(0);
const enabled = ref(false);

watchEffect(() => {
    if (enabled.value) {
        console.log(counter.value)
    }
})

// 以下忽略nextTick

// watchEffect会被离职执行，因为enabled为false，此时仅收集到enabled依赖
counter.value += 1; // 无反应

enabled.value = true; // Effect触发，控制台输出1
counter.value += 1 // counter被作为依赖收集 控制台出2

enabled.value = false; // 函数呗重新执行，无输出
counter.value += 1; // 函数被重新执行，无输出(虽然counter已经没有用了,但是作为依赖还是会触发函数)
```
顺带一提，computed其实类似一个带输出的同步版本的watchEffect。

### 什么时候用什么？
推荐在大部分时候用watch显式的执行依赖以避免不要的重复触发，也避免在后续代码修改时不小心引入新的依赖。watchEffect使用一些逻辑相对简单，依赖源和逻辑强相关的场景(或懒惰的场景)



