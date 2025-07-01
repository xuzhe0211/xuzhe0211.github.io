---
autoGroup-0: 面试记录
title: JavaScript 数组去重的方法
---
## 一、利用ES6 Set去重
```js
function unique(arr) {
    return Array.from(new Set(arr));
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
 //[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}]
```
不考虑兼容性,这种去重方法代码最少。这种方法还是无法去掉 {} 空对象，后面的高阶方法会添加去掉重复{} 的方法

## 二、利用 for 嵌套 for，然后 splice去重(ES5中最常用)
```js
function unique(arr) {
    for(var i = 0; i < arr.length; i++) {
        for(let j = i + 1; j < arr.length; j++) {
            if(arr[i] === arr[j]) {
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}
```
双层循环，外层循环元素，内层循环时比较值。值相同时，则删去这个值。
### 三、利用indexOf去重
```js
function unique(arr) {
    if(!Array.isArray(arr)) {
        console.log('tpyeof error!');
        return;
    }
    var array = [];
    for(var i = 0; i < arr.length; i++) {
        if(arr.indexOf(arr[i]) ===  -1) {
            array.push(arr[i]);
    }
    return array;
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
// [1, "true", true, 15, false, undefined, null, NaN, NaN, "NaN", 0, "a", {…}, {…}]  //NaN、{}没有去重
```
新建一个空的结果数组，for循环原数组，判断结果数组是否存在当前元素，如果有想通知则跳过，不相同则push进数组

## 四、利用sort();
```js
function unique(arr) {
    if(!Array.isArray(arr)) {
        console.log('type error!');
        return;
    }
    arr = arr.sort();
    for(var i = 1; i < arr.length; i++) {
        if(arr[i] !== arr[i - 1]) {
            array.push(arr[i]);
        }
    }
    return array;
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
// [0, 1, 15, "NaN", NaN, NaN, {…}, {…}, "a", false, null, true, "true", undefined]      //NaN、{}没有去重
```
### 五、利用对象的属性不能相同的特点进行去重（这种数组去重的方法有问题，不建议用，有待改进）
```js
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    var arrry= [];
     var  obj = {};
    for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) {
            arrry.push(arr[i])
            obj[arr[i]] = 1
        } else {
            obj[arr[i]]++
        }
    }
    return arrry;
}
    var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
        console.log(unique(arr))
//[1, "true", 15, false, undefined, null, NaN, 0, "a", {…}]    //两个true直接去掉了，NaN和{}去重
```
## 六、利用includes
```js
function unique(arr) {
    if(!Array.isArray(arr)) {
        console.log('type error');
        return;
    }
    var array = [];
    for(var i = 0; i < arr.length; i++) {
        if(!array.includes(arr[i])) {
            array.push(arr[i]);
        }
    }
    return array;
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
//[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}, {…}]     //{}没有去重
```
## 七、利用 hasOwnProperty--所有都去重了
```js
function unique(arr) {
    var obj = {};
    return arr.filter(function(item, index, arr) {
        return obj.hasOwnProperty(typeof item + item) ? false : obj[typeof item + item] = true;
    })
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
//[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}]   //所有的都去重了
```
利用hasOwnProperty 判断是否存在对象属性

## 八、利用 filter
```js
function unique(arr) {
  return arr.filter(function(item, index, arr) {
    //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
    return arr.indexOf(item, 0) === index;
  });
}
    var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
        console.log(unique(arr))
//[1, "true", true, 15, false, undefined, null, "NaN", 0, "a", {…}, {…}]
```
## 九、利用递归去重
```js
function unique(arr) {
    var array = arr;
    let len = array.length;
    array.sort((a, b) => {
        return a - b;
    })

    function loop(index) {
        if(index >= 1) {
            if(array[index] === array[index - 1]) {
                array.splice(index, 1);
            }
            loop(index - 1); // 递归loop 然后数组去重
        }
    }
    loop(len - 1);
    return array;
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
//[1, "a", "true", true, 15, false, 1, {…}, null, NaN, NaN, "NaN", 0, "a", {…}, undefined]
```
## 十、利用 Map 数据结构去重
```js
function arrayNonRepeatfy(arr) {
    let map = new Map();
    let array = new Array(); // 数组用于返回结果
    for(let i = 0; i < arr.length; i++) {
        if(map.has(arr[i])) {
            map.set(arr[i], true);
        } else {
            map.set(arr[i], false);
            array.push(arr[i]);
        }
    }
    return array;
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
//[1, "a", "true", true, 15, false, 1, {…}, null, NaN, NaN, "NaN", 0, "a", {…}, undefined]
```
## 十一、利用 reduce+includes
```js
function unique(arr){
    return arr.reduce((prev,cur) => prev.includes(cur) ? prev : [...prev,cur],[]);
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr));
// [1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}, {…}]
```
## [...new Set(arr)]
```js
[...new Set(arr)]
```