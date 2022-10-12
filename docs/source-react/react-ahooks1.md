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

## 资料
[一文归纳 React Hooks 常用场景](https://juejin.cn/post/6918896729366462471#heading-20)