---
autoGroup-2: 新的属性
title: 2022 年的 CSS，到底有哪些特性
---
关于2022年的CSS新特性，自己之前也有篇原创，CSS 的未来：[Cascade Layers (CSS @layer)](https://mp.weixin.qq.com/s?__biz=Mzg5ODcwNjk3NQ==&mid=2247485122&idx=1&sn=a0863050476ebe5ca660c173e4792e95&chksm=c05f3db2f728b4a4bec840fa064dbe1b0df0ebfbc7aa73aaf2f02b8f64dc828fe1f9bf4f6e8d&scene=21#wechat_redirect)，专门是在介绍@layer（级联层）的文章，而新的一年会有更多的CSS的新特性会出现在浏览器中。

## 热门的CSS特性
### CSS容器查询
```css
.form__container {
    container: inline-size;
}

.form {
    display:grid;
    align-items: center;
}

@container(min-width: 480px) {
    .form {
        grid-template-columns: min-content 1fr 200px;
        grid-template-areas:"searchIcon searchInput button";
        grid-template-rows: 88px;
        gap: 10px;
    }
}
@container (min-width: 768px) {
    .form {
        grid-template-columns: min-content 1fr min-content 200px;
        grid-template-areas: "searchIcon searchInput cameraIcon button";
        grid-template-rows: 88px;
        gap: 10px;
    }
}
```
### CSS的父选择器:has()
```css
figure img { 
    aspect-ratio: 21 / 9; 
    border: 5px solid #3f51b5; 
}

figure:has(figcaption) img { 
    border: 5px solid #9c27b0; 
}
```
### @layer控制CSS的级联层
```css
/* 预设级联层的顺序，并且相邻级联层之间有逗号分隔 */ 
@layer setting, tool, generic, element, object, component, utilities;

@layer setting { 
    /* 附加到级联层 setting 中的 CSS */ 
} 

@layer tool { 
    /* 附加到级联层 tool 中的 CSS */ 
} 

@layer generic { 
    /* 附加到级联层 generic 中的 CSS */ 
} 

@layer element { 
    /* 附加到级联层 element 中的 CSS */ 
} 

@layer object { 
    /* 附加到级联层 object 中的 CSS */ 
} 

@layer component { 
    /* 附加到级联层 component 中的 CSS */ 
} 

@layer utilities { 
    /* 附加到级联层 utilities 中的 CSS */ 
}
```
### 颜色函数
```css
:root {
    --theme-color: #ff0000;
}

.text-primary-dark {
    color: color-mix(var(--theme-primary), black 10%);
}

.text-primary-darker {
    color: color-mix(var(--theme-primary), black 20%);
}
```
### 视窗单位
### 过度滚动行为：overscroll-behavior
### CSS网格的 subgrid
### 媒体查询
### CSS作用域:@scope
### 滚动与动画
### CSS Houdini 变量：@property
### 瀑布流布局
```css 
.masonry { 
    display: grid;
    gap: 20px; 
    grid: masonry / repeat(auto-fill, minmax(250px, 1fr)); 
}
```

## 资料
[大漠老师：2022 年的 CSS，到底有哪些特性](https://mp.weixin.qq.com/s/b0pbUCPN_KmmDE6SaV3B5Q)