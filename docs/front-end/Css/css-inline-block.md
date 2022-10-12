---
autoGroup-1: Css Tips
title: 相邻的两个inline-block节点出现间隔的原因以及解决方法
---
## 产生间隔的原因
<span style="color: red">元素被当成行内元素排版的时候，原来HTML代码中的回车换行被转成一个空白符，当字体不为0的情况下，空白符占据一定宽度，所以inline-block的元素之间就出现了空隙</span>
```html
<style>
    .baba {
        display: inline-block;
        width: 200px;
        height: 100px;
        background: green;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }
    .son {
        display: inline-block;
        width: 50px;
        height: 50px;
        background: #dcdcdc;
    }
</style>
<body>
    <span class="baba">
        <span class="son"></span>
        <span class="son"></span>
        <span class="son"></span>
    </span>
</body>
```
![效果](./images/2019072313513925.jpg)

<span style="color: red">解决方案</span>

- 方法1: font-size
- 方法2：改变书写方式
- 方法3：使用margin负值
- 方法4：使用word-spacing或letter-spacing

## 资料
[相邻的两个inline-block节点出现间隔的原因以及解决方法](https://blog.csdn.net/limingxiaojie/article/details/96989561)