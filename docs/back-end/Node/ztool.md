---
title: 工具
---
1. 设置为淘宝镜像

npm config set registry https://registry.npm.taobao.org

2. 设置回原本的源，用来发布npm包

npm config set registry https://registry.npmjs.org

3. 查看npm当前设置的源 

npm config get registry 或者 npm config list

## Node pm2使用文档

**pm2和forever**是启动Nodejs服务常用到的两个工具。使用这两个指令可以使node服务在后台运行，另外他们可以在服务因异常或其他原因被杀掉后进行自动重启。

### 基本指令

```
npm install pm2 -g //全局安装

pm2 start app.js 启动服务，入口文件是app.js

pm2 start app.js --name [name] 重命名进程、应用

pm2 start app.js -i [n] --name [name] 启动n个进程，名字命名为name

pm2 restart [name or id] 重启服务

pm2 start app.js --max_memory_restart 1024M 当内存超过1024M时自动重启。


pm2 stop [name or id] 结束进程

pm2 delete [name or id] 删除进程

pm2 delete all 删除所有进程/应用

pm2 stop all 结束所有进程

pm2 list 列出所有进程/应用

pm2 monit 对服务进行监控-查看进程/应用的资源消耗情况

pm2 describe [name or id] 查看某个进程/应用具体情况

```

### 高级用法

pm2配置文件启动

```
pm2 ecosystem 生成配置文件ecosystem.json

pm2 start Or Restart /file/path/ecosystem.json 通过配置文件启动服务

//ecosystem.json内容

  {
    /**
    * Application configuration section
    * http://pm2.keymetrics.io/docs/usage/application-declaration/
    * 多个服务，依次放到apps对应的数组里
    */
    apps : [
    // First application
        {
            name      : "nova",
            max_memory_restart: "300M",
            script    : "/root/nova/app.js",
            out_file : "/logs/nova_out.log",
            error_file : "/logs/nova_error.log",
            instances  : 4,
            exec_mode  : "cluster",
            env: {
                NODE_ENV: "production"
            }
        }
    ]
 }
```

## NRM

### 什么是nrm

nrm是一个npm源管理器，允许你快速的在npm源间切换。

npm默认情况下是使用npm官方源(使用npm config ls命令查看)，这个源不稳定，一般我们使用淘宝源：https://registry.npm.taobao.org/，修改源的方式也很简单

```
npm set registry https://registry.npm.taobao.org/
```
之后切换官方源，是不是比较麻烦？？所以有了nrm

#### nrm使用
```
//nrm安装
npm install -g nrm

//查看可选源
nrm ls

//查看当前使用源
nrm current

//切换源
/**
registry为源名，例如：nrm use taobao
**/
nrm use <registry>

//添加源
nrm add <registry> <url>
//例如：
nrm add cpm http://192.168.21.11:8888/repository


//删除源
nrm del <registry>

//测试源速度(响应时间)
nrm test <registry>

```

## NVM

### nvm是什么

nvm全名node.js version management,顾名思义是一个nodejs的版本管理工具。通过它可以安装和切换不同的nodejs版本。

### 下载
增加host
```
185.199.109.133 raw.githubusercontent.com
185.199.108.133 raw.githubusercontent.com
185.199.110.133 raw.githubusercontent.com
185.199.111.133 raw.githubusercontent.com
199.232.68.133 raw.githubusercontent.com
199.232.68.133 user-images.githubusercontent.com
199.232.68.133 avatars2.githubusercontent.com
199.232.68.133 avatars1.githubusercontent.com

// 官网
https://github.com/nvm-sh/nvm/blob/master/README.md?spm=a2c6h.24755359.0.0.15c27cbc4PqUmi

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
或
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

```
:::tip
由于公司内网限制？切换到手机热点安装成功
:::
### 使用
```
//查看本地安装的所有版本 可选参数available 显示所有可下载的版本
nvm list [available]

//安装
nvm install 11.13.0

//使用特定版本
nvm use 11.13.0

//卸载
nvm uninstall 11.13.0

// 修改默认版本
nvm alias default <version>  如： nvm alias default v11.1.0


nvm install stable #安装最新稳定版 node，现在是 5.0.0
nvm install 4.2.2 #安装 4.2.2 版本
nvm install 0.12.7 #安装 0.12.7 版本

# 特别说明：以下模块安装仅供演示说明，并非必须安装模块
nvm use 0 #切换至 0.12.7 版本
npm install -g mz-fis #安装 mz-fis 模块至全局目录，安装完成的路径是 /Users/<你的用户名>/.nvm/versions/node/v0.12.7/lib/mz-fis
nvm use 4 #切换至 4.2.2 版本
npm install -g react-native-cli #安装 react-native-cli 模块至全局目录，安装完成的路径是 /Users/<你的用户名>/.nvm/versions/node/v4.2.2/lib/react-native-cli

nvm alias default 0.12.7 #设置默认 node 版本为 0.12.7

//我们将nvm的安装镜像设置成国内镜像
export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node  

// nvm 删除
# nvm unload
rm -rf "$NVM_DIR"
```

