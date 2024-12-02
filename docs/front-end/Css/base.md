---
title: base.css
---

```css
html {
    -webkit-text-size-adjust: none;
    background: #4728ef;
    overflow-x: hidden
}

a,article,aside,body,div,em,footer,form,h1,h2,h3,h4,h5,h6,header,html,i,img,label,li,menu,nav,ol,p,section,span,ul {
    margin: 0;
    padding: 0;
    vertical-align: baseline;
    border: 0;
    font-size: 100%;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    outline: 0
}

body {
    width: 100%;
    height: 100%;
    font-family: PingFang SC,Helvetica Neue,Helvetica,Arial,sans-serif;
    line-height: 150%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: #fff;
    overflow-x: hidden
}

li {
    list-style: none
}

a img {
    border: 0
}

em {
    font-style: normal
}

em,h1,h2,h3,h4,h5,h6 {
    font-weight: 400
}

a {
    color: red
}

article,aside,footer,header,nav,section {
    display: block
}

.hide {
    display: none!important
}

.show {
    display: block!important
}

.center {
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center
}

.center,.justify {
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center
}

.justify {
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between
}


/* 滚动条整体样式隐藏 */
::-webkit-scrollbar {
    display: none;
}
// textarea单独存在
.scroll-style::-webkit-scrollbar,
.scroll-style::-webkit-scrollbar:hover,
textarea::-webkit-scrollbar,
textarea::-webkit-scrollbar:hover {
    display: block;
    width: 3px !important; /* 宽度 */
    height: 3px !important; /* 高度 */
    border-radius: 3px;
    // background-color: rgba(144, 147, 153, 0.2);
}

/* 滚动条轨道 */
.scroll-style::-webkit-scrollbar-track,
textarea::-webkit-scrollbar-track {
    background: none; /* 轨道颜色 */
}

/* 滚动条滑块 */
.scroll-style::-webkit-scrollbar-thumb,
textarea::-webkit-scrollbar-thumb {
    border-radius: 3px;
    font-weight: 800;
    background: rgba(144, 147, 153, 0.2); /* 滑块颜色 */
}

/* 滚动条滑块在悬停时 */
.scroll-style::-webkit-scrollbar-thumb:hover,
textarea::-webkit-scrollbar-thumb:hover {
    background: rgba(144, 147, 153, 0.2); /* 悬停颜色 */
}

.scroll-style::-webkit-scrollbar-corner,
textarea::-webkit-scrollbar-corner:hover {
    background-color: rgba(144, 147, 153, 0.2);
}
```