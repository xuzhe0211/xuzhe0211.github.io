---
autoGroup-1: react-tips
title: react函数组件中使用useState改变值后立刻获取最新值
---

```js
import React, { useEffect, useState, useCallback } from 'react';


function useSyncCallback1(callback) {
    const [proxyState, setProxyState] = useState({ current: false })

    const Func = useCallback(() => {
        setProxyState({ current: true })
    }, [proxyState])

    useEffect(() => {
        if (proxyState.current === true) setProxyState({ current: false })
    }, [proxyState])

    useEffect(() => {
        proxyState.current && callback()
    })

    return Func
}

function fetchList() {
    return new Promise(resolve => {
        setTimeout(resolve, 2000, {products: [{
            productid: '123',
            productName: 'macbook11'
        }]})
    })
}

function App() {
    const [data, setData] = useState({products: [{
        productid: '123',
        productName: 'macbook'
    }]})
    const [count, setCount] = useState(0)

    useEffect(() => {
        // const fetchData = async () => {
        //     let result = await fetchList();
        //     console.log(result)
        //     setData(result);
        // }
        // fetchData();
        setCount(2);
        func()
    }, [])
    const test = () => {
        setCount(2);
        func()
    }
    const func = useSyncCallback1(() => {
        console.log(count);
      });    
    return (
        <ul>
            {count}--
            <button onClick={test}>dfs</button>
            {
                data.products.map(item => {
                    // console.log(item)
                    return <li key={item.productid}>{item.productName}</li>
                })
            }
        </ul>
    )
}
export default App;
```
## 资料
[react函数组件中使用useState改变值后立刻获取最新值](https://segmentfault.com/a/1190000039365818)

[react函数组件通信](https://zhuanlan.zhihu.com/p/260398617)