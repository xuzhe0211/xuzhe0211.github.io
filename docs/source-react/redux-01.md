---
title: Redux系列01：从一个简单例子了解action、store、reducer
---
其实，redux的核心概念就是store、action、reducer，从调用关系来看如下所示

> store.dispatch(action) -> reducer(state, action) -> final state

可以先看下面的极简例子有个感性的认识，下面会对三者的关系进行简单介绍
```js
// reducer方法，传入的参数有两个
// state: 当前的state
// action: 当前触发的行为, {type: 'xx'}
// 返回值:新的state
var reducer = function(state, action) {
    switch(action.type) {
        case 'add_todo': 
            return state.concat(action.text);
        default: 
            return state;
    }
}

// 创建store,传入两个参数
// 参数1:reducer用来修改state
// 参数2(可选): [],默认的state值，如果不传，则为undefined
var store = redux.createStore(reducer, []);

// 通过store.getState(),可以获取当前store的状态(state)
// 默认值是createStore 传入的第二个参数
console.log('state is:' + store.getState()); // state is:

// 通过store.dispatch(action)来达到修改state的目的
// 注意:在redux里，唯一能够修改state的方法，就是通过store.dispatch(action)
store.dispatch({type: 'add_todo', text: '读书'});
// 打印出修改后的state
console.log('state is:' + store.getState()); // state is:读书

store.dispatch({type: 'add_todo', text: '写作'})
console.log('state is:' + store.getState()); // state is: 读书，写作
```
## store、reducer、action关联
可以结合上面的代码来看下面几段解释
1. <span style="color: blue">"store:对flux有了解的同学应该有所了解，store在这里代表的是数据模型，内部维护了一个state变量，用例描述应用的状态。store有两个核心方法，分别是getstate、dispatch。前者用来获取store的状态(state)，后者用来修改store的状态</span>

    ```js
    // 创建store，传入两个参数
    // 参数1，reducer用来修改state
    // 参数2(可选): [],默认的state值，如果不传，则为undefined
    var store = redux.createStore(reducer, []);

    // 通过store.getState()可以获取当前store的状态(state)
    // 默认的值是createStore 传入的第二个参数
    console.log('state is:' + store.getState()); // state is:

    // 通过store.dispatch(action) 来达到修改state的目的
    // 注意：在redux里，唯一能够修改state的方法，就是通过store.dispatch(action）
    store.dispatch({type: 'add_todo', text: '读书'})
    ```
2. <span style="color: blue">action:对行为(如用户行为)的抽象,在redux里一个普通的js对象。**redux对action的约定比较弱，除了一点，action必须有一个type字段来标识这个行为的类型**。所以下面的都是合法的action</span>

    ```js
    {type:'add_todo', text:'读书'}
    {type:'add_todo', text:'写作'}
    {type:'add_todo', text:'睡觉', time:'晚上'}
    ```
3. <span style="color: blue">reducer: 一个普通的函数，用来修改store的状态。传入两个参数state、action。其中，state为当前的状态(可通过store.getState()获得),而action为当前触发的行为(通过store.dispatch(action)调用触发)。reducer(state, action)返回的值，就是store最新的state值</span>

    ```js
    // reducer方法, 传入的参数有两个
    // state: 当前的state
    // action: 当前触发的行为, {type: 'xx'}
    // 返回值: 新的state
    var reducer = function(state, action){
        switch (action.type) {
            case 'add_todo':
                return state.concat(action.text);
            default:
                return state;
        }
    };
    ```
## 关于actionAreator
看到xxCreator总能让人联想到工厂模式，没错，在redux里，actionAreator其实就是action的工厂方法，可以参考下面例子

> actionCreator(args) => action

```js
var addTodo = function(text) {
    return {
        type: 'add_todo',
        text: text
    }
}

addTodo('睡觉'); // 返回 {type: 'add_todo', text: '睡觉'}
```
在redux里，actionAreator并非是必需的。不过建议用actionAreator代替普通action对象的直接传递。除了能够减少代码量，还可以的大大提高代码的可维护性。湘湘下面的场景

再来看看文章开头的例子，应用actionAreator后的代码例子
```js
store.dispatch(addTodo('睡觉'));
console.log('state is:' + store.getState()); // state is: 读书,写作,睡觉
```

## 资料
[Redux系列01：从一个简单例子了解action、store、reducer](https://www.cnblogs.com/chyingp/p/redux-01-introduction-actou-store-reducer-action.html)