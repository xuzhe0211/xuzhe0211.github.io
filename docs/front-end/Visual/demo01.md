---
autoGroup-1: demo
title: 旋转动画
---

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset='utf-8'>
        <title>Title</title>
        <style>
            canvas {
                border: 1px solid red;
            }
        </style>
    </head>
    <body>
        <canvas id="cvs" width="500px" height="500px"></canvas>
        <script>
            let cvs = document.getElementById('cvs');
            let ctx = cvs.getContext('2d');
            // 在100， 100点的位置绘制一个宽高50 50的选择矩形

            // 第一种
            // let baseRadian = 0;
            // setInterval(function() {
            //     // 防止图形飞走，所以先把当前坐标轴的状态保存起来
            //     ctx.save();

            //     // 清除上一次的矩形
            //     ctx.clearRect(0, 0, cvs.width, cvs.height);
            //     //平移到矩形中心
            //     ctx.translate(125, 125);
            //     // 旋转坐标系
            //     ctx.rotate(baseRadian += Math.PI / 180 * 4);
            //     // 绘制图形
            //     ctx.fillRect(-25, -25, 50, 50);
            //     // 平移旋转之后，回滚到最初的坐标轴状态
            //     ctx.restore();
            // }, 50)
            
            // 做法2
            // 先统一平移到矩形的中心
            ctx.translate(125, 125); // 矩形中心125， 125
            // 基于这个中心不断绘制旋转矩形
            setInterval(function() {
                // 清除上一次的矩形
                ctx.clearRect(-50, -50, cvs.width, cvs.height);
                // 旋转坐标系
                ctx.rotate(Math.PI / 180 * 4); // 选择叠加(在之前选择的基础上在选择)；

                // 绘制图形
                ctx.fillRect(-25, -25, 50, 50)
            }, 50)

            // ctx.fillStyle = '#fb0606';
            // ctx.font = '12px bold 宋体';
            // ctx.fillText('旋转矩形', 0, 0)
        </script>
    </body>
</html>
```