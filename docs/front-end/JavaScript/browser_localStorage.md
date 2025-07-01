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
## 传统方案的痛点
### 1. 轮训(polling)
轮训是一种最直观的方式，它定期检查 localStorage 的值是否发生变化。然而，这种方式性能较差，尤其在高频轮训时会对浏览器产生较大的影响，因此不适合作为长期方案
```js
let lastValue = localStorage.getItem('myKey');

setInterval(() => {
    const newValue = localStorage.getItem('myKey');
    if(newValue !== lastValue) {
        lastValue = newValue;
        console.log('Detected localStorage change: ', newValue);
    }
}, 1000)
```
这种方式实现简单，不依赖复杂机制。但是性能较差，频繁轮训会影响浏览器性能
### 2. 监听代理(Prosy)或发布-订阅模式
这种方式通过创建一个代理来拦击 localStorage.setItem 的调用。每次数据变更时，我们是侯东发布一个事件，通知其他监听者
```js
(function() {
    const originalSetItem = localStorage.setItem;
    const subscribers = [];

    localStorage.setItem = function(key, value) {
        originalSetItem.apply(this, arguments);
        subscribers.forEach(callback => callback(key, value));
    }

    function subscribe(callback) {
        subscribers.push(callback);
    }

    subscribe((key, value) => {
        if(key === 'myKey') {
            console.log('Detected localStorage change: ', value);
        }
    })

    localStorage.setItem('myKey', 'newValue')
})()
```
这种比较灵活，可以用于复杂场景。但是需要手动拦截setItem,维护成本高(但也是值得推荐)

然而，这些方案往往存在性能问题或者开发的复杂度，在高频数据更新的情况下，有一定的性能问题，而且存在一定的风险性。那么有没有可以简单快速，风险性还小的方案呢？

### 封装localStroage--另
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

## 高效方案
既然浏览器不支持同一页签的 storage 事件，我们可以手动触发事件，以此来实现同一页签下的 LocalStorage 变化监听

### 1. 自定义 Storage 事件
通过手动触发 StorageEvent,你可以在LocalStorage更新时同步分发事件，从而实现同一页签下的监听
```js
localStorage.setItem('myKey', 'value');

// 手动创建并分发 StorageEvent
const storageEvent = new StorageEvent('storage', {
    key: 'myKey',
    url: window.location.href
})

window.dispatchEvent(storageEvent);
```
你可以使用相同的监听逻辑来处理数据变化，无论是同一页签还是不同页签
```js
window.addEventListener('storage', event => {
    if(event.key === 'myKey') {
        // 处理LocalStorage更新
    }
})
```
这种实现简单、轻量、快捷。但是需要手动触发事件

### 1. 基于 CustomEvent 的自定义事件
与 StorageEvent 类似，你可以使用 CustomEvent 手动创建并分发事件，实现 localStorage 的同步监听
```js
localStorage.setItem('myKey', 'newValue');

const customEvent = new CustomEvent('localStorageChange', {
  detail: { key: 'myKey', value: 'newValue' }
});
window.dispatchEvent(customEvent);
```
这种方式适合更加灵活的事件触发场景。CustomEvent不局限于 localStorage 事件，可以扩展到其他功能。
```js
window.addEventListener('localStorageChange', (event) => {
  const { key, value } = event.detail;
  if (key === 'myKey') {
    console.log('Detected localStorage change:', value);
  }
});
```
### MessageChannel(消息通道)
MessageChannel API可以在同一个浏览器上下文中发送和接收消息。我们可以通过MessageChannel将localStorage的变化信息同步到其他部分，起到类似事件监听效果
```js
const channel = new MessageChannel();

channel.port1.onmessage = event => {
    console.log('Detected localStorage change: ' + event.data);
}

localStorage.setItem('myKey', 'newValue');
channel.port2.postMessage(localStorage.getItem('myKey'));
```
适合组件通信和复杂应用场景，消息机制较为灵活。相对复杂的实现，可能不适合简单场景。
### BroadcastChannel(广播)
BroadcastChannel 提供了一种更高级的浏览器通信机制，允许多个窗口或页面之间广播消息。你可以通过这个机制将 localStorage 变更同步到多个页面或同一页面的不同部分。
```js
const channel = new BroadcastChannel('storage_channel');

channel.onmessage = (event) => {
  console.log('Detected localStorage change:', event.data);
};

localStorage.setItem('myKey', 'newValue');
channel.postMessage({ key: 'myKey', value: 'newValue' });
```
    
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