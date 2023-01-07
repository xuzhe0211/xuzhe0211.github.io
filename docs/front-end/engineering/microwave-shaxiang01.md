---
autoGroup-3: 微前端
title: 面试官:请设计一个不能操作DOM和调接口的环境
---
## 实现
1. 利用iframe创建沙箱，取出其中的原生浏览器全局对象作为沙箱的全局对象
2. 设置一个黑名单，若访问黑名单中的变量，则直接报错，实现阻止/隔离的效果
3. 在黑名单中添加document字段，来实现禁止开发者操作DOM
4. 在黑名单中添加XMLHttpRequest、fetch、websocket字段，实现禁用原生的方式调用接口
5. 若访问当前全局对象中不存在变量，则直接报错，实现禁用第三方库调用
6. 最后还要拦截对window对象的访问，防止通过window.document来操作DOM，避免沙箱逃逸

## 如何禁止开发者操作DOM
在页面中，可以通过document对象来获取HTML元素，进行增删改查的DOM操作

如何禁止开发者操作DOM，转化为如何组织开发者获取document对象

1. 传统思路

    简单粗暴点，直接修改window.document的值，让开发者无法获取document
    ```js
    // 将document设置为null
    window.document = null;
    // 设置无效，打印结果还是document
    console.log(window.document)

    // 删除document
    delete window.document

    // 删除无效，打印结果还是document
    console.log(window.document)
    ```
    好吧，document 修改不了也删除不了🤔

    使用 Object.getOwnPropertyDescriptor 查看，会发现 window.document 的 configurable 属性为 false（不可配置的）
    ```js
    Object.getOwnPropertyDescriptor(window, 'document')
    // {get: ƒ, set: undefined, enumerable: true, configurable: false}
    ```
    configurable决定了是否可以修改属性描述对象，也就是说，configurable为false时，value、writable、enumberable和configurable都不能被修改，以及无法被删除

    **此路不通，推到重来**
