---
title: 介绍
article: false
---


## 介绍

关于Docker的一些笔记

> Docker利用了Linux内核特性命名空间(namespace)及控制组(cgroups)等为容器提供隔离的运行环境

## 使用脚本快速启用Docker
在过去常常手动安装，现在已经完全切换为脚本形式了
```
curl -fsSL https://get.docker.com -o get-docker.sh

sudo sh get-docker.sh
# 替换源
# sudo sh get-docker.sh --mirror Aliyun
# sudo sh get-docker.sh --mirror AzureChinaCloud
```
如果担心脚本异常，可以下载并进行审核

接着就可以开始愉快的使用了，例行习惯Hello World:

```
docker run hello-world

# 输出
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

## 初始化Docker环境

### 设置用户组
为了避免每次使用Docker都需要切换到sudo，可以将docker加入当前用户，重新登录后生效
```
sudo groupadd docker

sudo usermod -aG docker $USER
#or
sudo usermod -aG docker USER_NAME
```
### 镜像加速
镜像服务可用:
1. [阿里云镜像服务](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors?accounttraceid=b7ab50df669847d08a7e5403de064166sqca)
2. [网易云镜像服务](https://sf.163.com/help/documents/56918246390157312)

修改本地的/etc/docker/daemon.json并修改registry-mirrors, 可为其配置多个避免某个挂掉：
```
{
    "registry-mirrors": [
        "https://hub-mirror.c.163.com"
    ]
}
```
### 修改存储路径
通过docker info 可以看到默认路径 /var/lib/docker, 而一般服务器会额外挂载硬盘。
```
# 修改配置文件
vim /etc/docker/daemon.json

# 增加
{
    "data-root": "/path/to/docker"
}

# 重启docker
systemctl restart docker
```
执行 docker info进行校验。

## 热门镜像
### Busybox
以前常常会用ubuntu来测试一些命令行工具，现在有了更好的选择
```
# --rm 用完即删
docker run -it --rm busybox
```

### Node.js
从这里基本可以了解到这些镜像只是在Docker Engine上增加了一些依赖,然后你又基于这些依赖搭建你的环境，可以看看[Node Images Layers](https://hub.docker.com/layers/node/library/node/erbium-buster-slim/images/sha256-c6ad96c5345c1a714e0052d08d83635c8e422ea0d103adc7f9f2df4fcfb7fe2d?context=explore)加深该概念

```
# 追加 bash，否则会直接进入node
docker run -it --rm node:slim bash
```
### Nginx
快速测试本地打包好的静态文件。
```
docker run --rm \
    -p 8080:80 \
    -v /dir/dist/:/usr/share/nginx/html \
    nginx
```

### MySQL
指定密码
```
docker run --rm \
    -p 33006:3306 \
    -e MYSQL_ROOT_PASSWORD=mypasswd \
  mysql
```

### Mongo
```
docker run -d \
    -p 27017:27017 \
    --name some-mongo \
    mongo --auth
```
### Redis
指定密码
```
docker run -d \
    -p 6379:6379 \
    --name some-redis \
    redis --requirepass "redispwd"
```
## docker基本操作

```shell
# 启动
sudo systemctl start docker

# 修改源
vim /etc/docker/daemon.json
sudo systemctl daemon-reload

# 重启
sudo systemctl restart docker


sudo systemctl start docker # 启动
sudo systemctl daemon-reload # 守护进程重启
sudo systemctl restart docker # 重启docker 服务
sudo systemctl stop docker # 关闭 docker
```
## 移除docker
如果在之前修改了存储路径，则根据当前情况进行修改
```
# Ubuntu
sudo apt-get purge docker-ce docker-ce-cli containerd.io
# CentOS
sudo yum remove docker-ce docker-ce-cli containerd.io

# 还有 images、containers、volumes、and configurations
sudo rm -rf /var/lib/docker
```
## docker将容器打包成镜像并传输到其他服务器部署
### 从容器创建一个镜像
```
docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
```
OPTIONS说明:
- -a:提交的镜像作者
- -c:使用DockerFile指令来创建镜像
- -m:提交时的说明文字
- -p:在commit时，将容器暂停

例子🌰
```
// 例1
docker commit -a 'runoob.com' -m 'my apache' a404c6c174a2  mymysql:v1 

// 例2
docker commit -m '' -a '' [CONTAINER ID] [给新的镜像的命名]

docker commit -m '' -a '' aa myelastcsearch:1.0
```
### 打包一个镜像
```
docker save [OPTIONS] IMAGE [IMAGE...]

docker save -o my_ubuntu_v3.tar runoob/ubuntu:v3
```
### 镜像远程拷贝
使用scp传输至其他服务器

**从本地复制到远程**
```
scp local_file remote_username@remote_ip:remote_folder
或者 
scp local_file remote_username@remote_ip:remote_file 
或者 
scp local_file remote_ip:remote_folder 
或者 
scp local_file remote_ip:remote_file 
```
**从远程复制到本地**
```
scp root@www.runoob.com:/home/root/others/music /home/space/music/1.mp3 
scp -r www.runoob.com:/home/root/others/ /home/space/music/
```
### 新服务器载入镜像
```
docker load [OPTIONS]
```
OPTIONS说明
- --input,-i:指定导入的文件，代替STDIN
- --quiet,-q：精简输出信息
```
docker load --input fedora.tar
```

[docker构建一个nginx服务器](/articles/back-end/Node/#docker%E6%A6%82%E5%BF%B5)


```shell
docker tag node:18-alpine xxx.xxx.xxx.com/base/node:18-alpine
docker push xxx.xxx.xxx.com/base/node:18-alpine
```
## 参考资料

1. [Docker](https://docs.docker.com/)
2. [Docker Commands](https://docs.docker.com/engine/reference/commandline/docker/)
3. 《Docker技术入门与实践(第三版)》
4. 《自动动手写Docker》
5. [当前源文档](https://docs.shanyuhai.top/backend/docker/#%E4%BB%8B%E7%BB%8D)

