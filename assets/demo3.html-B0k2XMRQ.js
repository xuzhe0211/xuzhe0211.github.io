import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as e,o as i}from"./app-q-jb9_Gt.js";const l="/assets/WechatIMG160-CyFNR-NH.png",p={};function t(d,n){return i(),a("div",null,[...n[0]||(n[0]=[e('<h2 id="语法" tabindex="-1"><a class="header-anchor" href="#语法"><span>语法</span></a></h2><p>zoom: auto | normal | active | inactive | disabled</p><p>默认值: auto</p><p>适用于: 所有出入文本框</p><p>继承性 无</p><h2 id="取值" tabindex="-1"><a class="header-anchor" href="#取值"><span>取值</span></a></h2><p>auto: 不影响IME的状态</p><p>normal: 正常的IME状态</p><p>active: 指定所有使用ime输入的字符。即激活本地语言输入法。用户仍可以撤销激活ime</p><p>inactive: 指定所有不使用ime输入的字符。即激活非本地语言。用户仍可以撤销激活ime</p><p>disabled: 完全金庸ime。用于有焦点的控件(如输入框)，用户不可以激活ime</p><p><img src="'+l+`" alt="ime"></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;zh-cn&quot;&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>&lt;meta charset=&quot;utf-8&quot; /&gt;</span></span>
<span class="line"><span>&lt;title&gt;ime-mode_CSS参考手册_web前端开发参考手册系列&lt;/title&gt;</span></span>
<span class="line"><span>&lt;style&gt;</span></span>
<span class="line"><span>#test{</span></span>
<span class="line"><span>	padding:50px;</span></span>
<span class="line"><span>	font:14px/1.231 georgia,宋体,arial,verdana,helvetica,sans-serif;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#test fieldset{</span></span>
<span class="line"><span>	margin:0;</span></span>
<span class="line"><span>	padding:10px;</span></span>
<span class="line"><span>	border-radius:5px;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#test fieldset legend{</span></span>
<span class="line"><span>	padding:3px 6px;</span></span>
<span class="line"><span>	border-radius:3px;</span></span>
<span class="line"><span>	background:#ddd;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#test ul{</span></span>
<span class="line"><span>	list-style:none;</span></span>
<span class="line"><span>	margin:0;</span></span>
<span class="line"><span>	padding:0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#test li{</span></span>
<span class="line"><span>	padding:5px 10px;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#test .writebox{</span></span>
<span class="line"><span>	position:relative;</span></span>
<span class="line"><span>	overflow:visible;</span></span>
<span class="line"><span>	outline:none;</span></span>
<span class="line"><span>	width:200px;</span></span>
<span class="line"><span>	padding:4px 3px 5px;</span></span>
<span class="line"><span>    border:1px solid #999;</span></span>
<span class="line"><span>    border-radius:3px;</span></span>
<span class="line"><span>    box-shadow:1px 1px 2px rgba(0,0,0,.2) inset;</span></span>
<span class="line"><span>    background-color:#FFFFFF;</span></span>
<span class="line"><span>	color:#666666;</span></span>
<span class="line"><span>	font:14px/1.231 georgia,宋体,arial,verdana,helvetica,sans-serif;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#test .writebox:hover{</span></span>
<span class="line"><span>	border-color:#777;</span></span>
<span class="line"><span>	box-shadow:1px 1px 2px rgba(0,0,0,.4) inset;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>#test .writebox:focus{</span></span>
<span class="line"><span>	border-color:#666;</span></span>
<span class="line"><span>	box-shadow:0 0 5px rgba(0,0,0,.5);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.auto{</span></span>
<span class="line"><span>	ime-mode:auto;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.normal{</span></span>
<span class="line"><span>	ime-mode:normal;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.active{</span></span>
<span class="line"><span>	ime-mode:active;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.inactive{</span></span>
<span class="line"><span>	ime-mode:inactive;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.disabled{</span></span>
<span class="line"><span>	ime-mode:disabled;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.title{</span></span>
<span class="line"><span>	font:bold 16px/1.5 georgia,simsun,sans-serif;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/style&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>&lt;h1 class=&quot;title&quot;&gt;在下列输入框输入试试每个值的作用：&lt;/h1&gt;</span></span>
<span class="line"><span>&lt;form id=&quot;test&quot; action=&quot;#&quot; method=&quot;post&quot;&gt;</span></span>
<span class="line"><span>	&lt;fieldset&gt;</span></span>
<span class="line"><span>		&lt;legend&gt;简单的表单&lt;/legend&gt;</span></span>
<span class="line"><span>		&lt;ul&gt;</span></span>
<span class="line"><span>			&lt;li&gt;&lt;label&gt;auto：&lt;input type=&quot;text&quot; class=&quot;writebox auto&quot; /&gt;&lt;/label&gt;&lt;/li&gt;</span></span>
<span class="line"><span>			&lt;li&gt;&lt;label&gt;normal：&lt;input type=&quot;text&quot; class=&quot;writebox normal&quot; /&gt;&lt;/label&gt;&lt;/li&gt;</span></span>
<span class="line"><span>			&lt;li&gt;&lt;label&gt;active：&lt;input type=&quot;text&quot; class=&quot;writebox active&quot; /&gt;&lt;/label&gt;&lt;/li&gt;</span></span>
<span class="line"><span>			&lt;li&gt;&lt;label&gt;inactive：&lt;input type=&quot;text&quot; class=&quot;writebox inactive&quot; /&gt;&lt;/label&gt;&lt;/li&gt;</span></span>
<span class="line"><span>			&lt;li&gt;&lt;label&gt;disabled：&lt;input type=&quot;text&quot; class=&quot;writebox disabled&quot; /&gt;&lt;/label&gt;&lt;/li&gt;</span></span>
<span class="line"><span>		&lt;/ul&gt;</span></span>
<span class="line"><span>	&lt;/fieldset&gt;</span></span>
<span class="line"><span>&lt;/form&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文档" tabindex="-1"><a class="header-anchor" href="#参考文档"><span>参考文档</span></a></h2><p><a href="http://www.w3chtml.com/css3/properties/user-interface/ime-mode.html" target="_blank" rel="noopener noreferrer">w3cHTML css3 ime-mode</a></p><p><a href="https://www.gxlcms.com/css-258491.html" target="_blank" rel="noopener noreferrer">cssime-mode属性使用的具体详解</a></p><p><a href="https://www.cnblogs.com/cathsfz/archive/2011/05/29/2062382.html" target="_blank" rel="noopener noreferrer">实时监控文本框变化</a></p>`,17)])])}const o=s(p,[["render",t]]),m=JSON.parse('{"path":"/articles/front-end/interview/demo3.html","title":"css ime-module属性","lang":"zh-CN","frontmatter":{"autoGroup-1":"面试问题示例","title":"css ime-module属性","category":["前端技术"],"tag":["面试","前端"],"description":"语法 zoom: auto | normal | active | inactive | disabled 默认值: auto 适用于: 所有出入文本框 继承性 无 取值 auto: 不影响IME的状态 normal: 正常的IME状态 active: 指定所有使用ime输入的字符。即激活本地语言输入法。用户仍可以撤销激活ime inactive: 指...","head":[["meta",{"property":"og:url","content":"https://xuzhe0211.github.io/articles/front-end/interview/demo3.html"}],["meta",{"property":"og:site_name","content":"xz"}],["meta",{"property":"og:title","content":"css ime-module属性"}],["meta",{"property":"og:description","content":"语法 zoom: auto | normal | active | inactive | disabled 默认值: auto 适用于: 所有出入文本框 继承性 无 取值 auto: 不影响IME的状态 normal: 正常的IME状态 active: 指定所有使用ime输入的字符。即激活本地语言输入法。用户仍可以撤销激活ime inactive: 指..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-10-28T02:54:02.000Z"}],["meta",{"property":"article:tag","content":"面试"}],["meta",{"property":"article:tag","content":"前端"}],["meta",{"property":"article:modified_time","content":"2026-10-28T02:54:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"css ime-module属性\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-10-28T02:54:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"xz\\",\\"url\\":\\"https://xuzhe0211.github.io\\"}]}"]]},"git":{"createdTime":1643110125000,"updatedTime":1793156042000,"contributors":[{"name":"xuzhe1","username":"xuzhe1","email":"xuzhe1@wps.cn","commits":1,"url":"https://github.com/xuzhe1"},{"name":"xuzhe","username":"xuzhe","email":"xuzhe-0211@163.com","commits":1,"url":"https://github.com/xuzhe"}]},"readingTime":{"minutes":1.62,"words":487},"filePathRelative":"articles/front-end/interview/demo3.md","localizedDate":"2022年1月25日","excerpt":"<h2>语法</h2>\\n<p>zoom: auto | normal | active | inactive | disabled</p>\\n<p>默认值: auto</p>\\n<p>适用于: 所有出入文本框</p>\\n<p>继承性 无</p>\\n<h2>取值</h2>\\n<p>auto: 不影响IME的状态</p>\\n<p>normal: 正常的IME状态</p>\\n<p>active: 指定所有使用ime输入的字符。即激活本地语言输入法。用户仍可以撤销激活ime</p>\\n<p>inactive: 指定所有不使用ime输入的字符。即激活非本地语言。用户仍可以撤销激活ime</p>\\n<p>disabled: 完全金庸ime。用于有焦点的控件(如输入框)，用户不可以激活ime</p>","autoDesc":true}');export{o as comp,m as data};
