---
autoGroup-13: TypeScript
title: TypeScript 中的子类型、逆变、协变是什么
---
## 前言
Typescript中有许多关于类型系统的概念,如果只知其一不知其二的话，那么就有可能被报错大的满地找牙

这篇文章写的是关于类型系统中的**协变与逆变**的概念，了解协变和逆变是如何发生及运作的

## 类型关系
理解一个新东西所需要的是一个良好且完善的上下文，所以需要先了解最基础的类型关系。

在Typescript中类型只与值有关，即[鸭子类型](https://zh.wikipedia.org/wiki/%E9%B8%AD%E5%AD%90%E7%B1%BB%E5%9E%8B)

## 父子类型
### 普通函数
假设有如下接口类型
```js
interface Animal {
    age: number
}
interface Dog extends Animal {
    bark():void
}
```
Dog继承于父类Animal，也就是说Dog是Animal的子类型,我们可以称之为 Dog ≼ Animal

可以看到，子类相较于父类更具体，属性或行为更多。

同时可以看到因为**鸭子类型**而出现的一个现象(同时也被称为类型兼容性)
```js
let animal: Animal
let dog: Dog

animal = dog;
// √ 因为 animal 只需要 age 一个属性，而 dog 中含有 age 和 bark() 两个属性，赋值给 animal 完全没问题。

dog = animal 
// × Error: Property 'bark' is missing in type 'Animal' but required in type 'Dog'.
```
<span style="color: red">因为animal中缺少dog需要的bark()属性，因此赋值失败并报错</span>

#### 总结
1. <span style="color:red">子类型比父类型描述的更具体,父类型相对于子类型是更广泛的,子类型相对于父类型是更精确的</span>
2. <span style="color:red">判断是否是子类型可以这么理解，子类型是一定可以赋值给父类型的</span>

### 联合类型
假如有如下类型：
```js
type Parent = 'a' | 'b' | 'c'
type Son = 'a' | 'b'

let parent: Parent
let son = Son

son = parent
// × Error: Type 'Parent' is not assignable to type 'Son'.
// Type '"c"' is not assignable to type 'Son'.
parent = son 
// √ 
```
Parent可能是'c'，但是Son类型并不包括'c'这个字面量类型，因此赋值失败并报错

可以从这个案例看出 Son ≼ Parent.因为Parent更广泛，Son更具体

可以这么理解:<span style="color: blue">联合类型相当于集合,Son就是Parent子集。不过在这是说Son是Parent的子类型</span>

## 协变和逆变
依旧假设我们有上面的Animal和Dog两个父子类型

### 协变
协变的情况其实很简单就是上面说的类型兼容性,因此协变其实无处不在
```js
let animals:Animal[]
let dogs: Dog[];

animals = dogs;
```
完全没问题，就不在重复了。这就是协变现象

### 逆变
逆变现象只会在函数类型中的函数参数上出现。假设有如下代码
```js
let haveAnimal = (animal: Animal) => {
    animal.age;
}
let haveDog = (dog: Dog) => {
    dog.age
    dog.bark();
}


haveAnimal = haveDog 
// Error: Type '(dog: Dog) => void' is not assignable to type '(animal: Animal) => void'.
//   Types of parameters 'dog' and 'animal' are incompatible.
//     Property 'bark' is missing in type 'Animal' but required in type 'Dog'.

haveAnimal({
  age: 123,
})
```
<span style="color: red">传入的Animal没有haveAnimal需要的bark()属性，因此在检查时候报错了</span>

> 注意:TS之前的函数参数是**双向协变的，也就是说技术协变又是逆变的、且这段代码并不会报错**.但是在如今的版本 (Version 4.1.2) 在 tsconfig.json 中有 strictFunctionTypes 这个配置来修复这个问题。（默认开启）

那么这时候修改代码为
```js
- haveAnimal = haveDog
+ haveDog = haveAnimal
```
发现完全没问题！
因为我们在运行 haveDog（实际运行还是 haveAnimal ） 的时候会传入 Animal 的子类Dog，之前说过子类型的属性比父类型更多，因此haveDog需要访问的属性在 Animal 中都有，那么在 Dog 类型中肯定只会更多。

<span style="color: red">可以发现对于两个父子类型作为函数参数构建两个函数类型，这两个函数类型的父子关系逆转了，这就是逆变</span>

同时，在返回值类型上和平常没有什么区别的是协变的

### 总结
在函数类型中,参数类型是你变得，返回值类型是协变的

## 练习
有如下代码
```js
type NoOrStr = number | string;
type No = number;
let noOrStr = (a: NoOrStr) => {}
let no = (a: No) => {}
```
noOrstr = no会报错还是no=noOrStr会报错

### 答案
noOrStr = no会报错
### 解析
- 在练习中，可以看做No ≼ NoOrStr，进行逆变转换 noOrStr ≼ no。<span style="color: red">子类可以赋值给父类，父类不能赋值给子类，因此no = noOrStr是对的没有问题，noOrStr = no就会报错</span>
- 又或者换种角度,noStr能处理number|string类型的值,而no只能处理number类型的值。
    - 因此当no = noOrStr时候没问题,因为调用no()时候只会传入number类型的值，而noOr可以处理包括numbner两种类型的值
    - 而当noOrStr = no时就出为了，因为调用noOrStr时会传入number|string，而no只能处理number类型的值，当调用noOrStr传入string的类型的值时，no处理不了 因此报错





[TypeScript 中的子类型、逆变、协变是什么](https://github.com/sl1673495/blogs/issues/54)

[TypeScript 类型系统 协变与逆变的理解 函数类型的问题](https://juejin.cn/post/6905666894984904717)