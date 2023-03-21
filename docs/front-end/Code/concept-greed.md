---
autoGroup-0: 概念
title: 贪心
---
## 贪心算法
### 算法策略
贪心算法，顾名思义，总是做出当前的最优选择，即期望通过局部的最优选择获得整体的最优选择。

<span style="color: red">某种意义上说，贪心算法是很贪婪、很目光短浅的，它不从整体考虑，仅仅只关注当前的最大利益，所以说它做出的选择仅仅是某种意义上的局部最优，但是贪心算法在很多问题上还是能够拿到最优解或较优解，所以它的存在还是有意义的。</span>

**在日常生活中，我们使用到贪心算法的时候还是挺多的,例如:从100张面值不等的钞票中，抽出10张，怎么样才能获得最多的价值？**

**我们只需要每次都选择剩下的钞票中最大的面值，最后一定拿到的就是最优解，这就是使用的贪心算法，并且最后得到了整体最优解**

往往遇到的问题并不是那么简单，例如：

- 二倍数对数组的问题

    给定一个长度为偶数的整数数组arr，只有对arr进行重组后可以满足
    - 对于每个 0<= i < len(arr) / 2,都有arr[2 * i + 1] = 2 * arr[2 * i]时，返回true
    - 否则返回false

    例如
    ```md
    输入：arr = [4,-2,2,-4]
    输出：true
    解释：可以用 [-2,-4] 和 [2,4] 这两组组成 [-2,-4,2,4] 或是 [2,4,-2,-4]
    ```
    **解题思路**

    [4, -2, 2,-4],假设正数正向排序、负数逆向排序，得到[-2,-4,2,4], 那么遍历数组，每个数要不被之前的数匹配，要不之后存在2的倍数

    > 例如对于arr[0] = -2 只要存在2倍数，不会存在1/2的数

    也就是从arr[0]开始，仅仅只关注当前2倍数结果，仅仅关注当前局部的最优，通过每一步的最优解，获取全局最优解，这样看就是贪心算法问题

    <span style="color: blue">以上这样思路，称之为**抽象贪心算法模型**</span>

    大部分的贪心问题，都很难看出来，我们最重要的是学会如何抽象成贪心算法模型，这步处理好，代码实现很简单。

    对于本题，我们还需要关注重复数的问题，例如[2,2,4,4]，可以使用Set去重，Map记录重复个数，实现如下

    ```js
    const canReorderDoubled = arr => {
        if(arr.length < 2) return false;
        // 正数正序，负数逆序
        arr.sort((a, b) => {
            if(a < 0 && b < 0)  return b - a;
            return a - b;
        })
        // 去重
        let nums = [...new Set(arr)], map = new Map();
        // 记录重复数个数
        for(let a of arr) {
            map.set(a, (map.get(a) || 0) + 1)
        }

        for(let i = 0; i < nums.length; i++) {
            // 当前述与二倍数差值
            let temp = (map.get(nums[i] * 2) || 0) - map.get(nums[i]);
            if(temp >= 0) { // 满足当前二倍数，或已匹配
                map.set(nums[i] * 2, temp); // 只关注当前最优解，局部最优
            } else {
                // 不满足
                return false;
            }
        }
        return true;
    }
    ```
- 盛最多水的容器

## 贪心套路
- 第一步 判断是否是贪心问题

    问题给出一组数据，并给出该组数据的条件或环境(限制),以及结果期望，要求判断这组数据是否满足期望，或从这组数据中选择部分数据，能否大搞期望结果最优值

    例如：
    - 二倍数对数组问题：给出一组数据，限制数据重组后二倍数，判断所有的数据是否都满足二倍数关系
    - 盛最多水的容器问题：给出一组数据 height ，限制每两个数都可以构成容器，求从这组数据中选择两个数据，达到容器最大值

