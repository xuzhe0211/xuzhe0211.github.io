---
autoGroup-7: 浏览器
title: HTML5 Web Workers
---

web worker是运行在后台的JavaScript,不会影响页面性能

## 什么是Web Worker

当在HTML页面中执行脚本时，页面的状态是不可响应的,直到脚本完成。

web workder是运行在后台的JavaScript,独立于其他脚本，不会影响页面性能。

您可以继续做任何愿意做的事情:点击、选取内容等等，而此时web worker在后台运行。

**浏览器支持**

Internet Explorer10，Firefox， chrome safari和Opera都支持

## HTML Web Worker实例

```
//worker.js文件代码
var i = 0;
function timedCount() {
    i = i + 1;
    postMessage(i);
    setTimeout(() => timedCount(), 5000);
}
timedCount();

// index.html
function startWorker() {
    if (typeof Worker !== 'unndefined') {
        w = new Worker('./work.js');
        w.onmessage = function(event) {
            console.log(event);
            document.getElementById('result').innerHTML = `${event.data}`;
        }
    } else {
        document.getElementById('result').innerHTML = '抱歉，你的浏览器不支持 web Workers';
    }
}
function stopWorker() {
	w.terminate();
    w.undefined;
}
window.onload = function() {
    startWorker()
}
```

**Web Workers 和DOM**

由于web worker位于外部文件中，他们无法访问下列Javascript对象
1. window对象
2. document对象
3. parent对象

## MessageChannel通道

ChannelMessaging API的MessageChannel接口允许我们创建一个新的消息通道，并通过它的两个MessagePort属性发送数据

### 属性

- MessageChannel.port1-只读，返回channel的port1
- MessageChannel.port2-只读，返回channel的port2

### 构造函数

MessageChannel()-返回一个带有两个MessagePort属性的MessageChannel新对象


### 初识MessageChannel对象

通过构造函数MessageChannel()可以创建一个消息通道，实例化的对象会继承两个属性：port1和port2
```
let ms = new MessageChannel();
//port1和port2都是MessagePort对象，在这里是只读的，无法对其进行字面量赋值
ms.port1 = {name: 'wise'}
//不过可以给port添加属性
ms.port1.name = 'wise'
```
MessagePort对象具有onmessage和onmessageerror两个属性

这是两个回调方法，使用MessagePort.postMessage方法发送消息的时候，就回去触发另一个端口onmessage

消息通道就想一条左右贯通的管道，左右两个端口就是port1和port2

这个端口可以相互发送消息，port1发送的消息可以在port2接收到哦，反之亦然。

<img :src="$withBase('/images/1059788-20190308164731842-1262102501.png')" alt="消息通道">

### 多个Web Worker之间通信

MessageChannel可以结合Web Worker实现多线程通信
```
//mian.js
let worker1 = new Worker('./worker1.js');
let worker2 = new Worker('./worker2.js');

//把port1分配给worker1
worker1.postMessage('main', [ms.port1]);
//把port2分配给worker2
worker2.postMessage('main', [ms.port2]);
worker2.onmessage = function(event) {
	console.log(event.data);
}
```
这里的postMessage()可以接收两个参数message、transferList

- | -
--- | ---
message | 消息内容，可以是任意基础数据类型
transferList | 由被传输对象组成的数组，这些对象的所有权会转移给调用postMessage的对象

所以上面的代码，就是把消息通道的port1分配给了worker1，把port2分配给workerr2

也就是用消息通道，将两个worker给连接起来
```
//worker1.js
onmessage = function(e) {
	if(e.date === 'main') {
    	const port = e.ports[0];
        port.postMessage('Hi!I am worker1')
    }
}
//worker2.js
onmessage = function(e) {
	if(e.data === 'main') {
    	const port = e.ports[0];
        port.onmessage = function(e) {
        	postMessage(e.data)
        }
    }
}
```
代码运行的时候，worker1中通过port1发送的消息，然后worker2就能从port2中接收到消息

### 示例

