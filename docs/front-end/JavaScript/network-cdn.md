---
autoGroup-8: 网络
title: CDN实现原理 
---
## 什么是CDN
<span style="color: orange">CDN全称是Content Delivery Network</span>,即<span style="color: orange">内容分发网络</span>,也成为<span style="color: orange">内容传送网络</span>。<span style="color: orange">CDN</span>是构建在现有网络基础上的智能虚拟网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，减低网络拥塞，提高用户访问响应速度和命中率。

简单理解了，<span style="color: orange">CDN是利用缓存技术</span>,解决如何将数据快速可靠从源站传递到用户的问题。用户获取数据时，不需要直接从源站获取，通过CDN分发，用户可以从一个较优的服务器获取数据，从而达到快速访问，并减少源站负载压力的目的

## CDN快速访问原有

## CDN原理

用户访问的网站使用CDN，其过程会变成一下这样

![用户访问网站使用CDN](./images/1371705100-bf4a89f4b942e961_fix732.jpg)

1. <span style="color: blue">用户向浏览器输入www.processon.com这个域名，浏览器第一次发现本地没有DNS缓存，则向网站的DNS服务器请求</span>
2. <span style="color: blue">浏览器向DNS服务器请求对该域名的解析。由于CDN对域名进行了调整，DNS服务器最终会将域名的解析权交给CNAME指向CDN专用的DNS服务器；</span>
3. <span style="color: blue">CDN的DNS负载郡城系统解析域名，把对用用户响应速度最快的IP返回给用户</span>
4. <span style="color: blue">用户向该IP地址(CDN服务器)发出请求</span>
5. <span style="color: blue">CDN负载均衡设备会为用户选择一台合适的缓存服务器提供服务器;</span>
6. <span style="color: blue">用户向缓存服务器发出请求</span>
7. <span style="color: blue">缓存服务器响应用户请求，将用户所需的内容返回给用户</span>

## 资料
[CDN实现原理](https://www.cnblogs.com/natee/p/15057123.html)

[浅析CDN原理](https://segmentfault.com/a/1190000039045541)

[高并发网站架构设计之DNS解析原理全过程](https://zhuanlan.zhihu.com/p/269239315)
