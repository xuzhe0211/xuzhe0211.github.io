---
autoGroup-13: TypeScript
title: ts问题小总结
---
## 区别
### any和unkown的区别
- <span style="color: blue">any表示任意类型，**可以被任何类型分配(赋值)，也可以分配给任何类型**</span>
- <span style="color: blue">unkwon表示位置类型，**可以被任何类型分配(赋值)，不能分配给任何类型**</span>
首先看any
```ts
// 1. 把any类型分配给其他类型
let val:any;
let val_any: any = val;
let val_unknown = val;
let val_void: void = val;

let val_undefined: undefined = val;
let val_null: null = val;
let val_string:string = val;
let val_boolean:boolean = val;
// 报错:不能将类型“any”分配给类型“never”
// let val_never:never = val;

// 2. 把其他类型分配给any
val = '';
val = 1;
val = true;
val = null;
val = undefined;

// 报错:“unknown”仅表示类型，但在此处却作为值使用
// val = unknown;
// 报错:“never”仅表示类型，但在此处却作为值使用
// val = never;
// 报错:“any”仅表示类型，但在此处却作为值使用
// val = any;
// 报错:应为表达式
// val = void;
```
然后unknow类型
```ts
// 1.把unknown类型分配给其他类型
let val: unknown;
let val_any:any = val;
let val__unknown:unknown = val;
// 报错:不能将类型“unknown”分配给类型“string”
let val_string:string = val;
// 报错:不能将类型“unknown”分配给类型“number”
let val_number:number = val;
// 报错:不能将类型“unknown”分配给类型“boolean”
let val_boolean:boolean = val;
// 报错:不能将类型“unknown”分配给类型“null”
let val_null:null = val;
// 报错:不能将类型“unknown”分配给类型“undefined”
let val_undefined:undefined = val;

// 2.把其他类型分配给unknown类型
val = '';
val = 0;
val = true;
val = undefined;
val = null;

// 和any一样，报错
val = void;
val = any;
val = unknown;
val = never;
```
- <span style="color: red;">代码规范，any虽然可以代表任意类型，但是能不用就不要用，这是默认的代码规范问题，不要永城anyscript</span>
- <span style="color: red">与any任意类型相比，因为unknown是位置类型，所以只能进行!!,!,?,typeof,instanceof等有限操作</span>

### 数组和元组的区别
- <span style="color:blue">如果数组的类型在[]前面，那么表示该数组全都是该类型</span>
- <span style="color: blue">如果数组的类型在[]内部(严格限制类型和长度的元组),那么表示该数组的第x个元素是该类型</span>

首先，数组的类型在[]前面
```ts
// 此时表示数组内部都是数字类型
// let arr:number[] = [1,2,3]
let arr:(number | string)[] = ['s', 2, 'a'];
let arr: any[] = ['a', 2, true]
```
在看数组的类型在[]内部的用法，此时就是元组
```ts
// 报错:不能将类型"[number, number, number]"分配给类型"[number]".源具有3个元素，但目标仅允许1个
// let arr:[number] = [2,3, 4]
let arr: [number] = [2]; // 这个时候才是对的
// 表示多种类型的数组，但是严格限制长度和类型必须对照
let arr:[string, number] = ['a', 1];

// 报错:不能将类型string分配给类型number
// let arr:[string, number]= [1, 'd'];
// any元素也需要规定元素数量
let arr:[any, any, any] = ['s', 2, true ]
```
- <span style="color:bled">其实[string, boolead]这种声明形式指的是元组，也就是一个一直元素数量和类型的数组</span>

### 索引签名和工具类型Record的区别
- <span style="color: blue">其实Record工具类型的本质是索引签名，不同之处只是用法，仅仅需要继承就可以了，不需要在写一遍</span>

