---
autoGroup-16: Tips/方法实现
title: 实现一个大文件上传和断点续传
---

## 大文件上传

### 整体思路
#### 前端
前端大文件上传网上的大部分文章已经给出了解决方案，<span style="color: orange">核心是利用Blob.prototype.slice方法，和数组的slice方法类似，调用slice方法可以返回源文件的某个切片</span>

## 资料
[字节跳动面试官：请你实现一个大文件上传和断点续传](https://juejin.cn/post/6844904046436843527#heading-2)