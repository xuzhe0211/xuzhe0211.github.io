---
autoGroup-13: ES6
title: Set/Map区别
---

[原文地址](https://www.cnblogs.com/magicg/p/13131383.html)

## 总结
### set

1. 成员不能重复
2. 只有键值，没有键名，有点类似数组
3. 可以遍历，方法有add，delete, has

### weakSet

1. 成员都是对象
2. 成员都是弱引用，随时可以消失。可以用来保存DOM节点，不容易造成内存泄漏
3. 不能遍历，方法有add,delete, has

### Map

1. 本质上是键值对的集合，类似集合。
2. 可以遍历，方法有很多，可以跟各种数据转换

### weakMap

1. 直接受对象作为建名(null除外)，不接受其他类型的值作为键名
2. 键名所指向的对象，不计入垃圾回收机制
3. 不能遍历，方法get,set,has, delete

Set和Map主要的应用场景在于数据重组和数据储存

Set是一种叫做集合的数据类型，Map是一种叫做字典的数据类型。

## 集合(Set)

ES6新增的一种新的数据类型，类似数组，但是成员的唯一且无序的，没有与重复的值。

Set本身是构造函数，用来生成Set数据类型
```
new Set();
//举个栗子
const s = new Set();
[1,2,3,4,3,2,1].forEach(x=> s.add(x));

for(let i of s) {
	console.log(i);
}
//去重数组的重复对象
let arr = [1,2,3,2,1];
[...new Set(arr)];
```
Set对象允许你储存任何类型的唯一值，无论是原始值或是对象的引用

向Set加入值的时候，不会发生类型转换，所以5和'5'是不同的值。

Set内部判断两个值是否不同，使用的算法叫做'Same-value-zero equuality'，它类似精确相等运算符(===)，主要区别是NaN等于自身，而精确相等运算法认为NaN不等于自身
```
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
console.log(set)//Set(NaN)

let set1 = new Set();
set1.add(5);
set1.add('5');
console.log([...set1])//[5, '5']
```
Set实例属性
- construcotor属性
- size元素数量
```
let set = new Set([1,2,3,2,1]);
console.log(set.length) //undefined
console.log(set.size);//3
```
Set实例方法
- add(value):新增，相当于array里的push
- delete(value):存在即删除集合中value
- has(value):判断集合中是否存在value
- clear():清空集合
```
let set = new Set();
set.add(1).add(2).add(1);
set.has(1);//true
set.has(3);//false
set.delete(1);/
set.has(1);//false;
```
Array.from方法可以将Set结构转成数组
```
const items = new Set([1,2,3,2]);
const array = Array.from(items);
console.log(array);
//或
const arr = [...item];
console.log(arr);
```

遍历方法
- keys()：返回一个包含集合中所有键的迭代器
- values(): 返回一个包含集合中所有值的迭代器
- entries():返回一个包含Set对象中所有元素的键值对的迭代器
- forEach(callbackFn, thisArg):用于对集合成员执行callbackFn操作，如果提供了thisArg参数，回调中的this会是这个参数，没有返回值

```
let set = new Set([1,2,3]);
console.log(set.keys())
console.log(set.values())
console.log(set.enntries())

for (let item of set.keys()) {
	console.log(item)
}// 1 2 3
```

Set可默认遍历，默认迭代器生成函数是values()方法

```
Set.prototype[Symbol.intertor] === Set.prototype.values // true
```
所以，Set可以使用map,filter方法

```
let set = new Set([1,2,3]);
set = new Set([...set]).map(item => item * 2);
console.log([...set]) //[2,4,6]

set = new Set([...set]).filter(item => item >= 4);
console.log([...set])
```

因此，Set很容易实现交集、并集、差集

```
let set1 = new Set([1,2,3]);
let set2 = new Set([4,3,2]);

let intersect = new Set([...set1]).filter(value => set2.has(value));
let union = new Set([...set1, ...set2]);
let difference = new Set([...set1]).filter(value => !set2.has(value));
```

## WeakSet
WeakSet对象允许你将弱引用对象储存在一个集合中。

WeakSet与Set的区别：

- WeakSet只能储存对象引用，不能存放值，而Set对象可以
- WeakSet对象中储存的对象都是被弱引用的，即垃圾回收机制不考虑WeakSet对该对象的应用，如果没有其他变量或属性引用这个对象值，则这个对象将会被垃圾回收掉(不考虑对象还存在于WeakSet中)，所以，WeakSet对象里有多少个成员元素，取决于垃圾回收机制有没有运行，运行前后成员个数可能不一致，遍历结束之后，有的成员可能取不到了(被垃圾回收了),WeakSet对象是无法被遍历的(ES6规定WeakSet不可遍历)，也没有办法拿到它包含的所有元素

属性
- constructor:构造函数，任何一个具有Iterable接口的对象，都可以作为参数
- add(value):在WeakSet对象中添加一个元素value
- has(value):判断WeakSet对象中是否包含value
- delete(value):删除元素value

```
var ws = new WeakSet();
var obj = {};
var foo = {};

ws.add(window);
ws.add(obj);

ws.has(window);//true
ws.has(foo);//false

ws.delete(window);// true
ws.has(window); //false
```

## 字典(map)

集合与字典的区别：
- 共同点:集合、字典可以储存不重复的值
- 不同点:集合是以[value, value]的形式储存元素，字典是以[key, value]的形式存储

```
const m = new Map();
const o = {p: 'haha'};
m.set(o, 'content');
m.get(o);//content

m.has(o);//true
m.delete(o);//true
m.has(o); //false
```
任何具有Iterator接口、且每个成员都是一个双元素的数组的数据结构都可以作为Map构造函数的参数，例如：
```
const set = new Set([
	['foo', 1],
    ['bar', 2]
])
const m1 = new Map(set);
m1.get('foo');//1

const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz');//3
//如果读取一个位置的键，则返回undefined
new Map().get('fdasfasg')
```
**注意，只有对同一个对象的引用，Map结构才将其视为同一个键，这一点非常小心**
```
const map = new Map();
map.set(['a'], 555);
map.get(['a']);//undefined
```
上面代码的set和get方法，表面上是针对同一个键，但实际上这是两个值，内存地址是不一样的，因此get方法无法读取该键，返回undefined

Map的键实际上是跟内存地址绑定，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞(clash)的问题，我们扩展别人库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名

如果Map的键是一个简单类型的值(数字、字符串、布尔值)，则只要两个值严格相等，Map将其视为一个建，比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。另外，undefined和null也是两个不同的键。虽然NaN不严格相等于自身，但是Map将其视为同一键

```
let map = new Map();
map.set(-0, 123);
map.get(+0);//123

map.set(true,1);
map.set('true', 2);
map.get(true);//1

map.set(undefined, 3);
map.set(null, 4);
map.get(undefined);//3

map.set(NaN,123);
map.get(NaN);//123

```

**属性**：
- constructor:构造函数
- size:返回字典中所包含的元素个数

  ```
  const map = new Map([
      ['name', 'An'],
      ['des', 'JS']
  ])
  map.size //2
  ```
  
**操作方法**
- set(key, value):想字典中添加新元素
- get(key):通过键查找特定的数值并返回
- has(key): 判断字典中是否存在键Key
- delete(key):通过键key从字典中移除对应的数据
- clear():将这个字典中所有元素删除

**遍历方法**

- Keys():将字典中包含的所有键名以迭代器形式返回
- values():将字典中包含的所有数值以迭代器形式返回
- entries():返回所有成员的迭代器
- forEach():遍历字典所有成员

```
const map = new Map([
	['name', 'An'],
    ['des', 'JS']
])
console.log(map.entries())    // [Map Entries] { [ 'name', 'An' ], [ 'des', 'JS' ] }
console.log(map.keys()) // [Map Iterator] { 'name', 'des' }
```
Map结构的默认遍历器接口(Symbol.interator属性)，就是entries方法
```
map[Symbol.iterator] === map.entries;//true
```

Map结构转为数组结构，比较快速的方法就是使用扩展运算符(...)

```
const reporter = {
	report: function(key, value) {
    	console.log('Key: %s, Value: %s', key, value);
    }
}
let map = new Map([
	['name', 'An'], 
    ['des', 'JS']
])
map.forEach(function(value, key, map){
	this.report(key, value)
}, reporter);
//这里，forEach方法的回调函数的this,就是指向reporter
```

**与其他数据结构的相互转换**
1. Map转Array
```
const map = new Map([[1,1], [2,2]， [3,3]]);
console.log([...map])
```
2. Array转map
```
const map = new Map([[1,1], [2,2], [3,4]]);
console.log(map)
```
3. Map转Object

因为Object的键名都为字符串，而Map的键名为对象，所以转换的时候会把非字符串键名转换为字符串键名
```
function mapToObj(map) {
	var obj = Object.create(null);
    for (let [key, value] of map) {
    	obj[key] = value;
    }
    return obj;
}
const map = new Map().set('name', 'An').set('des','Js');
mapToObj(map)
```
4. Object 转 Map

```
functon objToMap(obj) {
	let map = new Map();
    for (let key of Object.keys(obj)) {
    	map.set(key, obj[key]);
    }
    return map
}
objToMap({'name': 'An', 'des': 'Js'})
```

5. Map转JSON
```
function mapToJson(map) {
	return JSON.stringify([...map])
}
```
6. JSON转Map
```
function jsonToStrMap(jsonStr) {
	return objToMap(JSON.parse(jsonStr))
}
```

## WeakMap

WeakMap对象是一组键值对的集合，其中的键是弱引用对象，而值是可以任意。

注意，WeakMap弱引用的只是键名，而不是键值。键值依然是正常引用。

WeakMap中，每个键对自己所引用对象的引用都是弱引用，在没有其他引用和该键引用同一对象，这个对象将被垃圾回收(相应key则变成无效),所以WeakMap是不可枚举的

**属性**
- construcor:构造函数

**方法**
- has(key):判断是否有key关联对象
- get(key):返回key关联对象(没有则返回undefined)
- set(key):设置一组key关联对象
- delete(key)：删除key的关联对象

```
let myElement = document.getElementById('logo');
let myWeakmap = new WeakMap();

myWeakmap.set(myElement, { timesClicked:0});

myElement.addEventListener('click', function() {
	let logoData = myWeakmap.get(myElement);
    logoData.timesClicked++;
}, false)
```