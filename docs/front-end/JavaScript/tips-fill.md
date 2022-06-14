---
autoGroup-16: Tips/方法实现
title: 在 JavaScript 中用初始值填充数组
---
## 1.用primitives填充数组
假设我们想用给定值初始化一个长度为3的数组。

array.fill()方法可以用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。

在结合使用Array(n);
```js
const length = 3;
const filledArray = Array(length).fill(0);
filledArray; // [0, 0, 0]
```
Array(length).fill(initialValue)是一种创建具有所需长度并使用原始值(数字、字符串、布尔值)初始化的数组的便捷方法

## 2.用对象填充数组
如果需要用到对象填充数组怎么办？

### 2.1使用array.fill()
上述方法同样支持传递对象为初始值
```js
const length = 3;
const filledArray = Array(length).fill({ value: 0});
filledArray; // [{value: 0}, {value: 0}, {value: 0}]
```
Array(length).fill({value: 0})创建一个length数组3，并为每个项目分配{value: 0},要注意的是：分配相同的对象实例

这种方法创建了一个具有相同对象实例的数组。如果碰巧修改了数组中的任何一项，那么数组中的每一项都会收到影响
```js
const length = 3;
const filledArray = Array(length).fill({ value: 0 });
filledArray; // [{ value: 0 }, { value: 0 }, { value: 0 }]
filledArray[1].value = 3;
filledArray; // [{ value: 3 }, { value: 3 }, { value: 3 }]
```
<span style="color: red">改变项目的第二项目filledArray[1].value = 3会改变数组中的所有项目。</span>

### 2.2使用Array.from()
Array.from()方法对一个数组或可迭代对象创建一个新的，浅拷贝的数组实例。

因此利用Array.from()方法可以轻松的创建和初始化具有不同对象实例的数组
```js
const length = 3;
const filledArray = Array.from(Array(length), () => {
    return { value: 0 }
})
filledArray; // [{value: 0}, {value: 0}, {value:0}]
```
如果修改数组中的任何项目，则只有该项目会收到影响，其他项目不受影响
```js
const length = 3;
const filledArray = Array.from(Array(length), () => {
  return { value: 0 };
});
filledArray; // [{ value: 0 }, { value: 0 }, { value: 0 }]
filledArray[1].value = 3;
filledArray; // [{ value: 0 }, { value: 3 }, { value: 0 }]
```
filledArray[1].value = 3;只修改数组的第二项

### 2.3使用array.map()结合array.fill()
既然Array(n)返回一个数组，为何还需要使用Array.from呢？直接使用map不好吗？问题是array.map()跳过empty元素：
```js
const length = 3;
const filledArray = Array(length).map(() => {
    return {value: 0}
})
filledArray; // [empty * 3]
```
解决方法很简单，将empty数组fill null即可
```js
const length = 3;
const filledArray = Array(length).fill(null).map(() => {
  return { value: 0 };
});

filledArray; // [{ value: 0 }, { value: 0 }, { value: 0 }]
```
你常用的在 JavaScript 中填充数组的方法有哪些？
