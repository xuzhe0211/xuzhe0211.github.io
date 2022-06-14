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
```