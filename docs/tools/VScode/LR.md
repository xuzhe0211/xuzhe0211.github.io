---
title: LF和CRLF一些问题
---

## 是什么
- LF和CRLF是什么

    CRLF是carriage return line feed的缩写，中文意思是换行

    LF是line feed的缩写，中文意思也是换行

    它们都是文本换行的方式

- LF和CRLF区别

    CRLF: "\r\n"，window系统环境下的换行方式

    LF: '\n'，linux系统环境下的换行方式

其实没啥区别

## Git 操作中crlf和lf冲突的问题
多人参与项目开发的时候，经常会遇到代码格式化不一致，在提交的时候出现很多冲突的情况。其中换行符冲突就是一种，在不同的系统平台上是不一样的。NIX/Linux 使用的是 0x0A（LF），早期的 Mac OS 使用的是 0x0D（CR），后来的 OS X 在更换内核后与 UNIX 保持一致了。但 DOS/Windows 一直使用 0x0D0A（CRLF） 作为换行符。所以会出现使用mac的开发者修改的代码中是lf换行，windows用户使用的crlf换行符，总是互相影响。还有一个原因是，git默认配置了autocrlf为true，也就是说默认所有代码都会被提交成了crlf，但是如果不同开发者自己配置的autocrlf配置不一致（比如，input或者false），就会出现总是互相覆盖的情况。以下是解决换行符冲突的解决方案：

- 编辑器统一
    1. 修改git全局配置，禁止git自动将lf转换成crlf，命令

        ```js
        git config --global core.autocrlf false
        ```
    2. 修改编辑器的用户配置，例如vscode

        ```js
        'files.eol':'\n', // 文件换行使用lf方法
        ```
- git方式统一

    git提交的时候，文件中的换行符必须是LF,如果不是不能提交
    ```shell
    # 提交时转换为LF,检出时不转换
    git config --global core.autocrlf input

    # 拒绝提交包含混合换行符的文件
    git config --global core.safecrlf true
    ```
- EditorConfig

    主流编码器都支持EditorConfig，配置end_of_line后，你编辑的代码会自动转化为对应的换行符。当然你需要将autocrlf关闭，防止再次被转换成其他格式
    ```shell
    # 取值包括 crlf,lf,cr
    end_of_line = lf

    # 提交检出均不转换
    git config --global core.autocrlf false
    ```
- prettier

    prettier是目前非常流行的代码格式化工具，提供了endOfLine来支持格式化换行符
    ```js
    {
        //...
        "endOfLine": "lf",
        // ...
    }
    ```
    因为我们现有的项目都已经支持prettier，自然就使用了【husky+lint-staged+prettier】的方式，来支持所有代码格式化成 lf 换行符。



[Git操作中crlf和lf冲突问题](https://www.cnblogs.com/dahe1989/p/10784581.html)