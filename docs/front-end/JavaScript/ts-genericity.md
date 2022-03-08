---
autoGroup-13: TypeScript
title: card--TS一分钟了解TS中的泛型
---

关于泛型可以先看看官方的介绍如下：

软件工程中,我们不仅要创建一致的定义良好的API，同时也要考虑重用性。组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。

在像C#和Java这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。这样用户就可以以自己的数据类型来使用组件。

你可以将泛型理解为宽泛的类型，它通常用于类和函数，下面一个一个来说

## 泛型类
泛型可以用于类和构造器，例如：
```
class Person<T> {
    private _value: T;
    constructor(val: T) {
        this._value = val;
    }
}
let p = new Person<number>(12)
```
如上，&lt;T&gt;表示传递一个T类型，在new的时候才把具体的类型传入。其中T是变量可改，但通常比较常见就是写T之前说TypeScript类型的时有说到数组，其实数组本职就是一个泛型类
```
let a = new Array<number>();
```

## 泛型函数
泛型可以用于普通函数
```
function fn<T>(args: T): T {
    return arg
}
fn<number>(12)
```
其实不管是用于类还是函数，核心思想都是：把类型当一种特殊的参数传入进入

需要注意的是泛型也可以"继承"，但表示的是限制范围如：
```
class Person<T extends Date> {
    private _value: T;
    constructor(val: T) {
        this._value = val;
    }
}
let p1 = new Person(new Date());

class MyDate extends Date{};
let p2 = new Person(new MyDate())
```


## 资料
[一分钟了解TS中的泛型](https://juejin.cn/post/7027798242049916936?utm_source=gold_browser_extension)