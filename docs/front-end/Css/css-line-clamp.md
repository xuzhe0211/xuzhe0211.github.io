---
autoGroup-1: Css Tips
title: 设置 两行省略号不生效的问题
---

在样式中 加注释引导

```css
overflow: hidden;
text-overflow: ellipsis;
display:-webkit-box;
/* autoprefixer: off */
-webkit-box-orient: vertical;
/* autoprefixer: on */
-webkit-line-clamp: 2;
```

注释加上就可以了 

>另外：一些标签如button 多行隐藏也不会生效修改为span标签

## demo
```html
<div class="card-list">
    <div class="item">
        <div class="img-container"><img alt="前端大佬"/></div>
        <div class="text" title="66666666666666666666666牛.png">
            <span>66666666666666666666666牛.png</span>
        </div>
    </div>
    <div class="item">
      <div class="img-container">.zip图标</div>
      <div class="text" title="榜1牛牛牛牛牛牛牛牛牛牛牛牛牛牛牛牛.zip"><span class="span">榜1牛牛牛牛牛牛牛牛牛牛牛牛牛牛牛牛.zip</span></div>
   </div>
   ...
</div>
```
```css
.text {
    display: flex;
    white-space: nowrap;
}
.text>.span {
    overflow: hidden;
}
.text::after {
    text-overflow: ellipsis;
    /* 改变文本方向 */
    direction: rtl; 
    overflow: hidden;
    /* 获取html中的title属性值 */
    content: attr(title);
}
```