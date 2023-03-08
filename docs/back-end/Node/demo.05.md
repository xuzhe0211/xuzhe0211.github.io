---
autoGroup-8: Node开发一个博客
title: nodejs操作mysql
---
- 示例：用demo演示，不考试使用
- 封装：将起封装为系统可用的工具
- 使用：让API直接操作数据库，不在使用假数据

```js
const mysql = require('mysql')

// 创建链接对象
const con = mysql.createConnection({
	host: '127.0.0.1',
	port: 12345,
	user: 'root',
	password: '123456',
	database: 'myblog',
})
// 开始链接
con.connect()

// 执行sql语句
// const sql = 'select * from users'
// const sql = 'select id, username from users'
// const sql = `update users set realname='李四' where username='lisi';`

const sql = `insert into blogs (title, content, createtime, author) values('标题C', '内容C', 1677758988281, 'zhangsan');`
con.query(sql, (err, result) => {
	if (err) {
		console.error(err)
		return
	}
	console.log(result)
})

con.end()
```

## nodejs 链接 mysql 做成工具 
```js
// src/config/db.js
const env = process.env.NODE_ENV // 环境变量

// 配置
let MYSQL_CONFIG

if (env === 'dev') {
	MYSQL_CONFIG = {
		host: '127.0.0.1',
		port: 12345,
		user: 'root',
		password: '123456',
		database: 'myblog',
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
}
modele.exports = {
	MYSQL_CONFIG,
}


// src/db/mysql.js
const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config')

// 创建链接对象
const con = mysql.createConnection(MYSQL_CONFIG)

// 开始链接
con.connect()

// 统一执行 sq l的函数
function exec(sql) {
	return new Promise((resolve, reject) => {
		con.query(sql, (err, result) => {
			if (err) {
				reject(err)
				return
			}
			resolve(result)
		})
	})
}

module.exports = {
	exec,
}
```