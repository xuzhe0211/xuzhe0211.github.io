---
autoGroup-13: TypeScript
title: TS-基础
---
## 类型系统
简单来说类型系统包括
- 类型标注(签名)
- 类型检测

### 类型标注
类型标注就是给数据（变量、函数、类等）添加类型说明

类型标注语法：

变量: 标注类型

```typescript
let 变量: 数据类型;
```
### 类型检测
有了类型标注，编译器会在编译过程中根据标注的类型进行检测，使数据的使用更安全，帮助我们减少错误。

同时配合编辑器/IDE，类型标注还能提供更大强大和友好的智能提示

>注意：类型系统检测的是类型，而不是具体值，即数据是否与标注的类型一致

### 标注类型有哪些
- 基础类型
- 空和未定义类型
- 对象类型
- 数组类型
- 元组类型
- 枚举类型
- 无值类型
- Never类型
- 任意类型
- 未知类型(Version3.0 Add)

### 基础类型
基础类型包含：<u>string</u>、<u>number</u>、<u>boolean</u>

标注语法
```typescript
变量: string
变量: number
变量: boolean

let title: stirng = '基础类型'；
let n: number = 12;
let isOk: boolean = true
```

### 空和未定义类型
因为在Null和Undefined这两种类型有且只有一个值，在标注一个变量为null或者undefined类型，那就表示该变量不能修改了

如果一个变量声明了，但是未赋值，那么该变量的值为undefined，但是如果也没有标注类型的话，默认类型为<u>any</u>，<u>any</u>类型后面有详细说明
```typescript
let un: undefined
un = 1; // 错误

let nul: null;
nul = 1; // 错误

let a: string = '类型标注';
a = null; // 可以
a = undefined; // 可以
```
<span style="color:blue">小技巧：指定 <u>strictNullChecks</u> 配置为 <u>true</u>，可以有效的检测 <u>null</u> 值数据，避免很多常见问题，建议对可能出现的 <u>null</u> 和 <u>undefined</u> 进行容错处理，使程序更加严谨</span>
```javascript
let ele = document.querySelector('#box');
if (ele) {
		ele.style.display = 'none';
}
```

### 对象类型
Object类型表示非原始值类型
标注语法

```typescript
变量: object
```

**基于对象字面量的类型标注**

```typescript
let ot: {x: number, y: string} = {
    x: 1,
    y: 'zmouse'
};
```

针对对象这种特殊而有复杂的数据，<u>TypeScript</u> 有许多的方式来进行类型标注

**内置对象类型**

除了 Object 类型，在 JavaScript 中还有很多的内置对象，如：Date，标注如下：

```typescript
变量: 内置对象构造函数名
```

```typescript
let d1: Date = new Date();
let set1: Set = new Set();
```

**包装对象**

这里说的包装对象其实就是 <u>JavaScript</u> 中的 <u>String</u>、<u>Number</u>、<u>Boolean</u>，我们知道 <u>string</u> 类型 和 <u>String</u> 类型并不一样，在 <u>TypeScript</u> 中也是一样

```typescript
let a: string;
a = '1';
a = new String('1');	// 错误

let b: String;
b = new String('2');
b = '2';	// 正确
```

### 数组类型
<span style="color:red"><u>TypeScript</u>中的数组存储的类型必须一致，所以在标注数组类型的时候，同时要标注数组中存储的数据类型</span>
标注语法

```typescript
变量: 类型[]
```
数组还有另外一种基于 泛型 的标注
```typescript
变量: Array<类型>
```
```typescript
let arr1: string[] = [];
arr1.push('数组类型'); // 正确
arr1.push(1) // 错误

let arr2: Array<number> = [];
arr2.push(100); // 正确
arr2.push('数组类型') // 错误
```
### 元组类型
元组类似数组，但是存储的元素类型不必相同，但是需要注意
- <span style="color: red">初始化数据的个数以及对应位置标注类型必须一致</span>
- <span style="color: red">越界数据必须是元组标注中的类型之一(标注越界数据可以不用对应顺序<u>联合类型</u>)</span>
标注语法

```typescript
变量: [类型一, 类型二,...]
```

