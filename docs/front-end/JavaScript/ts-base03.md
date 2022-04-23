---
autoGroup-13: TypeScript
title: Ts类型体操
---

Typescript支持泛型，也叫类型参数，可以对类型参数做一系列运算之后返回新的类型，这就是<span style="color: red">类型编程</span>

<span style="color:color">因为类型编程实现一些逻辑还是有难度的，所以被戏称为**类型体操**</span>

## TS类型体操基本原理
if和else

条件类型，条件类型冒号左边为if 右边为else
```ts
type A = 1;
type B = 2;
type Example === A extends B ? true : false; // false
```
type Example = A extends B ? true : false 中的true和false即可以理解成它们分别为if分支和else分支中要写的代码

而if中的条件即为A extends B, A是否可以分配给B

要实现else if 则需要多个这样的条件类型进行组合

### 模式匹配
```ts
type A = [1,2,3];
type ExampleA = A extends [infer First, ...infer Rest] ? First : never // 1
type B = '123';
type ExampleB = B extends `${infer FirstChar}${infer Rest}` ? FirstChar : never // '1'
```
模式匹配是我们要利用的最有用的ts特性之一，之后我们要实现的字符串的增删改查和元组的增删改查都要基于它。

如果你想知道更多，可以参考这篇文章：[模式匹配-让你 ts 类型体操水平暴增的套路](https://juejin.cn/post/7045536402112512007)

关于条件类型中infer的官方文档 [Inferring Within Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)


## 资料
[接近天花板的TS类型体操，看懂你就能玩转TS了](https://juejin.cn/post/7061556434692997156#heading-9)

[模式匹配-让你 ts 类型体操水平暴增的套路](https://juejin.cn/post/7045536402112512007)

[理解TypeScript中的infer关键字](https://juejin.cn/post/6844904170353328135)