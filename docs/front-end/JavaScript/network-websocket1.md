---
autoGroup-8: 网络
title: webSocket前端开发实现+心跳检测机制
---
## 前言
它是一种网络协议,是HTML5开始提供的一种在单个TCP连接上进行全双工通讯的协议。

## 为什么要使用webSocket以及心跳检测机制
个人理解：

一般情况下前后端通信会采用HTTP网络协议，它是一种无状态、无连接的、单向的应用层协议，采用请求/响应模式。即通信请求只能由客户端发起，服务端对请求做出应答处理。

遇到实时的场景，我们就希望建立一次连接，就可以一直保持连接状态，这相比与轮训方式(即定时发HTTP请求)的不停建立连接显然效率要大大提高。

在使用webSocket的过程中，<span style="color: red">如果遇到网络断开，服务端并没有触发onclose事件，就会出现此状况:服务端会继续想客户端发送对于的请求，并且这些数据会丢失</span>.

<span style="color: blue">因此就需要一种机制来检测客户端和服务端是否处于正常的连接状态，因此就有了webSocket的心跳检测机制，即如果有心跳则说客户端和服务端的连接还存在，无心跳相应则说明连接已经断开，需要采用重新连接等措施</span>

## 实现
```js
// webSocket连接
if('WebSocket' in window) {
    // 心跳重连机制
    var lockReconnect = false; // 避免重复链接
    var wsUrl = 'ws://' + localIp + ':' + localPort + '/subscribeWebSocket/';
    var ws; // websocket对象
    var tt; // 时间间隔
    // 创建webSocket链接
    $scope.createWebSocket = function(wsUrl) {
        try {
            ws = new WebSocket(wsUrl);
            $scope.webSocketInit(); // 初始化websocket连接函数
        } catch(e) {
            console.log('catch');
            $scope.webSocketReconnect(wsUrl); // 重连函数
        }
    };
    // 初始化方法
    $scope.webSocketInit = function() {
        ws.onclose = function() { // 连接关闭函数
            console.log('连接已关闭...');
            $scope.webSocketReconnect(wsUrl); // 如果连接关闭则重连
        }
        ws.onerror = function() {
            console.log('连接错误...');
            $scope.webSocketReconnect(wsUrl); // 如果错误则重连
        }
        ws.open = function() { // 建立链接
            var message1 = {
                'type': 'sub',
                'service': '业务1'
            }
            ws.send(JSON.stringify(message1)); // websocket业务订阅--可以有多个业务
            var message2 = {
                'type': 'sub',
                'service': '业务2'
            }
            ws.send(JSON.stringify(message2));
            // 心跳检测启动
            $scope.heardCheck.start(); // 订阅业务发送之后启动心跳检测机制
        }
        // 业务订阅成功后接受服务端推送消息
        ws.onmessage = function(evt) {
            console.log('接收消息')；
            var DATA = JSON.parse(evt.data);
            if(DATA.service === '业务1') {
                console.log('接收业务1的数据')；
                // 接受业务1的数据，并进行相关逻辑处理
            }
            if(DATA.service === '业务2') {
                console.log('接收业务2的数据');
                // 接受业务2的数据，并进行相关逻辑处理
            }
            // 接受一次后台推送的消息，即进行一次心跳检测重置
            $scope.heardCheck.reset();
        }
    }
    $scope.webSocketReconnect=function(url){
        console.log("socket 连接断开，正在尝试重新建立连接");
        if (lockReconnect){return;}
        lockReconnect=true;
        //没连接上会一直重连，设置延迟，避免请求过多
        tt && clearTimeout(tt);
        tt = setTimeout(function () {
            $scope.createWebSocket(url);
        },4000)
    };
    //心跳检测
    $scope.heardCheck = {
        timeout: 30000, // 30秒
        timeoutObj: null, 
        reset: function() { // 接收成功一次推送，就将心跳检测的倒计时重置为30秒
            clearTimeout(this.timeoutObj); // 重置倒计时
            this.start();
        },
        start: function() { // 启动心跳检测机制，设置倒计时30秒一次
            this.timeoutObj = setTimeout(function() {
                var message = {
                    'type': 'HEART_BEAT',
                    'service':'业务'
                }
                ws.send(JSON.stringify(message)); // 启动心跳
            }, this.timeout)
        }
        //onopen连接上，就开始start及时，如果在定时时间范围内，onmessage获取到了服务端消息，就重置reset倒计时，距离上次从后端获取消息30秒后，执行心跳检测，看是不是断了。
    }
    $scope.createWebSocket(wsUrl); // 开始创建websocket连接
} else {
    // 浏览器不支持WebSocket
    alert('你的浏览器不支持websocket!!')
}
```

## 资料
[webSocket前端开发实现+心跳检测机制](https://blog.csdn.net/mayuan2011/article/details/85785383)