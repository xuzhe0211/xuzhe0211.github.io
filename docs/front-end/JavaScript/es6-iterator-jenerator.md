---
autoGroup-13: ES6
title: 快速掌握iterator Generator和async之间的关系极其用法
---

## 遍历器(迭代器)Iterator
### for遍历
首先从远古讲起，刚出js的时候如何遍历一个数组呢
```
var arr = [1, 2, 3, 4, 7, 8, 9]
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
```
### forEach遍历
看起来笨的一批，所以ES5给你研究了一个foreach方法，但是这个方法不能break，也不能改变数组自身的值，也不能返回任何值。
```
var arr = [1, 2, 3, 4, 7, 8, 9];
var arr2 = arr.forEach((element, index) => {
    console.log(`第${index}个数值为${element}`);
    return element * 2;
})
console.log(arr2); // undefined
console.log(arr1); // [1, 2,3,4, 8 , 9]
```
所以说foreach只给你最基本的操作，其他一概不管，如果你想要改变自身的值或者有break和countinue操作我们可以使用map操作，不展开说了。[数组遍历方法总结](https://www.cnblogs.com/wangzirui98/p/11226781.html)

### for-in遍历
那么ES6专门为遍历数组提供了一种方法，就是for-of。说到for-of，不得不提到for-in

那么关于他们两的区别，[深入理解枚举属性与for-in和for-of](https://www.cnblogs.com/wangzirui98/p/11227853.html)

值得一提的是for-in是可以遍历数组的，但是不推荐用for-in遍历数组，为什么呢？因为for-in返回的可枚举属性是字符类型，不是数字类型，如果'0', '1'这样的属性和1，2数组发生相加，很可能不是直接相加，二十字符串的叠加。例如：
```
const items = [1,2, 3,4];
for (item in items) {
    let tempitem = item + 1;
    console.log(items[tempitem]); // undefined
    console.log(tempitem); // 01 21, 31 41 item与数字相加，会得到字符串相加的结果
}
```
所以为了便面歧义，还是不要用for-in遍历数组比较好

### for-of
接下来进入正题了，因为for-in在数组这边比较难用，所以ES6新添加的for-of来弥补for-in的不足。这个是正儿八经遍历数组的方法。与forEach()不同的是，它支持break、continue和return语句.而且他本身的语法非常简单
```
for (variable of iterable) {
    // statements
}
```
+ variable: 在每次迭代中，将不同属性的值分配给变量
+ iterable: 被迭代枚举启属性的对象。

而且关键的问题是for-of不仅可以遍历数组，他也可以遍历很多类似数组对象。
 + Array
 + Map
 + Set
 + String
 + TypedArray
 + 函数的arguments对象
 + NodeList对象

而他的原理在于这些类数组对象中都有一个属性，就是Symbol.iterator,也就是说，只要带Symbol.iterator他都能遍历，我们单独把这个属性拿出来，自己手动执行next()方法就会看到我们成功遍历了这个数组
```
const items = [1,2, 3,4];
const giao = items[Symbol.iterator]();
console.log(giao.next()); // {value: 1, done: false};
console.log(giao.next()); // {value: 2, done: false};
console.log(giao.next()); // {value: 3, done: false};
console.log(giao.next()); // {value: 4, done: false};
console.log(giao.next()); // {value: undefined, done: true};
```
同理，我们可以通过手动写一个iterator来更深入的了解他的原理：

```
Array.prototype.myiterator = function() {
    let i = 0;
    let items = this;
    return {
        next() {
            const done = i >= item.length;
            const value = done ? undefined : items[i++]
            return {
                value, 
                done
            }
        }
    }
}
const item = [1,2,3,4];
 
// 控制台
const giao = item.myiterator(); // 当我们获得遍历器时，我们只需要代替for-of执行myiterator即可遍历这个数组
giao.next(); // {value: 1, done: false}
giao.next(); // {value: 2, done: false}
giao.next(); // {value: 3, done: false}
giao.next(); // {value: 4, done: false}
giao.next(); // {value: undefined, done: true}
```
效果更for of 一样。另外值得注意的是，你可以在任意对象里添加这个属性，让他们可遍历。
```
const items = ['blue', 'yellow', 'white', 'black'];
for(item of items) {
    console.log(item);
}
```
### 总结
遍历器如果存在一个对象内,它就可以让这个对象可供for-of遍历，for-of的遍历方法就是不停的调用遍历器的next()方法，知道done属性编委true。

## 生成器Generator

本质上，**生成器函数返回的就是一个遍历器**

生成器的语法很简单，就是在function后面加个*,然后用yield来返回对应的值。(其实也可以将yield看做return,只不过需要next()来进行外调用，还有一个函数只能由一个return，而yield可以有多个)
```
function* items() {
    yield '1';
    yield '2';
    yield '3'
}
const num = items();

// 控制台
num.next(); // {value: '1', done: false}
num.next(); // {value: '2', done: false}
num.next(); // {value: '3', done: false}
num.next(); // {value: undefined, done: true}
num.next(); // {value: undefined, done: true}
```
那么我们yield的之间同样也可以加入运算

```
function* items() {
    let i = 0;
    yield i; // 0
    i++;
    yield i // 1
    i++
    yield i // 2
    i++ // 这个就不运行了，因为他在yield之后
}
const num = items();
// 不用浏览器控制台，直接打印也行
console.log(nu.next()); // {value: 0, done: false}
console.log(nu.next()); // {value: 1, done: false}
console.log(nu.next()); // {value: 2, done: false}
console.log(nu.next()); // {value: undefined, done: true}
```
利用这样的特性，我们可以用Generator来进行ajax的等待操作

```
fuction ajax(url) {
    // 请求成功自动调用next()方法。然后返回数据结果
    axios.get(url).then(res => gen.next(res.data));
}
function* step() {
    const class = yield ajax.get('http://laotie.com/getclass');
    const score = yield ajax.get(`http://laotie.com/getscore?name=￥{class[0].name}`)
}
// 获得这个函数的遍历器
const gen = step();
// 启动'遍历器',不启动就不会东
gen.next(); // 获取class
gen.next(); // 获取到score
```
因为第二个get请求依赖第一个请求的结果，所以我们解决办法第一个运用Promise的回调来限制他们的先后顺序。但是在我们学习了生成器之后发现生成器很适合做这样的事，也就是只有当第一个请求执行完之后，才能顺序执行第二个请求。

另外还有一些小的特性

*可以添加到任意位置，都不会影响genterator。下面的下发都是可以的

```
function * foo(x, y) {...}
function *foo(x, y) {...}
function* foo(x, y) {...}
function*foo(x, y) {...}
```
关于Generator的Thunk或者co模块，因为ES8的async的加入，极大简化了Generator的操作

## async

### 语法
准确的说,async就是Generator的语法糖，首先看他的语法
```
async function laotie() {
    const data = await dosomething();
}
```
可以看到，
+ 原来的*由async代替
+ 原来的yield由await代替
这样做的直接好处就是更加语义化，可读性更强。但是其实async做到的远不止如此。

1. 首先第一点，就是async不用不断执行next()了，async函数内置了执行器，使的我们在调用函数时，只需要直接调用就可以
```
// 接上一个代码块
laotie()
```
2. 现在async的await还是保留这等待的功能,但是因为没有了next(),所以在调用await不会像yield那样返回值了。在async中，只有return返回，而且返回的是一个promise对象.

拿上面的代码直接改成async加await格式
```
async function items() {
    let i = 0; 
    await i;
    i++;
    await i;
    i++;
    await i;
    i++
}
console.log(items()) // Promise{<pending>}
```
直接调用方法我们能看到返回的是一个状态为resolved的Promise对象，而不是Iterator.

而这个对象，返回的值就是函数里return出来的值。我们可以用then()函数来接受这个值并答应它。

```
async function items() {
    let i = 3;
    return i ;
}
items().then(res => {
    console.log(res); // 3
})
```
当然这么举例子准定不是正经的用法，这些例子主要用于区分Generator和async函数之间的区别。

### 用法

正确的用法现在是在await之后加入一个异步函数, await相当于将这个异步函数转化为同步函数，等这个异步函数执行完毕返回resolved的时候才往下执行进一步的操作：例如：
```
async function asyncPrint(value, ms) {
    await new Promise(resolve => {
        setTimeout(resoove, ms);
    })
    console.log(value);
}
asyncPrint('hello world', 1000); // 疫苗打印除hello world
```
如果这个async的函数中间有多个await，那么就让多个await以排队的方式执行。

***用法2***

先让我们把之前generator的例子拿过来
```
function ajax(url) {
    // 请求成功自动调用next()方法。然后返回数据结果
    axios.get(url).then(res => gen.next(res.data))
}
function* step() {
    const class = yield ajax.get('http://laotie.com/getClass');
    const score = yield ajax.get(`http://laotie.com/getscore?name=${class[0].name}`);
}

// 获得这个函数的遍历器
const gen = step();
// 启动遍历器
gen.next();
```
写着挺累的，但是async可以快速的简化它。因为await接受的就是一个Promise函数，所以我们可以直接在await后面使用axios，然后直接使用对象解构赋值获取相应的值。
```
async function step() {
    const {data: {class}} = await axios.get(`http: //laotiecom/getclass`);
    cosnt {data: {core}} = await axios.get(`http://laotie.com/getscore?name=${class[0].name}`);
    return {class, sore}
}
```

对象可以设置Symbol.iterval
```
let iterable = {
    data: {a: 1, b: 2, c: 3}, 
    [Symbol.iterator]() {
        const self = this;
        let index = 0;
        return {
            next() {
                const arr = Object.keys(self.data);
                done = index >= arr.length;
                value = done ? undefined : self.data[arr[index++]];
                return {
                    value,
                    done,
                }
            }
        }
    }
}
for (let item of iterable) {
    console.log(item);
}

// 二
var obj = {
    a: 1, 
    b: 1,
    [Symbol.iterator]: function() {
        console.log(123);
        return {
            next() {
                return {
                    value: 1,
                    done: true
                }
            }
        }
    }
}

var obj = {
    a: 1, 
    b: 1,
    [Symbol.iterator]: function* () {
        yield '1';
        yield '2';
        yield '3'
    }
}
```