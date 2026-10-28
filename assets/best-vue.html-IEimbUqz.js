import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as i,o as e}from"./app-q-jb9_Gt.js";const l={};function p(d,s){return e(),a("div",null,[...s[0]||(s[0]=[i(`<h2 id="命名规范" tabindex="-1"><a class="header-anchor" href="#命名规范"><span>命名规范</span></a></h2><p>市面上常用的命名规范</p><ul><li>camelCase(小驼峰命名法--首字母小写)</li><li>PascalCase(大驼峰命名法--首字母大写)</li><li>kebal-case(短横线连接式)</li><li>Snake(下划线连接式)</li></ul><h3 id="_1-1-项目文件命名" tabindex="-1"><a class="header-anchor" href="#_1-1-项目文件命名"><span>1.1 项目文件命名</span></a></h3><h4 id="_1-1-1-项目名" tabindex="-1"><a class="header-anchor" href="#_1-1-1-项目名"><span>1.1.1 项目名</span></a></h4><p>全部采用小写方式，以<strong>短横线</strong>分隔。例：my-project-name</p><h4 id="_1-1-2-目录名" tabindex="-1"><a class="header-anchor" href="#_1-1-2-目录名"><span>1.1.2 目录名</span></a></h4><p><strong>参考项目命名规则,有复数结构时，要采用复数命名法。</strong> 例：docs、assets、components、directives、mixins、utils、views。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>my-project-name/</span></span>
<span class="line"><span>|- BuildScript    // 流水线部署文件目录</span></span>
<span class="line"><span>|- docs           // 项目的细化文档目录（可选）</span></span>
<span class="line"><span>|- nginx          // 部署在容器上前端项目 nginx 代理文件目录</span></span>
<span class="line"><span>|- node_modules   // 下载的依赖包</span></span>
<span class="line"><span>|- public         // 静态页面目录</span></span>
<span class="line"><span>    |- index.html // 项目入口</span></span>
<span class="line"><span>|- src            // 源码目录</span></span>
<span class="line"><span>    |- api        // http 请求目录</span></span>
<span class="line"><span>    |- assets     // 静态资源目录，这里的资源会被wabpack构建</span></span>
<span class="line"><span>        |- icon   // icon 存放目录</span></span>
<span class="line"><span>        |- img    // 图片存放目录</span></span>
<span class="line"><span>        |- js     // 公共 js 文件目录</span></span>
<span class="line"><span>        |- scss   // 公共样式 scss 存放目录</span></span>
<span class="line"><span>            |- frame.scss   // 入口文件</span></span>
<span class="line"><span>            |- global.scss  // 公共样式</span></span>
<span class="line"><span>            |- reset.scss   // 重置样式</span></span>
<span class="line"><span>    |- components     // 组件</span></span>
<span class="line"><span>    |- plugins        // 插件</span></span>
<span class="line"><span>    |- router         // 路由</span></span>
<span class="line"><span>    |- routes         // 详细的路由拆分目录（可选）</span></span>
<span class="line"><span>        |- index.js</span></span>
<span class="line"><span>    |- store          // 全局状态管理</span></span>
<span class="line"><span>    |- utils          // 工具存放目录</span></span>
<span class="line"><span>        |- request.js // 公共请求工具</span></span>
<span class="line"><span>    |- views          // 页面存放目录</span></span>
<span class="line"><span>    |- App.vue        // 根组件</span></span>
<span class="line"><span>    |- main.js        // 入口文件</span></span>
<span class="line"><span>    |- tests          // 测试用例</span></span>
<span class="line"><span>    |- .browserslistrc// 浏览器兼容配置文件</span></span>
<span class="line"><span>    |- .editorconfig  // 编辑器配置文件</span></span>
<span class="line"><span>    |- .eslintignore  // eslint 忽略规则</span></span>
<span class="line"><span>    |- .eslintrc.js   // eslint 规则</span></span>
<span class="line"><span>    |- .gitignore     // git 忽略规则</span></span>
<span class="line"><span>    |- babel.config.js // babel 规则</span></span>
<span class="line"><span>    |- Dockerfile // Docker 部署文件</span></span>
<span class="line"><span>    |- jest.config.js</span></span>
<span class="line"><span>    |- package-lock.json</span></span>
<span class="line"><span>    |- package.json // 依赖</span></span>
<span class="line"><span>    |- README.md // 项目 README</span></span>
<span class="line"><span>    |- vue.config.js // webpack 配置</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-1-3-图像文件名" tabindex="-1"><a class="header-anchor" href="#_1-1-3-图像文件名"><span>1.1.3 图像文件名</span></a></h4><p>全部采用小写方式，优先选择单个单词命名，多个单词命名以<strong>下划线</strong>分隔</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>banner_sina.gif</span></span>
<span class="line"><span>menu_aboutus.gif</span></span>
<span class="line"><span>munutitle_news.gif</span></span>
<span class="line"><span>logo_police.gif</span></span>
<span class="line"><span>pci_people.jpg</span></span>
<span class="line"><span>pic_TV.jpg</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-1-4-html文件名" tabindex="-1"><a class="header-anchor" href="#_1-1-4-html文件名"><span>1.1.4 HTML文件名</span></a></h4><p>全部采用小写方式，优先选择单个单词命名，多个单词命名以<strong>下划线</strong>分隔</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>|- error_report.html</span></span>
<span class="line"><span>|- success_report.html</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-1-5-css文件名" tabindex="-1"><a class="header-anchor" href="#_1-1-5-css文件名"><span>1.1.5 CSS文件名</span></a></h4><p>全部采用小写方式,优先选择单个单词命名，多个单词命名以<strong>短横线</strong>分隔</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>|- normalize.less</span></span>
<span class="line"><span>|- base.less</span></span>
<span class="line"><span>|- date-picker.scss</span></span>
<span class="line"><span>|- input-number.scss</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-1-6-javascript文件名" tabindex="-1"><a class="header-anchor" href="#_1-1-6-javascript文件名"><span>1.1.6 JavaScript文件名</span></a></h4><p>全部采用小写方式,优先选择单个单词命名，多个单词命名以<strong>短横线</strong>分隔</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>|- index.js</span></span>
<span class="line"><span>|- plugin.js</span></span>
<span class="line"><span>|- util.js</span></span>
<span class="line"><span>|- date-util.js</span></span>
<span class="line"><span>|- account-model.js</span></span>
<span class="line"><span>|- collapse-transition.js</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>上述规则可以快速记忆为&quot;静态文件下划线，编译文件短横线&quot;</p></div><h3 id="vue组件命名" tabindex="-1"><a class="header-anchor" href="#vue组件命名"><span>Vue组件命名</span></a></h3><h4 id="_1-2-1-单文件组件名" tabindex="-1"><a class="header-anchor" href="#_1-2-1-单文件组件名"><span>1.2.1 单文件组件名</span></a></h4><p>文件扩展名为.vue的single-file components(单文件组件)。单文件组件名应该使用是<strong>单词大写开头</strong>(PacalCase)</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>components/</span></span>
<span class="line"><span>|- MyComponent.vue</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-2-单例组件名" tabindex="-1"><a class="header-anchor" href="#_1-2-2-单例组件名"><span>1.2.2 单例组件名</span></a></h4><p><strong>只拥有单个活跃实例的组件应该以The前缀命名，以示其唯一性</strong></p><p>这不意味着组件只可用于一个单页面，而是每个页面_只使用一次_。这些组件永远不接受任何prop，因为它们是为你的应用定制的。如果你发现有必要添加prop，那就表明这实际上是一个可复用的组件，_只是目前_在这个页面里只使用一次。</p><p>比如，头部和侧边栏组件几乎在每个页面都会使用，不接受prop，该组件是专门为改应用所定制的。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>components/</span></span>
<span class="line"><span>|- TheHeading.vue</span></span>
<span class="line"><span>|- TheSidebar.vue</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-3-基础组件名" tabindex="-1"><a class="header-anchor" href="#_1-2-3-基础组件名"><span>1.2.3 基础组件名</span></a></h4><div class="hint-container tip"><p class="hint-container-title">提示</p><p>基础组件:不包含业务，独立、具体功能的基础组件，比如<strong>日期选择器、模态框</strong>等。这类组件作为项目的基础控件，会被大量使用，因此组件的API进行高强度的抽象，可以通过不同配置实现不同的功能。</p></div><p>应用特定样式和约定的基础组件(也就是展示类的、无逻辑的或无状态、不掺杂业务逻辑的组件)应该全部以特定的前缀开头---Base。<strong>基础组件在一个页面内可以使用多次，在不同的页面内也可以复用，是高可复用组件</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>components/</span></span>
<span class="line"><span>|- BaseButton.vue</span></span>
<span class="line"><span>|- BaseTable.vue</span></span>
<span class="line"><span>|- BaseIcon.vue</span></span>
<span class="line"><span>复制代码</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-4-业务组件" tabindex="-1"><a class="header-anchor" href="#_1-2-4-业务组件"><span>1.2.4 业务组件</span></a></h4><div class="hint-container tip"><p class="hint-container-title">提示</p><p>业务组件:它不像基础组件只包含某个功能，而是在业务中被多个页面复用的(具有可复用性),它与基础组件的区别是，业务组件只在当前项目会会用到，不具有通用性，而且会包包含一些业务，比如数据请求；而基础组件不包含业务，在任何项目中都可以使用，功能单一，比如一个具有数据校验功能的输入框</p></div><p><strong>掺杂了复杂业务的组件(拥有自身data、prop的相关处理)即业务组件</strong>应该以(Custom)前缀命名。业务组件在一个页面内比如:某个页面内有一个卡片列表，而样式和逻辑跟业务紧密相关的卡片就是业务组件</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>components</span></span>
<span class="line"><span>|- CustomCard.vue</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-5-紧密耦合的组件名" tabindex="-1"><a class="header-anchor" href="#_1-2-5-紧密耦合的组件名"><span>1.2.5 紧密耦合的组件名</span></a></h4><p>**和父组件紧密耦合的子组件应该以父组件名作为前缀命名。**因为编辑器通常会按字母顺序组织文件，所以这样做可以把相关联的文件排在一起。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>components/</span></span>
<span class="line"><span>|- TodoList.vue</span></span>
<span class="line"><span>|- TodoListItem.vue</span></span>
<span class="line"><span>|- TodoListItemButton.vue</span></span>
<span class="line"><span>复制代码</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-6-组件名中单词顺序" tabindex="-1"><a class="header-anchor" href="#_1-2-6-组件名中单词顺序"><span>1.2.6 组件名中单词顺序</span></a></h4><p>**组件名应该以高级别的 (通常是一般化描述的) 单词开头，以描述性的修饰词结尾。**因为编辑器通常会按字母顺序组织文件，所以现在组件之间的重要关系一目了然。如下组件主要是用于搜和和设置功能</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>components/</span></span>
<span class="line"><span>|- SearchButtonClear.vue</span></span>
<span class="line"><span>|- SearchButtonRun.vue</span></span>
<span class="line"><span>|- SearchInputQuery.vue</span></span>
<span class="line"><span>|- SearchInputExcludeGlob.vue</span></span>
<span class="line"><span>|- SettingsCheckboxTerms.vue</span></span>
<span class="line"><span>|- SettingCheckboxLaumchOnStarup.vue</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还有另一种多级目录的方式，把所有的搜索组件放到&quot;search&quot;目录，把所有的设置组件放到&quot;setting&quot;目录。我们只推荐在非常大型(如有100+个组件)的应用下才考虑这么做，因为在多级目录间找来找去，要比在单个components目录滚动查找要花费更多的精力。</p><h4 id="_1-2-7-完整单词的组件名" tabindex="-1"><a class="header-anchor" href="#_1-2-7-完整单词的组件名"><span>1.2.7 完整单词的组件名</span></a></h4><p><strong>组件名应该倾向于而不是缩写</strong>。编辑器中的自动补全已经让书写长命名的代码非常之低了，而其带来的明确性确实非常宝贵的。不常用的缩写尤其应该避免</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>components/</span></span>
<span class="line"><span>|- StudentDashboardSettings.vue</span></span>
<span class="line"><span>|- UserProfileOptions.vue</span></span>
<span class="line"><span>复制代码</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="代码参数命名" tabindex="-1"><a class="header-anchor" href="#代码参数命名"><span>代码参数命名</span></a></h3><h4 id="_1-3-1-name" tabindex="-1"><a class="header-anchor" href="#_1-3-1-name"><span>1.3.1 name</span></a></h4><p><strong>组件名应该始终是多个单词，应该始终是PascalCase的</strong>，根组件App以及&lt;transition&gt;、&lt;components&gt;之类的Vue内置组件除外。这样做可以避免更现有的以及未来的HTML元素相冲突，因为所有的HTML元素名称都是单个单词的。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>export default {</span></span>
<span class="line"><span>  name: &#39;ToDoList&#39;，</span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="prop" tabindex="-1"><a class="header-anchor" href="#prop"><span>prop</span></a></h4><p><strong>在声明prop的时候，其命名始终使用cameCase，而在模板和JSX中始终使用kebab-case</strong>。我们单纯的遵循每个语言的约定，在Javascript中更自然的是cameCase。而在HTML中则是kebab-case</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;WelcomeMessage greeting-text=&quot;hi&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  name: &#39;MyComponent&#39;,</span></span>
<span class="line"><span>  /...</span></span>
<span class="line"><span>  props: {</span></span>
<span class="line"><span>    greetingText:  {</span></span>
<span class="line"><span>      type: String,</span></span>
<span class="line"><span>      required: true,</span></span>
<span class="line"><span>      validator: function(data) {</span></span>
<span class="line"><span>        return [&#39;syncing&#39;, &#39;synced&#39;].indexOf(value) !== -1</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-3-3-router" tabindex="-1"><a class="header-anchor" href="#_1-3-3-router"><span>1.3.3 router</span></a></h4><p><strong>Vue Router Path 命名采用kebal-case格式</strong>。用Snake(如：/user_info)或camelCase(如:/userInfo)的单词会被当成一个单词，搜索隐藏无法区分语义</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/bad</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  path: &#39;/user_info&#39; // user_info当成一个单词</span></span>
<span class="line"><span>  name: &#39;UserInfo&#39;,</span></span>
<span class="line"><span>  component: UserInfo,</span></span>
<span class="line"><span>  meta: {</span></span>
<span class="line"><span>    title: &#39;- 用户&#39;，</span></span>
<span class="line"><span>    desc: &#39;&#39;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>},</span></span>
<span class="line"><span>// good</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  path: &#39;/user-info&#39;, // 能解析成user info</span></span>
<span class="line"><span>  name: &#39;UserInfo&#39;,</span></span>
<span class="line"><span>  component: UserInfo,</span></span>
<span class="line"><span>  meta: {</span></span>
<span class="line"><span>    title: &#39;- 用户&#39;，</span></span>
<span class="line"><span>    desc: &#39;&#39;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-3-4-模板中组件" tabindex="-1"><a class="header-anchor" href="#_1-3-4-模板中组件"><span>1.3.4 模板中组件</span></a></h4><p><strong>对于绝大多数项目来说，在单文件和字符串模板中组件名应该总是PascalCase的，但在DOM模板中总是kebab-case的</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!-- 在单文件组件和字符串模板中 --&gt; </span></span>
<span class="line"><span>&lt;MyComponent/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- 在 DOM 模板中 --&gt; </span></span>
<span class="line"><span>&lt;my-component&gt;&lt;/my-component&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-3-5-自闭合组件" tabindex="-1"><a class="header-anchor" href="#_1-3-5-自闭合组件"><span>1.3.5 自闭合组件</span></a></h4><p><strong>在单文件组件、字符串模板和JSX中没有内容的组件应该是自闭和的---但在DOM模板中永远不要这样做</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!-- 在单文件组件和字符串模板中--&gt;</span></span>
<span class="line"><span>&lt;MyComponent/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- 在所有地方 --&gt;</span></span>
<span class="line"><span>&lt;my-component&gt;&lt;/component&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-3-6-变量" tabindex="-1"><a class="header-anchor" href="#_1-3-6-变量"><span>1.3.6 变量</span></a></h4><ul><li>命名方法：camelCase</li><li>命名规范：类型+对象描述或属性的方式</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// bad</span></span>
<span class="line"><span>var getTitle = &quot;LoginTable&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// good</span></span>
<span class="line"><span>let tableTitle = &#39;LoginTable&#39;;</span></span>
<span class="line"><span>let mySchool = &#39;我的学校&#39;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-3-7-常量" tabindex="-1"><a class="header-anchor" href="#_1-3-7-常量"><span>1.3.7 常量</span></a></h4><ul><li>命名方法:全部大写下划线分割</li><li>命名规范：使用大写字母和下划线来组合命名，下划线用以分割单词</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>const MAX_COUNT = 10;</span></span>
<span class="line"><span>const URL = &#39;http://test.host.com&#39;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-3-8-方法" tabindex="-1"><a class="header-anchor" href="#_1-3-8-方法"><span>1.3.8 方法</span></a></h4><ul><li>命名方法：camelCase</li><li>命名规范：统一使用动词或者动词 + 名词形式</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 1. 普通情况下，使用动词 + 名词形式</span></span>
<span class="line"><span>// bad</span></span>
<span class="line"><span>go、nextPage、show、open、login</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// good</span></span>
<span class="line"><span>jumpPage、openCarInfoDialog</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 2. 请求数据方法，以data结尾</span></span>
<span class="line"><span>// bad</span></span>
<span class="line"><span>takeData、confirmData、getList、postForm</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// good</span></span>
<span class="line"><span>getListData、postFormData</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 3. 单个动词的请求</span></span>
<span class="line"><span>init、refresh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table><thead><tr><th>动词</th><th>含义</th><th>返回值</th></tr></thead><tbody><tr><td>can</td><td>判断是否可执行某个动作(权)</td><td>函数返回一个布尔值。true:可执行，false：不可执行</td></tr><tr><td>has</td><td>判断是否包含某个值</td><td>函数返回一个布尔值。true:含有此值；false:不含有此值</td></tr><tr><td>is</td><td>判断是否为某个值</td><td>函数返回一个布尔值。true：为某个值；false:不含某个值</td></tr><tr><td>get</td><td>获取某个值</td><td>函数返回一个非布尔值</td></tr><tr><td>set</td><td>设置某个值</td><td>无返回值、返回是否设置成功或者返回链式对象</td></tr></tbody></table><h4 id="_1-3-9-自定义事件" tabindex="-1"><a class="header-anchor" href="#_1-3-9-自定义事件"><span>1.3.9 自定义事件</span></a></h4><p><strong>自定义事件应始终使用kebab-case的事件名。</strong></p><p>不同于组件和prop,事件名不存在任何自动化的大小写转换。而是触发的事件名需要完全匹配监听这个事件所用的名称。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>this.$emit(&#39;my-event&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;MyComponent @my-event=&quot;handleDoSomething&quot;/&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不同于组件和prop,事件名不会被用作一个Jaavscript变量名或property名，所以就没有理由使用camelCase或PascalCase了。并且v-on事件监听器在DOM模板中会被自动转换为全小写(因为HTML是大小写不敏感的)，所以v-on:myEvent将会变成v-on:myevent---导致myEvent不可能被监听到。</p><p><strong><a href="https://developer.mozilla.org/zh-CN/docs/Web/Events" target="_blank" rel="noopener noreferrer">原生事件参考列表</a></strong></p><p>由原生事件可以发现其使用方式如下</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;div</span></span>
<span class="line"><span>  @blur=&quot;toggleHeaderFocus&quot;</span></span>
<span class="line"><span>  @focus=&quot;toggleHeaderFocus&quot;</span></span>
<span class="line"><span>  @click=&quot;toggleMenu&quot;</span></span>
<span class="line"><span>  @keydown.enter=&quot;handleKeydown&quot;</span></span>
<span class="line"><span>  @keydown.up.prevent=&quot;handleKeydown&quot;</span></span>
<span class="line"><span>  @keydown.down.prevent=&quot;handleKeydown&quot;</span></span>
<span class="line"><span>  @keydown.tab=&quot;handleKeydown&quot;</span></span>
<span class="line"><span>  @keydown.delete=&quot;handleKeydown&quot;</span></span>
<span class="line"><span>  @mouseenter=&quot;hasMouseHoverHead = true&quot;</span></span>
<span class="line"><span>  @mouseleave=&quot;hasMouseHoverHead = false&quot;&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而为了区分_原生事件_和_自定义事件_在Vue中的使用，建议除了多单词事件名使用kebab-case的情况下，命名还需要遵守为on+<strong>动词</strong>的形式，如下</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!-- 父组件 --&gt;</span></span>
<span class="line"><span>&lt;div</span></span>
<span class="line"><span>  @on-search=&quot;handleSearch&quot;</span></span>
<span class="line"><span>  @on-clear=&quot;handleClear&quot;</span></span>
<span class="line"><span>  @on-clickoutside=&quot;handleClickOutside&quot;&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 子组件</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  methods: {</span></span>
<span class="line"><span>    handleTriggerItem() {</span></span>
<span class="line"><span>      this.$emit(&#39;on-clear&#39;)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-3-10-事件方法" tabindex="-1"><a class="header-anchor" href="#_1-3-10-事件方法"><span>1.3.10 事件方法</span></a></h4><ul><li>命名方法：camelCase</li><li>命名规范：handle + 名称(可选) + 动词</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div</span></span>
<span class="line"><span>    @click.native.stop=&quot;handleItemClick()&quot;</span></span>
<span class="line"><span>    @click.native.stop=&quot;handleItemHover&quot;&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  methods: {</span></span>
<span class="line"><span>    handleItemClick() {</span></span>
<span class="line"><span>      // ....</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    handleItemHover() {</span></span>
<span class="line"><span>      // ...</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/script&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="代码规范" tabindex="-1"><a class="header-anchor" href="#代码规范"><span>代码规范</span></a></h2><h3 id="vue" tabindex="-1"><a class="header-anchor" href="#vue"><span>Vue</span></a></h3><h4 id="_2-1-1-代码结构" tabindex="-1"><a class="header-anchor" href="#_2-1-1-代码结构"><span>2.1.1 代码结构</span></a></h4><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;div id=&quot;my-component&quot;&gt;</span></span>
<span class="line"><span>    &lt;DemoComponent /&gt;</span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>import DemoComponent from &#39;../components/DemoComponent&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  name: &#39;MyComponent&#39;,</span></span>
<span class="line"><span>  components: {</span></span>
<span class="line"><span>    DemoComponent</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  mixins: [],</span></span>
<span class="line"><span>  props: {},</span></span>
<span class="line"><span>  data () {</span></span>
<span class="line"><span>    return {}</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  computed: {},</span></span>
<span class="line"><span>  watch: {}</span></span>
<span class="line"><span>  created () {},</span></span>
<span class="line"><span>  mounted () {},</span></span>
<span class="line"><span>  destroyed () {},</span></span>
<span class="line"><span>  methods: {},</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;style lang=&quot;scss&quot; scoped&gt;</span></span>
<span class="line"><span>#my-component {</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/style&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-2-data" tabindex="-1"><a class="header-anchor" href="#_2-1-2-data"><span>2.1.2 data</span></a></h4><p>组件的data必须是一个函数</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>//In a .vue file</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  data() {</span></span>
<span class="line"><span>    return {</span></span>
<span class="line"><span>      foo: &#39;bar&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-3-prop" tabindex="-1"><a class="header-anchor" href="#_2-1-3-prop"><span>2.1.3 prop</span></a></h4><p><strong>Prop定义应该尽量详细</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>export default {</span></span>
<span class="line"><span>  props: {</span></span>
<span class="line"><span>    status: {</span></span>
<span class="line"><span>      type: String,</span></span>
<span class="line"><span>      required: true,</span></span>
<span class="line"><span>      validator: function(value) {</span></span>
<span class="line"><span>        return [</span></span>
<span class="line"><span>          &#39;syncing&#39;, </span></span>
<span class="line"><span>          &#39;synced&#39;,</span></span>
<span class="line"><span>          &#39;version-conflict&#39;,</span></span>
<span class="line"><span>          &#39;error&#39;</span></span>
<span class="line"><span>        ].indexOf(value) !== -1</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-4-computed" tabindex="-1"><a class="header-anchor" href="#_2-1-4-computed"><span>2.1.4 computed</span></a></h4><p>**应该把复杂计算属性分割为尽可能多的更简单的属性。**小的、专注的计算属性减少了信息使用时的假设性限制，所以需求变更时也用不着那么多重构了</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// bad</span></span>
<span class="line"><span>computed: {</span></span>
<span class="line"><span>  price: function() {</span></span>
<span class="line"><span>    var basePrice = this.manufactureCost / (1 - this.profitMargin)</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>      basePrice - basePrice * (this.discountPercent || 0)</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// good</span></span>
<span class="line"><span>computed: {</span></span>
<span class="line"><span>  basePrice: function() {</span></span>
<span class="line"><span>    return this.manufactureCost / (1 - this.profitMargin)</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  discount: function() {</span></span>
<span class="line"><span>    return this.basePrice * (this.discountPercent || 0)</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  finalPrice: function() {</span></span>
<span class="line"><span>    return this.basePrice - this.discount</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-5-为v-for设置键值" tabindex="-1"><a class="header-anchor" href="#_2-1-5-为v-for设置键值"><span>2.1.5 为v-for设置键值</span></a></h4><p><strong>在组件上必须用key搭配v-for</strong>,以便维护内部组件及其子树的状态。甚至在元素上维护可预测的行为，比如动画中的<a href="https://bost.ocks.org/mike/constancy/" target="_blank" rel="noopener noreferrer">对象固化</a></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;ul&gt;</span></span>
<span class="line"><span>  &lt;li</span></span>
<span class="line"><span>    v-for=&quot;todo in todus&quot;</span></span>
<span class="line"><span>    :key=&quot;todo.id&quot;&gt;</span></span>
<span class="line"><span>      {{ todo.text }}</span></span>
<span class="line"><span>    &lt;/li&gt;</span></span>
<span class="line"><span>&lt;/ul&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-6-v-if和v-for互斥" tabindex="-1"><a class="header-anchor" href="#_2-1-6-v-if和v-for互斥"><span>2.1.6 v-if和v-for互斥</span></a></h4><p><strong>永远不要把v-if和v-for同时用在同一元素上。</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!-- bad:控制台报错 --&gt;</span></span>
<span class="line"><span>&lt;ul&gt;</span></span>
<span class="line"><span>  &lt;li</span></span>
<span class="line"><span>    v-for=&quot;user in users&quot;</span></span>
<span class="line"><span>    v-if=&quot;shouldShowUsers&quot;</span></span>
<span class="line"><span>    :key=&quot;user.id&quot;&gt;</span></span>
<span class="line"><span>      {{ user.name }}</span></span>
<span class="line"><span>  &lt;/li&gt;</span></span>
<span class="line"><span>&lt;/ul&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一般我们在两种常见的情况下会倾向于这样做</p><ul><li>为了过滤一个列表中的项目(比如 v-for=&quot;user in users&quot; v-if=&quot;use.isActive&quot;).在这种情况下，请将users替换为一个计算属性(比如activeUsers)，让其返回过滤后的列表<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>computed: {</span></span>
<span class="line"><span>  activeUsers: function() {</span></span>
<span class="line"><span>    return this.users.filter(user =&gt; {</span></span>
<span class="line"><span>      return user.isActive</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// template</span></span>
<span class="line"><span>&lt;ul&gt;</span></span>
<span class="line"><span>  &lt;li</span></span>
<span class="line"><span>    v-for=&quot;user in activeUsers&quot;</span></span>
<span class="line"><span>    :key=&quot;user.id&quot;&gt;</span></span>
<span class="line"><span>    {{ user.name }}  </span></span>
<span class="line"><span>  &lt;/li&gt;</span></span>
<span class="line"><span>&lt;/ul&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>为了避免渲染本应该被隐藏的列表(比如 v-for=&quot;user in users&quot; v-if=&quot;shouldShowUsers&quot;).这种情形下，请将v-if移动至容器上的(比如ul, ol)<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!-- bad --&gt;</span></span>
<span class="line"><span>&lt;ul&gt;</span></span>
<span class="line"><span>  &lt;li</span></span>
<span class="line"><span>    v-for=&quot;user in users&quot;</span></span>
<span class="line"><span>    v-if=&quot;shouldShowUsers&quot;</span></span>
<span class="line"><span>    :key=&quot;user.id&quot;&gt;</span></span>
<span class="line"><span>      {{ user.name }}</span></span>
<span class="line"><span>  &lt;/li&gt;</span></span>
<span class="line"><span>&lt;/ul&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- good --&gt;</span></span>
<span class="line"><span>&lt;ul v-if=&quot;shouldShowUsers&quot;&gt;</span></span>
<span class="line"><span>  &lt;li</span></span>
<span class="line"><span>    v-for=&quot;user in users&quot;</span></span>
<span class="line"><span>    :key=&quot;user.id&quot;&gt;</span></span>
<span class="line"><span>      {{ user.name }}</span></span>
<span class="line"><span>  &lt;/li&gt;</span></span>
<span class="line"><span>&lt;/ul&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="_2-1-7-多个attribute的元素" tabindex="-1"><a class="header-anchor" href="#_2-1-7-多个attribute的元素"><span>2.1.7 多个attribute的元素</span></a></h4><p><strong>多个attribute的元素应该分为多行撰写，每个attribute一行</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!-- bad --&gt;</span></span>
<span class="line"><span>&lt;img src=&quot;https://vuejs.org/images/logo.png&quot; alt=&quot;Vue Logo&quot;&gt;</span></span>
<span class="line"><span>&lt;MyComponent foo=&quot;a&quot; bar=&quot;b&quot; baz=&quot;c&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- good --&gt;</span></span>
<span class="line"><span>&lt;img </span></span>
<span class="line"><span>  src=&quot;https://vuejs.org/images/logon.png&quot;</span></span>
<span class="line"><span>  alt=&quot;Vue Logo&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;MyComponent</span></span>
<span class="line"><span>  foo=&quot;a&quot;</span></span>
<span class="line"><span>  bar=&quot;b&quot;</span></span>
<span class="line"><span>  baz=&quot;c&quot;/&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-8-模板中简单的表达式" tabindex="-1"><a class="header-anchor" href="#_2-1-8-模板中简单的表达式"><span>2.1.8 模板中简单的表达式</span></a></h4><p><strong>组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法</strong></p><p>复杂表达式会让你的模板变得不那么声明式。我们应该尽量描述出现的是什么，而非如何计算那个值。而且计算属性和方法使的代码可以重用</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// bad</span></span>
<span class="line"><span>{{
  fullName.split(&#39; &#39;).map(word =&gt; {
    return word[0].toUpperCase() + word.slice(1)
  }).join(&#39; &#39;)
}}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 更好的做法</span></span>
<span class="line"><span>{{ normalizedFullName }}</span></span>
<span class="line"><span>// 复杂表达式已经移入一个计算属性</span></span>
<span class="line"><span>computed: {</span></span>
<span class="line"><span>  normalizedFullName: function() {</span></span>
<span class="line"><span>    return this.fullName.split(&#39; &#39;).map(function(word) {</span></span>
<span class="line"><span>      return word[0].toUpperCase() + word.slice(1)</span></span>
<span class="line"><span>    }).jon(&#39; &#39;)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-9-带引号的attribute值" tabindex="-1"><a class="header-anchor" href="#_2-1-9-带引号的attribute值"><span>2.1.9 带引号的attribute值</span></a></h4><p><strong>非空HTML特性値应该始终带双引号</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!-- bad --&gt;</span></span>
<span class="line"><span>&lt;input type=text&gt;</span></span>
<span class="line"><span>&lt;AppSidebar :style={width:sidebarWidth+&#39;px&#39;}&gt;</span></span>
<span class="line"><span>&lt;!-- good --&gt;</span></span>
<span class="line"><span>&lt;input type=&quot;text&quot;&gt;</span></span>
<span class="line"><span>&lt;AppSidebar :style=&quot;{ width: sidebarWidth + &#39;px&#39; }&quot;&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-10-指令缩写" tabindex="-1"><a class="header-anchor" href="#_2-1-10-指令缩写"><span>2.1.10 指令缩写</span></a></h4><ul><li>用:表示v-bind</li><li>用@表示v-on</li><li>用#表示v-slot</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;input</span></span>
<span class="line"><span>  :value=&quot;newTodoText&quot;</span></span>
<span class="line"><span>  :placeholder=&quot;newTodoInstructions&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;input</span></span>
<span class="line"><span>  @input=&quot;onInput&quot;</span></span>
<span class="line"><span>  @focus=&quot;onFocus&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;template #header&gt;</span></span>
<span class="line"><span>  &lt;h1&gt;Here might be a page title&lt;/h1&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;template #footer&gt;</span></span>
<span class="line"><span>  &lt;p&gt;Here&#39;s some contact info&lt;/p&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-html" tabindex="-1"><a class="header-anchor" href="#_2-2-html"><span>2.2 HTML</span></a></h3><h4 id="_2-2-1-文件模板" tabindex="-1"><a class="header-anchor" href="#_2-2-1-文件模板"><span>2.2.1 文件模板</span></a></h4><p>HTML5文件模板</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>  &lt;html lang=&quot;zh-CN&quot;&gt;</span></span>
<span class="line"><span>  &lt;head&gt;</span></span>
<span class="line"><span>    &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span>    &lt;title&gt;HTML5标准模版&lt;/title&gt;</span></span>
<span class="line"><span>  &lt;/head&gt;</span></span>
<span class="line"><span>  &lt;body&gt;</span></span>
<span class="line"><span>  &lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>移动端</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;zh-CN&quot;&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>    &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span>    &lt;meta name=&quot;viewport&quot;</span></span>
<span class="line"><span>        content=&quot;width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no&quot;&gt;</span></span>
<span class="line"><span>    &lt;meta name=&quot;format-detection&quot; content=&quot;telephone=no&quot;&gt;</span></span>
<span class="line"><span>    &lt;title&gt;移动端HTML模版&lt;/title&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- S DNS预解析 --&gt;</span></span>
<span class="line"><span>    &lt;link rel=&quot;dns-prefetch&quot; href=&quot;&quot;&gt;</span></span>
<span class="line"><span>    &lt;!-- E DNS预解析 --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- S 线上样式页面片，开发请直接取消注释引用 --&gt;</span></span>
<span class="line"><span>    &lt;!-- #include virtual=&quot;&quot; --&gt;</span></span>
<span class="line"><span>    &lt;!-- E 线上样式页面片 --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- S 本地调试，根据开发模式选择调试方式，请开发删除 --&gt;</span></span>
<span class="line"><span>    &lt;link rel=&quot;stylesheet&quot; href=&quot;css/index.css&quot;&gt;</span></span>
<span class="line"><span>    &lt;!-- /本地调试方式 --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;link rel=&quot;stylesheet&quot; href=&quot;http://srcPath/index.css&quot;&gt;</span></span>
<span class="line"><span>    &lt;!-- /开发机调试方式 --&gt;</span></span>
<span class="line"><span>    &lt;!-- E 本地调试 --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>PC端</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span>&lt;html lang=&quot;zh-CN&quot;&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>    &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span>    &lt;meta name=&quot;keywords&quot; content=&quot;your keywords&quot;&gt;</span></span>
<span class="line"><span>    &lt;meta name=&quot;description&quot; content=&quot;your description&quot;&gt;</span></span>
<span class="line"><span>    &lt;meta name=&quot;author&quot; content=&quot;author,email address&quot;&gt;</span></span>
<span class="line"><span>    &lt;meta name=&quot;robots&quot; content=&quot;index,follow&quot;&gt;</span></span>
<span class="line"><span>    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=Edge,chrome=1&quot;&gt;</span></span>
<span class="line"><span>    &lt;meta name=&quot;renderer&quot; content=&quot;ie-stand&quot;&gt;</span></span>
<span class="line"><span>    &lt;title&gt;PC端HTML模版&lt;/title&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- S DNS预解析 --&gt;</span></span>
<span class="line"><span>    &lt;link rel=&quot;dns-prefetch&quot; href=&quot;&quot;&gt;</span></span>
<span class="line"><span>    &lt;!-- E DNS预解析 --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- S 线上样式页面片，开发请直接取消注释引用 --&gt;</span></span>
<span class="line"><span>    &lt;!-- #include virtual=&quot;&quot; --&gt;</span></span>
<span class="line"><span>    &lt;!-- E 线上样式页面片 --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- S 本地调试，根据开发模式选择调试方式，请开发删除 --&gt;</span></span>
<span class="line"><span>    &lt;link rel=&quot;stylesheet&quot; href=&quot;css/index.css&quot;&gt;</span></span>
<span class="line"><span>    &lt;!-- /本地调试方式 --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;link rel=&quot;stylesheet&quot; href=&quot;http://srcPath/index.css&quot;&gt;</span></span>
<span class="line"><span>    &lt;!-- /开发机调试方式 --&gt;</span></span>
<span class="line"><span>    &lt;!-- E 本地调试 --&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-2-元素及标签闭合" tabindex="-1"><a class="header-anchor" href="#_2-2-2-元素及标签闭合"><span>2.2.2 元素及标签闭合</span></a></h4><p>HTML元素共有以下5种</p><ul><li>空元素: area、base、br、col、command、embed、hr、img、input、keygen、link、meta、param、source、track、wbr</li><li>原始文本元素:script、style</li><li>RCDATA元素:textarea、title</li><li>外来元素：来自 MathML 命名空间和 SVG 命名空间的元素</li><li>常规元素：其他 HTML 允许的元素都称为常规元素</li></ul><p>为了能让浏览器更好的解析代码以及能让代码具有更好的可读性，有如下约定：</p><ul><li>所有具有开始标签和结束标签的元素都要写上起止标签，某些允许省略开始标签或和束标签的元素亦都要写上。</li><li>空元素标签都不加 “/” 字符。</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!-- good --&gt;</span></span>
<span class="line"><span>&lt;div&gt;</span></span>
<span class="line"><span>    &lt;h1&gt;我是h1标题&lt;/h1&gt;</span></span>
<span class="line"><span>    &lt;p&gt;我是一段文字，我有始有终，浏览器能正确解析&lt;/p&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>&lt;br data-tomark-pass&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- bad --&gt;</span></span>
<span class="line"><span>&lt;div&gt;</span></span>
<span class="line"><span>    &lt;h1&gt;我是h1标题&lt;/h1&gt;</span></span>
<span class="line"><span>    &lt;p&gt;我是一段文字，我有始无终，浏览器亦能正确解析</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;br/&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-3代码嵌套" tabindex="-1"><a class="header-anchor" href="#_2-2-3代码嵌套"><span>2.2.3代码嵌套</span></a></h4><p>元素嵌套规范，每个块状元素独立一行，内联元素可选。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!-- good --&gt;</span></span>
<span class="line"><span>&lt;div&gt;</span></span>
<span class="line"><span>    &lt;h1&gt;&lt;/h1&gt;</span></span>
<span class="line"><span>    &lt;p&gt;&lt;/p&gt;</span></span>
<span class="line"><span>&lt;/div&gt; </span></span>
<span class="line"><span>&lt;p&gt;&lt;span&gt;&lt;/span&gt;&lt;span&gt;&lt;/span&gt;&lt;/p&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- bad --&gt;</span></span>
<span class="line"><span>&lt;div&gt;</span></span>
<span class="line"><span>    &lt;h1&gt;&lt;/h1&gt;&lt;p&gt;&lt;/p&gt;</span></span>
<span class="line"><span>&lt;/div&gt; </span></span>
<span class="line"><span>&lt;p&gt; </span></span>
<span class="line"><span>    &lt;span&gt;&lt;/span&gt;</span></span>
<span class="line"><span>    &lt;span&gt;&lt;/span&gt;</span></span>
<span class="line"><span>&lt;/p&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>段落元素与标题元素只能嵌套内联元素。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!-- good --&gt;</span></span>
<span class="line"><span>&lt;h1&gt;&lt;span&gt;&lt;/span&gt;&lt;/h1&gt;</span></span>
<span class="line"><span>&lt;p&gt;&lt;span&gt;&lt;/span&gt;&lt;span&gt;&lt;/span&gt;&lt;/p&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- bad --&gt;</span></span>
<span class="line"><span>&lt;h1&gt;&lt;div&gt;&lt;/div&gt;&lt;/h1&gt;</span></span>
<span class="line"><span>&lt;p&gt;&lt;div&gt;&lt;/div&gt;&lt;div&gt;&lt;/div&gt;&lt;/p&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-css" tabindex="-1"><a class="header-anchor" href="#_2-3-css"><span>2.3 CSS</span></a></h3><h4 id="_2-3-1-样式文件" tabindex="-1"><a class="header-anchor" href="#_2-3-1-样式文件"><span>2.3.1 样式文件</span></a></h4><p>样式文件必须写上 @charset 规则，并且一定要在样式文件的第一行首个字符位置开始写，编码名用 “UTF-8”。</p><ul><li>推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@charset &quot;UTF-8&quot;;</span></span>
<span class="line"><span>.jdc {}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></li><li>不推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/* @charset规则不在文件首行首个字符开始 */</span></span>
<span class="line"><span>@charset &quot;UTF-8&quot;;</span></span>
<span class="line"><span>.jdc {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* @charset规则没有用小写 */</span></span>
<span class="line"><span>@CHARSET &quot;UTF-8&quot;;</span></span>
<span class="line"><span>.jdc {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* 无@charset规则 */</span></span>
<span class="line"><span>.jdc {}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="_2-3-2代码格式化" tabindex="-1"><a class="header-anchor" href="#_2-3-2代码格式化"><span>2.3.2代码格式化</span></a></h4><p>样式书写一般有两种:一种是紧凑格式(Compact)，一种是展开格式(Expanded)</p><ul><li>推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>.jdc {</span></span>
<span class="line"><span>  display: block;</span></span>
<span class="line"><span>  width: 50px;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>不推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>.jdc { display: block; width: 50px;}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li></ul><h4 id="_2-3-3代码大小写" tabindex="-1"><a class="header-anchor" href="#_2-3-3代码大小写"><span>2.3.3代码大小写</span></a></h4><p>样式选择器，属性名，属性值关键字全部使用小写字母书写，属性字符串允许使用大小写</p><ul><li>推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>.jdc {</span></span>
<span class="line"><span>  display: block;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>不推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>.JDC {</span></span>
<span class="line"><span>  DISPLAY: BLOCK;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="_2-3-4代码易读性" tabindex="-1"><a class="header-anchor" href="#_2-3-4代码易读性"><span>2.3.4代码易读性</span></a></h4><ol><li>左括号与类型之间一个空格，冒号与属性值之间一个空格</li></ol><ul><li>推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>.jdc {</span></span>
<span class="line"><span>  width: 100%;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>不推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>.jdc{</span></span>
<span class="line"><span>  width:100%;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><ol start="2"><li>逗号分割的取值，逗号之后一个空格</li></ol><ul><li>推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>.jdc {</span></span>
<span class="line"><span>  box-shadow: 1px 1px 1px #333, 2px 2px 2px #ccc</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>不推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>.jdc {</span></span>
<span class="line"><span>  box-shadow: 1px 1px 1px #333,2px 2px 2px #ccc;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><ol start="3"><li>为单个CSS选择器或声明开启新行 - 推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>.jdc, .jdc_logo, .jdc_hd {</span></span>
<span class="line"><span>  color: #ff0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.nav{</span></span>
<span class="line"><span>  color: #fff;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><pre><code>- 不推荐
  \`\`\`
  .jdc, .jdc_logo, .jdc_hd {
    color: #ff0;
  }.nav{
    color: #fff;
  }
  \`\`\`
</code></pre><ol start="4"><li>取色值 rbb() rgba() hsl() hsla() rect()中不需要空格，且取色值不要带有不必要的0</li></ol><ul><li>推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>.jdc {</span></span>
<span class="line"><span>  color: rgba(255,255,255,.5);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>不推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>.jdc {</span></span>
<span class="line"><span>  color: rgba( 255, 255, 255, 0.5 );</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><ol start="5"><li>属性值十六进制数值能用简写的尽量用简写</li></ol><ul><li>推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>.jdc {</span></span>
<span class="line"><span>  color: #fff;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>不推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>.jdc {</span></span>
<span class="line"><span>  color: #ffffff;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><ol start="6"><li>不要为0指明单位</li></ol><ul><li>推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>.jdc {</span></span>
<span class="line"><span>  margin: 0 10px;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>不推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>.jdc {</span></span>
<span class="line"><span>  margin: 0px 10px;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="_2-3-5-属性值引号" tabindex="-1"><a class="header-anchor" href="#_2-3-5-属性值引号"><span>2.3.5 属性值引号</span></a></h4><p>CSS属性值需要用到引号时，统一用单引号</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 推荐</span></span>
<span class="line"><span>.jdc {</span></span>
<span class="line"><span>  font-family: &#39;Hiragino Sans GB&#39;;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 不推荐</span></span>
<span class="line"><span>.jdc {</span></span>
<span class="line"><span>  font-family: &quot;Hiragino Sans GB&quot;;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-6-属性书写建议" tabindex="-1"><a class="header-anchor" href="#_2-3-6-属性书写建议"><span>2.3.6 属性书写建议</span></a></h4><p>建议遵循一下顺序</p><ol><li>布局定位属性：display/postition/float/clear/visibility/overflow</li><li>自身属性: width/height/margin/padding/border/background</li><li>文本属性: color/font/text-decoration/text-align/vertical-align/white-space/break-word</li><li>其他属性(CSS3)：content/cursor/border-radius/box-shadow/text-shadow/background:linear-gradient...</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>.jdc {</span></span>
<span class="line"><span>  display: block;</span></span>
<span class="line"><span>  position: relative;</span></span>
<span class="line"><span>  float: left;</span></span>
<span class="line"><span>  width: 100px;</span></span>
<span class="line"><span>  height: 100px;</span></span>
<span class="line"><span>  margin: 0 10px;</span></span>
<span class="line"><span>  padding: 20px 0;</span></span>
<span class="line"><span>  font-family: Arial, &#39;Helvetica Neue&#39;, Helvetica, sans-serif;</span></span>
<span class="line"><span>  color: #333;</span></span>
<span class="line"><span>  background: rgba(0,0,0,.5);</span></span>
<span class="line"><span>  -webkit-border-radius: 10px;</span></span>
<span class="line"><span>  -moz-border-radius: 10px;</span></span>
<span class="line"><span>  -o-border-radius: 10px;</span></span>
<span class="line"><span>  -ms-border-radius: 10px;</span></span>
<span class="line"><span>  border-radius: 10px;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-7-css3浏览器私有前缀" tabindex="-1"><a class="header-anchor" href="#_2-3-7-css3浏览器私有前缀"><span>2.3.7 CSS3浏览器私有前缀</span></a></h4><p>CSS3 浏览器私有前缀在前，标准前缀在后。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>.jdc {</span></span>
<span class="line"><span>  -webkit-border-radius: 10px;</span></span>
<span class="line"><span>  -moz-border-radius: 10px;</span></span>
<span class="line"><span>  -o-border-radius: 10px;</span></span>
<span class="line"><span>  -ms-border-radius: 10px;</span></span>
<span class="line"><span>  border-radius: 10px;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-javascript" tabindex="-1"><a class="header-anchor" href="#_2-4-javascript"><span>2.4 Javascript</span></a></h3><h4 id="_2-4-1单行代码块" tabindex="-1"><a class="header-anchor" href="#_2-4-1单行代码块"><span>2.4.1单行代码块</span></a></h4><p>在单行代码块中使用空格</p><ul><li>不推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>function foo() {return true}</span></span>
<span class="line"><span>if (foo) {bar = 0}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></li><li>推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>function foo() { return true }</span></span>
<span class="line"><span>if (foo) { bar = 0}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="_2-4-2-大括号风格" tabindex="-1"><a class="header-anchor" href="#_2-4-2-大括号风格"><span>2.4.2 大括号风格</span></a></h4><p>在编程过程中，大括号风格与缩进风格紧密联系，用来描述大括号相对代码块位置的方法有很多。在 JavaScript 中，主要有三种风格，如下：</p><ul><li>推荐 One True Brace Style<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>if (foo) {</span></span>
<span class="line"><span>  bar()</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>  baz()</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>Stroustrup<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>if (foo) {</span></span>
<span class="line"><span>  bar()</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>else {</span></span>
<span class="line"><span>  baz()</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>Allman<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>if (foo)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  bar()</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  baz()</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="_2-4-3-代码中的空格" tabindex="-1"><a class="header-anchor" href="#_2-4-3-代码中的空格"><span>2.4.3 代码中的空格</span></a></h4><ol><li>逗号前后的空格可以提高代码的可读性，团队原定在逗号后面使用空格，逗号前面不加空格</li></ol><ul><li>推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>var foo, bar = 2</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li><li>不推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>var foo = 1,bar = 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var foo = 1 , bar = 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var foo = 1 ,bar = 2</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><ol start="2"><li>对象字面量的键和值之间不能存在空格，且要求对象字面量的冒号和值之间存在一个空格</li></ol><ul><li>推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>var obj = { &#39;foo&#39;: &#39;haha&#39; }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li><li>不推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>var obj = { &#39;foo&#39; : &#39;haha&#39; }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li></ul><ol start="3"><li>代码块前要加空格</li></ol><ul><li>推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>if (a) {</span></span>
<span class="line"><span>  b()</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function a () {}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>不推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>if (a){</span></span>
<span class="line"><span>  b()</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function a (){}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><ol start="4"><li>函数声明括号前要加空格</li></ol><ul><li>推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>function func (x) {</span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>不推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>function func(x) {</span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><ol start="5"><li>在函数调用时，禁止使用空格</li></ol><ul><li>推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>fn()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li><li>不推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>fn ()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn</span></span>
<span class="line"><span>()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><ol start="6"><li>在操作符前后都需要添加空格</li></ol><ul><li>推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>var sum = 1 + 2</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li><li>不推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>var sum = 1+2</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li></ul><h2 id="注释规范" tabindex="-1"><a class="header-anchor" href="#注释规范"><span>注释规范</span></a></h2><p>注释的目的</p><ul><li>提高代码的可读性，从而提高代码的可维护性 注释的原则</li><li>如无必要，勿增注释</li><li>如有必要，尽量详细</li></ul><h3 id="html文件注释" tabindex="-1"><a class="header-anchor" href="#html文件注释"><span>HTML文件注释</span></a></h3><h4 id="_3-1-1-单行注释" tabindex="-1"><a class="header-anchor" href="#_3-1-1-单行注释"><span>3.1.1 单行注释</span></a></h4><p><strong>一般用于简单的描述，如某些状态描述、属性描述</strong></p><p>注释内容前后个一个空格字符，注释位于要注释代码的上面,单独占一行</p><ul><li>推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!-- Comment Text --&gt;</span></span>
<span class="line"><span>&lt;div&gt;...&lt;/div&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></li><li>不推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;div&gt;...&lt;/div&gt;&lt;!-- Comment Text --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;div&gt;&lt;!-- Comment Text --&gt;</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>&lt;/div&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="_3-1-2-模块注释" tabindex="-1"><a class="header-anchor" href="#_3-1-2-模块注释"><span>3.1.2 模块注释</span></a></h4><p><strong>一般用于描述模板的名称以及模板开始与结束的位置</strong></p><p>注释内容前后个一个空格字符， &lt;!-- S Comment Text --&gt;表示模块开始， &lt;!-- E Comment Text --&gt;表示模块结束，模块与模块之间相隔一行。</p><ul><li>推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!-- S Comment Text A --&gt; </span></span>
<span class="line"><span>&lt;div class=&quot;mod_a&quot;&gt;</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>&lt;!-- E Comment Text A --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- S Comment Text B --&gt; </span></span>
<span class="line"><span>&lt;div class=&quot;mod_b&quot;&gt;</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>&lt;!-- E Comment Text B --&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>不推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!-- S Comment Text A --&gt;</span></span>
<span class="line"><span>&lt;div class=&quot;mod_a&quot;&gt;</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>&lt;!-- E Comment Text A --&gt;</span></span>
<span class="line"><span>&lt;!-- S Comment Text B --&gt; </span></span>
<span class="line"><span>&lt;div class=&quot;mod_b&quot;&gt;</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>&lt;!-- E Comment Text B --&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="_3-1-3嵌套模板注释" tabindex="-1"><a class="header-anchor" href="#_3-1-3嵌套模板注释"><span>3.1.3嵌套模板注释</span></a></h4><p>当模块注释内再出现模块注释的时候，为了突出主要模块，嵌套模块不再使用。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!-- S Comment Text --&gt;</span></span>
<span class="line"><span>&lt;!-- E Comment Text --&gt;</span></span>
<span class="line"><span>复制代码</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而改用</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!-- /Comment Text --&gt;</span></span>
<span class="line"><span>复制代码</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>注释写在模块结尾标签底部，单独一行。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!-- S Comment Text A --&gt;</span></span>
<span class="line"><span>&lt;div class=&quot;mod_a&quot;&gt;</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>    &lt;div class=&quot;mod_b&quot;&gt;</span></span>
<span class="line"><span>        ...</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;!-- /mod_b --&gt;</span></span>
<span class="line"><span>     </span></span>
<span class="line"><span>    &lt;div class=&quot;mod_c&quot;&gt;</span></span>
<span class="line"><span>     ...</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;!-- /mod_c --&gt;</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>&lt;!-- E Comment Text A --&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-css文件注释" tabindex="-1"><a class="header-anchor" href="#_3-2-css文件注释"><span>3.2 CSS文件注释</span></a></h3><h4 id="_3-2-1-单行注释" tabindex="-1"><a class="header-anchor" href="#_3-2-1-单行注释"><span>3.2.1 单行注释</span></a></h4><p>注释内容第一个字符和最后一个字符都是一个空格字符，单独占一行，行与行之间相隔一行。</p><ul><li>推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/* Comment Text */ </span></span>
<span class="line"><span>.jdc {} </span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Comment Text */ </span></span>
<span class="line"><span>.jdc {}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>不推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/*Comment Text*/</span></span>
<span class="line"><span>.jdc {</span></span>
<span class="line"><span>  display: block;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.jdc {</span></span>
<span class="line"><span>  display: block;/*Comment Text*/</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="_3-2-2-模块注释" tabindex="-1"><a class="header-anchor" href="#_3-2-2-模块注释"><span>3.2.2. 模块注释</span></a></h4><p>注释内容第一个字符和最后一个字符都是一个空格字符，/* 与 模块信息描述占一行，多个横线分隔符 - 与 */ 占一行，行与行之间相隔两行。</p><ul><li>推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/* Module A</span></span>
<span class="line"><span>---------------------------------------------------------------- */</span></span>
<span class="line"><span>.mod_a {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Module B</span></span>
<span class="line"><span>---------------------------------------------------------------- */</span></span>
<span class="line"><span>.mod_b {}</span></span>
<span class="line"><span>复制代码</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>不推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/* Module A ---------------------------------------------------- */</span></span>
<span class="line"><span>.mod_a {}</span></span>
<span class="line"><span>/* Module B ---------------------------------------------------- */</span></span>
<span class="line"><span>.mod_b {}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="_3-2-3-文件注释" tabindex="-1"><a class="header-anchor" href="#_3-2-3-文件注释"><span>3.2.3 文件注释</span></a></h4><p>在样式文件编码声明 @charset 语句下面注明页面名称、作者、创建日期等信息。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@charset &quot;UTF-8&quot;;</span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> * @desc File Info</span></span>
<span class="line"><span> * @author Author Name</span></span>
<span class="line"><span> * @date 2015-10-10</span></span>
<span class="line"><span> */</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-javascript文件注释" tabindex="-1"><a class="header-anchor" href="#_3-3-javascript文件注释"><span>3.3 Javascript文件注释</span></a></h3><h4 id="_3-3-1-单行注释" tabindex="-1"><a class="header-anchor" href="#_3-3-1-单行注释"><span>3.3.1 单行注释</span></a></h4><p>单行注释使用 //，注释应单独一行写在被注释对象的上方，不要追加在某条语句的后面。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// is current tab</span></span>
<span class="line"><span>const active = true</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>注释行的上方需要有一个空行（<strong>除非注释行上方是一个块的顶部</strong>），以增加可读性。</p><ul><li>推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>function getType () {  </span></span>
<span class="line"><span>  console.log(&#39;fetching type...&#39;)</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  // set the default type to &#39;no type&#39;</span></span>
<span class="line"><span>  const type = this.type || &#39;no type&#39;</span></span>
<span class="line"><span>  return type</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 注释行上面是一个块的顶部时不需要空行</span></span>
<span class="line"><span>function getType () {  </span></span>
<span class="line"><span>  // set the default type to &#39;no type&#39;</span></span>
<span class="line"><span>  const type = this.type || &#39;no type&#39;   </span></span>
<span class="line"><span>  return type</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>不推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>function getType () {  </span></span>
<span class="line"><span>  console.log(&#39;fetching type...&#39;)</span></span>
<span class="line"><span>  // set the default type to &#39;no type&#39;</span></span>
<span class="line"><span>  const type = this.type || &#39;no type&#39;</span></span>
<span class="line"><span>  return type</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="_3-3-2-多行注释" tabindex="-1"><a class="header-anchor" href="#_3-3-2-多行注释"><span>3.3.2 多行注释</span></a></h4><p>多行注释使用/*** ....*/,而不是多行的//</p><ul><li>推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/**</span></span>
<span class="line"><span>* make() returns a new element</span></span>
<span class="line"><span>* based on the passed-in tag name</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span>function make (tag) {</span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return element</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>不推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// make() returns a new element</span></span>
<span class="line"><span>// based on the passed in tag name</span></span>
<span class="line"><span>function make (tag) {</span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return element</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="_3-3-3-注释空格" tabindex="-1"><a class="header-anchor" href="#_3-3-3-注释空格"><span>3.3.3 注释空格</span></a></h4><p>注释内容和注释符之间需要有一个空格，以增加可读性。eslint:spaced-comment</p><ul><li>推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// is current tab</span></span>
<span class="line"><span>const active = true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span>* make() returns a new element</span></span>
<span class="line"><span>* based on the passed-in tag name</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span>function make(tag) {  </span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return element</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>不推荐<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>//is current tab</span></span>
<span class="line"><span>const active = true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span>*make() returns a new element</span></span>
<span class="line"><span>*based on the passed-in tag name</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span>function make(tag) {  </span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return element</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="_3-3-4-特殊标记" tabindex="-1"><a class="header-anchor" href="#_3-3-4-特殊标记"><span>3.3.4 特殊标记</span></a></h4><p>有时我们发现某个可能的bug，但因为一些原因还没发修复；或者某个地方还有一些待完善的功能，这时我们需要实用相应的特殊标记注释来告诉未来的自己或合作者。常用的特别标记有两种</p><ul><li>// FIXME:说明问题是什么</li><li>// TODO：说明还要做什么或者问题的解决方案</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>class Calculator extends Abacus {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    super()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // FIXME: shouldn&#39;t use a global here</span></span>
<span class="line"><span>    totla = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // TODO: totla should be configurable by an options param</span></span>
<span class="line"><span>    this.total = 0</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-3-5-文档类注释" tabindex="-1"><a class="header-anchor" href="#_3-3-5-文档类注释"><span>3.3.5 文档类注释</span></a></h4><p>文档类注释，如函数、类、文件、事件等；都实用jsdoc规范</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/**</span></span>
<span class="line"><span> * Book类，代表一个书本.</span></span>
<span class="line"><span> * @constructor</span></span>
<span class="line"><span> * @param {string} title - 书本的标题.</span></span>
<span class="line"><span> * @param {string} author - 书本的作者.</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>function Book (title, author) {</span></span>
<span class="line"><span>  this.title = title</span></span>
<span class="line"><span>  this.author = author</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Book.prototype = {</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * 获取书本的标题</span></span>
<span class="line"><span>   * @returns {string|*}</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  getTitle: function () {</span></span>
<span class="line"><span>    return this.title</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * 设置书本的页数</span></span>
<span class="line"><span>   * @param pageNum {number} 页数</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  setPageNum: function (pageNum) {</span></span>
<span class="line"><span>    this.pageNum=pageNum</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-3-6-注释工具" tabindex="-1"><a class="header-anchor" href="#_3-3-6-注释工具"><span>3.3.6 注释工具</span></a></h4><p>ESlint是当下最流行的JS代码检查工具，ESlint中有一些注释相关的规则，用户可以开启</p><ul><li><p>valid-jsdoc</p></li><li><p>require-jsdoc</p></li><li><p>no-warning-comments</p></li><li><p>capitalized-comments</p></li><li><p>line-comment-position</p></li><li><p>lines-around-comment</p></li><li><p>multiline-comment-style</p></li><li><p>no-inline-comments</p></li><li><p>spaced-comment</p></li></ul><h2 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h2><ul><li>缩进换行请使用两个空格</li><li>大型团队多人协作项目推荐Javascipt代码末尾加分号</li><li>小型个人创新练手项目可尝试使用Javasctipt代码末尾不加分号风格，更加清爽简练</li></ul><h2 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h2><p><a href="https://mp.weixin.qq.com/s/UDXrBiEfm8igKZlSyoNJIA" target="_blank" rel="noopener noreferrer">史上最全 Vue 前端代码风格指南</a></p><p><a href="https://www.cnblogs.com/hanguidong/p/9381830.html" target="_blank" rel="noopener noreferrer">Vue 定义组件模板的七种方式(一般用单文件组件更好)</a></p><p><a href="https://www.jianshu.com/p/8c63c93a346b" target="_blank" rel="noopener noreferrer">vue中涉及的字符串模板与dom模板</a></p>`,251)])])}const c=n(l,[["render",p]]),v=JSON.parse('{"path":"/articles/front-end/engineering/best-vue.html","title":"Vue 前端代码风格指南","lang":"zh-CN","frontmatter":{"autoGroup-11":"前端工程化最佳实践","title":"Vue 前端代码风格指南","category":["前端技术"],"tag":["工程化","前端"],"description":"命名规范 市面上常用的命名规范 camelCase(小驼峰命名法--首字母小写) PascalCase(大驼峰命名法--首字母大写) kebal-case(短横线连接式) Snake(下划线连接式) 1.1 项目文件命名 1.1.1 项目名 全部采用小写方式，以短横线分隔。例：my-project-name 1.1.2 目录名 参考项目命名规则,有复数...","head":[["meta",{"property":"og:url","content":"https://xuzhe0211.github.io/articles/front-end/engineering/best-vue.html"}],["meta",{"property":"og:site_name","content":"xz"}],["meta",{"property":"og:title","content":"Vue 前端代码风格指南"}],["meta",{"property":"og:description","content":"命名规范 市面上常用的命名规范 camelCase(小驼峰命名法--首字母小写) PascalCase(大驼峰命名法--首字母大写) kebal-case(短横线连接式) Snake(下划线连接式) 1.1 项目文件命名 1.1.1 项目名 全部采用小写方式，以短横线分隔。例：my-project-name 1.1.2 目录名 参考项目命名规则,有复数..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-10-28T02:54:02.000Z"}],["meta",{"property":"article:tag","content":"工程化"}],["meta",{"property":"article:tag","content":"前端"}],["meta",{"property":"article:modified_time","content":"2026-10-28T02:54:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Vue 前端代码风格指南\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-10-28T02:54:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"xz\\",\\"url\\":\\"https://xuzhe0211.github.io\\"}]}"]]},"git":{"createdTime":1643110125000,"updatedTime":1793156042000,"contributors":[{"name":"xuzhe1","username":"xuzhe1","email":"xuzhe1@wps.cn","commits":1,"url":"https://github.com/xuzhe1"},{"name":"xuzhe","username":"xuzhe","email":"xuzhe-0211@163.com","commits":1,"url":"https://github.com/xuzhe"}]},"readingTime":{"minutes":21.41,"words":6424},"filePathRelative":"articles/front-end/engineering/best-vue.md","localizedDate":"2022年1月25日","excerpt":"<h2>命名规范</h2>\\n<p>市面上常用的命名规范</p>\\n<ul>\\n<li>camelCase(小驼峰命名法--首字母小写)</li>\\n<li>PascalCase(大驼峰命名法--首字母大写)</li>\\n<li>kebal-case(短横线连接式)</li>\\n<li>Snake(下划线连接式)</li>\\n</ul>\\n<h3>1.1 项目文件命名</h3>\\n<h4>1.1.1 项目名</h4>\\n<p>全部采用小写方式，以<strong>短横线</strong>分隔。例：my-project-name</p>\\n<h4>1.1.2 目录名</h4>\\n<p><strong>参考项目命名规则,有复数结构时，要采用复数命名法。</strong> 例：docs、assets、components、directives、mixins、utils、views。</p>","autoDesc":true}');export{c as comp,v as data};
