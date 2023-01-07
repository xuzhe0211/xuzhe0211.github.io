---
title: 大厂coding
---
## 合并二维有序数组成一纬有序数组，归并排序思路

```javascript
const mergeSort = arr => {
    const len = arr.length
    // 处理边界情况 ---- 二维数组
    if(len <= 1) {
        return arr[0]
        // return arr; // 处理边界--归并排序 一纬
    }   
    // 计算分割点
    const mid = Math.floor(len / 2)    
    // 递归分割左子数组，然后合并为有序数组
    const leftArr = mergeSort(arr.slice(0, mid)) 
    // 递归分割右子数组，然后合并为有序数组
    const rightArr = mergeSort(arr.slice(mid,len))  
    // 合并左右两个有序数组
    arr = mergeArr(leftArr, rightArr)  
    // 返回合并后的结果
    return arr
}
const mergeArr = (arr1, arr2) => {
        // 初始化两个指针，分别指向 arr1 和 arr2
    let i = 0, j = 0   
    // 初始化结果数组
    const res = []    
    // 缓存arr1的长度
    const len1 = arr1.length  
    // 缓存arr2的长度
    const len2 = arr2.length  
    // 合并两个子数组
    while(i < len1 && j < len2) {
        if(arr1[i] < arr2[j]) {
            res.push(arr1[i])
            i++
        } else {
            res.push(arr2[j])
            j++
        }
    }
    // 若其中一个子数组首先被合并完全，则直接拼接另一个子数组的剩余部分
    if(i<len1) {
        return res.concat(arr1.slice(i))
    } else {
        return res.concat(arr2.slice(j))
    }
    // return i < len1 ? res.concat(arr1.slice(i)) : res.concat(arr2.slice(j))
}

var arr = [[1,2,4], [2,3,7], [3,5,7], [4,5,8]];
console.log(mergeSort(arr))
```

