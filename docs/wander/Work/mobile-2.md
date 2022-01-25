---
autoGroup-1: 移动端
title: vue页面自定义滑动
---

### vue页面自定义滑动 

```
<div class="pop" @touchmove.prevent>
    <div class="layout" @touchstart="onTouchStart" @touchmove="onTouchMove"></div>
</div>

onTouchStart(e) {
    if (e.touches.length > 1) {
        return;
    }
    this.touchStart = e.touches[0].clientY;
    this.scrollStart = this.$refs.listCon.scrollTop;
},
onTouchMove(e) {
    if (e.touches.length > 1) {
        return;
    }
    const currentY = e.touches[0].clientY;
    this.$refs.listCon.scrollTop = this.scrollStart + this.touchStart - currentY;
}
```