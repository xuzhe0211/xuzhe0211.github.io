---
autoGroup-2: react-hooks
title: 一文搞定常用的自定义 React Hooks
---
## 前言
通过上一篇[《疑问归纳React Hooks》](/source-react/react-ahooks1.html),我们根据使用场景分别进行举例说明，帮助理解并可以熟练运用React Hooks大部分特性了。本文则对hooks进一步加深，让我们通过自定义一些hooks，解决我们平时项目中非常有用的需求场景，做到代码高复用低耦合，从而加深对hooks的理解和运用

## 实现自定义的useMount
首先我们自定义一个useMount hook,其功能为在Dom渲染之后执行相关函数，即类似于class组件的componentDidMount生命周期钩子的功能。我们基于以下原理实现:<span style="color: blue">如果想执行只运行一次的effect(仅在组件挂载和卸载时执行)，可以传递一个空数组([])作为第二个参数。</span>这就告诉React的effect不依赖与props或state中的任何值，所以它永远不需要重复执行。如果在函数组件中实现该功能，即代码如下：
```js
useEffect(() => {
    console.log('mount')
}, [])
```
现在我们将这个功能进行抽取，封装成为useMount hook, 则可以如下实现，其中该钩子支持传入一个会回调执行函数fn作为参数
```js
import { useEffect } from 'react';

const useMount = (fn: () => void) => {
    useEffect(() => {
        fn();
    }, [])
}
export default useMount;
```
现在我们就可以在相关业务场景中使用useMount hook了；如下所示，<span style="color: blue">**只会在MyPage初次渲染时执行一次fun，即使我们多次点击button，使count不断增加，页面不断更新，也不会在执行fun**</span>
```js
import React, { useCallback, useState } from 'react';
import useMount from './useMount';

const MyPage = () => {
    const [count, setCount] = useState(0);
    const fun = useCallback(() => {
        console.log('mount');
    }, [])
    useMount(fun);

    return (
        <div>
            <button type="button" onClick={() => {setCount(count + 1)}}>
                增加{count}
            </button>
        </div>
    )
}
export default MyPage
```
[useEffect vs useLayoutEffect](/source-react/react-useEffect.html)

## 实现自定义的useUnmount
本节我们自定义一个useUnmount hook，其功能为在DOM卸载之前执行相关函数，即类似于class组件写法中的componentWillUnmount生命周期钩子的功能；我们基于以下元老级实现：如果effect有返回一个函数，React将会在执行清楚操作时调用它。如果在函数组件中实现该函数，即代码如下所示
```js
useEffect(() => () => {
    console.log('unmount')
})
```
现在我们将这个功能进行抽取，封装成useUnmount book，则可以如下实现，其中该钩子支持传入一个回调执行函数fn作为参数
```js
import { useEffect } from 'react';

const useUnmount = (fn: () => void) => {
    useEffect(() => () => {
        fn();
    }, [])
}
export default useUnmout;
```
现在我们就可以在相关业务场景中使用useUnmount hook了，如下如实，只会在MyComponent卸载时执行一次fun
```js
import React, { useCallback, useState } from 'react';

const MyComponent = () > {
    const fun = useCallback(() => {
        console.log('unmount')
    }, [])

    useUmount(fun);

    return (<div>Hello Word</div>)
}
const MyPage = () => {
    const [state, setState] = useState(true);

    return (
        <div>
        { state && <MyCompoent>}
        <button type="button" onClick={() => { setState(!state); }}>
            切换
        </button>
        </div>
    )
}
export default MyPage;
```
## 实现自定义的useUpdate
<span style="color: red">我们都知道如果想让function组件重新渲染，我们不得不更新state，但是有时候业务需要的state是没必要更新的，我们不能仅仅为了一个组件会重新渲染而强制让一个state做无意义的更新，所以这个时候我们就可以自定义一个更新的hook来优雅的实现组件的强制更新，类似于class组件的forceUpdate的功能</span>，实现代码

