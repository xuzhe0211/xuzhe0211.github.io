---
autoGroup-11: 字符串方法
title: 字符串截取方法
---

## String.prototype.replace

### 1. 语法

::: danger
str.replace(regexp|substr, newSubStr|function)
:::

参数：

+ regexp：一个正则对象;
+ substr：将被替换的字符串；
+ newSubStr：替换的字符串；
+ function：用于创建新字符串的函数。

返回值：

替换后的新字符串。

### 2. 描述

描述即返回值。

> 个人在日常开发中常用场景：
>
> - 常用于替换模板。

### 3. 示例

+ defining the regular expression in replace

  ```js
  const str = 'Twas the night before Xmas...';
  str.replace(/xmas/i, 'Christmas'); // Twas the night before Christmas...
  ```

+ switch words in a string

  ```js
  const str = 'John Smith';
  str.replace(/(\w+)\s(\w+)/, '$2, $1'); // Smith, John
  ```

+ using an inline function that modifies the matched characters

  ```js
  function styleHyphenFormat(propertyName) {
    function upperToHyphenLower(match, offset, string) {
      return (offset > 0 ? '-' : '') + match.toLowerCase();
    }
    return propertyName.replace(/[A-Z]/g, upperToHyphenLower);
  }
  
  styleHyphenFormat('borderTop'); // border-top
  ```

### 补充说明
字符串stringObject的replace()方法执行的是查找并替换的操作。它将在stringObject中查找与regexp相匹配的字符串，然后用replacement来替换这些子串。如果regexp具有全局标识g，那么replace()方法将替换所有匹配的子串。否咋，它只替换第一个匹配的子串。

replacement可以是字符，也可以是函数。如果它是字符串，那么每个陪陪豆浆由字符串替换。但是replacement中$字符具有特定的含义。如下表所示，它说明从模式匹配得到的字符串将用韩语替换。

字符|替换文本
---|---
$1、$2、....、$99 | 与regexp中的第1到第99个子表达式相匹配的文本
$& | 与regexp相匹配的子串
&` | 位于匹配子串左侧的文本
&' | 位于匹配子串右侧的文本
$$ | 直接量符号。

<span style="color:red;font-weight:700">注意:</span>**ECMAScript v3规定,replace()方法的参数replacement可以是函数而不是字符串。在这种情况下，每个匹配都调用该函数，它返回的字符串将作为替换文本使用。该函数的第一个参数是匹配模式的字符串。接下来的参数是与匹配的子表达式匹配的字符串，可以有0个或多个这样的参数。接下来参数是一个整数，声明匹配在stringObject中出现的位置。最后一个参数是stringObject本身**


## String.prototype.slice

### 1. 语法

::: danger
str.slice(beginIndex[, endIndex])
:::

参数：

+ beginIndex：开始索引；
+ endIndex：结束索引，可选。

返回值：

从原字符串中提取出来的新字符串。

### 2. 描述

描述即返回值。

> 个人在日常开发中常用场景：
>
> - 冲用于切割字符串。

### 3. 示例

+ using slice to create a new string

  ```js
  const str = 'The morning is upon us.';
  str.slice(1, 8); // he morn
  str.slice(4, -2); // morning is upon u
  str.slice(12); // is upon us.
  str.slice(30); // ""
  ```

+ using slice with negative indexes

  ```js
  const str = 'The morning is upon us.';
  str.slice(-3);     // 'us.'
  str.slice(-3, -1); // 'us'
  str.slice(0, -1);  // 'The morning is upon us'
  ```



## String.prototype.split

### 1. 语法

::: danger
str.split([separator[, limit]])
:::

参数：

+ separator：分隔符；
+ limit：限定返回分割片段数量。

返回值：

分割后的数组。

### 2. 描述

描述即返回值。

> 个人在日常开发中常用场景：
>
> - 常用于格式化数据（字符串）。

### 3. 示例

+ removing spaces from a string

  ```js
  const names = 'Harry Trump ;Fred Barney; Helen Rigby ; Bill Abel ;Chris Hand ';
  const re = /\s*(?:;|$)\s*/;
  names.split(re); // ["Harry Trump", "Fred Barney", "Helen Rigby", "Bill Abel", "Chris Hand", ""]
  ```

+ returning a limited number of splits

  ```js
  const myString = 'Hello World. How are you doing?';
  myString.split(' ', 3); // ["Hello", "World.", "How"]
  ```

+ splitting with a RegExp to include parts of the separator in the result

  ```js
  const myString = 'Hello 1 word. Sentence number 2.';
  myString.split(/(\d)/); // [ "Hello ", "1", " word. Sentence number ", "2", "." ]
  ```



## String.prototype.substring

### 1. 语法

::: danger
str.substring(indexStart[, indexEnd])
:::

参数：

+ indexStart：开始索引；
+ indexEnd：结束索引。

返回值：

指定部分新字符串。

### 2. 描述

slice 弱化版。

> 个人在日常开发中常用场景：
>
> - 尚未使用过。

### 3. 示例

+ using substring

  ```js
  const anyString = "Mozilla";
  
  // 输出 "Moz"
  anyString.substring(0,3);
  anyString.substring(3,0);
  anyString.substring(3,-3);
  anyString.substring(3,NaN);
  anyString.substring(-2,3);
  anyString.substring(NaN,3);
  
  // 输出 "lla"
  anyString.substring(4,7);
  anyString.substring(7,4);
  
  // 输出 ""
  anyString.substring(4,4);
  
  // 输出 "Mozill"
  anyString.substring(0,6);
  
  // 输出 "Mozilla"
  anyString.substring(0,7);
  anyString.substring(0,10);
  ```

