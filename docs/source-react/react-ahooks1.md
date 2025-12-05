---
autoGroup-2: react-hooks
title: 一文归纳 React Hooks 常用场景
---
React在v16.8的版本中推出了React Hooks新特性。在我看来，使用React hooks相比于从前的类组件有一下几点好处
1. <span style="color: blue">代码可读性更强，原本同一块功能的代码逻辑被拆分在不同的生命周期函数中，容易使开发者不利于维护和迭代，通过React Hooks可以将功能代码聚合，方便阅读维护</span>
2. <span style="color: blue">组件树层级变浅，在原本的代码中，我们经常使用HOC/render props等方式来复用组件的状态，增强功能等，无疑增加了组件树层级及渲染，而在React Hooks中，这些功能都可以通过强大的自定义的Hooks来实现</span>

## State Hook
1. 基础用法
    ```js
    function state() {
        const [count, setCount] = useState(0);

        return (
            <div>
                <p>You clicked {count} times</p>
                <button onClick={() => setCount(count + 1)}>
                    Click me
                </button>
            </div>
            </div>
        )
    }
    ```
2. 更新

    更新分为以下两种方式，即直接更新和函数式更新，其应用场景的区分点在于：
    - 直接更新不依赖于旧state的值
    - 函数式更新依赖于旧state的值
    ```js
    // 直接更新
    setState(newCount); 

    // 函数式更新
    setState(prevCount => prevCount - 1)
    ```
3. 实现合并

    与class组件中的setState方法不同，useState不会自动合并更新对象，而是直接替换它。我们可以用函数式的setState结合展开运算符来达到合并更新对象的效果
    ```js
    setState(prevState => {
        // 也可以使用Object.assign
        return {...prevState, ...updatedValues}
    })
    ```
4. 惰性初始化state

    initialState参数只会在组件的初始渲染中起作用，后续渲染会被忽略。其应用场景在于:创建初始state很昂贵时，例如需要通过复杂计算获取得；那么则可以传入一个函数，在函数中计算并返回初始的state，此函数只在初始渲染时被调用；
    ```js
    const [state, useState] = useState(() => {
        const initialState = someExpensiveComputation(props);
        return initialState;
    })
    ```