在以下代码块中，您可以看到使用MessageChannel构造函数实例化了一个channel对象。当iframe加载完毕，我们使用MessagePort.postMessage方法把一条消息和MessageChannel.port2传递给iframe。handleMessage处理程序将会从iframe中(使用MessagePort.onmessage监听事件)接收到消息，将数据放入innerHTML中。

```
var channel = new MessageChannel();
var para = document.querySelector('p');

var ifr = document.queryselector('iframe');
var otherWindow = ifr.contentWindow;

ifr.addEventListener('load', iframeLoaded, false);

function iframeLoaded(){
	otherWindow.postMesaage('Hello from the main page!', '*', [channel.port2]);
}
channel.port1.onmessage = handleMessage;

function handleMessage(e) {
	para.innerHTML = e.data;
}
```

### 深拷贝

大部分需要深拷贝的场景，都可以使用下面代码
```
JSON.parse(JSON.stringify(object));
```
但是这种办法会忽略undefined、function、symbol和循环引用对象

而通过postMessage()方法传输的message参数是深拷贝的。

```
function deepClone(obj) {
	return new Promise(resolve => {
    	const { port1, port2 } = new MessageChannel();
        port2.onmessage = e => resolve(e.data);
        port1.postMessage(obj)
    })
}
//定义一个包含undefined的对象
let obj = {
	a: 'wise',
    b: undefined,
    c: {
    	d: 'wrong'
    }
}
//循环引用
obj.c.e = obj.c;
async function test() {
	const clone = await deepClone(obj);
    console.log(clone)
}
```
这个深拷贝只能解决undefined和循环引用对象的问题，对于Symbol和function依然束手无策


## window.postMessage

### MDN window.postMessage

[mdn地址](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)

window.postMessage()方法可以安全的实现跨源通信。通常，对于两个不同页面的脚本，只有当执行他们的页面位于具有相同的协议(https)，端口号(443为)以及主机(两个页面的模数Document.domain设置为相同值)时，这两个脚本才能通信。window.postMessage()方法提供了一种受控机制来规避此限制，只要很正确使用，这种方法就很安全

从广义上讲，一个窗口可以获得对另一个窗口的引用(比如targetWindow = window.openner),然后在窗口上调用targetWindow.postMessage()方法分发一个Message消息。接收消息的窗口可以根据需要自由处理此事件。传递给window.postMessage()的参数(比如message)将通过消息事件对象暴露给接收消息的窗口。

##### 语法

```
otherWindos.postMessage(message, targetOrigin, [transfer]);
```
**OtherWindow**

其他窗口的一个引用，比如iframe的contentWindow属性、执行window.open返回的窗口对象，或者是命名过或数值索引的window.frames;

**message**

将要发送哦到其他window的数据，它将会被结构化克隆算法序列化。这意味着你可以不受什么限制的将数据对象安全的传送给目标窗口而无需自己序列化。

**targetOrigin**

通过窗口的origin属性来指定那些窗口能接收到消息事件，其值可以是字符串"*" (表示无限制)或一个URI。在发送消息的时候，如果目标窗口的协议、主机地址或端口这三者的任意一项不匹配targetOrigin提供的值，那么消息就不会发送；只有三者匹配，消息才会被发送。这个机制用来控制消息可以发送到哪些窗口；例如：当用postMessage传送密码时，这个参数就显得尤为重要，必须保证它的值与这条包含密码的信息的预期接受者的origin属性完全一致，来防止密码被恶意的地方法截获。如果你明确的知道消息应该发送到哪个窗口，那么请始终提供一个有明确值的targetOrigin，而不是"*"。不提供确切的目标将导致数据泄露到任何对数据感兴趣的恶意站点

**transfer**

可选，是一串和message同时传递的Transferable对象。这些对象的所有权将被转移给消息的接收方，而发送你一方将不再抱有所有权。

##### The dispatched event

执行如下代码，其他window可以监听分发的message
```
window.addEventListener('message', receiveMessage, false);

function receiveMessage(event) {
	//var origin = event.origin || event.originalEvent.origin
    var origin = event.origin;
    if(origin !== 'http://example.org:8080') return;
}
```

