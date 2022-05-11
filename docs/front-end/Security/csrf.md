---
title: CSRF防御之token认证
---

## CSRF是什么
CSRF(Cross-site request forgery),跨站请求伪造。攻击者盗用你的身份，以你的名字发送恶意请求。CSRF能够做的事情包括：以你的名字发送邮件，发消息、盗取你的账号，甚至于购买商品，虚拟货币转账…造成的问题包括：个人隐私泄露以及财产安全。

## CSRF攻击原理
![CSRF攻击原理](./images/1645780827656.jpg)

1. <span style="color: blue">客户端通过账户密码登录访问网站A</span>
2. <span style="color: blue">网站A验证客户端的账号密码，成功则生成一个SessionId,并返回给客户端储在浏览器中</span>
3. <span style="color: blue">该客户端tab一个新的页面访问了网站B</span>
4. <span style="color: blue">网站B自动触发要求该客户端访问网站A。(即在网站B中有连接指向网站A，例如:form表单action)</span>
5. <span style="color: blue">客户端通过网站B中的链接访问网站A。(此时携带有合法的sessionID进行访问网站A的)</span>
6. <span style="color: blue">此时网站A只需检测sessionID是否合法，合法则执行相应的操作</span>

## 几种常见的攻击类型
1. GET类型的CSRF

  针对get请求，黑客一般会给你发送一张图片，在图片的src里执行请求
  ```html
  <!-- GET类型csrf攻击 -->
  <img src="http://127.0.0.1:10086/payfor?money=100&to=张三" alt="" />
  ```

2. POST类型的CSRF

  针对post请求，黑客一般会伪造一个表单，在提交的时候发送请求
  ```html
  <!-- POST类型csrf攻击 -->
  <form action="http://127.0.0.1:10086/payfor" method="POST" target="_self">
  <input type="hidden" name="money" value="10000" />
        <input type="hidden" name="to" value="hacker" />
    </form>
    <script> document.forms[0].submit(); </script>
  ```

3. 链接类型的CSRF

  链接类型的CSRF并不常见，比起其他两种用户打开页面就中招的情况，这种需要用户点击链接才会触发。这种类型通常是在论坛中发布的图片中嵌入恶意链接，或者以广告的形式诱导用户中招，攻击者通常会以比较夸张的词语诱骗用户点击，例如：
  ```html
  <a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker" taget="_blank">
    重磅消息！！
  <a/>
  ```

## CSRF的特点

- <span style="color: blue">攻击一般发起在第三方网站，而不是被攻击网站，被攻击的网站无法防止攻击发生(但是可以防御csrf)</span>
- <span style="color: blue">**攻击利用受害者在被攻击网站的登录凭证，冒充受害者提交操作，而不是直接窃取数据。整个过程攻击者并不能获取到受害者的登录凭证，仅仅是冒用(攻击者只能利用cookie而不能获取cookie)**</span>
- <span style="color: blue">跨站请求可以用各种方式：图片URL、超链接、CORS、Form提交等等。部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪。</span>

## 防御CSRF的策略
CSRF通常从第三方网站发起，被攻击的网站无法防止攻击发生，只能通过增强自己网站针对CSRF的防护能力来提升安全性

上文讲了CSRF的两个特点
1. CSRF(通常)发生在第三方域名
2. CSRF攻击者不能获取到Cookie等信息，只能使用

针对这两点，我们可以专门制定防护策略，如下：
- <span style="color: red">组织不明外域的访问</span>
  - 同源检测
  - samesite cookie
- <span style="color: red">提交时要求附加本域才能获取到的信息</span>
  - CSRF token
  - 双重Cookie验证

### 同源检测
既然CSRF大多来自第三方网站，那么我们就直接禁止外域（或者不受信任的域名）对我们发起请求。

那么问题来了，我们如何判断请求是否来自外域呢？

