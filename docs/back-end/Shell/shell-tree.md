---
title: 关于 shell 中的 tree 命令
---
关于shell中的tree命令，它可以以树形结构显示指定目录下的文件和子目录

tree命令的基本语法结构如下
```js
tree [选项] [目录]
```
例如，在终端中执行以下命令，将以树形结构显示当前目录及其子目录下的所有文件和子目录：

```shell
tree
```
如果想要指定目录，则可以在命令后面加上目录路径，例如：
```shell
tree /usr/local/bin
```
tree 命令还支持一些常用选项，如下所示：

- -a: 显示所有文件和目录（包括隐藏文件）。
- -I pattern: 不显示符合 pattern 匹配模式的文件或目录。
- -f: 显示完整的文件路径。
- -d: 只显示目录。
例如，下面的命令将只显示当前目录及其子目录下的所有目录：
```js
tree -d
```