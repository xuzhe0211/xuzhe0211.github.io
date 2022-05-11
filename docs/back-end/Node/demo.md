---
autoGroup-8: Deno
title: Deno 能吞掉 Node.js 吗？
---
Deno是什么?简单来说，它是一个支持Javascript和TypeScript的安全平台，有点像Node.js

有了Node.js，可以让JavaScript运行在服务端，为什么还要搞一个Deno

其实两个字：不爽

Deno的作者，同是也是Node.js的作者Ryan Dahl想要一个有趣的、生产力强大的脚本语言平台，但是现在的技术平台满足不了他

他觉得Node.js有这么几个大的槽点
1. <span style="color: red">Node module设计的很烂，还是集中式的</span>
2. <span style="color: red">需要支持很多遗留的API</span>
3. <span style="color: red">安全问题</span>

既然如此，那就另起炉灶，在搞一个吧，把这些缺陷给修正了

Deno有什么重要特点呢？

## 1.安全控制
你写的或者从别的地方导入的js/ts代码，默认不能直接访问硬盘、网络等资源了，需要在运行的时候给脚本授权

比如下面整个命令就是授权app.ts可以访问环境变量，可以访问网络，可以读取/temp目录
```js
deno run --allow-env --allow-net --alow-read=/temp app.ts
```
熟悉Java的同学立即就会想到Java的沙箱(Sand Box)，程序是运行在沙箱中被控制的，为什么要这么做呢？<span style="color: blue">一个重要的原因是有很多第三方的代码库是从网络下载的，这些代码可能存在**恶意破坏本地环境，偷取本地敏感信息**的问题，可见Deno把安全确实放到了比较重要的位置</span>

<span style="color: blue">有趣的是Java默认是开启访问权限，想限制的话需要提供策略文件，而Deno默认是关闭访问权限，更狠！</span>

但我有一个感觉，这个功能并不是那么的重要和急迫，大家想一下，你定制过Java的安全策略吗？大部分时间都是默认配置的吧？现在有了Docker这样的容器来实现隔离，在应用层面再来授权，意义有多大呢？

## 2.终于有标准库了
用惯Java同学可能没啥感觉，因为一直在用JDK中的各种内置的class.

但是JavaScript一直没有标准库，很多功能靠第三方代码，会给人造成选择困难症

现在Deno终于提供了一个标准库，涵盖了datetime，encoding,hash,http,log, testing等等，这将会极大的方便程序员。

不过，我浏览了一下[标准库代码](https://deno.land/std),都是用TypeScript编写的

## 3.支持开箱即用的TypeScript
TypeScript是JavaScript的超集，支持静态类型，现在已经很流行了

Deno对TypeScript支持非常好，你可以用TypeScript来写程序，然后直接Deno run xxx.ts，Deno在内部会编译成JavaScript运行。

静态类型还是香啊！！可以想象，用了TypeScript的助阵。Deno可以支持大型的、有着复杂业务逻辑的应用程序开发，以后再也无人可以嘲笑动态一时爽，重构火葬场了

## 4.干掉了集中化的代码仓库
Deno的包管理方式有了天翻地覆的变化，抛弃了集中式的代码仓库，代码从Web端直接导入
```js
import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import * as base64 from 'https://denopkg.com/chiefbiiko/base64/mod.ts'; 
```
这是直接从Web上导入ECMAScript模块，看起来到是挺清爽。<span style="color: blue">当然导入的模块会缓存到本地，下次可以直接访问</span>

可是分布式的包管理真的有那么好吗？想想在代码中的那些从各个网站import语句，我是觉得有点不爽，Python有pip，Ruby有gem，Java有maven，它们的背后都是集中式的仓库，用起来挺香啊

现在Deno提供了一个非常初级的[搜索第三方库的页面](https://deno.land/x),我认为以后必然会出现第三方库的托管网站，大家还是从一个地方去搜索，下载软件包

## 5.内置了很多工具
JavaScript生态乱七八糟的工具太多，最好能大一统

Deno顺应了这个趋势，提供了诸如打包、格式清理、测试、安装、文档生成、linting、脚本编译等一揽子的解决方案，内置可用，不用导出安装下载，这一点必须点赞。

## 小姐

不得不佩服Ryan Dahl， 打造一个Node.js已经足够“吹嘘”一辈子了，可是他还能革自己的命，推出Deno这么一个新平台，为兴趣工作，不断创新，让人赞叹。

Deno非常激进，直接采用了ECMAScript模块，抛弃了Node Module，这也让它和现有的JavaScript生态系统不兼容。

说Deno替代Node.js还为时过早，毕竟这才是一个刚刚1.0的版本，和一个发展了10多年的平台难以直接相提并论。Deno还没有经受生产环境的考验，对于一些特殊的案例表现如何我们还不知道。

也许过一段时间，会有“先行者”公司分享它们的使用经验，解决Deno的坑，那个时候Deno才会变成一个真正有用的平台，让我们拭目以待吧。





## 资料
[Deno 能吞掉 Node.js 吗？](https://blog.csdn.net/coderising/article/details/106233326)