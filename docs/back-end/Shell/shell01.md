---
title: shell简单脚本
---

## 变量
```sh
your_name = 'xz';
echo $your_name;
echo ${your_name}
```

## ifelse
新建后缀为.sh的文件，选用git bash或者linux命令工具执行 sh ifelse.sh
```sh
#ifelse.sh
#!/usr/bin/env bash
num1 = 1;
num2 = 2;
if test $[num1] -eq $[num2]
then 
    echo '两个数字相等'
else
    echo '两个数字不相等'
fi
echo '结束'
```
- Shell中的test 命令用于检查某个条件是否成立
- eq 等于则为真

## params 
获取参数
```sh
#!/bin/bash/env bash
echo "Shell 传递参数实例"
echo "第1个参数为: $1";
echo "第2个参数为: $2";
echo "第3个参数为:$3"

echo "参数个数为：$#";
echo "传递的参数作为第一个字符串显示:$*"
```
## read 
```js
# 获取当前分支 =====
branch=$(git symbolic-ref --short HEAD)
# git提交 ===
git add.
read -p $'\n\n请输入你的commit信息： ' commitInfo
git commit -m ${commitInfo}
echo ${commitInfo}
```
## 写入文件
```js
#!/bin/bash
echo "write to file."
echo "input you name"
read y_name
echo "Hello,${y_name}" > f_users.txt
```
