---
autoGroup-1: react-tips
title: react动态添加样式：style和className
---
react开发过程中，经常会需要动态向元素内添加样式style或className,那么应该如何动态添加呢？

## react向元素内，动态添加style
例如:有一个DIV元素，需要动态添加一个display:block | none样式，那么：
```JSX
<div style={{ display: (index === this.state.currentIndex) ? 'block' : 'none'}}>此标签是否隐藏</div>
```
或者，多个样式写法
```jsx
<div style={{ display: (index === this.state.currentIndex) ? 'block' : 'none', color: 'red'}}>此标签是否隐藏</div>
```
## React向元素内，动态添加className
1. DIV标签中，没有其他class，只需要动态添加一个.active的className，来显示内容是否被选中状态

    ```jsx
    <div className={index === this.state.currentIndex ? 'active' :  null}>此标签是否选中</div>
    ```
2. 如果DIV标签本身有其他class,又要动态添加一个.active的className，来显示内容是否被选中状态，则

    ```jsx
    <div className={['container tab', index === this.state.currentIndex ? 'active : null'].join(' ')}>此标签是否选中</div>
    ```
    或者，使用ES6写法(推荐使用ES6写法)
    ```jsx
    <div className={`container tab ${index === this.state.currentIndex ? 'active' : null}`}>此标签是否选中</div>
    ```

## 资料
[react动态添加样式：style和className](https://blog.csdn.net/suwyer/article/details/81481507)