---
autoGroup-8: Node开发一个博客
title: 博客项目之登录-nodejs链接redis的demo
---
## 用redis存储session
- nodejs链接redis的demo
- 封装成工具函数，可供API使用

```js
const redis = require('redis')

// 创建客户端
const redisClient = redis.createClient(6379, '0.0.0.0')
redisClient.on('error', (err) => {
	console.error(err)
})
//测试
redisClient.set('myname', 'zhangsan2', redis.print)
redisClient.get('myname', (err, val) => {
	if (err) {
		console.error(err)
		return
	}
	console.log('val ', val)

	// 退出
	redisClient.quit()
})
```
[Node.js连接redis显示ClientClosedError错误的解决方法](https://blog.csdn.net/u012690117/article/details/121585659)

## 封装成工具函数，可供API使用
> blog重启需要重启登录
```js
// config/db
const env = process.env.NODE_ENV // 环境变量

// 配置
let MYSQL_CONFIG
let REDIS_CONFIG

if (env === 'dev') {
	MYSQL_CONFIG = {
		host: '127.0.0.1',
		port: 12345,
		user: 'root',
		password: '123456',
		database: 'myblog',
	}

	// redis
	REDIS_CONFIG = {
		port: 6379,
		host: '127.0.0.1',
	}
}
if (env === 'production') {
	MYSQL_CONFIG = {
		host: '127.0.0.1',
		port: 12345,
		user: 'root',
		password: '123456',
		database: 'myblog',
	}
	// redis
	REDIS_CONFIG = {
		port: 6379,
		host: '127.0.0.1',
	}
}
module.exports = {
	MYSQL_CONFIG,
	REDIS_CONFIG,
}

// db/redis.js
const redis = require('redis')
const { REDIS_CONFIG } = require('../config')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)
redisClient.on('error', (err) => {
	console.error(err)
})

function set(key, val) {
	if (typeof val === 'object') {
		val = JSON.stringify(val)
	}
	redisClient.set(key, val, redis.print)
}

function get(key) {
	return new Promise((resolve, reject) => {
		redisClient.get(key, (err, val) => {
			if (err) {
				reject(err)
				return
			}
			// resolve(val)
			if (val === null) {
				resolve(null)
				return
			}
			try {
				resolve(JSON.parse(val))
			} catch (e) {
				resolve(val)
			}
		})
	})
}

module.exports = {
	set,
	get,
}
```

## session存入redis
```js
// app.js
const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { get, set } = require('./src/db/redist')

// 获取cookie的过期时间
const getCookieExpires = () => {
	const d = new Date()
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
	console.log('d.toGMTString:', d.toGMTString())
	return d.toGMTString()
}

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

const serverHandle = async (req, res) => {
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
		const key = arr[0].trim()
		const value = arr[1].trim()
		req.cookie[key] = value
	})

	//解析session 使用redis
	let needSetCookie = false
	let userId = req.cookie.userId
	if (!userId) {
		needSetCookie = true
		userId = `${Date.now()}_${Math.random()}`
		// 初始化redis中的seesion值
		set(userId, {})
	}

	// 获取session
	req.sessionId = userId
	const sessionData = await get(req.sessionId)
	if (sessionData === null) {
		// 初始化 redis 中的session 值
		set(req.sessionId, {})
		// 设置session
		req.session = {}
	} else {
		req.session = sessionData
	}

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
				if (needSetCookie) {
					res.setHeader(
						'Set-Cookie',
						`userId=${userId};path=/;httpOnly; expires=${getCookieExpires()}`
					)
				}
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
			if (needSetCookie) {
				res.setHeader(
					'Set-Cookie',
					`userId=${userId};path=/;httpOnly; expires=${getCookieExpires()}`
				)
			}
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

// src/router/user.js
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { get, set } = require('../db/redist')

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
				// 设置session
				req.session.username = data.username
				req.session.realname = data.realname
				console.log('req.sesion is:', req.session)

				// 同步到redis
				console.log(req.sesionId, req.session)
				set(req.sessionId, req.session)

				return new SuccessModel()
			}
			return new ErrorModel('登录失败')
		})
	}
	// 登录验证测试
	if (method === 'GET' && req.path === '/api/user/login-test') {
		console.log(req.session, 'req.session')
		if (req.session.username) {
			return Promise.resolve(
				new SuccessModel({
					session: req.session,
				})
			)
		}
		return Promise.resolve(new ErrorModel('尚未登录'))
	}
}
module.exports = handleUserRouter
```

[session存入redis](https://blog.csdn.net/weixin_45196863/article/details/125591903)