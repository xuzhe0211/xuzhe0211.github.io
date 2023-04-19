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

## 获取数据库实例
获取一个数据库实例 
```js
var db = new Dexie(dbname);
```
- dbname: 数据库的名称

    <span style="color: red">这里只是获得数据库实例，与传入的数据库是否已经存在没有关系，如果已经存在，就会返回已经存在的数据库的一个示例，如果不存在，就会创建一个数据库，并返回该数据库的一个示例</span>
### 定义数据库结构
```js
db.version(lastVersion).stores(
    {
        localVersions: 'matadataid, content, lastversionid, date, time',
        users: "++id, name, &username, *email, address.city",
        relations: "++rid, userId1, userId2, [userId1+userId2], relation",
        books: 'id, author, name, *categories'
    }
)
```
- lastVersion: 当前数据库最新版本,只有修改数据库结构时才更改这个值

    >由于dexie.js需要兼容IE的一个BUG，所以在实际建库的时候版本号都会乘以10，如果这里lastVersion串0.1,实际建的库的版本就是1
- 上例中lacalVersions, users, relations都是数据库要包含的objectStore的名称，而他们的值则是要定义的索引，如果某个字段不需要索引，则不要吸入这个索引列表，另外，如果某个字段存储的是图片数据(imagesData)、视频(arrayBuffer)、或者特别大的字符串，不建议加入索引列表
- 可以定义四种索引
    - <span style="color: blue">主键(自增): 索引列表的第一个总会被当做主键，如上例中的matadataid, id, rid,**如果主键前有++符号，说明这个字段是自增的**</span>
    - <span style="color: blue">唯一索引。如果某个索引的字段的值在所有记录中是唯一的，那么可以在它的前面加&号，比如上例中users仓库中的username字段</span>
    - <span style="color: blue">多值索引。如果某个字段具有多个值，那么可以在它的前面加*号将其设置为多值索引，如上例中的hooks仓库中的categories字段，用户可以根据它多个值的任何一个值来查询它，如</span>

        ```js
        db.hooks.put({
            id: 1,
            name: 'Under the Dome',
            author: 'Stephen King',
            categories: ['sci-fi', 'thriller']
        })
        ```
        这里面的categores 是个数组，有多个值，那么我们就可以将其设置为多值索引

        然后我们查询时便可以用其中一个值为查询条件去查询：
        ```js
        function getSciFiBooks() {
            return db.books.where('categories').equals('sci-fi').toArray()
        }
        ```
        > 这里变回查询到所有类型为sci-fi的书籍，即使这些数还可能同时属于其他分类
    - <span style="color: blue">复合索引.如果某个索引是基于多个键路径的，就可以将其设置为复合索引，格式为[A + B],如上栗中relations中的[userId1 + userId2]索引。</span>

        ```js
        // Store relations
        await db.relations.put({
            rid: 1,
            userId1: '1',
            userId2: '2'
        })
        // Query relations
        const fooBar = await db.relations.where({
            userId1: '1',
            userId2: '2'
        }).first()
        ```
        当你定义了复合索引后，就可以在where查询子句中传入一个复合条件对象，该示例就将查询出userId1为1,userId2为2的记录，但同时，你也可以只以其中一个字段作为索引条件进行查询
        ```js
        db.relations
            .where('userId1')
            .equals('1')
            .toArray()
        ```
- 每次页面刷新都会重新获取一遍实例，重新运行一遍数据库定义逻辑，不会有问题嘛？

    答案是，不会有问题。如果你传入的lastVersion与数据库当前版本一直，则即使重新运行一遍数据库定义逻辑，也不会覆盖你第一次运行时定义的结构(即使你修改了数据库结构)，在这种情况下，你已经存入的数据不会受任何影响。只有当lastVersion版本高于当前数据库版本时，才会去更新数据库结构(即使结构没有任何变化)，这时如果定义中的仓库被删除了，那对应的仓库会被删除，如果定义中是索引被删除了，那仓库中对应的索引也会被删除。

    > 只有执行完version().stores()方法之后在至少进行一次数据库操作(比如open()、get()、put()等)，这个才可以生效，因为versions().store()只是定义结构，并不立即生效，而是等到进行数据库操作时才会打开数据进行更新

