---
autoGroup-2: 框架
title: 玩转Koa-koa-bodyparser原理解析
---
## 描述
koa处理post请求的时，需要对body传递过来的数据进行处理

实际上如果要手动实现一个能够处理application/x-www-urlencoded的中间件，还得借助原生node.js进行处理，

koa封装了原生node.js的request对象到ctx.req中

而借助原生node.js的request对象，监听data事件以及end事件，进行处理

> koa-bodyparser post请求body解析的中间件；bodyparser可以解析普通的表单（application/x-www-form-urlencoded），没办法解析文件（Content-Type:multipart/form-data）

## 前置知识
在理解koa-bodyparser原理之前，首先需要了解部分HTTP相关知识

### 报文主体
HTTP报文主要分为请求报文和响应报文,koa-bodyparser主要针对请求报文的处理

请求报文主要由以下三个部分组成
- 报文头部
- 空行
- 报文主体

而koa-bodyparser中的body指的就是请求报文中的报文主体部分。

### 服务器端获取报文主体流程
HTTP底层采用TCP提供可靠的字节流服务,简单而言就是报头主体部分会被转换成二进制数据在网络中传输，所以服务器端首先需要拿到二进制流数据。

谈到网络传输，当然会涉及到传输速度的优化，而其中一种优化方式就是对内容进行压缩编码，常用的压缩编码方式有
- gzip
- compress
- deflate
- identity(不执行压缩或不会变化的默认编码格式)

服务器端会根据报文头部信息中的Content-Encoding确认采用何种编码规范

接下来就需要将二进制数据转换为相应的字符，而字符也有不同的字符编码方式，例如对于中文字符处理差异巨大的UTF-8和GBK,UTF-8编码汉字通常需要三个字节，而GBK只需要两个字节。所以还需要在请求报文的头部信息中设置Content-Type使用的字符编码信息(默认情况下采用的是UTF-8),这样服务器端就可以利用响应的字符规则进行编码，得到正确的字符串。

拿到字符串之后，服务器又要问了:客户端，这一段字符串是啥意思啊？

根据不同的应用场景，客户端会对字符串采用不同的编码方式，长江的编码方式有

- URL编码方式：a= 1 &b =1;
- JSON编码方式: {a: 1, b: 2}

客户端会将采用的字符串编码方式设置在请求报文头部信息的Content-Type属性中，这样服务器端根据相应的字符串编码规则进行解码，就能够明白客户端所传递的信息了。

下面一步步分析koa-bodyparser是如何处理这一系列操作的，从而得到报文主体的内容。

## 获取二进制数据流
NodeJS中获取请求报文主体二进制数据流主要通过监听request对象的data事件完成。
```
// 示例一
const http = require('http');

http.createServer((req, res) => {
  const body = [];

  req.on('data', chunk => {
    body.push(chunk);
  })

  req.on('end', () => {
    const chunks = Buffer.concat(body); // 接收到的二进制数据流

    // 利用res.end进行相应处理
    res.end(chunks.toString())
  })
}).listen(1234)
```

