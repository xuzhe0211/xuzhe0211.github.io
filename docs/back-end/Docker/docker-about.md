---
autoGroup-3: docker问题
title: docker相关
---
## linux安装docker版本过低
https://docs.docker.com/engine/install/centos/

## docker-compose版本过低问题
```
curl -L https://github.com/docker/compose/releases/download/1.28.3/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose

docker-compose --version
```

## 解决 docker-compose command not found
https://blog.csdn.net/qq_30718137/article/details/108408360

## 资料