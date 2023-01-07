---
autoGroup-12: 工程化知识卡片
title: require.context()的用法详解
---
## 带表达式的require语句
> 如果你的require参数含有表达式(expressions),会创建一个上下文(context),因为在编译时(compile time)并不清楚具体是哪一个模块被导入

```js
require('./template/' + name + '.ejs');
```
<span style="color: red">webpack解析require()的调用，提取出来如下这些信息:</span>

```js
Directory: ./template
Regular expression: /^.*\.ejs$/
```
则会返回template目录下的所有后缀为.ejs模块的引用，包含子目录

## require.context;
require.context(directory, useSubdirectories, regExp);

1. directory:表示检索的目录
2. useSubdirectories: 表示是否检索子文件夹
3. regExp:匹配文件的正则表达式，一般是文件名

例如: require.context('@/views/components', false, /.vue$/)

1. 常常用来在组件内引入多个组件

    ```js
    const path = require('path');
    const files = require.context('@/components/home', false, /\.vue$/)
    const modules = {};
    files.keys().forEach(key => {
        const name = path.basename(key, '.vue');
        modules[name] = files(key).default || files(key)
    })

    export default {
        ...
        components: modules
    }
    ```

2. 在main.js中引入大量公共组件

    ```js
    import Vue from 'vue';
    // 自定义组件
    const requireComponents = require.context('../views/components', true, /\.vue/);
    // 打印结果
    // 遍历出每个组件的路径
    requireComponents.keys().forEach(fileName => {
        // 组件实例
        const reqCom = requireComponents[fileName];
        // 截取路径作为组件名
        const reqComName = reqCom.name || fileName.replace(/\.\/(.*)\.vue/, '$1');
        // 组件挂载
        Vue.component(reqComName, reqCom.default || reqCom)
    })
    ```

[TypeError: require.context is not a function](https://github.com/storybookjs/storybook/issues/2487)

[require.context
](https://juejin.cn/post/6844903583113019405)