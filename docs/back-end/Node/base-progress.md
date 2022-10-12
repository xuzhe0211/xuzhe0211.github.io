---
autoGroup-1: 底层相关
title: Nodejs进程间通信
---


## 场景

Node运行在单线程下，但这并不意味着无法利用多核/多机下多进程的优势

## 创建进程

通信方式与进程产生方式有关，而Node有4种创建的方式:spawn(),exec(), execFile()和fork()

### spawn

```js
const { spawn } = require('child_process');
const child = spawn('pwd');
//带参数的形式
//const child = spawn('find', ['.', '-type', 'f']);
```
spawn()返回ChildProcess实例，ChildProcess同样基于事件机制(EventEmitter API),提供了一些事件：
- exit:子进程退出时触发，可以得知进程退出状态(code和signal)
- disconnect:父进程调用child.disconnect()触发
- error:子进程创建失败，或被kill时触发
- close:子进程的stdio流(标准输入输出流)关闭时触发
- message:子进程通过process.send()发送消息时触发，父子进程之间通过这种内置的消息机制通信

可以通过child.stdin, child.stdout和child.stderr访问子进程的stdio流，这些流被关闭时，子进程会触发close事件

P.S.close和exit的区别主要体现在多进程共享同一stdio流的场景，某个进程退出了并不意味着stdio流被关闭了

在子进程中，stdout/stderr具有Readable特性，而stdin具有Writable特性，与主进程情况正好相反
```js
const spawn = require('child_process').spawn;
const child = spawn('pwd')
// child.stdout.on('data', data => {
//     console.log(data.toString())
// })

child.stout.on('data', (data) => {
	console.log(`child stdout: \n${data}`);
})
child.stderr.on('data', (data) => {
	console.error(`child stderr:\n${data}`)
})
```
利用进程stdio流的管道特性，就可以完成更复杂的事情，例如：
```js
const { spawn } = require('child_process');
const find = spawn('find', ['.', '-type', 'f']);
const wc = spawn('wc', ['-1']);
find.stdout.pipe(wc.stdin);
wc.stdout.on('data', (data) => {
	console.log(`Number of files ${data}`);
})
```
作用等价于find . -type f | wc -1 ，递归统计当前目录文件数量

#### IPC选项

另外，通过spawn()方法的stdio选项可以建立IPC机制：
```js
const { spawn } = require('child_process');
const child = spawn('node', ['./ipc-child.js'], {stdio: [null, null, null, 'ipc']});
child.on('message', (m) => {
	console.log(m);
})
child.send('Here Here');
process.on('message', (m) => {
	process.send(`< ${m}`);
    process.send('> 不要回答x3')
})
```

### exec

<span style="color: red">spawn()方法默认不会创建shell去执行传入的命令(所以性能上稍微好一点)，而exec()方法会创建一个shell。另外,exec()不是基于stream的，而是把传入命令的执行结果暂存到buffer中，在整个传递给回调函数。</span>

exec()方法的特点就是完全支持shell语法，可以直接传入任意shell脚本
```js
const { exec } = require('child_process');
exec('find . -type f | wc -l',(err, stdout, stderr) => {
	if (err) {
    	console.error(`exec error: ${err}`);
        return;
    }
    console.log(`Number of files ${stdout}`);
})
```
但exec()方法也因此存在命令注入的安全风险，在含有用户输入等动态内容的场景要特别注意。所以，exec()方法的适用场景是：希望直接使用shell语法，并且预期输出数据量不大(不存在内存压力)

那么，有没有即支持shell语法，还具有stream IO优势的方式？

有！两全其美的方式如下

```js
const { spawn } = require('child_process');
const child = spawn('find . -type f | wc -l', {
	shell: true
});
child.stdout.pipe(process.stdout);
```
开启spawn()的shell选项，并通过pipe()方法把子进程的标准输出简单地接到当前进程的标准输入上，以便看到命令执行结果。实际上还有更容易的方式
```js
const { spawn } = require('child_process');
process.stdout.on('data', (data) => {
	console.log(data);
})
const child = spawn('find . -type f | wc -l', {
	shell: true,
    stdio: 'inherit'
})
```
stdio:'inherit'允许子进程继承当前进程的标准输入输出(共享stdin, stdout和stderr).所以上例能够通过监听当前进程process.stdout的data事件拿到子进程的输出结果

另外，除了stdio和shell选项，spawn()还支持一些其他选项。如：
```js
const child = spawn('find . -type f | wc -l', {
	stdio：'inherit',
    shell: true,
    //修改环境变量，默认process.env
    env: { HOME: '/tmp/xxx' },
    //改变当前工作目录
    cwd: '/tmp', 
    //作为独立进程存在
    datached: true;
})

```

注意，env选项除了以环境变量形式向子进程传递数据外,还可以用来实现沙箱式的环境变量隔离，默认把process.env作为子进程的环境变量集，子进程与当前进程一样能够访问所有环境变量，如果像上例中指定自定义对象作为子进程的环境变量集，子进程就无法访问其他环境变量

