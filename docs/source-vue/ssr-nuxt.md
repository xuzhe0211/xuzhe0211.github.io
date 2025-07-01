---
autoGroup-10: ssr
title: 超详细Nuxt入门&实践&总结
---
## 一、nuxt简介及安装
:::tip
Nuxt.js是一个基于Vue.js的通用应用框架。通过对客户端/服务端基础架构的抽象组织，Nuxt.js主要关注的是应用的UI渲染。我们的目标是创建一个灵活的应用框架，你可以基于它初始化新项目的基础结构代码，或者在已有Node.js项目中使用Nuxt.js，Nuxt.js预设了利用Vue.js开发服务端渲染的应用所需要的各种配置。作为框架，Nuxt.js为 客户端/服务端 这种典型的应用架构模式提供了许多有用的特性，例如异步数据加载、中间件支持、布局支持等
:::
### 1. Nuxt简介
1. 服务器渲染的益处

    nuxt.js简单的说是Vue.js的通用框架，最常用的就是用来做SSR(服务器渲染)。Vue.js是开发SPA(单页应用)的，Nuxt.js这个框架，用Vue开发多页应用，并在服务端完成渲染，可以直接用命令把我们只做的vue项目生成静态html.

    主要的原因是SPA(单页应用)不利于搜索引擎的SEO操作，Nuxt.js适合做新闻、博客、电影、咨询这样的需要搜素引擎提供流量的项目。如果你要作为移动端的项目，就没有必要使用这个框架了。
    
2. 什么是SSR

    - SSR就是服务器渲染，什么是服务器渲染？
    - 由服务器组装好DOM元素，生成HTML字符串给浏览器，也就是在浏览器里面可以看到整个页面DOM源码的
3. SSR解决的问题    

    - SEO:搜索引擎的优先爬取级别是页面的HTML结构，当我们使用SSR的时候，服务端已经生成了与业务相关联的HTML，这样的信息对于SEO是友好的。
    - 内容呈现：客户端无需等待所有JS文件加载完成即可看见渲染的业务相关视图(压力来到了服务端这边，这有啥需要做权衡的地方，需要区分哪些是由服务端渲染，哪些可以交给客户端渲染)
4. SSR相关的弊端
    - 代码兼容:对于开发人员来讲，需要去兼容代码在不同环境的运行Vue SSR 所需要的服务端环境是Node,有一些客户端的对象，比如dom、windows之类的则无法使用
    - 服务器负载: 相对于前后端分离模式下服务器只需要提供静态资源来说，SSR需要的服务器负载更大，所以在项目中使用SSR模式要慎重，比如比如一整套图表页面，相对于服务端渲染，可能用户不会在乎初始加载的前几秒，可以交由客户端使用类似于骨架屏，或者懒加载之类的提升用户体验。

5. Vue与Vue SSR与原生HTML页面源码区别对比   
    - 在网页上右键查看源码：Vue SSR与 原生HTML是可以看到源码标签的
    - 在认识SSR之前，首先对CSR与SSR之间做个对比。
        - 首先看一下传统的web开发，传统的web开发是，客户端向服务端发送请求，服务端查询数据库，拼接HTML字符串(模板)，通过一系列的数据处理后，把整理好的HTML返回给客户端，浏览器相当于打开了一个页面。这种比如我们经常听说的JSP、PHP、ASPX也就是传统的MVC的开发

        - SPA应用，到了Vue、React，单页面应用优秀的用户体验，逐渐成为了主流，页面整体是javaScript渲染出来的，称之为客户端渲染CSR。SPA渲染过程。由客户端访问URL发送请求到服务端，返回HTML结构（但是SPA的返回的HTML结构是非常的小的，只有一个基本的结构，如第一段代码所示）。客户端接收到返回结果之后，在客户端开始渲染HTML，渲染时执行对应javaScript，最后渲染template，渲染完成之后，再次向服务端发送数据请求，注意这里时数据请求，服务端返回json格式数据。客户端接收数据，然后完成最终渲染。（请求两次，百度搜索引擎不能抓取SPA页面的数据）

        - SPA虽然给服务器减轻了压力，但是也是有缺点的：
            - 首屏渲染时间比较长：必须等待JavaScript加载完毕，并且执行完毕，才能渲染出首屏。
            - SEO不友好：爬虫只能拿到一个div元素，认为页面是空的，不利于SEO。 为了解决如上两个问题，出现了SSR解决方案，后端渲染出首屏的DOM结构返回，前端拿到内容带上首屏，后续的页面操作，再用单页面路由和渲染，称之为服务端渲染(SSR)。

    - SSR渲染流程是这样，客户端发送URL请求到服务端，服务端读取对应的url的模版信息，在服务端做出html和数据的渲染，渲染完成之后返回html结构，客户端这时拿到的之后首屏页面的html结构。所以用户在浏览首屏的时候速度很快，因为客户端不需要再次发送ajax请求。并不是做了SSR我们的页面就不属于SPA应用了，它让然是一个独立的spa应用

    - SSR是处于处于CSR与SPA应用之间的一个折中的方案，在渲染首屏的时候在服务端做出渲染，注意仅仅是首屏，其他页面还是需要再客户端渲染的，在服务端接收到请求之后并且渲染出首屏页面，会携带着剩余的路由信息预留给客户端去渲染其他路由的页面

