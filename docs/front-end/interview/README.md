---
title: 前端面试题
---
:::tip
学习方法---是什么？解决了什么问题 存在什么问题 怎么解决

null >= 0  null <= 0  -> true 
scheme schema

vitesse  Vueuse https://vueuse.org/ https://www.jianshu.com/p/1186d062c07b

netlify 部署
:::
[大厂面试题每日一题](https://q.shanyue.tech/engineering/740.html#%E4%B8%80%E4%B8%AA-npm-script-%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)

[面试题--重点看一看](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues?page=10&q=is%3Aissue+is%3Aopen)

[面试题--重点看一看-字节](https://github.com/Advanced-Frontend/Daily-Interview-Question/labels/%E5%AD%97%E8%8A%82)

[面试题1](https://github.com/Vibing/blog/issues/3)

[面试题2](https://github.com/webVueBlog/Leetcode)

[面试题](https://github.com/daily-interview/fe-interview)

[面试秘籍](https://juejin.cn/post/7074055897349095454#heading-8)

[基础很好？22个高频JavaScript手写代码了解一下](https://juejin.cn/post/6996289669851774984#heading-15)

[冴羽的博客](https://github.com/mqyqingfeng/Blog?tab=readme-ov-file)

### 开发模式、算法、并发限制
## 柯里化函数 add(1)(2)(3)
```js
function add() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = Array.prototype.slice.call(arguments);

    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var _adder = function() {
        _args.push(...arguments);
        return _adder;
    };

    // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function () {
        return _args.reduce(function (a, b) {
            return a + b;
        });
    }
    return _adder;
}

// 可使用剩余参数的方式
function add(..._args) {
    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var _adder = function() {
        _args.push(...arguments);
        return _adder;
    };

    // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function () {
        return _args.reduce(function (a, b) {
            return a + b;
        });
    }
    return _adder;
}
```
[剩余参数](/front-end/JavaScript/tips-arguments.html#function-arguments)

[ES6---扩展运算符](/front-end/JavaScript/es6-....html)


剩余参数语法允许我们将一个不定数量的参数表示为一个数组。

### 虚拟DOM,diff算法，编译compile
### Q1 请说一下你的上一家公司开发发布流程。
### Q http 的 cache ，浏览器如何获取设置
强缓存&协商缓存

### Q2 虚拟dom是怎么实现的
### Q3 你说一下为什么canvas的图片为什么会有跨域问题
[前端常见问题——Canvas 图片跨域](https://segmentfault.com/a/1190000016423028)

### Q4 你说一下webpack的一些plugin，怎么使用webpack对项目进行优化。

1. <span style="color:blue">减少编译体积 </span>

    - ContextReplacementPugin-- 忽略webpack中的配置和测试设置文件
    - IgnorePlugin-- 忽略第三方包指定目录，让这些指定目录不要被打包进去
    - babel-plugin-import- 它是一个babel插件，在编译的过程中会自动转换为按需引入的方式
    - babel-plugin-transform-runtime--因为babel编译es6到es5的过程中，babel-plugin-transform-runtime这个插件会自动polyfill es5不支持的特性，这些polyfill包就是在babel-runtime这个包里（core-js 、regenerator等）。

2. <span style="color:blue">并行编译 happypack、thread-loader、uglifyjsWebpackPlugin开启并行</span>

3. <span style="color:blue">缓存 cache-loader、hard-source-webpack-plugin、uglifyjsWebpackPlugin开启缓存、babel-loader开启缓存</span>

4. <span style="color:blue">预编译 dllWebpackPlugin && DllReferencePlugin、auto-dll-webapck-plugin</span>
## Q 统计网站出现最多的html标签
```js
var map = {};
    //采用递归调用的方法，比较方便和简单。
    function fds(node) {

        if (node.nodeType === 1) {
            //这里我们用nodeName属性，直接获取节点的节点名称
            var tagName = node.nodeName;
            //判断对象中存在不存在同类的节点，若存在则添加，不存在则添加并赋值为1
            map[tagName] = map[tagName] ? map[tagName] + 1 : 1;
        }
            //获取该元素节点的所有子节点
        var children = node.childNodes;
        for (var i = 0; i < children.length; i++) {
            //递归调用
            fds(children[i])
        }
    }
    fds(document);
    console.log(map)
    
    
    function objvalueSort(obj) {//排序的函数
        //1.根据数组中的对象的“xxx”，得到排序后的key，return key2-key1 表示降序
        var newkey = Object.keys(obj).sort(function(key1,key2){

            return obj[key2]-obj[key1];
        })
    　　//2.用排序后的key构建新的对象数组
        var newObj = {};//创建一个新的对象，用于存放排好序的键值对
        for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
            newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
        }
        
        return newObj;//返回排好序的新对象
    }

// 整理
const getNode = (node) => {
    let map = {};
    let obj = {}
    const dfs = node => {
        let nodeName = node.nodeName;
        let nodeType = node.nodeType;
        if (nodeType === 1) {
            map[nodeName] = (map[nodeName] || 0) + 1
        }
        let childs = node.childNodes;
        for (let child of childs) {
            dfs(child);
        }
    }
    dfs(node)
    let newMap = Object.keys(map).sort((key1, key2) => map[key2] - map[key1]);
    for (let [index, key] of newMap.entries()) {
        if (index < 3) {
            obj[key] = map[key]
        }
    }
    return obj;
}
console.log(getNode(document.body))
```
### Q5说一下你觉得你最得意的一个项目？你这个项目有什么缺陷，弊端吗？

### Q6 请手写实现一个promise

### Q7 现在有那么一个团队，假如让你来做技术架构，你会怎么做？


```



性能评估与优化；
工作中怎样收集性能相关信息，有哪些关键数据，如何获取的，
然后做了哪些优化工作，达到什么效果之类的

还有就是我简历有电视端 web 的开发，问了很多电视上焦点控制和内存占用的控制的问题


还有就是怎么拆解 KPI 或 OKR，怎么跟团队成员分配任务
```
## 转化为驼峰命名

```js
var s1 = "get-element-by-id" // 转化为 getElementById
var f = function(s) {
	return s.replace(/-\w/g, function(x) {
		return x.slice(1).toUpperCase(); 
    })
}
```

## 查找字符串中出现最多的字符和个数

```js
let str = "abcabcabcbbccccc";
let num = 0;
let char = '';
// 使其按照一定的次序排列
str = str.split('').sort().join(''); // "aaabbbbbcccccccc"
// 定义正则表达式
let re = /(\w)\1+/g;
str.replace(re,($0,$1) => {
    if(num < $0.length){
        num = $0.length;
        char = $1;
    }
});
console.log(`字符最多的是${char}，出现了${num}次`)
```
## call的实现
测试代码
```js
function add(x, y, z) {
    return x + y + z;
}
const arr = [1,2,3];
console.log(add.myCall(null, ...arr))
console.log(add.myApply(null, arr))
console.log(add.myBind(null, ...arr)())
```
- 第一个参数为null或undefined时，this指向全局对象window,值为原始值的指向该原始值的自动包装对象，如String、Number、Boolean
- 为了避免函数名与上下文(context)的属性发生冲突，使用Symbol类型作为唯一值
- 将函数作为传入的上下文(context)属性执行
- 函数执行完成后删除该属性
- 返回执行结果

```js
Function.prototype.myCall = function(context, ...args) {
    let cxt = context || window;
    // 将当前被调用的方法定义在cxt.fun上(为了能以对象调用形式绑定this)
    // 新建一个唯一的Symbol变量避免重复
    let func = Symbol();
    cxt[func] = this;
    args = args ? args : [];
    // 以对象调用形式调用func,此时this指向cxt 也就是传入的需要绑定的this指向
    const res = args.length > 0 ? cxt[func](...args) : cxt[func]();
    // 删除该方法，不然会对传入的对象造成污染(添加该方法)
    delete cxt[func];
    return res;
}
```
## apply的实现
- 前部分与call一样
- 第二个参数可以不传，但类型必须为数组或者类数组

```js
Function.prototype.myApply = function(context, args = []) {
    let cxt = context || window;
    // 将当前被调用的方法定义在cxt.fun上(为了能以对象调用形式绑定this)
    let func = Symbol();
    cxt[func] = this;
    // 以对象调用形式调用func，此时this指向cxt，也就是传入的需要绑定的this指向
    const res = args.length > 0 ? cxt[func](...args) : cxt[func]();
    delete cxt[func];
    return res;
}
```
## bind的实现
需要考虑

- bind()除了this外，还可传入多个参数
- bind创建的新函数可以传入多个参数
- 新函数可能被当做构造函数调用
- 函数可能有返回值

实现方法

- bind方法不会立即执行，需哟啊返回一个待执行的函数(闭包)
- 实现作用域绑定(apply)
- 参数传递(apply的数组传参)
- 当作为构造函数的时候，进行原型继承

```js
Function.prototype.myBind = function(context, ...args) {
    // 新建一个变量赋值为this,标识当前函数
    const fn = this;
    // 判断有没有传参进来，若为空则赋值[]
    args = args ? args : [];
    // 返回一个newFn函数，在里面调用fn
    return function newFn(...newFnArgs) {
        if (this instanceof newFn) {
            return new fn(...args, ...newFnArgs);
        }
        return fn.apply(context, [...args, ...newFnArgs]);
    }
}
```
[相关文档](/front-end/JavaScript/tips-bind.html)
## 寄生组合式继承

```js
function Person(obj) {
    this.name = obj.name;
    this.age = obj.age;
}
Person.prototype.add = function(value) {
    console.log(value);
}
var p1 = new Person({name: '番茄', age: 18});

function Person1(obj) {
    Person.call(this, obj);
    this.sex = obj.sex;
}
// 这一步是继承的关键
Person1.prototype = Object.create(Person.prototype);
Person1.prototype.constructor = Person1;

Person.prototype.play = function(value) {
    console.log(value);
}
var p2 = new Person1({name: '鸡蛋', age: 118, sex: '男'})
```

## ES6继承

```js
// class 相当于es5中构造函数
// class中定义方法时,前后不能加function，全部定义在class的prototype属性中
// class中定义的所有方法是不可枚举的
// class中只能定义方法，不能定义对象，变量等
// class中方法内默认都是严格模式
// es5constructor为隐式属性
class People {
    constructor(name = 'wang', age = '27') {
        this.name = name;
        this.age = age;
    }
    eat() {
        console.log(`${this.name} ${this.age} eat food`);
    }
}
// 继承父类
class Woman extends People {
    constructor(name = 'ren', age='27') {
        // 继承父类属性
        super(name, age);
    }
    eat() {
        // 继承傅雷方法
        super.eat();
    }
}
let wonmanObj = new Woman('xiaoxiami');
womanObj.eat();

// es5继承先创建子类的实例对象,然后再将父类的方法添加到this上(Parent.apply(this))
// es6继承是使用关键字super先创建父类的实例对象this，最后在子类class中修改this
``` 
## instanceof的实现
- instanceof是用来判断A是否为B的实例，表达式：A instanceof B, 如果A是B的实例，则返回true.
- instanceof运算符用来测试一个对象在其原型链中是否存在一个构造函数的prototype属性
- 不能检测基本数据类型，在原型链上的寄过威逼准备，不能检测null, undefined
- 实现：遍历左边变量的原型链,直到找到右边变量的prototype，如果没有找到，返回false

```js
function myInstannceOf(a, b) {
    let left = a.__proto__;
    let right = b.prototype;
    while(true) {
        if (left == null) {
            return false
        }
        if (left === right) {
            return true;
        }
        left = left.__proto__;
    }
}
// instanceof 运算符用来判断构造函数的prototype属性是否出现在对象的原型链中的任意位置
function myInstanceof(left, right) {
    let proto = Object.getPrototypeOf(left); // 获取对象的原型
    prototype = right.prototype; // 获取构造函数的prototype对象
    // 判断构造函数的prototype对象是否在对象的原型链上
    while(true) {
        if (!proto) return false;
        if (proto === prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}
```

## promise 相关题目

```
现在有一个 js 函数，接受一个参数：uid 的数组，数组长度最长 100 ，批量去服务端查询用户 profile：
const getUserProfileByUids = (uidList) => {
    return fetch(`/user/get?uidlist=${encodeURIComponent(uidList.join('.'))}`).then((res) => {
        return res.json();
    });
}
// 服务端的返回值的结构是：  [{uid: "001", nick: 'xx', age: 18},{uid: "002", nick: 'xx', age: 18}]
// 如果传入的 uid 在服务端不存在，在返回值里就没这个 uid 的相关数据
现在要求实现一个新的查询方法，接受单个 uid，返回一个 Promise ，查询成功，resolve 这个 uid 的 profile，否则 reject。
要求合并 100ms 内的单个查询，只去服务端批量查询一次，不允许使用任何三方库，批量查询直接使用 getUserProfileByUids
输入输出样例
1. 100ms 内的单个请求能够被合并
2. 请求成功和失败都能正确派发请求的结果，对应 promise 的 resove 和 reject
3. 窗口内超过 100 个请求，能确保每次批量请求的 ID 个数不超过 100
```
解题
```js
// 入口函数
const getUserProfileByUid = function (uid) {
  return mergeRequest(uid).then(function (res) {
    return res[uid];
  })
}
const debounce = (runner, timeout = 100, max = 100) => {
  let timer = null;
  let uidCatch = new Array();
  let promiseCatch = new Array();
  return function () {
    clearTimeout(timer);
    timer = null
    uidCatch.push(arguments[0])
    let task = myPromise();
    promiseCatch.push(task);
    let callback = function () {
      timer = null;
      let uidCatchTemp = uidCatch;
      uidCatch = [];
      let tmpPromises = promiseCatch;
      promiseCatch = [];
      let delay = Promise.resolve().then(function () {
        return runner(uidCatchTemp);
      });
      tmpPromises.forEach(function (v) {
        delay.then(v.resolve, v.reject)
      });
    };
    if (uidCatch.length >= max) {
      callback();
    } else {
      timer = setTimeout(callback, timeout);
    }
    return task.promise;
  };
}

const mergeRequest = debounce(function (uidList) {
  return fetch(`/user/get?uidlist=${encodeURIComponent(uidList.join('.'))}`).then((userList) => {
    let result = {};
    userList.forEach(function (user) {
      if (!result[user.uid]) {
        result[user.uid] = user;
      }
    });
    return result;
  });

  // 调用模拟 API
  // return api(uidList.join('.')).then(function (userList) {
  //   let result = {};
  //   userList.forEach(function (user) {
  //     if (!result[user.uid]) {
  //       result[user.uid] = user;
  //     }
  //   });
  //   return result;
  // });
});

// 同级获取 resolve reject
const myPromise = () => {
  let obj = {};
  obj.promise = new Promise(function (resolve, reject) {
    obj.resolve = resolve;
    obj.reject = reject;
  });
  return obj;
}


// 以下均为方便调试的模拟方法，真实场景不需要
// 模拟并发
// const main = () => {
//   for (let uid = 0; uid < 10; uid++) {
//     getUserProfileByUid(uid).then(res => console.log('res',res.name))
//   }
// }

// 模拟接口
// const api = (arrStr) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       let arr = arrStr.split('.')
//       let res = arr.map((uid, index) => {
//         return {
//           uid: uid,
//           name: 'demo' + index
//         }
//       })
//       resolve(res)
//     }, 20);
//   })
// }
```


##### 输出
```js
Promise.resolve().then(() => {
    console.log(0);
    return Promise.resolve(4);
}).then((res) => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() =>{
    console.log(6);
})

// 输出
0
1
2
3
4
5
6
```
## 抢红包
要求：

1. 每人获得金额之和为总金额
2. 每人至少0.01元
3. 每人获得金额概率上是公平的
4. 保留两位小数

逐条分析：

对于1，最后一个人获得的金额就是红包总金额-已抢金额

对于2，我们可以先给每人分配0.01元，即红包金额变为红包总金额-人数*0.01

对于3，是本题核心，我们可以采用二倍均值法 或 线段切割法

对于4，用toFixed(2)

同时本题还涉及到浮点数运算不精确有误差的问题

### 二倍均值法
假设有10个人，红包总额100元。

100/10X2 = 20, 所以第一个人的随机范围是(0，20 )，平均可以抢到10元。

假设第一个人随机到10元，那么剩余金额是100-10 = 90 元。

90/9X2 = 20, 所以第二个人的随机范围同样是(0，20 )，平均可以抢到10元。

假设第二个人随机到10元，那么剩余金额是90-10 = 80 元。

80/8X2 = 20, 所以第三个人的随机范围同样是(0，20 )，平均可以抢到10元。

以此类推，每一次随机范围的均值是相等的。

但这个解法的问题是，任意一次抢到的金额都低于人均的二倍，不是任意的随机

---
还是上面的例子，而线段切割法可以理解为：在一条 首值为0，尾值为 100-10* 0.01 的线段上随机(概率分布的是平均的，所以公平)选择 10-1个切割点，将这条线段分为10段，前九个人依次拿走前九段的值，由于我们要保证每个人获得金额之和为100，所以最后一个人不能取最后一段(第十段)的值而是另外处理(100 - 已抢金额)

最终的线段切割方案如下
```js
// 线段切割法
function getRandomMoney(total, num) {
    if (num == 1) return total;
    //先给每人分配0.01元
    let max = 100 * total - num * 1; //去除“保底”后的金额
    let randomArr = [0];
    let accum = 0; //已抢金额
    while (randomArr.length < num + 1) {
        let random = Math.round(Math.random() * max);
        //不能有重复的“切割点”
        if (randomArr.indexOf(random) == -1) {
            randomArr.push(random);
        }
    }
    randomArr.sort((a, b) => a - b);
    let result = [];
    for (let j = 1; j < num; j++) {
        let money = randomArr[j] - randomArr[j - 1];
        accum += money;
        let final_money = ((money + 1) * 0.01).toFixed(2);
        result.push(Number(final_money));
    }
    //最后一个人另外处理
    result.push(Number(((max - accum + 1) * 0.01).toFixed(2)));
    return result;
}

let total = 100;
let num = 10;
let result = getRandomMoney(total, num);
console.log(result);
```
这里有的坑
1. toFixed返回字符串，要用number转化一下
2. 要把小数运算话为整数运算避免浮点数运算精度问题，这是个这题最易出错的点

### 另一种
这里可以参考另一种写法，这种 红包剩余金额 * random() 的写法的问题就是越后面的人抢到的金额越少
```js
function getRandomMoney_NotFair(total, n) {
    let leftMoney = total * 100;
    let leftNum = n;
    let tmpMoney = 0;
    let res = [];
    while (leftNum-- > 1) {
        tmpMoney = Math.round(
            Math.random() * (leftMoney - leftNum * 100 - 100) + 100
        );
        leftMoney -= tmpMoney;
        res.push(Number((tmpMoney * 0.01).toFixed(2)));
    }
    res.push(Number((leftMoney * 0.01).toFixed(2)));
    return res;
}
```


## 文档
[前端大全](https://mp.weixin.qq.com/s/VyBjZzrFK25B7DpLXPduhQ)