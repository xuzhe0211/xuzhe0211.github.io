---
title: docker-demo
---
DockerFile

```shell
FROM khub.wps.cn/sreopen/node:14.2.0

COPY package.json /opt/zhiliao/package.json
# COPY package-lock.json /opt/zhiliao/package-lock.json
COPY .npmrc /opt/zhiliao/.npmrc

RUN cd /opt/zhiliao && npm install

ADD ./ /opt/zhiliao


WORKDIR /opt/zhiliao

# RUN npm install
RUN npm run build

FROM khub.wps.cn/sreopen/nginx:1.18.0

COPY --from=0 /opt/zhiliao/dist/ /var/www/zhiliao/
COPY --from=0 /opt/zhiliao/nginx/nginx.conf /etc/nginx/
COPY --from=0 /opt/zhiliao/nginx/startup.sh /opt/nginx/

#RUN nginx
#CMD ["nginx","-g","daemon off;"]
RUN chmod +x /opt/nginx/startup.sh
ENTRYPOINT ["/opt/nginx/startup.sh"]
```

nginx 
```shell
#user  nobody;
worker_processes  4;

error_log  KAE_APP_LOG_DIR/error.log;
error_log  KAE_APP_LOG_DIR/error.log  notice;
error_log  KAE_APP_LOG_DIR/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  KAE_APP_LOG_DIR/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

     server {
        listen 80;
        server_name localhost; # ssl on; #开启 https 校验

         set $device_type pc;

        # this regex string is actually much longer to match more mobile devices
        if ($http_user_agent ~* "android|ip(hone|od)|kindle") {
            set $device_type mobile;
        }

        location / {
            if ($request_filename ~ .*\.(htm|html)){
              add_header Cache-Control no-cache;
            }
            if ($device_type = mobile) {
               root /var/www/m-zhiliao/;
            }
            if ($device_type = pc) {
              root /var/www/zhiliao/;
            }
            if (!-e $request_filename){
              rewrite ^(.*)$ /$1.html last;
              break;
            }
            index index.html index.htm;
        }
     }

}
```

startup.sh
```shell
#!/bin/sh
set -e

if [ $KAE_APP_MAINTAIN = "update" ]
then
  rm -rf /var/www/zhiliao/index.html
  cp -rf /var/www/zhiliao/update.html /var/www/zhiliao/index.html
  rm -rf /var/www/zhiliao/update.html
  echo "copy update.html到nginx指向的文件夹下的index.html"
else
  echo "默认不做操作"
fi

if   [   -z   $KAE_APP_LOG_DIR   ]
then 
    echo   "no env KAE_APP_LOG_DIR " 
else 
    sed -i "s:KAE_APP_LOG_DIR:${KAE_APP_LOG_DIR}:" /etc/nginx/nginx.conf
fi
nginx -g 'daemon off;'
```

https://segmentfault.com/a/1190000009583997

https://juejin.cn/post/7144881028661723167?#heading-14