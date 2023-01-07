---
autoGroup-16: Tips/方法实现
title: JavaScript基础：isNaN与Number.isNaN的区别
---
## NaN是什么？
NaN全称是Not-A-Number(不是一个数字)，我们可以通过Number.NaN来获得一个NaN,在类型转换失败的时候,我们常常会得到一个NaN,需要注意的是，<span style="color: red">**NaN是Js中唯一一个自身不相等的存在**</span>
```javascript
Number.NaN // NaN
NaN === NaN // false
```
## 为什么NaN !== NaN
NaN只是number上的一个静态属性。
```javascript
Number('echo'); // NaN
```
比如Number('echo')会得到NaN,<span style="color: red">它只是为了告诉我你这个不是一个数字，一种表示方法，而非一个精准有效的值，因此NaN不能参与计算，也无法与自身比较</span>

## 什么情况下产生NaN
当Number提供的类型转换方法在解析一个值却无法返回数字时
```javascript
Number('echo'); // NaN

parseInt('echo123'); // NaN
parseInt('123echo'); // 123

parseFloat('时间跳跃123.1') //NaN
parseFloat('123.1时间跳跃') //123.1
```
计算中使用-  /   *运算符，参与计算的值转换类型失败时：
```javascript
1 - '听风是风' //NaN
1 * '123时间跳跃' //NaN
1 / 'echo123' //NaN
```
特别注意，两个数字0相除也会得到NaN：
```javascript
0 / 0  // NaN
```
## isNaN方法的含义，如何判断一个值严格等于NaN
window上有一个全局方法isNaN(),可能大部分人习惯理解此方法为判断一个值是等于NaN,这是因为is NaN直译过来就是 是不是Nan 所带来的误解，其实本意不是这样
```javascript
isNaN(123) //false
isNaN('123时间跳跃') //true
isNaN(NaN) //true
```
<span style="color:red">当我们向isNaN传递一个参数，它的本意是通过Number()方法尝试转换参数的类型为Number，如果转换成功返回false,否则返回true,**它只是判断这个参数是否能转成数字而已，并不是判断是否严格等于NaN**</span>

所以当你要<span style="color: red">判断某个值是否严格等于等于NaN时</span>无法使用isNaN()方法，毕竟你传递的任意字符串都会返回ture

ES6中提供了一个Number.isNaN()方法用于判断一个值是否严格等于NaN
```javascript
Number.isNaN(NaN); // true
```
与isNaN最大的区别是，Number.isNaN不存在转换类型的行为，这点最大的不同
```javascript
isNaN('听风适逢'); // true
Number.isNaN('听风适逢'); // false
```
:::tip
[Object.is](/front-end/JavaScript/object-constructor-methods.html#object-is)的行为方式与三等号相同，但是对于NaN、-0和+0进行特殊处理，所以最后两个不相同，而Object.is(NaN, NaN)将为true
:::

## 在Javascript数组中查找NaN的索引
```js
[1,2,3].indexOf(3) // 2
[1,2,NaN].indexOf(NaN) // -1
[1,NaN,3].indexOf(NaN) // -1
```
1. 可以使用[Array.prototype.findIndex](/front-end/JavaScript/array-interation-method.html#array-prototype-findindex)方法找出NaN在数组中的索引
    ```js
    let index = [1,3,4, 'hello', NaN, 3].findIndex(Number.isNaN)
    console.log(index) // 4
    ```
2. 也可以使用Array.prototype.includes检查数组中是否存在NaN,虽然它不会给你索引，它将返回一个布尔值，如果存在NaN,则返回true, 否则返回false
    ```js
    let isNaNPreset = [1,2, NaN, 'ball'].includes(NaN);
    console.log(isNaNPreset)
    ```
3. 遍历Number.isNaN(arr[i]) === true

<span style="color: red">不能使用Array.prototype.indexOf在数组中查找NaN的索引，因为indexOf在内部使用**严格相等运算符**并且NaN === NaN为false，因为IndexOf无法检测数组中的NaN</span>

在这里，我选择Number.isNaN而不是isNaN . 因为isNaN将string literal视为NaN .另一方面Number.isNaN仅将NaN文字视为NaN


## 资料
[isNaN与Number.isNaN的区别](https://www.cnblogs.com/echolun/p/10874505.html)

[在 javascript 数组中查找 NaN 的索引](https://qa.icopy.site/questions/5294413/find-index-of-nan-in-a-javascript-array)
