---
autoGroup-13: ES6
title: 告别复制粘贴的黑暗时代！教你们一个新崛起的API
category:
  - 前端技术
tag:
  - javascript
  - 前端
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
随着 navigator.clipboard API的诞生,我们终于可以告别那些复杂的仪式。这个API提供了两个强大的方法：writeText和readText。writeText方法允许我们异步的将文本写入剪贴板，而readText则可以读取剪贴板中的文本。这两个方法的使用非常简单，只需要几行代码，就可以实现复制和粘贴的功能

- 复制功能实现

    ```js
    const copyText = async text => {
        try {
            await navigator.clipboard.writeText(text);
            console.log('复制成功')
        } catch(err) {
            console.error('无法复制': err)
        }
    }
    ```
- 粘贴功能实现

    ```js
    const pasteText = async () => {
        try {
            const text = await navigator.clipboard.readText();
            console.log('粘贴功能:', err)
        } catch(err) {
            console.error('无法粘贴： ', err);
        }
    }
    ```

## 兼容性与挑战
Navigator 这种新 API 都是需要事先授予权限的，而权限是通过 Permissions API 获取的。这时候，我们需要用户明确授权。

虽然新API带来了便利，但它并不是万能的。在某些环境下，比如安卓的 WebView，我们可能会遇到权限问题。

> 注意 Permissions API 在安卓的 WebView 中是没实现的。很多小伙伴都容易在这里栽跟头

此时，为了兼容，我们可以在代码里加一个Permissions API的判断, 例如：

```js
if (navigator.clipboard && navigator.permissions) { 
    await navigator.clipboard.writeText(val) 
}
```

## 结语
随着技术的发展，我们有理由相信，未来会有更多简单、强大、兼容性更好的API出现。但在那之前，让我们拥抱navigator.clipboard，享受它带来的便利，同时也不忘那些曾经陪伴我们度过难关的老方法。毕竟，navigator.clipboard 在一些特别的情况下表现得不那么优秀，我们可以结合二者来实现一个，在各种情况下都通用的“复制粘贴”：
```js
const copyText = async val => {
    try {
        // 使用现在API尝试复制
        if(navigator.clipboard && navigator.permissions) {
            await navigator.clipboard.writeText(val);
            return; // 如果成功，直接返回
        }
         // 降级方案
        const textArea = document.createElement('textArea') 
        textArea.value = val 
        textArea.style.width = 0 
        textArea.style.position = 'fixed' 
        textArea.style.left = '-999px' 
        textArea.style.top = '10px' 
        textArea.setAttribute('readonly', 'readonly')
        document.body.appendChild(textArea) 
        textArea.select()

        // 尝试执行复制操作
        const success = document.execCommand('copy');
        if (!success) {
        throw new Error('无法复制文本');
        }

        // 清理
        document.body.removeChild(textArea);

    } catch(e) {
        console.log('复制失败', e)
    }
}
```