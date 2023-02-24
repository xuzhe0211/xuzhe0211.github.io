---
autoGroup-6: node问题记录
title: node如何支持ESModule
---
## node版本要求

node > 16.0.0

## package.json
增加一个字段
```
"type": "module"
```

## 通过package.json将所有js文件以ES Module去工作
在node的最新版本中，进一步支持了ES Module,在新版本中可以通过package.json添加一个type字段，将type字段设置为"module"，这样就会将项目中所有的js文件就会以ES Module去工作了，我们就不用将扩展名改为mjs了
```js
// package.json
{
    "type": "module"
}

// module.js
export const foo = "this is foo";
export const boo = "this is boo";

// index.js
import { foo, boo } from './module.js';
console.log(foo, boo);
```
执行：node index.js，打印结果：this is foo this is boo

如果没有设置package.json，则会报错Cannot use import statement outside a module

可见现在是以ES Module去工作。

## 注意事项
在配置了type之后，如果想要使用CommonJS规范是什么效果
```js
// common.js
const path = require('path');
console.log(path.join(__dirname, 'foo'));
```
打印结果为：require is no defined

原因是：package.json中设置了type,所有js文件都以ES Module去工作，而ES Module中并没有提供require。

如果我们想要运行CommonJS,需要将文件扩展名改为cjs，此时我们再去执行就能按CommonJS规范来了。

```js
// common.cjs
const path = require('path');
console.log(path.join(__dirname, 'foo'));
```
可以成功打印出地址。