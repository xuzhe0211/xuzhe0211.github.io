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

### Required
- Required&lt;T&gt;
>将某个类型里的属性全变为必选项
```js
interface RequiredType {
    id: number;
    firstName?: string;
    lastName?: string;
}
function showType(args: Required<RequiredType>) {
    console.log(args);
}
showType({ id: 1, firstName: 'John', lastName: 'Doe' });
// Output: { id: 1, firstName: "John", lastName: "Doe" }

showType({ id: 1 });
// Error: Type '{ id: number: }' is missing the following properties from type 'Required<RequiredType>': firstName, lastName
```
上面的代码中，即使我们在使用接口之前先将某些属性设为可选，但Required被加入后也会使所有属性成为必选。如果省略某些必选参数，TypeScript将报错

### Readonly
- Readonly&lt;T&gt;

会转换类型的所有属性，以便他们无法被修改
```js
interface ReadonlyType {
    id: number;
    name: string;
}
function showType(args: Readonly<ReadonlyType>) {
    args.id = 4;
    console.log(args);
}
showType({id: 1, name: 'Doe'});
// Error: Cannot assign to 'id' because it is a read-only property.
```
我们使用Readonly来使ReadonlyType的属性不可被修改.也就是说，如果你尝试为这些字段之一赋予新值，则会引发错误。

除此之外，你还可以在指定的属性前面使用关键字readonly时期无法被重新赋值
```js
interface ReadonlyType {
    readonly id: number;
    name: string;
}
```
### Pick
- Pick&lt;T,K&gt;

此方法允许你从一个已存在类型T中选择一些属性作为K，从而创建一个新类型--即抽取一个类型/接口中的一些子集作为一个新的类型。

T代表要抽取的对象，K有一个约束:一定是来自T所有属性字面量的联合类型 新的类型/属性一定要从K中抽取
```js
/**
    源码实现
 * From T, pick a set of properties whose keys are in the union K
*/
type Pick<T, K extends typeof T> = {
    [P in K]: T[P]
}
```
```js
interface PickType {
    id: number;
    firstName: string;
    lastName: string;
}
function showType(args: Pick<PickType, 'firstName' | 'lastName'>) {
    console.log(args);
}

showType({firstName: 'John', lastName: 'Doe'});
// Output: {firstName: 'John'}

showType({ id: 3 });
// Error: Object literal may only specify known properties, and 'id' does not exist in type 'Pick<PickType, "firstName" | "lastName">'
```
Pick与我们前面讨论的工具有一些不同，它需要有两个参数
- <span style="color: blue">T是要从中选择元素的类型</span>
- <span style="color: blue">K是要选择的属性(可以使用联合类型来选择多个字段)</span>

### Omit
- Omit&lt;T,K&gt;

Omit的作用域Pick类型正好相反。不是选择元素,而是从类型T中删除K个属性

```js
interface PickType {
    id: number;
    firstName: string;
    lastName: string;
}
function showType(args: Omit<PickType, 'firstName' | 'lastName'>) {
    console.log(args);
}
showType({id: 7});
// output: {id: 7}

showType({firstName: 'John'})
// Error: Object literal may only specify known properties, and 'firstName' does not exist in type 'Pick<PickType, "id">'
```
### Extract
- Extract&lt;T, U&gt;
> 提取T中可以赋值给U的类型--- 取交集

Extract允许你通过选择两种不同类型中的共有属性来构造新的类型。也就是从T中提取所有可分配给U的属性
```js
interface FirstType {
    id: number;
    firstName: string;
    lastName: string;
}
interface SecondType {
    id: number;
    address: string;
    city: string;
}
type ExtractType = Extract<keyof FirstType, keyof SecondType>;
// output: 'id'
```
在上面的代码中，FirstType接口和SecondType接口，都存在id:number属性。因此，通过使用Extract，即提取出新的类型{id: number}

### Exclude
> Exclude&lt;T, U&gt;--从T中提出可以赋值给U的类型
与Extract不同，Exclude通过排除两个不同类型中已经存在的共有属性来构造新的属性。它会从T中排除所有可分配给U的字段。
```js
interface FirstType {
    id: number;
    firstName: string;
    lastName: string;
}
interface SecondType {
    id: number;
    address: string;
    city: string;
}
type ExcludeType = Exclude<keyof FirstType, keyof SecondType>
// output: 'firstName' | 'lastName'
```
上面的代码可以看到，属性fristName和lastName在SecondType类型中不存在。通过使用Extract关键字，我们可以获得T中存在而在U中不存在的字段。

### Record
- Record&lt;K, T&gt;

