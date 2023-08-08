---
autoGroup-0: 正则
title: JavaScript 中多语言的正则匹配
---
JavaScript里使用Unicode编码字符串。Unicode是一种可变长度的编码类型,大部分时候，它用两个字节表示一个字符，大部分常见字符都在这65536的范围内。一些少见字符，比如各种语言文字、emoji，则会用到4个字节

以前我们用正则校验字符串的时候，可以用/[a-zA-Z0-9]/检查字符，这样对英文和数字没问题，但不能匹配中文。如果要匹配中文和中文标点，可以用
```js
/[\u4E00-\u9FCC\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]+/g
```
ES2018之后,我们可以使用Unicode属性\p{...}来匹配某一个类型的字符串，配合 /u 标记，就可以方便的匹配多字节字符串了

在匹配多语言文字时，可以传入 Script 参数，达到非常高效且简便的写法。比如中文，就是,就是 \p{sc=Han},上面那么长的穷举(其实还没举完)正则只需要这么几个简单的字符就能替换，简单多了，对吧？借用写别人的例子
```js
let regexp = /\p{sc=Han}/gu; // return Chinese

let str = `Hello Привет 你好 123_456`;

alert(str.match(regexp));
```
我们还可以用这个属性来匹配俄文： \p{src=Cyrillic}。不过又去的是欧洲诸国文字多少还有些区别，除了我们最熟悉的英文 26 个字母，德文就有 ü、ö、ä，法文也有 ù，但它们都是拉丁文， \p{sc=Latin}，甚至土耳其文也是，只有俄文不一样。

Babel 也包含了对应的插件：[@babel/plugin-proposal-unicode-property-regex · Babel (babeljs.io)](https://babeljs.io/docs/babel-plugin-transform-unicode-property-regex)，在古早浏览器里可以转换成非 Unicode 形态，所以基本上可以放心使用。


## 资料
[JavaScript 中使用正则 `u` 标记匹配多语言](https://blog.meathill.com/js/javascript-use-regexp-flag-u-to-match-multiple-languges.html)

[Unicode: flag "u" and class \p{...}](https://javascript.info/regexp-unicode)

[Script (Unicode)](https://en.wikipedia.org/wiki/Script_(Unicode))