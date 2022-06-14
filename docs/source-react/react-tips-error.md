---
autoGroup-1: react-tips
title: React中的Error
---
## 如果修复错误"组件不能用作JSX组件",它的返回类型"元素[]"不是react TS的有效JSX元素
修复错误"组件不能用作JSX组件,它的返回类型Element[] is not valid JSX element"对于React TypeScript，我们需要确保我们的组件返回单个根元素

```js
function Todos():JSX.Element { // JSX.Element
    return (
        <>
            {
                todos.map(todo => {
                    <li>{todo.task}</li>
                })
            }
        </>
    )
}
```
将我们的项目数组放入片段中，以便可以编译组件。

我们调用todos.map来渲染一个li元素的数组，所以我们需要用一个片段来包装他们。

### 结论
修复错误"组件不能用作JSX组件。它的返回类型「Element[]」is not valid JSX element"对于React TypeScript,我们需要确保我们的组件返回单个根元素

## ‘App‘ cannot be used as a JSX component. Its return type ‘Element[]‘ is not a valid JSX element.
解决:把函数组件App的返回值改写成JSX元素类型的
```js
function App():JSX.Element {
    const nameArray:string[] = ['Bob', 'Jack', 'Mary'];
    return (
        <div>
        {
            nameArray.map(name: string => {
                return (
                    <div>{name}</div>
                )
            })
        }
        </div>
    )
}
```