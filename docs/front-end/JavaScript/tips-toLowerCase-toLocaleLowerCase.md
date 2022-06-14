---
autoGroup-16: Tips/方法实现
title: toLowerCase和toLocaleLowerCase()的区别
---
ECMAScript中涉及字符串大小写转换的方法有4个:toLowerCase()、toLocaleLowerCase()、toUpperCase()、toLocaleLowerCase().其中toLowerCase()和toUpperCase()是两个经典的方法，借鉴自java.lang.String中的同名方法。而toLocaleLowerCase()和toLocaleUpperCase()方法是针对特定地区的实现。

对有些地区来说，针对地区的方法与其通用方法得到的结果相同，但少数语言(如土耳其语言)会为Unicode大小写转换应用特殊的规则，这时候必须使用针对地区的方法来保证正确的转换。

```js
var stringValue = "hello world";
alert(stringValue.toLocaleUpperCase());    //"HELLO WORLD"
alert(stringValue.toUpperCase());          //"HELLO WORLD"
alert(stringValue.toLocaleLowerCase());    //"hello world"
alert(stringValue.toLowerCase());          //"hello world"
```
以上代码调用的toLocaleUpperCase()和toUpperCase()都返回了“HELLO WORLD”，就像调用toLocaleLowerCase()和toLowerCase()都返回“hello world”一样。一般来说，在不知道自己的代码将在那种语言环境中运行的情况下，还是使用针对地区的方法更稳妥一些。
