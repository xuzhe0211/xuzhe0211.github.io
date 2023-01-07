---
autoGroup-5: JS名词理解
title: 流文件上传/下载
---
## 上传
其实无论是原生JS还是xhr，还是jq的ajax，还是axios的异步都提供了一个获取上传进度的API，首先我们来看一下原生js如何获取上传进度。下面的示例代码中，异步上传均采用formData的形式来上传

### 原生JS获取上传进度
```js
var fd = new FormData();
fd.append('file', document.getElementById('testFile').files[0]);
var xhr = new XMLHttpRequest();
xhr.upload.addEventListener('progress', uploadProgress, false);
xhr.addEventListener('load', uploadComplete, false);
xhr.addEventListener('error', uploadFailed, false);
xhr.addEventListener('abort', uploadCanceled, false);

function uploadProgress(evt) {
    if(evt.lengthComputable) {
        var percent = Math.round(evt.loaded * 100 / evt.total);
        document.getElementById('progress').innerHTML = percent.toFixed(2) + '%';// 设置进度显示百分比
        document.getElementById('progress').style.width = percent.toFixed(2) + '%';// 设置完成的进度条宽度
    } else {
        document.getElementById('progress').innerHTML = 'unable to compute';
    }
}
```
### JQ获取上传进度
jq并没有直接提供uplodaProgress方法,但是它提供了一个xhr参数，使用方法如下
```js
var fd = new FormData();
fd.append('file', document.getElementById('testFile').files[0]);
$.ajax({
    url: 'http://127.0.0.1:3003/useasync/uploadFile',
    type: 'POST',
    contentType: 'multipart/form-data',
    data: fd,
    xhr: function() {
        myXhr = $.ajaxSetting.xhr();
        if(myXhr.upload) {
            myXhr.upload.addEventListener('progress', function(e) {
                var loaded = e.loaded; // 已经上传大小情况
                var tot = e.total; // 附件总大小
                var per = Math.floor(100 * loaded / tot).toFixed(2); 
                $('#progress').html(per + '%'); // 设置进度显示百分比
                $('#progress').css('width', per + '%');
            }, false)
        } else {
            return myXhr;
        }
    }, 
    success: function(data) {
        console.log(data);
        console.log('上传成功!!!')
    },
    error: function() {
        console.log('上传失败')
    }
})
```
### axios获取上传进度
在axios中提供了一个参数onUploadProgress,有了这个参数就可以很方便的获取上传进度了，其方法实现还是和原生JS的一样，这个参数其实就是注册一个监听事件
```js
var fd = new FormData();
fd.append('file', document.getElementById('testFile').files[0]);
axios({
    method: 'post',
    url: 'http://127.0.0.1:3003/useasync/uploadFile',
    data: fd,
    onUploadProgress: this.uploadProgress,
}).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err)
})

uploadProgress(evt) {
    if(evt.lengthComputable) {
        var percent = Math.round(evt.loaded * 100 / evt.total);
        document.getElementById('progress').innerHTML = percent.toFixed(2) + '%';//设置进度显示百分比
        document.getElementById('progress').style.width = percent.toFixed(2) + '%';//设置完成的进度条宽度
    } else {
        document.getElementById('progress').innerHTML = 'unable to compute'
    }
}
```

如此，三种实现异步上传文件的进度条方法已经说完了，至于页面显示上其实就是两个div嵌套了，id为progress的进度，不断改变宽度，直至100%。

[js文件异步上传进度条](https://juejin.cn/post/6844903776654999566)
## 下载
### GET接口返回流文件内容前端需要自定义名字

```js
aysnc download() {
	const blodFile = await downloadAjax('/v1/file?fileType=0');
    const a = document.createElement('a');
    a.download = 'logs.tar.gz';
    a.href = blodFile;
    a.click();
}
```

### 如果使用post请求下载文件流

1. 接口

接口地址： /file/download/${id}

前端请求这里要注意(重点)设置responseType: 'blob'.

```js
import {axios} from '../../config';
import {BaseURL} from '@/serviceConfig';

// 附件下载
export const download = id => axios({
	method:'post',
    url: `${BaseURL}/file/download/${id}`,
    responseType: 'blob'
})
```
然后请求回来的结果是blob
```js
async downloadDoc(id) {
	let res = await download(id);
    let blob = res.data;
    let url = window.URL.createObjectURL(blob);
    let elelink = document.createElement('a');
    elelink.href = url;
    elelink.download = name;
    document.boduy.appendClild(elelink);
    elelink.click();
    window.URL.revokeObjectURL(url);
}
```
2. 拓展

不常用的方法：window.URL.createObjectURL(blob) 和window.URL.revokeObjectURL(url).

window.URL.createObjectURL(blob);

[mdn文档]( https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL)

每次你调用window.URL.createObjectURL(),就会长生一个唯一的对象URL

```
blob:http://xxxxx<文件地址>
```
获得这个地址之后，就会开启下载任务

window.URL.revokeObjectUrl(url);

当文档关闭时，他们会自动被释放。如果你的网页要动态使用他们，你需要显式调用window.URL.revokeObjectURL()来释放他们。