---
title: 使用git时ssh提示“Load key "/home/devid/.ssh/id_rsa" bad permissions”的解决办法
---

这个问题是由于权限的问题，需要文件设置权限：
```shell
chmod 600 *

// demo
chmod 600 xz
```

## 资料
[使用git时ssh提示“Load key "/home/devid/.ssh/id_rsa": bad permissions”的解决办法](https://cloud.tencent.com/developer/article/1445437)