---
autoGroup-2: 持续集成部署
title: GitHub Actions 入门教程
---
## github actions是什么？
github actions是github的持续集成及自动化工作流服务，使用起来都比较方便。大部分github actions都可以在https://github.com/marketplace?type=actions中找到。

## 咱们使用github actions
在github项目目录下，根目录下新建一个文件.github/workflow/xx.yml,在xx.yml写你需要自动化工作流的服务。

### 基本语法
```js
name: github action的名字

on:
    push:
      breaches:
        - 触发部署的分支
      paths:
        - 下列文件的变更触发部署
      paths-ignore:
        - 下列文件的变更不触发部署
jobs: 工作流程运行包括一项或多项作业，作业默认是并行运行。
    deploy:
        runs-on: 使用的系统镜像
        setps: 自动化步骤
          - name:步骤名称
            users：使用封装好的步骤镜像
            env: 环境变量
              环境变量的map可用于工作流程中的所有作业和步骤
            with：
              有些步骤必须通过with关键词设置输入。请查阅操作的自述文件，确定所需的输入
            run:
              要运行的脚本
```
### 两个例子
- 部署到阿里云

    ```js
    name: deploy to aliyun

    on:
      push:
        branches:
          - ali-ecs # 只在ali-ecs上push触发部署
        paths-ignore: # 下列文件的变更不触发部署，可以自行添加
          - README.md
          - LICENSE
    jobs:
      deploy:
        runs-on: ubuntu-latest # 使用ubuntu系统镜像运行自动化脚本
        steps: # 自动化步骤
        - users: actions/checkout@v2 # 第一步，下载代码仓库

        - name:Deploy to Server # 第二步，rsync推文件
           uses: AEnterprise/rsync-deploy@v1.0  # 使用别人包装好的步骤镜像
           env:
                DEPLOY_KEY: ${{ secrets.ACCESS_TOKEN }}   # 引用配置，SSH私钥
                ARGS: -avz --delete   # rsync参数
                SERVER_PORT: '22'  # SSH端口
                FOLDER: ./  # 要推送的文件夹，路径相对于代码仓库的根目录
                SERVER_IP: ${{ secrets.REMOTE_HOST }}  # 引用配置，服务器的host名（IP或者域名domain.com）
                USERNAME: ${{ secrets.SSH_USERNAME }}  # 引用配置，服务器登录名
                SERVER_DESTINATION: /home/zhihu-api  # 部署到目标文件夹
            - name: Restart server   # 第三步，重启服务
            uses: appleboy/ssh-action@master
            with:
                host: ${{ secrets.REMOTE_HOST }}  # 下面三个配置与上一步类似
                username: ${{ secrets.SSH_USERNAME }}
                key: ${{ secrets.ACCESS_TOKEN }}
                # 重启的脚本，根据自身情况做相应改动，一般要做的是migrate数据库以及重启服务器
                script: |
                cd /home/zhihu-api
                npm install 
                npm run start
    ```
- 部署轮子到npm

    ```js
    name: publish
    
    on:
    push:
        branches: master
        paths:
            - 'lib/*'
    
    jobs:
    build:
    
        runs-on: ubuntu-latest
    
        steps:
        - uses: actions/checkout@v2
        - uses: actions/setup-node@v1
        with:
            node-version: '12'
            registry-url: 'https://registry.npmjs.org'
        - name: Release
        run: |
            git config --local user.email "action@github.com"
            git config --local user.name "GitHub Action"
            npx version-from-git --allow-same-version --template 'master.short'
        - name: Publish to npmjs
        run: | 
            npm publish --access public
        env:
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
            NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
    ```

## 资料
[GitHub Actions 入门教程](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)

[GitHub Actions 自动构建 并发布到 NPM](https://cloud.tencent.com/developer/article/1970752)


https://frostming.com/2020/04-26/github-actions-deploy/


https://frostming.com/2020/04-26/github-actions-deploy/


[demo](https://github.com/khitrenovich/github-actions-expect-test/blob/master/my-script.exp)