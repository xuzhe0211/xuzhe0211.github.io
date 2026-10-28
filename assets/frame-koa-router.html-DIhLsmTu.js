import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,a as e,o as i}from"./app-q-jb9_Gt.js";const p={};function l(r,s){return i(),n("div",null,[...s[0]||(s[0]=[e(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2><p>Koa为了保持自身的简洁，并没有捆绑中间件。但是在实际的开发中，我们需要和形形色色的中间件打交道，本文将要分析的是经常用到的路由中间件--koa-router.</p><h2 id="koa-router概述" tabindex="-1"><a class="header-anchor" href="#koa-router概述"><span>koa-router概述</span></a></h2><p>koa-router的源码只有两个文件：router.js和layer.js，分别对应Router对象和Layer对象。</p><p>Layer对象是对单个路由的管理,其中包含的信息有路由路径(path)、路由请求方法(method)和路由执行函数(middleware),并且提供路由的验证以及params参数解析的方法。</p><p>相比较Layer对象，Router对象则是在对所有注册路由的统一处理，并且它的API是面向开发者的。</p><p>接下来从以下几个方面全面解析koa-router的实现原理</p><ul><li>Layer对象的实现</li><li>路路由注册</li><li>路由匹配</li><li>路由执行流程</li></ul><h2 id="layer" tabindex="-1"><a class="header-anchor" href="#layer"><span>Layer</span></a></h2><p>Layer对象主要是对单个路由的管理，是整个koa-router中最小的处理单元，后续模块的处理都离不开Layer中的方法，这正是首先介绍Layer的重要原因</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>function Layer(path, methods, middleware, opts) {</span></span>
<span class="line"><span>  this.opts = opts || {};</span></span>
<span class="line"><span>  // 支持路由别名</span></span>
<span class="line"><span>  this.name = this.opts.name || null;</span></span>
<span class="line"><span>  this.methods = [];</span></span>
<span class="line"><span>  this.paramNames = [];</span></span>
<span class="line"><span>  // 将路由执行函数保存在stack中，支持输入多个处理函数</span></span>
<span class="line"><span>  this.stack = Array.isArray(middleware) ? middleware : [middleware];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  methods.forEach(function(method) {</span></span>
<span class="line"><span>    var l = this.methods.push(method.toUpperCase());</span></span>
<span class="line"><span>    // Head请求头部信息与GET一致，这里就一起处理了</span></span>
<span class="line"><span>    if(this.methods[l - 1] === &#39;GET&#39;) {</span></span>
<span class="line"><span>      this.methods.unshift(&#39;HEAD&#39;)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }, this)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 确保类型正确</span></span>
<span class="line"><span>  this.stack.forEach(function(fn) {</span></span>
<span class="line"><span>    var type = (typeof fn);</span></span>
<span class="line"><span>    if (type !== &#39;function&#39;) {</span></span>
<span class="line"><span>       throw new Error(</span></span>
<span class="line"><span>        methods.toString() + &quot; \`&quot; + (this.opts.name || path) +&quot;\`: \`middleware\` &quot;</span></span>
<span class="line"><span>        + &quot;must be a function, not \`&quot; + type + &quot;\`&quot;</span></span>
<span class="line"><span>      );</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }, this)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  this.path = path;</span></span>
<span class="line"><span>  // 1. 根据路由路径生成路由正则表达式</span></span>
<span class="line"><span>  // 2. 将params参数信息保存在paramsNames数组中</span></span>
<span class="line"><span>  this.regexp = pathToRegExp(path, this.paramNames, this.opts);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Layer构造函数主要用来初始化路由路径、路由请求方法数组、路由处理函数数组、路由正则表达式以及params参数信息数组，其中主要采用<a href="https://github.com/pillarjs/path-to-regexp" target="_blank" rel="noopener noreferrer">path-to-regexp</a>方法根据路径字符串生成正则表达式，通过改正则表达式，可以事先路由匹配以及params参数的捕获。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 验证路由</span></span>
<span class="line"><span>Layer.prototype.match = function(path) {</span></span>
<span class="line"><span>  return this.regexp.test(path);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 捕获params参数</span></span>
<span class="line"><span>Layer.prototype.captures = function(path) {</span></span>
<span class="line"><span>  // 后续会提到 对于路由级别中间件，无需捕获params</span></span>
<span class="line"><span>  if(this.opts.ignoreCaptures) return [];</span></span>
<span class="line"><span>  return path.match(this.regexp).slice(1);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据paramsNames中的参数信息以及captrues方法，可以获取到当前路由params参数的键值对</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Layer.prototype.params = funciton(path, captures, existingParams) {</span></span>
<span class="line"><span>  var params = existingParams || {};</span></span>
<span class="line"><span>  for (var len = captures.length, i = 0; i &lt; len; i++) {</span></span>
<span class="line"><span>    if (this.paramNames[i]) {</span></span>
<span class="line"><span>      var c = captures[i];</span></span>
<span class="line"><span>      params[this.paramNames[i].name] = c ? safeDecodeURIComponent(c) : c;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return params;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意上述代码中的safeDecodeURIComponent方法，为了避免服务器收到不可预知的请求，对于任何用户输入的作为URI部分的内容都需要采用encodeURIComponent进行转义，否则当用户输入的内容中含有&#39;&amp;&#39;、&#39;=&#39;、&#39;?&#39;等字符时，会出现预料之外的情况。而当我们获取URL上的参数时，则需要通过decodeURIComponent进行解码，而decodeURIComponent进行解码，而decodeURLComponent只能解码有encodeURIComponent方法或者类似方法解码，如果编码方法不符合要求，decodeURIComponent则会抛出异常URIError，所以作者在这里对该方法进行了安全处理</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>function safeDecodeURIComponent(text) {</span></span>
<span class="line"><span>  try {</span></span>
<span class="line"><span>    return decodeURIComponent(text);</span></span>
<span class="line"><span>  } catch (e) {</span></span>
<span class="line"><span>    // 编码方式不符合要求，返回原字符串</span></span>
<span class="line"><span>    return text;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Layer还提供了对于单个params前置处理的方法</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Layer.prototype.param = function(param, fn) {</span></span>
<span class="line"><span>  var stack = this.stack;</span></span>
<span class="line"><span>  var params = this.paramNames;</span></span>
<span class="line"><span>  var middleware = function(ctx, next) {</span></span>
<span class="line"><span>    return fn.call(this, ctx.params[param], ctx, next);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  middleware.param = param;</span></span>
<span class="line"><span>  var names = params.map(function(p) {</span></span>
<span class="line"><span>    return p.name;</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  var x = names.indexOf(param);</span></span>
<span class="line"><span>  if (x &gt; -1) {</span></span>
<span class="line"><span>    stack.some(function (fn, i) {</span></span>
<span class="line"><span>      if (!fn.param || names.indexOf(fn.param) &gt; x) {</span></span>
<span class="line"><span>        // 将单个param前置处理函数插入正确的位置</span></span>
<span class="line"><span>        stack.splice(i, 0, middleware);</span></span>
<span class="line"><span>        return true; // 跳出循环</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return this;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码中通过some方法寻找单个param处理函数的原因在于以下两点</p><ul><li>保持param处理函数位于其他路由处理函数的前面</li><li>路由中存在多个param参数，需保持param处理函数的先后顺序</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Layer.prototype.setPrefix = function (prefix) {</span></span>
<span class="line"><span>  if (this.path) {</span></span>
<span class="line"><span>    this.path = prefix + this.path; // 拼接新的路由路径</span></span>
<span class="line"><span>    this.paramNames = [];</span></span>
<span class="line"><span>    // 根据新的路由路径字符串生成正则表达式</span></span>
<span class="line"><span>    this.regexp = pathToRegExp(this.path, this.paramNames, this.opts);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return this;</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Layer中的setPrefix方法用于设置路由路径的前缀，这在嵌套路由的实现中尤其重要。</p><p>  最后，Layer还提供了根据路由生成url的方法，主要采用path-to-regexp的compile和parse对路由路径中的param进行替换，而在拼接query的环节，正如前面所说需要对键值对进行繁琐的encodeURIComponent操作，作者采用了urijs提供的简洁api进行处理。</p><h2 id="路由注册" tabindex="-1"><a class="header-anchor" href="#路由注册"><span>路由注册</span></a></h2><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2><p><a href="https://www.imooc.com/article/274032" target="_blank" rel="noopener noreferrer">玩转Koa -- koa-router原理解析</a></p>`,27)])])}const c=a(p,[["render",l]]),o=JSON.parse('{"path":"/articles/back-end/Node/frame-koa-router.html","title":"玩转Koa -- koa-router原理解析","lang":"zh-CN","frontmatter":{"autoGroup-2":"框架","title":"玩转Koa -- koa-router原理解析","category":["后端基础"],"tag":["nodejs","后端"],"description":"前言 Koa为了保持自身的简洁，并没有捆绑中间件。但是在实际的开发中，我们需要和形形色色的中间件打交道，本文将要分析的是经常用到的路由中间件--koa-router. koa-router概述 koa-router的源码只有两个文件：router.js和layer.js，分别对应Router对象和Layer对象。 Layer对象是对单个路由的管理,其中...","head":[["meta",{"property":"og:url","content":"https://xuzhe0211.github.io/articles/back-end/Node/frame-koa-router.html"}],["meta",{"property":"og:site_name","content":"xz"}],["meta",{"property":"og:title","content":"玩转Koa -- koa-router原理解析"}],["meta",{"property":"og:description","content":"前言 Koa为了保持自身的简洁，并没有捆绑中间件。但是在实际的开发中，我们需要和形形色色的中间件打交道，本文将要分析的是经常用到的路由中间件--koa-router. koa-router概述 koa-router的源码只有两个文件：router.js和layer.js，分别对应Router对象和Layer对象。 Layer对象是对单个路由的管理,其中..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-10-28T02:54:02.000Z"}],["meta",{"property":"article:tag","content":"nodejs"}],["meta",{"property":"article:tag","content":"后端"}],["meta",{"property":"article:modified_time","content":"2026-10-28T02:54:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"玩转Koa -- koa-router原理解析\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-10-28T02:54:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"xz\\",\\"url\\":\\"https://xuzhe0211.github.io\\"}]}"]]},"git":{"createdTime":1643110125000,"updatedTime":1793156042000,"contributors":[{"name":"xuzhe1","username":"xuzhe1","email":"xuzhe1@wps.cn","commits":1,"url":"https://github.com/xuzhe1"},{"name":"xuzhe","username":"xuzhe","email":"xuzhe-0211@163.com","commits":1,"url":"https://github.com/xuzhe"}]},"readingTime":{"minutes":4.04,"words":1212},"filePathRelative":"articles/back-end/Node/frame-koa-router.md","localizedDate":"2022年1月25日","excerpt":"<h2>前言</h2>\\n<p>Koa为了保持自身的简洁，并没有捆绑中间件。但是在实际的开发中，我们需要和形形色色的中间件打交道，本文将要分析的是经常用到的路由中间件--koa-router.</p>\\n<h2>koa-router概述</h2>\\n<p>koa-router的源码只有两个文件：router.js和layer.js，分别对应Router对象和Layer对象。</p>\\n<p>Layer对象是对单个路由的管理,其中包含的信息有路由路径(path)、路由请求方法(method)和路由执行函数(middleware),并且提供路由的验证以及params参数解析的方法。</p>\\n<p>相比较Layer对象，Router对象则是在对所有注册路由的统一处理，并且它的API是面向开发者的。</p>","autoDesc":true}');export{c as comp,o as data};
