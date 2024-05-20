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

## 计算LocalStorage容量
localStorage的容量大家都知道是5M，但是很少人知道怎么去验证，而且某些场景需要计算localstorage的剩余容量时，就需要掌握计算容量的技能了

### 计算总容量
我们以10KB一个单位，也就是10240B，1024B就是10240个字节的大小，我们不断往localStorage中累加存入10KB,等到超出最大存储时,会报错,那个时统计出所有累积的大小,就是总存储量了!

> 注意：计算前需要先清空 LocalStorage

```js
let str = '0123456789';
let temp = '';

// 先做一个10KB的字符串
while(str.length !== 10240) {
    str = str + '0123456789'
}

// 先清空
localStorage.clear();

const computedTotal = () => {
    return new Promise((resolve) => {
        // 不断往 LocalStorage 中累积存储 10KB
        const timer = setInterval(() => {
            try {
                localStorage.setItem('temp', temp);
            } catch {
                // 报错说明超出最大存储
                resolve(temp.length / 1024 - 10);
                clearInterval(timer);
                // 统计完记得清空
                localStorage.clear();
            }
        }, 0)
    })
}

(async () => {
    const total = await computedTotal();
    console.log(`最大容量${total}KB`)
})()
```
最后得出的最大存储量为5120KB ≈ 5M

### 已使用容量
计算已使用容量，我们只需要遍历 localStorage 身上的存储属性，并计算每一个length,累加起来就是已使用的容量了。

```js
const computedUse = () => {
    let cache = 0;
    for(let key in localStorage) {
        if(localStorage.hasOwnProperty(key)) {
            cache += localStorage.getItem(key).length;
        }
    }
    return (cache / 1024).toFixed(2)
}

(async () => {
    const total = await computedTotal();
    let o = '0123456789';
    for(let i = 0; i < 1000; i++) {
        o += '0123456789'
    }
    localStorage.setItem('o', o);
    const useCache = computedUse();
    console.log(`已用${useCache}KB`);
})()
```
可以查看已用容量

### 剩余容量
我们已经计算出总容量和已使用容量，那么剩余容量 = 总容量 - 已使用容量

```js
const computedsurplus = (total, use) => {
    return total - use;
}

(async () => {
    const total = await computedTotal();
    let o = '0123456789';
    for(let i = 0; i < 1000; i++) {
        o += '0123456789';
    }
    localStorage.setItem('o', o);
    const useCache = computedUse();
    console.log(`剩余可用容量${computedsurplus(total, useCache)}KB`)
})()
```