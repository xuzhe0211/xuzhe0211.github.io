---
title: demo
---
```shell
# For more information on configuration, see:
#   * Official English Documentation: http://nginx.org/en/docs/
#   * Official Russian Documentation: http://nginx.org/ru/docs/

user root;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 4096;
    client_max_body_size 8M;
    client_body_buffer_size 128k;
    fastcgi_intercept_errors on;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;


    server
    {
        listen       80;
        listen       443 ssl;
        server_name  52.83.95.61;
        server_name  dev0.heartdub.info;
        server_name  dev0.heartdub.cn;

        ssl_certificate "/etc/nginx/6774279_dev.heartdub.cn/6774279_dev.heartdub.cn.pem";
        ssl_certificate_key "/etc/nginx/6774279_dev.heartdub.cn/6774279_dev.heartdub.cn.key";
        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout  10m;
        #ssl_protocols  SSLv2 SSLv3 TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers TLS13-AES-256-GCM-SHA384:TLS13-CHACHA20-POLY1305-SHA256:TLS13-AES-128-GCM-SHA256:TLS13-AES-128-CCM-8-SHA256:TLS13-AES-128-CCM-SHA256:EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
        ssl_prefer_server_ciphers on;

        include /etc/nginx/default.d/*.conf;


        #if ($scheme = http)
        #{
        #    return 301 https://$server_name$request_uri;
        #}




        location /api
        {
            include  uwsgi_params;
            uwsgi_pass  127.0.0.1:9090;
        }

        location ~ ^/api/static/(.*)$
        {
            alias  /home/ec2-user/One-backend/static/$1;
            add_header Access-Control-Allow-Origin *;
            expires 864000;
        }


        location ^~ /meta/
        {
            alias /home/ec2-user/demo-dist/;
            index index.html;
            try_files $uri $uri/ /meta/index.html;
        }

        location /duber/
        {
            alias /home/ec2-user/dist/;
            index index.html;
            try_files $uri $uri/ /index.html;
        }

        location /test/
        {
            alias /home/ec2-user/dist/;
            index index.html;
            try_files $uri $uri/ /index.html;
        }

        location /
        {
            alias /home/ec2-user/dist/;
            index index.html;
            try_files $uri $uri/ /index.html;
        }

        location /axia8
        {
            alias /home/ec2-user/axia8-demo/demo/;
            index index.html;
            try_files $uri $uri/ /index.html;
        }
        location /tunl
        {
            alias /home/ec2-user/tunl-demo/;
            index index.html;
            try_files $uri $uri/ /index.html;
        }
        location /demo
        {
            alias /home/ec2-user/demo/;
            index index.html;
            try_files $uri $uri/ /index.html;
        }

        location /resource
        {
            #proxy_set_header referer "$http_referer";
            #proxy_set_header referer "http://sina.com.cn";加上这句就不行，说明默认会携带原始的referer
            proxy_pass  https://s3.cn-northwest-1.amazonaws.com.cn/;
        }

    }


}
```