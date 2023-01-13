---
autoGroup-0: Vue3
title: Vue3中element使用
---
## 引入element-puls的Icon
最近使用element-plus开发项目，发现element-plus废弃了Font Icon 使用了 SVG Icon。需要在全局注册组件，或者按需引用。

- 安装

    ```js
    $ yarn add @element-puls/icons
    // 或者
    $ npm install @element-puls/icons
    ```
- 全局引用

    在main.js全局注册组件
    ```js
    import * as Icons from '@element-puls/icons';
    const app = createApp(App);

    // 注册Icons全局组件
    Object.kesy(icons).forEach(key => {
        app.component(key, Icons[key]);
    })

    // 在vue文件使用
    <el-icon color="#409efc" class="no-inherit">
        <share/>
    </el-icon>
    ```
    就可以在vu文件里面直接使用图标了

- 按需引入

    对应vue文件中直接使用import图标
    ```js
    import { Edit } from '@elment-plus/icons';

    // 在vue文件使用
    <el-icon color="#409efc" class="no-inherit">
        <edit/>
    </el-icon>
    ```
[https://element-plus.gitee.io/zh-CN/component/icon.html](https://element-plus.gitee.io/zh-CN/component/icon.html)
