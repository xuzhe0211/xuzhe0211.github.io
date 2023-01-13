---
title: 多 Git 仓库的 SSH-key 配置
---
## 问题背景
当我们使用诸如 GitHub、码云等远程 Git 托管平台时，往往会配置账号中的 SSH-key 来方便进行拉取和推送仓库.

典型的做法是使用 ssh-keygen -t rsa -c "someCommentLikeEmail" 命令及其默认配置生成在路径 ~/.ssh 下的 RSA 公钥和私钥文件：id_rsa 和 id_rsa.pub. 然后只需要把公钥文件中的内容复制粘贴到托管平台相应的位置即可. 这样一台设备的一个默认 RSA 密钥就能在多个不同的托管平台上使用了.

但当我们使用了两个 Github 账号时（例如一个用于公司项目，一个用于个人项目），便不得不配置另一个密钥，因为在不同账号中配置相同的 RSA 公钥是不被允许的，如下图：

![github不允许在不同账号下配置同一个SSH KEY](./images/43-1.png)

## 配置多SSH Key
1. 添加RSA KEY
    仍然使用命令
    ```js
    ssh-keygen -t rsa -C 'your@email.com'
    ```
    <span stlye="color: red">生产RSA秘钥对，但在接下来的选项中指定一个不同的文件名,例如</span>
    ```
    Enter file in which to save the key (/Users/userName/.ssh/id_rsa): /Users/userName/.ssh/new_rsa
    ```
    这样就在 ~/.ssh 目录下生成了一对新的 RSA 密钥：new_rsa 和 new_rsa.pub.

2. 秘钥配置

    生产了新的秘钥后，边可将新蜜月成功添加到第二个github账号。但此时向第二个github仓库推送更新让然回显示无权限，因为若不经配置系统默认扔使用默认的秘钥对 id_rsa

    需要如下配置

    在秘钥目录 ~/.ssh/ 下编辑或新建配置文件config,添加如下内容
    ```js
    Host github.com
    HostName github.com
    IdentityFile ~/.ssh/id_rsa
    User git


    Host alias
    HostName github.com
    IdentityFile ~/.ssh/new_rsa
    User git
    ``` 
    理解其中配置项就可以灵活配置更多的SSH key了
    - Host 是我们自己定义的一个别名，用来更方便的指代hostname。
    - HostName 是远程地址的域名，需要正确配置
    - IdentityFile 指定使用该配置项中的域名(或别名)时所使用的秘钥文件
    - User 使用SSH时的用户名，对于远程git仓库来说一般使用git

    以上第一个配置项，使于明伟github.com的仓库默认使用id_rsa密钥对，第二个配置项为地址中使用了别名alias的仓库使用new_rsa密钥对

3. 使用别名配置仓库的远程地址

    配置完以上内容后，当我们使用alias作为登陆地址时回使用指定的new_rsa秘钥，否则让默认使用 id_rsa 秘钥，因此我们需要对想要使用 new_rsa秘钥的仓库地址做修改，例如：

    对于仓库地址为
    ```js
    git@github.com:user_name/repository_name.git
    ```
    的 GitHub 远程仓库，我们推送更新时系统仍默认使用 id_rsa 密钥，若想使用 new_rsa 密钥则需修改地址为：
    ```js
    git@alias:user_name/repository_name.git
    ```
## 其他
- 对于 Windows 用户需要注意 .ssh 目录的路径
- config 不生效的话检查语法或尝试重启终端或设备后重试
- 对于更多的密钥配置在 ~/.ssh/config 文件中同理追加更多配置项即可

## Git远程仓库地址变更本地如何修改
- 方法一--通过命令直接修改远程仓库地址

    - 进入git_test目录
    - git remote 查看所有远程仓库，git remote xx查看指定远程仓库地址
    - git remote set-url origin http://xxxx.git

- 方法二--通过删除在添加远程仓库

    - 进入git_test目录
    - git remote 查看所有远程仓库，git remote xx查看指定远程仓库地址
    - git remote rm origin
    - git remote add origin http://xxx.git

- 方法三--直接修改配置文件

    1. 进入git_test/.git
    2. vim config
        ```js
        [core]
        repositoryformatversion = 0
        filemode = true
        logallrefupdates = true
        precomposeunicode = true
        [remote "origin"]
        url = http://192.168.100.235:9797/shimanqiang/assistant.git
        fetch = +refs/heads/*:refs/remotes/origin/*
        [branch "master"]
        remote = origin
        merge = refs/heads/master
        ```
        修改 [remote “origin”]下面的url即可

## 资料
[多 Git 仓库的 SSH-key 配置](https://www.hozen.site/archives/43/)

[Git远程仓库地址变更本地如何修改](https://blog.csdn.net/asdfsfsdgdfgh/article/details/54981823)