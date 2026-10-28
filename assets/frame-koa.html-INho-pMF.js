import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as e,o as i}from"./app-q-jb9_Gt.js";const l="/assets/5c3dfbed0001256608600785-a-5dzyn9.jpeg",p="/assets/5c3dfc1a0001b35302950106-_h218t04.jpeg",r={};function c(d,s){return i(),a("div",null,[...s[0]||(s[0]=[e(`<div class="hint-container tip"><p class="hint-container-title">提示</p><p>Koa作为下一代Web开发框架，不仅让我体验到了async/await语法带来的同步方式书写异步代码的酸爽，而且本身简洁的特点，更加利于开发者结合业务本身进行扩展</p></div><p>本文从以下几个方面解读Koa源码</p><ul><li>封装创建应用程序函数</li><li>扩展res和req</li><li>中间件实现原理</li><li>异常处理</li></ul><h2 id="封装创建应用程序函数" tabindex="-1"><a class="header-anchor" href="#封装创建应用程序函数"><span>封装创建应用程序函数</span></a></h2><p>利用NodeJS可以很容易编写一个简单的应用程序</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>const http = require(&#39;http&#39;);</span></span>
<span class="line"><span>const server = http.createServer((req, res) =&gt; {</span></span>
<span class="line"><span>  // 每一次请求处理的方法</span></span>
<span class="line"><span>  console.log(req.url);</span></span>
<span class="line"><span>  res.writeHead(200, { &#39;Content-Type&#39;: &#39;text/plain&#39; });</span></span>
<span class="line"><span>  res.end(&#39;Hello NodeJS&#39;);</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>server.listen(8080)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意：当浏览器发送请求时，会附带请求/favicon.ico</p></blockquote><p>而Koa在封装创建应用程序的方法中主要执行了以下流程</p><ul><li>组织中间件(监听请求之前)</li><li>生成context上下文对象</li><li>执行中间件</li><li>执行默认响应方法或者异常处理方法</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// application.js</span></span>
<span class="line"><span>listen(...args) {</span></span>
<span class="line"><span>  const server = http.createServer(this.callback());</span></span>
<span class="line"><span>  return server.listen(...args);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>callback() {</span></span>
<span class="line"><span>  // 组织中间件</span></span>
<span class="line"><span>  const fn = compose(this.middleware);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 未监听异常处理，则采用默认的异常处理方法</span></span>
<span class="line"><span>  if(!this.listenerCount(&#39;error&#39;)) this.on(&#39;error&#39;, this.onerror);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const handleRequest = (req, res) =&gt; {</span></span>
<span class="line"><span>    // 生成context上下文对象</span></span>
<span class="line"><span>    const ctx = this.createContext(req, res);</span></span>
<span class="line"><span>    return this.handleRequest(ctx, fn);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return handleRequest;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>handleRequest(ctx, fnMiddleware) {</span></span>
<span class="line"><span>  const res = ctx.res;</span></span>
<span class="line"><span>  // 默认状态码为404</span></span>
<span class="line"><span>  res.statusCode = 404;</span></span>
<span class="line"><span>  // 中间件执行完毕之后 采用默认的错误与成功的处理方式</span></span>
<span class="line"><span>  const onerror = err =&gt; ctx.onerror(err);</span></span>
<span class="line"><span>  const handleResponse = () =&gt; respond(ctx);</span></span>
<span class="line"><span>  onFinished(res, onerror);</span></span>
<span class="line"><span>  return fnMiddleware(ctx).then(handleResponse).catch(onerror)</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="扩展res和req" tabindex="-1"><a class="header-anchor" href="#扩展res和req"><span>扩展res和req</span></a></h2><p>首先我们要知道NodeJS中res和req是http.IncomingMessage和http.ServerResponse的实例，那么我们就可以在NodeJS中这样扩展req和res:</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Object.defineProperties(http.IncomingMessage.prototype, {</span></span>
<span class="line"><span>  query: {</span></span>
<span class="line"><span>    get() {</span></span>
<span class="line"><span>      return querystring.parse(url.parse(this.url).query);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Object.defineProperties(http.ServerResponse.prototype, {</span></span>
<span class="line"><span>  json: {</span></span>
<span class="line"><span>    value: function(obj) {</span></span>
<span class="line"><span>      if (typeof obj === &#39;object&#39;) {</span></span>
<span class="line"><span>        obj = JSON.stringify(obj);</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      this.end(obj)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而Koa中则是自定义request和response对象,然后保持对res和req的引用，最后通过getter和setter方法实现扩展</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// application.js</span></span>
<span class="line"><span>createContext((req, res) {</span></span>
<span class="line"><span>  const context = Object.create(this.context);</span></span>
<span class="line"><span>  const request = context.request = Object.create(this.request);</span></span>
<span class="line"><span>  const response = context.response = Object.create(this.response);</span></span>
<span class="line"><span>  context.app = request.app = response.app = this;</span></span>
<span class="line"><span>  context.req = request.req = response.req = req; // 保存原生req对象</span></span>
<span class="line"><span>  context.res = request.res = response.res = res; // 保存原生res对象</span></span>
<span class="line"><span>  request.ctx = response.ctx = context;</span></span>
<span class="line"><span>  request.response = response;</span></span>
<span class="line"><span>  response.request = request;</span></span>
<span class="line"><span>  context.originalUrl = request.originalUrl = req.url;</span></span>
<span class="line"><span>  context.state = {};</span></span>
<span class="line"><span>  // 最终返回完整的context上下文对象</span></span>
<span class="line"><span>  return context;</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以Koa中要区别这两组对象</p><ul><li>request、response：Koa扩展的对象</li><li>res、req:Node原生对象</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// request.js</span></span>
<span class="line"><span>get header() {</span></span>
<span class="line"><span>  return this.req.headers;</span></span>
<span class="line"><span>},</span></span>
<span class="line"><span>set header() {</span></span>
<span class="line"><span>  this.req.headers = val;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时已经可以采用这样的方式访问header属性</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>ctx.request.header</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>但是为了方便开发者调用这些属性和方法,Koa将response和request中的属性和方法代理到context上。</p><p>通过Object.defineProperty可以轻松的实现属性的代理</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>function access(proto, target, name) {</span></span>
<span class="line"><span>  Object.defineProperty(proto, name, {</span></span>
<span class="line"><span>    get() {</span></span>
<span class="line"><span>      return target[name];</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    set (value) {</span></span>
<span class="line"><span>      target[name] = value;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>access(context, request, &#39;header&#39;);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而对于方法的代理，则需要注意this的指向</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>function method(proto, target, name) {</span></span>
<span class="line"><span>  proto[name] = function() {</span></span>
<span class="line"><span>    return target[name].apply(target, arguments);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述就是<strong>属性代理和方法代理</strong>的核心代码，这基本算是一个常用的套路</p><p>代理这部分详细的源码，可以查看<a href="https://github.com/tj/node-delegates/blob/master/index.js" target="_blank" rel="noopener noreferrer">node-delegates</a>,不过这个包时间久远,有一些老方法已经废除</p><p>在上述过程中的源码中涉及到很多JavaScript的基础知识，例如：原型继承、this指向。</p><h2 id="中间件实现原理" tabindex="-1"><a class="header-anchor" href="#中间件实现原理"><span>中间件实现原理</span></a></h2><p>首先需要明确的是：中间件并不是NodeJS中的概念，它只是connect、express和koa框架衍生的概念</p><h3 id="connect中间件设计" tabindex="-1"><a class="header-anchor" href="#connect中间件设计"><span>connect中间件设计</span></a></h3><p>在connect中，开发者可以通过use方法注册中间件</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>function use(route, fn) {</span></span>
<span class="line"><span>  var handle = fn;</span></span>
<span class="line"><span>  var path = route;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 不传入route则默认为&#39;/&#39;，这种基本是框架处理参数的一种套路</span></span>
<span class="line"><span>  if(typeof route !== &#39;string&#39;) {</span></span>
<span class="line"><span>    handle = route;</span></span>
<span class="line"><span>    path = &#39;/&#39;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span>  // 存储中间件</span></span>
<span class="line"><span>  this.stack.push({ route: path, handle: handle })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 以便链式调用</span></span>
<span class="line"><span>  return this;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>use方法内部获取到中间件的路由信息(默认为&#39;/&#39;)和中间件的处理函数之后，构建成layer对象，然后将其存储在一个队列当中，也就是上述代码中的stack。</p><p>connect中间件的执行流程主要由handle与call函数决定</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>function handle(req, res, out) {</span></span>
<span class="line"><span>  var index = 0;</span></span>
<span class="line"><span>  var stack = this.stack;</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  function next(err) {</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>    // 依次取出中间件</span></span>
<span class="line"><span>    var layer = stack[index++];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 终止条件</span></span>
<span class="line"><span>    if(!layer) {</span></span>
<span class="line"><span>      defer(done, err);</span></span>
<span class="line"><span>      return;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 路由匹配规则</span></span>
<span class="line"><span>    if(path.toLowerCase().substr(0, route.length) !== route.toLowerCase()) {</span></span>
<span class="line"><span>      return next(err);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>    call(layer.handle, route, err, req, res, next);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  next();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>handle函数中使用闭包函数next来检测layer是否与当前你路由相匹配，匹配则执行该layer上的中间件函数，否则继续检查下一个layer</p><p>这里需要注意next中检查路由的方式可能与想象中的不太一样，所以默认路由为&#39;/&#39;的中间件会在每一次请求处理中都执行。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>function call(handle, route, err, req, res, next) {</span></span>
<span class="line"><span>  var arity = handle.length;</span></span>
<span class="line"><span>  var error = err;</span></span>
<span class="line"><span>  var hasError = Boolean(err);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  try {</span></span>
<span class="line"><span>    if (hasError &amp;&amp; arity === 4) {</span></span>
<span class="line"><span>      // 错误处理中间件</span></span>
<span class="line"><span>      handle(err, req, res, next);</span></span>
<span class="line"><span>      return;</span></span>
<span class="line"><span>    } else if (!hasError &amp;&amp; arity &lt; 4) {</span></span>
<span class="line"><span>      // 请求处理中间件</span></span>
<span class="line"><span>      handle(req, res, next);</span></span>
<span class="line"><span>      return;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  } catch (e) {</span></span>
<span class="line"><span>    // 记录错误</span></span>
<span class="line"><span>    error = e;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 将错误传递下去</span></span>
<span class="line"><span>  next(error);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在通过call方法执行中间件方法的时候，采用try/catch捕获错误，这里有个特别需要注意的地方是，call内部会根据是否存在错误以及中间件函数的参数决定是否执行错误处理中间件。并且一旦捕获到错误，next方法会将错误传递下去，所以接下来普通的请求处理中间件即使通过了next中的路由匹配，仍然会被call方法给过滤掉</p><p>下面是layer的处理流程图 <img src="`+l+`" alt="layer处理流程图"></p><p>上述就是connect中间件涉及的核心要点，总结起来有如下几点</p><ol><li>通过use方法注册中间件</li><li>中间件的顺序执行是通过next方法衔接的并且需要手动调用，在next中会进行路由匹配，从而过滤掉部分中间件</li><li>当中间件的执行过程中发生异常，则next会携带异常过滤掉非错误处理中间件，也是为什么错误中间件会比其他中间件多一个error参数</li><li>在请求处理的周期中，需要手动调用res.end()来结束响应</li></ol><h3 id="koa中间件设计" tabindex="-1"><a class="header-anchor" href="#koa中间件设计"><span>Koa中间件设计</span></a></h3><p>Koa中间件与connect中间件的设计有很大的差异</p><ul><li>Koa中间件的执行并不需要匹配路由，所以注册的中间件每一次请求都会执行(当然还需要手动调用next)</li><li>Koa中通过继承event,暴露error时间让开发者自定义异常处理</li><li>Koa中res.end由中间件执行完成之后自动调用，这样避免在connect忘记调用res.end导致用户得不到反馈</li><li>Koa中采用了async/await语法让开发者利用同步的方式编写异步代码</li></ul><p>当然Koa中也是采用use方法注册中间件，相比较connect省去路由匹配的处理，就显的很简洁</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>use(fn) {</span></span>
<span class="line"><span>  this.middleware.push(fn);</span></span>
<span class="line"><span>  return this;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并且use支持链式调用</p><p>Koa中间件的执行流程主要通过koa-compose中的compose函数完成</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>function compose(middleware) {</span></span>
<span class="line"><span>  if (!Array.isArray(middleware)) throw new TypeError(&#39;Middleware stack must be an array&#39;);</span></span>
<span class="line"><span>  for (const fn of middleware) {</span></span>
<span class="line"><span>    if (typeof fn !== &#39;function&#39;) throw new TypeError(&#39;Middleware must be composed of functions!&#39;)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>  * @param {Object} context</span></span>
<span class="line"><span>  * @return {Promise}</span></span>
<span class="line"><span>  * @api public</span></span>
<span class="line"><span>  */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return function(context, next) {</span></span>
<span class="line"><span>    let index = -1;</span></span>
<span class="line"><span>    return dispatch(0);</span></span>
<span class="line"><span>    return dispatch(i) {</span></span>
<span class="line"><span>      if (i &lt;= index) return Promise.reject(new Error(&#39;next() called multiple times&#39;));</span></span>
<span class="line"><span>      index = i;</span></span>
<span class="line"><span>      let fn = middleware[i];</span></span>
<span class="line"><span>      if (i === middleware.length) fn = next;</span></span>
<span class="line"><span>      if (!fn) return Promise.resolve();</span></span>
<span class="line"><span>      try {</span></span>
<span class="line"><span>        // 递归调用下一个中间件</span></span>
<span class="line"><span>        return Promise.resovle(fn(context, dispatch.bind(null, i + 1)))</span></span>
<span class="line"><span>      } catch(err) {</span></span>
<span class="line"><span>        return Promise.reject(err)</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看到这里本质上connect和koa实现中间件的思想都是递归，不难看出koa相比较connect实现的更加简介，主要原因在于</p><ul><li>connect中提供路由匹配功能，而Koa中则是相当于connect中默认的&#39;/&#39;路径</li><li>connect在捕获中间件的异常时，通过next携带error一个个中间件验证，直到错误处理中间件。而Koa中则是用Promise包装中间件，一旦中间件发生异常，那么会直接触发reject状态，直接在Promise的catch中处理就行</li></ul><p>上述就是connect中间件与Koa中间件的实现原理，现在在看Koa中间件的这张执行流程图，应该没什么疑问了吧</p><p><img src="`+p+`" alt="koa中间件的执行流程图"></p><h2 id="异常处理" tabindex="-1"><a class="header-anchor" href="#异常处理"><span>异常处理</span></a></h2><p>对于同步代码，通过try/catch可以轻松捕获异常,在connect中间件的异常捕获则是通过try/catch完成。</p><p>对于异步代码，try/catch则无法捕获，这时候一般可以构造Promise链，在最后的catch方法中捕获错误，Koa就是这样处理，并且在catch方法中发送error事件，以便开发者自定义异常处逻辑</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>this.app.emit(&#39;error&#39;, err, this);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>前面也谈到Koa利用async/await语法带来同步方式书写异步代码的酸爽，另外也让错误处理更加自然</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 也可以这样自定义错误处理</span></span>
<span class="line"><span>app.use(async (ctx, next) =&gt; {</span></span>
<span class="line"><span>  try {</span></span>
<span class="line"><span>    await next();</span></span>
<span class="line"><span>  } catch(err) {</span></span>
<span class="line"><span>    ctx.status = err.status || 500;</span></span>
<span class="line"><span>    ctx.body = err;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>相信看到这里，再回忆一下之前遇到的那些问题，你应该会有新的理解，并且再次使用Koa时会更加得心应手，这也是分析Koa源码的目的之一。</p><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2><p><a href="https://www.imooc.com/article/274031" target="_blank" rel="noopener noreferrer">玩转Koa -- 核心原理分析</a></p>`,65)])])}const o=n(r,[["render",c]]),u=JSON.parse('{"path":"/articles/back-end/Node/frame-koa.html","title":"玩转Koa -- 核心原理分析","lang":"zh-CN","frontmatter":{"autoGroup-2":"框架","title":"玩转Koa -- 核心原理分析","category":["后端基础"],"tag":["nodejs","后端"],"description":"提示 Koa作为下一代Web开发框架，不仅让我体验到了async/await语法带来的同步方式书写异步代码的酸爽，而且本身简洁的特点，更加利于开发者结合业务本身进行扩展 本文从以下几个方面解读Koa源码 封装创建应用程序函数 扩展res和req 中间件实现原理 异常处理 封装创建应用程序函数 利用NodeJS可以很容易编写一个简单的应用程序 注意：当浏...","head":[["meta",{"property":"og:url","content":"https://xuzhe0211.github.io/articles/back-end/Node/frame-koa.html"}],["meta",{"property":"og:site_name","content":"xz"}],["meta",{"property":"og:title","content":"玩转Koa -- 核心原理分析"}],["meta",{"property":"og:description","content":"提示 Koa作为下一代Web开发框架，不仅让我体验到了async/await语法带来的同步方式书写异步代码的酸爽，而且本身简洁的特点，更加利于开发者结合业务本身进行扩展 本文从以下几个方面解读Koa源码 封装创建应用程序函数 扩展res和req 中间件实现原理 异常处理 封装创建应用程序函数 利用NodeJS可以很容易编写一个简单的应用程序 注意：当浏..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-10-28T02:54:02.000Z"}],["meta",{"property":"article:tag","content":"nodejs"}],["meta",{"property":"article:tag","content":"后端"}],["meta",{"property":"article:modified_time","content":"2026-10-28T02:54:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"玩转Koa -- 核心原理分析\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-10-28T02:54:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"xz\\",\\"url\\":\\"https://xuzhe0211.github.io\\"}]}"]]},"git":{"createdTime":1643110125000,"updatedTime":1793156042000,"contributors":[{"name":"xuzhe1","username":"xuzhe1","email":"xuzhe1@wps.cn","commits":1,"url":"https://github.com/xuzhe1"},{"name":"xuzhe","username":"xuzhe","email":"xuzhe-0211@163.com","commits":1,"url":"https://github.com/xuzhe"}]},"readingTime":{"minutes":7.88,"words":2363},"filePathRelative":"articles/back-end/Node/frame-koa.md","localizedDate":"2022年1月25日","excerpt":"<div class=\\"hint-container tip\\">\\n<p class=\\"hint-container-title\\">提示</p>\\n<p>Koa作为下一代Web开发框架，不仅让我体验到了async/await语法带来的同步方式书写异步代码的酸爽，而且本身简洁的特点，更加利于开发者结合业务本身进行扩展</p>\\n</div>\\n<p>本文从以下几个方面解读Koa源码</p>\\n<ul>\\n<li>封装创建应用程序函数</li>\\n<li>扩展res和req</li>\\n<li>中间件实现原理</li>\\n<li>异常处理</li>\\n</ul>\\n<h2>封装创建应用程序函数</h2>\\n<p>利用NodeJS可以很容易编写一个简单的应用程序</p>","autoDesc":true}');export{o as comp,u as data};
