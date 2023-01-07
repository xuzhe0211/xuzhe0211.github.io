---
autoGroup-16: Tips/方法实现
title: js浮点数加减乘除
---
```js
/**
 * 加法函数，用来得到精确的加法结果
 * 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果
 * 调用:accAdd(num1, num2);
 * 返回值:num1加上num2的精确结果
**/
Common.accAdd = function(num1, num2) {
    var r1, r2, m, c;
    try {
        r1 = num1.toString().split('.')[1].length;
    } catch(e) {
        r1 = 0;
    }
    try {
        r2 = num2.toString().split('.')[1].length;
    } catch(e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if(c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            num1 = Number(num1.toString().replace(".", ""));
            num2 = Number(num2.toString().replace(".", "")) * cm;
        } else {
            num1 = Number(num1.toString().replace(".", "")) * cm;
            num2 = Number(num2.toString().replace(".", ""));
        }
    } else {
        num1 = Number(num1.toString().replace('.', ''));
        num2 = Number(num2.toString().replace('.', ''));
    }
    return (num1 + num2) / m;
}

/**
 * 减法函数，用到得到精确的减法结果
 * 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果
 * 调用: accSum(num1, num2);
 * 返回值:num1减去num2的精确结果
 **/
Common.accSub = function(num1, num2) {
    var r1, r2, m, n;
    try {
        r1 = num1.toString().split('.')[1].length;
    } catch(e) {
        r1 = 0;
    }
    try {
        r2 = num2.toString().split('.')[1].length;
    } catch(e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((num1 * m - num2 * m) / m).toFixed(n)
}

/**
 * 乘法函数，用来得到精确的乘法结果
 * 说明:javascript的乘法结果会有误差，在两个浮点数相城的时候会比较明显。这个函数返回较为精确的乘法
 * 调用：accMul(num1, num2)
 **/
Common.accMul = function(num1, num2) {
    var m = 0, s1 = num1.toString(), s2 = num2.toString();
    try {
        m += s1.split('.')[1].length;
    } catch(e) {}
    try {
        m += s2.split('.')[1].length;
    } catch(e) {}
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
}


/**
 * 除法函数
 **/
Common.accDiv = function(num1, num2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = num1.toString().split('.')[1].length;
    } catch(e) {}
    try {
        t2 = num2.toString().split('.')[1].length;
    } catch(e) {}
    with(Math) {
        r1 = Number(num1.toString().replace('.', ''))
        r2 = Number(num2.toString().replace(".", ""))
        return (t1 / r2) * pow(10, t2 - t1)
    }
}
```

## 资料
[js浮点数加减乘除](https://zhuanlan.zhihu.com/p/388205996)

[js浮点数乘除](https://www.cnblogs.com/xwwin/p/4738199.html)