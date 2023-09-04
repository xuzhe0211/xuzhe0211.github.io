---
title: 简述 js 的代码整洁之道
---
## 前言
代码质量与整洁度成正比。有的团队在赶工期的时候，不注重代码的整洁，代码写的越来越糟糕，项目越来越混乱，生产力也跟着下降，那就必须找更多人来提高生产力，开发成本越来越高。

<span style="color: red;font-weight: bold">整洁的代码是怎么样的？</span>

<span style="color: green">清晰表达意图、清除重复、简单抽象、能通过测试。换句话说：具有可读性、可重用性和可重构性</span>

## 命名
1. 名副其实: 不使用缩写、不使用让人误解的名称，不要让人推测

    ```js
    // bad: 啥？
    const yyyymmdstr = moment().format('YYYY/MM/DD');
    // bad：缩写
    const cD = moment().format('YYYY/MM/DD');

    // GOOD
    const currentDate = moment().format('YYYY/MM/DD');
    ```

    ```js
    const locations = ['Austin', 'New York', 'San Francisco'];

    // bad:推测l是locations的项
    locations.forEach(l => doSomeThing(l));

    // good
    locations.forEach(location => doSomeThing(location));
    ```
2. 使用方便搜索的名称:避免硬编码，对数据用常量const记录

    ```js
    // bad: 86400000 指的是？
    setTimeout(goToWork, 86400000);

    // good: 86400000是一天的毫秒数
    const MILLISECONDS_PER_DAY = 60 * 60 * 24 * 1000;
    setTimeout(goToWork, MILLISECONDS_PER_DAY)
    ```
3. 类名应该是名词，方法名应该是动词

    ```js
    // bad 
    function visble() {};

    // good
    function getVisble() {}
    ```
4. 多个变量属于同一类型的属性，那就把他们整合成一个对象。同时省略多语的上下文

    ```js
    // bad: 可以整合
    const carMake = 'Honda';
    const carModel = 'Accord';
    const carColor = 'Blue';

    // Bad 多余上下文
    const Car = {
        carMake: 'Honda',
        carModel: 'Accord',
        carColor: 'Blue'
    }

    // good
    const Car = {
        make: 'Honda',
        model: 'Accord',
        color: 'Blue'
    }
    ```
    其他：
    - 不要写多余的废话,比如theMessage的the可以删除
    - 统一话术。比如通知一词，不要一会叫notice,一会叫announce.
    - 用读得通顺的词语。比如getElementById就比 userIdToGetElment 好读

## 函数
- 删除重复的代码，don't repeat yourself。很多地方可以注意dry，比如偷懒复制了某段代码、try...catch或条件语句写了重复的逻辑。

    ```js
    // bad
    try {
        doSomeThing();
        clearStack();
    } catch(e) {
        handleError(e);
        clearStack();
    }
    // good
    try {
        doSomeThing();
    } catch(e) {
        handleError(e)
    } finally {
        clearStack();
    }
    ```
- 形参不超过三个,对测试函数也方便，多了就使用对象参数。
    - 同时建议使用对象解构语法，有几个好处：
        1. 能清楚看到函数签名有哪些熟悉
        2. 可以直接重新命名
        3. 解构自带克隆，防止副作用
        4. Linter检查到函数未使用的属性
    ```js
    // bad
    function createMenu(title, body, buttonText, cacellabel) {}

    // good
    function createMenu({ title, body, buttonText, cacellabel }) {}
    ```
- 函数只做一件事,代码读起来更清晰，函数就能更好的组合、测试、重构

    ```js
    // bad:处理了输入框的change事件，并创建文件的切片，并保存相关信息到localStorage
    function handleInputChange(e) {
        const file = e.target.files[0];
        // 切片
        const chunkList = [];
        let cur = 0;
        while(cur < file.size) {
            chunkList.push({
                chunk: file.slice(cur, cur + size);
            })
            cur += size;
        }
        // 保存信息到 localstorage
        localStorage.setItem('file', file.name);
        localStorage.setItem('chunkListLength', chunkList.length);
    }

    // good: 将三件事分开写，同时自顶而下读，很舒适
    function handleInputChange(e) {
        const file = e.target.files[0];
        const chunkList = createChunk(file);
        saveFileInfoInLocalStorage(file, chunkList);
    }
    function createChunk(file, size = SLICE_SIZE) {
        const chunkList = [];
        let cur = 0;
        while(cur < file.size) {
            chunkList.push({
                chunk: file.slice(cur, cur + size)
            });
            cur += size;
        }
        return chunkList;
    }
    function saveFileInfoInLocalStorage(file, chunkList) {
        localStorage.setItem("file", file.name);
        localStorage.setItem("chunkListLength", chunkList.length);
    }
    ```
