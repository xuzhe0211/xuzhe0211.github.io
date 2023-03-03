---
title: 真题汇总
---
## 常见算法
### 链表
- 单链表翻转

    ```js
    const reverseList = head => {
        let cur = head;
        let prev = null;
        while(cur) {
            let next = cur.next;
            cur.next = prev;
            prev = cur;
            cur = nex;t
        }
        return perv;
    }
    // 递归
    const reverseList = head => {
        if(!head || !head.next) return head;
        const newHead = reverseList(head.next);
        head.next.next = head;
        head.next = null;
        return newHead;
    }
    ```
- 链表环的检测

    ```js
    const judge = head => {
        if(!head) return false;
        let slow = head, fast = head;
        while(fast) {
            slow = slow.next;
            if(fast.next) {
                fast = fast.next.next;
            } else {
                return false
            }
            if(slow === fast) return true;
        }
        return false;
    }
    ```
- 两个有序的链表合并

    ```js
    const mergeList = (l1, l2) => {
        let dummy = new ListNode(-1);
        let cur = dummy;
        while(l1 && l2) {
            if(l1.val < l2.val) {
                cur.next = l1;
                l1 = l1.next;
            } else {
                cur.next = l2;
                l2 = l2.next;
            }
            cur = cur.next;
        }
        cur.next = l1 ? l1 : l2;
        return dummy.next;
    }
    ```
- 删除链表倒数第n个节点
    ```js
    const removeNthFromEnd = (head, n) => {
        let slow = head, fast = head;
        while(n--) {
            fast = fast.next;
        }
        if(!fast) return head.next;
        while(fast.next) {
            slow = slow.next;
            fast = fast.next;
        }
        slow.next = slow.next.next;
        return head;
    }
    ```
- 求链表的中间节点
    - 前后爽指针，后一个指针到终点，前一个在中间
- 清除双链表中相邻相同的元素

