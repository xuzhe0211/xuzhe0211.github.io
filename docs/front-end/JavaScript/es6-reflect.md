---
autoGroup-13: ES6
title: Reflect
---

## Reflect
### Reflect概述

Reflect对象与proxy对象一样，也是ES6为了操作对象而提供的新API。Reflect对象设计目的有一下几个

1. <span style="color: red">将Object对象的一些明显属于语言层面的方法放到Reflect对象上。比如Object.defineProperty</span>

    > 现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。

2. <span style="color: red">修改某些Object方法的返回结果，让其变得更合理。</span>
    
    > 比如：Object.defineProperty(obj,name,desc) 在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj,name,desc)则会返回 false,这样会更合理一些。

    ```js
    // 旧写法
    try {
        Object.defineProperty(target, property, attributes);
    } catch(err) {
        // failure
    }
    // 新写法
    if(Reflect.defineProperty(target, property, attributes)) {
        // success;
    } else {
        // failure
    }
    ```

3. <span style="color: red">让Object操作都变成函数行为。</span>

    > 某些Object操作试试命令式，比如 name in obj 和delete obj[name],而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让他们编程函数行为
    ```js
    // 老写法--命令式
    'assign' in Object; // true
    // 新写法
    Reflect.has(Object, 'assign'); // true
    ```

4. <span style="color: red">Reflect对象的方法与Proxy对象的方法一一对应。</span>

    > 只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法;这就让Proxy对象可以方便的调用对应的Reflect方法完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总在Reflect上获取默认行为。
    ```js
    Proxy(target, {
        set: function(target, name, value, receiver) {
            let success = Reflect.set(target, name, value, receiver);
            if(success) {
                console.log(`property ${name} on ${target} set do ${value}`);
            }
            return success;
        }
    })
    ```
    这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。

综上所述：Reflect对象有4个意义；
- <span style="color: red;">**从Reflect对象上可以拿到语言内部的方法**</span>
- <span style="color: red;">**操作对象出现报错时返回false**</span>
- <span style="color: red;">**让操作对象都变为函数式编程**</span>
- <span style="color: red;">**保持与proxy对象的方法一一对应**</span>

### Reflect 常用API
Reflect一共有13个静态方法

它可以一部分是原来在Object上的方法，将它转移到Reflect上，并做了小改动，让方法更合理。

- <span style="color: red">Reflect.defineProperty(target, name, desc)与Object.defineProperty(target, name, desc)类似，当对象无法定义时,Object.defineProperty会报错，而Reflect.defineProperty不会，它会返回false,成功时返回true,如果不是对象还是会报错</span>
- <span style="color: blue">Reflect.getPrototypeOf(target)与Object.getPrototypeOf，返回指定的对象的原型</span>
- <span style="color: blue">Reflect.setPrototypeOf(target, prototype) 和 Object.setPrototypeOf(target, prototype)一样，它将指定对象原型设置为另一个对象</span>
- <span style="color: blue">Reflect.getOwnPropertyDescriptor(target,name)和 Object.getOwnPropertyDescriptor(target,name) 一样，如果在对象中存在，则返回给定的属性的属性描述符</span>
- <span style="color: blue">Reflect.getOwnPropertyDescriptor(target, name) 和 Object.getOwnPropertyDescriptor(target, name) 一样，如果在对象中存在，则返回给定的属性的属性描述符</span>
- <span style="color: blue">Reflect.isExtensible(target) 与 Object.isExtensible(target) 类似，判断一个对象是否可扩展(是否可以在它上面添加新的属性)，它们的不同点是，当参数不是对象时(原始值),Object 将它强制转换为一个对象，Reflect 直接报错。</span>
- <span style="color: blue">Reflect.preventExtensions(target) 与 Object.preventExtensions(target) 类似，阻止新属性添加到对象，不同点和上一条一样。</span>
- <span style="color: blue">Reflect.apply(target,thisArg,args)与 Function.prototype.apply.call(fn,obj,args) 一样</span>
- <span style="color: blue">Reflect.ownKeys(target) 与 Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target)) 一样，返回一个包含所有自身属性(不包含继承属性)的数组。</span>

另一部分是将原来的操作符的功能，变成函数行为

- <span style="color: blue">Reflect.has(target, name) 与 in 操作符一样，让判断操作都变成函数行为</span>
- <span style="color: blue">Reflect.deleteProperty(target, name) 与 delete 操作符一样，让删除操作变成函数行为，返回布尔值表示成功或者失败</span>
- <span style="color: blue">Reflect.construct(target, args[, newTarget]) 与 new 操作符一样，target构造函数，第二个参数是构造函数的参数类数组，第三个是 new.target 的值</span>
- <span style="color: blue">Reflect.get(target,name[,receiver]) 与 Obj[key] 一样,第三个参数是当要取值的 key 部署了 getter 时，访问其函数的 this 绑定为 receiver 对象。</span>
- <span style="color: blue">Reflect.set(target,name,value[,receiver]) 设置 target 对象的 key 属性等于 value，第三个参数和 set 一样。返回一个布尔值。</span>

