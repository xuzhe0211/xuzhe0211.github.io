---
title: Chrome 117 重大更新：Network 面板就能发起 Mock 请求 ！！！
---
> 在NetWork 面板中发送 mock请求！！！

前端开发在调试过程中，经常需要各种不同的数据来反复调试，所以我们前端程序员会经常在脚手架中集成 mock 或者通过代理的方式去hack的实现，但是现在再也不用这么麻烦了，Chrome 117 原生就支持了，而且体验相当丝滑。

你可以实现什么效果呢？
- 拦截 HTML 文件，读取本地文件
- 拦截 JS 文件，读取本地文件
- 拦截CSS 文件，读取本地文件
- 拦截 请求，读取本地文件

也就是，一个页面上所有的资源包括图片,理论上七内容都可以自由修改，并且保存在本地的。

## 修改返回响应数据
想要修改接口返回的数据,设置成特定的数据,首先打开 网络(Network) 面板，找到你需要Mock的接口，右键然后选择替换内容(Override content).

![右键选择](./images/ccf445710a474c109f5f030a021a48c6~tplv-k3u1fbpfcp-jj-mark_3024_0_0_0_q75.png)

这时候浏览器会提示：选择要用来存储替换文件的文件夹,这个文件夹主要作用是用来 **保存Mock的替换文件**，方便下次Mock请求直接使用

点击 选择文件夹

![选择文件夹](./images/344976404f134e43929857e95f28b37d~tplv-k3u1fbpfcp-jj-mark_3024_0_0_0_q75.png)

选择我们刚刚新建的文件夹，我是在电脑桌面上新建了一个空的文件夹 chrome_devtools, 选择之后会提示 **允许完整的访问权限**，一定要注意点击允许

![选择允许权限](./images/d33c5b0e7a31414f84de92500099c6e8~tplv-k3u1fbpfcp-jj-mark_3024_0_0_0_q75.png)

<span style="color: blue">这个时候 DevTools 会自动跳转到 源代码/来源(Sources) 面板，并且会生成对应请求的Mock文件：</span>

![源代码](./images/3f555a5720a1456da541f6f51770219b~tplv-k3u1fbpfcp-jj-mark_3024_0_0_0_q75.png)

编辑Mock文件，自定义一个JSON数据格式然后保存

![自定义数据格式](./images/9ae76a2c4cdd41d48da669183cda27e7~tplv-k3u1fbpfcp-jj-mark_3024_0_0_0_q75.png)

重新发起请求,发现被拦截的接口会有一个**高亮的标识**，鼠标移入会提示对应的信息，并且响应的数据已经变成了我们 修改后 的数据

![mock响应数据](./images/31b27b6a70534c9595714956034c8a4f~tplv-k3u1fbpfcp-jj-mark_3024_0_0_0_q75.png)

当然处了修改接口返回的内容以外，沃恩还可以修改返回的 响应头

## 修改返回的响应头
想要修改接口返回的响应头，增加我们想要返回的 key:value, 首先打开 网络(Network) 面板，找到你需要Mock的接口，右键然后选择 替换标头(Override headers)

![替换标头](./images/f6d37e780c1846099ddf5352035ea286~tplv-k3u1fbpfcp-jj-mark_3024_0_0_0_q75.png)

右侧面板会直接出现 添加标头 按钮

![添加标头](./images/712b98e4c4c649d5a6e5b954b63ca12d~tplv-k3u1fbpfcp-jj-mark_3024_0_0_0_q75.png)

点击添加，这里我们添加一个 Test-Header: testHeader 做个简单的测试

![testheader](./images/88e3fd2af07242f68ccf4c49fab1a179~tplv-k3u1fbpfcp-jj-mark_3024_0_0_0_q75.png)

也可以直接打开 源代码/来源(Sources) 面板，找到对应的文件 .headers 文件中直接添加，两种添加方式效果一样

![sources](./images/ff9a0c63f9be430db0fe35c3a5ac3147~tplv-k3u1fbpfcp-jj-mark_3024_0_0_0_q75.png)

再次重新发起请求，发现响应头中已经返回了我们设置的 Test-Header: testHeader

![预览](./images/d8377393b66843f3bd50f2ddc5f9ed06~tplv-k3u1fbpfcp-jj-mark_3024_0_0_0_q75.png)

查看我们开始新建的 chrome_devtools 文件夹，发现Mock的数据都已经保存到了文件夹中了

![本地](./images/ad3b4a5f2615492ab9f32735080b0ef2~tplv-k3u1fbpfcp-jj-mark_3024_0_0_0_q75.png)

## 清除拦截的Mock数据
当我们 Mock 数据程序调试完成之后，想要调用真实的接口数据，这个时候一定要记得清除 Mock替换文件

<span style="color: blue;font-weight:bold">打开 源代码/来源(Sources) 面板，取消勾选 启动本地替换 或者直接点击清除图表即可</span>

![清除本地](./images/976815727bbc42ea882f1d4eeb3f38d1~tplv-k3u1fbpfcp-jj-mark_3024_0_0_0_q75.png)



## 资料
[原文](https://juejin.cn/post/7281210797959561227?utm_source=gold_browser_extension)