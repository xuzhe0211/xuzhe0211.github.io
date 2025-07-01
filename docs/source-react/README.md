---
title: React相关
---
## vue vs react
Vue和React都是当前流行的前端框架，各有优劣，主要区别可以从 **语法风格、核心思想、生态系统、性能优化、使用场景**等多个维度来看
1. 语法风格
    - Vue采用的是基于模板的声明式编程风格，而React采用的是基于JSX的声明式编程风格
    - Vue采用的是基于组件的编程风格，而React采用的是基于函数的编程风格

    对比项| Vue | React
    ---|---|---
    代码风格 | 采用单文件组件(SFC),将template、script、style组织在.vue文件中，结构清晰利于维护| 采用JSX语法，在Javascript代码中写HTML，更灵活
    数据绑定| 双向数据绑定(v-model),方便处理表单等输入交互| 单向数据流(state + props)，需要onChange监听手动更新
    状态管理| 组件内部 data() + Vuex/Pinia | useState + Redux/Mobx
    事件处理| @click=『handleChick』 | onClick={handleClick}
    指令系统| 许多内置指令(v-if、v-for、v-bind、v-model等) | 无指令系统，需要用javascript处理

    总结
    - Vue更注重HTML和Javascript分析，适合喜欢模版语法的人，代码清晰易读
    - React采用JSX,逻辑与UI结合在一起，更适合习惯Javascript代码的人

2. 核心思想
    
    对比项| Vue | React
    ---|---|---
    数据流|双向绑定(v-model)，适合表单应用|单向数据流(props + state)，适合大型应用的数据管理
    组件通信|props、emit、provide/inject、Vuex/pinia | props、context API、Redux/Mobx
    状态管理| vuex、pinia | Redux/Mobx
    路由| vue-router | react-router
    函数式编程| 组合式API(setup + ref/Reactive) | 全部基于函数式编程(useState/useEffect)

    总结
    - Vue提供完整的全家桶方案,上手快
    - React强调函数式编程，状态管理更加灵活，但需要搭配第三方库(Redux/Mobx)

3. 性能对比

    对比项| Vue | React
    ---|---|---
    虚拟DOM| Diff采用以来追踪,只更新受影响的组件| Diff采用Fiber算法，批量更新(适合大规模应用)
    响应式| Proxy(vue3),自动追踪依赖，更高效 | useState/useEffect 依赖手动管理
    首屏加载| vue3轻量化，Tree-shaking依赖较少|React 核心库小，但生态依赖较多
    SSR | Nuxt.js(vue生态),优化良好| Next(React生态)，功能更加丰富
    构建工具| vite(默认),打包速度快 | webpack、vite，next内置优化

    总结
    - Vue依赖追踪优化了性能，适合数据变化频繁的场景
    - React的Fiber适合大规模应用，批量渲染更高效

4. 生态对比

    对比项| Vue | React
    ---|---|---
    官方支持|Vue生态完整| React主要提供核心库，状态管理，路由需选择第三方
    社区生态|受欢迎程序高，但React生态更广|全球开发者社区更大，第三方库更丰富
    组件库| Element Plus、Vant、Arco Design | Ant Design、Material UI、Chakra UI
    移动端开发| 支持Weex、Uniapp | React Native

5. 适用场景

    适用场景|vue|react
    ---|---|---
    小型项目|	✅ 语法简单，上手快，适合快速开发|	🚫 需要额外配置，复杂度高
    中型项目|	✅ Vuex/Pinia 适合中等规模状态管理|	✅ React 组件复用性高
    大型项目	|🚫 代码规模大时，Vue 组件通信复杂|✅ React 适合大规模应用，团队协作更成熟
    SSR（服务端渲染）|	✅ Nuxt.js 提供完整的 SSR 方案	|✅ Next.js 提供更强的 SSR 方案
    移动端	|✅ UniApp 适合 H5 和小程序开发	|✅ React Native 更适合原生开发

