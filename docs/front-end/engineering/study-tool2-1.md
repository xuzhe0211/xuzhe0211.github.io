---
autoGroup-1: 公开课
title: ESModule与Vite原理剖析
---

:::tip
snowpack/vite等基于ESM的构建工具出现，让项目的工程构建不再需要构建一个完整的bundle。很多人觉得不再需要打包工具的时代即将到来。借助浏览器ESM的能力，一写代码基本可以做到需要构建直接运行。
vite实践
https://juejin.cn/post/6926822933721513998
https://github.com/57code/vite2-in-action
:::

## Vite是什么
Vite(读音类似于[weIt]，法语,快的意思)是一个由原生ES Module驱动的Web开发构建工具。在开发环境下基于浏览器原生ES imports开发，生产环境下基于Rollup打包。

### Vite特点
- Lightning fast code start --闪电般的冷启动速度
- Instanthot module replacement(HMR)--即时热模块替换
- True on-demand compilation--真正的按需编译

> vite要求项目完全有ES Module模块组成<br/>
> common.js模块不能直接在Vite上使用<br/>
> 打包依旧还是使用rollup等传统打包工具<br/>

### ESModule

```
<script src="./src/index.js" type="module"></script>
```

服务端
```
const Koa = require('koa');
const app = new Koa();
app.use(async (ctx) => {
    const {
        request: {url, query},
    } = ctx;
    console.log(`url: ${url}, query.type: ${query.type}`);
    // 首页
    if(url === '/') {
        ctx.type = 'text/html';
        let content = fs.readFileSync('./index.html', 'utf-8');
        ctx.body = content;
    }
})
app.listen(3000, () => {
    console.log('Vite Start listen 3000...');
})
```

新建页面index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vite App</title>
</head>
<body>
    <h1>Vite 666</h1>
    <div id="app"></div>
    <script></script>
    <script type="module" src="/src/main.js"></script>
</body>
</html>
```
新建/src/main.js
```
console.log('main...');
```
添加模块解析/index.js

/src/moduleA.js

```
export const str = 'Hello Vite'；
```
/src/main.js
```
import {str} from './moduleA.js';
console.log(str);
```

```
else if (url.endsWith('.js')) {
    // js文件
    const p = path.resolve(__dirname, url.slice(1));
    ctx.type = 'application/javascript';
    cosnt content = fs.readFileSync(p, 'utf-8');
    ctx.body = content;
}
```

### 添加依赖解析
> Form('./xxx') => from('./xxx')<br/>
> Form('yyy') => from('@modules/yyy')<br/>

```
function rewriteImport(content) {
    return content.replace(/from ['|"]([^'"]+)['|"]/g, function(s0, s1) {
        console.log('s', s0, s1);
        // ../  /开头的都是相对路径
        if(s1[0] !== '.' && s1[1] !== '/') {
            return `from '/@modules/${s1}/'`;
        } else {
            return s0;
        }
    })
}
// 添加模块改写
ctx.body = rewriteImport(content)
```

### 第三方依赖支持
/src/main.js

```
import {createApp, h} from 'vue';
const App = {
    render() {
        return h('div', null, [h('div', null, String('123'))]);
    }
}
createApp(App).mount('#app');
```

```
else if (url.startsWith('@/modules/')) {
    // 这是一个node_module里的东西
    const prefix = path.resolve(
        __dirname,
        'node_module',
        url.replace('/@modules/', '')
    );
    const module = require(prefix + '/package.json').module;
    const p = path.resolve(prefix, module);
    cosnt ret = fs.readFileSync(p, 'utf-8');
    ctx.type = 'application/javascript';
    ctx.body = rewriteImport(ret);
}
```

SFC组件支持

```
const compilerSfc = require('@vue/compiler-sfc'); // .vue
const compilerDom = require('@vue/compiler-dom'); // 模板

else if (url.endsWith('.css')) {
    const p = path.resolve(__dirname, url.slice(1));
    const file = fs.readFileSync(p, 'utf-8');
    cosnt content = `
        const css = '${file.replace(/\n/g, '')}'
        let link = document.createElement('style');
        link.setAttribute('type', 'text/css');
        document.head.appendChild('link');
        link.innerHTML = css;
        export default css
    `;
    ctx.type = 'application/javascript';
    ctx.body = content;
} else if (url.indexOf('.vue') > -1) {
    // vue 单文件组成
    const p = path.resolve(__dirname, url.split('?')[0].slice(1));
    cosnt { descriptor } = compilerSfc.parse(fs.readFileSync(p, 'utf-8'));

    if (!query.type) {
        ctx.type = 'application/javascript';
        // 借用vue自导的compile框架 解析单文件组件，其实相当于vue-loader做的事情
        ctx.body = `
            ${rewriteImport(
                descriptor.script.content.replace('export default ', 'const __script =')
            )}
            import { render as __render} from '${url}?type=temeplate'
            __script.render = __render;
            export default _script
        `;
    } else if (query.type === 'temeplate') {
        // 模板内容
        const template = descriptor.temeplate;
        // 要在server端把compiler做了
        const render = compilerDom.compile(template.content, {mode: 'module'}).code;
        ctx.type = 'application/javascript';
        ctx.body = rewriteImport(render);
    }
}
```

## 资料
[替代 webpack？带你了解 snowpack 原理，你还学得动么](https://zhuanlan.zhihu.com/p/149351900)