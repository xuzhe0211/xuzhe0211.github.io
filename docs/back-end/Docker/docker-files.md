---
title: Dockerfile/Docker-compose
---

## DockerFile
### 基本结构
Dockerfile


## docker-compose

举个栗子
```
version: '3.2'
services:
  #Nginx
  nginx_lb:
    restart: always
    image: nginx:1.11.6-alpine
    ports:
      - 28080:80
      - 80:80
      - 443:443
    volumes:
      - /opt/soft/containers/nginx/conf.d:/etc/nginx/conf.d
      - /opt/soft/containers/nginx/log:/var/log/nginx
      - /opt/soft/containers/nginx/www:/var/www
      - /opt/soft/containers/nginx/zl-management-system:/var/zl-management-system
      - /opt/soft/containers/nginx/ssl:/etc/nginx/ssl
    stdin_open: true
    tty: true
  mysql_db:
    image: percona:5.6
    environment:
      MYSQL_ROOT_PASSWORD: cloud
      TZ: "Asia/Shanghai"
    volumes:
      - /opt/soft/containers/mysql/conf:/etc/mysql/conf.d
      - /opt/soft/containers/mysql/data:/var/lib/mysql
      - /opt/soft:/opt/soft
    ports:
      - "3306:3306"
    networks:
      vpcbr:
        ipv4_address: 172.16.0.51
  zoo1:
    image: wurstmeister/zookeeper
    ports:
      - "2181:2181"
    networks:
      vpcbr:
        ipv4_address: 172.16.0.56

  # kafka version: 1.1.0
  # scala version: 2.12
  kafka:
    image: wurstmeister/kafka
    ports:
      - "9092:9092"
    environment:
      KAFKA_ADVERTISED_HOST_NAME: kafka
      KAFKA_ZOOKEEPER_CONNECT: "zoo1:2181"
      KAFKA_BROKER_ID: 1
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_CREATE_TOPICS: "drive_fsys_fop:1:1"
    depends_on:
      - zoo1
    networks:
      vpcbr:
        ipv4_address: 172.16.0.57


networks:
  vpcbr:
    driver: bridge
    ipam:
     config:
       - subnet: 172.16.0.0/16
       #- gateway: 172.16.0.1
  #vpchost:
  #  driver: host
```
使用 
```shell
cd /root/docker-compose/
docker-compose restart mysql_db


docker-compose --help你会看到如下这么多命令
build               Build or rebuild services
bundle              Generate a Docker bundle from the Compose file
config              Validate and view the Compose file
create              Create services
down                Stop and remove containers, networks, images, and volumes
events              Receive real time events from containers
exec                Execute a command in a running container
help                Get help on a command
images              List images
kill                Kill containers
logs                View output from containers
pause               Pause services
port                Print the public port for a port binding
ps                  List containers
pull                Pull service images
push                Push service images
restart             Restart services
rm                  Remove stopped containers
run                 Run a one-off command
scale               Set number of containers for a service
start               Start services
stop                Stop services
top                 Display the running processes
unpause             Unpause services
up                  Create and start containers
version             Show the Docker-Compose version information
　　

3.常用命令

docker-compose up -d nginx                     构建建启动nignx容器

docker-compose exec nginx bash            登录到nginx容器中

docker-compose down                              删除所有nginx容器,镜像

docker-compose ps                                   显示所有容器

docker-compose restart nginx                   重新启动nginx容器

docker-compose run --no-deps --rm php-fpm php -v  在php-fpm中不启动关联容器，并容器执行php -v 执行完成后删除容器

docker-compose build nginx                     构建镜像 。        

docker-compose build --no-cache nginx   不带缓存的构建。

docker-compose logs  nginx                     查看nginx的日志 

docker-compose logs -f nginx                   查看nginx的实时日志

 

docker-compose config  -q                        验证（docker-compose.yml）文件配置，当配置正确时，不输出任何内容，当文件配置错误，输出错误信息。 

docker-compose events --json nginx       以json的形式输出nginx的docker日志

docker-compose pause nginx                 暂停nignx容器

docker-compose unpause nginx             恢复ningx容器

docker-compose rm nginx                       删除容器（删除前必须关闭容器）

docker-compose stop nginx                    停止nignx容器

docker-compose start nginx                    启动nignx容器
```

## 资料
[入门docker](https://mp.weixin.qq.com/s?__biz=Mzg2MjEwMjI1Mg==&mid=2247522872&idx=3&sn=91b72d3ce5d079f481cbc0df8e3d3bf8&chksm=ce0e2dbbf979a4ad408fb490313c1fd635f14fd36e9aae1cc67130d5d6f97b248fac1d310bb4&scene=132#wechat_redirect)