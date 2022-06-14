---
autoGroup-10: ssr
title: 前端服务框架调研：Next.js、Nuxt.js、Nest.js、Fastify
---

:::tip
ssr优化 负载均衡、协商缓存？
:::
## 概述
这次Node.js服务框架的调研将着点于个框架功能、请求流程的组织和介入方式，以对前端Node.js服务设计和对智联Ada架构改进提供参考，不过多关注具体实现。

最终选取了一下几个具有代表性的框架
- <span style="color: blue">Next.js、Nuxt.js:它们是分别与特定前端技术React、Vue绑定的前端应用开发框架，有一定的相似性，可以放在一起进行调研对比</span>
- <span style="color: blue">Nest.js：是Angular的服务端实现，基于装饰器。可以使用任何兼容的http提供程序，如Express、Fastify替换底层内核。可用于http、rpc、graphql服务，对提供更多样的服务能力有一个参考价值</span>
- <span style="color: blue">Fastify: 一个使用插件模式组织代码且支持并给予schema做了运行效率提升的比较纯碎偏底层的web框架</span>

## Nextjs、Nuxtjs
这两个框架的重心都在Web部分，对UI呈现部分的代码的组织方式、服务端渲染功能等提供了完善的支持。

- Nextjs：React Web应用框架，调研版本为12.0.x
- Nuxtjs:Vue Web应用框架，调研版本为2.15.x

### 功能
首先是路由部分
- 页面路由
  - <span style="color: blue">相同的是两者都遵循文件即路由的设计</span>。默认以pages文件夹入口，生成对应的路由结构，文件夹内的所有文件都会被当做路由入口文件，支持多层级，会根据层级生成路由地址。同时如果文件名为index则会被省略，即/pages/users和/pages/users/index文件对应的访问地址都是users
  - 不同的是，根据依赖的前端框架不同，生成的路由配置和实现不同
    - nextjs：由于React没有官方的路由实现，Nextjs做了自己的路由实现
    - Nuxt.js:基于vue-router,在编译时会生成vue-router结构的路由配置,同时也支持子路由，路由文件同名的文件夹下的文件会变成子路由，如article.js，article/a.js,article/b.js，a和b就是article的子路由，可配置&lt;nuxt-child /&gt;组件进行子路由渲染
- api路由
  - Next.js:在9.x版本之后添加了此功能的支持，在pages/api文件夹下(为什么放在pages文件夹下有设计上的历史包袱)的文件会作为api生效，不会进入React前端路由中。命名规则相同,pages/api/article/[id].js-> api/article/123.其文件导出模块与页面路由导出不同，但不是重点
  - Nuxt.js:官方未提供支持，但是有其他实现途径，如使用框架的serverMiddleware能力。
- 动态路由
  - Next.js：使用中括号命名，/pages/article/[id].js -> /pages/article/123
  - Nuxt.js: 使用下划线命名，/pages/article/_id.js -> /pages/article/123.
- <span style="color: blue">路由加载：两者都内建提供了link类型组件(Link和NuxtLink)，当使用这个组件替代&lt;a&gt;&lt;/a&gt;标签进行路由跳转时，组件会检测链接是否命中路由，如果命中，则组件出现在视口后触发对对应路由的js等资源的加载，并且点击跳转时使用路由跳转，不会重新加载页面，也不需要在等待获取渲染所需的js等资源文件</span>
- <span style="color: blue">出错兜底：两者都提供了错误码响应的兜底跳转，只要pages文件夹下提供了http错误码命名的页面路由，当其他路由发生响应错误时，就会跳转到错误码路由页面</span>

---
在根据文件结构生成路由配置之后，我们来看下在代码组织方式上的区别

- 路由组件--两者没有区别，都是使用默认导出组件的方式决定路由渲染内容，React导出React组件，Vue导出Vue组件
  - Next.js： 一个普普通通通的react组件
    ```js
    export default function About() {
      return <div>About us</div>
    }
    ```
  - Nuxt.js：一个普普通通通的Vue组件
    ```html
    <template>
      <div>About us</div>
    </template>
    <script>
    export default {}
    <script>
    ```
