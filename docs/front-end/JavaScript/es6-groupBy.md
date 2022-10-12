---
autoGroup-13: ES6
title: 对数组进行分类：array.groupBy
---
> 浏览器不支持？

假设我们有一个员工列表，其中每个员工都有一个具有2个属性的对象:name和age
```js
const people = [
    { name: 'Alice', age: 21 },
    { name: 'Max', age: 20 },
    { name: 'Jane', age: 20 }
]
```
现在，我们需要对齐进行按照age分类，最终输出结果如下
```js
const groupedPeople = {
  20: [
    { name: 'Max', age: 20 },
    { name: 'Jane', age: 20 }
  ],
  21: [
    { name: 'Alice', age: 21 }
  ]
}
```
通常，
```js
function groupBy(objectArray, property) {
    return objectArray.reduce(function(prev, cur) {
        let key = cur[property];
        if(!prev[key]) {
            prev[key] = [];
        }
        prev[key].push(cur);
        return prev;
    }, {})
}
const groupedPeople = groupBy(people, 'age')
```
为了简化我们的嗲吗，数组又提供了一个新的方法来对数组按属性进行分类
```js
const groupedPeople = people.groupBy(({age}) => age)
```
同时也支持按条件自定义分类：
```js
const groupedPeople = people.grouBy(({ age }) =>  age <= 20 ? 'a' : 'b')
```

## 资料
[对数组进行分类：array.groupBy](https://mp.weixin.qq.com/s/D6XScVl6O84YcBwo-1SGZw)