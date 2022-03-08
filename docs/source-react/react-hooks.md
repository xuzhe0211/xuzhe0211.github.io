---
title: 换个角度思考React Hooks
---

[原文档](https://mp.weixin.qq.com/s/_uCquHuFaAk8W2bVjaC7Sg)

::: tip
从Vue迁移到React,不太习惯React Hooks的使用？也许换个角度思考Hooks出现的意义会对你有所帮助
:::

## 什么是Hooks

简而言之，Hooks是个函数，通过使用Hooks可以让函数组件功能更加丰富。

在某些场景下，使用Hooks是一个比使用类组件更好的主意。

### Hooks出现的背景

在Hooks出现之前，**函数组件对比类组件(class)** 形式有很多局限，例如：

1. 不能使用state、ref等属性，只能通过函数传参的方式使用props

2. 没有声明周期钩子

同时在类组件的使用中，也存在着不少难以解决的问题

1. 在复杂组件中，耦合的逻辑代码很难分离

    组件化将就的是分离逻辑和UI，但是对于平常所写的业务代码，较难分离和组合。尤其是在生命周期钩子中，多个不相关业务代码被迫放在一个声明周期钩子中，需要把相互关联的部分拆分更小的函数

2. 监听清理和资源释放问题

    当组件要销毁时，很多情况下都需要清除注册的监听事件、释放申请的资源。

    事件监听、资源申请需要在Mount钩子中申请，当组件销毁时还必须要在Unmount钩子中进行清理,这样写使的统一资源的生成和销毁逻辑不再一起,因为生命周期被迫划分成两个部分

3. 组件间逻辑复用困难
 
    在React中实现逻辑复用是比较困难的。虽然有例如**render props、高阶组件**等方案，但仍然需要重新组织组件结构。不算真正意义上的复用。抽象复用一个复杂附件更是不小得挑战，大量抽象层代码带来的嵌套地狱会给开发者带来巨大的维护成本

4. class学习成本

    与Vue的易于上手不同，开发React的类组件需要比较扎实的Javascript基础，尤其是关于this、闭包、绑定事件处理器等相关概念的理解

Hooks的出现，使的上述问题得到不同程度的解决.

我认为了解Hooks出现的背景十分重要。只有知道了为什么要使用Hooks，知道其所能解决而class不能解决的问题时，才能真正理解Hooks的思想，真正享受Hooks带来的便利，真正优雅的使用Hooks。

## Hooks基础

从最简单的Hooks使用开始

### useState

```
import React, { useState } from 'react';

function Example() {
    // 声明一个count的state变量
    const [count, setCount] = useState(0);
    
    return(
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    )
}
```
useState就是一个Hooks，以前的函数组件是无状态的，但是有了Hooks后我们在函数中通过useState来获取state属性(count)以及修改state属性的方法(setCount).

整个Hooks运作过程：

1. 函数组件Example第一次执行函数时useState进行初始化，其传入的参数0就是count的初始值。

2. 返回的VDOM中使用到了count属性，其值为0；

3. 通过点击按钮，触发setCount函数，传入修改count的值，然后重新执行函数(就像类组建中重新执行render函数一样)

4. 第二次以及以后执行函数时，依旧通过useState来获取count及修改count的方法setCount，值不过不会执行count初始化，而是使用上一次setCount传入的值。

从使用最简单的Hooks我们可以知道。

- 存储"状态"不再使用一个state属性

    以往都是把所有状态放到state属性中，而现在有了Hooks我们可以按照需求通过调用多个useState来创建多个state,这有助于分离和修改变量

    ```
    const [count, setCount] = useState[0];
    const [visible, setVisible] = useState(false);
    cosnt [dataList, setDataList] = useState([]);
    ```

- setCount 传入的参数是直接覆盖，而setState执行的是对象的合并处理。

总之useState使用简单，它为函数组件带来了使用state的能力

### useEffect

在Hooks出现之前函数组件是不能访问生命周期钩子的,所以提供了useEffect Hooks来解决钩子问题，以往的所有生命周期钩子都被合并成了useEffect,并且其解决了之前所提的关于生命周期钩子的问题

#### 实现生命周期钩子组合

先举一个关于class生命周期钩子问题的例子

```
// Count 计数组件
class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    componentDidMount() {
        document.title = `你点击了${this.state.count}次`；
    }
    componentDidUpdate() {
        document.title = `你点击了${this.state.count}次`；
    }

    render() {
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                <button onClick = {() => this.setState({count: this.state.count + 1})}>
                    Click me
                </button>
            </div>
        )
    }
}
```
可以看到当我们在第一次组件挂载(初始化)后以及之后每次更新都需要该操作，一个是初始化一个是更新后，这种情况在平时经常会遇到，有时候遇到初始化问题，就避免不了会写两次，哪怕是抽离成单独的函数，也必须在两个地方调用，当这种多起来以后就变得冗余切容易出bug

useEffect是怎么解决？

```
import React, { useState, useEffect } from 'react';

function Example() {
    const [count, setCount] = useState(0);

    // 效果如同componentDidMount 和componentDidUpdate
    useEffect(() => {
        // 更新title
        document.title = `你点击了${count}次`；
    });

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    )
}
```

它把两个生命周期钩子合并在了一起

整个Hooks过程：

1. Example组件第一次执行时候，返回VDOM，渲染

2. 渲染后从上至下按顺序执行useEffect

3. Example组件更新后，返回VDOM，渲染；

4. 选然后从上至下按顺序执行useEffect

可以看到无论是初始化渲染还是更新渲染，useEffect总是会确保在组件渲染完毕后在执行，这就相当于组合了初始化和更新渲染时的生命周期钩子。并且由于闭包的特性，useEffect可以访问到函数组件中的各种属性和方法。

useEffect里面可以进行 **"副作用"** 操作，例如：

1. 更变DOM(调用setCount)

2. 发送网络请求

3. 挂载监听

不应该把"副作用"操作放到函数组件主题中，就像不应该把"副作用"放到render函数中一样，否则很可能回到函数执行死循环或资源浪费等问题

### 实现销毁钩子

这就完了嘛？没有，对于组件来说，有些其内部是有订阅外部数据源的，这些订阅的"副作用"如果在组件卸载时候没有进行清除，将会容易导致内存泄露。React类组件中还有个非常重要的生命周期钩子componentWillUnmount,其在组件将要销毁时候执行。

演示类组件是如何清除订阅的：

```
class FriendStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOnline: null };
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    // 初始化：订阅好友在线状态
    componentDidMount() {
        ChatAPI.subscribeToFriendStatus(
            this.props.friend.id,
            this.handleStatusChange,
        );
    }

    // 更新:好友订阅更改
    componentDidUpdate(prevProps) {
        // 如果 id 相同则忽略
        if(prevProps.friend.id === this.props.friend.id) {
            return;
        }
        // 否则清除订阅并添加新的订阅
        ChatAPI.unsubscribeFromFriendStatus(
            prevProps.friend.id,
            this.handleStatusChange
        );
        ChatAPI.subscribeToFriendStatus(
            this.props.friend.id,
            this.handleStatusChange
        )
    }

    // 销毁：清除好友订阅
    componentWillUnmount() {
        ChatAPI.unsubscribeFromFriendStatus(
            this.props.friend.id,
            this.handleStatusChange,
        );
    }

    // 订阅方法
    handleStatusChange(status) {
        this.setStatus({
            isOnline: status.isOnline
        })
    }

    render() {
        if (this.state.isOnline === null) {
            return 'Loading....'
        }
        return this.state.isOnline ? 'Online' : 'Offline';
    }
}
```

可以看到，一个好友状态订阅使用了三个生命周期钩子。

那么使用useEffect该如何实现？

```
function FriendStatus(props) {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

        // 清除好友订阅
        return function cleanup() {
            ChatAPI.unsubscribeFromFriendStatus(props.firend.id, handleStatusChange);
        }
    })

    if (isOnline === null) {
        return 'Loading...'；
    }
    return isOnline ? 'Online' : 'Offline';
}
```

useEffect把好友订阅的逻辑代码组合到了一起，而不像类组件那样把同意累的逻辑代码按照生命周期来划分。

其中return 的函数是在useEffect再次执行前或是组件要销毁的时候执行，由于闭包,useEffect中的返回函数可以轻易的获取对象并清除订阅。

整个Hooks过程

1. 初始化函数组件FriendStatus,挂载VDOM

2. 按顺序执行useEffect中传入的函数

3. 更新：函数FriendStatus重新执行，重新挂载VDOM

4. 执行上一次useEffect传入的函数返回值:清除好友订阅的函数；

5. 执行本次 useEffect中传入的函数。

### 实现不同逻辑分离

刚才讲的都是在一个场景下使用Hooks。

现在将计数组件和好友在线状态组合并做对比。

```
class FriendStatusWithCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0, isOnline: null };
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    componentDidMount() {
        document.title = `你点击了${count}次`；
        ChatAPI.subscribeToFriendStatus(
            this.props.friend.id,
            this.handleStatusChange
        )
    }

    componentDidUpdate() {
        document.title = `你点击了${count}次`；
    }

    componentWillUnmount() {
        ChatAPI.unsubscribeFromFriendStatus(
            this.props.friend.id,
            this.handleStatusChange
        )
    }

    componentDidUpdate(prevProps) {
        // 如果id相同则忽略
        if (prevProps.friend.id === this.props.friend.id) {
            return;
        }

        // 否则清除订阅并添加新的订阅
        ChatAPI.unsubscribeFromFriendStatus(
            prevProps.friend.id,
            this.handleStatusChange,
        );
        ChatAPI.subscribeToFriendStatus(
            this.props.friend.id,
            this.handleStatusChange,
        )
    }
    handleStatusChange(status) {
        this.setState({
            isOnline: status.isOnline
        });
    }
}
```

可以很明显的感受到，在多个生命周期钩子中，计数和好友订阅等逻辑代码都混合在了同一个函数中。

接下来看看useEffect是怎么做的

```
function FriendStatusWithCounter(props) {
    // 计数相关代码
    const [count, setCount] = useState(0);
    useEffect(() => {
        document.title = `你点击了${count}次`;
    });

    // 好友订阅相关代码
    const [isOnline, setIsOnline] = useState(null);
    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(state.isOnline);
        }

        ChartAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        return () => {
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        }
    })

    // ...
}
```
useEffect可以像使用多个useState那样，把组件的逻辑代码进行分离和组合，更加有利于组件的开发和维护。


### 跳过useEffect

有些时候并没有必要每次在函数组件重新执行时执行useEffect，这个时候就需要用到useEffect的第二个参数了。

第二个参数传入一个数组，数组元素是要监听的变量，当函数再次执行时，数组中只要有一个元素与上次函数执行时传入的数组元素不同，那么则执行useEffect传入的函数，否则不执行。

给个实例
```
function FriendStatus(props) {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnlien);
        }
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

        // 清除好友订阅
        return function cleanup() {
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        }
        // 加入props.friend.id作为依赖，当id改变时才会执行改次useEffect
    }, [props.friend.id]);

    if (isOnline === null) {
        return 'Loading...'；
    }
    return isOnline ? 'Online' : 'Offline';
}
```
给useEffect加入id的依赖，只有当id改变时，才会再次清除、添加订阅，而不必每次函数重新执行时都会清除并添加订阅。

需要注意的是，对于传入的对象类型，React只是比较引用是否改变，而不会判断对象的属性是否改变，所以建议依赖传入的变量都是采用基本类型。

## 真正的Hooks

刚才只是Hooks的简单使用，但是会使用并不能代表整整理解到了Hooks的思想。

从类组件到函数组件不仅仅是使用Hooks的区别，更重要的是开发时 **根本上思维模式的变化**


### useEffect--- 远不止生命周期

很多人认为useEffect只是生命周期钩子的更好替代品，这是不完全正确的。

试想一下这样的场景：一个图表组件Chart需要接受大量的数据然后对其进行大量计算处理(getDataWithinRange())并做展示。

类组件：
```
// 大量计算处理
function getDataWithinRange() {
    // ...
}

class Chart extends Component {
    state = {
        data: null,
    }
    componentDidMount() {
        const newData = getDataWithinRange(this.props.dateRange);
        this.setState({data: newData};)
    }
    componentDidUpdate(prevProps) {
        if (prevProps.dateRange !== this.props.dateRange) {
            const newData = getDataWithinRange(this.props.dateRange);
            this.setState({data: newData});
        }
    }
    render() {
        return (
            <svg className="Chart" />
        )
    }
}
```

当使用生命周期钩子时,我们需要手动判断哪些数据(dataRange)发生了变化，然后更新到对应的数据(data);

而在Hooks的使用中，我们只需要关注哪些值（dataRange）需要进行同步

使用useEffect的函数组件

```
const Chart = ({ dateRange }) => {
    const [data, setData] = useState();

    useEffect(() => {
        const newDate = getDataWithinRange(dateRange);
        setData(newData);
    }, [dateRange]);
    
    return (
        <svg className="chart" />
    )
}
```

useEffect可以让你有更简单的想法实现 **保持变量同步**

不过这还不够简单 我们可以在看下一个例子

### 强大的useMemo

事实上，刚才Hooks中的例子还是有些类组件的思维模式，显的有些复杂了。

1. 使用useEffect进行数据处理

2. 存储变量到state

3. 在JSX中引入state。

有没有发现中间多了个state的环节？

我们不需要使用state，那是类组件的开发模式,因为在类组件中，render函数和生命周期钩子并不是在同一个函数作用于下执行，所以需要state进行中间的存储，同时执行的setState让render函数再次执行，借此获取最新的state.

而在函数式组件中我们有时更本不会需要用到state这样的存储状态，我们仅仅是想使用

所以我们可以把刚才的图表例子写成这样

```
const Chart = ({ dateRange}) => {
    const date = useMemo(() => {
        getDataWithinRange(dateRange);
    }, [dateRange])

    return (
        <svg className = "chart" />
    )
}
```

useMemo会返回一个"记忆化"的结果，执行当前传入的函数并返回结果值给声明的变量，且当依赖没有变化时返回上一次计算的值。

为什么可以这样写？

因为函数组件中render和生命周期钩子在同一个函数作用域中，这也意味着不再需要state作为中间数据桥梁，我们可以直接在函数执行时获取到处理的数据，然后在return的JSX中使用,不必需要每次使用属性都要在state中声明和创建了，不再需要重新渲染执行一次函数(setData)了，所以我们去除掉了useState。这样，我就减少了一个state的生命以及一次重新渲染。

我们把变量定义在函数里面，而不是定义在state中，这是类组件由于其结构和作用域上与函数组件相比的不足,是函数组件的优越性。

当然，如果getDataWithinRange函数开销不大的话，这样写也是可以的

```
const Chart = ({ dateRange }) => {
  const newData = getDataWithinRange(dateRange)
  return (
    <svg className="Chart" />
  )
}
```

在函数上下文中进行数据的处理和使用，是类结构组件所难以实现的。

如果还没有体会到Hooks所带来的变化 下面的例子可能会让你有所领悟

### 多个数据依赖

上个例子我们只要处理一个数据就可以了，这次我们尝试处理多条数据，并且数据间有一类关系

需求如下：

1. 需要对传入的dataRange进行处理得到data

2. 当margins改变后需要更新dimensions

3. 当data改变后需要更新scales

类组件：
```
class Chart extends Component {
  state = {
    data: null,
    dimensions: null,
    xScale: null,
    yScale: null,
  }
  componentDidMount() {
    const newData = getDataWithinRange(this.props.dateRange)
    this.setState({data: newData})
    this.setState({dimensions: getDimensions()})
    this.setState({xScale: getXScale()})
    this.setState({yScale: getYScale()})
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dateRange != this.props.dateRange) {
      const newData = getDataWithinRange(this.props.dateRange)
      this.setState({data: newData})
    }
    if (prevProps.margins != this.props.margins) {
      this.setState({dimensions: getDimensions()})
    }
    if (prevState.data != this.state.data) {
      this.setState({xScale: getXScale()})
      this.setState({yScale: getYScale()})
    }
  }
  render() {
    return (
      <svg className="Chart" />
    )
  }
}
```

函数组件

```
const Chart = ({ dateRange, margins }) => {
  const data = useMemo(() => (
    getDataWithinRange(dateRange)
  ), [dateRange])
  const dimensions = useMemo(getDimensions, [margins])
  const xScale = useMemo(getXScale, [data])
  const yScale = useMemo(getYScale, [data])
  return (
    <svg className="Chart" />
  )
}
```
为什么代码那么少？因为在 Hooks 中我们依旧只需关注哪些值（data、dimensions、xScale、yScale）需要同步即可。

而观察类组件的代码，我们可以发现其使用了大量的陈述性代码，例如判断是否相等，同时还使用了 state 作为数据的存储和使用，所以产生了很多 setState 代码以及增加了多次重新渲染。

### 解放State

还是刚才 3.3 的例子，不过把需求稍微改了一下：让 scales 依赖于 dimensions。

看看类组件是如何做到的：

```
class Chart extends Component {
  state = {
    data: null,
    dimensions: null,
    xScale: null,
    yScale: null,
  }
  componentDidMount() {
    const newData = getDataWithinRange(this.props.dateRange)
    this.setState({data: newData})
    this.setState({dimensions: getDimensions()})
    this.setState({xScale: getXScale()})
    this.setState({yScale: getYScale()})
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dateRange != this.props.dateRange) {
      const newData = getDataWithinRange(this.props.dateRange)
      this.setState({data: newData})
    }
    if (prevProps.margins != this.props.margins) {
      this.setState({dimensions: getDimensions()})
    }
    if (
      prevState.data != this.state.data
      || prevState.dimensions != this.state.dimensions
    ) {
      this.setState({xScale: getXScale()})
      this.setState({yScale: getYScale()})
    }
  }
  render() {
    return (
      <svg className="Chart" />
    )
  }
}
```
由于依赖关系发生了变化，所以需要重新进行判断，并且由于多个依赖关系，判断的条件也变得更加复杂了，代码的可读性也大幅降低。

接着看 Hooks 是如何做到的：
```
const Chart = ({ dateRange, margins }) => {
  const data = useMemo(() => (
    getDataWithinRange(dateRange)
  ), [dateRange])
  const dimensions = useMemo(getDimensions, [margins])
  const xScale = useMemo(getXScale, [data, dimensions])
  const yScale = useMemo(getYScale, [data, dimensions])
  return (
    <svg className="Chart" />
  )
}
```

使用 Hooks 所以不用再去关心谁是 props 谁是 state，不用关心该如何存储变量，存储什么变量等问题，也不必去关心如何进行判断的依赖关系。在 Hooks 开发中，我们把这些琐碎的负担都清除了，只需关注要同步的变量。

所以当数据关系复杂起来的时候，类组件的这种写法显得比较笨重，使用 Hooks 的优势也就体现出来了。

再回顾一下之前一步步走过来的示例，可以看到 Hooks 帮我们精简了非常多的代码。

代码越短并不意味着可读性越好，但是更加精简、轻巧的组件，更容易让我们把关注点放在更有用的逻辑上，而不是把精力消耗在判断依赖的冗余编码中。

## 资料 

[react官方](https://reactjs.org/docs/hooks-intro.html)

[Thinking in React Hooks](https://wattenberger.com/blog/react-hooks)