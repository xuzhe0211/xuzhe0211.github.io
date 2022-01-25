---
autoGroup-2: 框架
title: 玩转Koa -- koa-router原理解析
---
## 前言
Koa为了保持自身的简洁，并没有捆绑中间件。但是在实际的开发中，我们需要和形形色色的中间件打交道，本文将要分析的是经常用到的路由中间件--koa-router.

## koa-router概述
koa-router的源码只有两个文件：router.js和layer.js，分别对应Router对象和Layer对象。

Layer对象是对单个路由的管理,其中包含的信息有路由路径(path)、路由请求方法(method)和路由执行函数(middleware),并且提供路由的验证以及params参数解析的方法。

相比较Layer对象，Router对象则是在对所有注册路由的统一处理，并且它的API是面向开发者的。

接下来从以下几个方面全面解析koa-router的实现原理
- Layer对象的实现
- 路路由注册
- 路由匹配
- 路由执行流程

## Layer
Layer对象主要是对单个路由的管理，是整个koa-router中最小的处理单元，后续模块的处理都离不开Layer中的方法，这正是首先介绍Layer的重要原因

```
function Layer(path, methods, middleware, opts) {
  this.opts = opts || {};
  // 支持路由别名
  this.name = this.opts.name || null;
  this.methods = [];
  this.paramNames = [];
  // 将路由执行函数保存在stack中，支持输入多个处理函数
  this.stack = Array.isArray(middleware) ? middleware : [middleware];

  methods.forEach(function(method) {
    var l = this.methods.push(method.toUpperCase());
    // Head请求头部信息与GET一致，这里就一起处理了
    if(this.methods[l - 1] === 'GET') {
      this.methods.unshift('HEAD')
    }
  }, this)

  // 确保类型正确
  this.stack.forEach(function(fn) {
    var type = (typeof fn);
    if (type !== 'function') {
       throw new Error(
        methods.toString() + " `" + (this.opts.name || path) +"`: `middleware` "
        + "must be a function, not `" + type + "`"
      );
    }
  }, this)

  this.path = path;
  // 1. 根据路由路径生成路由正则表达式
  // 2. 将params参数信息保存在paramsNames数组中
  this.regexp = pathToRegExp(path, this.paramNames, this.opts);
}
```
Layer构造函数主要用来初始化路由路径、路由请求方法数组、路由处理函数数组、路由正则表达式以及params参数信息数组，其中主要采用[path-to-regexp](https://github.com/pillarjs/path-to-regexp)方法根据路径字符串生成正则表达式，通过改正则表达式，可以事先路由匹配以及params参数的捕获。

```
// 验证路由
Layer.prototype.match = function(path) {
  return this.regexp.test(path);
}

// 捕获params参数
Layer.prototype.captures = function(path) {
  // 后续会提到 对于路由级别中间件，无需捕获params
  if(this.opts.ignoreCaptures) return [];
  return path.match(this.regexp).slice(1);
}
```
根据paramsNames中的参数信息以及captrues方法，可以获取到当前路由params参数的键值对
```
Layer.prototype.params = funciton(path, captures, existingParams) {
  var params = existingParams || {};
  for (var len = captures.length, i = 0; i < len; i++) {
    if (this.paramNames[i]) {
      var c = captures[i];
      params[this.paramNames[i].name] = c ? safeDecodeURIComponent(c) : c;
    }
  }
  return params;
}
```
需要注意上述代码中的safeDecodeURIComponent方法，为了避免服务器收到不可预知的请求，对于任何用户输入的作为URI部分的内容都需要采用encodeURIComponent进行转义，否则当用户输入的内容中含有'&'、'='、'?'等字符时，会出现预料之外的情况。而当我们获取URL上的参数时，则需要通过decodeURIComponent进行解码，而decodeURIComponent进行解码，而decodeURLComponent只能解码有encodeURIComponent方法或者类似方法解码，如果编码方法不符合要求，decodeURIComponent则会抛出异常URIError，所以作者在这里对该方法进行了安全处理
```
function safeDecodeURIComponent(text) {
  try {
    return decodeURIComponent(text);
  } catch (e) {
    // 编码方式不符合要求，返回原字符串
    return text;
  }
}
```
Layer还提供了对于单个params前置处理的方法
```
Layer.prototype.param = function(param, fn) {
  var stack = this.stack;
  var params = this.paramNames;
  var middleware = function(ctx, next) {
    return fn.call(this, ctx.params[param], ctx, next);
  }
  middleware.param = param;
  var names = params.map(function(p) {
    return p.name;
  })
  var x = names.indexOf(param);
  if (x > -1) {
    stack.some(function (fn, i) {
      if (!fn.param || names.indexOf(fn.param) > x) {
        // 将单个param前置处理函数插入正确的位置
        stack.splice(i, 0, middleware);
        return true; // 跳出循环
      }
    });
  }

  return this;
}
```
上述代码中通过some方法寻找单个param处理函数的原因在于以下两点
- 保持param处理函数位于其他路由处理函数的前面
- 路由中存在多个param参数，需保持param处理函数的先后顺序

```
Layer.prototype.setPrefix = function (prefix) {
  if (this.path) {
    this.path = prefix + this.path; // 拼接新的路由路径
    this.paramNames = [];
    // 根据新的路由路径字符串生成正则表达式
    this.regexp = pathToRegExp(this.path, this.paramNames, this.opts);
  }
  return this;
};
```
Layer中的setPrefix方法用于设置路由路径的前缀，这在嵌套路由的实现中尤其重要。

  最后，Layer还提供了根据路由生成url的方法，主要采用path-to-regexp的compile和parse对路由路径中的param进行替换，而在拼接query的环节，正如前面所说需要对键值对进行繁琐的encodeURIComponent操作，作者采用了urijs提供的简洁api进行处理。

## 路由注册
## 资料
[玩转Koa -- koa-router原理解析](https://www.imooc.com/article/274032)