---
autoGroup-5: JS名词理解
title: 流文件下载
---

## GET接口返回流文件内容前端需要自定义名字

```js
aysnc download() {
	const blodFile = await downloadAjax('/v1/file?fileType=0');
    const a = document.createElement('a');
    a.download = 'logs.tar.gz';
    a.href = blodFile;
    a.click();
}
```

## 如果使用post请求下载文件流

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