---
autoGroup-1: Tips API
title: Vue3 组件封装的一些技巧和心得
---
## 组件特性
在Vue中组件是一个独立的实例，每个组件都有共通点，就是：**属性、插槽、事件、方法**

在日常我们使用第三方组件库的时候，组件库的文档都会说明上面四个特性，而组件封装就是围绕这四个特性进行的

## 组件封装
### 2.1 组件继承
很多情况下，我们会在一个组件的基础上进行扩展,这个时候就需要用到组价继承；

在Vue2的时候，我们可以使用 extends 关键字进行组件继承；但是在Vue3中，extends关键字已经被废弃了

在Vue3中，如果想要实现组件继承其实很简单，要明白一个组件其实就是一个js对象，我们可以直接将一个组件对象合并，然后注册成一个新的组件；

```js
import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus, { ElInput } from 'element-plus';
import 'element-plus/dist/index.css';
import { merge } from 'lodash';

const app = createApp(App);
app.use(ElementPlus);

// 组件继承，将 ElementPlus组件的placeholder属性默认值改为'请输入'；
app.component(
    'ElInput',
    merge(ElInput, {
        props: {
            placeholder: {
                default: '请输入'
            }
        }
    })
)

app.mount('#app');
```
这里直接使用了lodash的merge方法，将ElInput组件的props属性进行了合并，然后覆盖注册成了一个新的组件；

因为有很多小伙伴遇到一个问题就是需要固定ElTable组件的一些属性，比如border、stripe、size等，这个时候用这种方法就非常方便

### 2.2 组件插槽
上面的组件继承只是简单的改变了组件的默认属性，但是如果我们想要改变组件的结构，就需要用到组件插槽；

通常情况下我们要拆分组件的业务，然后封装成业务组件，这个时候可能会使用到多个组件；

这个时候组件里面有很多组件，需要替换组件里面的组件的插槽，这个时候就需要透传插槽

```html
<!-- 透传插槽 -->
<template>
    <div>
        区域A这里有一个组件，这个组件需要替换插槽
        <el-tree :data="treeData">
            <template v-if="$slots.tree" #default="{node, data}">
                <slot name="tree" :node="node" :data="data"/>
            </template>
        </el-tree>
    </div>

    <div>
    区域B这里有一个组件，这个组件需要替换插槽
    <el-table :data="tableData">
      <template v-if="$slots.default">
        <slot />
      </template>
    </el-table>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                treeData:new Array(10).fill(0).map((_,index) => ({ label: 'label' + index}))
            }
        }
    }
</script>
```
通过使用 $slots 可以获取到组件的插槽，然后通过v-if判断是否有插槽，如果有差擦就进行透传；

除了这种方式之外，还可以使用 jsx 语法，这种方式更加灵活
```html
<script lang="jsx">
    export default {
        render() {
            const areaA = (
                <div>
                    区域A这里有一个组件，这个组件需要替换插槽
                    <el-tree data={treeData}>
                        {{
                            default: this.$slots.tree
                        }}
                    </el-tree>
                </div>
            )

            const B = (
                <div>
                    区域B这里有一个组件，这个组件需要替换插槽
                    <el-table data={tableData}>
                        {{
                            default: this.$slots.default
                        }}
                    </el-table>
                </div>
            )

            return (
                <div>
                    {areaA}
                    {areaB}
                </div>
            )
        }
    }
</script>
```
> 在setup语法中是没有this的，这个使用需要获取$slots的时候需要使用useSlots方法

### 组件事件和透传$attrs
在Vue2中,我们可以使用$listeners来获取组件的事件，然后进行透传;

而在Vue3中，$listeners已经被废弃了，$listeners和$attrs都被合并到了 $attrs 中；

```html
<!-- 组件 -->
<template>
    <div v-bind="$attrs"></div>
</template>

<!-- 父组件 -->
<template>
    <div>
        <MyComponent class="my-class" @click="handleClick"/>
    </div>
</template>
```
在Vue3中，我们可以直接使用$attrs来获取组件的事件，然后进行透传；

