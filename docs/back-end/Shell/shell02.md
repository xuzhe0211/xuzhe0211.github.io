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

// demo
```shell
spawn scp -i $1 -P 2020 dist.tar.gz ec2-user@ec2-52-83-95-61.cn-northwest-1.compute.amazonaws.com.cn:/home/ec2-user
expect {
    "*yes*" { send "yes\r" }
}

spawn scp -i $1 -P 2020 dist.tar.gz ec2-user@ec2-52-83-95-61.cn-northwest-1.compute.amazonaws.com.cn:/home/ec2-user
expect {
    "*yes*" { send "yes\r" }
}

set timeout 5

spawn ssh -i $1 ec2-user@ec2-52-83-95-61.cn-northwest-1.compute.amazonaws.com.cn -p 2020
expect {
    "*yes*" { send "yes\r" }
}
```