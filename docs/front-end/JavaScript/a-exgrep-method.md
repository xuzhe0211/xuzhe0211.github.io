---
autoGroup-0: 正则
title: js正则常用的方法
---

定义正则
```js
var re = new RegExp('a'); // RegExp对象。参数就是我们想要制定的规则。有一种情况必须用这种方法，下面会提到
var re - /a/; // 简写方法 推荐使用 性能更好，不能为空，不然以为是注释
```

javascript中正则表达式支持的正则表达式有三个；g、i、m 分别代表全局匹配、忽略大小写、多行模式。三个属性可以自由组合共存

## test
test()在字符串中查找符合正则的内容，若查找到就返回true, 反之返回false

用法:正则.test(字符串)

例子: 叛逆的是否是数字

```js
var str = '123345465546';
var re = /\D/;
if (re.test(str)) { // 返回true,代表在字符串中年找到了非数字
    console.log('不全是数字');
} else {
    console.log('全是数字')
}
```

## search
search()在字符串搜索符合正则的内容，搜索到就返回出现的出现的位置(从0开始，如果匹配的不只是一个字母，那就返回第一个字母的位置)，如果搜索失败就返回-1

用法：字符串.search(正则)

在字符串中查找符合正则的内容。忽略大小写：i--ignore(正则中默认是区分大小写的, 如果不区分大小写的话，在正则的最后加标识i)

例子: 在字符串中找字母b,且不区分大小写

```js
var str = 'abcdef';
var re = /B/i;

// var re = new RegExp('B', 'i'); 也可以这么写

console.log(str.search(re)); // 1
```

## match
match在字符串中搜索符合规则的内容，搜索成功就返回内容，格式为数组，失败就返回null

用法: 字符串.match(正则)，

量词: + 至少出现一次 匹配不确定的次数(匹配就是搜索查找的意思)

全局匹配: g---global(正则中默认，只要搜索到符合规则的内容就会结束搜索)

```js
var str = 'haj123sdk54hask33dkhalsd879';
var re = /\d+/g;

console.log(str.match(re)); // [123,54, 33, 879];
```
**javascript正则表达式中使用变量关键字**

javascript当中提供了一个RegExp对象,它支持变量参数建立正则表达式
```js
var restr="\\s*-"+guname+"<BR>";
var  re = new  RegExp(restr,'g');  
result=ss.replace(re, '');
```

## replace
replace():查找符合正则的字符串，就替换成对应的字符串，返回替换后的内容

用法: 字符串.replace(正则, 新的字符串/回调函数)(在回调函数中，第一个参数指的是每次匹配成功的字符)

|: 或的意思

例子：敏感词过滤

```js
var str = '我爱北京天安门，天安门上太阳升';
var re = /北京|天安门/g;
var str2 = str.replace(re, str => {
    var result = '';
    for (var i = 0; i < str.length; i++) {
        result += '*';
    }
    return result;
})
console.log(str2)
```

## exec
exex():和match方法一样，搜索符合规则的内容呢，并返回内容，格式为数组

用法: 正则.exec(字符串)；

属性：Input(代表要匹配的字符串)

栗子:不是全局匹配的情况

```js
var testStr = 'now test001 test002';
var re = /test(\d+)/; // 只匹配一次
var r = '';
var r = re.exec(testStr);
console.log(r); // test001 001 返回匹配结果，以及子项
console.log(r.length); // 2 返回内容长度
console.log(r.input); // now test001 test002 代表每次匹配成功的字符串
console.log(r[0]); // test001
console.log(r[1]); // 001 代表每次匹配成功字符串中的第一个子项(\d+)
console.log(r.index); // 4 每次匹配成功的字符串中的第一个字符的位置
```

全局匹配:如果是全局匹配，可以通过while循环，找到每次匹配到的字符串，以及子项。每次匹配都接着上次的位置开始匹配

```js
var testStr = 'now test001 test002';
var re = /test(\d+)/g;
var r = '';
// 匹配两次 每次匹配都接着上一次的位置开始匹配，一直匹配到最后r就为false,就停止了匹配到test001 test002
while(r = re.exec(testStr)) {
    console.log(r); // 返回每次匹配成功的字符串，以及子项 分别打印:test001 001，test002 002
    console.log(r.input); // 分别弹出now test001 test002  now test001 test002
    console.log(r[0]); // 代表每次匹配成功的字符串，分别打印：test001 test002
    console.log(r[1]); // 代表每次匹配成功字符串中的第一个子项(\d+) 分别答应 001 002
    console.log(r.index); // 每次匹配成功的字符串中的第一个字符位置分别打印 4 12
    console.log(r.length); 分别打印2 2
}
```

## 参考
[js正则常用方法](https://www.cnblogs.com/wanguofeng/p/10731206.html)
