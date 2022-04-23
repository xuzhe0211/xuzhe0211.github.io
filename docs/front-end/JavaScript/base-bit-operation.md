---
autoGroup-0: 基础知识
title: 位运算
---
## 互相转换
- 十进制转二进制
    ```javascript
    var num = 10
    console.log(num.tostring(2));
    ```
- 二进制转十进制
    ```javascript
    var num = 1100100;
    console.log(parseInt(num, 2))
    ```
- 其他
    ```javascript
    parseInt(num, 8); // 8进制转10进制
    parseInt(num, 16); // 十六禁止转十进制
    num.toString(8); // 十进制转八进制
    num.toString(16); // 十进制转十六进制
    parseInt(num, 2).toString(8); // 二进制转八进制
    ```
## 位运算
### & 按位与
a&b 对于每一个比特位，只有操作位响应的比特位都是1时，结果是1 否认为0
```
1 的二进制00001
3 的二进制00011
根据&的规则结果为 00001 十进制表示1
```
### | 按位或
<u>|</u> 运算符跟 <u>&</u>的区别在于如果对应的位中任意操作位为1，那么结果为1
```
1 的二进制00001
3 的二进制00011
根据|的规则结果为 00011 十进制表示3
```

### ^按位异或

<span style="color: blue">^</span>运算符跟<span style="color: blue">|</span>类似，但是有一点不同的是，如果两个操作位都为1，结果产生0

```
1 的二进制00001
3 的二进制00011

根据^的规则结果为 00010 十进制表示2

1^3 = 2
```
:::tip
两个相同的数异或为0
:::

### ~按位非
按位非，就是要求二进制反码 0变成1 1变成0

### 有符号的左移 <<
有符号左移会将32位二进制数 所有位向左移动指定位数
```javascript
var num = 2; // 二进制00010
num = num << 5 // 二进制10000 00 二进制64

function power(n) {
    return 1 << n
}
power(5) // 32 十进制2的5次方
```

### 有符号的右移 >>
```javascript
var num = 64 // 1000000
num = num >> 5 // 0000010 二进制为2
```

### 无符号的右移 >>>
正数的无符号右移与有符号的右移结果是一样的，负数的无符号右移会把符号一起移动，而且无符号右移会把负数的二进制码当成正数的二进制码
```javascript
var num = -64;
num = num >>> 5 // 134217726
```

## 位运算妙用
- ^ 是异或运算，相同取0，不同取1
    ```javascript
    let a = 10; b = 20;
    a^ = b;
    b^ = a 
    a ^ b 
    // 两个证书交换
    ```
- 奇偶数

    ```javascript
    偶数 & 1 = 0;
    奇数 & 1 = 1;
    ```
- 给定一个非空数组，除了某个元素之出现一次以外，其余每个元素均出现的二次，找出只出现一次的元素

    ```javascript
    // [2,2,1] 输出 1
    const singNumber = function(nums) {
        return nums.reduce((prev, cur) => {
            return prev ^ cur;
        }, 0)
    }
    ```

