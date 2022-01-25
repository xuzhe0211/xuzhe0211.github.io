---
autoGroup-1: 移动端
title: 用户多次点击页面出动滑动页面的问题
---

### 用户多次点击页面出动滑动页面的问题 

```
let iLastTouch = null;
/* 阻止用户双击使屏幕上滑 */
document.body.addEventListener('touchend', (event) => {
    const iNow = new Date().getTime();
    iLastTouch = iLastTouch || iNow + 1 /** 第一次时将iLastTouch设为当前时间+1 */ ;
    const delta = iNow - iLastTouch;
    if (delta < 500 && delta > 0) {
        event.preventDefault();
        return false;
    }
    iLastTouch = iNow;
}, false);
```