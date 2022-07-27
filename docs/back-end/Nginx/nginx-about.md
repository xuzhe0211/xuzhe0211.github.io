---
title: nginx相关问题
---

## nginx访问静态网页在访问的时候去掉html后缀
```shell
 location ^~ /translate/ {   #定位URL中translate文件夹下的静态文件
    #通过访问时添加后缀来隐藏URL中的后缀
    if (!-e $request_filename){   
        rewrite ^(.*)$ /$1.html last;
        break;
    }
    root /var/www/html;
    index index.html index.nginx-debian.html;
    try_files $uri $uri/ =404;
    # try_files $uri $uri/ /index.html;
}
```

## Nginx禁止html等缓存
+++
date="2020-10-16"
title="Nginx禁止html等缓存"
tags=["nginx"]
categories=["运维"]
+++
在本地开发的时候，经常会碰到缓存引起的莫名其妙的问题，最暴力的方式就是清掉浏览的缓存，或者使用Ctrl+F5，Shift+F5强刷页面。有时候按了好几下，缓存还是清不掉，只能暂时禁用浏览器静态资源缓存了，配置如下
```shell
location ~.*\.(js|css|html|png|jpg)$
{
   add_header Cache-Control no-cache;
}  
```
## nginx配置路径问题
```js
location /img/ {
    alias /val/www/images/
}
## 若按照上述配置的话，则访问/img/目录里面的文件时,nginx会自动取/var/www/image/目录找文件

location /img/ {
    root /var/www/image
}
## 若按照这种配置的话，则访问/img/目录下的文件时， nginx会去/var/www/image/img/目录下找文件
```
- alias 是一个目录别名的定义
- root则是最上层目录的定义

## docker 启动一个nginx容器
```js
docker run --name nginx01 -p 8081:80 -v /Users/xuzhe/Desktop/nginx/conf.d/:/etc/nginx/conf.d/ -v /Users/xuzhe/Desktop/nginx/www/:/var/www/html/ -d nginx
```