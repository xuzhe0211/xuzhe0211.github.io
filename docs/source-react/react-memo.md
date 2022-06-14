---
autoGroup-2: react-hooks
title: React hooks中memo,usememo,useCallback的区别
---

useMemo

memo类似于PureComponent作用是优化组件性能，防止组件触发重渲染

<span style="color: red">memo与PureComponent比较类似，前者是对Function Component的优化，后者是对Class Component的优化，都会对传入组件的数据进行浅比较，useCallback则会保证handleClick2不会发生变化</span>

memo针对一个组件的渲染是否重复执行
```
<Foo />
```

usememo针对一段函数逻辑是否重复执行
```
() => {}
```

useEffect是在渲染之后完成的

<span style="color: red">useMemo是在渲染期间完成的--避免无用方法的调用</span>

```
useMemo(() => [])
```
参数如果是空数组的话就会执行一次

useCallback
```
useMemo(() => {fn}) 等价于useCallback(fn)
```

## useCallback(减少render次数、减少计算量)
有人可能误认为useCallback可以用来解决创建函数造成的性能问题，其实恰恰相反。单个组件来看，useCallback只会更慢，因为inline函数是无论如何都会创建的，还会增加useCallback内部对inputs变化的检测
```javascript
function A() {
    const cb = () => {}; // 创建了
}
function B() {
    const cb = React.userCallback(() => {}, [a, b]) // 还是创建了
}
```
useCallback的真正目的是在于缓存每次渲染时inline caallback的实例，这样方便配合上子组件shouldComponentUpdate或者React.memo起到减少不必要的渲染的作用。需要注意的是React.memo和React.useCallback一定要配对使用。缺了一个可能导致性能不升反降。毕竟无意义的浅比较也是消耗那么一点点性能。

返回一个memoized的回调函数，即返回一个函数的句柄，等同于函数的变量，因此useCallback的作用在于利用memoize减少无效的re-render,达到性能优化的作用
## useMemo(使用useMemo方法 避免无用方法的调用)
useMemo是拿来保持一个对象引用不变的。useMemo和useCallback都是React提供做性能优化的，比起classes，Hooks给了开发者更高的灵活度和自由，但是对开发者要求也搞了，因为hooks使用不恰当很容易导致性能问题

返回一个memoized值，useMemo函数每当deps发生变化的时候都会调用computeExpensiveValue内容，这是与useCallbacke最大的不同，useCallback不执行dosomething的内容，只是重新刷新函数句柄

:::tip
句柄
官方上有这样一个等式：useCallback(fn, deps)相当于useMemo(() => fn, deps)。就是deps发生变化时候，useCallback返回一个可执行的fn的句柄，而useMemo则是执行() => fn，但是因为返回的是fn函数，因此当调用这种时，其实执行的是相同的fn函数的内容
:::


## useMemo和useCallback的认识
- useMemo和useCallback都是是具有缓存作用的，只是它们缓存对象不一样，一个是属性，一个是缓存函数，特点都是，当缓存依赖的没变，去获取还是获取曾经的缓存
- useMemo是对函数组件的属性包装，返回一个具有缓存效果的新的属性，当依赖的属性没有变化的时候，这个返回新属性就会从缓存中获取之前的
- useCallback是对函数组件中的方法缓存，返回一个被缓存的方法

[demo](https://blog.51cto.com/u_3409716/2904210)

## 资料
[useMemo的使用方式](https://blog.csdn.net/jdrunk/article/details/114824546)

[实例--react useCallback的常规使用方式?](https://www.cnblogs.com/sk-3/p/13808854.html)

[说下 React 的 useEffect、useCallback、useMemo ](https://github.com/lgwebdream/FE-Interview/issues/1218)

[React.memo和useMemo](https://zhuanlan.zhihu.com/p/339438975)

[React获取子组件DOM](https://www.jianshu.com/p/f533a9d7645c)

[react usememo useEffect](https://blog.csdn.net/wujunlei1595848/article/details/90437634)