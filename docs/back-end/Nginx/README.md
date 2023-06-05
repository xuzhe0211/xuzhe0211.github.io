---
title: Nginx
---
```shell
$ docker run --name nginx01 -p 8081:80 -v /Users/xuzhe/Desktop/nginx/conf.d/:/etc/nginx/conf.d/ -v /Users/xuzhe/Desktop/nginx/www/:/var/www/html/ -d nginx


[root@192 ~]# docker exec -it nginx-01 /bin/bash
root@b82175d577fd:/# 

# 1.查看nginx相关文件的位置
root@b82175d577fd:/# whereis nginx
nginx: /usr/sbin/nginx /usr/lib/nginx /etc/nginx /usr/share/nginx


# 2. 查看nginx服务欢迎界面的位置
root@b82175d577fd:/# cat /usr/share/nginx/html/index.html 



# nginx启动
sudo service nginx start


sudo service nginx restart
```
## 学习资料

[前端工程师不可不知的 Nginx 知识](https://mp.weixin.qq.com/s/zlq-KhyuAbp8bRpPtRp0IQ)

[面试官：Nginx 如何实现高并发？常见的优化手段有哪些？](https://mp.weixin.qq.com/s/5QE6SzPn9MFNBXOBt9HCvA)

[可以在 Nginx 中运行 JavaScript，厉害了！](https://mp.weixin.qq.com/s/22e4xLKwLidmSWItjtHtkw)

[16张图入门Nginx——（前端够用，运维入门）](https://mp.weixin.qq.com/s/rDXFP5fF8R-7wi4JVcOM8A)

[好记性不如烂笔头——Nginx篇](https://mp.weixin.qq.com/s/fNohiaZ82OtYPCMJMiVdLg)

[前端开发必须了解的 Nginx 单页加载优化](https://mp.weixin.qq.com/s/MMo3NxLus8wOHpG6YWeY8Q)


[nginx-docker 重要](https://zhuanlan.zhihu.com/p/402991110)

[nginx-docker 重要2](https://juejin.cn/post/6844904098509127694)