6. Nuxt.js的特点(优点)
    - 基于`Vue``
    - 自动代码分层
    - 服务端渲染
    - 强大的路由功能，支持异步数据
    - 静态文件服务
    - EcmaScript6和EcmaScript7的语法支持
    - 打包和压缩JavaScript和CSS
    - HTML头部标签管理
    - 本地开发支持热加载
    - 集成ESLint
    - 支持各种样式预编译器SASS、LESS等等
    - 支持HTTP/2推送

### Nuxt安装
1. 安装

    ```js
    // 全局安装npx
    npm install npx -g 

    // 使用npx创建nuxt项目
    npx create-nuxt-app 项目名

    Project name                                //  项目名称
    Project description                         //  项目描述
    Use a custom server framework               //  选择服务器框架
    Choose features to install                  //  选择安装的特性
    Use a custom UI framework                   //  选择UI框架
    Use a custom test framework                 //  测试框架
    Choose rendering mode                       //  渲染模式
    Universal                                   //  渲染所有连接页面
    Single Page App                             //  只渲染当前页面
    ```
    当一个客户端请求进入的时候，服务端有通过 nuxtServerInit 这个命令执行在 Store 的action中，在这里接收到客户端请求的时候，可以将一些客户端信息存储到Store中，也就是说可以把在服务端存储的一些客户端的一些登录信息存储到Store中，之后使用了中间件机制，中间件其实就是一个函数，会在每个路由执行之前去执行，在这里可以做很多事情，或者说可以理解为路由器的拦截的作用。然后再 validate 执行的时候对客户端携带的参数进行校验，在 asyncData 与 fetch 进入正式的渲染周期，asyncData 向服务器获取数据，把请求的数据合并到Vue中的data中。

1. 目录结构

    ```js
    └─my-nuxt-demo
        ├─.nuxt               // Nuxt自动生成，临时的用于编辑的文件，build
        ├─assets              // 用于组织未编译的静态资源如LESS、SASS或JavaScript,对于不需要通过 Webpack 处理的静态资源文件，可以放置在 static 目录中
        ├─components          // 用于自己编写的Vue组件，比如日历组件、分页组件
        ├─layouts             // 布局目录，用于组织应用的布局组件，不可更改
        ├─middleware          // 用于存放中间件
        ├─node_modules
        ├─pages               // 用于组织应用的路由及视图,Nuxt.js根据该目录结构自动生成对应的路由配置，文件名不可更改
        ├─plugins             // 用于组织那些需要在 根vue.js应用 实例化之前需要运行的 Javascript 插件。
        ├─static              // 用于存放应用的静态文件，此类文件不会被 Nuxt.js 调用 Webpack 进行构建编译处理。 服务器启动的时                            候，该目录下的文件会映射至应用的根路径 / 下。文件夹名不可更改。
        └─store               // 用于组织应用的Vuex 状态管理。文件夹名不可更改。
        ├─.editorconfig       // 开发工具格式配置
        ├─.eslintrc.js        // ESLint的配置文件，用于检查代码格式
        ├─.gitignore          // 配置git忽略文件
        ├─nuxt.config.js      // 用于组织Nuxt.js 应用的个性化配置，以便覆盖默认配置。文件名不可更改。
        ├─package-lock.json   // npm自动生成，用于帮助package的统一设置的，yarn也有相同的操作
        ├─package.json        // npm 包管理配置文件
        ├─README.md
    ```
3. 配置nuxt.config.js

    - export default 在一个模块中只能有一个，当然也可以没有。export 在一个模块中可以有多个
    - export default的对象、变量、函数、类，可以没有名字。export 的必须有名字
    - export default对应的 import 和export 有所区别
    - module变量代表当前模块。这个变量是一个对象，module对象会创建一个叫exports的属性，这个属性的默认值是一个空对象

    Node为每个模块提供了一个 expots 变量，指向module.exports,两个是相等关系，但又不是绝对相等的关系，module.exports可以直接导出一个匿名函数或者一个值，但是export的必须有名字，故不行，export default或export名字可以
    ```js
    const pkg = require('./package')
    module.exports = {
        mode: 'universal',    // 当前渲染使用模式，分为universal和spa，既然是nuxt开发，那就是universal
        // 全局页头配置 (https://go.nuxtjs.dev/config-head)
        head: {       // 页面head配置信息
            title: pkg.name,        // title
            meta: [         // meat
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description }
            // 这里可以添加网站验证码信息
            // { name: 'google-site-verification', content: 'xxx' },
            // 实测百度无法通过验证，此问题还没解决
            // { name: 'baidu-site-verification', content: 'code-xxx' },
            ],
            link: [  // favicon，若引用css不会进行打包处理
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ]
        },
        // nuxt 加载进度条配置 (https://zh.nuxtjs.org/api/configuration-loading)
        loading: { color: '#fff' },   // 页面进度条
        // 全局css (https://go.nuxtjs.dev/config-css)
        css: [    // 全局css（会进行webpack打包处理）
            'element-ui/lib/theme-chalk/index.css'  
        ],
        // 配置后，会在页面渲染之前加载 (https://go.nuxtjs.dev/config-plugins)
        plugins: [        // 插件
            '@/plugins/element-ui'
        ],
        // 工具module (https://go.nuxtjs.dev/config-modules)
        modules: [        // 模块
            '@nuxtjs/axios',
        ],
        // 如果添加了@nuxt/axios则会需要此配置来覆盖默认的一些配置 (https://go.nuxtjs.dev/config-axios)
        axios: {
            https: true, 
            progress: true, // 是否显示加载进度条
            credentials: true, // 请求携带cookie
            baseURL: 'https://www.abeille.top/api',
            proxy: true // 请求代理，开发中跨域问题解决方法
        },
        // 打包配置 (https://go.nuxtjs.dev/config-build)
        build: {      // 打包
            transpile: [/^element-ui/],
            extend(config, ctx) {       // webpack自定义配置
            }
        }
    }
    ```
4. Nuxt运行命令

    ```js
    {
        "scripts": {
            //  开发环境
            "dev": "cross-env NODE_ENV=development nodemon server/index.js --watch server",
            //  打包
            "build": "nuxt build",
            //  在服务端运行
            "start": "cross-env NODE_ENV=production node server/index.js",
            //  生成静态页面
            "generate": "nuxt generate"
        }
    }
    ```
## nuxt常用配置
### 1.配置IP和端口
第一种nuxt.config.js
```js
module.exports = {
    server: {
        port: 8000,
        host: '127.0.0.1'
    }
}
```
第二种 package.json
```js
"config": {
    "nuxt": {
        "port": "8000",
        "host": "127.0.0.1"
    }
}
```
### 2.配置全局CSS
在开发多页项目时，都会定义一个全局CSS来初始化我们的页面渲染,比如把padding和margin设置为0，网上也有非常出名的开源css文件 normailze.css。要定义这些配置，需要在nuxt.config.js里进行操作。

比如现在我们要把页面字体设置为红色,就可以在 assets/css/common.css 文件，然后把字体设置为红色

```css
/** /assets/css/common.css */
html{ 
    color:red; 
} 
body { 
    margin:0; 
    padding:0;
}
```

```js
// /nuxt.config.js

