---
autoGroup-16: Tips/方法实现
title: 判断一个节点是否包含另一个节点
---

可用于点击document中其他位置弹窗消失

+ 第一种方法

```
function isChildOf(child, parent) {
    var parentNode;
    if (child && parent) {
        parentNode = child.parentNode;
        while(parentNode) {
            if (parent === parentNode) {
                return true;
            }
            parentNode = parentNode.parentNode;
        }
    }
    return false;
}
```

+ 直接调用js的contains

```
parent.contains(child); // true | false
```

### 例子

```
watch: {
    visibleVideo: {
        handler: 'handlerVisible',
        immediate: true
    }
},
methods: {
    handlerVisible(val) {
        if (val) {
            setTimeout(() => {
                document.addEventListener('click', this.handleBindClick, false);
            }, 1000);
        } else {
            document.removeEventListener('click', this.handleBindClick, false);
        }
    },
    handleBindClick(e) {
        if (this.$refs.videoPopup && this.$refs.videoPopup.contains(e.target)) {
            return false;
        }
        this.$emit('update:visibleVideo', false);
    }
}
```