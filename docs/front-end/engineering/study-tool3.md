---
autoGroup-1: 公开课
title: 前端构建工具深度剖析03
---

第一天：Babel与weppack原理剖析

第二天:ESModule与Vite原理剖析

第三天：Rollup原理剖析

**noWebpack的代表：snowpack和vite**

1. tree shaking
2. 说说Visitor
3. 试试TDD测试--简读本


- ast = acorn
    - ast珠联璧合
    - sourcemap
- 字符传处理函数库
- 作用域对象 == 数据解构 描述js作用域
- walker

```
const MagicString = require('magic-string');
const s = new MagicStrinng('export var answer = 42');
console.log('s', s.snap(7).toString())
```


初级程序员太多 => vue全家桶或react全家桶 1个月事件

中高级程序员 特别缺乏