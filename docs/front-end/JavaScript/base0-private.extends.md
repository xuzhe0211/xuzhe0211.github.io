---
autoGroup-0: 基础知识
title: JavaScript实现类的private、protected、public、static以及继承
---

- <span style="color: red">extends 继承的父类</span>
- <span style="color: red">private 装载私有属性，里面定义的成员外部不可使用且不能继承给子类</span>
- <span style="color: red">protected 装载保护属性，里面的定义的成员外部不可使用但能继承给子类</span>
- <span style="color: red">public 装载公有属性</span>
- <span style="color: red">static 装载静态方法和属性</span>

## static
:::tip
类(class)通过static关键字定义静态方法。不能在类的实例上调用静态方法，而应该通过类本身调用。这些通常是实用程序方法，例如创建或克隆对象的功能
:::
- 语法

    ```js
    static methodName() {...}
    ```
- 描述

    <span style="color: red">静态方法调用直接在类上进行，不能在类的实例上调用。静态方法通常用于**创建实用程序函数**</span>

- 调用静态方法

    静态方法调用同一类中的其他静态方法，可实用this关键字
    ```js
    class StaticMethodCall {
        static staticMethod() {
            return 'Static method has been called';
        }
        // 可以使用this调用另一个静态方法
        static anotherStaticMethod() {
            return this.staticMethod() + ' from another static method';
        }
    }
    StaticMethodCall.staticMethod(); // 'Static method has been called'

    StaticMethodCall.anotherStaticMethod(); // 'Static method has been called from another static method'
    ```
- 类的构造函数和其他方法(非静态方法中)

    <span style="color: red">非静态方法中，不能直接使用this关键字来访问静态方法。而是要使用类名来调用</span>

    <span style="color: red">CLASSNAME.STATIC_METHOD_NAME() ，或者用构造函数的属性来调用该方法：</span>
    ```js
    // this.constructor.STATIC_METHOD_NAME();

    class StaticMethodCall {
        constructor() {
            console.log(StaticMethodCall.staticMethod()); // 'static method has been called.'
            console.log(this.constructor.staticMethod()); // 'static method has been called.'
        }
        static staticMethod() {
            return 'static method has been called.'
        }
    }

    console.log(StaticMethodCall.staticMethod())
    ```

## public
对象的成员都是public成员。任何对象都可以访问，修改，删除这些成员或添加新成员。主要有两种方式来在一个新对象里放置成员。

- 在构造函数里

    这种技术通常用来初始化public实例变量。构造函数的this变量用来给对象添加成员
    ```js
    function Container(param) {
        this.member = param;
    }
    ```
    这样，如果我们构造一个新对象var myContainer = new Container('abc'),则myContainer.member为'abc'

- 在prototype里

    这种技术通常用来添加public方法。当寻找一个成员并且它不在对象本身里时，则从对象的构造函数的prototype成员去找

    prototype机制用来做继承。为了添加一个方法到构造函数创建的所有对象里，只需添加到构造函数的prototype
    ```js
    Container.prototype.stamp = function(string) {
        return this.member + string;
    }
    ```

## private

<span style="color: red">private成员由构造函数产生。普通的val变量和构造函数的参数都成为private成员。</span>
```js
function Container(param) {
    this.mumber = param;
    // 私有属性
    var secret = 3;
    // 私有属性
    var that = this;
}
```
该构造函数创建了3个private实例变量：param,secert和that。<span style="color: red">它们被添加到对象中，但是不能被外部访问，也不能被该对象自己的public方法访问</span>.private方法是构造函数内部的方法

```js
function People() {
    this.name = 'Yorhom';
    var age = 16;
    // 实例中的方法
    this.getName = function() {
        return this.name;
    }
    // 实例方法 使用闭包的原理实现 私有属性的访问
    this.getAge = function() {
        return age;
    }
}
var yorhom = new People();
alert(yorhom.age); // undefined
console.log(yorhom.getAge()); // 16
```

Class Fields提案的另一个内容是「private fields(私有属性)」。有时，当您创建一个类时，您希望拥有不暴漏给外界的私有值。<span style="color: blue">从历史上来，Javascript缺乏整整私有值的能力，所以我们通过约定，用下划线标记他们</span>
```js
class Car {
    //私有属性 
    _milesDriven = 0
    drive(distance) {
        this._milesDriven += distance
    }
    getMilesDriven() {
        return this._milesDriven
    }
}
```
在上面的示例中，我们依靠 Car class（类）的实例通过调用 getMilesDriven 方法来获取汽车的里程数。但是，因为没有什么能使 _milesDriven成为私有的，所以任何实例都可以访问它。

```js
const tesla = new Car();
tesla.drive(10);
console.log(tesla._milesDriven); // undefined
```
有个奇特的(hacky)方法，就是使用WeekMaps可以解决这个问题，但如果存在更简单的解决方案，那将会很好。 同样，Class Fields 提案正在拯救我们。 根据提议，您可以使用 ＃ 创建私有字段。 是的，你没有看错， ＃ 。 我们来看看它对我们的代码有什么影响，

```js
class Car {
    #milesDriven = 0
    drive(distance) {
        this.#milesDriven += distance
    }
    getMilesDriven() {
        return this.#milesDriven
    }
}
```
我们可以用速记语法更进一步简化

```js
class Car {
    #milesDriven = 0
    drive(distance) {
        #milesDriven += distance
    }
    getMilesDriven() {
        return #milesDriven
    }
}

const tesla = new Car()
tesla.drive(10)
tesla.getMilesDriven() // 10
tesla.#milesDriven // Invalid
```
## protected
protected可以修饰数据成员，构造方法，方法成员，不能修饰类(此外指外部类，不考虑内部类)。 被protected修饰的成员，能在定义它们的类中，同包的类中被调用。如果有不同包的类想调用他们，那么这个类必须是定义他们类的子类
```js
//module foo;
class Foo{
    constructor() {
        this[Foo.PROPERTY] = 'hello';
    }
    test() {
        console.log(this[Foo.PROPERTY]);
    }
}
Foo.PROPERTY = Symbol();

export default Foo;

// module bar;
import Foo from '(module foo)';

class Bar extends Foo {
    test2() {
        console.log(this[Bar.PROPERTY]);
    }
}
export default Bar;

// module main
import Bar from '(module bar)';
new Bar.test2()
```

## 总结
关键字| 类本身 | 类的方法 | 类的实例 | 子类 | 子类方法 | 子类的实例
--- | --- | --- | --- | --- | --- | ---
static | + | - | - | + | - | - | -
public | - | + | + | - | + | +
private | - | + | - | - |- | -
protected | - | + | - | - |+ | -

## 静态属性和方法的定义
静态属性和方法以及静态类在js中的定义非常简单，先来看静态类
```js
var StaticClass = {};
```
这么写不是在定义一个Object吗？是的，不错，不过js中的静态类也是可以这样定义的。**如果要添加静态类中的方法和属性**，就可以这么写：
```js
var StaticClass = {
    id: 5, 
    sayHello: function() {
        alert('hello')
    }
}
```
**如果是要向类中添加静态属性或者方法**，可以采用这种写法：
```js
function People() {
    this.name = 'Yorhom'
}
People.prototype.getName = function() {
    return this.name;
}

People.TYPE = 'people';
People.sayHello = function() {
    console.log('Hello')
}
```

## 资料
[原文](https://segmentfault.com/a/1190000021159009)

[JavaScript实现类的private、protected、public、static以及继承](https://www.cnblogs.com/slgkaifa/p/7375295.html)