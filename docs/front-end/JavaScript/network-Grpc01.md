---
autoGroup-8: 网络
title: gRPC与http
---
## 为什么选择GRPC
- 跨语言支持
- protobuf IDL描述支持
- google支持，http2背后的社区
- 流式请求支持
- 社区和工具链 

简单来说服务A调用服务B，不需要显式的发起http或者tcp的请求，只需要调用本地函数，本地函数再通过http或tcp发起调用，然后数据返回。对于服务A来说，它并不关心函数内部是如何实现的网络调用，因此实现一个rpc框架需要：


## 简介
gRPC是一个高性能、开源和通过的RPC框架，面向移动和HTTP/2设计。目前提供C、java和GO语言版本，分别是grpc, grpc-java, grpc-go. 其中 C 版本支持 C, C++, Node.js, Python, Ruby, Objective-C, PHP 和 C# 支持.

gRPC基于HTTP/2标准设计，带来诸如双向流、流控、头部压缩、单TCP链接上的多路复用请求等特性。这些特性使得其在移动设备商表现更好，更省电和节省空间占用

<span style="color: red">所谓RPC(remote procedure call 远程过程调用)框架实际是提供了一套机制，使得应用程序之间可以进行通信，而且也遵从server/client模型。使用的时候客户端调用server端提供的接口就像是调用本地的函数一样</span>

gRPC = google开发的RPC协议，优点
- <span style="color: blue">接口有更严格的约束</span>
- <span style="color: blue">更安全</span>
- <span style="color: blue">性能更好</span>

这3个优点来源于gRPC使用的protobuf(一种数据传输格式的和规范)

## gRPC的4中通讯方式
1. <span style="color: blue">简单gRPC调用:客户端通过stub发起请求，等待服务端callback()返回结果，就像本地调用一样</span>
2. <span style="color: blue">服务端流式调用:客户端发起一次请求，服务端不是返回结果，而是将一组结果通过流call()返回</span>
3. <span style="color: blue">客户端流式调用:客户端发起一组请求write(),on()，服务端等到客户端所有请求发送完毕，接收到客户端的end()调用，此时服务端callback()发送一次结果给客户端</span>
4. <span style="color: blue">客户端服务端双向流:客户端和服务端双向流互不干涉，可各种按照自己的顺序消费处理，比如服务端可以选择每次接受客户端一个请求就write(),on()返回一个结果，也可以选择等客户端所有请求发送完毕收到客户端的end()调用再把所有的返回结果一次性call()返回给客户端</span>

## gRPC在node.js中实现
### 0. node.js环境配置
安装
```js
npm i @grpc/grpc-js, @grpc/proto-loader, google-protobuf, grpc-tools, async
// 或者以下package.json文件直接安装npm install
```
这里需要注意安装的是@grpc/grpc-js而不是grpc，如果安装的是grpc

只需将后续文件中的var grpc = require('@grpc/grpc.js')，改为var grpc = require('grpc');同时改变server.bindAsync()为server.bind()即可
```js
{
  "name": "grpc-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@grpc/grpc-js": "^1.2.12",
    "@grpc/proto-loader": "^0.6.0",
    "async": "^3.2.0",
    "google-protobuf": "*",
    "grpc-tools": "^1.11.1",
    "lodash": "^4.17.21"
  }
}
```
### 1. 定义protobuf的文件.proto
根目录创建proto文件夹并创建helloworld.proto文件
```js
syntax = "proto3";

// option java_package = "ex.grpc";
// option objc_class_prefix = "HSW"

package helloworld;

service Greeter {
  // 简单gRPC调用
  rpc sayHelloSimple (HelloRequest) returns (HelloReply) {}

  // 服务端流式调用
  rpc sayHelloServer (HelloRequest) returns (stream HelloReply) {}

  // 客户端流式调用
  rpc sayHelloClient (stream HelloRequest) returns (HelloReply) {}

  // 客户端服务端双向流
  rpc sayHelloDouble (stream HelloRequest) returns (stream HelloReply) {}
}

message HelloRequest {
  string name = 1;
}

message HelloReply {
  string message = 1;
}
```
### 2. 简单gRPC调用
```js
// 服务端
var PROTO_PATH = __dirname + '/protos/helloword.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
)
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

// 简单gRPC调用
function sayHelloSimple(call, callback) {
    callback(null, {message: 'Hello' + call.request.name});
}

async function main() {
    var server = new grpc.Server();
    server.addService(hello_proto.Greeter.service, { sayHelloSimple: sayHelloSimple });
    await  new Promise((resolve, reject) => {
        server.bindAsync(
            `0.0.0.0:50051`,
            grpc.ServerCredentials.createInsecure(),
            (err, result) => (err ? reject(err) : resolve(result))
        )
    })

    server.start();
    // 显示是否启动成功
    console.log(server.started)
}
main()


// 客户端
var PROTO_PATH = __dirname + '/protos/helloworld.proto';

var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function main() {
    var client = new hello_proto.Greeter('0.0.0.0:50051', grpc.credentials.createInsecure());
    client.sayHelloSimple({name: 'World, Eden!!!'}, function(err, response) {
        console.log('Greeting:', response.message);
    });
}
main()
```
#### 启动结果
依次启动服务端和客户端，分别在terminal中出现下面的内容，即简单gRPC通信完成
```js
// 服务端
>>> node server.js
true

// 客户端
>>> node client.js
Greeting: Hello World, Eden!!!
```