[github](https://github.com/lgwebdream/FE-Interview/issues/8)

[合并两个有序数组](/front-end/Code/stady-02.html#双指针)
## 实现一个方法decodeStr,输入一个字符串，根据约定规则输出编码结果
```javascript
// str = "2[a]1[bc]", 返回 "aabc".
// str = "2[e2[d]]", 返回 "eddedd".
//str = "3[abc]2[cd]ff", 返回 "abcabcabccdcdff"

// 实现方式一
const decodeStr = str => {
    if (typeof str !== 'string') {
        throw '请输入字符串';
    }
    let index = 0, decodeQueue = [];
    while(index < str.length) {
        let eleStr = str[index];
        if (eleStr === '[') {
            decodeQueue.push(index);
        }
        if (decodeQueue.length > 0 && eleStr === ']') {
            let leftIndex = decodeQueue.pop();
            let rightIndex = index;
            str = strFormat(str, leftIndex, rightIndex);
            index = 0;
            continue;
        }
        index++;
    }
    return str;
}
let strFormat = (str, startIndex, rightIndex) => {
    let temp = str.substring(startIndex + 1, rightIndex);
    let copiedStr = '';
    let copyNum = '';
    while(str[--startIndex] >= 0) { // Number('a') NaN 
        copyNum = str[startIndex] + copyNum;
    }
    for (let i = 0; i < copyNum; i++) {
        copiedStr += temp;
    }
    str = str.substring(0, startIndex + 1) + copiedStr + str.substring(rightIndex + 1);
    return str
}

// 实现方式二
function decodeStr(str) {
    if (typeof str !== 'string') {
        throw '请插入字符串'
    }
    while(str.indexOf('[') > 0) {
        str = str.replace(/(\d+)\[(\w+)\]/g, (match, num, str) => str.repeat(num));
    }
    return str
}
```
[github](https://github.com/lgwebdream/FE-Interview/issues/1023)


## 如何实现一个ORM类似的find链式调用
```javascript
const find = data => {
    return {
        data,
        where(match) {
            this.data = this.data.filter((item) => {
                return Object.entries(match).every(([key, value]) => {
                    if (value instanceof RegExp) {
                        return value.test(item[key]);
                    }
                    return item[key] === value;
                })
            })
            return this;
        },
        orderBy (key, type) {
            this.data.sort((x, y) => type !== 'desc' ? x[key] - y[key] : y[key] - x[key])
            return this.data
        }
    }
}

const data = [
    { userId: 8, title: 'title1' },
    { userId: 11, title: 'other' },
    { userId: 15, title: null },
    { userId: 19, title: 'title2' },
]
const result = find(data).where({
    'title': /\d$/ // 这里意思是过滤处数组中，满足title符合/\d$/的项
}).orderBy('userId', 'desc')
console.log(result);
```
## 如何实现类似lodash.get函数
```javascript
const get = (source, path, defaultValue = undefined) => {
    // a[3].b -> a.3.b -> [a, 3, b]
    const paths = path.replace(/\[(\w+)\]/g, '.$1').replace(/\["(\w+)"\]/g, '.$1').replace(/\['(\w+)'\]/g, '.$1').split('.')
    console.log(paths)
    let result = source;
    for (const p of paths) {
        result = result?.[p];
    }
    return result === undefined ? defaultValue : result;
}


const object = {'a': [{'b': {'c': 3}}]}
// console.log(object['a'][0]['b'])

const a = get(object, 'a[0].b.c') // 3
const b = get(object, 'a[0]["b"]["c"]') // 3
const c = get(object, 'a[100].b.c', 10086); // 10086

console.log(a, b, c)
```

## 如何实现一个数组的洗牌函数
[类似问题-怎么在制定数据源里面生成一个长度为n的不重复的随机数组，能有几种方法，时间复杂度多少](/front-end/interview/dachang2.html#简单)
```javascript
const shuffle = arr => {
    const result = [...arr]; // 复制--浅复制
    for (let i = 0; i < result.length; i++) {
        const swapIndex = Math.floor(Math.random() * (i + 1));
         [result[i], result[swapIndex]] = [result[swapIndex], result[i]]
    }
    return result;
}

const a = shuffle([1, 2, 3, 4])

console.log(a)
```
## 实现一个柯里化
```javascript
const curry = function(fn) {
    const arity = fn.length; // 获取参数个数

    return function $curry(...args) {
        if (args.length === arity) {
            return fn.apply(null, args);
        } else {
            return function(...args2) {
                return $curry.apply(null, args.concat(args2))
            }
        }
    }
}
const test = function(a, b, c) {
    return a + b + c;
}

const curriedTest = curry(test);
const result = curriedTest(1)(2)(3);
console.log('result:', result); // 6

const result2 = curriedTest(1)(2, 3);
console.log('result2:', result2); // 6
```
[github](https://github.com/lgwebdream/FE-Interview/issues/292)

## 实现add(1)(2)(3)
```javascript
// 参数长度固定
const curry = fn => (judge = (...args) => args.length === fn.length ? fn(...args) : (...args2) => judge(...args, ...args2))
const add = (a, b, c) => a + b + c;
const curryAdd = curry(add);
console.log(curryAdd(1)(2)(3)); // 6
console.log(curryAdd(1, 2)(3)); // 6
console.log(curryAdd(1)(2, 3)); // 6

// 参数长度不固定
function add (...args) {
    //求和
    return args.reduce((a, b) => a + b)
}
function currying (fn) {
    let args = []
    return function temp (...newArgs) {
        if (newArgs.length) {
            args = [
                ...args,
                ...newArgs
            ]
            return temp
        } else {
            let val = fn.apply(this, args)
            args = [] //保证再次调用时清空
            return val
        }
    }
}

let addCurry = currying(add)
console.log(addCurry(1)(2)(3)(4, 5)())  //15
console.log(addCurry(1)(2)(3, 4, 5)())  //15
console.log(addCurry(1)(2, 3, 4, 5)())  //15

```
[实现 add(1)(2)(3)](https://github.com/lgwebdream/FE-Interview/issues/292)

## 如何实现一个无限累加的函数

[柯里化函数](/front-end/interview/#柯里化函数-add-1-2-3)
```javascript
function sum(...args) {
    cosnt f = (...rest) => sum(...args, ...rest);
    f.valueOf = () => args.reduce((x, y) => x + y, 0);
    return f;
}

const a = sum(1, 2, 3).valueOf() //6
const b = sum(2, 3)(2).valueOf() //7
const c = sum(1)(2)(3)(4).valueOf() //10
const d = sum(2)(4, 1)(2).valueOf() //9
const e = sum(1)(2)(3)(4)(5)(6).valueOf() // 21

console.log(a, b, c, d, e)
```

## 给定一个值，给出它的IEEE754的标识，如符号位、指数位与分号位
```javascript
function formatToBinaryExponent(num) {
    // ?= 匹配其后紧接着的字符
    const [int, dec = '0'] = String(num).split(/(?=\.)/).map(x => Number(x || 0).toString(2));
    const exponent = (int.length - 1).toString(2);
    const fraction = int.slice(1) + dec.slice(2);
    return {
        exponent,
        fraction: fraction.slice(0, 52),
        sign: num > 0,
        exact: fraction.length < 52,
        format: `${Number(num > 0)}${exponent.padStart(11, '0')}${fraction.padEnd(52, '0')}`,
        raw: num
    }
}

console.log('Format -0.1', formatToBinaryExponent(-0.1))
console.log('Format 0.1', formatToBinaryExponent(0.1))
console.log('Format 0', formatToBinaryExponent(0))
```
## 实现一个render/template函数，可以进行渲染模板
```javascript
const get = (source, path, defaultValue = undefined) => {
    const paths = path.replace(/\[(\w+)\]/g, '.$1').replace(/\["(\w+)"\]/g, '.$1').replace(/\['(\w+)'\]/g, '.$1').split('.')
    let result = source
    for (const p of paths) {
        result = result?.[p]
    }
    return result === undefined ? defaultValue : result 
}
const render = (template, data) => {
    // return template.replace(/{{\s+([^\s]+)\s+}}/g, (capture, key) => {
    return template.replace(/{{\s*([^\s]+)\s*}}/g, (capture, key) => {
        return get(data, key)
    })
}
const template = '{{ user["name"]}},今天你又学习了吗？-- 用户ID: {{ user.id}}';

const data = {
    user: {
        id: 10086,
        name: 'xz'
    }
}
console.log(render(template, data));
```

## 对一下字符进行压缩编码
```javascript
const encode = str => {
    const l = [];
    let i = 0;
    for (const s of str) {
        const len = l.length;
        const lastChar = len > 0 ? l[len - 1][0] : undefined;
        if (lastChar === s) {
            l[len - 1][1]++;
        } else {
            l.push([s, 1])
        }
    }
    return l.map(([x, y]) => {
        if (y === 1) {
            return x;
        }
        if (y === 2) {
            return x + x;
        }
        return x + y
    }).join('')
}
const a = encode('AAABBCA');
const b = encode('AAABACA')
console.log(a, b)
```

## 如何实现 promise.map，限制 promise 并发数
```javascript
function pMap(list, mapper, concurrency = Infinity) {
  // list 为 Iterator，先转化为 Array
  list = Array.from(list)
  return new Promise((resolve, reject) => {
    let currentIndex = 0
    let result = []
    let resolveCount = 0
    let len = list.length
    function next() {
        const index = currentIndex
        currentIndex++
        Promise.resolve(list[index]).then(o => mapper(o, index)).then(o => {
            result[index] = o
            resolveCount++
            if (resolveCount === len) { resolve(result) }
            if (currentIndex < len) { next() }
        })
    }
    for (let i = 0; i < concurrency && i < len; i ++) {
        next()
    }
  })
}

const sleep = seconds => new Promise(resolve => setTimeout(resolve, seconds))


const now = Date.now()
console.log('Start')
pMap([1, 1, 1], x => sleep(x * 1000)).then(o => {
  console.log(o)
  console.log(Date.now() - now, 'seconds')
})

pMap([1, 2, 3], x => x * 3).then(o => console.log(o))
```

## 已知一个函数asyncAdd，实现一个函数sum达到预期效果
```js
标题
异步加减法

题目描述
假设有一台本地机器，无法做加减乘除运算（包括位运算），因此无法执行 a + b、a+ = 1 这样的 JS 代码，然后我们提供一个服务器端的 HTTP API，可以传两个数字类型的参数，响应结果是这两个参数的和，这个 HTTP API 的 JS SDK（在本地机器上运行）的使用方法如下：​
​
asyncAdd(3, 5, (err, result) => {​
  console.log(result); // 8​
});​​​
​
// SDK 的模拟实现：​
​
function asyncAdd(a, b, cb) {​
  setTimeout(() => {​
    cb(null, a + b);​
  }, 1000)​
}​​​
​
现在要求在本地机器上实现一个 sum 函数，支持以下用法：​
​
(async () => {
    const result1 = await sum(1, 4, 6, 9, 2, 4);
    const result2 = await sum(3, 4, 9, 2, 5, 3, 2, 1, 7);
    const result3 = await sum(1, 6, 0, 5);
    console.log([result1, result2, result3]); // [26, 36, 12]​
})()
​
要求 sum 能在最短的时间里返回以上结果
``` 

```js

function asyncAdd(a, b, callback) {
    setTimeout(() => {
        callback(null, a + b)
    }, Math.random * 1000)
}
// 自己实现的---
const promisify = func => {
    return function(...args) {
        return new Promise(resolve => {
            let callback = function(...args) {
                resolve(args)
            }
            return func.apply(this, [...args, callback])
        })
    }
}
function sum(...args) {
    return new Promise(async resolve => {
        let nums = args;
          while(nums.length >= 2) {
              let arr = nums.splice(0, 2)
              let resolveFn = promisify(asyncAdd);
              let result = await resolveFn(arr[0], arr[1]) // null 3  2个一组。promise.all 二分？
              nums.push(result[1]);
          }
          resolve(nums[nums.length - 1])
    })
}
// 方法二---但是是顺序执行了
// 封装一个promise版的add函数
function add(a, b) {
    return new Promise(resolve => {
        asyncAdd(a, b, (_, sum) => {
            resolve(sum);
        })
    })
}
function sum(...args) {
    return new Promise(resolve => {
        args.reduce((p, n) => p.then(total => add(total, n)), Promise.resolve(0)).then(resolve);
    })
}

// 方法三--时间优化  使用promise.all
function add(a, b) {
    return new Promise(resolve => {
        asyncAdd(a, b, (_, sum) => {
            resolve(sum);
        })
    })
}
async function sum(...args) {
    // 如果仅有一个，直接返回
    if(args.length === 1) return args[0];
    let result = [];
    // 两两一组，如果有剩余一个，直接进入
    for(let i = 0; i < args.length - 1; i += 2) {
        result.push(add(args[i], args[i + 1]));
    }
    if(args.length % 2) result.push(args[args.length - 1]);
    // Promise.all 组内求和
    return sum(...await Promise.all(result));
}

// 输出测试
(async () => {
    const result1 = await sum(1, 4, 6, 9, 2, 4);
    const result2 = await sum(3, 4, 9, 2, 5, 3, 2, 1, 7);
    const result3 = await sum(1, 6, 0, 5);
    console.log([result1, result2, result3]); // [26, 36, 12]​
})()
```
### 其他
```js
function asyncAdd(a, b, callback) {
    setTimeout(() => {
        callback(null, a + b)
    }, Math.random() * 1000);
}
function add(a, b) {
    return new Promise(resolve => {
        asyncAdd(a, b, (_, sum) => {
            resolve(sum);
        })
    })
}
const test = async (...args) => {
    return new Promise(resolve => {
        add(1, 2).then(resolve);
    })
}

(async function() {
    const res = await test();
    console.log(res)
})()
```
[实现一个异步求和函数 ](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/484)
## 超时调用
实现 Promise.retry，成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的reject
```js
Promise.retry = function (promiseFn, times = 3) {
  return new Promise(async (resolve, reject) => {
    while (times--) {
      try {
        var ret = await promiseFn();
        resolve(ret);
        break;
      } catch (error) {
        if (!times) reject(error);
      }
    }
  });
};
function getProm() {
    const n = Math.random();
    return new Promise((resolve, reject) => {
        setTimeout(() =>  n > 0.9 ? resolve(n) : reject(n), 1000);
    });
}
Promise.retry(getProm);
```
<span style="color:red">fn执行超时返回错误</span>
> promise.race实现 delay函数 Promise.race([delay, fn]).then(res => console.log(res))
```js
function timeout(fn, seconds) {
    // 当fn执行时间超多seconds则返回错误
    // 当fn执行时间小宇seconds则返回结果
}
```
[实现 Promise.retry，成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/387)

[超时取消](/front-end/JavaScript/es6-promise02-race.html#让promise等待指定时间)

## 实现二维数组斜线打印
```js
var arr = [
    [1,    2,     3,     4], 
    [5,    6,     7,     8], 
    [9,    10,    11,    12], 
    [13,   14,    15,    16]
];
// 1,2,5,3,6,9

let n = arr.length
  let m = arr[0].length
  let num = 0;


  function getnum(num) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (i + j == num) {
          console.log(arr[i][j]);
        }

      }
    }
  }
  for (let k = 0; k <= n + m - 2; k++) {
    getnum(k)
  }
```
## JavaScript 如何查找对象中某个 value 并返回路径上所有的 key值？
```js
const obj = {
    a: {
           b: 1,
           c: 2,
           d: {e: 5}
       },
    b: [1, 3, {a: 2, b: 3}],
    c: 3
   }
// target = 5,  [a,d,e]   
function search(object, value) {
    for (var key in object) {
        if (object[key] == value) return [key];
        if (typeof (object[key]) == 'object') {
            var temp = search(object[key], value);
            if (temp) return [key, temp].flat();
        }
    }
}
var url = search(obj, 5);

console.log(url);
```

## 数组转对象
```js
var arr = [
    {node: 'a', children: ['b', 'c']},
    {node: 'b', children: ['d', 'e']},
    {node: 'c', children: ['e', 'f']}
]
=> 
{
    a:  {
        b: {
            d:{}
            e: {}
        },
        c: {
            e:{}
            f:{}
        }
    }
}

function dfs(data, result, node) {
  for (const item of data) {
    if (item.node === node) {
      for (const m of item.children) {
        result[m] = {}
        dfs(data, result[m], m)
      }
    }
  }
}
function arrayToTree(data) {
  let result = {a: {}}; // 找到第一个节点，方法不写了
  dfs(data, result.a, 'a');
  return result;
}
console.log(arrayToTree(arr))


// dier
var arr = [
    {node: 'a', children: ['b', 'c']},
    {node: 'b', children: ['d', 'e']},
    {node: 'c', children: ['e', 'f']}
]

function reverserFlat(arr) {
    let map = {};
    for (let item of arr) {
        map[item.node] = {}
    }
    for (const item of arr) {
        const node = item.node;
        const children = item.children;
        for (const m of children) {
            if (map[m]) {
                map[node][m] = map[m]
            } else {
                map[node][m] = {}
            }
        }        
    }
    return {a: map.a};
}
console.log(reverserFlat(arr))
```
[参考](/front-end/interview/2021.html#蓝湖)

## 实现一个对象的flatten方法（阿里）
```js
function isObject(val) {
    return typeof val === 'object' && val !== null;
}
function flatten(obj) {
    if (!isObject(obj)) {
        return;
    }
    let res = {};
    const dfs = (cur, prefix) => {
        if (isObject(cur)) {
            if (Array.isArray(cur)) {
                cur.forEach((item, index) => {
                    dfs(item, `${prefix}[${index}]`);
                })
            } else {
                for (let k in cur) {
                    dfs(cur[k], `${prefix}${prefix ? '.' : ''}${k}`);
                }
            }
        } else {
            res[prefix] = cur;
        }
    }
    dfs(obj, '');
    return res;
}
flatten();
```
[参考](/front-end/interview/dachang2.html#简单)

```js
// 另一个例子

const treeData = [
    {
        path: '/root',
        routes: [
            {
                path: '/path'
            },
            {
                path: '/link',
                routes: [
                    {
                        path: ['/a', '/b']
                    }
                ]
            }
        ]
    }
]
// =》
// [ '/root/path', '/root/link/a', '/root/link/a/b' ]
const flatten = data => {
    let res = [];
    for (let item of data) {
        dfs(item, res, '')
    }
    return res;
    function dfs(data, res, temp) {
        if (!data.routes) {
            if (typeof data.path === 'string') { 
                temp = temp + data.path;
                res.push(temp);
            } 
            if (Array.isArray(data.path)) {
                for (let m of data.path) {
                    temp = temp + m;
                    res.push(temp);
                }
            }
            return;
        }
        temp = temp + data.path;
        for (let item of data.routes) {
            dfs(item, res, temp);
        }
    }
}
console.log(flatten(treeData))
```

## 相邻且相等，则消除
```js
// 栈实现
const removeDupLicates1 = nums => {
    let stack = [];
    let i = 0; 
    while(i < nums.length) {
        let top = stack[stack.length - 1];
        let cur = nums[i];
        if(top === cur) {
            stack.pop();
            while(nums[i] === top) i += 1;
        } else {
            stack.push(cur);
            i++
        }
    }
    return stack;
}
console.log(removeDupLicates1([1,6,6,6,7,7], 3))

// 面试中写的 虽然好使有点不靠谱
const fromatArray = nums => {
    let len = nums.length;
    let left = 1;
    let temp;
    while(left < nums.length) {
        if(nums[left - 1] === nums[left]) {
            temp = nums[left]
            nums.splice(left - 1, 2);
            left = 1;
            continue;
        } else if(temp === nums[left]) {
            nums.splice(left, 1)
            temp = ''
        }
        left++;
    }
    return nums;
}
console.log(fromatArray([1,6,6,6,7,7,8,9]))

// 删除重复的元素--类似原理
const removeDuplicates = nums => {
    let i = 0; 
    for(let j = 1; j < nums.length; j++) {
        if(nums[j] !== nums[i]) {
            nums[i + 1] = nums[j];
            i++;
        }
    }
    return nums.slice(0, i + 1);
    // return i + 1;
}
console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4]))
```
[删除字符串中所有相邻的重复项](/front-end/interview/coding4.html#栈)
## 一行图片 宽度一定 等比例
```js
// function alignImages(imgs, width) {...}

// alignImages([[1, 1], [1, 1]], 3) // [[1.5, 1.5], [1.5, 1.5]]
// alignImages([[2, 4], [2, 2], [2, 4]], 4) // [[1, 2], [2, 2], [1, 2]]
// 字符图示例：a 表示 [2, 4]（宽为 2，高为 4 的图片）, b 表示 [2, 2], c 表示 [2, 4]
// aa  bb  cc
// aa  bb  cc
// aa      cc
// aa      cc

// 等比例缩放之后：
// abbc
// abbc

const alignImages = (nums, width) => {
    let n = nums.length;
    let m = nums[0].length;
    let matrix = Array.from(Array(n), (_, i) => Array(m))
    let sumWidth = nums.reduce((total, cur) => {
        return total + cur[0]
    }, 0)
    for(let i = 0; i < n; i++) {
        let a = nums[i][0] / nums[i][1];
        for(let j = 0; j < m; j++) {
            matrix[i][j] = Math.ceil((width / sumWidth) * a * nums[i][j])
        }
    }
    return matrix;
}
console.log(alignImages([[2, 4], [2, 2], [2, 4]], 4))
```
## 删除有序数组中的重复项
```js
// 输入：nums = [1,1,1,2,2,3]
// 输出：5, nums = [1,1,2,2,3]
// 解释：函数应返回新长度 length = 5, 并且原数组的前五个元素被修改为 1, 1, 2, 2, 3 。 不需要考虑数组中超出新长度后面的元素。
const removeDuplicates = nums => {
    let n = nums.length;
    if(n <= 2) return n;
    let slow = 2, fast = 2;
    while(fast < n) {
        if(nums[slow - 2] !== nums[fast]) {
            nums[slow] = nums[fast];
            ++slow;
        }
        ++fast;
    }
    return slow;
}
```
[删除有序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/description/?languageTags=javascript)

## 统计同构字符串的数目
```js
// 输入：s = "abbcccaa"
// 输出：13
// 解释：同构子字符串如下所列：
// "a"   出现 3 次。
// "aa"  出现 1 次。
// "b"   出现 2 次。
// "bb"  出现 1 次。
// "c"   出现 3 次。
// "cc"  出现 2 次。
// "ccc" 出现 1 次。
// 3 + 1 + 2 + 1 + 3 + 2 + 1 = 13
const countHomogenous = s => {
    return s.match(/([a-z])\1*/g).reduce((acc, cur) => {
        return (acc + cur.length * (cur.length + 1) / 2) % (1e9 + 7)
    }, 0)
}
console.log(countHomogenous('abbcccaa'))
```