```typescript
let data1: [string, number] = ['开课吧', 100];
data1.push(100); // 正确
data1.push('100'); // 正确
data1.push(true); // 错误
```

> <span style="color:red">注意：未开启 <u>strictNullChecks: true</u> 会使用 undefined 进行初始化</span>

### 枚举类型
枚举的作用组织收集--相关数据的方式

标注语法
```typescript
enum 枚举名称 {key1 = value, key2 = value}
```
- key不能是数字
- value可以是数字，称为<u>数字类型枚举</u>，也可以是字符串，称为<u>字符串类型枚举</u>，但是不能是其他值，默认数字是0，
- 第一个枚举值或者前一个枚举只为数字时，可以省略赋值，其值为<u>前一个数字值+1</u>

数字类型枚举
```typescript
enum HTTP_CODE {
  OK = 200;
  NOT_FOUND = 404
}
```
字符串类型枚举
```typescript
enum URLS {
  USER_REGISETER = '/user/register',
  USER_LOGIN = '/user/login'
}
```

### 无值类型
表示没有任何数据的类型，通常用于标注无返回值函数的返回值类型，函数默认标注类型为：void

标注语法
```typescript
function fn():void {
  // 没有return
}
```
### Never类型
当一个函数永远不可能执行<u>return</u>的时候，返回的就是<u>never</u>，与<u>voide</u>是执行了<u>return</u>,只是没有值，<u>never</u>是不会执行<u>return</u>,比如抛出错误，导致函数中止执行
```typescript
function fn(): never {
  throw new Error('error')
}
```
- <u>never</u>类型是所有其他类型的子类
- 其它不能赋值给 <u>never</u> 类型，即使是 <u>any</u>

### 任意类型
有时候，我们并不确定这个值到底是什么类型或不需要对该值进行类型检测，就可以标注为any类型
- 任何值都可以赋值给给<u>any</u>类型
- <u>any</u>类型也可以赋值给任意类型
- <u>any</u>类型有任意属性和方法

标注语法
```typescript
变量:any
```
> <span style="color: red">注意：标注为<u>any</u>类型，也意味着放弃对该值的类型检测，同时放弃IDE的智能提示</span>

> <span style="color: blue">小技巧:指定<u>noImplicitAny</u>配置为<u>true</u>，当函数参数出现隐含<u>any</u>类型时候报错</span>

### 未知类型
<u>unknow</u>3.0版本中新增，属于安全版的<u>any</u>，但是与any不同的是
- <u>unknow</u>仅能赋值给<u>unknow</u>、<u>any</u>
- <u>unkow</u>没有属性和方法

标注方法
```
变量:unknow
```

### 函数类型
在<u>JavaScript</u>中函数是一等公民的存在，在<u>TypeScript</u>也是如此，同样的，函数也有自己的类型标注格式
```typescript
函数名称(参数1:类型，参数2：类型...): 返回值
```
```typescript
function add(x: number, y: number): number {
  return x + y
}
```

## 接口
<u>TypeScript</u>的核心之一就是对值(数据)所具有的结构进行类型检查，除了前面说到的基本类型标注，针对对象类型的数据，除了前面提到的一些方式以外，我们还可以通过：<u>Interface(接口)</u>来进行标注

<u>接口</u>:对复杂的对象类型进行标注的一种方式，或给其他代码定义的一种契约(比如：类)

接口的基本语法定义结构特别简单
```typescript
interface Point {
  x: number,
  y: number;
}
```
上面的代码定义了一个类型，该类型包含两个属性，一个是<u>number</u>类型的x和一个<u>number</u>类型的y，接口中多个属性可以使用<u>逗号</u>或者<u>分号</u>进行分隔

我们可以通过这个接口来给一个数据进行类型标注
``` typescript
let p1:Point = {
  x: 100,
  y: 100
}
```
> <span style="color: red">注意:接口是一种<u>类型</u>，不能作为<u>值</u>使用</span>
```typescript
interface Point {
  x: numnber;
  y: number;
}

let p1 = Point; // 错误
```
当然，接口的定义规则远远不止这些

