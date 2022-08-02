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