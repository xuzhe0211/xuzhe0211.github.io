---
autoGroup-5: JS名词理解
title: GC-JavaScript 事件对内存和性能的影响
---

## 分析
<span style="color: red">事件处理程序本质上是一种函数，是一种对象，存放在内存中，设置大量的事件处理程序会使内存中的对象变多，Web程序的性能会变的越来越差，用户体验很不好</span>

## 事件委托
为了更好的利用好事件处理程序，便出现了事件委托，用来提升性能

:::tip
**事件委托**
事件委托(event delegation):把若干个子节点上的相同事件的处理函数绑定到它的父节点上去，在父节点上统一处理从子节点冒泡上来的事件，这种技术就叫做事件委托
:::

补充一下：事件委托并不局限于父节点与子节点之间。

也可以这样玩，比如页面文档中有多个处在不同位置的button，都是绑定click事件，使用事件委托，我们可以把这些个事件统一绑定到body元素，然后在进行处理(虽然一般很少这么用)。

## 举例
```html
<ul id="parent-list">
    <li id="list-1">List 1</li>
    <li id="list-2">List 2</li>
    <li id="list-3">List 3</li>
    <li id="list-4">List 4</li>
    <li id="list-5">List 5</li>
</ul>
```
现在有一个需求：就是无论点击上面的列表(ul)的哪个子列表(li)，都会弹出一个框，来显示我们点击了哪个子列表

现在有两种方案放在你眼前
- 为每个li子元素绑定click事件，然后设置处理函数
- 利用事件委托，为ul父元素绑定click事件，然后处理函数
```js
let list1 = document.getElementById('list-1');
list1.addEventListener('click', function() {
    alert(this.firstChild.nodeValue);
}, false)
var list2 = document.getElementById('list-2');
list2.addEventListener('click', function() {
  alert(this.firstChild.nodeValue);
}, false);
var list3 = document.getElementById('list-3');
list3.addEventListener('click', function() {
  alert(this.firstChild.nodeValue);
}, false);
var list4 = document.getElementById('list-4');
list4.addEventListener('click', function() {
  alert(this.firstChild.nodeValue);
}, false);
var list5 = document.getElementById('list-5');
list5.addEventListener('click', function() {
  alert(this.firstChild.nodeValue);
}, false);

// 方法二
let parentList = document.getElementById('parent-list');
parentList.addEventListener('click', function() {
    let target = event.target;
    if(target.nodeName.toLowerCase() === 'li') {
        alert(target.firstChild.nodeValue)
    }
}, false);
<span style="display:none"></span>
```
这里写几点方法二的优点
- <span style="color: red">减少访问DOM的次数，提升了性能</span>
- <span style="color:red">将子元素的事件处理程序统一绑定到其父元素，减少对内存的占用</span>
- <span style="color: red">可以更好的管理事件处理程序，比如移除对某个事件处理程序的引用</span>

> 注意：如果对各个子元素的需求不一样，我们可以这样改写方法二
```js
let parentList = document.getElementsById('parent-list');
parentList.addEventListener('click', function() {
    let target = event.target;
    if(target.nodeName.toLowerCase() === 'li') {
        switch(target.id) {
            case: 'list-1':
                alert('学的越多，越觉得自己无知');
                break;
            case: 'list-2':
                alert('爱是一种艺术');
                break;
            case: 'list-3':
                target.innerHTML = '呵呵，我改了哈';
                break;
            case: 'list-4':
                target.style.background = '#aaa';
                break;
            case: 'list-5':
                target.style.color = 'red';
                target.style.fontSize = '2em';
                break;
            default: 
                break;
        }
    }
}, false)
```
:::danger
**因为事件委托依赖事件冒泡机制，所以，并不是所有的事件都可以进行事件委托**
最适合采用时间委托的事件包括:click、mousedown、mouseup、keydown、keyup和keypress
:::

## 移除事件处理程序
事件处理程序存在于内存中，**每当将事件处理程序指定给元素时，运行中的浏览器代码与支持页面交互的Javascript代码之间就会建立一个连接**。这种连接越多，页面执行就越慢。前面所说的**事件委托就是用来限制建立的连接数量**

就是内存中那些使用完后不在使用的事件处理程序，如果不释放掉，也会影响web应用程序的内存和性能
```js
<button id="button">提交</button>

let button = document.getElementById('button');
button.onclick = function() {
    // 提交某个表单的操作代码
    button.onclick = null; // 移除事件处理程序
    event.target.firstChild.nodeValue = '提交中...'
}
```

::: danger
总的原则就是:**移除掉那些过时不在使用的事件处理程序，释放内存**
:::