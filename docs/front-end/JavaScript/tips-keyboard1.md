---
autoGroup-16: Tips/方法实现
title: 前端怎么监听手机键盘是否弹起
---

在移动端开发经常会遇到一些交互需要通过判断手机键盘是否被换起来做的，说到判断手机键盘弹起和收起，有遇到过的同学，应该都知道，安卓和IOS判断手机键盘是否弹起的写法是有所不同的

- IOS可以通过 foucusin focusout 这两个事件监听

    ```js
    window.addEventListener('focusin', () => {
        // 键盘弹出事件处理
        alert('ios键盘弹出事件处理');
    })
    window.addEventListener('focusout', () => {
        // 键盘收起事件处理
        alert('ios键盘收起事件处理')
    })
    ```
- 安卓只能通过 resize 来判断屏幕大小是否发生变化来判断

    <span style="color: red">**由于某些Android 手机收起键盘，输入框不会失去焦点，所以不能通过聚焦和失焦事件来判断**</span>.但由于窗口会变化，所以可以通过监听窗口高度的变化来间接监听键盘的弹起和收回。
    ```js
    const innerHeight = window.innerHeight;
    window.addEventListener('resize', () => {
        const newInnerHeight = window.innerHeight;
        if(innerHeight > newInnerHeight) {
            // 键盘弹出事件处理
            alert('android 键盘弹出事件')
        } else {
            // 键盘收起事件处理
            alert('android 键盘收起事件处理')
        }
    })
    ```
- 因为ios和安卓的处理不一样，所以还需要判断系统的代码

    ```js
    const ua = typeof window === 'object' ? window.navigator.userAgent : '';

    let _isIOS = -1;
    let _isAndroid = -1;

    export function isIOS() {
        if(_isIOS === -1) {
            _isIOS = /iPhone|iPhod|iPad/i.test(ua) : 1 : 0
        } 
        return _isIOS === 1
    }
    export function isAndroid() {
        if (_isAndroid === -1) {
            _isAndroid = /Android/i.test(ua) ? 1 : 0;
        }
        return _isAndroid === 1;
    }
    ```
## 使用
```html
<template>
    <form class="keyboard-box" v-keyboard:keyboardFn>
      <!-- 输入任意文本 -->
      <van-field v-model="text" label="文本" />
      <!-- 输入手机号，调起手机号键盘 -->
      <van-field v-model="tel" type="tel" label="手机号" />
      <!-- 允许输入正整数，调起纯数字键盘 -->
      <van-field v-model="digit" type="digit" label="整数" />
      <!-- 允许输入数字，调起带符号的纯数字键盘 -->
      <van-field v-model="number" type="number" label="数字" /> 
      <van-field v-model="textarea" type="textarea" label="textarea" />
      <!-- 输入密码 -->
      <van-field v-model="password" type="password" label="密码" />
      <van-radio-group v-model="radio" direction="horizontal" class="radio-group">
        <van-radio name="1">单选框 1</van-radio>
        <van-radio name="2">单选框 2</van-radio>
      </van-radio-group>
    </form>
</template>
<script>
import keyboard from './keyboard'
export default {
  directives: { keyboard },
  data() {
    return {
      text: '',
      tel: '',
      digit: '',
      number: '',
      password: '',
      textarea: '',
      radio: '1'
    }
  },
  methods: {
    keyboardFn(val) {
      this.$toast(val ? '键盘弹起来了' : '键盘收起了')
    }
  }
}
</script>
```
## 问题
1. 复选框、单选框的点击也会导致 focusin 和 focusout 的触发,我们需要处理一下，使其点击复选框、单选框这类的标签不触发我们的回调函数

    ```js
    // 主要通过判断一下当前被focus的dom类型
    // document.activeElement.tagName
    // tagName 为输入框的时候才算触发键盘弹起
    const activeDom = document.activeElement.tagName;
    if(!['INPUT', 'TEXTAREA'].includes(activeDom)) {
        console.log('只有')
    }
    ```
