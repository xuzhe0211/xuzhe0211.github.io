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
    // controller/blog
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
    const getDetail = (id) => {
        // 先返回假数据
        return {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: '123233',
            author: '张三',
        }
    }
    module.exports = {
        getList: getList,
        getDetail: getDetail,
    }
    // src/router/blog
    const { getList, getDetail } = require('../controller/blog')
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
            // return {
            // 	msg: '这是获取博客详情的接口',
            // }
            let id = req.query.id
            const data = getDetail(id)
            return new SuccessModel(data)
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
    - 读取文件
    ```js
    const fs = require('fs')
    const path = require('path')

    // const fullFileName = path.resolve(__dirname, 'files', 'a.json')
    // fs.readFile(fullFileName, (err, data) => {
    // 	if (err) {
    // 		console.error(err)
    // 		return
    // 	}
    // 	console.log(data.toString())
    // })

    // callback 方式获取一个文件的内容
    // function getFileContent(fileName, callback) {
    // 	const fullFileName = path.resolve(__dirname, 'files', fileName)
    // 	fs.readFile(fullFileName, (err, data) => {
    // 		if (err) {
    // 			console.error(err)
    // 			return
    // 		}
    // 		callback(JSON.parse(data.toString()))
    // 		// console.log(data.toString())
    // 	})
    // }
    // //测试 callback-hell(回调地狱)
    // getFileContent('a.json', (aData) => {
    // 	console.log('a data', aData)
    // 	getFileContent(aData.next, (bData) => {
    // 		console.log('b data', bData)
    // 		getFileContent(bData.next, (cData) => {
    // 			console.log('b data', cData)
    // 		})
    // 	})
    // })

    // 用promise获取文件内容
    function getFileContent(fileName) {
        return new Promise((resolve, reject) => {
            const fullFileName = path.resolve(__dirname, 'files', fileName)
            fs.readFile(fullFileName, (err, data) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(JSON.parse(data.toString()))
            })
        })
    }

    getFileContent('a.json').then((aData) => {
        console.log('a data', aData)
        return getFileContent(aData.next)
    }).then((bData) => {
        console.log('b data', bData)
        return getFileContent(bData.next)
    })
    ```
- 处理 POSTData
    ```js
    // app.js
    const querystring = require('querystring')
    const handleBlogRouter = require('./src/router/blog')
    const handleUserRouter = require('./src/router/user')

    // 用于处理  post data
    const getPostData = (req) => {
        return new Promise((resolve, reject) => {
            if (req.method !== 'POST') {
                resolve({})
                return
            }
            if (req.headers['content-type'] !== 'application/json') {
                resolve({})
                return
            }
            let postData = ''
            req.on('data', (chunk) => {
                postData += chunk.toString()
            })
            req.on('end', () => {
                if (!postData) {
                    resolve({})
                }
                resolve(JSON.parse(postData))
            })
        })
    }

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

        // 解析 query
        req.query = querystring.parse(url.split('?')[1])

        // 处理  post data
        getPostData(req).then((postData) => {
            req.body = postData
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
        })
    }
    module.exports = serverHandle
    ```
