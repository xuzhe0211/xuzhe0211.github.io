---
autoGroup-1: 公开课
title: 前端构建工具深度剖析02
---

第一天：Babel与weppack原理剖析

第二天:ESModule与Vite原理剖析

第三天：Rollup原理剖析

React工程师修理指南---书



```
// 创建vue项目模板

npm init @vitejs/app vite-admin --template vue
```
速度快

## 手写vite

```
// src/main.js
const {str} from './moduleA.js';
const log('main...', str)

// src/moduleA.js

export const str = 'vite 666'


// 第二种vue
import {createApp, h} form 'vue'

const app = {
    render() {
        return h('div', null, [h('div', null, String('123'))]);
    }
}
createApp.mount('#app');
```

index.html
```
<script type="module" src="./src/mian.js"></script>
<div id="app"></div>
```


index.js
```
const koa = require('koa');
cosnt app = new Koa();
const fs = require('fs');
cosnt path = require('path');

app.use(async ctx => {
    // 提供静态服务
    const {
        request: {url, query}
    } = ctx;

    // index.html
    if (url === '/') {
        ctx.type = 'text/html';
        const content = fs.readFileSync('./index.html', 'utf-8');
        ctx.body = content;
    } else if (url.endsWith('.js')) {
        // *.js
        const p = path.resolve(__dirname, url.slice(1));
        console.log('p', p)
        cosnt type = 'application/javascript';
        cosnt content = fs.readFileSync(p, 'utf-8');
        ctx.boyy = content;
    }

    // 第三方库

})

app.listen(3000, () => {
    console.log('Vite Start at 3000...')
})
```
