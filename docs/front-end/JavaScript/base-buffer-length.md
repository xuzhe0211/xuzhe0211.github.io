---
autoGroup-0: 基础知识
title: 根据（字符 / 字节）数分段截取字符串
---
## JS 获取字符串字节数
### 方式一：encodeURIComponent
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>获取字符串的字节数</title>
</head>
<body>
    
</body>
<script>
    // 获取字符串的字节长度
    function getStrByteLength(str) {
        if (!str) {
            return 0;
        }
        return encodeURIComponent(str).replace(/%../g, "x").length;
    }

    console.log(getStrByteLength("我叫123"));  // 9
    console.log(getStrByteLength("ABC123"));  // 6
    console.log(getStrByteLength("コンバージョン"));  // 21
</script>
</html>
```
### 方式二
```js
function StrByteSize(str) {
    if(!str) {
        return 0;
    }
    // 用到了Blob对象，Blob对象代表了一段二进制数据
    return new Blob([str]).size;
}
const str1 = "我叫123";
const str2 = "ABC123";
const str3 = "コンバージョン";

console.log(StrByteSize(str1));  // 9
console.log(StrByteSize(str2));  // 6
console.log(StrByteSize(str3));  // 21
```
## 根据（字符 / 字节）数分段截取字符串
## 一、JS字符串截取 函数substring()、substr()、slice()的区别
- substring()

    substring()方法返回一个索引和另一个索引之间的字符串
    ```js
    str.substring(indexStart, [indexEnd])
    ```
    下面有七点需要注意
    1. indexStart需要截取字符串的起始位置，从零开始；indexEnd需要截取字符串的结束位置，从零开始
    2. substring()截取从indexStart到indexEnd前一位的字符串，不包括indexEnd;
    3. 如果为indexStart 等于indexEnd，substring()返回一个空字符串。
    4. 如果indexEnd省略，则将substring()字符提取到字符串的末尾。
    5. 如果任一参数小于0或是NaN，它被视为为0。
    6. 如果任何一个参数都大于str.length，则被视为是str.length。
    7. 如果indexStart大于indexEnd，那么效果substring()就好像这两个论点被交换了一样； 例如： str.substring(1, 0) == str.substring(0, 1)
    示例代码
    ```js
    let str = 'ABCDEFGHIJ';
    console.log(str.substring(1, 2)); // B
    console.log(str.substring(1, 1)); // ''
    console.log(str.substring(-3, 2)); // 'AB'
    console.log(str.substring(-3)); // 'ABCDEFGHIJ'
    console.log(str.substring(1)); // 'BCDEFGHIJ'
    console.log(str.substring(-20, 2)); // 'AB'
    console.log(str.substring(2, 20));  // 'CDEFGHIJ'
    console.log(str.substring(20, 2));  // 'CDEFGHIJ'
    ```
- substr()

    substr()方法从指定位置开始的字符串中指定字符数的字符。语法如下
    ```js
    str.substr(start, [length]);
    ```
    下面五点注意
    1. start所需字符串的起始位置，从零开始；length在返回的字符串中应该包含的字符个数
    2. substr()会从start获取长度为length字符(如果截取到字符的末尾，则会停止截取)
    3. 如果start是正的并且大于或等于字符串的长度，则substr()返回一个空字符串。
    4. 若start为负数,则将该值加上字符串长度后再进行计算（如果加上字符串的长度后还是负数，则从0开始截取）。
    5. 如果length为0或为负数，substr()返回一个空字符串。如果length省略，则将substr()字符提取到字符串的末尾。
    示例
    ```js
    let str = 'ABCDEFGHIJ';
    console.log(str.substr(1, 2));   // 'BC'
    console.log(str.substr(-3, 2));  // 'HI'
    console.log(str.substr(-3));     // 'HIJ'
    console.log(str.substr(1));      // 'BCDEFGHIJ'
    console.log(str.substr(-20, 2)); // 'AB'
    console.log(str.substr(20, 2));  // ''
    ```
- slice()

    slice()方法返回一个索引和另一个索引之间的字符串，语法
    ```js
    str.slice(beginIndex, [endIndex]);
    ```
    注意以下四点
    1. 若beginIndex为负数,则将该值加上字符串长度后再进行计算（如果加上字符串的长度后还是负数，则从0开始截取）。
    2. 如果beginIndex大于或等于字符串的长度，则slice()返回一个空字符串。
    3. 如果beginIndex大于endIndex，则slice()返回一个空字符串。
    4. 如果endIndex省略，则将slice()字符提取到字符串的末尾。如果为负，则将该值加上字符串长度后再进行计算
    示例
    ```js
    let str = 'ABCDEFGHIJ';
    console.log(str.slice(1, 2));   // 'B'
    console.log(str.slice(-3, 2));  // ''
    console.log(str.slice(-3, 9));  // 'HI'
    console.log(str.slice(-3));     // 'HIJ'
    console.log(str.slice(-3, -1)); // 'HI'
    console.log(str.slice(0, -1));  // 'ABCDEFGHIJ'
    console.log(str.slice(1));      // 'BCDEFGHIJ'
    console.log(str.slice(-20, 2)); // 'AB'
    console.log(str.slice(20));     // ''
    console.log(str.slice(20, 2));  // ''
    ```
### 根据字符个数截取字符串
```js
/**
 * str 原始字符串
 * startIndex: 开始截取位置
 * length: 截取字符串长度
 */
