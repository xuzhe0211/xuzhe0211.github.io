---
autoGroup-13: ES6
title: ES6中的super
---

## super用法

super关键字，即可以当做函数使用，也可以当做对象使用。在这两种情况下，它的作用完全不同。

- 第一种情况，super作为函数调用时，代表父类的构造函数。ES6要求，子类的构造函数必须执行super函数。子类没有写constructor方法，js引擎默认，帮你执行constructor（） {super()}
- 第二种情况，super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类 

**由于spuer指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的**

## super是什么

### super类似于ES5语法中的call继承

```
class A {
	constructor(n) {
    	console.log(n); // => 100
        this.x = 100;
    }
    getX() {
    	console.log(this.x);
    }
}
class B extends A { // => extends类似实现原型继承
	constructor() {
    	super(100); // => 类似call的继承，在这里super相当于把A的constructor给执行了，并且让方法中的this是B的实例，super当中传递的实参都是在给A的constructor传递。
		this.y = 200;
    }
    getY() {
    	console.log(this.y);
    }
}
let f = new B();

```
### super用法

既然super是一个可以调用的东西，它是一个函数嘛？？

这个问题的答案很容易找到，可以把super赋值给其他变量试试，会得到一个语法错误

```
class A extends Object {
  constructor() {
    const a = super;  //=>Uncaught SyntaxError: 'super' keyword unexpected here
    a(); 
  }
};
```
因为 super 的词法定义是伴随后面那对括号的，它和 this 不同。this 的定义是 this 这个关键字会被替换成一个引用，而 super 则是 super(…) 被替换成一个调用。而且 super 除了在 constructor 里直接调用外还可以使用 super.xxx(…) 来调用父类上的某个原型方法，这同样是一种限定语法。

```
 class A {
      constructor(name,color) {
      this.name = name;
      this.color = color;
    }
    // toString 是原型对象上的属性
    toString() {
      console.log('name:' + this.name + ',color:' + this.color);

    }
  }

 class B extends A{
  constructor() {
    super('cat','white');
  }
  toString() {
    console.log(super.toString());
  }
 }

 var cat = new B()
 cat.toString();  //=>name:cat,color:white
```


[参考地址](https://www.jianshu.com/p/2a5a7352f4e5)