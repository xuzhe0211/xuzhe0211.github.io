---
autoGroup-12: 工程化知识卡片
title:  webpack5模块联邦实战
---
## 前言
webpack的模块联邦原理与import相似，也是做成了预留的promise坑位，通过webpackjson加载,获取变成发请求获取而已

## 安装
1. webpack最新做了个init脚手架，首先安装一下包
    ```node
    yarn add @webpack-cli/init webpack-cli webpack webpack-dev-server -D
    ```
2. 初始化脚手架
    ```
    npx webpack-cli init
    ```
    <span style="color: red">注意：如果总是提示你找不到webpack，但你已经安装，很可能是因为你没有装webpack-cli</span>
3. 经过一列选项即使生成项目
4. 编写脚本
    ```json
    "start": "webpack serve",
    "build": "webpack
    ```
我一开始以为start是webpack-dev-server，现在是webpack serve启动，且webpack-dev-server无法独立启动并且必须安装

我们摸你2个团队，团队A开发组件部署到线上给团队B使用，团队B使用远程组件

## TeamA
- 首先做teamA的设置，新建webpack.config.js
    ```javascript
    const path = require('path');
    const webpack = require('webpack');
    const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.export = {
        module: 'development',
        entry: './src/index.ts',
        output: {
            publicPath: 'http://localhost: 3000', // 部署后的资源地址
        },
        experiments: {
            topLevelAwait: true, // 实验性质顶级作用域允许await
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new HtmlWepackPlugin({
                template: 'index.html'
            }),
            /**
             * name string 比传值，即输出的模块名，被远程引用时路径为${name}/${expose}
             * library object 声明全局变量的方式 name为umd的name
             * filename	string	构建输出的文件名
             * remotes	object	远程引用的应用名及其别名的映射，使用时以key值作为name
             * exposes	object	被远程引用时可暴露的资源路径及其别名
             * shared	object	与其他应用之间可以共享的第三方依赖，使你的代码中不用重复加载同一份依赖
            */
            new ModuleFederationPlugin({
                filename: 'teamA.js',
                name: 'teamA',
                exposes: {
                    './componentA': './src/componentA', // 这个键名是拿到teamA.js后用o函数获取的位置,因为远程调用是import(teamA/xxx, 切了路径所以是个路径)
                    './componentB': './src/componentB'
                }
            })
        ],
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    loader: 'ts-loader',
                    include: [path.resolve(__dirname, 'src')],
                    exclude: [/node_module/]
                },
                {
                    test: /.(less|css)$/,

                    use: [
                        {
                            loader: "style-loader",
                        },
                        {
                            loader: "css-loader",

                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: "less-loader",

                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                },
            ]
        },
        resolve: {
		    extensions: [".tsx", ".ts", ".js"],
        },
        devServer: {
            open: true,
            host: "localhost",
            port: 3000, //本地调试
        }
    }
    ```
- 我们会导出2个组件，componentA与componentB,自己对应位置新建a和b
    ```javascript
    function AAA() {
        console.log("i am componentA");
    }
    export default AAA;
    
    function BBB() {
        console.log("i am componentB");
    }
    export default BBB;
    ```
- teamA部分完成,启动teamA项目

## teamB
- 同理，teamB也编写webpack.config.js
    ```javascript
    const path = require("path");
    const webpack = require("webpack");
    const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
    const HtmlWebpackPlugin = require("html-webpack-plugin");

    module.exports = {
        mode: "development",
        entry: "./src/index.ts",
        output: {
            publicPath: "http://localhost:3001/", //部署后的资源地址
        },
        devServer: {
            open: true,
            host: "localhost",
            port: 3001, //本地调试
        },
        experiments: {
            topLevelAwait: true, // 试验性质顶级作用域允许await
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new HtmlWebpackPlugin({
                template: "index.html",
            }),
            // name	string	必传值，即输出的模块名，被远程引用时路径为${name}/${expose}
            // library	object	声明全局变量的方式，name为umd的name
            // filename	string	构建输出的文件名
            // remotes	object	远程引用的应用名及其别名的映射，使用时以key值作为name
            // exposes	object	被远程引用时可暴露的资源路径及其别名
            // shared	object	与其他应用之间可以共享的第三方依赖，使你的代码中不用重复加载同一份依赖
            new ModuleFederationPlugin({
                filename: "teamB.js",
                name: "teamB",
                remotes: {
                    teamA: "teamA@http://localhost:3000/teamA.js",
                },
            }),
        ],

        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    loader: "ts-loader",
                    include: [path.resolve(__dirname, "src")],
                    exclude: [/node_modules/],
                },
                {
                    test: /.(less|css)$/,

                    use: [
                        {
                            loader: "style-loader",
                        },
                        {
                            loader: "css-loader",

                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: "less-loader",

                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                },
            ],
        },

        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },
    };
    ```
- 我们使用remote加载teamA的资源
- 在teamB的index中，使用webpackimport导入
    ```javascript
    import('teamA/componentA').then(res => {
        const componentA = res.default;
        componentA();
    })

    import('teamA/componentB').then(res => {
        const componentB = res.default;
        componentA();
    })
    ```
- 即可在teamB中获取到teamA的资源



## 资料
[webpack5模块联邦实战](https://blog.csdn.net/yehuozhili/article/details/114390848)