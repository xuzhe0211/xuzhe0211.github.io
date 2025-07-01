---
title: docker的Volumes
---
## docker启动容器后怎么设置volumes
### 在创建容器时设置 volumes
推荐做法是，在运行容器时通过-v或 --mount选项挂载 volumes

```shell
docker rum -d -v /host/path:/container/path my-image
```
这样在容器启动时就已经挂载了指定的 Volume。

### 对现有容器挂载volumes
如果容器已经存在，但没有设置 volumes，可以通过一下两种方法实现挂载
- 方法一：停止容器后重新创建

    停止现有容器，使用docker create 或 docker run 创建一个新的容器，并添加需要的volumes
    ```shell
    docker stop <container_id>
    docker rm <container_id>
    docker run -d -v /host/path:/container/path my-image
    ```
    这种方式是最直接的，但会导致原容器被删除并重新创建。

- 方法二：通过docker cp 复制数据到 Volume后重新启动

    ```shell
    # 先创建一个新的 Volume
    docker volume create my-volume

    # 将现有容器的数据复制到新的 Volume 中
    docker cp <container_id>:/container/path /path/to/temp
    docker cp /path/to/temp my-volume:/container/path
    
    # 删除原容器，并使用 -v 选项重新运行容器，挂载新的 
    docker run -d -v my-volume:/container/path my-image
    ```
### 方法三通过 docker run 创建临时挂载
如果只需要临时访问某个 Volume，可以运行一个新的容器共享该 Volume。例如：
```shell
docker run -it --volumes-from <container_id> ubuntu
```
这样，新创建的容器将共享指定容器的 Volumes。

### 使用 docker-compose 添加 Volume
如果使用 docker-compose 管理容器，可以修改 volumes 然后重新启动服务
```shell
version: '3'
services:
  app:
    image: my-image
    volumes:
      - /host/path:/container/path
```
运行以下命令以应用更改：
```shell
docker-compose up -d
```