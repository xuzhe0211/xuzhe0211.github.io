---
autoGroup-1: Css Tips
title: 非常有用的pointer-events属性
---
## 介绍
pointer-events是css3的一个属性，指定在什么情况下可以成为鼠标事件的target(包括鼠标的样式)

## 属性值
pointer-events属性有很多值,但是对于浏览器来说，只有auto和none两个值可用，其他的几个是针对SVG的(本身这个属性就来SVG技术)
```
/* Keyword values */

pointer-events: auto; /* 默认 */

pointer-events: none;

pointer-events: visiblePainted; /* SVG only */

pointer-events: visibleFill;  /* SVG only */

pointer-events: visibleStroke;  /* SVG only */

pointer-events: visible;  /* SVG only */

pointer-events: painted;  /* SVG only */

pointer-events: fill;  /* SVG only */

pointer-events: stroke;  /* SVG only */

pointer-events: all;  /* SVG only */

/* Global values */

pointer-events: inherit;

pointer-events: initial;

pointer-events: unset;
```
## pointer-events属性值详解
- auto---效果和没有定义pointer-events属性相同，鼠标不会穿透当前层。在SVG中，该值和visiblePainted效果相同。
- none--元素永远不会成为鼠标事件的target(目标)。但是，当其后代元素的pointer-events属性指定其他值时，鼠标事件可以指向后代元素，在这种情况下，鼠标事件将在捕获冒泡阶段触发父元素的事件监听器。实际上默认就可以穿透当前层，因为pointer-events默认为auto

## 浏览器兼容性
Firefox 3.6+和chrome 2.0+ 以及safari 4.0+都支持这个CSS3属性，IE6/7/8/9都不支持，Opera在SVG中支持该属性但是HTML中不支持。

检测浏览器是否支持该属性的JS代码，其实也可以用来检测其他的属性
```
var supportsPointerEvents = (function(){
  var dummy = document.createElement('_');
  if(!('pointerEvents' in dummy.style)) return false;
  dummy.style.pointerEvents = 'auto';
  dummy.style.pointerEvents = 'x';
  document.body.appendChild(dummy);
  var r = getComputedStyle(dummy).pointerEvents === 'auto';
  document.body.removeChild(dummy);
  return r;
})();
```
**为什么要设置两次pointerEvents的属性呢？**
document.style.pointerEvents = 'auto'

document.style.pointerEvents = 'x'

解读：明显的是x会把之前赋值的auto覆盖掉，后面用了getComputedStyle这个方法。由于x是个无效的值，所以如果浏览器支持pointer-events这个css属性的话，计算出来的样式应该是auto

**使用JS替代实现pointerEvents穿透当前层的效果**
```
function noPointerEvents (element) {
    $(element).bind('click mouseover', function (evt) {
        this.style.display = 'none';
        var x = evt.pageX, y = evt.pageY,
	    under = document.elementFromPoint(x, y);
        this.style.display = '';
        evt.stopPropagation();
        evt.preventDefault();
        $(under).trigger(evt.type);
    });
}
```
elementFromPoint：返回给定坐标处的所在的元素

使用实例：document.elementFromPoint(100,100)

trigger：触发被选元素指定的事件类型

event.type：返回事件类型


```html
<div class="out" @click="out()">
    <div class="in" @click="in()"></div>
</div>
 
// 穿透点击（点击in的区域触发out）
.in {
    pointer-events: none;
}
 
// 阻止穿透 （点击in的区域不会触发out）
function in () {
    event.stopPropagation();
}
```
## 资料
[非常有用的pointer-events属性](https://www.runoob.com/cssref/css-units.html)

[MDN pointer-events](https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events)

[pointer-events](https://zhuanlan.zhihu.com/p/71865866)