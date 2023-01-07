---
autoGroup-12: 工程化知识卡片
title: babel之配置文件.babelrc入门详解
---
## 什么是Babel
官方解释，是下一代Javascript语法的编译器

既然是下一代Javascript的标准，浏览器因版本的不同对此会有兼容性问题，Javascript的新的方法都不能使用,但是目前我们在项目开发一直提倡使用最新的语法糖编写，不但能减少代码量，而且async、await等新特性还解决了回调的编写机制，减轻了代码维护成本。

<span style="color: blue">Babel就因此而生，它可以让你放心使用大部分的Javascript的心的标准的方法，然后编译成兼容绝大多数的主流浏览器的代码</span>。在项目工程脚手架中，一般会使用.babelrc文件，通过配置一些参数配合webpack进行打包压缩。通过网上了解，写法各有不同，参数也大不相同，因此我重新整理一份资料，详细的介绍下各个配置项的意义所在，以便清晰了解如何使用

> 以下配置主要是对webpack 3+ 写法

## Babel编译器
在.babelrc配置文件中,主要是对预设(presets)和插件(plugins)进行配置，因此不同的转移器作用不同的配置项，大致可分为以下三项

1. <span style="color: blue">**语法转义器**。主要对javascript最新的语法糖进行编译，并不负责转义javascript新增的api和全局对象</span>。例如let/const就可以被编译，而includes/Object.assign等并不能被编译。常用到的转译器包有，babel-preset-env、babel-preset-es2015、babel-preset-es2016、babel-preset-es2017、babel-preset-latest等。在实际开发中可以只选用babel-preset-env来代替余下的，但是还需要配上javascript的制作规范一起使用，同时也是官方推荐的。

    ```js
    {
        "presets": ["env", {
            "modules": false
        }],
        "stage-2"
    }
    ```
2. <span style="color: blue">**补丁转义器**。主要负责转义javascript新增的api和全局对象</span>,例如babel-plugin-transform-runtime这个插件能够编译Object.assign,同时也可以引入babel-polyfill进一步对includes这类用法保证浏览器的兼容性。Object.assign会被编译成一下嗲吗

    ```js
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()
    ```
3. jsx和flow插件，这类转译器用来转义JSX语法和移除类型声明的，使用React的时候将会用到它，转移器名称为babel-preset-react

## 创建预设(presets)
主要通过npm安装babel-preset-xx插件来配合使用，例如通过npm install babel-preset-stage-2 babel-preset-env --save-dev 安装，会有相应如下配置
```js
{
    "presets": [
        ["env", options],
        "stage-2"
    ]
}
```
### stage-2配置
babel主要提供以下几种转译器包，括号里面是对应配置文件的配置项
```js
babel-preset-stage-0(stage-0)
babel-preset-stage-1(stage-1)
babel-preset-stage-2(stage-2)
babel-preset-stage-3(stage-3)
```
不同阶段的转译器之间是包含的关系，preset-stage-0转译器除了包含了preset-stage-1的所有功能还增加了transform-do-expressions插件和transform-function-bind插件，同样preset-stage-1转译器除了包含preset-stage-2的全部功能外还增加了一些额外的功能。

### options配置介绍
官方推荐使用babel-preset-env来替代一些插件包的安装(es2015-arrow-functions,es2015-block-scoped-functions等)，并且有如下几种配置信息，介绍几个常用的

> 更多配置可以参考官网https://babeljs.io/docs/plugins/preset-env/

```js
{
    "targets": {
        "chrome": 52,
        "browsers": ["last 2 versions", "safari 7"],
        "node": "6.10"
    },
    "modules": false
}
```
targets可以指定兼容浏览器版本，如果设置了browsers,那么就会覆盖targets原本对浏览器的限制配置。

target.node正对node版本进行编译

modules通常会设置为false，因为默认都是支持CommonJS规范，同时还有其他配置参数: "amd" | "umd" | "systemjs" | "commonjs", systemjs我还不知道规范写法是什么，amd和umd以及commonjs相对比较熟悉，下面简要列举下书写规范

> amd代码规范，在ng1中会用到比较多，主要用于依赖注入

```js
define(['jquery'], function($) {
    // 方法
    function myFunc() {}
    // 暴露公共方法
    return myFunc;
})
```

> commonjs规范，也是node环境中尊崇的一种规范
```js
var $ = require('jquery');
// 方法
function myFunc() {}

// 暴露公共方法(一个)
module.export = myFunc;

{% endcodeblock %}
> umd规范,兼容amd以及commonjs规范，目前在第三方插件编写使用比较多
{% codeblock lang:javascript %}

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory(require('jquery'));
    } else {
        // 浏览器全局变量(root 即 window)
        root.returnExports = factory(root.jQuery);
    }
}(this, function ($) {
    //    方法
    function myFunc(){};
 
    //    暴露公共方法
    return myFunc;
}));
```
## 插件
插件配置项同预设配置项一样，需要搭配babel相应的插件进行配置，可以选择配置插件来满足单个需求。例如早起我们会有如下配置
```js
{
    "plugins": [
        "check-es2015-constants",
        "es2015-arrow-functions",
        "es2015-block-scoped-functions",
        //...
    ]
}
```
<span style="color: blue">但是这些插件从维护到书写极为麻烦，后来官方统一推荐使用env,全部替代了这些单一的插件功能，可以简化配置如下，也就是我前面提到的babel-preset-env</span>

```js
{
    "presets": [
        "es2015"
    ]
}
```
这里主要介绍两款常用插件，分别是babel-plugin-transform-runtime,babel-plugin-syntax-dynamic-import.

基本配置代码如下
```js
{
    "plugins": [
        "syntax-dynamic-import", ["transform-runtime"]
    ]
}
```
### transform-runtime

## 资料
[babel之配置文件.babelrc入门详解](https://juejin.cn/post/6844903561910812685)