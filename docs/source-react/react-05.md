---
autoGroup-0: react原理
title: 从react hooks“闭包陷阱”切入，浅谈react hooks
---
首先，本文并不会讲解hooks的基本用法，本文从一个hooks中"奇怪"(其实符合逻辑)的"闭包陷阱"的场景切入，试图讲清楚背后的因果。同时，在许多react hooks奇技淫巧的的文章里，也能看到useRef的身影，那么为什么使用useRef又能摆脱这个"闭包陷阱"？我想搞清楚这些问题，将能较大的提升对react hooks的理解。

react hooks一出现便受到许多开发人员的追捧，或许在使用react hooks的时候遇到"闭包陷阱"是每个开发人员在开发的时候都遇到过的事情，有的两眼懵逼、有的稳如稳如老狗瞬间就定义到问题出现在何处。

> 以下react示范demo，均为react 16.8.3版本
你一定遭遇过以下这个场景
```js
function App() {
    const [count, setCount] = useState(1);
    useEffect(() => {
        setInterval(() => {
            console.log(count);
        }, 1000)
    }, [])
}
```
<span style="color: red">在这个定时器里面去打印count的值，会发现，不管在这个组件中的其他地方使用setCount将count设置为任何值，还是设置多少次，打印的都是1</span>.是不是有一种，尽管历经千帆，我记得还是你当初的模样的感觉？哈哈哈哈....接下来我将尽力的尝试将我立即的，为什么会发生这个情况说清楚，并且浅谈一些hooks的其他特性。

## 一个熟悉的闭包场景
首先从一个各位jser都很熟悉的场景入手
```js
for(var i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i);
    }, 0)
}
```
我就不说为什么最终，打印的都是5的原因了，直接贴出使用闭包打印0-4的代码
```js
for(var i = 0; i < 5; i++) {
    (function(i) {
        setTimeout(() => {
            console.log(i);
        })
    })(i)
}
```
这个原理其实就是使用闭包，定时器的回调函数去引用立即执行函数里定义的变量，形成闭包保存了立即执行函数执行时i的值，异步定时器的回调函数才如我们想要的打印了顺序的值

其实，useEffect的那个场景的原因，跟这个，简直是一样的，<span style="color: blue">**useEffect闭包陷阱场景的出现，是react组件更新流程以及useEffect的视线的自然而然的结果**</span>
 
## 浅谈hooks原理，理解useEffect的"闭包陷阱"出现原因
<span style="color: blue">首先，可能都听过react的Fiber架构,其实一个Fiber节点就对应一的是一个组件。对于classComponent而言，有state是一件正常的事情，Fiber对象上有一个memoizedState用于存放组件的state。ok，现在看hooks所针对的FunctionComponent。无论开发者怎么折腾，一个对象都只能有一个state属性或者memoizedState属性，可是，谁知道可爱的开发者们会在FunctionComponent里写上多少个useState，useEffect等等？所以，react用来链表这种数据结构来存储FunctionComponent里面的hooks</span>，比如

```js
function App() {
    const [count, setCount] = useState(1);
    const [name, setName] = useState('chechengyi');
    useEffect(() => {

    }, [])

    const text = useMemo(() => {
        return 'ddd'
    }, [])
}
```
在组件第一次渲染的时候，为每个hooks都创建了一个对象
```js
type Hook = {
    memoizedState: any,
    baseState: any,
    baseUpdate: Update<any, any> | null,
    queue: UpdateQueue<any, any> | null,
    next: Hook | null
}
```
最终形成一个链表

![hooks链表](./images/2e81e1a743900ac58d11e04e5e08d6c41.png)

<span style="color: red">这个对象的memoizedState属性就是用来存储组件上一次更新后的state, next毫无疑问是指向下一个hooks。在组件更新的过程中，hooks函数执行的顺序是不变的，就可以根据这个链表拿到当前hooks对应的Hooks对象，函数式组件就是这样拥有了state的能力</span>。当然，具体的实现肯定比这三言两语复杂的多。

<span style="color: red">所以，知道为什么不能将hooks写到if else 语句中了吧，因为这样可能会导致顺序错乱，导致当前的hooks拿到的不是自己对应的Hooks对象</span>

useEffect接收了两个参数，一个回调函数和一个数组。数组里面就是useEffect的依赖，当为[]的时候，回调函数只会在组件第一次渲染的时候执行一次。如果有依赖其他项，react会判断其依赖是否改变，如果改变了就会执行回调函数，说回最初的场景
```js
function App() {
    const [count, setCount] = useState(1);
    useEffect(() => {
        setInterval(() => {
            console.log(count);
        }, 1000)
    }, [])
    function click() {setCount(2)}
}
```
好，开动脑筋开始想象起来，组件第一次渲染执行App()，执行useState设置了初始值状态为1,所以此时的count为1。然后执行了useEffect，回调函数执行，设置了一个定时器每隔1s打印一次count.

接着想象如果click函数被触发了，调用setCount(2)肯定会触发react的更新，更新到当前组件的时候也是执行App(),之前的链表已经形成了哈，此时useState将Hook对象上保存的状态置为2，那么此时count也为2了。然后在执行useEffect由于依赖数组是一个空的数组，所以此时回调并不会被执行。

