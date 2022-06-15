---
autoGroup-2: react-hooks
title: React的性能优化(useMemo和useCallback)的使用
---
## 业务场景
::: danger
React是一个用于构建用户界面的javascript的库，主要负责将数据转换为视图，保证数据和视图的统一，react在每次数据更新的时候都会重新render来保证数据和视图的统一，但是当父组件**内部数据**的变化，在父组件下挂载的所有子组件也会重新渲染，因为react默认会全部渲染所有的组件，包括子组件的子组件，这就造成不必要的浪费
:::
1. 使用类定义一个父组件

    ```js
    export default class Parent extends React.Component {
        state = {
            count: 0,
        }
        render() {
            return (
                <div>
                    我是父组件
                    <button onClick={() => this.setState({count: this.state.count++})}>点击按钮</button>
                    <Child/>
                </div>
            )
        }
    }
    ```
2. 定义一个子组件

    ```js
    class Child extends React.Component {
        render() {
            console.log('我是子组件');
            return (
                <div>
                    我是子组件
                    <Grandson />
                </div>
            )
        }
    }
    ```
3. 定义一个孙子组件
    
    ```js
    class Grandson extends React.Component {
        render() {
            console.log('孙子组件');
            return (<div>孙子组件</div>)
        }
    }
    ```
4. 上面几个组件是比较标准的react的类组件，函数组件也是类似的，当你在父组件中点击按钮，其实你仅仅想改变父组件内的count的值，但是你会发现每次点击的时候子组件和孙组件也会重新渲染，因为react并不知道是不是要渲染子组件，需要我们子去判断

## 一、类组件中使用**shouldComponentUpdate生命周期钩子函数**
1. 在子组件中使用**shouldComponentUpdate**来判断是否要更新

    > 其实就是根据this.porps和函数中参数中的nextProps中的参数来对比，如果返回false就不更新，如果返回true就表示更新当前组件
    ```js
    class Child extends React.Component {
        shouldComponentUpdate(nextProps, nextState) {
            console.log(nextProps, this.props)
            if(nextProps.count === this.props.count) {
                return false;
            } else {
                return true;
            }
        }
    }
    ```
    **注意点:这里的count是要父组件给当前组件传递的参数(就是你要监听变化的来更新当前组件)，如果你写一个nextProps.name === this.props.name其实，父组件并没有给当前组件爱你传递name那么下面都是返回false组件不更新**
2. 当子组件没更新，那么孙组件同样的不更新数据

## 二、使用PureComponent语法糖
::: danger
其实PureComponent就是一个语法糖，只是官方在底层帮你实现了 shouldComponentUpdate 方法而已，使用的时候只需要子类继承这个类就可以
:::
1. 子组件中继承

    ```js
    class Child extends React.PureComponent {
        render() {
            console.log('我是子组件');
            return (
                <div>
                    我是子组件
                    <Grandson />
                </div>
            )
        }
    }
    ```
2. 在父组件中使用

    ```js
    // 下面这种情况不会重新渲染子组件
    <child/>
    // 下面这种情况会重新渲染子组件
    <child count={this.state.count}/>
    ```
## 三、memo的使用
::: danger
当你子组件是类组件的时候可以使用**shouldComponentUpdate**钩子函数或类组件继承PureComponent来实现不渲染子组件，但是对于函数组件来说是不能用这两个方法的，因此react官方给函数组件提供了memo来对函数组件包装下，实现不必要的渲染
:::
1. 组件定义(这里也可以使用类组件)

    ```js
    function Child() {
        console.log('我是子组件');
        return (
            <div>
                子组件
            </div>
        )
    }
    function Parent() {
        const [count, setCount] = useState(0);
        return (
            <div>
                我是父组件-{count}
                <button onClick={() => setCount(count + 1)}>点击按钮</button>
                <Child />
            </div>
        )
    }
    ```
2. 这里我们父组件内部改变count并没有传递给子组件，但是子组件一样的重新渲染了，这并不是我们希望看到的，因此需要对子组件包装下

    ```js
    function Child() {
        console.log('我是子组件');
        return (
            <div>
                子组件
            </div>
        )
    }
    
    const ChildMemo = React.memo(Child);
    function Parent() {
        const [count, setCount] = useState(0);
        return (
            <div>
                我是父组件-{count}
                <button onClick={() => setCount(count + 1)}>点击按钮</button>
                {/* 这种情况下不会渲染子组件 */}
                <ChildMemo/>
                {/* 这种情况下会渲染子组件 */}
                <ChildMemo count={count} />
            </div>
        )
    }
    ```
## 四、useMemo和useCallback的认识
1. useMemo和useCallback都具有缓存作用的，只是他们缓存对象不一样，一个是属性，一个是缓存函数，特点都是，当缓存依赖的没变，去获取还是获取曾经的缓存
2. useMemo是对函数组件中的属性包装，返回一个具有缓存效果的新的属性，当依赖的属性没变化的时候，这个返回新属性就会从魂村中获取之前的
3. usecallback是对函数组件中的方法缓存，返回一个被缓存的方法

## 五、useMemo的使用(我们依赖借助子组件更新的来做)
1. 根据上面的方式我们在父组件更新数据，观察子组件变化

    ```js
    const Child = (props) => {
        console.log('重新渲染子组件', props);
        return (
            <div>子组件</div>
        )
    }
    const ChildMemo = React.memo(Child);

    const Parent = () => {
        const [count, setCount] = useState(0);
        const [number, setNumber] = useState(0);
        const userInfo = {
            age: count,
            name: 'hello'
        }
        const btnHandler = () => {
            setNumber(number + 1)
        }
        return (
            <div>
                {number} - {count}
                <button onClick={btnHandler}>按钮</button>
                <ChildMemo userinfo={userInfo}>
            </div>
        )
    }
    ```
    上面发现我们仅仅是更新了number的值，传递给子组件的对象值并没有变化，但是每次子组件都重新更新了，虽然我们在子组件上用React.memo包装还是不行，这是因为在父组件中每次重新渲染，对于对象来说会是重新一个新的对象了。因此子组件重新更新
2. 使用useMemo对属性的包装

    ```js
    const userInfo = useMemo(() => {
        return {
            age: count,
            name: 'hello',
        }
    }, [count])
    ```
    使用useMemo包装后的对象，重新返回一个具有缓存效果的新对象，第二个参数表示依赖性，或者叫观察对象，当被观察的没变化，返回的就是缓存对象，如果被观察的变化了，那么就会返回新的，现在不管怎么更新number的值，子组件都不会重新更新了
3. 注意点useMemo要配合React.memo来使用，不然传递到子组件也不会生效

## 六、useCallback的使用
前面介绍了，useCallback是对一个方法的包装，返回一个具有缓存的方法，常见的使用场景是，父组件要传递一个方法给子组件


## 资料
[原文](https://blog.51cto.com/u_3409716/2904210)