- <span style="color: blue">路由组件外壳：在每个页面路由之外还可以有一些预定义外壳来承载路由组建的渲染，在Next.js和Nuxt.js中都分别有两层外壳可以自定义</span>
  - 容器：可被页面路由组件公用的一些容器组件，内部会渲染页面路由组件:
    - Next.js:需要改写pages根路径下的_app.js,会对整个Next.js应用生效，是唯一的。其中&lt;Component/&gt;为页面路由组件，pageProps为预取数据，后面会提到
      ```js
      import '../styles/global.css'
      export default function App({ Component, pageProps }) {
          return <Component {...pageProps} />
      }
      ```
    - Nuxt.js：称为Layout，可以在layouts文件夹下创建组件，如layouts/blog.vue，并在路由组件中指明layout,也就是说，Nuxt.js中可以有多套容器，其中&lt;Nuxt&gt;为页面路由组件
      ```html
      <template>
        <div>
            <div>My blog navigation bar here</div>
            <Nuxt /> // 页面路由组件
        </div>
      </template>

      // 页面路由组件
      <template>
      </template>
      <script>
      export default {
          layout: 'blog',
          // 其他 Vue options
      }
      </script>
      ```
  - 文档：即html模板，两者的html模板都是唯一的额，会对整个应用生效：
    - Next.js:改写pages根路径下唯一的_document.js，会对所有页面路由生效，使用组件的方式渲染资源和属性
      ```js
      import Document, { Html, Head, Main, NextScript } from 'next/document'
      class MyDocument extends Document {
          render() {
              return (
                  <Html>
                      <Head />
                      <body>
                          <Main />
                          <NextScript />
                      </body>
                  </Html>
              )
          }
      }
      export default MyDocument
      ```
    - Nuxt.js:改写根目录下唯一的App.html，会对所有页面路由生效，使用占位符的方式渲染资源和属性
      ```html
      <!DOCTYPE html>
      <html {{ HTML_ATTRS }}>
      <head {{ HEAD_ATTRS }}>
          {{ HEAD }}
      </head>
      <body {{ BODY_ATTRS }}>
          {{ APP }}
      </body>
      </html>
      ```
- head部分：除了在 html 模板中直接写 head 内容的方式，如何让不同的页面渲染不同的 head 呢，我们知道 head 是在组件之外的，那么两者都是如何解决这个问题的呢？
  - Next.js：可以在页面路由组件中使用内建的head组件，内部写title,meta等，在渲染时渲染html的head部分
    ```js
    import Head from 'next/head'

    function IndexPage() {
        return (
            <div>
            <Head>
                <title>My page title</title>
                <meta property="og:title" content="My page title" key="title" />
            </Head>
            <Head>
                <meta property="og:title" content="My new title" key="title" />
            </Head>
            <p>Hello world!</p>
            </div>
        )
    }

    export default IndexPage
    ```
  - Nuxt.js:同样可以在页面路由组件中配置，同事也支持进行应用级别配置，通用的script、link资源可以卸载应用配置中
    - 在页面路由组件配置：使用head函数的方式返回head配置，函数中可以使用this获取实例
      ```html
      <template>
          <h1>{{ title }}</h1>
      </template>
      <script>
          export default {
              data() {
                  return {
                      title: 'Home page'
                  }
              },
              head() {
                  return {
                      title: this.title,
                      meta: [
                          {
                              name: 'description',
                              content: 'Home page description'
                          }
                      ]
                  }
              }
          }
      </script>
      ```
    - nuxt.config.js进行应用配置
      ```js
      export default {
          head: {
              title: 'my website title',
              meta: [
                  { charset: 'utf-8' },
                  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                  { hid: 'description', name: 'description', content: 'my website description' }
              ],
              link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
          }
      }
      ```