索引签名用法
```ts
interface inf {
    name: string;
    age: number;
    [k: string]: any;
}
let obj:inf = {
    name: 'yiye',
    age: 33,
    city: 'foshan'
}
```
Record工具类型的用法(ts内置的工具类型)
```ts
interface inf extends Record<string, any> {
    name: string;
    age: number;
}
let obj:inf = {
    name: 'yiye',
    age: 33,
    city: 'foshan'
}
```
- Record工具类型的.d.ts声明文件的源码是
```ts
type Record<K extends keyof any, T> = {
    [P in K]: T;
}
```
所以用法就是继承这个工具类型，然后泛型参数1属于属性类型，参数2是属性值的类型

### interface和type区别
- <span style="color:blue">如果在开发一个包或者要被继承，那么使用接口interface</span>
- <span style="color: blue">如果定义基础类型或者进行类型运算，那么使用类型别名type</span>

- <span style="color: red">不同点1:interface可以进行声明合并，type不可以</span>

    ```ts
    // 1.interface同名接口会自动进行声明合并
    interface union{
        name:string;
    }
    interface union{
        age:number;
    }
    let u = {} as union;
    // undefined
    console.log(u.name);
    // undefined
    console.log(u.age);
    // 但是使用其他属性，不会undefined，会报错:类型“union”上不存在属性“list”
    console.log(u.list);

    // 2.type类型别名不可以进行声明合并
    // 报错:标识符“type_a”重复
    // type type_a = number;
    // type type_a = string;
    ```
- <span style="color: red">不同点2:type可以进行赋值运算，interface不可以，必须先继承</span>

    ```ts
    // 1.type可以进行类型运算(只能把type赋值给type,不能把type赋值给其他类型变量)
    type type_a = number;
    type type_sum = type_a | string;

    // 2. interface不可以，必须要通过继承
    interface inf_a{
        name:string;
    }
    // “inf_a”仅表示类型，但在此处却作为值使用
    // interface inf_a = inf_a;
    // 正确做法是
    interface inf_b extends inf_a{
        age:number;
    }
    let inf  = {} as inf_b;
    // undefined undefined
    console.log(inf.age,inf.name);
    ```
- <span style="color: red">不同点3: interface只可以用于对象和函数；type则可以用于对象，函数，基础类型，数组，元组</span>

    ```ts
    // 1. 接口
    // 对象
    interface obj {
        name: string
    }
    // 函数
    interface func {
        (x: string): number;
    }

    // 2. 类型别名type
    // 对象
    type type_obj = {name: string};
    // 函数
    type type_func = (x: string) => string;
    // 基础类型
    type type_boolean = true;
    type type_null = null;
    // 联合类型
    type type_union = string | number;
    // 数组
    type type_arr = number[];
    // 元组
    type type_tuple = [number, string]
    ```
### enum 和const emum
- <span style="color: blue">enum可以进行反向查找，所以遍历得到的长度是预计长度的两倍</span>
- <span style="color: blue">const enum不可以进行反向查找，所以得到的是预计长度</span>
```ts
// 1. enum
enum REVERSE {
    OK, 
    NO
}
//0
console.log(REVERSE.OK)
// OK
console.log(REVERSE[0]);
// NO
console.log(REVERSE[1]);

// undefined，虽然是undefined,但是不会报错!
console.log(REVERSE[10]);
// 遍历，得到枚举的值和反向查找的值
// of不可以，警告需要[Symbol.interator]方法
for(let item in REVERSE) {
    // 0 1 OK NO
    console.log(item)
}

// 2. const enum
const enum ONE {
    OK,
    NO
}
console.log(ONE.OK);
// 报错:只有使用字符串文本才能访问常数枚举成员。
// console.log(ONE[0]);

// 遍历
// 报错:"const" 枚举仅可在属性、索引访问表达式、导入声明的右侧、导出分配或类型查询中使用。
/* for(let item in ONE){

} */
```

## 应用
### 类型键入
```js
type User = {
    outer: string;
    // 内部使用一个数组
    innerList: {
        innerName: string
    }[]
}
// [property] outer:string
type userOut = User['outer']
```

## 资料 
[原文](https://blog.csdn.net/aleave/article/details/108458606)