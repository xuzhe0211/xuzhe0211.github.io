---
title: 大厂面试
---

## 字节跳动

### 一面
1. 对tree-shaking的了解
    - 虽然生产模式下默认开启，但是由于经过babel编译全部模块被封装成IIFE
    - IIFE存在副作用无法被tree-shaking掉
    - 需要配置{module: false} 和 sideEffects: false
    - rollup 和webpack的shaking程度不同，以一个class为例子

    [webpack tree shaking前世今生](/front-end/engineering/Webpack-treeshaking.html)

    [webpack构建中tree shaking](https://blog.csdn.net/weixin_43924228/article/details/108615433)
2. Common.js和ES6 Module区别
    - commonJS是被加载时运行，esModule是编译的时候运行
    - commonJs输出的是值的浅拷贝，esModule输出值的运用
    - webpack中的webpack_require对他们处理方式不同
    - webpack 按需加载实现

3. 图片编辑器的性能优化
    - 图片通过矩阵变化，移除html2canvas
    - 抽离Matrix.js里面的三元一次方程取代传统的克拉默法则
    - 自定义栈，通过可逆矩阵，亮度，饱和度，色差的逆公式，做出返回效果，而不是每次结果用 base64 保存，消除内存消耗
    - web work的尝试和数据测试，证明在计算量不大的情况下反而更慢
    - window.performance.mark埋点，和1px的gig上传关键步骤时间优化

4. 浏览器缓存策略
    - 强缓存 cache-control、 expires
    - 协商缓存 304 Etag, last-modified

5. [301、302、307、308的区别](/front-end/JavaScript/network-http-status.html)

6. 两数之和
    ```js
    var towSum = function(arr, taget) {
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            if (i in obj) {
                return [obj[num], i];
            } else {
                obj[sum - target] = i;
            }
        }
    }
    ```
7. 洗牌算法
    ```js
    function sortPoke(arr) {
        var _arr = []
        while(arr.length > 0) {
            if (arr.length % 2 === 1) {
                _arr.push(arr.pop())
            } else {
                _arr.push(arr.shift());
            }
        }
        return _arr;
    }
    ```
8. 数组中第K个最大元素
    - 花了点个大顶堆，然后很快就求出来
    - 面试官：emm。。。。还有点时间，你还有想到别的办法吗
    - 又写了个快排解法，写完之后面试官说顺便写个归并排序，我就改了一下写出来

### 二面
1. 图片编辑器做的性能优化(以上)
2. redux-saga和mbox的比较
    - saga还是遵循mvc模型，mobx是接近mvvm模型
    - 介绍项目为何要用mobx更合适
    - 由于是直播相关的electron项目，存在音视频流，和一些底层OS操作，那么我们可以以麦克风视图开关对于音频流的处理为例子，把OS的一些操作与数据做一个映射层，就像数据和视图存在映射关系一样，那么数据的流动就像是ivew->触发action->数据改变->改变视图->进行os操作
    - 然后说了一下 mobx 大概实现的原理，如数据劫持，发布订阅。
3. htts有了解吗
    - 简单讲了一下非对称加密的握手过程
    - 证书签名过程和如何防止篡
4. 跨域有了解过吗
    - webpack-dev-server原理和如何处理跨域
    - nginx转发
    - CROS中的简单请求和非简单请求
    - 非简单请求下发起options
5. localstorage、sessionStorage和cookie的区别
6. 爬楼梯

    ```js
    var climbStairs = function(n) {
        var p = 0, q = 0, r = 1;
        for (let i = 1; i <= n; i++) {
            p = q;
            q = r;
            r = p + q;
        }
        rturn r;
    }
    ```
    [leetcode爬楼梯](/front-end/Code/concept-dp.html#爬楼梯)
7. [使用最小花费爬楼梯](https://leetcode-cn.com/problems/min-cost-climbing-stairs/solution/shi-yong-zui-xiao-hua-fei-pa-lou-ti-by-l-ncf8/)
    ```js
    // 输入：cost = [10,15,20]
    // 输出：15
    // 解释：你将从下标为 1 的台阶开始。
    // - 支付 15 ，向上爬两个台阶，到达楼梯顶部。
    // 总花费为 15 。
    var minCostClimbingStairs = function(cost) {
        const n = cost.length;
        const dp = new Array(n + 1);
        dp[0] = dp[1] = 0;
        for (let i = 2; i <= n; i++) {
            dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
        }
        return dp[n];
    };
    ```
8. [编辑距离](https://leetcode-cn.com/problems/edit-distance/)

### 三面
1. electron的主进程，渲染进程之间区别和他们通信手段
    - IPCmain、ipcRenderer
    - localStorage
2. webview和iframe区别
    - webView应用和嵌入内容之间的交互全部都是异步
    - 应用和嵌入内容之间的交互全部都是异步的
3. 大型文件上传
    - 文件切片
    - 用web-work单独县城计算文件的hash值
    - 进度条
    - 对于已经传过的文件进行跳过秒传，对于失败重传处理
    - 然后又说一下感觉还能改进的地方
    - 要发挥electron能使用node的优势，文件切片，hash计算和上传都可以用node实现，并能且开不同的进程处理。由于上传要用node模块，不会有浏览器同一域名下6个链接的限制
4. 录屏优化
    - 需要对整个屏幕进行录屏
    - 对比了ffmpeg和mediaSource的性能差异，如CPU和内存消耗
    - 又对比一下mediaSource的各种性能编码差异VP8、daala、H264、opus和mpeg
    - 一开始是把视频流写在一个变量里面，这样会造成很大的性能问题
    - 解决办法是每隔10s把node的file写在硬盘里面，然后结束录制的时候，把每个10s的小视频片段用ffmpeg合成一个大的文件

5. [快照数组](https://leetcode-cn.com/problems/snapshot-array/)

    ```js
    输入：["SnapshotArray","set","snap","set","get"]
     [[3],[0,5],[],[0,6],[0,0]]
    输出：[null,null,0,null,5]
    解释：
    SnapshotArray snapshotArr = new SnapshotArray(3); // 初始化一个长度为 3 的快照数组
    snapshotArr.set(0,5);  // 令 array[0] = 5
    snapshotArr.snap();  // 获取快照，返回 snap_id = 0
    snapshotArr.set(0,6);
    snapshotArr.get(0,0);  // 获取 snap_id = 0 的快照中 array[0] 的值，返回 5

    ["SnapshotArray","snap","get","get","set","get","set","get","set"]
    [[2],[],[1,0],[0,0],[1,8],[1,0],[0,20],[0,0],[0,7]]
    ```
    ```js
    let SnapshotArray = function(length) {
        // 使用字典数组来记录快照数组
        this.arr = new Array(length).fill(0).map(() => new Map());
        this.snapId = 0;
    }
    SnapshotArray.prototype.set = function(index, val) {
        this.arr[index].set(this.snapId, val);
    }
    SnapshotArray.prototype.snap = function() {
        // 快照号是调用snap()的总次数减去1
        this.snapId++;
        return this.snapId - 1;
    }
    SnapshotArray.prototype.get = function(index, snap_id) {
        // 找到这个数的所有记录
        let snapIds = [...this.arr[index].keys()];
        // 二分查找，找到<= snap_id的值
        let low = 0, high = snapIds.length - 1,mid;
        while(low <= high) {
            mid = Math.floor((low + high) / 2);
            if (snapIds[mid] < snap_id) {
                low = mid + 1
            } else if(snapIds[mid] > snap_id) {
                high = mid - 1;
            } else if(snapIds[mid] === snap_id) {
                return this.arr[index].get(snap_id)
            }
        }
        return this.arr[index].get(snapIds[low - 1]) || null;
    }
    let snap = new SnapshotArray(3)
    snap.set(0, 5)
    snap.snap()
    snap.set(0, 6)
    console.log(snap.get(0, 0))
    ```

### 四面
1. 路径总和
2. 路径不需要从根节点开始，也不需要在叶子节点结束

## 虎牙
1. http的get和post请求
2. 缓存策略
3. https的握手过程
4. http2特点   
    - 二进制格式
    - 头部压缩，顺便吹了下**哈夫曼编码**
    - 服务端推送
    - 多路复用
5. weak-Set、weak-Map和Set、map区别
6. mvvm和mvc模型区别
7. 如何实现一个mvvm模型
    - 数据劫持+发布订阅者
8. 为何你用mobx重构了saga，说说两者之间区别
    - 简单说了下mobx的实现原理
9. 说说vdom的了解
    - vdom是作为数据和视图的一种映射关系
    - vue和react的diff算法有相同和不同，相同都是同层比较，不同是vue使用双指针比较，react是用key集合级比较

    [React源码剖析--react diff](https://zhuanlan.zhihu.com/p/20346379)
    
10. 讲讲webpack性能优化
    - 体积：讲了一下tree-shaking了解
    - 打包速度：cache-loader,dll，多线程
11. 写过plugin
12. 了解webpack-dev-server的HMR实现原理吗
13. 手写防抖和节流

### 二面
1. 做过直播，能介绍一下webRTC或者现在使用的直播方案吗？
    - 虽然我是使用声网的SDK，但是大概老姐过一般直播方案
    - 讲了一下NAT、STUN、RTP、SDP的基本盖伦
    - 然后两个信令服务，一个是声网用来控制进房间媒体流的socket，一个是业务逻辑的socket
2. 编码方面有了解吗？能解释一下码率吗？
3. 对于P帧、I帧、B帧有了解吗？
    - I帧是关键帧
    - p帧是差别帧
    - B帧是双向差别帧
4. [RGB和YUV区别](https://www.cnblogs.com/silence-hust/p/4465354.html): 
    [参考](https://blog.csdn.net/weixin_40673765/article/details/93483937)

    - RGB将一个颜色拆解为3个纯色的亮度的组合
    - YUV将一个颜色分解为一个亮度和2个色度的组合

5. 有了解过那些直播协议
    - httpflv传输方式:http流，格式flv，连续流
    - rtmp传输方式tcp流，格式flv,连续流
    - hls传输方式http，格式ts文件，移动端兼容但PC不兼容
    - dash这个不太常见只知道传输方式是http
6. flv和mp4的区别
    - 他们都说属于容器，区别在于头信息
    - flv是属于流文件可以边传遍解的，不需要通过索引分包，但是mp4是需要依赖索引表的
7. MediaSource规范有了解吗
    - 没怎么了解，但是还是扯了一下不同码率视频切换是怎么做的

### 三面
1. webSockeck和ajax的区别
2. xss,csrf有了解吗，如果防范
3. 有了解过React的fiber
    - **fiber诞生背景，为何react有时间切片而vue不需要**
4. 能简单介绍一下react执行过程吗？
    - performUnitOfWork
    - beginWork
    - completeUnitOfWork
    1. JSX经过babel转变为render函数
    2. create update
    3. enqueueupdate
    4. sheduleWork更新expiration time
    5. requestWork
    6. workLoop大循环
    7. Effect List
    8. commit
5. 能介绍下hook吗
    - 比起hoc, hook的复用性高
    - useState、useEffect、 useRef用法
    - 优化usecallback、useMemo
6. 情景题，做一个直播弹幕
    - 字幕的速度和大小
    - requestAnimationFarme和SetTimeout区别
    - 弹幕节流问题
    - socket和轮训优缺点，弹幕池的设计
    - 如何避免弹幕碰撞(搜索一下有个飞机场算法)

## Bigo
### 一面
1. 自我介绍
2. 项目介绍
3. 你项目中用到线性代数，可逆矩阵的逆矩阵求法
    - 当场白班可逆矩阵的逆矩阵球阀
4. 求一下三个三元一次方程
    - 当场白板用**克拉默法则**求出方程 x,y,z 的解
    - 然后写一下 matrix.js 里面的优化方程（虽然我也不知道他是什么原理）
5. [转置矩阵](https://leetcode-cn.com/problems/transpose-matrix/)
    ```js
    var transpose = function(matrix) {
        const m = matrix.length, n = matrix[0].length;
        const transposed = new Array(n).fill(0).map(() => new Array(m).fill(0));
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                transposed[j][i] = matrix[i][j]
            }
        }
        return transposed
    }
    ```
6. 能讲讲欧拉角和旋转矩阵吗，还有他们的相互转换
7. 情景：
    - 这是一个多人在线协作网页
    - 主要做的是视频标识系统，用来训练AR的模型
    - 并且同一时间，用一视频帧可以有多个人标识
    ```
    难点如下：
    1. 视频的时间帧的确定
        - 由于视频中存在I帧、P帧、B帧作为干扰，所以一个视频25帧的话，但是实际上不是每一秒都是25帧的，每秒帧的数目是动态的
        - 但是视频信息又对应地方DTS即解码时间戳，这个时间戳的意义在于告诉播放器改在数目时候解码这一帧的数据，和PTS即显示时间戳，这个时间戳用来告诉播放器该在什么时候显示这一帧的数据，我们只要拿到PTS就可以了
    2. 绘画过程中的canvas优化
        - canvas 应该分两层，一层是没有选择的图形，一层是选中的图形，当图形选中时候会提升到编辑区域的 canvas
        - **对于不规则图形，选择判断方法使用射线法思路，带入公式就可以知道图形是否被选择**
    3. 多人协同问题，他们之间如何互相通知
        - 使用信令服务器，用 websocket 连接
    4. 如果两个人以上同时对一个标签做处理，这种冲突如何处理
        - 其实这个在我做在线白板时候会遇到的问题，这种问题可以类比成游戏中的状态同步和帧同步这两种解决办法，就和面试官扯了一下。
    ```
8. 洗牌算法
9. 假设有偶数位的整数，将整数分开两边，然后对每边的每个数组的每一位求总和，当两边的总和相对就认为这组数符合要求，求2n位数的符合要求数占总数的多少。。。。。有点晕
    - 例子：287962 可以分成 287 962，其中 2 + 8 + 7 = 9 + 6 + 2，那么他就是符合要求的。

### 二面
1. 浏览器缓存策略
2. 跨域处理
3. https 握手
4. http2 特性
5. tcp 三次握手
6. 从 url 到页面显示
7. redux 和 mobx 的差异
8. tree-shaking
9. 项目的性能优化
10. css 的 BEM 规范
11. 当场设计一个 toast
12. LRU 实现
13. <span style="color:red">DNS 的路径选择用了啥算法--递归迭代</span>

## YY
1. mvvm和mvc模型的区别
2. mvvm的实现
3. 了解fiber吗
4. 了解hook吗
5. 为何react点击时间放在setTimeout会拿不到event对象--react的事件合成
6. setState是异步还是同步
    - 本质上都是同步，只不过改变state的时间不同
    - 有一个是是否批量更新变量来决定
    - 放在setTimeout就能事实改变
7. 有用过node吗、讲讲流
8. koa2和express区别
    - express是大而全有路由等，koa2是小而精通过中间件
    - koa2能使用async await，express不能
    - koa2有洋葱模型和ctx上下文，express没有
9. 讲讲洋葱模型
10. **实现一个函数compose([fn1,fn2, fn3...])转成fn3(fn(fn()))**
    - 这个本质上就是中间件实现逻辑，之前看了koa2一点源码
11. koa2和egg的区别
    - egg是在koa2上的封装
    - egg有controller、service,router
    - 约定了文件模流结构
12. 鉴权有了解过吗
    - Seesion/cookie
    - Token
    - OAuth
    - SSO
    ```
    OAuth2是用来允许用户授权第三方应用访问他在另一个服务器上的资源的一种协议，它不是用来做单点登录的，但我们可以利用它来实现单点登录。在本例实现SSO的过程中，受保护的资源就是用户的信息（包括，用户的基本信息，以及用户所具有的权限），而我们想要访问这这一资源就需要用户登录并授权，OAuth2服务端负责令牌的发放等操作，这令牌的生成我们采用JWT，也就是说JWT是用来承载用户的Access_Token的
    ```
### 二面
1. 浏览器的缓存策略
2. 跨域处理
3. https握手
4. xss和csrf攻击
5. TypeScript有了解吗？
    - 接口
    - 枚举
    - 反省
6. webpack优化
7. tree-shaking
8. **HMR实现原理**
9. nginx有了解嘛
    - 扯了下跨域如何配置、转发 proxy_pass http://xxxx.com
    - [缓存策略配置](https://www.cnblogs.com/sreops/p/11073277.html)
    - 地址重定向配置 location
9. 场景题，做一个页面下雪
    - 写一个粒子class，里面有粒子、大小、图片，每秒移动的距离
    - 一个粒子控制器Class，包含粒子数量，分布情况 粒子的下坠速度
    - 用requestAnimationFrame绘制动画
    - 用css3开启硬件GPU加速

## 文档
[原文章](https://mp.weixin.qq.com/s/FNajNicQZ_bhT92h0HiC_Q)