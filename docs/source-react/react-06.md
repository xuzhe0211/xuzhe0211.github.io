---
autoGroup-0: react原理
title: 为什么react的hook不能在条件语句和循环语句中用，可vue3源于Hook理念的组合式Api可以
---

假设React允许useState处于条件语句中，那么我们从React的视角来看看会发生什么？

假设第一次render的useState情况如下
```js
const [a, setNextA] = useState(0);
const [b, setNextB] = useState(0);
```
此时用户触发setNextB(b + 1) 于是又了第二次render。

假设第二次render的useState情况如下
```js
const [b, setNextB] = useState(0);
```
即，由于某种原因, 你少调用了一次useState。

请问，此时b等于多少？你会说b加了1了呀，当然变成1了，但是React怎么会知道这些？

React只知道
1. 第一次render时useState被调用了两次，即为【调用1】和【调用2】
2. 第二次render时useState被调用了1次，即为【调用3】

请问，【调用3】返回的结果是要跟【调用1】相关还是要跟【调用2】相关？

答案是:<span style="color: red">React不知道</span>

因为从React角度来看，根本就看不见变量a和变量b!React只知道useState的返回值被你拿去了，但是你拿去了之后赋值给什么变量，React根本不知道。

如果你一定想让React识别a和b，那么可以用下面遐想的useState把a和b传给React
```js
const [a, setNextA] = useState('a', 0); // 这种useState是不存在的
const [b, setNextB] = useState('b', 0); 
```
加上key之后，后续的render就能匹配上a和b了。

因为你的第二次render是这样的
```js
const [b, setNextB] = useState('b', 0);
```
React当然知道这是b不是a

相信你已经发现问题所在了，React不允许hooks处于条件语句是因为React把每次render中useState的顺序只0、1、2、3当成了key， 方便后续render用key查找对应的staet。这样的目的是使useState更简洁(不止useState， 其他hook也不允许处于条件语句中)

当然，React这么做的目的也可能是为了追求函数式或者并发，但是显然大部分前端开发者并不在乎这些。

<span style="color: red">注意，并不是因为hooks内部使用链表来实现，所以我们必须保证hooks的调用顺序.这种观点显然倒置了因果关系，正确的说话是：**因为我们保证了hooks的调用顺序(不保证就会报错)， 所以hooks内部可以使用链表来实现**</span>

那么Vue为什么不需要做这样的限制呢？

因为Vue3的setup并不是一个常规函数，而是含有一个闭包(闭包= 自由变量+ 函数)的函数。代码如下
```js
export const Fang = defineComponent({
    props: ...,
    setup: () => {
        const a = ref(0);
        const b = ref(0);
        return () => { // 此箭头函数记为fnReturn
            <div>{a.value} {b.value}</div>
        }
    }
})
```
> 此处使用JSX语法，以方便与React 对比

当你用b.value += 1 触发re-render时，并不会重新执行setup函数，只会重新执行fnReturn,因此Vue根本不需要找a和b(想找也找不到，原因跟React一样，Vue只知道你拿走了ref(0)的返回值)，因为a和b都是fnReturn可以直接读取到的自由变量，换句话说，a,b, fnReturn三者组成了闭包，这个闭包一直维持着a和b的变量，提供给fnReturn访问。

Vue3只需要调用fnReturn即可。

理论上，你甚至可以把a = ref(0)写在setup外面，就像这样
```js
const a = ref(0);
const b = ref(0);
export const Fang = defineComponent({
    props: ...,
    setup: () => {
        return () => {
            <div>{a.value} {b.value}</div>
        }
    }
})
```
这样写完全没有问题，因为fnReturn依然可以访问a 和 b。

所以你也完全可以把a放在if里，只要a能被fnReturn访问就行
```js
export const Fang = defineComponent({
    props: ...,
    setup: () => {
        let a, 
        if(window.name === 'Fang'){
            a = ref(0)
        }
        const b = ref(0);
        return () => {
            <div>
                {a && a.value} a 有可能是undefined,所以要判断一下
                {b.value}
            </div>
        }
    }
})
```
此时你可能会想，Vue3这么方便肯定会有什么缺点吧？总不会完爆React吧？

其实缺点也有，那就是会让代码里出现很多.value。还好SFC可以帮我们减少template里的.value

你说，Vue3 如果能做到b += 1 来改变b的值就不就不用写.value了？

但问题在于JS并没有提供这种监听变量被重新赋值的能给开发者，所以Vue3做不到这一点。JS只提供了监听对象的属性被重新赋值的能力，所以Vue3可以监听对象b的value是否被重新赋值。