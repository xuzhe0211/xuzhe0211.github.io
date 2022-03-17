---
autoGroup-10: webpack中的小技巧
title: webpack--loader/plugin的区别和开发
---
## Webpack的构建流程主要有哪些环节?如果可以请尽可能详尽的描述webpack的打包过程
根据配置文件里entry找到打包入口文件

顺着入口文件代码里的import或require之类的语句，解析推断文件所依赖的资源模块

分别去解析每个资源模块对应的依赖，最后形成一颗依赖树。

递归依赖树，找个每个节点对应的资源文件

根据配置文件rules属性，找个资源模块所对应的加载器

交给对应的加载器加载对应的资源模块

最后将加载以后的结果放入到bundle.js打包结果里

实现整个项目打包

## Loader和Plugin有哪些不同，请描述一下开发Loader和Plugin思路
### Loader和Plugin的不同
- Loader是资源加载器，实现资源模块的转换和加载,编译转换类css-loader，文件操作类file-loader、url-loader,代码检查类eslint-load，负责资源文件从输入到输出的资源转换，对于同一个资源可以使用多个loader，类似于管道概念
- Plugin解决除了资源加载以外其他自动化工作(打包之前清楚dist目录、拷贝静态文件、压缩代码等)

### 开发loader思路
每个webpack的loader需要导出一个函数，这个函数是对加载到的资源处理的过程，输入是加载到的资源文件的内容，输入是加攻之后的结果
```javascript
const marked = require('marked');

module.exports = source => { // 接收到的资源文件
  // console.log(source);
  // return `console.log('hello ~')`
  const html = marked(source);

  // 方式一：第一，输出标准的JS代码，让打包结果的代码能正常执行
  return `export default ${JSON.stringify(html)}`

  // 方式二：输出处理结果，交给下一个loader处理成JS代码
  // 返回html 字符串交给下一个loader处理
  return html;
}
```
在webpack.config.js中使用loader，配置module.rules,其中use除了可以使用模块名称，也可以使用模块路径
```
const path = require('path');

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /.md$/,
        use: [ // 输出处理结果交给下一个loader处理
          'html-loader',
          './markdown-loader'
        ]
      }
    ]
  }
}
```
### 开发plugin的思路
plugin是通过在生命周期的钩子中挂载函数实现扩展，我们可以在不同的事件节点上挂载不同的任务，就可以扩展一个插件，**插件必须是一个函数或者包含apply方法的对象**，一般可以把插件定义为一个类型，在类型中顶一个apply方法

<span style="color:blue">apply方法接收一个compiler对象参数，包含了这次构建的所有配置信息</span>

通过这个对象注册钩子函数

通过compiler.hooks.emit.tap注册钩子函数(emit也可以为其他事件)

钩子函数第一个参数为插件名称

<span style="color:blud">第二个参数compilation函数，为此次打包的上下文</span>

根据compilation.assets[name].source()可以拿到此次打包的资源的内容

然后做一些响应的逻辑处理
```javascript
class MyPlugin {
  apply(compiler) {
    console.log('MyPlugin 启动');
    compiler.hooks.emit.tap('MyPlugin', compilation => {
      // compilation => 可以理解为此次打包的上下文
      for(const name in compilation.assets) {
        // console.log(name);
        // console.log(compilation.assets[name].source())
        if (name.endsWith('.js')) {
          const contents = compilation.assets[name].source(); // 文件内容
          const withoutComments = contents.replace(/\/\*\*+\*\//g, '');
          compilation.assets[name] => {
            source: () => withoutComments, // 返回新内容
            size: () => withoutComments.length // 返回新的内容的长度
          }
        }
      }
    })
  }
}
```

## 资料
[原文](https://blog.csdn.net/qq_36132291/article/details/112897286)

[webpack-自定义plugin](https://www.cnblogs.com/znLam/p/13110076.html)