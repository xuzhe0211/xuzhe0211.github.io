---
autoGroup-0: Vue3
title: 聊聊Vue中的JSX
---
## JSX简介
JSX是一种Javascript的语法扩展，即具备了Javascript的全部功能，同时又兼具html的语义化和直观性。它可以让我们在JS中写模版语法：
```js
const el = <div>Vue 2</div>
```
上面这段代码即不是HTML也不是字符串，被称之为JSX，是Javascript的扩展语法。JSX可能会使人联想到模板语法，但是它具备Javascript的完全编程能力。

## 什么时候使用JSX
当开始写一个只能通过 level prop动态生成标题(heading)的组件时，你可能很快想到这样实现

```html
<script type="text/x-template" id="anchored-heading-template">
    <h1> v-if="level === 1">
        <slot></slot>
    </h1>
    <h2> v-else-if="level === 2">
        <slot></slot>
    </h2>
    <h3 v-else-if="level === 3"> 
        <slot></slot> 
    </h3> 
</script>
```
这里用template模板并不是最好的选择，在每一个级别的标题中重复书写了部分代码，不够简介优雅。如果尝试用JSX来写，代码就会变的简单很多
```js
const App = {
    render() {
        const tag = `h${this.level}`
        return <tag>{this.$slots.default}</tag>
    }
}
```
或者如果你写了很多render函数，可能会觉得下面这样的代码写起来很痛苦
```js
createElement(
    'anchored-heading', {
        props: {
            level: 1
        }
    }, [
        createElement('span', 'Hello'), ' world!'
    ]
)
```
特别是对应的模板如此简单的情况下
```html
<anchored-heading :level="1">  
    <span>Hello</span> world!  
</anchored-heading>
```
这时候就可以再Vue中使用JSX语法，它可以让我们回到更接近于模板的语法上
```js
import AnchoredHeading from './AnchoredHeading.vue';

new Vue({
    el: '#demo',
    render: function(h) {
        return (
            <AnchoredHeading level={1}>
                <span>Hello</span> world!
            </AnchoredHeading>
        )
    }
})
```
在开发过程中，经常会用到消息提示组件Message，可能得一种写法是这样的：
```js
Message.alert({
    message: '确定要删除？',
    type: 'warning'
})
```
但是希望message可以自定义一些样式，这时候你可能就需要让 Message.alert 支持JSXl (当然也可以使用插槽/html等方式解决)
```js
Message.alert({
    message: <div>确定要删除<span style="color: red">xxx</span>的笔记?</div>,
    type: 'warning'
})
```
此外,一个.vue文件里面只能写一个组件，这个在一些场景下可能不太方便，很多时候写一个页面时其实可能会需要把一些小的节点片段拆分到小组件里面进行复用，这些小组件其实写个简单的函数组件就可搞定了。平时可能由于SFC的限制让我们习惯于全部写在一个文件里，但不得不说可以尝试一下这种方式。

```js
// 一个文件写多个组件
const Input = props => <input {...props}/>
export const Textarea = props => <input {...props}/>
export const Textarea = (props) => <input {...props} />
export const Password = (props) => <input type="password" {...props} />

export default Input
```
比如这里封装了一个input组件，我们希望同时导出Password组件和Textarea组件方便用户更加实际需要使用.......


## 用JSX实现简易聊天记录
```js
// 当前组件就是RecordMessage 组件，自己引入自己 
import RecordMessage from './RecordMessage';

export default {
    props: {
        message: {
            type: Array,
            default: () => []
        }
    },
    render() {
        const parseMessage = msg => {
            const type = msg[0];
            if(type === 0) {
                // 文本
            } else if(type === 2) {
                // 图片
            } else {
                // 引用类型
                return (
                    <div>
                        <div>引用:</div>
                        {
                            msg[1].map(subMsg => {
                                // 自己递归渲染自己
                                <recored-message></recored-message>
                            })
                        }
                    </div>
                )
            }
        }
        return parseMessage(this.message);
    }
}
```

## 资料
[聊聊Vue中的JSX](https://juejin.cn/post/7188898676993949752)

[拥抱 Vue3 系列之 JSX 语法](https://juejin.cn/post/6846687592138670094#heading-3)