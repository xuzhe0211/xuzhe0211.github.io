---
autoGroup-10: 数组方法
title: 当 async/await 遇上 forEach
---
## 问题描述
```js
var getNumbers = () => {
    return Promise.resolve([1,2,3])
}
var multi = num => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(num) {
                resolve(num * num)
            } else {
                reject(new Error('num not specified'))
            }
        }, 1000)
    })
}
async function test() {
    var nums = await getNumbers();
    nums.forEach(async x => {
        var res = await multi(x);
        console.log(res);
    })
}
test();
```
在这个例子中，通过forEach遍历的将每一个数字都执行multi操作。代码执行的结果是：1s后，一次性输出1,4,9.这个结果和我们预期有些区别，我们希望每间隔1s，然后依次输出1,4,9，所以当前代码应该是并行执行了，而我们期望的应该是串行执行

## 问题分析
### JavaScript中循环数组遍历
在Javascript中提供了如下四种循环遍历数组的方式
- for

    这是循环遍历数组元素最简单的方式
    ```js
    for(i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
    ```
- for-in

    for-in语句以任意顺序遍历一个对象的可枚举属性，对于数组即是数组小标，对于对象即对象的key值。<span style="color: red">注意for-in遍历返回的对象属性都是字符串类型,即使是数组下标，也是字符串'0', '1', '2'等等「不推荐使用for-in语句」</span>
    ```js
    for(var index in myArray) {
        console.log(myArray[index]);
    }
    ```
- forEach

    forEach方法用于调用数组的每个元素，并将元素传递给回调函数；<span style="color: red">注意在回调函数中无法使用breack跳出当前循环，也无法使用return返回值</span>
    ```js
    myArray.forEach(function(value) {
        console.log(value)
    })
    ```
- for-of

    for-of语句为各种collection集合对象专门定制的，遍历集合对象的属性值，注意和for-in的区别
    ```js
    for(var value of myArray) {
        console.log(value)
    }
    ```
## 分析问题
在本例中forEach的回调函数是一个异步函数，异步函数中包含一个await等待Promise返回结果，我们期望数组元素串行执行这个异步操作，但是实际却是并行执行了

forEach的polyFill参考：[MDN-Array.prototype.forEach](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)，简单点理解
```js
Array.prototype.forEach = function(callback) {
    // this represents our array
    for(let index = 0; index < this.length; index++) {
        callback(this[index], index, this)
    }
}
```
相当于for循环执行了这个异步函数，所以并行执行了，导致一次性全部输出结果：1,4,9
```js
async function test() {
    var nums = await getNumbers();
    // nums.forEach(async x => {
    //     var res = await multi(x);
    //     consolelog(res);
    // })
    for(let index = 0; index < nums.length; index++) {
        (async x => {
            var res = await multi(x);
            console.log(res)
        })(nums[index])
    }
}
```
## 解决问题
### 方式一 
我们可以改造一下forEach,确保每一个异步的回调执行完成后，才能执行下一个
```js
async function asyncForEach(array, callback) {
    for(let index = 0; index < array.length; index++) {
        for(let index = 0; index < array.length; index++) {
            await callback(array[index], index, array)
        }
    }
}
async function test() {
    var nums = await getNumbers();
    asyncForEach(nums, async x => {
        var res = await multi(x);
        console.log(res);
    })
}
```
### 方式二
使用for-of 替代forEach

for-of可以遍历各种集合对象的属性值，要求被遍历的对象需要实现迭代器(iterator)方法，例如myObject\[Symbol.iterator\]()用于告知JS引擎如何遍历该对象。一个拥有\[Symbol.iterator\]()方法的对象呗认为是可遍历的
```js
var zeroesForeverIterator = {
    [Symbol.iterator]:function() {
        return this;
    },
    next: function() {
        return {done: false, value: 0}
    }
}
```
如上就是一个最简单的迭代器对象；for-of遍历对象时候，先调用遍历对象的迭代器方法\[Symbol.iterator\](),该方法返回一个迭代器对象(迭代器对象中包含一个next方法);然后调用该迭代器对象上的next方法

每次调用next方法都返回一个对象，其中done和value属性用来表示遍历是否结束和当前遍历的属性，当done的值为true时，遍历就停止了
```js
for (VAR of ITERABLE) {
  STATEMENTS
}
```
等价于
```js
var $iterator = ITERABLE[Symbol.iterator]()
var $result = $iterator.next();
while($result.done) {
    VAR = $result.value;
    STATEMENTS
    $result = $iterator.next();
}
```
由此可以知道 for-of 和 forEach 遍历元素时处理的方式是不同的。使用 for-of 替代 for-each 后代码为：
```js
async function test() {
    var nums = await getNumbers();
    for(let x of nums) {
        var res = await multi(x);
        console.log(res)
    }
}
```

## 资料
[当 async/await 遇上 forEach](http://objcer.com/2017/10/12/async-await-with-forEach/)