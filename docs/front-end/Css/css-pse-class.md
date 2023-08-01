---
autoGroup-1: Css Tips
title: 9 个你不知道的 CSS 伪元素
---
CSS伪类是一项强大的功能，它允许您为所选元素的特定部分设置样式，而无需额外的Javascript代码。

虽然很多开发人员都熟悉常用的伪元素，如::before 和 ::after，但还有一些其他元素经常被忽视或未得到充分利用。

在本文中，我们将分享9个鲜为人知的CSS伪元素，他们可以增强你的的样坏死设置能力

## 1. ::selection 伪元素
::selection伪元素以用户选择的文本部分为目标。它提供了一种将样式应用于所选文本并自定义其外观的方法。

例子
```css
::selection {
    background-color: yellow;
    color: red;
}
```
在上面的代码中，当用户在页面上选择文本时,它将以黄色背景和红色文本颜色突出显示。

## 2. ::first-letter伪元素
::first-letter伪元素允许你设置块级元素的第一个字母样式。当你想将特殊格式应用于段落或标题的初始字符时，它会派上用场。

```css
p::first-letter{
    font-size: 2em;
    color: red;
}
```
在上面的代码片段中，每个段落的第一个字母将以更大的字体显示并显示为红色

## 3. ::first-line伪元素
类似于::first-letter, ::first-line伪元素以文本或块级元素的第一行为目标。你可以使用伪元素将特定样式应用于段落或标题的起始行
```css
p::first-line {
    font-weight: bold;
    text-decoration: underline;
}
```
在上面的代码中，每个段落的第一行将以粗体显示并带有下划线

## 4. ::marker伪元素
::marker伪元素以列表项的标记为目标，例如无序列表中的项目符号点或有序列表中的数字。使用此伪元素，您可以自定义标记的外观

```css
li::marker {
    color: blue;
    font-weight: bold;
}
```

## 5. ::placeholder伪元素
::placeholder 伪元素允许您在输入字段和文本区域中设置占位符文本的样式。通过将自定义样式应用到占位符，您可以增强用户体验并使其与您的整体设计保持一致

```css
input::placeholder {
    color: #999;
    font-style: italic;
}
```
在上面的代码中，输入字段中的占位符文件将以浅灰色和斜体字体样式显示

## 6. ::cue伪元素
::cue伪元素以 &lt;audio&gt; 或 &lt; video &gt; 元素的提示文本为目标。提示文本通常用于多媒体内容中的字幕或副标题。使用此伪元素，您可以将样式专门应用于提示文本。

```css
video::cue {
    color: white;
    background-color: black;
}
```
在上面的代码中，视频元素中的提示文本将具有白色文本颜色和黑色背景

## 7. ::grammar-error 和 ::spelling-error 伪元素
::grammar-error 和 ::spelling-error 伪元素允许您分别对标记语法或拼写错误的文本部分设置样式。当内容中存在错误时，这些伪元素可用于向用户提供视觉提示
```css

p::grammar-error {
  text-decoration: line-through;
  color: red;
}

p::spelling-error {
  text-decoration: underline;
  color: blue;
}
```
在上面的代码中，段落中的语法错误将以划线文本修饰和红色显示，而拼写错误将以下划线和蓝色显示。

## 8. ::backdrop 伪元素
::backdrop 伪元素于全屏API结合使用，以在全屏模式下自定义元素背后的背景。它允许您将默认的黑色背景更改自定义颜色或样式
```css
video::backdrop {
    background-color: gray;
}
```

## 9. ::target-text 伪元素
::target-text CSS伪元素代表滚动到的文本(如果浏览器支持文本片段).它允许作者选择如何突出显示该部分文本

```css
::target-text {
    background-color: rebeccapurple;
    color: white;
}
```
这是 MDN 提供的在线示例。请注意，此 API 目前处于试验阶段。



[9 个你不知道的 CSS 伪元素](https://mp.weixin.qq.com/s/tfuF7iUEQC_en_tx3pRBTA)