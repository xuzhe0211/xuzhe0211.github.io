---
autoGroup-2: 持续集成部署
title: docker + jenkins部署过程中遇到的问题
---
- publihs over ssh
    ![Publish over ssh](./images/1.png)

- 任务配置
    ![](./images/2.png)


```js
docker run -d --name docker-jenkins -p 9000:8080 -p 50000:50000 -v /home/ec2-user/jenkins_workspace:/var/jenkins_home/workspace jenkins/jenkins:lts
```