---
autoGroup-1: Tips API
title: hash和history两种模式区别
---

:::tip
众所周知，vue-router有两种模式，hash模式和history模式，谈谈两者区别
:::

## hash模式

hash模式背后的原理是onhashchange事件，可以在window对象上监听这个事件
```js
window.onhashchange = function(event) {
    console.log(event.oldURL, event.newURL);
    let hash = location.hash.slice(1);
    document.body.style.color = hash
}
```
上面的代码可以通过改变hash来改变页面字体颜色，虽然没什么用，但是一定程度上说明了原理。更关键的一点是，因为hash发生变化url都会被浏览器记录下来，从而你会发现浏览的前进后退都可以用了，同时点击后退时，页面字体颜色也会发生变化。这样依赖，尽管浏览器没有请求服务器，但是页面状态和url一一关联起来，后来人民给它起了一个名字叫前端路由，成为单页应用标配

## history路由(放在服务器环境下测试)

随着history api的到来，前端路由开始进化，前面的hashchange，你只能改变#后面的url片段。而history api则给了前端完全的自有

<span style="color: red">history api可以分为两大部分，切换和修改，参考MDN，切换历史状态包括back、forward、 go三个方法，对应浏览器的前进，后退，跳转操作；有同学说(谷歌)浏览器只有前进和后退，没有跳转，嗯在前进后退上长按，会出来所有窗口的历史记录，从而可以跳转(也许叫跳更合适)</span>

```js
history.go(-2); // 后退两次
history。go(2); // 前进两次
history.back(); // 后退
history。forward（）； // 前进
```

### 修改历史状态包括了pushState,replaceState

这两个方法接收三个参数：stateObj, title, url

```js
history.pushState({color: 'red'}, 'red', 'red');
history.back();
setTimeout(() => {
    history.forward();
}, 0)
window.onpopstate = function(event){
     console.log(event.state)
     if(event.state && event.state.color === 'red'){
           document.body.style.color = 'red';
      }
}
```

通过pushstate把页面的状态保存在state对象中，当页面的url再返回这个url时，可以通过event.state取到这个state对象，从而对页面状态进行还原，这里的页面状态就是页面字体颜色，其实滚动条的位置，阅读进度，组件的开关的这些页面状态都可以存储到state的里面。

### history模式的问题

通过history api，我们丢掉了丑陋的#，但是它也有个问题：不怕前进，不怕后退，就怕刷新，f5，（如果后端没有准备的话）,因为刷新是实实在在地去请求服务器的,不玩虚的。 在hash模式下，前端路由修改的是#中的信息，而浏览器请求时是不带它玩的，所以没有问题.但是在history下，你可以自由的修改path，当刷新时，如果服务器中没有相应的响应或者资源，会分分钟刷出一个404来。


## 路由面试相关

### hash 和history的实现原理

hash实现就是基于location.hash来实现的。其实现原理也很简单，location.hash的值就是URL中#后面的内容。比如百度，设置他的location.hash = '#abcsdf',那么它的网址就是：

```
https: // www.baidu.com/#abcsdf
```
我们可以使用hashchange事件来监听hash的变化。并且通过history.length能看到路由总数

### 用hash的方案实现一个路由切换

```js
// 首先我们要有个html
<ul>
    <li><a href="#layout1">路由1</a></li>
    <li><a href="#layout2">路由2</a></li>
    <li><a href="#layout3">路由3</a></li>
</ul>
<div id="luyouid"></div>

// ts逻辑
class router {
    // 存储当前路由
    hashStr: String;
    constructor(hash: Strinng) {
        // 初始化赋值
        this.hashStr = hash;
        // 初始化
        this.watchHash();
        // 绑定监听改变事件，由于this被换了，必须用bind绑定
        this.watch = this.watchHash.bind(this);
        window.addEventListener('hashchange', this.watch);
    }
    // 监听方法
    watchHash() {
        let hash: String = window.location.hash.slice(1);
        this.hashStr = hash;
        if (this.hashStr) {
            if (this.hashStr === 'luyou1') {
                document.querySelector('#luyouid').innerHTML = '好好学习天天想上'；
            } else if (this.hashStr === 'luyou2') {
                document.querySelector('#luyouid').innerHTML = '好好学习'
            } else {
                document.querySelector('#luyouid').innerHTML = '天天想上'；
            }
        }
    }
}
```

### history api原理

<span style="color: blue">history这个对象在html的时候新加入两个api history.pushState()和history.replaceState()这两个API可以在不刷新的情况下，操作浏览器的历史记录。唯一不同的是,**前者是新增的一个历史记录，后者是直接替换当前的历史记录**。</span>

### history pushState replaceState使用

```js
window.history.pushState(state, title, url);
// state: 需要保存的数据，这个数据在触发popstate事件时，可以在event.state里获取
// title 标题，基本没用 一般传null
// url 设定新的历史记录的url,新的url与当前url的origin必须是一样的，否则会抛出错误。url可以时绝对路径，也可以是相对路径。
//如 当前url是 https://www.baidu.com/a/,执行history.pushState(null, null, './qq/')，则变成 https://www.baidu.com/a/qq/，
//执行history.pushState(null, null, '/qq/')，则变成 https://www.baidu.com/qq/
```

