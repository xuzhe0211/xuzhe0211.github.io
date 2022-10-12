---
autoGroup-6: node问题记录
title: node.js调用C++
---
## 主要方案
在NodeJS中，和其他语言编写的代码通信主要有两种方案：
- <mark>使用AddOn技术，使用C++为NodeJS编写一个拓展，然后在代码中调用其他语言所编写的源码or动态库</mark>
- <mark>使用FFI(Foreign Function Interface)技术，直接在Node中引入其他语言所编写的动态链接库</mark>



## 资料
[node js 怎么调用c++ ?](https://blog.csdn.net/liuxunfei15/article/details/125559440)

[node.js调用C++函数的方法示例](https://www.jb51.net/article/147831.htm)

[nodejs调用C++动态链接库FFI](https://www.jianshu.com/p/c0802ad1fb57)

[官网](https://www.nodeapp.cn/addons.html)