6. 选择建议

    ✅ 选择 Vue 的理由
    - 你喜欢 HTML + CSS + JavaScript 分离 的开发方式。
    - 你更关注 简单易用，上手快，语法清晰。
    - 你的项目 是中小型应用，比如管理后台、H5 页面、小程序等。
    - 你想要 官方提供完整的生态（Vue Router、Pinia、Vite、Nuxt）。

    ✅ 选择 React 的理由
    - 你喜欢 JSX + 纯 JavaScript 逻辑，更灵活可控。
    - 你的项目 是大型应用，需要更好的组件复用和状态管理（Redux、Recoil）。
    - 你想要 更强大的 SSR（服务端渲染），比如使用 Next.js。
    - 你想开发 React Native 应用（兼容 iOS/Android）。




## 组件生命周期
组件的生命周期可分为三个状态
- <span style="color:blue">Mounting(挂载):已插入真实DOM</span>
- <span style="color:blue">Updating(更新):正在被重新渲染</span>
- <span style="color:blue">Unmounting(卸载):已移出真实DOM</span>

![组件生命周期](./images/ogimage.png)

### 挂载
当组件实例被创建并插入DOM中时，其生命周期调用顺序如下
- <span style="color:blue">constructor(): 在React组件挂载之前，会调用它的构造函数</span>
- <span style="color:blue">getDerivedStateFromProps(): 在调用render方法之前调用，并且在初始挂载及后续更新时都会被调用</span>
- <span style="color:blue">render(): render()方法是class组件中唯一必须实现的方法</span>
- <span style="color:blue">componentDidMount():在组件挂载后(插入DOM树中)立即调用</span>

render()方法是class组件中唯一必须实现的方法，其他方法可以根据自己的需求来实现。

这些方法的详细说明，可以参考[官方文档](https://zh-hans.reactjs.org/docs/react-component.html#reference)。

### 更新
每当组件的state或props发生变化时，组件就会更新。

当组件的props或state发生变化时会触发更新。组件更新的生命周期调用顺序如下
- <span style="color:blue">getDerivedStateFromProps():在调用render方法之前调用，并且在初始挂载及后续更新时都会被调用。根据shouldComponentUpdate()的返回值，判断React组件的输出是否受当前state或props更改的影响</span>
- <span style="color:blue">shouldComponentUpdate():当props或state发生变化时，shouldComponentUpdate()会在渲染执行之前被调用</span>
- <span style="color:blue">render()：render()方法是class组件中唯一必须实现的方法</span>
- <span style="color:blue">getSnapshotBeforeUpdate()：在最近一次渲染输出(提交到DOM节点)之前调用。</span>
- <span style="color:blue">componentDidUpdaet():在更新后会被立即调用</span>

### 卸载
当组件从DOM中移除时会调用如下方法
- <span style="color:blue">componentWilUnmount():在组件卸载及销毁之前直接调用</span>

这些方法的详细说明，可以参考[官方文档](https://zh-hans.reactjs.org/docs/react-component.html#reference)

[react-教程](https://www.runoob.com/react/react-component-life-cycle.html)

[组件生命周期](https://zh-hans.reactjs.org/docs/react-component.html#the-component-lifecycle)
## 函数的副作用

函数的副作用为如果当前函数没有设置参数或设置内部声明的变量的val时，当前函数的函数变量就会调用函数的父级作用域的变量，对父级作用域的变量值造成全局污染


[React官网](https://react.docschina.org/tutorial/tutorial.html#what-is-react)

[react-router-dom](https://reactrouter.com/docs/en/v6/upgrading/v5#upgrade-to-react-router-v51)

[React Router 中文文档](https://react-guide.github.io/react-router-cn/docs/Introduction.html)

[React Router 中文文档（v5 ）](https://juejin.cn/post/6844904093694033927#heading-12)

https://zhuanlan.zhihu.com/p/68842994

https://juejin.cn/post/6981728346937753630#heading-7

[React：组件的生命周期](https://segmentfault.com/a/1190000004168886)


[飞冰](https://ice.work/)

[Gatsby 是一个基于 React 的免费、开源框架，用于帮助 开发者构建运行速度极快的 网站 和 应用程序](https://www.gatsbyjs.cn/)

[codepen.io](https://codepen.io/gaearon/pen/YGYmEG?editors=1010)