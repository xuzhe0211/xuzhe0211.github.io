---
autoGroup-17: 小程序
title: 四种方法解决微信小程序设置背景图片
---
## 问题描述
在微信小程序当我们使用本地图片作为背景图片的时候我们会参与一下问题代码
```css
.bg {
    width: 750rpx;
    height: 540rpx;
    background-image: url(../../images/head_bg.png);
}
```
在页面使用这个样式的时候小程序会报错

![问题](./images/v2-9ba5bf8dee927b667983e27adec52a40_1440w.png)

## 解决方案
小程序背景图片无法直接使用本地图片，有4中解决方案

1. 使用image组件,在布局下面盖上一层图片。缺点：布局结构可读性不高
2. 将图片通过在线转化网站，转化成base64格式。缺点：base64内容太长了，影响样式代码阅读
3. **直接通过行内样式解决。缺点：代码看上去不够优雅(最简单)**
4. 直接使用网络图片。缺点：需要放到服务器上(最灵活)

建议使用第四种方式解决，虽然首次操作会有点麻烦，但是这样可以增加灵活度后续可以不发版本直接替换远程图片。

如果是公司都有服务器放一下就好了。但是我们是独立开发，服务器怎么解决？别忘了，其实我们可以将图片放在云开发的云存储里面会自从生成在线图片链接

### 放在云存储上
1. 进入云开发控制台

    ![云开发](./images/v2-a5578501ca74b91aee44800eaffdf9d4_1440w.png)

2. 进入云存储空间

    ![云存储](./images/v2-a8924c615a2732924ba476101a67f623_1440w.png)

3. 拖拽图片到云存储空间，不勾选任何设置，点击确认即可上传成功了

    ![云存储空间](./images/v2-b60d1c592abc2f5f79579592a59f4228_1440w.png)

4. 点击文件名称，复制文件地址

    ![复制文件地址](./images/v2-4bd1d2537b785ce9a0b74bac4a1bb883_1440w.png)

## 代码
1. Css代码
```css
.head-bg {
    width: 750rpx;
    height: 540rpx;
    background-image: url('https://xxxxx.tcb.qcloud.la/head_bg.png');
    background-size: 100% 100%;
}
```
2. WXML代码
```html
<view>
  <!-- 头部 -->
  <view class="head-bg" >
      <!-- 省略无关代码 -->
  </view>
</view>
```
3. 行内样式

当然如果实际业务需求没有替换图片也可以适应第三种方案，这个是醉生是的方案。代码如下
```html
<view>
  <!-- 头部 -->
  <view style="background-image: url(../../../../images/head_bg.png);background-size: 100% 100%;" >
        <!-- 省略无关代码 -->    
  </view>
</view>
```

4. Base64编码格式
第二个方案，Base64编码格式，先将图片转化为base64格式，然后传送到base64图片在线转换工具

```shell
background-image:url('bbase64编码')
```
5. 用内容覆盖图片
第一个方案，用内容覆盖图片
```html
<view class="container">
  <image src='../image/head_bg.png'></image>
  <view class='content'>
    我是内容
  </view>
</view>
```
wxss代码
```css
.container{
  width: 100%;
  height: 600rpx;
  margin: 0;
  padding: 0;
  position: relative;
}
image{
  position: absolute;
  width: 100%;
  height: 600rpx;
}
.content{
  position: absolute;
  z-index: 1;
}
```