- 第二步 抽象贪心算法模型

    根据问题，抽象出符合满足局部最优，且能通过局部的最优选择获得整体的最优选择的贪心算法模型，例如：

    - 二倍数对数组问题：数据正数正向排序、负数逆向排序后，每个数都向后满足二倍数关系，则整体都满足二倍数关系
    - 盛最多水的容器问题：从 i=0, j=height.length-1 开始选择两个边，每次做出当前的最优选择：每次短边向内收缩一步，更新全局最优，最终拿到整体最优：容器最大值

    <span style="color: red">贪心算法模型是对当前问题的一种抽象，一种变体，帮助我们解决问题， 不要问如何抽象贪心算法模型，多刷几道，刷着刷着就有感觉了</span>

- 第三部 判断贪心解题是否最优

    通过示例判断结果是否是最优解

## 经典案例
## 跳跃游戏
```js
// 输入：nums = [2,3,1,1,4]
// 输出：true
// 解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
const canJump = nums => {
    let n = nums.length - 1;
    let maxLen = 0;
    for(let i = 0; i <= maxLen; i++) {
        maxLen = Math.max(maxLen, nums[i] + 1);
        if(maxLen >= n) return true;
    }
    return false;
}

// 清晰一些的步骤
const canJump = nums => {
    // 全局最优
    let end = 0;
    for(let i = 0; i < nums.length; i++) {
        // 当前位置不可达，超出此前所有最大可达位置
        if(end < i) return false;
        // 最大可达位置已经达到甚至超越最后一个下标，返回true
        if(end >= nums.length - 1) return true;
        // 更新全局最优
        end = end >= i + nums[i] ? end : i + nums[i];
    }
    return true;
}
```
[跳跃游戏](/front-end/Code/concept-dp.html#跳跃游戏)
## 跳跃游戏||
```js
// 输入: nums = [2,3,1,1,4]
// 输出: 2
// 解释: 跳到最后一个位置的最小跳跃数是 2。
//      从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。

const jump = nums => {
    let end = 0;
    let maxPos = 0;
    let count = 0;
    for(let i = 0; i < nums.length - 1; i++) {
        maxPos = maxPos > i + nums[i] ? maxPos : i + nums[i];
        // 到达count轮重点，更新end 与count
        if(i === end) {
            // 启动下一轮
            end = maxPos;
            // 更新跳跃次数
            count++;
        }
    }
    return count;
}
```
## 最少操作使数组递增
给你一个整数数组 nums （下标从 0 开始）。每一次操作中，你可以选择数组中一个元素，并将它增加 1 。

比方说，如果 nums = [1,2,3] ，你可以选择增加 nums[1] 得到 nums = [1,3,3] 。
请你返回使 nums 严格递增 的 最少 操作次数。

我们称数组 nums 是 严格递增的 ，当它满足对于所有的 0 <= i < nums.length - 1 都有 nums[i] < nums[i+1] 。一个长度为 1 的数组是严格递增的一种特殊情况。
```js
// 输入：nums = [1,1,1]
// 输出：3
// 解释：你可以进行如下操作：
// 1) 增加 nums[2] ，数组变为 [1,1,2] 。
// 2) 增加 nums[1] ，数组变为 [1,2,2] 。
// 3) 增加 nums[2] ，数组变为 [1,2,3] 。
const minOperations = function(nums) {
    let pre = nums[0] - 1, res = 0;
    for(let num of nums) {
        pre = Math.max(pre + 1, num);
        res += pre - num;
    }
    return res;
}
console.log(minOperations([1,1,1]))
```

## 使括号有效的最小添加
```js
// 时间复杂度：O(n)，其中 nn 是字符串的长度。遍历字符串一次。
// 空间复杂度：O(1)。只需要维护常量的额外空间。
const minAddToMakeValid = s => {
    let ans = 0;
    let leftCount = 0;
    let length = s.length;
    for(let i = 0; i < length; i++) {
        let c = s[i];
        if(c === '(') {
            leftCount++;
        } else {
            if(leftCount > 0) {
                leftCount--;
            } else {
                ans++;
            }
        }
    }
    ans += leftCount;
    return ans;
}
console.log(minAddToMakeValid('())'))
```
[使括号有效的最小添加](/front-end/Code/#使括号有效的最少添加-贪心)

## 超级洗衣机
```js
// 输入：machines = [1,0,5]
// 输出：3
// 解释：
// 第一步: 1 0 <-- 5 => 1 1 4
// 第二步: 1 <-- 1 <-- 4 => 2 1 3
// 第三步: 2 1 <-- 3 => 2 2 2
const findMinMoves = function(machines) {
    let total = eval(machines.join('+'));
    let n = machines.length;
    if(total % n !== 0) return -1;
    let avg = Math.floor(total / n);
    let ans = 0, sum = 0;
    for(let num of machines) {
        num -= avg;
        sum += num;
        ans = Math.max(ans, Math.max(Math.abs(sum), num))
    }
    return ans;
}
```
[超级洗衣机](/front-end/Code/#贪心-超级洗衣机)


[贪心套路](https://github.com/sisterAn/JavaScript-Algorithms/issues/171)

## 你能构造出连续值的最大数目
给你一个长度为 n 的整数数组 coins ，它代表你拥有的 n 个硬币。第 i 个硬币的值为 coins[i] 。如果你从这些硬币中选出一部分硬币，它们的和为 x ，那么称，你可以 构造 出 x 。

请返回从 0 开始（包括 0 ），你最多能 构造 出多少个连续整数。

你可能有多个相同值的硬币。
```js
// 输入：coins = [1,3]
// 输出：2
// 解释：你可以得到以下这些值：
// - 0：什么都不取 []
// - 1：取 [1]
// 从 0 开始，你可以构造出 2 个连续整数。
const getMaximumConsecutive = coins => {
    let res = 1;
    coins.sort((a,b) => a - b);
    for(let i of coins) {
        if(i > res) {
            break;
        }
        res += i;
    }
    return res;
}
```
##  灌溉花园的最少水龙头数目
在x轴上有一个一维的花园。花园长度为n，从点0开始，到点n结束。

花园里总共有n+1个水龙头，分别位于[0, 1, ....,n]

给你一个整数n和一个长度为n+1的证书数组ranges,其中ranges[i](下标从0开始)表示:如果打开点i处的水龙头，可以灌溉的区域为[i - ranges[i], i + ranges[i]].

请你返回可以灌溉整个花园的 最少水龙头数目 。如果花园始终存在无法灌溉到的地方，请你返回 -1 。
![水龙头](./images/1685_example_1.png)
```js
// 输入：n = 5, ranges = [3,4,1,1,0,0]
// 输出：1
// 解释：
// 点 0 处的水龙头可以灌溉区间 [-3,3]
// 点 1 处的水龙头可以灌溉区间 [-3,5]
// 点 2 处的水龙头可以灌溉区间 [1,3]
// 点 3 处的水龙头可以灌溉区间 [2,4]
// 点 4 处的水龙头可以灌溉区间 [4,4]
// 点 5 处的水龙头可以灌溉区间 [5,5]
// 只需要打开点 1 处的水龙头即可灌溉整个花园 [0,5] 。
const minTaps = function(n, ranges) {
     const rightMost = new Array(n + 1).fill(0).map((_, i) => i);
     for(let i = 0; i <= n; i++) {
        let start = Math.max(0, i - ranges[i]);
        let end = Math.min(n, i + ranges[i]);
        rightMost[start] = Math.max(rightMost[start], end);
     }
     let last = 0, ret = 0, pre = 0;
     for(let i = 0; i < n; i++) {
        last = Math.max(last, rightMost[i]);
        if(i === last) {
            return -1;
        }
        if(i === pre) {
            ret++;
            pre = last;
        }
     }
     return ret;
}
```

[灌溉花园的最少水龙头数目](https://leetcode.cn/problems/minimum-number-of-taps-to-open-to-water-a-garden/description/)


## 交换字符使得字符串相同
有两个长度相同的字符串s1 和 s2,且它们其中 只含有 字符 "x" 和 "y"，你需要通过「交换字符」的方式使这两个字符串相同。

每次「交换字符」的时候，你都可以在两个字符串中各选一个字符进行交换。

交换只能发生在两个不同的字符串之间，绝对不能发生在同一个字符串内部。也就是说，我们可以交换 s1[i] 和 s2[j]，但不能交换 s1[i] 和 s1[j]。

最后，请你返回使 s1 和 s2 相同的最小交换次数，如果没有方法能够使得这两个字符串相同，则返回 -1 。
```js
// 输入：s1 = "xx", s2 = "yy"
// 输出：1
// 解释：
// 交换 s1[0] 和 s2[1]，得到 s1 = "yx"，s2 = "yx"。
const minimumSwap = function(s1, s2) {
    let xy = 0, yx = 0;
    let n = s1.length;
    for(let i = 0; i < n; i++) {
        let a = s1[i], b = s2[i];
        if(a === 'x' && b === 'y') {
            xy++;
        }
        if(a === 'y' && b === 'x') {
            yx++；
        }
    }
    if((xy + yx) % 2 === 1) {
        return -1;
    }
    return Math.floor(xy / 2) + Math.floor(yx / 2) + xy % 2 + yx %2;
}
```

[交换字符使得字符串相同](https://leetcode.cn/problems/minimum-swaps-to-make-strings-equal/description/?languageTags=javascript)


## 递减元素使数组呈锯齿状
给你一个整数数组 nums，每次 操作 会从中选择一个元素并 将该元素的值减少 1。

如果符合下列情况之一，则数组 A 就是 锯齿数组：

- 每个偶数索引对应的元素都大于相邻的元素，即 A[0] > A[1] < A[2] > A[3] < A[4] > ...
- 或者，每个奇数索引对应的元素都大于相邻的元素，即 A[0] < A[1] > A[2] < A[3] > A[4] < ...
返回将数组 nums 转换为锯齿数组所需的最小操作次数。

```js
// 输入：nums = [1,2,3]
// 输出：2
// 解释：我们可以把 2 递减到 0，或把 3 递减到 1。
const movesToMakeZigzag = function(nums) {
    return Math.min(help(nums, 0), help(nums, 1));
}
const help = (nums, pos) => {
    let res = 0;
    for(let i = pos; i < nums.length; i += 2) {
        let a = 0;
        if(i - 1 >= 0) {
            a = Math.max(a, nums[i] - nums[i - 1] + 1);
        }
        if(i + 1 < nums.length) {
            a = Math.max(a, nums[i] - nums[i + 1] + 1);
        }
        res += a;
    }
    return res;
}
```
## 表现良好的最长时间段
给你一份工作时间表 hours，上面记录着某一位员工每天的工作小时数。

我们认为当员工一天中的工作小时数大于 8 小时的时候，那么这一天就是「劳累的一天」。

所谓「表现良好的时间段」，意味在这段时间内，「劳累的天数」是严格 大于「不劳累的天数」。

请你返回「表现良好时间段」的最大长度。

```js
// 输入：hours = [9,9,6,0,6,6,9]
// 输出：3
// 解释：最长的表现良好时间段是 [9,9,6]。

// 贪心
const longesWPI = function(hours) {
    let n = hours.length;
    let s = new Array(n + 1).fill(0);
    const stk = [0];
    for(let i = 1; i <= n; i++) {
        s[i] = s[i - 1] + (hours[i - 1] > 8 ? 1 : -1);
        if(s[stk[stk.length - 1]] > s[i]) {
            stk.push(i);
        }
    }
    let res = 0;
    for(let r = n; r >= 1; r--) {
        while(stk.length && s[stk[stk.length - 1]] < s[r]) {
            res = Math.max(res, r - stk.pop());
        }
    }
    return res;
}
```