- 自顶向下的书写，人们都习惯自顶向下读代码，如，为了执行A，需要执行B， 为了执行B，需要执行C。如果把A/BC混在一个函数就难度了(看前一个例子)
- 不使用布尔值作为参数，遇到这话总情况，一定要拆分函数

    ```js
    // bad
    function createFile(name, temp) {
        if(temp) {
            fs.create(`./temp/${name}`);
        } else {
            fs.create(name);
        }
    }

    // good
    function createFile(name) {
        fs.create(name);
    }

    function createTempFile(name) {
        createFile(`./temp/${name}`)
    }
    ```
- 避免副作用
    - 副作用的缺点: 出现不可预期的异常，比如用户对购物车下单后，网络差而不断重试请求，这时如果添加新商品到购物车，就会导致新增的商品也会下单到请求中
    - 集中副作用: 遇到不可避免的副作用的时，比如读取文件、上报日志，那就在一个地方集中处理副作用，不哟啊在多个函数和类处理副作用
    - 其他注意的地方
        - 常见陷阱就是对象之间共享了状态，使用了可变的数据类型，比如对象和数组。对于可变的数据类型，使用immutable等库来高效克隆
        - 避免可变的全局变量
        ```js
        // bad: 注意到cart是引用类型
        const addItemToCart = (cart, item) => {
            cart.push({item, date: Date.now()});
        }

        // good
        const addItemToCart = (cart, item) => {
            return [...cart, date: Date.now()]
        }
        ```
- 封装复杂的判断条件，提高可读性

    ```js
    // bad
    if(!(obj => obj != null && typeof obj[Symbol.iterator] === 'function')) {
        throw new Error('params is not iterable')
    }

    // good
    const isIterable = obj => obj != null && typeof obj[Symbol.iterator] === 'function';
    if(!isIterable(promises)) {
        throw new Error('params is not iterable')
    }
    ```
- 在方法中有多条件判断的时，为了提高函数的可扩展性,考虑下是不是可以使用能否使用多态性来解决

    ```js

    ```
- 其他

    如果用了TS，没必要做多余类型判断
    
## 注释
1. 一般代码要能清晰的表达意图，只有遇到复杂的逻辑才注释

    ```js
    // good: 由于函数名已经解释不清楚函数的用途了，所以注释里说明
    // 在nums数组中找出 和为目标值target的两个整数，并返回他们的数组下标
    const twoSum = function(nums, target) {
        let map = new Map();
        for(let i = 0; i < nums.length; i++) {
            const item = nums[i];
            const index = map.get(target - item);
            if(index !== undefined) {
                return [index, i];
            } 
            map.set(item, i);
        }
        return [];
    }

    // bad 加了一堆废话
    // bad：加了一堆废话
    const twoSum = function(nums, target) {
        // 声明map变量
        let map = new Map()
        // 遍历
        for (let i = 0; i < nums.length; i++) {
            const item = nums[i];
            const index = map.get(target - item)
            // 如果下标为空
            if (index !== undefined){
                return [index, i]
            }
            map.set(item, i)
        }
        return []
    };
    ```
2. 警示作用，解释次数不能修改的原因

    ```js
    // hack: 由于XXXX历史原因，只能调度一下
    setTimeout(doSomething, 0);
    ```
3. TODO注释,记录下应该做但还没做的工作。另一个好处，提前写好命名，可以帮助后来者统一命名风格

    ```js
    class Comment {
        // todo：删除成功后期实现
        delete() {}
    }
    ```
4. 没用的代码直接删除,不要注释，反正git提交历史记录可以找回 

    ```js
    // bad: 如下，重写了一遍两数之和的实现方式
    // const twoSum = function(nums, target) {
    //     for(let i = 0;i<nums.length;i++){
    //         for(let j = i+1;j<nums.length;j++){
    //             if (nums[i] + nums[j] === target) {
    //                 return [i,j]
    //             }
    //         }
    //     }
    // };
    const twoSum = function(nums, target) {
        let map = new Map()
        for (let i = 0; i < nums.length; i++) {
            const item = nums[i];
            const index = map.get(target - item)
            if (index !== undefined){
                return [index, i]
            }
            map.set(item, i)
        }
        return []
    };
    ```