例如上面的例子，我们可以直接在组件中使用$attrs来获取到class和@click事件，等同于下面的写法

```html
<!-- 组件 -->
<template>
    <div class="my-class" @click="handleClick"></div>
</template>
```
但是这里其实有一个技巧，就是Vue3默认属性是可以透传的，例如上面的例子其实可以简化成下面的写法；

```html
<!-- 组件 -->
<template>
  <div></div>
</template>

<!-- 父组件 -->
<template>
  <div>
    <MyComponent 
        class="my-class"
        @click="handleClick"
    />
  </div>
</template>
```
<span style="color: red">就是组件里面什么都不写，最后在父组件中使用这个组件的时候，属性会透传到组件中的根元素上</span>

参考[透传Attributes](https://cn.vuejs.org/guide/components/attrs.html)

了解这个特性就可以这样封装组件：
```html
<!-- 组件 -->
<template>
  <el-dialog>
  </el-dialog>
</template>

<!-- 父组件 -->
<template>
  <div>
    <MyComponent 
        v-model="visible"
        width="500px"
    />
  </div>
</template>
```
通常我们会封装一个Dialog组件来解耦业务，这个时候直接将Dialog作为根元素，然后可以将v-model和width属性透传到Dialog组件上

这样不需要写Dialog组件开启关闭的双向绑定的代码，前提是不需要再组件内操作Dialog的开启关闭

## 2.4组件方法
在Vue2中,我们可以通过 this.$ref.xxx 来获取到组件的实例，然后调用组件的方法；

在Vue3中,我们可以通过ref来获取到组件的实例，然后调用组件的方法；

但是不管是vue2还是vue3，在组件内部想要使用组件的子组件的方法都不是一件容易的事情；

通常都是手动将组件的实例获取到，然后在重新定义在组件的methods中；

```html
<!-- 组件 -->
<template>
  <div>
    <el-input ref="input" />
  </div>
</template>

<script>
export default {
  methods: {
    focus() {
      this.$refs.input.focus();
    },
  },
};
</script>
```
组件的方法通常没有啥特别好的方式，除了我上面的这种方式之外，还有小伙伴直接将ref返回出去
```html
<template>
  <div>
    <el-input ref="input" />
  </div>
</template>

<script>
export default {
  methods: {
    inputRef() {
      return this.$refs.input
    },
  },
};
</script>
```
当然还有一种偷懒的方式
```html
<template>
    <div>
        <el-input ref="input"/>
    </div>
</template>
<script>
    export default {
        mounted() {
            Object.values(this.$refs.input).forEach(value => {
                if(typeof vlaue == 'function') {
                    this[value.name] = (...args) => value(...args);
                }
            })
        },
        methods: {
            inputRef() {
                return this.$refs.input;
            }
        }
    }
</script>
```
不过这种偷懒的方式只能在options api中使用，因为在composition api中是没有this的；

对于setup语法，如果需要使用组件的方法，可以使用getCurrentInstance来获取到组件的实例，然后将方法挂载到exposed上；

```html
<template>
    <div>
        <el-input ref="input"/>
    </div>
</template>
<script setup>
    import { getCurrentInstance, onMounted, ref } from 'vue';

    const instance = getCurrentInstance();
    const input = ref(null);
    onMounted(() => {
        Object.values(input.value).forEach(value => {
            if(typeof value === 'function') {
                instance.exposed[value.name] = (...args) => value(...args);
            }
        })
    })
</script>
```
> 这种方式不太稳定，因为exposed是Vue3的一个私有属性，不建议使用
> 在setup语法中如果需要暴露组件的内部方法，需要使用defineExpose来暴露；
```html
<script setup>
// ... 省略其他代码

defineExpose({
  focus: () => {
    input.value.focus();
  },
});
</script>
```