所以，想要增/删环境变量的话，需要这样做
```js
var spawn_env = JSON.parse(JSON.stringify(process.env));
//remove those env vars
delete spawn_env.ATOM_SHELL_INTERNAL_RUN_AS_NODE;
delete spawn_env.ELECTRON_RUNN_AD_NODE;
var sp = spawn(command, [.], [cwd: cwd, env: spawn_env])
```
detached选项更有意思
```js
const { spawn } = require('child_process');
const child = spawn('node', ['stuff.js'], {
	detaached: true, 
    stdio: 'ignore'
})
child..unref();
```
以这种方式创建的独立进程行为取决有操作系统，windows上detached子进程将拥有自己的console窗口，而linux上该进程会创建新的process group(这个特性可以用来管理子进程族，实现类似于tree-kill特性)

unref方法用来断绝关系，这样父进程可以独立退出(不会导致子进程跟着退出)，但要注意这时子进程的stdio也应该独立于父进程，否则父进程退出后子进程仍会收到影响

### execFile

```js
const { execFile } = require('child_process');
const child = execFile('node', ['--version'], (err, stdout, stderr) => {
    if (error) {
        throw error;
    }
    console.log(stdout);
})
```
与exec()方法类似,但不通过shelll来执行(所以性能更好一些),所以要求传入可执行文件。window下某些文件无法直接执行，比如.bat和.cmd,这些文件就不能用execFile()来执行，只能借助exec()或开启了shell选项的spawn()

> 与exec()一样也不是基于stream，同样存在数据量风险

**xxxSync**

<mark>spawn, exec和execFile都有对应的同步阻塞版本，一直等到子进程退出</mark>

```js
const {
    spawnSync,
    execSync,
    execFileSync
} = require('child_process')
```
同步方法用来简化脚本任务，比如启动流程，其他时候应该避免使用这些方法

### fork
fork()是spawn()的变体，用来创建Node进程，最大的特点是父子进程自带通信机制(IPC管道)。

例如：
```js
var n = child_process.fork('./child.js');
n.on('message', function(n) {
    console.log('PARENT got message:' , m);
})
n.send({hello: 'world'})
// ./child.js
process.on('message', function(m) {
    console.log('CHILD go message', m);
})
process.send({ foo: 'bar'});
```
因为fork()自带通信机制的优势，尤其适合用来拆分耗时逻辑,例如：
```js
const http = require('http');
const longComputation = () => {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
        sum += i;
    };
    return sum;
}
const server = http.createServer();
server.on('request', (req, res) => {
    if (req.url === '/compute') {
    const sum = longComputation();
    return res.end(`Sum is ${sum}`);
  } else {
    res.end('Ok')
  }
})
server.listen(3000);
```
这样做的致命问题是一旦有人访问 /compute ，后续请求都无法及时处理，因为事件循环还被 longComputation 阻塞着，直到耗时计算结束才能恢复服务能力

为了避免耗时操作阻塞主进程的事件循环，可以把 longComputation() 拆分到子进程中：

```js
// compute.js
const longComputation = () => {
  let sum = 0;
  for (let i = 0; i < 1e9; i++) {
    sum += i;
  };
  return sum;
};
// 开关，收到消息才开始做
process.on('message', (msg) => {
  const sum = longComputation();
  process.send(sum);
});
```
主进程开启子进程执行 longComputation ：
```js
const http = require('http');
const { fork } = require('child_process');
const server = http.createServer();
server.on('request', (req, res) => {
  if (req.url === '/compute') {
    const compute = fork('compute.js');
    compute.send('start');
    compute.on('message', sum => {
      res.end(`Sum is ${sum}`);
    });
  } else {
    res.end('Ok')
  }
});
server.listen(3000);

```
主进程的事件循环不会再被耗时计算阻塞，但进程数量还需要进一步限制，否则资源被进程消耗殆尽时服务能力仍会受到影响

P.S.实际上， cluster 模块就是对多进程服务能力的封装， 思路与这个简单示例类似

## 通信方式
### 通过stdin/stdout传递json

> stdin/stdout annd a JSON payload

最直接的通信方式，拿到子进程的handle后，可以访问其stdio流，然后约定一种message格式开始愉快的通信

```js
const { spawn } = require('child_process');
child = spawn('node', ['./stdio-child.js']);
child.stdout.setEncoding('utf8');
// 父进程-发
child.stdin.write(JSON.stringify({
    type: 'handshake', 
    payload: '你好呀'
}))
// 父进程-收
child.stdout.on('data', function(chunk) {
    let data = chunk.toString();
    let message = JSON.parse(data);
    console.log(`${message.type} ${message.payload}`);
})
```
子进程与之类似