css:['~assets/css/normailze.css']
```
设置好后，在终端输入npm run dev。然后你会发现字体已经变成红色。

## Nuxt的路由配置和参数传递
### 1. 路由
Nuxt.js的路由并不复杂，它给我们进行了封装，让我节省了很多配置环节。

Nuxt会自动生成路由，故而值需使用&lt;nuxt-link :to=""&gt;&lt;/nuxt-link&gt;，而非&lt;router-link :to=""&gt;&lt;/router-link&gt;

页面跳转方式：
1. 不要写成a标签，因为是重新获取一个新的页面，并不是SPA
2. &lt;nuxt-link to="/users"&gt;&lt;/nuxt-link&gt;
3. this.$router.push('/users');

动态路由
1. 在 Nuxt.js里面定义带参数的动态路由，需要创建对应的以下划线作为前缀的Vue文件或目录
2. 获取动态参数{{$route.params.id}}

### 2. 路由传参
this.$route.query.key 的方式参数,但是并不是我们想要的，:id?id=``? 所以建议还是尽量使用router-link来实现跳转来解决地址栏的变化，更方便网站的优化

1. nuxt-link中传递参数

    ```js
    方式一
    传参：
    <nuxt-link :to="{path:'/about',query:{index:id}}" target="_blank" ><nuxt-link>
    地址栏显示：
    loaclhost:3000/about/id
    接收地址栏参数：
    this.$route.query.index
    
    方式二
    传参： 
    <nuxt-link target="_blank" :to="{name: 'log-id', params:{id: n.id,key:value}}"></nuxt-link>
    地址栏显示：
    loaclhost:3000/about/id
    接收：
    async asyncData ({ params }) { //  params.id 就是我们传进来的值}// 或者 created () { this.$route.params.xxx}`
    ```
2. 在方法中传递

    ```js
    方式一
    跳转：
    getDescribe(id) {
        // 直接调用$router.push 实现携带参数的跳转
        this.$router.push({
        path: `/describe/${id}`,
        })   
    接收：
    $route.params.id

    方式二
    注意：
    页面之间的跳转使用query 不然的话刷新页面后会找不到参数
    跳转：
    this.$router.push({
            path: '/describe',
            query: {
                id: id
            }
    })
    接收：
    $route.query.id
    ```
### 3. 路由传参校验
Nuxt.js可以让你在动态路由对应的页面组件中配置一个validate方法用来校验动态路由参数的有效性。该函数有一个布尔类型的返回值，如果返回true则表示校验通过，如果返回false则表示校验未通过
```js
export default {
  // nuxt中使用validate方法进行路由参数校验，这个方法必须返回一个布尔值，为true表示校验通过，为false表示校验失败。注意validate不能写到methods属性中。
  validate(obj) {
    // console.log(obj);
    // return true
    return /^\d+$/.test(obj.params.id)
  }
}
```
### 4.路由嵌套
在nuxt框架中，在nuxt.config.js中components:true已开启了组件自动导入，故而不需要在vue文件中通过import和components来导入组件，只需在template中写入相应组件的组件名即可

1. 添加一个vue文件作为父组件
2. 添加一个与父组件同名的文件夹来存放子视图组件
3. 在父文件中，添加组件，用于展示匹配到的子视图

### 5. Nuxt的路由动画效果
路由的动画效果，也叫做页面的更换效果。Nuxt提供两种方法为路由提供动画效果，一种是全局的，一种是针对单独页面制作。

1. 全局路由动画

    全局动画默认使用page来进行设置，例如现在我们没每个页面都设置一个进入和退出时的渐隐渐现的效果。我们可以先在根目录的assets/css下建立一个 normailze.css文件
    1. 添加样式文件

        ```css
        /* /assets/css/normailze.css(没有请自行建立)*/
       .page-enter-active, .page-leave-active {
            transition: opacity 2s;
        }

        .page-enter, .page-leave-active {
            opacity: 0;
        }
        ```
    2. 文件配置 

        然后在 nuxt.config.js里加入一个全局的css文件就可以了
        ```js
        css:['assets/css/main.css']
        ```
        这时候在页面切换的时候就会有2秒钟的动画切换效果了，但是你会发现一些页面是没有效果的，这是因为你没有是&lt;nuxt-link&gt;组件来制作跳转链接。你需要进行更改
        ```js
        <li><nuxt-link :to="{name:'news-id',params:{id:123}}">News-1</nuxt-link></li>
        ```
2. 单独设置页面动效

    想给一个页面单独设置特殊的效果时，我们指要在CSS里改变默认的page，然后在页面组件的配置中加入transition字段即可。例如，我们想给about页面加入一个字体方法然后缩小的效果，其他页面没有这个效果
    ```css
    /**在全局样式assets/main.css中添加一下内容 */
    .text-enter-active,.test-leave-active {
        transition: all 2s;
        font-size: 12px
    }
    .test-enter,.test-leave-active {
        opacity: 0,
        font-size: 40px;
    }
    ```
    ```js
    // 然后在about/index.vue组件中设置
    export default {
        transition: 'test'
    }
    ```
这时候就有了页面的切换独特动效了。

总结：在需要使用的页面导入即可。

## Nuxt的默认模板和默认布局
在开发应用时，经常会用到一些公用的元素，比如网页的标题是一样的，每个页面都是一模一样的标题。这时候我们有两种方法，第一种方法是作一个公用的组件出来，第二种方法是修改默认模版。这两种方法各有利弊，比如公用组件更加灵活，但是每次都需要自己手动引入；模版比较方便，但是只能每个页面都引入。
### 1. 默认模板
Nuxt为我们提供了超简单的默认模版订制方法，只要在根目录下创建一个app.html就可以实现了。现在我们希望每个页面的最上边都加入“学习nuxt.js” 这几个字，我们就可以使用默认模版来完

app.html中
```html
<!DOCTYPE html>
<html lang="en">
<head>
   {{ HEAD }}
</head>
<body>
    <p>学习nuxt.js</p>
    {{ APP }}
</body>
</html>
```
这里的 HEAD 读取的是 nuxt.config.js 里的信息， APP 就是我们写的 pages 文件夹下的主体页面了。需要注意的是HEAD和APP都需要大写，如果小写会报错的。

> 注意：如果你建立了默认模版后，记得要重启服务器，否则显示不会成功;但是默认布局是不用重启服务器的。

默认布局--默认模板类似的功能还有默认布局，但是从名字上你就可以看出来，默认布局主要是针对于页面的统一布局使用。它在位置根目录下的 layouts/default.vue。**需要注意的是在默认布局里不要加入头部信息，只是关于&lt;template&gt;标签下的内容统一定制**

需求：我们在每个页面的最顶部放入“学习nuxt.js” 这几个字，看一下在默认布局里的实现。
```html
<template>
  <div>
    <p>学习nuxt.js</p>
    <nuxt/>
  </div>
</template>
```
这里的&lt;nuxt/&gt;就相当于我们每个页面的内容，你也可以把一些通用样式放入这个默认布局里，但会增加页面的复杂程度。

> 总结：要区分默认模版和默认布局的区别，模版可以订制很多头部信息，包括IE版本的判断；模版只能定制&lt;template&gt;里的内容，跟布局有关系。在工作中修改时要看情况来编写代码。

## Nuxt插件的使用
### 1. ElementUI使用
- 下载

    ```shell
    npm i element-ui -S
    ```
- 在 plugins 文件夹下面，创建 ElementUi.js文件

    ```js
    import Vue from 'vue';
    import ElementUI from 'element-ui';
    Vue.use(ElementUI)
    ```
- 在nuxt.config.js中添加配置

    ```js
    css: [
        'element-ui/lib/theme-chalk/index.css'
    ],
    plugins: [
        {src: '~/plugins/ElementUI', ssr: true}
    ],
    build: {
        vendor: ['element-ui']
    }
    ```
### 2. ElementUI按需引入
- 下载依赖
    ```shell
    # 先下载element-ui

    npm install element-ui --save

    # 如果使用按需引入，必须安装babel-plugin-component(官网有需要下载说明，此插件根据官网规则不同，安装插件不同)

    npm install babel-plugin-component --save-dev
    ```
    安装好以后，按照nuxt.js中的规则，你需要在 plugins/ 目录下创建相应的插件文件

    在文件根目录创建(或已经存在)plugins/目录，创建名为：element-ui.js的文件，内容如下：
    ```js
    import Vue from 'vue'

    import { Button } from 'element-ui'    //引入Button按钮

    export default ()=>{
        Vue.use(Button)
    }
    ```
- 引入插件  
    在nuxt.config.js中，添加配置为：plugins

    ```js
    css:[ 
        'element-ui/lib/theme-chalk/index.css' 
    ], 
    plugins:[ 
        '~/plugins/element-ui' 
    ]
    ```
    默认为：开启SSR，采用服务端渲染，也可以手动配置关闭SSR，配置为：
    ```js
    css:[
        'element-ui/lib/theme-chalk/index.css'
    ],
    plugins:[
        {
            src:'~/plugins/element-ui',
            ssr:false    //关闭ssr
        }
    ]
    ```
- 配置 babel选项

    在nuxt.config.js中,配置在build选项中，规则为官方规则
    ```js
    build: {
        babel:{        //配置按需引入规则
            "plugins":[
                [
                    "component",
                    {
                        "libraryName":"element-ui",
                        "styleLibraryName":"theme-chalk"
                    }
                ]
            ]
        },
        /*
        ** Run ESLINT on save
        */
        extend (config, ctx) {
        if (ctx.isClient) {
            config.module.rules.push({
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/
            })
        }
        }
    }
    ```
### axios的使用
- 安装

    ```shell
    npm install --save axios
    ```
- 使用

    ```js
    import axios from 'axios';

    asyncData(context, callback) {
        axios.get('http://localhost:3301/in_theaters').then(res => {
            console.log(res);
            callback(null, {list: res.data});
        })
    }
    ```
- 为防止重复打包，在nuxt.config.js中配置

    ```js
    module.exports = {
        build:{
            vendor: ['axios']
        }
    }
    ```
### vuex的使用
Nuxt.js 内置了引用vuex模块，所以不需要额外安装

Nuxt.js会找到应用根目录下的store目录，如果该目录存在，它将做一下事情
- 引用vuex模块
- 将vuex模块加到vendors构建配置中区
- 设置Vue根实例的store配置项

Nuxt.js支持两种使用store的方式，你可以选择一种使用
- 模块模式:store目录下的每个js文件会被转换成为状态树指定明明的子模块(当然，index是根模块)
- 普通方式：store/index.js返回一个Vuex.Store实例(官方不推荐)

模块方式

状态树还可以拆分成为模块，store目录下的每个js文件会被转换为状态树指定命名的子模块

使用状态树模块化的方式，store/index.js不需要返回Vuex.Store实例，而应该直接将 state、mutations 和 actions 暴漏出来

```js
export const state = () => ({
    articleTitle: [],
    labelList: []
})

export const mutations = {
    // 设置热门文章标题
    updateArticleTitle(state, action) {
        state.articleTitle = action
    },
    // 设置标签列表数据
    updateLabel(state, action){
        state.labelList = action
    }
}

export const actions = {
    // 获取热门文章标题
    fetchArticleTitle({ commit }) {
        return this.$axios
            .$get('http://localhost:3000/article/title')
            .then(response => {
                commit('updateArticleTitle', response.data)
            })
    },
    // 获取标签
    fetchLabel({ commit }) {
        return this.$axios
            .$get('http://localhost:3000/label/list')
            .then(response => {
                commit('updateLabel', response.data)
            })
    }
}
```
index.vue

fetch方法中触发异步提交状态更新
```html
<script>
import ArticleList from '~/components/archive/list'
import Banner from '~/components/archive/banner'


export default {
  components: {
    ArticleList,
    Banner,
  },
  async asyncData({ app }){
    //获取文章列表数据
    let article = await app.$axios.get(`http://localhost:3000/article/list?pageNum=1&pageSize=5`)
    return {articleList: article.data.data}
  },
  async fetch({ store }) {
      return Promise.all([
          store.dispatch('common/fetchArticleTitle'),
          store.dispatch('common/fetchLabel')
      ])
  },
  computed: {

  },
  methods: {

  }
}
</script>
```
对应组件中通过computed 方法获取状态数据
```js
computed: {
      labelList(){
            return this.$store.state.common.labelList
      }
}
```
## Nuxt的错误页面和个性meta设置
当用户输入路由错误的时候,我们需要给他一个明确的指引，所以说在应用程序开发中404页面是必不可少的。Nuxt.js支持直接在默认布局文件里建立错误页面

### 建立错误页面
在根目录下的 layouts 文件夹下建立一个error.vue文件，它相应于一个显示应用错误的组件 
```html
<template>
  <div>
      <h2 v-if="error.statusCode==404">404页面不存在</h2>
      <h2 v-else>500服务器错误</h2>
      <ul>
          <li><nuxt-link to="/">HOME</nuxt-link></li>
      </ul>
  </div>
</template>

<script>
export default {
  props:['error']
}
</script>
```
代码用v-if进行判断错误类型，需要注意的是这个错误是你需要在&lt;script&gt;里进行声明的，如果不声明程序是找不到error.statusCode的。

这里我也用了一个&lt;nuxt-link&gt;的简单写法直接跟上路径就可以了。

### 个性meta设置
页面的Meta对于SEO的设置非常重要，比如你现在要做个新闻页面，那为了搜索引擎对新闻的收录，，需要每个页面对新闻都有不同的title和meta设置。直接使用head方法来设置当前页面的头部信息就可以了。我们现在要把New-1这个页面设置成个性的meta和title。

1. 我们先把 pages/news/index.vue 页面的链接进行修改一下,传入一个title，目的是为了在新闻具体页面进行接收title，形成文章的标题

    ```html
    <!-- /pages/news/index.vue -->
    <li><nuxt-link :to="{name:'news-id',params:{id:123,title:'nuxt.com'}}">News-1</nuxt-link></li>
    ```
2. 第一步完成后，我们修改 /pages/news/_id.vue，让它根据传递值变成独特的meta和title标签  

    ```html
    <template>
        <div>
            <h2>News-Content [{{ $route.params.id }}]</h2>
            <ul>
                <li><a href="/">Home</a></li>
            </ul>
        </div>
    </template>
    <script>
        export default {
            validate({ params }) {
                // Must be a number
                return /^\d+$/.test(params.id);
            }
            data() {
                return {
                    title: this.$route.params.title
                }
            },
            // 独立设置head信息
            head() {
                return {
                    title: this.title,
                    meta: [
                        {hid:'description',name:'news',content:'This is news page'}
                    ]
                }
            }
        }
    </script>
    ```
    > 注意：为了避免子组件中的meta标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用hid键为meta标签配一个卫衣的标识编号

## asyncData方法获取数据
Nuxt.js贴心的为我们扩展了Vue.js的方法，增加了 asyncData，异步请求数据。

### 三种方式
Nuxt.js提供了几种不同的方法来使用 asyncData方法，你可以选择自己熟悉的一种来用
- 返回一个Promise,nuxt.js就会等待该Promise被解析之后才会设置组件的数据，从而渲染那组件
- 使用async await
- 使用回调函数

```js
// 返回promise
export default {
    asyncData({ params }) {
        return axios.get(`https://my-api/posts/${params.id}`).then(res => {
            return {title: res.data.title}
        })
    }
}

// 使用async或await
export default {
    async asyncData({ params }) {
        const {data} = await axios.get(`https://my-api/posts/${params.id}`)
        return {title: data.title}
    }
}

// 使用回调函数
export default {
  asyncData ({ params }, callback) {
    axios.get(`https://my-api/posts/${params.id}`)
      .then((res) => {
        callback(null, { title: res.data.title })
      })
  }
}
```
安装Axios Vue.js官方推荐使用的远程数据获取方式就Axios，所以我们安装官方推荐，来使用Axios。这里我们使用npm 来安装 axios。 直接在终端中输入下面的命令： npm install axios --save

### asyncData的promise方法
我们在pages下面新建一个文件,叫做asyncData.vue。然后写入下面的代码
```html
<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                name: 'hello World',
            }
        },
        asyncData() {
            return axios.get('接口').then(res => {
                console.log(res);
                return {info: res.data}
            })
        }
    }
