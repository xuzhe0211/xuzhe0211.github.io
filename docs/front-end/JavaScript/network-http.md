---
autoGroup-8: 网络
title: 网络编程/http协议相关
---

## http协议
### 概述
1. 无连接
2. 无状态
3. 简单快速
4. 灵活

### Request
#### 请求行
- Method
	- GET---请求获取Request-URI所标识的资源/从指定的资源请求数据
  - POST---在Request-URI所标识的资源后附加新的数据/向指定的资源提交要被处理的数据
  - HEAD---请求获取由Request-URI所标识的资源的响应消息报头/与 GET 方法相同，但只返回 HTTP 报头，不返回文档主体
  - PUT---请求服务器存储一个资源，并用Request-URI作为其标识/上传指定的 URI 表示
  - DELETE---请求服务器删除Request-URI所标识的资源
  - TRACE---请求服务器回送收到的请求信息，主要用于测试或诊断/请求服务器在响应中的实体主体部分返回所得到的内容
  - CONNECT--- 保留将来使用/HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。
  - OPTIONS---预检请求/请求查询服务器的性能，或者查询与资源相关的选项和需求
  ##### 注意
   - 方法名称是区分大小写的，当某个请求所针对的资源不支持对应的请求方法的时候，服务器应当返回状态码405（Mothod Not Allowed）；当服务器不认识或者不支持对应的请求方法时，应返回状态码501（Not Implemented）。
   - HTTP服务器至少应该实现GET和HEAD/POST方法，其他方法都是可选的，此外除上述方法，特定的HTTP服务器支持扩展自定义的方法。
- RequestUrl---https://www.baidu.com/img
- HttpVersion--Http 1.1

#### 消息报头
- Accept--- 指定客户端接受哪些类型的信息/MIME
	- image/gif gif图片
    - text/html html文本
- Accept-Charset--- 客户端接受的字符集
	- gb2312中文字符
    - iso-8859-1 西文字符集
    - utf-8 多语言字符
- Accept-Encoding----可接受的内容编码
	- gzip，deflate 压缩类型
    - identity 默认
- Accept-Language---指定一种自然语言--zh-cn
- Authorization--- 证明客户端有权查看某个资源
- Host--- 指定被请求资源的Internet主机和端口号--www.kaikeba.com:8080
- User-Agent-用户代理
	- 操作系统及版本
    - CPU类型
    - 浏览器及版本
    -浏览器渲染引擎
    - 浏览器语言
    - 浏览器插件
- Content-Type --- Body编码方式

#### 请求正文--根据头部的Content-Type确定
- application/x-www-form-urlencoded
	- title=test&sub%5B%5D=1
    - 默认数据编码方式
- application/json
	- 序列化后的JSON字符串
    - ajax
- text/xml--- XML作为编码方式的远程调用规范
- text/plain--数据以纯文本形式(text/json/html)进行编码
- multipart/form-data
	- 既有文本数据，又有文本等二进制数据
    	- WebKitFormBoundaryrGKCBY7qhFd3TrwA
        - Content-Dispostion:form-data;name="text"
        - title
        - Content-Dispositon:from-data;name="file";filename="chorme.png"
        - Content-type:image/png
        - PNG...content fo chrome.png...
    - 允许在数据中包含整个文件，所以常用于文件上传

### Response

#### 状态行--状态码
1. 1xx---指示消息--表示请求已接受，继续处理
2. 2xx---成功--表示请求已被成功接收、理解、接受
    - 200 ok 请求成功
    - 201 created/已创建
      - 201 表示服务器在请求的响应中建立了新文档；应在定位头信息中给出他的URL
    - 202 Accepted/已接受
      - SC-ACCEPTED告诉客户端请求正在执行，但还没有处理完
    - 203 非官方信息
      - 状态码203是表示文档呗正常返回,但是由于正在使用的是文档副本所以某些响应头信息可能不正确，这是HTTP1.1新加入的
    - 204 no Content/无内容
      - 在没有新文档的情况下，204确保浏览器继续显示先前的文档。在各状态码对于用户周期新的重载某一页非常有用，并且你可以确定先前的页面是否已经更新。但是，这种方法对通过刷新响应头信息或等价的HTML标记自动重载的页面起作用，因为它会返回一个204状态码停止以后的重载。但基于Javascript脚本的自动重载在让然需要能够起作用
    - 206 局部内容
      - 206(CS_PARTIAL_CONTENT)是在服务器完成了一个包含Range头信息的局部请求时候被发送的。这是HTTP1.1新加入的
