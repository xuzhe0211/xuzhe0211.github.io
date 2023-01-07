---
autoGroup-0: 概念
title: 利用栈/队列
---
## 接雨水
```js
let trap = height => {
    let stack = [];
    let ans = 0;
    let n = height.length;
    for(let i = 0; i < n; i++) {
        if(stack.length && height[i] > height[stack[stack.length - 1]]) {
            let top = stack.pop();
            if(!stack.length) break;
            let left = stack[stack.length - 1];
            let curWidth = i - left - 1;
            let curHeight = Math.min(height[left], height[i] - height[top]);
            ans += curWidth * curHeight;
        }
        stack.push(i);
    }
    return ans;
}
```
[接雨水](/front-end/Code/#接雨水)
## 柱形图中最大的矩形
```js
const larestRectangleArea = heights => {
    let maxArea = 0;
    let stack = [];
    heights = [0, ...heights, 0];
    for(let i = 0; i < heights.length; i++) {
        while(heights[i] < heights[stack[stack.length - 1]]) {
            const stackTopIndex = stack.pop();
            maxArea = Math.max(maxArea, heights[stackTopIndex] * (i  - stack[stack.length - 1] - 1))
        }
        stack.push(i);
    }
    return maxArea;
}
```
[柱形图中最大的矩形](/front-end/Code/#柱状图中最大的矩形)
## 有效括号
```js
// 验证
let isValid = s => {
    let stack = [];
    for(let val of s) {
        if(val === '(') stack.push(')')
        else if(val === '[') stack.push(']')
        else if(val === '{') stack.push('}');
        else if(stack.length === 0 || val !== stack.pop()) return false;
    }
    return stack.length === 0;
}
// 最长有效括号
const longestPalindrome = s => {
    let maxLen = 0;
    let stack = [];
    stack.push(-1);
    for(let i = 0; i < s.length; i++) {
        let c = s[i];
        if(c === '(') {
            stack.push(i);
        } else {
            stack.pop();
            if(stack.length) {
                const curMaxLen = i - stack[stack.length - 1];
                maxLen = Math.max(maxLen, curMaxLen)
            } else {
                stack.push(i);
            }
        }
    }
    return maxLen;
}
```
[有效括号](/front-end/Code/#最长有效括号)

[真题](/front-end/interview/coding4.html#算法案例)

## 股票价格跨度
```js
输入：["StockSpanner","next","next","next","next","next","next","next"], [[],[100],[80],[60],[70],[60],[75],[85]]
输出：[null,1,1,1,2,1,4,6]
解释：
首先，初始化 S = StockSpanner()，然后：
S.next(100) 被调用并返回 1，
S.next(80) 被调用并返回 1，
S.next(60) 被调用并返回 1，
S.next(70) 被调用并返回 2，
S.next(60) 被调用并返回 1，
S.next(75) 被调用并返回 4，
S.next(85) 被调用并返回 6。

注意 (例如) S.next(75) 返回 4，因为截至今天的最后 4 个价格
(包括今天的价格 75) 小于或等于今天的价格。
```
```js
const StockSpanner = function() {
    this.stack = [];
    this.stack.push([-1, Number.MAX_VALUE]);
    this.idx = -1;
}
StockSpanner.prototype.next = function(price) {
    this.idx++;
    while(price >= this.stack[this.stack.length - 1][1]) {
        this.stack.pop();
    }
    let ret = this.idx - this.stack[this.stack.length - 1][0];
    this.stack.push([this.idx, price]);
    return ret;
}

// var stockSpanner = new StockSpanner();
// stockSpanner.next(100)
// stockSpanner.next(80)
// stockSpanner.next(60)
// stockSpanner.next(70)
// ...
```
[股票价格跨度](https://leetcode.cn/problems/online-stock-span/description/?languageTags=javascript)

## 最大频率栈
```js
设计一个类似堆栈的数据结构，将元素推入堆栈，并从堆栈中弹出出现频率最高的元素。

实现 FreqStack 类:

FreqStack() 构造一个空的堆栈。
void push(int val) 将一个整数 val 压入栈顶。
int pop() 删除并返回堆栈中出现频率最高的元素。
如果出现频率最高的元素不只一个，则移除并返回最接近栈顶的元素。

["FreqStack","push","push","push","push","push","push","pop","pop","pop","pop"],
[[],[5],[7],[5],[7],[4],[5],[],[],[],[]]
输出：[null,null,null,null,null,null,null,5,7,5,4]
解释：
FreqStack = new FreqStack();
freqStack.push (5);//堆栈为 [5]
freqStack.push (7);//堆栈是 [5,7]
freqStack.push (5);//堆栈是 [5,7,5]
freqStack.push (7);//堆栈是 [5,7,5,7]
freqStack.push (4);//堆栈是 [5,7,5,7,4]
freqStack.push (5);//堆栈是 [5,7,5,7,4,5]
freqStack.pop ();//返回 5 ，因为 5 出现频率最高。堆栈变成 [5,7,5,7,4]。
freqStack.pop ();//返回 7 ，因为 5 和 7 出现频率最高，但7最接近顶部。堆栈变成 [5,7,5,4]。
freqStack.pop ();//返回 5 ，因为 5 出现频率最高。堆栈变成 [5,7,4]。
freqStack.pop ();//返回 4 ，因为 4, 5 和 7 出现频率最高，但 4 是最接近顶部的。堆栈变成 [5,7]。
```
```js
const FreqStack = function() {
    this.freq = new Map();
    this.group = new Map();
    this.maxFreq = 0;
}
FreqStack.prototype.push = function(val) {
    this.freq.set(val, (this.freq.get(val) || 0) + 1);
    if(!this.group.has(this.freq.get(val))) {
        this.group.set(this.freq.get(val), []);
    }
    this.group.get(this.freq.get(val)).push(val);
    this.maxFreq = Math.max(this.maxFreq, this.freq.get(val));
}
FreqStack.prototype.pop = function() {
    const val = this.group.get(this.maxFreq)[this.group.get(maxFreq).length - 1];
    this.freq.set(val, this.freq.get(val) - 1);
    this.group.get(this.maxFreq).pop();

    if(this.group.get(this.maxFreq).length === 0) {
        this.maxFreq--;
    }
    return val;
}
const freqstack = new FreqStack();
freqstack.push(5)
freqstack.push(7)
freqstack.push(5)
freqstack.push(7)
freqstack.push(4)
freqstack.push(5)
console.log(freqstack.pop());
console.log(freqstack.pop());
console.log(freqstack.pop());
console.log(freqstack.pop());
```


[最大频率栈](https://leetcode.cn/problems/maximum-frequency-stack/description/?languageTags=javascript)

## 子数组的最小值之和
```js
给定一个整数数组 arr，找到 min(b) 的总和，其中 b 的范围为 arr 的每个（连续）子数组。

由于答案可能很大，因此 返回答案模 10^9 + 7 。

输入：arr = [3,1,2,4]
输出：17
解释：
子数组为 [3]，[1]，[2]，[4]，[3,1]，[1,2]，[2,4]，[3,1,2]，[1,2,4]，[3,1,2,4]。 
最小值为 3，1，2，4，1，1，2，1，1，1，和为 17。
```
```js
// 单调栈
const sumSubarrayMins = arr => {
    let n = arr.length;
    let monoStack = [];
    let left = new Array(n).fill(0);
    let right = new Array(n).fill(0);
    for(let i = 0; i < n; i++) {
        while(monoStack.length !== 0 && arr[i] <= arr[monoStack[monoStack.length - 1]]) {
            monoStack.pop();
        }
        left[i] = i - (monoStack.length === 0 ? -1 : monoStack[monoStack.length - 1]);
        monoStack.push(i);
    }
    monoStack = [];
    for(let i = n - 1; i >= 0; i--) {
        while(monoStack.length !== 0 && arr[i] < arr[monoStack[monoStack.length - 1]]) {
            monoStack.pop();
        }
        right[i] = (monoStack.length === 0 ? n : monoStack[monoStack.length - 1]) - i;
        monoStack.push(i);
    }
    let ans = 0;
    const MOD = 1000000007;
    for (let i = 0; i < n; i++) {
        ans = (ans + left[i] * right[i] * arr[i]) % MOD; 
    }
    return ans;
}
```
[子数组的最小值之和](https://leetcode.cn/problems/sum-of-subarray-minimums/solutions/1929461/zi-shu-zu-de-zui-xiao-zhi-zhi-he-by-leet-bp3k/?languageTags=javascript)

## 资料
[数据结构--重要](/front-end/Code/concept-xsummary.html#数据结构)

[leetcode学习](https://leetcode.cn/leetbook/detail/queue-stack/)