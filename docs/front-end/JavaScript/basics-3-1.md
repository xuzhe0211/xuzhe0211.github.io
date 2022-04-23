---
autoGroup-5: JS名词理解
title: GC算法介绍
---
## GC定义与作用
1. GC就是垃圾回收机制的简写
2. GC可以找到内存中的垃圾、并释放和回收空间
3. GC中垃圾是什么
程序中不在需要实用对象

```javascript
// a
function func() {
    name = 'ls';
    return `${name} id a coder`
}
const a = func();
console.log(name) //  ls

// b
function func() {
    const name = 'xz';
    return `${name} id a teacher`
}
const a = func();
console.log(a);
```
## GC算法是什么
1. GC是一种机制，垃圾回收器完成具体的工作
2. 工作的内容就是查找垃圾释放的空间、回收空间
3. 算法就是工作时查找和回收所遵循的规则

## 常见的GC算法
1. 引用计数
2. 标记清除
3. 标记整理
4. 分代回收

## 引用计数算法实现原理
引用计数核心思想：设置引用数，判断当前引用数是否为0
1. 引用计数器
2. 引用关系改变时修改引用数字
3. 引用数字为0时立即回收
```javascript
const user1 = {age: 11};
const user2 = {age: 22};
const user3 = {age: 33};
const nameList = [user1.age, user2.age, user3.age]
function fn() {
    const num1 = 1;
    const num2 = 2;
}
fn()
```

### 引用计数算法优点
1. 发现垃圾时立即回收
2. 最大限度减少程序暂停

### 引用计数算法缺点
1. 无法回收循环引用对象
    ```javascript
    function fn() {
        const obj1 = {};
        const obj2 = {};
        obj1.name = obj2;
        obj2.name = obj1;
    }
    fn()
    ```
2. 时间开销大，资源消耗大
## 标记清除实现原理
核心思想：分标记和清除二个阶段完成
1. 遍历所有对象找标记活动对象
2. 遍历所有对象清除没有标记对象
3. 回收相应的空间

优点： 可以回收循环循环引用的对象

缺点：容易产生碎片化空间，浪费空间；不会立即回收垃圾对象

## 标记整理算法实现原理
1. 标记整理可以看到是标记清除的增强
2. 标记阶段的操作和标记清除一致
3. 清除阶段会先执行整理，移动对象位置

优点：减少碎片化空间

缺点：不会立即回收垃圾对象


## 资料
[前端面试——JS垃圾回收机制](https://blog.csdn.net/qq_21428081/article/details/82465801)

[Java虚拟机详解04----GC算法和种类【重要】](https://www.cnblogs.com/qianguyihao/p/4744233.html)