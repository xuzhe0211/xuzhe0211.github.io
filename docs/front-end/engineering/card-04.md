---
autoGroup-12: 工程化知识卡片
title: 探讨Webpack异步加载机制
---
首先加载不需要的模块，经常通过webpack的分包机制，将其独立出单独的文件。在需要的时候在加载。这样使首页加载的文件体积大大缩小，加快了加载时间。本文探讨webpack是加载异步文件的原理以及webpack如何实现其原理的，最后在手动实现一个简单的demo

## 原理
webpack异步加载的原理
- 首先异步加载的模块，webpack在打包的时候会独立打包成一个js文件(<span style="color: blue">webpack如何将异步加载的模块独立打包成一个文件？</span>)
- 然后需要加载异步模块的时候
  - <span style="color: blue">创建script标签,src为请求该异步模块的url，并添加到document.head里，由浏览器发起请求。</span>
  - <span style="color: blue">请求成功后，将异步模块添加到全局的__webpack_require__变量(该变量是用来管理全部模块)后</span>
  - <span style="color: blue">请求异步加载文件的import()编译后的方法会从全局的__webpack_require__变量中找到对应的模块</span>
  - <span style="color: blue">执行相应的业务代码并删除之前创建的script标签</span>
异步加载文件里的import()里的回调方法的执行时机，<span style="color: red">通过利用promise的机制来实现的</span>

## 准备工作
> 环境：webpack版本："5.7.0"

按以下目录结构创建文件
```
├── src
│   │── index.js
│   │── info.js
├── index.html
├── webpack.config.json
├── package.json
```
```javascript
// src/index.js
function button() {
    const button = document.createElement('button');
    const text = document.createTextNode('click Me');
    button.appendChild(text);
    button.onclick = e => import('./info.js').then(res => {
        console.log(res.log)
    })
    return button
}
document.body.appendChild(button());

// src/info.js
export const log = 'log info';

// webpack.config.json
const path = require('path');
module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
    }
}

// package.json
{
  "name": "import",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "dependencies": {
    "webpack": "^5.7.0",
    "webpack-cli": "^4.2.0"
  },
  "devDependencies": {},
  "scripts": {
    "build": "webpack --config webpack.config.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

// index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script src="./dist/main.js"></script>
</body>
</html>
```
执行npm run build

<span style="color:blue">得到/dist/main.js /dist/src_info_js.man.js。这两个文件就是我们要分析webpack是如何实现异步加载的入口。</span>

## webpack如何实现的
1. 初始化(执行加载文件代码之前)
    - 根据当前script获取当前地址

        根据当前执行js文件的地址，截取公共地址，并赋值到全局变量中
        ```javascript
        scriptUrl = document.currentScript.src;
        scriptUrl = scriptUrl.replace(/#.*$/, '').replace(/\?.*$/, '').replace(/\/[^\/]+$/, '/') // 1.过滤hash 2.过滤参数 3.过滤当前文件名
        __webpack_require__.p = scriptUrl;
        ```
    - 重写webpackChunkimport数组的push方法(wbpackJsonpCallback)
        ```javascript
        self['webpackChunkimport'].push = webpackJsonpCallback
        ```
2. 执行中
    - 创建加载模块的promise对象，缓存要加载模块的promise.resolve,promise.reject以及promise自己身
        import()编译成__webpack_require__.e方法
        ```javascript
        __webpack_require__.e = (chunkId) => {
            return Promise.all(Object.keys(__webpack_require__.f).reduce((promise, key) => {
                __webpack_require__.f[key](chunkId, promises);
                return promises;
            },[]))
        }
        __webpack_required__f.j = (chunkId, promises) => {
            var promise = new Promise((resolve, reject) => {
                installedChunkData = installedChunks[chunkId] = [resolve, reject];
            });
            promises.push(installedChunkData[2] = promise);
            var url = __webpack_require__.p + __webpack_require__.u(chunkId);
            loadingEnded = (event) => {
                // ...
            }
                __webpack_require__.l(url, loadingEnded, "chunk-" + chunkId);
        }

        var webpackJsonpCallback = (data) => {
            var [chunkIds, moreModules, runtime] = data;
            var moduleId, chunkId, i = 0,
                resolves = [];
            for (; i < chunkIds.length; i++) {
                chunkId = chunkIds[i];
                if (__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
                resolves.push(installedChunks[chunkId][0]);
                }
                installedChunks[chunkId] = 0;
            }
            for (moduleId in moreModules) {
                if (__webpack_require__.o(moreModules, moduleId)) {
                __webpack_require__.m[moduleId] = moreModules[moduleId];
                }
            }
            parentChunkLoadingFunction(data);
            while (resolves.length) {
                resolves.shift()();
            }
        }
        ```
    - 生成url
    - 创建script标签，并添加加载成功script.onload和失败的函数script.onerror
3. 执行完成后
    script.onload加载时机--当异步加载的文件加载完成之后，触发onload方法，将之前新的script标签删除

## 简单实现
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button class="btn">import something</button>
    <script>
        document.querySelector('.btn').addEventListener('click', () => {
            ensure('json.js').then(() => {
                return requireModule('json.js')()
            }).then(res => {
                console.log(res.log)
            })
        })

        let modules = {};
        let handlers;
        window.jsonp = [];
        window.jsonp.push = webpackJsonCallback;
        function requireModule(id) {
            return modules[id];
        }
        function webpackJsonpCallback(data) {
            let [id, moreModule] = data;
            modules[id] = moreModule;
            handlers.shift();
        }
        function ensure(id, promises) {
            let promise = new Promise((resolve, reject) => {
                handlers = [resolve];
            })
            script = document.createElement('script');
            script.src = 'jsonp.js';
            document.head.appendChild(script);
            return promise;
        }
    </script>
</body>
</html>
```


## 资料
[动态引入](/front-end/engineering/package-import.html#代码拆分-按需加载)

[从Webpack编译后的代码，探讨Webpack异步加载机制](https://segmentfault.com/a/1190000038336623)

[webpack的异步加载原理及分包策略](https://segmentfault.com/a/1190000038180453)