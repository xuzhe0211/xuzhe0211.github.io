---
autoGroup-0: 概念
title: 动态规划--背包问题
---
## 前言
**背包问题是一类经典的算法问题，属于动态规划解法范畴,其核心是在一个范围内选择出最优解。**

一般描述为:给定一组物品和一个背包，每种物品都有自己的重量和价格，在背包限定的总重量内，我们如何选择，才能使得物品的总价格最高

## 非完全背包
如下面的背包基础问题

- 描述

    有若干物品和一个大小为m的背包，给定数组A表示物品的大小和数组V表述每个物品的价值

    问最多能装入背包的总价值是多大？
- 样例1
    ```js
    // 输入
    m = 10
    A = [2,3,5,7]
    V = [1,5,2,4]
    // 输出9
    ```
    装入A[1]和A[3]可以得到最大价值,V[1]+V[3] = 9;
- 样例2

    ```js
    // 输入
    m = 10
    A = [2,3 8]
    V = [2,5,8]
    // 输出10
    ```
    装入A[0]和A[2]可以得到最大价值，V[0]+V[2] = 10;
### 解法
```js
const backPack = function(m, A, V) {
    var dp = new Array(m + 1).fill(0); // 动态规划数组,初始值为0， 即没有任何物品，价值为0
    // 外层循环物品
    for(let i = 0; i < A.length; i++) {
        // 内层循环背包，倒序避免重复
        for(let j = m; j >= 0; j--) {
            if(j - A[i] >= 0) {
                // dp[j]表示公式里面的A(Y),V[i]表示pj，A[i]表示wj
                dp[j] = Math.max(dp[j], dp[j - A[i]] + V[i])
            }
        }
    }
    return dp[m]
}
```

## 完全背包
- 描述

    给定若干中物品，每种物品都有无限个，第i个物品的体积为A[i],价值为V[i],在给定一个容量为m的背包，问可以装入背包的最大价值是什么？

- 样例1
    ```js
    输入: A = [2, 3, 5, 7], V = [1, 5, 2, 4], m = 10
    输出: 15
    解释: 装入三个物品 1 (A[1] = 3, V[1] = 5), 总价值 15.
    ```
- 样例2 
    ```js
    输入: A = [1, 2, 3], V = [1, 2, 3], m = 5
    输出: 5
    解释: 策略不唯一. 比如, 装入五个物品 0 (A[0] = 1, V[0] = 1).
    ```
### 解法
```js
const backPack = (m, A, V) => {
    let dp = new Array(m + 1).fill(0); // 动态规划数组，初始化值为0，即没有任何物品，价值为0
    // 外层循环背包
    for(let i = 0; i <= m; i++) {
        // 内层循环物品
        for(let j = 0; j < A.length; j++) {
            if(i - A[j] >= 0) {
                dp[i] = Math.max(dp[i], dp[i - A[j]] + V[j]);
            }
        }
    }
    return dp[m]; // 达到背包容量时，即最大价值
}
```
<span style="color: red">**和上面非完全背包的区别是，由于物品可以无限次使用，我们把物品循环放在了内部，外层循环背包**</span>

## 背包问题模板
### 万能模板
上面的解法，采用了数学公式的思路,推断出动态规划的递推公式，这显然很复杂，但是看最终的代码实现，我们发现这类背包问题一般是如下步骤
- 首先定义一个DP数组，保存每一步的递推的值
- 两层循环，外层物品或者内层背包
- 判断临接条件，应用递推公式计算
- 通过DP数组，得出最终结果

结合上面的步骤，以及完全背包和非完全背包的区别，我们可以得到解决背包问题或类似背包问题的通用模板完成公式如下
```js
target:背包
nums: 物品
var dp = new Array(target + 1).fill(0);
dp[0] = 1; // 根据实际情况是否设置初始值
for(let i = 0; i <= target; i++) {
    for(var j = 0; j < nums.length; j++) {
        ....
    }
}
```
- <span style="color: red">非完全背包:每个物品只能用一次(内层循环倒序)</span>
- <span style="color: red">完全背包:每个物品都可以重复使用(内层循环正序)</span>
- <span style="color: blue">非完全背包</span>
    - <span style="color: blue">外层for循环遍历物品，内层for遍历背包</span>
- <span style="color:blue">完全背包</span>
    - <span style="color: blue">如果求组合数(不考虑结果元素的顺序)就是外层for循环遍历物品，内层for遍历背包</span>
    - <span style="color: blue">如果求排列数(考虑顺序)就是外层for遍历背包，内层for循环遍历物品</span>

