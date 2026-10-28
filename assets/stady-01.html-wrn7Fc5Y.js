import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as e,o as i}from"./app-q-jb9_Gt.js";const l="/assets/WechatIMG166-CuoMdR5A.png",p="/assets/WechatIMG167-C3CqVHQG.png",t="/assets/WechatIMG168-BrU99yvZ.png",d={};function r(c,n){return i(),a("div",null,[...n[0]||(n[0]=[e('<p>算法逻辑思维？</p><p>大厂工程师的自我修改</p><ul><li>新手篇：在基础数据解构与算法中精进 <ul><li>线性表基础</li><li>树结构基础</li><li>排序算法</li><li>查找与搜索</li></ul></li><li>高手篇：数据结构与算法进阶</li><li>极客：走进伟大的算法思想</li></ul><p>线性表基础--链表 树结构--简单的树结构题（遍历，相等 ，二叉树反转操作） 排序--快排、归并排序(相关优化)调用排序算法 查找与搜索--二分查找、hash(哈希)表（一个算法，一个结构） 搜索--深搜、广搜</p><table><thead><tr><th>时间复杂度</th><th>链表</th><th>数组</th></tr></thead><tbody><tr><td>插入</td><td>O(n)</td><td>O(1)</td></tr><tr><td>删除</td><td>O(1)</td><td>O(n )</td></tr><tr><td>查找</td><td>O(1)</td><td>O(n)</td></tr></tbody></table><h2 id="链表" tabindex="-1"><a class="header-anchor" href="#链表"><span>链表</span></a></h2><h3 id="删除链表中的倒数第n个节点" tabindex="-1"><a class="header-anchor" href="#删除链表中的倒数第n个节点"><span>删除链表中的倒数第N个节点</span></a></h3><p>虚拟头节点-- 删除头节点？</p><p><img src="'+l+`" alt="指针移动"></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>class Solution {</span></span>
<span class="line"><span>public: </span></span>
<span class="line"><span>    ListNode* removeNthFromEnd(ListNode* head, init i) {</span></span>
<span class="line"><span>        listNode ret, *p, *q;</span></span>
<span class="line"><span>        ret.next = head;</span></span>
<span class="line"><span>        p = &amp;ret; q = head;</span></span>
<span class="line"><span>        while(n--) q = q -&gt; next;</span></span>
<span class="line"><span>        whidle(q)  p = p -&gt; next, q = q-&gt; next;</span></span>
<span class="line"><span>        p -&gt; next = p -&gt; next -&gt; next;</span></span>
<span class="line"><span>        return ret. next;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="判断链表是否为回文链表" tabindex="-1"><a class="header-anchor" href="#判断链表是否为回文链表"><span>判断链表是否为回文链表</span></a></h3><p>1-&gt; 2 false</p><p>1-&gt; 2-&gt;2 -&gt; 1 true</p><p><img src="`+p+`" alt="反转实现"></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>class Solution {</span></span>
<span class="line"><span>public: </span></span>
<span class="line"><span>    init getLen(ListNode *head) {</span></span>
<span class="line"><span>        ListNode *p = head;</span></span>
<span class="line"><span>        int l = 0;</span></span>
<span class="line"><span>        while (p) p = p -&gt; next, l += 1;</span></span>
<span class="line"><span>        return l</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ListNode * reverse(listNode, *head) {</span></span>
<span class="line"><span>        listNode ret, *p, *q;</span></span>
<span class="line"><span>        ret.next = nullptr;</span></span>
<span class="line"><span>        p = head;</span></span>
<span class="line"><span>        while(p) {</span></span>
<span class="line"><span>            q = p -&gt; next;</span></span>
<span class="line"><span>            p-&gt; next = ret.next;</span></span>
<span class="line"><span>            ret.next = p;</span></span>
<span class="line"><span>            p = q;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return ret.next;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    bool inPalindrome(ListNode* head) {</span></span>
<span class="line"><span>        int = n = getLen(head);</span></span>
<span class="line"><span>        int m = n / 2;</span></span>
<span class="line"><span>        listNode ret, *p, * q;</span></span>
<span class="line"><span>        ret.next = head;</span></span>
<span class="line"><span>        p = &amp;ret, q = head;</span></span>
<span class="line"><span>        while(m--) q = q -&gt; next;</span></span>
<span class="line"><span>        while (q) p = p -&gt; next, q = q.next;</span></span>
<span class="line"><span>        p -&gt; next = reverse(p -&gt; next);</span></span>
<span class="line"><span>        p = p -next;</span></span>
<span class="line"><span>        q = head;</span></span>
<span class="line"><span>        while(p) {</span></span>
<span class="line"><span>            if(p -&gt; val - q -&gt;val)  return false;</span></span>
<span class="line"><span>            p = p -&gt; next;</span></span>
<span class="line"><span>            q = q -&gt; next;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return false;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二叉树" tabindex="-1"><a class="header-anchor" href="#二叉树"><span>二叉树</span></a></h2><h3 id="二叉树的层序遍历" tabindex="-1"><a class="header-anchor" href="#二叉树的层序遍历"><span>二叉树的层序遍历</span></a></h3><ol><li>广度遍历</li><li>深搜实现</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>class Solution {</span></span>
<span class="line"><span>public: </span></span>
<span class="line"><span>    void dfs(ThreeNode *root, int k, vector&lt;vector&lt;int&gt;&gt; &amp;ret) {</span></span>
<span class="line"><span>        if (root === nullptr) return;</span></span>
<span class="line"><span>        if (ret.size() === k) ret.push_back(vector&lt;int&gt;()); // 新的数组  动态扩容数组</span></span>
<span class="line"><span>        ret[k].push_back(root -&gt; val);</span></span>
<span class="line"><span>        dfs(root-&gt; left, k + 1, ret);</span></span>
<span class="line"><span>        dfs(root -&gt; right, k + 1, ret);</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    vector&lt;vector&lt;int&gt;&gt; levelOrder(ThreeNode* root) {</span></span>
<span class="line"><span>        vector&lt;vector&lt;int&gt;&gt; ret;</span></span>
<span class="line"><span>        dfs(root, 0, ret);</span></span>
<span class="line"><span>        return ret;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="平衡二叉树" tabindex="-1"><a class="header-anchor" href="#平衡二叉树"><span>平衡二叉树</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>class Solution {</span></span>
<span class="line"><span>public: </span></span>
<span class="line"><span>    int getHeight(TreeNode *root) {</span></span>
<span class="line"><span>        if (root == nullprt) return 0;</span></span>
<span class="line"><span>        int l = getHeight(root-&gt;left);</span></span>
<span class="line"><span>        int r = getHeight(root-&gt;right);</span></span>
<span class="line"><span>        if (l &lt; 0 || r &lt; 0) return -2;</span></span>
<span class="line"><span>        if (abs(l - r) &gt; 1) return -2;</span></span>
<span class="line"><span>        return max(l, r) + 1;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    bool isBalanced(TreeNode* root) {</span></span>
<span class="line"><span>        int h = getHeight(root);</span></span>
<span class="line"><span>        return h &gt;= 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+t+'" alt="课后练习"></p>',22)])])}const u=s(d,[["render",r]]),h=JSON.parse('{"path":"/articles/front-end/Code/stady-01.html","title":"算法和设计模式","lang":"zh-CN","frontmatter":{"autoGroup-2":"算法学习","title":"算法和设计模式","category":["前端技术"],"tag":["算法","前端"],"description":"算法逻辑思维？ 大厂工程师的自我修改 新手篇：在基础数据解构与算法中精进 线性表基础 树结构基础 排序算法 查找与搜索 高手篇：数据结构与算法进阶 极客：走进伟大的算法思想 线性表基础--链表 树结构--简单的树结构题（遍历，相等 ，二叉树反转操作） 排序--快排、归并排序(相关优化)调用排序算法 查找与搜索--二分查找、hash(哈希)表（一个算法，...","head":[["meta",{"property":"og:url","content":"https://xuzhe0211.github.io/articles/front-end/Code/stady-01.html"}],["meta",{"property":"og:site_name","content":"xz"}],["meta",{"property":"og:title","content":"算法和设计模式"}],["meta",{"property":"og:description","content":"算法逻辑思维？ 大厂工程师的自我修改 新手篇：在基础数据解构与算法中精进 线性表基础 树结构基础 排序算法 查找与搜索 高手篇：数据结构与算法进阶 极客：走进伟大的算法思想 线性表基础--链表 树结构--简单的树结构题（遍历，相等 ，二叉树反转操作） 排序--快排、归并排序(相关优化)调用排序算法 查找与搜索--二分查找、hash(哈希)表（一个算法，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-10-28T02:54:02.000Z"}],["meta",{"property":"article:tag","content":"算法"}],["meta",{"property":"article:tag","content":"前端"}],["meta",{"property":"article:modified_time","content":"2026-10-28T02:54:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"算法和设计模式\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-10-28T02:54:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"xz\\",\\"url\\":\\"https://xuzhe0211.github.io\\"}]}"]]},"git":{"createdTime":1643110125000,"updatedTime":1793156042000,"contributors":[{"name":"xuzhe1","username":"xuzhe1","email":"xuzhe1@wps.cn","commits":1,"url":"https://github.com/xuzhe1"},{"name":"xuzhe","username":"xuzhe","email":"xuzhe-0211@163.com","commits":1,"url":"https://github.com/xuzhe"}]},"readingTime":{"minutes":1.84,"words":553},"filePathRelative":"articles/front-end/Code/stady-01.md","localizedDate":"2022年1月25日","excerpt":"<p>算法逻辑思维？</p>\\n<p>大厂工程师的自我修改</p>\\n<ul>\\n<li>新手篇：在基础数据解构与算法中精进\\n<ul>\\n<li>线性表基础</li>\\n<li>树结构基础</li>\\n<li>排序算法</li>\\n<li>查找与搜索</li>\\n</ul>\\n</li>\\n<li>高手篇：数据结构与算法进阶</li>\\n<li>极客：走进伟大的算法思想</li>\\n</ul>\\n<p>线性表基础--链表\\n树结构--简单的树结构题（遍历，相等 ，二叉树反转操作）\\n排序--快排、归并排序(相关优化)调用排序算法\\n查找与搜索--二分查找、hash(哈希)表（一个算法，一个结构） 搜索--深搜、广搜</p>\\n","autoDesc":true}');export{u as comp,h as data};
