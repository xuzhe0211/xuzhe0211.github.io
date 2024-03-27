---
title: Object.defineProperty vs proxy
---
[web前端面试 - 面试官系列](https://vue3js.cn/interview/)
## 问题
1. eventbus -> mitt
2. this.$refs.xxx -> getCurrentInstance().proxy.$refs

https://juejin.cn/post/6844904066103902215

https://www.cnblogs.com/yinyuxing/p/14510803.html


```js
import {getCurrentInstance, defineComponent} from 'vue';

export default defineComponent({
    setup() {
        const instance = getCurrentInstance();
        instance?.proxy?.$forceUpdate();
    }
})
```

```js
// 前置
let app = createApp(App)
    .use(store)
    .use(router)
    .component('svg-icon', SvgIcon)
    .use(batchUp);
app.config.globalProperties.lg = language.lg;

// 使用
import { getCurrentInstance} from 'vue';
import {useRoute, useRouter} from 'vue-router'
const route = useRoute();
const router = useRouter();

const lg = getCurrentInstance().appContext.config.globalProperties.lg;

console.log(route.path);
router.push({name: 'userDetails'});


```
## 对比

### Proxy优势
+ Proxy可以直接监听整个对象而非属性
+ Proxy可以直接监听数组变化.
+ [Proxy有13种拦截方法，如ownKeys、deleteProperty, has等是Object.defineProperty不具备的](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/apply)
+ Proxy返回的是一个新对象,我们可以只操作新的对象达到目的，而Object.defineProperty只能遍历对象属性直接修改;
+ Proxy作为新标准将受到浏览器厂商重点储蓄的性能优化，也就是传说中的新标准的性能红利

### Object.defineProperty的优势如下

+ 兼容性好，支持IE9，而Proxy存在浏览器兼容性问题，而且无法用polyfill磨平

### Object.defineProperty不足在于

+ Object.defineProperty 只能劫持对象的属性，因此我们需要对每个对象的每个属性进行遍历
+ Object.defineProperty 不能监听数组。是通过重写数据的那7个可以改变数据的方法对数组进行监听的
+ Object.defineProperty也不能对ES6新产生的Map,Set这些数组解构做出监听。
+ Object.defineProperty也不能监听新增和删除操作，通过Vue.set()和Vue.delete来实现响应式的。

[Object.defineProperty 属性描述符](/front-end/JavaScript/object-constructor-methods-property.html#object-defineproperty)
- <span style="color: red">数据描述符</span>
- <span style="color: red">存储描述符</span>
## used

object.defineprotpery用于监听对象的数据变化

用法 Object.defineproperty(obj, key, desciptor);

```js
var obj = {
    age: 11
}
var val = 1;

Object.defineProperty(obj, 'name', {
    get() {
        return val;
    },
    set(newVal) {
        val = newVal
    }
})

obj.name 

obj.name = 11;
```

此外，还有一下配置项

1. configurable
2. enumerable
3. value

缺点：

1. 无法监听数组变化
2. 只能劫持对象的属性，属性值也是对象那么需要深度遍历

--- 

proxy可以理解在被劫持的对象前加了一层拦截

```js
var proxy = new Proxy({}, {
    get(obj, prop) {
        return obj[prop]
    },
    set(obj, prop, val) {
        obj[prop] = val
    }
})
```

proxy返回的是一个新对象，可以通过操作返回的新的对象到达目的
proxy有多达13中拦截方法

get(), set(), apply(), has(), contruct(), // 用于拦截new操作

deleteProperty() , defineproperty() , enumerate() , getOwnPropertyDescriptor() ,
getPrototypeOf() , isExtensible() , ownKeys() , preventExtensions() , setPrototypeOf() , 

## demo 
修改了属性值希望能感知到
- 直接修改
- 通过方法修改
```js
const obj = {};
let value = '11'
Object.defineProperty(obj, 'name', {
    get() {
        return value;
    },
    set(val) {
        console.log('111111');
        value = val;
    }
})
obj.name = 'maomao';
connsole.log(obj.name)
```

```js
function observer(obj) {
    if (typeof obj === 'object') {
        for (let key in obj) {
            defineReactive(obj, key, obj[key])
        }
    }
}
function defineReactive(obj, key, value) {
    observer(value); // 针对value是对象，递归检测
    Object.defineProperty(obj, key,  {
        get() {
            return value;
        },
        set(val) {
            observer(val); // 针对所设置的val是对象
            console.log('数据改变了')；
            value = val;
        }
    })
}

let obj = {
    name: 'maotai',
    age: {
        age: 22
    }
}
observer(obj)

// - 改变属性测试
// obj.age.age = 23;
// obj.age = {
//     name: 1
// };
// obj.age.name = 2;
// obj.x = 111; //新增的属性不会被劫持
obj.age = [1, 2, 3, 4];
```
```js
// -使用方法测试
// obj.age.push(11);//无法触发
// let oldPush = Array.prototype.push;
// Array.prototype.push = function (value) {
//     console.log('数组中数据更新了');
//     oldPush.call(this, value)
// };
// obj.age.push(11);//可以触发


let arr = ['push', 'pop', 'shift', 'unshift'];
arr.forEach(method => {
    let oldPush = Array.prototype[method];
    Array.prototype[method] = function (value) {
        console.log('数组中数据更新了');
        oldPush.call(this, value)
    };
});
obj.age.push(11);

obj.age.length--;//但是这种通过操作长度或索引的方式无法被劫持
```

[文档](https://www.jianshu.com/p/8fe1382ba135)


