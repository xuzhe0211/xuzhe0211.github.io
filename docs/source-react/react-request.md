---
title: React Api请求最佳实践react-query3使用教程（比swr更好用更强大）
---
## 前言
在请求中,首先axios作为请求底层封装库，统一拦截，处理发送请求头和接收的错误响应。

那么更高一层的封装可以选择swr或者react-query。目前react-query已经进入了第三个大版本，功能及其强大，虽然swr比较抢粮，但是两者也之差5kb的打包大小。另外swr只有16k start不到，而react-query不断增长已有18k start，随着时代发展，swr已经不足以应付各种使用场景。使用react-query作为axios的顶层封装才是趋势大流

那么你问我为什么axios层不选用umi-request或者fetch，那只能是仁者见仁智者见智了，axios的的82K star 是什么概念

## react-query
- 官方项目:[tannerlinsley/react-query](https://github.com/tannerlinsley/react-query
)
- [官方文档](https://react-query.tanstack.com/installation)

和主流上层封装库比较(包括swr)：[Comparison](https://react-query.tanstack.com/comparison)

## swr的问题
在swr中，使用非常简单，一个简单的demo如下
```js
import { useState } from 'react';
import useSWR from 'swr';

function App() {
    const [status, setStatus] = useState(false);
    
    const request = (status, stringKey, numberKey) => {
        const tiem = Math.random() > 0.5 ? 3000 : 1500;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(time);
            }, time)
        })
    }
    const {data, error} = useSWR([status, 'ss', 2], request);
    return (
        <>
            {!data && <div>loading....</div>}
            {error && <div>error....</div>}
            {data && <div>{data}</div>}
            <button onClick={() => {
                // 通过改变swr的唯一key，也就是[status, 'ss', 2]中的status
                // 实现重新触发api请求的效果
                setStatus(pre => !pre)
            }}>click</button>
        </>
    )
}
```
- loading态不健壮

    首先就是loading态，swr我们只能用data的有无去判断是否在loading，或者单独为一个初始的true的state去表示loading，在swr的onCuccess处给他置为false.

    但我们要一个初始data的话，使用!data直接不攻自破，我们要多次切换加载数据，在每次切换我都要手动将state置为true,这也太麻烦了，不友好

- 请求函数收参不健壮

    我们在请求函数request中，如果useSWR的唯一标识是数组，那么传入请求函数参数的顺序是被解构后的

    也就是
    ```js
    // 唯一标识 [status,'ss', 2]
    const { data, error } = useSWR([status, 'ss', 2], request);
    // 这里传入是被结构后的唯一标识
    const request = (status, stringKey, numberKey) => {}
    ```
    好家伙，非要让人使用rest语法或者arguments才能一次性接收到全部参数，这好吗？
- 数据一致性场景中主动性差

    






## 资料
[React Api请求最佳实践react-query3使用教程（比swr更好用更强大）](https://blog.csdn.net/qq_21567385/article/details/114171438)