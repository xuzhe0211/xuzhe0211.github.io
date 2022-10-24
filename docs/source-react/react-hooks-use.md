---
autoGroup-2: react-hooks
title: 第一个可以在条件语句中使用的原生hook诞生了
---
在10月13日的first-class-support-for-promises RFC[1]中，介绍了一种新的hook —— use。

<span style="color: red">use什么？就是use，这个hook就叫use。这也是第一个</span>
- 可以在条件语句中书写的hook
- 可以在其他hook回调中书写的hook

## use是什么？
我们知道，async函数会配合await关键词使用，如
```js
async function load() {
    const { name } = await fetchName();
    return name;
}
```
类似的，在React组件中，可以配合use起到类似的效果，比如
```js
function Cpn() {
    const { name } = use(fetchName());
    return <p>{name}</p>
}
```
可以认为，use的作用类似于
- async await 中的await
- generator中的yield

<span style="color: blue">use作为「读取异步数据的原语」，可以配合Suspense实现数据请求、加载、返回的逻辑</span>

举个例子，下述例子中，当fetchNode执行异步请求时，会由包裹Note的Suspense组件渲染加载中状态

当请求成功时，会重新渲染，此时note数据会正常返回。

当请求失败时，会由包裹Note的ErrorBoundary组件处理失败逻辑
```js
function Note({id}) {
    const note = use(fetchNote(id));
    return (
        <div>
            <h1>{note.title}</h1>
            <section>{note.body}</section>
        </div>
    )
}
```
其背后的实现原理并不复杂
1. <span style="color: blue">当Note组件首次render，fetchNote发起请求，会throw promise，打断render流程</span>
1. <span style="color: blue">以Suspense fallback作为渲染结果</span>
1. <span style="color: blue">当promise状态变化后重新触发渲染</span>
1. <span style="color: blue">根据note的返回值渲染</span>

<span style="color: red">实际上这套「基于promise的打断、重新渲染流程」当前已经存在了。use的存在就是为了替换上述流程</span>

与当前React中已经存在的上述「promise流程」不同，use仅仅是个「原语」(primitives)，并不是完整的处理流程

比如，use并没有「缓存promise」的能力。

举个例子，在下面的代码中fetchTodo执行后会返回一个promise，use会消费这个promise
```js
async function fetchTodo(id) {
    const data = await fetchDataFromCache(`/api/todo/${id}`);
    return {contents: data.contents}
}
functon Todo({id, isSelected}) {
    const todo = use(fetchTodo(id));
    return (
        <div className={isSelected ? 'selected-todo' : 'normal-todo'}>
            {todo.contents}
        </div>
    )
}
```
当Todo组件的id prop变化后，触发fetchTodo重新请求是符合逻辑的。

但是当isSelected props变化后，Todo组件也会重新render，fetchTodo执行后会返回一个新的promise。

返回新的promise不一定产生新的请求（取决于fetchTodo的实现），但一定会影响React接下来的运行流程（比如不能命中性能优化）。

这时候，需要配合React提供的cache API（同样处于RFC）。

下述代码中，如果id prop不变，fetchTodo始终返回同一个promise：
```js
const fetchTodo = cache(async (id) => {
  const data = await fetchDataFromCache(`/api/todos/${id}`);
  return {contents: data.contents};
});
```
## use的潜在作用
当前，use的应用场景局限于「包裹promise」

但是未来，use会作为客户端中处理异步数据的主要手段，比如
- 处理context
<span style="color: red">use(Context)能达到与useContext(Context)一样的效果，区别在于前者可以在条件语句，以及其他hook回调内执行</span>

- 处理state
可以利用use实现新的原生状态管理方案
```js
const currentState = use(store);
const latestValue = use(observable);
```
## 为什么不适用async await
本文开篇提到，use原语类似async await 中的await，那为什么不直接使用async await呢？类似下面这样
```js
// Note 是 React组件
async function Note({id, isEditing}) {
    const note = await db.posts.get(id);
    return (
    <div>
      <h1>{note.title}</h1>
      <section>{note.body}</section>
      {isEditing ? <NoteEditor note={note} /> : null}
    </div>
  );
}
```
有两个方面原因

- async await的工作方式与React客户端处理异步时的逻辑不太一样

    当await的请求resolve后，调用栈是从await语句继续执行(generator中的yield也是这样)；

    而在React中，更新流程是从根组件开始的，所以当数据返回后，更新流程是从根组件从头开始的

    改用async await的方式势必对当前React底层架构带来挑战。最起码，会多性能优化产生不小的影响

- async await这种方式接下来会在Server Component中实现，也就是异步的服务端组件

    服务端组件与客户端组件都是React组件，但前者在服务端渲染(SSR),后者在客户端渲染(CSR),如果都用async await，不太容易从代码层面区分两者

## 总结
use是一个「读取异步数据的原语」，他的出现是为了规范React在客户端处理异步数据的方式

<span style="color: red">既然是原语，那么他的底层就很底层，比如不包括请求的缓存功能(由cache处理)。</span>

之所以这么设计，是因为React团队并不希望开发者直接使用他们。这些原语的受众是React生态中的其他库

比如，类似SWR、React-Query这样的请求库，就可以结合use，在结合自己的实现请求缓存策略（而不是使用React提供的cache方法）

各种状态管理库，也可以将use作为其底层状态单元的容器。

值得吐槽的是，Hooks文档中hook的限制那一节恐怕得重写了

## 资料
[原文](https://mp.weixin.qq.com/s/esLqo4p2_y310KsZMAExIQ)