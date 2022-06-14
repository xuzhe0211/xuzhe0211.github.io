---
autoGroup-12: 工程化知识卡片
title: webpack之loader执行顺序及原理
---

## less-loader、css-loader、style-loader插件作用
- less-loeader: 用于加载.less文件，将less转化为css
- css-loader：用于加载.css文件，将css转化为commonjs
- style-loader：将样式通过&lt;style&gt;标签插入到header中

```js
// 先安装这几款插件
npm i style-loader css-loader less less-loader -D

// webpack.config.js文件中加入如下配置
'use strict'

const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    }
}
```
解析less主要是通过以上代码中的一下部分
```js
{
    test: /\.less$/,
    use: [
        'style-loader',
        'css-loader',
        'less-loader'
    ]
}
```
这里有一点要注意，我们的解析过程中是链式的，所以在use数组中下面的部分会先执行，所以他们的执行顺序其实是less-loader -> css-loader -> style-loader

## webpack的加载从右往左执行？
其实为啥是从右往左，而不从左往右，只是Webpack选择了compose方式,而不是pipe的方式而已，从技术上实现从左往右也不会有难度

<span style="color:blue">函数组合:函数组合是函数式编程中非常重要的思想</span>

<span style="color:blue">函数组合的连中形式:一种是pipe，另一种是compose。前者是从左向右组合函数，后者方向相反</span>

在Uninx有pipeline的概念，平时应该也有接触，比如ps aux | grep node,这些都是从左向右的

但是在函数式编程中有组合的概念，我们数学中常见的f(g(x)),在函数式编程一般实现方式都是从右往左的，如
```js
const compose = (...funs) => x => funs.reduceRight((v, f) => f(v), x);
const add1 = n => n + 1; // 加1
const double = n => n * 2; // 乘2
const add1ThenDouble = compose(
    double, 
    add1
)
add1ThenDouble(2); // 6;
// ((2 + 1 = 2) * 2 = 6)
```
这里可以看到我们先执行的加1，然后执行的double,在compose中采用[reduceRight](/front-end/JavaScript/array-interation-method.html#array-prototype-reduceright),所以我们传入参数的顺序编程了先传入double，后传入add1

### 那么其实也可以事先从左向右
```js
const pipe = (...func) => x => fns.reduce((v, f) => f(v), x);
const add1ThenDouble = pipe(
    add1, 
    double
)
add1ThenDouble(2); // 6
((2 + 1 = 3) * 2 = 6 )
```
所以只不过webpack选择了函数式编程的方式，所以loader的顺序编程从右往左，如果webpack选择了pipe的方式，那么大家现在写loader的时候顺序就贬称过来从左往右了
```js
compose: require('style-loader!css-loader!sass-loader!./my-style.sass');
pipe: require('./my-style.sass!sass-style!css-loader!style-loader')
```


[node中间件--compose](/back-end/Node/study-02koa.html#中间件)

[pipe实现](/front-end/JavaScript/a-es5-reduce.html#pipe实现)