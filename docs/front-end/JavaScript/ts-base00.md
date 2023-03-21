---
autoGroup-13: TypeScript
title: 我才开始学 typescript ，晚吗？（7.5k字总结）
---
## 什么是TypeScript
TypeScript是一种由微软开发的自由和开源的编程语言。它是Javascript的一个超集，而且本质上由这个语言添加了可选的静态类型和基于类的面向对象编程

:::tip
简而言之，Typescript是Javascript的超集，具有可选的类型并可以编译为纯Javascript。从技术上来讲Typscript就是具有静态类型的Javascript
:::
## Typescript优缺点
- 优点
    - 增强代码的可维护性，尤其在大型项目的时候效果显著
    - 友好地在编辑器里提示错误，编译阶段就能检查类型发现大部分错误
    - 支持最新的Javascript特性
    - 周边生态繁荣，Vue3已全面支持typescript

- 缺点
    - 需要一定的学习成本
    - 和一些插件库的兼容并不是特别完美，如以前在vue2项目里使用typescript就并不是那么流畅
    - 增加前期开发的成本，毕竟你需要写更多的代码(但是便于后期的维护)

## 安装环境
### 安装typescript
首先，我们新建一个空文件夹，用来学习ts，例如我在文件夹下新建了一个helloworld.ts
```shell
$ npm instlal -g typescript # 全局安装ts
```
不记得自己是否已经安装过 typescript 的，可以使用以下命令来验证：
```shell
tsc -v
```
如果出现版本，则说明已经安装成功
```
Version 4.6.3
```
生成tsconfig.json配置文件
```shell
tsc --init
```
执行命令后我们就可以看到生成一个tsconfig.json文件，里面有一些配置信息，我们暂时先按下不表

在我们helloworld.ts文件中，随便写点什么
```js
const s:string = '彼时彼刻，恰如此时此刻'
console.log(e);
```
控制台执行 tsc helloworld.ts 命令，目录下生成了一个同名的 helloworld.js 文件，代码如下
```js
var s = "彼时彼刻，恰如此时此刻";
console.log(s);
```
通过tsc命令，发现我们的typescript代码被转换成了熟悉的js代码

我们接着执行
```shell
node helloworld.js
```
既可看到输出结果

### 安装ts-ndoe
那么通过我们上面的一通操作，我们知道了运行tsc命令就可以编译生成一个js文件，但是如果每次改动我们都要手动去执行编译，然后再通过 node命令才能查看运行结果岂不是太麻烦了。

而 ts-node 正是来解决这个问题的

```shell
npm i -g ts-node // 全局安装ts-node
```
有了这个插件，我们就可以直接运行.ts文件了

我们试一下
```shell
ts-node helloworld.ts
```
可以看到我们的打印结果已经输出

后续我们的示例都可以通过这个命令来进行验证

接下来我们就可以正式进入到 typescript 的学习之旅了
## TypeScript基础类型
### Boolean类型
```js
const flag:boolean = true;
```
### Number类型
```js
const count: number = 10;
```
### String类型
```js
 let name: string = "树哥";
```
### Enum类型
枚举类型用于定义数值集合，使用枚举我们可以定义一些带名字的常量。使用枚举可以清晰的表达意图或创建一组有区别的永磊，如周一到周日，方位上下左右等

- 普通枚举

    初始值默认为0，其余的成员会按照顺序自动增长，可以理解为数组下标
    ```ts
    enum Color {
        RED,
        PINK,
        BLUE
    }

    const red:Color = Color.RED;
    console.log(res); // 0
    ```
- 设置初始值

    ```ts
    enum Color {
        RED = 2,
        PINK,
        BLUE
    }
    const pink: Color = Color.PINK;
    console.log(pink); // 3
    ```
- 字符串枚举

    ```ts
    enum Color {
        RED = "红色",
        PINK = "粉色",
        BLUE = "蓝色",
    }

    const pink: Color = Color.PINK;
    console.log(pink); // 粉色
    ```
