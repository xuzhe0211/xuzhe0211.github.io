---
autoGroup-1: Css Tips
title: CSS calc()函数的用法
---
css3的calc()函数允许我们在属性值中执行数学操作。

例如，我们可以使用calc()指定一个元素宽的固定像素值为多个数值的和
```css
.foo{
  width: calc(100px + 50px);
}
```
## 为什么是calc()
如果你使用过CSS预处理器,比如SASS，以上示例你或许碰到过
```css
.foo {
  width: 100px + 50px;
}

$width-one: 100px;
$width-two: 50px;
.bar {
  width: $width-one + $width-two;
}
```
然而，calc()函数提供了更好地解决方案。

首先，我们能够组合不同的单元。特别是，我们可以混合计算绝对单位(比如百分比与视口单元)与相对单位(比如像素)

例如，我们可以创造一个表达式，用一个百分比减掉一个像素值
```css
.foo {
  width: calc(100% - 50px)
}
```
本例中，<span style="color:red">.foo元素总是小于它父元素宽度50px</span>

第二，使用calc()，计算值是表达式它自己，而非表达式的结果。当使用css预处理器做数学运算时，特定值为表达式结果
```css
.foo {
    width: 100px + 50px;
}

.foo {
    width: 150px;
}
```
然而，浏览器解析的calc()的值为真实的calc()表达式
```css
.foo {
  width: calc(100% - 50px);
}

.foor {
  width: calc(100% - 50px)
}
```
这意味着浏览器中的值可以更加灵活，能够响应视口的改变。我们能够给元素设定一个高度为视口的高度减去一个绝对值，它将视口的改变进行调节。

## 使用calc()
calc()函数可以用来对数值属性执行四则运算，比如:&lt;length&gt;,&lt;frequency&gt;&lt;angle&gt;，&lt;time&gt;，&lt;number&gt; 或者 &lt;integer&gt; 数据类型。
```css
.foo {
  width: calc(50vmax + 3rem);
  padding: calc(1vw + 1rem);
  transform: rotate( calc(1turn + 28deg) );
  background: hsl(100, calc(3 * 20%), 40%);
  font-size: calc(50vw / 3);
}
```
## calc()嵌套
calc()函数可以嵌套。在函数里面，会被视为简单的括号表达式，
```css
.foo {
  width: calc(100% / calc(100px * 2))
}
```
函数的计算值如下
```css

.foo {
    width: calc( 100% / (100px * 2) );
}
```
## 降级方案
calc()已经得到普遍支持

对于不支持 calc() 的浏览器，整个属性值表达式将被忽略。不过我们可以对那些不支持 calc() 的浏览器，使用一个固定值作为降级方案。
```css
.foo {
    width: 90%; 
    width: calc(100% - 50px);
}
```
## 什么场景可以使用calc()
### 居中元素
使用calc()给我们提供另一种垂直居中方案
### 创建根栅格尺寸
### 清晰度


## 原文
[CSS calc()函数的用法](https://mp.weixin.qq.com/s/Jn7wl4doy1bUXpPrRa5fNA)