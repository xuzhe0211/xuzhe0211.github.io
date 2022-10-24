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

    <span style="color: red">为防止内存泄露，清除函数会在组件卸载前执行；如果组件多次渲染(通常如此),则在执行下一个effect之前，上一个effect就已被清楚，即先执行上一个effect中return的函数，然后在执行笨effect中非return的函数</span>
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
    如果处于某些原因你无法把一个函数移动到effect内部，还有一些其他办法
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

## 资料
[一文归纳 React Hooks 常用场景](https://juejin.cn/post/6918896729366462471#heading-20)