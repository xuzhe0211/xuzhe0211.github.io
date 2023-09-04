---
autoGroup-0: 基础知识
title: JS如何截取完整带表情的字符串
---
> 若字符串中出现一些特殊字符，我们改如何截取才能不糊先乱码呢？
## 前言
在以QQ和微信作为第三方登录的系统中，用户的昵称里经常会有表情等字符，比如这样的：非拉🍒非拉。如果项目中正好有个需要将用户昵称强行按照字符个数进行截断的需求，你会发现截取的字符串中会有乱码的现象。

以上面的用户昵称 非拉🍒非拉 为例，我们算下这个字符串的长度。

**因html编码的原因，在以下字符串和代码中，无法正常的显示出樱桃的图像，全部使用Y进行代替，测试时，请将Y替换为具体的樱桃符号**
```js
let nickname = '非拉Y非拉';
nickname.length; // 6
```
说明中间的表情字符占了2个字节的长度，如果单独输出 nickname[2] 或者 nickname[3] 时,均会输出乱码字符

> Javascript内部，字符以UTF-16的格式储存，每个字符固定位2个字节。对于那些需要4个字节存储的字符，Javascript会任务他们是两个字符

如果针对所有的昵称都要截取前3个字符时，该怎么截取呢？如果是中文、英文、数字、标点符号等常见字符，那么直接从3开始截取就行了，如果上面的那种有特殊符号的怎么办呢？

## Array.from方法
Array.from这个方法能够将类数组转换为真实的数组，比如NodeList，argument等，同样，也包括字符串
```js
Array.from(nickname); // ["非", "拉", "Y", "非", "拉"]
nickname.split(''); // ["非", "拉", "�", "�", "非", "拉"]
```
使用Array.from把nickname装换后，可以看到转换成一个真实的数组了，樱桃字符占了数组中的一个位置，然后按照数组中的方法截取在进行拼接即可，而使用split方法拆分，则还是乱码
```js
function truncated(str, num) {
    return Array.from(str).slice(0, num).join('');
}
truncated(nuckname, 3);// 非拉Y
```
## codePointAt()方法
> 在ES6之前，JS的字符串以16位字符编码(UTF-16)为基础，每个16位序列(相当于2个字节)是一个编码单元(code unit)，可简称为码元，用于表示一个字符。字符串所有的属性和方法(如length属性与charAt()方法等)都是基于16位序列

比如length方法、nickname[2]、split方法等操作，都会产生异常。为此在ES6中，加强了对Unicode的支持，并且扩展了字符串对象。

对于 Unicode 码点大于0xFFFF的字符，是使用4个字节进行存储。ES6 提供了codePointAt方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。
```js
// 获取樱桃的码点
'Y'.codePointAt(0).toString(); // 1f352

// 输出码点对应的字符
"\u{1f352}"; // Y
```
请注意： 在之前Unicode编码，均在[\u000-\uFFFF]之间，因此可以使用类似\u0047这样的编码；但是现在码点超过\uFFFF的界限，若再这样使用，则获取不到对应的字符。因此在ES6中，码点的字符放在中括号内，类似上面的格式（所有的码点均可以使用这种格式）：
```js
"\u{1f352}"; // Y
"\u{47}" // G
"\u{0047}" // G
```
<span style="color: red">那么久容易了: 判断需要截取的位置是否正好是4个字节的字符，如果是则延长以为截取，否则正常截取</span>

```js
function truncated(str, num){
    let index = Array.from(str)[num-1].codePointAt(0)>0xFFFF ? num+1 : num;
    return str.slice(0, index);
}
truncated(nickname, 3); // 非拉Y
```

### for-of
for-in 方法是遍历key值，for-of是遍历value值

```js
for(let k in arr){
    console.log(k); // 0 1 2
}

for(let v of arr){
    console.log(v); // a b c
}

for(let v of nickname){
    console.log(v); // 非 拉 Y 非 拉
}
```
利用这个功能，我们也能进行截取
```js
function truncated(str, num) {
    let s = '';
    for(let v of nickname) {
        s += v;
        num--;
        if(num <= 0) {
            break;
        }
    }
    return s;
}
truncated(nickname, 3)
```



## 资料
[JS如何截取完整带表情的字符串](https://www.xiabingbao.com/post/truncated/js-string-truncated.html)