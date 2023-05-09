---
autoGroup-13: ES6
title: 又新学到了一个JavaScript知识点Import Maps
---
我主要从以下几个方面来简单介绍一下import maps：

![import maps特性](./images/3.png)

## import maps是什么
import map直译过来就是 **导入映射**，它与模块的使用有关，一般我们在项目中导入模块，会调用require方法，或者使用import语句或方法，引入的模块通常使用npm之类的包管理器进行管理。但是  import map 提供了一种支持，让我们可以直接在页面页面上管理模块，不需要通过打包构建。

import maps已经成了一个Web标准，，并且在2021年7月正式通过了 W3C 的标准化流程；但是由于这个特性比较新，很多浏览器不支持，后面我们详细聊聊兼容情况。

接下来看一下import map怎么工作的...

##  import maps怎么使用
在 import maps中，可以使用一个 JavaScript 对象来定义模块标识符与对应URL的映射关系。例如：
```html
<script type="importmap">
    {
        "imports": {
            "lodash": "https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.js",
            "react": "/node_modules/react/index.js"
        }
    }
</script>
```
在上述示例中，定义了lodash模块的URL为 https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.js, 而react模块的URL则为相对路径/node_modules/react/index.js

通过importmap，可以在模块中使用字符串形式的模块名称来导入其他模块，而不必关心时机模块资源的URL，例如：
```html
<script type="module">
    import _ from 'lodash';
    import React from 'react';
</script>
```
这样，JavaScript引擎会自动根据导入映射中定义的映射关系来加载模块资源，并将其绑定到相应的模块变量上。

总之import maps使用其实非常简单，是通过在html文档的script标签中，使用json对象来配置所有需要在当前html文档中需要引入的模块。

如果这个json映射表内容比较多，我们还可以将它放到其他文件中，然后通过src属性去链接它，例如
```html
<script src="xxx_importmaps.json"></script>
```
上面一起简单的认识了 import maps相信不少人和我一样，都在想一个问题，这种实现方式有什么优势呢？或者说酒精能解决什么问题，呆着疑问我们进入下一节

## import maps有何优势？
换句话说，我们需要先知道import maps可以用来做什么？

### 动态加载模块
import maps支持动态加载模块，可以在需要的时候才进行加载，避免一次性加载所有模块的开销，提高应用程序的性能和用户体验

这里距离说明一下，例如在Vue2的项目中，文章页面支持播放视频，但是文章中没有视频时，我们可以不用加载播放器，项目中动态加载player.min.js
1. 首先在index.html文件中添加 import maps

    ```html
    <head>
        <script type="importmap">
            {
                "imports": {
                    "player": "https://example.com/path/to/player.min.js"
                }
            }
        </script>
    </head>
    ```
2. 在Vue组件中动态加载 player.min.js文件

    可以在需要使用播放器的vue组件中使用动态加载player.min.js文件的代码 例如：
    ```js
    export default {
        data() {
            return {
                player: null,
            }
        },
        methods: {
            loadPlayer() {
                if(this.player) {
                    return Promise.resolve(this.player);
                }
                return import('player').then((Player) => {
                    this.player = new Player.default();
                    return this.player;
                });
            },
            play() {
                this.loadPlayer().then((player) => {
                    player.play();
                });
            },
        }
    }
    ```
### 减少网络请求
使用import maps 可以减少网络请求的主要原因是，可以将多个模块合成一个请求，从而减少了网络请求的次数，提高页面的加载速度

如果一个页面需要引入多个模块，如果不使用 import maps，每个模块都需要通过一个独立的请求进行加载。而使用import maps，可以讲多个模块合并成一个请求，从而减少网络请求的次数。例如：

```html
<script type="importmap">
   {
  'lodash': 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
  'vue': 'https://cdn.jsdelivr.net/npm/vue@3.0.0/dist/vue.esm-browser.js',
  'axios': 'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js'
   };
</script>
```
```js
// 定义个映射表

// 加载模块
Promise.all([
    import('lodash'),
    import('vue'),
    import('axios')
]).then(([_, { createApp}, axios]) => {
    const app = createApp({/**.... */})
    axios.get(/*....*/)
})
```
在上面的代码中，在加载模块时，我们使用了Promise.all方法讲多个模块的导入操作合并到一个Promise对象中，这样浏览器就可以将多个模块的请求合并成一个请求，从而减少了网络请求的次数。需要注意的是，在使用import maps减少网络请求时，我们需要避免将过多的模块合并到一个请求中，否则可能会导致请求过大，影响页面的加载速度。通常建议将多个模块合并到一个请求中时，选择具有相似功能或关联度高的模块进行合并，同时需要进行适当的测试和优化，以确保页面的加载速度和性能

### 模块依赖关系管理

## 资料
[又新学到了一个JavaScript知识点Import Maps](https://mp.weixin.qq.com/s/6KV1Q-7Wvwb-8E81fTooWA)