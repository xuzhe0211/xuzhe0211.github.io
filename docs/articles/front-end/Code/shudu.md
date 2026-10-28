---
title: JS实现 有效的数独
category:
  - 前端技术
tag:
  - 算法
  - 前端
---

```js
请你判断一个9X9的数独是否有效。只需要根据以下规则，验证已经填入的数字是否有效即可。
数字1-9在每一行只能出现一次
数字1-9在每一列只能出现一次
数字1-9在每一个以粗实线分割的3X3宫内只能出现一次。
数独部分空格内已填入了数字，空白格用'.'表示
```
整体实现 思路：

三个遍历，行、列、快遍历

```js
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
  let line = Array.from({ length: 9 }, () => Array(9)),
    column = Array.from({ length: 9 }, () => Array(9)),
    // 3x3  宫
    block = Array.from({ length: 3 }, () => Array(3)),
    // 任意一种组合满足要求，终止递归
    isEnd = false,
    // 待填充的坐标
    spaces = []
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      block[i][j] = Array(9)
    }
  }
  // 初始化行、列、子块数据
  for (let i = 0; i < 9; ++i) {
    for (let j = 0; j < 9; ++j) {
      if (board[i][j] == '.') {
        spaces.push([i, j])
      } else {
        // 注意：数字是1-9,校验的行、列、子块数据索引是0-8，所以标记时值需要-1
        let k = board[i][j] - 1,
          // 子块坐标
          x = parseInt(i / 3, 10),
          y = parseInt(j / 3, 10)
        line[i][k] = true
        column[j][k] = true
        block[x][y][k] = true
      }
    }
  }

  dfs(board, 0)

  function dfs(board, index) {
    if (index == spaces.length) {
      isEnd = true
      return
    }
    // 递归这个填充board中的字符 '.'
    let [i, j] = spaces[index]
    for (let k = 0; k < 9 && !isEnd; ++k) {
      let x = parseInt(i / 3, 10),
        y = parseInt(j / 3, 10)
      // 行内、列内、子块内无当前枚举数字则填充
      if (!line[i][k] && !column[j][k] && !block[x][y][k]) {
        line[i][k] = true
        column[j][k] = true
        block[x][y][k] = true
        board[i][j] = String(k + 1)
        // 递归填充下一个，如果递归为遇到终止逻辑则说明本地填充错误
        dfs(board, index + 1)
        // 将填充状态恢复到未填充
        line[i][k] = false
        column[j][k] = false
        block[x][y][k] = false
      }
    }
  }
}
```



![有效数独](https://juejin.cn/post/6872698823941685256)