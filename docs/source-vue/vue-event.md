---
autoGroup-1: Tips API
title: Vue 事件处理机制
---

## vue keep-alive异步组件
缓存实现LRU?

## vue事件机制
vue中的事件绑定有两种，一种是原生的事件绑定，另一种是组件的自定义事件。

原生的事件绑定在普通元素上通过@click进行绑定，在组件上是通过@click.native进行绑定，组件中的native On是等价于on的。组件的事件绑定的@click是vue中自定义的$on方法来实现的，必须有$emit才可以触发

原生事件绑定，原生DOM时间绑定，采用的是addEventListener实现

组件的事件绑定，组件绑定时间采用的$on方法

### vue中如何绑定事件
vue事件分为两类，一个是原生dom事件，一个是组件自定义事件，绑定方法类似
```html
// 绑定原生事件
<div id="example-1">
    <button v-on:click="handle">Add 1</button>
    <p>The button above has been chicked {{counter}} times.</p>
</div>
<div id="example-3">
    <button v-on:click="say('hi')">Say hi</button>
    <button v-on:click="say('what')">Say what</button>
</div>

// 绑定自定义事件，通过组件内部$emit('myEvent')触发
<my-component v-on:myEvent="doSomething"></my-component>

// 在自定义组件上绑定原生事件
<my-component v-on:click.native="doSomething"></my-component>

// 绑定动态事件，eventName为实例中能够访问到的变量
<my-component v-on[eventName]="doSomething"></my-component>
<my-component @[eventName]="doSomething"></my-component>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <card @click.native="clickFn">按钮</card>
    </div>
<script src='vue.js'></script>
<script>

    Vue.component('card',{
        template:'<p>这是card组件<button>按钮</button></p>'
    })

    new Vue({
        el:'#app',
        data:{
            state:false
        },
        methods:{
            clickFn (e) {
              console.log(e)  //打印出MouseEvent对象
              if (e.target.nodeName === 'IMG') {  // 可以对点击的target标签进行判断
                this.dialogImageUrl = file.target.src
                this.dialogVisible = true
              }
          }
        }
    })

</script>
</body>
</html>
```
.native--主要是给自定义的组件添加原生事件，可以理解为该修饰符的作用就是吧一个vue组件转化为一个普通的HTML标签，并且该修饰符对普通的HTML是没有任何作用的

## 资料
[Vue 中的事件处理机制详解](https://blog.csdn.net/weixin_41275295/article/details/100549145)

[vue 事件中的 .native](https://www.cnblogs.com/musicbird/p/10130312.html)