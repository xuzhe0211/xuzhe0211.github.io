---
autoGroup-4: Monorepo
title: pnpm、lerna+yarn如何选择
---

## 前言

[pnpm地址](https://github.com/pnpm/pnpm)

[lerna](https://github.com/lerna/lerna)

主流的包管理工具有pnpm、npm、yarn、lerna

### 什么是lerna
Lerna是一个管理多个npm模块的工具,是Babel自己用来维护自己的Monorepo并开源出的一个项目。优化维护多包的工作流，解决多个包互相依赖，且发布需要手动维护多个包的问题，可以优化使用git和npm管理夺宝存储库的工作流程。

### pnpm有哪些特点
- 速度快

    绝大多数场景下，速度会比npm/yarn快2-3倍

- 高效利用磁盘空间

    内部文件node_modules是从单个可寻址内容的存储连接的

- 支持monorepo

    用一个git仓库来管理多个子项目package

- 严格

    程序包只能访问其中指定的依赖项package.json

- 确定性

    一个名为的锁定文件pnpm-lock.yaml

## lerna
lerna默认将软件包列表初始化为['package/*'],如下所示:
```
录结构如下:

packages/
├── foo-pkg
│   └── package.json
├── bar-pkg
│   └── package.json
├── baz-pkg
│   └── package.json
└── qux-pkg
    └── package.json
```
### 安装lerna
由于lerna会经常使用到，所以这里可以采用全局安装
```
npm i -g lerna
```
### 初始化项目
```
lerna init
```
初始化项目后，我们可以看到package.json & lerna.json如下所示
```
// package.json
{
    "name": "root",
    "provate": true, // 私有的，不会被发布，是管理整个项目，与要发布到的npm的解耦
    "devDependencies": {
        "lerna": '^3.15.0'
    }
}

// lerna.json
{
    "packages": [
        "package/*"
    ], 
    "version": "0.0.0"
}
```
### 创建npm包
增加两个包@mo-demo/cli @mo-demo/cli-shared-utils
```
lerna create @mo-demo/cli
lerna create @mo-demo/cli-shared-utils
```
### 增加模块依赖
分别给相应的package增加依赖模块
```
lerna add chalk // 为所有package增加chalk模块
lerna add semver --scope @mo-demo/cli-shared-utils // 为@mo-demo/cli-shared-utils增加semver模块
lerna add @mo-demo/cli-shared-utils --scope @mmo-demo/cli // 增加内部模块之间的依赖
```

### 发布
```
lerna publish
```

### 依赖包管理
我们使用--hoist来把每个package下的依赖包都提升到工程根目录，来降低安装以及管理的成本
```
lerna bootstrap --hoist
```
为了省去每次都输入hoist参数的麻烦，可以在lerna.json配置
```
{
  "packages": [
    "packages/*"
  ],
  "command": {
    "bootstrap": {
      "hoist": true
    }
  },
  "version": "0.0.1-alpha.0"
}
```
清理之前的安装包，可以使用如下命令
```
lerna clean
```
目前业界有很多团队采用的monorepo解决方案是lerna和yarn的workspaces特性，基于lerna和yarn workspace的monorepo工作流，一般具有以下功能
- 完善的工作流
- typescript支持
- 风格统一的编码
- 完整的单元测试
- 一键式的发布机制
- 完美的更新日志

## pnpm
常见的目录结构如下
```
node_modules
├─ foo
|  ├─ index.js
|  └─ package.json
└─ bar
   ├─ index.js
   └─ package.json
```

### 简介

pnpm是一种新起的包管理器，从npm下载量看，目前还没有超过yarn，但它的实现方式值得主流包管理器学习

::: tip
1. 目前，安装效率高于npm和yarn的最新版
2. 极其简介的node_modules目录
3. 避免了开发时使用简介依赖的问题
4. 能极大的降低磁盘空间的占用
:::

### 安装和使用
使用pnpm代替npm/Yarn，顺便用pnpx代替npx 命令如下

```
npm install -g pnpm

pnpm install

pnpx create-react-app my-cool-new-app
```

之后在使用时，只需要把npm替换成pnpm即可。

如果要执行安装在本地的CLI,可以使用pnpx，它和npx的功能完全一样，唯一不同的是，在使用pnpx执行一个需要安装的命令时，会使用pnpm进行安装。

比如npx mocha执行本地mocha命令时，如果mocha没有安装，则npx会自动的、临时的安装mocha，安装好后，自动运行mocha命令

### pnpm原理

1. 同 yarn 和 npm 一样，pnpm 仍然使用缓存来保存已经安装过的包，以及使用 pnpm-lock.yaml 来记录详细的依赖版本。

2. 不同于 yarn 和 npm， pnpm 使用**符号链接和硬链接**（可将它们想象成快捷方式）的做法来放置依赖，从而规避了从缓存中拷贝文件的时间，使得安装和卸载的速度更快。

3. 由于使用了**符号链接和硬链接**，pnpm可以规避windows操作系统路径过长的问题，因此，它选择使用树形的依赖结果，有着几乎完美的依赖管理。也因为如此，项目中只能使用直接依赖，而不能使用间接依赖。

### pnpm更新包
monorepo项目中可以通过--filter来指定package，进而更新包

### pnpm移除依赖
monorepo项目中将包从node_modules和pageage.json中移除，如下
```
pnpm uninstall xxx --filter package-a
```

### pnpm硬连接项目
```
pnpm link ../xxxx
```

## 注意事项
由于 pnpm 会改动 node_modules 目录结构，使得每个包只能使用直接依赖，而不能使用间接依赖，因此，如果使用 pnpm 安装的包中包含间接依赖，则会出现问题(**现在不会了，除非使用了绝对路径**)。

由于 pnpm 超高的安装卸载效率，越来越多的包开始修正之前的间接依赖代码。


我们可以使用pnpm、vite构建工具来实践一下，可以拿vue3、react17弄个demo试试。

pnpm可能不是适用于所有项目或所有堆栈的正确工具，但是如果我们想尝试解决的monorepo相同的问题，我们可以考虑将其作为替代方法



## 资料
[pnpm、lerna+yarn如何选择](https://jishuin.proginn.com/p/763bfbd56d14)

[lerna使用指南](https://www.jianshu.com/p/db3ee301af47)

[lerna入门](https://blog.csdn.net/weixin_42278979/article/details/118458638)

[使用 pnpm 构建 Monorepo 项目](https://zhuanlan.zhihu.com/p/373935751)

[vue3-rollup打包](https://www.jianshu.com/p/3c49f2420f45)