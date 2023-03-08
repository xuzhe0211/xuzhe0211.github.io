---
autoGroup-8: Node开发一个博客
title: API对接mysql（列表、博客详情和新建）
---
## API对接mysql（博客列表）
```js
// src/controller/blog.js
const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
	let sql = `select * from blogs where 1=1 ` // 1=1 占位 如果author 和keyword都不存在的情况下
	if (author) {
		sql += `and author='${author}'`
	}
	if (keyword) {
		sql += `and title like '%${keyword}%'`
	}
	sql += `order by createtime desc`
	// 返回的是promise
	return exec(sql)
}

//src/router/blog.js
// 获取博客列表
// 获取博客列表
if (method === 'GET' && req.path === '/api/blog/list') {
	const author = req.query.author || ''
	const keyword = req.query.keyword || ''
	// const listData = getList(author, keywords)
	// return new SuccessModel(listData)
	const result = getList(author, keyword)
	return result.then((listData) => {
		return new SuccessModel(listData)
	})
}

// app.js
// 处理  post data
getPostData(req).then((postData) => {
    req.body = postData

    // 处理blog路由
    // const blogData = handleBlogRouter(req, res)
    // if (blogData) {
    // 	res.end(JSON.stringify(blogData))
    // 	return
    // }

    const blogResult = handleBlogRouter(req, res) // 重点这里
    if (blogResult) {
        blogResult.then((blogData) => {
            res.end(JSON.stringify(blogData))
        })
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
```
## 博客详情和新建/更新删除
```js
// src/controller/blog.js
const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
	let sql = `select * from blogs where 1=1 ` // 1=1 占位 如果author 和keyword都不存在的情况下
	if (author) {
		sql += `and author='${author}'`
	}
	if (keyword) {
		sql += `and title like '%${keyword}%'`
	}
	sql += `order by createtime desc`
	// 返回的是promise
	return exec(sql)
}
const getDetail = (id) => {
	const sql = `select * from blogs where id='${id}'`
	return exec(sql).then((rows) => {
		return rows[0]
	})
}
const newBlog = (blogData = {}) => {
	// blogData 是一个博客对象，包含title content author属性
	const title = blogData.title
	const content = blogData.content
	const author = blogData.author
	const createtime = Date.now()

	const sql = `
		insert into blogs (title, content, createtime, author)
		values ('${title}', '${content}','${createtime}', '${author}')
	`
	return exec(sql).then((insertData) => {
		console.log('insertData', insertData)
		return {
			id: insertData.insertId,
		}
	})
}
const updateBlog = (id, blogData = {}) => {
	// id 就是要更新博客的id
	// blogData 是一个博客对象，包含title content属性

	const title = blogData.title
	const content = blogData.content

	const sql = `
		update blogs set title='${title}', content ='${content}' where id=${id}
	`
	return exec(sql).then((updateData) => {
		console.log('updateData is ', updateData)
		if (updateData.affectedRows > 0) return true // 影响的结果集
		return false
	})
}
const delBlog = (id, author) => {
	// id 就是要删除博客的id
	const sql = `delete from blogs where id=${id} and author='${author}'`
	return exec(sql).then((deleteData) => {
		if (deleteData.affectedRows) return true
		return false
	})
}
module.exports = {
	getList: getList,
	getDetail: getDetail,
	newBlog: newBlog,
	updateBlog: updateBlog,
	delBlog,
}

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
		const author = req.query.author || ''
		const keyword = req.query.keyword || ''
		// const listData = getList(author, keywords)
		// return new SuccessModel(listData)
		const result = getList(author, keyword)
		return result.then((listData) => {
			return new SuccessModel(listData)
		})
	}

	// 获取博客详情
	if (method === 'GET' && req.path === '/api/blog/detail') {
		// const data = getDetail(id)
		// return new SuccessModel(data)
		const result = getDetail(id)
		return result.then((data) => {
			return new SuccessModel(data)
		})
	}
	// 新建一篇博客
	if (method === 'POST' && req.path === '/api/blog/new') {
		// const data = newBlog(req.body)
		// return new SuccessModel(data)

		req.body.author = 'zhangsan' // 假数据，待开发登录时候在改成真实数据
		const result = newBlog(req.body)
		return result.then((data) => {
			return new SuccessModel(data)
		})
	}
	// 更新一篇博客
	if (method === 'POST' && req.path === '/api/blog/update') {
		const result = updateBlog(id, req.body)
		return result.then((val) => {
			if (val) {
				return new SuccessModel()
			} else {
				return new ErrorModel('更新失败')
			}
		})
	}
	// 删除一篇博客
	if (method === 'POST' && req.path === '/api/blog/del') {
		const author = 'zhangsan' // 假数据，待开发登录时在改成正式数据
		const result = delBlog(id, author)
		return result.then((val) => {
			if (val) {
				return new SuccessModel()
			} else {
				return new ErrorModel('删除博客失败')
			}
		})
	}
}
module.exports = hanldeBlogRouter
```

## API对接mysql（登录）
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
		// const blogData = handleBlogRouter(req, res)
		// if (blogData) {
		// 	res.end(JSON.stringify(blogData))
		// 	return
		// }

		const blogResult = handleBlogRouter(req, res)
		if (blogResult) {
			blogResult.then((blogData) => {
				res.end(JSON.stringify(blogData))
			})
			return
		}

		// 处理user路由
		// const userData = handleUserRouter(req, res)
		// if (userData) {
		// 	res.end(JSON.stringify(userData))
		// 	return
		// }
		const userResult = handleUserRouter(req, res)
		if (userResult) {
			userResult.then((userData) => {
				res.end(JSON.stringify(userData))
			})
			return
		}
		// 未命中路由，返回 404
		res.writeHead(404, { 'Content-Type': 'text/plain' })
		res.write('404 Not Fount\n')
		res.end()
	})
}
module.exports = serverHandle

// src/controller/user.js
const { exec } = require('../db/mysql')

const loginCheck = (username, password) => {
	const sql = `
		select username, realname from users where username='${username}' and password='${password}'
	`
	return exec(sql).then((rows) => {
		return rows[0] || {}
	})
}
module.exports = {
	loginCheck,
}

// src/router/user.js
const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
	const method = req.method

	// 登录
	if (method === 'POST' && req.path === '/api/user/login') {
		const { username, password } = req.body
		console.log(loginCheck)
		const result = loginCheck(username, password)
		return result.then((data) => {
			if (data.username) {
				return new SuccessModel()
			}
			return new ErrorModel('登录失败')
		})
	}
}
module.exports = handleUserRouter
```
## 总结
- 接口总结
	- nodejs连接mysql， 如何执行sql语句
	- 根据NODE_ENV区分配置
	- 封装exec函数,API使用exec操作数据库

- 之前一起总结
	- 安装Mysql和workbeanch
	- 创建库，表，SQL语句的语法和使用
	- node连接Mysql，应用到API