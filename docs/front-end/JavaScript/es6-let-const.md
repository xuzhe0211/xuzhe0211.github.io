---
autoGroup-13: ES6
title: let vs const实现
---
## let 实现
```js
var funcs = [];
for(let i = 0; i < 10; i++) {
    funcs[i] = function() {
        console.log(i);
    }
}
funcs[0]();
```
babel编译之后的ES5代码
```js
var funcs = [];
function _loop(i) {
    funcs[i] = function() {
        console.log(i);
    }
}
for(var i = 0; i < 10; i++) {
    _loop(i)
    // (function(i) {
    //     funcs[i] = function() {
    //         console.log(i)
    //     }
    // })(i)
}
funcs[0]();
```
## const 实现
### 对象里目前的属性描述符有两种
- 数据描述符:具有值的属性
- 存取描述符:由getter和setter函数对描述的属性

### 描述符功能
- 数据描述符与存取描述符皆可修改
    - configurable: 当前对象元素的属性描述符是否可改，是否可删除
    - enumberable: 当前对象元素是否可枚举
- 唯有数据描述符可以修改
    - value: 当前对象元素的值
    - writable: 当前对象元素的值是否可修改
- 唯有存取描述符可以休
    - get: 读取元素属性值时的操作
    - set: 修改元素属性值时的操作
- 描述符可同时具有的键值

    -|configurable | enumberable | value | writable | get
    --|---|---| ---| ---|---
    数据描述符| Yes | Yes | Yes | Yes | No
    存储描述符| Yes | Yes | No | No | Yes

### const 实现原理
> 由于ES5环境没有block(块)的概念,所以是无法百分百实现const,只能挂载到某个对象下，要么是全局的window，要么就是自定义一个object来当容器

```js
const __const = function(data, value) {
    window.data = value; 
    Object.defineProperty(window, data, {
        enumerable: false,
        configurable: false,
        get() {
            return value;
        },
        set(data) {
            if(data !== value) {
                throw new Error('Assignment to constant variable.')
            } else {
                return value;
            }
        }
    })
}
__const('a', 10);
console.log(a);
delete a;
console.log(a);
for(let item in window) { // 因为const定义的属性在global下也是不存在的，所以用到了enumerable: false来模拟这一功能
    if(item === 'a') { // 因为不可枚举 所以不执行
        console.log(window[item])
    }
}
a = 20 // 报错
```

[let实现](/front-end/interview/dachang2.html#困难)

[对象构造函数属性方法](/front-end/JavaScript/object-constructor-methods-property.html#object-defineproperty)