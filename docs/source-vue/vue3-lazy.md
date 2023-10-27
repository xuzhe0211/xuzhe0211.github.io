---
autoGroup-0: Vue3
title: 图片懒加载-自定义指令
---
```js
<img v-imgLazy="url"/> // url=图片地址  v-imgLazy代替src

// =====================================
// 定制图片懒加载指令
import defaultImg from '@/assets/images/200.png' // 默认显示图片
import { useIntersectionObserver } from '@vueuse/core' // 引入监听是否进入视口

export default {
  // 拿到main.js中由createApp方法产出的app实例对象
  install (app) {
    app.directive('imgLazy', {
      mounted (el, binding) {
        // el: img的dom对象
        // binding.value: 图片url地址
        // 使用vueuse/core提供的监听api 对图片dom进行监听 正式进入视口才加载
        // img.src = url
        const { stop } = useIntersectionObserver(
          el, // 监听的目标元素
          ([{ isIntersecting }], observerElement) => {
            if (isIntersecting) {
              // 当图片url无效加载失败的时候使用默认图片替代
              el.onerror = function () {
                el.src = defaultImg
              }
              // 加载正式图片
              el.src = binding.value // <img v-imgLazy = "url"/>
              // stop(): 停止监听,防止重复调用请求
              stop()
            }
          },
          // 刚进入视口区域就立刻执行回调 0 - 1
          { threshold: 0 }
        )
      }
    })
  }
}
```
vue3.0 组合API提供了更多逻辑代码封装能力。@vueuse/core基于组合API封装好用的工具函数。

@vueuse/core包，它封装了常见的一些交互逻辑

下载

```shell
npm i @vueuse/core@4.9.0
```
下面是自己在项目中运用到的函数
## useWindowScroll
useWindowScroll()是@vueuse/core提供的api可返回当前页面滚动时候卷曲的距离。X横向，Y纵向。而且这两个数据是响应式的

下面的代码,下载后先引入此函数,然后从里面解构出y,即当前页面滚动时距离顶部的距离，然后可以将y返回回去，在模板中使用，然后可以设置当y大于一定值的时，让其做一些操作
```js
import { useWindowScroll } from '@vueuse/core';

const {x, y} = useWindowScroll();
```

## useIntersectionObserver
通过下面的程序可以实现进入一个看见一个dom的时候再去请求数据，实现数据的懒加载

```js
// stop 是停止观察是否进入或移出可视区域的行为
const { stop } = useIntersectionObserver(
    // target 是观察的目标dom容器,必须是dom容器，而且是vue3.0方式绑定的dom对象
    target,
    // isIntersecting 是否进入可视区域，true是进入 false是移出
    // observerElement 被观察的dom
    ([{ isIntersecting }], observerElement) => {
        // 在此处可根据isIntersecting 来判断，然后做业务
        // 如果进入了可视区，就先让其停止检测，然后进行数据的请求
        if(isIntersecting) {
            stop();
            findNew().then(data => {
                good.value = data.result;
            })
        }
    },
    // 配置选项，香蕉的比例大于0就出发
    {
        threshold: 0
    }
)
```
## onClickOutside--点击一个Dom其他地方的逻辑操作
此函数可以监听一个函数元素,实现点击这个元素的其他地方出发的函数，比如一个组件，点击组件的其他地方关闭该组件

```js
import { onClickOutside } from '@vueuse/core';

setup() {
    // 实现点击组件外部元素进行关闭操作
    const target = ref(null);
    onClickOutside(target, () => {
        // 参数1:监听那个元素
        // 参数2: 点击了该元素外的其他地方触发的函数
        close();
    })
    const close = () => {
        visible.value = false;
    }
}
```


[vueuse中文文档](https://www.vueusejs.com/core/useStorageAsync/)