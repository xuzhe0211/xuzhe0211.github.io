---
autoGroup-0: 什么是docker
title: 谁说前端不用懂，手摸手 Docker 从入门到实践
---
## 介绍
### 出现的原因
前后端开发到测试到生产的过程中，经常会遇到一个问题，明明我在本地跑没问题，为什么到测试环境或者生产环境就报错了了呢，常常这是因为开发、测试、生产的环境与配置不同导致的。

折腾过环境配置的人都明白其中麻烦，换一台系统、虚拟机、机器，就又要重来一次，费力费时。由于环境和配置的原因，各种奇奇怪怪因为环境和配置的 Bug，总是像打地鼠游戏里面的地鼠一样不断冒出来 🐹

![docker logo](./images/640.png)

Docker对这个问题给出了一个很好地解决方案，通过镜像将除了系统之外所需要的系统环境由下而上打包，达到服务跨平台的无缝运作。也就是说，安装的时候，把特定的环境一模一样的搬过来，从而解决[在我的电脑上能跑，在xx环境就跑步了]的情况

另外一个重要的原因，就是轻量,基于容器的虚拟化，Docker的镜像仅包含业务运行所需的runtime环境
，一个CentOS/Ubuntu基础镜像仅170M，因为轻量一个宿主机可以轻松安装数百个容器。
### 是什么？
Docker是基于GO语言实现的云开源项目，从2013年发布到现在一直广受关注。Docker可以让你像使用集装箱一样快速的组合成应用，并且可以像运输标准集装箱一样，尽可能的屏蔽代码层面的差异。它将应用程序与该程序的依赖，打包在一个文件里面。运行这个文件，就会生成一个虚拟容器

程序在这个虚拟容器里运行，就好像在真实的物理机上运行一样。有了Docker，就不用担心环境问题了

## 安装与配置
### Mac下安装
直接使用Homebrew Cask来安装，Mac下
```js
# Homebrew 安装
$ braw cask install docker
```
既可，安装完输入命令，直接报错
```js
$ docker 
zsh:command not found: docker 
```
遇到这个报错别担心，安装完之后要在应用列表里双击Docker应用，输入密码之后就可以使用这个命令了

### CentOS下安装
Docker 要求 CentOS 版本必须在 6.5 及以上才可以安装
```js
# 安装
$ sudo yum install yum-utils device-mapper-persistent-data lvm2
$ sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
$ sudo yum install docker-ce

# 开启 Docke
$ sudo systemctl start docke
```
在 Windows 上可以直接下载安装包来安装，或者 Mac 上不使用 Homebrew 也可以去官网直接下载安装包来安装，百度一下到处都是安装方法，其他的就不用多说。

## 简单配置并跑起来

## 资料
[原文](https://mp.weixin.qq.com/s/1YDDCiDUMtxFlGQ94aoItg)

[docker+Jenkins+nginx实现前端自动部署详细教程](https://mp.weixin.qq.com/s/bU8Sh8SVn6L7Scxt6-4CZw)

[使用Docker Compose、Nginx、SSH和Github Actions实现前端自动化部署测试机](https://mp.weixin.qq.com/s/QgASFlvJ8aI3SUmEx-ZOfQ)