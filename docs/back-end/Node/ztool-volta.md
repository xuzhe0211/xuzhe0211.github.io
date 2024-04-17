---
title: 比 nvm 更好用的 node 版本管理工具
---
## 什么是Volta
Volta 是一种管理Javascript命令行工具的便捷方式

volta的特点
- 速度
- 无缝，每个项目的版本切换
- 跨平台支持，包括windows和所有Unix shell
- 支持多个包管理器
- 稳定的工具暗转-无需每次升级都要重新安装
- 可扩展性挂钩用于特定于站点的定制

## 为什么选择Volta?
使用Volta，你可以一次选择Node引擎，然后不在担心它。你可以在项目之间切换，而不必手动切换Nodejs版本。你可以在工具链中安装npm二进制包，而不必定期重新安装他们，或者弄清楚他们停止工作的原因

### 快速设置和切换Node版本
获取并使用特定版本的Node
```js
volta install node@14
```
您应该立即注意到该工具的响应速度有多快。您的开发时间是宝贵的 JavaScript 开发人员应该拥有时髦的工具。

### 为合作和提供可复制的环境
Volta允许你用一个命令为一个项目选择节点引擎和包管理器
```js
volta pin node@12
```
Volta将Node引擎的准备版本保存在package.json，这样你就可以把你的选择提交给git，从那时起，每次在项目目录运行 Node 时，Volta都会自动切换到你选择的同一版的Node。类似的，所有的合作者都可以通过在他们的开发机上安装 Volta来做相同的事情

### Install and forget
Volta还允许您将最喜欢的二进制包作为命令行工具安装，而不必担心他们会噶绕您的开发项目。更好的是，这些工具在安装时被固定到特定的Node引擎上，除非你显式的告诉它们。否则它们不会更改。这意味着一旦一个工具工作了，它就会继续工作

```js
npm install -g surge
surge -h
```
## 安装Volta

```shell
curl https://get.volta.sh | bash
```



[ 比 nvm 更好用的 node 版本管理工具](https://juejin.cn/post/7275608678828916755)