---
autoGroup-16: Tips/方法实现
title: typeof
---

## 类型判断

typeof操作符会返回数据类型的字符串。

<span style="color: red">JavaScript数据类型分为原始类型(值类型)和引用类型，其中原始类型包含:Number、String、Boolean、Undefined、Null、Symbol、BigInt（以后可能还会扩展）</span>

```js
typeof 1 // number
typeof "1" // string
typeof true // boolean
typeof aaa // undefined
typeof null // object
typeof Symbol('1') // Symbol
typeof 42n // bigint

typeof {} // object
typeof [] // object
typeof new Date() // object
typeof /regex/ // object
typeof new Map() // object

typeof function() {} // function
typeof class App {} // function
```

<span style="color: red">**综上typeof可以得到除Null之外的所有原始类型，后续在追加原始类型也一样；对于所有的引用类型可以识别出function，其余不再细分统一为object**</span>

## 注意事项

1. new 操作符

new操作符不总是返回object

```js
typeof new String('123') // object
typeof new Number(123) // object

typeof new Function('console.log("hello world")') // function
```