2. 有点高大上思路

    既然document对象修改不了，那如果环境中原本就没有document对象，是不是就可以实现需求？

    说到环境中没有 document 对象，Web Worker 直呼内行，我曾在[《一文彻底了解Web Worker，十万、百万条数据都是弟弟🔥》](https://juejin.cn/post/7137728629986820126)中聊过如何使用 Web Worker，和对应的特性

    并且 Web Worker 更狠，不但没有 document 对象，连 window 对象也没有😂

    在worker线程中打印window
    ```js
    onmessage = function(e) {
        console.log(window);
        postMessage();
    }
    ```
    浏览器直接报错

    在 Web Worker 线程的运行环境中无法访问 document 对象，这一条符合当前的需求，但是该环境中能获取 XMLHttpRequest 对象，可以发送 ajax 请求，不符合不能调接口的要求

    **此路还是不通……😓**

## 如何禁止开发者调用接口

常规调接口方式有：
1. 原生方式：XMLHttpRequest、fetch、WebSocket、jsonp、form表单
2. 三方实现：axios、jquery、request等众多开源库

禁用原生方式调接口的思路：
1. XMLHttpRequest、fetch、WebSocket 这几种情况，可以禁止用户访问这些对象
2. jsonp、form 这两种方式，需要创建script或form标签，依然可以通过禁止开发者操作DOM的方式解决，不需要单独处理

如何禁用三方库调接口呢？

三方库很多，没办法全部列出来，来进行逐一排除

禁止调接口的路好像也被封死了……😰

## 最终方案：沙箱(sandbox)
<span style="color:red">**沙箱(Sandbox)**是一种安全机制，为运行中的程序提供隔离环境，它会为待执行的程序创建一个独立的执行环境，内部程序的执行不会影响到外部程序的运行</span>

前端沙箱的使用场景：
1. Chrome 浏览器打开的每个页面就是一个沙箱，保证彼此独立互不影响
2. 执行 jsonp 请求回来的字符串时或引入不知名第三方 JS 库时，可能需要创造一个沙箱来执行这些代码
3. Vue 模板表达式的计算是运行在一个沙箱中，模板字符串中的表达式只能获取部分全局对象，详情见源码
4. 微前端框架 qiankun ，为了实现js隔离，在多种场景下均使用了沙箱

## 沙箱的多种实现方式
先聊下[with](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with)关键字:作用在于改变作用域，可以将某个对象添加到作用域链的顶部

**with对于沙箱的意义:可以事先所有变量均来自可靠或自主实现的上下文环境，而不会从全局的执行环境中取值，相当于做了一层拦截，实现隔离的效果**

### 简陋的沙箱
实现这样一个沙箱，要求程序中访问的所有变量，均来自可靠或自主实现的上下文环境，而不会从全局的执行环境中取值

举例子:ctx作为执行上下文对象，待执行程序code可以访问到的变量，必须都来自与ctx对象
```js
// ctx执行上下文对象
const ctx = {
    func: variable => {
        console.log(variable);
    }, 
    foo: 'f1'
}
// 待执行程序
const code = `func(foo)`
```
沙箱实例
```js
// 定义全局变量foo
var foo = 'foo1';

// 执行上下文对象
const ctx = {
    func: variable => {
        console.log(variable);
    },
    foo: 'f1'
}
// 非常简陋的沙箱
function veryPoorSandbox(code, ctx) {
    // 使用with,将eval函数执行时的执行上下文指定为ctx
    with(ctx) {
        eval(code);
    }
}
const code = `func(foo)`;
veryPoorSandbox(code, ctx); 
// 打印结果："f1"，不是最外层的全局变量"foo1"
```
这个沙箱有一个明显的问题，若提供的ctx上下文对象中，没有找到某个变量时，代码仍会沿着作用域链一层层向上查找

假如上文示例中的 ctx 对象没有设置 foo属性，打印的结果还是外层作用域的foo1
### with+proxy实现沙箱
希望沙箱中的代码只在手动提供的上下文对象中查找变量，如果上下文对象中不存在该变量，则提示错误

🌰：ctx作为执行上下文对象，待执行程序code可以访问到的变量，必须都来自于ctx对象，如果ctx对象中不存在该变量，直接报错，不在通过作用域向上查找

实现步骤
1. 使用Proxy.has()来拦截with代码块中的任意变量的访问
2. 设置一个白名单，在白名单内的变量可以正常走作用域链的访问方式，不在白名单内的变量，会继续判断是否存 ctx 对象中，存在则正常访问，不存在则直接报错
3. 使用new Function替代eval，使用 new Function() 运行代码比eval更为好一些，函数的参数提供了清晰的接口来运行代码

[new Function与eval的区别](https://www.jianshu.com/p/db7ec7b51933)
```js
var foo = "foo1";

// 执行上下文对象
const ctx = {
  func: variable => {
    console.log(variable);
  }
};

// 构造一个with来包裹需要执行的代码，返回with代码块的一个函数实例
function withedYourCode(code) {
    code = "width(shadow) {" + code +"}";
    return new Function('shadow', code)
}

// 可访问全局作用域的白名单列表
const access_white_list = ['func'];
// 待执行程序
const code = `func(foo)`

// 执行上下文对象的代理对象
const ctxProxy = new Proxy(ctx, {
    has(target, prop) {
        // has可以拦截with代码块中任意属性的访问
        if(access_white_list.includes(prop)) {
            return target.hasOwnProperty(prop);
        }
        if(!target.hasOwnProperty(prop)) {
            throw new Erro('Not found')
        }
        return true;
    }
})
// 没那么简陋的沙箱
function littlePoorSandbox(code, ctx) {
  // 将 this 指向手动构造的全局代理对象
  withedYourCode(code).call(ctx, ctx); 
}
littlePoorSandbox(code, ctxProxy);
```
### 天然优质沙箱
iframe 标签可以创造一个独立的浏览器原生级别的运行环境，这个环境由浏览器实现了与主环境的隔离

利用 iframe 来实现一个沙箱是目前最方便、简单、安全的方法，可以把 iframe.contentWindow 作为沙箱执行的全局 window 对象

沙箱示例：
```js
// 沙箱全局代理对象类
class SandboxGlobalProxy {
  constructor(sharedState) {
    // 创建一个 iframe 标签，取出其中的原生浏览器全局对象作为沙箱的全局对象
    const iframe = document.createElement("iframe", { url: "about:blank" });
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    
    // sandboxGlobal作为沙箱运行时的全局对象
    const sandboxGlobal = iframe.contentWindow; 

    return new Proxy(sandboxGlobal, {
      has: (target, prop) => {
        // has 可以拦截 with 代码块中任意属性的访问
        if (sharedState.includes(prop)) {
          // 如果属性存在于共享的全局状态中，则让其沿着原型链在外层查找
          return false;
        }
        
        // 如果没有该属性，直接报错
        if (!target.hasOwnProperty(prop)) {
          throw new Error(`Not find: ${prop}!`);
        }
        
        // 属性存在，返回sandboxGlobal中的值
        return true;
      }
    });
  }
}

// 构造一个 with 来包裹需要执行的代码，返回 with 代码块的一个函数实例
function withedYourCode(code) {
  code = "with(sandbox) {" + code + "}";
  return new Function("sandbox", code);
}
function maybeAvailableSandbox(code, ctx) {
  withedYourCode(code).call(ctx, ctx);
}

// 要执行的代码
const code = `
  console.log(history == window.history) // false
  window.abc = 'sandbox'
  Object.prototype.toString = () => {
      console.log('Traped!')
  }
  console.log(window.abc) // sandbox
`;

// sharedGlobal作为与外部执行环境共享的全局对象
// code中获取的history为最外层作用域的history
const sharedGlobal = ["history"]; 

const globalProxy = new SandboxGlobalProxy(sharedGlobal);

maybeAvailableSandbox(code, globalProxy);

// 对外层的window对象没有影响
console.log(window.abc); // undefined
Object.prototype.toString(); // 并没有打印 Traped
```
可以看到，沙箱中对window的所有操作，都没有影响到外层的window，实现了隔离的效果😘
## 最终实现
```js
// 沙箱全局代理对象类
class SandboxGlobalProxy {
  constructor(blacklist) {
    // 创建一个 iframe 标签，取出其中的原生浏览器全局对象作为沙箱的全局对象
    const iframe = document.createElement("iframe", { url: "about:blank" });
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    // 获取当前HTMLIFrameElement的Window对象
    const sandboxGlobal = iframe.contentWindow;

    return new Proxy(sandboxGlobal, {
      // has 可以拦截 with 代码块中任意属性的访问
      has: (target, prop) => {

        // 黑名单中的变量禁止访问
        if (blacklist.includes(prop)) {
          throw new Error(`Can't use: ${prop}!`);
        }
        // sandboxGlobal对象上不存在的属性，直接报错，实现禁用三方库调接口
        if (!target.hasOwnProperty(prop)) {
          throw new Error(`Not find: ${prop}!`);
        }

        // 返回true，获取当前提供上下文对象中的变量；如果返回false，会继续向上层作用域链中查找
        return true;
      }
    });
  }
}

// 使用with关键字，来改变作用域
function withedYourCode(code) {
  code = "with(sandbox) {" + code + "}";
  return new Function("sandbox", code);
}

// 将指定的上下文对象，添加到待执行代码作用域的顶部
function makeSandbox(code, ctx) {
  withedYourCode(code).call(ctx, ctx);
}

// 待执行的代码code，获取document对象
const code = `console.log(document)`;

// 设置黑名单
// 经过小伙伴的指导，新添加Image字段，禁止使用new Image来调接口
const blacklist = ['window', 'document', 'XMLHttpRequest', 'fetch', 'WebSocket', 'Image'];

// 将globalProxy对象，添加到新环境作用域链的顶部
const globalProxy = new SandboxGlobalProxy(blacklist);

makeSandbox(code, globalProxy);
```
## 持续优化
经过与评论区小伙伴的交流，可以通过 new Image() 调接口，确实是个漏洞
```js
// 不需要创建DOM 发送图片请求
let img = new Image();
img.src= "http://www.test.com/img.gif";
```
黑名单中添加'Image'字段，堵上这个漏洞。如果还有其他漏洞，欢迎交流讨论💕

## 资料
[面试官:请设计一个不能操作DOM和调接口的环境](https://juejin.cn/post/7157570429928865828)