2. 当有横屏功能的时候，resize也会被触发

    增加宽度是否有改变的判断,没有改变，才是真正的键盘弹起
    ```js
    // 初始化的时候获取一次原始数据
    const originWidth = document.documentElement.clientWidth || document.body.clientWidth;
    // 结合处理复选框、单选框的点击也会导致 focusin 和 focusout的触发问题完整回调写法
    function callbackHook(cb) {
        const resizeWidth = document.documentElement.clientWidth || document.body.clientWidth;
        const activeDom = document.activeElement.tagName;
        if(resizeWeight !== originWidth || !['INPUT', 'TEXTAREA'].includes(activeDom)) {
            return isFocus = false;
        }
        cb & cb();
    }
    ```
3. 怎么传入回调函数，灵活使用

    v-指定: fn传入函数，在指令里通过执行会对奥的时候传出参数，来区分是键盘弹起还是收起
    ```js
    // 绑定指令的同时传入回调函数
    v-keyboard:keyboardFn

    methods: {
        keyboardFn(val) {
            // val true键盘弹起 false 键盘收起
            this.$toast(val ? '键盘弹起来了' : '键盘收起了')
        }
    }
    ```

## 源码
```js
const ua = navigator.userAgent
const isAndroid = /(Android);?[\s/]+([\d.]+)?(.*Mobile)/.test(ua)

const originHeight = document.documentElement.clientHeight || document.body.clientHeight
const originWidth = document.documentElement.clientWidth || document.body.clientWidth
let isFocus = false
function callbackHook(cb) {
  const resizeWeight = document.documentElement.clientWidth || document.body.clientWidth
  const activeDom = document.activeElement.tagName
  if(resizeWeight !== originWidth || !['INPUT', 'TEXTAREA'].includes(activeDom)) return isFocus = false
  cb && cb()
}
const keyBoard = {
  inserted(el, binding, vnode) {
    let context = vnode.context
    el.resizeFn = () => {
      const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight
      callbackHook(()=> {
        if (resizeHeight < originHeight) {
          context[binding.arg](true)
          isFocus = true
        } else {
          isFocus = false
          context[binding.arg](false)
        }
      })
    }
    if (isAndroid) {
      window.addEventListener('resize', el.resizeFn)
    }

    el.handlerFocusin = () => {
      callbackHook(()=> {
        isFocus = true
        context[binding.arg](true)
      })
      if (isAndroid) {
        setTimeout(() => {
          el.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
          })
        }, 100)
      }
    }
    el.handlerFocusout = () => {
      if(isFocus) context[binding.arg](false)
    }
    el.addEventListener('focusin', el.handlerFocusin)
    el.addEventListener('focusout', el.handlerFocusout)
  },
  unbind(el) {
    window.removeEventListener('resize', el.resizeFn)
    el.removeEventListener('focusin', el.handlerFocusin)
    el.removeEventListener('focusout', el.handlerFocusout)
  },
}

export default keyBoard
```
```html
<template>
    <div class="keyboard-box" v-keyboard:keyboardFn>
      <!-- 输入任意文本 -->
      <van-field v-model="text" label="文本" placeholder="请输入" />
      <!-- 输入手机号，调起手机号键盘 -->
      <van-field v-model="tel" type="tel" label="手机号" placeholder="请输入" />
      <!-- 允许输入正整数，调起纯数字键盘 -->
      <van-field v-model="digit" type="digit" label="整数" placeholder="请输入" />
      <!-- 允许输入数字，调起带符号的纯数字键盘 -->
      <van-field v-model="number" type="number" label="数字" placeholder="请输入" /> 
      <van-field v-model="textarea" type="textarea" label="textarea" placeholder="请输入" />
      <!-- 输入密码 -->
      <van-field v-model="password" type="password" label="密码" placeholder="请输入" />
      <van-radio-group v-model="radio" direction="horizontal" class="radio-group">
        <van-radio name="1">单选框 1</van-radio>
        <van-radio name="2">单选框 2</van-radio>
      </van-radio-group>
    </div>
</template>

<script>
import keyboard from './keyboard'
export default {
  directives: { keyboard },
  data() {
    return {
      text: '',
      tel: '',
      digit: '',
      number: '',
      password: '',
      textarea: '',
      radio: '1'
    }
  },
  methods: {
    keyboardFn(val) {
      this.$toast(val ? '键盘弹起来了' : '键盘收起了')
    }
  }
}
</script>
<style scoped>
.keyboard-box {
  background: #ffffff;
}
.radio-group {
  padding: 0 14px;
  height: 44px;
}
</style>
```
