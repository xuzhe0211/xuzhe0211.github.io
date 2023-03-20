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




## 资料
[原文](我才开始学 typescript ，晚吗？（7.5k字总结）)