---
title: webpack
---
## webpack核心概念
entry:编译入口

module:模块，在webpack中，一切皆为模块，一个模块对应一个文件

Chunk：代码块，一个chunk由多个模块组合而成，用于代码的合并与分割

loader:模块转换器，将非js模块转化为webpack能识别的js模块

Plugin:扩展插件，在webpack运行的各个阶段，都会广播出去相对应的事件，插件可以监听到这些事件的发生，在特定的时机做响应的事情

## webpack核心对象
**Tapable**:控制钩子的发布和订阅，Compiler和Compilation对象都继承与Tapable;

**Compiler**:<br/>
Compiler继承Tapable对象，可以广播和监听webpack。<br/>
Compiler对象是webpack的编译器,webpack周期中只存在一个Compiler对象<br/>
Compiler对象在webpack启动时创建实例，compiler实例中包含webpack的完整配置，包括loaders,plugins信息

**Compilation**<br/>
Compilation继承Tapable对象，可以广播和监听webpack事件。<br/>
Compilation实例仅代表一次webpack构建和生成编译资源的过程<br/>
webpack开发模式开启watch选项，每次检测到入口模块变化时，会创建一次新的编译:生成一次新的编译资源和新的compilation对象，这个compilation对象包含了当前编译的模块资源modulle，编译生成的资源，变化的文件，依赖的状态

## webpack基本概念
1. webpack中module、chunk和bundle

module就是一个js模块，就是被require和export的模块，例如ES模块，commonjs模块，AMD模块

chunk是代码块，是进行依赖分析的时候，代码分割出来的代码块，包含一个或多个module，是被分组了的module集合，code spliting之后的就是chunk

bundle是文件，最终打包出来的文件，通常一个buundle对应一个chunk

2.webpack中loader和plugin作用

loader是文件转换器，将webpack不能处理的模块转换为webpack能处理的模块，就是js模块

plugin是功能扩张，干预webpack的打包过程，修改编译结果或者打包结果

## webpack打包流程-原理
1. 初始化参数--生成options(将webpack.config.js和shell中的参数，合并到options对象)
2. 开始编译--实例化compiler对象(用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译)(webpack全局的配置对象，包含entry，output、loader、plugins等所有配置信息)
3. 实例化Compilation(compiler方法执行，开始编译过程，生成Compilation对象)
4. 确定入口--分析入口js文件，调用AST引擎处理入口文件，生成抽象语法树，根据AST构建模块的所有与依赖
5. 编译模块、完成编译--通过loader处理入口文件的所有依赖，转换成js模块，生成AST，继续遍历，构建依赖的依赖，递归，直至色素偶有与依赖分析完毕
6. 输出资源--对生成的所有与module进行处理，调用plugins，合并，拆分。生成chunk
7. 输出完成--讲chunk生成对应的bundle文件，输出到目录

## webpack热更新的原理

基本原理，webpack监听文件变化，服务端和客户端有websocket通信，服务端向客户端发送文件变化信息，客户端根据文件变化消息获取变更模块代码，进行模块代码的热替换

1. 配置开启热更新，设置entry格式和webpack-dev-server的option，使得打包的bundle里面包含HMR runtime和websocket连接的代码
2. webpack-dev-server通过express启动服务端
3. 客户端通过sockjs和服务端建立websocket长连接
4. webpack监听文件变化，文件保存触发webpack重新编译，编译后的代码保存在内存中，不在output.path中产生输出
5. 编译会生成hash值，hot-update.json(已改动模块的json)，hot-update.js(已改动模块的js)
6. 通过socket想客户端发送hash值
7. 客户端对比hash值，一致在走缓存，不一致则
通过ajax获取hot-update.json，json包含模块hash值
再通过jsonp请求获取hot-update.js
8. 热更新js模块，若失败，则live reload刷新浏览器代替热更新（若模块未配置热更新，则同样live reload）

## webpack优化

1. 优化开发体验--提升开发效率

	(1) 优化构建速度
    
    (2) 优化使用体验
    
2. 优化输出质量

优化输出质量的目的是为用户呈现体验更好的网页，例如减少首屏加载时间、提升性能流畅度等


** 4.1 缩小文件的搜索范围 **

