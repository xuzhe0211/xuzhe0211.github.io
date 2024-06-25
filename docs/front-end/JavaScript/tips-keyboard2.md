---
autoGroup-16: Tips/方法实现
title: javascript判断元素是否已经focus
---
## focus()函数作用
focus()是获得焦点事件。

当一个文本框获得焦点时，它里面的文本就像“百度一下”首页上的百度搜索输入框那样会被自动选中，这样的操作可以利用onfocus来实现。
以下的文本框，当鼠标指针移过去时，里面的文字全部被选中：

这是怎么做的呢？看以下代码及解释：

```html
<input type="text" name="url" value="" size="200" maxlength="255" onmousemove="this.focus();this.select();"> 
```

以上代码,input标签内嵌入了onmousemove(鼠标指针经过)事件的JS语句，其等号后面的this.focus()意为其自身获得焦点；获得焦点的标志是该文本框内将出现输入光标，但要让其内的文字全部被选中，我们还得用上this.select()语句，它的意思就是选中全部文本框里的文字。

## 判断元素是否已经focus
<span style="color: blue">document.activeElement属性始终会引用DOM中当前获得了焦点的元素</span>。元素获得焦点的方式有用户输入(通常是按Tab键)、在代码中调用focus()方法和页面加载。先来看个小例子
```html
<input id="btn" type="button" value="百度一下">
```

```js
window.onload = function() {
  var btn = document.getElementById('btn');

  // 页面加载获取焦点
  alert(document.activeElement.id); // body

  // 调用focus()方法获取焦点
  btn.focus();

  alert(document.activeElement.id); // id
}
```
## 扩展
HTML5除了新添加 document.activeElement属性外，还添加了 document.hasFocus() 方法。这个方法用于确定文档是否获得了焦点，例如：
```js
window.onload = function() {
  var btn = document.getElementById('btn');
  btn.foucs();

  alert(document.hasFocus())
}
```



[javascript判断元素是否已经focus](https://blog.csdn.net/Dong_PT/article/details/51205960)