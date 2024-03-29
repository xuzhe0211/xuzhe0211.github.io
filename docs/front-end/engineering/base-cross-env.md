---
autoGroup-0: 基础
title: 使用cross-env解决跨平台设置变量的问题
---
## 是什么
运行跨平台设置和使用环境变量的脚本

## 出现原因
当你使用NODE_ENV=production,来设置环境变量时，大多数Window命令提示将会阻塞(报错).（异常是window上的bash，它使用本机Bash）同样，Windows和POSIX命令如何使用环境变量也有区别。使用POSIX:$EVN_VAR和使用%EVN_VAR%的Windows

**说人话：window不支持NODE_ENV=development的设置方法**

## 解决
cross-env使得您可以使用单个命令，而不必担心为平台正确设置或使用环境变量。 只要在POSIX系统上运行就可以设置好，而cross-env将会正确地设置它。
说人话: 这个迷你的包(cross-env)能够提供一个设置环境变量的scripts，让你能够以unix方式设置环境变量，然后在windows上也能兼容运行。
```js
// 安装
npm install --save-dev cross-env

// 使用
{
    "scripts": {
        "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
    }
}
```
NODE_ENV环境变量讲由cross-env设置

打印process.env.NODE_ENV === 'production'

## 使用
package.json
```js
{
    ...
    "scripts": {
        "serve:dev": "cross-env API_ENV=dev vue-cli-service serve"
        ...
    },
    "dependencies": {
      ...
      "cross-env": "^7.0.2",
      ...
    },
    ...
}
```
.env 
```js
VUE_APP_API_ENV=${API_ENV}
```
项目中取用
```js
console.log(process.env.VUE_APP_API_ENV)
```
## 源码解析
vue cli3中[环境变量和模式](https://cli.vuejs.org/zh/guide/mode-and-env.html)写到它可以通过获取.env、.env.local、

## 资料
[cross-env使用](https://www.jianshu.com/p/e8ba0caa6247)


[VUE CLI3 结合 cross-env 配置环境变量（含环境变量源码解析）](https://juejin.cn/post/6844904109951156238)