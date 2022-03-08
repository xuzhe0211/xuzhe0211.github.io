---
autoGroup-2: 持续集成部署
title: gitlab-runner安装遇到的问题
---

## 命令
### 启动命令
```
sudo yum install gitlab-runner # 安装

gitlab-runner --debug <command> #调用模式排查错误特别有用
gitlab-runner <dommand> --help #获取帮助信息
gitlab-runner run # 普通用户模式，配置文件位置~/.gitlab-runner/config.toml
sudo gitlab-runner run #超级用户模式 配置文件位置/ets/gitlab-runner/config.toml
```

### 注册命令
```
gitlab-runner register #默认交互模式下使用，非交互模式添加--non-interactive
gitlab-runner list #此命令列出了保存在配置文件中所有运行程序
gitlab-runner verify #此命令检查注册的runner是否可以连接，但不验证GitLab服务是否正在使用runner --delete删除
gitlab-runner unregister #该命令使用GitLab取消已注册的runner

# 使用令牌注销
gitlab-runner unregister --url http://gitlab.example.com/ --token t0k3n

# 使用名称注销 (同名删除第一个)
gitlab-runner unregister --name test-runner

# 注销所有
gitlab-runner unregister --all-runners
```

### 服务命令
```
gitlab-runner install --user=gitlab-runner --working-directory=/homg/gitlab-runner

# --user指定将用于执行构建的用户
# --working-directory 指定将使用**Shell** executor运行构建时所有数据将存储在其中的根目录

gitlab-runner uninstall # 该命令停止运行并从服务中卸载GitLab Runner.

gitlab-runner start # 该命令启动GitLab Runner服务

gitlab-runner stop # 该命令停止GitLab Runner服务

gitlab-runner restart # 该命令将停止，然后启动GitLab Runner服务

gitlab-runner status #此命令显示gitlab runner服务的状态。当服务正在运行时，退出代码为0;而当服务未运行，退出代码为非零
```

## 删除gitlab-runner
```
sudo yum remove gitlab-runner
```

## docker镜像内host问题
宿主机内增加host的DNS解析可以访问

但是镜像容器内的host解析和宿主机不一致  必须主动增加--add-host xxx.xxxnet:10.13.32.1111 类似这种
```
docker run -d --name gitlab-runner --restart always  --add-host xxx.xxxnet:10.13.32.1111  --add-host xxxlab.ps.xxx.net:10.13.76.1341    -v /etc/gitlab-runner/:/etc/gitlab-runner        -v /var/run/docker.sock:/var/run/docker.sock        gitlab/gitlab-runner:latest
```

## gitlab-runner容器内创建镜像
在gitlab-runner容器内创建镜像，dns无法解析的问题

```
gitlab-runner register \
  --non-interactive \
  --executor="docker" \
  --docker-image="node:14" \
  --url="https://xxxx.xxx.xxx.net/" \
  --registration-token="NFsD_ko3dD_nshpJdFV1" \
  --description="name-runner" \
  --tag-list="name-devolop-tag" \
  --run-untagged="true" \
  --locked="false" \
  --docker-volumes="/etc/hosts:/etc/hosts" \
  --docker-extra-hosts="xxxx.xxx.xxxx.net:10.13.76.134" \
  --docker-network-mode="host"

// 生成之后

[[runners]]
  name = "name-runner"
  url = "https://xxxx.xxx.xxxx.net/"
  token = "ysapCts-obqC6MHmSyyS"
  executor = "docker"
  [runners.custom_build_dir]
  [runners.cache]
    [runners.cache.s3]
    [runners.cache.gcs]
    [runners.cache.azure]
  [runners.docker]
    tls_verify = false
    image = "node:14"
    privileged = false
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/etc/hosts:/etc/hosts", "/cache"]
    extra_hosts = ["xxxx.xxx.xxxx.net:10.13.76.134"]
    shm_size = 0
```

## docker创建并执行docker命令
```
docker run -d --add-host xx.xz.net:10.13.32.1 --name nodepm2 -v /root/:/root/ -v /home/xz/deploy/:/home/xz/deploy/ -v /root/codes/:/root/codes/ -v /opt/xz/containers/nginx/www/:/opt/xz/containers/nginx/www/ -p 8933:8933 khub.***.cn/sreopen/node:14.2.0 sh -c "npm i -g pm2;cd /home/xz/deploy;npm i;pm2 start server.js --no-daemon"
```


## 资料
[gitlab runner命令](https://www.cnblogs.com/sanduzxcvbnm/p/13891452.html)

[This job is stuck, because the project doesn't have any runners online assigned to it. Go to Runners page
](https://stackoverflow.com/questions/53370840/this-job-is-stuck-because-the-project-doesnt-have-any-runners-online-assigned)


[Gitlab CI/CD 问题处理](https://blog.csdn.net/londa/article/details/94165073)
