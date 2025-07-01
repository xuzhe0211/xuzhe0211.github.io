---
title: React Native vs React
---
## 区别
1. React是驱动html dom渲染; React Native是驱动android/ios原生组件渲染；
2. 写react可以用前端知识直接上手，而React native虽然也可以，但是深入下去没有native知识支持很难

## React Native 和 React区别

- 原理略有不同
    
    React和React Native的原理是相同的，都是由JS实现的虚拟dom来驱动界面view层渲染；只不过React是驱动html dom渲染；React Navtive是驱动android/ios原生组件渲染；其实在React Native推出之前，就已经存在这种使用js驱动app原生组件的技术了，比如Native script

- 编程思路不同

    react直接渲染dom，而React Native生成id，用bridge(最新用c++实现了)变成一个表，等待native 去调用，写React可以用前端知识直接上手，React Native虽然也可以，但是深入下去就没有native知识支持很难

