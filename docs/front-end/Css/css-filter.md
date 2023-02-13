---
autoGroup-1: Css Tips
title: CSS3 filter(滤镜) 属性---页面变灰、毛玻璃
---
## CSS3 filter(滤镜) 属性---页面变灰、毛玻璃

- 毛玻璃
    ```css
    background-filter: saturate(180%) blur(20px);
    background-color: rgba(255, 255, 255, 0.72)
    filter: blur(5px);
    ```

某些属性跟原有的CSS中的属性十分相似，但有些浏览器为了提升性能，会通过filter提供硬件加速。

- 页面变成灰色

    ```css
    html {
        filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
        -webkit-filter: grayscale(100%);
    }
    ```

[CSS3 filter(滤镜) 属性](https://www.runoob.com/cssref/css3-pr-filter.html)

[CSS中的filter(滤镜)](https://blog.csdn.net/weixin_45663702/article/details/124824360)