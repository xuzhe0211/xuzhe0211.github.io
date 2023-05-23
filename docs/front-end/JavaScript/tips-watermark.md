---
autoGroup-16: Tips/方法实现
title: 前端 水印 多个平铺
---
```html
<!-- HTML结构 -->
<div class="watermark-container">
  <div class="watermark">我的水印</div>
</div>

<style>
  /* CSS样式 */
  .watermark-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .watermark {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.5;
    font-size: 20px;
    transform: rotate(-45deg);
    transform-origin: center center;
    pointer-events: none;
  }
</style>

<script>
  // JS代码
  const watermarkStr = '我的水印'; // 水印内容
  const container = document.querySelector('.watermark-container');
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const watermarkWidth = 200; // 水印宽度
  const watermarkHeight = 100; // 水印高度
  const gapX = 50; // 水印之间的横向间隔
  const gapY = 50; // 水印之间的纵向间隔
  const rows = Math.ceil(containerHeight / (watermarkHeight + gapY)); // 行数
  const columns = Math.ceil((containerWidth + watermarkWidth) / (watermarkWidth + gapX)); // 列数

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const div = document.createElement('div');
      div.classList.add('watermark');
      div.innerText = watermarkStr;
      div.style.left = j * (watermarkWidth + gapX) + 'px';
      div.style.top = i * (watermarkHeight + gapY) + 'px';
      container.appendChild(div);
    }
  }
</script>
```
以上代码中，首先通过 CSS 定义了水印容器的样式和水印的基本样式。然后通过 JS 计算出需要平铺的水印数量以及它们的位置，并逐个创建添加到容器中。其中，每个水印使用 position: absolute 进行绝对定位，并通过 top 和 left 属性进行定位。同时还可以设置一些其他样式，如水印内容、字体大小、旋转角度等。

需要注意的是，这里的代码仅提供了一个简单的实现方式，如果需要更加复杂的水印效果，可以根据需求进行修改。