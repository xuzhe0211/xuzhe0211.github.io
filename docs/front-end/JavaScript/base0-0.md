---
autoGroup-0: 基础知识
title: 函数提升、变量提升
---
```js
// demo1 
function a() {}
var a 
console.log(typeof a) // function

// demo2
function a() {}
var a  = 1
console.log(typeof a) // number


console.log(typeof a) // function
function a() {}
var a  = 1
```
- <span style="color: red">函数提升和变量提升</span>
- <span style="color: red">函数提升优先级高于变量提升</span>
- <span style="color: red">**函数提升不会被变量提升的声明覆盖**</span>

## 资料
[一道经典面试题](/front-end/JavaScript/tips-foo)

[前端经典面试题](/front-end/interview/dachanng3.html#程序阅读题)