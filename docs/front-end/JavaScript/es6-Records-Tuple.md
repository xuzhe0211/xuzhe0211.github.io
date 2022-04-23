---
autoGroup-13: ES6
title: Javascript新增两个原始数据类型
---
Javascript即将退出两个新的数据类型：<span style="color: blue">Record和Tuple</span>，这两是啥呢？其实就是一个<span style="color: blue">只读</span>的<span style="color: blue">Object和Array</span>,其实在其他语言中已经有类似的数据类型了，例如Python中也有Tuple(元组)这一类型，作用也是只读的数组(在Python里叫做只读的列表)，一起来了解一下，这个特性是第2阶段提案(即差不多稳了)，想要提前体验的，文本也有polyfill的使用教程

## 基础用法
```javascript
// Records
const myRecord = #{
  name: '01',
  age: 23
}

// Tuple
const myTuple = #['1', '2', '3']
```
其实就是在原先的对象和数组前面加了个#

## 可读特性
Record和Tuple的语法跟对象和数组是一样的，所以？
```javascript
const myRecord = #{
  name: '01'
}
const myTuple = #['1', '2'];

myRecord['age'] = 23; // error
myTuple.push('3'); // error
```
为啥报错了啊？开头有提到，因为这两个类型是<span style="color: blue">只读的Object和Array</span>

## 非唯一性
在平时的开发中，数组与数组、对象都不适合直接用===进行比较，因为每个生成的对象在内存中的地址都是不一样的
```javascript
var obj1 = { name: '01' }
var obj2 = { name: '01' }
cosnt objIsSame = obj1 === obj2 // false

const arr1 = [1]
const arr2 = [1]
const arrIsSame = arr1 === arr2   // false
```
要想真正比较两个数组或对象是否相等(即我们想要的内容都一样)，需要遍历递归去依依对比，而现在呢？Record和Tuple能都解决这一问题呢？
```javascript
const record1 = #{ name: '01' };
const record2 = #{ name: '01' };
const recordIsSame = record1 === record2 // true

const tuple1 = #[1]
const tuple2 = #[1]
const tupleIsSame = tuple1 === tuple2   // true
```
可以看到，只要内部内容一致，即使两个分别生成的Record或Tuple比较一下，也是相等的

## 普通对象和数组的转换
我们可以用Record和Tuple将普通的对象和数组转黄
```javascript
const myRecord = Record({ name: '01', age: '23'}) // #{ name: '01', age: 23}
const myTuple = Tuple([1,2,3,4,5]) // #[1,2,3,4,5]
```

## 支持扩展运算符
我们也可以对Record和Tuple使用扩展运算符
```javascript
const myTuple = #[1, 2, 3];
const myRecord = #{ name: '01', age: 23 };

const newRecord = #{ ...myRecord, money: 0 } // #{ name: '01', age: 23, money: 0 }
const newTuple = #[ ...myTuple, 4, 5];   // #[1, 2, 3, 4, 5]
```
## JSON方法扩展
现在不是有 JSON.parse 和 JSON.stringfy 两个方法嘛，据说草案中还提到一个不错的想法，那就是给 JSON 对象新增一个 parseImmutable 方法，功能应该就是直接将一个 Record字符串或Tuple字符串 解析成对应的Record和Tuple对象

## 提前体验
如果你想现在体验该功能，可以转一下babel的插件
```javascript
# babel基本的库
yarn add @babel/cli @babel/core @babel/preset-env -D

# Record和Tuple Babel polyfill
yarn add @babel/plugin-proposal-record-and-tuple @bloomberg/record-tuple-polyfill -D
```
在目录下创建.babelrc，内容如下
```javascript
{
    "presets": ["@babel/preset-env"],
    "plugins": [
        [
          "@babel/plugin-proposal-record-and-tuple",
          {
            "importPolyfill": true,
            "syntaxType": "hash"
          }
        ]
      ]
}
```
再创建一个 index.js，内容如下：
```javascript
const tuple1 = #[1,2,3]
const tuple2 = #[1,2,3]

const record1 = #{ name: '01' }
const record2 = #{ name: '02' }

console.log(tuple1 === tuple2, record1 === record2)
```
执行一下babel的命令编译一下
```shell
./node_modules/.bin/babel index.js --out-file compiled.js
```
输出得到的 compiled.js 文件内容如下：
```javascript
"use strict";

var _recordTuplePolyfill = require("@bloomberg/record-tuple-polyfill");

var tuple1 = (0, _recordTuplePolyfill.Tuple)(1, 2, 3);
var tuple2 = (0, _recordTuplePolyfill.Tuple)(1, 2, 3);
var record1 = (0, _recordTuplePolyfill.Record)({
  name: '01'
});
var record2 = (0, _recordTuplePolyfill.Record)({
  name: '02'
});
console.log(tuple1 === tuple2, record1 === record2);
```
最后执行 compiled.js 即可获得结果
```shell
node compiled.js
# Result: true false
```
[@babel/plugin-proposal-record-and-tuple 更多用法见 Babel 官方文档](https://babeljs.io/docs/en/babel-plugin-proposal-record-and-tuple#docsNav)

## 应用场景
了解了那么多的内容，印象最深刻的应该就是 只读 这个特性，那么基于这个特性，Record 和 Tuple 有哪些应用场景呢？

- 用于保护一些数据，比如函数的返回值、对象内部的静态属性...
- 既然具有只读的特性，即不可变对象，那应该也可以作为对象的 key 值吧？

