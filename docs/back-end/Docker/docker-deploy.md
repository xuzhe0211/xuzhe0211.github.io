---
title: docker部署平台流程
---
在使用Docker部署平台时，主要流程包括从构建容器镜像到在不同环境中运行容器。以下是一个标准的Docker部署平台流程，从创建镜像、配置、部署到容器化服务的持续集成与持续部署

## 1. 准备环境
- 安装docker：确保目标机器或虚拟机安装了docker
- 安装docker-compose：docker-compose允许你定义和管理多容器应用程序

## 2. 构建docker镜像
### 1. 创建dockerfile
dockerfile是定义镜像的配置文件，包含从基础镜像开始，安装依赖，复制代码，执行命令等指令。

示例 Dockerfile(针对Node.js项目)

```dockerfile
# 使用官方的 Node.js 镜像作为基础镜像
FROM node:16

# 设置工作目录
WORKDIR /app

# 复制项目的 package.json 和 package-lock.json
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制源代码
COPY . .

# 暴露应用端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]
```
### 2. 构建docker镜像
在项目根目录运行以下命令来构建Docker镜像
```shell
docker build -t my-app .
```
-t my-app指定镜像名称
### 3. 查看镜像
构建完成后，你可以查看本地镜像
```shell
docker images
```
## 3. 配置docker-compose(可选)
如果你的平台是一个多容器应用(如前后端分离、数据库服务等)，你可以使用 Docker Compose 来定义服务
### 1. 创建docker-compose.yml
示例: 定义一个Node.js应用和一个MongoDB服务
```yml
version: "3"
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
  db:
    image: mongo
    ports:
      - "27017:27017"
```
### 2. 启动Docker Compose
使用Docker Compose 启动服务
```shell
docker-compose up -d
```
-d 选项让容器在后台运行
### 3. 查看正在运行的容器
```shell
docker-compose ps
```
## 4. 将镜像推送到Docker镜像仓库
1. 登录Docker仓库
    如果你使用Docker Hub，首先需要登录

    ```js
    docker login
    ```
2. 标记镜像
    使用仓库名标记镜像

    ```js
    docker tag my-app username/my-app
    ```
3. 推送镜像

    将镜像推送到docker Hub(或其他Docker 镜像仓库)
    ```shell
    docker push username/my-app:latest
    ```
## 5. 在目标环境部署
1. 在服务器上拉取镜像

    在目标服务器(或云平台，如AWS、GCP等)上拉取镜像
    ```shell
    docker pull username/my-app:latest
    ```
2. 运行容器

    ```shell
    docker run -d -p 3000:3000 username/my-app:latest
    ```
3. 查看容器日志
    ```shell
    docker logs <container_id>
    ```
## 6. 配置持久化存储(可选)
如果应用需要持久化数据(例如数据库)，可以使用docker Volumes来挂载目标主机上的目录
```js
docker run -d -v /path/to/local/data:/data username/my-app:latest
```
或者在 docker-compose.yml 配置
```yml
services:
  db:
    image: mongo
    volumes:
      - /path/to/local/data:/data/db
```
## 7. 部署到生产环境
将Docker镜像和配置推送到生产环境，常见的生产环境部署平台有
- Docker Swarm: Docker自带的集群管理和编排工具
- Kubernetes:更强大的编排平台
- 云服务平台：如 AWS ECS、Azure Container Instances、Google Kubernetes Engine 等。
## 配置CICD流水线
为了自动化部署，可以使用 CI/CD 工具（如 Jenkins、GitLab CI、GitHub Actions）来自动化构建、测试和部署过程。
1. 配置GitLab CI(示例)
    在项目根目录创建.gitlab-ci.yml文件
    ```yml
    stages:
    - build
    - deploy

    build:
    stage: build
    script:
        - docker build -t my-app .
        - docker tag my-app registry.example.com/my-app:latest
        - docker push registry.example.com/my-app:latest

    deploy:
    stage: deploy
    script:
        - docker pull registry.example.com/my-app:latest
        - docker run -d -p 3000:3000 registry.example.com/my-app:latest
    ```
2. 配置 GitHub Actions
    使用 .github/workflows/docker.yml 文件：
    ```shell
    name: Docker Image CI

    on:
    push:
        branches:
        - main

    jobs:
    build:
        runs-on: ubuntu-latest

        steps:
        - uses: actions/checkout@v2
        - name: Build Docker image
            run: |
            docker build -t my-app .
            docker tag my-app ghcr.io/username/my-app:latest
        - name: Push to GitHub Container Registry
            run: |
            echo ${{ secrets.GITHUB_TOKEN }} | docker login ghcr.io -u ${{ github.actor }} --password-stdin
            docker push ghcr.io/username/my-app:latest
    ```
## 监控与日志
为了确保平台的稳定运行，部署后你需要监控应用的运行状况，并且查看容器日志
1. 容器日志查看
    ```shell
    docker logs <container_id>
    ```
2. 监控容器资源
    使用docker stats查看容器的资源使用情况
    ```
    docker stats
    ```
3. 集成监控工具
    可以使用 Prometheus + Grafana 等工具来监控 Docker 容器的健康和性能。