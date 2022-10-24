---
title: 工作中问题简单记录
---

## markdown 锚点设置
```html
[类型](#control-statements)
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p>1</p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
<p></p>
## <a id="control-statements">控制语句</a>
```

## 如何在Markdown中打出上标、下标和特殊字符
```html
<sup>xxx</sup> // 上标
<sub>xxx</sub> // 下标
```
其中xxx表示上标的内容

n的平方呢等于n+1，写法如下

```html
n<sup>2</sup> = n + 1
```

a = log<sub>2</sub>b

```
a = log<sub>2</sub>b
```

## 还有一些特殊字符、键盘上没有的符号也可以打出来，比如注册商标的符号:立白&reg;
```
立白&reg;
```
function 符号：&fnof;可以轻松得打出函数式：&fnof;(x)=x+1
```
&fnof;(x) = x + 1
```
根号，不过这个根号不完美，少了上面一横，更像对勾：√5
```
&radic;5
```
角度符号：30°
```
30&deg;
```
以及更多的特殊符号都可以打出，就不一一列举了，想要了解更多特殊符号的打法请查阅下面这个链接：
[HTML中的特殊符号](https://blog.csdn.net/html5_/article/details/21639475)

## markdown实用好看的小组件

文件地址：[shields.io](https://shields.io/)

![TypeScript](https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white)

![生成](https://img.shields.io/badge/53%E4%B8%87-100-yellow)

### 居中效果
```
<div align="center">
    # 你的Markdown内容
</div>
```

[掘金地址](https://juejin.cn/post/7022299474458312718)

## 正则

```js
/^(?!string).*/.test('string/0.0.1') //非string开头得字符串
```

## js获取元素div相对body距离

如何取到页面中任意某个Html元素与body元素之间得偏移距离

offetTop和offsetLeft这两个属性，IE、opera和Firefox对它两得结束存在差异

IE5.0+、opera8+: offsetTop和offsetLeft都是相对父级元素
Firefox1.06:offsettop和offsetLeft都是相对body元素

因此
1. 在FF在直接使用offsetTop和offsetLeft，就可以直接取到页面中某个Html元素与body元素之间得偏移距离
2. 在IE、opera下则比较麻烦

需要首先取到该Html元素与body元素之间所有Html元素，计算各自得OffsetTop和offsetLeft，然后在累加

即：从该html元素开始，遍历至body，在遍历过程中，如果某个HTML元素得css设置了boderWidth得话，则borderWidth不是算在offsetTop和offsetLeft内得---因此在遍历得过程中，还需要在累加上

obj.currentStyle.borderLeftWidth obj.currentStyle.borderTopWidth

```js
function getPoint(obj) { // 获取某元素以浏览器左上角为原点得坐标
	var t = obj.offsetTop; // 获取该坐标对应芙蓉起得上边距
    var l = obj.offsetLeft; // 对应父容器得左边距
    // 判断是否有父容器，如果存在则累加其边距
    while (obj === obj.offsetParent) { // 等效obj = obj.offsetParent; while(obj != undefined)
    	t += obj.offsetTop; // 叠加父容器得上边距
        l += obj.offsetLeft; // 叠加父容器得左边距
    }
    alert(`top: ${t};left:${l}`)
}

```
[深入理解定位父级offsetParent及偏移大小](https://www.cnblogs.com/xiaohuochai/p/5828369.html)

## ts项目中Cannot find module ‘XXX‘ its corresponding type declarations

Cannot find module '@/utils/request' or its corresponding type declarations.Vetur...

### 原因分析
报错示例

<img :src="$withBase('/images/2021021809232546.png')" alt="报错示例">

::: tip
上述问题的产生，一般是由于Visual Studio Code中安装了Vetur插件，它要求：

+ 项目在工作区根目录(就是把项目文件夹拖进vscode后的效果)
+ 项目排在第一位(不再第一位可以吧鼠标拖动项目移动到第一位)
:::

### 解决方案

直接把项目移至工作区的第一位


## 二进制/十进制互相转换

### 十进制转换为二进制

```js
var num = 100;
console.log(num.toString(2));
```

toString()方法可把一个Number对象转换为一个字符串，并放回结果

### 二进制转十进制

```js
var num = 1100100;
console.log(parseInt(num, 2))
```

### 其他转换

```js
parseInt(num,8);   //八进制转十进制
parseInt(num,16);   //十六进制转十进制
parseInt(num).toString(8)  //十进制转八进制
parseInt(num).toString(16)   //十进制转十六进制
parseInt(num,2).toString(8)   //二进制转八进制
parseInt(num,2).toString(16)  //二进制转十六进制
parseInt(num,8).toString(2)   //八进制转二进制
parseInt(num,8).toString(16)  //八进制转十六进制
parseInt(num,16).toString(2)  //十六进制转二进制
parseInt(num,16).toString(8)  //十六进制转八进制
```

## js获取指定时区的时间

```js
const timezone = 8; // 目标时区时间，东八区  东时区正数 西时区负数
const offset_GMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
const nowDate = new Date().getTime(); // 本地时间距1970年1月1日午夜之间的毫秒数
const targetDate = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);
console.log('东8区现在是：' + targetDate);

// offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000 === 0
```

## css3的循环滚动

解决css循环滚动 回到顶部卡顿问题

每次循环滚动最后的list为下一次滚动的首个元素

```html
// css
<style>
@keyframes fadeOutUp {
    0% {
        transform: translate3d(0, 0, 0);
    }

    33% {
        transform: translate3d(0, 0 / @pxtorem, 0);
    }

    49% {
        transform: translate3d(0, -25 / @pxtorem, 0);
    }

    82% {
        transform: translate3d(0, -25 / @pxtorem, 0);
    }

    100% {
        transform: translate3d(0, -50 / @pxtorem, 0);
    }
}

animation: fadeOutUp 6s ease-out;
<style>

// js
<script>
this.$refs.animation.addEventListener('animationend', this.handlerAnimationEnd.bind(this), false);

//默认获取前三个  animationVisible 给dom添加动画class
this.animationVisible = true;
this.visibilityList = this.visibilityAllList.slice(this.index, 3);
this.index = this.index + 2;


handlerAnimationEnd() {
    this.animationVisible = false;
    if (this.index + 3 > this.visibilityAllList.length) {
        this.visibilityList = this.visibilityAllList.slice(this.index, this.visibilityAllList.length).concat(this.visibilityAllList.slice(0, 3 - (this.visibilityAllList.length - this.index)));
        this.index = 2 - (this.visibilityAllList.length - this.index);
    } else {
        this.visibilityList = this.visibilityAllList.slice(this.index, this.index + 3);
        this.index = this.index + 2;
    }
    setTimeout(() => {
        this.animationVisible = true;
    }, 500);
},
<script>
```

## 视频播放不出现loading黑屏调研
由于客户要求视频播放禁止出现loading、黑屏情况

### 调研
前期思路-在视频播放前设置视频封面,尝试之后发现在视频开始推流但是视频未开始播放之后还是有个loading旋转，<span style="color: blue">所以修改封面样式</span>
在视频真正播放前视频封面一直存在

video.js
```css
// 去掉覆盖层
/deep/ .el-loading-mask {
    display: none;
}
// 播放时候封面隐藏
/deep/ .vjs-live .vjs-poster {
    display: none !important;
}
// 播放等待真正播放的时候封面显示
/deep/ .vjs-waiting .vjs-poster {
    display: block !important;
}
```


## 使用css3动画，页面抖动闪屏

### 问题原因
使用css3动画制作，但是动画会导致页面抖动闪屏

### 解决方案
<span style="color:red">在低设备刷新率fps下是无法解决的，调高设备刷新率</span>

使用到动画的样式设置如下样式，可解决
```css
-webkit-backface-visibility: hidden;（设置进行转换的元素的背面在面对用户时是否可见：隐藏）
// 如果有3d加上下面句 ，没有可省略
-webkit-transform-style: preserve-3d; （设置内嵌的元素在 3D 空间如何呈现：保留 3D ）
```

eg:

```css
.num {
    -webkit-backface-visibility: hidden;
    -webkit-transform-style: preserve-3d;
    backface-visibility: hidden;
    transform-style: preserve-3d;
}
```

:::tip
上面问题在解决大屏的时候还是未生效，最后改写css动画使用requestAnimationFrame
:::

```js
async animationRender() {
    if (!this.$refs.animationEle) {
        return false;
    }
    const parentHeight = this.$refs.animationEle.clientHeight;
    const itemHeight = this.$refs.animationEle.querySelector('div').clientHeight;
    if (this.indexAnimation <= -(parentHeight - 3 * itemHeight)) {
        this.indexAnimation = 0;
        await sleep(2000);
    } else {
        this.indexAnimation--;
    }
    this.$refs.animationEle ? (this.$refs.animationEle.style.top = `${this.indexAnimation}px`) : '';
},
animationloop() {
    this.animationRender();
    this.visibilityList.length > 3 ? this.animationId = window.requestAnimationFrame(this.animationloop) : '';
}

animationloop()
```

## 使用js检测用户是否缩放了页面

如果希望知道用户是否执行了缩放行为，则可以在resize事件事件中检测设备像素比的变化，也就是window.devicePixelRatio的返回值。

实例代码
```js
let lastPixelRatio = window.devicePixelRatio
window.addEventListener('resize', function() {
    let currentPixel = window.devicePixelRatio;

    if(currentPixelRatio !== lastPixelRatio) {
        console.log('页面缩放变化了')
    }

    lastPixelRatio = currentPixelRatio;
})
```

## vant、element样式覆盖问题

对已经做了按需加载的时候，确保引入的组件已经按需加载了，不然全局的重写样式无法覆盖

## cnpm修改密码
https://github.com/cnpm/cnpmjs.org/issues/1050
## 其他
1. 路由的懒加载造成view内组件全部懒加载 
2. splitChunk打包

## html2canvas 图片引入
:::tip
如果图片服务器已经允许跨域;图片中添加标签crossOrigin="anonymous"

之前遇到一个问题就是等待图片加载完成 img.load 其实没必要，html2canvas是根据静态节点生成图片
:::
```js
{userInfo && userInfo.image && <div className='user-avatar' id="imgWrap">
    <img src={`${userInfo && userInfo.image}?time=${Date.now()}` || `https://content-all-s3.hbfile.net/images/dynamic/2022-06/18b4bef0b3235c53454b8a4e7830ba99.png?time=${Date.now()}`} crossOrigin="anonymous"/>
</div>}
```

## 判断字符是否超过两行
```js
componentDidMount () {
    const titles = document.querySelectorAll('.activity-item-title')
    for (const item of titles) {
      const spanOffsetHeight = item.querySelector('span').offsetHeight
      if (spanOffsetHeight > 30) {
        this.setState({line: 2})
      }
    }
  }
  handleLink = (path) => {
    this.props.history.push(path)
    sensorsSend(path === '/activity/trade/spot' ? 'home_joinspot' : 'home_joinfuture')
  }
  render () {
    const { state = 1 } = this.props.activityInfo || {}
    const {line} = this.state
    this.isloading = Object.prototype.toString.call(state).slice(8, -1).toLowerCase() !== 'number'
    return (
      <div>
        {this.isloading ? ''
          : <div className={`infomation-entry-sub ${state !== 0 && 'infomation-entry-activity'}`}>
            <div className='activity-item'>
              {state !== 0 && <span className="btn btn-primary" onClick={this.handleLink.bind(this, '/activity/trade/spot')}>{intl('{#进入赛场#}')}</span>}
              <div className={line === 2 ? 'activity-item-title activity-item-titleHeight' : 'activity-item-title'}><span>{intl('{#交易赛#}')}</span></div>
              <div className='activity-item-content'>
                <span>{intl('{#赢取#}')}</span>
                <p>1,000,000<s>USDT</s></p>
              </div>
            </div>
            <div className='activity-item'>
              {state !== 0 && <span className="btn btn-primary" onClick={this.handleLink.bind(this, '/activity/trade/contract')}>{intl('{#进入赛场#}')}</span>}
              <div className={line === 2 ? 'activity-item-title activity-item-titleHeight' : 'activity-item-title'}><span>{intl('{#交易赛#}')}</span></div>
              <div className='activity-item-content'>
                <span>{intl('{#赢取#}')}</span>
                <p>1,000,000<s>USDT</s></p>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}
```
[参考资料](https://www.it1352.com/721302.html)

**开发之前的详细设计评审(接口评审)**



[使用JS检测用户是否缩放了页面](https://www.zhangxinxu.com/wordpress/2021/02/js-if-page-zoom/)