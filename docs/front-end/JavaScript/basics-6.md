---
autoGroup-5: JS名词理解
title: 声明式编程和命令式编程(React基础：声明式编程)
---
主要编程方式有
- 命令式编程(Imperative Programming)
- 声明式编程(Declarative Programming)
- 函数式编程(Funational Programming)
- 面向对象编程（Object-oriented Programming）
...

React推行的是声明式编程思想,下面来对比学习下<span style="color:blue">命令式编程与声明式编程</span>，理解其中区别，以便于掌握React

## 命令式编程
命令式编程描述代码如何工作，告诉计算机一步步的执行，先做什么后座什么

比如，去酒店点一杯酒，指挥服务员
- 从架子上去下一个玻璃杯
- 把杯子放在酒桶前
- 打开酒桶开关，直到酒杯满
- 把杯子迪给顾客

这就是按照声明方式点一杯酒，需要告知服务员如何给顾客提供一杯酒

这里有一个代码实例，编写一个函数，处理传入包含大写字符串的数组，返回包含相同字符串的数组

```javascript
toLowerCase(['FOO', 'BAR']); // ['foo', 'bar']

// 命令式函数实现
const toLowerCase = arr => {
    const res = [];
    for (let i = 0, len = arr.length; i< len; i++) {
        res.push(arr[i].toLowerCase())
    }
    return res;
}
```
首先，创建一个空数组用于保存结果，然后遍历输入数组的所有元素，将每项元素的小写值存入空数组中，然后返回结果数组；

## 声明式编程
声明式编程表明想要实现什么目的，应该做什么，但是不指定具体怎么做。

声明式点一杯酒，只要告诉我服务员：我要一杯酒就可以

声明式编程实现toLowerCase
```javascript
const toLowerCase = arr => arr.map(
    value => value.toLowerCase();
)
```
输入数组的元素传递给map函数，然后返回包含小写值的新数组

## 对比
相对比而言，声明式编程
- 更加简洁、易懂，利于大型项目代码的维护
- 无需使用变量，避免了创建和修改状态

## React中的声明式
示例：带有标记的地图
- Javascript实现
    ```javascript
    const map = new Map.map(document.getElementById('map'), {
        zoom: 4, 
        center: { lat, lng }
    })

    const marker = new Map.marker({
        position: {lat, lng},
        title: 'Hello Marker'
    })
    marker.setMap(map);
    ```
    这是在Javascript中命令式创建地图、创建标记以及在地图上添加标记的步骤
- React组件中显示地图
    ```javascript
    <Map zoom={4} center={lat, lng}>
        <Marker position={lat, lng} title={'Hello Marker'}>
    </Map>
    ```
    声明式编程方式使得React组件很容易使用，最终的代码简单易于维护


[React基础：声明式编程](https://segmentfault.com/a/1190000015924762)