---
autoGroup-12: 工程化知识卡片
title: 关于图片加载，你需要学习一下
---
## 设计思路
通过一个加载类，传入dom元素、props和emit。先创建出一个虚拟的image元素进行尝试加载,加载成功或失败都会进入下一步的函数，做出对应处理逻辑

## 初步设计
首先类中有一个加载的方法 loadCreateImg,代码如下
```js
class Load {
    constructor(node, props, emit) {
        this.node = node;
        this.props = props;
        this.emit = emit;
    }
    // 加载src
    loadCreateImg = () => {
        const newImg = new Image(); // 新建一个虚拟的img

        newImg.src = this.props.src; // 将传入的src赋值给虚拟节点

        // src加载失败

        // src加载成功
        
    }
}
```