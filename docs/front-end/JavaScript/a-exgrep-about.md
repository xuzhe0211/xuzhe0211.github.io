---
autoGroup-0: 正则
title: 正则表达式简单介绍
---

## 概念

```
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

#### 量词

+ n+ 包含至少一个n个字符
+ n* 零个或多个
+ n? 零个或者1个
+ n{x} 包含x个n的序列字符串
+ n{x,y}
+ ?=n 匹配任何其后紧接指定字符串n的字
+ ?!n 匹配任何其后没有紧接着指定n的字符串

## 用法

### test() 是否含有相同的字符串，返回true、false

```
var aes = 'abc'
/abc/.test(aes);
```

### match() 字符串方法是否有符合匹配字符串，返回一个数组

```
var reg = /abg/gi;
var abc = 'abcedabcsdfABC';
console.log(abc.match(regs)); // ['abc', 'abc'];
```

### search（）方法 第一个匹配字符串的下标
### split()
### replace()
### exec() 方法，将匹配成功的内容放到数组

```
$1, $2, $3

var reg = /(.*)\s(.*)/gi;
var str = 'baidu,taobao';
console.log(str.replace(reg, '$2,$1')); // $1 代表baidu  $2代表taobao
```
