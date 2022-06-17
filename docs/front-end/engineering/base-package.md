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
## 资料
[原文](https://mp.weixin.qq.com/s/i8Hh0nUp3J7MXJ-zl-57Ng)