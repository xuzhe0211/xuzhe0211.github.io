---
autoGroup-7: 浏览器
title: 你确定多窗口之间 sessionStorage 不能共享状态吗
---
## 背景
> 面试官：说一说 localStorage 和 sessionStorage 区别呗？

我：巴拉巴拉....

> 面试官: 那同域下多窗口间 localStorage 能共享吗？

我：可以呀,如果页面中出现了**串数据**的话，很大概率就是localStorage共享导致的呢？

> 面试官: localStorage既然可以，那sessionStorage在多窗口之间能共享状态码？

我：当然不行，每一个窗口之间 sessionStorage 都是独立的，相互不影响，窗口关闭浏览器就自动销毁了

> 面试官：你确定多窗口之间 sessionStorage 不能共享状态吗？？

我： <span style="color: red">这个.....不太确定....待我去查查资料再来....😭</span>

由此引出我们今天的主题： sessionStorage在同域下的多窗口之间能共享状态码？、

## 查阅文档
根据MDN的说法：<span style="color: blue">sessionStorage属性允许你访问一个，对应当前源的session Storage对象。它与localStorage相似，不同之处在于 localStorage 里面存储的数据没有过期时间限制，而存储在 sessionStorage 里面的数据在页面会话结束时会被清除</span>

1. 页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话
2. <span style="color: blue">**在新标签或窗口打开一个页面时会复制顶级浏览会话的上下文作为新会话的上下文**</span>，这点和session cookie的运行方式不同
3. 打开多个相同的URL的Tabs页面，会创建各自的 sessionStorage.
4. 关闭对应浏览器标签或者窗口，会清除对应的sessionStorage.

对于上面的说法，第134点相信都是符合大家认知的，那第二点是啥意思呢？

笔者为了搞懂第二点，接着继续查阅文档。。。

经过一系列的学习 (百度) 之后，笔者发现**如果从本页面以新开页签的方式打开一个同域下的新页面，新开的页面会和之前的页面 ‘共享’ sessionStorage**。

举个实际一点的例子: 现有页面A，在页面A中执行
```js
window.sessionStorage.setItem('pageA_1', '123')
```
在页面中有个button按钮,点击按钮触发 window.open('同源页面')， 现的到新开的页面B，在B中执行
```js
window.sessionStorage.getItem('pageA_1'); // 拿到的结果是「123」
```
这里的B页面居然是能拿到值的！！！！现在我终于能对面试官说：多窗口之间sessionStorage真的可以共享状态！！

> 此时面试官：在给你一次机会，好好组织下语言

## 真的这样吗？
哎，等等，如果真的能共享数据，那 sessionStorage 不是也会出现串数据的情况吗，我怎么记得平时并不会。。。

接下来我们继续测试，在页面A中继续执行
```js
window.sessionStorage.setItem('pageA_1', '456'); // 之前pagea_1  是123
window.sessionStorage.setItem('pageA_2', '789')
```
在页面B中再次尝试获取
```js
window.sessionStorage.getItem("pageA_1") //拿到的结果还是 "123" !!!
window.sessionStorage.getItem("pageA_2") //拿到的结果是 null !!!
```
wath？？？怎么回事，怎么现在又不共享了

我们现在再次回去理解一下MDN的说法：<span style="color: red">在该标签或者窗口打开一个新页面时会复制顶级浏览会话的上下文作为新会话的上下文</span>

哦， 原来如此，**原来只有在本页面中以新页签或窗口打开的同源页面会'临时共享'之前页面的sessionStorage**

而且共享这个词似乎也并不那么准确，准确来说应该叫 复制 更加专业

现在我终于我终于可以再次对面试官说： <span style="color: red; font-weight:bold">多窗口之间sessionStorage不可以共享状态！！！但是在某些特定场景下新开的页面会复制之前页面的sessionStorage</span>

## 总结
**其实不仅window.open("同源页面")这种方式新开的页面会复制之前的sessionStorage，通过a标签新开的页面同样也会，原理相同，在这就不赘述了。**


[原文](https://mp.weixin.qq.com/s/Nj_QEWn9C8qBMfNX3uYWfA)