[链表](/front-end/Code/linked.html#在js中怎么用)

## 动态规划
- 连续数组中最大和问题
    ```js
    const maxSubArray = nums => {
        let pre = 0, maxAns = nums[0];
        nums.forEach(x => {
            pre = Math.max(pre + x, x);
            maxAns = Math.max(maxAns, pre)
        })
        return maxAns;
    }
    ```
- 背包问题
    [背包九讲](https://github.com/tianyicui/pack/blob/master/V2.pdf)

## 算法案例
### 快手
- 二叉树DFS BFS

### UMU
- 找出一个字符串中首个不重复的字母
- 实现深拷贝，常规类型、函数类型
- 微前端原理，如何实现
- webpack如何提升构建速度

### 蚂蚁金服
- 括号匹配  
    ```js
    function bracketPair(str) {
        let pairMap = {
            ')': '(',
            '}': '{',
            ']': '['
        }
        let stack = [];
        let matchList = Object.keys(pairMap).join(Object.values(pairMap));
        for(let i = 0; i < str.length; i++) {
            if(matchList.indexOf(str[i]) < 0) continue;
            let key = str[i];
            if(pairMap[key]) {
                if(stack.length && stack[stack.length - 1] === pairMap[key]) {
                    stack.pop();
                } else {
                    return false;
                }
            } else {
                stack.push(key);
            }
        }
        if(stack.length === 0) {
            return true;
        } else {
            return false;
        }
    }
    ```
- 深拷贝，考虑尽可能多
- 实现一个前端监控的上报方法类
## 虾皮
- 顺序题

    ```js
    setTimeout(function() {
        console.log(1)
    }, 100)
    new Promise(function(resolve) {
        console.log(2);
        resolve();
    }).then(function() {
        console.log(4);
        new Promise((resolve, reject) => {
            console.log(5);
            setTimeout(() => {
                console.log(6)
            }, 10)
        })
    })
    console.log(7)
    console.log(8)
    // 2, 7, 8, 4,5, 6, 1
    ```
- 深拷贝解决环的问题
- 二叉树
    ```js
    // {
     //   left, 
     //   right,
      //  value,
     //   level
    // }
    // BFS
    function bfs(tree) {
        let arr = [tree];
        let resList = [];
        while(arr.length) {
            let cur = arr.shift();
            if(!cur.level || cur.level !== level) {
                resList.push(cur.value);
                level++;
            }
            if(cur.right) {
                arr.push({
                    ...cur.right, 
                    level: cur.level + 1
                })
            }
            if(cur.left) {
                arr.push({
                    ...cur.left,
                    level: cur.level + 1
                })
            }
        }
        return resList
    }
    //DFS思路
    const rightSideView = function(root) {
        if(!root) return [];
        let res = [];
        let dfs = (step, root) => {
            if(step === res.length) {
                res.push(root.val);
            }
            root.right && dfs(step + 1, root.right)
            root.left && dfs(step + 1, root.left)
        }
        dfs(0, root);
        return res;
    }
    ```
- 环境变量问题

    ```js
    var a = 3;
    function c() {
        alert(a) // 3
    }
    (function() {
        var a = 4;
        c();
    })()
    ```
- 问题
    - TCP如何保证传输稳定性
    - 渲染过程
        - 滚动屏幕的过程中，主线程和渲染线程都在做什么
        - setTimeout和requestAnimationFrame的区别
    - 页面优化案例
    - Electron如何解决crash
    - node的event loop和浏览器的event lOOP的区别

### 美团
- [数字字符串转成IP地址](https://blog.csdn.net/oneby1314/article/details/108705047)
- 实现一个深度拷贝，只考虑对象和数组类型

### 美团优选
- 实现数组拍平
- 链表删除倒数第k的节点
- 找出列表中出现次数大于1的数据
### 网易灵犀
- 实现reduce
    ```js
    Array.prototype.myReduce = function(reducer, initVal) {
        const hasInit = arguments.length > 1;
        let ret = hasInit ? initVal : this[0];
        let start = haInit ? 0 : 1;
        this.slice(start).forEach((item, index) => {
            ret = reducer(ret, item, start + index, this)
        })
        return ret;
    }
    ```
- 查找node节点，输出路径
    ```js
    const root = {
        id: 'root',
        nodes: [
            {
                id: 'node-1', // path 1 [1]
                nodes: [
                    {
                        id: 'node-2', // path 1-1
                        nodes: [
                            {
                                id: 'node-3' // path 1-1-1
                            }
                        ]
                    }
                ]
            },
            {
                id: 'node-4',
                nodes: [
                    id: 'node-5'
                ]
            }
        ]
    }
    function getPathByNodeId(root, target, path = 'root') {
        if(!root.nodes) return;
        for(let i = 0; i < root.nodes.length; i++) {
            let item = root.nodes[i];
            let p = `${path}-${i}`;
            if(item.id === target) {
                return p
            }
            if(item.nodes) {
                let r = getPathByNodeId(item, target, p);
                if(r) return r;
            }
        }
        return null;
    }
    ```
- 实现post重试机制
    ```js
    // post(url, data): Promise
    // postRetry(url, data, times): Promise
    let m = 2;
    const post = (url, data, times) => {
        return new Promise((resolve, reject) => {
            if(m > 0) {
                reject();
                m--;
            } else {
                resolve('success')
            }
        })
    }
    const postRetry = (url, data, times = 0) => {
        return new Promise((resolve, reject) => {
            post(url, data).then(res => {
                resolve(res);
            }).catch(er => {
                if(times > 0) {
                    resolve(postRetry(url, data, times - 1);)
                }
                reject('null')
            })
        })
    }
    ```
- 实现加减乘运算
    ```js
    // 1 + 2 * 3 - 4 -> 3;
    const calc = str => {
        let numArr = []；
        let arr = [];
        for(let i = 0; i < str.length; i++) {
            let item = str[i];
            switch(item) {
                case '*':
                    let r = numArr.pop() * str[i + 1];
                    numArr.push(r)
                    i += 1;
                    break;
                case '+':
                    arr.push(item);
                    break;
                case '-':
                    arr.push(item);
                    break;
                default: 
                    numArr.push(+str[i]);
                    break;
            }
        }
        let sum = numArr.shift();
        while(numArr.length) {
            let operator = arr.shift();
            if(operator === '-') {
                sum = sum - numArr.shift();
            } else {
                sum = sum + numArr.shift();
            }
        }
        return sum;
    }
    console.log(calc('1*2*3*4*2'))
    ```
### 字节电商
- 找出一个数组中，sum为x的组合
- 手写Promise.all
- 立案时调用，并支持延迟

### 字节web infra
- nodejs新建一个buffer是否占用内存
- nodejs多个进程之间如何保持状态统一
- 实现函数，检测括号是否闭合
    ```js
    function validator(str) {
        const map = {
            '}':'{',
            ')': '(',
            ']': '['
        }
        let stack = [];
        let list = [...Object.keys(map), ...Object.values(map)];
        for(let item of str.split('')) {
            if(list.indexOf(item) < 0) {
                continue;
            } else if(stack.length && map[item] === stack[stack.length - 1]) {
                stack.pop();
            } else {
                stack.push(item);
            }
        }
        if(stack.length) {
            return false;
        } else {
            return true;
        }
    }
    ```
- 补全如下代码，使之运行成功

    ```js
    let data = {
        url: 'https://www.bytedance.com/',
        title: 'Inspire creativity, enrich life',
        text: 'ByteDance'
    }
    let strTemp = '<a href="{url}" title="title">{text}</a>'

    function substiute(str, obj) {
        // write here
        let keyList = Object.keys(obj);
        for(const interator of keyList) {
            const reg = new RegExp(`{${iterator}}`, 'g');
            str = str.replace(reg, obj[iterator]);
        }
        return str;
    }
    console.log(substiute(strTemp, data))
    ```
- isArray(原理Object.prototype.toString.call(a))和instanceof的区别，谁能正确判断一个变量是否是一个数组，原理是什么

- 一个朱组件，里面有个子组件1:&lt;input onchange="changeEvent"/&gt;,还有个子组件2：&lt;Children2&gt;，组组件1每次监听到内容change时都会进行setState，如何保证子组件2不会被频繁更新(pureComponent, memo, usememo usecallback)
- 数组[1,2,3,4,5,6,7]，进行随机排序
    ```js
    const shutff = arr => {
        let res = [...arr];
        for(let i = 0; i < arr.length; i++) {
            let random = Math.floor(Math.random() * arr.length);
            [res[i], res[random]] = [res[random], res[i]]
        }
        return res;
    }
    ```
- 将下面每个id对象内的value中的id.xxx替换成对应id对象内的数据，如value: 'title1 + 3'
    ```js
    {
        'id0': {
            title: 'title0',
            value: 'id1.title + id2.content',
            content: '1'
            // 可能还有别的属性
        },
        'id1': {
            title: 'title1',
            value: 'id0.title + id2.title',
            content: '2'
        }, 
        'id2': {
            title: 'title2',
            value: 'id0.title + id1.content',
            content: '3'
        }
        //....
    }
    ```
### 字节
- [从一个乱序的数组中找出最长的斐波那契额数列，返回数列的长度](https://leetcode.cn/problems/Q91FMA/)
    ```js
    const lenLongestFibSubseq = arr => {
        let indices = new Map();
        let n = arr.length;
        for(let i = 0; i < n; i++) {
            indices.set(arr[i], i);
        }
        const dp = Array.from(Array(n), (_, i) => Array(n).fill(0));
        let ans = 0;
        for(let i = 0; i < n; i++) {
            for(let j = n - 1; j >= 0; j--) {
                if(arr[j] * 2 <= arr[i]) {
                    break;
                }
                if(indices.has(arr[i] - arr[j])) {
                    const k = indices.get(arr[i] - arr[j]);
                    dp[j][i] = Math.max(dp[k][j] + 1, 3);
                    ans = Math.max(ans, dp[j][i])
                }
            }
        }
        return ans;
    }
    ```
- 最长递增序列长度
- [实现一个Array.prototype.myReduce](https://ac.nowcoder.com/discuss/721397?channel=-1&source_id=discuss_terminal_discuss_sim_nctrack&ncTraceId=41822f535b114f0cad8a10f4db52b4f6.118.16337936211442547)
- 从字符串中找出最长的回文子串
- [async/await用在forEach中问题以及如何解决](http://objcer.com/2017/10/12/async-await-with-forEach/)

### 快手
- 求数组的最大深度
    ```js
    const maxDepth = arr => {
        let stack = [arr]
        let count = 1;
        while(stack.length) {
            const node = stack.shift();
            for(let v of node) {
                if(Array.isArray(v)) {
                    stack.push(v);
                }
            }
            count++;
        }
        return count;
    }
    console.log(maxDepth([1, [2,[3,[4, [5, [6,7]]]]]]))
    ```
- 实现一个并发请求控制的方法
- 使用Promise实现多次点击提交，仅在最后一次才真正发送请求(防抖？)

### 腾讯
- 实现节流函数，要求首次调用立即执行
- 实现一个接口，传入一个字符串，返回首个非增序的字符，要保证接口的测试性，思考入参和返回值应该是什么？

## 其他
- vue响应式原理以及手写实现
- 实现数组的reduce方法
- 常用的设计模式有哪些以及解决了什么问题，实现发布订阅模式
- 函数柯里化实现
- 正则去除前后空格
- 浏览器缓存相关    
    - 强缓存
    - 协商缓存
- 浏览器存储相关
    - cookie
    - sessionStorage
    - localStorage
    - indexDB
- 浏览器安全相关以及对应解决方案(xss, csrf、点击劫持、csp)
- 同一台机器上的两个不同进程如何通信？TCP?
- 跨域解决方案？CORS的header有哪些，作用是什么?简单请求
- 盒模型?什么是BFC?作用
- SPA的实现原理
- 如何实现一个下拉框组件？如何实现点击组件外部，下拉框收起的功能
- [什么是多态?为什么要多态]()
- vue3与vue2的区别
- session是如何存储的
- redis加锁有没有遇到问题？主从架构的锁同步问题redLock
- nodejs如何处理大文件
- 剪头函数相关
- 如何处理长列表的渲染？虚拟列表
- 如何实现文件上传组件

## 通用
- 个人职业规划
- 个人的优势和劣势
- 技术、业务上最好有难度的事情
- 技术选型的思路
- 如何衡量项目的价值
- 架构组和业务组的差异
- 在项目中承担的角色，项目的分工是什么样？
- 对新技术的有了解吗？对前端发展法相有自己的看法吗？

## 更多
[更多内容参考](https://meleeon.notion.site/)

[手写实现系列](https://www.notion.so/ad7f255fd5384865a0b64396dae8d86b)