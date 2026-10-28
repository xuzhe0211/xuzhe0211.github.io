---
title: css 新特性 2025
category:
  - 前端技术
tag:
  - css
  - 前端
---

下面重点介绍几个实用价值比较高的特性
## :has()--父选择器
终于可以告别"父选择器缺失"的时代！has()让你能够根据子元素的存在来选中父元素
```css
/* 为包含错误提示的表单控制件添加红色边框 */
.form-group:has(.error) {
    border:1px solid red;
}
```
支持情况：Chrome 105+、Safari 15.4+、Edge 105+、Firefox 121+

## aspect-ratio 固定宽高比
轻松实现元素宽高逼里控制，告别传统的 padding hack!
```css
.video {
    width: 100%;
    aspect-ratio: 16/9;
    background: #ddd;
}
```
支持情况:所有主流浏览器均已支持

## scroll-behavior 平滑滚动
让页面滚动更加优雅流畅
```css
html {
    scroll-behaior: smooth;
}
```
支持情况：所有浏览器均已支持

## backdrop-filter 毛玻璃效果
为元素背景添加精美的滤镜效果
```css
.modal {
    background-filter:blur(8px);
}
```
支持情况：所有主流浏览器均已支持

## css 原生嵌套
写法接近Sass,让CSS代码更加模块化
```css
.card {
    padding: 1rem;

    & h2 {
        font-size: 1.25rem;
    }

    &:hover {
        background: #f0f0f0;
    }
}
```
支持情况：Chrome 112+、Safari 16.5+、Firefox 117+

## 新的视口单位 lvh/svh/dvh
完美解决移动端100vh被地址栏遮挡的痛点

单位| 含义| 用途
---|---|---
lvh | Large viewport height | 最大视口高度
svh | Small viewport height | 最小视口高度
dvh | Dynamic viewport height | 动态视口高度

```css
.hero {
    height: 100dvh; /* 始终与当前可视区域高度一致 */
}
```
支持情况：Chrome 108+、Safari 15.4+、Firefox 111+

## text-wrap:balance 智能文本平衡
让多行文换行更美观，避免出现"一行过长、一行过短"的情况：
```css
h1 {
    text-wrap: balance;
}
```

## subgrid 子网格布局
子元素可以继承父网格的轨道定义，实现更精确的布局控制
```css
.parent {
    display: grid;
    grid-template-columns: 1fr 2fr;
}
.child {
    display: grid;
    grid-template-columns: subgrid; /**继承副网格的列定义 */
}
```
支持情况：Firefox 最早支持；Chrome 117+、Safari 16.2+ 也已支持

## color-scheme 系统主题适配
让浏览器自动适配系统的深浅色模式：
```css
:root {
    color-scheme:ligth dark
}
```
所有浏览器均已支持

## light-dark() 主题色快捷函数
根据当前颜色模式自动选择对应的颜色值
```css
body {
    background: light-dark(#fff, #000);
}
```
支持情况：Chrome 120+、Safari 16.4+、Firefox 123+

## 实验性新特性
### shape() 灵活形状定义
```css
.image {
  clip-path: shape(circle at center, 50%);
}
```
### if() css条件判断
```css
.box {
    width: if(var(--wide) = true, 400px, 200px);
}
```


[相关](/articles/front-end/engineering/flexible2.html)