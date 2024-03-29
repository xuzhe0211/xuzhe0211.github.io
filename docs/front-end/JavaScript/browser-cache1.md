---
autoGroup-7: 浏览器
title: 聊聊浏览器缓存策略那些事儿
---
谈起性能优化,大家一开始就能想到缓存,缓存可以说是软件开发领域进行性能优化最简单高效的一种方式。好的缓存可以有效减少数据获取的代码(这里的代价抽象来说就是：传输距离、传输耗时和传输体积)

譬如，在前端领域使用合适的HTTP缓存可以缩短网页请求资源的距离，减少延迟，并且由于缓存文件可以重复利用，还可以减少带宽，降低网络负荷。基于浏览器本地存储方案进行数据缓存可以有效减少重复的数据请求和解析工作，让用户数据更快展现。

<span style="color: red">浏览器缓存从缓存类型来说可以分为资源缓存和数据缓存，资源缓存也就是常说的HTTP缓存，其可以包含有HTTP Header缓存机制、缓存位置两个内容</span>，本文将全面梳理浏览器缓存中射击的知识点,希望为大家提供一些参考

![浏览器缓存](./images/2bde51a8b90a41928410a7df3342dff6_tplv-k3u1fbpfcp-zoom-in-crop-mark_3024_0_0_0.png)

## 浏览器缓存
### 资源缓存
资源缓存的主要对象是web站点的html、js、css、image、video、audio等静态资源文件。浏览器识别这些资源类型主要通过Content-Type实体头部，Content-Type标识着资源的[MIME](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)类型

资源缓存因为缓存数据的特殊性(无需解析响应数据体，整个响应体是纯文本数据)，可以采用多级缓存方式进行共享存储。也就是说可以在浏览器和服务器之间在家一层或多层代理缓存，代理缓存接受并转发浏览器的请求，然后接收浏览器的响应并缓存到本地。

根据是否加有代理缓存，可以将资源缓存归类为两类：私有缓存与共享缓存

- 共享缓存

    共享缓存可以被多个用户使用。例如，ISP或你所在的公司可能会假设一个web代理来作为本地网络基本的一部分提供给用户。这样热门的资源就会被重复利用，减少网络拥堵与延迟

- 私有缓存

    共享缓存存储的响应能够被多个用户使用。私有缓存只能用于单独用户。所以你在自己浏览器上的看到的缓存资源就是一种私有缓存。这些资源不能跨浏览器共享，更不能跨机器共享。

    下图分别示例了无缓存、共享缓存、私有缓存的模式

    ![缓存模式](./images/08b2735f1ab847009ea066c520433e80_tplv-k3u1fbpfcp-zoom-in-crop-mark_3024_0_0_0.png)

### 数据缓存
这里的数据缓存是限定在浏览器的缓存，跟服务端的缓存不是一回事儿。

那么浏览器的数据缓存是怎么做到呢？

<span style="color: red">答案就是Cookie、Web Storage、IndexDB三种浏览器本地数据存储API</span>.关于这三种API除了IndexDB大家不长使用外，其他两种应该是用的很频繁吧。所以，其实大家在日常工作中已经大量使用了数据缓存技术

## 资源缓存过程分析
资源缓存过程其实是HTTP缓存机制运作的过程：
![资源缓存过程分析](./images/5fbf8b43a0db45c286a22ea3ace4c50e_tplv-k3u1fbpfcp-zoom-in-crop-mark_3024_0_0_0.png)

<span style="color: blue">上图给出了浏览器首次(之前从没访问过该站点)发起HTTP请求的大致过程，可以发现</span>
- <span style="color: blue">浏览器每次发起请求，都会现在浏览器缓存中查找该请求的结果以及缓存标识</span>
- <span style="color: blue">浏览器每次拿到返回的请求结果都会将该结果和缓存标识存入浏览器缓存中</span>

> HTTP缓存机制发起的时机比我们想要中的要更早，在正式发起HTTP网络请求就已经开始，其最早触发的阶段是浏览器根据缓存标志在"本地"搜索缓存

