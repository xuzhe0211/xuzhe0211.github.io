---
autoGroup-1: react-tips
title: React中渲染相关
---
## for渲染
```html
<!DOCTYPE html>
<html lang="en">
 
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="./js/react.development.js"></script>
    <script src="./js/react-dom.development.js"></script>
    <script src="./js/babel.min.js"></script>
    <title>例子2</title>
</head>
 
<body>
    <div id="root1"></div>
    <div id="root2"></div>
    <div id="root3"></div>
</body>
 
<script type="text/babel">
    // 继承实例
    window.onload = () => {
        var arr = ['a', 'b', 'd', 'e', 'f'];
    }
    // 第一种写法
    ReactDOM.render(
        <div>
        {
            arr.map((item, index) => {
                return <div key={index}>{item}</div>
            })
        }
        </div>,
        document.getElementById('root1')
    )
    // 第二种写法
    var str = arr.map((item, index) => {
        return <div key={index}>{item}</div>
    })
    ReactDOM.render(
        <div>
        {str}
        </div>,
        document.getElementById('root2')
    )
    // 第三种写法
    var str = [];
    for(let i = 0; i < arr.length; i++) {
        str.push(<div key={i}>{arr[i]}</div>)
    }
    ReactDOM.render(
        str, 
        document.getElementById('root3')
    )
</script>
 
</html>
```
## react hooks请求数据并渲染
在以往使用react class组件的时候，这种操作我们已经很熟悉了，<span style="color: red">即在class 组件中componentDidmount中通过ajax来获取数据并setState,触发组件更新</span>

### 数据渲染
- 数据渲染的简单demo
    ```js
    import react, { useState } from 'react';

    function app() {
        const [data setData] = useState({ products: [{
            productid: '123',
            productname: 'macbook'
        }]})
        return (
            <ul>
            {data.products.map(i => (
                return <li key={i.productid}>{i.productname}</li>
            ))}
            </ul>
        )
    }
    export default app
    ```
- axios来获取数据

    ```js
    import react, { useState } from 'react';
    import axios from 'axios';

    function app() {
        const [data, setData] = useState({ products: [{
            productid: '123',
            productname: 'macbook'
        }]});

        useEffect(() => {
            const result = await axios('http://xxx')
            setData(result.data);
        })
        return (
            <ul>
                {data.products.map(i => (
                    return <li key={i.productid}>{i.producname}</li>
                ))}
            </ul>
        )
    }
    export default app;
    ```
    <span style="color: red">**只要你运行一下，你就会发现程序进入了一个死循环**。因为useeffect不仅在组件didmounts的时候被触发了，还在didupdate的时候被触发了。在useeffect中获取数据后，通过setdate改变state，触发组件渲染更新，从而又进入到了useeffect中，无限循环下去。这并不是我们想要的结果。我们最初想要的，只是希望在didmounts的时候获取一次数据而已。所以，这种情况下，我们必须要给useeffect方法的第二个参数传入一个空[]，以使得useeffect中的逻辑只在组件didmounts的时候被执行。</span>
    ```js
    import react, { useState } from 'react';
    import axios from 'axios';

    function app() {
        const [data, setData] = useState({ products: [{
            productid: '123',
            productname: 'macbook'
        }]});

        useEffect(async () => {
            const result = await axios('http://xxx')
            setData(result.data);
        }, []) // 重点
        return (
            <ul>
                {data.products.map(i => (
                    return <li key={i.productid}>{i.producname}</li>
                ))}
            </ul>
        )
    }
    export default app;
    ```
    当然，useeffect第二个参数，也可以传入值。当如果有值的时候，那useeffect会在这些值更新的时候触发。如果只是个空数组，则只会在didmounts的时候触发。

    另外，执行这段代码，你会看到控制台警告，promises and useeffect(async () => ...) are not supported, but you can call an async function inside an effect.。所以如果要使用async，需要修改下写法。
    ```js
    import react, { useState } from 'react';
    import axios from 'axios';

    function app() {
        const [data, setData] = useState({ products: [{
            productid: '123',
            productname: 'macbook'
        }]});

        useEffect(() => {
            const fetchdata = async () => {
                const result = await axios('xxx');
                setDate(result.data)
            }
            fetchdata();
        }, []) // 重点
        return (
            <ul>
                {data.products.map(i => (
                    return <li key={i.productid}>{i.producname}</li>
                ))}
            </ul>
        )
    }
    export default app;
    ```

## 资料
[详解如何使用React Hooks请求数据并渲染](https://www.51sjk.com/b20b248530/)