5. 一些重点

    - 不像class中this.setState，Hooks更新state变量总是替换它而不是合并它
    - 推荐使用多个state变量，而不是单个state变量，因为state的替换逻辑而不是合并逻辑，并且利于后续的相关state逻辑抽离
    - 调用State Hook的更新函数并传入当前的state时，React将跳过子组件的渲染及effect的执行(React使用[Object.is比较算法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#description))

## Effect Hook
1. 基础用法

    ```js
    function Effect() {
        const [count, setCount] = useState(0);
        useEffect(() => {
            console.log(`You clicked ${count} times`);
        })
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
2. 清除操作

    <span style="color: red">为防止内存泄露，清除函数会在组件卸载前执行；如果组件多次渲染(通常如此),则在执行下一个effect之前，上一个effect就已被清除，即先执行上一个effect中return的函数，然后在执行本effect中非return的函数</span>
    ```js
    useEffect(() => {
        const subscription = props.source.subscribe();
        return () => {
            // 清楚订阅
            subscription.unsubscribe();
        }
    })
    ```
3. 执行时期

    <span style="color: red">与componentDidMount与componentDidUpdate不同，使用useEffect调用的effect不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快;(**componentDidMount或componentDidUpdate会阻塞浏览器更新屏幕**)</span>

4. 性能优化

    默认情况下，React会每次等待浏览器完成画面渲染之后延迟调用effect;但是如果某些特定值在两次重渲染之间没有发生变化，你可以通知React跳过对effect的调用，只需要传递数组作为useEffect的第二个可选参数即可：如下所示，如果count值两次渲染之间没有发生变化，那么第二次渲染后就会跳过effect的调用
    ```js
    useEffect(() => {
        document.title = `You clicked ${count} times`
    }, [count])
    ```
5. 模拟componentDidMount

    如果想只运行一次的effect(仅在组件挂载和卸载时执行),可以传递一个空数组([])作为第二个参数，如下所示，原理跟第4点性能优化讲述的一样
    ```js
    useEffect(() => {
        // ....
    }, [])
    ```
6. 最佳实践

    要记住effect外部的函数使用了哪些props和state很难，这也是为什么通常你会想在effect内部去声明它所需要的函数
    ```js
    // bad 不推荐
    function Example(someProp) {
        function doSomething() {
            consolel.log(someProp)
        }

        useEffect(() => {
            doSomething(); 
        }, []) // 🔴 这样不安全（它调用的 `doSomething` 函数使用了 `someProp`）
    }

    // good，推荐
    function Example({ someProp }) {
    useEffect(() => {
        function doSomething() {
        console.log(someProp);
        }

        doSomething();
    }, [someProp]); // ✅ 安全（我们的 effect 仅用到了 `someProp`）
    }
    ```
    如果出于某些原因你无法把一个函数移动到effect内部，还有一些其他办法
    - <span style='color: red'>你可以把那个函数移动到你的组件之外。</span>这样一来，这个函数肯定不会依赖任何props或state，并且也不用出现在依赖列表中了
    - <span style="color: red">万不得已情况下，你可以 把函数加入effect的依赖 把它的定义包裹进 useCallback Hook。</span>这就确保它不随渲染而改变，除非它自身的依赖发生了变化

    推荐启动[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation)中[exhaustive-deps](https://github.com/facebook/react/issues/14920)规则，此规则会在添加错误依赖时发出警告并给出修复建议
    ```js
    // 1、安装插件
    npm i eslint-plugin-react-hooks --save-dev

    // 2、eslint 配置
    {
        "plugins": [
            // ...
            "react-hooks"
        ],
        "rules": {
            // ...
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn"
        }
    }
    ```
7. 一些重点

    - 可以把useEffect Hook看做componentDidMount,componentDidUpdate和componentWillUnmount这三个函数的组合
    - 在React的class组件中,render函数是不应该有任何副作用的;一般来说，在这里执行操作太早了，我们基本上都希望在React更新DOM之后才执行我们的操作

## useContext
用来处理多层级传递数据的方式，在以前组件中，跨层级祖先组件想要给孙子组件传递数据的时候，除了一层层props往下透传之外，我们还可以使用React Context API来帮我们做这件事。使用例子如下所示

1. 使用 React Context API,在组件外部建立一个Context

    ```js
    import React from 'react';
    const ThemeContext = React.createContext(0);
    export default ThemeContext;
    ```
2. 使用 Context.Provider 提供了一个Context对象，这个对象可以被子组件共享

    ```js
    import React, { useState } from 'react';
    import ThemeContext from './ThemeContext';
    import ContextComponent1 from './ContextComponent1';

    function ContextPage() {
        const [count, setCount] = useState(1);
        return (
            <div className="App">
                <ThemeContext.Provider value={count}>
                    <ContextComponent1 />
                </ThemeContext.Provider>
                <button onClick={() => setCount(count + 1)}>Click me</button>
            </div>
        )
    }
    export default ContextPage;
    ```
3. useContext()钩子函数用来引入 Context 对象，并且获取到它的值

    ```js
    // 子组件，在子组件中使用孙组件
    import React from 'react';
    import ContextComponent2 from './ContextComponent2';
    function ContextComponent() {
        return (
            <ContextComponent2 />
        )
    }
    export default ContextComponent;

    // 孙组件，在孙组件中使用Context 对象值
    import React, { useContext } from 'react';
    import ThemeContext from './ThemeContext';

    function ContextComponent() {
        const value = useContext(ThemeContext);
        return (
            <div>useContext: {value}</div>
        )
    }
    export default ContextComponent;
    ``` 
## useReducer
### 1. 基础用法
比 useState 更适用的场景: 例如 state 逻辑处理较复杂且包含多个子值，或者下一个state依赖于之前的state等；例子如下所示

```js
import React, { useReducer } from 'react';

interface stateType {
    count: number;
}
interface actionType {
    type: string;
}
const initialState = { count: 0 };
const reducer = (state:stateType, action: actionType) => {
    switch (action.type) {
        case 'increment': 
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        default:
            throw new Error();
    }
}
const UseReducer = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
      return (
    <div className="App">
      <div>useReducer Count:{state.count}</div>
      <button onClick={() => { dispatch({ type: 'decrement' }); }}>useReducer 减少</button>
      <button onClick={() => { dispatch({ type: 'increment' }); }}>useReducer 增加</button>
    </div>
  );
}

export default UseReducer;
```
### 2. 惰性初始化 state
```js
interface stateType {
  count: number
}
interface actionType {
  type: string,
  paylod?: number
}
const initCount =0 
const init = (initCount:number)=>{
  return {count:initCount}
}
const reducer = (state:stateType, action:actionType)=>{
  switch(action.type){
    case 'increment':
      return {count: state.count + 1}
    case 'decrement':
      return {count: state.count - 1}
    case 'reset':
      return init(action.paylod || 0)
    default:
      throw new Error();
  }
}
const UseReducer = () => {
  const [state, dispatch] = useReducer(reducer,initCount,init)

  return (
    <div className="App">
      <div>useReducer Count:{state.count}</div>
      <button onClick={()=>{dispatch({type:'decrement'})}}>useReducer 减少</button>
      <button onClick={()=>{dispatch({type:'increment'})}}>useReducer 增加</button>
      <button onClick={()=>{dispatch({type:'reset',paylod:10 })}}>useReducer 增加</button>
    </div>
  );
}
export default UseReducer;
```
## Memo
如下所示，当父组件重新渲染时，子组件也会重新渲染，即使子组件的props和state都没有改变
```js
import React, { memo, useState } from 'react';

// 子组件
const ChildComp = () => {
    console.log('ChildComp...');
    return (<div>ChildComp...</div>)
}

// 父组件
const Parent = () => {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <div>hello world {count}</div>
            <div onClick={() => { setCount(count => count + 1); }}>点击增加</div>
            <ChildComp/>
        </div>
    )
}
export default Parent;
```
改进：我们可以使用memo包一层，就能解决上面的问题;但是仅仅剞劂父组件没有传参给子组件的情况以及父组件传简单类型的参数给子组件的情况(例如：string、number/boolean等)；如果有传复杂属性应该使用 useCallback(回调事件) 或者 useMemo(复杂属性)

```js
// 子组件
const ChildComp = () => {
    console.log('ChildComp...');
    return (<div>ChildComp...</div>)
}
const MemoChildComp = memo(ChildComp)
```
## 六、useMemo
假设以下场景，父组件在调用子组件时传递 info 对象属性，点击父组件按钮时，发现控制台会打印出子组件被渲染那的信息。

```js
import React, { memo, useState } from 'react';

