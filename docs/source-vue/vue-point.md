---
autoGroup-1: Tips API
title: Vue2.x知识点总结
---

## 荣耀黄金
### Vue优点，缺点
优点：渐进式，组件化，轻量级，虚拟dom,响应时，单页面路由，数据与视图分开

缺点：单页面不利于SEO，不支持IE8一下，首屏加载时间长

### MVVM是什么？和MVC有何区别呢？
**MVC**
- Model(模型):负责从数据库中取数据
- View(视图): 负责展示数据的地方
- Controller(控制器):用户交互的地方，例如点击事件等等
思想：Controller将Model的数据展示在view上

![mvc](./images/640.jpg)

**MVVM**
- VM:也就是View-Model，做了两件事达到了数据的双向绑定，一是将【模型】转化成【视图】,即将后端传递的数据转化成所看到的页面，实现方式是：数据绑定。二是将【视图】转换成【模型】，即将所看到的页面转化成后端数据。实现方式是:DOM事件监听
思想：实现了View和Model的自动同步，也就是当Model的属性改变时，我们不用在自己手动操作Dom元素，来改变View的显示，而是改变属性后该属性对应的View层显示会自动改变(对应Vue数据驱动思想)

![mvvm](./images/641.jpg)

**区别**

整体看来,MVVM比MVC精简很多，不仅简化了业务与界面的依赖，还解决了数据频繁更新的问题，不用在用选择器操作DOM元素。因为MVVM中，View不知道Model的曾在，Model和ViewModel也观察不到View，这种低耦合模式提高代码的可重用性

vue是不是MVVM框架

Vue是MVVM框架，但是不是严格符合MVVM，因为MVVM规定Model和View不能直接通信，而Vue的ref可以做到这点。

### Vue与Jquery区别在哪？为什么放弃Jquery用Vue
1. jquery是直接操作DOM，Vue不直接操作DOM，Vue的数据与视图是分开的，Vue只需要操作数据即可
2. jquery的操作DOM行为是频繁的，而Vue利用虚拟DOM的技术，大大提高了更新DOM时的性能
3. Vue中不提倡直接操作DOM，开发者只需要把大部分精力放在数据层面上
4. Vue继承的一些库，大大提高了开发效率，比如Vuex，Router等

## 永恒钻石
### 为什么data是个函数并且返回一个对象呢
data之所以只是一个函数，是因为一个组件可能会多处调用，而每一次调用就会执行data函数并返回新的数据对象，这样，可以避免多处调用之间的数据污染

### 使用过那些Vue修饰符
![vue修饰符](./images/642.jpg)

## 资料
[50个vue知识点](https://mp.weixin.qq.com/s/wX6M6To1Hs0uQegtFMQZiA)

[vue3知识点](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651580020&idx=2&sn=c985c76526e894b214957687c96bb17e&chksm=802531b5b752b8a3733559865444019d12d091a02c1fa8c454d5f5ff29b66a7bdaa31feb206d&scene=21#wechat_redirect)
