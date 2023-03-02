---
autoGroup-0: 正则
title: JavaScript正则表达式精简
---

ECMAScript3 开始支持正则表达式，其语法和Perl语法类似，一个完整的正则表达式如下
```js
var expresson = /pattern/ flags
```
其中，模式(pattern)部分可以是任何简单或复杂的正则表达式，可以包含字符类、限定符、向前查找以及反向查找

每个正则表达式都可以带有一个或多个标志(flags)，用以表明正则表达式的行为，正则表达式支持下列3个标志

- <span style="color: blue">g:表示全局(global)模式，即模式将被应用与所有字符串，而非在发现第一个匹配项时立即停止</span>
- <span style="color: blue">i:表示区分大小写(case-innsensitive)模式，即确定匹配项时忽略模式和字符串的大小写；</span>
- <span style="color: blue">m: 表示多行(multiline)模式，即在到达一行文本末尾时还会继续查找下一行中是或否存在与模式匹配项</span>

如果多个标志同时使用，则写成：gmi

正则表达式的创建有两种方式: new RegExp(expresson)和字面量

```js
// 使用直接字面量创建
var exp1 = /(^\s+)|(\s$)/g
// 使用RegExp对象创建
var exp2 = new RegExp('(^\\s+)|(\\s+$)', 'g')
```
exp1和exp2是两个完全等价的正则表达式，需要注意的是，传递给RegExp构造函数的两个参数都是字符串，不能把正则表达式字面量传递给RegExp构造函数

与其他语言中的正则表达式类似，模式中使用的元字符都必须转义，正则表达式中的元字符包括
```js
( [ { \ ^ $ | ? * + . } ] )
```
这些元字符在正则表达式中的都有一种或多种特殊用途，因此如果想要匹配字符串中包含的这些字符，就必须对他们进行转义

```js
var exp = /\.docx/gi;
```
<span style="color: red">**由于RegExp构造函数的模式参数是字符串，所以在某些情况下要对字符串进行双重转义。所有元字符都必须双重转义**，那些已经转义过的字符也是如此</span>

```js
// 对\.再次转义
var exp = new RegExp('\\.docx', 'gi');

// 匹配\n
var exp1 = /\\n/g; // 对\n中的\转义
var exp2 = new RegExp('\\\n', 'g'); // 对 \\n 再次转义
```

## () [] {}
()的作用是提取匹配的字符串。表达式中有几个()就会得到几个相应的匹配字符串。比如(\s+)表示连续空格的字符串

[]是定义匹配的字符范围。比如【a-zA-Z0-9】表示字符文本要匹配引文字符和数字

{}一般用来匹配的长度，比如\d{3}表示匹配三个数字, \d{1,3}表示匹配1~3个数字，\d{3,}表示匹配3个以上数字

## ^ $

^匹配一个字符的开头，比如(^a)就是匹配以字母a开头的字符串

$匹配一个字符的结尾，比如(b$)就是匹配以字母b结尾的字符串

<span style="color: red">**^还有另一个作用就是取反，比如[^xyz]表示匹配的字符串不包含xyz**</span>

**注意问题**

> 如果^出现在[]中一般表示取反，而出现在其他地方则匹配字符串的开头

^和$配合可以有效匹配完整字符串

```js
/d+/.test('4xpt'); // true - 部分匹配成功
/^\d+$/.test('4xpt'); // false - 完整匹配失败
```

## \d \s \w .

\d 匹配一个非负整数，等价于[0, 9]

\s 匹配一个空白字符

\w 匹配一个英文字母或数子 等价于【0-9a-zA-Z】
. 匹配除换行符意外的任意字符，等价于[^\n]

## \* \+ \?

\* 表示匹配前面元素0次或多次，比如 (\s*) 就是匹配0个或多个空格

\+ 表示匹配前面元素1次或多次，比如 (\d+) 就是匹配由至少1个整数组成的字符串

\? 表示匹配前面元素0次或1次，相当于{0,1} ，比如(\w?) 就是匹配最多由1个字母或数字组成的字符串 

## $1 1