- 3xx---重定向--要完成请求必须进行更进一步操作
    - 301 所有请求页面转移到URL
    - 302 所有请求转移到临时重定向
    - 304 (Not Modified/为修正)
    - 305 使用代理


    [http中301、302、303、307、308区别](/front-end/JavaScript/network-http-status.html)

- 4xx---客户端错误--请求有语法错误或请求无法实现
	- 400 Bad Request 客户端请求有语法错误，不能被服务器所理解
    - 401 Unauthorized 请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用
    - 403 Forbidden 服务器收到请求，但是拒绝提供服务
    - 404 Not Fount 请求资源不存在，eg:输入了错误的URL
    - 405 Method Not Allowed 方法未允许
    - 406 Not Acceptable 无法访问
      - 表示请求资源的MIME类型与客户端中Accept头信息指定的类型不一致。
    - 407 代理服务器认证要求
      - 407 (SC_PROXY_AUTHENTICATION_REQUIRED)与401状态有些相似，只是这个状态用于代理服务器。该状态指出客户端必须通过代理服务器的认证。代理服务器返回一个Proxy-Authenticate响应头信息给客户端，这会引起客户端使用带有Proxy-Authorization请求的头信息重新连接。该状态码是新加入 HTTP 1.1中的。
    - 408 请求超时
      - 是指服务端等待客户端发送请求的时间过长
    - 409 冲突
    - 428 Precondition Required(要求先决条件)
    - 429 Too Many Requests(太多请求)

        当你需要限制客户端请求某个服务的数量，也就限制请求速度时，该状态码会非常用用。在此之前，有一些类似的状态码例如509

        如果你希望限制客户端对服务的请求数，可使用429，同时包含一个Retry-After响应头用于告诉客户端多长时间可以再次请求服务

    - 431 请求头字段太大
- 5xx---服务的错误--服务器未能实现合法的请求
	  - 500 Internal Server Error 服务器发生不可预期的错误-- 内部服务器错误
    - 501 未实现---状态告诉客户端服务器不支持请求中要求的功能。例如，客户端执行了如PUT这样的服务器并不支持的命令。
    - 503 Server Unavailable 服务无法获得  --服务器当前不能处理客户端的请求，一段时间后可能恢复请求
    - 504--网关超时
    - 505 不支持的HTTP版本
    - 511 要求网络认证
    
