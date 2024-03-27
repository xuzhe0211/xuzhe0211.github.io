---
autoGroup-13: ES6
title: 告别复制粘贴的黑暗时代！教你们一个新崛起的API
---
在前端开发的世界里，复制粘贴功能就像是那个总是被忽视，却在关键时刻能救你一命的老朋友。我们习惯用了那些古老的
```js
document.execCommand('copy')
```
来实现这一功能，但时代在进步，技术在更新，是时候告别那些让人头疼的兼容性问题，迎接新时代的剪贴板API了。

## 旧时代遗物
在那个遥远的时代，我们为了实现复制粘贴功能

- 😈 不得不创建一个神秘的 textarea 元素
- 😈 然后让它隐性(通过CSS隐形)
- 👹给它赋予力量（设置值）
- 🎃 将它召唤到页面的某个角落，然后通过古老的仪式(调用select方法和execCommand)
- 👻 最后在一切完成之后，让它小时在历史的长河中(移除元素)。

代码如下
```js
// 创建一个临时的 textarea 元素
const textarea = document.creatElement('textarea');
// 设置 textarea 的内容
textara.value = inputElement.value;
// 防止在页面上显示textarea
textarea.setAttribute('readonly', '');
textarea.style.position = 'absolute';
textarea.style.left = '-999px';

// 将 textarea 添加到页面中
document.body.appendChild(textarea);
// 选中 textarea 的内容
textarea.select();
// 尝试执行复制操作
const success = document.execCommand('copy');
// 移除 textarea 元素
document.body.removeChild(textarea);
// 根据复制操作的成功与否给出提示
if (success) {
    alert('复制成功！');
} else {
    alert('复制失败，请手动复制。');
}
```
这个过程虽然繁琐，但在当时，它是我们唯一的选择。
## 新的使者