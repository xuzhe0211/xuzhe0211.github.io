---
autoGroup-13: TypeScript
title: 6 个 TypeScript 的高级技巧，帮你写出更清晰的代码
---
## 高级类型
使用TypeScript的高级类型,如映射类型和条件类型，可以基于现有类型构建新类型。通过使用这些类型，您可以在强类型系统中更改和操作类型，从而使您的代码具有更大的灵活性和维护性

### 映射类型
**映射类型会遍历现有类型的属性，并应用变换来创建新类型**。一个常用的用例是创建一个类型的只读版本。
```ts
type Readonly<T> = {
    readonly [p in keyof T]: T[P]
}

interface Point {
    x: number;
    y: number;
}
type ReadonlyPoint = Readonly<Point>
```
在这个例子中，我们定义了一个叫做 Readonly 的映射类型，它以类型 T 为泛型参数，并使其所有属性称为只读。然后，我们创建了一个 ReadonlyPoint 类型，该类型基于 Point 接口，其中所有属性都是只读的。

### 条件类型
**条件类型允许你根据条件创建新类型**。语法类似于三元运算符，使用extends关键字作为类型约束。
```ts
type NonNullable<T> = T extends null | undefined ? never : T;
```
<span style="color: red">在此示例中，我们定义了一个名为NonNullable的条件类型，它取一个类型T并检查它是否扩展了null或undefined。如果扩展了，则结果类型为never,否则为原始类型T</span>

让我们扩展一个高级类型的示例，增加更多的可用性和输出
```ts
interface Point {
    x: number;
    y: number;
}

type ReadonlyPoint = Readonly<Point>;

const regularPoint: Point = {
    x: 5,
    y: 10
}

const readonlyPoint: ReadonlyPoint = {
    x: 20, 
    y: 30
}

regularPoint.x = 15; // This works as 'x' is mutable in the 'Point' interface
console.log(regularPoint); // Output: { x: 15, y: 10 }

// readonlyPoint.x = 25; // Error: Cannot assign to 'x' because it is a read-only property
console.log(readonlyPoint); // Output: { x: 20, y: 30 }

function movePoint(p: Point, dx: number, dy: number): Point {
    return { x: p.x + dx, y: p.y + dy}
}

const movedRegularPoint = movePoint(regularPoint, 3, 4);
console.log(movedRegularPoint); // Output: { x: 18, y: 14 }

// const movedReadonlyPoint = movePoint(readonlyPoint, 3, 4); // Error: Argument of type 'ReadonlyPoint' is not assignable to parameter of type 'Point'
```
在这个示例中，我们演示了 Readonly 映射类型的用法及其如何强制执行不可变性。我们创建了一个可变的Point对象和一个只读的 ReadonlyPoint 对象。我们展示了试图修改只读属性会导致编译时错误。我们还说明了只读类型不能在期望可变类型的位置使用。从而防止代码中出现意外的副作用

## 装饰器(Decortor)
TypeScript中的装饰器是一种强大的功能，允许您添加元数据，修改或扩展类、方法、属性和参数的行为。它们是高阶函数，可以用于观察、修改或替换类定义、方法定义、访问器定义、属性定义或参数定义

### 类装饰器
**类装饰器用于类的构造函数，并可用于修改或扩展类定义**
```ts
function LogClass(target: Function) {
    console.log(`Class ${target.name} was defined`);
}

@LogClass
class MyClass {
    constructor() {}
}
```
在这个示例中，我们定义了一个名为LogClass的类装饰器,它在定义时记录被装饰器类的名称。然后，我们使用@ 语法将装饰器用于MyClass类。

### 方法装饰器
**方法装饰器应用于类的方法,并可用于修改或扩展方法定义。**
```ts
function LogMethod(target: any, key: string, descriptor: PropertyDescriptor) {
    console.log(`Method ${key} was called.`)
}

class MyClass {
    @LogMethod
    myMethod() {
        console.log('Inside myMethod');
    }
}
const instance = new MyClass();
instance.myMethod();
```
在这个例子中,我们定义了一个名为 LogMethod 的方法装饰器,它在调用方法时记录被装饰的方法的名称。然后,我们使用 @ 语法讲装饰器应用于 MyClass 类的 myMethod 方法

