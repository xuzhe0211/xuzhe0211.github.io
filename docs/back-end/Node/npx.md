---
title: NPX
---
Node自带npm模块，所以可以直接使用npx命令。万一不能使用，就需要手动安装一下
```js
$ npm install -g npx
```
## 调用项目安装的模块
<span style="color: red">**npx想要解决的主要问题，就是调用项目内部安装的模块。**</span>比如，项目内部安装了测试工具Mocha

```js
$ npm install -D mocha
```
一般来说，调用Mocha，只能在项目脚本和package.json的scripts字段里面，如果想在命令行下调用，必须想下面这样
```js
# 项目的根目录下执行
$ node_modules/.bin/mocha --version
```
<span style="color: red">npx就是想解决这个问题，让项目内部安装的模块用起来更方面，只要像下面这样调用就行了</span>

```js
$ npx mocha --version
```
<span style="color: red">npx的原理很简单，就是运行的时候，会到node_module/.bin路径和环境变量$PATH里面，检查是否存在</span>

<span style="color: red">由于npx会检查环境变量$PATH，所以系统命令也可以调用</span>
```js
# 等同于ls
$ npx ls
```
> 注意，Bash内置的命令不在$PATH里面，所以不能用。比如，cd是Bash命令，因此不能用npx cd

## 避免全局安装模块
除了调用项目内部模块，npx还能避免全局安装的模块。比如，create-react-app这个模块是全局安装，npx可以运行它，而且不进行全局安装
```js
$ npx create-react-app my-react-app
```
<span style="color:red">上面代码运行时，npx将create-react-app下载到一个临时目录，使用以后在删除。</span>所以，以后再次执行上面的命令，会重新下载create-react-app

下载全局模块时，npm允许指定版本
```js
$ npx uglify-js#3.1.0 main.js -o ./dist/main.js
```
上面代码指定使用3.1.0版本的 uglify-js 压缩版本

> 注意，只要npx后面的模块无法在本地发现，就会下载同名模块。比如，本地没有安装 http-server 模块，下面的命令会自动下载该模块，在当前目录启动一个Web服务

```js
$ npx http-server
```
### --no-install 参数和 --ignore-existing参数
<span style="color: red">如果想让npx强制使用本地模块，不下载远程模块，可以使用 --no-install 参数</span>。如果本地不存在该模块，就会报错
```js
$ npx --no-install http-server
```

<span style="color: red">反过来,如果忽略本地的同名模块，强制安装使用远程模块，可以使用 --ignore-existing 参数。</span>比如，本地已经全局安装了 create-react-app， 但是还是想使用远程模块，就用这个参数
```js
$ npx --ignore-existing create-react-app my-react-app
```

## 使用不同版本的node
<span style="color: red">利用npx可以下载模块这个特点，可以指定某个版本的Node运行脚本</span>。它的窍门就是使用npm的 node模块

```js
$ npx node@0.12.8 -v
v0.12.8
```

上面命令会使用0.12.8版本的Node执行脚本。<span style="color: red">原理是从npm下载这个版本的node,使用后在删除掉</span>

**某些场景下，这个方法用来切换Node版本，要比nvm那样的版本管理器方便一些**


## 资料
[NPX](https://www.ruanyifeng.com/blog/2019/02/npx.html)  

[npx简介](https://zhuanlan.zhihu.com/p/269419296)