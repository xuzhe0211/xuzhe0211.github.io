---
autoGroup-12: 工程化知识卡片
title: require.context()的用法详解
---

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