```js
// 老写法
'assign' in Object; // true
// 新写法
Reflect.has(Object, 'assign'); // true

// 老写法
Function.prototype.apply.call(Math.floor, undefined, [1.75]); // 1;
// 新写法
Reflect.apply(Math.floor, undefined, [1.75]); // 1

// 旧写法
delete myObj.foo;
// 新写法
Reflect.deleteProperty(myObj, 'foo');

// new的写法
const instance = new Greeting('张三');
// Reflect.construct的写法
const instance = Reflect.construct(Greeting, ['张三']);

// 旧写法
Object.defineProperty(MyDate, 'now', {
    value: () => Date.now(),
})
// 新写法
Reflect.defineProperty(MyDate, 'now', {
    value: () => Date.now(),
})

Reflect.get(1, "foo"); // 报错
Reflect.get(false, "foo"); // 报错
Reflect.set(1, "foo", {}); // 报错
Reflect.set(false, "foo", {}); // 报错

var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
};

var myReceiverObject = {
  foo: 4,
  bar: 4,
};

Reflect.get(myObject, "baz", myReceiverObject); // 8
```
:::tip
ES6为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，因为这个属性可以用来确定构造函数是怎么调用的
:::
```js
function Person(name) {
    if(new.target === Person) {
        this.name = name;
    } else {
        throw new Error('必须使用 new 命令生成实例');
    }
}
```
## Proxy
Proxy对象用于定义基本操作的自定义行为(如属性查找，赋值，枚举，函数调用等)，等同于在语言层面做出修改，所以属于一种"元编程"(meta programming),即编程语言进行编程。

<span style="color: blue">Proxy就像在目标对象之间的一个代理，任何对目标的操作都要经过代理。代理就可以对外界的操作进行过滤和改写</span>

Proxy是构造函数，它有两个参数target 和 handler

target 是用Proxy包装的目标对象(可以是任何类型的对象，包括原生数组，函数，甚至另一个代理)。

handler是一个对象，其属性是当执行一个操作时定义代理的行为函数
```js
let obj = new Proxy({}, {
    get: function(target, key, receiver) {
        console.log(`getting ${key}`);
        return Reflect.get(target, key, receiver);
    }, 
    set: function(target, key, value, receiver) {
        console.log(`setting ${key}`);
        return Reflect.set(target, key, value, receiver)
    }
})
obj.count = 1; // setting count
++obj.count; // getting count setting count 2
```
<span style="color: blue">Proxy 只有一个静态方法 revocable(target, handler) 可以用来创建一个可撤销的代理对象。两个参数和构造函数的相同。它返回一个包含了所生成的代理对象本身以及该代理对象的撤销方法的对象。</span>

一旦某个代理对象被撤销，它将变的几乎完全不可用，在它身上执行任何的可代理操作都会抛出TypeError异常(注意，可代理操作一共有14种，执行这14种操作以外的操作不会抛出异常)。一旦被撤销，这个代理对象永远不可能恢复到原来的状态，同时和它关联的目标对象以及处理器对象将有可能被垃圾回收掉。调用撤销方法多次将不会有人和效果，当然，也不会报错
```js
let revocable = Proxy.revocable({}, {
    get(target, name) {
        return '[[' + name + ']]'
    }
})
// revocable => {"proxy": proxy, 'revoke': revoke}

let proxy = revocable.proxy;
proxy.foo; // '[[foo]]'

proxy.foo; // TypeError
proxy.foo = 1; // TypeError
delete proxy.foo; // TypeError
typeof proxy; // "object" 因为typeof 不属于代理操作
```
handler参数是代理函数对象，它一共有13种拦截函数。和Reflect相同。如果没有定义某种操作，那么这种操作会被转发到目标对象上
```js
const proxy = new Proxy({}, {
    get: function(target, property, receiver) {
        return receiver;
        // reciever 总是指向原始的读操作所在的那个对象，一般情况下就是Proxy实例
    }
})
proxy.getReceiver === proxy; // true;
```
<span style="color: red">如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。</span>

```js
const target = Object.defineProperty({}, {
    foo: {
        value: 123,
        writable: false,
        configurable: false,
    }
})
const handler = {
    get(target, propKey) {
        get(target, propKey) {
            return 'abc'
        }
    }
}
const proxy = new proxy(target, handler);
proxy.foo; // TypeError: Invariant check failed
```
<span style="color: red">apply 方法拦截函数的调用、call 和 apply 操作</span>

