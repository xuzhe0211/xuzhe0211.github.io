---
title: 面试了十几个高级前端，竟然连（扁平数据结构转Tree）都写不出来
---
## 前言
题目：打平的数据内容如下：
```javascript
let arr = [
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 4},
]
```
输出结果
```json
[
    {
        "id": 1,
        "name": "部门1",
        "pid": 0,
        "children": [
            {
                "id": 2,
                "name": "部门2",
                "pid": 1,
                "children": []
            },
            {
                "id": 3,
                "name": "部门3",
                "pid": 1,
                "children": [
                    // 结果 ,,,
                ]
            }
        ]
    }
]
```
我们的要求很简单，可以先不用考虑性能问题。实现功能即可，回头分析了面试的情况，结果使我大吃一惊。

10%的人没思路，没碰到过这种结构

60%的人说用过递归，有思路，给他个笔记本，但就是写不出来

20%的人在引导下，磕磕绊绊能写出来

剩下10%的人能写出来，但性能不是最佳

感觉不是在招聘季节遇到一个合适的人真的很难。

接下来，我们用几种方法来实现这个小算法

## 什么是好算法，什么是坏算法
判断一个算法的好坏，一般从<span style="color: orange">执行时间</span>和<span style="color: orange">占用空间</span>来看，执行时间越短，占用的内存空间越小，那么它就是好的算法.对应的，我们常常用时间复杂度代表执行时间，空间复杂度代表占用的内存空间

### 时间复杂度
> 时间复杂度的计算并不是计算程序具体运行的时间，而是算法执行语句的次数

随着<u>n</u>的不断增大,时间复杂度不断<u>增大</u>，算法<u>胡斐时间越多</u>。常见的时间复杂度有

- 常数阶<span style="color: orange">O(1)</span>
- 对数阶<span style="color: orange">O(log2n)</span>
- 线性阶<span style="color: orange">O(n)</span>
- 线性对数阶<span style="color: orange">O(n log2n)</span>
- 平方阶<span style="color: orange">O(n^2)</span>
- 立方阶<span style="color: orange">O(n^3)</span>
- K次方阶<span style="color: orange">O(n^K)</span>
- 指数阶<span style="color: orange">O(2^n)</span>
#### 计算方法
1. 选取相对增长最高的项
2. 最高项系数都化为1
3. 若是常量的话用O(1)表示

举个例子：如(n) = 3*n^4 + 3n + 300 则O(n) = n^4

通常我们计算时间复杂度都是计算最坏情况。计算时间复杂度的要注意的几个点

- 如果算法的执行时间<span style="color: orange">不随n</span>而<span style="color: orange">增长</span>。假如算法中有<span style="color: orange">上千条</span>语句，执行时间也不过是一个<span style="color: orange">较大的常数</span>。此类算法的时间复杂度<span style="color: orange">是O(1)</span>。 举例如下：代码执行100次，是一个常数，复杂度也是O<span style="color: orange">(1)</span>。

  ```javascript
  let x = 10;
  while(x < 100) {
    x++;
  }
  ```
- 有<span style="color: orange">多个循环语句</span>的时候，算法的时间复杂度是有<span style="color: orange">嵌套层数最多</span>的循环语句中<span style="color: orange">最内层</span>。距离：在下面的for循环中，<span style="color: orange">外层循环</span>每执行<span style="color: orange">一次</span>，<span style="color: orange">内层循环</span>要执行<span style="color: orange">n</span>次，执行次数是根据n所决定的，时间复杂度为<span style="color: orange">O(n^2)</span>

  ```javascript
  for(i = 9; i < n; i++) {
    for (j = 0; j < n; j++) {
      // ...code
    }
  }
  ```

- 循环不仅与<span style="color: orange">n</span>有关，还与执行循环<span style="color: orange">判断条件</span>有关。举例：在代码中，如果<span style="color: orange">arr[i]</span>不等于<span style="color: orange">1</span>的话，时间复杂度是O(n).如果<span style="color: orange">arr[i]</span>等于<span style="color: orange">1</span>的换，循环不执行，时间复杂度是<span style="color: orange">O(0)</span>

  ```javascript
  for (var i = 0; i < n && arr[i]!= 1; i++) {
    // ...code
  }
  ```

