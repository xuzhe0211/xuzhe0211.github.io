---
title: vue生命周期/数据/资源/组合/其他
---

![vue生命周期](./images/1055392-20180412170517734-471949020.png)

自己测试一下
```js
data() {
    aaa: '111',
    bbb: true
},
beforeCreate() {
    console.log(this.aaa);
    console.log('beforeCreate 实例初始化之后');
},
created() {
    console.log(this.aaa);
    console.log('created 实例创建完之后被立即调用');
},
beforeMounted() {
    console.log(this.aaa);
    console.log('beforeMounted 挂载开始之前被调用');
},
mounted() {
    console.log(this.aaa);
    console.log('mounted el被新创建的vm.$el替换，并挂载到实例上去之后调用该钩子');
},
beforeUpdate() {
    console.log(this.aaa);
    console.log('beforeUpdate 数据更新时调用')
},
updated() {
    console.log(this.aaa);
    console.log('update DOM更新后调用')
},
beforeDestory() {
    console.log(this.aaa);
    console.log('beforeDestory 实例销毁之前调用')
}
destroyed() {
   console.log(this.aaa);
    console.log('destoryed 实例销毁之后调用') 
}
methods: {
    updateDate() {
        this.aaa = '222';
    }
}
```

![输出结果](./images/1055392-20180412170845885-383837069.png)

1. beforeCreate在实例初始化之后执行，此时data数据还未被装配，$el为undefined
2. created实例创建完毕后被调用，此时data和属性已经有了，但是还没有挂载到页面上，$el还为undefined
3. beforeMount在挂载之前被调用，$el还为undefined
4. mounted挂载完毕，el被新创建的vm.$el替换，页面上渲染元素成功
5. <span style="color: blue">beforeUpdate数据更新时候调用，虚拟dom打补丁之前，数据是更新后的数据</span>
6. updated数据更改导致虚拟dom重新渲染和打补丁，在这之后调用该方法
7. beforeDestory实例销毁前调用，data数据和上面的方法依旧存在，$el还能或得到dom元素
8. destoryed实例销毁后，data数据和上面的方法依旧存在，$el已经被删除

### 数据
data Vue实例数据对象。Vue将会递归将data的属性转为getter/setter，从而让data的属性能够响应数据变化

props可是数组或对象，用于接收父组件的数据

propsData创建实例时传递的props,只能用于new创建的实例

computed计算属性

methods 方法集合

watch数据对象的观察

### DOM
el Vue实例的挂载目标

template字符串模板

render字符串模板替代方案

renderError 当render出错时的方案

### 资源
directives Vue实例可用指令的集合

filters过滤器的集合

components子组件的结合

### 组合
parent 父组件实例

mixins混入实例的数组集合

extends 扩展文件组件

provide/inject 高阶插件/组件库提供用例

### 其他
name 作为组件时组件的名字

delimiters 默认值为{{}}可改变在html页面数据包含标识

functional 使组件无状态和无实例

model 允许一个自定义组件在使用v-model时定制prop和event

inheritAttrs 默认行为被干掉

comments 注释将被干掉

### 总结
beforecreate 这可以加个loading事件

created 在这个做一些初始化结束loading

mounted 调用接口拿到数据配合其他钩子函数

beforeDestory 清楚计时器之类

data 为页面响应式数据集合

props 用于父组件给子组件传递数据

computed 用于计算属性

watch 用于监听数据变化

模板的话平时常用template，也可以用类react的render

filter 是过滤器的集合

components 是实例子组件的集合

parent是父组件

mixins 用于给实例混入一些属性


## Vue的父子组件生命周期

- 加载渲染过程

    父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted

- 子组件更新过程

    父beforeUpdate->子beforeUpdate->子updated->父updated

- 父组件更新过程

    父beforeUpdate->父updated

- 销毁过程

    父beforeDestroy->子beforeDestroy->子destroyed->父destroyed