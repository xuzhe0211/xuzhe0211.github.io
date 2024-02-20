---
autoGroup-13: ES6
title: 官方宣布Promise新出了个方法，对你有用吗
---
## 背景
有时候我们需要把Promise的resolve 或者 reject 这两个参数给取出来，去实现某种目的

就比如下面的例子，我想手动控制Promise 的 fullfiled(完成态) 的时机，所以需要把 resolve 给取出来，然后在我觉得适当的时机去执行这个resolve，这样 Promise 就变 fullfiled 了

```js
let _resolve;

const promise = new Promise(resolve => {
    _resolve = resolve;
})

promise.then(() => {
    console.log(8);
})

_resolve();
```
但是这样挺麻烦的，我总是得定义一个额外的变量去存储这个 resolve

## Promise.withResolvers
Promise 最近有一个新的方法进入 stage3 了，这个方法就是 Promise.widthResolvers

它的作用是把Promise实例、resolve、reject 解构出来供我们使用，还是刚刚的例子，使用 Promise.widthResolvers;

```js
const {promise, resolve, reject } = Promise.widthResolvers();

promise.then(() => {
    console.log(8);
})

resolve();
```

## stage3 阶段
这个方法，目前处于Stage-3阶段，需要谷歌 117 以上的版本才能使用这个方法，Stage-3就是候选的意思，这些方法的提案分为几个阶段

- Stage 0 - Strawman (草案阶段): 这是提案的初始阶段，通常是一些初步的想法或建议。这些提案还没有得到正式的讨论和接受。
- Stage 1 - Proposal (提案阶段): 在这个阶段，提案已经经过了初步的讨论，并且有了详细的说明。它们通常由一个或多个TC39委员会成员提交，并等待进一步的审查和反馈。
- Stage 2 - Draft (草案阶段): 在这个阶段，提案已经经过了初步的审查，包括语法和语义方面的考虑。提案可能会在这个阶段进行一些修改和改进。
- Stage 3 - Candidate (候选阶段): 当提案达到这个阶段时，它们被认为是成熟的，可以被实施到JavaScript引擎中。这通常包括详细的规范文档和实际的参考实现。
- Stage 4 - Finished (完成阶段): 这是提案的最终阶段，表示它们已经被正式接受为ECMAScript标准的一部分，可以在各种JavaScript环境中广泛使用。

期待不久的将来，这个方法能到Stage 4阶段，并在项目中广泛使用！！！！牛bi！！！！！


