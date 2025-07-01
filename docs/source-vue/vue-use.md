---
title: vue use、install，directive
---
## Vue.use(plugin)
Vue.use是用来安装插件的

### 用法
```js
Vue.use(plugin)
```
- **如果插件是一个对象**，必须提供 install 方法。
- **如果插件是一个函数**，它会被作为 install 方法。install方法调用时，会将Vue作为参数传入
- Vue.use(plugin)调用之后，插件的install方法就会默认接收到一个参数，这个参数就是Vue

**该方法需要在调用 new Vue() 之前被调用**

当install方法被同一个插件多次调用，插件将只会被安装一次。

> 总结：Vue.use是官方提供给开发者的一个API,用来注册、安装类型Vuex、Vue-router等插件的。

## 原理
```js
export function initUse(vue: GlobalAPI) {
  vue.use = function (plugin: Function | Object) {
    // 获得已经安装的插件
    const installedPlugins =
      this._installedPlugins || (this._installedPlugins = [])
    // 看看插件是否已经安装，如果安装了直接返回
    if(installedPlugins.indexOf(plugin) > -1) {
        return this;
    }

    // toArray(arguments, 1)实现的功能就是，获取Vue.use(plugin, xx, xxx)中的其他参数
    // 比如 Vue.use(plugin, {size: 'mini', theme: 'black'}),就会会去到plugin以外的参数
    const args = toArray(arguments, 1);
    // 插件要么是一个函数，要么是一个对象，且必须有install方法
    if(typeof plugin.install === 'function') {
      // 调用插件的install方法，并传入Vue实例
      plugin.install.apply(plugin, args);
    } else if(typeof plugin === 'function') {
      plugin.apply(null, args);
    }

    // 在已经安装的插件数组中，放进去
    installedPlugins.push(plugin);
    return this;
  }
}
```
:::tip
Vue.use方法主要做了如下的事
1. 检查插件是否安装，如果安装了就不在安装
2. 如果没有安装，那么调用插件的install方法，并闯入Vue实例
:::

## directive
```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode) {}
}
```
钩子参数
- el: 指令绑定到的元素。还可以用于直接操作DOM
- binding: 一个对象，包含以下属性
    - value: 传递给指令的值。例如在 v-my-directive="1 + 1" 中，值是 2。
    - oldValue:之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用。
    - arg:传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 "foo"。
    - modifiers:一个包含修饰符的对象 (如果有的话)。例如在 v-my-directive.foo.bar 中，修饰符对象是 { foo: true, bar: true }。
    - instance:使用该指令的组件实例。
    - dir:指令的定义对象。

- vnode: Vue编译生成的虚拟节点
- prevNode: 代表之前的渲染中指令所绑定元素的VNode.仅在beforeUpdate 和 updated 钩子中可用