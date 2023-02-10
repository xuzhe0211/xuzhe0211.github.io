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
这会打开你的默认编辑器，在这里你可以编辑信息。另一方面，你也可以用一条命令一次完成
```js
$ git commit --amend --only -m 'xxxxxx'
```
如果你已经push了这次提交(commit)，你可以修改这提交(commit)然后强推(force push)，但是不推荐这么做。

## 我提交(commit)里的用户名和邮箱不对
如果这只是单个提交(commit)，修改它
```js
$ git commit --amend --author "New Authorname <authoremail@mydomain.com>"
```
如果你需要修改所有历史，参考'git filter-branch'的指南页

## 我想从一个提交(commit)里移除一个文件
通过下面的方法，从一个提交(commit)里移除一个文件:
```js
$ git checkout HEAD^ myfile
$ git add -A
$ git commit --amend
```
这将非常有用，当你有一个开放的补丁(open patch)，你往上面提交了一个不必要的文件，你需要强推(force push)去更新这个远程补丁

## 我想删除我的最后一次提交
如果你需要删除推了的提交(pushed commits),你可以使用下面的方法。可是，这会不可逆的改变你的历史，也会搞乱哪些已经从该仓库拉取(pulled)了的人的历史。简而言之，如果你不是很确定，千万不要这么做。
```js
$ git reset HEAD^ --hard
$ git push -f [remote] [breach]
```
如果你还没有推到远程，把git重置(reset)到你最后一次提交前的状态就可以了（同时保存暂存的变化）：
```js
$ git reset --soft  HEAD@{1}
```
这至少能在没有推送之前有用，如果你已经推了，唯一安全能做的是 git revert SHAofBadCommit,呐会创建一个新的提交(commit)用于撤销前一个提交的所有变化(changes)；或者，如果你推的这个分支是rebase-safe的(例如：其他开发者不会从这个分支啦)，只需要使用git push -f

## 删除任意提交(commit)
同样的警告:不到万不得已的时候不要这么做
```js
$ git rebase --onto SHA1_OF_BAD_COMMIT^ SHA1_OF_COMMIT
$ git push -f [remote] [branch]
```
或者做一个 交互式rebase 删除那些你想要删除的提交(commit)里所对应的行

## 我尝试推一个修正后的提交(amended commit)到远程，但是报错
```
To https://github.com/yourusername/repo.git
! [rejected]        mybranch -> mybranch (non-fast-forward)
error: failed to push some refs to 'https://github.com/tanay1337/webmaker.org.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```
注意，rebasing(见下面)和修正(amending)会用一个新的提交(commit)代替旧的，所以如果你之前你已经往远程仓库上推过一次修正前的提交(commit)，那你现在就必须强推(force push)(-f)。注意--总是确保你指明一个分支！
```js
(my-branch)$ git push origin mybranch -f
```
一般来说，要**避免强推**.最好是创建和推(push)一个新的提交(commit)，而不是强推一个修正后的提交。后者会使那些与该分支或该分支的子分支工作的开发者，在源历史中产生冲突。

## 我意外做了一次硬重置(hard reset),我想找回我的内容
如果你意外的做了 git reset --hard,你通常能找回你的提交(commit)，因为Git对每件事都会有日志，且都会保存几天
```js
(main)$ git reflog
```
你将会看到一个你过去提交(commit)的列表，和一哥重置的提交。选择你要回到的提交的SHA，在重置一次：
```js
(main)$ git reseet --hard SHA1234
```
---
> 暂存（Staging）
## 我需要把暂存的内容添加到上一次的提交（commit）
```js
(my-branch)$ git commit --amend
```
## 我想要暂存一个新文件的一部分，而不是这个文件的全部
一般来说，如果你想要暂存一个文件的一部分，你可以这样做
```js
$ git add --patch filename.x
```
-p 简写。这会打开交互模式，你将能够用s选项来分割提交(commit)；然而，如果这个文件是新的，会没有这个选择，添加一个新文件时候，这样做
```js
$ git add -N filename.x
```
然后，你需要用e选项来手动选择需要添加的行，执行git diff --cached 将会显示哪些行暂存了哪些行只会保存在本地了。

## 

## 资料
[45个Git经典操作场景](https://blog.csdn.net/xinzhifu1/article/details/123271097)