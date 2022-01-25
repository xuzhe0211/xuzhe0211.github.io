---
title: Yarn
---

## 强制使用

改脚本来源[vue](https://github.com/vuejs/vue-next/blob/master/scripts/checkYarn.js)

```
if (!/yarn\.js$/.test(process.env.npm_execpath || '')) {
  console.warn(
    '\u001b[33mThis repository requires Yarn 1.x for scripts to work properly.\u001b[39m\n'
  )
  process.exit(1)
}
```
配合package.json的preinstall声明周期：

```
{
    "scripts": {
        "preinstall": "node ./scripts/checkYarn.js"
    }
}
```

这样就大功告成了。

## link

yarn link 并不像npm link一样可以全局使用，需要安装到指定文件夹才可使用，当然也是有一定方法的

```
{
    "scripts": {
        "link:add": "yarn global add file:${pwd}"
    }
}
```
执行yarn link:add即可