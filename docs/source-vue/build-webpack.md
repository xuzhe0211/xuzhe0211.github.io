---
autoGroup-10: 打包
title: vue.config中configureWebpack 与 chainWebpack区别
---
<span style="color: red;font-weight:bold">configureWebpack和chainWebpack的作用相同，唯一的的区别就是他们修改webpack配置的方式不同</span>
- configureWebpack 通过操作对象的形式,来修改默认的webpack配置，该对象将会被webpack-merge合并入最终的webpack配置
- chainWebpack 通过链式编程，来修改默认的webpack配置

## configureWebpack
- <span style="color: blue">如果这个值是一个对象，则会通过webpack-merge合并到最终的配置中</span>
- <span style="color: blue">如果这个值是一个函数,则会接收被解析的配置作为参数。该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本</span>

:::tip
- 如果你需要基于环境有条件的配置行为，或者想要直接修改配置，那就换成一个函数(该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会接收已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象
- configureWebpack不支持vue cli的语法糖或者说不支持链式编程配置形式。只能通过操作对象的形式，来修改webpack配置
:::

下面来看一下configureWebpack配置方式
- 1.1 configureWebpack对象形式

    ```js
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'configs': '@/configs',
                'views': '@/views',
                'plugins': '@/plugins',
            }
        }
    }
    ```
- 1.2 configureWebpack 函数形式

    ```js
    const path = require('path');
    function resolve(dir) {
        return path.join(__dirname, dir);
    }

    module.exports = {
        devServer: {
            //...
        },
        lintOnSave: false, // eslint-loader 是否保存的时候检查
        productionSourceMap: false, // 生产环境是否生成sourceMap文件
        filenameHashing: true, // 文件hash
        configureWebpack: config => {
            if(isProduction) {
                // ...
            } else {
                // ...
            }
            // 直接修改配置
            config.resolve.alias['@asset'] = resolve('src/assets')
        }
    }
    ```
    或者
    ```js
    const path = require('path');
    function resolve (dir) {
        return path.join(__dirname, dir)
        }

        module.exports = {
        devServer: {
            ...
        }, 
        lintOnSave: false, // eslint-loader 是否在保存的时候检查
        productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
        filenameHashing: true, //文件hash
        configureWebpack: config => {
            if (isProduction) {
            ...
            } else {
            ...
            }
            //返回一个将要合并的对象
            return {
                resolve: {
                    alias: {
                    '@asset':resolve('src/assets')
                    }
                }
            } 
        }
    }
    ```
    最好不要使用下面的方式，因为Object.assign方法在合并对象时，如果目标对象(config)上有相同的属性(resolve)，将会被覆盖掉.不过这样写Object.assign(config.resolve, {alias: {}}) 还是可以的，只是覆盖掉了alias
    ```js
    Object.assign(config, {
        resolve: {
            alias: {
            '@': resolve('./src'),
            '@assets': resolve('./src/assets')
            }
        }
    })
    ```
    合并后，变成
    ```js
    alias: {
        '@': resolve('./src'),
        '@assets': resolve('./src/assets')
    }
    ```
## chainWebpack
:::tip
Vue CLI内部的webpack配置是通过webpack-chain维护的。这个库提供了一个webpack原始配置的上层抽象，使其可以定义具名的loader规则和具名插件，并有机会在后期进入这些规则并对他们的选项进行修改
:::
### 官方示例
```js
config
    .plugin(name)
    .use(WebpackPlugin, args)
```
- 参数说明
    - name是webpack-chain里的key，就是要加入的插件在webpack-chain配置里的key,就是我们自定义插件的名称，一般我们都保持跟插件名称一样
    - WebpackPlugin使用的webpack插件名，在这里，可以直接使用插件，无需进行实例化，就是不需要new WebpackPlugin();
    - args插件的参数信息。特别注意，args是一个数组，例如[{}, {}]这种方式，可以配置多个插件示例

### 具体例子
```js
module.exports = config => {
    // set svg-sprite-loader
    config.module
        .rule('svg')
        .uses.clear() // 先删除原有的默认svg rule，写法1
        // .exclude.add(resolve('src/assets/icons')) // 写法2 针对svg默认规则 忽略src/assets/icons
        .end();
    config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('./../src/assets/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
            symbolId: 'icon-[name]',
        })
        .end()
    // 开启happyPack多线程打包
    config.pulgin('HappyPack').use(HappyPack, [
        {
            loader: [
                {
                    loader: 'babel-loader?cacheDirectory=true'
                }
            ]
        }
    ])
}
```
### 使用示例
使用HappyPack开启多线程打包:这里可以写在configureWebpack 也可以写在chainWebpack里面
1. configureWebpack

    ```js
    module.exports = {
        configureWebpack: config=>{
            config.plugin=[
                new HappyPack({
                    loaders:[
                    {
                        loader: 'babel-loader?cacheDirectory=true',
                    }
                ]
                })
            ]
        }
    } 
    ```
2. chainWebpack

    ```js
    //开启happyPack多线程打包
    config.plugin('HappyPack').use(HappyPack, [
        {
            loaders: [
                {
                    loader: 'babel-loader?cacheDirectory=true',
                },
            ],
        },
    ])
    ```
<span style="color: red">可以看到使用chainWebpack链式写法会简洁很多，不需要new，相当于一个语法糖吧</span>

## 一些常用的webpack-chain 缩写方法
ChainedMap的有一些key，可以直接作为方法调用，这些缩写方法也同样会返回原始实例，方便后续的链式调用
```js
devServer.hot(true);
devServer.set('hot', true)
```
- .end()通过.end()可以返回到更高层级的上下文，但是仅向上一个层级，并且返回一个mutate后的实例。或者是直接通过config是获取的顶级上下文
- .entry() 是webpack中 config.entryPoints.get()的缩写。可以通过config.entry(name).add(value)的.entry()缩写方法配置，也可以通过config.entryPoints.get(name).add(value)配置。
- .add() 这是一个ChainedSet方法，它可以将值添加在Set的尾部。
- output这是一个ChainedMap对象，有很多方法，例如path()，filename()，publicPath()等常用的方法。
- module 也是一个ChinedMap，主要方法为rules(),配置loader的规则，config.module.rule(name).use(name).loader(loader).options(options)，或者config.module.rule(name).use(name).tap(options => newOptions)
- plugin 也是ChinedMap，主要是对plugin配置，config.plugin(name).use(WebpackPlugin, args)。重点对plugin做深入学习。

## 引入webpack-chain后如何配置plugin
- 新增插件 adding
- 修改参数 modify arguments
- 修改实例 modify instantiation
- 移除插件 removing
- 某个插件前调用插件odering before
- 某个插件后调用插件ordering after

1. 新增插件

    ```js
    config
        .plugin(name)
        .use(WebpackPlugin, args)
    // 直接引入
    config
        .plugin('hot')
        .use(webpack.HotModuleReplacementPlugin);
    // 也可以通过require（‘’）方式引入插件
    config
        .plugin('env')
         .use(require.resolve('webpack/lib/EnvironmentPlugin'), [{ 'VAR': false }]);
    ```
2. 修改参数

    ```js
    config
        .plugin(name)
        .tap(args => newArgs)
    // 为arguments新增一个‘SECRET_KEY’
    config
        .plugin('env')
        .tap(args => [...args, 'SECRET_KEY'])
    // 修改实例
    config
        .plugin(name)
        .init((Plugin, args) => new Plugin(...args))
    ```
2. 删除插件

    ```js
    config.plugins.delete(name)
    ```
3. 某个插件前调用插件odering before(不能在同一个插件上既使用before又使用after)

    ```js
    config
        .plugin(name)
        .before(otherName)
    // 例子
    config
        .plugin('html-template')
        .use(HtmlWebpackTemplate)
        .end()
        .plugin('script-ext')
        .use(ScriptExtWebpackPlugin)
        .before('html-template')
    ```
4. 某个插件后调用插件ordering after(不能在同一个插件上既使用before又使用after)

    ```js
    config
    .plugin(name)
      .after(otherName)
    // 例子
    config
        .plugin('html-template')
        .use(HtmlWebpackTemplate)
        .after('script-ext')
        .end()
        .plugin('script-ext')
        .use(ScriptExtWebpackPlugin)
    ```


## 资料
[vue.config中configureWebpack 与 chainWebpack区别](https://www.jianshu.com/p/27d82d98a041)