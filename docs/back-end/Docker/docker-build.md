---
title: docker构建自己的镜像
---
## docker 构建一个node镜像源
### 0设置国内docker镜像源
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

### 1.拉取官方alpine最新版本镜像
```
docker pull alpine:latest
```

### 2. 新建一个Dockerfile文件
```
FROM alpine:latest

RUN apk update \
    && apk add nodejs \
    && apk add npm
```

### 3.设置Docker的Setting的Shared Drives
进入Settings->Shared Drives勾选共享的硬盘，输入系统登录的用户名和密码。

### 4.构建镜像
在Dockerfile文件当前目录下执行cmd命令
```
docker build -t node:v1
```
在Dockerfile文件当前目录下新疆一个index.js文件
```
console.log('hello docker');
```

### 5.启动容器
假设前面的Dockerfile文件和index.js文件都在件都在c:/test/docker/node目录下。

执行cmd命令
```
docker run --rm -v c:/test/docker/node:/data node:v1 node /data/index.js
```

### docker-compose重启
<span style="color: red;font-weight:bold">注意：docker-compose.yml文件的路径必须是项目的根目录& docker-compose build这一步骤</span>
```
docker-compose down
docker-compose build
docker-compose up -d
```

## Docker 将容器打包成镜像以及导入导出
可以使用docker commit命令来完成，docker commit可以从容器创建一个新的镜像
- 语法格式

    ```shell
    docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
    ```
- 参数说明

    - -a:提交的镜像作者；
    - -c:使用Dockerfile指令来创建镜像
    - -m:提交时的说明文字
    - -p:在commit时，将容器暂停

- 容器打包成镜像

    将容器a404c6c174a2 保存为新的镜像,并添加提交人信息和说明信息。
    ```hell
    docker top 2a2a11e2c043
    docker commit -a "alway.com" -m "socks5" 2a2a11e2c043 alway.com/wangwei/socks5:v1
    ```
- 导入& 导出

    - 导入

        ```shell
        ## 在镜像包所在的文件夹下操作
        docker load --input uu.tar(也可以使用docker load -i uu.tar或者 docker load < uu.tar)
        ## 或
        docker load < uu.tar
        ```
    - 导出

        ```shell
        docker save > /root/docker_images/uu.tar ubuntu:latest
        # 或
        docker save /root/docker_images/ubuntu:latest > uu.tar
        # 或
        docker save -o /root/docker_images/[镜像名].tar [镜像名]:latest
        ```
- 启动镜像

    ```shell
    docker run -it -d --name container-name -pp1:p1-pp2:p2new-image-name
    docker run -it -d --name qinglong -p 5700:5700 alway.com/wangwei/qinglong:v1
    ```

## 资料
[mac 设置docker国内镜像源](https://zhuanlan.zhihu.com/p/160859583)

[Docker构建一个node镜像](https://www.cnblogs.com/samwu/p/10572568.html)

[Mac电脑Docker拉取Mysql报错？no matching manifest for linux/arm64/v8 in the manifest list entries](https://blog.csdn.net/qq_22155255/article/details/118861560)

[docker build命令后 . 号的意思](https://www.xuxusheng.com/post/docker-build%E5%91%BD%E4%BB%A4%E5%90%8E-%E5%8F%B7%E7%9A%84%E6%84%8F%E6%80%9D)