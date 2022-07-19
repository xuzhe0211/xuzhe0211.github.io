---
autoGroup-4: 工程化
title: 打包报警告
---

## chunk chunk-common [mini-css-extract-plugin] Conflicting order.

[资料](https://blog.csdn.net/kaimo313/article/details/108539769)

## ASSET SIZE LIMIT 

[资料](https://www.freesion.com/article/8283813512/)

## SVG作为背景图片有缝隙
<span style="color: red">当将SVG图像用作页面正文的平铺背景时,这些平铺之间存在微小的间隙。如果我切换到该文件的PNG版本,则不会发生</span>

我正在使用最新版本的MAC版Google Chrome版本19.0.1084.56(很多移动端？).

经过一堆Google搜索后，我没有发现类似的报告

测试代码
```html
<!DOCTYPE html>
<html>
<head>
<title>SVG background test</title>
<style type="text/css">
body {
   background-color: #FFF;
   background-image: url(img/assets/background.svg);
   background-repeat: repeat;
}
</style>
</head>
<body>
</body>
</html>
```
### 答案
事实证明，这不仅发生在chrome上，而且在该浏览器中更加明显。正如我在上面发布的，这是解决方案：

在阅读了针对Chrome/SVG稍有不同的问题的解决方案后，我找到了答案。我在IIustrator中创建了SVG文件。显然我的画板/图像尺寸不是精确地像素。我是通过文本编辑器中打开SVG文件并查看文件顶部来发现这一点的。

```md
width="229.999px"  height="147.4256px"
```

我在iIIustator中打开了svg文件，并确保尺寸恰好是偶数像素。然后再次在文本文件中在此进行检查。更正的尺寸为：
```
width="230px" height="148px"
```
由于某种原因，仅编辑文本文件中的值对我不起作用，但再次说明，仅在Illustrator中修复比确定如何正确编辑svg文本文件要快。无论如何，现在我的瓷砖上没有缝隙了。希望这对其他人有帮助。


[css设置background-image，repeat,有缝隙](https://zhuanlan.zhihu.com/p/32118388)
