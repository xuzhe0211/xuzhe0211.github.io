---
title: docker构建自己的镜像
---

## 设置国内docker镜像源
进入Setting->Daemon->Advanced,添加如下配置
```
{
    "registry-mirrors": [
        "http://hub-mirror.c.163.com",
        "https://registry.docker-cn.com",
        "http://f1361db2.m.daocloud.io"
    ],
    "insecure-registries": [],
    "debug": true,
    "experimental": true
}
```
点击Apply,等待Docker重启

## 拉取官方alpine最新版本镜像
```
docker pull alpine:latest
```

## 新建一个Dockerfile文件
```
FROM alpine:latest

RUN apk update \
    && apk add nodejs \
    && apk add npm
```

## 设置Docker的Setting的Shared Drives
进入Settings->Shared Drives勾选共享的硬盘，输入系统登录的用户名和密码。

## 构建镜像
在Dockerfile文件当前目录下执行cmd命令
```
docker build -t node:v1
```
在Dockerfile文件当前目录下新疆一个index.js文件
```
console.log('hello docker');
```

## 启动容器
假设前面的Dockerfile文件和index.js文件都在件都在c:/test/docker/node目录下。

执行cmd命令
```
docker run --rm -v c:/test/docker/node:/data node:v1 node /data/index.js
```

## docker-compose重启
```
docker-compose down
docker-compose build
docker-compose up -d
```

## 资料
[mac 设置docker国内镜像源](https://zhuanlan.zhihu.com/p/160859583)

[Docker构建一个node镜像](https://www.cnblogs.com/samwu/p/10572568.html)

[Mac电脑Docker拉取Mysql报错？no matching manifest for linux/arm64/v8 in the manifest list entries](https://blog.csdn.net/qq_22155255/article/details/118861560)

[docker build命令后 . 号的意思](https://www.xuxusheng.com/post/docker-build%E5%91%BD%E4%BB%A4%E5%90%8E-%E5%8F%B7%E7%9A%84%E6%84%8F%E6%80%9D)