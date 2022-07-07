---
autoGroup-2: react-hooks
title: React Hooks vs Vue Composition Api
---

- Vue Componstion Api: 闭包变量、响应式的依赖追踪
- React Hooks：纯函数、无副作用

## 场景
先理解上面是hooks，react对他的定义是：

**它可以让你在不编写class的情况下，让你在函数组件里"钩入"React state及生命周期等特性的函数**

Vue提出的新的书写Vue组件的API: Composition API RFC,即组合式API，作用也类似。组合式API收到React Hoos的启发，但有一些有趣的差异，规避了一些react的问题

## Hook的时代意义

框架是服务于业务的，业务开发中的一个核心问题就是--**逻辑的组合与复用**。同样的功能、同样的组件，在不同的场景下，我们有时不得不去写2+次。为了避免耦合，各大框架纷纷想出了一些办法，比如mixin、render props、高阶组件等逻辑上复用模式，但是或多或少都有一些额外的问题
- Mixin与组件存在隐式依赖，可能会产生冲突。且mixin倾向于增加更多状态，降低了应用的可预测性
    - 模块中的数据来源不清晰。当一个组件中使用了多个mixin的时候，光看模块很难分清一个属性到底来自哪一个mixin
    - 命名空间冲突。由不同开发者开发的mixin无法保证不会正好用到一样的属性和方法名。HOC在注入的props也存在类似的问题
- 高阶组件(HOC)需要额外的组件实例嵌套来封装逻辑，导致无谓的性能开销。同时增加了复杂度和理解成本，对于外层是黑盒
- Render Props使用繁琐、不好维护、代码体积过大，同样容易嵌套过审

hook出现是划时代的，通过function抽离的方式，实现了复杂逻辑的内部封装
- 逻辑代码的复用
- 减小了体积
- 没有this的烦恼

## React Hooks
React Hooks允许你"钩入"诸如组件状态和副作用处理等React功能中。Hooks只能在函数组件中使用，并在不需要创建类的情况下将状态、副作用处理和更多东西带入组件中
```javascript
import react, { useState, useEffect } from 'react';

const NoteForm = ({ onNoteSent }) => {
    const [currentNote, setCurrentNote] = useState('');

    useEffect(() => {
        console.log(`Current note: ${currentNote}`);
    })

    return (
        <form
            onSubmit = {e => {
                onNoteSent(currentNote);
                setCurrentNote('');
                e.preventDefault();
            }}
        >
           <label>
            <span>Note: </span>
            <input
                value={currentNote}
                onChange={e => {
                    const val = e.target.value && e.target.value.toUpperCase()[0];
                    const validNotes = ["A", "B", "C", "D", "E", "F", "G"];
                    setCurrentNote(validNotes.includes(val) ? val : "");
                }}
            />
        </label>
        <button type="submit">Send</button> 
        </form>
    )
}
```
useState和useEffect是React Hooks中的一些例子，使得函数组件中也能增加状态和运行服作用

还有更多其他hooks，甚至能自定义hook，hooks打开了打开复用性和扩展性的新大门

## Vue Composition Api
Vue Composition Api围绕一个新的组件选项setup而创建。setup()为Vue组件提供了状态、计算值、watcher和生命周期钩子
```javascript
<template>
    <form @submit="handleSubmit">
        <label>
            <span>Note:</span>
            <input v-model="currentNote" @input="handleNoteInput">
        </label>
        <button type="submit">Send</button>
    </form>
</template>
import { ref } from 'vue';
export default {
    props: ['divRef'],
    setup(props, context) {
        const currentNote = ref('');
        const handleNoteInput = e => {
            const val = e.target.value && e.target.value.toUpperCase()[0];
            const validNotes = ["A", "B", "C", "D", "E", "F", "G"];
            currentNote.value = validNotes.includes(val) ? val : "";
        }
        const handleSumbit = e => {
            context.emit('note-sent', currentNote.value);
            currentNote.value = '';
            e.preventDefault();
        }

        return {
            currentNote, 
            handleNoteInput,
            handleSumbit
        }
    }
}
```
从上面例子中可以看到
- 暴露给模块的属性来源清晰(从函数返回)
- 返回值可以被任意重命名，所以不存在命名空间冲突
- 没有创建额外的组件实例所带来的性能损耗

