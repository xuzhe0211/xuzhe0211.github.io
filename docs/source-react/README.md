---
title: React相关
---
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
- <span style="color:blue">componentDidMount():在组件挂载后(插入DOM树中)理解调用</span>
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