### 属性装饰器
**属性装饰器应用于类的属性，并可用于修改或扩展属性定义**
```ts
function DefaultValue(value: any) {
    return (target: any, key: string) => {
        target[key] = value;
    }
}
class MyClass {
    @DefaultValue(42)
    myProperty: number
}
const instance = new MyClass();
console.log(instance.myProperty); // Output: 42
```
在这个例子中，我们定义了一个名为 DefaultValue 的属性装饰器，它为被装饰的属性设置默认值。然后,我们使用 @ 语法将装饰器应用于 MyClass 类的 myProperty 属性

### 参数装饰器
**参数装饰器应用于方法或构造函数的参数，并可用于修改或扩展参数定义。**

```js
function LogParameter(target: any, key: string, parameterIndex: number) {
    console.log(`方法 ${key} 的参数 ${parameterIndex} 被调用了.`)
}

class MyClass {
    myMethod(@LogParameter value: number) {
        console.log(`在 myMethod 方法内，使用之 ${value}.`)
    }
}
const instance = new MyClass();
instance.myMethod(5);
```
## 3.命名空间(Namespaces)
在Typescript中，命名空间是一种组织和分组相关代码的方法。它们可以帮助您避免命名冲突，通过将属于一起的嗲吗封装在一起来促进模块化。命名空间可以包含类、接口、函数、变量和其他命名空间

### 定义命名空间
要定义命名空间，请使用 namespace 关键字后跟命名空间名称。然后您可以在大括号内天剑任何相关的代码

```ts
namespace MyNamespace {
    export class MyClass {
        constructor(public value: number) {}

        displayValue() {
            console.log(`The value is: ${this.value}`)
        }
    }
}
```
在此示例中，我们定义了一个名为 MyNamespace 的明明空间，并在其中添加了一个类 MyClass.请注意，我们使用 export 关键字使该类在命名空间外部可以访问

### 使用命名空间
要使用命名空间中的代码，您可以使用完全限定的名称或使用命名空间导入导入代码
```ts
// 使用完全限定的名称
const instance1 = new MyNamespace.MyClass(5);
instance1.displayValue(); // 输出： The value is: 5

// 使用命名空间导入
import MyClass = MyNamespace.MyClass;

const instance2 = new MyClass(10);
instance2.displayValue(); // 输出： The value is: 10
```
**在此示例中，我们演示了两种使用 MyNamespace 命名空间中的MyClass类的方法。首先，我们使用完全限定的名称 MyNamespace.MyClass。其次，我们使用命名空间导入语法导入 MyClass 类，并使用较短的名称使用它**

### 嵌套命名空间
命名空间可以嵌入以创建层次结构并进一步组织代码
```ts
namespace OuterNamespace {
    export namespace InnerNamespace {
        export class MyClass {
            constructor(public value: number) {}

            displayValue() {
                console.log(`The value is: ${this.value}`)
            }
        }
    }
}

// 使用完全限定的名称
const instance = new OuterNamespace.InnerNamespace.MyClass(15);
instance.displayValue(); // 输出：The value is: 15
```
在此示例中，我们定义了一个名为 InnerNamespace 的嵌套命名空间，在 OuterNamespace 中定义了一个 MyClass 类，并使用完全限定的名称 OuterNamespace.InnerNamespace.MyClass 使用它

## 4.混入(Mixins)
### 定义混入
要定义混入类，请创建一个类，该类使用构造函数签名扩展泛型类型参数。这允许混入类与其他类组合
```ts
class TimestampMixin<Tbase extends new (...args: any[]) => any>(Base: Tbase) {
    constructor(...args: any[]) {
        super(...args);
    }
    getTimestamp() {
        return new Date();
    }
}
```


## 资料
[6 个 TypeScript 的高级技巧，帮你写出更清晰的代码](https://juejin.cn/post/7225534193995104312)