message的属性有

**data**

从其他window中传递过来的对象。

**origin**
调用postMessage时消息发送方窗口的origin.这个字符串由协议、域名、端口号拼接而成。例如：'https://example.org'(隐含端口443)、'http://example.net(隐含端口80)'、'http://example.com:8080'。请注意，这个origin不能保证是该窗口的当前或未来origin，因为postMessage被调用后可能被导航到不同的位置

**source**

对发送消息的窗口对象的引用；您可以使用此来在具有不同origin的两个川南关口之间建立双向通信


### 基础夯实---postMessage

平时工作中可能会碰到类似的需求:在当前页面打开一个新的窗口，当这个新窗口的页面中数据发生变化时，需要对上一个窗口的页面状态进行一些调整

上面的这个需求与事件监听非常类似，都是触发了某个事件时执行某个动作。但是一般这种监听(或者订阅、广播)都只能在一个页面内，并不能够跨窗口

那么不通过监听，该如何实现两个窗口之间的通信呢？

##### postMessage方法

在html5，window对象上有一个方法叫做postMessage,和它的名字一样，这个方法就是用来发送消息的，但是它只能在两个窗口之间发送消息

```
win.postMessage(data, origin);
//win这个参数需要接受消息的window对象
//当我们通过window.open()打开一个新窗口时，会返回一个新窗口的window对象，通过这个新窗口的window对象，就可以向新窗口发送消息
//如果页面中有frame时，也可以通过这个frame对象发送消息

//data为我们想要发送的数据,理论上data可以是任何可以被复制的数据类型，但是由于部分浏览器只支持传输String类型，所以传输的数据最好是通过JSON.stringify()序列化后在传输

//origin为字符串，为目标窗口的源，由协议+ip/域名+端口组成
//如果想要传递给任意窗口，可以将这个参数设置为*，为了安全起见，不建议设置为*
//如果目标窗口与当前窗口同源，则设置为'/'
```
知道了如何使用postMessage方法，那么又该如何实现数据的接受呢？
```
window.addEventListener('message', function(e) {....})

//第一个参数为这个事件监听器的类型,'message'表示会监听当前窗口接收到的消息
//第二个参数为接收到消息后的回调函数，在回调函数中，我们可以对发送消息的源进行一些验证，从而保证安全性
//回调函数参数e 上有很多属性，我们将其打印出来，其中origin表示发送消息窗口的源；source属性表示发送消息的窗口，通过e.source==window.opener可以判断发送消息的窗口与当前页面的窗口是否为同一个；data属性表述传递过来的数据
```
消息的发送与接收并不难，那么下面就来实现以下文章开篇提出来需求

superWindow.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>super window</title>
</head>
<body>

<h3>super window</h3>
<p id="message"></p>

<a href="javascript:;" id="post">打开新窗口并监听消息</a>

<script>

    document.getElementById('post').onclick = function () {
        // 打开一个新窗口
        var subWindow = window.open('subWindow.html')
        // 监听 message 事件
        window.addEventListener('message', function (e) {
            console.log(e)
            // 校验发送消息的窗口的源
            if (e.origin != 'http://192.168.1.101:8081') return
            document.getElementById('message').innerText = e.data
        } )
    }

</script>
</body>
</html>
```
subWindow.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>sub window</title>
</head>
<body>

<h3>sub window</h3>

<script>

    // 通过 window.opener 获取到打开当前窗口的窗口，即 super window
    // 由于当前是同源窗口传递消息，所以第二个参数设为 /
    window.opener.postMessage('super window 接收到了一条消息', '/')
    
</script>
</body>
</html>
```
**跨域**

postMessage还有一个重要的特性就是跨域，将第二个参数设置为其他的源，就可以实现两个不同域网站的通信

## 资料

[另一参考文档](https://www.webhek.com/post/window-postmessage-api.html)


[web messaging与Woker分类：漫谈postMessage跨线程跨页面通信](https://blog.csdn.net/u012244479/article/details/118441923)

[webwork性能分析](/front-end/Log/performance-demo.html)
