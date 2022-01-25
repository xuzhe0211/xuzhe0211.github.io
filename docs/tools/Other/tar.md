---
title: tar解压缩
---
## tar解压缩

linux tar.gz是常见的的文件解压缩命令

- tar.gz压缩命令

    tar -zcvf 压缩文件名.tar.gz 被压缩文件名

- tar.gz 解压命令

    tar -zxvf 压缩文件名.tar.gz

- 其他 解压缩命令
    - 压缩
        - tar -cvf jpg.tar *.jpg // 将目录里所有jpg文件打包成tar.jp
        - tar -czf jpg.tar.gz *.jpg // 将目录里所有jpg打包成jpg.tar后，并将启用bzip2压缩 生成一个bzip2过的包，命名为jpj.tar.gz
        - tar –cjf jpg.tar.bz2 *.jpg //将目录里所有jpg文件打包成jpg.tar后，并且将其用bzip2压缩，生成一个bzip2压缩过的包，命名为jpg.tar.bz2
        - tar –cZf jpg.tar.Z *.jpg //将目录里所有jpg文件打包成jpg.tar后，并且将其用compress压缩，生成一个umcompress压缩过的包，命名为jpg.tar.Z
        - rar a jpg.rar *.jpg //rar格式的压缩，需要先下载rar for Linux
        - zip jpg.zip *.jpg //zip格式的压缩，需要先下载zip for linux
    
    - 解压
        - tar –xvf file.tar //解压 tar包
        - **tar -xzvf file.tar.gz** //解压tar.gz
        - tar -xjvf file.tar.bz2 //解压 tar.bz2
        - **tar –xzvf file.tar.Z** //解压tar.Z
        - unrar e file.rar //解压rar
        - unzip file.zip //解压zip