</script>
```
asyncData的方法会把值返回到data中。是组件创建(页面渲染)之前的动作，所以不能使用this.info
- return 的重要性

    一定要return出去获取到的对象，这样就可以在组件中使用，这里返回的数据会和组件中的data合并。这个函数不光在服务端会执行，在客户端同样也会执行

### asyncData的promise并发应用
```js
async asyncData(context) {
  let [newDetailRes, hotInformationRes, correlationRes] = await Promise.all([
    axios.post('http://www.huanjingwuyou.com/eia/news/detail', {
      newsCode: newsCode
    }),
    axios.post('http://www.huanjingwuyou.com/eia/news/select', {
      newsType: newsType, // 资讯类型： 3环评资讯 4环评知识
      start: 0, // 从第0条开始
      pageSize: 10,
      newsRecommend: true
    }),
    axios.post('http://www.huanjingwuyou.com/eia/news/select', {
      newsType: newsType, // 资讯类型： 3环评资讯 4环评知识
      start: 0, // 从第0条开始
      pageSize: 3,
      newsRecommend: false
    })
  ])
  return {
    newDetailList: newDetailRes.data.result,
    hotNewList: hotInformationRes.data.result.data,
    newsList: correlationRes.data.result.data,
    newsCode: newsCode,
    newsType: newsType
  }
}
```
### asyncData的await方法
当然上面的方法稍显过时，现在都在用async...await来解决异步，改写上面的代码
```html
<script>
import axios from 'axios'
export default {
  data(){
     return {
         name:'hello World',
     }
  },
  async asyncData(){
      let {data}=await axios.get('接口')
      return {info: data}
  }
}
</script>
```
### 注意事项 + 生命周期
- asyncData 方法会在组件(限于页面)每次加载之前被调用
- asyncData 可以在服务端或路由更新之前调用
- 第一个参数被设定为当前页面的上下文对象
- Nuxt会将asyncData返回的数据融合到组件的data方法返回的数据一并返回给组件使用
- 对于 asyncData 方法是在组件初始化前被调用的，所以在方法内是没办法通过this来引用组件的实例对象

## 静态资源和打包
### 1. 静态资源
- 直接引入图片

    在网上任意下载一个图片,放在项目中的static文件夹下面，然后可以使用下面的引入方法进行引用
    ```html
    <div><img src="~static/logo.png"/></div>
    ```
    『~』就相当于定位到了项目根目录，这时候图片路径就不会出现错误，就算打包也是正常的

- CSS的引入图片

    如果在CSS中引入图片，方法和html中直接引入是一样，也是使用'~'符号引入
    ```html
    <style>
        .diss {
            width: 300px;
            height: 100px;
            background-image: url('~static/logo.png');
        }
    </style>
    ```
    这时候在npm run dev 下完全正常

### 2. 打包
在Nuxt.js制作完成后，你可以打包成静态文件并放在服务器上，进行运行

在终端中输入: npm run generate

然后在dist文件夹下输入 live-server 就可以了。

**总结：Nuxt.js框架非常简单，因为大部分的事情都为我们做好了，我们只要安装它的规则来编写代码**

## Nuxt的跨域解决 + 拦截器:axios与@nuxtjs/axios
### 了解
nuxt.js在创建项目的时候可以选择 axios。axios 与 @nuxtjs/axios 可以共用 nuxt.config.js中代理配置。

使用的时候需要注意 asyncData() 中需要请求全链接或者服务器有配代理的接口，也就是在服务器渲染的时候需要拿到组装的数据，等到了浏览器本地之后，需要走代理请求，否则会出现跨域，支持加载更多跟其他接口请求操作，更换数据也是没问题的，但是到浏览器之后必须走代理请求，在服务器渲染的时候必须走全链接请求或者走服务器配置了代理的请求，没配置代理就走全链接请求，在服务器不存在跨域

### 使用 @nuxtjs/axios
在创建项目的时候,就可以选择导入 @nuxtjs/axios，它是对axios包装，更好在nuxt.js中使用，可以通过 this.$axios.get(url).then() 进行全局使用。

检查 package.json 文件中 dependencies 有没有存在 @nuxtjs/axios，没有命令行安装(建议创建项目的时候就通过脚手架安装上),@nuxtjs/proxy代理

```shell
npm install --save @nuxtjs/axios @nuxtjs/proxy
```
nuxt.config.js配置，代理配置
```js
export default {
  head: { ... },
  css: [],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  axios: {
    // 开启代理 (如果需要判断线上线下环境，可以通过 process.env.NODE_ENV !== 'production' 来判断)
    proxy: true,
    // 给请求 url 加个前缀 /api，如果这项不配置，则需要手动添加到请求链接前面
    // 如果是多个代理的时候，则不需要配置，走手动添加代理前缀
    prefix: '/api',
    // 跨域请求时是否需要使用凭证
    credentials: true
  },

  proxy: {
  //当代理多个时，只需添加如下格式的数组对象即可
    '/api': {     //  key(路由前缀)：value(target)(代理地址)
      // 目标接口域   
      target: 'http://test.dzm.com',
      // 全局配置是否跨域
      changeOrigin: true,
      pathRewrite: {
        // 单个配置是否跨域
        // changeOrigin: true
        // 把 '/api' 替换成 '/'，具体需要替换为 '' 还是 '/' 看自己习惯
        '^/api': '/'
      }
    }
  },

  build: {
    // 防止重复打包
    vendor: ['axios']
  }
}
```
在组件中使用，这样就可以在服务器渲染到页面之后，通过请求进行更换数据，因为到页面之后需要走代理的方式才能获取到数据，否则会报错跨域
```js
mounted() {
    this.$axios.get("/index").then(res=>{
        console.log(res)
    })
    
    // axios 需要手动加上 '/api' 代理协议
    // @nuxtjs/axios 因为配置了 prefix: '/api' 会自动添加，否则也得手动添加
    // 访问的 url 地址为  http://x.x.x.x:3000/api/index
    // 然后根据上面代理转为 http://test.dzm.com/index
    // /api 会自动加到访问链接中
}
```
### 使用axios
<span style="color: red">安装命令，默认一般 nuxt.js自带axios，是不需要手动安装的，在 package.json 文件中 dependencies 中可能并不体现出来，可以通过 node_modules 文件夹找到 axios。</span>

安装axios
```shell
npm install @nuxtjs/axios --save-dev
```
如果找到了，就不要去安装了，直接使用即可，axios 与 @nuxtjs/axios 可以共用 nuxt.config.js中代理配置。可直接在vue组件中使用即可
```html
<script>
import axios from 'axios'
export default {
    mounted() {
        axios.get("/api/index").then(res=>{
            console.log(res)
        })

        // axios 需要手动加上 '/api' 代理协议
        // @nuxtjs/axios 因为配置了 prefix: '/api' 会自动添加，否则也得手动添加
        // 访问的 url 地址为  http://x.x.x.x:3000/api/index
        // 然后根据上面代理转为 http://test.dzm.com/index
        // /api 会自动加到访问链接中
    }
}
</script>
```
axios 可以进行封装使用，跟vue中一样

axios.js
```js
import axios from 'axios';

