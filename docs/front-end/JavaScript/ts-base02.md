---
autoGroup-13: TypeScript
title: Ts高级类型入门
---

:::tip
TypeScript是一种类型化的语言，允许你指定变量的类型，函数参数，返回值和对象属性
可以把本文看做一个带有示例的TypeScirpt高级类型备忘录
:::

## Inntersection Types(交叉类型)

交叉类型是一种将多重类型组合为一种类型的方法。这意味着你可以将给定的类型A与类型B或更多类型合并，并获得具有所有属性的单个类型。

```typescript
type LeftType = {
    id: number;
    left: number;
}
type RightType = {
    id: number;
    right: strinng;
}
type IntersectionType = LeftType & RightType;

function showType(args: IntersectionType) {
    console.log(args);
}
showType({id: 1, left: 'test', right: 'test'});
```

如你所见，IntersectionType组合了两种类型LeftType和RightType, 并使用&符号形式了交叉类型呢。

## Union Types(联合类型)
联合类型使你可以赋于同一个变量不同的类型

```typescript
type UnionType = string | number;

function showType(arg: UnionType) {
    console.log(arg);
}

showType('test')

showType(7)
```
函数showType是一个联合类型函数，它接收字符串或者数字作为参数

## Generic Type(泛型)
泛型类型是复用给定类型的一部分的一种方式。它有助于捕获作为参数传递的类型T

> 优点:创建可复用的函数，一个函数可以支持多种类型的数据。这样开发者就可以根据自己的数据类型来使用函数

### 泛型函数
```typescript
function showType<T>(args: T) {
    console.log(args);
}
showType('test');

showType(1);
```
如何创建泛型类型:需要使用&lt;&gt;并将T(名称可自定义)作为参数传递。上面的例子中，我们给showType添加了类型变量T。T帮助我们捕获用户传入的参数的类型(比如：number/string)之后我们就可以使用这个类型

我们把showType函数叫做泛型函数，因为它可以适用于多个类型

### 泛型接口

```typescript
interface GenericType<T> {
    id: number;
    name: T;
}

function showType(args: GenericType<strinng>) {
    console.log(args);
}

showType({id: 1, name: 'test'});

function showTypeTwo(args: GenericType<number>) {
    console.log(args);
}

showTypeTwo({ id: 1, name: 4});
```
在上面的例子中，声明了GenericType接口，该接口接收泛型类型T，并通过类型T来约束接口内name的类型

> 注:泛型变量约束了整个接口后，在实现的时候，必须指定一个类型

因此在使用时我们可以将name设置为任意类型的值，实力中为字符串或数字

### 多参数的泛型类型
```typescript
interface GenericType<T, U> {
    id: T;
    name: U;
}

function showType(args: GenericType<number, string>) {
    console.log(args);
}

showType({id: 1, name: 'test'})

function showTypeTwo(args: GenericType<string, string[]>) {
    console.log(args);
}

showTypeTwo({ id: '001', nname: ['This', 'is', 'a', 'Test']})
```
泛型类型可以接收多个参数。在上面的代码中，我们传入两个参数:T和U,然后将他们用做id，name的类型。也就是说，我们现在可以使用该接口并提供不同的类型作为参数。

### 一个重要的问题
```typescript

interface GenericType<T> {
  data: T
  name: string
}
interface responseTest {
  test: string
}
// 会报错？返回的是一个泛型类型 不能是具体值
async function showType<T>(args: GenericType<T>): Promise<GenericType<T>> {
  console.log(args)
  return { data: { test: 'xxx' }, name: 'test' }
}
showType<responseTest>({ data: { test: 'fdsaf' }, name: 'test' })


// 例子二
type Test = <T>(arg: T) => T
const test: Test = (arg: string) => arg

// 报错
type Test1 = <T>(arg: T) => T
const test1: Test1 = (arg) => 2
test1(1)
```
[demo](https://www.typescriptlang.org/zh/play?ssl=7&ssc=9&pln=5&pc=1#code/C4TwDgpgBAKhDOwoF4oB4YD4AUBDATgOYBcsAlCprAFADGA9gHaJTALClwup5EXJUChaiNCRY7AIwp0WXiXKUaDZkjaJJnKTPn8qAJmrrgk7JLLUgA)
## Utility Types
TypeScript内部也提供了很多方便实用的工具，可以帮助我们更轻松的操作类型。如果要使用它们，你需要将类型传递给&lt;&gt;

### Partial
- Partial&lt;T&gt;

Partial允许你将T类型的所有属性设为可选。它将在每一个字段后面添加一个？
```typescript
interface PartialType {
    id: number;
    firstName: string;
    lastName: string
}

/*
等效于
interface PartialType {
  id?: number
  firstName?: string
  lastName?: string
}
*/

function showType(args: Partial<PartialType>) {
    console.log(args);
}

showType({id: 1});

showType({ firstName: 'John', lastName: 'Doe'})
```
上面代码声明了一个PartialType接口,它用作函数showType()的参数的类型。为了是所有字段都变为可选，我们使用Partial关键字并将PartialType类型作为参数传递


## 文档
[愿文档](https://mp.weixin.qq.com/s/TcZ0DgtvVEF_Hp88X5E7oA)

[interface / type 区别1](https://www.cnblogs.com/cathy1024/p/13685148.html)

[interface / type 区别2](https://www.jianshu.com/p/965b8583ff74)


[Promise的泛型T(Promise&lt;T&gt;)的含义
](https://blog.csdn.net/wu_xianqiang/article/details/103483616)

[TS 泛型对象数组的多个定义方式
](https://paugram.com/coding/typescript-genericity-object-in-array.html)

## 疑问
- as 类型断言
    ``` typescript
    let d: Object = new Date();
    (d as Date).getFullYear();
    ```
- type 别名