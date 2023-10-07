---
autoGroup-0: Vue3
title: vue3-lazyload如何优加载图片
---
最近开发了一个功能，页面首页会加载大量的图片，初次进入页面时，会导致页面性能下降，

于是乎，我改进了这个功能，可以让所有图片自动懒加载。

## 原理
这个功能主要的底层逻辑是使用 IntersectionObserver API， Intersection Observer用于在浏览器中观察元素的可见性和位置变化。它可以帮助开发者实现一些动态行为，如图片的懒加载、无线滚动等。

简单示例如下
```js
// 创建IntersectionObserver实例
const observer = new IntersectionObserver((entries, observer) => {
    // 遍历观察的元素
    entries.forEach(entry => {
        // 如果元素可见
        if(entry.isIntersecting) {
            // 加载图片
            const img = entry.target;
            const src = img.getAttribute('data-src');
            img.setAttribute('src', src);

            // 停止观察该元素
            observer.unobserver(img);
        }
    })
})

// 获取所有需要懒加载的图片元素
const lazyImages = document.querySelectorAll('.lazy-image');

// 观察每个图片元素
lazyImages.forEach(image => {
    observer.observe(image);
})
```
## 实践
接下来我们实现一个通用的hook，基本的功能如下：
1. 给图片提供默认的占位图片 src, 同事提供 data-src 属性
2. 传入图片对应的 ref 属性
3. 当如片进入可视区域时，使用data-src属性替换src属性

```js
import { onMounted, Ref } from 'vue';
const options = {
    // root: document.querySelector('.container'); // 根元素，默认为视口
    rootMargin: '0px'; // 根元素的边框
    threshold: 0.5, // 可见性比例阀值
    once: true, 
}
function callback(
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
) {
    entries.forEach(entry => {
        // 处理每个目标元素的可见性变化
        if(entry.intersectionRatio <= 0) return;
        const img: Element = entry.target;
        const src = img.getAttribute("data-src");
        img.setAttribute("src", src ?? ""); // 将真实的图片地址赋给 src 属性
        observer.unobserve(img);
    })
}
export const useInView = (ref: Ref) => {
  const observer = new IntersectionObserver(callback, options);

  onMounted(() => {
    Object.keys(ref.value).forEach((e) => observer.observe(ref.value[e]));
  });
};
```
```html
<script setup lang="ts">
import { ref } from "vue";
import { useInView } from "./hooks/useInView";

const imgRef = ref(null);
useInView(imgRef);
</script>

<template>
  <h4>公众号：萌萌哒草头将军</h4>
  <div
    v-for="(_, idx) in new Array(200).fill(11)"
  >
    <img
      ref="imgRef"
      src="https://via.placeholder.com/200"
      :data-src="`https://picsum.photos/200/${180 + idx}`"
      alt="b"
    />
  </div>
</template>
```
![效果](./images/observer.gif)

虽然基本的功能要求已经完成了，但是现在还不够优雅

## 优化
接下来，我们增加一个过渡动画。每次当加载完图片，就从占位图过渡到正常图片模式

```js
img.onload = () => {
    img.setAttribute('class', 'fade-in');
}
```
```css
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1
    }
}

/* 用用淡入动画到元素 */
.fade-in {
    animation: fadeIn 0.6s ease-in;
}
```

**完整代码如下**
```js
import { onMounted, Ref } from "vue";
const options = {
  // root: document.querySelector(".container"), // 根元素，默认为视口
  rootMargin: "0px", // 根元素的边距
  threshold: 0.5, // 可见性比例阈值
  once: true,
};

function callback(
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) {
  entries.forEach((entry) => {
    if (entry.intersectionRatio <= 0) return;
    const img = entry.target as HTMLImageElement;
    const src = img.getAttribute("data-src");

    img.setAttribute("src", src ?? ""); // 将真实的图片地址赋给 src 属性

    img.onload = () => {
      img.setAttribute("class", "fade-in");
    };

    observer.unobserve(img);
  });
}

export const useInView = (ref: Ref) => {
  const observer = new IntersectionObserver(
    callback,
    options
  );

  onMounted(() => {
    Object.keys(ref.value)
      .forEach((e) => observer.observe(ref.value[e]));
  });
};
```
```html
<script setup lang="ts">
import { ref } from "vue";
import { useInView } from "./hooks/useInView";

const imgRef = ref(null);

useInView(imgRef);

</script>

<template>
  <h4>公众号：萌萌哒草头将军</h4>
  <div
    v-for="(_, idx) in new Array(200).fill(11)"
    style="width: 200px height: 200px;"
  >
    <img
      ref="imgRef"
      style="height: 100%"
      src="https://via.placeholder.com/200"
      :data-src="`https://picsum.photos/200/${180 + idx}`"
      alt="b"
    />
  </div>
</template>

<style scoped>
/* 定义淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 应用淡入动画到元素 */
.fade-in {
  animation: fadeIn 0.6s ease-in;
}
</style>
```


[原文](https://mp.weixin.qq.com/s/qMWWvF9p64__v-Dr2zy_bA)