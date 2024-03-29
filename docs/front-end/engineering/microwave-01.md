---
autoGroup-3: 微前端
title: 01-qiankun(乾坤)实例
---
[来源地址](https://blog.csdn.net/qq_33396780/article/details/110694871)
## 什么是微前端

微前端就是将不同的功能按照不同的纬度拆分成多个子应用.通过主应用来加载这些子应用。微前端的核心在于拆，拆完之后在和！

## 为什么使用微前端
1. 不同团队间开发同一个应用技术栈不通
2. 希望每个团队都可以独立开发,独立部署
3. 项目中还需要老的应用代码

我们可以将一个应用划分成若干个子应用，将子应用打包成一个个的lib。当路径切换时候加载不同的子应用。这样每个子应用都是独立的，技术栈也不用做限制了！从而解决前端系统开发的问题。
## 如何实现微前端 

我们是不是可以将一个应用划分成若干个子应用，将子应用打包成一个个模块。当路径切换时加载不同的子应用。这样每个子应用都是独立的，技术栈也不用做限制了！，从而解决前端协同开发问题(子应用需要
暴露固定的钩子bootstrop、mount、unmount)

 - iframe、webComponent
 - 2018年Single-spa诞生了，single-Spa是一个用于前端微服务化的javascript前端解决方案(本身没有处理样式隔离，js执行隔离)实现了路由劫持和应用加载
 - 2019年qiankun基于Single-SPA,提供了更加开箱即用的API(single-spa+sandbox+import-html-entry)做到了,技术栈无关，并且接入简单(像iframe一样简单)
 - 2020年EMP基于modle Federation，接入成本低，解决第三方依赖包问题

## System.js

Systemjs是一个通用的模块加载器，它能在浏览器上动态加载模块，微前端的核心就是加载微应用，我们将应用打包成模块，在浏览器中通过systemjs来加载模块

```js
npm install webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env @babel/preset-react html-webpack-plugin -D


// index.js
import React from 'react';
import ReactDOM from 'react-dom';

//.babelrc es6-es5
{
    "preset": ['preset-env', 'preset-react']
}
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = reuqire('hlml-webpack-plugin')

module.exports = (env) => {
    return {
        mode: 'development',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist'),
            // 什么模块规范 打包格式 system模块
            libaryTarget: env.production ? 'system' : ''
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: { loader: 'babel-load'},
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
            !env.production && new HtmlWebpackPlugin({
                template: './public/index.html'
            })
        ]。filter(Boolean),
        externals: env.production ? ['react', 'react-dom'] : []
    }
}

// dist/index.html
```

## qiankun框架
[文档地址](https://qiankun.umijs.org/zh)

2018年Single-SPA诞生了，sigle-spa是一个用于前端微服务化的JavaScript前端解决方案(本身没有处理样式隔离，js执行隔离)实现了路由加持和应用加载。

2019年qiankun基于Single-SPA,提供了更加开箱即的API(single-spa+sandbox+import-html-entry)做到了，技术栈无关、并且接入简单(像iframe一样简单)。

## qiankun框架实例

**这里我们打算建立三个项目进行实操，一个Vue项目充当主应用，另一个Vue和React应用子应用**

### 创建三个应用

1. 创建基座
```
vue create qiankun-base
```

2. 创建子应用1
```
vue create qiankun-vue
```

3. 创建子应用2
```
cnpm install -g create-react-app
create-react-app qiankun-react
```
- 三个项目

    基座:qiankun-base子应用:qiankun-vue, qiankun-react

### 项目配置(主要)

#### 基座qiankun-base配置
:::tip
项目创建好后我们首先进行主应用qiankun-base的配置，进入man.js文件进行配置，在main.js中加入一下代码，要注意的是，entry这项配置是我们两个子项目的域名和端口，我们必须确保两个子项目运行在这两个端口上面，container就是我们的容器名，就是我们子应用挂载的节点，相当于Vue项目里面的app节点，acitiveRule就是我们的激活路径，根据路径来显示不同的子应用。
:::

- 引入qiankun插件
```
yarn add qiankun 或者 npm i qiankun -S
```
- main.js配置
```
// 引入qiankun
import {registerMicroApps, start} from 'qiankun';

const apps = [
    {
        name: 'vueApp', // 应用名字
        entry: '//localhost:8081'， // 默认会加载这个html解析里面的js动态执行(子应用必须支持跨域) fetch
        container: '#vue', // 容器名(此项目页面中定义的容器id，用于把对应的子应用放到此容器中)
        activeRule: '/vue', // 激活的路径
        props: {a: 1} // 传递的值(可选)
    }, {
        name: 'reactApp',
        entry: '//localhost: 20000', //默认会加载这个html,解析里面的js动态执行(子应用必须支持跨域) fetch
        container: '#react',
        activeRule: '/react',
    }
]
registerMicroApps(apps); // 注册应用
start({
    prefetch: false // 取消预加载
}); // 开启
```
- 配置完之后我们去到qiankun-base的app.vue文件进行主应用的页面编写，这里我安装了element-ui来进行页面美化
```
npm i element-ui -S
```
在main.js中引入element-ui
```
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
```
- 修改app.vue的组件代码
```
<template>
<div id="app">
    <el-menu :router="true" mode="horizontal">
        <!-- 基座中可以放自己的路由 -->
        <el-menu-item index="/">Home</el-menu-item>
        <el-menu-item index="/about">About</el-menu-item>
        <!-- 引入其他子应用 -->
        <el-menu-item index="/vue">vue应用</el-menu-item>
        <el-menu-item index="/react">react应用</el-menu-item>
    </el-menu>
    <router-view></router-view>
    <div id="vue"></div>
    <div id="react"></div>
</div>
</template>
```

- router.js代码
```
import Vue form 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]
const router = new VueRouter({
    mode: 'histroy',
    // base: process.env.BASE_URL,
    base: '',
    routes
})

export default router
```

#### 子应用qiankun-vue配置

- main.js配置
```
import Vue from 'vue';
import App from './App.vue';
import router from './router';

// Vue.config.productionTip = false;

let instance = null;
function render(props) {
    instance = new Vue({
        router,
        render: h => h(App)
    }).$mount('#qkApp'); // 这里挂载到自己的html中， 基座会拿到这个挂载后的html将其插入进去
}

if(window.__POWERED_BY_QIANKUN__) { // 动态添加publicPath
    __webpack_public_path__ = window.__INJECTED_PUBLICK_PATH_BY_QIANKUN__;
}
if (!window.__POWERED_BY_QIANKUN__) { // 默认独立运行
    render();
}

// 父应用加载子应用，子应用必须暴露三个接口：bootstrap, mount, unmout
// 子组件的协议就ok了
export async function bootstrap(props) {

}

export async function mount(props) {
    render(props)
}

export async function unmount(props) {
    instance.$destroy();
}
```

- router配置
```
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/vue',
  routes
})

export default router
```

- Vue.config.js配置

在子应用的根目录下面新建一个Vue.config.js文件
```
module.export = {
    lintOnSave: false, // 关闭eslint检测
    devServer: {
        port: 8080, // 这里端口必须和父应用配置的子应用端口一致
        headers: {
            // 因为qiankun内部请求都是fetch来请求资源，所以子应用必须允许跨域
            'Access-Control-Allow-Origin': '*'
        }
    },
    configureWebpack: {
        output: {
            // 资源打包路径
            library: 'vueApp',
            libraryTarget: 'umd'
        }
    }
}
```

#### 子应用qiankun-react配置

- src目录下的index.js文件
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

function render() {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

if(!window.__POWERED_BY_QIANKUN__){
  render();
}

export async function bootstrap(){
 
}
export async function mount() {
  render()
}
export async function unmount(){
  ReactDOM.unmountComponentAtNode( document.getElementById('root'));  // 卸载节点
}
```

- config.overrides.js配置

先引入react-app-rewired, 在修改package.json启动命令
```
npm install react-app-rewired
```
修改package.json启动命令
```
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
},
```
在进行dev以及打包配置，根目录下创建config-overrides.js
```
module.exports = {
    webpack: (config) => {
        config.output.library = 'reactApp';
        config.output.libraryTarget = 'umd';
        config.output.publicPath = 'http://localhost:20000/';	// 此应用自己的端口号
        return config;
    },
    devServer: (configFunction) => {
        return function (proxy, allowedHost) {
            const config = configFunction(proxy, allowedHost);
            config.headers = {
                "Access-Control-Allow-Origin": '*'
            }
            return config
        }
    }
}
```

3. 注意点
- 如何在主应用某个路由页面加载微应用

react+react-router 技术栈的主应用:只需要让子应用的activeRule包含主应用的这个路由即可

vue+vue-router技术栈的主应用

:::tip
例如:主应用需要在login页面登录，登录成功后跳转到main后台的管理界面，在main管理界面下显示子应用。
:::

修改主应用router.js
```
// 如果这个路由有其他子路由，需要另外注册一个路由，任然使用这个组件即可。
// 本案例就是有子路由，所以需要才后面重新定义main页面的路由
const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/main',
        name: 'Main',
        component: Main,
        children: [
            {
                path: '/home',
                name: 'Home',
                component: Home
            },
            {
                path: '/about',
                name: 'About',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
            }
        ]
    },
    {
        path: '/main/*',
        name: 'Main',
        component: Main,
    }
]
```

修改主应用main.js的文件：

```
// 子应用的 activeRule 需要包含主应用的这个路由 path
const apps = [
  {
    name: 'vueApp', // 应用的名字
    entry: '//localhost:8081', // 默认会加载这个html 解析里面的js 动态的执行 （子应用必须支持跨域）fetch
    container: '#vue', // 容器名
    activeRule: '/main/vue', // 激活的路径
    props: { a: 1 }
  },
  {
    name: 'reactApp',
    entry: '//localhost:20000', // 默认会加载这个html 解析里面的js 动态的执行 （子应用必须支持跨域）fetch
    container: '#react',
    activeRule: '/main/react',
  }
]
registerMicroApps(apps); // 注册应用
```

修改主应用main.vue页面代码
```
// 在 Main.vue 这个组件的 mounted 周期调用 start 函数，注意不要重复调用。
<template>
  <div class="main-content">
    <el-menu :router="true" mode="horizontal">
      <!--基座中可以放自己的路由-->
      <el-menu-item index="/home">Home</el-menu-item>
      <el-menu-item index="/about">About</el-menu-item>
      <!--引用其他子应用-->
      <el-menu-item index="/main/vue">vue应用</el-menu-item>
      <el-menu-item index="/main/react">react应用</el-menu-item>
    </el-menu>
    <router-view></router-view>
    <div id="vue"></div>
    <div id="react"></div>
  </div>
</template>

<script>
import { start } from "qiankun";

export default {
  name: "Main",
  mounted() {
    if (!window.qiankunStarted) {
      window.qiankunStarted = true;
      start();
    }
  },
};
</script>
```
