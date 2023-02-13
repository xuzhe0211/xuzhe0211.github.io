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
## 暂存（Staging）
### 我需要把暂存的内容添加到上一次的提交（commit）
```js
(my-branch)$ git commit --amend
```
### 我想要暂存一个新文件的一部分，而不是这个文件的全部
一般来说，如果你想要暂存一个文件的一部分，你可以这样做
```js
$ git add --patch filename.x
```
-p 简写。这会打开交互模式，你将能够用s选项来分割提交(commit)；然而，如果这个文件是新的，会没有这个选择，添加一个新文件时候，这样做
```js
$ git add -N filename.x
```
然后, 你需要用 e 选项来手动选择需要添加的行，执行 git diff --cached 将会显示哪些行暂存了哪些行只是保存在本地了

### 我想把在一个文件里的变化(changes)加到两个提交(commit)里
git add 会把整个文件加入到一个提交。git add -p允许交互式的选择你想要提交的部分。

### 我想把暂存的内容变成未暂存，把未暂存的内容暂存起来
多数情况下，你应该将所有的内容变为未暂存，然后在选择你想要的内容进行commit

但假定你就是想要这么做，这里你可以创建一个临时的commit来保存你已暂存的内容，然后暂存你的未暂存的内容并惊醒stash。然后reset最后一个commit将原本暂存的内容变为未暂存，最后stach pop回来。
```js
$ git commit -m 'WIP';
$ git add .
$ git stash
$ git reset HEAD^
$ git stach pop --index 0
```
- 注意1：这里使用pop仅仅是因为想尽可能保持幂等
- 注意2: 假如你不加上--index你会把暂存的文件标记为存储

## 未暂存(Unstaged)的内容

### 我想把未暂存的内容移动到一个新分支
```js
$ git checkout -b my-branch
```
### 我想把未暂存的内容移动到另一个已存在的分支
```js
$ git stach
$ git checkout my-branch
$ git stash pop
```
### 我想丢弃本地未提交的变化(uncommitted changes)
如果你只是想重置源(origin)和你本地(local)之间的一些提交(commit)，你可以
```js
# one commit
(my-branch)$ git reset --hard HEAD^
# two commits
(my-branch)$ git reset --hard HEAD^^
# four commits
(my-branch)$ git reset --hard HEAD~4
# or
(main)$ git checkout -f
```
重置某个特殊的文件，你可以用文件名作为参数
```js
$git reset filename
```
### 我想丢弃某些未暂存的内容
如果你想丢弃工作拷贝中一部分内容，而不是全部。

签出(checkout)不需要的内容，保留需要的
```js
$ git checkout -p 
# Anser y to all of the snippets you want to drop
```
另外一个方法是使用stash,Stash所有要保留下的内容，重置工作拷贝，重新应用保留的部分
```js
$ git stash -p
# Select all of the snippets you want to save
$ git reset --hard
$ git stash pop
```
或者，stash你需要的部分，然后stash drop。
```js
$ git stash -p
# Select all of the snippets you don't want to save
$ git stash drop
```
## 分支(Branches)
### 我从错误的分支拉去了内容，或把内容拉取到了错误的分支
这是另外一种使用 git reflog 情况，找到在这次错误拉(pull)之前HEAD指向
```js
(main)$ git relog
ab7555f HEAD@{0}: pull origin wrong-branch: Fast-forward
c5bc55a HEAD@{1}: checkout: checkout message goes here
```
重置分支到你需的提交
```js
$ git reset --hard c5bc55a
```

### 我想扔掉本地的提交(commit)，以便我的分支与远程的保持一致
先确认你没有推(push)你的内容到远程

git status会显示你领先(ahead)源(origin)多少个提交
```js
(my-branch)$ git status
# On branch my-branch
# On branch my-branch
# Your branch is ahead of 'origin/my-branch' by 2 commits.
#   (use "git push" to publish your local commits)
```
一种方法是：
```js
(main)$ git reset --hard origin/my-branch
```
### 我需要提交到一个新分支，但错误的提交到了main
在main下创建一个新分支，不切换到新分支，仍在main下
```js
(main)$ git branch my-branch
```
把mian分支重置到前一个提交
```js
(mian)$ git reset --hard HEAD^
```
HEAD^ 是 HEAD^1 的简写，你可以通过指定要设置的HEAD来进一步重置。

或者，如果你不想使用 HEAD^, 找到你想重置到的提交(commit)的hash(git log 能够完成)，然后重置到这个hash。使用git push 同步内容到远程。

例如，main分支想要重置到的提交的hash为a13b85e
```js
(main)$ git reset --hard a13b85e
HEAD is now at a13b85e
```
签出(checkout)刚才新建的分支继续工作
```js
(main)$ git checkout my-branch
```
### 我想保留来自另外一个ref-ish的整个文件




## 资料
[45个Git经典操作场景](https://blog.csdn.net/xinzhifu1/article/details/123271097)