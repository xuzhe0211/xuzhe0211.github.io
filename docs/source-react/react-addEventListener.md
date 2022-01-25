---
title: React合成时间和DOM原生时间混用须知
---

## React合成事件
### 为什么有合成事件的抽象
如果DOM上绑定了过多的事件处理函数，整个页面响应以及内存占用可能都会受到影响。React为了避免这类DOM事件滥用，同事屏蔽底层不同浏览器之间的事件系统差异，实现了一个中间层-SyntheticEvent

### 原理
React中，如果需要绑定事件，我们常常在jsx中怎么写：
```
<div onClick={this.onClick}>React事件</div>
```
原理大致如下

React并不是将click事件绑在该div的真实DOM上，而是在document处监听所有支持的事件，当事件发生并冒泡至document处时，React将事件内容封装并交由真正的处理函数处理

以上面代码为例，整个事件生命周期示例如下

![React合成事件](./images/8792eeae6dc6011274986acf42a76b15_tplv-t2oaga2asx-watermark.jpg)

其中，由于event对象是复用的,事件处理函数执行完后，属性会被清空，所以event的属性无法被异步访问

## 如何在React中使用原生事件
虽然React分支了几乎所有的原生时间，但诸如
- Modal开启以后点空白区域需要关闭Modal
- 引入了一些以原生事件实现的第三方库，并且相互之间需要交互

等等场景时,不得不使用原生事件来进行业务逻辑处理。

由于原生事件需要绑定在真实DOM上，所以一般是在componentDidMount阶段/ref的函数执行阶段进行绑定操作，在componentWillUnmount阶段进行解绑操作以避免内存泄露

```
class Demo extends React.PureComponent {
    componentDidMount() {
        const $this = ReactDOM.findDOMNode(this);
        $this.addEventListener('click', this.onDOMClick, false);
    }
    onDOMClick = evt => {
        // ....
    }
    render() {
        return (
            <div>Demo</div>
        )
    }
}
```
## 合成事件和原生事件混合使用
如果业务场景中需要混用合成事件和原生事件，那使用过程中需要注意一下几点

### 响应顺序
先看个例子
```
class Demo extends React.PureComponent {
    componentDidMount() {
        const $this = ReactDOM.findDOMNode(this)
        $this.addEventListener('click', this.onDOMClick, false)
    }

    onDOMClick = evt => {
        console.log('dom event')
    }
    
    onClick = evt => {
        console.log('react event')
    }

    render() {
        return (
            <div onClick={this.onClick}>Demo</div>
        )
    }
}
```
我们来分析一下：首先DOM事件监听器被执行，然后事件继续冒泡至document，合成事件监听器再被执行。

即，最终控制台输出为：

```
dom event react event
```
### 阻止冒泡
那，如果在onDOMClick中调用evt.stopPropagation()呢？

由于DOM事件被阻止冒泡了，无法达到document，所以合成事件自然不会被处罚，控制台输出就变成了
```
dom event
```

## 结论
1. 合成事件的监听器是统一注册在document上的，且仅有冒泡阶段。所以原生时间的监听器响应总是比合成时间的监听器早
2. 阻止原生事件的冒泡后，会阻止合成事件的监听器执行
3. 合成事件的nativeEvent在文本场景中 没毛用


## 资料
[React合成时间和DOM原生时间混用须知](https://juejin.cn/post/6844903502729183239)
