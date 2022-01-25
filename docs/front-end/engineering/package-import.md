---
autoGroup-10: webpack中的小技巧
title: 前端性能优化-组件库按需加载
---
<!-- inquirer，ora， clone-git-repo -->
## 代码拆分/按需加载
> 代码吃啊分和按需加载的设计决定着工程化构建的结果，将直接影响应用的性能表现，因为合理的加载时间和代码拆分能够使初始化体积更小，页面加载更快。

### 按需加载和按需打包的区别
按需加载表示代码模块在交互需要时，动态引入；而按需打包针对第三方依赖库以及业务模块，只打包真正运行时可能会需要代码

按需打包方式
- 使用ES Module支持的Tree Shaking方法，在使用构建工具时，完成按需打包
- 使用babel-plugin-import为主的babel插件，实现自动按需打包

### Tree Shaking实现按需打包
假设业务中使用了antd的Button组件
```
import {Button} from 'antd';
```
这样的引用，会使得最终打包文件中包含所有antd导出来的内容。假设应用中并没有使用antd提供的TimePicker组件，那么对于打包结果来说，无疑是增加了代码体积。这种情况下，如果组件库提供了ES Module版本，并开启了Tree Shaking，我们就可以通过树摇特性，将不会使用到的代码在构建阶段移除。

webpack可以在package文件中设置sideEffects:false。在antd源码中可以找到
```
'sideEffects': [
    'dist/*',
    'es/**/style/*',
    'lib/**/style/*',
    '*.less'
]
```
来指定副作用模块
### 学习编写Babel插件，实现按需打包
如果第三方哭不支持Tree Shaking，我么依然可以通过Babel插件，改变业务代码中对模块的引用来实现按需打包。

如果babel-plugin-import这个插件， 我们通过一个例子来了解她的原理
```
import { Button as Btn, Input, ...} from 'antd'
```
这样代码就可以编译为
```
import _Input from 'antd/lib/input';
import _Button from 'antd/lib/button'
```
**Babel插件贺新年以来对于AST的解析和操作。它本质上就是一个函数，在Babel对AST语法树进行转换过程中介入，通过相应的操作，最终让生成结果发生改变**

Babel内置了几个核心分析、操作AST的工具集，Babel插件通过观察者+ 访问者模式，对AST节点统一遍历，因此居委了良好的扩展性和灵活性

### 动态引入--按需加载？？？
**静态引入**

标准用法的import属于静态导入，它只支持一个字符串类型的module specifier(模块路径声明)，这样的特性会使所有被import的模块在加载时候就被编译。

这种做法从某种角度，对于绝大多数场景来说性能是友好的，因为以为这对工程静态分析成为了可能，进而使得类似tree-shaking的技术有了应用空间。

但对于一些特殊场景，静态引入也可能成为性能的短板，如当我们需要
- 按需加载一个模块
- 按运行时间选定一个模块

dynamic import.如在浏览器侧，根据用户系统语言选择加载不同的语言模块，根据用户的操作去加载不同的内容逻辑，如根据用户系统语言加载不同的语言模块。

[MDN文档](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/import)中给出了dynamic import更加具体的使用场景

- 静态导入的模块很明显降低了代码的加载速度且呗使用的可能性很低，或者并不需要马上使用它；
- 静态导入的模块很明显占用了大量的系统内润，且呗使用的可能性很低；
- 被导入的模块在加载时并不存在，需要异步获取；
- 导入模块的说明符，需要动态构建(静态导入只能使用静态说明符)
- 被导入的模块由副作用(可以理解为模块中会直接运行的代码)，这些副作用代码只有在触发某些条件时才被需要

