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





## 资料
[浅析Vue3中如何通过v-model实现父子组件的双向数据绑定及利用computed简化父子组件双向绑定 ](https://www.cnblogs.com/goloving/p/15514672.html)