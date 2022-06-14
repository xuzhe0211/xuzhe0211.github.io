---
autoGroup-18: 低代码平台
title: 低代码平台的思考
---

## 什么是低代码

## 低代码实现原理
前面提到，可视化编辑器的最终产物也是描述数据，因此我们先从描述数据入手，先考虑如何设计相关的字段和结构

### 2.1页面描述数据
从一段HTML开始
```html
<h1>hello title</h1>
<table>
    <th>
        <td>id</td>
        <td>姓名</td>
    </th>
    <tr>
        <td>1</td>
        <td>aaa</td>
    </tr>
    <tr>
        <td>2</td>
        <td>bbb</td>
    </tr>
</table>
```
上面的HTML标签描述了一个标题和一个表格，换成JSON描述
```js
[
    {
        type: 'h1',
        props: {
            text: 'hello title',
        }
    }, {
        type:'table',
        props: {
            columns: [
                { label: 'id', prop: 'id' },
                { label: '姓名', prop: 'name' },
            ],
            data: [
                { id: 1, name: 'aaa' },
                { id: 2, name: 'bbb' },
            ]
        }
    }
]
```
如何把这段JSON反序列化，渲染成HTML呢？编写一个接收这种配置的组件
```js
const PageTemplate = (configList) => {
    return (
        <>
            {configList.forEach((config) => {
                const { type: Comp, props } = config;
                return <Comp {...props} />
            })}
        </>
    )
}
```
只要实现了H1和Table两个组件，就可以把页面完整的渲染出来了
```js
const H1 = ({ text }) => {
    return <h1>{text}</h1>;
}
const Table = ({ columns, data}) => {
    return (
        <table>
            <th>
                {columns.map(column => {
                    return <td>{column.label}</td>;
                })}
            </th>
            {data.map(row => {
                return (
                    <tr>
                        {columns.map(column => {
                            return <td>{row[column.prop]}</td>
                        })}
                    </tr>
                )
            })}
        </table>
    )
}
```
这就是描述数据的基本原理，可以看见，描述数据可以生效的前提是

> 在运行环境下实现了声明的对应组件

### 2.2 可视化编辑器
可视化编辑器最主要的功能是无需让用户手写JSON代码，而是通过拖拽等形式绳子最后的描述文件

包含最基本的三个部分
- <span style="color:blue">组件列表区</span>
- <span style="color: blue">预览区</span>
- <span style="color: blue">单个选中组件的配置区</span>

至于组件布局，目前有两种主流的模式

- <span style="color:blue">流式布局，基于文档来排列组件位置，实现和操作都比较简单</span>
- <span style="color:blue">绝对定位，在画布上通过position:asbolute控制组件位置，编辑自由度更高</span>

下面是我在开发[vue-page-builder](https://github.com/tangxiangmin/vue-page-builder)时编写 的示例demo，采用的是流式布局，从左侧组件列表拖拽数据到中间预览区，然后选中某个组件，就可以开始配置了。

![lowcode](http://img.shymean.com/oPic/1638197846877_713.png)

不能绕开的一个问题是：预览区如何与实际环境保持一致？

- <span style="color:blue">一种方案编辑器与实际环境使用同一套组件库，分别渲染并实现</span>
- <span style="color:blue">另一种方案是通过iframe实现，与实际环境基本一致</span>

## 资料
[关于低代码平台的思考](https://www.shymean.com/article/%E5%85%B3%E4%BA%8E%E4%BD%8E%E4%BB%A3%E7%A0%81%E5%B9%B3%E5%8F%B0%E7%9A%84%E6%80%9D%E8%80%83)

[前端低代码调研与总结](https://blog.csdn.net/sinat_17775997/article/details/123246770)