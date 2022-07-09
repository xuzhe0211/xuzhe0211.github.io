---
autoGroup-1: react-tips
title: React 中的"slot"
---
## Children in JSX
在JSX表达式中包含 开始标签 和 结束标签，两个标签之间的内容会被当做一个特殊的prop "props.children" 处理，我们有N种不同的方法来传递chilren

### String Literals
```js
<MyComponent>Hello word!</MyComponent>
```

### JSX Children
You can proovide more JSX elements as the children.This is useful for diplaying nested components:
```js
<MyContainer>
    <MyFirstComponent></MyFirstComponent>
</MyContainer>
```

### JavaScript Expressions as Children
You can pass any JavaScript expression as children,by enclosing it within {}, For example, these expressions are equivalent
```js
<MyComponent>foo</MyComponent>

<MyComponent>{'foo'}</MyComponent>
```

### Functions as Children
通常情况下，JavaScript表达式传入JSX中会被处理成string，一个React element,或者列表。但是props.children就像其他prop一样可以传递任何类型的数据，不仅是React知道如何渲染的种类。例如，如果，如果你有一个自定义组件，你可以使用它一个callback回调作为props.children
```js
function Repeat(props) {
    let items = [];
    for(let i = 0; i < props.numTimes; i++) {
        items.push(props.children[i]);
    }
    return <div>{items}</div>;
}
function ListOfTenThings() {
    return (
        <Repeat numTimes={10}>
            {(index) => <div key={index}>This is item {index} in the list</div>}
        </Repeat>
    )
}
```
### Booleans, Null, and Undefined Are Ignored
false, null, undefined, and true are valid children.They simply don't.These JSX expressions will all render to the same thing:
```js
<div/>

<div></div>

<div>{flase}</div>

<div>{null}</div>

<div>{undefined}</div>

<div>{true}</div>
```

## 如何传递多个slots
从上面可以看出React中slot其实就是prop，所以我们需要传递多个slot时，就使用prop的形式传递即可

```js
<MyDialog
    left={<div>left</div>}>
    <div>---------</div>
</MyDialog>

// 使用
<div>
    <div className="left">left{this.props.left}</div>
    {this.props.children}
</div>
```


## 资料
[React 中的"slot"](https://juejin.cn/post/6953632219227226149)