---
autoGroup-16: Tips/方法实现
title: js中addEventListener中第3个参数
---

```
<div id="id1" style="width: 200px;height: 200px; position:absolute;top:100px;left: 100px;background-color:blue; z-index: 4">
    <div id="id2" style="width: 200px;height: 200px;position:absolute;top: 20px;left:70px;background:green; z-index:1">
</div>
```
addEventListener中的第三个参数是useCapture,一个bool类型。当为false时为冒泡获取(由里向外)，true为capture方式(由外向里)

```
document.addEventListener('id1').addEventListener('click', function() {console.log('id1')}; false);

document.addEventListener('id2').addEventListener('click', function() {console.log('id2')}, false);
```

点击id2的结果是id2, id1

```
document.getElementById('id1').addEventListener('click', function() {console.log('id1')},true);

document.getElementById('id2').addEventListener('click', function() {console.log('id2')}, true);
```
结果是id1, id2;

**DOM方法addEventListener()和removeEventListener()是用来分配和删除事件的函数**。这两个方法都需要三个参数，分别为事件名称(String)、要触发的事件处理函数(Function)、指定事件处理函数的时期或阶段(boolean)。

DOM事件流如图

![DOM事件流如图](./images/110857551929664.png)

当第三个参数设置为true就在捕获过程中执行，反之就在冒泡过程中执行处理函数

