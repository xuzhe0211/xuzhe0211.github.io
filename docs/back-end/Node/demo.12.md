---
autoGroup-8: Node开发一个博客
title: 博客项目之登录-登录验证
---
```js
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
	if (method === 'POST' && req.path === '/api/user/login') {
		// const { username, password } = req.query
		const { username, password } = req.body
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
	// if (method === 'GET' && req.path === '/api/user/login-test') {
	// 	console.log(req.session, 'req.session')
	// 	if (req.session.username) {
	// 		return Promise.resolve(
	// 			new SuccessModel({
	// 				session: req.session,
	// 			})
	// 		)
	// 	}
	// 	return Promise.resolve(new ErrorModel('尚未登录'))
	// }
}
module.exports = handleUserRouter


// src/router/blog.js
const {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	delBlog,
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 统一的登录验证函数
const loginCheck = (req) => {
	if (!req.session.username) {
		return Promise.resolve(new ErrorModel('尚未登录'))
	}
}

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
		const loginCheckResult = loginCheck(req)
		if (loginCheckResult) {
			// 未登录
			return loginCheckResult
		}

		req.body.author = req.session.username
		const result = newBlog(req.body)
		return result.then((data) => {
			return new SuccessModel(data)
		})
	}
	// 更新一篇博客
	if (method === 'POST' && req.path === '/api/blog/update') {
		const loginCheckResult = loginCheck(req)
		if (loginCheckResult) {
			// 未登录
			return loginCheckResult
		}
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
		const loginCheckResult = loginCheck(req)
		if (loginCheckResult) {
			// 未登录
			return loginCheckResult
		}
		const author = req.session.username
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
[session存入redis](https://blog.csdn.net/weixin_45196863/article/details/125591903)