### 空间复杂度
> 空间复杂度是对算法在运行过程中临时占用存储空间的大小
#### 计算方法
1. 忽略常数，用O(1)表示
2. 递归算法的空间复杂度=(递归深度n) * (每次递归所要的辅助空间)

计算空间复杂度的简单几点

- 仅仅只复制单个变量，空间复杂度为O(1).举例：空间复杂度为O(n)= O(1).

  ```javascript
  let a = 1;
  let b = 2; 
  let c = 3;
  console.log('输出a,b,c',a, b, c)
  ```

- <span style="color: red">**递归实现，调用fun函数，每次都创建1个变量k。调用n次，空间复杂度O(n * 1) = O(n)**</span>

  ```
  function fun(n) {
    let k = 10;
    if (n === k) {
      return n;
    } else {
      return fun(++n);
    }
  }
  ```
## 不考虑性能实现，递归遍历查找
主要思路是提供一个<span style="color: orange">getChild</span>的方法，该方法<span style="color: orange">递归</span>去查找子集。就这样，不用考虑性能，无脑去查，大多数人只知道递归，就是写不出来
``` javascript
/**
 * 递归查找，获取children
*/
const getChildren = (data, result, pid) => {
  for (const item of data) {
    if (item.pid === pid) {
      const newItem = {...item, children: []};
      result.push(newItem);
      getChildren(data, newItem.children, item.id);
    }
  }
}
/**
 * 转换方法
*/
const arrayToTree = (data, pid) => {
  cosnt result = [];
  getChildren(data, result, pid);
  return result;
}
```
从上面代码我们分析，该实现的时间复杂度<span style="color: orange">O(2^n)</span>

## 不用递归，也能搞定
主要思路是把数据转成<span style="color: orange">Map</span>去存储，之后遍历的同时借助<span style="color: orange">对象引用</span>,直接从<span style="color: orange">Map</span>找对应的数据做存储
```javascript
function arrayToTree(items) {
  const result = [];   // 存放结果集
  const itemMap = {};  // 
    
  // 先转成map存储
  for (const item of items) {
    itemMap[item.id] = {...item, children: []}
  }
  
  for (const item of items) {
    const id = item.id;
    const pid = item.pid;
    const treeItem =  itemMap[id];
    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        }
      }
      itemMap[pid].children.push(treeItem)
    }

  }
  return result;
}
```
从上面的代码我们分析，有两次循环，该实现的时间复杂度为<span style="color: orange">O(2n)</span>，需要一个Map把数据存储起来，空间复杂度<span style="color: orange">O(n)</span>

## 最优性能
主要思路也是把数据转成<span style="color: orange">Map</span>去存储，之后遍历的同时借助<span style="color: orange">对象的引用</span>,直接从<span style="color: orange">Map</span>找对应的数据做存储。不同点在遍历的时候就做<span style="color: orange">Map</span>存储，有找对应关系，性能更好
```javascript
function arrayToTree(items) {
  const result = [];   // 存放结果集
  const itemMap = {};  // 
  for (const item of items) {
    const id = item.id;
    const pid = item.pid;

    if (!itemMap[id]) {
      itemMap[id] = {
        children: [],
      }
    }

    itemMap[id] = {
      ...item,
      children: itemMap[id]['children']
    }

    const treeItem =  itemMap[id];

    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        }
      }
      itemMap[pid].children.push(treeItem)
    }

  }
  return result;
}
```
从上面的代码我们分析，一次循环就搞定了，该实现的时间复杂度为<span style="color: orange">O(n)</span>，需要一个Map把数据存储起来，空间复杂度<span style="color: orange">O(n)</span>

## 资料
[原文](https://juejin.cn/post/6983904373508145189)

[树结构、扁平化数组相互转换](https://juejin.cn/post/7037078362417791007)

[前端面试手撕 对象的扁平化与反扁平化](https://juejin.cn/post/7013309942576709640)