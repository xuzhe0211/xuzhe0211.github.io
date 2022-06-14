---
autoGroup-7: 浏览器
title: 浏览器渲染工作原理
---
## 浏览器多进程架构
### 浏览器是多进程架构
- Browser进程

    浏览器的主进程，只有一个。负责一下内容
    - 浏览器的界面显示，用户交互，前进后退等。
    - 负责各个页面的管理，创建和销毁
    - 将渲染进程的结果绘制到界面上
    - 网络资源的管理和下载
- 第三方插件进程
- GPU进程：最多一个，用于3D加速
- 浏览器渲染进程(浏览器内核，内部多线程)

    负责页面渲染、脚本执行、事件处理。

    <span style="color: red">这个进程每个标签页都有一个独立的浏览器渲染进程，所以每添加一个标签页都会新建一个进程，当然不同的空白标签页之间的进程也可以合并起来</span>
- 网络进程
### 浏览器多进程的优势
- 避免单个标签页的崩溃导致整个浏览器的崩溃
- 避免第三方插件的崩溃导致整个浏览器的崩溃
- 充分利用多核优势
缺点：因为进程是数据分配的独立单位，所以多个进程也导致了内存占用更大，像是空间换时间

## 渲染进程多线程架构
浏览器渲染进程(内核)是多线程的:
- GUI渲染线程
    - 渲染浏览器的界面解析HTML、CSS，构建dom树和Render树，布局和绘制
    - 重绘、回流
- Javascript引擎线程(js内核)
    - 执行Javascript
    - 一个标签页只有一个JS线程(js为大线程程序)
    - <span style="color: orange">js引擎本质上就是函数调用栈(上下文栈)和作用域链的结合</span>
- 定时器触发线程
    - 隶属于浏览器而不是js引擎，因为js引擎是单线程，没空计时
    - <span style="color: red">**根据W2C标准，计时触发的最小时间间隔为4ms**</span>
- 事件触发线程
    - 同样隶属于浏览器，用来控制随事件循环(Event Loop的bosss)
    - 当相应事件触发的时候，该线程会将相应的callback加入到宏队列的末尾
- 异步HTTP请求线程
- 任务轮训线程

而其中，GUI渲染线程和Javascript引擎线程是互斥的，所以script脚本在执行的时候会阻塞DOM树解析渲染，延迟[DOMContentLoaded](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/DOMContentLoaded_event)事件触发.

这里就要提到<span style="color: red">**script标签的async和defer属性了，async会异步下载脚本，但是它的执行依然会阻塞HTML解析,不会阻塞HTML渲染**</span>。defer的含义就是将脚本的解析执行推迟到了HTML解析之后，不会造成HTML阻塞，<span style="color: red">但是依然会延迟[DOMContentLoaded](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/DOMContentLoaded_event)事件触发</span>，其将在defer执行完后触发。多个async-script的执行顺序不能确定，而多个defer-script的执行顺序是确定的。

[浅谈script标签中的async和defer](/front-end/JavaScript/brower-Async-refer.html)

### load DOMContentLoaded事件的先后
渲染完毕后触发load(绘制阶段)

DOM加载完成后就可以触发[DOMContentLoaded](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/DOMContentLoaded_event)(DOM树构建完成，等待JS执行完)

### webworker、sharedworker
为了解决浏览器js引擎单线程执行时遇到大量计算问题时会产生的卡顿现象，可以通过新建一个隶属于js引擎的线程，专门计算

