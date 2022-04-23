---
autoGroup-13: TypeScript
title: Card-TypeScript中implements与extends的区别
---

- implements

  <span style="color: blue">实现，一个新的类，从父类或者接口实现所有的属性和方法，可以同时重写属性和方法，包含一些新的功能</span>

- extends

  <span style="color: blue">继承，一个新的接口或者类，从父类或者接口继承所有的属性和方法，不可以重写属性，但可以重写方法</span>

```ts
interface Iperson {
  age: number;
  name: string; 
}

interface IPeoPle extends Iperson {
  sex: string;
}

class User implements Iperson {
  age: number;
  name: string;
}


interface IRoles extends user {

}

class Roles extends User{
  
}
```

**注意点**
- <span style="color: blue">**接口(interface)不能实现接口或类(class)**，所以实现只能用于类身上，**即类可以实现接口或类**</span>
- <span style="color: blue">接口可以继承接口或者类</span>
- <span style="color: blue">**类不可以继承接口,类只能继承类**</span>
- <span style="color: blue">可多继承或多实现</span>

```ts
类 extends 类
类 implements (类、接口)
接口 extends (类、接口)
```


## 资料
[TypeScript中implements与extends的区别](https://juejin.cn/post/6914213447169376263)