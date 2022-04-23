---
autoGroup-2: 框架
title: Koa2 和 Express 中间件对比
---
## Koa2中间件
koa2的中间件是通过async await实现的，中间件执行顺序是"洋葱性"模型。

中间件之间通过next函数联系，当一个中间件调用next()后，会将控制权交给下一个中间件，直到下一个中间件不在执行next()后，将会沿路这番，将控制权一次交给前一个中间件

![洋葱模型1](./images/2892151181-5ab48de7b5013_fix732.png)

### koa2中间件实例
app.js
```
const Koa = require('koa');
const app = new Koa();

// logger
app.use(async (ctx, next) => {
  console.log('第一层 - 开始')；
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ----------- ${ctx.url} ----------- ${rt}`);
  console.log('第一层 - 结束')
})
// x-response-time
app.use(async (ctx, next) => {
    console.log('第二层 - 开始')
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
    console.log('第二层 - 结束')
});
// response
app.use(async ctx => {
    console.log('第三层 - 开始')
    ctx.body = 'Hello World';
    console.log('第三层 - 结束')
});

app.listen(3000);
```
执行app.js后，浏览器访问 http://localhost:3000/text , 控制台输出结果：
```
第一层 - 开始
第二层 - 开始
第三层 - 开始
第三层 - 结束
第二层 - 结束
打印第一次执行的结果： GET -------- /text ------ 4ms
第一层 - 结束
```
### koa2中间件应用
下面是一个登录验证的中间件

loginCheck.js
```
module.exports = async (ctx, next) => {
  if (ctx.session.username) {
    // 登录成功，需执行await next()，以继续执行下一步
    await next();
    return;
  }
  // 登录失败，禁止继续执行，所以不需要执行next()
  ctx.body = {
    code: -1,
    msg: '登录失败'
  }
}
```
在删除操作中使用loginCheck.js
```
router.post('delete', loginCheck, async (ctx, next) => {
  const author = ctx.session.username;
  const id = ctx.query.id;
  // handleDelete() 是一个删除方法，返回一个promise
  const result = await handleDelete(id, author)

  if (result) {
      ctx.body = {
          code: 0,
          msg: '删除成功'
      }
  } else {
      ctx.body = {
          code: -1,
          msg: '删除失败'
      }
  }
})
```
## express中间件
与koa2中间件不同的是，express中间件一个接一个的顺序执行，通常会将response响应写在最后一个中间件中

主要特点
- app.use用来注册中间件
- 遇到http请求,根据path和method判断触发哪些中间件
- 实现next机制，即上一个中间件会通过next触发下一个中间件

### express中间件实例
```
const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('第一层 - 开始')
  setTimeout(() => {
    next();
  }, 0)
  console.log('第一层 - 结束')
})

app.use((req, res, next) => {
  console.log('第二层 - 开始');
  setTimeout(() => {
    next();
  }, 0)
  console.log('第二层 - 结束')
})

app.use('/api', (req, res, next) => {
  console.log('第三层 - 开始');
  res.json({
    code: 0
  })
  console.log('第三层 - 结束')
})

app.listen(3000, () => {
  console.log('server is running on port 3000')
})
```
执行app.js后，浏览器访问 http://localhost:3000/api , 控制台输出结果：
```
第一层 - 开始
第一层 - 结束
第二层 - 开始
第二层 - 结束
第三层 - 开始
第三层 - 结束
```
因为上面各个中间件中的next()是异步执行的，所以打印结果是线性输出的。

如果取消上面next()的异步执行，直接如下方式
```
const express = require('express')

const app = express()

app.use((req, res, next) => {
    console.log('第一层 - 开始')
    next()
    console.log('第一层 - 结束')
})

app.use((req, res, next) => {
    console.log('第二层 - 开始')
    next()
    console.log('第二层 - 结束')
})

app.use('/api', (req, res, next) => {
    console.log('第三层 - 开始')
    res.json({
        code: 0
    })
    console.log('第三层 - 结束')
})

app.listen(3000, () => {
    console.log('server is running on port 3000')
})
```
执行app.js后，浏览器访问 http://localhost:3000/api , 控制台输出结果：
```
第一层 - 开始
第二层 - 开始
第三层 - 开始
第三层 - 结束
第二层 - 结束
第一层 - 结束
```
可见，express的中间件也可以形成洋葱圈模型，但是一般在express中不会这么做，因为express的response一般在最后一个中间件，所以其他中间件next()后的代码不影响最终结果

### express中间件应用
下面是一个登录验证的中间件

// loginCheck.js
```
module.exports = (req, res, next) => {
    if (req.session.username) {
        // 登陆成功，需执行 next()，以继续执行下一步
        next()
        return
    }
    // 登陆失败，禁止继续执行，所以不需要执行 next()
    ctx.body = {
        code: -1,
        msg: '登陆失败'
    }
} 
```
在删除操作中使用 loginCheck.js :
```
router.post('/delete', loginCheck, (req, res, next) => {
    const author = req.session.username
    const id = req.query.id
    // handleDelete() 是一个处理删除的方法，返回一个 promise
    const result = handleDelete(id, author)

    return result.then(val => {
        if (val) {
            ctx.body = {
                code: 0,
                msg: '删除成功'
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '删除失败'
            }
        }
    })
}) 
```
## 实现
```javascript
function express() {
    var funcs = []; // 待执行的函数数组
    var app = function (req, res) {
        var i = 0;
        function next() {
            var task = funcs[i++];  // 取出函数数组里的下一个函数
            if (!task) {    // 如果函数不存在,return
                return;
            }
            task(req, res, next);   // 否则,执行下一个函数
        }
        next();
    }
    /**
     * use方法就是把函数添加到函数数组中
     * @param task
     */
    app.use = function (task) {
        funcs.push(task);
    }

    return app;    // 返回实例
}

// 下面是测试case

var app = express();
function middlewareA(req, res, next) {
    console.log('middlewareA before next()');
    next();
    console.log('middlewareA after next()');
}

function middlewareB(req, res, next) {
    console.log('middlewareB before next()');
    next();
    console.log('middlewareB after next()');
}

function middlewareC(req, res, next) {
    console.log('middlewareC before next()');
    next();
    console.log('middlewareC after next()');
}

app.use(middlewareA);
app.use(middlewareB);
app.use(middlewareC);
app();
```


## 资料
[Koa2 和 Express 中间件对比](https://www.cnblogs.com/cckui/p/10991062.html)

[Express中间件的原理及实现](https://www.jianshu.com/p/797a4e38fe77)
