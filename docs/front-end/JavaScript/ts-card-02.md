---
autoGroup-13: TypeScript
title: Card-TypeScript中implements与extends的区别
---

- Implemnets

  实现，一个新的类，从父类或者接口实现所有的属性和方法，可以同时重写属性和方法，包含一些新的功能

- extends

  集成，一个新的接口或者类，从父类或者接口继承所有的属性和方法，不可以重写属性，但可以重写方法

```
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
- 接口不能实现接口或类，所以实现只能用于类身上，即类可以实现接口或类
- 接口可以继承接口或者类
- 类不可以继承接口,类只能继承类
- 可多继承或多实现


## 资料
[TypeScript中implements与extends的区别](https://juejin.cn/post/6914213447169376263)