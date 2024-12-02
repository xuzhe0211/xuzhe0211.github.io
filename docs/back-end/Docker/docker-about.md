---
autoGroup-3: docker问题
title: docker相关
---
## linux安装docker版本过低
https://docs.docker.com/engine/install/centos/

## docker-compose版本过低问题
```
curl -L https://github.com/docker/compose/releases/download/1.28.3/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose

docker-compose --version
```

## 解决 docker-compose command not found
https://blog.csdn.net/qq_30718137/article/details/108408360

## 名词--挂载资料卷

## docker国内源
由于公司docker无法下载 设置docker源
/etc/docker/daemon.json
```shell
https://dockerpull.com
```
gitlab-runner 设置
```shell
concurrent = 1
check_interval = 0
connection_max_age = "15m0s"
shutdown_timeout = 0

[session_server]
  session_timeout = 1800

[[runners]]
  name = "unisk-global"
  url = "https://gitlab.unisk.cn:58443/"
  id = 1
  token = "xxxxx"
  token_obtained_at = 2024-08-01T06:28:21Z
  token_expires_at = 0001-01-01T00:00:00Z
  executor = "docker"
  [runners.custom_build_dir]
  [runners.cache]
    MaxUploadedArchiveSize = 0
    [runners.cache.s3]
    [runners.cache.gcs]
    [runners.cache.azure]
  [runners.docker]
    tls_verify = false
    image = "node:16"
    privileged = false
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/cache","/data/projects/:/data/projects/", "/data/cloud/:/data/cloud/"]
    extra_hosts = ["gitlab.xxxx.cn:8.143.202.42", "nexus.xxxx.cn:8.143.202.42"]
    network_mode = "host"
    shm_size = 0
    network_mtu = 0

[[runners]]
  name = "unisk-current"
  url = "https://gitlab.unisk.cn:58443/"
  id = 15
  token = "xxxxxxx"
  token_obtained_at = 2024-08-01T10:56:08Z
  token_expires_at = 0001-01-01T00:00:00Z
  executor = "docker"
  [runners.custom_build_dir]
  [runners.cache]
    MaxUploadedArchiveSize = 0
    [runners.cache.s3]
    [runners.cache.gcs]
    [runners.cache.azure]
  [runners.docker]
    tls_verify = false
    image = "node:16"
    privileged = false
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/cache","/data/projects/:/data/projects/", "/data/cloud/:/data/cloud/"]
    extra_hosts = ["gitlab.xxxx.cn:8.143.202.42", "nexus.xxxx.cn:8.143.202.42"]
    network_mode = "host"
    shm_size = 0
    network_mtu = 0
```
[参考](/tools/Git/gitlab-cicd-01.html#gitlab-runner容器内创建镜像)

## 资料