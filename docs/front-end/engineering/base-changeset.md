---
autoGroup-0: 基础
title: 依赖包-changesets
---
changesets 主要关心 monorepo 项目下子项目版本的更新、changelog文件生成、包的发布
```shell
pnpm add @changesets/cli -D
```
特点
- 在开发时，需要开发者提供本次变更涉及的包名称、升级版本类型(patch、minor、major)及变更信息，即changeset.
- 在发布版本时,会根据changeset自动升级对应包的版本很骄傲，并在对应包中生成 Changelog 信息
- 在 Monorepo 场景中，changeset 会自动生成仓库依赖图，升级时只会升级变更包及相关依赖包的版本号

## 初始化
执行 changeset init,在项目根目录下生成生成一个 .changeset目录，里面会生成一个 changeset 的 config 文件

```js
{
  "$schema": "https://unpkg.com/@changesets/config@2.3.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "restricted",
  "baseBranch": "master",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```
- commit: 为true时，在执行change和version命令，将自动执行提交代码操作
- fixed: 用于monorepo 中对包进行分组，相同分组中的包版本号将进行绑定，每次执行verison命令时，同一分组中的包只要有一个升级版本号，其他会一起升级。支持使用正则包名称

    ```
    "fixed": [["@zyb/poly-ui", "@zyb/site"]],
    ```
- linked: 和fixed类似，也是对monorepo中对包进行分组，但是每次执行 verison 命令时，只有和 changeset声明的变更相关的包才会升级版本号，同一分组的变更包的版本号将会保持一致。支持使用正则匹配包名称
- access: 如果配置为 restricted，将作为私有包发布，如果为 public，则发布公共范围包。

:::tips
对于仓库中存在部分包需要配置 access，可以在 package.json 中配置 publishConfig，例如：
```js
{
  "publishConfig": {
    "registry": "https://registry.npmjs.org/",
    "access": "public"
  }
}

```
:::



## 原文
[changesets](https://peiyanlu.gitee.io/vite-press/frontend/npm/changesets)