function getNewStr(str, startIndex, length) {
    return str.substring(startIndex, startIndex + length)
}

function getNewStr(str, startIndex, length) {
    return str.substr(startIndex, length)
}

function getNewStr(str, startIndex, length) {
    return str.slice(startIndex, startIndex + length)
}

let str = '666666哈哈哈减肥emmm好饿吖想吃饭tototototo胖胖胖胖胖胖胖aaaaa啊啊啊啊啊'
console.log(getNewStr(str, 0, 10))  
```
### 根据字符个数分段截取字符串
```js
/***
 * str: 原始字符串
 * len: 分段截取字符长度
 */
function getNewStrArr(str, len) {
    let n = Math.ceil(str.length / len);
    let strArr = [];
    for(let i = 0; i < n; i++) {
        let newStr = str.substring(len * i, len * ( i + 1));
        strArr.push(newStr);
    }
    return strArr;
}
let str = '666666哈哈哈减肥emmm好饿吖想吃饭tototototo胖胖胖胖胖胖胖aaaaa啊啊啊啊啊'
console.log(getNewStrArr(str, 10)) //  ["666666哈哈哈减", "肥emmm好饿吖想吃", "饭totototot", "o胖胖胖胖胖胖胖aa", "aaa啊啊啊啊啊"]
```
### 根据字节个数截取字符串
```js
/**
 * str: 原始字符串
 * len: 截取字节长度
 */
function reBytesStr(str, len) {
    if(!str || str === undefined) return '';
    let num = 0;
    let result = '';
    for(let i = 0; i < str.length; i++) {
        num += ((str.charCodeAt(i) > 255) ? 2 : 1);
        if(num > len) {
            break;
        } else {
            result = str.substring(0, i + 1);
        }
    }
    return result;
}
let str = '666666哈哈哈减肥emmm好饿吖想吃饭tototototo胖胖胖胖胖胖胖aaaaa啊啊啊啊啊'
    console.log(reBytesStr(str, 10)) // 666666哈哈
```
### 根据字节个数分段截取字符串
```js
/* 
     str: 原始字符串
     len: 分段截取字节长度
    */
let arr = []
function reBytesStrArr(str, len) {
    if(!str || str === undefined) return '';
    let num = 0;
    let result = '';
    for(let i = 0; i < str.length; i++) {
        num += ((str.charCodeAt(i) > 255) ? 2 : 1);
        if(num > len) {
            break;
        } else {
            result = str.substring(0, i + 1);
        }
    }
    arr.push(result);
    let item = str.split(result);
    let nextStr = item.join('');
    reBytesStrArr(nextStr, 10);
    return arr;
}
let str = '666666哈哈哈减肥emmm好饿吖想吃饭tototototo胖胖胖胖胖胖胖aaaaa啊啊啊啊啊'
console.log(reBytesStrArr(str, 10)) // ["666666哈哈", "哈减肥emmm", "好饿吖想吃", "饭totototo", "to胖胖胖胖", "胖胖胖aaaa", "a啊啊啊啊", "啊"]
```


## 自己实现
```js
// 按照字节数截取
export const reByteStr = (str: string, len: number) => {
    if (!str || str == undefined) return '';
    let result = '';
    for (let item of str) {
        len -= byteLength(item);
        if (len <= 0) {
            break;
        }
        result += item;
    }
    return result;
};
```

## 资料
[根据（字符 / 字节）数分段截取字符串](https://blog.csdn.net/qq_38128179/article/details/103504159)