:::tip
在具体的实践中,建议将获取数据库实例和定义表结构的代码封装在一起，然后返回一个单例，整个应用中需要这个数据库的地方都从这个方法获取这个单例，这样可以保证所有对数据库结构的改动都在一个地方进行，从而保证数据库版本的一致
:::
官方vue版本TODO应用示例如下
```js
// database.js

import Dexie from 'dexie';
export default Database extends Dexie {
    constructor() {
        super('database');

        this.version(1).stores({
            todos: '++id, done'
        })

        this.todos = this.table('todos');
    }
    async getTodos(order) {
        let todos = [];
        switch(order) {
            case forwardOrder: 
                todos = await this.todos.orderBy('id').toArray();
                break;
            case reverseOrder:
                todos = await this.todos.orderBy('id').reverse().toArray();
                break;
            case unfinishedFirstOrder:
                todos = await this.todos.orderBy('done').toArray();
                break;
            default:
                // as a default just fall back to forward order
                todos = await this.todos.orderBy('id').toArray();
        }
        return todos.map(t => {
            t.done = !!t.done;
            return t;
        })
    }
    setTodoDone(id, done) {
        return this.todos.update(id, {done: done ? 1 : 0});
    }
    addTodo(text) {
        // add a todo by passing in an object using Table.add.
        return this.todos.add({ text: text, done: 0})
    }
    deleteTodo(todoID) {
        // delete a todo by passing in the ID of that todo
        return this.todos.delete(todoID)
    }
}
export const forwardOrder = 'forward';
export const reverseOrder = 'reverse';
export const unfinishedFirstOrder = 'unfinished-first';
```

```html
<template>
  <div class="app">
    <div class="app-header">
      <h2>Vue + Dexie Todo Example</h2>
    </div>
    <AddTodo @add-todo="addTodo" />
    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
      @sort-todos="updateTodoOrder"
    />
  </div>
</template>

<script>
import AddTodo from './components/AddTodo.vue';
import TodoList from './components/TodoList.vue';

import { Database, forwardOrder } from './database.js';

export default {
  name: 'App',
  components: {
    AddTodo,
    TodoList,
  },
  data() {
    return {
      todos: [],
      order: forwardOrder,
    }
  },

  created() {
    this.db = new Database();
    this.updateTodos();
  },

  methods: {
    async addTodo(todo) {
      await this.db.addTodo(todo.text);
      this.updateTodos(false);
    },
    async toggleTodo(togglePayload) {
      await this.db.setTodoDone(togglePayload.id, togglePayload.done);
      this.updateTodos(false);
    },

    async deleteTodo(deletePayload) {
      await this.db.deleteTodo(deletePayload.id);
      this.updateTodos(false);
    },

    updateTodoOrder(sortTodosPayload) {
      this.order = sortTodosPayload.order;
      this.updateTodos(true);
    },


    async updateTodos(orderUpdated) {
      let todos = await this.db.getTodos(this.order);

      if (orderUpdated) {
        this.todos = todos;
        return
      }
      let idToIndex = {};
      for (let i = 0; i < this.todos.length; i++) {
        idToIndex[this.todos[i].id] = i;
      }
      this.todos = todos.sort((a, b) => {
        // handle new items
        if (idToIndex[a.id] == undefined) {
          return 1;
        } else if (idToIndex[b.id] == undefined) {
          return -1;
        }
        
        return idToIndex[a.id] < idToIndex[b.id] ? -1 : 1;
      })
    },
  },
}
</script>

<style>
/* ... */
</style>
```
可以看到，这个示例里，是把数据库操作的所有定义和操作逻辑都封装在了database.js的Database类中，然后在页面的created生命周期中新建了一个数据库实例，下面所有的操作都是用这个实例进行的。

这样做的好处是当数据库的结构需要修改时，只需要在database.js中去进行修改和版本号的升级就行了，禁止在应用其它地方修改数据库结构和进行数据库版本升级。

## dexie.js的一些概念
在进行增删改查操作介绍前，我们先明确一些dexie.js里面的概念

- Dexie:数据库类，返回一个数据库实例，具体实践中就是db = new Dexie()后获得的db
- Table: 表类，返回一个表实例(对应于原生的objectStore)，具体实践中对应db.tableName，如db.users,db.books等等
- Collection: 数据集合类,返回查询到的数据集合，它的构造方法是私有的，所以用户无法通过new Collection()来创建它的实例，而是只能通过where子句和Table实例的一些方法获得
- whereClause: where子句，标识索引或主键上的筛选器

### 基本增删改查(crud)操作
1. 向表中新增一条记录

    ```js
    db.tableName.add(recordObject);

    // 如
    db.users.add({
        name: 'zhang san',
        age: '23'
    })
    ```
