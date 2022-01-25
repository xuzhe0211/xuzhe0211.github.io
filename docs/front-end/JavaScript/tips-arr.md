---
autoGroup-16: Tips/方法实现
title: js一维数组转换成二维数组
---

```
function arrTrans(num, arr) { // 一维数组转换成二维数组
    const iconsArr = []; // 声明数组
    arr.forEach((item, index) => {
        const page = Math.floor(index / num); // 计算该元素为第几个数组内
        if(!iconsArr[page]) { // 判断是否存在
            iconsArr[page] = [];
        }
        iconsArr[page].push(item);
    })
}

// 使用方法
arrTrans(num, arr) //num个数  arr数组
```