---
autoGroup-1: Css Tips
title: css Image-rendering
---
## 图片等比例缩放后变模糊的问题处理

```
img {
    image-rendering: -moz-crisp-edges; /* Firefox */
    image-rendering: -o-crisp-edges; /* Opera */
    image-rendering: -webkit-optimize-contrast; /*Webkit (non-standard naming) */
    image-rendering: crisp-edges;
    -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
}
```

## Image-rendering

css属性image-rendering用于设置图像缩放算法。它适用于元素本身，适用于元素其他属性中的图像，也应用于子元素

举个例子，如果有一张尺寸为100*100px的图像，但作者将尺寸设置为200*200px(或者50*50px),然后，图片便会根据image-rendering指定的算法，缩小或者放大到新尺寸。此属性对于为缩放的图像没有影响

```
/* 专有属性值 */
image-rendering: auto;
image-rendering: crisp-edges;
image-rendering: pixelated;

/* 全局属性值 */
image-rendering: inherit;
image-rendering: initial;
image-rendering: unset;

```
- auto

    自 Gecko 1.9 （Firefox 3.0）起，Gecko 使用双线性（bilinear）算法进行重新采样（高质量）。

- smooth

    应使用能最大化图像客观观感的算法来缩放图像。特别地，会“平滑”颜色的缩放算法是可以接受的，例如双线性插值。这适用于照片等类型的图像。

- crisp-edges

    必须使用可有效保留对比度和图像中的边缘的算法来对图像进行缩放，并且，该算法既不会平滑颜色，又不会在处理过程中为图像引入模糊。合适的算法包括最近邻居（nearest-neighbor）算法和其他非平滑缩放算法，比如 2×SaI 和 hqx-* 系列算法。此属性值适用于像素艺术作品，例如一些网页游戏中的图像。

- pixelated

    放大图像时, 使用最近邻居算法，因此，图像看着像是由大块像素组成的。缩小图像时，算法与 auto 相同

- high-quality


## 应用
在做响应时布局时，img图片一般会加个style="width: 100%"进行缩放，但是无论放大还是缩小，图片都会变模糊，全局加上下面的代码，便可以治愈
```
img{
    image-rendering: -moz-crisp-edges; 
    image-rendering: -o-crisp-edges; 
    image-rendering: -webkit-optimize-contrast; 
    image-rendering: crisp-edges;
    ms-interpolation-mode: nearest-neighbor;
}
```

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/image-rendering)