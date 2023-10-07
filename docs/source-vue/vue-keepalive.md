---
autoGroup-1: Tips API
title: vue-keepalive
---

当组件在keep-alive内被切换时组件的activated、deactivated这两个生命周期钩子函数会被执行

## 使用
<span style="color: red">tab切换、列表分页在第xx页跳转返回使用keep-alive</span>


:::danger
mitt vue3 通信

command+.  vue自动import引入
:::

## activated deactivated
:::tip
activated、deactivated这两个生命周期函数一定是要在**使用了keep-alive组件后才有的**，否则则不存在当引入keep-alive的时候，<span style="color: red">页面第一次进入，钩子的触发顺序created->mounted->activated,退出时触发deactivated。**当再次进入(前进或后退)时，只触发activated**</span>
:::

## keep-alive 同一组件多次

```html
<template>
    <router-view v-slot="{Component, route}">
        <keep-alive>
            <component :is="wrap(route.fullPath, Component)" :key="route.fullPath" />
        </keep-alive>
    </router-view>
</template>
<script>
import {h} from 'vue';

// 自定义name的壳的集合
const wrapperMap = new Map();
export defualt {
    data() {
        return {
            include: []
        }
    }, 
    watch: {
        $route: {
            handler(next) {
                 // // ??这个按自己业务需要，看是否需要缓存指定页面组件
                // const index = store.list.findIndex(item => item.fullPath === next.fullPath)
                // // 如果没加入这个路由记录，则加入路由历史记录
                // if (index === -1) {
                //   this.include.push(next.fullPath)
                // }
            }
        },
        immediate: true,
    },
    methods {
        // 为keep-alive里的component 接收的组件包上一层自定义name的壳
        wrap(fullPath, component) {
            let wrapper;
            // 重点就是这里，这个组件的名字是完全可控的
            // 只要自己写好逻辑，每次能找到对应的外壳组件就行，完全可以写成任何自己想要的名字
            // 这就能配合 keep-alive 的include 属性可控的操作缓存
            if(component) {
                const wrapperName = fullPath;
                if(wrapperMap.has(wrapperName)) {
                    wrapper = wrapperMap.get(wrapperName);
                } else {
                    wrapper = {
                        name: wrapperName,
                        render() {
                            return h('div', {className: 'vaf-page-wrapper'}, component);
                        }
                    }
                }
                wrapperMap.set(wrapperName, wrapper);
            }
            return h(wrapper);
        }
    }
}
</script>
```

### demo 
```js

// 用来存已经创建的组件
const wrapperMap = new Map();
const visitedViewPaths = ref<string[]>([]);
const formatComponentInstance = (component: any, categoryId: string) => {
    let wrapper;
    if (component) {
        const wrapperName = 'tabContent' + categoryId;
        if (wrapperMap.has(wrapperName)) {
            wrapper = wrapperMap.get(wrapperName);
        } else {
            wrapper = {
                name: wrapperName,
                render() {
                    return h(component);
                }
            };
            visitedViewPaths.value.push(wrapperName);
            wrapperMap.set(wrapperName, wrapper);
        }
        return h(wrapper);
    }
};
```


[keep-alive用法以及activated,deactivated生命周期的讲解](https://blog.csdn.net/yuan_jlj/article/details/118187147)

[vue keep-alive实现动态缓存以及缓存销毁](https://segmentfault.com/a/1190000019788203)