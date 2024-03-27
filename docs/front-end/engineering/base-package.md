---
autoGroup-0: 基础
title: 如何统一前端项目的Node版本和包管理器
---
## 开发环境
1. Node.js
2. Package Manager(npm、yarn、pnpm)
## 痛点问题
成员机器Node.js版本不统一：守旧派用12.X、保守用14.X、激进用17.X。项目能否正常跑起来全凭天意，在没有CICD流水线加持本地npm run build的场景下线上风险可想而知。

有人习惯用npm、有人习惯用yarn,代码库里面经常会存在package-lock.json、yarn.lock文件同时存在的情况。更痛的点还是各种奇奇怪怪的问题排查起来没有头绪。

我们要做的就是将问题掐死在源头:<span style="color: blue">锁定Node.js版本和包管理器</span>

## 锁定Node版本
通过在package.json中指定engines字段，可限定项目使用的node版本。下面配置仅允许用户使用14或者16的版本。更多的配置可以参考package.json | npm Docs、semver
```js
//package.json
"engines": {
    "node": "14.x || 16.x"
}
```
配置之后你会发现，该字段只对yarn生效。那如何对npm也生效呢？在项目根目录下的.npmrc文件中增加如下配置
```js
//.npmrc
engine-strict = true
```
上面配置完成后，npm install试试吧，错误的Node.js将直接退出

## 锁定包管理器
利用only-allow工具包、npm scripts快速实现锁定

1. 在项目中npm install -D only-allow
2. 在package.json文件中进行配置scripts.preinstall，允许输入的值only-allow npm、only-allow pnpm、only-allow yarn
```js
// package.json
"scripts": {
    "preinstall": "only-allow npm"
}
```
以上配置完成后，可以在乱用(yarn、npm、pnpm)试试


## 使用.npmrc文件
原来engines只是建议，默认不开启严格版本校验，只会给出提示，需要手动开启严格模式。在根目录下.npmrc添加 engine-strict = true 才会起作用。配置完成后再执行 npm install:
```shell
# .npmrc
engine-strict = true



npm ERR! code ENOTSUP
npm ERR! notsup Unsupported engine for react_antd_admin_template@1.0.0: wanted: {"node":"14.17.5","npm":"6.14.14"} (current: {"node":"16.18.1","npm":"8.19.2"})
npm ERR! notsup Not compatible with your version of node/npm: react_antd_admin_template@1.0.0
npm ERR! notsup Not compatible with your version of node/npm: react_antd_admin_template@1.0.0
npm ERR! notsup Required: {"node":"14.17.5","npm":"6.14.14"}
npm ERR! notsup Actual:   {"node":"16.18.1","npm":"8.19.2"}
```
此时通过npm安装，限制Node版本便起作用了

## 使用.nvmrc文件
通过上面的方式，可以做到让大家使用相同的Node版本，但每次提示版本不符合，需要开发人员到package.json中查看版本号，然后在使用nvm切换到指定版本，太麻烦了，高效开发不是怎么干的，

可以创建一个.nvmrc文件，指定项目Node版本

```shell
# .nvmrc
v14.17.5
```

此时，执行 nvm use 祖东就切换到项目执行的Node版本

.nvmrc文件是一个存放指定 Node 版本的配置文件，可以告诉项目的成员应该使用哪个Node 版本来运行项目。

如果我们没有安装对应版本的 Node ，执行时也会提示没有安装



## 资料
[原文](https://mp.weixin.qq.com/s/i8Hh0nUp3J7MXJ-zl-57Ng)