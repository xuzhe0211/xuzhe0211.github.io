---
# autoGroup-0: 数组方法
title: 开发工具
--- 

## linux
- 查看内存使用情况，以MB为单位

    ```js
    free -m 
    ```
- 查看内存使用情况，以GB为单位

    ```js
    free -g
    ```

- 查看磁盘使用情况，以GB为单位

    ```js
    df -h
    ```
- 查看当前目录大小(-h表示人性化表示，-s只显示总量，不显示子目录)

    ```js
    du -sh
    ```
- 查看当前目录的子目录或文件大小

    ```js
    du -sh `ls`
    ```
- 查看用户mysql运行的进程

    ```js
    ps -u mysql
    ```
- 查看非root运行的进程

    ```js
    ps -U root -u root -N
    ```

## brew安装

::: tip
[安装地址](https://zhuanlan.zhihu.com/p/111014448)
选择自动安装
:::

## Paintbrush
Paintbrush 画图工具

## chrome设置

::: tip
chrome://chrome-urls/    设置列表

chrome://media-engagement/  播放器策略查询

chrome://version/  版本

chrome://flags/
:::

## tig
tig 的几个主要用法

1. 显示 repo 的更新日志：tig log

2. git 文件中使用正则匹配搜索 tig grep config

3. 显示 git repo 的状态： tig status

更多其他 tig 命令：

tig -h

在tig中查看某个文件的历史，你可以使用以下命令
```js
tig blame <文件名>
```
这将以tig的方式打开一个文件的历史视图,显示每一行嗲吗的作者和提交信息

另外,你也可以使用以下命令查看某个文件的提交历史
```js
tig log -- <文件路径>
```
这将以 tig 的方式打开提交历史视图，只显示与指定文件相关的提交记录。

请注意，使用 tig 命令查看文件历史需要在终端中运行，并且你的系统中需要安装 tig 工具。如果尚未安装 tig，你可以通过包管理器（如 apt、brew、choco）或从 tig 的官方网站下载并安装它。

同时，请确保你在终端中处于要查看历史的仓库目录下，这样 tig 才能正确地获取仓库信息并显示文件历史。


[如何使用 Tig 浏览 Git 日志](https://linux.cn/article-11069-1.html)

## mock 
yapi