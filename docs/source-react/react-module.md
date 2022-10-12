---
title: React中函数组件和类组件的区别
---
:::tip
定义组件有两个要求
1. 组件名称必须以大写字母开头
2. 组件的返回值只能有一个根元素
:::

## 函数组件
```js
function Welcome(props) {
   return <h1>Welcome {props.name}</h1>
}
ReactDOM.render(<Welcome name='react'/>, document.getElementById('root'));
```
函数组件接收一个单一的props对象并返回一个React元素

## 类组件
```js
class Welcome extends React.Component {
  render() {
    return (
      <h1>Welcome { this.props.name }</h1>

    );
  }
}
ReactDOM.render(<Welcome name='react' />, document.getElementById('root'));
```

无论是使用函数或是类来声明一个组件，它决不能修改它自己的 props。

所有 React 组件都必须是纯函数，并禁止修改其自身 props 。

<span stle="color: blue">React是单项数据流，父组件改变了属性，那么子组件视图会更新。</span>

属性 props 是外界传递过来的，状态 state 是组件本身的，状态可以在组件中任意修改

组件的属性和状态改变都会更新视图。

## 类、函数组件区别：

<span style="color: blue">函数组件和类组件当然是有区别的，**而且函数组件的性能比类组件的性能要高，因为类组件使用的时候要实例化，而函数组件直接执行函数取返回结果即可**。</span>

为了提高性能，尽量使用函数组件。

<span style="color: blue">**函数组件没有this,没有生命周期，没有状态state;类组件有this,有生命周期，有状态state。**</span>

1. <span style="color: blue">类组件的性能消耗大，因为类组件需要创建类组件的实例，而且不能销毁</span>
2. <span style="color: blue">函数组件性能消耗少，因为函数式组件不需要创建实例，渲染的时候就执行一下，得到返回的react元素后直接把中间量全部销毁了</span>

**函数式组件是不能有状态的，但是现在有了react hooks,也可能有状态了**

## Hooks和类组建的区别
> 函数组件写法更轻量、灵活
在函数组件中我们不需要去继承一个class对象，不需要去记忆那些生命周期，不需要把数据定义在state中。函数作为js中的一等公民，可以让我们更加高效更加灵活的去组织代码

> 类组件的自身缺陷

1. 如果我们需要一个只跟着视图走的数据，我们不能直接使用props或者state.这个我们可以通过一个实例看看
    ```js
    class ProfilePage extends React.Component {
        showMessage = () => {
            alert('Followed' + this.props.user);
        }
        handleClick = () => {
            setTimeout(this.showMessage, 3000);
        }
        render() {
            return <button onClick={this.handleChils}>Follow</botton>
        }
    }

    function ProfilePage(props) {
        const showMessage = () => {
            alert('Followed'+ props.user);
        };
        const handleClick = () => {
            setTimeout(showMessage, 3000);
        }

        return (
            <button onClick={handleClick}>Follow</button>
        )
    }
    ```
    上面用类组件和函数组件实现了同一个逻辑，两个组件都会接受来自父组件传过来的props.user，在点击按钮之后会3秒之后alert一条信息

    <span style="color: red">**假如我一开是传入的props值是小红，然后三秒之内去改变props.user的值，变成小绿，这两个分别输出小绿和小红**</span>。为什么会这样呢？这里我先只介绍类组件，在React的类组件中，props虽然是不变的，但是this永远是可变的。当有异步的事件触发，它获取到的props或者state永远都是最新的
2. <span style="color:blue">使用bind或者剪头函数去约束我们函数中this的作用域</span>
3. <span style="color:blue">状态逻辑的难以复用以及复杂组件变得难以理解</span>

    对于状态逻辑的复用，虽然在类组件中也可以使用**高级组件+继承**解决，但hooks似乎有更好的解决方案。而对于复杂组件难以理解是在平时写代码的时候最常见的一个问题，一个组件写着写着状态越来越多，如果抽成子组件的话props和state又要传来传去，最后自己也看不到，下面也举个实例    

:::tip
对于**状态逻辑的复用**这种场景只要页面中有复用的组件，且这个组件又有较为复杂的状态逻辑，就会有这样的需求，常见例子：在做后台系统中经常需要去做各种展示的列表，表格的内容各不相同，但是又都要有分页的行为，于是分页组件就需要去抽象
:::

### 传统类组件
```js
import {Component} from 'react';
export default class ListWithPagination extends Component {
    stata = {
        page: 1,
        data: []
    }
    componentDidMout() {
        this.fetchListData(this.setState);
    }
    handlePageChange = newPage => {
        this.setState({page: newPage}, this.fetchListData);
    }
    fetchListData = () => {
        const {page} = this.state;
        // 模拟请求数据的函数，传入页数和size
        fetchList(page,20).then(data => this.setState({data}));
    }
    render() {
        const {data, page} = this.state;
        return (
            <div>
                <ul className="list">
                {data.map((item, key) => (
                    <li key={key}>{item}</li>
                ))}
                </ul>
                <div className="nav">
                <button type="button" onClick={() => this.handlePageChange(page - 1)}>
                    上一页
                </button>
                <label>当前页: {page}</label>
                <button type="button" onClick={() => this.handlePageChange(page + 1)}>
                    下一页
                </button>
                </div>
            </div>
        )
    }
}
```
这样就实现了基本的列表和分页组件，然后我们会想，每个地方都要有分页，唯一不一样的就是列表渲染跟数据请求api，那我们可以抽象成高阶组件

### 高阶组件
定义：高阶组件其实就是高阶函数，我们定一个函数里面返回一个有状态组件，高阶组件的好处就是让我们的业务逻辑层和UI层分离，更加好维护

