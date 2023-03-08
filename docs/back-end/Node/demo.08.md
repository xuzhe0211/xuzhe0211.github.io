---
autoGroup-8: Node开发一个博客
title: 博客项目之登录-cookie做限制
---
```js
// src/router/user.js
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
	const method = req.method

	// 登录
	if (method === 'GET' && req.path === '/api/user/login') {
		const { username, password } = req.query
		const result = login(username, password)
		return result.then((data) => {
			if (data.username) {
				// 操作 cookie
				res.setHeader(
					'Set-Cookie',
					`username=${data.username};path=/;httpOnly` // 增加httpOnly
				)
				return new SuccessModel()
			}
			return new ErrorModel('登录失败')
		})
	}
	// 登录验证测试
	if (method === 'GET' && req.path === '/api/user/login-test') {
		if (req.cookie.username) {
			return Promise.resolve(
				new SuccessModel({
					username: req.cookie.username,
				})
			)
		}
		return Promise.resolve(new ErrorModel('尚未登录'))
	}
}
module.exports = handleUserRouter


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

	// 解析cookie
	req.cookie = {}
	const cookieStr = req.headers.cookie || '' // k1 = v1; k2 = v2
	cookieStr.split(';').forEach((item) => {
		if (!item) return
		const arr = item.split('=')
		const key = arr[0].trim() // 清除空格
		const value = arr[1].trim() // 清除空格
		req.cookie[key] = value
	})
	console.log(req.cookie)
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

```
![服务端获取到的cookie的username](./images/5.png)
>服务端获取到的cookie的username


- 设置过期时间

	```js
	// src/router/user.js
	const { login } = require('../controller/user')
	const { SuccessModel, ErrorModel } = require('../model/resModel')

	// 获取cookie的过期时间
	const getCookieExpires = () => {
		const d = new Date()
		d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
		console.log('d.toGMTString:', d.toGMTString())
		return d.toGMTString()
	}

	const handleUserRouter = (req, res) => {
		const method = req.method

		// 登录
		if (method === 'GET' && req.path === '/api/user/login') {
			const { username, password } = req.query
			const result = login(username, password)
			return result.then((data) => {
				if (data.username) {
					// 操作 cookie
					res.setHeader(
						'Set-Cookie',
						`username=${
							data.username
						};path=/;httpOnly; expires=${getCookieExpires()}` // 设置过期时间
					)
					return new SuccessModel()
				}
				return new ErrorModel('登录失败')
			})
		}
		// 登录验证测试
		if (method === 'GET' && req.path === '/api/user/login-test') {
			if (req.cookie.username) {
				return Promise.resolve(
					new SuccessModel({
						username: req.cookie.username,
					})
				)
			}
			return Promise.resolve(new ErrorModel('尚未登录'))
		}
	}
	module.exports = handleUserRouter
	```
## 总结
- 知道cookie的定义和特点
- 前后端如何查看和修改cookie？
- 如何使用cookie使用登录验证？