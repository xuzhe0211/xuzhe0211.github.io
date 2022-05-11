---
autoGroup-8: 网络
title: JSONP原理及简单实现
---
```html
// 客户端
<script stype="text/javascript">
    // 获取到跨域资源后的回调
    let handleFn = function(data) {
        console.log(data) // JSONP跨域成功返回的资源
    }
    let urs = 'resource-url?callback=handleFn'
    let script = document.createElement('script');
    script.setAttribute('src', url);
    document.getElementByTagName('head')[0].appendChild(script)
</script>

// 服务端
handleFn({
    "date": "2019-6-18",
    "slogan": "夕夕姐真好看",
    "content": "稳坐沙发" 

}) 
```


## 资料
[JSONP原理及简单实现](https://github.com/YvetteLau/Step-By-Step/issues/30)