5. 避免循规式注释，不要求每个函数都要求jsdoc，jsdoc一般是用在公共代码上

    ```js
    // bad or good?
    /**
    * @param {number[]} nums
    * @param {number} target
    * @return {number[]}
    */
    const twoSum = function(nums, target) {}
    ```
## 对象
- 多使用getter和setter(getXXX和setXXX)。好处
    - 在set时方便验证。
    - 可以添加埋点和错误处理
    - 可以延时加载对象的属性
    ```js
    // good
    function makeBankAccount() {
        let balance = 0;

        function getBalance() {
            return balance;
        }
        function setBalance(amount) {
            balance = amount;
        }

        return  {
            getBalance,
            setBalance
        }
    }

    const account = makeBankAccount();
    account.setBalance(100);
    ```
- 使用私有成员。对外隐藏不必要的内容

    ```js
    // bad
    const Employee = function(name) {
        this.name = name;
    }
    Employee.prototype.getName = function getName() {
        return this.name;
    }
    const employee = new Employee('John Doe');
    delete employee.name;
    console.log(employee.getName()); // undefined

    // good
    function makeEmployee(name) {
        return {
            getName() {
                return name;
            }
        }
    }
    ```
## 类
### solid
- **单一职责原则(SRP)**-保证"每次改动只有一个修改理由".因为如果一个类中有太多功能并且您修改了其中的一部分，则很难预期改动对其他功能的影响。

    ```js
    // bad: 设置操作和验证权限放在一起了
    class UserSetting {
        constructor(user) {
            this.user = user;
        }

        changeSetting(settings) {
            if(this.verifyCredentials()) {
                // ...
            }
        }
        verifyCredentials() {
            // ...
        }
    }

    // good:拆出验证权限的类
    class UserAuth {
        constructor(user) {
            this.user = user;
        }

        verifyCredentials() {
            // ...
        }
    }

    class UserSettings {
        constructor(user) {
            this.user = user;
            this.auth = new UserAuth(user);
        }
        changeSettings(settings) {
            if(this.auth.verifyCredentials()) {
                // ...
            }
        }
    }
    ```
- **开闭原则(OCP)**-对扩展放开，但是对修改关闭。在不更改现有代码的情况下添加新功能。比如一个方法因为有switch的语句，每次出现新增条件时就要修改原来的方法。这时候不如换成多态的特性

    ```js
    // bad: 注意到fetch用条件语句了，不利于扩展
    class AjaxAdapter extends Adapter {
        constructor() {
            super();
            this.name = 'ajaxAdapter';
        }
    }
    class NodeAdapter extends Adapter {
        constructor() {
            super();
            this.name = 'nodeAdapter';
        }
    }
    class HttpRequester {
        constructor(adapter) {
            this.adapter = adapter;
        }
        fetch(url) {
            if(this.adapter.name === 'ajaxAdapter') {
                return makeAjaxCall(url).then(response => {
                    // transform response and return
                })
            } else if(this.adapter.name === 'nodeAdapter') {
                return makeHttpCall(url).then(response => {
                    // transform response and return
                });
            }
        }
    }
    function makeAjaxCall(url) {
        // request and return promise
    }

    function makeHttpCall(url) {
        // request and return promise
    }

    // good
    class AjaxAdapter extends Adapter {
        constructor() {
            super();
            this.name = 'ajaxAdapter';
        }
        request(url) {
            // request and return promise
        }
    }

    class NodeAdapter extends Adapter {
        constructor() {
            super();
            this.name = 'nodeAdapter';
        }
        request(url) {
            // request and return promise
        }
    }

    class HttpRequester {
        constructor(adapter) {
            this.adapter = adapter;
        }
        fetch(url) {
            return this.adapter.request(url).then(response => {
                // transform response and return
            })
        }
    }
    ```
