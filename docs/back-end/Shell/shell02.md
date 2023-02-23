---
title: demo-king
---
```shell
#!/bin/sh

myFile="./output.tar.gz"

passwd="M562vaxTKvmsa4Pu"

set -e

# if [ ! -d "$myFile" ]; then
# 	echo '存在产出,准备删除'
# 	echo '===删除中==='
# 	rm -rf $myFile
# 	echo '已删除产出'
# fi

# echo $passwd
# echo '下载完毕'

/usr/bin/expect<<-EOF
# set timeout 5
spawn scp -p 8888 output.tar.gz root@10.13.5.69:/home/kingsoft/output
expect {
    "*password:" { send "$passwd\r" }
}
expect "*#"

spawn ssh root@10.13.5.69
expect {
    "*password:" { send "$passwd\r" }
}

expect "*#"
send "cd /home/kingsoft/output/\r"

expect "*#"
send "pwd \r "

expect "*#"
send "bash front_deploy.sh $1 \r "

expect "*#"
send "exit\r"
interact 
expect eof
EOF
```

## Mac运行sh文件，也就是传说中的shell脚本
1. 写好自己的脚本，比如aa.sh
2. 打开终端，执行： 
    - 方法一： 输入命令./aa.sh
    - 方法二: 直接把aa.sh拖入到终端里面

- 注意事项
    如没有成功爆出问题：Permission denied,就是没有权限

- 解决方法

    修改该文件aa.sh 的权限 ：使用命令： 

    chmod 777 aa.sh 。

    然后再执行 上面第二步的操作 就 OK .