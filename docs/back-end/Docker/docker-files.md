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
      MYSQL_ROOT_PASSWORD: wpscloud
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
```
cd /root/docker-compose/
docker-compose restart mysql_db
```

## 资料
[入门docker](https://mp.weixin.qq.com/s?__biz=Mzg2MjEwMjI1Mg==&mid=2247522872&idx=3&sn=91b72d3ce5d079f481cbc0df8e3d3bf8&chksm=ce0e2dbbf979a4ad408fb490313c1fd635f14fd36e9aae1cc67130d5d6f97b248fac1d310bb4&scene=132#wechat_redirect)