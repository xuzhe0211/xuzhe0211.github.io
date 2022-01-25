---
autoGroup-7: 浏览器
title: Cookie 的 SameSite 属性
---
Chrome51开始，浏览器的Cookie新增了一个SameSite属性，用来防止CSRF攻击和用户追踪

## CSRF是什么
Cookie往往用来存储用户的身份信息，恶意网站可以设法伪造带有正确cookie的HTTP请求，这就是CSRF攻击。

举例来说，用户登录了银行网站your-ban.com，银行服务器发来了一个Cookie
```
Set-Cookie: id=a3fwa
```
用户后来又访问了恶意网站malicious.com，上面有个表单
```
<form action="your-bank.com/transfer" method="POST">
...
</form>
```
用户一旦被诱骗发送这个表单，银行网站就会收到带有正确Cookie的请求，为了防止这种攻击，表单一般都带有一个随机token，告诉服务器这是真实请求
```
<form action="your-bank.com/transfer" method="POST">
  <input type="hidden" name="token" value="dad3weg34">
  ...
</form>
```
这种第三方网站引导发出的 Cookie，就称为第三方 Cookie。它除了用于 CSRF 攻击，还可以用于用户追踪。

比如，Facebook 在第三方网站插入一张看不见的图片。
```
<img src="facebook.com" style="visibility:hidden;">
```
浏览器加载上面代码时，就会向 Facebook 发出带有 Cookie 的请求，从而 Facebook 就会知道你是谁，访问了什么网站。

## SameSite属性
Cookie的SameSite属性用来限制第三方Cookie，从而减少安全风险

它可以设置三个值
- Strict
- Lax
- None

### Strict
Strict最为严格，完全禁止第三方Cookie，跨站点时，任何情况下都不会发送Cookie。换言之，只有当前网页的URL与请求目标一致，才会带上Cookie
```
Set-Cookie:CookieName=CookieValue; SameSite = Strict
```
这个规则过于严格，可能造成非常不好的用户体验。比如，当前网页有一个GitHub连接，用户点击跳转就会带有GitHub的Cookie，跳转过去总是为登录状态

### Lax
Lax规则稍稍放宽，大多数情况也是不发送第三方Cookie，但是导航到目标网址的Get请求除外
```
Set-cookie:CoolieName=CookieValue; SameSite=Lax
```
导航到目标网址的Get请求，只包含三种情况:链接，预加载请求，GET表单，想见下表
请求类型|示例|正常情况|LAX
---|---|---|---
链接| &lt;a href="..."&gt;&lt;/a&gt; | 发送Cookie|发送Cookie
预加载| &lt;link rel="prerender" href="..."/&gt; | 发送Cookie|发送Cookie
GET 表单| &lt;form method="GET" action="..."&gt; | 发送Cookie|发送Cookie
POST表单| &lt;form method="POST" action="..."&gt; | 发送Cookie | 不发送
Iframe| &lt;iframe src="..."&gt;&lt;/iframe&gt; | 发送Cookie | 不发送
AJAX| $.get("...") | 发送Cookie | 不发送
Image| &lt;img src="..."&gt; | 发送Cookie | 不发送

设置了Strict或者Lax以后，基本就杜绝了CSRF攻击。当然，前提是用户浏览器支持SameSite属性。

### None
Chrome计划将Lax变为默认设置，这时，网站可以选择显式关闭SameSite属性，将其设置为None。不过，前提是必须同事设置Secure属性(Cookie只能通过HTTPS协议发送)，否则无效。

下面的设置无效
```
Set-Cookie: widget_session=abc123;SameSite=None
```
下面的设置有效
```
Set-Cookie： widget_session=abc123;SameSite=None; secure
```

## 资料
[原文](https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)
