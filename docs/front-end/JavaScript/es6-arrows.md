---
autoGroup-13: ES6
title: 箭头函数
---

## 介绍

箭头函数表达式的语法比函数表达式更简洁，并且没有自己的this、arguments、super和new.target.箭头函数更适合用于本来需要匿名函数的地方，并且他们不能用作构造函数。

> 因为箭头函数没有prototype, 所以箭头函数本身没有this.

## 注意事项

1. 返回对象

```
const foo = () => ({bar: 'baz'});
```
由于大括号会被解释为代码块，所以利用箭头函数直接返回一个对象时，需要小括号包裹

2. 禁止构造函数

```
const Foo = () => {};
const foo = new Foo(); // TypeError:Foo is not a constructor
```

3. 对象方法

```
const foo = {
    bar: 'baz',
    baz: () => this.bar = 'foo'
}
```

箭头函数会继承父级作用域的this, 而对象没有作用域，此时this指向全局作用域(window)

## 日常使用

1. 闭包

```
const add = (i = 0) => {return () => ++i};
const increase = add();
increase(); // 1
increase(); // 2
```