```js
let target = function() {
    return 'I am the target';
}
var p = new Proxy(target, {
    apply: function() {
        return 'I am the proxy';
    }
})
p(); // I am the proxy
```
defineProperty 方法拦截了 Object.defineProperty 操作。
```js
var handler = {
  defineProperty(target, key, descriptor) {
    return false;
  },
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = "bar"; // 不会生效
// defineProperty 方法返回 false，导致添加新属性总是无效。
```
注意，如果目标对象不可扩展（non-extensible），则 defineProperty 不能增加目标对象上不存在的属性，否则会报错。另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则 defineProperty 方法不得改变这两个设置。

getPrototypeOf 方法主要用来拦截获取对象原型，会拦截一下操作
- Object.prototype.__proto__
- Object.prototype.isPrototypeOf()
- Object.getPrototypeOf()
- Reflect.getPrototypeOf()
- instanceof

ownKeys 方法用来拦截对象自身属性读取的操作，会拦截以下操作：
- Object.getOwnPropertyNames()
- Object.getOwnPropertySymbols()
- Object.keys()
- for...in

通过代理，你可以轻松地验证向一个对象的传值。
```js
let validator = {
  set: function (obj, prop, value) {
    if (prop === "age") {
      if (!Number.isInteger(value)) {
        throw new Error("The age is not an integer");
      }
      if (value > 200) {
        throw new Error("The age seems invalid");
      }
    }
    // The default behavior to store the value
    obj[prop] = value;
  },
};
let person = new Proxy({}, validator);
person.age = 100;
console.log(person.age); // 100

person.age = "young";
// 抛出异常: Uncaught TypeError: The age is not an integer
person.age = 1000;
// 抛出异常: Uncaught RangeError: The age seems invalid
```
### this指向
虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的 this 关键字会指向 Proxy 代理。

```js
const target = {
    m: function() {
        console.log(this === proxy);
    }
}
const handler = {};
const proxy = new Proxy(target, handler);
target.m(); // false
proxy.m(); // true
```
```js
const target = new Date();
const handler = {};
const proxy = new Proxy(target, handler); 

proxy.getDate();
// TypeError: this is not a Date object.

// getDate 方法只能在Date对象实例上面拿到，
// 如果this不是Date对象实例就会报错。
// 这时，this绑定原始对象，就可以解决这个问题
const target = new Date("2021-07-28");
const handler = {
  get(target, prop) {
    if (prop === "getDate") {
      return target.getDate.bind(target);
    }
    return Reflect.get(target, prop);
  },
};
const proxy = new Proxy(target, handler);
proxy.getDate(); // 28
```

## Example
- 检测一个对象是否存在特定属性

    ```js
    const duck = {
        name: 'Maurice',
        color: 'white',
        greeting: function() {
            console.log(`Quaaack! My name is ${this.name}`)
        }
    }
    Reflect.has(duck, 'color'); // true 自身和原型链上
    Reflect.has(duck, 'haircut'); // false;
    ```
- 返回这个对象自身的属性

    ```js
    Reflect.ownKeys(duck); // ['name', 'color', 'greeting'];
    ```
- 为这个对象添加一个新的属性

    ```js
    Reflect.set(duck, 'eyes', 'black');
    ```
## JS数组扁平化(flat)

**需求：** 多维数组=> 一维数组
```js
let ary = [1, [2, [3, [4,5]]], 6];
let str = JSON.stringify(arr);
```
** 第0种处理：直接调用**
```js
arr_flat = arr.flat(Infinity);
```
** 第一种处理 **
```js
ary = str.replace(/(\[|\])/g, '').split(',')
```

** 递归调用 **
```js
let result = [];
let fn = function(ary) {
	for (let i = 0; i < ary.length; i++) {
    	let item = ary[i];
        if (Array.isArray(ary[i])) {
        	fn(item);
        } else {
        	result.push(item);
        }
    }
}
```
** 用reduce实现数组的flat方法 **
```js
function flatten(ary) {
	return ary.reduce((pre, cur) => {
    	return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
    })
}
```
** 扩展运算符 **
```js
while(ary.some(Array.isArray)) {
	ary = [].concat(...ary);
}
```

数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组拉平，变成一维数组。该方法返回一个新数组，对原数据没有影响。

如果原数组有空位，flat()方法会跳过空位。

```js
[1,2,,4,5].flat();
//[1,2,4,5]
```
flatMap()方法对原数组的每个成员执行一个函数，相当于执行Array.prototype.map(),然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组
```js
//相当于[[2,4], [3,6],[4,8]].flat();
[2,3,4].flatMap(x => [x, x*2])
//[2,4,3,6,4,8]
```
## 资料

[Proxy、Reflect教程](https://www.runoob.com/w3cnote/es6-reflect-proxy.html)

[说下你对 Reflect 的理解？为什么会有 Reflect 的出现？Proxy 也简单的说一下？](https://github.com/lgwebdream/FE-Interview/issues/1203)