此工具可以帮助你构造具有给定类型T的一组属性K的类型。将一个类型的属性映射到另一个类型的属性时，Record非常方便
```js
interface EmployeeType {
    id: number;
    fullname: string;
    role: string;
}
let employee: Record<number, EmployeeType> = {
    0: { id: 1, fullname: 'John Doe', role: 'Designer' },
    1: { id: 2, fullname: 'Ibrahima Fall', role: 'Developer' },
    2: { id: 3, fullname: 'Sara Duckson', role: 'Developer' },
};

// 0: { id: 1, fullname: "John Doe", role: "Designer" },
// 1: { id: 2, fullname: "Ibrahima Fall", role: "Developer" },
// 2: { id: 3, fullname: "Sara Duckson", role: "Developer" }
```
Record的工作方式相对简单。在代码中，它期望一个number作为类型，这就是为什么我们将0、1、2作为emplyees变量的键的原因。如果你尝试使用字符串作为属性，则会引发错误，因为属性是由EmployeeType给出的具有ID, fullName和role字段的对象

### NonNullable
- NonNullable&lt;T &gt;
> 从T中提出null 和 undefined

```js
type NonNullable = string | number | null | undefined;

function showType(args: NonNullable<NonNullableType>) {
    console.log(args);
}
showType('test');
// output: 'test'

showType(1);
// output: 1

showType(null);
// Error: Argument of type 'null' is not assignable to parameter of type 'string | number'.

showType(undefined);
// Error: Argument of type 'undefined' is not assignable to parameter of type 'string | number'.
```
我们将类型NonNullableType作为参数传递给NonNullable,NonNullable通过排除null和undefined来构造新类型。也就是说，如果你传递可为空的值，Typescript将引发错误。

顺便说一句，如果将--strictNullChecks标志添加到tcconfig文件，Typescript将应用非空性规则

## Mapped Types(映射类型)
<span style="color: red">映射类型允许你从一个旧的类型，生成一个新的类型。</span>

请注意，前面介绍的某些高级类型也是映射类型。如:
```js
/*
Readonly， Partial和 Pick是同态的，但 Record不是。 因为 Record并不需要输入类型来拷贝属性，所以它不属于同态：
*/
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
type Partial<T> = {
    [P in keyof T]?: T[P];
};
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

Record;
```
```js
type StringMap<T> = {
    [P in keyof T]: string;
};

function showType(arg: StringMap<{ id: number; name: string }>) {
    console.log(arg);
}

showType({ id: 1, name: 'Test' });
// Error: Type 'number' is not assignable to type 'string'.

showType({ id: 'testId', name: 'This is a Test' });
// Output: {id: "testId", name: "This is a Test"}
```
<span styl="color: blue">StringMap<>会将传入的任何类型转换为字符串。就是说，如果我们在函数showType()中使用它，则接收到的参数必须是字符串-否则，TypeScript 将引发错误。</span>

## Type Guards(类型保护)
<span style="color: red">类型保护使你可以使用运算符检查变量或对象的类型</span>。这是一个条件块，它使用typeof,instanceof 或 in返回类型

> typescript 能够在特定区块中保证变量属于某种确定类型。可以在此区块中放心地引用此类型的属性，或者调用此类型的方法

### typeof
```js
function showType(x: number | string) {
    if(typeof x === 'number') {
        return `this.result is ${x + x}`
    }
    throw new Error(`This operation can'n be done on a ${typeof x}`);
}
showType("I'm not a number");
// Error: This operation can't be done on a string

showType(7);
// Output: The result is 14
```
这段代码中，有一个普通的Javascript条件块，通过typeof检查接收到的参数的类型

### instanceof
```js
class Foo {
    bar() {
        return 'Hello World'；
    }
}
class Bar {
    baz = '123'
}
function showType(arg: Foo | Bar) {
    if(arg instanceof Foo) {
        console.log(arg.bar());
        return arg.bar();
    }
    throw new Error('The type is not supported')
}
showType(new Foo());
// output: hello world

showType(new Bar());
// Error: The type is not supported
```
像前面的示例一样，这也是一个类型保护，它检查接收到的参数是否是Foo类的一部分，并对其进行处理

### in
```js
interface FirstType {
    x: number;
}
interface SecondType {
    y: string;
}
function showType(arg: FirstType | SecondType) {
    if('x' in arg) {
        console.log(`The property ${args.x} exists`)
        return `The property ${arg.x} exists`;
    }
    throw new Error('This type is not expected');
}
showType({ x: 7 });
// Output: The property 7 exists

showType({ y: 'ccc' });
// Error: This type is not expected
```
这个例子中，使用in检查参数对象上是否存在属性x

## Conditional Types(条件类型)
条件类型测试两种类型，然后根据该测试的结果选择其中一种
:::tip
一种由条件表达式所决定的类型，表现形式为T extends U ? X : Y;即如果类型T可以被赋值给类型U，那么结果类型就是X类型，否则为Y类型。

条件类型使类型具有了不唯一性，增加了语言的灵活性
:::
```js
// 源码实现
type NonNullable<T> = T extends null | undefined ? never : T;

// NotNull<T> 等价于 NoneNullable<T,U>

// 用法示例
type resType = NonNullable<string | number | null | undefined>; // string|number
```
上面的代码中， NonNullable检查类型是否为 null，并根据该类型进行处理。正如你所看到的，它使用了 JavaScript 三元运算符。

## 文档
[原文档](https://mp.weixin.qq.com/s/TcZ0DgtvVEF_Hp88X5E7oA)

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