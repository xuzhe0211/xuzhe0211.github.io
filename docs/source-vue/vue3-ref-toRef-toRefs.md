---
autoGroup-0: Vue3
title: Vue3中ref、toRef、toRefs的区别
---
首先要注意一点：ref、toRef、toRefs都是composition API

一般在生命周期函数setup中使用

setup会比options API的生命周期晚于beforeCreate钩子，而遭遇created钩子被调用

## ref的使用
ref是vue3中使用<span style="color: red">值类型变成响应式的方法</span>

<span style="color: red">**使用ref.value = xxx进行改变值**</span>

例如，下面的简单的例子

1.5秒后nameRef的值从ayuan变为ayuan3（模板template的值也会更新）
```html
<template>
    <div>
        {{ nameRef }}
    </div>
</template>
<script>
import { ref } from 'vue';

export default {
    setup() {
        const nameRef = ref('ayuan');

        // 1.5秒后 nameRef从ayuan 变为ayuan2
        setTimeout(() => {
            nameRef.value = 'ayuan2'
        }, 1500);

        // 返回值可以在template中使用
        return {
            nameRef
        }
    }
}
</script>
```
## reactive的用法
好了，说完值类型变成响应式的方法

对应的，有用<span style="color: red">引用类型变成响应式的方法</span>

就是使用reactive

例子，1.5秒后person.age的值从50变成51(模板template的值也会更新)
```html
<template>
    <div>
        {{ person.name }}
        <br/>
        {{ person.age}}
    </div>
</template>
<script>
    import { reactive } from 'vue';

    export default {
        const person = reactive({
            name: 'ayuan',
            age: 50
        })

        // 1.5秒后person.age的值从50变为51
        setTimeout(() => {
            person.age = 51;
        }, 1500)
        
        return {
            person
        }
    }
</script>
```
## toRef的使用
<span style="color: red">**toRef是对定义的响应对象的某个属性进行引用**</span>

例如:第二个例子中
```js
const nameRef = toRef(person, 'name')
```
但是其实你会发现，我使用<span style="color: red">nameRef</span>和<span style="color: red">person.name</span>进行赋值都会触发响应式

那toRefs是不是没用？

当然不是

当你使用一个函数返回一个响应式对象

而此定义的"响应式对象"却失去了响应式

而这时候就可以使用toRef或者toRefs保持他的响应式

我们先说toRef

举个🌰

先看目录
![目录](./images/8c763f39ad5141d6b897baa958347b48_tplv-k3u1fbpfcp-zoom-in-crop-mark_1304_0_0_0.jpg)

```js
// data.js
import { reactive } from 'vue';
export default function() {
    return reactive({
        name: 'ayuan',
        age: 50
    })
}
```
```html
// App.vue中的代码
<template>
    <div>
        {{ nameRef }}
    </div>
</template>
<script>
import { toRef } from 'vue';
import data from './data';

export default {
    setup() {
        const nameRef = toRef(data(), 'name');

        setTimeout(() => {
            nameRef.value = 'ayuan2';
        }, 1000);

        return {
            nameRef
        }
    }
}
</script>
```

好了，这些你就明白了：**这其实就是对响应对象的一种"延续"**

或许，你会觉得，data.js文件返回响应式对象一个个的延续很复杂啊

那么就使用toRefs;

## toRefs的使用
我们只需要稍微改造一下data.js的代码
```js
// data.js
import { reactive, toRefs } from 'vue';

export default function() {
    const person = reactive({
        name: 'ayuan',
        age: 50
    });

    return toRefs(person)
}
```

```html
// App.vue
<template>
    <div>
        {{ name }}
        <br/>
        {{ age }}
    </div>
</template>
<script>
import data from './data';
export default {
    setup() {
        const person = data();

        setTimeout(() => {
            person.name.value = 'ayuan2';
            person.age.value = 51;
        }, 1000)

        // 直接写return person 也行
        return {
            ...person
        }
    }
}
</script>
```
## 总结
这样看下来，你就明白了

ref是对<span style="color: red">值类型</span>创造响应式的方法

toRef、toRefs是延续<span style="color: red">引用类型</span>响应式对象的方法

<span style="color: red">只不过toRef延续单个响应式对象的属性</span>

<span style="color: red">而toRefs延续响应式对象的全部属性</span>

## 资料
[Vue3中ref、toRef、toRefs的区别](https://juejin.cn/post/6954789258607460359)