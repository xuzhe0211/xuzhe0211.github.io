---
autoGroup-0: Vue3
title: Vue3 之 ref 与 shallowRef，并手写实现 shallowRef 的拦截功能
---
## ref
vue3中一般用ref将一个值为基本数据类型的变量变成响应式，它是一个函数，组合式API之一，参数为变量的初始值。举个栗子，比如我们需要一个响应式的变量num,初始值为1。在Vue2中我们会这么做
```js
data() {
    return {
        num: 1
    }
}
```
把num写在data里。而在vue3中，我们通过setup函数里使用ref定义num,此时num成了一个类型为Ref(reference)的，包含响应式数据的引用对象
```js
setup() {
    const num = ref(1)
}
```
<span style="color: blue">现在，如果想在js中改变num的值，需要通过num.value。在ref内部，是通过给value属性添加getter/setter来实现对数据的劫持，这点在我们手写shallowRef时需要用上</span>

<span style="color: red">注意，在&lt;template&gt;内不需要通过.value而是直接使用num</span>

## shallowRef
只处理value的响应式，不进行对象的reactive处理，也就是说如果传给shallowRef一个对象，这个对象的任何一层属性都不是响应式的

### 手写实现(拦截对数据的操作)
将target赋值给_value属性，通过对象本身的set和get方法来实现对target的操作的拦截
```js
function shallowRef(target) {
    return {
        _value: target,
        get value() {
            console.log('兰街到查询');
            return this._value;
        },
        set value() {
            consoeo.log('拦截到修改');
            this._value = val;
        }
    }
}
```
可以测试下效果
```js
const testShallowRef = shallowRef('美好的')
```
打印查看 testShallowRef 对象本身 console.log(testShallowRef)：

![shallowRef](./images/eb7eec374daf4588a91ce72f5ea6f7b0_tplv-k3u1fbpfcp-zoom-in-crop-mark_1304_0_0_0.png)

可以看到有个value属性，值为传递给shallowRef的参数

对testShallowRef进行查改操作
```js
testShallowRef.value += '周五'
```
![testShallowRef](./images/317975d25ffe434fba0425fe4b1c5c66_tplv-k3u1fbpfcp-zoom-in-crop-mark_1304_0_0_0.png)

说明确实拦截到了对 testShallowRef 的查询和修改操作，那么就可以继续做一些更新渲染页面的功能。

[ref与shallowRef区别](https://blog.csdn.net/LiuMH2011/article/details/123716933)

[shallowReactive和shallowRef](https://www.jianshu.com/p/4e0d4fcff950)

[vue3.0中shallowRef和shallReactive](https://juejin.cn/post/6987942531472457759)