---
autoGroup-13: TypeScript
title: TS中的装饰器
---

## 介绍

::: tip
装饰器模式允许向一个现有的对象添加新的功能，同时又不改变其结构。这种类型的设计模式属于结构型模式，它是作为现有类的一个包装。

这种模式创建了一个装饰类，用来包装原有的类，并在保持类方法签名完整性的前提下，提供了额外的功能。

我们通过下面的实例来演示装饰器模式的用法。其中，我们将吧一个形状装饰上不通的颜色，同时有不改变形状类。
:::

## 定义一个方法
```js
class log{
    print(msg) {
        console.log(msg);
    }
}
const log = new Log();
log.print('hello');
```

## 装饰一下Print函数

+ 日志美化
+ 执行日志AOP

```js
const dec = (target, property) => {
    const old = target.prototype[property];
    target.prototype[property] = msg => {
        console.log('执行pront方法....');
        msg = `{${msg}}`;
        old(msg);
    }
}
dec(Log, 'print');
```

## 装饰器工厂

- 打印定制化

```js
const dec = name => (target,property) => {
    const old = target.prototype.print
    target.prototype[property] = msg => {
        console.log('执行print方法...')
        msg = `{${msg}} ${name}`
        old(msg)
    }
}
dec('name')(Log, 'print');
```

## 注解风格的装饰器

```js
function decorate(target, property, descriptor) {
    var oldValue = descriptor.value;
    descriptor.value = msg => {
        msg = `[${msg}]`;
        return oldValue.apply(null, [msg]);
    }
    return descriptor;
}

class Log{
    @decorate
    print(msg) {
        console.log(msg);
    }
}
```

1. anotation 源码

```js
const anotation = (target,proterty,decorate) => {
    const descriptor = decorate(Log.prototype, proterty, Object.getOwnPropertyDescriptor(Log.prototype, proterty))
    Object.defineProperty(Log.prototype ,proterty,descriptor)
}
anotation(Log,'print',decorate)
```

[原文地址](https://juejin.cn/post/6844904164045094926)


## 参考资料

[地址] (https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

### Object.getOwnPropertyDescriptor()

object.getOwnPropertyDescriptor()方法返回指定对象上一个自有属性对应的属性描述符(自有属性指的是直接赋予改对象的属性，不需要从原型链上进行查找的属性)。

```js
cosnt object1 = {
    property1: 42
}
const descriptor1 = Object.getOwnPropertyDescriptor(object1, 'property1');

console.log(descriptor1.configurable); // true;

console.log(descriptor1.value); // 42

```

#### 描述
该方法允许对一个属性的描述进行检索。


### Object.defineProperty

Object.defineProperty()方法直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此属性。

```js
const object1 = {};

Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false
});

object1.property1 = 77;
// throws an error in strict mode

console.log(object1.property1);
```
#### 语法
+ obj

    要定义属性的对象

+ prop
    
    要定义或修改的属性的名称或Symbol

+ descriptor

    要定义或修改的属性描述符

#### 描述
该方法允许精确地添加或修改对象的属性。通过赋值操作添加的普通属性是可枚举的，在枚举对象属性时会被枚举到（for...in 或 Object.keys 方法），可以改变这些属性的值，也可以删除这些属性。这个方法允许修改默认的额外选项（或配置）。默认情况下，使用 Object.defineProperty() 添加的属性值是不可修改（immutable）的。

对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。数据描述符是一个具有值的属性，该值可以是可写的，也可以是不可写的。存取描述符是由 getter 函数和 setter 函数所描述的属性。一个描述符只能是这两者其中之一；不能同时是两者。

这两种描述符都是对象。它们共享以下可选键值（默认值是指在使用 Object.defineProperty() 定义属性时的默认值）：

1. configurable

    当且仅当该属性的configurable键值为true时,该属性的描述符才能被改变，同时该属性也能从对应的对象上被删除

    默认为false

2. enumberable

    当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。

    默认为 false。

#### 数据描述符还具有以下可选键值：

1. value

    该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。

    默认为 undefined。

2. writable

    当且仅当该属性的 writable 键值为 true 时，属性的值，也就是上面的 value，才能被赋值运算符改变。

    默认为 false。

#### 存取描述符还具有以下可选键值：

1. get

    属性的 getter 函数，如果没有 getter，则为 undefined。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的this并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。

    默认为 undefined。

2. set
    属性的 setter 函数，如果没有 setter，则为 undefined。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。

    默认为 undefined。

### 示例

1. 数据属性
```js
var person = {}
Object.defineProperty(person,'name',{
    configurable:false,// 能否使用delete、能否需改属性特性、或能否修改访问器属性、，false为不可重新定义，默认值为false
    enumerable:false,// 对象属性是否可通过for-in循环，flase为不可循环，默认值为false
    writable:false,// 对象属性是否可修改,flase为不可修改，默认值为false
    value:'xiaoming' //对象属性的默认值，默认值为undefined
});

//value
console.log(person);//xiaoming，默认value

//writable
person.name="qiang";
console.log(person);//xiaoming，不可修改value

//enumerable
for(var i in person){
    console.log(person[i]) //无结果，不可循环
}

//configurable
delete person.name
console.log(person.name)//xiaoming，不可删除

Object.defineProperty(person,'name',{
    configurable:true //不可修改，将抛出错误
});

```

2. 访问器属性

```js
var book = {
    _year: 2004,//属性前面加_，代表属性只能通过对象方法访问
    edition: 0
}
Object.defineProperty(book,'year',{
    get: function(){
        return this._year;
    },
    set: function(newValue){
        if(newValue > 2004){
            this._year = newValue;
            this.edition += newValue - 2004
        }
    }
});
console.log(book.year)//2004
book.year = 2006;
console.log(book.year)//2006
console.log(book.edition)//2
```