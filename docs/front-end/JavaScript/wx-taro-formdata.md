---
autoGroup-17: 小程序
title: Taro上传formdata文件，兼容微信小程序
---
## 缘由
因为微信小程序默认是不支持 formdata 的文件格式,所以之前项目中的图片上传功能就没办法通用，因为是将图片文件转为formdata的格式，在上传到后端；但是又不能为了微信小程序一端就去修改后端接口，但是新增个后端接口的又麻烦。

最后经历多方查找与实现，发现了 taro 里面提供了 uploadFile 这个函数可以完美解决这个问题，在图片提交的时候，对是哪一段用 process.env.TARO_ENV  来进行判断，分别执行不同的提交文件逻辑，h5端的话就使用原来的web端代码，将文件转为formdata格式，提交给到后端接口；如果为微信小程序的格式的话，则就使用taro里面的uploadFile，直接请求后端接口，不走统一封装的请求函数，需要注意的是，需要将请求头中的内容类型设置为multipart/form-data才有效，然后name就是和web端的append里面设置文件名是一样的，需要记得的是，因为是不经过统一封装的请求函数，所以需要单独配置token；

```js
const submitFn = async () => {
    if (files.length > 0) {
        try {
            if (process.env.TARO_ENV === "h5") {
                const fd = new FormData();
                fd.append("avatar", (files[0] as any).file.originalFileObj);
                await uploadAvatarAPI(fd);
                avatarSuccess();
            }
            if (process.env.TARO_ENV === "weapp") {
                const img = (files[0] as any).url; // 此处将文件临时路径存储到img中
                Taro.uploadFile({
                url: process.env.BASE_ENV + "/user/profile/avatar",
                filePath: img, // 此处防止文件的路径
                name: "avatar", // 后端根据key拿取存储的文件
                header: {
                    "Content-Type": "multipart/form-data", // 此处需要设置为"multipart/form-data"格式
                    Authorization: `Bearer ${token}`,
                },
                success: function () {
                    avatarSuccess();
                },
                });
            }
        } catch (error) {}

        async function avatarSuccess() {
            const res = await getUserAPI();
            setUserInfo(res.data.result);
            Taro.showToast({ title: "图片修改成功", icon: "success" });
            setTimeout(() => {
                Taro.switchTab({
                url: "/pages/main/my/index",
                });
            }, 300);
        }
    }
};
```
[在小程序中使用formdata上传数据，可实现多文件上传](https://github.com/zlyboy/wx-formdata)