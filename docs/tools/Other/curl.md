---
# autoGroup-0: 数组方法
title: curl使用
--- 

## curl请求

```
curl -X DELETE --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'token: x-csrf-token' -d '{"id":"19"}' http://192.168.3.6:7001/v1/api/acts/19

curl -X GET "http://http://172.24.193.39:8801/ihs/charge/traffic/actual_path?page_no=0&page_size=20&passid=101" -H "accept: */*"


curl -X PUT --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"title":"test1"}' http://192.168.3.6:7001/v1/api/acts/19
```
[阮一峰curl用法指南](http://www.ruanyifeng.com/blog/2019/09/curl-reference.html)
[阮一峰curl开发指南](http://www.ruanyifeng.com/blog/2011/09/curl.html)

## 简介
curl是常用的命令行工具，用来请求Web服务器。它的名字就是客户端(client)的URL工具的意思。

它的功能非常强大，命令行参数多达几十种。如果熟练的话，完全可以取代Postman这一类的图形界面工具.

本文介绍它的主要命令行参数，作为日常的参考，方便查阅。内容主要翻译自《curl cookbook》。为了节约篇幅，下面的例子不包括运行时的输出，初学者可以先看我以前写的[curl 初学者教程](http://www.ruanyifeng.com/blog/2011/09/curl.html)。

不带有任何参数时，curl就是发出GET请求。

```
curl https: //www.example.com
```
上面命令向www.example.com发出GET请求，服务器返回的内容会在命令行输出。

### -A

-A参数指定客户端的用户代理标头，即User-Agent。curl的默认用户代理字符串是curl/[version].

```
$ curl -A 'Mozilla/5.0 (Window NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36' https://google.com'
```

上面命令将User-Agent改成Chrome浏览器

```
$ curl -A '' https://google.com
```
上面命令会移除User-Agent标头.

也可以通过-H参数直接指定标头，更改User-Agent.

```
curl -H 'User-Agent: php/1.0' https://google.com
```

### -b

-b 参数用来向服务器发送Cookie。

```
$ curl -b 'foo=bar' https://google.com
```
上面命令会生成一个标头Cookie: foo=bar,想服务器发送一个名为foo、值为bar的Cookie。

```
$ curl -b 'foo1=bar;foo2=bar2' https://google.com
```
上面命令发送两个Cookie。
```
$ curl -b cookies.txt https://www.google.com
```
上面命令读取本地文件cookies.txt，里面是服务器设置的Cookie(参见-c参数)，将其发送到服务器

### -c

-c参数将服务器设置的Cookie写入一个文件。
```
$curl -c cookie.txt https://www.google.com
```
上面命令将服务器的HTTP回应所设置Cookie写入文本文件cookies.txt

### -d

-d参数用于发送POST请求的数据体。

```
$curl -d 'login=emma &&password=123' -X POST https://google.com/login
# 或者
$curl -d 'login=emma' -d 'password=123' -X POST https://google.com/login
```
使用-d参数以后，HTTP请求会自动加上标头Content-Type: application/x-wwwform-urlencodeed.并且会自动将请求转为POST方法，因此可以省略 -X POST。

-d参数可以读取本地文本文件的数据，想服务器发送。

```
$ curl -d '@data.txt' https://google.com/login
```
上面命令读取data.txt文件的内容，作为数据体向服务器发送。

### --data-urlencode
--data-urlencode参数等同于-d，发送POST请求的数据体，区别在于会自动发送的数据进行URL编码.

```
$ curl --data-urlencode 'comment=hello world' https://google.com/login
```
上面代码中，发送的数据hello world之间有一个空格,需要进行URL编码

### -e
-e参数用来设置HTTP的标头Referer,表情请求的来源。
```
curl -e 'https://google.com?q=example' https://www.example.com
```
上面的命令将Referer标头设为https://google.com?q=example.

-H参数可以通过直接添加标头Referer，达到同样效果
```
curl -H 'Referer: https://google.com?q=example' https://www.example.com
```

### -F
-F 参数用来向服务器上传二进制文件
```
$ curl -F 'file=@photo.png;type=image/png' https://google.com/profile
```
上面命令会给HTTP请求加上标头Content-Type:multipart/form-data,然后将文件photo.png作为file字段上传。

-F参数可以指定MIME类型
```
$ curl -F 'file=@photo.png;type:image/png' https://google.com/profile
```
上面命令指定MIME类型为image/png,否则curl会吧MIME类型设为application/octet-stream

-F参数也可以指定文件名
```
$ curl -F 'file=@photo.png;filename=me.png' https://google.com/profile
```
上面命令中，原始文件名为photo.png,但是服务器接受到的文件名为me.png

### -G
-G参数用来构造URL的查询字符串。
```
$ curl -G -d 'q=kitties' -d 'count=20' https://google.com/search
```
上面命令会发出一个GET请求，实际请求的URL为https://google.com/search?q=kittes&count=20。如果省略--G，会发出一个POST请求。

如果数据需要URL编码，可以结合--data--urlencode参数。
```
$ curl -G --data-urlencode 'comment=hello world' https://www.example.com
```

### -H
-H参数添加HTTP请求的标头
```
$ curl -H 'Accept-Language: en-US' https://google.com
```
上面命令添加HTTP标头Accept-Language:en-US.
```
$ curl -H 'Accept-Language:en-US' -H 'Secret-Message:xyzzy' https://google.com
```
上面命令添加两个HTTP标头
```
$ curl -d '{"login": "emma", "pass": "123"}' -H 'Content-Type: application/json' https://google.com/login
```
上面命令添加 HTTP 请求的标头是Content-Type: application/json，然后用-d参数发送 JSON 数据。

### -i
-i参数打印出服务器回应的HTTP标头。
```
$ curl -i https://www.example.com
```
上面命令收到服务器回应后，先输出服务器回应的标头,然后空一行，在输出网页的源码。

### -I
-I参数向服务器发出HEAD请求，然后会将服务器返回的HTTP标头打印出来。
```
$ curl -I https://www.example.com
```
上面命令输出服务器对HEAD请求的回应

--head参数等同于-I
```
$ curl --head https://www.example.com
```
### -k
-k参数指定跳过SSL检测
```
$ curl -k https://www.example.com
```
上面命令不会检查服务器的SSL证书是否正确

### -L
-L参数会让HTTP请求更随服务器的重定向。curl默认不更随重定向
```
$curl -L -d 'tweet=hi' https://api.twitter.com/tweet
```
### --limit-rate
--limit-rate用来限制HTTP请求和回应的带宽，模拟慢网速的环境
```
$ curl --limit-rate 200k https://google.com
```
上面命令将带宽限制在每秒200K字节。

### -o
-o参数将服务器的回应保存为文件，等同于wget命令。
```
$ curl -o example.html https://www.example.com
```
上面命令将www.example.com保存成example.html

### -O
-O参数将服务器回应保存成文件，并将URL的最后部分当成文件名。
```
$ curl -O https://www.example.com/foo/bar.html
```
上面命令将服务器回应保存成文件，文件名为bar.html

### -s
-s参数将不输出错误和进度信息
```
$ curl -s https://www.example.com
```
上面命令一旦发生错误，不会显示错误信息。不发生错误的华，会正常显示运行结果。

如果想让curl不产生任何输出，可以使用下面命令
```
$ curl -s -o /dev/null https://google.com
```

### -S
-S参数指定只输出错误信息，通常与-s一起使用
```
$ curl -s -o /dev/null https://google.com
```
上面命令没有任何输出，除非发生错误。

### -u
-u参数用来设置服务器认证的用户名和密码
```
$ curl -u 'bob:12345' https://google.com/login
```
上面命令设置用户名为bob，密码为12345，然后将其转为HTTP标头uthorization: Basic Ym9iOjEyMzQ1

curl能识别URL里面的用户名和密码
```
$ curl https://bob:12345@google.com/login
```
上面命令能够识别URL里面的用户名和密码，将其转为上个例子里面的HTTP标头

```
$ curl -u 'bob' https://google.com/login
```
上面命令只设置了用户名，执行后，curl会提示用户输入密码

### -V
-v参数输出通信的整个过程，用于调试.
```
$ curl -v https://www.example.com
```
--trace参数也可以用用于调试，还会输出原始的二进制数据
```
$ curl --trace - https://www.example.com
```

### -x
-x参数指定HTTP请求的代理
```
$ curl -x socks5://james:cate@myproxy.com:8080 https://www.example.com
```
上面命令指定HTTP请求通过myproxy.com:8080的socks5代理发出

如果没有指定代理协议，默认为HTTP。
```
$ curl -x james:cats@myproxy.com:8080 https://www.example.com
```
上面命令中，请求的代理使用HTTP协议

### -X
-X参数指定HTTP请求的方法
```
$ curl -X POST https://www.example.com
```
上面命令对https://www.example.com发出POST请求