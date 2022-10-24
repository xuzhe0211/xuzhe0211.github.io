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
            if(!top) break;
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
[柱形图中最大的矩形](/front-end/Code/#最小面积矩形)
## 有效括号
```js
// 验证
let isValid = s => {
    let stack = [];
    for(let val of s) {
        if(val === '(') stack.push(')')
        else if(val === '[') stack.push(']')
        else if(val === '{') stack.push('}');
        else (stack.length === 0 || val !== stack.pop()) return false;
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
```
[股票价格跨度](https://leetcode.cn/problems/online-stock-span/description/?languageTags=javascript)

## 资料
[数据结构--重要](/front-end/Code/concept-xsummary.html#数据结构)

[leetcode学习](https://leetcode.cn/leetbook/detail/queue-stack/)