---
title: 手把手教你 Electron + Vue 搭建前端桌面应用
---
安装electron总是卡住不动了，看了网上诸多文章后解决了，这是因为安装的镜像地址不对。

解决方法是在项目根目录下新建.npmrc文件，里面写上ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"。

然后将原来的node_modules文件夹删掉，重新安装npm install electron --save-dev就可以啦。
## 资料
[手把手教你 Electron + Vue 搭建前端桌面应用](https://zhuanlan.zhihu.com/p/388415620)

[Electron 基础入门 简单明了，看完啥都懂了](https://blog.csdn.net/qq_39235055/article/details/111995373)

[为什么要用node.js调用dll](/back-end/Node/tips-02.html)