而koa-bodyparser主要是对[co-body](https://github.com/cojs/co-body)的封装,而【co-body】中主要采用[raw-body](https://github.com/stream-utils/raw-body)模块获取请求报文主体的二进制数据流，【raw-body】主要是对上述示例代码的封装和健壮性处理。

## 内容解码
客户端会将内容编码的方式放入请求报文头部信息Content-Encoding属性中,服务器端接受报文主体的二进制数据时,会根据该头部信息进行解压操作，当然服务器端可以在响应报文头部信息Accept-Encoding属性中添加支持的解压方式

而【raw-body】主要采用[inflation](https://github.com/stream-utils/inflation)模块进行解压处理

## 字符解码
一般而言，UTF-8是互联网中主流的字符编码方式，前面也提到了还有GBK编码方式，相比较UTF-8，它编码中文只需要2个字节，那么在字符编码时误用UTF-8编码GKB编码字符，就会出现中文乱码问题。

NodeJS主要通过Buffer处理二进制数据流，但是它并不支持GBK字符编码方式，需要通过[iconv-lite](https://github.com/ashtuchkin/iconv-lite)模块进行处理

**示例一**中的代码就存在没有正确处理字符编码的问题,那么报文主体中的字符采用GBK编码方式，必然会出现中文乱码
```
const request = require('request');
const iconv = require('iconv-lite');

request.post({
  url: 'http://localhost:1234/',
  body: iconv.encode('中文', 'GBK'),
  headers: {
    'Content-Type': 'text/plain;charset=GBK'
  }
}, (error, response, body) => {
  console.log(body); // 发生中文乱码情况
})
```
NodeJS中的Buffer默认采用UTF-8字符编码方式，这里借助【iconv-lite】模块处理不同的字符编码方式
```
const chunks = Buffer.concat(body);
res.end(iconv.decode(chunks, charset)); // charset通过Content-Type得到
```
## 字符串解码
前面已经提到了字符串的二种编码方式，他们对应的Content-Type分别为：
- URL编码application/x-www-form-urlencoded
- JSON编码 application/json

对于前端来说，URL编码并不默认，经常会用到URL拼接操作，唯一需要注意的是不要忘记对键值对进行decodeURIComponent()处理

当客户端发送请求主体时，需要进行编码操作
```
'a=1&b=2&c=3'
```
服务器端在根据URL编码规则解码，得到响应的对象。
```
// URL编码方式 简单的解码方法实现
function decode(qs, sep = '&', eq = '=') {
  const obj = {};
  qs = qs.split(step);

  for (let i = 0, max = qs.length; i < max; i++) {
    const item = qs[i];
    const index = item.indexOf(eq);

    let key, value = item.

    if (~index) {
      key = item.substr(0, index);
      value = item.substr(index + 1);
    } else {
      key = item;
      value = ''
    }
    key = decodeURIComponent(key);
    value = decodeURIComponent(value);

    if (!obj.hasOwnProperty(key)) {
      obj[key] = value;
    }
  }
  return obj;
}
console.log(decode('a=1&b=2&c=3')) // {a: '1', b: '2', c: '3'}
```
URL编码方式是和处理简单的键值对数据，并且很多框架的Ajax中的Content-Type默认值都是它，但是对于复杂的嵌套对象就不太好处理了，这时就需要JSON编码方式大显身手了。

客户端发送请求主体时，只需要采用JSON.stringify进行编码。服务器端只要采用JSON.parse进行解码即可
```
const strictJSONReg = /^[\x20\x09\x0a\x0d]*(\[|\{)/;
function parse(str) {
  if (!strict) return str ? JSON.parse(str) : str;
  // 严格模式下，总是返回一个对象
  if (!str) return {};
  // 是否为合法的JSON字符串
  if (!strictJSONReg.test(str)) {
    throw new Error('invalid JSON, only supports object and array');
  }
  return JSON.parse(str);
}
```
除了上述两种字符串编码方式，koa-bodyparser还支持不采用任何字符串编码方式的普通字符串

三种字符串编码处理由【co-body】模块提供，koa-bodyparser中通过判断Content-Type类型，调用不同的处理方式，将获取到的结果挂载在ctx.request.body

```
return async function bodyParser(ctx, next) {
  if(ctx.request.body !== undefined) return await next();
  if (ctx.disableBodyParser) return await next();
  try {
    // 最重要的异步，将解析的内容挂在到koa的上下文中
    const res = await parseBody(ctx);
    ctx.request.body = 'parsed' in res ? res.parsed : {};
    if (ctx.request.rawBody === undefined) ctx.request.rawBody = res.raw; // 保存原始字符串
  } catch (err) {
    if (onerror) {
      onerror(err, ctx);
    } else {
      throw err;
    }
  }
  await next();
}

async function parseBody(ctx) {
    if (enableJson && ((detectJSON && detectJSON(ctx)) || ctx.request.is(jsonTypes))) {
      return await parse.json(ctx, jsonOpts); // application/json等json type
    }
    if (enableForm && ctx.request.is(formTypes)) {
      return await parse.form(ctx, formOpts); // application/x-www-form-urlencoded
    }
    if (enableText && ctx.request.is(textTypes)) {
      return await parse.text(ctx, textOpts) || ''; // text/plain
    }
    return {};
}
```
其实还有一种比较常见的Content-type, 当采用表单上传时，报文主体中会包含多个实体主体：
```
------WebKitFormBoundaryqsAGMB6Us6F7s3SF
Content-Disposition: form-data; name="image"; filename="image.png"
Content-Type: image/png


------WebKitFormBoundaryqsAGMB6Us6F7s3SF
Content-Disposition: form-data; name="text"

------WebKitFormBoundaryqsAGMB6Us6F7s3SF--
```
这种方式处理相对比较复杂，koa-bodyparser中并没有提供该Content-Type的解析。（下一篇中应该会介绍_）

## 总结
以上便是koa-bodyparser的核心实现原理，其中涉及到很多关于HTTP的基础知识，对于HTTP不太熟悉的同学，可以推荐看【图解HTTP】

## 资料
[玩转Koa-koa-bodyparser原理解析](https://www.imooc.com/article/274059)