---
autoGroup-13: ES6
title: 6 个ES13 中非常实用的新 JavaScript 特性
---
## At
当我们想要回去数组的第N个元素时，我们通常使用[]来获取
```js
const array = ['fatfish', 'medium', 'blog', 'flat', 'fish'];

console.log(array[1], array[0]);
```
哦，这似乎不是什么稀罕事。但是请朋友们帮我回忆一下，如果我们想得到数组的最后第N个元素，我们会怎么做
```js

const array = [ 'fatfish', 'medium', 'blog', 'fat', 'fish' ]
const len = array.length

console.log(array[ len - 1 ]) // fish
console.log(array[ len - 2 ]) // fat
console.log(array[ len - 3 ]) // blog
```
这看起来很难看，我们应该寻求一种更优雅的方式来做这件事。 是的，以后请使用数组的at方法

它使您看起来像高级开发人员
```js
const array = ['fatfish', 'medium', 'bolg', 'fat', 'fish'];

console.log(array.at(-1)); // fish
console.lo(array.at(-2)); / fat
console.log(array.at(-3)); // blog
```
## Object.hasOwn
是的，通常有两种方式，他们有什么区别呢？
- 对象中的"名称"
- obj.hasOwnProperty('名称')
1. in 运算符

    如果指定属性在指定对象或原型链中，则in运算符返回true
    ```js
    const Person = function(age) {
        this.age = age;
    }
    Person.prototype.name = 'fatfish';

    const p1 = new Person(24);

    console.log('age' in p1); // true
    console.log('name' in p1); // true pay attention here
    ```
2. obj.hasOwnProperty

    hasOwnProperty方法返回一个布尔值，指示对象是否具有指定的属性作为其自身的属性(而不是继承它)

    使用上面相同的例子
    ```js
    const Person = function(age) {
        this.age = age;
    }
    Person.prototype.name = 'fatish';

    const p1 = new Person(24);

    console.log(p1.hasOwnProperty('age')); // true
    console.log(p1.hasOwnProperty('name')); // false
    ```
    也许"obj.hasOwnProperty"已经可以过滤掉原型链上的属性，但是在某些情况下并不安全，会导致程序失败。

    ```js
    Object.create(null).hasOwnProperty('name');
    // Uncaught TypeError: Object.create(...).hasOwnProperty is not a function
    ```
3. Object.hasOwn

    不用担心，我们可以使用"Object.hasOwn"来规避这两个问题，比："obj.hasOwnProperty"方法更方便更安全
    ```js
    let object = { age: 24 };
    Object.hasOwn(object, 'age'); // true

    let object2 = Object.create({age: 24});
    Object.hasOwn(object2, 'age'); // false;

    let object3 = Object.create(null);
    Object.hasOwn(object3, 'age'); // false;
    ```
## 在模块的顶层使用"await"
来自mdn的await操作符用于等待一个Promise并获取它的fulfillment值
```js
const getUserInfo = () => {
    return new Promise(rs => {
        setTimeout(() => {
            rs({
                name: 'fatfish'
            })
        }, 2000)
    })
}
// If you want to use await ,you must use the async function
const fetch = async () => {
    const userInfo = await getUserInfo();
    console.log('userInfo', userInfo)
}
fetch();

// SyntaxError: await is only valid in async functions
const userInfo = await getUserInfo()
console.log('userInfo', userInfo)
```
事实上，在ES13之后，我们可以在模块的顶层使用await，这对于开发者来说是一个非常令人高兴的心特性。太棒了
```js
const getUserInfo = () => {
    return new Promise((rs) => {
        setTimeout(() => {
            rs({
                name: 'fatfish'
            })
        }, 2000)
    })
}
const userInfor = await getUserInfo();
constole.log('userInfo', userInfo)
```
## 使用"#"声明私有属性
以前我们用"_"来表示私有属性，但是不安全，仍然有可能被外部修改。
```js
class Person {
    constructor(name) {
        this._money = 1;
        this.name = name;
    }
    get money() {
        return this._money
    }
    set money(money) {
        this._money = money
    }
    showMoney() {
        console.log(this._money)
    }
}
const p1 = new Person('fatfish');
console.log(p1.money); // 1
console.log(p1._money); // 1;

p1._money = 2 // Modify private property _money from outside

console.log(p1.money) // 2

console.log(p1._money) // 2
```
<span styl="color:red">我们可以使用"#"来实现真正安全的私有属性</span>

```js
class Person {
    #money = 1;
    constructor(name){
        this.name = name;
    }
    get money() {
        return this.#money
    }
    set money(money) {
        this.#money = money;
    }
    showMoney() {
        console.log(this.#money)
    }
}
const p1 = new Person('fatfish');
console.log(p1.money); // 1

// p1.#money = 2 // We cannot modify #money in this way
p1.money = 2

console.log(p1.money) // 2

console.log(p1.#money) // Uncaught SyntaxError: Private field '#money' must be declared in an enclosing class
```
## 更容易为类设置成员变量
除了通过"#"为类设置私有属性外，我们还可以通过一种新的方式设置类的成员变量
```js
class Person {
    constructor() {
        this.age = 1000;
        this.name = 'fatfish'
    }
    showInfo(key) {
        console.log(this[key])
    }
}
const p1 = new Person();

p1.showInfo('name'); // fatfish
p1.showInfo('age'); // 1000
```
现在你可以使用下面的方式，使用起来更加方便
```js
class Person {
    age = 1000;
    name = 'fatfish'

    showInfo(key) {
        console.log(this[key])
    }
}
const p1 = new Person();

p1.showInfo('name'); // fatfish
p1.showInfo('age'); // 1000
```
## 从数组末尾查找元素
当我们想从数组中找到满足一定条件的元素时，find和findIndex都是不错的选择
```js
const array = Array(1000000).fill(1); 
array.push(2);

const d1 = Date.now();
const el = array.find(el => el >= 2);
const d2 = Date.now();

console.log({ el, time: d2 - d1})
```
![从数组末尾查找元素](./images/1.png)

得到2，查找时间用了84毫秒，这是一个很恐怖的数字，而且耗时太长了。

幸运的是，从ES13开始，如果你之前指定目标元素更靠近尾部，使用findLast(或者findLastIndex)将大大减少其查找时间
```js

const array = Array(10000000).fill(1)

array.push(2)

const d1 = Date.now()
const el = array.findLast((el) => el >= 2)
const d2 = Date.now()

console.log({ el, time: d2 - d1 })
```


## 资料
[6 个ES13 中非常实用的新 JavaScript 特性](https://mp.weixin.qq.com/s/sPZMKlo6Dzq2l3esgjuJ5A)