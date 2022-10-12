---
autoGroup-3: 学习
title: egg原理解析
---

## 课堂主题
1. koa不足的地方
2. 封装路由
3. 实现控制器层
4. 实现服务层
5. 实现模型层
6. 加载中间件


hash -> md5 sha1 sha256
摘要算法 
雪崩效应--有一点变动后面就很大变动
不定长 => 定长

hmac 含有密钥的hash

Redis与其他key-value缓存产品有以下三个特点
1. Redis支持数据持久化，可以将内存中的数据保存在硬盘中，重启的时候再次加载使用
2. Redis不仅仅支持简单的key-value类型的数据，同时还支持提供list，set,get，hash的等数据的存储
3. Redist支持数据备份，即master-slave模式的数据备份

优势
1. 性能极高
2. 丰富的数据类型
3. 原子
4. 丰富的特性

## 使用
```js
// controller/home.js
const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const {ctx} = this;
        ctx.body = 'hi,egg'
    }
}
module.exports = HomeController;

// controller/user.js
const {Controller} = require('egg');

class UserController extends Controller {
    async index() {
        // this.ctx.body = {
            // name: 'tom'
        // }
        const {ctx} = this;
        ctx.body = await ctx.service.user.getAll();
    }
}
module.export = UserController;

// service/user.js
const { Service } = require('egg'); 

class UserService extends Service {
    async getAll() {
        return {
            name: 'tom Ctrl'
        }
        return await this.ctx.model.User.findAll()
    }
}

// model/user.js
module.exports = app => {
    const {STRING} = app.Sequelize;

    const User = app.model.define(
        'user',
        {name: STRING(30)},
        {timestamps: false}
    )

    // 数据库同步
    User.sync({force: true})

    return User;
}

// router.js
module.exports = app => {
    const {router, controller} = app;
    router.get('/', controller.home.index);
    router.get('/user', controller.user.index);
}
```

## 实现

三层结构+约定优于定义

新建routes/index.js，默认index.js没有前缀

```js
module.exports = {
    'get /': async ctx => {
        ctx.body = '首页'
    },
    'get /detail': async ctx => {
        ctx.body = '详情页面'
    }
}
```

新建routes/user.js 路由前缀/user
```js
module.exports = {
    // /user/
    'get /': async ctx => {
        ctx.body = '⽤用户⾸首⻚页';
    },
    // /user/info
    'get /info': ctx => {
        ctx.body = '⽤用户详情⻚页⾯面';
    } 
};
```
