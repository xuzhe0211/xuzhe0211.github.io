---
autoGroup-0: 正则
title: 正则表达式简单介绍
---

## 概念

```js
var regexp = new RegExp(pattern, modifiers);
```
::: tip
pattern: 描述表达式模式

modifiers: 修饰符--用于指定全局，区分大小写和多行匹配
:::

### 修饰符
+ i 执行大小写不敏感的匹配
+ g 执行全局匹配
+ m 执行多行匹配

### 方括号
> 用于查找某个范围内的字符

[abc] -- 查找方括号内的任意字符

[^abc]-- 查找任何不再放阔内的字符

[0-9]---查找任何从0-9的数字

...

### 元字符

> 拥有特殊含义的字符

+ . 查找单个字符，除换行和行结束符
+ \d 数字
+ \D 非数字
+ \s 空白符
+ \S 非空白符
+ \w 查找单词字符
+ \W查找非单词字符
+ \b 代表着单词的开头或结尾，也就是单词的分界处
+ \B 匹配不是单词开头或结束的位置
+ [^x] 匹配除了x意外的任意字符
+ [^aeiou] 匹配除了aeiou这几个字母以外的任意字符

#### 量词

+ n+ 包含至少一个n个字符
+ n* 零个或多个
+ n? 零个或者1个
+ n{x} 包含x个n的序列字符串
+ n{x,y}
+ <span style="color: red">?=n 匹配任何其后紧接指定字符串n的字</span>
+ <span style="color: red">?!n 匹配任何其后没有紧接着指定n的字符串</span>


## 用法

### test() 是否含有相同的字符串，返回true、false

```js
var aes = 'abc'
/abc/.test(aes);
```

### match() 字符串方法是否有符合匹配字符串，返回一个数组

```js
var reg = /abc/gi;
var abc = 'abcedabcsdfABC';
console.log(abc.match(reg)) // ['abc', 'abc', 'ABC']


console.log(abc.match(/abc/)) // ['abc', 'ab', 'c', index: 0, input: 'abcedabcsdfABC', groups: undefined]
```

### search（）方法 第一个匹配字符串的下标
### split()
```javascript
'0.1'.split(/?=\./)
```
[split用法](/front-end/JavaScript/string-substring.html#string-prototype-split)
### replace()
### exec() 方法，将匹配成功的内容放到数组

```js
$1, $2, $3

var reg = /(.*)\s(.*)/gi;
var str = 'baidu taobao';
console.log(str.replace(reg, '$2,$1')); // $1 代表baidu  $2代表taobao
```

## 问题
1. <span style="color: red">创建含变量的正则表达式</span>

  判断字符串含不含关键字，但是这个关键字是个变量
  ```js
  var a = '二叉树'
  var reg = /a+/; // 用字面量创建对象，无论怎么写都会把a当成正则一部分对待
  ```
  解决办法是用构造函数创建正则表达式对象
  ```js
  var reg = new RegExp(a + '+', 'gim')
  ```
  还有一种办法是用eval()函数
  ```js
  var reg = eval('/'+ a + '+' + /gim)
  ```
  但是eval()这个函数能不用就不用

2. <span style="color: red">test结果不一致问题</span>

  原因是设置了全局匹配，该正则表达式的lastIndex属性会在：
  - 匹配成功，设置为为匹配成功的子字符串的最后一个字符索引在加一，如果还用这个正则表达式对字符串进行匹配，它会以lastIndex作为匹配的起点
  - 匹配失败时，lastIndex设置为0

  **解决办法**

  要么不设置全局匹配，要么就每次在正则匹配完成后，手动把lastIndex设置为0
  ```js
  // 测试
  var a = '123234'
  var reg = /1/g;
  reg.test(a)
  console.log(reg.lastIndex)
  reg.lastIndex = 0
  ```
  
  [正则的lastIndex 属性](https://www.cnblogs.com/aidixie/p/11271186.html)

