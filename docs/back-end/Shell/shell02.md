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