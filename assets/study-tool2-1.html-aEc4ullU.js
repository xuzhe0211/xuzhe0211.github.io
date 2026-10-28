import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,a,o as i}from"./app-q-jb9_Gt.js";const l={};function p(t,s){return i(),e("div",null,[...s[0]||(s[0]=[a(`<div class="hint-container tip"><p class="hint-container-title">提示</p><p>snowpack/vite等基于ESM的构建工具出现，让项目的工程构建不再需要构建一个完整的bundle。很多人觉得不再需要打包工具的时代即将到来。借助浏览器ESM的能力，一写代码基本可以做到需要构建直接运行。 vite实践 https://juejin.cn/post/6926822933721513998 https://github.com/57code/vite2-in-action</p></div><h2 id="vite是什么" tabindex="-1"><a class="header-anchor" href="#vite是什么"><span>Vite是什么</span></a></h2><p>Vite(读音类似于[weIt]，法语,快的意思)是一个由原生ES Module驱动的Web开发构建工具。在开发环境下基于浏览器原生ES imports开发，生产环境下基于Rollup打包。</p><h3 id="vite特点" tabindex="-1"><a class="header-anchor" href="#vite特点"><span>Vite特点</span></a></h3><ul><li>Lightning fast code start --闪电般的冷启动速度</li><li>Instanthot module replacement(HMR)--即时热模块替换</li><li>True on-demand compilation--真正的按需编译</li></ul><blockquote><p>vite要求项目完全有ES Module模块组成<br> common.js模块不能直接在Vite上使用<br> 打包依旧还是使用rollup等传统打包工具<br></p></blockquote><h3 id="esmodule" tabindex="-1"><a class="header-anchor" href="#esmodule"><span>ESModule</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;script src=&quot;./src/index.js&quot; type=&quot;module&quot;&gt;&lt;/script&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>服务端</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>const Koa = require(&#39;koa&#39;);</span></span>
<span class="line"><span>const app = new Koa();</span></span>
<span class="line"><span>app.use(async (ctx) =&gt; {</span></span>
<span class="line"><span>    const {</span></span>
<span class="line"><span>        request: {url, query},</span></span>
<span class="line"><span>    } = ctx;</span></span>
<span class="line"><span>    console.log(\`url: \${url}, query.type: \${query.type}\`);</span></span>
<span class="line"><span>    // 首页</span></span>
<span class="line"><span>    if(url === &#39;/&#39;) {</span></span>
<span class="line"><span>        ctx.type = &#39;text/html&#39;;</span></span>
<span class="line"><span>        let content = fs.readFileSync(&#39;./index.html&#39;, &#39;utf-8&#39;);</span></span>
<span class="line"><span>        ctx.body = content;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span>app.listen(3000, () =&gt; {</span></span>
<span class="line"><span>    console.log(&#39;Vite Start listen 3000...&#39;);</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新建页面index.html</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>    &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span>    &lt;link rel=&quot;icon&quot; href=&quot;/favicon.ico&quot;&gt;</span></span>
<span class="line"><span>    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;</span></span>
<span class="line"><span>    &lt;title&gt;Vite App&lt;/title&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>    &lt;h1&gt;Vite 666&lt;/h1&gt;</span></span>
<span class="line"><span>    &lt;div id=&quot;app&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;script&gt;&lt;/script&gt;</span></span>
<span class="line"><span>    &lt;script type=&quot;module&quot; src=&quot;/src/main.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新建/src/main.js</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>console.log(&#39;main...&#39;);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>添加模块解析/index.js</p><p>/src/moduleA.js</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>export const str = &#39;Hello Vite&#39;；</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>/src/main.js</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>import {str} from &#39;./moduleA.js&#39;;</span></span>
<span class="line"><span>console.log(str);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>else if (url.endsWith(&#39;.js&#39;)) {</span></span>
<span class="line"><span>    // js文件</span></span>
<span class="line"><span>    const p = path.resolve(__dirname, url.slice(1));</span></span>
<span class="line"><span>    ctx.type = &#39;application/javascript&#39;;</span></span>
<span class="line"><span>    cosnt content = fs.readFileSync(p, &#39;utf-8&#39;);</span></span>
<span class="line"><span>    ctx.body = content;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加依赖解析" tabindex="-1"><a class="header-anchor" href="#添加依赖解析"><span>添加依赖解析</span></a></h3><blockquote><p>Form(&#39;./xxx&#39;) =&gt; from(&#39;./xxx&#39;)<br> Form(&#39;yyy&#39;) =&gt; from(&#39;@modules/yyy&#39;)<br></p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>function rewriteImport(content) {</span></span>
<span class="line"><span>    return content.replace(/from [&#39;|&quot;]([^&#39;&quot;]+)[&#39;|&quot;]/g, function(s0, s1) {</span></span>
<span class="line"><span>        console.log(&#39;s&#39;, s0, s1);</span></span>
<span class="line"><span>        // ../  /开头的都是相对路径</span></span>
<span class="line"><span>        if(s1[0] !== &#39;.&#39; &amp;&amp; s1[1] !== &#39;/&#39;) {</span></span>
<span class="line"><span>            return \`from &#39;/@modules/\${s1}/&#39;\`;</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            return s0;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 添加模块改写</span></span>
<span class="line"><span>ctx.body = rewriteImport(content)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="第三方依赖支持" tabindex="-1"><a class="header-anchor" href="#第三方依赖支持"><span>第三方依赖支持</span></a></h3><p>/src/main.js</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>import {createApp, h} from &#39;vue&#39;;</span></span>
<span class="line"><span>const App = {</span></span>
<span class="line"><span>    render() {</span></span>
<span class="line"><span>        return h(&#39;div&#39;, null, [h(&#39;div&#39;, null, String(&#39;123&#39;))]);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>createApp(App).mount(&#39;#app&#39;);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>else if (url.startsWith(&#39;@/modules/&#39;)) {</span></span>
<span class="line"><span>    // 这是一个node_module里的东西</span></span>
<span class="line"><span>    const prefix = path.resolve(</span></span>
<span class="line"><span>        __dirname,</span></span>
<span class="line"><span>        &#39;node_module&#39;,</span></span>
<span class="line"><span>        url.replace(&#39;/@modules/&#39;, &#39;&#39;)</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>    const module = require(prefix + &#39;/package.json&#39;).module;</span></span>
<span class="line"><span>    const p = path.resolve(prefix, module);</span></span>
<span class="line"><span>    cosnt ret = fs.readFileSync(p, &#39;utf-8&#39;);</span></span>
<span class="line"><span>    ctx.type = &#39;application/javascript&#39;;</span></span>
<span class="line"><span>    ctx.body = rewriteImport(ret);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SFC组件支持</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>const compilerSfc = require(&#39;@vue/compiler-sfc&#39;); // .vue</span></span>
<span class="line"><span>const compilerDom = require(&#39;@vue/compiler-dom&#39;); // 模板</span></span>
<span class="line"><span></span></span>
<span class="line"><span>else if (url.endsWith(&#39;.css&#39;)) {</span></span>
<span class="line"><span>    const p = path.resolve(__dirname, url.slice(1));</span></span>
<span class="line"><span>    const file = fs.readFileSync(p, &#39;utf-8&#39;);</span></span>
<span class="line"><span>    cosnt content = \`</span></span>
<span class="line"><span>        const css = &#39;\${file.replace(/\\n/g, &#39;&#39;)}&#39;</span></span>
<span class="line"><span>        let link = document.createElement(&#39;style&#39;);</span></span>
<span class="line"><span>        link.setAttribute(&#39;type&#39;, &#39;text/css&#39;);</span></span>
<span class="line"><span>        document.head.appendChild(&#39;link&#39;);</span></span>
<span class="line"><span>        link.innerHTML = css;</span></span>
<span class="line"><span>        export default css</span></span>
<span class="line"><span>    \`;</span></span>
<span class="line"><span>    ctx.type = &#39;application/javascript&#39;;</span></span>
<span class="line"><span>    ctx.body = content;</span></span>
<span class="line"><span>} else if (url.indexOf(&#39;.vue&#39;) &gt; -1) {</span></span>
<span class="line"><span>    // vue 单文件组成</span></span>
<span class="line"><span>    const p = path.resolve(__dirname, url.split(&#39;?&#39;)[0].slice(1));</span></span>
<span class="line"><span>    cosnt { descriptor } = compilerSfc.parse(fs.readFileSync(p, &#39;utf-8&#39;));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (!query.type) {</span></span>
<span class="line"><span>        ctx.type = &#39;application/javascript&#39;;</span></span>
<span class="line"><span>        // 借用vue自导的compile框架 解析单文件组件，其实相当于vue-loader做的事情</span></span>
<span class="line"><span>        ctx.body = \`</span></span>
<span class="line"><span>            \${rewriteImport(</span></span>
<span class="line"><span>                descriptor.script.content.replace(&#39;export default &#39;, &#39;const __script =&#39;)</span></span>
<span class="line"><span>            )}</span></span>
<span class="line"><span>            import { render as __render} from &#39;\${url}?type=temeplate&#39;</span></span>
<span class="line"><span>            __script.render = __render;</span></span>
<span class="line"><span>            export default _script</span></span>
<span class="line"><span>        \`;</span></span>
<span class="line"><span>    } else if (query.type === &#39;temeplate&#39;) {</span></span>
<span class="line"><span>        // 模板内容</span></span>
<span class="line"><span>        const template = descriptor.temeplate;</span></span>
<span class="line"><span>        // 要在server端把compiler做了</span></span>
<span class="line"><span>        const render = compilerDom.compile(template.content, {mode: &#39;module&#39;}).code;</span></span>
<span class="line"><span>        ctx.type = &#39;application/javascript&#39;;</span></span>
<span class="line"><span>        ctx.body = rewriteImport(render);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2><p><a href="https://zhuanlan.zhihu.com/p/149351900" target="_blank" rel="noopener noreferrer">替代 webpack？带你了解 snowpack 原理，你还学得动么</a></p>`,31)])])}const r=n(l,[["render",p]]),o=JSON.parse('{"path":"/articles/front-end/engineering/study-tool2-1.html","title":"ESModule与Vite原理剖析","lang":"zh-CN","frontmatter":{"autoGroup-1":"公开课","title":"ESModule与Vite原理剖析","category":["前端技术"],"tag":["工程化","前端"],"description":"提示 snowpack/vite等基于ESM的构建工具出现，让项目的工程构建不再需要构建一个完整的bundle。很多人觉得不再需要打包工具的时代即将到来。借助浏览器ESM的能力，一写代码基本可以做到需要构建直接运行。 vite实践 https://juejin.cn/post/6926822933721513998 https://github.com...","head":[["meta",{"property":"og:url","content":"https://xuzhe0211.github.io/articles/front-end/engineering/study-tool2-1.html"}],["meta",{"property":"og:site_name","content":"xz"}],["meta",{"property":"og:title","content":"ESModule与Vite原理剖析"}],["meta",{"property":"og:description","content":"提示 snowpack/vite等基于ESM的构建工具出现，让项目的工程构建不再需要构建一个完整的bundle。很多人觉得不再需要打包工具的时代即将到来。借助浏览器ESM的能力，一写代码基本可以做到需要构建直接运行。 vite实践 https://juejin.cn/post/6926822933721513998 https://github.com..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-10-28T02:54:02.000Z"}],["meta",{"property":"article:tag","content":"工程化"}],["meta",{"property":"article:tag","content":"前端"}],["meta",{"property":"article:modified_time","content":"2026-10-28T02:54:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ESModule与Vite原理剖析\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-10-28T02:54:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"xz\\",\\"url\\":\\"https://xuzhe0211.github.io\\"}]}"]]},"git":{"createdTime":1643110125000,"updatedTime":1793156042000,"contributors":[{"name":"xuzhe1","username":"xuzhe1","email":"xuzhe1@wps.cn","commits":1,"url":"https://github.com/xuzhe1"},{"name":"xuzhe","username":"xuzhe","email":"xuzhe-0211@163.com","commits":1,"url":"https://github.com/xuzhe"}]},"readingTime":{"minutes":2.49,"words":747},"filePathRelative":"articles/front-end/engineering/study-tool2-1.md","localizedDate":"2022年1月25日","excerpt":"<div class=\\"hint-container tip\\">\\n<p class=\\"hint-container-title\\">提示</p>\\n<p>snowpack/vite等基于ESM的构建工具出现，让项目的工程构建不再需要构建一个完整的bundle。很多人觉得不再需要打包工具的时代即将到来。借助浏览器ESM的能力，一写代码基本可以做到需要构建直接运行。\\nvite实践\\nhttps://juejin.cn/post/6926822933721513998\\nhttps://github.com/57code/vite2-in-action</p>\\n</div>\\n<h2>Vite是什么</h2>","autoDesc":true}');export{r as comp,o as data};
