---
title: webpack-dev-server的proxy用法
---


## 前言

首先强调的是webpack proxy只能用过开发阶段，临时解决本地请求服务器(通常是测试服)产生的跨域问题，并不使用线上环境。配置在webpack的devServer属性中

> * 有人可能会误会线上环境就是正式服，有人曾利用process.env.NODE_ENV来区分测试服和正式服。其实不然
> * 对于node_env来说，默认只有两种状态即development和production,前者指代本地开发即localhost环境，而后者代表发布在任何服务器上的服务，node是不知道你服务是测试还是正式，除非你手动指定，通常认为都是线上环境

## 设置proxy目的

为解决在本地开发时XHR异步请求跨域问题

## 原理

webpack中proxy只是一层代理，用于把指定的path，代理去后端提供的地址，背后使用node来做server。可能有人疑惑，为什么只适用本地开发？因为该技术只是在webpack打包阶段在本地临时生成的node server，来实现类似nginx的反向代理效果

proxy工作原理实质上是利用http-proxy-middleware这个http代理中间件，实现请求转发给其他服务器。例如：本地主机A为http://localhost:3000,该主机浏览器发送一个请求，接口为/api，这个请求数据(响应)在另外一台服务器B http://10.231.133.22:80上，这时，就可以通过A主机设置webpack proxy，直接将请求发送给B主机

```
const express = require('express');
const proxy = require('http-proxy-middleware');

const app = exporess();

app.use('/api', proxy({target: 'http://www.example.org', changeOrigin: true}));

app.listen(3000);

//http://localhost:3000/api/foo/bar => http://www.example.org/api/foo/bar
```

必须设置changeOrigin=true;

## 核心概念

```
var proxy = require('http-proxy-middleware');

var apiProxy = proxy('/api', {target: 'http://www.example.org'});
//                   \____/   \_____________________________/
//                     |                    |
//                   context             options
```

- content: 用于定义哪些请求需要被目标主机代理
- option.target: 目标主机(协议 + 主机名)

也可以简写var apiProxy = proxy('http://www.example.org/api');

**option的几种配置**

option.pathRewrite:重写目标url路径，key用正则表达式来匹配路径

```
// 重写路径
pathRewrite: {'^/old/api': '/new/api'}

// 移出路径
pathRewrite: {'^/remove/api': ''};

// 添加路径
pathRewrite: {'^/', '/basepath/'}

// 路径自定义
pathRewrite: function(path, req) {return path.replace('/api', '/base/api')}
```