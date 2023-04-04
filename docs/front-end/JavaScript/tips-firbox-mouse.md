---
autoGroup-16: Tips/方法实现
title: 火狐浏览器鼠标滚轮不生效
---
DOMMouseScroll在浏览器不生效，需要改为最新滚轮事件
```js
document.addEventListener('DOMMouseScroll', this.scrollFun, false); // 不生效
document.addEventListener('wheel', this.scrollFun, false); // 改为这个
```