- **里氏替换原则(LSP)**

    两个定义
    - 如果S是T的子类，则T的对象可以替换为S的对象，而不会破坏程序
    - 所有引用其父类方法的地方,都可以透明的替换为其子类对象。
    - <span style="color: red">也就说，保证任何父类对象出现的地方，用其子类的对象来替换，不会出错。下面的例子是经典的正方形、长方形例子</span>

    ```js
    // bad: 用正方形集成长方形
    class Rectangle {
    constructor() {
        this.width = 0;
        this.height = 0;
    }

    setColor(color) {
        // ...
    }

    render(area) {
        // ...
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    getArea() {
        return this.width * this.height;
    }
    }

    class Square extends Rectangle {
    setWidth(width) {
        this.width = width;
        this.height = width;
    }

    setHeight(height) {
        this.width = height;
        this.height = height;
    }
    }

    function renderLargeRectangles(rectangles) {
    rectangles.forEach(rectangle => {
        rectangle.setWidth(4);
        rectangle.setHeight(5);
        const area = rectangle.getArea(); // BAD: 返回了25，其实应该是20
        rectangle.render(area);
    });
    }

    const rectangles = [new Rectangle(), new Rectangle(), new Square()];// 这里替换了
    renderLargeRectangles(rectangles);

    // good: 取消正方形和长方形继承关系，都继承Shape
    class Shape {
    setColor(color) {
        // ...
    }

    render(area) {
        // ...
    }
    }

    class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    getArea() {
        return this.width * this.height;
    }
    }

    class Square extends Shape {
    constructor(length) {
        super();
        this.length = length;
    }

    getArea() {
        return this.length * this.length;
    }
    }

    function renderLargeShapes(shapes) {
    shapes.forEach(shape => {
        const area = shape.getArea();
        shape.render(area);
    });
    }

    const shapes = [new Rectangle(4, 5), new Rectangle(4, 5), new Square(5)];
    renderLargeShapes(shapes);
    ```
- **接口隔离原则(ISP)**-定义是"客户不应该被迫使用对其而言无用的方法或功能"。常见的就是让一些参数变成可选的。

    ```js
    // bad
    class Dog {
        constructor(options) {
            this.options = options;
        }
        run() {
            this.options.run(); // 必须传入run方法，不然报错
        }
    }
    const dog = new Dog({}); // Uncaught TypeError: this.options.run is not a function
    dog.run();

    // good
    class Dog {
        constructor(options) {
            this.options = options;
        }

        run() {
            if (this.options.run) {
                this.options.run();
                return;
            }
            console.log('跑步');
        }
    }
    ```
- **依赖倒置原则(DIP)**--程序要依赖于抽象接口(可以理解为入参)，不要依赖于具体实现。这样可以减少耦合度

    ```js
    // bad
    class OldReporter{
        report(info) {
            //...   
        }
    }
    class Message {
        constructor(options) {
            // ...
            // Bad: 这里依赖了一个实例，那你以后要换一个，就麻烦了
            this.reporter = new OldReporter();
        }
        share() {
            this.reporter.report('start share');
            // ...
        }
    }
    //good
    clas Message {
        constructor(options) {
            // reporter 作为选项，可以随意换了
            this.reporter = this.options.reporter;
        }
        share() {
            this.reporter.report('start share');
            // ...
        }
    }
    class NewReporter {
        report(info) {
            // ....
        }
    }
    new Message({ reporter: new NewReporter})
    ```
- 其他
    - 优先使用ES2015/ES6类而不是ES5普通函数
    - 多使用方法琏
    - 多使用组合而不是继承

## 错误处理
- 不要忽略捕获的错误。而要充分对错误做出反应，比如console.error()到控制台，提交错误日志，提醒用户等操作。
- 不要漏了catch promise中reject

## 最后
### 接受第一次愚弄
让程序一开始就做到整洁,并不是一件很容易的事情。不要强迫症一样的反复更改代码，因为工期有限，没那么多时间。等到下次需求更迭，你发现到代码存在的问题时，在改也不迟

### 入乡随俗
每个公司、项目的代码风格是不一样的，会有与本文建议不同的地方。如果你接手了一个成熟的项目，建议按照此项目的风格继续写代码（不重构的话）。因为形成统一的代码风格也是一种代码整洁


- [里面有很多例子。有汉化但没更新](https://github.com/ryanmcdermott/clean-code-javascript)

- [简述 js 的代码整洁之道](https://juejin.cn/post/7224382896626778172#heading-3)
