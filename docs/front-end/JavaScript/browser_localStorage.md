---
autoGroup-7: 浏览器
title: 怎么监听LocalStorage的变化的
---
## 第一种：storageEvent
其实Javascript原生就有一个监听localStoarge 变化的事件--storage，使用方法如下
```js
window.addEventListener('storage', () => {
    // callback
})
```
我们来看看MDN是怎么描述这个事件的

:::tip
StorageEvent
当前页面使用的storage被其他页面修改时会触发StorageEvent事件，

事件在同一个域下的不同页面之间触发，即在A页面注册了storage的监听事件，只有在跟A同域名下的B页面操作storage对象，A页面才会被处罚storage事件
:::
也就是说，同域下的不同页面A、B，只有本页面修改了localStorage才会触发对方的storage事件

**但是显然这种方案很不适用在现在的大部分项目中，毕竟这种方案太局限了，不能应用在本页面监听的场景

## 封装localStroage
其实就是代理一下对localStorage 进行多一层的封装，使得我们每次在操作localStorage的时候，都会多走一层函数，而我们就可以在这一层中执行监听的事件了，下面是简单的代码例子

```js
class CommonLocalStorage {
    private storage:Storage;
    constructor() {
        this.storage = window.localStorage;
    }
    set(key: string, value: any) {
        // 执行监听操作
        return this.storage.setItem(`${prefix}${key}`, value);
    }
    get(key: string) {
        // 执行监听操作
        return this.storage.getItem(`${prefix}${key}`);
    }
    del(key: string) {
        // 执行监听操作
        return this.storage.removeItem(`${prefix}${key}`);
    }
    clear() {
        // 执行监听的操作
        this.storage.clear();
    }
}

const commonStorage = new CommonLocalStorage();

export default commonStorage;
```
这种方式也被应用于很多比较出名的项目中，大家可以去看那些开源的项目中，基本很少基本直接使用localStorage，而是都会封装一层的