---
autoGroup-3: 微前端
title: microApp 和 wujie 中选择了 wujie：深度技术对比与选型思考
---
近年来微前端架构逐渐成为大型前端工程化的主流解决方案，在众多微前端框架中，microApp和wujie凭借其独特的设计理念脱颖而出。本文将从技术实现、性能表现、开发体验等维度进行深度对比

## 核心架构对比
### 沙箱机制
- microApp: 基于Proxy的运行时沙箱
    - 采用ES6 Proxy代理全局对象
    - 通过闭包隔离作用域链
    - 存在样式污染风险(需配合 Shadow DOM)
- wujie：WebComponents + iframe混合沙箱
    - 主应用使用 WebComponents容器
    - 子应用运行在iframe沙箱环境
    - 天然隔离Javascript、CSS作用域

### 通信机制
维度| microApp| wujie
-|-|-
Javascript通信| 基于CustomEvent的全局事件总线 | propx + 事件总线
数据同步| 手动触发更新 | 自动响应时更新
类型支持| 基础类型 | 支持复杂对象/函数传递
TS支持| 需自行定义类型 | 内置完整类型声明

### 资源加载
- microApp

    ```js
    // 配置式资源声明
    registerApp({
        name: 'subApp',
        entry: 'https://sub.domain.com',
        container: '#container'
    })
    ```
- wujie:

    ```js
    // 声明式组件化加载
    <WujieVue
        name="subApp"
        url="https://sub.domain.com"
        :props="{ user:currentUser}"
    />
    ```
## 性能关键指标
### 冷启动耗时(单位：ms)
场景| microApp | wujie
-|-|-
简单子应用 | 320 | 280
复杂子应用| 850|720
多实例场景|2100|1800

### 内存占用对比


[原文](https://juejin.cn/post/7507199358863032358)