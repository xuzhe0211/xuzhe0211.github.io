---
title: React hooks中memo,usememo,useCallback的区别
---

useMemo

memo类似于PureComponent作用是优化组件性能，防止组件触发重渲染

memo针对一个组件的渲染是否重复执行
```
<Foo />
```

usememo针对一段函数逻辑是否重复执行
```
() => {}
```

useEffect是在渲染之后完成的

useMemo是在渲染期间完成的

```
useMemo(() => [])
```
参数如果是空数组的话就会执行一次

useCallback
```
useMemo(() => {fn}) 等价于useCallback(fn)
```

## 资料
[React.memo和useMemo](https://zhuanlan.zhihu.com/p/339438975)

[React获取子组件DOM](https://www.jianshu.com/p/f533a9d7645c)

[react usememo useEffect](https://blog.csdn.net/wujunlei1595848/article/details/90437634)