---
autoGroup-1: Css Tips
title: svg 在页面中的使用
---
## svg 修改颜色
- svg 标签直接在页面中

    ```css
    svg {
        fill: currentColor; // currentColor为css变量，自动读取当前元素颜色
    }
    ```
- 通过img引入的svg 文件

    此时css对svg文件无法生效，此时要用到css3滤镜filter中的drop-shadow,通过生成一个可指定颜色的阴影放置于svg位置，并将原始svg移出视线
    ```html
    <template>
        <img src="img/success.svg">
    </template>
    <style>
        img {
            position: relative;
            left: -80px;
            filter: drop-shadow(#fff 80px 0)
        }
    </style>
    ```
    > 备注：drop-shadow可用于png图片变色