## React Hooks vs Vue composition API
React Hook底层基于链表实现，调用的条件是**每次组件被render的时候都会顺序执行所有的hooks**。所以下面的代码会报错
```
function App() {
    const [name, setName]= useState('demo');
    if (condition) {
        const [val, setVal] = useState('')
    }
}
```
:::tip
因为底层是链表，每一个hook的next是指向下一个hook的，if会导致顺序不正确，所以react 不允许这样使用hook的
:::

Vue Hook只会被注册一次，它对数据的响应是基于proxy的，对数据直接代理观察。这种场景下，只要修改一个更改data的地方，相关的function或者template会重新计算，因此避开了react可能遇到的性能上的问题

react数据变动的时候，回到重新render，重新render又会把hooks重新注册一次，所以react的上手难度更好一些

当然react对这些都有自己的解决方案，比如[useCallback](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecallback) [usememo](https://zh-hans.reactjs.org/docs/hooks-reference.html#usememo)等

<span style="color:red">useCallback 缓存钩子函数，useMemo 缓存返回值（计算结果）。</span>

[useCallback vs usememo](https://segmentfault.com/a/1190000039657107)

[useCallback vs usememo](https://segmentfault.com/a/1190000039405417)
## 代码的执行

> Vue中，钩子就是一个生命周期的方法
Vue Composition API 的 setup() 晚于 beforeCreate 钩子（在 Vue 中，“钩子”就是一个生命周期方法）而早于 created 钩子被调用

> React Hooks在组件每次渲染时都会运行，而Vue setup()只在组件创建时运行一次

React靠Hook的调用顺序来获悉state和useState的对应关系。只要调用顺序在多次渲染之间保持一致，React就能正确的将内部state和对应Hook进行关联。因此Hook时必须遵守一些规则：**只在最顶层使用Hook，不要在循环内部、条件语句中或嵌套函数中调用Hooks**
```javascript
// React文档中示例代码
import React, { useState, useEffect } from 'react';

function Form() {
  // 1. 使用 name 状态变量
  const [name, setName] = useState('Mary');
 
  // 2. 使用一个持久化表单的副作用
  // 🔴 在条件语句中使用 Hook 违反第一条规则
  if (name !== '') {
    useEffect(function persistForm() {
      localStorage.setItem('formData', name);
    });
  }
  // 3. 使用 surname 状态变量
  const [surname, setSurname] = useState('Poppins');
 
  // 4. 使用一个更新 title 的副作用
  useEffect(function updateTitle() {
    document.title = `${name} ${surname}`;
  });
}
```
在第一次渲染中name!== ''这个条件值为true,所以我们会执行这个Hooks。。但是下一次渲染时我们可能清空了表单，表达式值变为 false。此时的渲染会跳过该 Hook，Hook 的调用顺序发生了改变：
```javascript
// ------------
// 首次渲染
// ------------
useState('Mary')           // 1. 使用 'Mary' 初始化变量名为 name 的 state
useEffect(persistForm)     // 2. 添加 effect 以保存 form 操作
useState('Poppins')        // 3. 使用 'Poppins' 初始化变量名为 surname 的 state
useEffect(updateTitle)     // 4. 添加 effect 以更新标题

// -------------
// 二次渲染
// -------------
useState('Mary')           // 1. 读取变量名为 name 的 state（参数被忽略）
// useEffect(persistForm)  // 🔴 此 Hook 被忽略！
useState('Poppins')        // 🔴 2 （之前为 3）。读取变量名为 surname 的 state 失败
useEffect(updateTitle)     // 🔴 3 （之前为 4）。替换更新标题的 effect 失败
```
React不知道第二个useState的Hook应该返回什么。React会以为该组件中第二个Hook的调用像上次的渲染一样,对应的是persistForm的effect，但并非如此。从这里开始，后面的Hook调用都被提前执行了，导致bug产生

要实现在name为空时也运行对应的副作用，可以简单的将条件判断语句移入useEffect回调函数内
```javascript
useEffect(function persisForm() {
    // 👍 将条件判断放置在 effect 中
    if (name !== '') {
        localStorage.setItem('formData', name);
    }
})
```
对于以上实现，Vue大概是这样
```javascript
import { ref, watchEffect } from 'vue';

export default {
    setup() {
        // 1.使用name状态变量
        const name = ref('Mary');
        // 2. 使用一个watcher以持久化表单
        if(name.value !== '') {
            watchEffect(function persistForm() {
                localStorage.setItem('formDate', name.value);
            })
        }
        // 3. 使用 surname 状态变量
        const surname = ref("Poppins");
        // 4. 使用一个 watcher 以更新 title
        watchEffect(function updateTitle() {
            document.title = `${name.value} ${surname.value}`;
        });
    }
}
```
watchEffect可以在响应式的跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它。watch也可以实现相同的行为。

Vue的setup只会运行一次，是可以将Composition API中不同的函数(reactive、 ref、computed、watch、生命周期钩子等)作为循环或者条件的一部分

但是if语句同样只运行一次，所以它在name改变时也同样无法做出反应，除非我们将其包含在watchEffect回调内部
```javascript
watchEffect(function persistForm() => {
  if(name.value !== '') {
    localStorage.setItem('formData', name.value);
  }
});
```

## 声明状态
### react
useState是React Hooks声明状态的主要途径
- 可以向调用中传入一个初始值作为参数
- 如果初始值的计算代价比较昂贵，也可以将其表达为一个函数，这样就只会在除此渲染时才会被执行

useState()返回一个数组，第一项是state，第二项是一个setter函数
```javascript
const [name, setName] = useState('mary');
const [age, setAge] = useState('25');
console.log(`${name} is ${age} years old.`)
```
useReducer是个有用的替代选择，其常见形式是接收一个Redux样式的reducer函数和一个初始状态
```javascript
const initialState = {count: 0};

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        default:
            throw new Error();
    }
}
const [state, dispatch] = useReducer(reducer, initialState);

dispatch({type: 'increment'}); //  state就会变成{count: 1}
```
### Vue
Vue则由于其天然的反应式特性，有着不同的做法。使用两个主要函数来声明状态ref和reactive

ref()返回一个反应式对象，其内布置可以通过其value属性被访问到。可以将其用于基本类型，也可以用于对象，在后者的情况下是深层反应式的
```javascript
const name = ref("Mary");
const age = ref(25);
watchEffect(() => {
  console.log(`${name.value} is ${age.value} years old.`);
});
```
reactive只将一个对象作为其输入并返回一个对其的反应式代理。注意起反应性也会应道到所有嵌套的属性
```javascript
const state = reactive({
  name: "Mary",
  age: 25,
});
watchEffect(() => {
  console.log(`${state.name} is ${state.age} years old.`);
});
```
**注意**
- 使用ref时需要用value属性访问其包含的值(除非在temeplate中，Vue允许你省略它)
- 用reactive时，要注意如果使用了对象解构，会失去你反应性。所以需要定义一个指向对象的引用，并通过其访问状态属性

:::tip
- 像在正常的Javascript中声明基本类型的变量和对象那样去使用ref和reactive既可
- 用到reactive的时，要记住从composition函数返回反应式对象时要使用toRefs().这样减少了过多使用ref时的开销
:::
```javascript
// toRefs() 将反应式对象转换为普通对象，该对象上的所有属性都自动转换为 ref。
// 这对于从自定义组合式函数中返回对象时特别有用（这也允许了调用侧正常使用结构的情况下还能保持反应性）。

function useFeatureX() {
    const state = reactive({
        foo: 1,
        bar: 2
    })
    return toRefs(state);
}
const {foo, bar} = useFeatureX();
```

[ref /reactive区别](https://zhuanlan.zhihu.com/p/268053724)

## 如何跟踪依赖(How to track dependencies)
### react
React中的useEffect hook允许在每次渲染之后运行某些副作用(如请求数据或使用storage等Web APIs)，并视需要在下次执行回调之前或当组件卸载时候运行一些清理工作。

默认情况下，所有用useEffect注册的函数都会在每次渲染之后运行，但可以定义真实依赖的状态和属性，以使React在相关依赖没有改变的情况下(如由state中的其他部分引起的渲染)跳过某些useEffect hook执行。
```js
// 传递一个依赖项的数组作为useEffect hook的第二个参数，只有当name改变时才会更新 localStorage
function Form() {
    const [name, setName] = useState('Mary');
    const [surname, setSurname] = useState('Poppins');
    useEffect(function persistForm() {
        localStorage.setItem('formData', name);
    }, [name]); // 传递一个依赖项的数组作为useEffect hook的第二个参数
}
```
这样一来，只有当name改变时才会更新localStorage。使用React Hooks时一个常见的bug来源就是忘记在一来数组中详尽的声明所有依赖项；这可能让useEffect回调以'依赖和引用了上一次渲染的陈旧数据而非最新数据'从而无法被更新而告终

解决方案
- eslint-plugin-react-hooks包含了一条lint提示关于丢失依赖项的规则
- useCallback和useMemo也使用依赖项数组参数，以分别决定其是否应该返回缓存过的(memoized)与上一次执行相同的版本的回调和值

### Vue
在Vue Composition API的情况下，可以使用watcher执行副作用以响应状态或属性的改变。依赖会被跟踪，注册过的函数也会在依赖发生改变时候被反应性的调用
```js
export default {
    setup() {
        const name = ref('Mary');
        const lastName = ref('Poppins');
        watchEffect(function persistForm() => {
            localStorage.setItem('formData', name.value);
        })
    }
}
```
在watcher首次运行后，name会作为一个依赖项被跟踪，而稍后当值改变时，watcher会再次运行

## 访问组件生命周期
### react
Hooks在处理React组件的声明周期、副作用和状态管理时表现出了心理模式上的完全转变。React文档中也之处
:::tip
如果你熟悉React类生命周期方法，那么可以将useEffect hook视为componentDidMount、componentDidUpdate及componentWillUnmount的合集
:::
```js
useEffect(() => {
    console.log('这段只在初次渲染后运行');
    return () => console.log('这里会在组件将要卸载时候运行')；
})
```
但要再次强调的是,使用React Hooks时停止从生命周期方法的角度思考，而是**考虑副作用依赖什么状态**，才是更符合习惯

### Vue
Vue Composition API通过onMounted、onUpdated和onBeforeUnmount等可以访问**生命周期钩子(Vue世界中对生命周期的方法的等价称呼)**
```js
setup() {
    onMounted(() => {
        console.log('这段只是初次渲染后运行')；
    })
    onBeforeUnmount(() => {
        console.log('这里会在组件将要卸载时运行');
    })
}
```
故而在Vue的情况下心理模式转变更多在**停止通过选项(data,coumputed,watch,methods，生命周期钩子等)来管理代码，而是转向用不同函数队里对应的特性**

## 自定义代码
### React
:::tip
React团队意图聚焦于Hooks上的原因之一，是之于先前社区采纳的诸如Higher-Order-Components或Render Props等，Custom Hooks正是提供给开发者编写可复用代码的一种优秀的方法。
:::
Custom Hooks就是普通的Javascript函数，在其内部利用了React Hooks。它遵守的一个约定是其命名应以use开头，以表明这是被用作一个hooks的
```js
export function useDebugState(label, initialValue) {
    const [value, setValue] = useState(initialValue);
    useEffect(() => {
        console.log(`${label}:`, value);
    }, [label, value]);
    return [value, setValue];
}
// 调用
const [name, setName] = useDebugState('name', 'Mary');
```
这个Custom Hook的小例子可以被作为一个useState的替代品使用，用于当value改变时想控制台打印日志

### Vue
在Vue中，组合式函数(composition Functions)与Hooks在逻辑提取和重用的目标上是一致的。我们能在Vue中实现一个类似的useDebugState组合式函数
```js
export default useDebugState(label, initialValue) {
    const state = ref(initialValue);
    watchEffect(() => {
        console.log(`${value}:`, state.label);
    })
    return state;
}
// 在其他某处
setup() {
    const name = useDebugState('name', 'Mary')
}
```
:::warning
注意:根据约定，组合式函数也像React Hooks一样使用use作为前缀以明示作用，并且表明该函数用于setup()中
:::

## Refs
React的useRef和Vue的ref都允许你引用一个**子组件(如果是React则是一个类组件或是被React.forwardRef包装的组件)或要附加到的DOM元素**

### react
```js
const MyComponent = () => {
    const divRef = useRef(null);
    useEffect(() => {
        console.log('div:', divRef.current)
    }, [divRef]);

    return (
        <div ref={divRef}>
            <p>My Div</p>
        </div>
    )
}
```
React中的useRef Hook不止能获得DOM元素的引用，亦可用在你想保持在渲染函数中但并不是state一部分的任何类型的可变值上(也就是他们的改变触发不了重新渲染)。useRef Hook可以将这些课变值视为类组件中的'实例变量'。例子：
```js
const timerRef = useRef(null);
useEffect(() => {
    timerRef.current = setInterval(() => {
        setSecoondsPassed(prevSecond => prevSecond + 1);
    }, 1000);
    return () => {
        clearInterval(timerRef.current);
    }
})

return (
    <button onClick = {() => { clearInterval(timerRef.current) }}>
        停止timer
    </button>
)
```
### Vue
[想见组合式API-模板引用](https://v3.cn.vuejs.org/guide/composition-api-template-refs.html#%E6%A8%A1%E6%9D%BF%E5%BC%95%E7%94%A8)
```js
//1. with template
<template>
    <div ref={divRef}>
        <p>My div</p>
    </div>
</template>
<script>
import { ref, h, onMounted } from 'vue';

export default {
    setup() {
        const divRef = ref(null);
        onMounted(() => {
            // DOM元素将在初始渲染后分配给ref
            console.log('div:', divRef.value);
        })
        // 1. with template
        return {
            divRef
        }
        // 2. with 渲染函数
        return () => h('div', {ref: divRef}, [h('p', 'My div')]);

        // 3. with JSX
        return () => {
            <div ref={divRef}>
                <p>My div</p>
            </div>
        }
    }
}
</script>
```
## 附加的函数
### react
React Hooks在每次渲染时都会执行，所以没有一个等价于Vue中computed函数的方法。你可以自由的声明一个变量，其值基于状态和属性，并将指向每次渲染后的最新值
```js
const [name, setName] = useState('Mary');
const [age, setAge] = useState(25);
const description = `${name} is ${age} year old`;
```
计算一个值开销比较昂贵。你不想在组件每次渲染时都计算它。React包含了针对这点的useMemo hook
```js
function fibNative(n) {
    if (n <= 1) return n;
    return fibNative(n - 1) + fibNative(n - 2);
}
const fibonacci = () => {
    const [nth, setNth] = useState(1);
    const nthFibonacci = useMemo(() => fibNaive(nth), [nth]);

    return (
        <section>
        <label>
            Number:
            <input type="number" value={nth} onChange={e =>  setNth(e.target.value)} />
        </label>
        <p>nth Fibonacci number: {nthFibonacci}</p>
        </section>
    )
}
```
**React建议你使用useMemo作为一个性能优化手段，而非一个任何一个依赖项改变之前的缓存值**

### vue
vue中，setup()只运行一次。因此需要定义计算属性，观察某些状态更改并作出相应的更新
```js
const name = ref('Mary');
const age = ref(25);
cosnt description = computed(() => `${name.value} is ${age.value} years old`);
```
Vue的coumputed执行自动的依赖追踪，所以它不需要一个依赖项数组
:::tip
React的useCallback类似于useMemo，但它用来缓存一个回调函数。事实上useCallback(fn, deps)等价于useMemo(fn, deps)。其理想用例是当我们需要在多次渲染间保持引用相等性时，比如将回调传递给一个用React.memo定义的已优化子组件，而我们想避免其不必要的重复渲染时
:::

鉴于Vue composition Api的天然特性，并没有等同于useCallback的函数。setup()中任何回调函数都会定义一次。

## Context和provide/inject
### react
React中的useContext hook,可以作为一种读取特定上下文值的新方式。返回的值通常由最靠近的一层&lt;MyContext.Provider&gt;祖先树的value属性确定。

其等价于一个类中的static contextType = MyContext, 或是&lt;MyContext.Consummer&gt;组件
```js
// context对象
const ThemeContext = React.createContext('light');

// provider
<ThemeContext.Provider value="dark">

// consummer
const theme = useContext(ThemeContext);
```
[容易理解的--参考](https://www.jianshu.com/p/65b348bf86ad)
### vue
Vue 中类似的 API 叫provide/inject。在 Vue 2.x 中作为组件选项存在，而在 Composition API 中增加了一对用在setup()中的 provide 和 inject 函数：
```js
// key to provide
const ThemeSymbol = Symbol();

// provider
provide(ThemeSymbol, ref("dark"));

// consumer
const value = inject(ThemeSymbol);
```
注⚠️：如果你想保持反应性，必须明确提供一个ref/reactive作为值。

## 在渲染上下文中暴露值
### react
因为所有hooks代码都在组件中定义，且你将在同一个函数中返回要渲染的React元素。

所以你对作用域的任何值都拥有完全访问能力，就像在任何Javascript代码中一样
```js
const Fibonacci = () => {
  const [nth, setNth] = useState(1);
  const nthFibonacci = useMemo(() => fibNaive(nth), [nth]);
  return (
    <section>
      <label>
        Number:
        <input  type="number" value={nth} onChange={e => setNth(e.target.value)} />
      </label>
      <p>nth Fibonacci number: {nthFibonacci}</p>
    </section>
  );
};

```
### vue
而在 Vue 要在template或render选项中定义模板；如果使用单文件组件，就要从setup()中返回一个包含你想输出到模板中的所有值的对象。由于要暴露的值很可能过多，你的返回语句也容易变得冗长。

```js
<template>
  <p>
    <label>
      Number:
      <input type="number" v-model="nth" />
    </label>
    <p>nth Fibonacci number: {{nthFibonacci}}</p>
  </p>
</template>
<script>
export default {
  setup() {
    const nth = ref(1);
    const nthFibonacci = computed(() => fibNaive(nth.value));
    return { nth, nthFibonacci };
  }
};
</script>
```
要达到 React 同样简洁表现的一种方式是从setup()自身中返回一个渲染函数。
```js
export default {
  setup() {
    const nth = ref(1);
    const nthFibonacci = computed(() => fibNaive(nth.value));
    return () => (
      <p>
        <label>
          Number:
          <input type="number" vModel={nth} />
        </label>
        <p>nth Fibonacci number: {nthFibonacci}</p>
      </p>
    );
  }
};
```
不过，模板在 Vue 中是更常用的一种做法，所以暴露一个包含值的对象，是你使用 Vue Composition API 时必然会多多遭遇的情况。

## 总结
React 和 Vue 都有属于属于自己的“惊喜”，无优劣之分，自 React Hooks 在 2018 年被引入，社区利用其产出了很多优秀的作品，自定义 Hooks 的可扩展性也催生了许多开源贡献。

Vue 受 React Hooks 启发将其调整为适用于自己框架的方式，这也成为这些不同的技术如何拥抱变化且分享灵感和解决方案的成功案例。

[Vue Function-based API RFC](https://zhuanlan.zhihu.com/p/68477600)


## 资料
[资料1](https://www.cnblogs.com/ygunoil/p/13704589.html)

[对比React Hooks和Vue Composition Api](https://www.jianshu.com/p/950d45cebab9)