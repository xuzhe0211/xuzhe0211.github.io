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
```js
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
```js
const a = [23, 123, 342, 12];
const maxNum = a.reduce((pre, item) => pre > item ? pre : item);
console.log(maxNum)
```

## 数组对象中的用法
```js
const objArr = [{name: '老大'}, {name: '老二'}, {name: '老三'}];
const str = objArr.reduce((pre, item, index) => {
    console.log(item.name, index);
    return index === 0 ? item.name : pre + ','+ item.name
}, '') // 老大,老二,老三"

// 组合(和)
const res = objArr.reduce((pre, cur, index, arr) => {
    if (index === 0) {
        return cur.name
    } else if (index === (arr.length - 1)) {
        return pre + '和' + cur.name
    } else {
        return pre + ',' + cur.name
    }
}, '')
console.log(res); // 老大、老二和老三
```

## 求字符串中每个字母出现的次数
```js
const str = 'fdsagfasdgdafggagdahg';
const res = str.split('').reduce((accumnlator, cur) => {
    accumnlator[cur] ? accumnlator[cur]++ : accumnlator[cur] = 1;
    return accumnlator
}, {})
```

## 数组转数组
```js
var arr = [2,3,4,5,6]; // 新数组为每个值的平方
var newArr = arr1.reduce((accumulator, cur) => accumulator.push(cur * cur); return accumulator;, []);
console.log(newArr); // [4, 9, 16,25, 36]
```

## 数组转对象

```js
var streams = [{name: '技术', id: 1}, {name: '设计', id: 2}];
var obj = streams.reduce((accumulator, cur) => {accumulator[cur.id] = cur; return accumulator;}, {})
console.log(obj);
```
## 多维的叠加执行操作
```js
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


// 加大难度， 商品对应不同国家汇率不同，求总价格 
var prices = [{price: 23}, {price: 45}, {price: 56}];
var rates = {
  us: '6.5',
  eu: '7.5',
};
var initialState = {usTotal:0, euTotal: 0};
// 第一种
var res = prices.reduce((accumulator, cur1) => Object.keys(rates).reduce((prev2, cur2) => {
  console.log(accumulator, cur1, prev2, cur2);
  accumulator[`${cur2}Total`] += cur1.price * rates[cur2];
  return accumulator;
}, {}), initialState);
 
// 第二种
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
## 按顺序执行promise
实现一个方法，方法内传入一个数组，数组中每一项都返回一个Promise对象。要求按照顺序执行数组中每一个Promise
```js
const fn1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('fn1');
      resolve(1);
    }, 2000)
  })
}

const fn2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('fn2');
      resolve(2);
    }, 1000)
  })
}

const arr = [fn1, fn2];

const excPromiseInOrder = (array, value) => {
  array.reduce((prePromise, curPromise) => {
    return prePromise.then(curPromise)
  }, Promise.resolve(value))
}
excPromiseInOrder(arr, 'init')
```
代码执行结果：
2秒后输出"fn1"，再过1秒输出"fn2"
如果对reduce的使用比较了解，那么这段代码也很容易看懂。唯一需要理解的可能就是excPromiseInOrder 函数体内reduce调用。在reduce回调函数中返回promise.then()，使用了链式调用。

## Koa中only模块的实现
only方法返回一个经过指定筛选属性的新对象
```js
var p = {
    name: 'BuzzLy',
    age: 25,
    email: 'dddd',
    _id: '12345'
}
only(p, ['name', 'email'])   // {name: 'BuzzLy', email: 'dddd',}
only(p, 'name age')   // {name: 'BuzzLy', age: 25,}
```
其中的实现使用的就是reduce，尝试使用reduce实现一个only方法
```js
var only = function(obj, keys) {
  obj = obj || {}；
  if('string' === typeof keys) keys = keys.split(/+/);
  return keys.reduce(function(new0, key) {
    if (null == obj[key])  return new0
    new0[key] = obj[key];
    return new0
  }, {})
}
```
## pipe实现
pipe的实现也是reduce的一个典型应用，pipe是一个curry化函数，curry函数是一种由接受多个参数的函数转化为一次只接受一个参数的函数，如果一个函数需要3个参数，那curry化后的而寒暑会接受一个参数并返回一个函数来接受下一个函数，这个函数返回的函数去传入第三个参数，最后一个函数会应用了所有参数的函数结果
```js
function pipe(...functions) {
  return function(input) {
    return functions.reduce((preVal, fn) => fn(preVal), input)
  }
}
```
验证
```js
const f1 = x => {
    console.log('执行了f1')
    return x + 1
}

const f2 = x => {
    console.log('执行了f2')
    return 2 * x
}

let result = pipe(f1, f2)(1)
console.log(result) // 4

```
[compose](/front-end/JavaScript/basics-7.html#组合-compose)
## 实现扁平化数组函数

```js
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
## 如何实现一个reduce
如何自己实现一个reduce功能

其中的核心就是数组的遍历，并且要通过是否传入第二个参数来判断遍历的起始值，并将得到的参数传入回调函数中执行，代码如下
```js
Array.prototype.reduce = Array.prototype.reduce || function(func, initialValue) {
  var arr = this;
  var base = typeof initialValue === 'undefined' ? arr[0] : initialValue;
  var startPoint = typeof initialValue === 'undefined' ? 1 : 0;
  arr.slice(startPoint).forEach(function(val, index) {
    base = func(base, val, index + startPoint, arr);
  })
  return base;
}
```

## 资料
[reduce应用和实现](https://www.jianshu.com/p/6bd41e40a1d0)