---
autoGroup-0: 常用
title: 判断输入变量或者参数是否为空
---
```shell
# 判断变量

read -p "input a word :" word
if  [ ! -n "$word" ] ;then
    echo "you have not input a word!"
else
    echo "the word you input is $word"
fi
 
判断输入参数
#!/bin/bash
if [ ! -n "$1" ] ;then
    echo "you have not input a word!"
else
    echo "the word you input is $1"
fi
 
以下未验证，转自http://blog.csdn.net/lllxy/article/details/3255554
 
2. 直接通过变量判断
       如下所示:得到的结果为: IS NULL
#!/bin/sh
para1=
if [ ! $para1 ]; then
  echo "IS NULL"
else
  echo "NOT NULL"
fi 
3. 使用test判断
     得到的结果就是: dmin is not set!  
#!/bin/sh
dmin=
if test -z "$dmin"
then
  echo "dmin is not set!"
else  
  echo "dmin is set !"
fi
 
4. 使用""判断
#!/bin/sh 
dmin=
if [ "$dmin" = "" ]
then
  echo "dmin is not set!"
else  
  echo "dmin is set !"
fi
```