---
autoGroup-10: 打包
title: vue-cli3 编译打包文件的压缩优化
---
## 前言
相比于vue-cli2,vue-cli3隐藏了很多默认的webpack配置(NODE_ENV=production默认会js文件压缩),没有vue-cli2那么一目了然。但是都提供了各部分的修改路口，可仔细研读下官方文档

[vue-cli3官方文档](https://cli.vuejs.org/zh/config/#filenamehashing)

如果真的不是业务需要，真的不会去仔细研读官方文档，因为读了也会马上忘掉。但是真的需要的时候，又会第一时刻想起官方文档，看了后恍然大哭，原来官方文档里都写的一清二楚

## 正文
包含了打包压缩后图片的压缩和js，css压缩

首先安装相关依赖包

```
npm install --save-dev image-webpack-loaders

npm install --save-dev compression-webpack-plugin
```
然后，在vue.config.js里进行配置(这里福袋了上篇文章中ie11兼容es6的处理方法)
```
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  publicPath: './',
  chainWebpack: config => {
    // 解决ie11兼容ES6
    config.entry('main').add('babel-polyfill')
    // 开启图片压缩
    config.module.rule('images')
    .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    .use('image-webpack-loader')
    .loader('image-webpack-loader')
    .options({ bypassOnDebug: true })
    // 开启js、css压缩
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin')
      .use(new CompressionPlugin({
        test:/\.js$|\.html$|\.css/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false // 不删除源文件
      }))
    }
  },
  transpileDependencies: [
        'biyi-admin', // 指定对第三方依赖包进行babel-polyfill处理
    ]
}
```


## 资料
[vue-cli3 编译打包文件的压缩优化](https://www.jianshu.com/p/5e9c78a6a960)

[https://www.cnblogs.com/lafitewu/p/8309305.html](https://www.cnblogs.com/lafitewu/p/8309305.html)
