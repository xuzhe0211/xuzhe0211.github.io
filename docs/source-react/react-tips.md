---
autoGroup-1: react-tips
title: 字节的一道React面试题
---

:::tip
最好不要在hooks使用异步操作state 容易出问题 参考闭包陷阱问题

1. setCount执行一次会重新render
2. useEffect 如果没有第二个参数：比较上一次当前值...
:::

```js
export default function SetStatePage(props) {
    const [count setCount] = useState(-1);

    useEffect(() => {
        setCount(0)
    })

    // useEffect(() => {
    //     setCount(0)
    // }, []) // render两次

    console.log('render'); // sy-log 这里打印几次

    return (
        <div>
            <h3>SetStatePage</h3>
            <button>{count}</button>
        </div>
    )
}
```

<span style="color: red">打印三次</span>
### 拓展

```js
export default function SetStatePage(props) {
    const [count, setCount] = useState(-1);

    useEffect(() => {
        console.log('xxx', count)
        setCount(0);
        return () => {
            console.log(count, 'count')
        }
    })

    // useEffect(() => {
    //     console.log('xxx', count)
    //     setCount(0);
    //     return () => {
    //         console.log(count, 'count')
    //     }
    // }, []) // render -1, xxx -1; render 0

    console.log('render',count); 

    return (
        <div>
            <h3>SetStatePage</h3>
            <button>{count}</button>
        </div>
    )
}
// 打印 render -1, xxx -1;  render 0, -1 count, xxx 0; render 0
```

- demo

    ```js
    function Memo1() {
        const [count, setCount] = useState(0);
        const handle = useCallback(() => {
            setCount(1)
        }, [])
        console.log('render')
        useEffect(() => {
            console.log('effect');
            return () => {
                console.log('effect return')
            }
        }, [count])
        return (
            <div onClick={handle}>sfdaf</div>
        )
    }
    export default Memo1;
    ```
    - 页面进入打印render、 effect
    - 第一次点击 render、effect return、effect
    - 第二次点击 render
## 更新
- 主动更新-- root.render/setState/forceUpdate
    - root.render
    - setState
        - 类组件的setState
        - 函数组件的setState
    - 类组件的forceUpdate
- 被动更新--子组件的props/context变化


[字节的一道React面试题](https://www.bilibili.com/video/BV1L34y1h79x?spm_id_from=333.851.b_7265636f6d6d656e64.1)

[react-闭包陷阱](/source-react/react-05.html)

[hooks-effect](/source-react/react-api.html#react-hooks)