### 3. 流式gRPC调用
另外三种方式均为流式，以双向流式通信为例进行介绍，在proto中的方法为 
```js
rpc sayHelloDouble (stream HelloRequest) returns (stream HelloReply) {}
```

#### 服务端
服务端新增客户端服务端双向流方法，同时注册多个service
```js
var PROTO_PATH = __dirname + '/protos/helloworld.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

// 简单gRPC调用
function sayHelloSimple(call, callback) {
    callback(null, { message: 'hello' + call.request.name })
}
// 服务端流式调用
function sayHelloServer(call, callback) {}

// 客户端流式调用
function sayHelloClient(call, callback) {}

// 客户端服务端双流向
function sayHelloDouble(call, callback) {
  callback(null, {message: 'Hello ' + call.request.name});
}

async function main() {
  var server = new grpc.Server();
  server.addService(hello_proto.Greeter.service, {sayHelloSimple: sayHelloSimple, sayHelloServer: sayHelloServer, sayHelloClient: sayHelloClient, sayHelloDouble: sayHelloDouble});
  await new Promise((resolve, reject) => {
    server.bindAsync(
        `0.0.0.0:50051`,
        grpc.ServerCredentials.createInsecure(),
        (err, result) => (err ? reject(err) : resolve(result))
    );
  });
  
  server.start();
  // 显示是否启动成功
  console.log(server.started);
}

main();
```
#### 客户端
```js
var PROTO_PATH = __dirname + '/protos/helloworld.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function main() {
  var client = new hello_proto.Greeter('0.0.0.0:50051', grpc.credentials.createInsecure());
  client.sayHelloSimple({ name: 'World, Eden!!!' }, function (err, response) {
    console.log('Greeting:', response.message);
  });

  let call = client.sayHelloDouble();

  call.on('data', function (response) {
    console.log('客户端receive:', response);
  });

  call.on('end', function () {
    console.log('服务器发送end,客户端关闭');
  });

  call.write({ name: 'Eden1' });
  call.write({ name: 'Eden2' });
  call.write({ name: 'Eden3' });

  call.end();
}

main();
```

#### 启动结果
双向流通信中同时包括简单gRPC通信方法，所以同事包含两个结果
```js
// 服务端
>>> node server.js
true
服务端receive: { name: 'Eden1' }
服务端receive: { name: 'Eden2' }
服务端receive: { name: 'Eden3' }
服务端收到end,给客户端发送end

// 客户端
>>> node client.js
Greeting: Hello World, Eden!!!
客户端receive: { message: 'Hello Eden1' }
客户端receive: { message: 'Hello Eden2' }
客户端receive: { message: 'Hello Eden3' }
服务器发送end,客户端关闭
```
其他gRPC实战项目

[gRPC实战–如何在NodeJS中有效使用gRPC流](https://segmentfault.com/a/1190000022298596)

该链接主要包括客户端流通信，和服务端流通信，为通讯方式的第2，3种，刚好与本文的第1，4种互补，读者可自行参阅。




## 资料
[gRPC的4种通信方式在node中实现](https://blog.csdn.net/thezapple/article/details/115520531)

[GRPC简介](https://zhuanlan.zhihu.com/p/411315625)

[grpc与http](https://blog.csdn.net/weixin_41167925/article/details/110872472)

[grpc官方中文文档](http://doc.oschina.net/grpc?t=58008%20https://www.jianshu.com/p/657fbf347934)

[为何微服务都开始用grpc](https://blog.csdn.net/weixin_52622200/article/details/118110533)