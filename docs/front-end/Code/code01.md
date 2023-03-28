---
title: leetcode练习题
---
## 强密码检查器
```js
// 如果一个密码满足以下所有条件，我们称它是一个 强 密码：

// 它有至少 8 个字符。
// 至少包含 一个小写英文 字母。
// 至少包含 一个大写英文 字母。
// 至少包含 一个数字 。
// 至少包含 一个特殊字符 。特殊字符为："!@#$%^&*()-+" 中的一个。
// 它 不 包含 2 个连续相同的字符（比方说 "aab" 不符合该条件，但是 "aba" 符合该条件）。
// 给你一个字符串 password ，如果它是一个 强 密码，返回 true，否则返回 false 。

// 输入：password = "IloveLe3tcode!"
// 输出：true
// 解释：密码满足所有的要求，所以我们返回 true 。
var strongPasswordCheckerII = password => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-+])(?!.*(.)\1+).{8,}$/.test(password)
}
```
[前向查找/负前向查找](/front-end/JavaScript/a-exgrep1.html#子表达式)

## 兼具大小写的最好英文字母
```js
// 给你一个由英文字母组成的字符串 s ，请你找出并返回 s 中的 最好 英文字母。返回的字母必须为大写形式。如果不存在满足条件的字母，则返回一个空字符串。

// 最好 英文字母的大写和小写形式必须 都 在 s 中出现。

// 英文字母 b 比另一个英文字母 a 更好 的前提是：英文字母表中，b 在 a 之 后 出现。

// 输入：s = "lEeTcOdE"
// 输出："E"
// 解释：
// 字母 'E' 是唯一一个大写和小写形式都出现的字母。

const greatestLetter = s => {
    const ht = new Set();
    for(let i = 0; i < s.length; i++) {
        const c = s[i];
        ht.add(c);
    }
    for(let i = 25; i >= 0; i--) {
        if(ht.has(String.fromCharCode('a'.charCodeAt() + i)) && ht.has(String.fromCharCode('A'.charCodeAt() + i))) {
            return String.fromCharCode('A'.charCodeAt() + i);
        }
    }
    return '';
}
```
## 具有给定数值的最小字符--贪心
```js
// 小写字符 的 数值 是它在字母表中的位置（从 1 开始），因此 a 的数值为 1 ，b 的数值为 2 ，c 的数值为 3 ，以此类推。

// 字符串由若干小写字符组成，字符串的数值 为各字符的数值之和。例如，字符串 "abe" 的数值等于 1 + 2 + 5 = 8 。

// 给你两个整数 n 和 k 。返回 长度 等于 n 且 数值 等于 k 的 字典序最小 的字符串。

// 注意，如果字符串 x 在字典排序中位于 y 之前，就认为 x 字典序比 y 小，有以下两种情况：

// x 是 y 的一个前缀；
// 如果 i 是 x[i] != y[i] 的第一个位置，且 x[i] 在字母表中的位置比 y[i] 靠前。
 
// 输入：n = 3, k = 27
// 输出："aay"
// 解释：字符串的数值为 1 + 1 + 25 = 27，它是数值满足要求且长度等于 3 字典序最小的字符串。

const getSmallestString = function(n, k) {
    let ans = '';
    for(let i = 1; i <= n; i++) {
        let lower = Math.max(1, k - (n - i) * 26);
        k -= lower;
        ans += String.formCharCode('a'.charCodeAt() + lower - 1);
    }
    return ans;
}
```
[具有给定数值的最小字符](https://leetcode.cn/problems/smallest-string-with-a-given-numeric-value/description/)

## 生成平衡数组的方案数
给你一个整数数组 nums 。你需要选择 恰好 一个下标（下标从 0 开始）并删除对应的元素。请注意剩下元素的下标可能会因为删除操作而发生改变。

比方说，如果 nums = [6,1,7,4,1] ，那么：

选择删除下标 1 ，剩下的数组为 nums = [6,7,4,1] 。

选择删除下标 2 ，剩下的数组为 nums = [6,1,4,1] 。

选择删除下标 4 ，剩下的数组为 nums = [6,1,7,4] 。

如果一个数组满足奇数下标元素的和与偶数下标元素的和相等，该数组就是一个 平衡数组 。

请你返回删除操作后，剩下的数组 nums 是 平衡数组 的 方案数 。
```js
// 输入：nums = [2,1,6,4]
// 输出：1
// 解释：
// 删除下标 0 ：[1,6,4] -> 偶数元素下标为：1 + 4 = 5 。奇数元素下标为：6 。不平衡。
// 删除下标 1 ：[2,6,4] -> 偶数元素下标为：2 + 4 = 6 。奇数元素下标为：6 。平衡。
// 删除下标 2 ：[2,1,4] -> 偶数元素下标为：2 + 4 = 6 。奇数元素下标为：1 。不平衡。
// 删除下标 3 ：[2,1,6] -> 偶数元素下标为：2 + 6 = 8 。奇数元素下标为：1 。不平衡。
// 只有一种让剩余数组成为平衡数组的方案。

// 动态规划
const waysToMakeFair = nums => {
    let odd1 = 0, even1 = 0;
    let odd2 = 0, even2 = 0;
    for(let i = 0; i < nums.length; i++) {
        if((i & 1) !== 0) {
            odd2 += nums[i];
        } else {
            even2 += nums[i];
        }
    }
    let res = 0;
    for(let i = 0; i < nums.length; i++) {
        if((i & 1) != 0) {
            odd2 -= nums[i];
        } else {
            even2 -= nums[i];
        }
        if(odd1 + even2 === odd2 + even1) {
            res++;
        }
        if((i & 1) !== 0) {
            odd1 += nums[i];
        } else {
            even1 += nums[i]
        }
    }
    return res;
}
```
[生成平衡数组的方案数](https://leetcode.cn/problems/ways-to-make-a-fair-array/description/?languageTags=javascript)

## 统计星号--简单
```js
// 输入：s = "l|*e*et|c**o|*de|"
// 输出：2
// 解释：不在竖线对之间的字符加粗加斜体后，得到字符串："l|*e*et|c**o|*de|" 。
// 第一和第二条竖线 '|' 之间的字符不计入答案。
// 同时，第三条和第四条竖线 '|' 之间的字符也不计入答案。
// 不在竖线对之间总共有 2 个星号，所以我们返回 2 。
var countAsterisks = s => {
    return s.replace(/\|[\w\*]*\|/g, '').replace(/\w+/g, '').length;
}
// 模拟
var countAsterisks = s => {
    let valid = true;
    let res = 0;
    for(let i = 0; i < s.length; i++) {
        let c = s[i];
        if(c === '|') {
            valid = !valid;
        } else if(c === '*' && valid) {
            res++;
        }
    }
    return res;
}
```

## 计算布尔二叉树的值
![](./images/1675697680969.jpg)
```js
// 输入：root = [2,1,3,null,null,0,1]
// 输出：true
// 解释：上图展示了计算过程。
// AND 与运算节点的值为 False AND True = False 。
// OR 运算节点的值为 True OR False = True 。
// 根节点的值为 True ，所以我们返回 true 。
var evaluateTree = root => {
    if(!root.left) {
        return root.val == 1
    }
    if(root.val === 2) {
        return evaluateTree(root.left) || evaluateTree(root.right);
    } else {
        return evaluateTree(root.left) && evaluateTree(root.right);
    }
}
```
## 删除子文件夹---排序
你是一位系统管理员，手里有一份文件夹列表folder,你的任务是要删除该列表中的所有子文件夹，并以任意顺序返回剩下的文件夹。

如果文件夹 folder[i] 位于另一个文件夹 folder[j] 下，那么 folder[i] 就是 folder[j] 的 子文件夹 。

文件夹的「路径」是由一个或多个按以下格式串联形成的字符串：'/' 后跟一个或者多个小写英文字母。

例如，"/leetcode" 和 "/leetcode/problems" 都是有效的路径，而空字符串和 "/" 不是。
```js
// 输入：folder = ["/a","/a/b","/c/d","/c/d/e","/c/f"]
// 输出：["/a","/c/d","/c/f"]
// 解释："/a/b" 是 "/a" 的子文件夹，而 "/c/d/e" 是 "/c/d" 的子文件夹。

// 输入: folder = ["/a/b/c","/a/b/ca","/a/b/d"]
// 输出: ["/a/b/c","/a/b/ca","/a/b/d"]
var removeSubfolders = function(folder) {
    folder.sort();
    const ans = [folder[0]];
    for(let i = 1; i < folder.length; i++) {
        const prev = ans[ans.length -1].length;
        if(!(prev < folder[i].length && ans[ans.length - 1] === (folder[i].substring(0, prev)) && folder[i].charAt(prev) === '/')) {
            ans.push(folder[i]);
        }
    }
    return ans;
}
```
[计算布尔二叉树的值](https://leetcode.cn/problems/evaluate-boolean-binary-tree/description/?languageTags=javascript)

## 装满被自己需要的最短总时长
现有一台饮水机，可以制备冷水、温水和热水。每秒钟，可以装满 2 杯 不同 类型的水或者 1 杯任意类型的水。

给你一个下标从 0 开始、长度为 3 的整数数组 amount ，其中 amount[0]、amount[1] 和 amount[2] 分别表示需要装满冷水、温水和热水的杯子数量。返回装满所有杯子所需的 最少 秒数。
```js
// 输入：amount = [1,4,2]
// 输出：4
// 解释：下面给出一种方案：
// 第 1 秒：装满一杯冷水和一杯温水。
// 第 2 秒：装满一杯温水和一杯热水。
// 第 3 秒：装满一杯温水和一杯热水。
// 第 4 秒：装满一杯温水。
// 可以证明最少需要 4 秒才能装满所有杯子。
const fillCups = function(amount) {
    amount.sort((a, b) => a - b);
    if(amount[2] > amount[1] + amount[0]) {
        return amount[2];
    }
    return Math.floor((amount[0] + amount[1] + amount[2] + 1) / 2)
}
```

## 最大平均通过率
```js
// 输入：classes = [[1,2],[3,5],[2,2]], extraStudents = 2
// 输出：0.78333
// 解释：你可以将额外的两个学生都安排到第一个班级，平均通过率为 (3/4 + 3/5 + 2/2) / 3 = 0.78333 。

// 零神大佬的思路 可先看完大佬的题解思路，再看以下总结。 总结：
// 1. 用每个班级的通过率的增加量构建大顶堆，并记录通过率累和。结点数据结构为：[右边两数的通过率的增加量, num[0], num[1]] 
// 2. 调整大顶堆extraStudents次，并记录通过率增加量累和，其中将堆顶安排一个人后，便自上而下调整堆。 
// 3. 最后返回平均通过率。
const maxAverageRatio = function(classes, extraStudents) {
    let heapSize = classes.length;
    // 从最后一个非叶子节点，自底向上，构建大顶堆
    let maxHeap = new Heap(classes); 
    for(let i = (heapSize >> 1) - 1; i >= 0; i--) {
        maxHeap.down(i, heapSize);
    }
    console.log(maxHeap.heap);
    // 调整extraStudents次，并记录
    while(extraStudents--) {
        let [d, x, y] = maxHeap.heap[0];
        maxHeap.sum += d;
        maxHeap.heap[0] = [diff(x + 1, y + 1), x + 1, y + 1];
        maxHeap.down(0, heapSize);
    }
    // 返回
    return maxHeap.sum / heapSize;
}
// 带cmp的堆模版
let swap = (arr, i, j) => [arr[i], arr[j]] = [arr[j], arr[i]];
var defaultCmp = (a, b) =>  a[0] < b[0];
// 通过率的增加量
let diff = (x, y) => {return (x + 1)/(y + 1) - x / y;}
class Heap {
    constructor(nums, cmp = defaultCmp) { // 大顶堆
        this.heap = [];
        this.sum = 0;
        for(let num of nums) {
            this.heap.push([diff(num[0], num[1]), num[0], num[1]]);
            this.sum += num[0] / num[1];
        }
        this.cmp = cmp;
    }
    // 从位置i自底向上调整堆，此题不用刻删除
    up (i) {
        while (i > 0) {
            const parent = (i - 1) >> 1;
            if (this.cmp(this.heap[parent], this.heap[i])) {
                swap(this.heap, parent, i);
                i = parent;
            } else {
                break;
            }
        }
    }

    // 从位置i自上而下调整堆（大小为heapSize）
    down (i, heapSize) {
        while (2 * i + 1 < heapSize) {
            let child = 2 * i + 1;
            // 下沉到左右孩子较小的结点
            if (child + 1 < heapSize && this.cmp(this.heap[child], this.heap[child + 1])) {
                child++;
            }
            if (this.cmp(this.heap[i], this.heap[child])) {
                swap(this.heap, child, i);
                i = child;
            } else {
                break;
            }
        }
    }
}
```
[最大平均通过率](https://leetcode.cn/problems/maximum-average-pass-ratio/description/?languageTags=javascript)

## 使字符串平衡的最少删除次数
给你一个字符串 s ，它仅包含字符 'a' 和 'b'​​​​ 。

你可以删除 s 中任意数目的字符，使得 s 平衡 。当不存在下标对 (i,j) 满足 i < j ，且 s[i] = 'b' 的同时 s[j]= 'a' ，此时认为 s 是 平衡 的。

请你返回使 s 平衡 的 最少 删除次数。

```js
// 输入：s = "aababbab"
// 输出：2
// 解释：你可以选择以下任意一种方案：
// 下标从 0 开始，删除第 2 和第 6 个字符（"aababbab" -> "aaabbb"），
// 下标从 0 开始，删除第 3 和第 6 个字符（"aababbab" -> "aabbbb"）。
var minimumDeletions = function(s) {
    let leftb = 0, righta = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === 'a') {
            righta++;
        }
    }
    let res = righta;
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c === 'a') {
            righta--;
        } else {
            leftb++;
        }
        res = Math.min(res, leftb + righta);
    }
    return res;
}
// 第二种
function minimumDeletions(s) {
    let ans = 0;
    while(s.includes('ba')) s = s.replace(/ba/g, () => (ans++, ''));
    return ans;
}
```

## 得到K个黑块的最少涂色次数

给你一个长度为 n 下标从 0 开始的字符串 blocks ，blocks[i] 要么是 'W' 要么是 'B' ，表示第 i 块的颜色。字符 'W' 和 'B' 分别表示白色和黑色。

给你一个整数 k ，表示想要 连续 黑色块的数目。

每一次操作中，你可以选择一个白色块将它 涂成 黑色块。

请你返回至少出现 一次 连续 k 个黑色块的 最少 操作次数。

```js
// 输入：blocks = "WBBWWBBWBW", k = 7
// 输出：3
// 解释：
// 一种得到 7 个连续黑色块的方法是把第 0 ，3 和 4 个块涂成黑色。
// 得到 blocks = "BBBBBBBWBW" 。
// 可以证明无法用少于 3 次操作得到 7 个连续的黑块。
// 所以我们返回 3 。
const minimumRecolors = (bloks, k) => {
    let l = 0, r = 0, cnt = 0;
    while(r < k) {
        cnt += blocks[r] === 'W' ? 1 : 0;
        r++;
    }
    let res = cnt;
    while(r < blocks.length) {
        cnt += blocks[r] === 'W' ? 1 : 0;
        cnt -= blocks[l] === 'W' ? 1 : 0;
        res = Math.min(res, cnt);
        l++;
        r++;
    }
    return res;
}
```
## 二进制数转字符串
二进制数转字符串。给定一个介于0和1之间的实数（如0.72），类型为double，打印它的二进制表达式。如果该数字无法精确地用32位以内的二进制表示，则打印“ERROR”。
```js
// 输入：0.625
// 输出："0.101"

//  输入：0.1
//  输出："ERROR"
//  提示：0.1无法被二进制准确表示
const printBin = function(num) {
    let sb = '0.';
    while(sb.length <= 32 && num !== 0) {
        num *= 2;
        const digit = Math.floor(num);
        sb += digit;
        num -= digit;
    }
    return sb.length <= 32 ? sb : 'ERROR';
}
```
## 赢的比赛需要的最少训练时长

你正在参加一场比赛，给你两个 正 整数 initialEnergy 和 initialExperience 分别表示你的初始精力和初始经验。

另给你两个下标从 0 开始的整数数组 energy 和 experience，长度均为 n 。

你将会 依次 对上 n 个对手。第 i 个对手的精力和经验分别用 energy[i] 和 experience[i] 表示。当你对上对手时，需要在经验和精力上都 严格 超过对手才能击败他们，然后在可能的情况下继续对上下一个对手。

击败第 i 个对手会使你的经验 增加 experience[i]，但会将你的精力 减少  energy[i] 。

在开始比赛前，你可以训练几个小时。每训练一个小时，你可以选择将增加经验增加 1 或者 将精力增加 1 。

返回击败全部 n 个对手需要训练的 最少 小时数目。
```js
// 输入：initialEnergy = 5, initialExperience = 3, energy = [1,4,3,2], experience = [2,6,3,1]
// 输出：8
// 解释：在 6 小时训练后，你可以将精力提高到 11 ，并且再训练 2 个小时将经验提高到 5 。
// 按以下顺序与对手比赛：
// - 你的精力与经验都超过第 0 个对手，所以获胜。
//   精力变为：11 - 1 = 10 ，经验变为：5 + 2 = 7 。
// - 你的精力与经验都超过第 1 个对手，所以获胜。
//   精力变为：10 - 4 = 6 ，经验变为：7 + 6 = 13 。
// - 你的精力与经验都超过第 2 个对手，所以获胜。
//   精力变为：6 - 3 = 3 ，经验变为：13 + 3 = 16 。
// - 你的精力与经验都超过第 3 个对手，所以获胜。
//   精力变为：3 - 2 = 1 ，经验变为：16 + 1 = 17 。
// 在比赛前进行了 8 小时训练，所以返回 8 。
// 可以证明不存在更小的答案。

// 模拟
var minNumberOfHours = function(initialEnergy, initialExperience, energy, experience) {
    let sum = 0;
    for(let e of energy) {
        sum += e;
    }
    let trainingHours = initialEnergy > sum ? 0 : sum + 1 - initialEnergy;
    for(let e of experience) {
        if(initialExperience <= e) {
            trainingHours += 1 + (e - initialExperience);
            initialExperience = 2 * e + 1;
        } else {
            initialExperience += e;
        }
    }
    return trainingHours;
}
```
[2383. 赢得比赛需要的最少训练时长](https://leetcode.cn/problems/minimum-hours-of-training-to-win-a-competition/solution/ying-de-bi-sai-xu-yao-de-zui-shao-xun-li-kujd/)

## 使数组和能被P整除
给你一个正整数数组 nums，请你移除 最短 子数组（可以为 空），使得剩余元素的 和 能被 p 整除。 不允许 将整个数组都移除。

请你返回你需要移除的最短子数组的长度，如果无法满足题目要求，返回 -1 。

子数组 定义为原数组中连续的一组元素。
```js
// 输入：nums = [3,1,4,2], p = 6
// 输出：1
// 解释：nums 中元素和为 10，不能被 p 整除。我们可以移除子数组 [4] ，剩余元素的和为 6 。

// 1. 前缀和
let minSubarray = function(nums, p) {
    let x = 0;
    for(let num of nums) {
        x = (x + num) % p;
    }
    if(x === 0) return 0;
    let index = new Map();
    let y = 0, res = nums.length;
    for(let i = 0; i < nums.length; i++) {
        index.set(y, i); // f[i] mod p = y，因此哈希表记录y对应的下标为I
        y = (y + nums[i]) % p;
        if(index.has((y - x + p) % p)) {
            res = Math.min(res, i - index.get((y - x + p) % p) + 1)
        }
    }
    return res === nums.length ? -1 : res;
}
```
[使数组和能被P整除](https://leetcode.cn/problems/make-sum-divisible-by-p/solutions/2157277/shi-shu-zu-he-neng-bei-p-zheng-chu-by-le-dob9/)

## 给定行和列的和求可行矩阵
给你两个非负整数数组 rowSum 和 colSum ，其中 rowSum[i] 是二维矩阵中第 i 行元素的和， colSum[j] 是第 j 列元素的和。换言之你不知道矩阵里的每个元素，但是你知道每一行和每一列的和。

请找到大小为 rowSum.length x colSum.length 的任意 非负整数 矩阵，且该矩阵满足 rowSum 和 colSum 的要求。

请你返回任意一个满足题目要求的二维矩阵，题目保证存在 至少一个 可行矩阵。
```js
// 输入：rowSum = [3,8], colSum = [4,7]
// 输出：[[3,0],
//       [1,7]]
// 解释：
// 第 0 行：3 + 0 = 3 == rowSum[0]
// 第 1 行：1 + 7 = 8 == rowSum[1]
// 第 0 列：3 + 1 = 4 == colSum[0]
// 第 1 列：0 + 7 = 7 == colSum[1]
// 行和列的和都满足题目要求，且所有矩阵元素都是非负的。
// 另一个可行的矩阵为：[[1,2],
//                   [3,5]]
const restoreMatrix = (rowSum, colSum) => {
    const n = rowSum.length, m = colSum.length;
    const matrix = new Array(n).fill(0).map(() => new Array(m).fill(0));
    let i = 0, j = 0;
    while (i < n && j < m) {
        const v = Math.min(rowSum[i], colSum[j]);
        matrix[i][j] = v;
        rowSum[i] -= v;
        colSum[j] -= v;
        if (rowSum[i] === 0) {
            ++i;
        }
        if (colSum[j] === 0) {
            ++j;
        }
    }
    return matrix;
}
```
## 和相等的子数组
给你一个小标从0开始的整数数组nums,判断是否存在两个长度为2的子数组且它们的和相等。注意，这两个子数组起始位置的下标必须不相同

如果这样的子数组存在，请返回true,否则返回false。

子数组是一个数组中一段连续非空的元素组成的序列
```js
// 输入：nums = [4,2,4]
// 输出：true
// 解释：元素为 [4,2] 和 [2,4] 的子数组有相同的和 6 。
var findSubarrays = function(nums) {
    const n = nums.length;
    const seen = new Set();
    for(let i = 0; i < n - 1; ++i) {
        let sum = nums[i] + nums[i + 1];
        if(seen.has(sum)) {
            return true;
        }
        seen.add(sum);
    }
    return false;
}
```
## 统计只差一个字符的子串数目
给你两个字符串s和t,请你找出s中的非空子串的数目，这些子串满足替换**一个不同字符**以后，是t串的子串。换言之，请你找到s和t串中恰好只有一个字符不同的子字符串对的数目。

比方说， "<s>compute</s>r" and "<s>computa</s>tion" 只有一个字符不同： 'e'/'a' ，所以这一对子字符串会给答案加 1 。

请你放回满足上述条件的不同字符串对树木。

一个字符串是一个字符串中连续的字符
```js
// 输入：s = "aba", t = "baba"
// 输出：6
// 解释：以下为只相差 1 个字符的 s 和 t 串的子字符串对：
// ("aba", "baba")
// ("aba", "baba")
// ("aba", "baba")
// ("aba", "baba")
// ("aba", "baba")
// ("aba", "baba")
// 加粗部分分别表示 s 和 t 串选出来的子字符串。

// 动态规划
var countSubstrings = function(s, t) {
    let m = s.length, n = t.length;
    let dpl = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
    let dpr = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
    for(let i = 0; i < m; i++) {
        for(let j = 0; j < n; j++) {
            dpl[i + 1][j + 1] = s[i] === t[j] ? (dpl[i][j] + 1) : 0;
        }
    }
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            dpr[i][j] = s[i] === t[j] ? (dpr[i + 1][j + 1] + 1) : 0;
        }
    }
    let ans = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (s[i] !== t[j]) {
                ans += (dpl[i][j] + 1) * (dpr[i + 1][j + 1] + 1);
            }
        }
    }
    return ans;
}
```

[统计只差一个字符的子串数目](https://leetcode.cn/problems/count-substrings-that-differ-by-one-character/solutions/2192088/tong-ji-zhi-chai-yi-ge-zi-fu-de-zi-chuan-z8xi/)














