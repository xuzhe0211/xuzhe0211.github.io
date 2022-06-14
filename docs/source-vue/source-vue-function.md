---
autoGroup-9: vue原理
title: vue源码中值得学习的方法
---

## 数据类型判断

Object.prototype.toString.call()返回的数据格式为[object Object]类型，然后用slice截取8位到倒一位，得到结果Object

```js
var _toString = Object.prototype.toString；
function toRawType(value) {
    return _toStrinng.call(value).slice(8, -1)
}
```
运行测试结果
```js
toRawType({}) //  Object 
toRawType([])  // Array    
toRawType(true) // Boolean
toRawType(undefined) // Undefined
toRawType(null) // Null
toRawType(function(){}) // Function
```

## 利用闭包构造map缓存数据
vue中判断我们写的组件明是不是html内置标签的时候，如果用数组类遍历那么要循环多次获得结果，如果把数组转为对象，把标签名设置为对象的key,那么不用依次遍历查找，只需要查找一次就能获取结果，提高了查找效率

```js
function makeMap (str, expectsLowerCase) {
    // 构建闭包集合map
    var map = Object.create(null);
    var list = str.split(',');
    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase
      ? function (val) { return map[val.toLowerCase()]; }
      : function (val) { return map[val]; }
}
// 利用闭包，每次判断是否是内置标签只需调用isHTMLTag
var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title')
console.log('res', isHTMLTag('body')) // true
```

## 二维数组扁平化
vue中_createElement格式化传入的children的时候用到了simpleNormalizeChildren函数,原来为了拍平数组，使二维数组扁平化，类似lodash中flatten方法
```js
//先看loadsh中的flatten
_.flatten([1,[2, [3, [4], 5]]]);
// 得到的结果为[1, 2, [3, [4]], 5]

// vue中
function simpleNormalizeChildren(children) {
    for (var i = 0; i < children.length; i++) {
        if (Array.isArray(children[i])) {
            returnn Array.prototype.concat.apply([], children);
        }
    }
    return children;
}

// es6等价于
function simpleNormalizeChildren(children) {
    return [].concat(...children)
}
```

## 方法拦截
vue中利用Object.defineProperty收集依赖，从而触发更新视图，但是数组却无法坚挺到数据的变化，但是为什么数组在使用push、pop等放你发的时候可以触发页面更新呢，那是因为vue内部拦截了这些方法

```js
// 重写push等方法，然后再把原型指回原方法
  var ARRAY_METHOD = [ 'push', 'pop', 'shift', 'unshift', 'reverse',  'sort', 'splice' ];
  var array_methods = Object.create(Array.prototype);
  ARRAY_METHOD.forEach(method => {
    array_methods[method] = function () {
      // 拦截方法
      console.log('调用的是拦截的 ' + method + ' 方法，进行依赖收集');
      return Array.prototype[method].apply(this, arguments);
    }
  });
```
运行结果测试
```
var arr = [1,2,3]
arr.__proto__ = array_methods // 改变arr的原型
arr.unshift(6) // 打印结果: 调用的是拦截的 unshift 方法，进行依赖收集
```

## 继承实现
vue调用Vue.extends实例化组件，Vue.extends就是VueComponent构造函数，而VueComponent利用Object.create继承Vue,所以在平常开发中Vue和Vue.extend区别不是很大。这边主要学习用es5原生方法实现继承，当然了，e6中class类直接用extends继承

```js
function inheritPrototype(Son, Father) {
    var prototype = Object.create(Father.prototype);
    prototype.constructor = Son;
    // 
    Son.prototype = prototype;
}
function Father(name) {
    this.name = name;
    this.arr = [1,2,3];
}
Father.prototype.getName = function() {
    console.log(this.name);
}
function Son(name, age) {
    Father.call(this, name);
    this.age = age;
}
inheritPrototype(Son, Father) {
    console.log(this.age);
}
Son.prototype.getAge = function() {
  console.log(this.age)
}

```
运行结果
```js
var son1 = new Son("AAA", 23)
son1.getName()            //AAA
son1.getAge()             //23
son1.arr.push(4)          
console.log(son1.arr)     //1,2,3,4

var son2 = new Son("BBB", 24)
son2.getName()            //BBB
son2.getAge()             //24
console.log(son2.arr)     //1,2,3
```
## 执行一次
once方法相对比较简单，直接利用闭包实现就好
```
function once(fn) {
    var called = false;
    return function() {
        called = true;
        fn.apply(this, arguments);
    }
}
```

## 对象判断
vue源码中的looseEqual判断两个对象是否相等，先类型判断在递归调用，总体也不难，学一下思路
```js
function looseEqual(a, b) {
    if (a === b) retrun true;
    var isObjectA = isObject(a);
    var isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
        try {
            var isArrayA = Array.isArray(a);
            var isArrayB = Array.isArray(b);
            if (isArrayA && isArrayB) {
                return a.length === b.length && a.every(function(e, i) {
                    return looseEqual(e, b[i])
                })
            } else if (!isArrayA && !isArrayB) {
                var keysA = Object.keys(A);
                var keysB = Object.keys(B);
                return keysA.length === keysB.length && keysA.every(function (key) {
                    return looseEqual(a[key], b[key])
                })
            } else {
                return false;
            }
        } catch (e) {
            returnn false;
        }
    }else if (!isObjectA && !isObjectB) {
        return String(a) === String(b)
    } else {
        return false
    }
}
function isObject(obk) {
    return obj !== null && typeof obj === 'object';
}
```
由上思路我自己写一个深拷贝方法，不过简单的深拷贝我们可以用 JSON.stringify() 来实现即可

```js
unction deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
```

## 资料
[原文档](https://segmentfault.com/a/1190000025157159)