### 可选属性
接口也可以定义可选的属性，通过<u>?</u>来进行标注
```typescript
interface Point{
  x: number;
  y: number;
  color?: string
}
```
其中<u>color?</u>表示该属性是可选的

### 只读属性
我们还可以通过<u>readonly</u>来标注属性为只读
```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}
```
当我们标记了一个属性为只读，那么该属性除了初始化以外，是不能再次赋值的

### 任意属性
有的时候，我们希望给一个接口添加任意属性，可以通过索引类型来实现

**数字类型索引**

```typescript
interface Point {
    x: number;
    y: number;
    [prop: number]: number;
}
```

**字符串类型索引**

```typescript
interface Point {
  x: number;
  y: number;
  [prop: string]: number;
}
```

数字索引是字符串索引的子类型

**注意事项**
> <span style="color: red">索引签名参数类型必须喂string或numbner之一，但两者可同时出现</span>
```typescript
interface Point {
  [prop1: string]: string;
  [prop2: number]: string;
}
```
> <span style="color: red">当同时存在数字类型索引和字符串类型索引的时候，数字类型的值类型必须是字符串类型的值类型或子类型</span>
```typescript
interface Point1 {
  [prop1: string]: string;
  [prop2: number]: number; // 错误
}

interface Point2 {
  [prop1: string]: Object;
  [prop2: number]: Date; // 正确
}
```

## 类型深入

### 联合类型
联合类型也可以称为多选类型，当我们希望标注一个变量为多个类型之一时可以选择联合类型标注，<u>或</u>关系

标注语法
```typescript
变量： 类型一 | 类型二
```

```typescript
function css(el: Element, attr: string, value: string|number) {
  // ...
}

let box = document.querySelector('.box');
// document.querySelector 方法返回值就是一个联合类型
if(box) {
  // ts会提示有null的可能,加上判断更严谨
  css(box, 'width', '100px');
  css(box, 'opacity', 1);
  css(box, 'opacity', [1, 2]); // 错误
}
```

### 交叉类型
交叉类型也可以称为合并类型，可以把多种类型合并到一起称为一种新的类型， <u>并且</u>的关系

标注语法
```typescript
变量：类型一 & 类型二
```
如，对一个对象进行扩展
```
interface o1 {x: number, y: string};
interface o2 {z: number};

let o: o1 & o2 = Object.assign({}, {x: 1, y: '2'}, {z: 100})
```

### 字面量类型
有的时候，我们希望标注的不是某个类型，而是一个固定值，就可以使用字面量类型，配合联合类型会更有用

```typescript
function setPosition(ele: Element, direction: 'left' | 'top' | 'right' | 'bottom') {
  	// ...
}

box && setDirection(box, 'bottom');
box && setDirection(box, 'hehe');  // 错误
```

### 类型别名
有的时候类型标注比较复杂,这个时候我们可以类型标注起一个相对简单的名字

语法
```typescript
type 新的类型名称 = 类型
```
如前面说到的对象字面类型标注
```typescript
type dir = 'left' | 'top' | 'right' | 'bottom';
function setPosition(ele: Element, direction: dir) {
  // ...
}
```
### 类型断言
有的时候,我们可能标注一个更加精确的类型(缩小类型标注范围)，比如：
```typescript
let img = document.querySelector('#img');
```
我们可以看到<u>img</u>的类型为<u>Element</u>,而<u>Element</u>类型其实只是元素类型的通用类型，如果我们去访问<u>src</u>这个属性是有问题的，我们需要把它的类型标注的更加精准：<u>HTMLImageElement</u>类型，这个时候，我们可以使用类型断言，它类似一种类型转换
```typescript
let img = <HTMLImageElement>document.querySelector('#img')
```
或者
```typescript
let img = document.querySelector('#img') as HTMLImageElement;
```

> <span style="color: red">注意：断言只是一种预判，并不会数据本身产生实际的作用，即：类似转换，但并非真的转换了</span>

### 类型推导
每次都显式标注类型比较麻烦，<u>TypeScript</u> 提供了一种更加方便的特性：类型推导。<u>TypeScript</u> 编译器会根据当前上下文自动的推导出对应的类型标注，这个过程发生在：

