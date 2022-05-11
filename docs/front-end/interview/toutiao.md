---
title: 头条面试题
---

## 一面
:都是基础，问的比较深，BFC、缓存、简单算法；递归、链表排序(冒泡、插入、快排、归并、希尔、堆排序)，常用的实现，考察了vue的一些原理和浏览器机制；递归、手动实现节流、防抖，比较麻烦的布局；
1. css Bfc static和relative的区别<br/>
> BFC块级格式化上下文；<br/>
static静态定位，relative相对的定位，z-index,top,left,right,bottom;

:::tip
BFC块级格式化上下文，三个特性

1. BFC会阻止垂直外边距(margin-top,margin-bottom)的重叠。当元素属于一个BFC时，两个元素才可能发生外边距重叠

2. BFC不会重叠浮动元素

3. BFC可以包含浮动

我们可以利用BFC的第三条特性来清除浮动。这里说清除浮动并不是太合适，应该说包含浮动，也就是父容器编程BFC就可以了，如何形成BFC呢

1. 根元素
2. float为left或right
3. overflow为hidden|auto|scroll
4. display为table-cell|table-caption|inline-block|flex|inline-flex
5. position为absolute|fixed

因此，我们可以为浮动元素的父容器添加上面这些属性来形成BFC达到清除浮动的效果。

hasLayout
我们知道在IE6,7有个hasLayout的概念，很多bug的源头正是它。
1. 当元素的hasLayout属性值为false的时候，元素的尺寸和位置由最近的祖先元素控制
2. 当元素的hasLayout属性值为true的时候会达到和BFC类似的效果，元素负责自身及其子元素的尺寸的定位

我们可以利用这点在IE6/7下完成清除浮动，首先我们要先看看如何使元素的hasLayout为true
1. position:absolute
2. float:left|right
3. display:inline-block;
4. width:除auto外
5. height:除auto外
6. zoom：除normal外
7. 在Ie7中使用overflow:hidden|auto|scroll也可以

Bfc清除浮动

综上，我们就可以得出利用BFC清除浮动的方法：

```css
  .clearfix{
     *zoom:1;
  }
  .clearfix:after{
      content:".";
      display:block;
      height:0;
      visibility:hidden;
      clear:left;
 }
或

 .clearfix{
     *zoom:1;
 }
 .clearfix:after{
     content:"";
     display:table;
     clear:both;
 } 
```
上面就是得出的两种浏览器兼容的方案。总之，清除浮动就两种方式

利用 clear 属性，清除浮动
使父容器形成BFC
今天，我们谈的是第二种的方法背后的原理，至于第一种是不涉及的。