## 真题套用
结合leetcode上的原题，我们可以把背包问题大致分一下几类
1. 组合问题
    - [494目标和](https://leetcode.cn/problems/target-sum/)
    - [零钱兑换](https://leetcode.cn/problems/coin-change-2/)
    - 组合问题公式: dp[i] += dp[i - num]
2. 排列问题
    - [377.组合总和 Ⅳ](https://leetcode.cn/problems/combination-sum-iv/)
    - 排列问题公式:dp[i] += dp[i - num]
3. True、False问题
    - [139.单词拆分（组合）](https://leetcode.cn/problems/word-break/)
    - [416.分割等和子集（组合）](https://leetcode.cn/problems/partition-equal-subset-sum/)
    - True、false问题公式:dp[i] = dp[i] or dp[i - num]
4. 最大最小问题
    - [474.一和零](https://leetcode.cn/problems/ones-and-zeroes/)
    - [322.零钱兑换（组合）](https://leetcode.cn/problems/coin-change/)
    - [279.完全平方数](https://leetcode.cn/problems/perfect-squares/)
    - 最大最小问题公式:dp[i] = min(dp[i], dp[i - num] + 1)或dp[i] = max(dp[i], dp[i - num] + 1)

## 例子
### 零钱兑换
- 问题
    ```js
    // 给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
    
    // 你可以认为每种硬币的数量是无限的。

    // 输入：coins = [1, 2, 5], amount = 11
    // 输出：3 
    // 解释：11 = 5 + 5 + 1
    ```
- 解法
    金额可以抽象为背包，硬币可以抽象为物品,这就转换成了一个背包问题，题目中描述硬币数量无限使用,那么就是一个完全背包问题，那么就可以套用模板
    - 只求数量,不考虑顺序，符合组合数,外层for物品,内层for背包
    - 最小值问题,使用最小值公式
    - 完全背包问题，内层循环正序
    ```js
    const coinChange = function(coins, amount) {
        let dp = new Array(amount + 1).fill(Number.MAX_SAFE_INTEGER);
        dp[0] = 0;
        for(let i = 0; i < coins.length; i++) {
            for(let j = 0; j <= amount; j++) {
                if(j >= coins[i]) {
                    dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);// 最小值问题公式
                }
            }
        }
        return dp[amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[amount]
    }
    ```
### 零钱兑换II
- 问题

    给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额。

    请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 0 。

    假设每一种面额的硬币有无限个。  
    ```js
    输入：amount = 5, coins = [1, 2, 5]
    输出：4
    解释：有四种方式可以凑成总金额：
    5=5
    5=2+2+1
    5=2+1+1+1
    5=1+1+1+1+1
    ```
- 解法

    金额可以抽象为背包,硬币可以抽象为物品,这就转换为了一个背包问题,题目中描述硬币数量无限使用，那么就是一个完全背包问题，那么就可以套用模板
    - 只求数量,不考虑顺序，符合组合数，外层for物品,内层for背包
    - 组合问题，使用组合公式
    - 完全背包问题，内层循环正序
    ```js
    const change = function(amount, coins) {
        let dp = new Array(amount + 1).fill(0);
        dp[0] = 1; // 总数为0,只有一种方案兑换，就是所有硬币都不选择
        for(let i = 0; i < coins.length; i++) {
            for(let j = 0; j <= amount; j++) {
                if(j- coins[i] > 0) {
                    dp[j] = dp[j] + dp[i - coins[i]]; // 组合问题公式
                }
            }
        }
        return dp[amount]
    }
    ```
### 单词拆分
给定一个非空字符串s和一个包含非空单词的列表wordDict,判定s是否可以被空格拆分为一个或多个字典中出现的单词
- 拆分时可以重复使用字段中的单词
- 你可以假设字典中没有重复的单词
```js
输入: s = "leetcode", wordDict = ["leet", "code"]
输出: true
解释: 返回 true 因为 "leetcode" 可以被拆分成 "leet code"。

输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
输出: false
```
- 解法

    字符串s可以抽象为背包,单词列表wordDict可以抽象为物品，这就转换成了一个背包问题。题目中描述可以使用重复的单词,那么他就是一个完全背包问题，可以套用模板
    - 单词顺序影响结果，符合排列数，外层for背包，内层for物品
    - True,false问题，使用True,False公式
    - 完全背包问题，内层循环正序
    ```js
    const wordBreak = function(s, wordDict) {
        let dp = new Array(s.length + 1).fill(false);
        // dp[i]表示以i结尾的字符串是否可以被wordDict中组合而成
        dp[0] = true // 空字符串可以不从wordDict中选择，也能组成
        for(let i = 1; i <= s.length; i++) {
            for(let j = 0; j < wordDict.length; j++) {
                let s1 = wordDict[j]; // s1表示当前的字符串
                let temp = s.substr(i - s1.length, s1.length); // temp表示字符串s中截取s1长度的临时串
                // 临时串和当前s1相等时,可匹配
                if(temp === s1) {
                    dp[i] = dp[i] || dp[i - s1.length]
                }
            }
        }
        return dp[s.length]
    }
    ```

## 资料
[背包](https://leetcode.cn/problems/coin-lcci/solutions/1520660/by-lvming-h-05y1/?languageTags=javascript)