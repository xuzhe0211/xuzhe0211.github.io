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

:::tip
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
## 使用

### 1. 安装Changesets
在项目中添加Changesets
```shell
npm install @changesets/cli -D
# 或者
yarn add @changesets/cli -D
```
初始化Changesets
```shell
npx changeset init
```
初始化成功后，会在项目根目录生成一个.changeset 文件夹，其中包含配置问价n
### 2. 创建Changeset
当你在项目中完成变更并需要记录时，可以使用以下命令创建一个变更集
```shell
npx changeset
```
系统会提示你

1. 选择要更新的包：如果是 monorepo 项目，Changesets 会列出所有包，你可以选择要更新的包。
2. 选择变更类型
  - major: 主版本更新(破坏性更改)
  - minor: 次版本更新(新增功能,向后兼容)
  - patch: 补丁版本更新(修复问题或小改动)

  然后回提示你输入一个简短的变更描述，例如：
  ```text
  Add support for new authentication methods.
  ```
  生成的变更集文件会存储在 .changeset文件夹中，例如：
  ```yml
  # Example .changeset/unique-id.md
  ---
  "your-package-name": minor
  ---

  Add support for new authentication methods.
  ```
### 3. 查看和修改Changeset配置
Changeset 的配置文件是 .changeset/config.json。它包含以下主要选项
```json
{
  "$schema": "https://unpkg.com/@changesets/config/schema.json",
  "changelog": "@changesets/changelog-github",
  "commit": true,
  "fixed": [],
  "linked": [],
  "access": "restricted",
  "baseBranch": "main",
  "updateInternalDependencies": "patch"
}
```
- changelog：生成变更日志策略，默认是 @changsets/changelog-github.
- commit: 是否在版本更新后自动提交代码
- baseBranch: 主分支名称(main/master)
- access: 设置发布的范围
  - public:发布为公开包
  - restricted:发布为私有包

### 4. 版本更新
完成变更记录后，可以更新版本号
```shell
npx changeset version
```
此命令会根据 .changeset 中的变更集文件，更新所有相关包的版本号和CHANGELOG.md
### 5. 发布到npm
执行一下命令发布到npm
```shell
npx changeset publish
```
该命令根据配置发布所有已更改的包

### 6. 自动化流程
Changesets通常会结合 CI/CD来实现自动化发布，以下是一个常见的配置
```yml
name: Release

on:
  push:
    branches:
      - main

jobs:
  release:
    name: Publish
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: "npm"

      - name: Install dependencies
        run: npm install

      - name: Create and publish release
        run: npx changeset publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```
### 7. 使用技巧
查看即将发布的变更
```shell
npx changeset status
```



## 原文
[changesets](https://peiyanlu.gitee.io/vite-press/frontend/npm/changesets)