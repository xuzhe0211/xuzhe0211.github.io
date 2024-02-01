---
autoGroup-0: 常用
title: 17个有用的CLI命令，作为前端工程师，你需要知道一下
---
## tree
它在显示文件之间的目录关系方面做的很好
```js
commands
├── a.js
├── b.js
├── c.js
├── copy-apps
│   └── fe-apps
│       └── a.js
├── fe-apps
│   └── a.js
├── test.log
└── xxx
    └── yyy
```
在此之前，您需要安装命令树。

```shell
brew install tree
```
然后只需在文件目中执行tree即可

## wc 
wc 是 word count 的缩写,常用于文件统计。它可以统计字数、行数、字符数、字节数等。

我经常用它来计算文件中的代码行数

```
wc -l ./**/*.*
```
## du
打印出一个目录的文件大小的信息。我们使用它的频率较低，但它是一个非常值得学习的命令

- du -h: 打印出适合人类阅读的信息。
- du -a: 列出目录中文件大小的信息。
- du -s: 只显示总大小，不显示具体信息

```shell
$ commands git:(master) ✗ du
0  ./xxx/yyy
0  ./xxx
0  ./fe-apps
0  ./copy-apps/fe-apps
0  ./copy-apps
0  ./.git/objects/pack
0  ./.git/objects/info
0  ./.git/objects
8  ./.git/info
104  ./.git/hooks
0  ./.git/refs/heads
0  ./.git/refs/tags
0  ./.git/refs
136  ./.git
168  .
```

```shell
$ commands git:(master) ✗ du -h
  0B  ./xxx/yyy
  0B  ./xxx
  0B  ./fe-apps
  0B  ./copy-apps/fe-apps
  0B  ./copy-apps
  0B  ./.git/objects/pack
  0B  ./.git/objects/info
  0B  ./.git/objects
4.0K  ./.git/info
 52K  ./.git/hooks
  0B  ./.git/refs/heads
  0B  ./.git/refs/tags
  0B  ./.git/refs
 68K  ./.git
 84K  .
```

```shell
$ commands git:(master) ✗ du -ha
4.0K  ./a.js
  0B  ./xxx/yyy
  0B  ./xxx
  0B  ./fe-apps/a.js
  0B  ./fe-apps
4.0K  ./test.log
  0B  ./copy-apps/fe-apps/a.js
  0B  ./copy-apps/fe-apps
  0B  ./copy-apps
4.0K  ./c.js
4.0K  ./.git/config
  0B  ./.git/objects/pack
  0B  ./.git/objects/info
  0B  ./.git/objects
4.0K  ./.git/HEAD
4.0K  ./.git/info/exclude
4.0K  ./.git/info
4.0K  ./.git/description
4.0K  ./.git/hooks/commit-msg.sample
8.0K  ./.git/hooks/pre-rebase.sample
4.0K  ./.git/hooks/pre-commit.sample
4.0K  ./.git/hooks/applypatch-msg.sample
4.0K  ./.git/hooks/fsmonitor-watchman.sample
4.0K  ./.git/hooks/pre-receive.sample
4.0K  ./.git/hooks/prepare-commit-msg.sample
4.0K  ./.git/hooks/post-update.sample
4.0K  ./.git/hooks/pre-merge-commit.sample
4.0K  ./.git/hooks/pre-applypatch.sample
4.0K  ./.git/hooks/pre-push.sample
4.0K  ./.git/hooks/update.sample
 52K  ./.git/hooks
  0B  ./.git/refs/heads
  0B  ./.git/refs/tags
  0B  ./.git/refs
 68K  ./.git
4.0K  ./b.js
 84K  .
```

```shell
du -sh
```

## alias
alias 命令用于设置命令的别名。如果您仅键入别名，将列出所有当前别名设置

让我们尝试为git status 设置一个别名

```shell
alias gs="git status"
```

值得注意的是：如果你想让gs命令永久存在，你应该在.profile或.zshrc中设置它。

## grep
我们经常需要查找服务器上日志文件的内容,grep将是我们得心应手的帮手。