方式
- 属性代理方式

    属性代理是常见的一个高阶组件的使用方式之一，它通过一些操作将包裹的组件的props和新生成的props一起传递给此组件(这两个props一个是调用HOC函数传入的参数，一个是将写入HOC返回的组件中的参数)
- 反向继承方式

    这种方式返回的组件继承了被传入的组件，所以它能访问的区域、权限更多比如可以直接访问传入组件的state数据

接着上面说的变成高阶函数会怎么样呢
```js
export default function ListHoc(listComponent) {
    return class ListWithPagination extends Component {
        // 同上省略
        // 数据请求方法，从props中传入
        fetchListData = () => {
            const {fetchApi} = this.props;
            const {page} = this.state;
            return fetchApi({page}).then(data => this.setState({data}));
        }
        return () {
            const { data, page } = this.state;
            return (
                <div>
                <ListComponent data={data} />
                <div className="nav">...省略</div>
                </div>
            );
        }
    }
}
```
这么一来，后面在写列表时，使用高级组件包裹一下再把数据请求方法以props传入，达到一个复用状态逻辑与分页组件的效果。

### Hooks改造
```js
import {userState, userEffect} from 'react';
export default function List() {
    const [page, setPage] = useState(1); // 初始页码为1
    const [list, setList] = useState([]); // 初始列表数据为空数组[]

    useEffect(() => {
        fetchList({page}).then(setList);
    }, [page]); // 当page变更时，触发effect

    const prevPage = () => setPage(currentPage => currentPage - 1);
    const nextPage = () => setPage(currentPage => currentPage + 1);

    return (
        div>
        <ul>
            {list.map((item, key) => (
            <li key={key}>{item}</li>
            ))}
        </ul>
        <div>
            <button type="button" onClick={prevPage}>
            上一页
            </button>
            <label>当前页: {page}</label>
            <button type="button" onClick={nextPage}>
            下一页
            </button>
        </div>
        </div>
    )
}
```
这里运行机制就不说了，下面就用hooks来抽离我们的逻辑

首先将我们的分页抽离出来
```js
const usePagination = (fetchApi) => {
    const [page, setPage] = useState(1);
    const [list, setList] = useState([]);

    useEffect(() => {
        fetchApi({page}).then(setList);
    }, [page]);
    const prevPage = () => setPage(currentPage => currentPage - 1);
    const nextPage = () => setPage(currentPage => currentPage + 1);

    return [list, { page }, { prevPage, nextPage }];
}

export default function List() {
    const [list, {page}, {precPage, nextPage}] = usePagination(fetchList);//获取处理好的数据结果
    return (
        <div>...省略</div>
    );
}
```
如果你希望分页的dom结构也想复用，那就在抽个函数就好
```js
function renderCommonList({ ListComponent, fetchApi }) {
  const [list, { page }, { prevPage, nextPage }] = usePagination(fetchApi);
  return (
    <div>
      <ListComponent list={list} />
      <div>
        <button type="button" onClick={prevPage}>
          上一页
        </button>
        <label>当前页: {page}</label>
        <button type="button" onClick={nextPage}>
          下一页
        </button>
      </div>
    </div>
  );
}

export default function List() {
  function ListComponent({ list }) {
    return (
      <ul>
        {list.map((item, key) => (
          <li key={key}>{item}</li>
        ))}
      </ul>
    );
  }
  return renderCommonList({
    ListComponent,
    fetchApi: fetchList,
  });
}
```
这样就实现了我们组件抽离的效果，如果希望有一个新的列表或者分页效果那完全可以再重写一个结构，总之最核心的状态已经抽离出来，我们爱放哪放哪， 这么一来，数据层与dom更加的分离，react组件更加的退化成一层UI层，进而更易阅读、维护、拓展。

#### Hooks自身的不足
1. 比较大的心智负担，我们需要时刻注意是否已经给hooks添加了必要的依赖项，在一些功能相对复杂的组件中，useEffect的重复渲染问题有时候会非常棘手，不容易调试

    这个特性在对函数组件进行性能优化时也是会带来很大的麻烦，因为每次props和state数据变化，都会导致函数组件中所有内容的重新渲染。我们需要通过memo，useMemo，useCallback这些方法手动去减少组件的render。当一个组件结构比较复杂，嵌套较多时，依赖项问题的处理也很让人头疼
2. <span style="color: red">**状态不同步，在一次渲染中组件的props和state是保持不变的，这个特性导致的闭包陷阱，是我们开发中常见的问题**，因为函数的运行是独立的，每个函数都有自己的作用域，函数变量是保存在运行时的作用域里面的，当我们有异步操作时会看到回调函数中的变量引用的是之前的也就是旧的，</span>
```js
import React, { useState } from 'react';
const Counter = () => {
    const [counter, setCounter] = useState(0);
    const onAlertButtonClick = () => {
        setTimeout(() => {
            alert(count)
        }, 3000);
    }
    return (
        <div>
        <p>You clicked {counter} times.</p>
        <button onClick={() => setCounter(counter + 1)}>change count</button>
        <button onClick={onAlertButtonClick}>show count</button>
        </div>
    )
}
export default Counter
```
当我点击完show count后里面去点击change count这一定会在3s内，三面后我们看到的结果竟然是0 而不是1，这个问题在class component不会出现，因为class component的属性和方法都在一个instace上，调用方式是：this.state.xxx 和this.method().因为每次都是从一个不变的instance上进行取值，所以不存在引用是旧的问题

## 资料
[React 函数组件和类组件的区别](https://cloud.tencent.com/developer/article/1843744)