dynamic import的标准用法文档：[官方规范](https://tc39.es/proposal-dynamic-import/#sec-import-calls)和[tc39 proposal](https://github.com/tc39/proposal-dynamic-import)
```
// html部分
<nav>
    <a href="" data-script-path="books">Books</a>
    <a href="" data-script-path="movies">Movies</a>
    <a href="" data-script-path="video-games">Video Games</a>
</nav>
<div id="content"></div>

// script部分
<script>
    // 获取element
    const contentEle = document.querySelector('#content');
    const links = document.querySelectorAll('nav > a');

    //遍历绑定逻辑
    for (const link of links) {
        link.addEventListener('click', async (event) => {
            event.preventDefault();
            try {
                const asyncScript = await import(`/${link.dataset.scriptPath}.js`);
                // 异步加载脚本
                asyncScript.loadContentTo(contentEle);
            } catch(errot) {
                contentEle.textContent = `We got error: ${error.message}`;
            }
        })
    }
</script>
```
当点击页面上a标签，会动态加载一个模块，并调用模块定义的loadContentTo方法完成页面内容的填充

表面上看，await import()的用法使得import像一个函数，该函数通过调用()操作符调用并返回一个Promise。

事实上**dynamic import只是一个function like的语法形式**。在ES6 class特性中，super()与dynamic import类似，也是一个function like语法形式。所以它与函数有这本质的区别。

- dynamic import并非继承Function.prototype，因此不能使用Function构造函数原型上的方法import.call(null, ${path}),调用他是不合法的。
- dynamic import并非继承自Object.prototype，因此不能使用Object构造函数原型上的方法

虽然dynamic import并不是一个真正意义上的函数，但我们可以通过实现一个dynamic import函数模拟实现dynamic inport，并进一步加深对齐语法特性的理解

#### 实现一个dynamic import(动态引入)
```
const importModule = url => {
    return new Promise((resolve, reject) => {
        // 创建一个script标签
        const script = document.createElement('script');
        cosnt tmpGlobal = `__tempModuleLoadingVariable${Math.random().toString(32).substr(2)}`;

        script.type = 'module';
        script.textContent = `import * as m from "${url}"; window.${tempGlobal} = m`;

        // load回调
        script.onload = () => {
            resolve(window[tmpGlobal]);
            delete window[tmpGlobal];
            script.remove();
        }

        document.documentElement.appendChild(script);
    })
}
```
在以上函数中，通过动态插入一个script标签实现对目标script url的加载，将模块导出内容赋值给window对象

### webpack赋能代码拆分和按需加载
webpack提供了三种相关能力
- 通过入口配置手动分割代码
- 动态导入支持
- 通过splitChunk插件提供公共代码(公共代码分割)

webpack对dynamic import能力支持

webpack中splitChunk插件和代码分割

代码分割和动态加载是两个概念。动态加载技术本质上是一种懒加载---按需加载，即只要在需要的地方才会加载代码。而代码分割是中代码拆分技术，与代码合并打包是一种相逆的过程。

代码分割的核心意义在于避免重复的打包以及提升缓存利用率，进而提升访问速度。如将不常变化的第三方依赖进行代码拆分，方便对第三方依赖库缓存，同事抽离公共逻辑，减少单个文件的size大小

[Webpack之SplitChunks插件用法详解](https://zhuanlan.zhihu.com/p/152097785)

[webpack按需加载](https://www.cnblogs.com/liumcb/p/13892525.html)

---
## 组件库按需加载

> 很多团队都会根据自己团队的技术风格或应用场景简历自己的组件库，然而随着组件的增加，组件库的体积也变得越来越大，如果一个很小的项目，仅仅想使用某个组件库中一两个组件，而这个组件库十分庞大却不支持按需加载，其结果就是打包后发现引入组件库的体积甚至比项目本身的代码还要大N倍

**那么如何让组件库支持按需加载呢？？**

以React项目为例，首先从打包后的包来分析,可能在没有支持按需加载时类似这样
```
.
|--dist
|  |-- index.js
|  |-- style.css
|  |-- ...
|  |__ package.json
```
或者干脆不拆分出css,像这样:
```
.
|-- dist
|  |-- index.js
|  |-- ...
|  |__ package.json
```
此时在项目中使用时，即便只使用组件库中的一个组件，也要从dist中import index.js这个包含所有组件的模块。

那么按需加载想要的效果呢？我们希望使用哪个组件，便导入哪个组件相关的模块，从而减少不必要的代码导入。由此想到：不能将所有的组件都打包到一个模块(js)文件，要将每个组件单独打包到不同的模块，然后按需独立引入。同时还要支持全量使用。于是我们想要的打包结果可能是：
```
.
|-- dist
|  |-- componentA.js
|  |-- componentB.js
|  |-- index.js // 全量
|  |-- ...
|  |__ package.json
```
此时就需要用webpack的entry配置入手了。

[webpack entry说明文档](https://www.webpackjs.com/concepts/entry-points/)

首先我们的项目目录是这样的
```
.
|-- components
|  |-- componentA
|  |  |-- style.scss
|  |  |-- index.js
|  |-- componentB
|  |  |-- style.scss
|  |  |-- index.js
|  |-- ...
|  |__ index.js
|-- webpack.config.js
|__ ...
```
**组件代码**

/components/componentA/index.js
```
export default function ComponentA() {
    return (
        ...
    )
}
```
/components/index.js
```
export {default as ComponentA} from './componentA';
export {default as ComponentB} from './componentB';
...
```
想要实现分多个模块打包，则需要entry制定多个入口,像这样
```
{
    entry:  {
        index: path.resolve(__dirname, './components/index.js'),
        componentA: path.resolve(__dirname, './components/componentA'),
        componentB: path.resolve(__dirname, './components/componentB'),
    },
    output: {
        path: path.resolve(__dirname, '.dist'),
        file: '[name].js'
    }
}
```
此时打包后遍可以得到我们想要的效果，有个麻烦是，我们每加一个组件都要在entry这个加一个入口，这就很难受了，因此可以通过node动态获取入口，比如
```
const path = require('path');
const fs = require('fs');

const getEntry = () => {
    let entryObj = {};
    let dir = fs.readdirSync(resolve('./components'));
    dir.forEach(item => {
        item === 'index.js'
        ? entryObj['index'] = resolve('./components/index.js')
        : entryObj[item] = resulve(`./components/${item}`)
    })
    return entryObj
}
// entry配置
{
    entry: getEntry();
}
```

这样方便又准确

这是我们在使用时饥渴，直接引入单个组件了
```
import CommponentA from 'xxx/componentA';
```
这时你可能会发现，当我需要使用多个组件时便需要多次import，写起来麻烦
```
import ComponentA from 'xxx/componentA';
import ComponentB from 'xxx/componentB';
...
```

如果css文件单独抽离出来还是多个import个css

而我们更倾向于这样来使用
```
import {ComponentA, ComponentB} from 'xxx'
```

当然是可以的，不过需要借助一个工具---babel。要做的就是做一个简单的babel插件，而插件的功能就是
```
将
import { ComponentA, ComponentB } from 'xxx';

转化为 =>

import ComponentA from 'xxx/componentA';
import ComponentB from 'xxx/componentB';
```
Babel的转码工作大致分为三个阶段
- 解析(parse)：将代码字符串解析成AST(抽象语法数)
- 转换(transform):对抽象语法树进行转换操作
- 生成(generate):将转换后的抽象语法树在生成代码字符串

距离逻辑不在叙述，可参考[babel插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)自己开发。


## 资料
[组件库按需加载](https://blog.csdn.net/zSY_snake/article/details/106412382)

[前端性能优化 - 代码拆分和按需加载（减少bundle size）](https://blog.csdn.net/xiaobing_hope/article/details/115056909)

[组件库按需加载](https://juejin.cn/post/6844903890077351943)