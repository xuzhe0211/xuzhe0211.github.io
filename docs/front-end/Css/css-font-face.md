---
autoGroup-1: Css Tips
title: 真正了解@font face里font-weight的作用
---
我们这里只重点强调@font-face里font-weight，font-style的用法，因为我在使用@font-face时对这一块的使用根本不清楚，感觉网上好多人忽略了这个非常重要的地方。

@font face规则支持的CSS属性如下
```css
@font-face {
    font-family: 'example';
    src: url('example.ttf');
    font-style: normal;
    font-weigth: normal;
    unicode-range: U+0025-00FF;
    font-variant: small-caps;
    font-stretch: expanded;
    font-feature-settings："liga1" on;
}
```
我们常用的字体是下面这些
```css
@font-face {
  font-family: 'example';
  src: url(example.ttf);
  font-style: normal;
  font-weight: normal;
  unicode-range: U+0025-00FF;
}
```
font-weight 和 font-style 类似，不过是定义了不同字重使用不同字体，这个要比 font-style适用性强很多。我这里就有一个非常具有代表性的例子，版权字体"汉仪旗黑"字重非常丰富，但是这个字体不像』思源黑体『，天然可以根据font-weight属性值加载对应的字体文件，怎么办呢？很简单，使用@fontface规则重新定义一下即可，例如下面的CSS代码：
```css
@font-face {
    font-family: 'QH',
    font-weight: 400;
    src: local('HYQihei 40S');
}
font-face {
  font-family: 'QH';
  font-weight: 500;
  src: local('HYQihei 50S');
}
@font-face {
  font-family: 'QH';
  font-weight: 600;
  src: local('HYQihei 60S');
}
```
解读一下就是,是一个全新的字体，名为'QH',当字重font-weigth 为400的,使用"汉仪旗黑40S"字体，为500的时候，使用"汉仪旗黑 50S"字重字体，为600的时候，使用"汉仪旗黑 60S"字重字体

于是乎，当我们应用如下的CSS和HTML代码的时候

```css
.hy-40s,
.hy-50s,
.hy-60s {
  font-family: 'QH';
}
.hy-40s {
  font-weight: 400;
}
.hy-50s {
  font-weight: 500;
}
.hy-60s {
  font-weight: 600;
}
```
```html
<ul>
  <li class="hy-40s">汉仪旗黑40s</li>
  <li class="hy-50s">汉仪旗黑50s</li>
  <li class="hy-60s">汉仪旗黑60s</li>
</ul>
```





[真正了解@font face里font-weight的作用](https://blog.csdn.net/literarygirl/article/details/118194904)