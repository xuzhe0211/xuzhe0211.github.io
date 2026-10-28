---
autoGroup-13: ES6
title: 为什么Proxy一定要配合Reflect使用？
category:
  - 前端技术
tag:
  - javascript
  - 前端
---


## 引言
EcmaScript 2015中引入了[Proxy代理](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)与[Reflect反射](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)两个新的内置模块。

我们可以利用Proxy和Reflect来实现对于对象的代理劫持操作，类似于Es5中[Object.defineProperty()]的效果，不过Reflect & proxy远远比它强大。

大多数开发者都了解这两个ES6中的新增的内置模块，可是你也许并不清楚Proxy一定要配合Reflect使用。

## 前置知识
- <span style="color: blue">Proxy代理，它内置了一系列"陷阱"用于创建一个对象的代理，从而实现基本操作的拦截和自定义(如属性查找、赋值、枚举、函数调用等)</span>
- <span style="color: blue">Reflect反射，它提供了Javascript操作的方法。这些方法与**Proxy**的方法相同</span>

<span style="color: red">**简单来说，我们可以通过Proxy创建对于原始对象的代理对象，从而在代理对象中使用Reflect达到对于Javascript原始操作的拦截**</span>

大名鼎鼎的 VueJs/Core 中核心的响应式模块就是基于这两个 Api 来实现的。

## 单独使用Proxy
开始的第一个例子，先单独使用Proxy
```js
const obj = {
    name: 'wang.haoyu',
}

const proxy = new Proxy(obj,  {
    // get陷阱中target表示源对象，key表示访问的属性名
    get(target, key) {
        console.log('劫持你的数据访问'+ key);
        return target[key]
    }
})

proxy.name // 劫持你的数据访问name -> wang.haoyu
```
看起来很简单吧，我们通过Proxy创建了一个基于obj对象的代理，**同时在Proxy中声明了一个get陷阱**。

当我们访问proxy.name时实际上触发了对应的get陷阱，它会执行get陷阱中的逻辑，同时会执行对应陷阱中的逻辑，最终返回对应的target[key]也就是所谓的wang.haoyu

## Proxy中receiver[rɪˈsiːvər]
上面的demo中一起看起来顺风顺水，细心的同学在阅读Proxy的MDN文档中可能会发现其实Proxy中get陷阱还会存在一个额外的参数receiver。

那么这里的receiver究竟表示什么意思呢？<span style="color: red">**大多数同学会将它理解成为代理对象，但这是不全面的**</span>

以一个demo为切入点
```js
const obj = {
    name: 'wang.haoyu'
}

const proxy = new Proxy(obj, {
    // get陷阱中target表示源对象，key表示访问的属性名
    console.log(receiver === proxy);
    return target[key];
})

proxy.name // true
```
上面的例子中，我们在proxy实例对象的get陷阱上接受了receiver这个参数。

同时，我们在陷阱内部打印 console.log(receiver === proxy); 它会打印出true,表示这里的receiver的确是和代理对象相等的。

<span style="color: red">**所以receiver的确可以表示代理对象，但是这仅仅是receiver代表的一种情况而已**</span>

