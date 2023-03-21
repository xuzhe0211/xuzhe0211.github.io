---
title: 扁平数组与树形结构相互转换的算法
---

## 数据与结构
1. 扁平数组
  ```json
  [
    {
      "id": "01",
      "name": "张大大",
      "pid": "",
      "job": "项目经理"
    },
    {
      "id": "02",
      "name": "小亮",
      "pid": "01",
      "job": "产品leader"
    },
    {
      "id": "03",
      "name": "小美",
      "pid": "01",
      "job": "UIleader"
    },
    {
      "id": "04",
      "name": "老马",
      "pid": "01",
      "job": "技术leader"
    },
    {
      "id": "05",
      "name": "老王",
      "pid": "01",
      "job": "测试leader"
    },
    {
      "id": "06",
      "name": "老李",
      "pid": "01",
      "job": "运维leader"
    },
    {
      "id": "07",
      "name": "小丽",
      "pid": "02",
      "job": "产品经理"
    },
    {
      "id": "08",
      "name": "大光",
      "pid": "02",
      "job": "产品经理"
    },
    {
      "id": "09",
      "name": "小高",
      "pid": "03",
      "job": "UI设计师"
    },
    {
      "id": "10",
      "name": "小刘",
      "pid": "04",
      "job": "前端工程师"
    },
    {
      "id": "11",
      "name": "小华",
      "pid": "04",
      "job": "后端工程师"
    },
    {
      "id": "12",
      "name": "小李",
      "pid": "04",
      "job": "后端工程师"
    },
    {
      "id": "13",
      "name": "小赵",
      "pid": "05",
      "job": "测试工程师"
    },
    {
      "id": "14",
      "name": "小强",
      "pid": "05",
      "job": "测试工程师"
    },
    {
      "id": "15",
      "name": "小涛",
      "pid": "06",
      "job": "运维工程师"
    }
  ]
  ```
2. 树形结构
  ```json
  [
    {
      "id": "01",
      "name": "张大大",
      "pid": "",
      "job": "项目经理",
      "children": [
        {
          "id": "02",
          "name": "小亮",
          "pid": "01",
          "job": "产品leader",
          "children": [
            {
              "id": "07",
              "name": "小丽",
              "pid": "02",
              "job": "产品经理",
              "children": []
            },
            {
              "id": "08",
              "name": "大光",
              "pid": "02",
              "job": "产品经理",
              "children": []
            }
          ]
        },
        {
          "id": "03",
          "name": "小美",
          "pid": "01",
          "job": "UIleader",
          "children": [
            {
              "id": "09",
              "name": "小高",
              "pid": "03",
              "job": "UI设计师",
              "children": []
            }
          ]
        },
        {
          "id": "04",
          "name": "老马",
          "pid": "01",
          "job": "技术leader",
          "children": [
            {
              "id": "10",
              "name": "小刘",
              "pid": "04",
              "job": "前端工程师",
              "children": []
            },
            {
              "id": "11",
              "name": "小华",
              "pid": "04",
              "job": "后端工程师",
              "children": []
            },
            {
              "id": "12",
              "name": "小李",
              "pid": "04",
              "job": "后端工程师",
              "children": []
            }
          ]
        },
        {
          "id": "05",
          "name": "老王",
          "pid": "01",
          "job": "测试leader",
          "children": [
            {
              "id": "13",
              "name": "小赵",
              "pid": "05",
              "job": "测试工程师",
              "children": []
            },
            {
              "id": "14",
              "name": "小强",
              "pid": "05",
              "job": "测试工程师",
              "children": []
            }
          ]
        },
        {
          "id": "06",
          "name": "老李",
          "pid": "01",
          "job": "运维leader",
          "children": [
            {
              "id": "15",
              "name": "小涛",
              "pid": "06",
              "job": "运维工程师",
              "children": []
            }
          ]
        }
      ]
    }
  ]
  ```

## 转换算法
### 扁平数组转树形结构
```javascript
function arrayToTree(arr) {
  let tree = [];
  let map = {};
  for (let item of arr) {
    // 一个新的带children的结构
    let newItem = map[item.id] = {
      ...item,
      children: []
    }
    if(map[item.pid]) { // 父节点已存进map，则在父节点的children添加新元素
      let parent = map[item.pid];
      parent.children.push(newItem);
    } else { // 没有父节点，在更节点添加父节点
      tree.push(newItem);
    }
  }
  return tree;
}
```
### 树形结构转扁平数组
```javascript
function flatten(tree, arr = []) {
  tree.forEach(item => {
    const {children, ...props} = item;
    // 添加处了children的属性
    arr.push(props);
    if (children) {
      // 递归将所有节点加入到结果集中
      flatten(children, arr)
    }
  })
}
```

## demo
```js
// 非顺序型
const input = [
    {id: 1, name: '河北', pid: 0},
    {id: 2, name: '郑州', pid: 8},
    {id: 3, name: '洛阳', pid: 8},
    {id: 5, name: '保定', pid: 1},
    {id: 6, name: '石家庄', pid: 1},
    {id: 7, name: '郑东新区', pid: 2},
    {id: 8, name: '河南', pid: 0},
];
// 数组-tree
const arrayTotree = nums => {
    let ret = [];
    const dfs = (nums, ret, id) => {
        for(let i = 0; i < nums.length; i++) {
            const item = nums[i];
            if(item.pid === id) {
                const newItem = {...item, children: []}
                ret.push(newItem);
                dfs(nums, newItem.children, item.id);
            }
        }
    }
    dfs(nums, ret, 0)
    return ret;
}
console.log(arrayTotree(input))

// demo2
const data = [
    { id: 1, next: 2 },
    { id: 3, next: 4 },
    { id: 4, next: 5 },
    { id: 5, next: 6 },
    { id: 6, next: 7 },
    { id: 7, next: 8 },
    { id: 8, next: 9 },
    { id: 2, next: 10 },
    { id: 20, next: 30 },
    { id: 30, next: 40 },
    { id: 100, next: 78 }
]
const fn = nums => {
    let res = [];
    let map = {};
    let nextAll = [];
    for(let item of nums) {
        map[item.id] = [{...item}]
        nextAll.push(item.next);
    }
    for(let item of nums) {
        let id = item.id;
        let next = item.next;
        const curItem = map[next];
        if(map[next]) {
            map[id] = map[id].concat(curItem)
        } 
        if(!nextAll.includes(id)) {
            res.push(map[id])
        }
    }
    return res;
}
console.log(fn(data))
```

## 资料
[面试了十几个高级前端，竟然连（扁平数据结构转Tree）都写不出来](https://juejin.cn/post/6983904373508145189)

[列表和树结构相互转换--11](/front-end/Code/tree-01.html#列表和树结构相互转换)