$1-$9存放着正则表达式中最近的9个正则表达式的提取结果，这些结果按照子匹配的出现顺序一次排列。基本语法是：RegExp.$n，这些属性是静态的，除了replace中第二个参数可以省略RegExp之外，其他地方都要加上RegExp.
```js
// 调用RegExp访问
/(\d+)-(\d+)-(\d+)/.test('2016-03-26') 

RegExp.$1 // 2016
RegExp.$2 // 03
RegExp.$3 // 26
 
//在replace中使用
'2016-03-26'.replace(/(\d+)-(\d+)-(\d+)/,'$1年$2月$3日') 
// 2016年03月26日

```
<span style="color: red">**\1表示后向引用，是指正则表达式中，从左往右数，第1个()中的内容，以此类推，\2表示第2个()，\0表示整个表达式**</span>
```js
//匹配日期格式，表达式中的\1代表重复(\-|\/|.)
varrgx = /\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}/
 
rgx.test('2016-03-26')// true 
 
rgx.test('2016-03.26')// false
```
>  两者的区别是：\n 只能用在表达式中，而 $n 只能用在表达式之外的地方。 

## test 与match
前面的大都是JS正则表达式的语法，而test则是用来检测字符串是否匹配某一个正则表达式，如果匹配就会返回true,反之则返回false
```js
/\d+/.test('123') // true

/\d+/.text('abc'); // false
```
match是获取正则匹配的结果，以数组的形式返回
```js
'186a619b28'.match(/\d+/g);// ['186', '619', '28'] 
```

## replace
replace本身是JavaScript字符串对象的一个方法,它允许接收两个参数
```js
replace(RegExp[string], [string|Function])
```
1. 参数1 可以是一个普通的字符串或是一个正则表达式
2. 参数2 可以是一个普通字符串或是一个回调函数

如果第1个参数是RegExp,JS会先提取RegExp匹配的结果，然后用第2个参数逐一替换匹配出的结果

如果第2个参数是回调函数，每匹配到一个结果就回调一次 每次回调都会传递一下参数

> result:本次匹配结果
> $1...$9：正则表达式中有几个()，就会传递几个参数，$1~$9分别代表本次匹配中每个()提取的结果，最多9个
> offset：记录本次匹配的开始位置
> source:接受匹配的原始字符串

## 经典案例

### 实现字符串的trim函数，去除字符串两边的空格
```js
String.prototype.trim = function() {
    // 方式一：将陪陪到的每个结果都用''替换
    return this.replace(/(^\s+)|(\s+$)/, function() {
        return ''
    });
     
    // 方式二：和方式以原理相同
    return this.replace(/(^\s+)|(\s+$)/, '');
}
```
^\s+表示以空格开头的连续空白字符， \s+$表示以空格结尾的连续空白字符，加上()就是将匹配到的结果提取出来，由于是|的关系，因此这个表达式会match到两个结果集，然后执行两次替换

```js
String.prototype.trim = function() {
    /**
     * @param rs：匹配结果
     * @param $1:第1个()提取结果
     * @param $2:第2个()提取结果
     * @param offset:匹配开始位置
     * @param source：原始字符串
     */
    this.replace(/(^\s+)|(\s+$)/g, function(rs, $1, $2, offset, source){
        // arguments中的每个元素对应一个参数
        console.log(arguments);
    });
}
' abcd '.trim();
 
输出结果：
 
[' ',' ', undefined, 0,' abcd ']// 第1次匹配结果
[' ', undefined,' ', 5,' abcd ']// 第2次匹配结果
```

### 提取浏览器url中的参数名和参数值，生成key/value的对象

```js
function getUrlParamObj() {
    var obj = {};
    // 获取url的参数部分
    var params = window.location.search.substr(1);
    // [^&=]+ 表示不含&或=的连续字符，加上()就是提取对应字符串
    params.replace(/([^?&=]+)=([^&=]*)/gi, (rs, $1, $2) => {
        obj[$1] = decodeURLComponent($2);
    })
    return obj;
}
```

### 在字符串指定位置插入新字符串
```js
String.prototype.insetAt = function(str, offset) {
    offset = offset + 1;
    var reg = new RegExp(`(^.{${offset}})`);
console.log(reg)
    return this.replace(reg, '$1'+ str)
}
'abcd'.insetAt('xyz',2);
```
## 常用正则
```js
// ip
var re = /(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))/

```
[正则表达式验证IPV4地址功能实例分析](https://www.jb51.net/article/102462.htm)


## 资料
[JavaScript正则表达式精简](https://www.cnblogs.com/onepixel/p/5218904.html)

[正则表达式30分钟入门教程](https://deerchao.cn/tutorials/regex/regex.htm)

[cookie与正则表达式](https://www.cnblogs.com/solaris-wwf/p/11628554.html)

[常用的正则](https://www.williamlong.info/archives/433.html)


[30分钟教程](https://luke0922.gitbooks.io/learnregularexpressionin30minutes/content/chapter18.html)