2. 更新表中的某条记录

    ```js
    db.tableName.put(recordObject); 

    // 如
    db.users.put({
        name: 'zhang san',
        age: '25'
    })
    ```
    此时，如果该表主键是name,并且表中已经存在name为zhang san的数据，就会将这条数据的age改为25.

    如果该表中没有name为zhang san的记录，则会将传入的记录作为一条心的记录插入到表中，同add()行为一致

    <span style="color: red">所以，鉴于add()方法执行时如果已经存在主键一样的数据，就会报错，我们推荐总是使用put操作来新增和更新记录，而尽量不用add()操作</span>

3. 获取表中的记录

    ```js
    db.tableName.get(primaryKeyValue);

    // 如
    db.users.get('zhang san').then(user => {
        console.log(user.age)
    })
    ```
    如果user表的主键是name,这条查询将获得name等于zhang san的记录

    >**注意,dexiejs的所有操作都会返回promise,所以要在promise的then方法里获取查询到的记录**
4. 删除表中的记录

    ```js
    db.tableName.delete(primaryKeyValue);

    // 如
    db.users.delete('zhang san')
    ```
### 高级查询
所有的高级查询都是基于索引和主键的

在进行这部分介绍前，我们先用以下代码生产一个‘图书馆’,里面存储一些用户和图片
```js
// 生成[minNum, maxNum] 的随机数
function randomNum(minNum, maxNum) {
	// 生成【minNum, maxNum】的随机数
	switch (arguments.length) {
		case 1:
			return parseInt(Math.random() * minNum + 1, 10)
			break
		case 2:
			return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
			break
		default:
			return 0
			break
	}
}
function getRandomEmail() {
	// 生成随机的邮箱
	return ['a@1.com', 'b@2.cn'][randomNum(0, 1)]
}
function getRandomAddress() {
	// 生成随机的地址
	const province = ['p1', 'p2', 'p3'][randomNum(0, 2)]
	const city = ['c1', 'c2', 'c3'][randomNum(0, 2)]
	return {
		province,
		city,
	}
}
function getRandomBookIds() {
	// 生成随机的书籍ID
	const book1 = 'book_' + randomNum(0, 10)
	const book2 = 'book_' + randomNum(10, 15)
	const book3 = 'book_' + randomNum(15, 20)
	const bookIds = [book1, book2]
	if (randomNum(0, 20) > 10) {
		bookIds.push(book3)
	}
	return bookIds
}
function getRondomCats() {
	// 生成随机的书籍分类
	const cat1 = 'cat_' + randomNum(0, 3)
	const cat2 = 'cat_' + randomNum(3, 5)
	const cat3 = 'cat_' + randomNum(5, 8)
	const cats = [cat1, cat3]
	if (randomNum(0, 20) > 10) {
		cats.push(cat2)
	}
	return cats
}
function getRandomYear() {
	// 生成随机出版年份
	return '199' + randomNum(1, 9)
}
function getRandomMonth() {
	// 生成司机出版月份
	return '0' + randomNum(1, 9)
}
const users = []
const books = []
for (let i = 20; i > 0; i--) {
	// 生成20本图书
	if (i < 5) {
		// 生成4个用户
		const userObj = {
			username: 'user_0' + i,
			email: getRandomEmail(),
			address: getRandomAddress(),
			borrowingBookIds: getRandomBookIds(),
		}
		users.push(userObj)
	}
	const bookObj = {
		id: 'book_' + i,
		categories: getRondomCats(),
		year: getRandomYear(),
		month: getRandomMonth(),
		bookName: 'bookName' + i,
	}
	books.push(bookObj)
}
var db = new Dexie('library')
db.version(1).stores({
	users: '++id,  &username, email, address.city',
	books: 'id, *categories, [year+month]',
})
db.open().then((db) => {
	db.users.bulkPut(users) // 批量向表中插入用户
	db.books.bulkPut(books) // 批量向表中插入书籍
})
```
生成数据如下
```js
// users表
{"username":"user_04","email":"b@2.cn","address":{"province":"p3","city":"c1"},"borrowingBookIds":["book_5","book_13"],"id":1}
 {"username":"user_03","email":"b@2.cn","address":{"province":"p1","city":"c2"},"borrowingBookIds":["book_0","book_13"],"id":2}
 {"username":"user_02","email":"a@1.com","address":{"province":"p2","city":"c1"},"borrowingBookIds":["book_0","book_12"],"id":3}
 {"username":"user_01","email":"b@2.cn","address":{"province":"p1","city":"c2"},"borrowingBookIds":["book_0","book_14"],"id":4}

// books表
{"id":"book_11","categories":["cat_2","cat_6","cat_5"],"year":"1999","month":"05","bookName":"bookName11"} 
{"id":"book_10","categories":["cat_0","cat_8","cat_5"],"year":"1992","month":"03","bookName":"bookName10"} 
{"id":"book_1","categories":["cat_2","cat_7","cat_5"],"year":"1996","month":"06","bookName":"bookName1"} 
{"id":"book_12","categories":["cat_0","cat_8","cat_5"],"year":"1999","month":"09","bookName":"bookName12"}
{"id":"book_13","categories":["cat_0","cat_5"],"year":"1997","month":"02","bookName":"bookName13"}
{"id":"book_14","categories":["cat_2","cat_6"],"year":"1994","month":"04","bookName":"bookName14"}
{"id":"book_15","categories":["cat_1","cat_7"],"year":"1998","month":"06","bookName":"bookName15"}
{"id":"book_16","categories":["cat_1","cat_6"],"year":"1997","month":"08","bookName":"bookName16"}
{"id":"book_17","categories":["cat_1","cat_7","cat_3"],"year":"1991","month":"02","bookName":"bookName17"}
{"id":"book_18","categories":["cat_3","cat_8","cat_3"],"year":"1994","month":"05","bookName":"bookName18"}
{"id":"book_19","categories":["cat_2","cat_5"],"year":"1997","month":"09","bookName":"bookName19"}
{"id":"book_2","categories":["cat_2","cat_5","cat_5"],"year":"1997","month":"02","bookName":"bookName2"}
{"id":"book_20","categories":["cat_0","cat_8","cat_3"],"year":"1996","month":"02","bookName":"bookName20"}
{"id":"book_3","categories":["cat_3","cat_5","cat_4"],"year":"1998","month":"08","bookName":"bookName3"}
{"id":"book_4","categories":["cat_3","cat_5"],"year":"1996","month":"02","bookName":"bookName4"}
{"id":"book_5","categories":["cat_3","cat_6"],"year":"1997","month":"03","bookName":"bookName5"}
{"id":"book_6","categories":["cat_1","cat_8","cat_3"],"year":"1993","month":"08","bookName":"bookName6"}
{"id":"book_7","categories":["cat_1","cat_8"],"year":"1995","month":"05","bookName":"bookName7"}
{"id":"book_8","categories":["cat_1","cat_8"],"year":"1998","month":"03","bookName":"bookName8"}
{"id":"book_9","categories":["cat_2","cat_5","cat_3"],"year":"1995","month":"06","bookName":"bookName9"}
```
- 示例一:查找所有city为c1的用户

    ```js
    db.open().then(db => {
        return db.users
                .where('address.city')
                .equals('c1')
                .toArray()
    }).then(users => {
        console.log(users);
    })
    // 输出结果
    0: {username: 'user_04', email: 'b@2.cn', address: {…}, borrowingBookIds: Array(2), id: 1}
    1: {username: 'user_02', email: 'a@1.com', address: {…}, borrowingBookIds: Array(2), id: 3}
    ```
    > 注意,此处我们在then方法中接收查询到的users结果，并直接打印到控制台，所以需要使用toArray方法将查询到的集合转换为数组传递给then方法

