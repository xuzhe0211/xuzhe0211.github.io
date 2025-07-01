---
title: docker-save
---
docker save -o 是Docker中用于导出镜像的命令，主要作用是将一个或多个docker镜像打包成一个归档文件(通常是.tar文件)，方便在不同环境之间传输或备份镜像

## 基础语法
```bash
docker save -o <输出文件名> <镜像名>:<标签>
```
- -o:指定导出的文件路径和名称
- <镜像名>:<标签>:指定要导出的镜像名称和标签
- 支持多个镜像，可以导出多个镜像，空格分割 

### 导入镜像
导出的镜像可以通过 docker load恢复
```bash
docker load -i nginx_latest.tar
```
或者使用通道：
```bash
cat nginx_latest.tar | docker load
```