[sharedworker](https://developer.mozilla.org/zh-CN/docs/Web/API/SharedWorker)则是多个渲染线程共享的

[web worker sharedWorker](/front-end/JavaScript/browser-worker.html#web-worker-sharedworker)

## EventLoop
EventLoop本职上就是宏队列和微队列之间的反复横跳
- 宏任务
    - setTimeout
    - setInterval
    - setImmediate(node)
    - requestAnimationFrame(浏览器)
    - I/O
    - UI rendering(浏览器)
- 微任务
    - Promise
    - Object.observer

浏览器EventLoop执行过程：
- 执行全局Javascript代码，将其中的宏任务压入宏队列，微任务压入微队列。执行过程就是压入函数调用栈和清空函数调用栈
- 从微队列中取出一个微任务，压入函数调用栈，清空函数调用栈
- 在从宏队列取出一个宏任务，压入函数调用栈，清空函数调用栈
- 重复以上两个步骤

## 浏览器渲染过程
主流两种浏览器渲染引擎--webkit(chrome)和Gecko(Firefox)。他们的渲染流程差不多

- <span style="color: blue">**构建 DOM 树**：浏览器将 HTML 解析成树形结构的 DOM 树，一般来说，这个过程发生在页面初次加载，或页面 JavaScript 修改了节点结构的时候。</span>

- <span style="color: blue">**构建渲染树**：浏览器将 CSS 解析成树形结构的 CSSOM 树，再和 DOM 树合并成渲染树。</span>

- <span style="color: blue">**布局（Layout）**：浏览器根据渲染树所体现的节点、各个节点的 CSS 定义以及它们的从属关系，计算出每个节点在屏幕中的位置。Web 页面中元素的布局是相对的，在页面元素位置、大小发生变化，往往会导致其他节点联动，需要重新计算布局，这时候的布局过程一般被称为回流（Reflow）。</span>

- <span style="color: blue">**绘制（Paint）**：遍历渲染树，调用渲染器的 paint() 方法在屏幕上绘制出节点内容，本质上是一个像素填充的过程。这个过程也出现于回流或一些不影响布局的 CSS 修改引起的屏幕局部重画，这时候它被称为重绘（Repaint）。实际上，绘制过程是在多个层上完成的，这些层我们称为渲染层（RenderLayer）。</span>

- <span style="color: blue">**渲染层合成（Composite）**：多个绘制后的渲染层按照恰当的重叠顺序进行合并，而后生成位图，最终通过显卡展示到屏幕上。</span>

![浏览器渲染过程](./images/1c8b1e5771494ee5b1fc8a7fd9112c34_tplv-k3u1fbpfcp-watermark.png)

### 构建DOM树
浏览器将HTML解析为DOM树，通常发生在初次渲染或者通过JS修改DOM时
### 脚本处理(阻塞)
根据浏览器渲染进程的多线程模式，js引擎线程和渲染线程互为互斥，所以当进行脚本处理时，渲染被阻塞
### 构建渲染树
DOM+CSSOM,合并成可视的渲染树
### 布局(Layout)
根据渲染树来计算布局，在这个过程中，根据不同的层叠结构分层，不同层次单独布局
#### 原理
<span style="color: red">渲染树->渲染层->图形层->合成层</span>
- 渲染对象：一个DOM节点对应一个渲染对象，通过向一个<span style="color: blue">绘图上下文</span>发出绘图调用来引发回流和重绘
- 渲染层：处于同一个坐标空间(z轴)上的渲染对象将归并到一个渲染层中，不同的坐标空间形式不同的渲染层来表现他们的层叠关系。形成渲染成的触发条件
    - 根元素document
    - 明确定位属性: relative、absolute、fixed、sticky
    - opacity < 1透明
    - CSS filter属性
    - CSS mask属性
    - CSS transform属性
    - overflow不为visible
    满足以上条件的元素(渲染对象)将拥有独立的渲染层，没有独立渲染层的元素与父元素公用一个渲染层
- 合成层：满足特定条件的渲染层会被提升到合成层。合成层拥有独立的图形层。其他不是合成层的渲染层与父级同用一个图形层。合成层的提升条件
    - 3D transform：transform3d、transformZ
    - video、canvas、iframe
    - position: fixed
    - 具有will-change属性
    - 对：opacity、transform、filter、backdropfilter使用了transition和animation
    - 隐式合成:当有普通渲染成元素在合成层上方，为了正确显示其层叠顺序，故将其隐式的并入合成层
- 图形层：图形层是负责最终输出图形内容的层架构，拥有一个独立的<span style="color: orange">图形上下文</span>，图形上下文负责根据合成层生成该层的位图。位图上传到GPU，GPU多个位图合成，呈现在屏幕上

#### 层架构的优点和缺点
- 优点
    - 合成层的位图会传给CPU绘制，速度会快很多
    - 当需要repaint重绘时，只对渲染层本身起效果，不会回流到其它层
- 缺点
    - 绘制的合成层需要上传到GPU，当合成层过多时，会导致传输速率变慢，出现闪烁情况
    - 隐式合成层容易产生过量的合成层，占据大量的内容，但在移动设备上内容十分宝贵

#### 基础层结构的性能优化
- 动画尽量使用transform实现,而不是left、top等，这样可以将动画所在节点提升到合成层，GPU加速。否则动画所在节点将于document或拥有独立渲染层父节点止于同一渲染层，不断出现回流
- 减少隐式合成

## 绘制
回流必定引起重绘，但重绘不一定引起回流

遍历渲染树，绘制出节点内容，本质上是一个像素填充的过程。这个过程也出现与回流或一些不影响布局的CSS修改引起的屏幕局部重画，这时候它被称为重绘(Repaint)。实际上，绘制过程是在多个层上完成的，这些层我们成为渲染层(RenderLayer)

### 重绘(Repaint)
元素的样式修改不影响其在文档中的位置,(color、background-color、visibility等)，浏览器会重新计算元素的样式。

### 回流(reflow)
- 首次渲染
- 浏览器窗口大小改变
- 元素大小、位置变化
- 元素的直接内容变化(文本、图片等)
- 添加或删除可见的元素
- 激活伪类
- 查询某些属性(需要立刻回流计算当前属性)
浏览器维护一个队列，把所有的回流和重绘操作放入队列中，如果队列中的任务数量或者时间间隔超过一定阀值，浏览器会立即清空队列

### window.requestAnimationFrame(callback)
下次重绘之前调用回调函数

## 渲染层合成(composite)
多个绘制后的渲染层按照恰当的重叠顺序进行合并，而后生成位图，最终通过显卡显示到屏幕上。其层叠顺序就是来自于层叠上下文

### 如何优化
- DOM
    - 减少DOM操作
        - 尽量减少动态DOM集合(NodeList)因为每次的查询和修改操作都会造成DOM的重新渲染。
        - 合并多次操作
- 事件
    - 事件委托：把一类的元素事件委托到一个元素上，减少内存中存在的事件监听数量，主要是利用事件冒泡，在父元素中解决多个子元素的事件
- CSS
    - 尽量避免table布局
    - 若要通过改变元素的class来改变样式，尽量其发生在DOM的末端
    - 避免设置多项内联样式
    - 动画应该尽可能被position absolute或Fixed包裹
    - 避免过多层叠(css选择器)，因为选择器的匹配是从右到左的

## 资料
[浏览器渲染工作原理](https://juejin.cn/post/6844904198971064328#heading-1)

[浏览器合成与渲染层优化---重要](https://blog.csdn.net/weixin_38129930/article/details/102675221)