// 子组件
const ChildComp = (info: {info: {name: string, age: number}}) => {
    console.log('ChildComp...');
    return (<div>ChildComp...</div>)
}

const MemoChildComp = memo(ChildComp);

// 父组件
const Parent = () => {
    const [count, setCount] = useState(0);
    const [name] = useState('jack');
    const [age] = useState(11);
    const info = {name, age};

    return (
        <div className="App">
            <div>hello world {count}</div>
            <div onClick={() => { setCount(count => count + 1); }}>点击增加</div>
            <MemoChildComp info={info}/>
        </div>
    )
}
export default Parent;
```
分析原因
- 点击父组件按钮，出发父组件重新渲染;
- 父组件渲染，const info = {name, age} 一行会重新生成一个新对象；导致传递给子组件的 info 属性值变化，进而导致子组件重新渲染

解决

使用 useMemo 将对象属性包一层，useMemo有两个参数
- 第一个参数是个函数，返回的对象指向同一个引用，不会创建新对象
- 第二个参数是个数组，只有数组中的变量改变时，第一个参数的函数才会返回一个新的对象

```js
import React, { memo, useMemo, useState } from 'react';

// 子组件
const ChildComp = (info: {info: {name: string, age: number}}) => {
    console.log('ChildComp...');
    return (<div>ChildComp...</div>)
}

const MemoChildComp = memo(ChildComp);

// 父组件
const Parent = () => {
    const [count, setCount] = useState(0);
    const [name] = useState('jack');
    const [age] = useState(11);

    const info = useMemo(() => {
        return {name, age}
    }, [name, age])

    return (
        <div className="App">
            <div>hello world {count}</div>
            <div onClick={() => { setCount(count => count + 1); }}>点击增加</div>
            <MemoChildComp info={info}/>
        </div>
    )
}
export default Parent;
```
## 七、useCallback
接着第六章的例子，假设需要将事件传给子组件，如下所示，当点击父组件按钮时，发现控制台会打印出子组件被渲染的信息，说明子组件又被重新渲染了。

```js
import React, { memo, useMemo, useState } from 'react';

