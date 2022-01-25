---
title: App Bridge原理
---

## 原理

> Android中的JSBridge是H5与Native通信桥梁,其作用是实现H5与Native间的双向通信。

现H5与Native的双向通信，解决如下四个问题接口
- Java如何调用JavaScript
- JavaScrip如何调用Java
- 方法参数以及回调如何处理
- 通信的数据格式是怎么样的

#### 1.Java如何调用JavaScript
在Android中，Java和JavaScript的一切交互都是依托于WebView的，可通过如下方法来完成，其中Function()即为Javascript代码，来实现相应的具体H5功能
```
WebView.loadUrl('Javascript:function()')
```
#### 2、JavaScript如何调用Java
要实现在JavaScript中调用Java，就需要在JavaScript中有触发Java方法的对象和方法。在JavaScript中，当调用window对象的prompt方法时，会触发Java中的WebChromeClient对象的onJsPrompt方法，因此可以利用这个机制来实现js调用native的代码

#### 3、方法参数以及回调处理
任何IPC通信都涉及到参数序列化的问题，同理，Java与JavaScript之间只能传递基础类型（包括基本类型和字符串），不包括其他对象或者函数。所以可以采用json格式来传递数据。JavaScript与Java相互调用不能直接获取返回值，只能通过回调的方式来获取返回结果。

#### 4、通信的数据格式
Java与JavaScript通信需要遵循一定的通信协议，可以仿照HTTPS协议来将此协议定义为jsbridge协议：
```
jsbridge://className:port/methodName?jsonObj
```
当js调用native功能，应当制定native层要完成某个功能调用的类名(className)和方法名(methodName)，以及传递过来的参数(jsonObj)。port值是指当native需要将操作结果返回给js时，在js中定义的一个callback,并将这个callback存储在指定的位置上，这个port就定义了callback的存储位置。
![图片](./images/2327406-7349581b80fc1df1.png)

#### 总结
JSBridge的基本原理为
H5 -> 通过某种方式触发一个url -> Native捕获到url,进行分析 -> 原生做处理 -> Native调用H5的JSBridge对象传递回调。<br/>
如下图

<img :src="$withBase('/images/2327406-a45afb11e62699dc.webp')" alt="原理图">

参考地址：[https://www.jianshu.com/p/2ec3f06d6087?from=singlemessage](https://www.jianshu.com/p/2ec3f06d6087?from=singlemessage)

## WebView
WebView是一种嵌入式浏览器，原生应用可以用它来展示网络内容<br/>
第一：原生应用(app)<br/>
第二：嵌入式浏览器<br/>

开发人员可以使用各种受支持的方式来覆盖默认的安全行为，并让Web代码和原生应用代码相互通信。这种沟通通常称为bridge。Bridge可视化为Native Bridge和JavaScript Bridge的一部分；详细了解这些bridge内容超出本文范围，但要点如下：为Web编写的相同Javascript不仅可以在WebView中运行，还可以调用原生API并帮助苏你应用更升入得集成炫酷的系统级功能，如传感器，存储和，日历/联系人等；

[jsbridge总结](https://www.jianshu.com/p/be491bfbca0d)