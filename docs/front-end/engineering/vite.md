---
title: vite原理解析
---

## Vite是什么
Vite，一个基于浏览器原生ES imports的开发服务器。利用浏览器去解析imports，在服务端按需编译返回，完全跳过了打包这个概念，服务器随启调用。同时不仅有Vue文件支持，还搞定了热更新，而且热更新的速度不会随着模块增多而变慢。针对生成环境可以把同一份代码用rollup打包。虽然现在还比较粗糙，但是这个方向我觉得恶友前几，做的好可以彻底解决改一行代码等半天热更新的问题

- 快速冷启动服务器
- 即时热模块更换(HMR)
- 真正的按需编译

天生的懒加载

## Javascript模块

首先，你需要把type="module"放到&lt;script&gt;标签中，来声明这个脚本是一个模块

```
<script type="module" src="main.js"></script>
```

当通过import试图导入node_modules内的文件时，Vite会把路径进行替换，因为在浏览器中只有相对路由和绝对路径

```
import Vue from '/@modules/vue'
```

## 代码实现

```
// server.js
const Koa = require('koa');
const fs = require('fs');
const path = require('path');
```


## 文档

[解密Vite的原理](https://juejin.cn/post/6844904202364420109)