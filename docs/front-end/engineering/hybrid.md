---
title: hybrid知识
---
## hybrid是什么？
hybrid是客户端和前端的混合开发

## hybrid有什么用？
hybrid存在核心意义在于快速迭代、无需审核

## hybrid实现流程
1. 前端做好静态页面(html, js, css),将文件交给客户端
2. 客户端拿到前端静态页面，以文件的形式存储在app中
3. 客户端在一个webview中使用file协议加载静态页面

## 客户端如何更新服务端的资源
1. 分版本，有版本号，如201803020201
2. 将静态文件压缩成zip包，上传到服务端
3. 客户端每次启动，都去服务端检查版本号
4. 如果服务端的版本号大于客户端的版本号，就去下载最新的zip包
5. 下载完之后解压包，然后将现有的文件覆盖

## JS和客户端通讯的基本形式
1. js访问客户端能力，传递参数和回调函数
2. 客户端通过回调函数返回内容
3. 前端和客户端通讯的约定-schema协议
4. schema是内置上线的



## 资料
[作为前端，也必须知道的hybrid知识](https://m.imooc.com/article/254557)

[hybrid 开发](https://www.jianshu.com/p/f7e0ae5d4c3f)