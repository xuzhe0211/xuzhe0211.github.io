---
autoGroup-8: Node开发一个博客
title: 搭建开发环境 & 开发接口
---
- 从0开始搭建，不使用任何框架
- 使用nodemon检测文件变化，自动重启node
- 使用cross-env设置环境变量，兼容mac linux 和window

## 开始搭建
```shell
blog-1
--- bin
    ---www.js
---app.js
---package.json
```

```js
// package.json
"dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js",
"prd": "cross-env NODE_ENV=production nodemon ./bin/www.js"

// www.js和server配置相关；app.js和业务相关

// app.js
const serverHandle = (req, res) => {
	// 设置返回格式JSON
	res.setHeader('Content-Type', 'application/json')

	const resData = {
		name: '双越100',
		site: 'imooc',
		evn: process.env.NODE_ENV,
	}

	res.end(JSON.stringify(resData))
}
module.exports = serverHandle

// www.js
const http = require('http');

const PORT = 8000;

const serverHandle = require('../app'); 

const server = http.createServer(serverHandle);
server.listen(PORT);
```

## 开发接口
- 初始化路由:根据之前的技术方案设计，做出路由
- 返回假数据：将路由和数据处理分离，以符合设计原则 

[接口设计](/back-end/Node/demo.02.html#接收设计)

### 代码演示
```js
// src/router/blog.js
const hanldeBlogRouter = (req, res) => {
	const method = req.method

	// 获取博客列表
	if (method === 'GET' && req.path === '/api/blog/list') {
		return {
			msg: '这是获取博客列表的接口',
		}
	}

	// 获取博客详情
	if (method === 'GET' && req.path === '/api/blog/detail') {
		return {
			msg: '这是获取博客详情的接口',
		}
	}
	// 新建一篇博客
	if (method === 'POST' && req.path === '/api/blog/new') {
		return {
			msg: '这是新建博客的接口',
		}
	}
	// 更新一篇博客
	if (method === 'POST' && req.path === '/api/blog/update') {
		return {
			msg: '这是更新博客的接口',
		}
	}
	// 删除一篇博客
	if (method === 'POST' && req.path === '/api/blog/del') {
		return {
			msg: '这是删除博客的接口',
		}
	}
}
module.exports = hanldeBlogRouter

// src/router/user.js
const handleUserRouter = (req, res) => {
	const method = req.method

	// 登录
	if (method === 'POST' && req.path === '/api/user/login') {
		return {
			msg: '这是登录的接口',
		}
	}
}
module.exports = handleUserRouter

// app.js
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const serverHandle = (req, res) => {
	// 设置返回格式JSON
	res.setHeader('Content-Type', 'application/json')

	// const resData = {
	// 	name: '双越100',
	// 	site: 'imooc',
	// 	evn: process.env.NODE_ENV,
	// }
	// res.end(JSON.stringify(resData))

	// 处理 path
	const url = req.url
	req.path = url.split('?')[0]
	console.log(req.path)
	// 处理blog路由
	const blogData = handleBlogRouter(req, res)
	if (blogData) {
		res.end(JSON.stringify(blogData))
		return
	}
	// 处理user路由
	const userData = handleUserRouter(req, res)
	if (userData) {
		res.end(JSON.stringify(userData))
		return
	}

	// 未命中路由，返回 404
	res.writeHead(404, { 'Content-Type': 'text/plain' })
	res.write('404 Not Fount\n')
	res.end()
}
module.exports = serverHandle
```
## 博客列表路由
- 博客列表
    ```js
    // model/resModel
    class BaseModel {
        constructor(data, message) {
            if (typeof data === 'string') {
                this.message = data
                data = null
                message = null
            }
            if (data) {
                this.data = data
            }
            if (message) {
                this.message = message
            }
        }
    }
    class SuccessModel extends BaseModel {
        constructor(data, message) {
            super(data, message)
            this.errno = 0
        }
    }
    class ErrorModel extends BaseModel {
        constructor(data, message) {
            super(data, message)
            this.errno = -1
        }
    }
    module.exports = {
        SuccessModel,
        ErrorModel,
    }
    // controller/blog.js
    const getList = (author, keyword) => {
        // 先返回假数据(格式是正确的)
        return [
            {
                id: 1,
                title: '标题A',
                content: '内容A',
                createTime: 123123,
                author: '张三',
            },
            {
                id: 1,
                title: '标题B',
                content: '内容B',
                createTime: 123123,
                author: '李四',
            },
        ]
    }
    module.exports = {
        getList: getList,
    }
    // router/blog.js
    const { getList } = require('../controller/blog')
    const { SuccessModel, ErrorModel } = require('../model/resModel')
    const hanldeBlogRouter = (req, res) => {
        const method = req.method

        // 获取博客列表
        if (method === 'GET' && req.path === '/api/blog/list') {
            // return {
            // 	msg: '这是获取博客列表的接口',
            // }
            const author = req.query.author || ''
            const keywords = req.query.keywords || ''
            const listData = getList(author, keywords)
            return new SuccessModel(listData)
        }

        // 获取博客详情
        if (method === 'GET' && req.path === '/api/blog/detail') {
            return {
                msg: '这是获取博客详情的接口',
            }
        }
        // 新建一篇博客
        if (method === 'POST' && req.path === '/api/blog/new') {
            return {
                msg: '这是新建博客的接口',
            }
        }
        // 更新一篇博客
        if (method === 'POST' && req.path === '/api/blog/update') {
            return {
                msg: '这是更新博客的接口',
            }
        }
        // 删除一篇博客
        if (method === 'POST' && req.path === '/api/blog/del') {
            return {
                msg: '这是删除博客的接口',
            }
        }
    }
    module.exports = hanldeBlogRouter
    ```
- 博客详情

    ```js
    
    ```