---
autoGroup-6: node问题记录
title: createProxyMiddleware
---
```js
var express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express()
app.use(express.static(__dirname + '/'))
// 啊啊啊啊啊啊 折磨死了 为什么http://localhost:4000 不行 非要用127.0.0.1
app.use('/api', createProxyMiddleware({target: 'http://127.0.0.1:4000', changeOrigin: false,secure: false,}));
module.exports = app
```


[github](https://github.com/chimurai/http-proxy-middleware)