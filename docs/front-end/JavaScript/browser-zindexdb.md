---
autoGroup-7: 浏览器
title: indexexdb---dexie.js 中文教程
---
[原文](https://blog.csdn.net/hjb2722404/article/details/118670300)

## 它是什么？
dexie.js是一个对浏览器indexesDB的包装库,使得我们可以更方便的操作indexedDB

## 为什么用它
由于原生indexedDB具有以下缺点
- <span style="color: red">原生所有操作都是在回调中进行的</span>
- <span style="color: red">原生所有操作都需要不断的创建事务,判断表和索引的存在性</span>
- <span style="color: red">原生为表简历索引很繁琐</span>
- <span style="color: red">原生查询支持的较为简单，复杂的查询需要自己去实现</span>
- <span style="color: red">原生不支持批量操作</span>
- <span style="color: red">原生的错误需要在每个失败回调中接收处理</span>

基于此，出现了很多对原生接口的包装，而相比于其他包装库，dexie.js具有以下明显的优点
- <span style="color: blue">几乎所有接口都返回promise,即符合indexedDB异步操作的特性，对开发者又直观又好，可以使用promise链，错误可以在catch中统一处理，且有丰富的错误类型返回</span>
- <span style="color: blue">即支持与原生一致的接口，比如open、get、put、add、delete、transcation等等，又支持扩展的非常丰富的更加便捷的接口，如db.storeName.get</span>
- <span style="color: blue">类似于后端数据库的高级查询，并且支持链式调用，如官方示例</span>

    ```js
    db.friends.where('shoeSize')
        .between(37, 40)
        .or('name')
        .anyOf(['Arnold', 'Ingemar'])
        .and(function(friend) { return friend.isCloseFriend; })
        .limit(10)
        .each(function(friend) {
            console.log(JSON.stringify(friend)
        })
    ```
- <span style="color: blue">更丰富的索引定义，建立索引变得非常简单，并且支持多值索引和复合索引</span>

    ```js
    db.version(1).stores({
        users: "++id, name, &username, *email, address.city",
        relations: "++, userId1, userId2, [userId1+userId2], relation"
    })
    ```
- <span style="color: blue">接近原生的性能</span>
- <span style="color: blue">丰富完善的文档，目前只有英文文档，但也是所有indexedDB包装库中文档最为完善的了</span>

## 怎么用
在使用此库之前，最好能够系统的了解和简单使用原生indexedDB，可参阅[indexedDB基础教程](https://www.tangshuang.net/3735.html#title-1)或我写的 [indexedDB介绍](https://blog.csdn.net/hjb2722404/article/details/118789332)