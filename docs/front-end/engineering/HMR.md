---
title: 搞懂webpack HMR原理
---

## 自动刷新

监听到文件更新后的下一步就是刷新浏览器，webpack模块负责监听文件，webpack-dev-server模块则负责刷新浏览器。在使用webpack-dev-server模块去负责启动webpack模块时，webpack模块的监听默认会开启，webpack模块会在文件发生变化时通知webpack-dev-server模块

### 自动刷新原理
1. 借助浏览器扩展去通过浏览器提供的接口刷新，WebStorm IDE的LiveEdit功能就是这样实现了
2. 向要开发的网页中注入代理客户端代码，通过代理客户端去刷新整个页面。
3. 将要开发的网页装进一个iframe钟，通过刷新iframe去看到最新效果

DevServer支持第二种、第三种方法，第二种是DevServer默认采用的刷新方法

## HMR
**原理是在一个源码发生变化时，只需要重新编译发生变化的模块，再用新输出的模块替换掉浏览器中对应的老模块**

Hot Module Replacement(HMR)特性最早由webpack提供，能够对运行时的Javascript模块进行热更新(无需刷新，即可替换，新增、删除模块)

与整个重刷相比，模块热更新的最大意义在于能够保留应用程序的当前运行时状态，让更加高效的Hot Reloading开发模式成为了可能

P.S.后来其它构建工具也实现了类似的机制，例如Browserify、甚至React Native Packager

可是，编辑源码产生的文件变化在编译时，替换模块实现在运行时，二者是怎样联系起来的呢？

### 基本原理

![webpack基本原理](./images/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9oTTVIdGt6Z0xZWVVOVlZocDlCNWtJWGtCUTR1VUg3QlJYcmlhakcwMmh4aENLTWljZXRWM1lvUE1wRkJmZTNxWTFQOGhoanc5Nm1wc21pYVVMYzNHNUpJdy82NDA.png)

监听到文件变化后，通知构建工具(HMR plugin),将发生变化的文件(模块)发送给泡在应用程序里的运行时框架(HMR Runtime),由运行时框架把这些模块塞进模块系统(新增、删除或替换现有模块)

其中HMR Runtime是构建工具在编译时注入的，通过统一的模块ID将编译时的文件与运行时的模块对应起来，并暴露一系列API供应用层框架对接

## 资料
[译文搞定webpack HMR原理](https://blog.csdn.net/ayqy_jiajie/article/details/106654777)
[wbepack的HMR原理分析](https://www.jianshu.com/p/ff6450532e61)