// 子组件
const ChildComp = (props: any) => {
    console.log('ChildComp...');
    return (<div>ChildComp...</div>)
}

const MemoChildComp = memo(ChildComp);

// 父组件
const Parent = () => {
    const [count, setCount] = useState(0);
    const [name] = useState('jack');
    const [age] = useState(11);
    const info = useMemo(() => ({name, age}), [name, age]);
    const changeName = () => {
        console.log('输出名称....');
    }

    return (
        <div className="App">
            <div>hello world {count}</div>
            <div onClick={() => { setCount(count => count + 1); }}>点击增加</div>
            <MemoChildComp info={info} changeName={changeName}/>
        </div>
    )
}
export default Parent;
```
分析原因
- 点击父组件按钮，改变了父组件中count变量值(父组件的state值)，进而导致父组件重新渲染；
- 父组件重新渲染时，会重新创建changeName函数，即传给子组件的changeName属性发生了变化，导致子组件渲染；

解决：修改父组件的 changeName 方法，用 useCallback 钩子函数包裹一层，useCallback 参数与 useMemo类似

```js
import React, { memo, useCallback, useMemo, useState } from 'react';

// 子组件
const ChildComp = (props: any) => {
    console.log('ChildComp...');
    return (<div>ChildComp...</div>)
}

const MemoChildComp = memo(ChildComp);

// 父组件
const Parent = () => {
    const [count, setCount] = useState(0);
    const [name] = useState('jack');
    const [age] = useState(11);
    const info = useMemo(() => ({name, age}), [name, age]);
    const changeName = useCallback(() => {
        console.log('输出名称....');
    }, [])

    return (
        <div className="App">
            <div>hello world {count}</div>
            <div onClick={() => { setCount(count => count + 1); }}>点击增加</div>
            <MemoChildComp info={info} changeName={changeName}/>
        </div>
    )
}
export default Parent;
```
## 八、useRef
以下分别介绍 useRef 的两个使用场景

### 1. 指向 dom 元素
如下所示，使用 useRef 创建的变量指向一个 input 元素，并在页面渲染后使 input 聚焦
```js
import React, { useRef, useEffect } from 'react';
const Page1 = () => {
    const myRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        myRef.current?.focus();
    });

    return (
        <div>
            <span>UseRef:</span>
            <input ref={myRef} type="text"/>
        </div>
    )
}
export default Page1;
```
### 2. 存放变量
useRef 在 react hook 中的作用，正如官网说的，它像一个变量，类似于this，它就像一个盒子你可以存放任何东西，createRef 每次渲染都会返回一个新的引用，而 useRef 每次都会返回相同的引用，如下例子所示：

```js
import React, { useRef, useEffect, useState } from 'react';

const Page1 = () => {
    const myRef2 = useRef(0);
    const [count, setCount] = useState(0);
    useEffect(() => {
        myRef2.current = count;
    })
    function handleClick() {
        setTimeout(() => {
            console.log(count); // 3
            console.log(myRef2.current); // 6
        }, 3000);
    }

    return (
        <div onClick={() => setCount(count + 1)}>点击count</div>
        <div onClick={() => handleClick()}>查看</div>
    )
}
export default Page1;
```
<span style="color: red;font-weight:bold;">useRef 返回一个可变的ref对象，其.current属性被初始化为传入的参数(initialValue).返回ref对象在组件的整个生命周期内保持不变</span>

## 九、useImperativeHandle
使用场景：通过ref获取到的是整个dom节点，通过 useImperativeHandle 可以控制只暴露一部分方法和属性，而不是整个dom节点

## 十、useLayoutEffect
其函数签名与 useEffect 相同，但它会在所有的DOM变更之后同步调用effect，这里不在举例。

- useLayoutEffect 和平常写的 Class 组件的 componentDidMount 和 componentDidUpdate 同步执行
- useEffect 会在本次更新完成后，也就是第1点的方法执行完成后，在开启一次任务调度，在下次任务调度中执行 useEffect。



## 资料
[一文归纳 React Hooks 常用场景](https://juejin.cn/post/6918896729366462471#heading-20)