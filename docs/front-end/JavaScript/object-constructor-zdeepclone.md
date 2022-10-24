---
autoGroup-9: 对象方法
title: 原生js实现对象的深拷贝及循环引用
---
## 前言
<span style="color:red">我们使用Object.assign(target, ...sources)时,其实只是浅拷贝.只能复制第一层属性，而如果第一层属性中有对象或数组的话，其实只是对对象或数组的引用而已</span>

我们修改target里的对象属性时，source对象中对应的对象属性也会改变
```js
let source = {
    age: 'nice',
    obj: {
        name: 'nice'
    }
}
let target = {};
Object.assign(target, source);
target.obj.name = 'change';
console.log(target.obj.name); // change
console.log(source.obj.name); // change
```
## 实现深拷贝
```js
function deepCopy(target, source) {
    if(srouce === null) return;
    for(let i in source) {
        if(Object.prototype.hasOwnProperty.call(source, i)) {
            console.log(i);
            console.log(typeof i);
            if(typeof source[i] === 'object') {
                target[i] = {};
                deepCopy(target[i], source[i]);
            } else {
                target[i] = source[i];
        }
    }
}
```
需要注意的是for...in 循环中读取出来的变量都转换成string了,所以在递归传参一定要注意用 deepCopy(target[i], source[i])

- <span style="color: red">上面深拷贝仅仅实现了对象深拷贝，没有考虑到数组情况。下面代码兼具数组和对象</span>

    ```js
    function deepCopy(target) {
        let result;
        if(Object.prototype.toString.call(target) === '[object Array]') {
            result = [];
            target.forEach(element => {
                result.push(deepCopy(element));
            })
        } else if(Object.prototype.toString.call(target) === '[object Object]') {
            result = {};
            Object.keys(target).forEach(key => {
                result[key] = deepCopy(target[key])
            })
        } else {
            result = target;
        }
        return result;
    }
    ```
    顺便总结一下JS判断数据类型的几种方式和优缺点
    ```js
    Object.prototype.toString.call() // 这个方法是最好了，可以明确区分各种类型
    typeof // 这个区分不出来对象和数据和null
    Array.isArray(); // 这个用来区分数组
    instanceof // 无法区分null 和undefined
    ```
- <span style="color: red">在面试的时候被问到一个问题，再进行深拷贝时遇到循环引用时怎么办？</span>

   <span style='color: red'>解决方法应该是 用一个 Map 来存储引用类型，然后每次遇到引用属性时，就用 has 查看是否已经有了这个引用</span>
   ```js
   function deepCopy(target, map) {
        // typeof 筛选出 obj array null 前面过滤掉null
        if(!target || typeof target !== 'object') return null;
        if(!map) {
            map = new Map();
            map.set(target, true);
        }
        let result = Array.isArray(target) ? [] : {};
        Object.keys(target).forEach(property => {
            if(typeof target[property] !== 'object') {
                result[property] = target[property];
            } else {
                // 防止循环引用
                if(map.has(target[property])) {
                    console.log('进入到了这里:', property, target[property]);
                    result[property] = undefined;
                } else {
                    map.set(target[property], true);
                    result[property] = deepCopy(target[property], map);
                }
            }
        })
        return result;
   }
   ```
![result](./images/14a28f5b70dbf12c61af9dcb2b14f3766c6c7b63.png@309w_308h_progressive.png)

## 资料
[原文](https://blog.csdn.net/qq_42535651/article/details/104378693)