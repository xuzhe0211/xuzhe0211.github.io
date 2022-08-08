---
title: 检测一个数字是否是无穷大
---

```js
// 第一种
const isInfinity = number => {
    if(typeof number === 'number' && number.toString() === 'Infinity') {
        return true;
    }
    return false;
}
// 第二种
if(result === Number.POSITIVE_INFINITY || result === Number.NEGATIVE_INFINITY) {
    return true
}

if(isInfinity(result)) {
    // ....
}

// 第三种
functio isInfinity(n) {
    return n === n / 0;
}
// 请注意，本机isFinite()强制输入数字。isFinite([])和isFinite(null)两者都是true。
```


## 资料
[检测一个数字是否是无穷大](https://qastack.cn/programming/4724555/how-do-i-check-if-a-number-evaluates-to-infinity)