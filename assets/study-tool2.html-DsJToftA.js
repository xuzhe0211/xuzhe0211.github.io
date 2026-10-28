import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as e,o as i}from"./app-q-jb9_Gt.js";const l={};function p(t,s){return i(),a("div",null,[...s[0]||(s[0]=[e(`<p>第一天：Babel与weppack原理剖析</p><p>第二天:ESModule与Vite原理剖析</p><p>第三天：Rollup原理剖析</p><p>React工程师修理指南---书</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 创建vue项目模板</span></span>
<span class="line"><span></span></span>
<span class="line"><span>npm init @vitejs/app vite-admin --template vue</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>速度快</p><h2 id="手写vite" tabindex="-1"><a class="header-anchor" href="#手写vite"><span>手写vite</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// src/main.js</span></span>
<span class="line"><span>const {str} from &#39;./moduleA.js&#39;;</span></span>
<span class="line"><span>const log(&#39;main...&#39;, str)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// src/moduleA.js</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export const str = &#39;vite 666&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 第二种vue</span></span>
<span class="line"><span>import {createApp, h} form &#39;vue&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const app = {</span></span>
<span class="line"><span>    render() {</span></span>
<span class="line"><span>        return h(&#39;div&#39;, null, [h(&#39;div&#39;, null, String(&#39;123&#39;))]);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>createApp.mount(&#39;#app&#39;);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>index.html</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;script type=&quot;module&quot; src=&quot;./src/mian.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>index.js</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>const koa = require(&#39;koa&#39;);</span></span>
<span class="line"><span>cosnt app = new Koa();</span></span>
<span class="line"><span>const fs = require(&#39;fs&#39;);</span></span>
<span class="line"><span>cosnt path = require(&#39;path&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>app.use(async ctx =&gt; {</span></span>
<span class="line"><span>    // 提供静态服务</span></span>
<span class="line"><span>    const {</span></span>
<span class="line"><span>        request: {url, query}</span></span>
<span class="line"><span>    } = ctx;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // index.html</span></span>
<span class="line"><span>    if (url === &#39;/&#39;) {</span></span>
<span class="line"><span>        ctx.type = &#39;text/html&#39;;</span></span>
<span class="line"><span>        const content = fs.readFileSync(&#39;./index.html&#39;, &#39;utf-8&#39;);</span></span>
<span class="line"><span>        ctx.body = content;</span></span>
<span class="line"><span>    } else if (url.endsWith(&#39;.js&#39;)) {</span></span>
<span class="line"><span>        // *.js</span></span>
<span class="line"><span>        const p = path.resolve(__dirname, url.slice(1));</span></span>
<span class="line"><span>        console.log(&#39;p&#39;, p)</span></span>
<span class="line"><span>        cosnt type = &#39;application/javascript&#39;;</span></span>
<span class="line"><span>        cosnt content = fs.readFileSync(p, &#39;utf-8&#39;);</span></span>
<span class="line"><span>        ctx.boyy = content;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 第三方库</span></span>
<span class="line"><span></span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>app.listen(3000, () =&gt; {</span></span>
<span class="line"><span>    console.log(&#39;Vite Start at 3000...&#39;)</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12)])])}const r=n(l,[["render",p]]),o=JSON.parse('{"path":"/articles/front-end/engineering/study-tool2.html","title":"构建工具第二天-前端构建工具深度剖析02","lang":"zh-CN","frontmatter":{"autoGroup-1":"公开课","title":"构建工具第二天-前端构建工具深度剖析02","category":["前端技术"],"tag":["工程化","前端"],"description":"第一天：Babel与weppack原理剖析 第二天:ESModule与Vite原理剖析 第三天：Rollup原理剖析 React工程师修理指南---书 速度快 手写vite index.html index.js","head":[["meta",{"property":"og:url","content":"https://xuzhe0211.github.io/articles/front-end/engineering/study-tool2.html"}],["meta",{"property":"og:site_name","content":"xz"}],["meta",{"property":"og:title","content":"构建工具第二天-前端构建工具深度剖析02"}],["meta",{"property":"og:description","content":"第一天：Babel与weppack原理剖析 第二天:ESModule与Vite原理剖析 第三天：Rollup原理剖析 React工程师修理指南---书 速度快 手写vite index.html index.js"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-10-28T02:54:02.000Z"}],["meta",{"property":"article:tag","content":"工程化"}],["meta",{"property":"article:tag","content":"前端"}],["meta",{"property":"article:modified_time","content":"2026-10-28T02:54:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"构建工具第二天-前端构建工具深度剖析02\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-10-28T02:54:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"xz\\",\\"url\\":\\"https://xuzhe0211.github.io\\"}]}"]]},"git":{"createdTime":1643110125000,"updatedTime":1793156042000,"contributors":[{"name":"xuzhe1","username":"xuzhe1","email":"xuzhe1@wps.cn","commits":1,"url":"https://github.com/xuzhe1"},{"name":"xuzhe","username":"xuzhe","email":"xuzhe-0211@163.com","commits":2,"url":"https://github.com/xuzhe"}]},"readingTime":{"minutes":0.77,"words":230},"filePathRelative":"articles/front-end/engineering/study-tool2.md","localizedDate":"2022年1月25日","excerpt":"<p>第一天：Babel与weppack原理剖析</p>\\n<p>第二天:ESModule与Vite原理剖析</p>\\n<p>第三天：Rollup原理剖析</p>\\n<p>React工程师修理指南---书</p>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>// 创建vue项目模板</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>npm init @vitejs/app vite-admin --template vue</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{r as comp,o as data};
