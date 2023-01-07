---
title: web应用富文本编辑器是如何实现协同编辑的
---
富文本编辑器大家都熟。在大部分的场景中，富文本编辑器的角色和文本输入框差不多，用户输入了一些带格式的文本，系统将这些文本保存到数据库。但是在专业的文档管理中，必须要考虑的一个问题是：如何做协同编辑？ 多人同时编辑一份文档，需要保证每个人的变更都生效，且每个人看到的文档是一致的。针对这个问题，本文探讨如下几个内容。

1. 什么是OT? OT如何解决协同编辑的问题？
2. 介绍一个基于OT进行文档同步的工具:ShareDB
3. 如何用Qull编辑器实现协同编辑

<span style="color: red">最长公共子串</span>
- 个数

    ```js
    const fn = (s1, s2) => {
        let len = 0;
        let res = 0;
        // let ans = ''
        for(let i = 0; i < s1.length; i++) {
            while(s2.includes(s1.substr(i, len + 1)) && len < s1.length -i) {
                len++;
            }
            if(len > res) res = len;
            // if(len > res) {
            //     res = len;
            //     ans = s1.substr(i - res, res)
            // }
            len = 0;
        }
        return res;
    }

    console.log(fn('flow', 'aflowbxx'))

    // 好理解
    const fn = (s1, s2) => {
        let left = 0;
        let max = 0;
        while(left < s1.length) {
            let right = 0;
            while(right < s2.length) {
                let str = s1.substring(left,right)
                    if(s2.indexOf(str)>-1){
                        if(max<str.length) {
                            max = str.length
                        }
                    }
                right++;
            }
            left++;
        }
        return max
    }
    console.log(fn('flow', 'aflowbxx'))
    ```
- 最长公共子串--字符串

    ```js
    const LongCommonStr = (str1, str2) => {
        let dp = Array.from(Array(str1.length + 1), (_, i) => Array(str2.length + 1).fill(0));
        let map = new Map();
        let max = 0;
        for(let i = 1; i <= str1.length; i++) {
            for(let j = 1; j <= str2.length; j++) {
                if(str1[i - 1] === str2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                    max = Math.max(max, dp[i][j]);
                    if(!map.has(max)) map.set(max, i);
                }
            }
        }
        return str1.substring(map.get(max) - max, map.get(max));
    }
    console.log(LongCommonStr('1AB2345CD', '12345EF'))
    ```

[demo](https://www.nowcoder.com/practice/98dc82c094e043ccb7e0570e5342dd1b?tpId=37&tqId=21298&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D2%26pageSize%3D50%26search%3D%26tpId%3D37%26type%3D37&difficulty=undefined&judgeStatus=undefined&tags=&title=)

## 资料
[富文本编辑器是如何实现协同编辑的](https://zhuanlan.zhihu.com/p/416018080)