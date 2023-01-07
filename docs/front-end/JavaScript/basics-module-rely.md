---
autoGroup-6: 前端模块化
title: 为什么模块循环依赖不会死循环？CommonJS 和 ES Module 的处理不同？
---
如果被问到“CommonJS和ES Module的差异”，大概每个前端都都背出几条：一个是导出值的拷贝，一个是导出值的引用；一个是运行时加载，一个是静态编译...

这篇文章会聚焦于遇到“循环引入”时，两者的处理方式有什么不同，这篇文章会讲清：

- CommonJS和ES Module对于循环引用的解决原理是什么？
- CommonJS的module.exports和exports有什么不同？
- 引入模块时的路径解析规则是什么。

## 总结
回到开头的三个问题，答案在稳重不难找到
1. <span style="color: red">CommonJS和ES Module都对循环引入做了处理，不会进入死循环，但是处理方式不同</span>
    - CommonJS借助模块缓存,遇到require函数会先检查是否有缓存，已经有的则不会进入执行，在模块缓存中还记录着导出的变量的拷贝值
    - ES Module借助模块地图，已经进入过的模块标注为获取中，遇到import语句会去检查这个地图，已经标注为获取中的不会进入，地图中的每一个节点是一个模块记录，上面有导出的变量的内存地址，导入时会做一个连接---即指向同一块内存
2. <span style="color: red">CommonJS的export和module.export指向同一块，但由于最后导出的module.export，所以不能直接给export赋值，会导致指向丢失</span>
3. <span style="color: red">查找模块时候，核心模块和文件模块的查找都比较简单，对于react/Vue这种第三方模块，会从当前目录下的node_module文件下开始，递归往上查找，找到该包后，根据package.json中的mian字段找到入口文件</span>

## 资料
[webpack模块化原理解析(五)--webpack对循环依赖的处理](/front-end/engineering/package-module.html#何谓循环依赖)

[为什么模块循环依赖不会死循环？CommonJS 和 ES Module 的处理不同？](https://mp.weixin.qq.com/s/5CYvCdq9s8e0j-0qlm3StA)