接下来看另一个🌰
```js
const parent = {
    get value() {
        return '19Qingfeng'
    }
}

const proxy = new Proxy(parent,  {
    // get陷阱中target表示源对象，key表示访问的属性名
    get(target, key, receiver) {
        console.log(receiver === proxy);
        return target[key];
    }
})

const obj = {
    name: 'wang.haoyu'
}

// 设置继承与parent的代理对象proxy
Object.setPrototypeOf(obj, proxy)

obj.value; // false
// 这里receiver 指向obj

```
> 关于原型上出现的 get/set 属性访问器的“屏蔽”效果，在[这篇文章](https://juejin.cn/post/7074935443355074567)中进行了详细阐述。这里我就不展开讲解了。


我们可以看到，上述的代码同样我在proxy对象的get陷阱上打印了 console.log(receiver === proxy); 结果却是false,

那么你可以思考下这里的receiver究竟是什么？其实这也是proxy中get陷阱第二个receiver存在的意义

<span style="color: red">**它是为了传递正确的调用者指向**</span>,看下面代码

```js
// ...
const proxy = new Proxy(parent, {
    // get陷阱中target表示源对象，key表示访问的属性名
    get(target, key, receiver) {
        console.log(receiver === proxy); // false
        console.log(receiver === obj); // true
        return target[key]
    }
})
// ...
```
<span style="color: blue">**其实简单来说，get陷阱中的receiver存在的意义就是为了正确的在陷阱中传递上下文**</span>

涉及到属性访问时，不要忘记get陷阱还会触发对应的属性访问器，也就是所谓的get访问器方法

我们可以看到上述的receiver代表的是继承与Proxy的对象，也就是obj

<span style="color: red">**看到这里，我们明白了Proxy中get陷阱的receiver不仅仅代表的是Proxy代理对象本身，同时也许他会代表继承Proxy的那个对象**</span>

<span style="color: blue">**其实本质上来说它还是为了确保陷阱函数中调用者的正确的上下文访问，比如这里的receiver指向的obj**</span>

:::danger
当然，你不要将 revceiver 和 get 陷阱中的 this 弄混了，陷阱中的 this 关键字表示的是代理的 handler 对象。
:::
```js
const parent = {
    get value() {
        return '19Qingfeng';
    }
}

const handler = {
    get(target, key, receiver) {
        console.log(this === handler); // true;
        console.log(receiver === obj); // true
        return target[key]
    }
}
const proxy = new Proxy(parent, handler);

const obj = {
    name: 'wang.haoyu'
}

// 设置obj继承与parent的代理对象proxy
Object.setPrototypeOf(obj, proxy);

obj.value; // false
```

## Reflect中的receiver
在清楚了Proxy中get陷阱的receiver后，我们接着来聊聊Reflect反射API中get陷阱的receiver

<span style="color: red">我们知道Proxy中第三个参数receiver代表的是代理对象本身或者继承与代理对象的对象，他表示触发陷阱时正确的上下文</span>

```js
const parent = {
    name: '19Qingfeng',
    get value() {
        return this.name
    }
}

const handler = {
    get(target, key, receiver) {
        return Reflect.get(target, key);
        // 这里相当于return target[key]
    }
}

const proxy = new Proxy(parent, handler);

const obj = {
    name: 'wang.haoyu'
}

// 设置obj继承与parent的代理对象proxy
Object.setPrototypeOf(obj, proxy);

console.log(obj.value); // 19Qingfeng
```
分析下上面代码
- <span style="color: blue">当我们调用obj.value时，由于obj本身不存在value属性</span>
- <span style="color: blue">它继承的proxy对象中存在value的属性访问操作符，所以会发生屏蔽效果</span>
- <span style="color: blue">此时会触发proxy上的get value()属性访问操作</span>
- <span style="color: blue">同时由于访问了proxy上的value属性访问器，所以此时会触发get陷阱</span>
- <span style="color: blue">进入陷阱时, target为源对象也就是parent，key为value</span>
- <span style="color: blue">陷阱中返回Reflect.get(target, key) 相当于target[key]</span>
- <span style="color: blue">此时，不知不觉中this指向在get陷阱中被偷偷修改掉了!!!!</span>
- <span style="color: blue">原本调用方的obj在香精中呗修改成为了对应的target也就是parent</span>
- <span style="color: blue">自然而然的打印出了对应的parent[value]也就是19Qingfeng</span>

这显然不是我们期望的结果，当我访问 obj.value 时，我希望应该正确输出对应的自身上的 name 属性也就是所谓的 obj.value => wang.haoyu 。

那么，Reflect中get陷阱的receiver就大显神通了
```js
const parent = {
    name: '19Qingfeng',
    get value() {
        return this.name;
    }
}

const handler = {
    get(target, key, receiver) {
        // return Reflect.get(target, key);
        return Reflect.get(target, key, receiver)
    }
}
const proxy = new Proxy(parent, handler);

const obj = {
    name: 'wang.haoyu'
}

// 设置obj继承与parent的代理对象proxy
Object.setPrototypeOf(obj, proxy);

console.log(obj.value); // wang.haoyu
```
上述代码原理很简单

- <span style="color: red">首先，之前我们提到过Proxy中get陷阱的receiver不仅仅会表示代理对象本身同时也还有可能表示继承与代理对象的属性，具体需要区别于调用方。这里显然它是指向继承与代理对象的obj</span>
- <span style="color: red">其次，**我们在Reflect中get陷阱中第三个参数传递了Proxy中的receiver也就是obj作为形参，它会修改调用时的this指向**</span>

:::tip
你可以简单的将 Reflect.get(target, key, receiver) 理解成为 target[key].call(receiver)，不过这是一段伪代码，但是这样你可能更好理解。
:::

相信看到这里你已经明白 Relfect 中的 receiver 代表的含义是什么了，没错它正是可以修改属性访问中的 this 指向为传入的 receiver 对象。

## 总结
相信看到这里大家已经明白了，为什么Proxy一定配合Reflect使用。<span style="color:blue">恰恰是为什么触发代理对象的劫持时保证正确的this上下文指向</span>

我们稍稍会议一下，针对于get陷阱(当然set其他之类设计到receiver的陷阱同理)：
- <span style="color: red">Proxy中接受的Receiver形参表示代理对象本身或者继承与代理对象的对象</span>
- <span style="color: red">Reflect中传递的Receiver实参表示修改执行原始操作时的this指向</span>


## 资料
[为什么Proxy一定要配合Reflect使用？](https://juejin.cn/post/7080916820353351688)