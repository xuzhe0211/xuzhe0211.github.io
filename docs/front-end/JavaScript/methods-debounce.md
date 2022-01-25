---
title: 函数防抖、节流
---

## 概念
### 函数防抖
函数防抖，就是指触发事件后在N秒内函数只能执行一次，如果N秒内又触发了事件，则会重新计算函数执行时间。<br/><br/>

简单的说，当一个动作连续触发，则只执行最后一次。<br/>
打个比方,坐公交，司机需要等最后一个人进入才能关门。每次进入一个人，司机就会多等待几分钟在关门
### 函数节流
限制一个函数一段时间内只能执行一次<br/><br/>
举个例子，乘坐地铁，过闸机，每个人进入后三秒后门关闭，等待下一个人进入
### 可视化工具图

<img :src="$withBase('/images/1674837.webp')" alt="可视化图">

## 场景
### 函数防抖的应用场景
- 搜索框搜索输入。只需用户最后一次输入完，在发送请求
- 手机号、邮箱验证输入检测
- 窗口大小Rize
### 函数节流的应用场景
- 滚动加载，加载更多或滚到底部监听
- 谷歌搜索框，搜索联想功能
- 高频点击提交，表单重复提交

## 实现原理
### 函数防抖
```bash
const debounce = (func, wait) => {
	let timer;
    return () => {
    	clearTimeout(timer);
        timer = setTimeout(func, wait);
    }
}
```
### 函数节流
```
const throttle = (func, wait) => {
	let timer;
    return ()=> {
    	if(timer) return;
        timer = setTimeout(() => {
        	func();
            timer = null;
        }, wait)
    } 
}
```
- 函数节流的时间戳简单实现
```
const throttle = (func, wait) => {
	let last = 0;
    return () => {
    	const current_time = +new Date();
        if(current_time - last > wait) {
        	func.apply(this, arguments);
            last = +new Data();
        }
    }
}
```
## 异同比较
<b>相同点</b>
- 都可以使用setTimeout实现
- 目的都是，降低回调执行频率。节省计算资源
<b>不同点</b>
- 函数防抖，在一段连续操作结束后，处理回调，利用clearTimeout和setTimeout实现。函数节流，在一段连续操作中，每段时间只执行一次，频率较高的事件中使用来提升性能
- 函数防抖关注一定事件连续触发，只在最后一次执行。函数节流侧重一段时间内只执行一次