![缓存机制发起](./images/879c696d729e4e1fbbcb64a66b498c5f_tplv-k3u1fbpfcp-zoom-in-crop-mark_3024_0_0_0.png)

<span style="color: blue">在服务器返回响应后，浏览器会做两件事</span>
- 解析响应资源,css、html资源资源就开始渲染dom,js资源就启动js引擎执行脚本
- 提取Response Header里的缓存标识,将缓存标识和响应一并缓存。然后，进入下一轮HTTP请求循环

## HTTP缓存机制
在前端世界中，<span style="color: blue">一个资源(**这里主要指js,css,html,image等静态资源**)获取过程可以分为发起网络请求、服务端处理、浏览器解析数据三个步骤。浏览器HTTP缓存可以帮助我们在第一到第三步骤中优化性能。比如说直接使用缓存而不发起请求，或者发起了请求但服务器存储的数据和前端一致，那么就没必要再将数据回传回来，这样就减少了响应数据量</span>

### 缓存位置
<span style="color: red">HTTP资源缓存位置有四种，并且各自有优先级，当依次查找缓存且都没有命中的时候，才会去请求网络，缓存位置按照优先级排序依次是：</span>

1. Service Worker
2. Memory Cache
3. Disk Cache
4. Push Cache

- Service Worker

    <span style="color: red">Service Worker是运行在浏览器背后的独立线程,一般可以用来实现缓存功能。**使用Service Worker的话，传输协议必须喂HTTPS**。因为Service Worker中涉及到请求拦截，所以必须使用HTTPS协议来保障安全</span>

    <span style="color: red">**Service Worker的缓存与浏览器其他内建的缓存机制不同,它可以让我们自由控制缓存哪些文件、如何匹配缓存、如何读取缓存,并且缓存是持续性的**</span>

    Service Worker实现缓存功能一般氛围三个步骤
    1. <span style="color: blue">首先需要先注册Service Worker</span>
    2. <span style="color: blue">监听到install事件及缓存需要的文件</span>
    3. <span style="color: blue">查询缓存全局，主要是通过拦截请求的方式查询是否存在缓存，存在缓存的话就可以直接读取缓存文件，否则就去请求数据</span>

    当Service Worker没有命中缓存的时候,就需要去调用 xhr/fetch API获取数据。也就是说，如果没有在Service Worker 命中缓存的话，会根据缓存找到优先级去查找数据。但是不管我们是从Memory Cache中还是从网络请求中获取数据，浏览器都会显示我们是从Service Worker中获取内容。

    使用Service Worker [缓存图片demo](https://mp.weixin.qq.com/s/aboA9dtCK6t0fzs0JU58Iw)，效果：

    ![Service Worker](./images/e9639948cb0c4bffa557a191fb33e2c9_tplv-k3u1fbpfcp-zoom-in-crop-mark_3024_0_0_0.png)

- Memory Cache

    <span style="color: red">**Memory Cache是内存中的缓存(Disk Cache就是磁盘中的缓存).按照操作系统的常理:先读内存，在读硬盘**</span>

    几乎所有的网络请求资源都会被浏览器自动加入到Memory Cache中。但是也正因为数量很大但是浏览器占用的内存不能无线扩大这样两个因素，Memory Cache注定只能是个"短期存储"。常规情况下，浏览器的TAB关闭后该次浏览的 Memory Cache 编告失效(为了给其他TAB页，腾出内存空间)。而如果极端情况下(例如一个页面的缓存就占用了超级多的内存)，那可能在TAB没关闭之前，排在前面的缓存就已经失效了。。

    刚才提到，几乎所有的请求资源 都能进入Memory Cache，细分一下有如下几块

    1. 通过 preloader 加载的资源。如果你对这个机制不太了解，这里做一个简单的介绍，[详情可以参阅](https://calendar.perfplanet.com/2013/big-bad-preloader/)

        一般来讲,在浏览器打开网页的过程中，会先请求HTML然后解析。之后如果浏览器发现了js、css等需要解析和执行的资源时，它会使用CPU资源对他们进行解析和执行。在古老的年代(大约2007年以前),"请求js/css- 解析执行 - 请求下一个js/css - 解析执行下一个js/css" 这样的"串行"操作模式在每次打开页面之前进行着。很明显在解析执行的时候，网络请求是空闲的，这就有了发挥的空间:能不能一遍解析执行js/css，一遍去请求下一个资源呢？

        这就是 preloader 要做的事情。不过 preloader 没有一个官方标准，所以每个浏览器的处理都略有区别。例如有些浏览器还会下载css中的 @import 内容或&lt;video&gt; 的poster 等

        而这些被 preloader 请求来的资源就会被放入 Memory Cache 中，供之后的解析执行操作使用
    2. preload 指令标记的资源(更上面相比没有'er')。是线上这个大家更熟悉一些，例如&lt;link rel="preload"&gt;.这些显式指定的预加载资源，也会被放入Memory Cache中
    3. 根据HTTP header标识缓存的资源,这里后面讲HTTP Header缓存控制时会详细介绍

    <span style="color: red">**Memory Cache机制保证了一个页面中如果有两个相同的请求(例如两个src相同的&lt;img&gt;,两个href相同的&lt;link&gt;)都实际只会被请求做多一次，避免浪费**</span>

    <span style="color: red">在从Memory Cache获取缓存内容时，浏览器会忽视例如 Cache-Control: max-age=0, Cache-Control:no-cache等缓存头部。</span>例如页面上存在几个相同src的图片，即便它们可能被设置为不缓存，但依然会从Memory Cache 中读取。**这是因为Memory Cache 只是短期使用，大部分情况生命周期只有一次浏览而已。而 Cache-Control:max-age=0 在语义上普遍被解读为"不要在下次浏览时使用",所以和Memory Cache并不冲突**

    > 对于站点中的某个资源,如果是真心不想让其进入缓存，就连短期也不行，那就需要使用Cache-Control: no-store。存在这个头部配置的话，即便是Memory Cache 也不会存储
- Dist Cache 

    <span style="color: red">**Dist Cache也叫HTTP Cache，顾名思义是存储在硬盘上的缓存**,因此它是持久存储的，是实际存在于文件系统中。而且它允许相同的资源在跨会话，甚至跨节点的情况下使用,例如两个站点都使用了同一张图片。</span>

    Dist Cache 会严格根据HTTP头信息中的各类字段来判断哪些资源可以缓存，哪些资源不可以缓存，哪些资源是仍然可以用的，哪些资源是过时需要重新请求的。当命中缓存之后，浏览器会从硬盘中读取资源，虽然比起从内存中读取慢了一些，但比起网络请求还是快了不少的。绝大部分的缓存都来自 Disk Cache。

    哪些资源是过时需要重新请求的。当命中缓存之后，浏览器会从硬盘中读取资源，虽然比起从内存中读取慢了一些，但比起网络请求还是快了不少的。绝大部分的缓存都来自 Disk Cache。

    一个疑问？<span style="color: red">浏览器会把哪些文件丢进内存中？哪些丢进硬盘中</span>？关于这点，网上说法不易，有博主根据[试验](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/53)的处如下结论(仅供参考)

    1. <span style="color: red">**如果开启了Service Worker首先会从Service Worker中拿**</span>
    2. <span style="color: red">**如果新开一个以前打开过的页面缓存会从Disk Cache中拿(前提是命中强缓存)**</span>
    3. <span style="color: red">**刷新当前页面时浏览器会根据当前运行环境/内存来决定是从Memory Cache 还是从 Disk Cache中拿**</span>

    ![刷新浏览器](./images/68747470733a2f2f6a61797a616e6777696c6c2e6769746875622e696f2f626c6f672f696d672f63616368652f7765697a68695f312e676966.gif)

- Push Cache

    Push Cache(推送缓存)是HTTP/2中内容，当以上三种缓存都没有命中时，它才会被使用
    > Push Cache只在会话(Session)中存在,一旦会话结束就被释放。并且缓存时间也很短暂，在Chrome浏览器中只有5分钟左右,同时它也并非严格执行HTTP头中的缓存命令

    Push Cache 在国内能够查到的资料很少，也是因为 HTTP/2 在国内不够普及。这里推荐阅读[Jake Archibald的 HTTP/2 push is tougher than I thought](https://links.jianshu.com/go?to=https%3A%2F%2Fjakearchibald.com%2F2017%2Fh2-push-tougher-than-i-thought%2F) 这篇文章，文章中的几个结论：

    - 所有的资源都能被推送,并且能够被缓存,但是Edge和Safari浏览器支持相对比较差
    - 可以推送no-cache 和 no-store的资源
    - 一旦连接被关闭，Push Cache就被释放
    - 多个页面可以使用同一个HTTP/2的连接，也可以使用同一个Push Cache。这主要还是依赖浏览器的实现而定，出于对性能的考虑，有的浏览器会对相同域名但不同的tab标签使用同一个HTTP连接。
    - Push Cache中的缓存只能被使用一次
    - 浏览器可以拒绝接受已经存在的资源推送
    - 你可以给其他域名推送资源
### HTTP Header 缓存控制
在缓存查找阶段,浏览器会按照顺序依次在上面四种缓存位置进行搜索，如果都没有命中，那么只能发起请求来获取资源了

发起请求获取资源也就意味着HTTP Header缓存控制即将登场。**通常HTTP Header缓存策略分为两种:强缓存和协商缓存**。这两种缓存策略都是通过设置HTTP Header来实现的
#### 强缓存
强缓存:<span style="color: red">不会向服务器发起请求,直接从缓存中读取缓存,在chrome控制台的Network选项中可以看到该请求返回200的状态码,并且size显示dist cache或者Memory cache(Chrome浏览器中)，比如访问百度首页，多刷几次就能看到缓存效果</span>

![强缓存](./images/da2a708e765149648a89681be022ae26_tplv-k3u1fbpfcp-zoom-in-crop-mark_4536_0_0_0.png)

强缓存可以通过设置两种HTTP Header实现:Expires 和 Cache-Control(Pragma)

- Expires

    <span style="color: red">缓存过期时间，用来指定资源到期时间,是服务器端的具体的时间点(时间精确到秒)</span>。也就是说 Expires = max-age + 请求时间，需要和Last-Modified结合使用。 Expires 是Web服务器响应头字段，在响应http请求时告诉浏览器在过期时间前浏览器可以直接从浏览器缓存中存取数据，而无需再次请求

    Expires是HTTP/1的产物，受限于本地时间，如果修改了本地时间，可能会造成缓存失效。

    Expires: Wed, 22 Oct 2021 08:41:00 GMT表示资源会在 Wed, 22 Oct 2021 08:41:00 GMT 后过期，需要再次请求。

    因此，Expires这个字段设置有两个明显的缺点
    1. <span style="color: red">由于绝对时间，用户可能会将客户端本地的时间进行修改，而导致浏览器判断缓存失效，重新请求该资源。此外，即使不考虑自信修改，时差或者误差等因素也可能造成客户端与服务端的时间不一致，致使缓存失效。</span>
    1. <span style="color: red">写法太复杂了。表示时间的字符串多个空格，少个字母，都会导致非法属性从而设置失效。</span>
- Cache-Control

    在HTTP/1.1中，Cache-Control是最重要的缓存控制头，控制站点资源强缓存逻辑。当Cache-Control:max-age=300时，则代表在这个请求正确返回时间（浏览器也会记录下来）的5分钟内再次加载资源，就会命中强缓存。

    <span style="color: red">Cache-Control是通用头,在请求头或响应头中均可设置，并且可以组合使用多种指令</span>

    ![Cache-Control指令](./images/711429c172a54649aadfaf76c733a428_tplv-k3u1fbpfcp-zoom-in-crop-mark_4536_0_0_0.png)

    其中有一些属性是需要特别关注的:
    1. public: 该指令表示该响应可以被任何中间人(比如中间代理、CDN等)缓存。若指定了public，则一些通常不被中间人缓存的页面，比如带有HTTP验证信息(账号信息)的页面或某些特定状态码的页面，将会被其缓存。上文提到的共享缓存其实就是一个proxy,所以为了让资源支持共享缓存，应该显示设置Cache-Control:public（因为private是默认值）。
    2. private:所有内容只有客户端可以缓存，Cache-Control的默认取值
    3. no-cache:每次有请求发出时,浏览器or代理服务器 会将次请求发到服务器(该请求应该会滴啊有与本地缓存相关的验证字段)。服务器会验证请求中所描述的缓存是否过期，若未过期(实际就是返回304),则缓存才使用本地缓存，否则使用服务器上返回资源并更新本地缓存。**需要注意的是，no-cache这个名字有一点误导。设置了no-cache之后，并不是说浏览器就不在缓存数据，只是浏览器在使用缓存数据时候，需要先确认一下数据是否还跟服务器保持一致**
    4. no-store:缓存中不得存储任何关于客户端请求和服务端响应的内容。每次由客户端发起的请求都会下载完整的响应内容

    上面列表中的属性值可以混合使用，例如Cache-Control:public, max-age=36000.在混合使用时，它们的优先级如下图

    ![Cache-Control优先级](./images/85c0edb234934a88a89b3da8159d8fe2_tplv-k3u1fbpfcp-zoom-in-crop-mark_4536_0_0_0.png)

- Pragma

    Pragma是HTTP/1.0标准中定义的一个header属性，请求中包含Pragma的效果跟在头信息中定义Cache-Control:no-cache相同，但是HTTP的响应头没有明确定义这个属性，所以它不能拿来完全替代HTTP/1.1中定义的Cache-Control头。通常定义Pragma以向后兼容基于HTTP/1.0的客户端。

    Pragma投只有一个属性值：no-cache

    >由于 Pragma 在 HTTP 响应中的行为没有确切规范，所以不能可靠替代 HTTP/1.1 中通用首部 Cache-Control，尽管在请求中，假如 Cache-Control 不存在的话，它的行为与 Cache-Control: no-cache 一致。建议只在需要兼容 HTTP/1.0 客户端的场合下应用 Pragma 首部。

    所以，大家对于Progma只需要了解就行，实际中基本用不到。

- Expires 和Cache-Control对比

    其实这两者差别不大，区别在于 Expires 是http1.0的产物，Cache-Control是http1.1的产物，两者同事存在的话，Cache-Control优先级高于Expires；在某些不支持HTTP1.1的环境下，Expires就会发挥用处。Expires其实是历史的产物，现阶段它的存在只是一种兼容性的写法。

    强缓存模式下，客户端判断是否使用缓存的依据是当前缓存是否在有效期内，而不关心服务器端文件是否已经更新，这时候如果服务端更新了资源文件，那就可能导致客户端资源其实是过时的，对用户使用带来一定困扰。

    看到这是大家可能会问：设置no-cache时不是会请求服务器做一次缓存有效判断嘛？那应该不会出现使用过时缓存的情况呀。理想很丰满，现实很残酷。结合在文章最开始说到的缓存位置，如果某个 header 设置为Cache-Control:no-cache的资源缓存位置是Memory Cache，那么浏览器将不会去请求服务器做一次缓存鉴别，而是直接从Memory Cache读取资源！
    那如何确保本地的缓存跟服务端资源及时同步呢？ 此时就需要用到协商缓存策略。

#### 协商缓存
强缓存的优先级高于协商缓存，当强缓存失效后，协商缓存机制开始发挥作用。此时，浏览器将携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程。主要有一下两种情况

- 协商缓存生效，返回302和not Modified

    ![协商缓存生效](./images/88385e3af20b4e49b4e1a17264034a7e_tplv-k3u1fbpfcp-zoom-in-crop-mark_4536_0_0_0.png)
- 协商缓存失效，返回200和请求结果

    ![协商缓存失效](./images/9da55f6ea9f84882ba29202144fe1163_tplv-k3u1fbpfcp-zoom-in-crop-mark_4536_0_0_0.png)

<span style="color: red">**控制协商缓存的HTTP Header 有两类:Last-Modified(响应头)/If-Modified-Since(请求头)和Etag(响应头)/If-Node-Match(请求头),接下来分别江苏这立哎那个类控制头的控制机制**</span>

- Last-Modified/If-Modified-Since

    Last-Modified是响应头，表示这当前资源在服务器上的最后修改时间(精确到秒).浏览器接收后缓存文件和header:

    > Last-Modified 是一个响应首部，其中包含源头服务器认定的资源做出修改的日期及时间。它通常被用作一个验证器判断接收到的或者存储的资源是否彼此一致。由于精确度比  ETag 要低，所以这是一个备用机制。包含有  If-Modified-Since 或 If-Unmodified-Since 首部的条件请求会使用这个字段。

    Last-Modified / If-Modified-Since 的配合过程是这样的：浏览器下一次请求这个资源时，浏览器检测到有Last-Modified这个header，于是添加If-Modified-Since这个header到请求头中，其值就是Last-Modified中的值；服务器收到这个资源请求后，会根据 If-Modified-Since 中的值与服务器中这个资源的最后修改时间对比，如果没有变化，返回304状态码和空的响应体；如果If-Modified-Since的时间早于服务器中这个资源的最后修改时间，说明文件有更新，于是返回新的资源文件和200状态码。下图是缓存还在有效期，响应304的流程图：

    ![last-modified](./images/f2e3468672ca497bb1501f422546bde0_tplv-k3u1fbpfcp-zoom-in-crop-mark_4536_0_0_0.png)

    但是 Last-Modified 还是存在一些不足：
    - <span style="color: red">如果本地打开缓存文件，即使没有对文件进行修改，但还是会造成Last-Modified被修改，服务端判断不缓存失效从而发送相同的资源到客户端</span>
    - <span style="color: red">Last-Modified 记录的修改时间只能精确到秒，服务端如果在秒级时间内完成了资源更新，会造成Last-Modified记录的时间戳没有变化，那么服务端会任务前端缓存资源还是有效的，不会返回正确的最新资源</span>

    根据文件修改时间来决定是否缓存尚有不足，能否可以直接根据文件内容是否修改来决定缓存策略？

    答案就是：ETag 和 If-Node-Match

- Etag/If-Node-Match

    <span style="color: red">ETag HTTP响应头是资源的特定版本的标识符。如果给定URL中的资源更改，则一定要生成新的ETag值(这一般是web容器的自主行为)。对于响应头中拥有ETag字段的资源，浏览器在下一次请求该资源时，会将上一次返回的ETag值放到请求头里的If-None-Match里，服务器只需要比较客户端传来的If-None-Match跟自己服务器上该资源的ETag是否一致，就能判断当前资源是否为最新资源。在服务端，如果ETag匹配不上，那么服务端将返回 200 状态码并在响应体中加上新的资源文件；如果匹配成功，则返回304状态码和空的响应体。</span>

    > 是不是跟Last-Modified / If-Modified-Since的匹配过程很类似？是的，流程完全一致，只是匹配标识由时间戳变为了一个hash值。

    下图是 ETag / If-None-Match匹配成功流程：

    ![ETag](./images/4feeab6eb5d94b9ca17f86a26d354b5d_tplv-k3u1fbpfcp-zoom-in-crop-mark_4536_0_0_0.png)

- 两类协商缓存的对比

    Last-Modified / If-Modified-Since 和 ETag / If-None-Match都属于HTTP/1.1协议里的Header，两者的出现没有时间的先后顺序。那么为什么要设计这两套协商缓存策略呢？

    为了满足不同的使用场景，有些场景对缓存失效精度要求较高，有些要求精度要求低但对服务器资源损耗较为敏感，所以就设计了两套协商缓存。两者主要特点对比如下：
    - 在精确度上，ETag要优于Last-Modified
        > Last-Modified的时间单位是秒，如果某个文件在1秒内改变了多次，那么他们的Last-Modified其实并没有体现出来修改，但是Etag每次都会改变确保了精度；如果是负载均衡的服务器，各个服务器生成的Last-Modified也有可能不一致。
    - 在性能上，ETag要逊于Last-Modified，毕竟Last-Modified只需要记录时间，而Etag需要服务器通过算法来计算出一个hash值
    - 在优先级上，服务器校验优先考虑Etag
#### 缓存新鲜度
- 缓存驱逐

    理论上来讲，当一个资源被缓存存储后，该资源应该可以被永久存储在缓存中。由于缓存只有优先的空间用于存储资源副本，所以缓存会定期的将一些副本删除，这个过程叫做缓存驱逐

- 缓存失效计算

    在客户端缓存了资源后，如何保证缓存资源的更新呢？

    由于HTTP是C/S模式的协议，服务器更新一个资源时，不可能直接通知客户端更新缓存，所以双方必须为该资源约定一个过期时间，在该过期时间之前，该资源(缓存副本)就是新鲜的，当过了过期时间后，该资源(缓存副本)则变为陈旧的。

    对于含有特定头信息的请求，浏览器会去计算缓存寿命，该寿命就代表着缓存新鲜度，计为变量：freshnessLifetime。接下来用术语expiresValue来表明 Expires 头域的值；用术语maxAgeValue（单位：秒）来表示 Cache-Control 头域里max-age控制指令的值。

    Cache-Control:max-age 指令优先于 Expires 头域执行，所以如果 max-age 出现在响应里，那么定义如下：

    ```js
    freshnessLifetime = masAgeValue;
    ```
    否则，若 Expires 头域出现在响应里，定义如下：
    ```js
    freshnessLifetime = expiresValue - dateValue 
    ```
    其中，dateValue为Date头域的值。
    > 注意上述运算不受时钟误差影响，因为所有信息均来自源服务器。

    同样，如果响应有Last-Modified（其值记为lastModifiedTime），启发式过期值应不大于从那个时间开始到现在(Date头的值，记为：dateValue)这段时间间隔的某个分数(典型设置为间隔的 10% )。

    ```js
    freshnessLifetime = (dateValue - lastModifiedTime) / 10
    ```
    有了缓存新鲜度，就可以很容易得到缓存的失效时间，缓存失效时间计算公式如下：

    上式中，responseTime 表示浏览器接收到此响应的那个时间点，currentAge为当前缓存年龄，[详见rfc2626文档第51页](http://files.blogjava.net/sunchaojin/http1.3.pdf)。
### HTTP Header缓存全流程
![HTTP Header缓存全流程](./images/3b5a5b895b45452293ef6586ea9c257b_tplv-k3u1fbpfcp-zoom-in-crop-mark_4536_0_0_0.png)

1. 强缓存优先于协商缓存进行,若强缓存(Expires和Cache-Control)生效则直接使用缓存，若不生效则进行协商缓存(Last-Modified/If-Modified-Since 和 Etag/If-None-Match)
2. 协商缓存需要向服务器发送请求，确认缓存有效性以决定是否使用缓存，若协商缓存失效，返回200状态和新的资源及其缓存标识；缓存生效则返回304,继续使用缓存；
## 数据缓存
内容相比资源缓存不太复杂，这里就直接传送吧:[深入了解浏览器存储--从cookie到webStorage、IndexDB](https://juejin.cn/post/6844903812092674061)
## 浏览器刷新动作对于强缓存和协商缓存的影响
1. 浏览器地址栏中写入URL,按下回车访问页面时，浏览器会按照缓存位置查找缓存，当发现缓存中有这个文件，则不继续请求直接去缓存拿资源。否则发送请求获取该资源
2. 当F5刷新网页时(正常重新加载),浏览器会按缓存位置查找缓存，没有命中时则跳过强缓存，直接执行协商缓存检查过程
3. 当用户使用Ctrl+F5强制刷新网页时(硬性重新加载),会跳过缓存找到、强缓存、协商缓存阶段，直接从服务器加载资源

## 实际场景应用缓存策略

## 总结




## 资料
[聊聊浏览器缓存策略那些事儿](https://juejin.cn/post/7066738436794744840#heading-2)