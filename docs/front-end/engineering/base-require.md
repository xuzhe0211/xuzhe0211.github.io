---
autoGroup-0: 基础
title: node.js 使用require加载第三方包时的查找规则
---
在使用node.js开发过程中经常会用到第三方包，在const express = require('express')这句脚本运行的时，node.js是怎样找到express这个模块的呢？

加入我们的项目目录是这样的
```js
- D:/workspace/node_test/  # 项目目录

main.js             # 主程序

- node_modules/         # 存放第三方包
- express/         # 下载的第三方包
    index.js         # 第三方包的默认入口程序
    package.json         # 第三方包的package.json文件
    ...
...

package-lock.json          # 元数据文件

README.md            # 说明文件
```
步骤如下
1. <span style="color: blue">当主程序执行到const express = require('express')这句的时候，会首先在主程序main.js同级目录下查找node_modules目录。</span>
2. <span style="color: blue">然后在node_modules目录下查找express包目录</span>
3. <span style="color: blue">然后在express包目录下的package.json文件中找到main属性，main属性的值就是要加载的文件</span>
4. <span style="color: blue">如果express包目录下没有package.json文件，或者package.json文件中没有main属性，则会默认加载express包目录下的index.js文件</span>
5. <span style="color: blue">如果以上方式没有找到，则会从上一级目录中开始查找node_modules文件夹</span>
6. <span style="color: blue">重复2-5</span>
7. <span style="color: blue">如果一直当前盘根目录下(比如D://)都没有找到，则会报错:Error:Connt find module 'express';</span>