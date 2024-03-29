---
autoGroup-10: 打包
title: Vue实现路由懒加载的方式以及打包问题
---
现在的项目多数是SPA项目，单页面的应用可能存在首屏加载过慢的问题，而路由懒加载能在一定程度上优化首屏加载过慢的为。<span style="color: red">懒加载是指在需要加载的时候就加载对应的内容，与之类似的的还有按需加载</span>

## 组件懒加载
[vue性能优化1--懒加载:原文档](https://www.cnblogs.com/dshvv/p/9946022.html)

官方文档：https://cn.vuejs.org/v2/guide/components-dynamic-async.html

因为Hello组件，只要在def页面中使用，所以没必要提前一起加载进来，试想如果用户可能就不进入def页面，那加载进来岂不是浪费时间

所以我们可以修改def的代码如下即可：即异步加载hello组件，这样就可以当def页面呗访问到的时候，才会被加载
```js
<script>
import hello from '@/components/hello'
export default {
  name: 'def',
  components: {
    // hello: hello
    hello: () => import('@/components/hello')
  }
}
</script>
```
![组件懒加载效果](./images/870258-20181112235730309-240385112.gif)

## 路由懒加载
webpack支持amd、commonJS、es6这三种模块语法，因此vue实现动态路由有三种方式
### 使用ADM规范的require语法
```js
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    }, {
        path: '/about',
        name: 'About',
        component: resolve => require(['../views/About.vue'], resolve)
    }
]
```
这种语法不能指定模块的名称，默认使用webpack配置中output.chunkFileName

### 使用commonJS规范的require.ensure语法
> require.ensure()是webpack特有的，已经被import取代
```js
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    }, {
        path: '/about',
        name: 'About', 
        component: resolve => require.ensure([], () => resolve(
            require('@/' + about + '.vue')
        ), 'about')
    }
]
```
此语法和下面的import君可以指定模块名称

### 使用ES6原生的import语法
```js
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About', 
        component: () => import(/* webpackChunkName: "about "*/'../views/About.vue')
    }
]
```
这种是vue-cli3默认使用的方式

<span style="color: red">import和require是两种不同的规范，ES6的引入方式是Vue官方文档推荐的，**实际上到最后还是会变成require方式**。通过懒加载的方式，会编译打包成不同的js，而不是将所有组件都打包成一个js，也就是说能够在用户进入某个页面的时候才会加载某个页面，而不是一开始就加载全部</span>

## 懒加载可能出现的打包问题
<span style="color: orange;font-family:'微软雅黑'">**以上三种方式，如果路径参数中都包含变量,webpack打包就会出现问题。**</span>

### <span style="color:red">import()会将该组件所在的目录内的所有组件都引入进来</span>
```js
const about = 'views/About';
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName */ `../${about}.vue`)
    }
]
```
<span style="color: red">**这样会将views目录下的所有组件进行打包，即使没有在路由中配置。**</span>

因此webpackChunkName指定的文件名也会有所改变，上面的About页面组件会打包成about1、about2类似的名称

如果后续的路由配置中的路径参数也带有变量，那不管你指定上面webpackChunkName，打包出来的都是按照第一个import指定的webpackChunkName.例如：
```js
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ `../${about}.vue`) // 打包成about2.js   ../${about}.vue  about是变量
  },
  {
    path: '/test:id',
    name: 'Test',
    component: () => import(/* webpackChunkName: "test" */ `../${test}.vue`) // 最终打包成 about3.js 这样的文件名，而不是test.js
  },
]
```
### require()和require.ensure则会将所有带上变量的路由组件打包为一个js
```js
let home = 'views/Home'
let about = 'views/About'
let test = 'views/Test'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: resolve => require(['../' + about + '.vue'], resolve)
  },
  {
    path: '/test:id',
    name: 'Test',
    component: resolve => require(['../' + test + '.vue'], resolve)
  },
```
about页面组件和test页面组件会被打包进同一个js文件。

所以尽量不要在路径参数中带上变量。(: query params?)


## 按需加载
这个比较常见在第三方UI库的引用，比如element-ui和Ant Design,以element-ui为例

全局引入
```js
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
```
加入开发过程中仅仅只需要引用element-ui的Table和Message组件，这样全局引入就得不偿失的，额外的引入增加打包后的大小

按需引入
```js
import Vue from 'vue';
import {Table, Message} from 'element-ui';
import App from './App.vue';

Vue.component('demo-table', Table);
Vue.component('demo-msg', Message);

/* 
 * 或写为
 * Vue.use(Table)
 * Vue.use(Message)
 */
```


## 资料
[vue异步组件](/source-vue/vue-about.html#动态组件-异步组件)

[Vue实现路由懒加载的方式以及打包问题](https://segmentfault.com/a/1190000021897656)

[vue页面首次加载缓慢原因及解决方案](https://www.cnblogs.com/zyulike/p/11190012.html)