```js
// ./stdio-child.js
// 子进程-收
process.stdin.onn('data', (chunk) => {
    let data = chunk.toString();
    let message = JSON.parse(data);
    switch (message.type) {
        case 'handshake':
            // 子进程-发
            process.stdout.write(JSON.stringify({
                type: 'message',
                payload: message.payload + ' : hoho'
            }))
            break;
        default: 
            break;
    }
})

```
P.S.VS Code进程间通信就采用了这种方式 具体见 [access electron API from vscode extension](https://github.com/Microsoft/vscode/issues/3011#issuecomment-196305696)

明显的限制是需要拿到子进程的handle,两个完全独立的进程之间无法通过这种方式通信(比如跨应用，甚至跨机器的场景)。

P.S.关于stream及pipe的详细信息,请查看[node中的流](http://ju.outofmemory.cn/entry/344029)

### 原生IPC支持

如spawn()及fork()的例子，进程之间可以借助内置的IPC机制通信

父进程
    - process.on('message') 收
    - child.send() 发
子进程
    - process.on('message') 收
    - process.send() 发
限制同上，同样要有一方能够拿到另一方的handle才行

### sockes
借助网络来完成进程间通信，不仅能跨进程，还能跨机器

[node-ipc](https://www.npmjs.com/package/node-ipc)就是采用这种方案

```js
// server
const ipc = require('../../../node-ipc');
ipc.config.id = 'world';
ipc.config.entry = 1500;
ipc.config.maxConnections = 1;
ipc.serveNet(
    function() {
        ipc.server.on(
            'message',
            function(data, socket) {
                ipc.log('got a message: ', data);
                ipc.server.emit(
                    socket,
                    'message',
                    data + ' world!'
                );
            }
        );
        ipc.server.on(
            'socket.disconnected',
            function(data, socket) {
                console.log('DISconnected\n\n', arguments);
            }
        )
    }
);
ipc.server.on(
    'error',
    function(err) {
        ipc.log('Got an ERROR!', err);
    }
)
ipc.server.start();
// client
const ipc = require('node-ipc');
ipc.config.id ='hello';
ipc.config.retry= 1500;
ipc.connectToNet(
    'world',
    function(){
        ipc.of.world.on(
            'connect',
            function(){
                ipc.log('## connected to world ##', ipc.config.delay);
                ipc.of.world.emit(
                    'message',
                    'hello'
                );
            }
        );
        ipc.of.world.on(
            'disconnect',
            function(){
                ipc.log('disconnected from world');
            }
        );
        ipc.of.world.on(
            'message',
            function(data){
                ipc.log('got a message from world : ', data);
            }
        );
    }
);

```
当然，单机场景下通过网络来完成进程间通信有些浪费性能，但网络通信的 优势 在于跨环境的兼容性与更进一步的RPC场景

### message queus
父子进程都通过外部消息机制来通信，跨进程的能力取决于MQ支持

即进程间不直接通信，而是通过中间层(MQ),加一个控制层就能获得更多灵活性和优势

- 稳定下：消息机制提供了强大的稳定性保证，比如确认传达(消息回执ACK)，失败重发、防止多发等。
- 优先级控制:允许调整消息响应式次序
- 离线能力:消息可以被缓存
- 事务性消息处理：把关联消息组成事务，保证其传达顺序以及完成性

P.S.不好实现？包一层能解决嘛？不行就包两层....

比较受欢迎的有 [smrchy/rsmq](https://github.com/smrchy/rsmq) ，例如：

```js
// init 
RedisSMQ = require('rsmq');
rsmq = new RedisSMQ({host: "127.0.0.1", port: 6379, ns: "rsmq"});
// create queue
rsmq.createQueue({qname: "myqueus"}, function(err, resp) {
    if (resp === 1) {
        console.log('queue created');
    }
})
// send message
rsmq.sendMessage({qname:"myqueue", message:"Hello World"}, function (err, resp) {
  if (resp) {
    console.log("Message sent. ID:", resp);
  }
});
// receive message
rsmq.receiveMessage({qname:"myqueue"}, function (err, resp) {
  if (resp.id) {
    console.log("Message received.", resp)  
  }
  else {
    console.log("No messages for me...")
  }
});
```
会起一个Redis server，基本原理如下：

> Using a shared Redis server multiple Node.js processes can send / receive messages.

消息的收/发/缓存/持久化依靠Redis提供的能力，在次基础上实现完整的队列机制

### Redis
基本思路与message queue类似：

Use Redis as a message bus/broker.

Redis自带 Pub/Sub机制 （即发布-订阅模式），适用于简单的通信场景，比如一对一或一对多并且 不关注消息可靠性 的场景

另外，Redis有list结构，可以用作消息队列，以此提高消息可靠性。一般做法是生产者 LPUSH 消息，消费者 BRPOP 消息。适用于要求消息可靠性的简单通信场景，但缺点是消息不具状态，且没有ACK机制，无法满足复杂的通信需求

P.S.Redis的Pub/Sub示例见 What’s the most efficient node.js inter-process communication library/method?

## 总结
- 通过stdin/stdout传递json: 最直接的方式，适用于你能够拿到子进城handle的场景，适用于关联进程之间的通信，无法跨机器
- Node原生IPC支持：最native(地道？)的方法，比上一种正规一些，具有同样的局限性
- 通过sockets：最通用的方式，有良好的跨环境能力，但存在网络的性能算好
- 借助message queue：最强大的方式，既然要通信，场景还复杂，不妨扩展除一层消息中间件，漂亮的解决各种问题

## 资料
[node进程管理](https://www.cnblogs.com/rubyxie/articles/8949417.html)