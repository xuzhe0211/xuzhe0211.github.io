---
title: vue 项目的 env 文件使用
---
## 文件
在项目根目录创建
- .env 无论开发环境还是生产环境都会加载
- .env.development开发环境加载这个文件
- .env.production生产环境加载这个文件

## 注意
:::danger
env文件需要声明运行的环境
:::

- .env.deveplment
  ```
  NODE_ENV = development
  ```
- .env.production
  ```
  NODE_ENV = production
  ```

:::danger
定义变量需要以VUE_APP_作为前缀
:::

- .env.develoment
  ```
  NODE_ENV = development
  VUE_APP_BASE_URL = http://dev.myhost.com
  ```
- .env.production
  ```
  NODE_ENV = production
  VUE_APP_BASE_URL = http://www.myhost.com
  ```
:::danger
测试变量是否生效，可直接在main.js中打印测试
:::
```
console.log(process.env.VUE_APP_BASE_URL)
```

## 设置vue.config.js和vue项目都用的变量 

你可以在 vue.config.js 文件中计算环境变量。它们仍然需要以 VUE_APP_ 前缀开头。这可以用于版本信息:
```
process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  // config
}
```

[package.json script](/front-end/engineering/base-script.html)

[cross-env shell变量](/front-end/engineering/base-cross-env.html#是什么)

[官方文档](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E5%9C%A8%E5%AE%A2%E6%88%B7%E7%AB%AF%E4%BE%A7%E4%BB%A3%E7%A0%81%E4%B8%AD%E4%BD%BF%E7%94%A8%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F)