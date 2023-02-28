---
autoGroup-8: Node开发一个博客
title: 01-nodejs介绍
---
## 亚马逊
- 英语要求强吗？

    能读懂，详情界面(读写能力)

- 规则

    要保证货品不能侵权

- 发货

    先发货到到亚马逊仓库  服装sku(大小款号(s、l、m)、颜色)? 必须先放到亚马逊仓库

- 网址

    国外--货品俄语区

样品-->

阿里巴巴->供货


## 使用nvm
- nvm，nodejs版本管理工具，可切换多个node.js版本
- mac oc，使用brew install nvm
- windows， github中搜索nvm-window，有下载地址

## nodejs和Javascript的区别
- ECMAScript
    - 定义了语法(语法和词法),写javascript和nodejs都必须遵守
    - 变量定义，循环、判断、函数
    - 原型和原型链，作用域和闭包，异步

    - 不能操作DOM，不能监听click事件，不能发送ajax请求
    - 不能处理http请求，不能操作文件
    - 即，只有ECMAScript，几乎做了任何实际项目
    - 具体内容参考[http://es6.ruanyifeng.com/](http://es6.ruanyifeng.com/)
- Javascript
    - 使用ECMAScript语法规范，外加Web API, 缺一不可
    - DOM操作，BOM操作，事件绑定，AJAX等
    - 两者结合，即可完成浏览器的任何操作
- nodejs
    - 使用ECMAScript语法规范，外加nodejs API,缺一不可
    - 两者结合，即可完成server端的任何操作

    - 处理http，处理文件，具体参考[http://nodejs.cn/api/](http://nodejs.cn/api/)

### 总结
- ECMAScript是语法规范
- nodejs = ECMAScript + NodeJS API
- Javascript = ECMAScript + Web api

## Commonjs 模块化
Commonjs是node默认的模块化规范
```js
// a.js
function add(a, b) {
    return a + b
}
function mul(a, b) {
    return a * b
}
module.exports = {
    add, 
    mul
};

// b.js
const {add, mul} = require('./a');

const _ = require('lodash');
// const opt = require('./a');
// let add = opt.add;
// let mul = opt.mul;
console.log(mul(10, 20))
console.log(add(10, 20))

const arr = _.concat([1,2], 3)
console.log('arr...', arr)
```

## node debugger
package.json 中 "main": "index.js",  开启debugger调试  
![debugger](./images/1.png)

```js
// console.log(100);
// console.log(200);
// console.log(300);
// console.log(400);
// console.log(500);
// console.log(600);
// console.log(700);
 const http = require('http');

 const server = http.createServer((req, res) => {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end('<h1>hello world1</h1>');
 })
 server.listen(3000, () => {
    console.log('listening on 3000 port')
 })
```
vscode开启断点调试->断点->点击运行->浏览器访问3000->回调到浏览器->一步一步调试

## server端和前端的区别
- 服务稳定性
    - server端可能会遭受各种恶意攻击和误操作
    - 单个客户端可以挂掉，但是服务端不能
    - 课程后面会讲解使用PM2做进程守候
- 考虑CPU和内存(优化、扩展)
    - 客户端独占一个浏览器，内存和CPU都不是问题
    - server端要承载很多请求，CPU和内存都是稀缺资源
    - 可能后面会讲解使用steam写日志，使用redis存session
- 日志记录
    - 前端也会参与写日志，但只是日志的发起方，不关心后续
    - server端要记录日志、存储日志、分析日志， 前端不关心
    - 课程后面会讲解多种日志记录,以及如何分析日志
- 安全
    - server端要随时准备接收各种恶意攻击，前端则少很多
    - 如：越权操作，数据库攻击等
    - 课程后面会讲解登录验证，预防xss攻击和sql注入
- 集群和服务拆分
    - 产品发展速度快，流量可能会迅速增加
    - 如何通过扩展机器和服务拆分来承载大流量？
    - 本课程虽然是但机器开发，但是从设计上支持服务拆分

## 地址
[视频地址](https://www.youtube.com/watch?v=Lfef9uQo2pE&list=PL9nxfq1tlKKlhV1UzUmElRkxmjkoO3mtH&index=2)

[node 官方中文文档](http://nodejs.cn/api/)