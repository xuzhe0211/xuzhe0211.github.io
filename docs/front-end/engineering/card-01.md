---
autoGroup-12: 工程化知识卡片
title:  发包篇之版本号与 semver
---

semver,Semantic Versioning语义化版本的缩写，文件可见[semver.org/](https://semver.org/),它由[major, minor, patch]三部分组成

- major:当你发了一个包有Breaking Change的API
- minor:当你新增了一个向后兼容的功能时
- pathc: 当你修复了一个向后兼容的Bug时

假设你的版本库有一个函数
```js
// 假设原函数
export const sum = (x: number, y: number): number => x + y;

// Patch Version 修复小的bug
export const sum = (x: number, y: number): number => x + y

// Minor Version 向后兼容
export const sum = (...rest: number[]): number => rest.reduce((s, x) => s + x, 0);

// Marjor Version,出现Breaking Change
export const sum = () => {}
```
对于~1.2.3而言，它的版本号范围是>=1.2.3 < 1.3.0

对于^1.2.3而言，它的版本号范围是>=1.2.3 < 2.0.0

当我们npm i 时，默认的版本号是^,可最大限度的向后兼容与新特性之间取舍，但是有些库可能不遵循该规则，我们在项目时应该使用yarn.lock/package-lock.json所以版本号

我们看看package-lock的工作流程

1. npm i webpack， 此时下载最新webpack版本5.58.2，在package.json中显示为webpack: ^5.58.2，版本号范围是>=5.58.2 < 6.0.0

2. 在package-lock.json中全局搜索webpack，发现webpack的版本是被锁定的，也就是说他是确定的webpack:5.58.2

3. 经过一个月后，webpack的最新版本为5.100.0，但由于webpack的版本在package-lock.json锁死，每次上线时让然下载5.58.2版本号

4. 经过一年后，webpack 最新版本为 6.0.0，但由于 webpack 版本在 package-lock.json 中锁死，且 package.json 中 webpack 版本号为 ^5.58.2，与 package-lock.json 中为一致的版本范围。每次上线时仍然下载 5.58.2 版本号

5. 支线剧情：经过一年后，webpack 最新版本为 6.0.0，需要进行升级，此时手动改写 package.json 中 webpack 版本号为 ^6.0.0，与 package-lock.json 中不是一致的版本范围。此时 npm i 将下载 6.0.0 最新版本号，并重写 package-lock.json 中锁定的版本号为 6.0.0


## 资料
[发包篇之版本号与 semver](https://juejin.cn/post/7025606860300353566)