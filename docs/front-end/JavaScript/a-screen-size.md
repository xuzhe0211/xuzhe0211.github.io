---
title: js获取整个屏幕尺寸
---

1. 获取屏幕宽度:window.screen.width; // 整个屏幕的宽度
2. 获取屏幕高度: window.screen.height; // 整个屏幕高度。
3. 获取可用工作区尺寸。

   获取屏幕可用工作区宽度:window.screen.availWidth; // pc端与上面两个一致，移动端除个别其他也一致

   获取屏幕可用工作区高度:window.screen.availHeight;

4. 获取body的宽高(不含边框)
    
   获取网页内body的宽度:document.body.clientWidth; // client不包含边框
   
   获取网页内body的高度:document.body.clientHeight;

5. 获取网页的宽高

   获取整个网页的宽度:document.body.scrollWidth

   获取整个网页的高度:document.body.scrollHeight

6. 获取body的宽高(包含边框)

   获取网页内body的宽度:document.body.offsetWidth // offset包含边框

   获取网页内的body的高度: document.body.offsetHeight 

7. 获取元素到顶部的距离

   获取元素到顶部的距离:document.getElementsByClassName('div')[0].offsetTop

   获取元素到左边的距离:document.getElementsByClassName('div')[0].offsetLeft

8. getBoundingClientRect
   ```javascript
      bottom: 1452.96875
      height: 602
      left: 629
      right: 1238
      top: 850.96875
      width: 609
      x: 629
      y: 850.96875
   ```

![js距离相关](./images/20180104085724397.jpg)


## 获取滚动条位置兼容
- <span style="color: red">获取当前页面滚动条纵坐标位置： document.body.scrollTop 与 document.documentElement.scrollTop</span>

- <span style="color: red">获取当前页面滚动条横坐标的位置：document.body.scrollLeft与document.documentElement.scrollLeft</span>

- pageXOffset 和 pageYOffset 属性返回文档在窗口左上角水平和垂直方向滚动的像素

### 获取scrollTop的值
Window pageXOffset和pageYOffset属性

其定义：pageXOffset 设置或返回当前页面相对于窗口显示区左上角的 X 位置。pageYOffset 设置或返回当前页面相对于窗口显示区左上角的 Y 位置。

### scrollTop兼容性的写法
```js
var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

// window.scroll(0, 0) // 滚动到顶部
```


[使用scrollTo/scrollTop让页面元素滚动到指定位置, 并设置滚动动画](https://blog.csdn.net/small_white_123/article/details/117792575)