---
autoGroup-0: 基础
title: 在浏览器控制台安装npm包
---
我们都知道，npm 是 JavaScript 世界的包管理工具,并且是 Node.js 平台的默认包管理工具。通过 npm 可以安装、共享、分发代码,管理项目依赖关系。虽然作为命令行工具的 npm 近年来逐渐式微，但是作为广泛使用的存储库的 npm，却依然如日中天，还是世界上最大的软件注册表。

通常，我们通过npm install xxx在 React、Vue、Angular 等现代前端项目中安装依赖，但是前端项目在本质上还是运行在浏览器端的 HTML、JavaScript 和 CSS，那么，<span style="color: red">我们有办法在浏览器控制台直接安装 npm 包并使用吗？</span>

如果你对这个问题感兴趣，不妨跟着我通过本文一探究竟，也许最终你会发现：越是“复杂”的东西，其原理越趋向“简单”。

## 通过&lt;script/&gt;引入cdn资源
在浏览器控制台安装npm包，看起来是个天马行空的想法，让人觉得不切实际。如果我换一个方式进行提问：<span style="color: red">如何在浏览器/HTML中引入Javascript呢？也许你马上就有了答案:&lt;script/&gt;标签。</span>没错，我们的第一步就是通过&lt;script/&gt;标签在HTML页面中引入cdn资源。

那么，又该如何在控制台页面上插入&lt;script/&gt;标签来引入CDN资源呢？这个问题简单
```js
// 在页面中插入<script/>标签
const injectScript = url => {
    var script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script)
}
```
我们还得在资源引入后以及出现错误时，给用户一些提示
```js
script.onload = () => {
    console.log(pkg_name_origin, '安装成功.')；
}
script.onerror = () => {
    console.log(pkg_name_origin, '安装失败')
}
```
这么以来，我们就可以直接在控制台引入 cdn 资源了，你可以再额外补充一些善后工作的处理逻辑，比如把&lg;script /&gt;标签移除。当然，你也完全可以通过创建&lt;link /&gt;标签来引入 css 样式库，这里不过多赘述。

## 根据报名安装npm包

<span style="color: red">cdn.js提供了一个简单的API，允许任何人快速查询CDN上资源。具体使用读者可参考官方连接，这里给出一个根据包查询CDN资源连接的示例，可以直接在浏览器地址栏打开这个连接查看：https://api.cdnjs.com/libraries?search=jquery，这是一个 get 请求，你将看到类似下面的页面，数组的第一项为名称/功能最相近的资源的最新 CDN 资源地址：</span>


## 安装特定版本的npm包

<span style="color: red">UNPKG在此时可以帮我们一个大忙。unpkg 是一个快速的全球内容分发网络，适用于 npm 上的所有内容。使用它可以使用以下 URL 快速轻松地从任何包加载任何文件：unpkg.com/:package@:version/:file。</span>

例如，访问https://unpkg.com/jquery@3.5.1会自动重定向到https://unpkg.com/jquery@3.5.1/dist/jquery.js，并返回v3.5.1版本的jQuery文件内容（如果不带版本号，会返回最新的资源）：

## 资料
[原文](https://blog.csdn.net/LuckyWinty/article/details/121759716)