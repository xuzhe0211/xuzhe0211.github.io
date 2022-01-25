---
title: reduce的使用
---

:::tip
array.reduce(function(total, currenntValue, currentIndex, arr), initialValue);
total: 必须。初始值，或者计算结束后的返回值
currentValue: 必须，当前元素。
currentIndex: 可选，当前元素的索引
arr: 可选，当前元素所属的数组对象
initialValue: 可选，传递给函数的初始值，相当于total的初始值
:::

## 数组求和
```
const arr = [12, 34, 23];
const sum = arr.reduce((total, num) => total + num);
console.log(sum); // 69

// 设置初始值求和
const arr2 = [12, 34, 23];
cosnt sum2 = arr2.reduce((total, num) => total + num, 10); // 以10为初始值求和
console.log(sum2); // 79

// 对象数组求和
var result = [
    { subject: 'math', score: 88},
    { subject: 'chinese', score: 95},
    { subject: 'english', score: 80}
]
const sum3 = result.reduce((accumulator, cur) => accumulator + cur.score, 0);
console.log(sum3);
const sum4 = result.reduce((accumulator, cur) => accumulator + cur.score, -10); // 总分扣10分
console.log(sum4)
```

## 数组最大值
```
const a = [23, 123, 342, 12];
const maxNum = a.reduce((pre, item) => pre > item ? pre : item);
console.log(maxNum)
```

## 数组对象中的用法
```
const objArr = [{name: '老大'}, {name: '老二'}, {name: '老三'}];
const str = objArr.reduce((pre, item, index) => {
    console.log(item.name, index);
    return index === 0 ? item.name : pre + ','+ item.name
}, '') // 老大,老二,老三"

// 组合
const res = objArr.reduce((pre, cur, index, arr) => {
    if (index === 0) {
        returnn cur.name
    } else if (index === (arr.lenght - 1)) {
        return pre + '和' + cur.name
    } else {
        else pre + ',' + cur.name
    }
})
console.log(res); // 老大、老二和老三
```

## 求字符串中每个字母出现的次数
```
const str = 'fdsagfasdgdafggagdahg';
const res = str.split('').reduce((accumnlator, cur) => {
    accumnlator[cur] ? accumnlator[cur]++ : accumnlator[cur] = 1;
    return accumnlator
}, {})
```

## 数组转数组
```
var arr = [2,3,4,5,6]; // 新数组为每个值的平方
var newArr = arr1.reduce((accumulator, cur) => accumulator.push(cur * cur); return accumulator;, []);
console.log(newArr); // [4, 9, 16,25, 36]
```

## 数组转对象

```
var streams = [{name: '技术', id: 1}, {name: '设计', id: 2}];
var obj = streams.reduce((accumulator, cur) => {accumulator[cur.id] = cur; return accumulator;}, {})
console.log(obj);
```

## 扁平化数组

```
let arr = [1,2,[3,4, [5, [6]]]];
console.log(arr.flat(Infinity));

// reduce实现
function fn(arr) {
    return arr.reduce((prev, item) => {
        return prev.concat(Array.isArray(item) ? fn(item) : item);
    }, [])
}

// 个数限制
function flat(arr, n) {
    let newArr = arr;
    while(n--) {
        newArr = _flat(newArr);
    }
    return newArr
}
function _flat(arr){
    return arr.reduce((a, b) => a.concat(b), [])
}
console.log(flat([1,2,3,[3,4,[5]]], 1))
```

[数组扁平化](https://www.jianshu.com/p/b1fb3434e1f5)

## 多维的叠加执行操作
```
var result = [
  { subject: 'math', score: 88 },
  { subject: 'chinese', score: 95 },
  { subject: 'english', score: 80 }
];
var dis = {
    math: 0.5,
    chinese: 0.3,
    english: 0.2
};
var res = result.reduce((accumulator, cur) => dis[cur.subject] * cur.score + accumulator, 0);


<!-- 加大难度， 商品对应不同国家汇率不同，求总价格 -->
var prices = [{price: 23}, {price: 45}, {price: 56}];
var rates = {
  us: '6.5',
  eu: '7.5',
};
var initialState = {usTotal:0, euTotal: 0};
var res = prices.reduce((accumulator, cur1) => Object.keys(rates).reduce((prev2, cur2) => {
  console.log(accumulator, cur1, prev2, cur2);
  accumulator[`${cur2}Total`] += cur1.price * rates[cur2];
  return accumulator;
}, {}), initialState);
 
 
var manageReducers = function() {
  return function(state, item) {
    return Object.keys(rates).reduce((nextState, key) => {
        state[`${key}Total`] += item.price * rates[key];
        return state;
      }, {});
  }
};
var res1= prices.reduce(manageReducers(), initialState);
```