:::
[BFC不会重叠浮动元素](https://www.cnblogs.com/accordion/p/4312623.html)

[CSS外边距(margin)重叠及防止方法](https://juejin.cn/post/6844903497045917710)

2. node require和import的区别，require看起来来像注册在全局
> node编程中最重要的思想就是模块化，import和require都是被模块化所使用

- 遵循规范

    <span style="color: blue">require是AMD规范引入；</span><br/>
    <span style="color: blue">Import是es6的一个语法标准，如果要兼容浏览器的话就必须转化成es5语法</span>

- 调用时间

    <span style="color: blue">require是运行时调用，所以require理论上可以运用在代码的任何地方</span><br/>
    <span style="color: blue">import是编译时调用，所以必须放在文件开头</span>

- 本质

    <span style="color: blue">require是赋值过程，其实require的结果就是对象、数字、字符串、函数等，再把require的结果赋值给某个变量</span><br/>
    <span style="color: blue">import是解构过程，但是目前所有的引擎都还没有实现import，我们在node中使用babel支持ES6，也仅仅是将ES6转码为ES5再执行，import语法会被转码为require</span>
  
3. 写版本号排序的代码（及优化），时间复杂度<br/>

```js
//第一种
var arr = ['0.5.1','0.1.1','2.3.3','0.302.1','4.2','4.3.5','4.3.4.5'];
arr.sort((a, b) => {
    let i = 0; 
    const arr1 = a.split('.');
    const arr2 = a.split('.');
    while(true) {
        const s1 = arr1[i];
        const s2 = arr2[i++];
        if (s1 === undefined || s2 === undefined) {
            return arr2.length - arr1.length;
        }
        if (s2 === s1) continue;
        return s2- s1;
    }
})
```
[js判断对多个版本号进行排序怎么做](https://segmentfault.com/q/1010000013556204)

4. http 的 cache ，浏览器如何获取设置
强缓存&协商缓存
5. react 的diff算法，key 的作用
更高效的优化虚拟node
6. 是否喜欢看源码，看源码的感觉
7. 实现一个add方法，使计算结果能够满足如下预期：<br/>
add(1)(2)(3) ()<br/>
add(1, 2, 3)(4)()<br/>
```javascript
function add() {
	var _args = Array.prototype.slice.call(arguments);
    function _adder() {
    	_args.push(...arguments);
        return _adder;
    }
    _adder.toString = function() {
    	return _args.reduce(function (a, b) {
            return a + b;
        });
    }
    return _adder;
}

// 解答
function sum(...args) {
    return args.reduce((a, b) =>  a + b, 0)
}
function curry(func) {
    let args = [];
    return function temp(...newArgs) {
        if (newArgs.length) {
            args = [
                ...args, 
                ...newArgs
            ]
            return temp
        } else {
            let val = func.apply(this, args)
            args = [];
            return val;
        }
    }
}
let add = curry(sum);
console.log(add(1,2)(2)())

```
8. 项目优化
9. 浏览器重绘和回流<br/>
页面中节点一部分或者全部改变布局，显示隐藏引起页面重新构建的--回流<br/>
改变节点的属性引起外观改变，不改变页面布局的--重绘
10. 虚拟dom的好处<br/>
减少频繁操作DOM，优化页面性能(频繁操作DOM，造成页面卡段)

11. 动态规划求解最多有几种方案求解硬币找零问题
```js
// 贪心
const MinCoinChange = (coints, amount) => {
    coints = coints.sort((a, b) => b - a);
    let change = [];
    let total = 0;
    for (let i = 0; i < coints.length; i++) {
        let coin = coints[i];
        while(total + coin <= amount) {
            change.push(coin);
            total += coin;
        }
    }
    return change;
}
console.log(MinCoinChange([1,2,5,10], 36))
```
[最小硬币数](https://leetcode-cn.com/problems/gaM7Ch/)
```js
// 输入：coins = [1, 2, 5], amount = 11
// 输出：3 
// 解释：11 = 5 + 5 + 1

var coinChange = function(coins, amount) {
    let dp = new Array(amount+1).fill(Infinity);
    dp[0] = 0;
    for(let i = 1; i <= amount; i++){
        for(let coin of coins){
            if(i - coin >= 0){
                dp[i] = Math.min(dp[i],dp[i-coin]+1);
            }
        }
    }
    return dp[amount] == Infinity ? -1 : dp[amount];

};
```
12. 比较vue 和react ， React 代码与Vue 代码互转和复用
	- vue适合小而精的项目，react则更适合偏大的项目
	- vue双向绑定 react单向数据流
    - react是JSX,Vue是模板语法
    - react推崇函数式编程
13. 关于异步任务执行的题目，涉及主线程任务、宏任务、微任务
14. 场景：从1-10，按顺序每秒输出一个数字
```js
var i = 0;
var timer = setInterval(function () {
	console.log(i++)
	if (i>10) {
		clearInterval(timer);
	}
},1000)
```
15. 变量提升，函数内 var 和 let 声明的执行结果各怎样

    ```js
    var a = 10;
    function say() {
        console.log(a);
        var a = 20;
        // var let a = 20;
        console.log(a);
    }
    ```
16. css 垂直居中
```css
//弹性盒模型
display:flex;
align-item:center;
justify-content:center;
```
17. css 3D 加速
```
	GPU处理
```
18. redux 的优缺点
19. react 中 render props 适用场景（类组件和函数组件的区别）
20. 浏览器缓存策略及相应流程<br/>
[参考文档](https://www.cnblogs.com/slly/p/6732749.html)https://www.cnblogs.com/slly/p/6732749.html
21. 手写 Promise.all
22. 垂直居中
23. arguments是数组吗？如果不是，怎么转换成数组？
24. event loop
25.  手写节流函数
26. event loop， css动画， webpack 插件 ， react 生命周期， promise
27.  设计和产品规划的一个组件，但是基础组件库没有，rax 的
28. HTTPS 和 HTTP 的区别
29. 浏览器是单进程吗？进行和线程的区别？<br/>
浏览器是多进程
30.  什么时候传值，什么时候传变量
31. 问了debounce的实现，居中定位的各种方法，给了一个数组求两数相加和等于m总共有多少种可能性，还有问怎么定位排查用户反馈页面性能问题，性能方面的问题聊了比较久
32. arguments
33. Array.prototype.slice.call(arguments);
34. arguments 为什么可以通过上述方式转为数组?
```js
代码执行顺序
// 同步代码
console.log('begin');
// setTimeout 添加一个 宏观任务
setTimeout(() => {
    // 同步
    console.log('setTimeout 1');
    // 微观任务
    Promise.resolve()
    .then(() => {
        // 同步
        console.log('promise 1');
        // 添加宏观任务
        setTimeout(() => {
            console.log('setTimeout2 between promise1&2');
        })
    })
    .then(() => {
        // 微观任务
        console.log('promise 2');
    });
}, 0);
// 同步代码
console.log('end');
结果:
    begin
    end
    setTimeout 1
    promise 1
    promise 2
    setTimeout2 between promise1&2
arguments 如何转数组, 尽可能多方式
[...arguments];
Array.prototype.slice.call(arguments);
function(...arg) {}
Array.from(arguments)
```
35. react setState什么时候同步什么时候异步
36. render props和HOC优缺点
37. 手写promise
问的都和自己项目有关的，编程题一道CSS的10px字体无法显示的解决方案，transform:scale，防抖
1. 
 console.log('begin');
setTimeout(() => {
    console.log('setTimeout 1');
    Promise.resolve().then(() => {
        console.log('promise 1');
        setTimeout(() => {
            console.log('setTimeout2 between promise1&2');
        })
    }).then(() => {
        console.log('promise 2');
    });
}, 0);

console.log('end');
请说出执行结果，并谈一下对事件循环（event loop）的理解
38. 解释一下边距重叠？以及如何解决。什么是BFC？
39. 浏览器的绘制原理，重排及重绘

40. 请实现 DOM2JSON 一个函数，可以把一个DOM节点输出JSON的格式，例如下面的例子

```bash
<div>

  <span>  

    <a></ a>

  </span>

  <span>

    <a></ a>

    <a></ a>

  </span>

</div>


{

  tag: 'DIV',

  children: [

    {

      tag: 'SPAN',

      children: [

        { tag: 'A', children: [] }

      ]

}
```
```bash
//解决问题
function DOM2JSON(node) {
	var obj = {};
    obj['tag'] = node.nodeName;
    obj['children'] = [];
    var child = node.children;
    for (var i = 0; i < child.length; i++) {
    	obj['children'].push(DOM2JSON(child[i]))
    }
    return obj;
 }
```

41. 请实现如下的函数，可以批量请求数据，所有的 URL 地址在 urls 参数中，同时可以通过 max 参数控制请求的并发度，当所有请求结束之后，需要执行 callback 回掉函数。发请求的函数可以直接使用 fetch 即可
```
function sendRequest(urls: string[], max: number, callback: () => void) {
}
```
42.ts class里面怎么实现一个runtime里面访问不到private的属性
43.闭包的变量内存怎么分布的

44. 协程与同步异步

```
//http://zhangchen915.com/index.php/archives/719/
//https://blog.poetries.top/browser-working-principle/guide/part1/lesson01.html

```

45.实现一个Promise.all

47.[-1,-2,8,9,-10] 求最大和

48.webpack的plugin与loader的区别，有没有写过plugin或者loader？

49.React的diff算法原理？

50.Node的SSR是否有做过，怎么做的？

51.项目中自认为最好的项目是哪个，做了哪些比较有价值的事？

52.重绘与回流？

53.虚拟dom的好处?

54.编程题：

DomtoJson:将Dom树写成Json格式？
链表环检测?
请实现如下的函数，可以批量请求数据，所有的 URL 地址在 urls 参数中，同时可以通过 max 参数控制请求的并发度，当所有请求结束之后，需要执行 callback 回掉函数。发请求的函数可以直接使用 fetch 即可
function sendRequest(urls: string[], max: number, callback: () => void) {
}

55.arguments是数组吗？如果不是，怎么转换成数组？

56. macrotask和microtask

57. 手写双向绑定实现，两种

58. 顺序延时输出数组里的每一项

59. promise是如何实现链式调用的

60. 在哪些情况下一个元素绑定的点击事件不会被触发

61. 一个完全二叉树，全部是大于0的整数，给出一个整数N，问从二叉树的根部开始向下，存不存在一个路径，使路径上所有的点的和是N

62. N级台阶，一次只能跳3级4级或者5级，请问一种有多少种跳法

63. 自我介绍，结合简历中写的项目问整个项目的架构设计

64. 算法题，给一个字符串，给出该字符串字符的所有排列组合方式

65. 前端代码题：EventEmitter 的实现

66. http 协商缓存和强缓存

67. 项目中的沉淀，做的比较好的项目

68. node 开发相关，基于node 的项目介绍


## 二面
1. 都是vue各种原理解析. react原理. http协议理解. 用法；
2. 各种异步任务执行顺序，类型转换；算法：动态规划
3. 讲一下收获最大的项目
4. 讲一下 react 常用的优化项
5. 讲一下 dom-diff 算法
6. 实现下面功能
 ```
    class Scheduler {
        add(promiseCreator) {
        	// 手写代码部分
             return new Promise((resolve, reject) => {
            promiseCreator().then(res => {
                resolve()
            })
        })
        }
    }
 
    const timeout = (time) => new Promise(resolve => {
        setTimeout(resolve, time)
    })
 
    const scheduler = new Scheduler()
    const addTask = (time, order) => {
        scheduler.add(() => timeout(time))
            .then(() => console.log(order))
    }
 
    addTask(1000, '1')
    addTask(500, '2')
    addTask(300, '3')
    addTask(400, '4')
    // output: 2 3 1 4
 
    // 一开始，1. 2两个任务进入队列
    // 500ms时，2完成，输出2，任务3进队
    // 800ms时，3完成，输出3，任务4进队
    // 1000ms时，1完成，输出1
    // 1200ms时，4完成，输出4
```
7. 实现下面功能
```js
    function sum() {
        //...
    }
    console.log(sum(2,3)); // 输出5
    console.log(sum(2)(3)); // 输出5
```
8. 实现一个函数sum， 运算结果可以满足如下预期结果：
sum(1, 2, 3).valueOf(); //6
sum(2, 3)(2).valueOf(); //7
sum(1)(2)(3)(4).valueOf(); //10
sum(2)(4, 1)(2).valueOf(); //9
9. redux   saga     vue   订阅. 发版   双向绑定    观察者模式     设计模式    单例    中介者    高阶组件
reflow repaint     获取       react性能优化   houldComponentUpdate     function component  
diff    key   immutable   equal    redux性能   connect     reselect    多线程    多进程  web首屏
3个js文件，300k，是否需要合并为900k的js   tcp    并发上线    多域名  dns, tcp  tcp  keep-alive
http2   nw electron
10. 继承和原型链，浏览器窗口居中，宏任务与微任务，性能优化，深度克隆，算法题（题目非常长，没有记下来）
11. 链表环检测
12. 聊聊动态规划,红黑树原理
13. 自适应search框; input + button 布局;
14. 页面性能优化
15. vue diff算法,key作用;
// 实现 sum 函数
sum(1, 2, 3).valueOf();      //6
sum(2, 3)(2).valueOf();      //7
sum(1)(2)(3)(4).valueOf();   //10
sum(2)(4, 1)(2).valueOf();   //9
16. Promise
17. Promise.all 返回值
18. 实现方式?
入参,返回值,内部实现
Promise.then 如何实现链式调用,返回值是什么?
为什么每次返回新 Promise, 像 jquery 那样直接返回 this 不行吗?
[1,2,2,3,2,1]
有以上数组输出字符串 (不考虑缩进): 
尽量不用到 domApi
<ul>
<li deep="1">
        <ul>
            <li deep="2"></li>
            <li deep="2">
                <ul>
                    <li deep="3"></li>
                </ul>
            </li>
            <li deep="2"></li>
        </ul>
    </li>
    <li deep="1"></li>
</ul>
19.  React 和 Vue 的区别
20. Vue 数据双向绑定，在一个文件里面
    - React jsx 和 style 拆分得比较好（可能是历史问题），模块化
    - （生命周期不同？）
    - 强调 React 比较多比较熟悉
- react 高阶组件，比如 withRouter（没了解）
21. 伪元素
    - before
    - after 的作用
    - 比如说画图，画三角形（before 和 after 是内外？）
        - border-left： 50% 50% transparent
        - border-right:  50% 50% transparent
        - border-top:   100% 100% red
22. css 选择器的优先级
    - id 扫描器，最优先，扫描到就不继续往下扫码了
    - class 全扫描，并且是倒着来的
    - a.classNameA 的优先级比 .classNameA 高
    - 其他的暂时没了解
23.  常见的垂直和水平居中
24. 文字的
        - text-align
        - height 和 line-hieght
25. 块级元素的
        - display: table-cell
        - vertical-align: middle
    - margin: 0 auto
26. 相对定位
        - postion: relative， left: 50% 相对于父级左移 50%
        - trasform: 相对于自己左移 50%
27. 写了一个数据去重的算法
    - 判断条件如果不用 indexOf 用啥
    - filter
28.  React 的生命周期
    - react 16 的新特性
        - componentDidCatch
        - 还有另一个仅监听子组件错误的
        - 还有两个属性用于支持 fiber 的（可以渲染到一半看看有没有更高优先级的属性）
29. key 有什么用
        - 用于 diff 算法的优化
            - diff 算法的大前提
            - 用于数据的排序优化
30. 两个同级的 react 组件如何通信
    - 通过父组件
    - mbox 的 store（父组件 provider + 子组件 inject）
    - React 16 的 context？
    - React 16 的一个新属性
        - 子组件传递给父组件，父组件更新 state 然后修改子组件的 props，会导致子组件二次渲染，用于解决这个问题
31.  constructor 和 didMount 的区别
- 为什么请求不能放在 constructor 里面
    - state 可能在 constructor 里面或外面（一般习惯性写外面，但这样 state 都没有定义，setState 不方便控制内存）
    - 无 fiber 的情况下组件层层渲染会阻塞，可能请求回来了还没有初次 render 结束
32. 多个请求同时发送
    - promise.all
33. 定义一个通用回调函数，外面有个变量来统计回调返回的数量，达到后再统一执行代码
34.请求头有哪些信息？各自的作用是什么？
35.编程题
快速排序与插入排序？
二叉树遍历？
异步. 微任务. 宏任务的一道输出顺序题
柯里化操作编程
36. 一个数组，里面有N个整数不重复，求这个N个整数中缺少的最小正整数，要求时间复杂度是O(n)
37. 1000万ip地址，设计一个系统最快的查出某个ip地址在不在其中
38. hashMap的实现原理
39. 具体项目的相关问题
40. node 开发，登陆机制的实现，性能调试，监控
41. 移动端开发和pc端开发的不同之处
42. 移动端适配方案，rem 计算相对那个元素的 fontsize
43. Html meta 标签介绍，和性能相关的标签
44. 页面中某个请求特别慢可能原因定位
45. 算法题：二叉查找树，插入，遍历
46. 前端题：柯里化函数的实现
47. 前端题：vue 双向绑定机制实现
三面：
1. 主要聊的项目，最后面试官问了一道题，出了一个按顺序打印异步请求结果的题目，用闭包
2. 聊了一个小时，问得也都不是常规问题，比如性能, 他不问性能优化的措施, 问的是我的性能数据从哪来，另外我说我搭了一套发布工具来解决发布问题, 他也不问实现逻辑是什么, 问的是发布记录的数据容灾；就让我写了个异步加载的方法
3. 1. 介绍项目
4. flex 实现居中
5. 异步执行结果
    ```js
    setTimeout(() => console.log(1));
    new Promise((resolve) => {
        console.log(2); 
        resolve(3)
    }).then(a => console.log(a))
    ```
6. xss. xsrf 防御手段
7. 场景题
    ```
    # 题目描述  
 
    有 A B C D E 5所学校。在一次检查评比中，已知 E 肯定不是第二名或第三名，他们相互进行推测。
    A：E一定不是第一名；B: 我校第二名；C：A校最差；D：C不是最好；E: D是第一名。结果这只有实际排名为第一和第二名的学校猜对了，其他学校都猜错了。
  请编写一个程序，求出这5所学校的名次。
 要求编码清楚，简单。  设计时考虑一定的灵活性，猜测可能更复杂，如：C: A的排名和B的排名的乘积再减去D的排名的结果是7
 # 使用说明
 1. 先提示不是智力题
 2. 确保面试者清楚完理解完题意再开始解题
 3. 先描述清楚解法再开始编码
 # 补充
 可以认为已知所有可能的排列情况，直接判断。

8. 如何采集错误?

9. 如何解决 window.onerror 监听跨iframe错误?

10. 页面内一个元素点击后没有执行事件监听函数,原因可能有哪些?如何定位到问题代码?

11. 算法: 回文数字判断,要尽可能高效的算法.

12. 级联组件设计,及很大数据量时的优化;

13. 页面卡顿如何定位,如何优化.

14. 讲讲做过最难/有价值项目?学到什么?有啥问题,如何解决?

15. 业务项目问题,性能问题,问题定位, 会被反复问到

> http1-http2、缓存优化、加载链路优化、加载距离优化、响应顺序优化、文件大小优化、打包工具

16. 用正则表达式把一个数字字符串分割成千分位形式

[参考文档](https://blog.csdn.net/weixin_30487317/article/details/97648553)

```js

var str = '100000000000';
var reg = /(?=(\B\d{3})+$)/g;
console.log(str.replace(reg, ','))


// 方法二
function numFormat(num) {
    num = num.toString().split('.');
    let arr = num[0].split('').reverse();
    let res = [];
    for (let i = 0, len = arr.length; i++) {
        if (i % 3 === 0 && i !== 0) {
            res.push('.')
        }
        res.push(arr[i]);
    }
    res.reverse();
    if (num[1]) {
        res = res.join('').concat('.' + num[1]);
    } else {
        res = res.join('')
    }
    return res;
}
// 方法三
var a = 1231242354;
console.log(a.toLocaleString())
```

17. 前端优化的思路和方法
18. 聊的都是具体的项目


面试形式：网上直接写代码，或者笔试，聊天的形式都有可能；3论技术面+1轮hr面
如果是视频面试，请提前10分钟进入链接，检查好耳机和摄像头
总结：1. 算法只是加分项，https://leetcode-cn.com/explore/featured/card/bytedance/
建议优先刷这个页面的题目，再刷其它的基础算法题
2. 温馨提醒：头条面试有一定的难度，请一定准备充足在面试
3. 心态很重要，如果一上来考了一个算法题，如果没有回答好，请不要灰心，算法只是加分项，调整心态，把后面的题目回答好，一样可以通过；结束时可以请教面试官算法题的思路

4. 面试过程中题目一定要写出多种答案，面试官可能会问每种答案的优缺点，如果面试过程中有回答不上来的题目，千万不要直接回答：不知道！可以请教面试官，如：这个地方是这样吗？有哪些书籍或者资料可以查询？哪怕只有一般的思路，也要讲出来，和面试官一起切磋，面试官的目的不是难倒你，而是想考察你的思路。
5. 面试结束时，面试官一般会问：你有什么问题问我的吗？（请不要问一些技术无关的问题，比如：几点下班，团队现在多少人等；这些问题可以留给我或者hr来解答 。最好是根据面试情况，问一下技术方向的话题，比如性能优化你回答的不好，问面试官，如何提高这方面的技术，尽量表现出对技术的追求，面试官会喜欢的）
6. 无论你出于什么目的参加面试，请尊重面试机会，初试面试官可能级别不高，主要考察基础知识，请知晓。面试过程中把最好的素养和丰富的知识展现出来，大厂每次面试，都会留档，面试过程愉快和良好，对以后的跳槽也是有好处的。面试的好，谈薪的时候，才有可能谈到更高的薪资
7. 上一轮面试没有回答出来的题目，下一轮面试很有可能再次考到，请在等待下一轮面试官的过程中，再想一下最优解（如果2次面试分开面试的，回去一定好好复习上轮面试回答不好的题目，然后做一下拓展），有人选3次都有问同一道题
8. 最近很多人选，反复考到性能优化的题目，请好好复习，祝面试顺利！
9. 面经请不要外传，不要给自己增加竞争对手，也请理解我的工作，谢谢！