- 示例二：查找所有类别为cat_1或cat3，并且出版年份遭遇1996年的书籍

    ```js
    db.open().then(db => {
        return db.books
            .where('categories')
            .equals('cat_1')
            .or('categories')
            .equals('cat_3')
            .and(book => {
                return parseInt(book.year) < 1996
            })
    }).then(books => {
        books.each(book => {
            console.log(JSON.stringify(book))
        })
    })
    // 输出结果
    {"id":"book_17","categories":["cat_1","cat_7","cat_3"],"year":"1991","month":"02","bookName":"bookName17"}
    dexie_04.html:33 {"id":"book_18","categories":["cat_3","cat_8","cat_3"],"year":"1994","month":"05","bookName":"bookName18"}
    dexie_04.html:33 {"id":"book_6","categories":["cat_1","cat_8","cat_3"],"year":"1993","month":"08","bookName":"bookName6"}
    dexie_04.html:33 {"id":"book_7","categories":["cat_1","cat_8"],"year":"1995","month":"05","bookName":"bookName7"}
    dexie_04.html:33 {"id":"book_9","categories":["cat_2","cat_5","cat_3"],"year":"1995","month":"06","bookName":"bookName9"}
    ```
    注意
    1. 此处查询时我们有一个条件是'并且年份早于1996年',这里的语法使用的是and条件子句，这个子句的参数只能是一个函数，该函数返回一个布尔值，以确定记录是否符合给定的条件
    2. 此处我们查询完返回promise时，没有用toArray()方法将其转换为数组，因为在下一个then()方法中，我们要使用each方法来迭代集合，所以应该直接返回集合，不用返回数组
    3. 我们注意到，我们的条件类别为cat_1或cat_3的数据，像book_17,book6都同时即属于cat_1，又属于cat_3，但是在结果中值出现了一次，说明会自动去重

    通过以上两例，我们看到，dexiejs 既可以进行基础的数据库操作和查询，又可以利用索引+where子句+集合的方法，来进行非常高级和细致的查询，并且语法都很简单。

    下面附上所有API，大家可以自行对各个API的用法进行探索和测试。