---
除去基本的 CSR（客户端渲染），SSR（服务器端渲染）也是必须的，我们来看下两者都是怎样提供这种能力的，在此之外又提供了哪些渲染能力？
  - 服务器渲染：众所周知的是服务器端渲染需要进行数据预取，两者的预取用法有和不同？  
    - Next.js
      - 可以在页面路由文件中导出getServerSideProps方法，Next.js会使用此函数返回的值来渲染页面，返回值会作为props传给页面路由组件
        ```js
        export async function getServerSideProps(context) {
            // 发送一些请求
            return {
                props: {}
            }
        }
        ```
      - 上文提到的容器组件也有自己的方法，不在介绍
      - 渲染过程的最后，会生成页面数据与页面构建信息，这些内容会写在 &lt;script id="__NEXT_DATA__"/&gt; 中渲染到客户端，并被在客户端读取。
    - Nuxt.js：数据预取方法有两个，分别是asyncData、fetch
      - asyncData：组件可导出 asyncData 方法，返回值会和页面路由组件的 data 合并，用于后续渲染，只在页面路由组件可用。
      - fetch：在 2.12.x 中增加，利用了 Vue SSR 的 serverPrefetch，在每个组件都可用，且会在服务器端和客户端同时被调用。
      - 渲染过程的最后，页面数据与页面信息写在 window.NUXT 中，同样会在客户端被读取。
        [Nuxt如何干掉window.__NUXT__](https://www.zhihu.com/question/430049651)
  - <span style="color: red">**静态页面生成SSG:在构建阶段会生成静态的HTML文件，对于访问速度提升和做CDN优化很有帮助**</span>
    > 可以使用脚本线上抓取html 然后本地上传 SEO优化
    - Next.js：在两种条件下都会触发自动生成SSG
      1. 页面路由文件组件没有getServerSideProps方法时
      2. 页面路由文件中导出getStaticProps方法时，当需要实用数据渲染时可以定义这个方法
      ```js
      export async function getStaticProps(context) {
        const res = await fetch(`https://.../data`)
        const data = await res.json()

        if (!data) {
            return {
                notFound: true,
            }
        }
        return {
            props: { data }
        }
      }
      ```
    - Nuxt.js:提供了命令generate命令，会对整站生成完整的html
  - 不论是那种渲染方式，在客户端呈现时，页面资源都会在头部通过 rel="preload" 的方式提前加载，以提前加载资源，提升渲染速度。
---
在页面渲染之外的流程的其他节点，两者都提供了介入能力
- Next.js:可以在pages文件夹的各级目录简历_middleware.js文件，并导出中间件函数，此函数会对同级目录下的所有路由和下级路由逐层生效
- Nuxt.js：中间件代码有两种组织方法
  1. 写在middleware文件夹下,文件名将会成为中间件的名字，然后可以在应用级别进行配置或Layout组件、页面路由组件中声明使用
  2. 直接在Layout组件、页面路由组件写middleware函数
  - 应用级别：在 middleware 中创建同名的中间件文件，这些中间件将会在路由渲染前执行，然后可以在 nuxt.config.js 中配置：
    ```js
    // middleware/status.js 文件
    export default function ({ req, redirect }) {
        // If the user is not authenticated
        // if (!req.cookies.authenticated) {
        //    return redirect('/login')
        // }
    }

    // nuxt.config.js
    export default {
        router: {
            middleware: 'stats'
        }
    }
    ```
  - 组件级别: 可以在layout或页面组件中声明那些middleware
    ```js
    export default {
      middleware: ['auth', 'stats']
    }

    // 也可以直接写全新的middleware
    <script>
    export default {
        middleware({ store, redirect }) {
            // If the user is not authenticated
            if (!store.state.authenticated) {
                return redirect('/login')
            }
        }
    }
    </script>
    ```
在编译构建方面，两者都是基于webpack搭建的编译流程，并在配置文件中通过函数参数的方式暴露了webpack配置对象，未做什么限制。其他指的注意的一点是Nuxt.js在v12.x.x版本将压缩代码和与原本的babel转义换了[swc](https://swc.rs/)，这是一个使用Rust开发的更快的编译工具，在前端构建方面，还有一些其他非基于Javascript实现的工具，如ESBuild

在扩展框架能力方面，Next.js 直接提供了较丰富的服务能力，Nuxt.js 则设计了模块和插件系统来进行扩展。

## Nest.js
Nest.js是"Angular的服务端实现"，基于装饰器。Nest.js与其他前端服务框架或库的设计思路完全不同。 我们通过查看请求生命周期中的几个节点的用法来体验下Nest.js的设计方式

先来看下Nest.js完整的生命周期

1. 收到请求
2. 中间件
    1. 全局绑定的中间件
    2. 路径中指定的Module绑定的中间件
3. 守卫
    1. 全局守卫
    2. Controller守卫
    3. Route守卫
4. 拦截器(Controller之前)
    1. 全局
    2. Controller拦截器
    3. Route拦截器
5. 管道
    1. 全局管道
    2. Controller管道
    3. Route管道
    4. Route参数管道
6. Controller(方法处理器)
7. 服务
8. 拦截器(Controller之后)
    1. Router拦截器
    2. Controller拦截器
    3. 全局拦截器
9. 异常过滤器
    1. 路由
    2. 控制器
    3. 全局
10. 服务器响应

可以看到根据功能特点拆分的比较细，其中拦截器在Controller前后都有，与Koa洋葱模型类似

### 功能设计
首先看下路由部分，即最中心的Controller：

- 路径: 使用装饰器装饰@Controller和@Get等装饰Controller类，来定义路由解析规则。如

    ```js
    import { Controller, Get, Post } from '@nestjs/common';

    @Controller
    export class CatsController {
        @Post()
        create():string {
            return 'This action adds a new cat'
        }

        @Get('sub')
        findAll(): string {
            return 'This action returns all cats'
        }
    }
    ```
    定义了/cats post请求和/cats/sub get请求的处理函数
- 响应: 状态码、响应头等都可以通过装饰器设置。当然也可以直接写。如

    ```js
    @HttpCode(304)
    @Header('Cache-Control', 'none')
    create(response: Response) {
        // 或 response.setHeader('Cache-Control', 'none')
        return 'This action adds a cat'
    }
    ```
- 参数解析

    ```js
    @Post
    async create(@Body() createCatDto: CreateCatDto) {
        return 'This action adds a new cat'
    }
    ```
- 请求处理的其他能力方式类似

在来看看生命周期中其他集中其他的处理能力
- 中间件: 声明式的注册方法
  
## 资料
[前端服务框架调研：Next.js、Nuxt.js、Nest.js、Fastify](https://juejin.cn/post/7030995965272129567)