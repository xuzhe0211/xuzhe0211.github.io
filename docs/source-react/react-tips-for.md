---
autoGroup-1: react-tips
title: React中的for循环
---
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