<span style="color: red">ok，这次更新的过程中根本就没有涉及到这个定时器,这个定时器还在坚持的，默默地，每隔1s打印一次count.注意这里打印的count,是组件第一次渲染时候App()时的count,count的值为1，**因为在定时器的回调里面被引用了，形式了闭包一直被保存**</span>

## 难道真的要在依赖数组里写上的值，才能拿到新鲜的值？
仿佛都习惯性都去认为，只有在依赖数组里写上我们所需要的值，才能在更新的过程中拿到最新鲜的值。那么看一下这个场景
```js
function App() {
    return <Demo1/>
}
function Demo1() {
    const [num1, setNum1] = useState(1);
    const [num2, setNum2] = useState(10);

    const text = useMemo(() => {
        return `num1: ${num1} | num2: ${num2}`
    }, [num2])

    function handClick() {
        setNum1(2)
        setNum2(20)
    }
    return (
        <div>
            {text}
            <div><button onClick={handClick}>click!</button></div>
        </div>
    )
}
```
text是一个useMemo，它的依赖数组里面只有num2,没有num1,却同时使用了这两个state.当点击button的时，num1和num2的值都改变了。那么，只写明了依赖num2的text中能否拿到num1最新鲜的值呢？

如果你装了 react 的 eslint 插件，这里也许会提示你错误，因为在text中你使用了 num1 却没有在依赖数组中添加它。 但是执行这段代码会发现，是可以正常拿到num1最新鲜的值的。

如果理解了之前第一点说的“闭包陷阱”问题，肯定也能理解这个问题。

<span style="color: red">为什么呢,在说一遍，**这个依赖数组存在的意义,是react为了判定，在本次更新中，是否需要执行其中的回调函数，这里依赖了num2，而num2改变了，回调函数自然会执行，这时形式的闭包引用的就是最新的num1和num2，所以，自然能够拿到新鲜的值**。问题的关键，**在于回调函数执行的时机**，闭包就像是一个照相机，把回调函数执行的那个时机的值保存了下来。之前说的定时器的回调函数我想就像是从一个1000年穿越到现代的人，虽然来了现代，但是身上的血液，头发都是1000年前的</span>

## 3.为什么使用useRef能够每次拿到新鲜的值
<span style="color: blue">大白话说：因为初始化的useRef执行之后，返回的都是同一个对象。</span>。

```js
var A = {name: 'chechengyi'};
var B = A;
B.name = 'baobao';
console.log(A.name); //baobao
```
对，这就是这个场景成立的最根本原因

<span style="color: red">也就是说，在组件每一次渲染的过程中。比如ref = useRef()所返回的都是同一个对象,每次组件更新所生成的ref指向的都是同一片内存空间，那么当然能够每次都拿到最新鲜的值了。</span>犬夜叉看过吧，一口古井连接了现代世界与500年前的战国时代，这个同一个对象也将这些个保存于不同闭包时机的变量联系了起来

使用一个例子或许好理解一点
```js
// 将这些相关的变量写在函数外，以模拟react hooks对应的对象
let isC = false;
let isInit = true; // 模拟组件第一次加载
let ref = {
    current: null;
}

function useEffect(cb) {
    // 这里用来模拟useEffect依赖为[]的时候只执行一次
    if(isC) return;
    isC = true;
    cb();
}
function useRef(value) {
    // 组件是第一次加载的话设置值，否则返回对象
    if(isInit) {
        ref.current = value;
        isInit = false;
    }
    return Ref;
}
function App() {
    let ref_ = useRef(1);
    ref_.current++;
    useEffect(() => {
        setInterval(() => {
            console.log(ref.current); // 3 两秒输出3
        }, 2000)
    })
}
// 连续执行两次 第一次组件加载，第二次组件更新
App();
App();
```
所以，提出一个合理的设想。只要我们能保证每次组件更新的时候，useState返回的是同一个对象的话，？我们也可能绕开闭包陷阱这个情景吗？试一下吧
```js
function App() {
    return <Demo2 />
}
function Demo2() {
    const [obj, setObje] = useState({name: 'chechengyi'});

    useEffect(() => {
        setInterval(() => {
            console.log(obj)
        }, 2000)
    }, [])

    function handClick() {
        setObj((prevState) => {
            let nowObj = Object.assign(prevState, {
                name: 'baobao',
                age: 24
            })
            console.log(nowObj == preState); // true
            return nowObj
        })
    }
    return (
        <div>
            <div>
                <span>name: {obj.name} | age: {obj.age}</span>
                <div><button onClick={handClick}>click!</button></div>
            </div>
        </div>
    )
}
```
简单说下这段代码，在执行 setObj 的时候，传入的是一个函数。这种用法就不用我多说了把？然后 Object.assign 返回的就是传入的第一个对象。总儿言之，就是在设置的时候返回了同一个对象。

执行这段代码发现，确实点击button后，定时器打印的值也变成了：
```js
{
    name: 'baobao',
    age: 24
}
```
## 完毕
通过一次“闭包陷阱” 浅谈 react hooks 全文再此就结束了。 反正写完了这篇文章，宝宝我对 hooks 的认识是比以前深了。

## 资料
[原文](https://juejin.cn/post/6844904193044512782)