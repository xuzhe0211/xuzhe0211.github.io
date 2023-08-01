---
autoGroup-1: HTML知识卡片
title: 鲜为人知的HTML属性，助你提升效率
---

## Accept
描述允许输入的文件类型
```
<input type="file" accept=".jpg, .png">
```
仅与&lt;input&gt;标记的文件类型一起使用。接受一种或多重文件类型的逗号分割列表。要允许特定媒体类型的所有文件，请使用accept="image/*".

## autofocus
它表明特定元素应该专注于页面加载
```
<input type="text" autofocus>
```
文档或对话框中只有一个元素能具有autoFocus属性。如果需要应用于多个元素中，则会将第一个元素设置为焦点

## Inputmode
提示用户在编辑元素或其内容时可能输入的元素类型
```
<input type="text" inputmode="url" />
<input type="text" inputmode="email" />
<input type="text" inputmode="numeric" />
```
它允许浏览器显示是当的虚拟键盘

## Pattern
指定在表单提交时检查&lt;input&gt;值的正则表达式。
```
<input name="username" id="username" pattern="[A-Za-z0-9]">
```
## Required
确保在提交表单前必须填写元素
```
<form action="/send_form.js">  
Username: <input type="text" name="username" required>  
<input type="submit">  
</form>
```
## Autocomplete
指定浏览器是否有权提供帮助以填写电子邮件、电话号码、国家/地区等表单字段
```
<input name="credit-card-number" id="credit-cart-number" autocomplete="off">
```
:::tip
有关可用自动完成值的完整列表，请参阅 MDN 参考：https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
:::

## Multiple
该属性允许用户选择多个值。
```
<input type="file" multiple>
```
我们可以将它与 &lt;input&gt; 和 &lt;select&gt; 标记的文件和电子邮件类型一起使用。

## Contenteditable
**该属性允许用户编辑元素的内容**
```
<div contenteditable="true"> This text can be edited by the user </div>
```

::: danger
input有change事件，当内容改变时会触发change事件
如果给div、span等标签添加了contenteditable属性，那么他们就拥有input行为，可以编辑文本，但是不能添加change事件，因为div、span没有change事件
这里需要给div、span添加keyup事件来简介的实现change事件，这里没有keydown事件，因为keydown事件触发后，div、span的内容还没有改变。
在IE中table的td标签使用contenteditable，没有效果，可以通过向里面添加还有contenteditable属性的div、span来实现

onblur应该也可以实现？
:::

[contentEditable 中光标控制](/front-end/JavaScript/tips-contenteditable.html)
## Readyonly
指定输入字段是只读的
```
<input type="text" id="sports" name="sports" value="golf" readonly>
```
用户仍然可以选择它、突出显示它并从中复制文本。要禁止这些操作，请改用 disabled 属性。

## Hidden
指定元素是否可见
```
<p hidden>This text is hidden</p>
```
## Spellcheck
定义是否检查元素的拼接错误
```
<p contenteditable="true" spellcheck="true">Myy spellinng is checkd</p>
```
通常，不会检查所有不可编辑的元素，即使 spellcheck 属性设置为 true 并且浏览器支持拼写检查。

## Translate
指定页面本地化时是否应翻译元素
```
<footer><p translate="no">Printing Works, Inc</p></footer>
```

## Loading
指定浏览器是应该立即加载图像还是推迟加载屏幕外图像，例如，直到用户滚动到它们附近。
```
<img src="https://cdn.mysite.com/media/image.jpg" loading="lazy">
```
eager 是默认行为，lazy 用于延迟（也称为延迟加载）。

## Onerror
如果未加载原件，则允许添加备用图像
```
<img src="imageafound.png" onerror="this.onerror=null;this.src='imagenotfound.png';"/>
```
如果后备图像本身不可用，this.onerror = null 用于防止循环

## Poster
允许在下载视频时添加要显示的图像(其实就是视频封面)
```
<video src="https://cdn.mysite.com/media/video.mp4"poster="image.png"></video>
```
如果未指定，则在第一帧可用之前不显示任何内容，然后，第一帧显示为张贴帧。

## Controls
指定是否应在播放器上显示音频/视频控件。
```
<audio controls<source src="track11.mp3"  type="audio/mpeg"></audio>
```
## Autoplay
确保音频/视频在加载后立即自动开始播放。
```
<video autoplaysrc="https://cdn.mysite.com/media/myvideo.mp4"poster="image.png"></video>
```
## Loop
指定音频/视频将在每次完成时重新开始
```
<audio loop<source src="track323.mp3"  type="audio/mpeg"></audio>
```

## Cite
指向内容的来源、更改或删除的参考点
```
<blockquote cite="https://mysite.com/original-source-url">  
<p>Some awesome quote</p>
</blockquote>
```
## Datetime
它指定删除/插入问题的日期和时间
```
<p>  My plans for 2021 include visiting Thailand,  
<del datetime="2021-01-01T18:21">creating 6 courses,</del>   
<ins datetime="2021-02-02T14:07">writing 12 articles.</ins>
</p>
<p>I will evaluate the completion on 
<time datetime="2021-12-31">
</time>.</p>
```
当与 &lt;time&gt; 元素一起使用时，它表示机器可读格式的日期/时间。

## Async
确保脚本与页面的其余部分异步执行。
```
<script src="script.js" async></script>
```
async 属性只对外部脚本有影响（src 属性必须存在）。

## Defter
确保在页面完成解析后执行脚本。
```
<script src="script.js" defer></script>
```
defer 属性只对外部脚本有影响（src 属性必须存在）。

## Draggable
指定元素是否可拖动
```
<script>
const allowDrop = (e) => e.preventDefault();
const drag = (e) => e.dataTransfer.setData("text", e.target.id);
const drop = (e) => {  var data = e.dataTransfer.getData("text");  
e.target.appendChild(document.getElementById(data));}
</script>
<div ondrop="drop(event)" ondragover="allowDrop(event)" style="width:150px; height:50px; padding: 10px; border:1px solid black"></div>
<p id="drag" draggable="true" ondragstart="drag(event)">Drag me into box</p>
```

## 资料
[原文](https://mp.weixin.qq.com/s/JF85U09asoy8zwpY2eMVCQ)