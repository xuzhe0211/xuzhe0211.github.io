---
autoGroup-0: Vue3
title: Vue3 Composition API 使用教程
---
> 2020年02月16日 20:51 

## 前言
vue3目前已经发布了alpha版本，除了服务端渲染，其他工作已经全部完成。尤大大也升级了vue-loader，提供了一个可以使用.vue组件的[测试模板](https://github.com/vuejs/vue-next-webpack-preview/blob/master/src/App.vue).**vue3最大的改变是加入了这个灵感来源于React Hook的Composition API(组成api), 这个API将对Vue编程产生了根本性变革，但是vue3还是兼容vue2的Options API**.除此之外，还引入了一些不兼容修改，具体可以查看[Vue3已合并的RFC](https://github.com/vuejs/rfcs/pulls?q=is%3Apr+is%3Amerged+label%3A3.x).本文并不会全面介绍vue3的新特效，只会着重与vue3的核心——Composition API。

## 小试牛刀
先看下基础例程
```html
<template>
    <button @click="increment">
        Count is: {{ state.count }}, double is: {{ state.double }}
    </button>
</template>
<script>
import { reactive, computed } from 'vue';

export default {
    setup(props, context) {
        const state = reactive({
            count: 0, 
            double: computed(() => state.count * 2)
        })
        function increment() {
            state.count++;
        }
        return {
            state, 
            increment
        }
    }
}
</script>
```
从上面的基础例程可以看到，vue3的.vue组件答题还是和vue2一致，由template,script和style组成，做出的改变有一下几点
1. 组件增加了setup选项，组件内所有的逻辑都在这个方法内组织，返回的变量或方法都可以在末班中使用
2. vue2中data、computed等选项让然支持，但使用setup时不建议在使用vue2中的data等选项
3. 提供了reactive、computed、watch、onMounted等抽离的接口代替vue2中的data等选项

## 为什么Composition API？
为什么使用Composition API代替Options API？难道将各种类型的代码分类卸载对应的地方不比把所有的代码都卸载一个setup函数中更好？要解答这两个问题 我们首先思考一个Options API的局限

### 代码组织
Options API是把代码分写卸载几Option中
```js
export default {
    components: {},
    date() {};
    computed: {},
    watch: {},
    mounted() {}
}
```
当组件比较简单只有一个逻辑的时候，稍微麻烦的是用户必须在几个Options之间跳来跳去，这个是小问题，写代码哪能不用鼠标呢？挑战往往在复杂的情况下才会出现。当一个vue组件内存在多个逻辑时会怎么样呢?

![Options API VS  Composition API](./images/17042ee9e00fbb24_tplv-t2oaga2asx-zoom-in-crop-mark_4536_0_0_0.png)

图片中相同的样色表示一种逻辑
1. 使用Options API时，相同的逻辑写在不同的地方，各个逻辑的代码交叉错乱，这对维护别人嗲吗的开发者来说绝不是一件简单的事，理清楚这些代码都需要花费不少时间
2. 而使用Composition API时，相同的逻辑可以写在同一个地方，这些逻辑甚至可以使用函数抽离出来，各个逻辑之间界限分明，即便维护别人的代码也不会在"读代码"上话费太多时间(前提是你的前任会写代码)

必须指出的是，Composition API提高了代码的上限，也降低了代码的下限。在使用Options api时，即便再菜的鸟也能保证各种代码按其种类进行划分。但使用Composition API时，由于其开放性，出现什么代码是无法想象的。但毫无疑问，Options API到Composition API是vue的一个巨大进步，vue从此可以从容面对大型项目。

### 逻辑抽取与复用
在vue2中要实现逻辑复用主要有两种方式
- mixin

    mixin的确能抽取逻辑并实现逻辑复用(我更多用它来定义接口)，但是这种方式着实不好，mixin更多是一种代码复用的手段：
    - 命名冲突。mixin的所有option如果与组件或其他mixin相同会被覆盖(这个问题可以使用Mixin Factory解决)
    - 没有运行时实例。顾名思义，mixin不过是把对应的option混入组件内，运行时不存在所抽取的逻辑实例。
    - 含蓄的属性增加。mixin加入的option是含蓄的，新手会迷惑于莫名其妙就存在的一个属性，尤其是在有多个mixin的时候，无法知道当前属性是哪个mixin的。

- Scoped slot

    scoped slot也可以实现逻辑抽取，使用一个组件抽取逻辑，然后通过作用域插槽暴露给子组件

    ```html
    // GenericSort.vue
    <template>
        <div>
            <!-- 暴露逻辑的数据给子组件 -->
            <slot :data="data"></slot>
        </div>
    </template>
    <script>
        export default {
            // 在这里完成逻辑
            data() {

            }
        }
    </script>
    ```
    使用的时候
    ```html
    <template>
        <!-- 传入未排序的数据unSortdata -->
        <GenericSort data="unSortdata">
            <template v-slot="sortData">
                <!-- 使用经过处理后的sortData数据 -->
            </template>
        </GenericSearch>
    </template>
    ```
    但这种方式还是有很多缺点
    - 增加缩进。一两个时没有多大影响，但过多时可读性边差。
    - 一般需要增加配置，不灵活。需要在slot上增加配置，以应对更多的情况
    - 性能差。仅为了抽取逻辑，需要创建维护一个组件实例

- Composition Function

    在vue3中提供了一个叫Composition Function的方式,这种方式允许像函数搬抽离逻辑
    ```html
    <template>
        <div>
            <p>{{count}}</p>
            <button @click="onClick" :disabled="state">Start</button>
        </div>
    </template>

    <script>
        import { ref } from 'vue';
        // 倒计时逻辑的Composition Function
        const useCountdown = initialCount => {
            const use = ref(initialCount);
            const state = ref(false);
            const start = initCount => {
                state.value = true;
                if(initCount > 0) {
                    count.value = initCount;
                }
                if(!count.value) {
                    count.value = initialCount;
                }
                const interval = setInterval(() => {
                    if(count.value === 0) {
                        clearInterval(interval);
                        state.value = false;
                    } else {
                        count.value--;
                    }
                }, 1000);
            }
            return {
                count, 
                start, 
                state
            }
        }
        export default {
            setup() {
                // 直接使用倒计时逻辑
                const { count, start, state } = useCountDown(10);
                const onClick = () => {
                    start();
                }
                return { count, onClick, state }
            }
        }
    </script>
    ```
    vue3建议使用如React hook中一样使用use开发命名抽取的逻辑函数，如上代码抽取的逻辑几乎如函数一般，使用的时候也及其方便，完胜vue2中抽取逻辑的方法。

### TS支持
<span style="color: red">vue2比较令人诟病的地方还是对ts的支持，对ts支持不好是vue2不适合大型项目的一个重要原因。其根本原因是Vue依赖单个this上下文来公开属性，并且vue中this比在普通的javascript更具魔力(如methods对象下的单个method中this并不指向methos，二三指向vue实例)</span>。换句话说，尤大大在设计Options API时并没有考虑对ts引用的支持。那么vue2中是怎么做到对ts的支持。

```html
<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component
    export default class YourComponent extends Vue {
        @Prop(Number) readonly propA: number | undefined
        @Prop({ default: 'default value' }) readonly propB!: string
        @Prop([String, Boolean]) readonly propC: string | boolean | undefined;
    }
</script>
```
vue2对ts的支持主要是通过vue class component,还需引入vue-property-decorator包，该库完全依赖于vue-class-component包，咋一看，这不是支持了吗？下面聊聊这种缺点
1. <span style="color: red">vue class component与js的vue组件差异太大，另外需要引入额外的库，学习成本大幅度增高。</span>
2. <span style="color: red">依赖于装饰器语法。而目前装饰器目前还处于stage2阶段，在实现细节上还存在许多不确定性，这使其成为一个相当危险的基础</span>
3. <span style="color: red">复杂性增高。采用Vue class component且需要使用额外的库，相比于姜丹的js vue组件，显然复杂化。</span>

这些原因让人望而却步，vue2的ts项目数量不多也是可以让人理解的。相比与vue2，vue3对ts的支持则好得多：
1. vue3中是在setup中进行编程，setup不依赖this，大部分API大多使用普通的变量和函数，他们天然类型友好
2. 用Composition API编写的代码可以享受完整的类型推断，几乎不需要手动类型提示。这也意味着用提议的API编写的代码在TypeScript和普通Javascript中看起来几乎相同
3. 这些接口已获得更好的IDE支持，即使非TypeScript用户也可以从键入中受益。
## 接口一栏
Compositon API是一些列接口的总称，下文将逐一介绍Composition API的各个接口。[学习代码](https://github.com/PerryHuan9/vue3-test)

### setup


## 总结



## 资料
[Vue3 Composition API 使用教程](https://juejin.cn/post/6844904066103902215)

[react适合做大型项目的一些原因](/source-react/react-readme.html#react适合做大型项目的一些原因)