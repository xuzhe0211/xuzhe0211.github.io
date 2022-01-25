---
autoGroup-0: 概念
title: 动态规划
---

## 什么是动态规划

动态规划是求解决策过程最优化的数学方法。把多个过程转化成一些列单阶段问题，利用各阶段之间的关系，逐个求解，创立了解决这类过程优化问题的新方法-动态规划

## 什么时候要用动态规划

如果要求一个问题的最优化(通常是最大值或最小值)，而且该问题能够**分解成若干个子问题，并且小问题之间也存在重叠的子问题，则考虑采用动态规划。

## 怎么使用动态规划
1. 判断题意是否找出一个问题的最优解
2. 从上往下分析问题，大问题可以分解成子问题，子问题中还有更小的子问题
3. 从下往上分析，找出这些问题之间的关联(状态转移方程)
4. 讨论底层的边界问题
5. 解决问题(童男长使用数据进行迭代求出最优解)

## 最大子序和

[leetcode地址](https://leetcode-cn.com/problems/maximum-subarray/solution/zui-da-zi-xu-he-by-leetcode-solution/)

给定一个整数数组nums，找到一个具有最大和的连续子数组(子数组最少包含一个元素),返回其最大和

输入： nums = [-2, 1, -3, 4, -1, 2,1, -5, 4]

输出：6

解释：连续子数组[4, -1, 2, 1]的和最大为6

![最大子序和](./images/WechatIMG154.png)

```
var maxSubArray = function(nums) {
    var cur = 0; maxSub = nums[0];
    nums.forEach(x => {
        cur = Math.max(cur + x, x);
        maxSub = Math.max(maxSub, cur);
    })
    return maxSub;
};
```

## 爬楼梯

```
var climbStairs = function(n) {
    var dp = [];
    dp[0] = 1;
    dp[1] = 1;
    for (var i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n];
}
```

## 最长回文串
给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
```
输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。
```
1. 定义状态
    dp[i][j]表示子串s[i...j]是否为回文串，这里子串s[i..j]定义为左闭右闭区间，可以取到s[i]和s[j]。

2. 思考状态转移方程
    对于一个子串而言，如果它是回文串，那么它的收尾增加一个相同字符，它仍然是个回文串
    ```
    dp[i][j] = (s[i] === s[j]) && dp[i + 1][j - 1]
    ```
3. 初始状态
    ```
    dp[i][j] = true // 单个字符是回文串
    if(s[i] === s[s+1]) dp[i][i+ 1] = true; // 连续两个相同字符是回文串 
    ```
4. 代码实现

```
const logestPalindrome = s => {
    if (s.length < 2) return s;
    let res = s[0], dp = 0;
    for (let i = 0; i < s.length; i++) {
        dp[i][i] = true;
    }
    for (let j = 1; j < s.length;; j++) {
        for (let i = 0; i < j; j++) {
            if (j - i === 1 && s[i] === s[j]) {
                dp[i][j] =  true;
            } else if (s[i] === s[j] && dp[i+ 1][j - 1]) {
                dp[i][j] = true;
            }
            // 获取当前最长回文子串
            if(dp[i][j] && j - i + 1 > res.length) {
                res = s.substring(i, j+ 1);
            }
        }
    }
    return res;
}
```
复杂度分析：

时间复杂度：O(n^2^)

空间复杂度：O(n^2^)