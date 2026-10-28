import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,a as n,d as p,b as l,w as r,r as d,o as t,e as c}from"./app-q-jb9_Gt.js";const o={};function h(m,s){const a=d("RouteLink");return t(),e("div",null,[s[1]||(s[1]=n(`<ol><li>设置为淘宝镜像</li></ol><p>npm config set registry https://registry.npm.taobao.org</p><ol start="2"><li>设置回原本的源，用来发布npm包</li></ol><p>npm config set registry https://registry.npmjs.org</p><ol start="3"><li>查看npm当前设置的源</li></ol><p>npm config get registry 或者 npm config list</p><h2 id="node-pm2使用文档" tabindex="-1"><a class="header-anchor" href="#node-pm2使用文档"><span>Node pm2使用文档</span></a></h2><p><strong>pm2和forever</strong>是启动Nodejs服务常用到的两个工具。使用这两个指令可以使node服务在后台运行，另外他们可以在服务因异常或其他原因被杀掉后进行自动重启。</p><h3 id="基本指令" tabindex="-1"><a class="header-anchor" href="#基本指令"><span>基本指令</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>npm install pm2 -g //全局安装</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pm2 start app.js 启动服务，入口文件是app.js</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pm2 start app.js --name [name] 重命名进程、应用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pm2 start app.js -i [n] --name [name] 启动n个进程，名字命名为name</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pm2 restart [name or id] 重启服务</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pm2 start app.js --max_memory_restart 1024M 当内存超过1024M时自动重启。</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>pm2 stop [name or id] 结束进程</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pm2 delete [name or id] 删除进程</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pm2 delete all 删除所有进程/应用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pm2 stop all 结束所有进程</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pm2 list 列出所有进程/应用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pm2 monit 对服务进行监控-查看进程/应用的资源消耗情况</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pm2 describe [name or id] 查看某个进程/应用具体情况</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="高级用法" tabindex="-1"><a class="header-anchor" href="#高级用法"><span>高级用法</span></a></h3><p>pm2配置文件启动</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>pm2 ecosystem 生成配置文件ecosystem.json</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pm2 start Or Restart /file/path/ecosystem.json 通过配置文件启动服务</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//ecosystem.json内容</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>    * Application configuration section</span></span>
<span class="line"><span>    * http://pm2.keymetrics.io/docs/usage/application-declaration/</span></span>
<span class="line"><span>    * 多个服务，依次放到apps对应的数组里</span></span>
<span class="line"><span>    */</span></span>
<span class="line"><span>    apps : [</span></span>
<span class="line"><span>    // First application</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            name      : &quot;nova&quot;,</span></span>
<span class="line"><span>            max_memory_restart: &quot;300M&quot;,</span></span>
<span class="line"><span>            script    : &quot;/root/nova/app.js&quot;,</span></span>
<span class="line"><span>            out_file : &quot;/logs/nova_out.log&quot;,</span></span>
<span class="line"><span>            error_file : &quot;/logs/nova_error.log&quot;,</span></span>
<span class="line"><span>            instances  : 4,</span></span>
<span class="line"><span>            exec_mode  : &quot;cluster&quot;,</span></span>
<span class="line"><span>            env: {</span></span>
<span class="line"><span>                NODE_ENV: &quot;production&quot;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span> }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nrm" tabindex="-1"><a class="header-anchor" href="#nrm"><span>NRM</span></a></h2><h3 id="什么是nrm" tabindex="-1"><a class="header-anchor" href="#什么是nrm"><span>什么是nrm</span></a></h3><p>nrm是一个npm源管理器，允许你快速的在npm源间切换。</p><p>npm默认情况下是使用npm官方源(使用npm config ls命令查看)，这个源不稳定，一般我们使用淘宝源：https://registry.npm.taobao.org/，修改源的方式也很简单</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>npm set registry https://registry.npm.taobao.org/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>之后切换官方源，是不是比较麻烦？？所以有了nrm</p><h4 id="nrm使用" tabindex="-1"><a class="header-anchor" href="#nrm使用"><span>nrm使用</span></a></h4><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>//nrm安装</span></span>
<span class="line"><span>npm install -g nrm</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//查看可选源</span></span>
<span class="line"><span>nrm ls</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//查看当前使用源</span></span>
<span class="line"><span>nrm current</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//切换源</span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span>registry为源名，例如：nrm use taobao</span></span>
<span class="line"><span>**/</span></span>
<span class="line"><span>nrm use &lt;registry&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//添加源</span></span>
<span class="line"><span>nrm add &lt;registry&gt; &lt;url&gt;</span></span>
<span class="line"><span>//例如：</span></span>
<span class="line"><span>nrm add cpm http://192.168.21.11:8888/repository</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>//删除源</span></span>
<span class="line"><span>nrm del &lt;registry&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//测试源速度(响应时间)</span></span>
<span class="line"><span>nrm test &lt;registry&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nvm" tabindex="-1"><a class="header-anchor" href="#nvm"><span>NVM</span></a></h2><h3 id="nvm是什么" tabindex="-1"><a class="header-anchor" href="#nvm是什么"><span>nvm是什么</span></a></h3><p>nvm全名node.js version management,顾名思义是一个nodejs的版本管理工具。通过它可以安装和切换不同的nodejs版本。</p><h3 id="下载" tabindex="-1"><a class="header-anchor" href="#下载"><span>下载</span></a></h3><p>增加host</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>185.199.109.133 raw.githubusercontent.com</span></span>
<span class="line"><span>185.199.108.133 raw.githubusercontent.com</span></span>
<span class="line"><span>185.199.110.133 raw.githubusercontent.com</span></span>
<span class="line"><span>185.199.111.133 raw.githubusercontent.com</span></span>
<span class="line"><span>199.232.68.133 raw.githubusercontent.com</span></span>
<span class="line"><span>199.232.68.133 user-images.githubusercontent.com</span></span>
<span class="line"><span>199.232.68.133 avatars2.githubusercontent.com</span></span>
<span class="line"><span>199.232.68.133 avatars1.githubusercontent.com</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 官网</span></span>
<span class="line"><span>https://github.com/nvm-sh/nvm/blob/master/README.md?spm=a2c6h.24755359.0.0.15c27cbc4PqUmi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash</span></span>
<span class="line"><span>或</span></span>
<span class="line"><span>wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>由于公司内网限制？切换到手机热点安装成功</p></div><h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>//查看本地安装的所有版本 可选参数available 显示所有可下载的版本</span></span>
<span class="line"><span>nvm list available</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//安装</span></span>
<span class="line"><span>nvm install 11.13.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//使用特定版本</span></span>
<span class="line"><span>nvm use 11.13.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//卸载</span></span>
<span class="line"><span>nvm uninstall 11.13.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 修改默认版本</span></span>
<span class="line"><span>nvm alias default &lt;version&gt;  如： nvm alias default v11.1.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>nvm install stable #安装最新稳定版 node，现在是 5.0.0</span></span>
<span class="line"><span>nvm install 4.2.2 #安装 4.2.2 版本</span></span>
<span class="line"><span>nvm install 0.12.7 #安装 0.12.7 版本</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 特别说明：以下模块安装仅供演示说明，并非必须安装模块</span></span>
<span class="line"><span>nvm use 0 #切换至 0.12.7 版本</span></span>
<span class="line"><span>npm install -g mz-fis #安装 mz-fis 模块至全局目录，安装完成的路径是 /Users/&lt;你的用户名&gt;/.nvm/versions/node/v0.12.7/lib/mz-fis</span></span>
<span class="line"><span>nvm use 4 #切换至 4.2.2 版本</span></span>
<span class="line"><span>npm install -g react-native-cli #安装 react-native-cli 模块至全局目录，安装完成的路径是 /Users/&lt;你的用户名&gt;/.nvm/versions/node/v4.2.2/lib/react-native-cli</span></span>
<span class="line"><span></span></span>
<span class="line"><span>nvm alias default 0.12.7 #设置默认 node 版本为 0.12.7</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//我们将nvm的安装镜像设置成国内镜像</span></span>
<span class="line"><span>export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>// nvm 删除</span></span>
<span class="line"><span># nvm unload</span></span>
<span class="line"><span>rm -rf &quot;$NVM_DIR&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>Mac M1 中，nvm install 可能会安装不了，报clang: error: no such file or directory: &#39;CXX=c++&#39;错误</p><p>解决方案：在iTrem2 中输入</p><p>arch -x86_64 zsh</p></div><p>https://blog.csdn.net/qq_33794441/article/details/114585457</p><p>https://github.com/hawtim/blog/issues/10</p><p>https://zhuanlan.zhihu.com/p/115450863</p><p>https://www.jianshu.com/p/27cd8ea20d7d</p><p>https://juejin.cn/post/6968639978242834468</p><h2 id="nodemon" tabindex="-1"><a class="header-anchor" href="#nodemon"><span>nodemon</span></a></h2><p>nodemon是一种工具，可以自动检测到目录中的文件更改时通过重新启动应用程序来调试基于node.js的应用程序。</p><p>安装</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>npm install -g nodemon</span></span>
<span class="line"><span>//或</span></span>
<span class="line"><span>npm install --save-dev nodemon</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>nodemon   ./main.js // 启动node服务</span></span>
<span class="line"><span>nodemon ./main.js localhost 6677 // 在本地6677端口启动node服务</span></span>
<span class="line"><span>&quot;start&quot;: &quot;ts-node -r tsconfig-paths/register nodemon src/main.ts&quot;,</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>延迟重启</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>nodemon -delay10 main.js</span></span>
<span class="line"><span></span></span>
<span class="line"><span>nodemon --delay 2.5 server.js</span></span>
<span class="line"><span></span></span>
<span class="line"><span>nodemon --delay 2500ms server.js</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个就类似于js函数中的函数节流,只在最后一次更改的文件往后延迟重启.避免了短时间多次重启的局面.</p><p>nodemon支持本地和全局配置文件。这些通常是命名的nodemon.json，可以位于当前工作目录或主目录中。可以使用该--config (file)选项指定备用本地配置文件。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;verbose&quot;: true,</span></span>
<span class="line"><span>  &quot;ignore&quot;: [&quot;*.test.js&quot;, &quot;fixtures/*&quot;],</span></span>
<span class="line"><span>  &quot;execMap&quot;: {</span></span>
<span class="line"><span>    &quot;rb&quot;: &quot;ruby&quot;,</span></span>
<span class="line"><span>    &quot;pde&quot;: &quot;processing --sketch={{pwd}} --run&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="yzb-cli" tabindex="-1"><a class="header-anchor" href="#yzb-cli"><span>yzb-cli</span></a></h2><blockquote><p>开发node cli工具参考，感觉写的不错哦</p></blockquote><p><a href="https://www.npmjs.com/package/yzb-cli" target="_blank" rel="noopener noreferrer">参考地址</a></p><h2 id="cli-table" tabindex="-1"><a class="header-anchor" href="#cli-table"><span>cli-table</span></a></h2><blockquote><p>在cli中打印表格</p></blockquote><p><a href="https://www.npmjs.com/package/cli-table" target="_blank" rel="noopener noreferrer">参考地址</a></p><h2 id="一、linux下chmod-x的意思" tabindex="-1"><a class="header-anchor" href="#一、linux下chmod-x的意思"><span>一、linux下chmod +x的意思</span></a></h2><p><span style="color:red;">chmod +x的意思就是给文件执行权限</span></p><p>LINUX下不同的文件类型有不同的颜色，</p><ul><li><p>绿色文件： 可执行文件，可执行的程序</p></li><li><p>红色文件：压缩文件或者包文件</p></li><li><p>蓝色文件：目录</p></li><li><p>白色文件：一般性文件，如文本文件，配置文件，源码文件等</p></li><li><p>浅蓝色文件：链接文件，主要是使用ln命令建立的文件</p></li><li><p>红色闪烁：表示链接的文件有问题</p></li><li><p>黄色：表示设备文件</p></li><li><p>灰色：表示其他文件</p></li></ul><p><a href="!https://blog.csdn.net/xudailong_blog/article/details/82891506">相关问题</a></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>chmod u+x install.sh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="二、postman" tabindex="-1"><a class="header-anchor" href="#二、postman"><span>二、postman</span></a></h2><p>接口调试工具</p><h2 id="三、node-模块" tabindex="-1"><a class="header-anchor" href="#三、node-模块"><span>三、node 模块</span></a></h2><h3 id="ora" tabindex="-1"><a class="header-anchor" href="#ora"><span>ora</span></a></h3><p>node命令行环境的loading、显示各种状态的图标等</p><h3 id="commander" tabindex="-1"><a class="header-anchor" href="#commander"><span>commander</span></a></h3><p>命令行界面的完整解决方案，受Ruby Commander启发</p><p><strong>安装</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>npm install commander --save</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>** Options解析**</p><p>使用.option()方法定义commander的选项options，也可以作为选项的文档。下面的示例讲解析来自process.argv的args和options，然后将剩下的参数(未定义的参数)赋值给commander对象的args属性(program.args)，program.args是一个数组。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#!/usr/bin/env node</span></span>
<span class="line"><span>var program = require(&#39;commander&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>program</span></span>
<span class="line"><span>	.version(&#39;0.1.0&#39;)</span></span>
<span class="line"><span>    .options(&#39;-p,--peppers&#39;, &#39;Add peppers&#39;)</span></span>
<span class="line"><span>    .options(&#39;-P, --pineapple&#39;, &#39;Add pineapple&#39;)</span></span>
<span class="line"><span>    .options(&#39;-b, --bbq-sauce&#39;, &#39;Add bbq sauce&#39;)</span></span>
<span class="line"><span>    .options(&#39;-c, --cheese [type]&#39;, &#39;Add the specified type of cheese [marble]&#39;, &#39;marble&#39;)</span></span>
<span class="line"><span>    .parse(process.argv);</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>console.log(&#39;you ordered a pizza with:&#39;);</span></span>
<span class="line"><span>if(program.peppers) console.log(&#39;  --peppers&#39;);</span></span>
<span class="line"><span>if (program.pineapple) console.log(&#39;  - pineapple&#39;);</span></span>
<span class="line"><span>if (program.bbqSauce) console.log(&#39;  - bbq&#39;);</span></span>
<span class="line"><span>console.log(&#39;  - %s cheese&#39;, program.cheese);</span></span>
<span class="line"><span>// 执行</span></span>
<span class="line"><span>node index.js -pPbc hahah&lt;br&gt;</span></span>
<span class="line"><span>you ordered a pizza with:</span></span>
<span class="line"><span>  - peppers</span></span>
<span class="line"><span>  - pineapple</span></span>
<span class="line"><span>  - bbq</span></span>
<span class="line"><span>  - hahah cheese</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>栗子：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#!/usr/bin/env node</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const program = require(&#39;commander&#39;)</span></span>
<span class="line"><span>program.version(require(&#39;../package&#39;).version)</span></span>
<span class="line"><span>program</span></span>
<span class="line"><span>    .command(&#39;init &lt;name&gt;&#39;)</span></span>
<span class="line"><span>    .description(&#39;init project&#39;)</span></span>
<span class="line"><span>    .action(</span></span>
<span class="line"><span>        require(&#39;../lib/init&#39;)</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>program.parse(process.argv)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数据库工具" tabindex="-1"><a class="header-anchor" href="#数据库工具"><span>数据库工具</span></a></h2><p>adminer--- Adminer是一个类似于phpMyAdmin的MySQL管理客户端</p><p>mongo express---基于Web的MongoDB管理界面</p><p>sequel pro 数据库工具</p><h2 id="rsync-scip文件同步命令使用" tabindex="-1"><a class="header-anchor" href="#rsync-scip文件同步命令使用"><span>rsync | scip文件同步命令使用</span></a></h2><h3 id="scp" tabindex="-1"><a class="header-anchor" href="#scp"><span>scp</span></a></h3>`,79)),p("p",null,[l(a,{to:"/articles/back-end/Docker/#docker%E5%B0%86%E5%AE%B9%E5%99%A8%E6%89%93%E5%8C%85%E6%88%90%E9%95%9C%E5%83%8F%E5%B9%B6%E4%BC%A0%E8%BE%93%E5%88%B0%E5%85%B6%E4%BB%96%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2"},{default:r(()=>[...s[0]||(s[0]=[c("docker将容器打包成镜像并传输到其他服务器部署",-1)])]),_:1})]),s[2]||(s[2]=n('<h3 id="rsync" tabindex="-1"><a class="header-anchor" href="#rsync"><span>rsync</span></a></h3><div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">rsync</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> -</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">aq</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> --</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">password</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">file</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">=/</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">etc</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">rsync161</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">pas</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">  /</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">data2</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">xxx</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">com</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">upload</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">adsvideo</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">material</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">16981</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">人物进阶选择720X1280</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">mp4</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">  asasa</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">@106.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">xxxx</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">::</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">mysqlbackup</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">/</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">www</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>需要在服务端B开启rsync服务器，并配置用户密码，同时密码在服务器A下也配置一份；同时路径别名，如上面的mysqlbackup代表/data/</p>',3))])}const b=i(o,[["render",h]]),g=JSON.parse('{"path":"/articles/back-end/Node/ztool.html","title":"工具","lang":"zh-CN","frontmatter":{"title":"工具","category":["后端基础"],"tag":["nodejs","后端"],"description":"设置为淘宝镜像 npm config set registry https://registry.npm.taobao.org 设置回原本的源，用来发布npm包 npm config set registry https://registry.npmjs.org 查看npm当前设置的源 npm config get registry 或者 npm co...","head":[["meta",{"property":"og:url","content":"https://xuzhe0211.github.io/articles/back-end/Node/ztool.html"}],["meta",{"property":"og:site_name","content":"xz"}],["meta",{"property":"og:title","content":"工具"}],["meta",{"property":"og:description","content":"设置为淘宝镜像 npm config set registry https://registry.npm.taobao.org 设置回原本的源，用来发布npm包 npm config set registry https://registry.npmjs.org 查看npm当前设置的源 npm config get registry 或者 npm co..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-10-28T02:54:02.000Z"}],["meta",{"property":"article:tag","content":"nodejs"}],["meta",{"property":"article:tag","content":"后端"}],["meta",{"property":"article:modified_time","content":"2026-10-28T02:54:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"工具\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-10-28T02:54:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"xz\\",\\"url\\":\\"https://xuzhe0211.github.io\\"}]}"]]},"git":{"createdTime":1643110125000,"updatedTime":1793156042000,"contributors":[{"name":"xuzhe1","username":"xuzhe1","email":"xuzhe1@wps.cn","commits":1,"url":"https://github.com/xuzhe1"},{"name":"xuzhe","username":"xuzhe","email":"xuzhe-0211@163.com","commits":2,"url":"https://github.com/xuzhe"},{"name":"Zhe Xu","username":"","email":"z.xu@heartdub.com","commits":1}]},"readingTime":{"minutes":5.95,"words":1785},"filePathRelative":"articles/back-end/Node/ztool.md","localizedDate":"2022年1月25日","excerpt":"<ol>\\n<li>设置为淘宝镜像</li>\\n</ol>\\n<p>npm config set registry https://registry.npm.taobao.org</p>\\n<ol start=\\"2\\">\\n<li>设置回原本的源，用来发布npm包</li>\\n</ol>\\n<p>npm config set registry https://registry.npmjs.org</p>\\n<ol start=\\"3\\">\\n<li>查看npm当前设置的源</li>\\n</ol>\\n<p>npm config get registry 或者 npm config list</p>\\n<h2>Node pm2使用文档</h2>","autoDesc":true}');export{b as comp,g as data};
