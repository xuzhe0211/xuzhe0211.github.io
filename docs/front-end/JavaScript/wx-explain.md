---
autoGroup-17: 小程序
title: 微信小程序知识点学习归纳
---
## 小程序介绍
小程序提供了一个简单、高效的应用开发框架和丰富的组件以及API，帮助开发者在微信中开发具有原生APP体检的服务；小程序是一种全新的连接用户与服务的方式，它可以在微信内被便捷的获取和传播，同事具有出色的使用体验

## 官方文档
[官方文档](https://developers.weixin.qq.com/doc/)

想要更具体了解关于框架、组件、API的详细内容，请参考对应的参考文档
- [小程序框架参考文档](https://developers.weixin.qq.com/miniprogram/dev/reference/)
- [小程序组件参考文档](https://developers.weixin.qq.com/miniprogram/dev/component/)
- [小程序API参考文档](https://developers.weixin.qq.com/miniprogram/dev/api/)
- [小程序服务端API参考文档](https://developers.weixin.qq.com/miniprogram/dev/api-backend/)

## 快速了解
- 微信小程序是腾讯公司旗下
- 微信小程序只能在微信里打开
- 微信小程序代码构成:WXML(html)，WXSS(css),JS,JSON
- 微信小程序文件构成
    - .json后缀JSON配置文件
    - .wxml后缀WXML模板文件
    - .wxss后缀WXSS样式文件
    - .js后缀，小程序脚本逻辑文件
    - .wxs后缀，小程序脚本逻辑文件
- 微信小程序上线后，请求项目接口必须是 https 协议
- 微信小程序支持：微信支付、客服系统、插件

## 整体架构介绍
<span style="color: blue">整个小程序框架系统分为两个部分：逻辑层(app Service)和视图层(View)。**小程序提供了自己的视图层描述语言WXML和WXSS以及基于Javascript的逻辑层框架，并在视图层与逻辑层提供了数据传输和事件系统，让开发者能够专注于数据与逻辑** </span>

1. 视图层View
    - 视图层由WXML与WXSS编写，由组件来进行展示
        - WXML(Weixin Markup Language)用于描述页面结构
        - WXSS(Weixin Style Sheet)用于描述页面样式
    - 组件(Component)是视图的基本组成单元
2. 逻辑层App Service
    - 小程序开发框架的逻辑层使用Javascript引擎
    - 逻辑层将数据进行处理后发送给视图层，同时接受视图层的事件反馈
    - 框架提供丰富的微信原生API，可以方便的调起微信提供的能力，如获取用户信息，扫一扫，支付功能等
    - 提供模块化能力，每个页面有独立的作用域
3. 文件结构介绍
小程序包含一个描述整体程序的app和多个描述各自页面的page。

一个小程序主体部分由三个文件组成，必须放在项目的根目录，如下：
文件|必须|作用
---|---|---
app.js|是|小程序逻辑
app.json|是|小成功公共配置
app.wxss|否|小程序公共样式表

一个小程序页面由四个文件组成，分别是
文件类型|必须|作用
---|---|---
js|是|页面逻辑
wxml|是|页面结构
json|否|页面配置
wxss|否|页面样式表

<span style="color: red">注意:为了方便开发者减少配置项，描述页面的四个文件必须具有相同的路径与文件名</span>

配置文件|描述
project.config.json | 此文件是配置微信开发者工具的，我们使用工具，无需去手动修改此文件
sitemap.json | 微信索引文件，微信现已开放小程序内搜索，开发者可以通过sitemap.json配置，或管理后台页面收录开关来配置其小程序页面是否允许微信索引

- 一个小程序可以有很多页面，每个页面承载不同的功能，页面之间可以互相跳转
- 一个页面由配置代码JSON文件、模板代码wxml文件，样式代码wxss文件以及逻辑代码Javascript文件组成
```js
wxchant  微信小程序根目录
├─pages               页面根目录
│  ├─index            index目录
│  │  ├─index.json    json配置文件
│  │  ├─index.wxml    wxml模版文件
│  │  ├─index.wxss    wxss样式文件
│  │  └─index.js      js逻辑事件文件
│  │
│  ├─logs             logs目录
│  │  ├─logs.json     json配置文件
│  │  ├─logs.wxml     wxml模版文件
│  │  ├─logs.wxss     wxss样式文件
│  └──└─logs.js       js逻辑事件文件
│
├─utils               公共模块目录
│  └─util.js          公共模块文件
│
├─app.json            公共json配置文件
├─app.wxss            公共wxss样式文件
├─app.js              小程序启动文件
├─project.config.json 开发者工具配置文件
└─sitemap.json        微信索引配置文件
```
## 小程序配置
### 1.全局配置
小程序根目录下的app.json文件用来对微信小程序进行全局配置
编号|属性|类型|必填|描述
---|---|---|---|---
1 | entryPagePath | string | 否 | 小程序默认启动首页
2 | pages | string[] | 是 | 页面路径列表
3 | window | Object | 否 | 全局的默认窗口
4 | tabBar | Object | 否 | 底部tab栏
5 | debug | boolean | 否 | 是否开启debug模式，默认关闭
6 | style | string | 否 | v2启用新版的组件样式
7 | sitemapLocation | string | 是 | 指明sitemap.json索引文件的位置

1. entryPagePath

    指定小程序的默认启动路径(首页)，常见情景是从微信聊天列表页下拉启动、小程序列表启动等。如果不填，默认为pages列表的第一项。不支持带页面路径参数
    ```js
    {
        'entryPagePath': 'page/index/index'
    }
    ```
2. pages
    <span style="color: blud">用于指定小程序由哪些页面组成，每一项都对应一个页面的路径(含文件名)信息。文件名不需要写文件后缀，框架会自动去寻找对应位置的.json,.js,.wxml,.wxss四个文件进行处理</span>

    未指定entryPagePath时，数组的第一项代表小程序的初始页面(首页)。

    <span style="color: blue">**小城中新增/减少页面，都需要对pages数组进行修改**</span>

    如开发目录为：
    ```js
    ├── app.js
    ├── app.json
    ├── app.wxss
    ├── pages
    │   │── index
    │   │   ├── index.wxml
    │   │   ├── index.js
    │   │   ├── index.json
    │   │   └── index.wxss
    │   │── login
    │   │   ├── login.wxml
    │   │   ├── login.js
    │   │   ├── login.json
    │   │   └── login.wxss
    │   └── logs
    │       ├── logs.wxml
    │       └── logs.js
    └── utils
    ```
    则需要在app.json中写
    ```js
    {
        'pages': [
            'pages/index/index',
            'pages/login/login',
            'paegs/logs/logs'
        ]
    }
    ```
3. window配置项

    用于设置小程序的状态栏、导航条、标题、窗口背景色
    编号|属性|类型|默认值|描述
    ---|---|---|---|---
    1 | navigationBarBackgroundColor | HexColor | #000 | 导航栏背景颜色，如#000
    2 | navigationBarTextStyle | string | white | 导航栏标题颜色 仅支持black/white
    3 | navigationBarTitleText | string |  - | 导航栏标题文字内容
    4 | backgroundColor | HexColor | #ffffff | 窗口背景色
    5 | backgroundTextStyle | string | dark | dark | 下拉loading的样式，仅支持dark/light
    ```js
    {
        "window": {
            "navigationBarBackgroundColor": "#ffffff",
            "navigationBarTextStyle": "black",
            "navigationBarTitleText": "微信小程序配置测试",
            "backgroundColor": "#eeeeee",
            "backgroundTextStyle": "light"
        }
    }
    ```
    ![window](./images/config.344358b1.jpg)
4. tabBar 配置项

    如果小程序是一个多tab应用(客户端窗口的底部或顶部有tab栏可以切换页面)，可以通过tabBar配置项指定tab栏的表现，以及tab切换时显的对应页面
    编号|属性|类型|必填|默认值|描述
    ---|---|---|---|---|---
    1| color | HexColor| 是| - | tab 上的文字默认颜色，仅支持十六进制颜色

5. list 配置项

### 2.页面配置
### JSON数据格式


## 视图层

## 实战案例
 
## 逻辑层

## 数据交互
[WXML语法参考](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/data.html#%E5%86%85%E5%AE%B9)

### 1.数据绑定
- <span style="color: red">data是页面第一次渲染使用的初始数据</span>
- <span style="color: red">页面加载时，**data将会以JSON字符串的形式由逻辑层传至渲染层**</span>
- <span style="color: red">渲染层可以通过WXML对数据进行绑定</span>
- <span style="color: red">WXML中动态数据均来自对应的Page的data</span>
    ```js
    Page({
    data: {
        str: "PHP中文网",
        boole: true,
        number: 2021,
        array: {
        0: "HTMl",
        1: "CSS",
        2: "JavaScript",
        3: "PHP",
        4: "微信小程序",
        5: "ThinkPHP",
        },
        object: [
        {
            name: "欧阳克",
            gender: "男",
            age: 40,
        },
        {
            name: "灭绝师太",
            gender: "女",
            age: 18,
        },
        {
            name: "西门大官人",
            gender: "男",
            age: 28,
        },
        ],
    },
    onLoad: function () {},
    });
    ```
- WXML通过 { {变量名} } 语法是的WXML拥有动态渲染的能力，除此之外还可以在{{}}内进行简单的逻辑运算
    ```js
    <view>字符串：{{ str }}</view>
    <view>布尔值：{{ boole }}</view>
    <view>数字：{{ number }}</view>
    <view>运算：{{ number + 100 }}</view>
    <view>数字运算：{{ 20 + 20 }}</view>
    <view>字符串运算：{{ '欧阳克' + ' ' + '朱老师' }}</view>
    ```
### 2.js获取data数据
this调用本文件的方法和参数
```js
onLoad: function() {
    console.log(data.str); // 会报错
    console.log(this.data.str);
}
```
### 3.js修改data数据
- 单向修改
    ```js
    onLoad: function () {
        this.data.str = '这里是php中文网';
        console.log(this.data.str);
    },
    onShow: function () {
        console.log(this.data.str);
    }
    ```
- 双向修改
    ```js
    onLoad: function() {
        this.setData({
            str: '这里是php中文网'
        })
        console.log(this.data.str);
    }
    ```
    在WXML中，普通的属性的绑定是单向的，例如
    ```js
    <input value="{{value}}" />
    ```
    如果使用this.setData({ value: 'leaf'})来更新value，this.data.value和输入框中的显示的值都会被更新为leaf;但如果用户修改了输入框里的值，却不会同时改变 this.data.value 

    如果需要在用户输入的同时改变 this.data.value ，需要借助简易双向绑定机制。此时，可以在对应项目之前加入 model: 前缀：
    ```js
    <input model:value="{{value}}">
    ```
    这样，如果输入框的值被改变了， this.data.value 也会同时改变。同时， WXML 中所有绑定了 value 的位置也会被一同更新， 数据监听器 也会被正常触发。
- 事件修改




## 资料
[微信小程序介绍、配置、视图层、逻辑层、页面数据交互等知识点学习归纳](https://www.php.cn/blog/detail/27658.html)