- 新建&更新路由
    ```js
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
    const getDetail = (id) => {
        // 先返回假数据
        return {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: '123233',
            author: '张三',
        }
    }
    const newBlog = (blogData = {}) => {
        console.log('new blog', blogData)
        // blogData 是一个博客对象，包含title content属性
        return {
            id: 3, // 表示新建博客，插入到数据表里的id
        }
    }
    const updateBlog = (id, blogData = {}) => {
        // id 就是要更新博客的id
        // blogData 是一个博客对象，包含title content属性
        console.log('update blog', id, blogData)
        return false
    }
    module.exports = {
        getList: getList,
        getDetail: getDetail,
        newBlog: newBlog,
        updateBlog: updateBlog,
    }
    // src/router/blog.js
    const {
        getList,
        getDetail,
        newBlog,
        updateBlog,
    } = require('../controller/blog')
    const { SuccessModel, ErrorModel } = require('../model/resModel')
    const hanldeBlogRouter = (req, res) => {
        const method = req.method
        let id = req.query.id
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
            // return {
            // 	msg: '这是获取博客详情的接口',
            // }
            const data = getDetail(id)
            return new SuccessModel(data)
        }
        // 新建一篇博客
        if (method === 'POST' && req.path === '/api/blog/new') {
            const blogData = req.body
            const data = newBlog(req.body)
            return new SuccessModel(data)
            // return {
            // 	msg: '这是新建博客的接口',
            // }
        }
        // 更新一篇博客
        if (method === 'POST' && req.path === '/api/blog/update') {
            const result = updateBlog(id, req.body)
            if (result) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新失败')
            }
            // return {
            // 	msg: '这是更新博客的接口',
            // }
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
- 删除博客路由和登录路由

    ```js
    // src/router/blog.js
    const {
        getList,
        getDetail,
        newBlog,
        updateBlog,
        delBlog,
    } = require('../controller/blog')
    const { SuccessModel, ErrorModel } = require('../model/resModel')
    const hanldeBlogRouter = (req, res) => {
        const method = req.method
        let id = req.query.id
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
            // return {
            // 	msg: '这是获取博客详情的接口',
            // }
            const data = getDetail(id)
            return new SuccessModel(data)
        }
        // 新建一篇博客
        if (method === 'POST' && req.path === '/api/blog/new') {
            const blogData = req.body
            const data = newBlog(req.body)
            return new SuccessModel(data)
            // return {
            // 	msg: '这是新建博客的接口',
            // }
        }
        // 更新一篇博客
        if (method === 'POST' && req.path === '/api/blog/update') {
            const result = updateBlog(id, req.body)
            if (result) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新失败')
            }
            // return {
            // 	msg: '这是更新博客的接口',
            // }
        }
        // 删除一篇博客
        if (method === 'POST' && req.path === '/api/blog/del') {
            const result = delBlog(id, req.body)
            if (result) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除博客失败')
            }
        }
    }
    module.exports = hanldeBlogRouter

    // src/controller/blog.js
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
    const getDetail = (id) => {
        // 先返回假数据
        return {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: '123233',
            author: '张三',
        }
    }
    const newBlog = (blogData = {}) => {
        console.log('new blog', blogData)
        // blogData 是一个博客对象，包含title content属性
        return {
            id: 3, // 表示新建博客，插入到数据表里的id
        }
    }
    const updateBlog = (id, blogData = {}) => {
        // id 就是要更新博客的id
        // blogData 是一个博客对象，包含title content属性
        console.log('update blog', id, blogData)
        return false
    }
    const delBlog = (id) => {
        // id 就是要删除博客的id
        return true
    }
    module.exports = {
        getList: getList,
        getDetail: getDetail,
        newBlog: newBlog,
        updateBlog: updateBlog,
        delBlog,
    }

    // src/router/user
    const { loginCheck } = require('../controller/user')
    const { SuccessModel, ErrorModel } = require('../model/resModel')

    const handleUserRouter = (req, res) => {
        const method = req.method

        // 登录
        if (method === 'POST' && req.path === '/api/user/login') {
            const { username, password } = req.body
            console.log(loginCheck)
            const result = loginCheck(username, password)
            if (result) {
                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        }
    }
    module.exports = handleUserRouter

    // src/controller/user.js
    const loginCheck = (username, password) => {
        // 先使用假数据
        if (username === 'zhangsan' && password === '123') return true
        return false
    }
    module.exports = {
        loginCheck,
    }
    ```

## 总结
- nodejs处理http请求的常用技能，postman的使用
- nodejs开发博客项目的接口(未连接数据库，未使用登录)
- 理解为何要将router和controller分开


## 补充--路由和API

API:前端和后端、不同端(子系统)之间对接的一个术语
- url(路由)，/api/blog/list   输入、输出

路由
- API的一部分
- 后端系统内部的一个定义