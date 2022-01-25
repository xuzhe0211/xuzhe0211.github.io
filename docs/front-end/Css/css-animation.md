---
autoGroup-1: Css Tips
title: css3 animaition动画执行结束，停顿几秒后重新开始执行
---

要实现css3 animation动画执行结束,停顿几秒后重新开始执行的效果，首先想到的是延时执行:animaition-delay,然后设置animation-iteration-count为infinite，即无限执行。但是不行，只有第一次执行之后，会有延时，后面就是不停顿执行。设置关键帧，也不好弄,那就借助js吧，思路很简单，将animation写进一个class里面，然后通过js的判断+setTimeout延时，增删这个class样式

## css代码

```
.home .scrollTip {
    position: relative;
}
.home.scrollTip.anmation{animation: ani 800ms;}
@keyframes ani {
    0% {
        opacity: 1;
        bottom: 0;
    }
    100% {
        opacity: 0;
        bottom: -40px
    }
}
```
## js代码

```
// 获取dom节点
const scrollTip = document.querySelector('.scrollTip');
// 页面载入时，给它执行一次
scrollTip.classList.add('animate');
// 监听动画是否结束
scrollTip.addEventListener('animationend', function() {
    // 动画结束，移出动画的样式类
    scrollTip.classlist.remove('animate');
    // 延时1s，再将动画加入
    setTimeout(() => {
        scrollTip.classList.add('animate');
    }, 1000);
})
```