- 初始化变量
- 设置函数默认参数值
- 返回函数值
```typescript
// 自动推断x为number
let x = 1; 
// 不能将类型'a' 分配给类型number
x = 'a'
```

### 类型操作符

**typeof**

获取值的类型，注：<u>typeof</u> 操作的是值
```typescript
let colrs = {
  color1: 'red',
  color2: 'blue'
}

type tColor = typeof colors;
/**
 tColors 类型
 type tColors = {
   color1: string;
   color2: string;
 }
 */
let color2: tColors;
```

**keyof**

获取类型所对应的类型的<u>key</u>的集合，返回值是<u>key</u>的联合类型，注：<u>keyof</u>操作的是类型
```typescript
interface Person {
  name: string;
  age: number;
}
type personKeys = keyof Person;
// 等同 type personKeys = 'name' | 'age'

let p1 = {
  name: 'zMouse',
  age: 35
}
function getPersonVal(k: personKeys) {
  return p1[k];
}
/**
 等同
 function getPersonVal(k: 'name' | 'age') {
   return p1[k]
 }
 * /
getPersonVal('name');	//正确
getPersonVal('gender');	//错误
```

**in**

<u>in</u>操作符对值和类型都可以使用

针对值进行操作，用来判断值中是否包含指定的<u>key</u>
```typescript
console.log('name' in {name: 'zmouse', age: 35});
console.log('gender' in {name: 'zmouse', age: 35});
```
针对类型进行操作的话，内部使用<u>for...in</u>对类型进行遍历
```typescript
interface Person {
  name: string;
  age: number;
}
type personKeys = keyof Person;
type newPerson = {
  [k in personKesy]: number;
  /**
  	等同 [k in 'name'|'age']: number;
  	也可以写成
  	[k in keyof Person]: number;
  	*/
}
/**
type newPerson = {
    name: number;
    age: number;
}
*/
```
> <span style="color: red">注意：<u>in</u>后面的类型必须是string或者number 或者symbol</span>

**extends**

类型继承操作符
```typescript
interface type1 {
  x: number;
  y: numnber;
}
interface type2 extends type1 {}
```
或者
```typescript
type type1 = {
  x: number;
  y: number;
}
function fn<T extends type1>(args: T) {}

fn({x: 1, y: 2})
```

### 类型保护
有的时候，值的类型并不唯一，比如一个联合类型的参数,这个时候，在该参数使用过程中只能调用联合类型都有的属性和方法
```typescript
function toUpperCase(arg: string|string[]) {
  arg.length; // 正确
  arg.toUpperCase(1); // 错误

  // 即使作为条件判断也不行
  if(arg.substring) {
    arg.substring(1)
  }
}
```
可以使用类型断言
```typescript
if (<string>arg.substring) {
  (<string>arg).substring(1)
}
```
但是这样做还是很麻烦的，其实在<u>TypeScript</u>中，提供了一个类型保护措施来帮助更加方便的处理这种情况

**typeof**
```typescript
if (typeof arg === 'string') {
  arg.substring(1)
} else {
  arg.push('1')
}
```
<u>typescript</u>能够把<u>typeof</u>识别为类型保护，作为类型检查的依据，不仅仅是在 <u>if</u> 中有效，在 <u>else</u> 中也是有效的

**instanceof**

<u>typescript</u>中的instanceof也是类型保护的，针对细化的对象类型判断可以使用它来处理
```typescript
if(arg instanceof Array) {
  arg.push('1')
}
```

**自定义类型保护**

有的时候，判断并不是基于数据类型或构造函数来完成的，那么就可以自定义类型保护
```typescript
function canEach(data: Element[] | NodeList | Element): data is Element[] | NodeList {
  return (<NodeList>data).forEach !== undefined
}
function fn2(element: Element[] | NodeList | Element) {
  if (canEach(element)) {
    elements.forEach(_ => {});
  } else {
    elements.classList.add('box');
  }
}
```
<u>data is Element|NodeList</u>是一种类型谓词，格式为：<u>xx is type</u>，返回这种类型的函数就可以被<u>TypeScript</u>识别为类型保护