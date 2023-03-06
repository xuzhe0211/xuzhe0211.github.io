---
autoGroup-1: docker实例
title: docker 记录
---

镜像定制完成

大的编排？

- 容器构建
- <span style="color:red">添加对应数据卷 不希望数据存在镜像中</span>

    volumes:  // 数据映射到xxx
        - ./data/db:/data/db 

```shell
$ docker build .
$ docker-compose up
```



git commit msg验证插件：validate-commit-msg  


然叔博客：

阿里云部署：

- ECS主机
- 域名解析服务

nginx 配置 

下载项目 git clone xxxx

进入项目

已近容器化风化 docker-compose up -d (-d 后台启动)


## 持续集成
设置一个机制 main、test分支，当出现提交(合并)， 重新部署程序



mac 产生密钥

ssk-keygen 

第一步指定新的位置 ./action/id_rsa