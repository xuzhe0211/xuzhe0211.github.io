---
title: 前端页面异常监控
---

## 页面异常分类
- Javascript异常(语法错误、运行时错误、跨域脚本)
- 资源加载异常(img、js、css)
- ajax异常
- promise异常
- vue项目中全局异常捕获

## 前端异常捕获方式
- window.onerror捕获javascript异常
    ```
    window.onerror = function(message, source, lieno,colno, error) {
        console.log('捕获到异常:', {messge, source, lineno, colno, error})
    }
    ```

- 跨域脚本异常捕获
    一般涉及到跨域的js运行错误时会抛出错误提示script error.但没有具体信息(如出错文件，行列号提示等)，可利用资源共享策略来捕获跨域js错误
   
    客户端：在script标签中增加crossorigin="anonymous"属性

    服务端：静态资源响应头Access-Control-Allow-Origin: *

    window.addEventListener('error', cb, true)捕获资源加载异常

    img加载异常会触发img.onerror函数
    ```
    window.addEventListener('error', function(e) {
        const err = e.target.src || target.href
        if (err) {
            console.log('捕获到资源加载异常')
        }
    }, true)
    ```
    ajax接口请求异常捕获
    ```
    // 同意拦截ajax请求
    function ajaxEventTrigger(event) {
        var ajaxEvent = new CustomEvent(event, {detail: this});
        window.dispatchEvent(ajaxEvent);
    }
    var oldXHR = window.XMLHttpRequest;
    functon new XHR() {
        var realXHR = new oldXHR();
        realXHR.addEventListener('readstatechagne', function() {
            ajaxEventTrigger.call(this, 'ajaxReadyStateChange') 
        }, false)
        return realXHR;
    }
    window.XMLHttpRequest = new XHR;
    var startTime = 0;
    var gapTime = 0 // 计算请求延迟
    window.addEventListener('ajaxReadyStateChange', function(e) {
        vaar xhr = e.detail;
        var status = xhr.status;
        var readyState = xhr.readyState;
        /**
        * 计算请求延时
        */
        if (readyState === 1) {
            startTime = (new Date()).getTime()
        }
        if (readyState === 4) {
            gapTime = (new Date()).getTime() - startTime
        }
        /**
        * 上报请求信息
        */
        if (readyState === 4) {
            if(status === 200){
                // 接口正常响应时捕获接口响应耗时
                console.log('接口',xhr.responseURL,'耗时',gapTime)
            }else{
                // 接口异常时捕获异常接口及状态码
                console.log('异常接口',xhr.responseURL,'状态码',status)
            }
        }
    })
    ```
- promise 异常捕获
    promise中报错顺序：如果有catch等捕获函数，则走catch捕获函数。catch捕获函数如果没有抛出新的异常，则下一个then将会认为没有什么报错，会继续执行

    如果没有catch等捕获函数，我们需要注册window.addEventListener('unhandlerejection')处理
    ```
    /**
    * Promise catch错误上报，需要在使用promise的地方显示调用.catch()，否则不会捕获错误
    */
    if (typeof Promise !== 'undefined') {
        var _promiseCatch = Promise.prototype.catch
        Promise.prototype.catch = function (foo) {
            return _promiseCatch.call(this, catCatch(foo))
        }
    }
    function catCatch (foo) {
        return function (args) {
            let msg = args.stack ? args.stack : args
            console.log('捕获到catch中的异常',msg)
            foo && foo.call(this, args)
        }
    }

    /**
    * 监听promise未处理的reject错误, 跨域情况下监控不到
    */
    window.addEventListener('unhandledrejection', event => {
        console.log('捕获到未处理的promise异常',event.reson)
    })
    ```
- vue项目全局异常捕获
    ```
    Vue.confit.errorHandler = function(err, vm, info) {
        // 只在2.2.0+可用
        let msg = `错误发生在${info}中，具体信息：${err.stack}`;
        console.log(msg)
    }
    ```
捕获到这些异常后我们需要将这些异常上报给服务器，我们直接以请求图片的形式发送上报内容

## 异常上报
```
function report(msg) {
    var reportURL = 'http://xxx/report';
    new Image().src = reportURL + encodeURIComponent(JSON.stringify(msg));
}
```

## 资料
[前端异常分析](https://www.cnblogs.com/jesse131/p/12179106.html)

[前端代码异常日志收集](https://www.cnblogs.com/hustskyking/p/fe-monitor.html)