在HTTP协议中，每一个异步请求都会携带两个Header，用于标记来源域名：
- <span style="color: blue">Origin Header</span>
- <span style="color: blue">Referer Header</span>

<span style="color: blue">这两个Header在浏览器发起请求时，大多数情况会自动带上，并且不能由前端自定义内容。 服务器可以通过解析这两个Header中的域名，确定请求的来源域。</span>

1. 使用Origin Header确定来源域名

  在部分与CSRF有关的请求中，请求的Header中会携带Origin字段。字段内包含请求的域名(不包含path及query)

  如果Origin存在，那么直接使用Origin中的字段确认来源域名就可以

  但是Origin在以下两种请求不存在

  - IE11同源策源
  - 302重定向：在302重定向之后Origin不包含在重定向的请求中，因为Origin可能会被认为是其他来源的敏感信息。对于302重定向的情况来说都是定向到新的服务器上的URL，因此浏览器不想将Origin泄漏到新的服务器上。
  - <span style="color: red">origin显示来源页面的origin:protocal+host，不包含路径等信息，也就不会包含用户的敏感内容</span>
  - <span style="color: red">origin只存在于post请求</span>

2. 使用Referer Header确定来源域名

  - <span style="color: red">referer存在于所有请求</span>
  - <span style="color: red">referer显示页面的完整地址</span>

  根据HTTP协议，在HTTP头中有一个字段叫Referer，记录了该HTTP请求的来源地址。<span style="color: red">对于Ajax请求，图片和script等资源请求，Referer为发起请求的页面地址。对于页面跳转，Referer为打开页面历史记录。因此我们使用Referer中链接的Origin部分可以的值请求的来源域名</span>

  这种方法并非万无一失，Referer的值是由浏览器提供的，虽然HTTP协议上有明确的要求，但是每个浏览器对于Referer的具体实现可能有差别，并不能保证浏览器自身没有安全漏洞。使用验证 Referer 值的方法，就是把安全性都依赖于第三方（即浏览器）来保障，从理论上来讲，这样并不是很安全。在部分情况下，攻击者可以隐藏，甚至修改自己请求的Referer。

  另外，前面说过，CSRF大多数情况下来自第三方域名，但并不能排除本域发起。如果攻击者有权限在本域发布评论（含链接、图片等，统称UGC），那么它可以直接在本域发起攻击，这种情况下同源策略无法达到防护的作用。

  综上所述：同源验证是一个相对简单的防范方法，能够防范绝大多数的CSRF攻击。但这并不是万无一失的，对于安全性要求较高，或者有较多用户输入内容的网站，我们就要对关键的接口做额外的防护措施。
  
## CSRF Token
前面讲到CSRF的另一个特征是，攻击者无法直接窃取到用户的信息(Cookie,header，网站内容等)，仅仅是冒用Cookie中的信息。

<span style="color: red">而CSRF攻击之所以能够成功，是因为无服务器误把攻击者发送的请求当成了自己的请求。那么我们可以要求所有的用户都携带一个CSRF攻击者无法获取到的token。服务器通过校验请求是否携带正确的Token,来把正常的请求和攻击的请求区分开，也可以防范CSRF攻击。</span>

**原理**

CSRF Token的防护策略分为三个步骤
1. <span style="color: blue">将CSRF Token输出到页面中</span>

  首先，用户打开页面的时候，服务器需要给这个用户生成一个token,该Token通过加密算法对数据进行加密，一般Token都包括随机字符串和时间戳组合，显然在提交时Token不能在放在Cookie中了，否则又会被攻击者冒用。因此，为了安全起见Token最好还是存在服务器的Session中，之后每次页面加载时，使用JS遍历整个Dom树，对于Dom所有的a和Form标签后加入Token。这样可以解决大部分的请求，但是对于在页面加载之后动态生成的HTML代码，这种方法就没有作用，还需要程序员在编码时手动添加Token。

