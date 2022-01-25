---
autoGroup-1: 公开课
title: webpack源码解读
---


webpack核心点

Compiler类(创建编译器，提供一些编译中的通用数据)->Compilation类(编译类，编译打包)

Dependency类 context类，Module类，Chunk类、Template类


基于事件流的webpack

基于是拘留的webpack


- 处理配置选项
- 注册内置插件
    - 注册一个入口解析的插件
    - 在compiler.hooks.compilation中猪儿侧入口解析插件
- Compiler.run()
- Compiler.compile()
    - 创建Compilation params
    - 创建Compilation compiler
- Dependency类(用来描述一个模块相关的信息的对象)
    - EntryDependency对象
    - NormalModule对象
    - 解析该模块的路径和读取该模块的内容
    - 根据内容构建ast
    - 根据ast提取以来对象
    - 循环依赖对象构建依赖对应的模块对象
    - 通过上述步骤