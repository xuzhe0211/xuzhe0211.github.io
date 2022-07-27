---
autoGroup-1: react-tips
title: React中setState方法详解
---
## 为什么要使用setState方法,如何用？
在React中，组件分为有状态组件和无状态组件,有状态的组件就是能够定义state的组件，比如类组件;无状态的组件反之，比如函数组件。state就是用来描述事物在某时刻的数据，可以改变，改变后与视图相映射，用来保存数据和响应视图。

虽然状态可以改变，但不是响应式的，动态改变并没有与视图响应，想要改变并响应视图则需要setState修改并更新视图

使用方法:this.setState({修改的数据})

setState并不会影响其他没有进行修改的数据，此方法是从Component中继承过来的

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
    // 定义state
    state = {
        count: 0, 
        list: [1, 2,3],
        person: {
            name: 'jack',
            age: 18
        }
    }
    changeCount = () => {
        // this.state.count++
        // 上面的写法并不能更新视图，想要双向更新只能利用setState方法
        this.setState({
            count: this.state.count,
        })
    }
    changeList = () => {
        // 同理
        this.state.list.push('Hello React');
        this.setState({
            list: this.state.list
        })
    }
    changePerson = () => {
        this.state.person.name = 'ifer',
        this.state.person.age = 19;
        this.setState({
            person: this.state.person,
        })
    }
    render() {
        return (
            <div>
                <h3>count输出</h3>
                <p>{this.state.count}</p>
                <button onClick={this.changeCount}>click</button>
                <hr />
                <h3>list输出</h3>
                <ul>
                    {this.state.list.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                <button onClick={this.changeList}>click</button>
                <hr />
                <h3>person输出</h3>
                <p>
                    {this.state.person.name} {this.state.person.age}
                </p>
                <button onClick={this.changePerson}>click</button>
            </div>
        )
    }
}
ReactDOM.render(<App />, document.querySelector('#root'))
```
<span styl="color:red">状态有个特性是不可变性，就是不可以直接修改原数据，而是直接产生一个新的数据，通过setState方法把新的数据覆盖原有的数据，从而进行响应视图，怎么做有利于性能优化和SCU</span>

## setState使用触发的钩子函数
1. render()-- 每次组件渲染都会触发

    注意：render()中不要调用setState方法，会发生死循环

2. componentDidUpdate()--- 组件更新(完成DOM渲染)后触发

## setState是同步代码
虽说setState很多人说是异步的，但是它本身的执行过程和代码是同步的,只是它在合并数据与钩子函数的调用顺序在更新后无法拿到值，形成了异步，我们可以通过第二个参数拿到更新后的结果
```js
changeText() {
    this.setState({
        age: 20
    }, () => {
        console.log(this.state.age);
    })
}
```
也可以通过钩子函数获取修改后的值
```js
componentDidUpdate() {
    console.log(this.state.age);
}
```
## 什么时候"同步"，什么时候"异步"
- 一般情况下(常见在生命周期或者合成事件处理函数中)，通过setState()方法来更新状态，表现是异步的

    ```js
    state = {count: 1}

    this.setState({
        count: this.state.count + 1
    })
    console.log(this.state.count); // 1
    // 通过DOM不能立马获取更新后的值
    ```
- 当执行到setState时，React出于性能考虑，并不会立马执行修改state，而是先把当前更新对象以及后续的合并到一起，放在一个更新队列里进行合并操作，这期间并不会影响后续代码执行。且多次调用会合并，以最后一次渲染为主，以此来进行性能优化

    ```js
    this.setState({
        count: this.state.count + 1
    })
    this.setState({
        count: this.state.count + 2,
    })
    this.setState({
        count: this.state.count + 3,
    })
    // 最后实现更新的是最后一个代码，前面的都会被覆盖
    ```
    如果想要实现一个一个实现，可以利用setState的第二个参数,第二个参数是回调函数，在更新完之后执行
    ```js
    // setState有两个参数，第二个参数可以立即拿到更新后的值
    this.setState({}, () => {
        console.log('这个回调函数会在状态更新后理解执行')
    })

    this.setState(() => ({
	    count: this.state.count + 1
    }))
    // prevStart 是最近一次的更新的数据
    this.setState((prevStart) => ({
        count: prevStart.count + 2
    }))
    this.setState((prevStart) => ({
        count: prevStart.count + 3
    }))
    ```
    上面确实可以累加，把累加的结果渲染到页面上，但依然不能改变异步更新的表现形式

- 如果在setTimeout/setInterval或者原生事件(比如点击事件等)的回调中，或者是在setState前面遇到await后续表现都为同步的

    ```js
    // 利用定时器
    import React, { Component } from 'react';

    export default class App extends Component {
        state = {
            count: 1
        }
        componentDidMount() {
            setTimeout(() => {
                this.setState({
                    count: this.state.count + 1
                })
                console.log(this.state.count); // 2
            })
        }
        render() {
            return <div>{this.state.count}</div>
        }
    }
    // 原生事件
    import React, {Component, createRef} from 'react';

    export default class App extends Component {
        state = {
            cuont: 1,
        }
        countRef = createRef();
        componentDidMount() {
            this.countRef.current.onClick = () => {
                this.setState({
                    count: this.state.count + 1,
                })
                console.log(this.state.count); // 2
            }
        }
        render() {
            return 
                <div>
                    <h2>{this.state.cuont}</h2>
                    <button ref={this.countRef}>点击</button>
                </div>
        }
    }
    // async写法
    import React, { Component } from 'react';
    
    export default class App extends Component {
        state = {
            count: 1,
        }
        async componentDidMount() {
            await this.setState({
                count: this.state.count + 1,
            })
            console.log(this.state.count); // 2
        }
        render() {
            return 
                <div>
                    <h1>{this.state.count}</h2>
                </div>
        }
    }
    ```


## 资料
[React中setState方法详解](https://blog.csdn.net/AI_huihui/article/details/121843901)

[react中的setState方法](https://blog.csdn.net/zsm4623/article/details/86592121)

[React 之 state 数据改变页面不更新未重新渲染的 7 种情况 及 解决办法](https://blog.csdn.net/qq_40259641/article/details/105275819)