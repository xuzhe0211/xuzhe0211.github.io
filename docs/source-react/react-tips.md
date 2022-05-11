---
autoGroup-1: react-tips
title: 字节的一道React面试题
---

```js
export default function SetStatePage(props) {
    const [count setCount] = useState(-1);

    useEffect(() => {
        setCount(0)
    })

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
## 更新
- 主动更新-- root.render/setState/forceUpdate
    - root.render
    - setState
        - 类组件的setState
        - 函数组件的setState
    - 类组件的forceUpdate
- 被动更新--子组件的props/context变化


[字节的一道React面试题](https://www.bilibili.com/video/BV1L34y1h79x?spm_id_from=333.851.b_7265636f6d6d656e64.1)