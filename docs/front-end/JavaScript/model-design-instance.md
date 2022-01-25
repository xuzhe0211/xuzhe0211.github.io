---
autoGroup-14: 设计模式
title: 单例模式
---

## 介绍

在传统开发工程师眼里，单例就是保证一个类只有一个实例，实现的方法一般是先判断实例存在与否，如果存在直接返回,如果不存在就创建了一个在返回,这就确保了一个类只有一个实例对象。在Javascript里，单例作为一个命名控件提供者，从全局命名控件里提供一个唯一的访问点来访问该对象。

## 正文

在JavaScript里，实现单例的方式有很多种，其中最简单的一个方式是使用对象字面量的方法，其字面量里可以包含大量的属性和方法
```
var mySingleton = {
    property1: 'something',
    property2: 'something else',
    method1: function() {
        console.log('hello world')
    }
}
```

## 资料
[原文档](https://www.cnblogs.com/TomXu/archive/2012/02/20/2352817.html)

[JavaScript实现单例模式](https://www.cnblogs.com/darrenji/p/5154040.html)