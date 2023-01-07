---
autoGroup-13: WebAPI
title: MutationObserver--变动观察器
---
:::tip
许多企业内部页面都会添加员工的水印，目的是为了防止员工截图泄露信息。我曾以为水印只是简单的一层蒙版，稍懂技术的同学都可以把蒙版节点删除即可实现无水印，但是实际操作后发现怎么都删不掉。逐开始研究其原理，于是引出今天的主角--MutationObserver
:::
## 概念
MutationObserver接口提供了监视对DOM树所做更改的能力。它被设计为旧的Mutation Events功能的替代品，该功能是DOM3 Events规范的一部分

<span style="color: red">Mutation Observer API用来监视DOM变动。DOM的任何变动，比如节点的
增删、属性的变动、文本内容的变动，这个API都可以得到通知</span>

概念上，它接近事件，可以理解为DOM发生变动就会触发Matation Observer事件。但是它与事件有一个本质的不同：<span style="color: red;font-weight:bold">事件是同步触发，也就是说，DOM的变动立即会触发相应的事件；Mutation Observer则是异步触发，DOM的变动并不会马上触发，而是要等到当前所有DOM操作都结束后才触发</span>

## 构造函数
使用时，首先使用MutationObserver构造函数，新建一个观察器实例，同时指定这个实例的回调函数
```js
const observer = new MutationObserver(callback)
```
上面代码中的回调函数,会在每次DOM变动后调用。该回调函数接受两个参数，第一个是变动数组，第二个是观察器实例，下面是一个例子
```js
const observer = new MutationObserver((mutations, observer) => {
    mutations.forEach(mutation => {
        console.log(mutataion)
    })
})
```
## 方法
### observe()
observer方法用来启动监听，它接受两个参数
- **第一个参数:所要观察的DOM节点**
- **第二个参数:一个配置对象，指定要观察的特定变动**
```js
const article = document.querySelector('article');

const options = {
    'childList': true,
    'attributes': true
}
observer.observe(article, options)
```
上面代码中,observe方法接受两个参数，第一个是所要观察的DOM元素是article，第二个是所要观察的变动类型(子节点变动和属性变动)

观察器所观察的DOM变动类型(即上面代码的options对象)，有一下几种
:::danger
- childList：布尔值，表示子节点的变动(指新增，删除或更改)
- attributes: 布尔值，表示属性的变动
- characterData: 布尔值，表示节点内容或节点文本的变动
- subtree: 布尔值，表示是否将该观察器应用于该节点的所有后代节点。
- attributeOldValue：布尔值，表示观察attributes变动时，是否需要记录变动前的属性值。
- characterDataOldValue：布尔值，表示观察characterData变动时，是否需要记录变动前的值。
- attributeFilter：数组，表示需要观察的特定属性（比如['class','src']）。
:::

> tips：想要观察哪一种变动类型，就在option对象中指定它的值为true。需要注意的是，必须同时指定childList、、attributes 和 characterData 中的一种或多种，若均未指定将报错。

```js
// 观察新增的子节点
let insertedNodes = [];
const observer = new MutationObserver(mumations => {
    mutations.forEach(mutation => {
        for(let i = 0; i < mumation.addedNodes.length; i++) {
            insertedNodes.push(mumutation.addedNodes[i]);
        }
    })
})
observer.observe(document, { childList: true });
console.log(insertedNodes)
```
### takeRecords()
takeRecords方法用来清除变动记录，即不在处理未处理的变动。该方法返回变动记录的数组
```js
observer.takeRecords();
```
### disconnect()
disconnect方法用来停止观察.调用该方法后，DOM在发生变动，也不会触发观察器
```js
observer.disconnect();
```
## MutationRecord对象
DOM每次发生变化，就会生成一条变动记录(MutationRecord实例).该实例包含了与变动相关的所有信息。Mutation Observer处理的就是一个个MutationRecord实例所组成的数组

MutationRecord对象包含了DOM的相关信息，有如下属性
- type：观察的变动类型（attribute、characterData或者childList）。
- target：发生变动的DOM节点。
- addedNodes：新增的DOM节点。
- removedNodes：删除的DOM节点。
- previousSibling：前一个同级节点，如果没有则返回null。
- nextSibling：下一个同级节点，如果没有则返回null。
- attributeName：发生变动的属性。如果设置了attributeFilter，则只返回预先指定的属性。
- oldValue：变动前的值。这个属性只对attribute和characterData变动有效，如果发生childList变动，则返回null。

## 应用实例
### 子元素的变动
下面的例子说明如何读取变动记录
```js
let callback = function(records) {
    records.map(record => {
        console.log('Mutation type: ' + record.type);
        console.log('Mutation target:' + record.target);
    })
}
const mo = new MutationObserver(callback);

const option = {
    'childList': true,
    'subtree': true
}
mo.observe(document.body, option)
```
上面代码的观察器，观察&lt;body&gt;的所有下级节点(childList表示观察子节点，subtree表示观察后代节点)的变动。回调函数会在控制台显示所有的类型和目标节点

### 属性的变动
下面的例子说明如何追踪属性的变动
```js
const callback = function(records) {
    records.map(record => {
        console.log('Previous attribute value: ' + record.oldValue);
    })
}
const mo = new MutationObserver(callback);
const element = document.getElementById('#my_element');
const options = {
    'attributes': true,
    'attributeOldValue': true
}
mo.observe(element, options)
```
上面代码先设定追踪属性变动（'attributes': true），然后设定记录变动前的值。实际发生变动时，会将变动前的值显示在控制台。

### 实现水印的不可删除
在实现水印不可删除的过程中，主要需要应对的逻辑有两个
:::tip
- 监听对水印节点的修改
- 监听对水印节点的删除
:::
- 监听对水印节点的修改

    ```js
    drawCanvas() {
        // ...代码省略
    }
    canvasObserver() {
        this.drawCanvas();
        let canvasObserver = new MutationObserver(mo => {
            this.drawCanvas();
        })
        let config = { attributes: true, childList: true, characterData: true }
        canvasObserver.observe(document.querySelector('#divContainer'), config)
    }
    ```
- 监听对水印节点的删除

    ```js
    drawCanvas () {
        //... ... // 代码省略
    }

    canvasObserver() {
        this.drawCanvas();
        let canvasObserver = new MutationObserver((mo) => {
            let { removedNodes } = mo[0];
            if (removedNodes.find(target)) {
                ... ... // 寻找目标节点的伪代码
                this.drawCnvas();
            }
        });
        let config = { attributes: true, childList: true, characterData: true };
        let target = document.querySelector('#divContainer');

        canvasObserver.observe(target.parentNode, config);
    }
    ```



## 资料
[MutationObserver详细介绍](https://juejin.cn/post/6949832945683136542)

[Web API 接口参考](https://developer.mozilla.org/zh-CN/docs/Web/API)

[前端性能指标-FCP](/front-end/Log/performance-word.html#指标)