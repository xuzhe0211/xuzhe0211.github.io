---
title: PM2实用指南及容器Docker部署
---
**Node.js默认单进程运行,对于32位系统最高可以使用512MB内存,对于64位最高可以使用1GB内存**。对于多核CPU的计算机来说，这样做效率很低，因为只有一个核在运行，其他核都在闲置，PM2利用的node原生的cluster模块可以顺利解决该问题。

pm2是一个带有负载均衡功能的应用进程管理器，可以使node服务在后台运行。

## 安装
```shell
npm install pm2 -g
```
## PM2常用命令
app.js为api-service服务的启动程序，在生产环境中使用pm2进行管理
- 启动

    ```shell
    pm2 start app.js --name api-service
    pm2 start app.js --watch #实时监控 app.js的方式启动，当app.js文件有变动时，pm2会自动reload
    ```
    ![pm2](./images/df221b8325cb4626922d94839b521287~tplv-k3u1fbpfcp-zoom-in-crop-mark_4536_0_0_0.png)

- 查看进程

    ```shell
    pm2 list
    pm2 show 0 # 或者 pm2 info 0 # 查看进程详细信息，0位PM2进程id
    ```
    ![pm2进程](./images/72ce345cdff24f768251e33ee89caba1~tplv-k3u1fbpfcp-zoom-in-crop-mark_4536_0_0_0.png)
- 监控

    ```shell
    pm2 monit
    ```
    ![pm2监控](./images/d4f81997bfda43339fb9bbfc1eeaa788~tplv-k3u1fbpfcp-zoom-in-crop-mark_4536_0_0_0.png)
- 停止

    ```shell
    pm2 stop all # 停止PM2列表中所有的进程
    pm2 stop 0 # 停止PM2列表中进程为0的进程
    ```
- 重载

    ```shell
    pm2 reload all # 重载PM2列表中所有的进程
    pm2 reload 0 # 重载PM2列表中进程为0的进程
    ```
- 重启
    
    ```shell
    pm2 restart all # 重启PM2列表中所有的进程
    pm2 restart 0 # 重启pm2列表中进程为0的进程
    ```
- 删除PM2进程

    ```shell
    pm2 delete 0 # 删除PM2列表中进程为0的进程
    pm2 delete all # 删除pm2列表中所有的进程
    ```
## 自动启动文件
### 生成脚本
```shell
pm2 ecosystem
```
创建文件：/api-service/ecosystem.config.js
```js
module.exports = {
    apps: [
        {
            name: "api-service",
            script: "app.js",
            merge_logs: true,
            max_restarts: 20,
            instances: 1,
            max_memory_restart: "2G",
            cwd: "/website/api-service/",
            env: {
                NODE_ENV: "development",
            },
            env_production: {
                NODE_ENV: "production",
            },
        },
    ],
};
```
说明：
- apps:json结构，apps是一个数组，每个数组成员就是对应一个pm2中运行的应用
- name: 应用程序的名称
- cwd: 用用程序所在的目录
- script: 应用程序的脚本路径
- exec_interpreter: 应用程序的脚本类型，这里使用的shell，默认是nodejs
- min_uptime: 最小运行时间，这里设置的是60s即如果应用程序60s内退出，pm2会认为程序异常退出，此时触发重启max_restarts设置数量
- max_restarts: 设置应用程序异常退出重启的次数，默认15次(从0开始计数)
- exec_mode: 

## 资料
[原文](https://juejin.cn/post/7001729139166150669)