1.优化loader配置
```
module.exprots = {
	module:{
    	rules: [
        	{
            	//如果项目源码中只有js文件，就不要写成/\.jsx?$/,以提升正则表达式的性能
                test：/\.js$/,
                //babel-loader支持缓存转换出借故偶，通过cacheDirectory选项开启
                use:['babel-loader?cacheDirectory'],
                //只对项目根目录下的src目录的文件采用babel-loader
                include:path.resolve(__dirname, 'src'),
            }
        ]
    }
}
```
2.优化resolve.modules配置
```
module.exports = {
	resolve: {
    	//使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
        //其中，__dirname表示当前工作目录，也就是项目根目录
        modules:[path.resolve(__dirname, 'node_modules')]
    }
}
```
3.优化resolve.mainFields配置
```
module.exports = {
	resolve:{
    	//只采用main字段作为入口于文件的描述字段，以减少搜索步骤
        mainFields:['main']
    }
}
```
4.优化resolve.alias配置
```
module.exports = {
	resolve: {
    	//使用alias将导入react的语句替换成直接使用单独、完整的react.min.js文件
        //减少耗时的递归解析操作
        alias:{
        	'react':path.resolve(__dirname, './node_module/react/dist/react.min.js')
        }
    }
}
```
5.优化resolve.extensionos配置
```
module.exports = {
	resolve: {
    	//尽可能减少后缀尝试的可能性
        extensioons: ['js']
    }
}
```
6.优化module.noParse配置
```
const path = require('path');
module.exports = {
	module: {
    	//单独、完整的'react.min.js'文件没有采用模块化，忽略对react.min.js文件的递归解析处理
        noParse:[/react\.min\.js$/],
    }
}
```
** 4.2使用DLLPlugin**

用过window系统的人应该会经常看到.dll为后缀的文件，这些文件叫做动态链接库，在一个动态链接库中可以包含为其他模块调用的函数和数据

1.将网页依赖的基础模块抽离出来，打包到一个个单独的动态链接库中。在一个动态链接库中可以包含多个模块

2.当需要导入的模块存在于某个动态链接库中，这个模块不能被再次打包，而是去动态链接库中获取。

3.页面依赖的所有动态链接库都需要被加载 

为什么Web项目构建接入动态链接库的思想后，会打打提升构建速度？原因在于，包含大量复用模块的动态链接库只需要被编译一次，在之后构建过程中被动态里阿杰库包含的模块将不会重新编译，而是直接使用动态链接库的代码。由于动态链接库中大多数包含的是常用的第三方模块。例如react/react-dom所以只要不升级这些模块的版本，动态链接库就不需要重新。

** 4.3 使用HappyPack **

> 从webpack4发表之后，happypack已经不维护了，退出历史舞台了，有新的thread-loader代替。另外，如果你只是单纯地想加快编译打包速度的话，不如上dllplugin，这个比thread-loader快。

由于JavaScript是单线程模型，所以想要发回去多核CPU的功能，就只能通过多进程实现，而无法通过多线程实现。

在整个webpack构建流程中，最耗时的流程可能就是Loader对文件的转换操作了，因为要转换的文件数据量巨大，而且这些转换操作都只能一个一个的处理。HappyPack的核心原理就是将这部分任务分解到多个进程中并行处理，从而减少总的构建时间。

** 4.4使用ParallelUglifyPluugin **

多进程并行处理的思想引入到压缩代码中

---

优化使用体验

---
** 4.5使用自动刷新 **

自动刷新的原理

1. 借助浏览器扩展去通过浏览器提供的接口刷新，WebStorm IDE的liveEdit功能就是这样实现的
2. 向要开发的网页注入代理客户端代码，通过代理客户端去刷新整个页面。
3. 将要开发的网页装进一个iframe中，通过刷新iframe去看到最新效果

DevServer支持第二，第三种方法；第二种是DevServer默认采用的刷新方法

** 4.6开启模块的热替换 **

---

优化输出质量

---

** 4.7区分环境 **

```
if(process.env.NODE_ENV === 'production') {
	console.log('线上环境')
} else {
	console.log('开发环境')
}
```

** 4.8代码压缩 **

** 4.9 CDN加速 **
```
// cdn链接--其中一CND优化
const cdn = {
    // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
    externals: {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter'
    },
    // cdn的css链接
    css: [],
    // cdn的js链接
    js: [
        'https://cdn.staticfile.org/vue/2.6.10/vue.min.js',
        'https://cdn.staticfile.org/vuex/3.0.1/vuex.min.js',
        'https://cdn.staticfile.org/vue-router/3.0.3/vue-router.min.js'
    ]
}
```
** 4.10 Tree Shaking **

** 4.11 提取公共代码 **

** 4.12 按需加载 **

** 4.13 使用Prepack **

前面优化方法提到了代码压缩和分块，这些都是在网络加载层面的优化，除此之外，还可以优化代码在运行时的效率，Prepack就是为此而生

** 4.15 输出分析 **