---
autoGroup-0: 概念
title: 递归
---
:::tip
递归只要找对递归边界和递归条件(也可以传入引入类型 不设置递归边界)
:::
1. 一个问题的解可以分解为多个及问题的解
2. 这个问题和分解之后的子问题，除了数据规模不同，求解思路完全一样
3. 存在基线/终止条件

一般情况下递归可以用迭代循环实现
## 1-100的和
- 正常for循环
    ```js
    let result  = 0;
    for (let i = 0; i <= 100; i++) {
        result += i;
    }
    console.log(result)
    ```
- 递归
    ```js
    // 方法一
    function add(sum, num) {
        sum += num;
        num++;
        if(num > 100) {
            return sum;
        } else {
            return add(sum, num)
        }
    }
    console.log(add(0, 1))

    // 方法二--奇怪思路--少考虑 设置上边界
    function add(num) {
        if (num === 100) return num;
        return num + add(num + 1)
    }
    add(0) // 5050

    //方法三--- 设置下边界 ---一般思考是这种
    function add(n) {
        if (n == 1) return 1;
        return n + add(n - 1)
    }
    console.log(add(100))
    ```
- 尾递归
    ```js
    function add(num, total) {
        if (num > 100) return total;
        return add(num + 1, num + total)
    }
    const sum = add(1, 0)
    console.log(sum)
    ```
[参考](/front-end/Code/complexity-01.html#思考题解答)

## 乘积
- 普通递归
    ```js
    function fac(n){
        if (n === 1) return 1;
        return n*fac(n - 1)
    }
    ```
    <span style="color: red">函数调用会产生"调用记录"存放栈中，当有函数返回，对应的调用记录才会小时，上述用普通调用执行中，不断调用吱声导致一直没有返回，这样就不断的在栈中存储调用，多次删除溢出</span>
- 尾调用
    ```js
    function fac(n, total) {
        if (n == 1) return total;
        return fac(n - 1, n * total)
    }
    ```
    <span style="color: red">永远只有一个调用记录，调用函数成熟一个调用记录，最后一部操作 return fac(n - 1, n * total)把当前函数计算结果当做参数传递给下一个自身调用，这样一个函数调用记录就小时了，因此执行完了不会溢出</span>