const service = axios.create({
    // 请求地址，为空则请求的时候带上
    baseURL: '',
    // 请求超时时间
    timeout: 90000
})

export {
    service as axios
}
```

```js
// request.js
import { axios } from './axios'
// 请求地址
const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://dzm.com' : 'http://test.dzm.com'

// 这种带全链接用于放在 asyncData() 中进行 SEO 请求
export function getxxx (parameter) {
  return axios({
    url: BASE_URL + `/list`,
    method: 'get',
    params: parameter
  })
}

// 这种带全链接用于放在 asyncData() 中进行 SEO 请求
export function postxxx (parameter) {
  return axios({
    url: BASE_URL + `/reload`,
    method: 'post',
    data: parameter
  })
}

// 这种带全链接用于放在页面加载到浏览器之后，加载更多或者其他请求操作使用，不会出现跨域问题
export function getxxx (parameter) {
  return axios({
    url: '/api' + `/list`,
    method: 'get',
    params: parameter
  })
}

// 这种带全链接用于放在页面加载到浏览器之后，加载更多或者其他请求操作使用，不会出现跨域问题
export function postxxx (parameter) {
  return axios({
    url: '/api' + `/reload`,
    method: 'post',
    data: parameter
  })
}
```
### 拦截器
安装
```shell
npm install @nuxtjs/axios @nuxtjs/proxy --save 
```

```js
// nuxt.config.js
module.exports = {
    plugins: [
        {
            src: '~/plugins/axios',
            ssr: false
        }
    ],
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
    ]
}
```

```js
// plugins/axios.js
export default ({ $axios, redirect }) => {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}

