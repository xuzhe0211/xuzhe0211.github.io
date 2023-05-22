---
autoGroup-10: 打包
title: vue-cli@4.3+ 开启source-map后在浏览器查看源码并非源码
---
```js
// 需要再vue.config>js加配置
configureWebpack: {
    ...,
    devtool: 'source-map',
    output: {
        devtoolModuleFilenameTemplate: (info) => {
            const resPath = info.resourcePath;
            if ((/\.vue$/.test(resPath) && info.allLoaders !== '') || /node_modules/.test(resPath)) {
              return `webpack:///${resPath}?${info.hash}`;
            }
            return `webpack:///${resPath.replace('./src', 'SouceCode')}`;
        },
     }
  },
```