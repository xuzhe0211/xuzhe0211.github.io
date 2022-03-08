---
title: 大厂面试全记录
---
## 拼多多
### 商家端一面
1. 简历项目问询-细节
2. 垂直水平居中
    ```
    display: flex;
    align-item: center;
    just-content:center;
    ```
3. 一个简单请求的header会有什么字段

    请求行、请求报头 请求正文  状态行 响应报头，响应体

    请求报头: host user-Agent、referer、cache-control  encoding 

    响应报头：etag、content-type keep-alive

4. map、filter，reduce都怎么用
5. symbol有了解吗？
6. ES5继承，es6继承，静态方法
7. [Promise超时控制](https://www.cnblogs.com/shytong/p/5681568.html)
8. DFS找节点
9. node有什么特性适合用来做什么，文件读取，接口访问，异步io
10. midway对比egg有什么优势
11. typescript有没有石建国
12. 平时设计模式-- 发布订阅 单例 装饰器 策略
13. 平时打包工具--webpack宣贯
14. 缓存相关 cdn缓存处理

### 二面
1. 压力面--之一观点
2. 拍平(扁平化)数组
    ```
        const flatten = (list, level = +Infinily) => {
            const newArr = list;
            while(level--) {
                newArr = _flatten(newArr);
            }
            return newArr;
        }
        function _flatten(arr) {
            return arr.reduce((a, b) => a.concat(b), []);
        }
        const array = [1, [2, [3, 4, [5]], 3], -4];
        const list1 = flatten(array);
        const list2 = flatten(array, 2);
        console.log(list1); // [1, 2, 3, 4, 5, 3, -4]
        console.log(list2); // [1, 2, 3, -4]
    ```
    [扁平化](https://blog.csdn.net/u014465934/article/details/89020911)
3. promise
    ```
    const myPromise = val => Promise.resolve(val);
    const delay = duration => {
        return new Promise(resolve => {
            setTimeout(resolve, duration);
        })
    }
    myPromise(`hello`).then(delay(1000)).then(val => console.log(val));
    ```
### 三面
1. 项目细节问询
2. Vue源码有读吗--响应原理 nextTick
3. 项目优化有什么实践
4. V8如何执行一段代码
5. [72-编辑距离](https://leetcode-cn.com/problems/edit-distance/solution/dai-ma-sui-xiang-lu-72-bian-ji-ju-chi-do-y87e/)
6. 226-翻转二叉树
    ```
    var invertTree = function(root) {
        if (root === null ) return null;
        const left = invertTree(root.left);
        const right = invertTree(root.right);
        root.left = right;
        root.right = left;
        return root;
    }
    ```
7. 性能优化实践


## 欢聚
1. 项目细节，ci/cd详细问，重构详细问，详细介绍题目录入
2. vue的history和hash模式区别，hash和ssr
3. https基本原理
4. ca证书怎么确保真实性
5. cors是什么，同域又是什么
6. 怎么解决前后端通信跨域
7. 可以 node 转发绕过跨域，为什么浏览器还是要做 cors
8. 除了webpack proxy, nginx，后端配cors头，还有什么跨域方案
9. xss攻击怎么防范，除了转义呢？转义出来的那个叫什么？
10. es的二进制操作
11. 实现以下promise
12. promise怎么能够保证then的顺序执行
13. worker有了解吗
14. ssr的原理
15. 性能优化有哪些实践
16. 手写min到max的随机数，整数和小数方案
17. 场景，多个属性 每个属性都是数组，求属性聚合的结果
18. 用户点击按钮没有反应，怎么去定位错误

## YY直播
1. 项目CI/CD怎么配置，jenkins怎么部署，为何没有直接部署单独机器，内网互通去传送文件发布，git权限配置
2. vue router hash/history
3. vuex里面有哪些东西，分别用来干嘛的
4. vuex分了模块，有全局通用的内容是怎么配置的
5. 除了直接调用命名空间模块还有办法直接访问需要放在全局模块下的东西吗？
6. Vue响应式原理
7. 子组件的data变化，那么父子组件的更新是怎么进行的
8. 双向绑定
9. vue生命周期
10. 项目内通信
11. Eventbus实现原理 有没有多条时间总线的情况，怎么解决可能重名的问题
12. 移动端的单位 rem/vh.vw
13. postCss rem->px
14. 移动端有什么性能有点的点-虚拟滚动
15. typescript
16. 泛型
17. webpack loader项目有用那些
18. 一个MP4文件加载话需要用那些loader
19. webpack插件开发
20. http版本 1，2，3 区别
21. http缓存 强缓存 协商缓存

## 字节
1. 输出结果
    ```
    var a = 3; 
    var total = 0;
    var result = [];
    function foo(a) {
        var i = 0; 
        for (; i < 3; i++) {
            result[i] = function() {
                console.log(i , a);
                total += i * a;
                console.log(total);
            }
        }
    }
    foo(1);
    result[0]('0'); // total:3
    result[1]('1'); // total:6
    result[2]('2'); // total:9
    ```
2. promise输出顺序
3. 给定一个n，生成[0, n -1] 乱序数组
    ```
    function fn(n) {
        let map = {};
        let arr = [];
        while(n) {
            const num = Math.floor(Math.random() * n);
            if(!map[num]) {
                arr.push(num);
                map[num] = true;
                n--
            }
        }
        return arr;
    }
    ```
4. 时间复杂度是多少，能进行优化吗？
5. 快排原理
6. 三路快排是怎么个三路法？
7. 了解其他排序吗
8. 详细说下归并排序
9. 稳定和不稳定排序怎么界定？
10. 了解一些时间顺序相关的api吗？
11. requestAnimationFrame有了解吗？
12. setImmediate和setTimeout setInterval
14. base64是怎么样转码的
15. 为何转了json协议之后可以优化图片上传？
16. 如果公网上传的话，怎么防止不被别人拿来做图床？水印？
17. xss的话怎么防止
18. created和beforeCreate有什么区别
19. render函数jsx
20. vue怎么转js代码
21. computed里面的懒更新是怎么实现的？

### 二面
1. 拍平数组，去重，排序
2. leetCode 103 + 拍平结果
3. http tls连接详情 几个rtt? 2->1个？
4. promise优缺点
5. 闭包
6. 继承
7. 首页白屏优化

## 资料
[原文](https://mp.weixin.qq.com/s/SYKw6EYSoQYrNU_-VwhNvg)