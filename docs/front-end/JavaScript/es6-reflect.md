---
autoGroup-13: ES6
title: Reflect
---

## Reflect
### Reflect概述

Reflect对象与proxy对象一样，也是ES6为了操作对象而提供的新API。Reflect对象设计目的有一下几个

1. <span style="color: red">将Object对象的一些明显属于语言层面的方法放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。</span>

2. <span style="color: red">修改某些Object方法的返回结果，让其变得更合理。比如Object.defineProperty(obj, name, desc)在无法定义属性时会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false</span>

3. <span style="color: red">让Object操作都变成函数行为。某些Object操作试试命令式，比如 name in obj 和delete obj[name],而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让他们编程函数行为</span>

4. <span style="color: red">Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便的调用对应的Reflect方法完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总在Reflect上获取默认行为。</span>

Proxy可以对目标对象的读取、函数调用等操作进行拦截，然后进行操作处理。它不直接操作对象，而是像代理模式，通过对象的代理对象进行操作，在进行这些操作时候，可以添加一些需要的额外操作

Reflect可以用于获取目标对象的行为，它与Object类似，但是更益读，为操作对象提供了一个更优雅的方式，他的对象与Proxy是对应的


ES6中将Object的一些明显属于语言内部的方法移植到了Reflect对象上(当前某些方法同时存在Object和Reflect对象上)，未来新的方法只会部署在Reflect对象上

Reflect对象对某些方法的返回结果进行了修改，使其更加合理。

Reflect对象使用函数的方式实现了Object的命令式操作。

[Proxy、Reflect教程](https://www.runoob.com/w3cnote/es6-reflect-proxy.html)

```
Proxy(target, {
	set: function(target, name, value, receiver) {
    	var success = Reflect.set(target, name, value, receiver);
        if (success) {
        	log(`property ${name} on ${target} set to ${value}`);
        }
        return success;
    }
})
```
上面的代码中，Proxy方法拦截了target对象属性赋值的行为。它采用Reflect.set方法赋值给对象的属性，然后在部署额外功能

```javascript
var obj = {a: 1, b: 2,c: 3}

var loggedObj = new Proxy(obj, {
	get(target, name) {
    	console.log('get', target, name);
		return Reflect.get(target, name);
    },
    deleteProperty(target, name) {
    	console.log('delete' + name);
		return Reflect.deleteProperty(target, name);
    },
    has(target, name){
    	console.log('has '+ name);
        return Reflect.has(target, name);
    }
})

console.log(loggedObj.a)
delete loggedObj.a
console.log('b' in loggedObje)
```
上面代码中，每一个Proxy对象的拦截操作(get, delete, has)内部都调用对应的Reflect方法，保证原生行为能够正常执行。添加的工作就是将一个操作输出一行日志

### Reflect方法

Reflect对象方法如下。

1. Reflect.getOwnPropertyDescriptor(target, name);
2. Reflect.defineProperty(target, name, desc);
3. Reflect.getOwnPropertyNames(target);
4. Reflect.getPropertyOf(target);
5. Reflect.setPropertyOf(target, prototype);
6. Reflect.deleteProperty(target, name);
7. Reflect.enumerate(target)
8. Reflect.freeze(target)
9. Reflect.seal(target)
10. Reflect.preventExtensionos(target);
11. Reflect.isFrozen(target);
12. Reflect.isSealed(target);
13. Reflect.has(target, name);
14. Reflect.hasOwn(target, name);
15. Reflect.keys(target);
16. Reflect.get(target, name, receiver);
17. Reflect.set(target, name, value, receiver);
18. Reflect.apply(target, thisArg, args);
19. Reflect.construct(target, args)

上面这些方法的作用，大部分与Object对象的同名方法是相同的。

```
Reflect.get(target, name, receiver);
//查找并返回target对象的name属性，如果没有改属性，则返回undefined.
//如果name属性部署了读取函数，则读取函数的this绑定receiver.
var obj = {
	get foo() { return thiss.bar(); },
    bar:function() {...}
}
//下面的语句会让this.bar()编程调用wrapper.bar();
Reflect.get(obj, 'foo', wrapper);



Reflect.set(target, name, value, receiver);
//设置target对象的name属性等于value.如果哦name属性设置了赋值函数，则复制函数的this绑定receiver.
```

```
//Reflect.set方法设置target对象的name属性等于value。如果name属性设置了赋值函数，则赋值函数的this绑定receiver。
var myObject = {
  foo: 4,
  set bar(value) {
    return this.foo = value;
  },
};

var myReceiverObject = {
  foo: 0,
};

Reflect.set(myObject, 'bar', 1, myReceiverObject);
myObject.foo // 4
myReceiverObject.foo // 1
```

[说下你对 Reflect 的理解？为什么会有 Reflect 的出现？Proxy 也简单的说一下？](https://github.com/lgwebdream/FE-Interview/issues/1203)
## JS数组扁平化(flat)

**需求：** 多维数组=> 一维数组
```
let ary = [1, [2, [3, [4,5]]], 6];
let str = JSON.stringify(arr);
```
** 第0种处理：直接调用**
```
arr_flat = arr.flat(Infinity);
```
** 第一种处理 **
```
ary = str.replace(/(\[|\])/g, '').split(',')
```

** 递归调用 **
```
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
```
function flatten(ary) {
	return ary.reduce((pre, cur) => {
    	return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
    })
}
```
** 扩展运算符 **
```
while(ary.some(Array.isArray)) {
	ary = [].concat(...ary);
}
```

数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组拉平，变成一维数组。该方法返回一个新数组，对原数据没有影响。

如果原数组有空位，flat()方法会跳过空位。

```
[1,2,,4,5].flat();
//[1,2,4,5]
```
flatMap()方法对原数组的每个成员执行一个函数，相当于执行Array.prototype.map(),然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组
```
//相当于[[2,4], [3,6],[4,8]].flat();
[2,3,4].flatMap(x => [x, x*2])
//[2,4,3,6,4,8]
```