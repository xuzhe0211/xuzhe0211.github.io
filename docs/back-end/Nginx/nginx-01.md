---
title: 给前端的 nginx 配置指南
---
## 通过docker高效学习nginx配置
推荐一种高效学习nginx的方法：[在本地使用nginx镜像并挂在nginx配置启动容器]

通过以下docker-compose可秒级验证nginx配置，无疑是学习nginx的绝佳利器

我将所有关于 nginx 的配置放置在 [simple-deploy1](https://github.com/shfshanyue/simple-deploy/tree/master/learn-nginx)，并且每一份配置对应 docker compose 中的一个 service，如以下 nginx、location、order1 就是 service。

```js
version: "3"
services: 
    # 关于nginx 最常见的配置学习
    nginx: 
        image: nginx:alpine
        ports: 
            - 8080:80
        volumes:
             - ./nginx.conf:/etc/nginx/conf.d/default.conf
            - .:/usr/share/nginx/html
        # 关于location的学习
        location: ...
        # 关于location 匹配顺序的学习
        order1: ...
```
<span style="color: red">每次修改配置时，需要重启容器</span>，可根据服务名学习指定的内容

```js
$ docker-compose up <service>

# 学习nginx最基础的配置
$ docker-compose up nginx

# 学习关于location 的配置
$ docker-compose up location
```

本篇文章所有的 nginx 配置均可以通过 docker 来进行学习，并附全部代码及配置。

## root 与index
- <span style="color:blue">root: 静态资源的根目录。见[文档](https://nginx.org/en/docs/http/ngx_http_core_module.html#root)</span>
- <span style="color: blue">index: 当请求路径以/结尾时，则自动寻找该路径下的index文件。见[文档](https://nginx.org/en/docs/http/ngx_http_index_module.html#index)</span>

root与index为前端部署的基础，在默认情况下root为/user/share/nginx/html，因此我们部署前端时,往往将构建后的静态资源目录挂载到该地址

```js
server {
    listen 80;
    server_name localhost;

    root /user/share/nginx/html;
    index index.html index.htm;
}
```
## location
location 用以匹配路由，配置语法如下
```js
location [ = | ~ | ~* | ^~ ] uri { ... }
```
其中uri前可提供以下修饰符

- <span style="color:red">= 精准匹配。优先级最高</span>
- <span style="color:red">^~ 前缀匹配，优先级其次</span>
- <span style="color:red">~ 正则匹配，优先级再次(~* 只是不区分大小写，不单列)</span>
- <span style="color:red">/ 通用匹配，优先级再次</span>

为了验证锁匹配的 location，我会在以下示例中添加一个自定义响应头 X-Cconfig, 可通过浏览器控制台网络面板验证其响应头
```js
add_header X-Cconfig B;
```
### location 修饰符验证
对于此四种修饰符可以在我的nginx下进行验证

由于此处使用了proxy_pass，因此需要locaton2,api两个服务一起启动，在location2服务中，可直接通过service名称作为hostname即http://api:3000访问api服务

而 api 服务，为我自己写的一个 whoami 服务，用以打印出请求路径等信息，详见 [shfshanyue/whoami2](https://github.com/shfshanyue/whoami)。

```js
$ docker-compose up location2 api
```
以下是关于验证location的配置文件，[详见](https://github.com/shfshanyue/simple-deploy/blob/master/learn-nginx/location2.conf)

```js
server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html
    index index.html index.htm;

    # 通用匹配 所有/xxx 任意路径都会匹其中的规则
    location / {
        add_header X-Config A;
        try_files  $uri $uri.html $uri/index.html /index.html;
    }

    # http://localhost:8120/test1           ok
    # http://localhost:8120/test1/          ok
    # http://localhost:8120/test18          ok
    # http://localhost:8120/test28          not ok
    location /test1 {
        # 可通过查看响应头来判断是否成功返回
        add_header X-Config B;
        proxy_pass http://api:3000;
    }

    # http://localhost:8120/test2           ok
    # http://localhost:8120/test2/          not ok
    # http://localhost:8120/test28          not ok
    location = /test2 {
        add_header X-Config C;
        proxy_pass http://api:3000;
    }

    # http://localhost:8120/test3           ok
    # http://localhost:8120/test3/          ok
    # http://localhost:8120/test38          ok
    # http://localhost:8120/hellotest3      ok
    location ~ .*test3.* {
        add_header X-Config D;
        proxy_pass http://api:3000;
    }

    # http://localhost:8120/test4           ok
    # http://localhost:8120/test4/          ok
    # http://localhost:8120/test48          ok
    # http://localhost:8120/test28          not ok
    location ^~ /test4 {
        # 可通过查看响应头来判断是否成功返回
        add_header X-Config E;
        proxy_pass http://api:3000;
    }
}
```
### location优先级验证
在我配置文件中，以 order 打头来命名所有优先级验证的nginx配置，此处仅仅以order1 为例进行验证
```js
# 以下配置，访问以下链接，其 X-Config 为多少
#
# http://localhost:8210/shanyue，为 B，若都是前缀匹配，则找到最长匹配的 location

server {
    root   /usr/share/nginx/html;

    # 主要是为了 shanyue 该路径，因为没有后缀名，无法确认其 content-type，会自动下载
    # 因此这里采用 text/plain，则不会自动下载
    default_type text/plain;

    location ^~ /shan {
        add_header X-Config A;
    }

    location ^~ /shanyue {
        add_header X-Config B;
    }
}
```
启动服务
```js
$ docker-compose up order1
```
curl 验证
 
当然也可以通过浏览器控制台网络面板验证，由于此处只需要验证响应头，则我们通过 curl --head 只发送 head 请求即可。

```js
# 查看其 X-Config 为 B
$ curl --head http://localhost:8210/shanyue
HTTP/1.1 200 OK
Server: nginx/1.21.4
Date: Fri, 03 Jun 2022 10:15:11 GMT
Content-Type: text/plain
Content-Length: 15
Last-Modified: Thu, 02 Jun 2022 12:44:23 GMT
Connection: keep-alive
ETag: "6298b0a7-f"
X-Config: B
Accept-Ranges: bytes
```
## proxy_pass
proxy_pass反向代理，也是nginx最重要的内容，这也是常用的解决跨域问题。

当使用proxy_pass代理路径时，有两种情况

1. <span style="color: red">代理服务器地址不含URI，则此时客户端请求路径与代理服务器路径相同。**强烈建议这种方式**</span>
2. <span style="color: red">代理服务器地址含URI，则此时客户端请求路径匹配location，并将其location后的路径附在代理服务器地址后</span>

```js
# 不含 URI
proxy_pass http://api:3000;

# 含 URI
proxy_pass http://api:3000/;
proxy_pass http://api:3000/api;
proxy_pass http://api:3000/api/;
```
在举一个例子
1. 访问http://localhost:8300/api3/hello，与以下路径匹配成功
2. proxy_pass 附有URI
3. 匹配路径后对于的路径为/hello，将其附在 proxy_pass 之后，得 http://api:3000/hello/hello
```js
location /api3 {
    add_header X-Config C;

    # http://localhost:8300/api3/hello -> proxy:3000/hello/hello
    proxy_pass http://api:3000/hello;
}
```
有点拗口，在我们试验环境有多个示例，使用以下代码启动可反复测试:
```js
$ docker-compose up proxy api
```
由于 proxy_pass 所代理的服务为 whoami，可打印出真实请求路径，可根据此进行测试
```js
server {
    listen       80;
    server_name  localhost;

    root   /usr/share/nginx/html;
    index  index.html index.htm;

    # 建议使用此种 proxy_pass 不加 URI 的写法，原样路径即可
    # http://localhost:8300/api1/hello -> proxy:3000/api1/hello
    location /api1 {
        # 可通过查看响应头来判断是否成功返回
        add_header X-Config A;
        proxy_pass http://api:3000;
    }

    # http://localhost:8300/api2/hello -> proxy:3000/hello
    location /api2/ {
        add_header X-Config B;
        proxy_pass http://api:3000/;
    }

    # http://localhost:8300/api3/hello -> proxy:3000/hello/hello
    location /api3 {
        add_header X-Config C;
        proxy_pass http://api:3000/hello;
    }

    # http://localhost:8300/api4/hello -> proxy:3000//hello
    location /api4 {
        add_header X-Config D;
        proxy_pass http://api:3000/;
    }
}
```
## add_header
控制响应头

由于很多特性都是通过响应头控制，因此基于此命令可做很多事情，比如
1. Cache
2. CORS
3. HSTS
4. CSP
5. ...

### Cache
```js
location /static {
    add_header Cache-Control max-age=31536000
}
```
### CORS
```js
location /api {
    add_header Access-Control-Allow-Origin *;
}
```
### HSTS
```js
location / {
    listen 443 ssl;

    add_header Strict-Transport-Security max-age=7200;
}
```
### CSP
```js
location / {
    add_header Content-Security-Policy "default-src 'self';"
}
```


## 资料
[给前端的 nginx 配置指南](https://mp.weixin.qq.com/s/4QYwZCHOOJ-9yiz5Qvo9jw)

[simple-deploy仓库](https://github.com/shfshanyue/simple-deploy/tree/master/learn-nginx)