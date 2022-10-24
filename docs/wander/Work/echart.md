---
autoGroup-2: 图表可视化
title: echart-svg
---

## 使用

```js
// 使用Canvas 渲染器(默认)
var chart = echarts.init(containerDom, null, {renderer: 'canvas'});
// 等价于
var chart = echarts.init(containerDom);

// 使用SVG渲染器(手机端推荐使用这种)
var chart = echarts.init(containerDom, null, {renderer: 'svg'});
```