[http新增的四个状态码](https://www.cnblogs.com/gisblogs/p/7121943.html)

#### 消息报头
- 响应报头
	- Location 重定向接受者到一个新的位置
    - WWW-Authenticate 包含在401(未授权)响应信息中，客户端收到401响应消息的时候，并发送Authorzation报头域请求服务器对其进行验证时，服务的响应报头就包含该报头域
    - Server 包含了服务器用来处理请求的软件信息 -- Apache-Coyote/1.1
- 实体报头
- Content-Encoding 媒体类型的修饰符 eg：Content-Encoding:gzip
- Content-Language 资源所用的自然语言。没有设置该域则认为实体内容将提供给所有的语言阅读
- Content-Length 正文长度，以字节方式存储的十进制数字来表示
- Content-Type 实体报头域用于指名发送接受者的实体正文的媒体类型
	- text/html;chartset=UTF-8
    - application/json;charset=UTF-8
    - [详细列表](https://tool.oschina.net/commons/)
    - POST
- Expires 响应过期的日期和时间
	- 为了让代理服务器或浏览器在一段时间以后更新缓存中(再次访问曾访问过的页面时，直接从缓存中加载，缩短响应时间和降低服务器负载)的页面
    - 无缓存 response.setDateHeader('Expires', '0');

#### 响应正文


## HTTP 1.X

缺陷:线程阻塞，在同一事件，同一域名的请求有一定数量限制，超出限制数目的请求会被阻塞

### HTTP 1.0
缺陷：浏览器与服务器只保持短暂的连接，浏览器的每次请求都需要与服务器建立一个TCP连接的新建成本很高，因为需要客户端和服务器三次握手，服务器完成请求处理后立即断开TCP连接，服务器不跟踪每个客户也不记录过去请求

解决方案：添加投信息--非标准的connection字段connection:kepp-alive;

### HTTP1.1
1. 持久连接：引入持久连接，即TCP连接默认不关闭，可以多个请求复用,不用声明connection:keep-alive(大多浏览器允许同时建立六个持久连接)
2. 管道机制：即在同一个TCP连接里面，客户端可以同时发送多个请求
3. 分块传输编码：服务的没产生一块就传送一块，采用流模式取代缓存模式
4. 新增请求： put delete options connect

缺点

1. 虽然允许复用TCP连接，但是同一个TCP连接里面，所有的数据通信是按次序进行处理一个，才会处理下一个
2. 避免方式-是减少请求次数 二是同时多开持久连接

## HTTP2.0

特点：
1. 采用二进制格式而非文本格式 --二进制分帧
2. 完全多路复用，而非有序并阻塞的，只需一个连接即可实现并行
3. 报头压缩，降低开销
4. 服务端推送

#### 二进制协议
HTTP1.1的头部信息肯定是文本，数据体可以是文本，也可以是二进制；2.0是彻底的二进制协议，头部和数据体都是二进制统称为帧；

二进制解析起来更高效，线上更紧凑 错误更少

#### 多路复用
复用TCP连接，在一个连接里面，客户端和浏览器可以同时发送多个请求和回应，而且不用按照顺序，这就避免了队头阻塞,**一个通道可以有240多个连接**

#### 报头压缩

HTTP协议是无状态，导致每次请求必须附上所有信息---请求很多字段是重复的，一样内容重复请求浪费带宽 影响速度

2.0引入了头部压缩机制，一方面头信息使用gzip压缩后发送 另一方面客户端和服务端同时维护一张信息表，所有字段都在这表上，产生一个索引号之后不发送字段 只发送索引号

#### 服务端推送

HTTP2.0允许服务器未经请求，主动向客户端发送请求

通过推送男鞋服务器任务，客户端需要的内容缓存到客户端中，避免往返延迟

## HTTP3.0
HTTP3.0 相对于HTTP2.0是一种脱胎换骨的改变!

http3 基于 UDP 协议，这是与以前版本的 http 最大的不同，**可以解决 http2 TCP 连接阻塞的问题。**(给指定地址发送http请求，如果该地址是无法访问的，那么http会在一段时间内都在请求该地址，造成程序的堵塞)

HTTP协议是应用层协议，都是建立在传输层之上。我们也都知道传输层上面不只有TCP协议，还有另外一个强大的协议UDP协议，2.0和1.0都是基于TCP的，因此都会有TCP带来的硬伤以及局限性。而HTTP3.0则是建立在UDP的基础上。所以其与HTTP2.0之间有质的不同

HTTP3.0特性如下
- 连接迁移
- 无队头阻塞
- 自定义的拥塞控制
- 前头安全和前向纠错
> 建议大家详细看看这篇文章[Http2.0 的一些思考以及 Http3.0 的优势](https://blog.csdn.net/m0_60360320/article/details/119812431)

## HTTPS

http协议通常承载与TCP协议之上,在HTTP和TCP之间添加一个安全协议层(ssl或者tsl)这就是HTTPS

SSL/TLS实际位于传输层与应用层之间。

### 作用
1. 对数据加密，并建立一个信息安全通道，来保证传输过程中数据安全
2. 对网站服务器身份认证

### http/https区别
1. https是加密传输，http是明文传输
2. http需要用到ssl整数 http不用
3. https比http更安全，对搜索引擎更友好 利于SEO
4. https标准端口443， HTTP标准端口80
5. https基于传输层 http基于应用层

### https加密过程
对称加密和非对阵加密结合方式
1. 浏览器使用HTTPS的url访问服务器建立SSL连接
2. 服务器收到SSL连接，发送非对称加密的公钥A返回给浏览器
3. 浏览器生成随机数，作为对称加密的密钥B
4. 浏览器使用公钥A对自己生成的密钥B进行加密得到密钥C
5. 浏览器将密钥C发送给服务器
6. 服务器用私钥D对接收的密钥c进行解密，得到对称加密密钥B
7. 浏览器和服务器之间可以用密钥B作为对称加密的密钥通信



[彻底搞定https的加密原理](https://zhuanlan.zhihu.com/p/43789231)

[https请求流程(证书的签名及验证过程)](/front-end/JavaScript/network-https.html)

## 其他
+ [Get和Post的区别](https://mp.weixin.qq.com/s?__biz=MzI3NzIzMzg3Mw==&mid=100000054&idx=1&sn=71f6c214f3833d9ca20b9f7dcd9d33e4#rd)

  - <span style="color:blue">GET回退无害化 POST会再次提交</span>
  - <span style="color:blue">Get产生URL地址收藏 Post不可以</span>
  - <span style="color:blue"> GET请求会被浏览器主动缓存</span>
  - <span style="color:blue">GET请求需要URL编码</span>
  - <span style="color:blue">Get请求长度有限制</span>
  - <span style="color:blue">Get参数通过URL传递 Post放在Request Body中</span>
  - <span style="color:blue">Get产生一个TCP数据包，POST产生两个TCP数据包</span>

  <span style="color: red">对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；</span>

  <span style="color: red">而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。</span>



### Restful风格
- 每一个URI代表一中资源 http://kaikeba.com/coures
- 客户端和服务器之间，传递这种自愿的某种表现层
- 表现层状态转化 URL设计 动宾结构
	- 动词
        - GET 读取
        - Post 新建
        - PUT 更新
        - DELETE 删除
    - 宾语
        - 名词 
        	- GET /users --- 推荐
            - GET /getUsers --- 不推荐
        - 复数
            - GET /users /users/1 ---推荐
            - GET /user /user/1 ---不推荐
        - 避免多级
            - GET /authors/12?categories=2
            - GET /authors/12/categories/2
       
- 状态码
	- 1xx 相关信息
    - 2xx 操作成功
    - 3xx 重定向
    - 4xx 客户端错误
    - 5xx 服务器错误


### http/https互相
http可以加载https的请求，https不可以加载http的请求

https的页面页中为什么不能发起http请求，有人也行会觉得是同源策略的问题，同源策略的定义是这样的：1. 协议相同 2. 域名相同 3.端口相同，尽管https访问http确实不符合同源策略中的协议相同，但反过来http页面中可以使用https请求。为什么又可以了，其实这不是同源策略的问题，而是跟混合内容的问题。

:::tip
什么是混合内容
当用户访问使用HTTPS的页面时，他们与web服务器之间的连接是使用SSL加密的，是安全的，从而保护连接不会受到攻击。如果HTTPS页面包括由普通明文HTTP连接加密的内容，那么连接只是被部分加密：非加密的内容可以被入侵，并且可以被中间人攻击者修改，因此连接不再受到保护。当一个网页出现这种情况时，它被称为混合内容页面。

混合内容又分为主动混合内容和被动混合内容。

被动混合内容是指不与页面其余部分进行交互的内容，包括图像、视频和音频内容 ，以及无法与页面其余部分进行交互的其他资源。
主动混合内容指的是能与页面交互的内容，包括浏览器可下载和执行的脚本、样式表、iframe、flash 资源及其他代码。

:::

**突破限制**
但有时候就是想在https中发起http请求，碰到这情况会怎么办了？其实可以借助被动混合内容的加载方便来突破这一层限制，使用加载图片的方式来发起请求，如下所示：
```
const img = new Image();
img.src = 'http的请求地址'
```

[HTTP协议经典面试题整理及答案详解](https://zhuanlan.zhihu.com/p/131274506?utm_source=wechat_timeline&utm_medium=social&utm_oi=769561548753477632)

[TCP连接、Http连接与Socket连接的区别](https://blog.csdn.net/mccand1234/article/details/91346202)

[http --- > HTTPS是在安全的传输层上发送的HTTP](https://blog.csdn.net/piano9425/article/details/93711175)