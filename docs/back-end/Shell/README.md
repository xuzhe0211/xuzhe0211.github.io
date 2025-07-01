---
title: shell文档
---
## linux下chmod-x的意思
[linux下chmod-x的意思](/back-end/Node/ztool.html#一、linux下chmod-x的意思)

```shell
chmod +x deploy.sh
```

## 1. 运行 deploy.sh 时去掉 TTY 依赖
使用apawn 替代exec
```shell
const { spawn } = require('child_process')

const deployProcess = spawn('sh', ['./deploy.sh'], { stdio: 'inherit'});

deployProcess.on('exit', (code) => {
  console.log(`子进程退出，退出码 ${code}`)
})


# 另一个
const { spawn } = require('child_process');

const process = spawn('sudo', ['docker', 'exec', 'openresty', 'nginx', '-s', 'reload'], {
    stdio: 'inherit'  // 继承主进程的标准输入/输出，便于调试
});

process.on('close', (code) => {
    console.log(`Process exited with code ${code}`);
});
```
> stdio: 'inherit' 让 deploy.sh 继承 Node.js 的 stdin/stdout，避免 TTY 错误。



[工具](/tools/Other/)