:::tip
Mac M1 中，nvm install 可能会安装不了，报clang: error: no such file or directory: 'CXX=c++'错误

解决方案：在iTrem2 中输入

arch -x86_64 zsh
:::

https://blog.csdn.net/qq_33794441/article/details/114585457

https://github.com/hawtim/blog/issues/10

https://zhuanlan.zhihu.com/p/115450863

https://www.jianshu.com/p/27cd8ea20d7d

https://juejin.cn/post/6968639978242834468
## nodemon

nodemon是一种工具，可以自动检测到目录中的文件更改时通过重新启动应用程序来调试基于node.js的应用程序。

安装
```
npm install -g nodemon
//或
npm install --save-dev nodemon
```

使用

```
nodemon   ./main.js // 启动node服务
nodemon ./main.js localhost 6677 // 在本地6677端口启动node服务
"start": "ts-node -r tsconfig-paths/register nodemon src/main.ts",
```
延迟重启

```
nodemon -delay10 main.js

nodemon --delay 2.5 server.js

nodemon --delay 2500ms server.js
```

这个就类似于js函数中的函数节流,只在最后一次更改的文件往后延迟重启.避免了短时间多次重启的局面.


nodemon支持本地和全局配置文件。这些通常是命名的nodemon.json，可以位于当前工作目录或主目录中。可以使用该--config (file)选项指定备用本地配置文件。
```

{
  "verbose": true,
  "ignore": ["*.test.js", "fixtures/*"],
  "execMap": {
    "rb": "ruby",
    "pde": "processing --sketch={{pwd}} --run"
  }
}
```

## yzb-cli

> 开发node cli工具参考，感觉写的不错哦

[参考地址](https://www.npmjs.com/package/yzb-cli)


## cli-table

> 在cli中打印表格

[参考地址](https://www.npmjs.com/package/cli-table)



## 一、linux下chmod +x的意思

<span style="color:red">chmod +x的意思就是给文件执行权限</span>

LINUX下不同的文件类型有不同的颜色，

- 绿色文件： 可执行文件，可执行的程序  

- 红色文件：压缩文件或者包文件

- 蓝色文件：目录

- 白色文件：一般性文件，如文本文件，配置文件，源码文件等 

- 浅蓝色文件：链接文件，主要是使用ln命令建立的文件

- 红色闪烁：表示链接的文件有问题

- 黄色：表示设备文件

- 灰色：表示其他文件

[相关问题](!https://blog.csdn.net/xudailong_blog/article/details/82891506)

```
chmod u+x install.sh
```
## 二、postman

接口调试工具

## 三、node 模块

### ora

node命令行环境的loading、显示各种状态的图标等

### commander

命令行界面的完整解决方案，受Ruby Commander启发

**安装**
```
npm install commander --save
```
** Options解析**

使用.option()方法定义commander的选项options，也可以作为选项的文档。下面的示例讲解析来自process.argv的args和options，然后将剩下的参数(未定义的参数)赋值给commander对象的args属性(program.args)，program.args是一个数组。

```
#!/usr/bin/env node
var program = require('commander');

program
	.version('0.1.0')
    .options('-p,--peppers', 'Add peppers')
    .options('-P, --pineapple', 'Add pineapple')
    .options('-b, --bbq-sauce', 'Add bbq sauce')
    .options('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
    .parse(process.argv);
    
console.log('you ordered a pizza with:');
if(program.peppers) console.log('  --peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbqSauce) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);
// 执行
node index.js -pPbc hahah<br>
you ordered a pizza with:
  - peppers
  - pineapple
  - bbq
  - hahah cheese
```
栗子：
```
#!/usr/bin/env node

const program = require('commander')
program.version(require('../package').version)
program
    .command('init <name>')
    .description('init project')
    .action(
        require('../lib/init')
    )
program.parse(process.argv)

```
## 数据库工具

adminer--- Adminer是一个类似于phpMyAdmin的MySQL管理客户端

mongo express---基于Web的MongoDB管理界面

sequel pro 数据库工具

## rsync | scip文件同步命令使用
### scp
[docker将容器打包成镜像并传输到其他服务器部署](/back-end/Docker/#docker将容器打包成镜像并传输到其他服务器部署)
### rsync
```js
rsync -aq --password-file=/etc/rsync161.pas  /data2/xxx.com/upload/adsvideo/material/16981/人物进阶选择720X1280.mp4  asasa@106.xxxx::mysqlbackup/www/
```
需要在服务端B开启rsync服务器，并配置用户密码，同时密码在服务器A下也配置一份；同时路径别名，如上面的mysqlbackup代表/data/