- 常量枚举

    使用const关键字修饰的枚举，常量枚举与普通枚举的区别是，整个枚举会在编译阶段被删除，我们可以看下编译之后的效果
    ```ts
    const enum Color {
        RED,
        PINK,
        BLUE
    }
    const color: Color[]=[Color.RED, Color.PINK, Color.BLUE];
    console.log(color); // [0, 1,2]

    // 编译之后的js如下：
    var color = [0 /* RED */, 1 /* PINK */, 2 /* BLUE */];
    // 可以看到我们的枚举并没有被编译成js代码，只是把color这个数组变量编译出来了
    ```
### Array类型
对数组类型的定义有两种方式
```ts
const arr: number[] = [1,2,3];
const arr2: Array<number> = [1,2,3]
```
### 元组(tuple)类型
上面数组类型的方式，只能定义出内部权威同种类型的数组。对于内部不同类型的数组可以使用元组类型来定义。

元组(Tuple)表示一个已知数量和类型的数组，可以理解为它是一种特殊的数组
```ts
const tuple:[number, string] = [1, 'zhangmazi']
```
:::tip
需要注意的是，元组类型只能表示一个已知元素数量和类型的数组，长度已指定，越界访问会提示错误。
例如一个数组中可能有多种类型，数组和类型都不确定，那就直接any[]
:::
### undefined 和 null
默认情况下null和undefined是所有类型的子类型。也就是说你可以把null 和 undefined赋值给其他类型。
```ts
let a: undefined = undefined;
let b: null = null;

let str: string = 'zhangmazi';
str = null; // 编译正确
str = undefined; // 编译正确
```
<span style="color: red">如果你在tsconfig.json指定了'strictNullChecks'：true，即开启严格模式后，null和undefined只能给他们自己的类型赋值</span>

```ts
// 启用--strictNullChecks
let x: number;
x = 1; // 编译正确
x = undefined; // 编译错误
x = null; // 编译错误
```
<span style="color: red">>但是undefined可以给void赋值</span>

```ts
let c:void = undefined; // 编译正确
let d:void = null; // 编译错误
```
### any类型
any会跳过类型检查器对值得检查，任何职都可以赋值给any类型

```ts
let value: any = 1;
value = 'zhangmazi'; // 编译正确
value = []; // 编译正确
value = []; // 编译正确
```
### void类型
void意思就是无效的，一般只用在函数上，告诉别人这个函数没有返回值
```ts
function sayHello():void {
    console.log('hello啊')
}
```
### never 类型
<span style="color: red">never类型表示的是那些永不存在的值得类型。例如never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型</span>

值会永不存在的两种情况
1. 如果一个函数执行时抛出了异常，那么这个函数永远不存在返回值(因为抛出异常会直接中断程序运行，这使得程序运行不到返回值那一步，即具有不可达重点，也就永不存在返回了)
2. 函数中执行无限循环的代码(死循环),使得程序永远无法运行到函数返回值那一步，永不存在返回

```ts
// 异常
function error(msg: string): never { // 编译正确
    throw new Error(msg)
}

// 死循环
function loopForever(): never { // 编译正确
    while(true) {}
}
```
### Unkonwn 类型
unkonwn与any一样，所有类型都可以分配给unkonwn
```ts
let value: unkonwn = 1;
value = 'zhangmazi'; // 编译正确
value = false // 编译正确
```
:::danger
unkonwn与any的最大区别是：
<span sytle="color: red">任何类型的值可以赋值给any，同时any类型的值也可以赋值给任何类型。unknown任何类型的值都可以赋值给它，但它只能赋值给unkonwn 和 any</span>

```ts
let uncertain: unkonwn = 'hello';
let noSure: any = uncertain;
```
:::
## 对象类型


## 资料
[原文](我才开始学 typescript ，晚吗？（7.5k字总结）)