export default function (app) {
  let axios = app.$axios; 
 // 基本配置
  axios.defaults.timeout = 10000
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  // 请求回调
  axios.onRequest(config => {})

  // 返回回调
  axios.onResponse(res => {})

  // 错误回调
  axios.onError(error => {})
}
```
## @nuxtjs/toast模块
nuxt中toast组件可参考 element中的 message，共四个状态

toast可以说是很常用的功能,一般的UI框架都会有这个功能。但如果你的站点咩有使用UI框架，而alert又太丑，不妨引入该模块该模块

```shell
npm install @nuxtjs/toast
```
然后在nuxt.config.js引入
```js
module.exports = {
    modules:[
        '@nuxtjs/toast',
        ['@nuxtjs/dotenv', { filename: '.env.prod' }] // 指定打包时使用的dotenv
    ],
    // toast模块的配置
    toast: {
        position: 'top-center',
        duration: 2000
    }
}
```
这样，nuxt就会在全局注册 $toast 方法供你使用，非常方便
```js
this.$toast.error('服务器开小差啦~~')
this.$toast.error('请求成功~~')
```
## 生命周期延展
Nuxt扩展了Vue的生命周期，大概如下
```js
export default {
  middleware () {}, //服务端
  validate () {}, // 服务端
  asyncData () {}, //服务端
  fetch () {}, // store数据加载
  beforeCreate () {  // 服务端和客户端都会执行},
  created () { // 服务端和客户端都会执行 },
  beforeMount () {}, 
  mounted () {} // 客户端
}
```
### asyncData
该方法是Nuxt最大的一个卖点，服务端渲染的能力就在这里，首次渲染时务必使用该方法。

asyncData会传进一个 context 参数，通过该参数可以获得一些信息，如
```js
export default {
  asyncData (ctx) {
    ctx.app // 根实例
    ctx.route // 路由实例
    ctx.params  //路由参数
    ctx.query  // 路由问号后面的参数
    ctx.error   // 错误处理方法
  }
}
```
### 渲染出错和ajax请求出错的处理
使用 asyncData 钩子时可能会由于服务器错误或api错误导致无法渲染，此时页面还未渲染出来,需要针对这种情况做一些处理，当asyncData错误时，跳转到错误页面，nuxt提供了context.error方法用于错误处理，在asyncData中调用该方法即可跳转到错误页面

```js
export default {
    async asyncData(ctx) {
        // 尽量使用try catch的写法，将所有异常都捕获到
        try {
            throw new Error();
        } catch {
            ctx.error({ statusCode: 404, message: '服务器开小差了'})
        }
    }
}
```
这样，当出现异常时会跳转到默认的错误页，错误页面可以通过 /layout/error.vue自定义

这里会遇到一个问题，context.error的参数必须类似 { statusCode: 500, message: '服务器开小差了~' }，statusCode必须是 http 状态码，而我们服务端返回的错误往往有一些其他的自定义代码，如{ resultCode: 10005, resultInfo: '服务器内部错误'},此时需要对返回的api错误进行转换一下，

为了方便，我引入了 /plugins/ctx-inject.js 为 context注册了一个全局的错误处理方法： context.$errorHandler(err)。注入方法可以参考：注入 $root 和 context,ctx-inject.js:

```js
// 为context注册全局的错误处理事件
export default (ctx, inject) => {
  ctx.$errorHandler = err => {
    try {
      const res = err.data
      if (res) {
        // 由于nuxt的错误页面只能识别http的状态码，因此statusCode统一传500，表示服务器异常。
        ctx.error({ statusCode: 500, message: res.resultInfo })
      } else {
        ctx.error({ statusCode: 500, message: '服务器开小差了~' })
      }
    } catch {
      ctx.error({ statusCode: 500, message: '服务器开小差了~' })
    }
  }
}
```
然后在nuxt.config.js使用该插件：
```js
export default {
  plugins: [
    '~/plugins/ctx-inject.js'
  ]
}
```
注入完毕，我们就可以在asyncData介个样子使用了：

```js
export default {
    async asyncData (ctx) {
        // 尽量使用try catch的写法，将所有异常都捕捉到
        try {
            throw new Error()
        } catch(err) {
            ctx.$errorHandler(err)
        }
    }
}
```
### ajax请求出错
对于ajax的异常，此时页面已经渲染，出现错误时不必跳转到错误页，可以通过this.$toast.error(res.message) toast出来即可。

### loading方法
nuxt内置了页面顶部[loading进度条的样式](https://nuxtjs.org/docs/configuration-glossary/configuration-loading/#loading-%E5%B1%9E%E6%80%A7%E9%85%8D%E7%BD%AE)

推荐使用，提供页面跳转体验。

打开： this.$nuxt.$loading.start()

完成： this.$nuxt.$loading.finish()

## 注意事项
### 1. 如何在 head 里面引入js文件
> 背景：在 &lt;head&gt;标签中，以inline的形式引入 flexible.js文件。本项目主要为移动端项目，引入flexibale.js实现移动端适配问题。

Nuxt.js通过 vue-meta 实现头部标签管理,通过查看文档发现，可以按照如下方式配置

```js
head: {
  script: [{ innerHTML: require('./assets/js/flexible'), type: 'text/javascript', charset: 'utf-8'}],
  __dangerouslyDisableSanitizers: ['script']
}
```
### nuxt使用less、sass等预处理器
> 背景：在组件中&lt;template&gt;,&lt;script&gt;或&lt;style&gt;上使用各种预处理器，加上处理器后，控制台报错

```shell
npm install --save-dev node-sass sass-loader
```
但是解决过程并不是很顺利的，在阅读中文文档时，忽略版本号，按照上面的提示进行操作，发现不能成功，后来各种debug，最后发现了该解决方案。后知后觉的发现了中文文档的版本号过低，如果需要查看文档，一定要看最新版本的英文文档！

### 如何使用px2rem
> 背景：在css中，写入px，通过px2rem loader，将px转换为rem

在以前的项目中，是通过 px2rem loader实现的，但是在Nuxt.js项目下，添加css loader 还是很费力的，因为涉及到vue-loader。

想到了一个其他方案，可以使用postcss处理。可以在 nuxt.config.js 文件中添加配置，也可以在 postcss.config.js文件中天健
```js
build: {
    postcss: [
        require('postcss-px2rem')({
            remUnit: 75 // 转换基本单位
        })
    ]
}
```
### 如何拓展webpack配置
> 背景：给utils目录添加别名
刚刚说到，Nuxt.js内置了 webpack 配置，如果想要拓展配置，可以在 nuxt.config.js 文件中添加。同时也可以在该文件中，将配置信息打印出来。

```js
extend (config, ctx) {
  console.log('webpack config:', config)
  if (ctx.isClient) {
    // 添加 alias 配置
    Object.assign(config.resolve.alias, {
      'utils': path.resolve(__dirname, 'utils')
    })
  }
}
```
### 如何添加 vue plugin
> 背景：自己封装了一个toast vue plugin,由于 vue 实例化的过程中没有暴露出来，不知道在哪个时机注入进去

可以在 nuxt.config.js 中添加 plugins 配置，这样插件就会在Nuxt.js应用初始化之前被加载导入
```js
module.exports = {
  plugins: ['~plugins/toast']
}
```
~plugins/toast.js
```js
import Vue from 'vue'
import toast from '../utils/toast'
import '../assets/css/toast.css'

Vue.use(toast)
```


[原文](https://juejin.cn/post/7205047834793295931#heading-50)