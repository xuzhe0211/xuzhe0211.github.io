import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as e,o as i}from"./app-q-jb9_Gt.js";const l="/assets/WechatIMG158-CfsfLatl.png",p="/assets/aHR0cHM6Ly9pbWcyMDIwLmNuYmxvZ3MuY29tL2Jsb2cvMTAwOTA4MC8yMDIwMDcvMTAwOTA4MC0yMDIwMDcyNDIzMjk0MTgwNi0xMjA3NTAwMTcucG5n-BmKqLZ2Y.png",d={};function c(r,n){return i(),a("div",null,[...n[0]||(n[0]=[e(`<h2 id="rollup体验tree-sharking树摇" tabindex="-1"><a class="header-anchor" href="#rollup体验tree-sharking树摇"><span>Rollup体验Tree-sharking树摇</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// index.js</span></span>
<span class="line"><span>import {add} from &#39;./add.js&#39;;</span></span>
<span class="line"><span>console.log(add(2,4));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// add.js</span></span>
<span class="line"><span>export const add(a, b) =&gt; a + b;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 执行</span></span>
<span class="line"><span>rollup src/case01/index.js</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="编译经典过程" tabindex="-1"><a class="header-anchor" href="#编译经典过程"><span>编译经典过程</span></a></h2><p><img src="`+l+'" alt="经典编译过程"></p><p><img src="'+p+`" alt="经典编译过程"></p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>AST(Abstract Syntax Tree) 抽象语法树 在计算机科学中，或简语法树(Syntax treee),是源代码语法解构的一种抽象表示。它以树状的形式表现变成语言的语法结构，树上的每个节点都表示源代码中的一种解构<a href="https://astexplorer.net/" target="_blank" rel="noopener noreferrer">https://astexplorer.net/</a></p></div><h2 id="准备工具" tabindex="-1"><a class="header-anchor" href="#准备工具"><span>准备工具</span></a></h2><h3 id="magic-string" tabindex="-1"><a class="header-anchor" href="#magic-string"><span>Magic-string</span></a></h3><p><a href="https://zhuanlan.zhihu.com/p/138322881" target="_blank" rel="noopener noreferrer">为什么eslint没有no-magic-string</a></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>var MagicString = require(&#39;magic-string&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const s = new MagicString(&#39;export var answer = 42;&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(&#39;s&#39;, s.snip(7).toString);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var bundle = nnew MagicString.bundle();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>bundle.addSource({</span></span>
<span class="line"><span>    filename: &#39;foo.js&#39;,</span></span>
<span class="line"><span>    content: new MagicString(&#39;var answer = 42;&#39;)</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>bundle.addSource({</span></span>
<span class="line"><span>    filename: &#39;bar.js&#39;,</span></span>
<span class="line"><span>    content: new MagicString(&#39;console.log(answer)&#39;)</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// options are as per \`s.generateMap()\` above</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var map = bundle.generateMap({</span></span>
<span class="line"><span>    file: &#39;bundle.js&#39;,</span></span>
<span class="line"><span>    includeContent: true,</span></span>
<span class="line"><span>    hires: true</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(map);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>code =》 报错</p><p>Sourcemap =&gt; sentry =&gt; 异常监控平台</p><p>webpack插件</p><h3 id="编译器acorn" tabindex="-1"><a class="header-anchor" href="#编译器acorn"><span>编译器acorn</span></a></h3><p><a href="https://astexplorer.net/" target="_blank" rel="noopener noreferrer">https://astexplorer.net/</a></p><p><a href="https://www.npmjs.com/package/acorn" target="_blank" rel="noopener noreferrer">https://www.npmjs.com/package/acorn</a></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>const acorn = require(&#39;acorn&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>consnt walk = require(&#39;./walk&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const code = \`</span></span>
<span class="line"><span>    import {a} from &quot;./foo&quot;;</span></span>
<span class="line"><span>    console.log(&quot;Hello&quot; + a);</span></span>
<span class="line"><span>    console.log(&quot;World&quot;);</span></span>
<span class="line"><span>    export const b = 1</span></span>
<span class="line"><span>\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let ast = acorn.parse(code, {</span></span>
<span class="line"><span>    locations: true, // 索引位置</span></span>
<span class="line"><span>    ranges: true, </span></span>
<span class="line"><span>    sourceType: &quot;module&quot;,</span></span>
<span class="line"><span>    ecmaVerson: 7</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="语法树访问者" tabindex="-1"><a class="header-anchor" href="#语法树访问者"><span>语法树访问者</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/**</span></span>
<span class="line"><span>* AST语法树遍历</span></span>
<span class="line"><span>*</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span>function walk(ast, {enter, leave}) {</span></span>
<span class="line"><span>    visit(ast, null, enter, leave);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span>* 访问者</span></span>
<span class="line"><span>* @param {*} node</span></span>
<span class="line"><span>* @param {*} parent * @param {*} enter * @param {*} leave * @returns</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span>function visit(node, parent, enter, leave) {</span></span>
<span class="line"><span>    if (!node) return;</span></span>
<span class="line"><span>    // 先执行enter</span></span>
<span class="line"><span>    if(enter) {</span></span>
<span class="line"><span>        enter.call(null, node, parent);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    let childkeys = Object.keys(node).filter(</span></span>
<span class="line"><span>        (key) =&gt; typeof node[key] === &#39;object&#39;</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    childkeys.forEach((childKey) =&gt; {</span></span>
<span class="line"><span>        let value = node[childKey];</span></span>
<span class="line"><span>        if (Array.isArray((val) =&gt; visit(val, node, enter, leave))) {</span></span>
<span class="line"><span>            value.forEach(val =&gt; visit(val, node, enter, leave);)</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            visit(value, node, enter, leave);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (leave) {</span></span>
<span class="line"><span>        leave(node, parent);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>module.exports = walk;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Ast遍历</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>let indent = 0;</span></span>
<span class="line"><span>const padding = () =&gt; &#39; &#39;.repeat(indent);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 遍历语法树中的每一条语句，由walk遍历子元素</span></span>
<span class="line"><span>// 深度优先原则</span></span>
<span class="line"><span>ast.body.forEach(statement =&gt; {</span></span>
<span class="line"><span>    walk(statement, {</span></span>
<span class="line"><span>        enter(node) {</span></span>
<span class="line"><span>            if (node.type) {</span></span>
<span class="line"><span>                console.log(paddinng() + node.type + &#39; enter&#39;);</span></span>
<span class="line"><span>                indent += 2;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }, </span></span>
<span class="line"><span>        leave(node) {</span></span>
<span class="line"><span>            if (node.tpye) {</span></span>
<span class="line"><span>                indent -= 2;</span></span>
<span class="line"><span>                console.log(padding() + node.type + &#39; leave&#39;);</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="作用域描述对象scope" tabindex="-1"><a class="header-anchor" href="#作用域描述对象scope"><span>作用域描述对象Scope</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/**</span></span>
<span class="line"><span>* 模拟作用域链 </span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span>class Scope {</span></span>
<span class="line"><span>    constructor(options = {}) {</span></span>
<span class="line"><span>        this.parent = options.parent // 父作用域</span></span>
<span class="line"><span>        this.depth = this.parent ? this.parent.depth + 1 : 0 // 作用域层级</span></span>
<span class="line"><span>        this.names = options.params || [] // 作用域内的变量</span></span>
<span class="line"><span>        this.isBlockScope = !!options.block // 是否块作用域</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>    * 将变量添加到作用域</span></span>
<span class="line"><span>    * @param {*} name</span></span>
<span class="line"><span>    * @param {*} isBlockDeclaration */</span></span>
<span class="line"><span>    add(name, isBlockDeclaration) {</span></span>
<span class="line"><span>        if (!isBlockDeclaration &amp;&amp; this.isBlockScope) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // it&#39;s a \`var\` or function declaration, and this // is a block scope, so we need to go up this.parent.add(name, isBlockDeclaration)</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            this.names.push(name)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>    * 判断变量是否被声明 * @param {*} name * @returns</span></span>
<span class="line"><span>    */</span></span>
<span class="line"><span>    cantains(name) {</span></span>
<span class="line"><span>        return !!this.findDefiningScope(name)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>    * 返回变量坐在的作用域 * @param {*} name * @returns</span></span>
<span class="line"><span>    */</span></span>
<span class="line"><span>    findDefiningScope(name) {</span></span>
<span class="line"><span>        if (this.names.includes(name)) {</span></span>
<span class="line"><span>            return this</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        if (this.parent) {</span></span>
<span class="line"><span>            return this.parent.findDefiningScope(name)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return null</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>module.exports = Scope</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="原型系统" tabindex="-1"><a class="header-anchor" href="#原型系统"><span>原型系统</span></a></h2><p>Parse阶段</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span> </span></span>
<span class="line"><span>const acorn = require(&quot;acorn&quot;);</span></span>
<span class="line"><span>const walk = require(&quot;../../lib/ast/walk&quot;);</span></span>
<span class="line"><span>const Scope = require(&quot;../../lib/ast/scope&quot;);</span></span>
<span class="line"><span>const MagicString = require(&quot;magic-string&quot;);</span></span>
<span class="line"><span>const code = {</span></span>
<span class="line"><span>    index: \`import { add } from &quot;./add.js&quot;; console.log(add(2, 4));\`,</span></span>
<span class="line"><span>    add: \`export const add = (a,b) =&gt; a + b \`,</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Import 分析</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span> </span></span>
<span class="line"><span>function getImports(ast) {</span></span>
<span class="line"><span>    console.log(&quot;========分析import=======&quot;);</span></span>
<span class="line"><span>    const imports = {};</span></span>
<span class="line"><span>    ast.body.forEach((node) =&gt; {</span></span>
<span class="line"><span>        if (node.type === &quot;ImportDeclaration&quot;) {</span></span>
<span class="line"><span>            console.log(&quot;import:&quot;, node._source.toString()); </span></span>
<span class="line"><span>            // ex: import { a : b } from &#39;foo&#39;</span></span>
<span class="line"><span>            // let source = node.source.value;</span></span>
<span class="line"><span>            const source = &quot;&quot;;</span></span>
<span class="line"><span>            let specifiers = node.specifiers;</span></span>
<span class="line"><span>            specifiers.forEach((specifier) =&gt; {</span></span>
<span class="line"><span>                const name = specifier.imported.name; // a</span></span>
<span class="line"><span>                const localName = specifier.local.name; // b</span></span>
<span class="line"><span>                console.log(&quot;specifiers&quot;, name, localName);</span></span>
<span class="line"><span>                imports[localName] = { name, localName, source };</span></span>
<span class="line"><span>            });</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  return imports;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Export 分析</p><p>语法分析</p><ul><li>变量定义</li><li>变量依赖</li><li>语句</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span> </span></span>
<span class="line"><span>// 分析函数</span></span>
<span class="line"><span>function analyse(ast, magicString) {</span></span>
<span class="line"><span>    console.log(&quot;======analyse=====&quot;); // 创建全局作用域</span></span>
<span class="line"><span>    let scope = new Scope();</span></span>
<span class="line"><span>    // 遍历当前语法树</span></span>
<span class="line"><span>     </span></span>
<span class="line"><span>    ast.body.forEach((statement) =&gt; {</span></span>
<span class="line"><span>        /**</span></span>
<span class="line"><span>        * 给作用域内添加变量</span></span>
<span class="line"><span>        * @param {*} declaration */</span></span>
<span class="line"><span>        function addToScope(declaration) {</span></span>
<span class="line"><span>            var name = declaration.id.name; // 获取声明的变量</span></span>
<span class="line"><span>            scope.add(name);</span></span>
<span class="line"><span>            if (!scope.parent) {</span></span>
<span class="line"><span>                // 如果此变量作用域不在父级作用域 即当前作用域 // 如果当前是全局作用域的话</span></span>
<span class="line"><span>                // 在全局作用域下声明全局变量 statement._defines[name] = true;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        Object.defineProperties(statement, {</span></span>
<span class="line"><span>            // 变量定义</span></span>
<span class="line"><span>            _defines: { value: {} },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 变量依赖</span></span>
<span class="line"><span>            _dependsOn: { value: {} },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 此语句是否被打包Bundle 防止多次打包Bundle </span></span>
<span class="line"><span>            _included: { value: false, writable: true },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            // 变量语句</span></span>
<span class="line"><span>            _source: { value: magicString.snip(statement.start, statement.end) },</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>        // 作用域链遍历</span></span>
<span class="line"><span>        // 分析变量定义的</span></span>
<span class="line"><span>        // 构造作用域链</span></span>
<span class="line"><span>        walk(statement, {</span></span>
<span class="line"><span>            enter(node) {</span></span>
<span class="line"><span>                let newScope;</span></span>
<span class="line"><span>                // 防止空节点和空数组</span></span>
<span class="line"><span>                if (node === null || node.length === 0) return;</span></span>
<span class="line"><span>                switch (node.type) {</span></span>
<span class="line"><span>                    // 变量声明</span></span>
<span class="line"><span>                    case &quot;VariableDeclaration&quot;:</span></span>
<span class="line"><span>                        declarations.push(node);</span></span>
<span class="line"><span>                        node.declarations.forEach(addToScope);</span></span>
<span class="line"><span>                        break;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>                 if (newScope) {</span></span>
<span class="line"><span>                    console.log(&quot;newScope&quot;, newScope); </span></span>
<span class="line"><span>                    // 当前节点声明的新作用域</span></span>
<span class="line"><span>                    // 如果此节点生成一个新作用域</span></span>
<span class="line"><span>                     </span></span>
<span class="line"><span>                    Object.defineProperties(node, { _scope: { value: newScope } });</span></span>
<span class="line"><span>                    scope = newScope;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            leave(node) {</span></span>
<span class="line"><span>                if (node._scope) {</span></span>
<span class="line"><span>                    // 如果此节点离开退回父作用域</span></span>
<span class="line"><span>                    scope = scope.parent;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>        })</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ast._scope = scope;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 找出外部依赖关系 dependsOn </span></span>
<span class="line"><span>    ast.body.forEach((statement) =&gt; {</span></span>
<span class="line"><span>        walk(statement, {</span></span>
<span class="line"><span>            enter(node) {</span></span>
<span class="line"><span>                if (node._scope) {</span></span>
<span class="line"><span>                    scope = node._scope;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>                // 遇到导出节点</span></span>
<span class="line"><span>                if (node.type === &quot;Identifier&quot;) {</span></span>
<span class="line"><span>                    // 遇到 exports const a =&gt; node.name = &#39;a&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                    // 向上递归</span></span>
<span class="line"><span>                    const definingScope = scope.findDefiningScope(node.name); </span></span>
<span class="line"><span>                    if (!definingScope) {</span></span>
<span class="line"><span>                        console.log(&quot;Identifier:&quot;, node.name);</span></span>
<span class="line"><span>                        statement._dependsOn[node.name] = true; // 表示属于外部依赖变量</span></span>
<span class="line"><span>                    }</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            leave(node) {</span></span>
<span class="line"><span>                if (node._scope) scope = scope.parent;</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>        });</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>})</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>语句扩展添加声明</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>let declarations = [];</span></span>
<span class="line"><span>analyse(add, new MagicString(code.add));</span></span>
<span class="line"><span>analyse(index, new MagicString(code.index)); // 追加</span></span>
<span class="line"><span>const statments = expandAllStatements(index);</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span>* 展开所有语句节点 * @returns</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span>function expandAllStatements(ast) {</span></span>
<span class="line"><span>    console.log(&quot;=========expandAllStatements=============&quot;); const allStatements = [];</span></span>
<span class="line"><span>    ast.body.forEach((statement) =&gt; {</span></span>
<span class="line"><span>        // 忽略所有Import语句</span></span>
<span class="line"><span>        if (statement.type === &quot;ImportDeclaration&quot;) {</span></span>
<span class="line"><span>            return;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        allStatements.push(...declarations, statement);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    return allStatements;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>generate阶段</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span> </span></span>
<span class="line"><span>function generate(statments) {</span></span>
<span class="line"><span>    console.log(&#39;======generate=====&#39;)</span></span>
<span class="line"><span>    // statments.forEach(v =&gt; console.log(magicString.snip(v.start, v.end))) let v = statments[0]</span></span>
<span class="line"><span>    console.log(new MagicString(code.add).snip(v.start, v.end).toString())</span></span>
<span class="line"><span>    v = statments[1]</span></span>
<span class="line"><span>    console.log(new MagicString(code.index).snip(v.start, v.end).toString())</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,36)])])}const o=s(d,[["render",c]]),u=JSON.parse(`{"path":"/articles/front-end/engineering/study-tool3-1.html","title":"构建工具第三天 - Rollup与Tree-sharking","lang":"zh-CN","frontmatter":{"autoGroup-1":"公开课","title":"构建工具第三天 - Rollup与Tree-sharking","category":["前端技术"],"tag":["工程化","前端"],"description":"Rollup体验Tree-sharking树摇 编译经典过程 经典编译过程 经典编译过程 提示 AST(Abstract Syntax Tree) 抽象语法树 在计算机科学中，或简语法树(Syntax treee),是源代码语法解构的一种抽象表示。它以树状的形式表现变成语言的语法结构，树上的每个节点都表示源代码中的一种解构https://astexpl...","head":[["meta",{"property":"og:url","content":"https://xuzhe0211.github.io/articles/front-end/engineering/study-tool3-1.html"}],["meta",{"property":"og:site_name","content":"xz"}],["meta",{"property":"og:title","content":"构建工具第三天 - Rollup与Tree-sharking"}],["meta",{"property":"og:description","content":"Rollup体验Tree-sharking树摇 编译经典过程 经典编译过程 经典编译过程 提示 AST(Abstract Syntax Tree) 抽象语法树 在计算机科学中，或简语法树(Syntax treee),是源代码语法解构的一种抽象表示。它以树状的形式表现变成语言的语法结构，树上的每个节点都表示源代码中的一种解构https://astexpl..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-10-28T02:54:02.000Z"}],["meta",{"property":"article:tag","content":"工程化"}],["meta",{"property":"article:tag","content":"前端"}],["meta",{"property":"article:modified_time","content":"2026-10-28T02:54:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"构建工具第三天 - Rollup与Tree-sharking\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-10-28T02:54:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"xz\\",\\"url\\":\\"https://xuzhe0211.github.io\\"}]}"]]},"git":{"createdTime":1643110125000,"updatedTime":1793156042000,"contributors":[{"name":"xuzhe1","username":"xuzhe1","email":"xuzhe1@wps.cn","commits":2,"url":"https://github.com/xuzhe1"},{"name":"xuzhe","username":"xuzhe","email":"xuzhe-0211@163.com","commits":1,"url":"https://github.com/xuzhe"}]},"readingTime":{"minutes":3.97,"words":1192},"filePathRelative":"articles/front-end/engineering/study-tool3-1.md","localizedDate":"2022年1月25日","excerpt":"<h2>Rollup体验Tree-sharking树摇</h2>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>// index.js</span></span>\\n<span class=\\"line\\"><span>import {add} from './add.js';</span></span>\\n<span class=\\"line\\"><span>console.log(add(2,4));</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>// add.js</span></span>\\n<span class=\\"line\\"><span>export const add(a, b) =&gt; a + b;</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>// 执行</span></span>\\n<span class=\\"line\\"><span>rollup src/case01/index.js</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{o as comp,u as data};