```js
import { useCallback, useState } from 'react';

const useUpdate = () => {
    const [, setState] = useState({});
    return useCallback(() => setState({}), [])
}
export default useUpdate;
```
useUpdate的使用实例如下所示，点击按钮，调用update,就会看到Time的值在变化，说明组件已经强制更新了
```js
import React from 'react';
import useUpdate from './useUpdate';

const MyPage = () => {
    const update = useUpdate();

    return (
        <div>
            <button type="button" onClick={update}>
                Time: {Date.now()}
            </button>
        </div>
    )
}
export default MyPage;
```
## 实现自定义的usePrevious
平时在实现需求时，经常需要保存上一次渲染时state的值，so这个hook就是用来保存上一次渲染状态的。如下所示为实现逻辑，主要用到userRef.current来存放变量
```js
import { useRef } from 'react'

function usePrevious<T> (state: T): T|undefined {
    const prevRef = useRef<T>();
    const curRef = useRef<T>();

    prevRef.current = curRef.current;
    curRef.current = state;

    return prevRef.current;
}
```
usePrevious的使用实例如下所示，当点击按钮使count增加时，previous会保留count的上一个值
```js
import React, { useState } from 'react';
import usePrevious from './usePrevious';

const MyPage = () => {
    const [count, setCount] = useState(0);
    const previous = usePrevious(count);

    return (
        <div >
            <div>新值:{count}</div>
            <div>旧值:{previous}</div>
            <button type="button" onClick={() => { setCount(count + 1); }}>
                增加
            </button>
        </div>
    )
}
export default MyPage;
```
## 实现自定义的useTimeout
在hook中，我们使用setTimeout之后，需要在dom卸载时，手动进行clearTimeout将定时器移除，否则可能会造成内存泄露。假设我们在项目中多次用到，那我们需要多次重复写移除代码，并且有时候可能由于疏忽，将其遗忘。so,为什么不能将它封装成hook，在需要的时候调用即可
```js
import { useEffect } from 'react';

function useTimeout(fn:  () => void, delay: number) {
    useEffect(() => {
        const timer = setTimeout(() => {
            fn();
        }, delay);
        return () => {
            clearTimeout(timer); // 移除定时器
        }
    }, [delay])
}
export default useTimeout;
```
如下所示，我们只需要告诉我userTimeout多少毫秒去调用那个方法，不需要在去考虑移除定时器的事情了
```js
import React, { useState } from 'react';
import useTimeout from './useTimeout';

const MyPage = () => {
    const [count, setCount] = useState(0);

    useTimeout(() => {
        setCount(count => count + 1)
    }, 3000)
    return (
        <div>
            <button type="button">
                增加{count}
            </button>
        </div>
    )
}
export default MyPage
```
## 实现自定义的useInterval
useInterval封装setInterval功能，其原因和用法和useTimeout一样这里不在赘述
```js
import { useEffect } from 'react';

function useInterval(fn: () => void, delay: number) {
    useEffect(() => {
        const timer = setInterval(() => {
            fn();
        }, delay);
        return () => {
            clearInterval(timer); // 移除定时器
        }
    }, [delay])
}
export default useInterval;
```
## 实现自定义的useDebounce
防抖在我们日常开发中是非常常见的，比如：按钮点击、文本编辑保存等，为防止过于频繁操作，需要进行防抖处理。**防抖的定义:任务频繁触发的情况下，只有任务触发的时间超过指定间隔的时间，才执行一次。** 类比于生活中的场景就例如坐公交，在一定时间内，如果有乘客陆续刷卡上车，司机就不会开车，当乘客没有刷卡了，司机才开车。 防抖功能的基本实现和相关注释如下所示
```js
// const debounce = (fn, delay) => {
//     let timer = null;
//     return function() {
//         clearTimeout(timer);
//         timer = setTimeout(fn, delay);
//     }
// }
function debounce(fn, wait) {
    let timeout1;
    return function() {
        clearTimeout(timeout1); // 重新清零
        let context = this; // 保存上下文
        let args = arguments; // 获取传入的参数
        timeout1 = setTimeout(() => {
            fn.apply(context, args);
        }, wait)
    }
}
```
我们将以上的实现用hooks自定义的方式来写，useDebounce hook相关代码如下，其中传入的两个参数：fn(要执行的回调方法)和delay(防抖时间)，然后该hook返回一个执行方法
```js
import { useCallback, useRef } from 'react';

const useDebounce = (fn: Function, delay = 1000) => {
    const time1 = useRef<any>();

    return useCallback((...args) => {
        if(time1.current) {
            clearTimeout(time1.current);
        }
        time1.current = setTimeout(() => {
            fn(...args);
        }, delay)
    }, [delay])
}
export default useDebounce;
```
现在我们就可以在相关业务场景中使用useDebounce hook了，如下所示，我们不断点击button，count也不会增加，只会点击间隔超过3000ms，count才会增加
```js
import React, { useCallback, useState } from 'react';
import useDebounce from './useDebounce';

const MyPage = () => {
    const [count, setCount] = useState(0);
    const fun = useCallback(() => {
        setCount(count => count + 1)
    }, [])
    const run = useDebounce(fun, 3000);

    return (
        <div>
            <button type="button" onClick={() => { run(); }}>
                增加{count}
            </button>
        </div>
    )
}
export default MyPage;
```
## 实现自定义的useThrottle
节流在我们日常开发中是非常常见的，比如：滚动条监听、图片放大镜效果功能等，我们不必每次鼠标滚动都触发，这样可以降低计算的频率，而不必去浪费资源。**节流的定义：函数节流是指一定时间内js防止只跑一次**。类比于生活中的场景就例如人眨眼睛，就是一定时间内眨一次。 节流功能的基本实现和相关注释如下所示，跟防抖很类似
```js
function throttle(fn, wait){
  let timeout;
  return function(){
      if(timeout) return; // 如果已经触发，则不再触发
      let args = arguments;
      let context = this;
      timeout = setTimeout(()=>{
        fn.apply(context,args); // 执行
        timeout = null; // 执行后，将标志设置为未触发
      },wait)
  }
}
```
我们将以上的实现用hooks自定义的方式来写，useThrottle hook相关代码如下，其中传入的两个参数为:fn(要执行的回调方法)和delay（节流时间）,然后改hook返回一个执行方法
```js
import { useCallback, useRef } from 'react';

const useThrottle = (fn: Function, delay = 100) => {
    const time1 = useRef<any>();

    return useCallback((...args) => {
        if(time1.current) return;
        time1.current = setTimeout(() => {
            fn(...args);
            time1.current = null;
        }, delay)
    }, [delay]);
}
export default useThrottle;
```
现在我们就可以在相关业务场景中使用这个 useThrottle hook 了，如下所示，我们不断点击 button，count 只会在连续间隔 3000ms 增加一次，不会每次点击都会增加一次。
```js
import React, { useCallback, useState } from 'react';
import useThrottle from './useThrottle';

const MyPage = () => {
  const [count, setCount] = useState(0);
  const fun = useCallback(() => {
    setCount(count => count + 1);
  }, []);

  const run = useThrottle(fun, 3000);

  return (
    <div >
      <button type="button" onClick={() => { run(); }}>
        增加 {count}
      </button>
    </div>
  );
};

export default MyPage;
```
## 资料
[一文搞定常用的自定义 React Hooks](https://tehub.com/a/8zSRzzu73c)