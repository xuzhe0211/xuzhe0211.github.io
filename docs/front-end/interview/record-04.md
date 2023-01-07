---
autoGroup-0: 面试记录
title: 5 年前端 - 历时 1 个月收获 7 个 offer
---
## 滴滴
### 一面
- 闭包是什么?闭包的用途
- 简述事件循环原理
- 虚拟dom是什么？原理？优缺点

    <span style="color: red">虚拟DOM其实就是用Javascript对象表示的一个DOM节点，内部包含了节点的tag,props和children</span>

    [JSX和虚拟DOM](/source-react/react-01.html)
- vue和react在虚拟dom的diff上，做了哪些改进使得速度很快？
- vue和react里的key的作用是什么？为什么不能用Index？用了会怎么样？如果不加key会怎么样？
- vue双向绑定的原理是什么？
- vue的keep-alive的作用是什么？怎么实现的？如何刷新 [vue-keep-alive](/source-vue/vue-keepalive.html)
- [vue是怎么解析template的?template会变成什么？](https://segmentfault.com/a/1190000015432258)
- [如何解析指令?模板变量?html标签](https://segmentfault.com/a/1190000040247579)
- 用过vue的render吗？render和template有什么关系？
- 代码题;实现一个节流函数，如果想要最后一次必须执行的话怎么实现？
- 代码题:实现一个批量请求函数，能够限制并发量

### 二面
- 代码题:数组转树结构

### 终面
- 代码题：去除字符串中出现次数最少的字符，不改变原字符串顺序
    ```js
    // ababac -> ababa
    //“aaabbbcceeff” —— “aaabbb”

    ```
- 代码题:写出一个函数trans,将数字转换成汉语的输出，输入不超过10000亿的数字

    ```js
    // trans(123456) —— 十二万三千四百五十六
    // trans（100010001）—— 一亿零一万零一
    const numberToString = number => {
        if(number.match(/\D/) || number.length >= 14) return;
        let zhArray = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']; // 对应中文数字
        let baseArray = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万']; //进位填充字符，第一位是 个位，可省略
        let string = String(number).split('').reverse().map((item, index) => {
            item = Number(item) == 0 ? zhArray[Number(item)] : zhArray[Number(item)] + baseArray[index];
            return item;
        }).reverse().join('');
        string = string.replace(/^一十/, '十');
        string = string.replace(/零+/, '零');
        return string
    }
    console.log(numberToString('123456789'))
    ```
    [js中把数字转换成汉字输出](https://blog.csdn.net/coldriversnow/article/details/125502015)

## 58
### 一面
- 对前端工程化的理解
- 前端性能优化都做了那些工作
- Nodejs异步IO模型
- libuv
- 设计模式
- 微前端
- 节流和防抖
- react有自己封装一些自定义hooks吗？vue有自己封装的一些指令吗？
- vue向react迁移是怎么做的？怎么保证兼容性的
- vue双向绑定原理
- Node的日志和负载均衡怎么做的
- 那前后端的分工是怎样的？那些后端那些node做的
- 给出代码的输出顺序

    ```js
    async function async1() {
        console.log('async1 start');
        await async2();
        console.log('async1 end')
    }
    async function async2() {
        console.log('async2');
    }
    console.log('script start');
    setTimeout(() => {
        console.log('setTimeout');
    }, 0)
    async1();
    new Promise((resolve) => {
        console.log('promise1');
        resolve();
        console.log('promise2')
    }).then(function() {
        console.log('promise3')
    })
    console.log('script end'); 

    // script start 、async1 start、async2、 promise1, promise2,script end async1 end、promise3。 setTimeout
    ```
- 代码题:给几个数组,可以通过数值周到对应的数组名称

    ```js
    // 比如这个函数输入一个1,那么要求函数返回A
    const A = [1,2,3];
    const B = [4,5,6];
    const C = [7,8,9];

    function test(num) {

    }
    ```
### 二面
- 了解过vue3吗？
- websocket的连接原理
- react生命周期
- redux原理
- vue 父子组件的通信方式
- async await的原理是什么？
- async/await, generator,promise这三个的关联和区别是什么？
- 场景设计:设计一个转盘组件,需要考虑什么？需要和业务方协调好哪些技术细节？前端如何防刷

### 三面
- 代码题:数组转树，写完之后问如何在树中新增节点或删除节点，函数应该怎么扩展

    ```js
    const arr = [{
            id: 2,
            name: '部门B',
            parentId: 0
        },
        {
            id: 3,
            name: '部门C',
            parentId: 1
        },
        {
            id: 1,
            name: '部门A',
            parentId: 2
        },
        {
            id: 4,
            name: '部门D',
            parentId: 1
        },
        {
            id: 5,
            name: '部门E',
            parentId: 2
        },
        {
            id: 6,
            name: '部门F',
            parentId: 3
        },
        {
            id: 7,
            name: '部门G',
            parentId: 2
        },
        {
            id: 8,
            name: '部门H',
            parentId: 4
        }
    ]
    ```
### 交叉面
- 虚拟列表怎么实现？
- 做过哪些性能优化？

### 终面
- 项目相关

## 金山
### 一面
- vue和React在技术层面的区别
- 常用的hooks都有哪些？
- 用hook都遇到过哪些坑？
- [了解useReducer吗？](/source-react/react-api.html#react-hooks)
- <span style="color: red">组件外侧let a = 1 组件内侧点击事件更改a，渲染的a会发生改变吗(会)？如果let a 放在组件内，有什么变化(不会)？和useState有什么区别</span>
- 了解过vue3吗？
- Node是怎么部署的？pm2守护进程的原理？
- Node开启子进程的方法有哪些？
- Node开启子进程的方法有哪些？(process.exec,spawn, fork execFile)
- 进程之间如何通信
- css三列等宽布局如何实现？flex: 1是代表什么意思(1 1 0)？分别有哪些属性
- 前端安全
    - csp是为了解决什么问题的？
    - https是如何安全通信的
- 前端性能优化做了那些工作
- 代码题:不定长二维数组的全排列

    ```js
    // 输入 [['A', 'B', ...], [1, 2], ['a', 'b'], ...]

    // 输出 ['A1a', 'A1b', ....]
    function compile(nums) {
        let res = [];
        let len = nums.length;
        const dfs = (items, path, index = 0) => {
            if(path.length === len) {
                res.push(path);
                return;
            }
            for(let item of items) {
                dfs(nums[index + 1], path + item, index + 1)
            }
        }
        dfs(nums[0], '');
        return res;
    }
    ```
- <span style="color: red">代码题:两个字符串对比，得出结论都做了什么操作，比如插入或者删除</span>

    ```js
    // pre = 'abcde123'
    // now = '1abc123'
    // a前面插入了1, c后面删除了de

    ```
    [参考--编辑距离](/front-end/Code/#动态规划-编辑距离)

### 终面
- 场景设计:大数据列表如何设计平滑滚动和加载，下滑在下滑的操作，上下两个buffer区间如何加载和加载数据

## 便利蜂(offer)
### 二面
- js中闭包
- 解决过的一些线上问题
- <span style="color: red">线上监控，对于crashed这种怎么监控？对于内存持续增长，比如用了15分钟才出现问题怎么监控</span>
- <span style="color:red">对于linux熟吗？top命令的属性大概聊一下</span>
- 301、302、304的区别

### 三面
- 代码题 sleep函数
- 代码题 节流防抖

## 小红书
### 一面
- [<span style="color: red">输出什么？为什么</span>](/front-end/interview/demo3-1.html#总结)

    ```js
    var b = 10;
    (function b() {
        b = 20;
        cosnole.log(b)
    })();
    /* 输出
    ƒ b() {
        b = 20;
        console.log(b)
    }
    */ 
    ```
- 代码输出顺序题

    ```js
    async function async1() {
        console.log('1');
        await async2();
        console.log('2')
    }
    async function async2() {
        console.log('3');
    }
    console.log('4')
    setTimeout(() => {
        console.log('5');
    }, 0)
    async1();
    new Promise(resolve => {
        console.log('6');
        resolve();
    }).then(() => {
        console.log('7');
    })
    console.log('8'); 
    // 4, 1, 3, 6, 8, 2, 7, 5
    ```
- async await 的原理是什么？
- async/await，generator, promise这三者的关联和区别是什么？
- BFC是什么？那些属性可以构成BFCne ?
- position属性大概讲一下，static是什么表现，static在文档流里吗？
- webpack原理，plugin loader热更新等等
- Set和Map
- Vue的keep-alive原理以及生命周期
- vuex
- 代码题:ES5和ES6的继承？这两种写法除了写法，还有其他区别吗？
- EventEmitter

### 二面
- 浏览器从输入url开始发生了什么？
- React生命周期
- <span style="color: red">Redux的原理</span>
- vue父子组件的通信方式
- vue的双向绑定原理
- 对vue3的了解？vue3是怎么做的双向绑定
- 代码题：使用promise实现一个异步流量控制的函数，比如一共10个请求，每个请求的快慢不同，最多同时3个请求发出，快的一个请求返回后，就从剩下的7个请求中再找一个放到请求池里，如此循环

    ```js
    const multiRequest = (requests, maxlimix) => {
        let ret = [];
        let i = 0;
        let promise = new Promise((resolve, reject) => {
            const addTask = () => {
                if(i >= requests.length) return resolve();
                const task = requests[i++]().finally(() => {
                    addTask();
                })
                ret.push(task);
            }
            if(i < maxlimix){
                addTask();
            }
        })
        return promise.then(Promise.all(ret))
    }
    function request(url) {
        return new Promise(resolve => {
            setTimeout(resolve, Math.random * 1000, url)
        })
    }
    const p1 = new Promise(resolve => setTimeout(resolve, 1000, 'fn1'))
    const p2 = new Promise(resolve => setTimeout(resolve, 1000, 'fn2'))
    const p3 = new Promise(resolve => setTimeout(resolve, 1000, 'fn3'))
    const p4 = new Promise(resolve => setTimeout(resolve, 1000, 'fn4'))
    multiRequest([p1, p2, p3, p4], 4).then(()=>{
        console.log('finish')
    })
    ```
## UMU(OFFER)
### 一面
- [node.js如何调试](https://www.ruanyifeng.com/blog/2018/03/node-debugger.html)
- charles map local/map remote
- [chrome devtool如何查看内存情况](https://zhuanlan.zhihu.com/p/80792297)

### 二面
- koa洋葱型模型

    中间件之间通过next函数联系，当一个中间件调用next后，会将控制权交给下一个中间件，直到下一个中间件不在执行next()后，将会沿路折返，将控制权一次交换给前一个中间件
- <span style="color: red">中间件的异常处理是怎么做的？</span>
- 在没有async await的时候,koa是怎么实现洋葱模型的？
- body-parser中间件了解吗？(获取二进制流、内容解码、字符解码、字符串解码)
- 如果浏览器端用post接口上传图片和一些其他字段，header里会有上面？koa里如果不用body-parser，应该怎么解析
- websocket的连接原理
- https是如何保证安全的？是如何不被中间人攻击的

### 终面
- 代码题:给一个字符串，找到第一个不重复的字符

    ```js
    //ababcbdsa
    //abcdefg
    const fn = str => {
        let map = {};
        for(let s of str) {
            map[s] = (map[s] || 0) + 1
        }
        for(let key in map) {
            if(map[key] === 1) return key;
        }
    }
    ```
- 时间复杂度是多少
- 除了给的两个用例，还能想到上面用例来测试一下？

## 网易
- 你觉得js里this的设计之美样，有没有什么缺点啥的？
- vue的响应时开发比命令式有什么好处
- 装饰器
- vuex
- <span style="color: red">generator是如何做到中断和恢复的</span>-[Generator函数暂停恢复执行原理](https://blog.csdn.net/qq_42698576/article/details/109517157)
- function和箭头函数的定义有什么区别?导致了在this指向这块表现不同
- 导致js里this指向混乱的原因是什么？
- 浏览器的事件循环
- [宏任务与微任务的区分是为了做什么？优先级](https://juejin.cn/post/7088323765762785287)
- 代码题:实现compose函数，类似于koa的中间件洋葱型模型

    ```js
    // 题目需求
    let middleware = [];
    middleware.push(next) => {
        console.log(1);
        next();
        console.log(1.1)
    }
    middleware.push((next) => {
        console.log(2);
        next();
        console.log(2.1);
    })
    middleware.push((next) => {
        console.log(3);
        next();
        console.log(3.1)
    })
    const fn = compose(middleware);
    fn();

    // 实现compose函数
    function compose(middlewares) {
        return function() {
            return dispatch(0);
            function dispatch(i) {
                let fn = middlewares[i];
                if(!fn) return Promise.resolve();
                return Promise.resolve(
                    function next() {
                        dispatch(i + 1)
                    }
                )
            }
        }
    }
    ```
- 代码题:遇到退格字符就删除前面的字符，遇到两个退格就删除两个字符

    ```js
    // 比较含有退格的字符串，"<-"代表退格键，"<"和"-"均为正常字符
    // 输入："a<-b<-", "c<-d<-"，结果：true，解释：都为""
    // 输入："<-<-ab<-", "<-<-<-<-a"，结果：true，解释：都为"a"
    // 输入："<-<ab<-c", "<-<a<-<-c"，结果：false，解释："<ac" !== "c"
    function fn(str1, str2) {
        s = s.replace(/<-/g, '#')
        t = t.replace(/<-/g, '#')
        let i = s.length;
        let j = t.length;
        let skips = 0;
        let skipt = 0;
        while(i >= 0 || j >= 0) {
            // s循环
            while(i >= 0) {
                if(s[i] === '#') {
                    skips++;
                    i--;
                } else if(skips > 0) {
                    skips--;
                    i--;
                } else break;
            }
            while(j >= 0) {
                if(t[j] === '#') {
                    skipt++;
                    j--;
                } else if(skipt > 0) {
                    skipt--;
                    j--;
                } else break;
            }
            if(s[i] !== t[j]) return false;
            i--; 
            j--;
        }
        return true;
    }
    ```
    [844. 比较含退格的字符串](https://leetcode.cn/problems/backspace-string-compare/solution/shuang-zhi-zhen-bi-jiao-han-tui-ge-de-zi-8fn8/)
## 快手(offer)
### 一面
1. 小程序的架构？双线程分别做了什么事情？
2. <span style="color: red">为什么小程序里拿不到dom相关的api</span>

    开发者可以使用各种浏览器暴露出来的DOM api,进行DOM选中和操作。而在小程序中，二者是分开的，分别运行在不同的线程中，逻辑层运行在JSCore中，并没有一个完整浏览器对象，因而缺少相关DOM API和BOM API。

3. 代码输出提
    ```js
    console.log(typeof typeof typeof null); // tring
    console.log(typeof console.log(123)); // undefined
    // 等价于 console.log(typeof (function() {console.log(123)})()) // undefined
    // 等价于 console.log(typeof (function() {return 1})()) // number
    ```
4. this指向题

    ```js
    var name = '123';
    var obj = {
        name: '456',
        print: function() {
            function a() {
                console.log(this.name);
            }
            a();
        }
    }
    obj.print();// 123
    ```
5. 代码题:实现一个函数，可以间隔输出

    ```js
    function createRepeat(fn, repeat, interval) {
        return async function(...args) {
            for(let i = 0; i < repeat; i++) {
                await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        fn.call(this, ...args);
                        resolve();
                    }, interval);
                })
            }
        }
    }
    const fn2 = createRepeat(console.log, 3, 4);
    fn2('helloWorld'); // 每4秒输出一次helloWorld, 输出3次
    ```
6. 代码题:删除链表的一个节点

    ```js
    function(head, node) {
        let cur = head;
        while(cur) {
            if(cur.next === node) {
                cur = cur.next.next;
            }
            cur = cur.next;
        }
        return head;
    }
    ```
7. 实现LRU算法

    ```js
    function LRU(capacity) {
        this.map = new Map();
        this.maxNum = maxNum
    }
    LRU.prototype.get = function(key) {
        if(this.map.has(key)) {
            let value = this.map.get(key);
            this.map.delete(key)
            this.map.set(key, value)
            return value;
        } else {
            return -1;
        }
    }
    LRU.prototype.set = function(key, value) {
        if(this.map.has(key)) {
            this.map.delete(key)
        }
        this.map.set(key, value);
        if(this.map.size > this.capacity) {
            this.map.delete(this.map.keys().next().value);
        }
    }
    ```
### 二面
1. Promise then 第二个参数和catch的区别是什么？
2. Promise.finally怎么实现的
3. 作用域链
4. Electron架构
5. 微前端
6. webpack5模块联邦
7. Webworker
### 三面
项目

## 高德
- Symbol
- useRef/ Ref / forwardsRef 的区别是什么？
- useEffect的第二个参数，传空数组和传依赖数组有什么区别
    - 如果return 了一个函数, 传空数组的话是在什么时候执行? 传依赖数组的时候是在什么时候执行?
- flex布局
- ES5继承
- ES6继承
- ES6继承，静态方法、属性和实例方法、属性 是什么时候挂载的
- Promise各种api
- 各种css属性

## Shopee(offer)
### 一面
- 各种缓存实现的优先级，memory disk http2 push?
- 小程序为什么有两个线程，怎么设计的？
- xss，如何防范
- 日志，如果大量日志堆在内存里怎么办
- 深拷贝

    ```js
    const deepClone = (obj, m) => {

    };

    // 需要手写一个深拷贝函数deepClone，输入可以是任意JS数据类型
    ```
- 二叉树光照，输出能被光照到的节点，dfs能否解决(you明树)
- 输出顺序提

    ```js
    setTimeout(function () {
    console.log(1);
    }, 100);

    new Promise(function (resolve) {
        console.log(2);
        resolve();
        console.log(3);
    }).then(function () {
        console.log(4);
        new Promise((resove, reject) => {
            console.log(5);
            setTimeout(() =>  {
                console.log(6);
            }, 10);
        })
    });
    console.log(7);
    console.log(8);
    // 2, 3,7, 8,4 5,6,1
    ```
- 作用域

    ```js
    var a=3;
    function c(){
        alert(a);
    }
    (function(){
        var a=4;
        c();
    })();
    ```
- 输出提

    ```js
    function Foo(){
        Foo.a = function(){
            console.log(1);
        }
        this.a = function(){
            console.log(2)
        }
    }

    Foo.prototype.a = function(){
        console.log(3);
    }

    Foo.a = function(){
        console.log(4);
    }

    Foo.a(); // 4
    let obj = new Foo();
    obj.a(); // 2
    Foo.a(); // 1
    ```
### 终面
- 错误捕获
- 前端稳定性监控
- 前端内存处理
- <span style="color: red">代码题：好多请求，耗时不同，按顺序输出，尽可能保证快，写一个函数</span>

    ```js
    const promiseList = [
        new Promise((resolve) => {
            setTimeout(resolve, 1000)
        }),
        new Promise((resolve) => {
            setTimeout(resolve, 1000)
        }),
        new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })
    ]
    fn(promiseList);
    ```
- <span style="color: red">一个数组的全排列</span>

    ```js
    // 输入一个数组 arr = [1,2,3]
    // 输出全排列
    
    // 数组所有子数组
    function allSub(nums) {
        return nums.reduce((acc, cur) => {
            return acc.concat(acc.map(v => [...v, cur]))
        }, [[]])
    }
    ```
## 腾讯(offer)
### 一面
- <span style="color: red">普通函数和箭头函数的this指向问题</span>
    ```js
    const obj = {
        fn1: () => console.log(this),
        fn2: function() {console.log(this)}
    }
    obj.fn1();
    obj.fn2();

    const x = new obj.fn1();
    const y = new obj.fn2()
    ```
- promise相关的特性
- vue父子组件，生命周期执行顺序createed mounted
- vue3添加了哪些新特性
- xss的特点以及如何防范？
- Http2.0和http3.0对比之前的版本，分别做了哪些改进
- HTTP3.0基于udp的话，如何保证可靠的传输
- TCP和UDP最大的区别是什么？
- <span style="color: red">CSP除了能防止加载外域脚本，还能做什么</span>
- [typescript is这个关键字是做什么呢?](/front-end/JavaScript/ts-is.html)
- 代码题，多叉树，获取每一层的节点之和
    ```js
    // 节点所有的和
    function layerSum(root, total = 0) {
        let sum = 0;
        total += root.value;
        root.children && root.children.forEach(item => {
        sum += layerSum(item, total)
        })
        return sum + total;
    }
    // 每一层节点的和
    function layerSum(root) {
        let stack = [root];
        let res = [];
        while(stack.length) {
            let len = stack.length;
            let sum = 0;
            for(let i = 0; i < len; i++) {
                let node = stack.shift();
                sum += node.value;
                node.children && stack.push(...node.children);
            }
            res.push(sum)
        }
        return res;
    }
    const res = layerSum({
        value: 2,
        children: [
            { value: 6, children: [ { value: 1 } ] },
            { value: 3, children: [ { value: 2 }, { value: 3 }, { value: 4 } ] },
            { value: 5, children: [ { value: 7 }, { value: 8 } ] }
        ]
    });

    console.log(res);
    ```
### 二面
- <span style="color: red">代码题：虚拟dom转真是dom</span>

    ```js
    const vnode = {
        tag: 'DIV',
        attrs: {
            id: 'app'
        },
        children: [{
                tag: 'SPAN',
                children: [{
                    tag: 'A',
                    children: []
                }]
            },
            {
                tag: 'SPAN',
                children: [{
                        tag: 'A',
                        children: []
                    },
                    {
                        tag: 'A',
                        children: []
                    }
                ]
            }
        ]
    }

    function render(vnode) {
        let ele = document.createElement(vnode.tag);
        for(let key in vnode.attr) {
            ele.setAttribute(key, vnode.attr[key]);
        }
        for(let item of vnode.children) {
            ele.appendChild(render(item))
        }
        return ele;
    }
    ```
### 三面
- 前端安全xss之类的
- Https中间人攻击
- 前端Histroy配置nginx
- 代码题：有序数组原地去重

### 四面
- 城市中井盖数量

### 终面
项目相关

## 字节(offer)
### 一面
- 代码题：二叉树层序遍历，每层节点放到一个数组里
- 代码题：实现一个函数，fetchWithRetry会自动重试3次，任意一次成功直接返回
- 链表中换的入口节点

### 二面
- 截图怎么实现(canvas.drawImage)
- <span style="color: red">qps达到了峰值了，怎么去优化(每秒查询率QPS是对一个特定的查询服务器在规定时间内所处理流量多少的衡量标准)</span>
- 谷歌图片，如果要实现一个类似的系统或者页面  你怎么做
- 最小的k个数
- 防抖节流
- sleep函数
- js超过Number最大值怎么处理
- [64个运动员, 8个跑道, 如果要选出前四名, 至少跑几次?](https://blog.csdn.net/lzhcoder/article/details/116142484)

    [赛马](/front-end/Code/#赛马)
- 前端路由 a -> b -> c这样前进, 也可以返回 c -> b -> a, 用什么数据结构来存比较高效
- node 服务治理
- 代码题：多叉树指定层节点的个数

### 三面
- 叠词的数量

    ```js
    // Input: 'abcdaaabbccccdddefgaaa'
    // Output: 4

    // 1. 输出叠词的数量
    // 2. 输出去重叠词的数量
    // 3. 用正则实现
    const fn = s => {
        let arr = [];
        s.replace(/(\w)\1+/g, ($0, $1) => {
            arr.push($1)
        })
        return (new Set(arr)).size
    }
    ```



## 资料
[5 年前端 - 历时 1 个月收获 7 个 offer](https://mp.weixin.qq.com/s/j8OExQ3bTH7JO2m2Oshiyg)