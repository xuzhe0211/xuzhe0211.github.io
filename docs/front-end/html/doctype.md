---
title: HTML &lt;!DOCTYPE&gt;声明
---

## 标签定义及使用说明

&lt;!DOCTYPE&gt;声明位于文档中的最前面位置，处于&lt;html&gt;标签之前。

&lt;!DOCTYPE&gt;声明不是一个HTML标签，它是用来告知Web浏览器页面使用了那种HTML版本。

在HTML4.01中，&lt;!DOCTYPE&gt;声明需引用DTD(文档类型声明)，因为HTML4.01是基于SGML.DTD指定了标记语言规则，确保了浏览器能够正确的渲染内容。

HTML5不是基于SGML的，因此不要求引用DTD。

**提示:**总是给您的HTML文档添加&lt;!DOCTYPE&gt;声明，确保浏览器能够预先知道文档类型
