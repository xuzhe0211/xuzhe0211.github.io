---
title: CSR，SSR，SSG 等常用渲染模式
---
## SPA 与 MPA
- MPA

    MPA(multiple page application) 称为多页应用，指的的是多个页面的应用，从技术手段上来讲，你可以这么的粗略的理解
    - **首屏速度快**:各个页面相互独立，需要单独维护多个html页面，每个请求都直接返回html
    - **切换页面比较慢**: 基于原生浏览器的文档跳转(navigating across documents).因为每一次的页面更新都是一次重载，这将带来巨大的重启性能消耗。
    - **对SEO友好**: 页面在初始时,就具有全部页面内容而非「无状态」,从而大搞更好的收录效果

- SPA

    SPA(sigle page application)称为单页应用。通过js去感知到url的变化，动态的将当前页面的内容清除掉，然后将在下一个页面的内容挂载到当前页面上。此时的路由不是后端来做了，而是前端来做，动态显示需要的组件。

    - **页面切换速度快**:路由跳转是基于特定的实现(如vue-router,react-router等前端路由)，而非原生浏览器的文档跳转，避免了不必要的整个页面重载。
    - **前后端分离**:基于前端路由，SPA与应用后端解耦，使得前端不在依赖于后端的路由分配
    - **首屏时间慢**: 首屏除了html还要额外请求病执行js文件，通过js在页面上渲染首屏。
    - **SEO不友好**: 内容都是靠js渲染生成出来的，但搜索引擎并不是别这部分内容，导致SEO效果差
- CSR(Client Side Rendering)

    CSR(客户端渲染)是一种在浏览器上执行Javascript以生成DOM并显示内容的渲染方法。CSR更贴近现代前端开发，我们通常使用的Vue和React默认使用CSR。其大致流程如下：

    对于典型的CSR应用程序，浏览器仅接收一个用作应用程序的HTML页面，因此也成为单页应用，所以CSR得特点与之前提到的SPA类似

    ![CSR](./images/cf4a4c5c9de543e79243a0043d559237~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.png)



https://www.rtcdeveloper.cn/cn/community/blog/26015