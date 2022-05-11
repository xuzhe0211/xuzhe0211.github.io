---
autoGroup-13: ES6
title: ES6技巧
---
## 打乱数组顺序
```js
let arr = ['😁', 67, true, false, '55'];
arr = arr.sort(() => 0.5 - Math.random());
console.log(arr);
```
## 去除数字之外的所有字符
```js
var str = 'xieyezi 234234 is 9889 so hansome 234';
console.log(str.replace(/\D/g, ''));
```

## 反转字符串或者单词
```js
const sentence = 'xieyezi is so handsome,lol.';
const reverseSentence = reverseBySeparator(sentence, '');
console.log(reverseSentence); // .lol,emosdnah os si izeyeix

const reverseEachWord = reverseBySeparator(reverseSentence, ' ')
console.log(reverseEachWord); // izeyeix si os .lol,emosdnah

function reverseBySeparator(string, separator) {
    return string.split(separator).reverse().join(separator);
}
```
## 将十进制转换为二进制或十六进制
```js
let num = 43;
const binaryNum = num.toString(2);
const hexadecimalNum = num.toString(16);

console.log(binaryNum); // 101011
console.log(hexadecimalNum); // 2b
```
## 合并多个对象
```js
const city = [
    name: 'chongqing',
    population: '20000'
]
const location = {
    loingitude: '106.55',
    latitude: '29.23'
}
const fullCity = {...city, ...location};
console.log(fullCity)
```
## == 和=== 区别
```js
// == ->类型转换(浅比较)
// ==== -> 无类型转换(严格比较)
0 == false; // true
0 === false // false;
1 == '1' // true
1 === '1' // false
null == undefined; // true
null === undefined; // false
```
## 解构赋值
```js
const forest = {
    location: 'Sweden',
    animals: 3
    animalsTypes: ['Lions', 'Tigers', 'Bears']
}
const {location, animals, animalsTypes} = forest
const [lions, tigers, bears] = animalsTypes;

console.log(location); // Sweden
console.log(animals); // 3
```
## 交换变量的值
```js
let bears = 'bears';
let tigers = 'tigers';
[bears, tigers] = [tigers, bears];
console.log(bears); // tigers;
console.log(tigers); // bears
```
## 判断回文字符串
```js
const isReverse = (str1, str2) => {
    const normalize = str => {
        str.toLowerCase().normalize('NFD').split('').reverse().join('') // normalize?? 其实可以去掉这里
    }
    return normalize(str1) === str2
}
console.log(isReverse('anagram', 'margana'))
```
[js中string.normalize方法](http://www.qiutianaimeili.com/html/page/2021/06/20365p6rfq8paa5.html)

## 判断两个字符数是否为互相排列
>判断两个字符串是否为互相排列: 给定两个字符串,一个是否是另一个的排列
```js
const isAnagram = (str1, str2) => {
    const normalize = str => str.toLowerCase().normalize('NFD').split('').sort().join('');
    return normalize(str1) === str2
}
console.log(isAnagram('anagram', 'nagaram') true)
```
## 可选链操作符
```js
const player = {
    name: 'xieyezi',
    rating: 1000,
    click: () => {
        return 'click'
    },
    pass: (teammate) => {
        return `Pass to ${template}`
    }
}
console.log(player?.name); // xieyezi
```
> MDN: 可选链操作符( ?. )允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。?. 操作符的功能类似于 . 链式操作符，不同之处在于，在引用为空(nullish ) (null 或者 undefined) 的情况下不会引起错误，该表达式短路返回值是 undefined。与函数调用一起使用时，如果给定的函数不存在，则返回 undefined

demo
```js
if (res && res.data && res.data.success) {}
// 相当于
if(res?.data?.success) {}
```
## 三目运算符
```js
const oxygen = 10;
const diver = oxygen < 10 ? 'Low oxygen' : 'High oxygen';
console.log(diver);
```
## 从数组随机选择一个值
```js
const elements = [24, 'You', 777, 'beaking', 99, 'full'];
const random = arr =>  arr[Math.floor(Math.random() * arr.length)]
console.log(random(elements));
```
## 冻结对接
```js
const octopus = {
    tentacles: 8, 
    color: 'blue'
}
Object.freeze(octopus);
octopus.tentacles = 10; // Error 不会改变
console.log(octopus); // { tentacles: 8, color: 'blue'}
```
## 删除数组中重复的元素
```js
var arr = [1,2,3, 2,3]
const unique = arr => [...new Set(arr)]
console.log(unique(arr))
```

## 保留指定小数
```js
const num = 0.1231243254
console.log(num.toFixed(2)); // 0.12
console.log(num.toFixed(3)); // 0.123
```
## 清空数组
```js
const numbers = [1,2,3,4,5,6,7,8,8]
nums.length = 0;
console.log(numbers); // []
```
## 从RGB转换为HEX
```js
const rgbToHex = (r, g, b) => {
    const toHex = num => {
        const hex = num.toString(16);
        return hex.length === 1 ? `0${hex}` : hex
    }
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
console.log(rgbToHex(46,32,67)); // #2e2043
```
## 数组最大最小值
```js
const num = [1,2,3,3,5, 88, 0,12];
console.log(Math.max.apply(null, num))
console.log(Math.min(...nums))
```
## 空值合并运算符
> MDN: 空值合并操作符（??）是一个逻辑操作符，当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。

```js
const nullVal = null;
const emptyString = '';
const someNum = 13;

const a = nullVal ?? 'A default';
const b = emptyString ?? 'B default';
const c = someNum ?? 'c default';
console.log(a) // A default
console.log(b) // ''
console.log(c) // 13
```

## 过滤数组中值为false的值
```js
const nums = [1,0, undefined, null, false];
const truthyNums = nums.filter(Boolean)
// const truthyNums = nums.filter(item => !!item) // 也可以
console.log(truthyNums); // [1]
```

[原文](https://juejin.cn/post/7083145771461115941)