有一个日志文件test.log。它包含以下内容
```js
const a = 1;
const b = 2;
const c = 3;

console.log(a + b + c)
```
<span style="color: red">如何突出显示a字符的位置？很容易不是吗</span>

```shell
grep a test.log
```

## cat
cat 的主要用于是查看文件的内容并将其打印在屏幕上。

但它至少还有一些其他用途

1. 清除a.js的内容

    ```js
    $ cat a.js
    $ cat /dev/null > a.js
    $ cat a.js
    ```
2. 将a.js的内容复制到b.js

    ```js
    $ cat a.js
    $ cat b.js
    $ cat a.js > b.js
    $ cat b.js
    $ cat a.js
    ```
3. 将a.js的内容添加到c.js的最后一个字符

    ```js
    $ cat a.js
    $ cat c.js
    $ cat a.js >> c.js
    $ cat c.js
    ```

## clear
有时候，我们需要在终端中进行一些操作，这样屏幕上的内容就足以让我们感到烦恼了。

```shell
$ clear
```

## cp
cp命令用于复制文件或目录

cp -f:当要复制的文件覆盖已有的目标文件时，不会有提示信息

cp -r:如果要复制的文件是目录文件，则复制该目录下的所有子目录和文件。

```js
$ ls -R
$ cp a.js fe-apps
$ ls -R
$ cp fe-apps copy-apps
$ cp -rf fe-apps copy-apps
$ ls -R
```

## cd
## ls
- ls -a：显示所有文件和目录（包括以.目录开头的）

- ls -A：显示所有文件和目录（不包括以.directory开头的目录）

- ls -R：显示所有文件和目录，如果目录中有文件，则按顺序列出

## rm
它用于删除文件或目录。

- rm -i：将目录下的文件逐个删除，删除前会询问是否删除该文件。

- rm -r：一起处理指定目录及其子目录下的所有文件（注：不删除文件。）

- rm -f：用于强制删除文件或目录。

## tail
我想你你一定有在服务器上查看日志内容的经历，tail绝对是一个好帮手。

tail -f filename会将filename尾部的内容显示在屏幕上，当其内容发生变化时，您将在屏幕上看到最新的内容


## mv
有时我们想要更改一个文件或目录的名称，或者将其移动到另一个地方，那么我们可以使用mv命令

1. 修改文件名

    ```js
    $ ls
    $ mv a.js xxx.js
    ls
    ```
2. 将文件移动到其他目录

    ```js
    $ ls -R
    $ mv a.js fe-apps
    $ ls -R
    ```
## touch
用touch命令来创建新的文件，尽管它是用来修改文件或目录的时间属性的
```js
$ ls 
$ touch a.js
$ touch b.js
$ ls
```
## which
<span style="color:blue">如果你想查看某个命令的具体路径，可以使用which</span>

```js
$ which node
$ which npm
$ which npx
```
## mkdir
是的，您以前肯定使用过这个命令，而且没什么可说的！

但是mkdir -p dirname确实是我们很少使用的东西，它是用来做什么的呢？
```js
 commands git:(master) ✗ ls
a.js      b.js      copy-apps fe-apps
➜  commands git:(master) ✗ mkdir xxx/yyy // You cannot create the yyy directory because the xxx directory does not exist
mkdir: xxx: No such file or directory
➜  commands git:(master) ✗ mkdir -p xxx/yyy // `-p` will check if the xxx directory already exists, and create it if it doesn't.
➜  commands git:(master) ✗ ls
a.js      b.js      copy-apps fe-apps   xxx
➜  commands git:(master) ✗ ls -R
a.js      b.js      copy-apps fe-apps   xxx
./copy-apps:
fe-apps
./copy-apps/fe-apps:
a.js
./fe-apps:
a.js
./xxx:
yyy
./xxx/yyy:
```

## whoami
显示用户名

```js
$ whoami
```



[17个有用的CLI命令，作为前端工程师，你需要知道一下](https://mp.weixin.qq.com/s/QXy_7RzxBFcCdn5C_lm9WA)