### history 其他api

```js
window.history.back()//后退
window.history.forward()//前进
window.history.go(1)//前进一部，-2回退两不，window.history.length可以查看当前历史堆栈中页面的数量
```

### 这些操作执行了怎么监听呢

每当同一个文档的浏览历史(即history)出现变化时，就会触发popState事件，只要我们监听事件就可以

```js
window.addEventListener('popstate', function(event) {
});
```
### 这些事件都可以监听嘛？
仅仅调用pushState方法或replaceState方法，并不会触发该事件，只有用户点击浏览器后退和前进按钮时，或者使用js调用back、forward、go方法时才会触发。

### 那么如何监听 pushState 和 replaceState 的变化呢？
我们可以创建2个全新的事件，事件名为pushState和replaceState，我们就可以在全局监听。

```js
//创建全局事件
var _wr = function(type) {
   var orig = history[type];
   return function() {
       var rv = orig.apply(this, arguments);
      var e = new Event(type);
       e.arguments = arguments;
       window.dispatchEvent(e);
       return rv;
   };
};
//重写方法
 history.pushState = _wr('pushState');
 history.replaceState = _wr('replaceState');
//实现监听
window.addEventListener('replaceState', function(e) {
  console.log('THEY DID IT AGAIN! replaceState 111111');
});
window.addEventListener('pushState', function(e) {
  console.log('THEY DID IT AGAIN! pushState 2222222');
});
```


## VUE中的next({ ...to, replace: true })
[原文](https://www.cnblogs.com/never404/p/15709693.html)

```js
beforeEach((to, from, next) => {
    next('/logon')
})
```
上面这串代码我们可以看成
```js
beforeEach((to, from, next) => {
    beforeEach(('/logon', from, next) => {
       beforeEach(('/logon', from, next) => {
            beforeEach(('/logon', from, next) => {
                beforeEac...  // 一直循环下去...... , 因为我们没有使用 next() 放行
         }
      }
  }
})
```
因为:<span style="color: red;font-weight: bold">其实在路由守卫中，只有next()是放行，其他的诸如:next('/logon')、next(to)或next({ ...to, replace: true}) 都不是放行，而是:中断当前导航，执行新的导航</span>

例如：
```js
beforeEach((to, from, next) => {
    if(to.path === 'home') {
        next('/logon');
    } else {
        // 如果要去的地方不是/home，就放行
        next();
    }
})
```
我本来要去/home路由，因此执行了第一次 beforeEach((to, from, next)

但是这个路由守卫中判断了如果要去的地方是'/home'，就执行next('/logon')，

所以想要访问/home可以这么看
```js
beforeEach((to, from, next) => {
   beforeEach(('/logon', from, next) => {
     next()  // 现在要去的地方不是 /home ， 因此放行
   }
}
```
> 注意：重点在这，next('/logon')不是说直接去logon路由，而是中断(不是CPU的那个中断，VUE中的中断就是此时不会执行router.afterEach(() => {}))这一次路由守卫的操作，又进入一次路由守卫，就像嵌套一样，一层路由守卫，然后又一层路由守卫，此时路由守卫进入到第二层时，to.path已经不是/home了，这个时候才执行next()放行操作

### addRoutes()
在addRoutes()之后第一次访问被添加的路由会白屏，这是因为刚刚addRoutes()就立刻访问被添加的路由，然后此时addeRoutes()没有执行结束，因而找不到刚刚被添加的路由导致白屏。因此需要从新访问一次路由才行。

该如何解决这个问题 ?

此时就要使用next({ ...to, replace: true })来确保addRoutes()时动态添加的路由已经被完全加载上去。

<span style="color: red">next({ ...to, replace: true })中的replace: true只是一个设置信息，告诉VUE本次操作后，不能通过浏览器后退按钮，返回前一个路由。</span>

因此next({ ...to, replace: true })可以写成next({ ...to })，不过你应该不希望用户在addRoutes()还没有完成的时候，可以点击浏览器回退按钮搞事情吧。

其实next({ ...to })的执行很简单，它会判断：

<span style="color: red">如果参数to不能找到对应的路由的话，就再执行一次beforeEach((to, from, next)直到其中的next({ ...to})能找到对应的路由为止。</span>

也就是说此时addRoutes()已经完成啦，找到对应的路由之后，接下来将执行前往对应路由的beforeEach((to, from, next) ，因此需要用代码来判断这一次是否就是前往对应路由的beforeEach((to, from, next)，如果是，就执行next()放行。

如果守卫中没有正确的放行出口的话，会一直next({ ...to})进入死循环 !!!

因此你还需要确保在当addRoutes()已经完成时，所执行到的这一次beforeEach((to, from, next)中有一个正确的next()方向出口。