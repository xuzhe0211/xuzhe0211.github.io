---
title: docker如何查看当前镜像需要对外暴漏的端口和文件、目录
---
要确定在启动Docker镜像时需要映射哪些端口和目录，可以通过以下方法：

## 1. 查阅镜像官方文档
Docker Hub 上的镜像说明页面（如 hub.docker.com）通常会明确标注：
- 端口:Expose 指令暴露的端口(如Nginx暴露 80/tcp)
- 目录: 需要挂载的卷(如MySQL 的 /var/lib/mysql)

示例
```bash
# Nginx官方示例
docker run -p 8080:80 -v /宿主机/html:/usr/share/nginx/html nginx:latest
```
## 2. 查看镜像的 Dockerfile
在Docker Hub或GitHub上查找镜像的Dockerfile
- 端口：搜索EXPOSE 指令(如 EXPOSE 8080)
- 目录：搜索 VOLUME 指令(如 VOLUME /data)

示例
```bash
FROM alpine
EXPOSE 8080 # 暴露8080端口
VOLUME /data # 挂载/data目录
```
## 3. 使用docker inspect命令
查看已拉取镜像的元数据
```bash
docker inspect 镜像名:标签
```
- 端口：检查Config.ExposedPorts字段
- 目录：检查Config.Volumes 或 Config.WorkingDir 字段

## 4. 运行临时容器测试
启动一个简单容器进入内部查看
```bash
docker run -it 镜像名:标签 sh
```
- 端口：检查进程监听的端口(如 netstat -tuln)
- 目录：查找写入数据的目录(如日志、数据库文件)

常见应用的映射示例
应用 | 端口映射 | 目录映射
--- | ---| ---
Nginx | -p 80:80 | -v /宿主机/html:/usr/share/nginx/html
MySQL | -p 3306:3306 | -v /宿主机/mysql:/var/lib/mysql
Redis | -p 6379:6379 | -v /宿主机/redis:/data
Postgres | -p 5432:5432 | -v /宿主机/pgdata:/var/lib/postgresql/data

## 启动命令模版
```bash
docker run -d \
  --name 容器名 \
  -p 宿主机端口:容器端口 \
  -v 宿主机目录:容器目录 \
  镜像名:标签
```
:::tip
关键原则
- 端口映射：使外部能访问容器服务(如Web服务的80端口)
- 目录映射：持久化重要数据（如数据库、配置文件），避免容器删除后丢失数据。
:::