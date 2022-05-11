---
title: nginx相关问题
---

## nginx访问静态网页在访问的时候去掉html后缀
```
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
```
location ~.*\.(js|css|html|png|jpg)$
{
   add_header Cache-Control no-cache;
}  
```