2. <span style="color: blue">页面提交的请求携带这个Token</span>

    对于GET请求，Token将附在请求地址之后，这样URL 就变成 http://url?csrftoken=tokenvalue。 而对于 POST 请求来说，要在 form 的最后加上：
    ```html
      <input type=”hidden” name=”csrftoken” value=”tokenvalue”/>
    ```
    这样，就把Token以参数的形式加入请求了。

3. <span style="color: blue">服务器验证Token是否正确</span>

  当用户从客户端得到了Token，再次提交给服务器的时候，服务器需要判断Token的有效性，验证过程是先解密Token，对比加密字符串以及时间戳，如果加密字符串一致且时间未过期，那么这个Token就是有效的。

### 总结

Token是一个比较有效的CSRF防护方法，只要页面没有XSS漏洞泄露Token，那么接口的CSRF攻击就无法成功
:::tip
验证码和密码其实也可以起到CSRF Token的作用，而且更安全
为什么什么很多银行等网站会要求已经登录的用户在转账时再次输入密码，现在是不是有一定道理了...
:::
## 双重Cokie验证
利用CSRF攻击不能获取到用户Cookie的特点，我们可以要求Ajax和表单请求携带一个Cookie中的值。

双重Cookie采用以下流程：

- <span style="color: blue">在用户访问网站页面时，向请求域名注入一个Cookie，内容为随机字符串（例如csrfcookie=v8g9e4ksfhw）。</span>
- <span style="color: blue">在前端向后端发起请求时，取出Cookie，并添加到URL的参数中（接上例POST https://www.a.com/comment?csrfcookie=v8g9e4ksfhw）。</span>
- <span style="color: blue">后端接口验证Cookie中的字段与URL参数中的字段是否一致，不一致则拒绝。</span>

此方法相对于CSRF Token就简单了许多，但是，此方法并没有大规模应用，其在大型网站上的安全性还是没有CSRF Token高，原因我们举例进行说明。

由于任何跨域都会导致前端无法获取Cookie中的字段（包括子域名之间），于是发生了如下情况：

- <span style="color: red">如果用户访问的网站为www.a.com，而后端的api域名为api.a.com。那么在www.a.com下，前端拿不到api.a.com的Cookie，也就无法完成双重Cookie认证。</span>
- <span style="color: red">于是这个认证Cookie必须被种在a.com下，这样每个子域都可以访问。任何一个子域都可以修改a.com下的Cookie。某个子域名存在漏洞被XSS攻击（例如upload.a.com）。虽然这个子域下并没有什么值得窃取的信息。但攻击者修改了a.com下的Cookie。攻击者可以直接使用自己配置的Cookie，对XSS中招的用户再向www.a.com下，发起CSRF攻击。</span>
### 总结
用双重Cookie防御CSRF的优点
- 无需使用Session，使用面更广，易于实施
- Token存储于客户端中，不会给服务器带来压力
- 相对于Token，实施成本,可以前后端同意拦截校验，而不需要一个个接口和页面添加

缺点
- Cookie中增加了额外的字段。
- 如果有其他漏洞(如XSS),攻击者可以注入Cookie，那么该防御方式失效
- 为了确保Cookie传输安全，曹勇这种防御方式的最好确保用整站HTTPS方式，如果还没切HTTPS的使用方式也会有风险

## Samesite Cookie属性
防止CSRF攻击的办法已经有上面的预防措施。为了从源头上解决这个问题,Google起草了一份草案来改进HTTP协议，那就是Set-Cookie响应头新增Samesite属性，它用来标明这个 Cookie是个“同站 Cookie”，同站Cookie只能作为第一方Cookie，不能作为第三方Cookie，Samesite 有两个属性值，分别是 Strict 和 Lax。参考如下：[Cookie 的 SameSite 属性](https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)
## 资料
[原文](https://blog.csdn.net/yexudengzhidao/article/details/93527586)

[前端安全系列（二）：如何防止CSRF攻击？](https://tech.meituan.com/2018/10/11/fe-security-csrf.html)

