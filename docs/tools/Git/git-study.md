---
title: 45个Git经典操作场景
---
git对于大家应该都不太陌生，熟练使用git已经成为程序员的一项基本技能，尽管在工作中有诸如 Sourcetree这样牛X的客户端工具，使得合并代码变的很方便。但找工作面试和一些需彰显个人实力的场景，仍然需要我们掌握足够多的git命令。

下边我们整理了45个日常用git合代码的经典操作场景，基本覆盖了工作中的需求。

## 我刚才提交了什么？
如果你用git commit -a 提交了一次变化(changes)，而你又不确定到底这次提交了哪些内容。你就可以用下面的命令显示当前HEAD上的最近一次的提交(commit)
```js
$ git show
// 或者
$ git log -n1 -p
```
## 我的提交信息(commit message)写错了
如果你的提交信息(commit message)写错了且这次提交还没有推，你可以通过下面的方法来修改提交信息(commit message)
```js
$ git commit --amend --only
```
