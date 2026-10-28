import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,a,o as e}from"./app-q-jb9_Gt.js";const l={};function p(t,s){return e(),i("div",null,[...s[0]||(s[0]=[a(`<p><a href="https://blog.csdn.net/qq_33396780/article/details/110694871" target="_blank" rel="noopener noreferrer">来源地址</a></p><h2 id="什么是微前端" tabindex="-1"><a class="header-anchor" href="#什么是微前端"><span>什么是微前端</span></a></h2><p>微前端就是将不同的功能按照不同的纬度拆分成多个子应用.通过主应用来加载这些子应用。微前端的核心在于拆，拆完之后在和！</p><h2 id="为什么使用微前端" tabindex="-1"><a class="header-anchor" href="#为什么使用微前端"><span>为什么使用微前端</span></a></h2><ol><li>不同团队间开发同一个应用技术栈不通</li><li>希望每个团队都可以独立开发,独立部署</li><li>项目中还需要老的应用代码</li></ol><p>我们可以将一个应用划分成若干个子应用，将子应用打包成一个个的lib。当路径切换时候加载不同的子应用。这样每个子应用都是独立的，技术栈也不用做限制了！从而解决前端系统开发的问题。</p><h2 id="如何实现微前端" tabindex="-1"><a class="header-anchor" href="#如何实现微前端"><span>如何实现微前端</span></a></h2><p>我们是不是可以将一个应用划分成若干个子应用，将子应用打包成一个个模块。当路径切换时加载不同的子应用。这样每个子应用都是独立的，技术栈也不用做限制了！，从而解决前端协同开发问题(子应用需要 暴露固定的钩子bootstrop、mount、unmount)</p><ul><li>iframe、webComponent</li><li>2018年Single-spa诞生了，single-Spa是一个用于前端微服务化的javascript前端解决方案(本身没有处理样式隔离，js执行隔离)实现了路由劫持和应用加载</li><li>2019年qiankun基于Single-SPA,提供了更加开箱即用的API(single-spa+sandbox+import-html-entry)做到了,技术栈无关，并且接入简单(像iframe一样简单)</li><li>2020年EMP基于modle Federation，接入成本低，解决第三方依赖包问题</li></ul><h2 id="system-js" tabindex="-1"><a class="header-anchor" href="#system-js"><span>System.js</span></a></h2><p>Systemjs是一个通用的模块加载器，它能在浏览器上动态加载模块，微前端的核心就是加载微应用，我们将应用打包成模块，在浏览器中通过systemjs来加载模块</p><div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">npm</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> install</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> webpack</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> webpack</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">cli</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> webpack</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">dev</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">server</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> babel</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">loader</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> @</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">babel</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">core</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> @</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">babel</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">preset</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> @</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">babel</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">preset</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">react</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> html</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">webpack</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">plugin</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B;">D</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// index.js</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> React</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;react&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> ReactDOM</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;react-dom&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">//.babelrc es6-es5</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    &quot;preset&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: [</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;preset-env&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;preset-react&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// webpack.config.js</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B;"> path</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> require</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;path&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B;"> HtmlWebpackPlugin</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> reuqire</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;hlml-webpack-plugin&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">module</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">exports</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        mode</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;development&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        output</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">            filename</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;index.js&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">            path</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> path</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">resolve</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">__dirname</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;dist&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">),</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">            // 什么模块规范 打包格式 system模块</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">            libaryTarget</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">production</span><span style="--shiki-light:#0184BC;--shiki-dark:#C678DD;"> ?</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;system&#39;</span><span style="--shiki-light:#0184BC;--shiki-dark:#C678DD;"> :</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;&#39;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        },</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        module</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">            rules</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">                {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">                    test</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#E06C75;"> /</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\.</span><span style="--shiki-light:#0184BC;--shiki-dark:#E06C75;">js</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">$</span><span style="--shiki-light:#0184BC;--shiki-dark:#E06C75;">/</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">                    use</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">loader</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;babel-load&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">},</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">                    exclude</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#E06C75;"> /node_modules/</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">                }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            ]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        },</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        plugins</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">            !</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#C18401;--shiki-dark:#E06C75;">production</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> &amp;&amp;</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> HtmlWebpackPlugin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">({</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">                template</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;./public/index.html&#39;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            })</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        ]。</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">filter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">Boolean</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">),</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        externals</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">production</span><span style="--shiki-light:#0184BC;--shiki-dark:#C678DD;"> ?</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;react&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;react-dom&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">] </span><span style="--shiki-light:#0184BC;--shiki-dark:#C678DD;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> []</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// dist/index.html</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="qiankun框架" tabindex="-1"><a class="header-anchor" href="#qiankun框架"><span>qiankun框架</span></a></h2><p><a href="https://qiankun.umijs.org/zh" target="_blank" rel="noopener noreferrer">文档地址</a></p><p>2018年Single-SPA诞生了，sigle-spa是一个用于前端微服务化的JavaScript前端解决方案(本身没有处理样式隔离，js执行隔离)实现了路由加持和应用加载。</p><p>2019年qiankun基于Single-SPA,提供了更加开箱即的API(single-spa+sandbox+import-html-entry)做到了，技术栈无关、并且接入简单(像iframe一样简单)。</p><h2 id="qiankun框架实例" tabindex="-1"><a class="header-anchor" href="#qiankun框架实例"><span>qiankun框架实例</span></a></h2><p><strong>这里我们打算建立三个项目进行实操，一个Vue项目充当主应用，另一个Vue和React应用子应用</strong></p><h3 id="创建三个应用" tabindex="-1"><a class="header-anchor" href="#创建三个应用"><span>创建三个应用</span></a></h3><ol><li>创建基座</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>vue create qiankun-base</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="2"><li>创建子应用1</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>vue create qiankun-vue</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="3"><li>创建子应用2</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>cnpm install -g create-react-app</span></span>
<span class="line"><span>create-react-app qiankun-react</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>三个项目</p><p>基座:qiankun-base子应用:qiankun-vue, qiankun-react</p></li></ul><h3 id="项目配置-主要" tabindex="-1"><a class="header-anchor" href="#项目配置-主要"><span>项目配置(主要)</span></a></h3><h4 id="基座qiankun-base配置" tabindex="-1"><a class="header-anchor" href="#基座qiankun-base配置"><span>基座qiankun-base配置</span></a></h4><div class="hint-container tip"><p class="hint-container-title">提示</p><p>项目创建好后我们首先进行主应用qiankun-base的配置，进入man.js文件进行配置，在main.js中加入一下代码，要注意的是，entry这项配置是我们两个子项目的域名和端口，我们必须确保两个子项目运行在这两个端口上面，container就是我们的容器名，就是我们子应用挂载的节点，相当于Vue项目里面的app节点，acitiveRule就是我们的激活路径，根据路径来显示不同的子应用。</p></div><ul><li>引入qiankun插件</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>yarn add qiankun 或者 npm i qiankun -S</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ul><li>main.js配置</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 引入qiankun</span></span>
<span class="line"><span>import {registerMicroApps, start} from &#39;qiankun&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const apps = [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        name: &#39;vueApp&#39;, // 应用名字</span></span>
<span class="line"><span>        entry: &#39;//localhost:8081&#39;， // 默认会加载这个html解析里面的js动态执行(子应用必须支持跨域) fetch</span></span>
<span class="line"><span>        container: &#39;#vue&#39;, // 容器名(此项目页面中定义的容器id，用于把对应的子应用放到此容器中)</span></span>
<span class="line"><span>        activeRule: &#39;/vue&#39;, // 激活的路径</span></span>
<span class="line"><span>        props: {a: 1} // 传递的值(可选)</span></span>
<span class="line"><span>    }, {</span></span>
<span class="line"><span>        name: &#39;reactApp&#39;,</span></span>
<span class="line"><span>        entry: &#39;//localhost: 20000&#39;, //默认会加载这个html,解析里面的js动态执行(子应用必须支持跨域) fetch</span></span>
<span class="line"><span>        container: &#39;#react&#39;,</span></span>
<span class="line"><span>        activeRule: &#39;/react&#39;,</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span>registerMicroApps(apps); // 注册应用</span></span>
<span class="line"><span>start({</span></span>
<span class="line"><span>    prefetch: false // 取消预加载</span></span>
<span class="line"><span>}); // 开启</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>配置完之后我们去到qiankun-base的app.vue文件进行主应用的页面编写，这里我安装了element-ui来进行页面美化</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>npm i element-ui -S</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>在main.js中引入element-ui</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>import ElementUI from &#39;element-ui&#39;;</span></span>
<span class="line"><span>import &#39;element-ui/lib/theme-chalk/index.css&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Vue.use(ElementUI);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>修改app.vue的组件代码</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>&lt;div id=&quot;app&quot;&gt;</span></span>
<span class="line"><span>    &lt;el-menu :router=&quot;true&quot; mode=&quot;horizontal&quot;&gt;</span></span>
<span class="line"><span>        &lt;!-- 基座中可以放自己的路由 --&gt;</span></span>
<span class="line"><span>        &lt;el-menu-item index=&quot;/&quot;&gt;Home&lt;/el-menu-item&gt;</span></span>
<span class="line"><span>        &lt;el-menu-item index=&quot;/about&quot;&gt;About&lt;/el-menu-item&gt;</span></span>
<span class="line"><span>        &lt;!-- 引入其他子应用 --&gt;</span></span>
<span class="line"><span>        &lt;el-menu-item index=&quot;/vue&quot;&gt;vue应用&lt;/el-menu-item&gt;</span></span>
<span class="line"><span>        &lt;el-menu-item index=&quot;/react&quot;&gt;react应用&lt;/el-menu-item&gt;</span></span>
<span class="line"><span>    &lt;/el-menu&gt;</span></span>
<span class="line"><span>    &lt;router-view&gt;&lt;/router-view&gt;</span></span>
<span class="line"><span>    &lt;div id=&quot;vue&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div id=&quot;react&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>router.js代码</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>import Vue form &#39;vue&#39;;</span></span>
<span class="line"><span>import VueRouter from &#39;vue-router&#39;;</span></span>
<span class="line"><span>import Home from &#39;../views/Home.vue&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Vue.use(VueRouter);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const routes = [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        path: &#39;/&#39;,</span></span>
<span class="line"><span>        name: &#39;Home&#39;,</span></span>
<span class="line"><span>        component: Home</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        path: &#39;/about&#39;,</span></span>
<span class="line"><span>        name: &#39;About&#39;,</span></span>
<span class="line"><span>        // route level code-splitting</span></span>
<span class="line"><span>        // this generates a separate chunk (about.[hash].js) for this route</span></span>
<span class="line"><span>        // which is lazy-loaded when the route is visited.</span></span>
<span class="line"><span>        component: () =&gt; import(/* webpackChunkName: &quot;about&quot; */ &#39;../views/About.vue&#39;)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span>const router = new VueRouter({</span></span>
<span class="line"><span>    mode: &#39;histroy&#39;,</span></span>
<span class="line"><span>    // base: process.env.BASE_URL,</span></span>
<span class="line"><span>    base: &#39;&#39;,</span></span>
<span class="line"><span>    routes</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default router</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="子应用qiankun-vue配置" tabindex="-1"><a class="header-anchor" href="#子应用qiankun-vue配置"><span>子应用qiankun-vue配置</span></a></h4><ul><li>main.js配置</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>import Vue from &#39;vue&#39;;</span></span>
<span class="line"><span>import App from &#39;./App.vue&#39;;</span></span>
<span class="line"><span>import router from &#39;./router&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Vue.config.productionTip = false;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let instance = null;</span></span>
<span class="line"><span>function render(props) {</span></span>
<span class="line"><span>    instance = new Vue({</span></span>
<span class="line"><span>        router,</span></span>
<span class="line"><span>        render: h =&gt; h(App)</span></span>
<span class="line"><span>    }).$mount(&#39;#qkApp&#39;); // 这里挂载到自己的html中， 基座会拿到这个挂载后的html将其插入进去</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if(window.__POWERED_BY_QIANKUN__) { // 动态添加publicPath</span></span>
<span class="line"><span>    __webpack_public_path__ = window.__INJECTED_PUBLICK_PATH_BY_QIANKUN__;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>if (!window.__POWERED_BY_QIANKUN__) { // 默认独立运行</span></span>
<span class="line"><span>    render();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 父应用加载子应用，子应用必须暴露三个接口：bootstrap, mount, unmout</span></span>
<span class="line"><span>// 子组件的协议就ok了</span></span>
<span class="line"><span>export async function bootstrap(props) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export async function mount(props) {</span></span>
<span class="line"><span>    render(props)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export async function unmount(props) {</span></span>
<span class="line"><span>    instance.$destroy();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>router配置</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>import Vue from &#39;vue&#39;</span></span>
<span class="line"><span>import VueRouter from &#39;vue-router&#39;</span></span>
<span class="line"><span>import Home from &#39;../views/Home.vue&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Vue.use(VueRouter)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const routes = [</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    path: &#39;/&#39;,</span></span>
<span class="line"><span>    name: &#39;Home&#39;,</span></span>
<span class="line"><span>    component: Home</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    path: &#39;/about&#39;,</span></span>
<span class="line"><span>    name: &#39;About&#39;,</span></span>
<span class="line"><span>    component: () =&gt; import(/* webpackChunkName: &quot;about&quot; */ &#39;../views/About.vue&#39;)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const router = new VueRouter({</span></span>
<span class="line"><span>  mode: &#39;history&#39;,</span></span>
<span class="line"><span>  base: &#39;/vue&#39;,</span></span>
<span class="line"><span>  routes</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default router</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Vue.config.js配置</li></ul><p>在子应用的根目录下面新建一个Vue.config.js文件</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>module.export = {</span></span>
<span class="line"><span>    lintOnSave: false, // 关闭eslint检测</span></span>
<span class="line"><span>    devServer: {</span></span>
<span class="line"><span>        port: 8080, // 这里端口必须和父应用配置的子应用端口一致</span></span>
<span class="line"><span>        headers: {</span></span>
<span class="line"><span>            // 因为qiankun内部请求都是fetch来请求资源，所以子应用必须允许跨域</span></span>
<span class="line"><span>            &#39;\bAccess-Control-Allow-Origin&#39;: &#39;*&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    configureWebpack: {</span></span>
<span class="line"><span>        output: {</span></span>
<span class="line"><span>            // 资源打包路径</span></span>
<span class="line"><span>            library: &#39;vueApp&#39;,</span></span>
<span class="line"><span>            libraryTarget: &#39;umd&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="子应用qiankun-react配置" tabindex="-1"><a class="header-anchor" href="#子应用qiankun-react配置"><span>子应用qiankun-react配置</span></a></h4><ul><li>src目录下的index.js文件</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>import React from &#39;react&#39;;</span></span>
<span class="line"><span>import ReactDOM from &#39;react-dom&#39;;</span></span>
<span class="line"><span>import &#39;./index.css&#39;;</span></span>
<span class="line"><span>import App from &#39;./App&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function render() {</span></span>
<span class="line"><span>    ReactDOM.render(</span></span>
<span class="line"><span>        &lt;React.StrictMode&gt;</span></span>
<span class="line"><span>            &lt;App /&gt;</span></span>
<span class="line"><span>        &lt;/React.StrictMode&gt;,</span></span>
<span class="line"><span>        document.getElementById(&#39;root&#39;)</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if(!window.__POWERED_BY_QIANKUN__){</span></span>
<span class="line"><span>  render();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export async function bootstrap(){</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>export async function mount() {</span></span>
<span class="line"><span>  render()</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>export async function unmount(){</span></span>
<span class="line"><span>  ReactDOM.unmountComponentAtNode( document.getElementById(&#39;root&#39;));  // 卸载节点</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>config.overrides.js配置</li></ul><p>先引入react-app-rewired, 在修改package.json启动命令</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>npm install react-app-rewired</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>修改package.json启动命令</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&quot;scripts&quot;: {</span></span>
<span class="line"><span>    &quot;start&quot;: &quot;react-app-rewired start&quot;,</span></span>
<span class="line"><span>    &quot;build&quot;: &quot;react-app-rewired build&quot;,</span></span>
<span class="line"><span>    &quot;test&quot;: &quot;react-app-rewired test&quot;,</span></span>
<span class="line"><span>    &quot;eject&quot;: &quot;react-app-rewired eject&quot;</span></span>
<span class="line"><span>},</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在进行dev以及打包配置，根目录下创建config-overrides.js</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>module.exports = {</span></span>
<span class="line"><span>    webpack: (config) =&gt; {</span></span>
<span class="line"><span>        config.output.library = &#39;reactApp&#39;;</span></span>
<span class="line"><span>        config.output.libraryTarget = &#39;umd&#39;;</span></span>
<span class="line"><span>        config.output.publicPath = &#39;http://localhost:20000/&#39;;	// 此应用自己的端口号</span></span>
<span class="line"><span>        return config;</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    devServer: (configFunction) =&gt; {</span></span>
<span class="line"><span>        return function (proxy, allowedHost) {</span></span>
<span class="line"><span>            const config = configFunction(proxy, allowedHost);</span></span>
<span class="line"><span>            config.headers = {</span></span>
<span class="line"><span>                &quot;Access-Control-Allow-Origin&quot;: &#39;*&#39;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            return config</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>注意点</li></ol><ul><li>如何在主应用某个路由页面加载微应用</li></ul><p>react+react-router 技术栈的主应用:只需要让子应用的activeRule包含主应用的这个路由即可</p><p>vue+vue-router技术栈的主应用</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>例如:主应用需要在login页面登录，登录成功后跳转到main后台的管理界面，在main管理界面下显示子应用。</p></div><p>修改主应用router.js</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 如果这个路由有其他子路由，需要另外注册一个路由，任然使用这个组件即可。</span></span>
<span class="line"><span>// 本案例就是有子路由，所以需要才后面重新定义main页面的路由</span></span>
<span class="line"><span>const routes = [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        path: &#39;/&#39;,</span></span>
<span class="line"><span>        name: &#39;Login&#39;,</span></span>
<span class="line"><span>        component: Login</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        path: &#39;/main&#39;,</span></span>
<span class="line"><span>        name: &#39;Main&#39;,</span></span>
<span class="line"><span>        component: Main,</span></span>
<span class="line"><span>        children: [</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                path: &#39;/home&#39;,</span></span>
<span class="line"><span>                name: &#39;Home&#39;,</span></span>
<span class="line"><span>                component: Home</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                path: &#39;/about&#39;,</span></span>
<span class="line"><span>                name: &#39;About&#39;,</span></span>
<span class="line"><span>                // route level code-splitting</span></span>
<span class="line"><span>                // this generates a separate chunk (about.[hash].js) for this route</span></span>
<span class="line"><span>                // which is lazy-loaded when the route is visited.</span></span>
<span class="line"><span>                component: () =&gt; import(/* webpackChunkName: &quot;about&quot; */ &#39;../views/About.vue&#39;)</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        ]</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        path: &#39;/main/*&#39;,</span></span>
<span class="line"><span>        name: &#39;Main&#39;,</span></span>
<span class="line"><span>        component: Main,</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改主应用main.js的文件：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 子应用的 activeRule 需要包含主应用的这个路由 path</span></span>
<span class="line"><span>const apps = [</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    name: &#39;vueApp&#39;, // 应用的名字</span></span>
<span class="line"><span>    entry: &#39;//localhost:8081&#39;, // 默认会加载这个html 解析里面的js 动态的执行 （子应用必须支持跨域）fetch</span></span>
<span class="line"><span>    container: &#39;#vue&#39;, // 容器名</span></span>
<span class="line"><span>    activeRule: &#39;/main/vue&#39;, // 激活的路径</span></span>
<span class="line"><span>    props: { a: 1 }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    name: &#39;reactApp&#39;,</span></span>
<span class="line"><span>    entry: &#39;//localhost:20000&#39;, // 默认会加载这个html 解析里面的js 动态的执行 （子应用必须支持跨域）fetch</span></span>
<span class="line"><span>    container: &#39;#react&#39;,</span></span>
<span class="line"><span>    activeRule: &#39;/main/react&#39;,</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span>registerMicroApps(apps); // 注册应用</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改主应用main.vue页面代码</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 在 Main.vue 这个组件的 mounted 周期调用 start 函数，注意不要重复调用。</span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div class=&quot;main-content&quot;&gt;</span></span>
<span class="line"><span>    &lt;el-menu :router=&quot;true&quot; mode=&quot;horizontal&quot;&gt;</span></span>
<span class="line"><span>      &lt;!--基座中可以放自己的路由--&gt;</span></span>
<span class="line"><span>      &lt;el-menu-item index=&quot;/home&quot;&gt;Home&lt;/el-menu-item&gt;</span></span>
<span class="line"><span>      &lt;el-menu-item index=&quot;/about&quot;&gt;About&lt;/el-menu-item&gt;</span></span>
<span class="line"><span>      &lt;!--引用其他子应用--&gt;</span></span>
<span class="line"><span>      &lt;el-menu-item index=&quot;/main/vue&quot;&gt;vue应用&lt;/el-menu-item&gt;</span></span>
<span class="line"><span>      &lt;el-menu-item index=&quot;/main/react&quot;&gt;react应用&lt;/el-menu-item&gt;</span></span>
<span class="line"><span>    &lt;/el-menu&gt;</span></span>
<span class="line"><span>    &lt;router-view&gt;&lt;/router-view&gt;</span></span>
<span class="line"><span>    &lt;div id=&quot;vue&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>    &lt;div id=&quot;react&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>import { start } from &quot;qiankun&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  name: &quot;Main&quot;,</span></span>
<span class="line"><span>  mounted() {</span></span>
<span class="line"><span>    if (!window.qiankunStarted) {</span></span>
<span class="line"><span>      window.qiankunStarted = true;</span></span>
<span class="line"><span>      start();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,70)])])}const c=n(l,[["render",p]]),h=JSON.parse('{"path":"/articles/front-end/engineering/microwave-01.html","title":"01-qiankun(乾坤)实例","lang":"zh-CN","frontmatter":{"autoGroup-3":"微前端","title":"01-qiankun(乾坤)实例","category":["前端技术"],"tag":["工程化","前端"],"description":"来源地址 什么是微前端 微前端就是将不同的功能按照不同的纬度拆分成多个子应用.通过主应用来加载这些子应用。微前端的核心在于拆，拆完之后在和！ 为什么使用微前端 不同团队间开发同一个应用技术栈不通 希望每个团队都可以独立开发,独立部署 项目中还需要老的应用代码 我们可以将一个应用划分成若干个子应用，将子应用打包成一个个的lib。当路径切换时候加载不同的子...","head":[["meta",{"property":"og:url","content":"https://xuzhe0211.github.io/articles/front-end/engineering/microwave-01.html"}],["meta",{"property":"og:site_name","content":"xz"}],["meta",{"property":"og:title","content":"01-qiankun(乾坤)实例"}],["meta",{"property":"og:description","content":"来源地址 什么是微前端 微前端就是将不同的功能按照不同的纬度拆分成多个子应用.通过主应用来加载这些子应用。微前端的核心在于拆，拆完之后在和！ 为什么使用微前端 不同团队间开发同一个应用技术栈不通 希望每个团队都可以独立开发,独立部署 项目中还需要老的应用代码 我们可以将一个应用划分成若干个子应用，将子应用打包成一个个的lib。当路径切换时候加载不同的子..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-10-28T02:54:02.000Z"}],["meta",{"property":"article:tag","content":"工程化"}],["meta",{"property":"article:tag","content":"前端"}],["meta",{"property":"article:modified_time","content":"2026-10-28T02:54:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"01-qiankun(乾坤)实例\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-10-28T02:54:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"xz\\",\\"url\\":\\"https://xuzhe0211.github.io\\"}]}"]]},"git":{"createdTime":1643110125000,"updatedTime":1793156042000,"contributors":[{"name":"xuzhe1","username":"xuzhe1","email":"xuzhe1@wps.cn","commits":1,"url":"https://github.com/xuzhe1"},{"name":"xuzhe","username":"xuzhe","email":"xuzhe@global-hgroup.com","commits":2,"url":"https://github.com/xuzhe"}]},"readingTime":{"minutes":7.85,"words":2356},"filePathRelative":"articles/front-end/engineering/microwave-01.md","localizedDate":"2022年1月25日","excerpt":"<p><a href=\\"https://blog.csdn.net/qq_33396780/article/details/110694871\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">来源地址</a></p>\\n<h2>什么是微前端</h2>\\n<p>微前端就是将不同的功能按照不同的纬度拆分成多个子应用.通过主应用来加载这些子应用。微前端的核心在于拆，拆完之后在和！</p>\\n<h2>为什么使用微前端</h2>\\n<ol>\\n<li>不同团队间开发同一个应用技术栈不通</li>\\n<li>希望每个团队都可以独立开发,独立部署</li>\\n<li>项目中还需要老的应用代码</li>\\n</ol>","autoDesc":true}');export{c as comp,h as data};
