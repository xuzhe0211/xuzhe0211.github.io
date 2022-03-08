---
autoGroup-13: TypeScript
title: Card-TS的构造签名和构造函数类型是啥
---

## 构造签名
在TypeScript接口中，你可以使用new关键字来描述一个构造函数
```
interface Point {
  new (x: number, y: number): Point;
}
```
以上接口中 new(x: number, y: number) 我们称之为构造签名，其语法如下：
```
ConstructSignature:
  new TypeParametersopt ( ParameterListopt ) TypeAnnotationopt
```
在上述的构造签名中，TypeParametersopt 、ParameterListopt 和 TypeAnnotationopt 分别表示：可选的类型参数、可选的参数列表和可选的类型注解。与该语法对应的集中常见的形式如下
```
new C  
new C ( ... )  
new C < ... > ( ... )
```
## 构造函数类型
在TypeScript语言规范中这样定义构造函数类型：
> An object type containing one or more construct signatures is said to be a constructor type. Constructor types may be written using constructor type literals or by including construct signatures in object type literals.

通过规范中的描述信息，我们可以得出以下结论
- 包含一个或多个构造签名的对象类型被称为构造函数类型
- 构造函数类型可以使用构造函数类型字面量或包含构造签名的对象类型字面量来编写
那么什么是构造函数类型字面量呢？构造函数类型字面量是包含单个构造函数签名的对象类型的简写。具体来说，构造函数类型字面量的形式如下：
```
new <T1, T2, ...>(P1, P2,...) => R
```
该形式与以下对象字面量类型是等价的：
```
{ new < T1, T2, ... > ( p1, p2, ... ) : R }
```

下面举个实际的例子
```
// 构造函数字面量
new (x: number, y: number) => Point
```
等价于一下对象类型字面量
```
{
  new (x: number, y: number): Point
}
```


## 构造函数类型的应用
在介绍构造函数类型的应用前，我们先来看个例子
```
interface Point {
  new (x: number, y: number): Point;
  x: number;
  y: number;
}

class Point2D Implements Point {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x; 
    this.y = y;
  }
}
const point: Point = new Point2D(1,2)
```
对于以上的代码，TypeScript 编译器会提示以下错误信息：
```
Class 'Point2D' incorrectly implements interface 'Point'.
Type 'Point2D' provides no match for the signature 'new (x: number, y: number): Point'.
```
相信很多刚接触 TypeScript 不久的小伙伴都会遇到上述的问题。要解决这个问题，**我们就需要把对前面定义的 Point 接口进行分离，即把接口的属性和构造函数类型进行分离**：
```
interface Point {
  x: number;
  y: number;
}

interface PointConstructor {
  new (x: number, y: number): Point;
}
```
完成接口拆分之后，除了前面已经定义的 Point2D 类之外，我们又定义了一个 newPoint 工厂函数，该函数用于根据传入的 PointConstructor 类型的构造函数，来创建对应的 Point 对象。
```
class Point2D implements Point {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

function newPoint(
  pointConstructor: PointConstructor,
  x: number,
  y: number
): Point {
  return new pointConstructor(x, y);
}

const point: Point = newPoint(Point2D, 2, 2);
```

## 资料
[TS的构造签名和构造函数类型是啥](https://cloud.tencent.com/developer/article/1602920)