- 示例3 打印出所有书籍

    ```js
    var Book = db.books.defineClass({
        bookName: String,
        id: String,
        categories: [Cat],
        year: String,
        month: String
    })
    
    function Cat() {}

    Book.prototype.log = function() {
        console.log(JSON.stringify(this));
    }

    db.open().then(db => {
        return db.books.toCollection();
    }).then(s => {
        s.each(item => {
            item.log()
        })
    })

    // 输出结果
    {"id":"book_13","categories":["cat_0","cat_5"],"year":"1997","month":"02","bookName":"bookName13"}
    {"id":"book_15","categories":["cat_1","cat_7"],"year":"1998","month":"06","bookName":"bookName15"}
    {"id":"book_16","categories":["cat_1","cat_6"],"year":"1997","month":"08","bookName":"bookName16"}
    {"id":"book_19","categories":["cat_2","cat_5"],"year":"1997","month":"09","bookName":"bookName19"}
    {"id":"book_2","categories":["cat_2","cat_5","cat_5"],"year":"1997","month":"02","bookName":"bookName2"}
    {"id":"book_20","categories":["cat_0","cat_8","cat_3"],"year":"1996","month":"02","bookName":"bookName20"}
    {"id":"book_5","categories":["cat_3","cat_6"],"year":"1997","month":"03","bookName":"bookName5"}
    {"id":"book_8","categories":["cat_1","cat_8"],"year":"1998","month":"03","bookName":"bookName8"}
    ……
    ```
    1. 这个地方，我们使用了表实例的defineClass方法，将表与一个构造函数绑定，通过在构造函数原型上添加方法，在所有书籍对象上扩展出来了一个log方法来打印其自身
    2. db.books返回的是一个Table实例，而我们要在then方法中调用的each迭代方法是Collection集合实例上的方法，所以要使用toCollection将其转换成一个集合.（当然，Table实例自己也有each方法，这里我们只是为了演示表实例调用集合实例的方法时该如何处理）

- 示例4 where的多重写法:找出1997年2月出版的书籍

    ```js
    // 第一种写法
    db.open().then(db => {
        return db.books
                .where(['year', 'month'])
                .equals(['1997', '02'])
                .toArray();
    }).then(s => {
        console.log(s)
    })

    // 第二种写法
    db.open().then(dp => {
        return db.books
                .where({
                    year: '1997',
                    month: '02'
                }).toArray()
    }).then(s => {
        console.log(s)
    })

    // 第三种写法
    db.open().then(db => {
        return db.books
                .where('year')
                .equals('1997')
                .and(book => {
                    return book.month === '02'
                }).toArray();
    }).then(s => {
        console.log(s)
    })
    ```
## API
### 表实例的完整API
API名称|说明
---|---
add(item, [key]) | 将对象添加到对象存储(表)。返回一个promise,成功后then方法接收参数为插入对象的主键值
bulkAdd(items, keys?, options?) | 批量向表中插入记录，返回一个promise，如果options未设置或设置为{allKeys:false}，则then方法接收的是插入的所有插入对象的主键组成的数组， 如果options设置为{allkeys:true}，then方法接收的是插入的所有对象中最后一个对象的主键。
bulkDelete(keys) | 批量删除表中的记录，传入主键数组，返回一个promise，then方法接收的是undefined
bulkGet(keys) | 批量获取指定索引或主键的记录，传入主键数组，返回一个promise， then 方法接收结果数组，对于数据库中不存在的那些键， undefined 将在它们的位置返回。
bulkPut(items, keys?, options?) | 批量向表中插入(更新)记录，传参与返回同bulkAdd()方法，但是如果已经有相同主键的记录，不会报错，而是会覆盖之前的记录
clear() | 删除表中的所有记录，返回一个promise，then方法接收参数为undefined


### 集合实例的所有API

### where子句的所有API

### 数据库实例的完整API