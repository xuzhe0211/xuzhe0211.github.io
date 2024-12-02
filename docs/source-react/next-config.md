---
autoGroup-4: Next
title: next.config.js 重点解读
---
## 用处
它用于Next构建阶段，不作用于浏览器。文章配置文档使用更加[文档](https://nextjs.org/docs/pages/api-reference/next-config-js)

## phase 
phase 值是当前构建阶段。包含一下阶段
```js
PHASE_EXPORT = 'phase-export'
PHASE_PRODUCTION_BUILD = 'phase-production-build'
PHASE_PRODUCTION_SERVER = 'phase-production-server'
PHASE_DEVELOPMENT_SERVER = 'phase-development-server'
```
## 添加环境变量
添加
```js
env: {
    customKey: 'my-value'
}
```
使用：process.env.customKey

## 拓展名支持
```js
pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx']
```
## CDN前缀支持
```js
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  // Use the CDN in production and localhost for development.
  assetPrefix: isProd ? 'https://cdn.mydomain.com' : '',
}
```
发布静态资源(一般位于stataic目录下)，则可以像这样使用
```js
import getConfig from 'next/config';
const {publicRuntimeConfig} = getConfig();
<link
    rel="stylesheet"
    type="text/css
    href={`${publicRuntimeConfig.assetPrefix}/_next/static/your_static_file.css`}
/>
```
## 使用webpack
例如，你可以使用 url-loader 或 file-loader来优化图片文件
```js
webpack(config, options) {
      // const {isServer} = options
      nextConfig = Object.assign({inlineImageLimit: 0, assetPrefix: ''}, nextConfig)
      config.module.rules.push({
        test: /\.(jpe?g|png|svg|gif|ico|webp|jp2)$/,
        exclude: nextConfig.exclude,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: nextConfig.inlineImageLimit,
              fallback: require.resolve('file-loader'),
              publicPath: `${nextConfig.assetPrefix}/_next/static/assets/`,
              outputPath: `static/assets/`,
              name: '[name]-[hash:base64:5].[ext]',
              esModule: nextConfig.esModule || false,
            },
          },
        ],
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
```
## 静态优化指标
关闭:
```js
devIndicators: {
  autoPrerender: false
}
```
## 禁止etag生成
```js
generateEtags: false
```
## 禁止x-powered-by
x-powered-by用于告知网站是用何种语言或者框架编写的
```js
poweredByHeader: false
```

## 运行时配置
publicRuntimeConfi 浏览器和服务器均可访问，serverRuntimeConfig 仅仅服务器可以访问。配置方式
```js
module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },
}
```
访问方式：
```js
import getConfig from 'next/config';
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
```
如何根据dev,prod, test 不同环境配置不同变量,一种方式如下：

1. 通过process.env.DEPLOY_ENV获取当前的运行环境，以加载不同的配置文件

    ```js
    |--config
    |----|--dev.js
    |----|--test.js
    |----|--prod.js
    |----|--index.js


    // index.js
    const env = process.env.DEPLOY_ENV || 'dev';
    const config = require(`./${env}`);
    ```
2. 在publicRunConfig进行配置

    ```js
    // next.config.js
    const config = require('./config')
    publicRuntimeConfig: {
        config
    }

    ```
## 自定义打包输出文件
```js
distDir: 'build'
```
## 自定义路由
通常不需要自定义路由
```js
module.exports = {
  exportPathMap: async function(
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
    }
  },
}
```
## next-compose-plugins
作为一种更简洁的方式管理next插件，[文档](https://www.npmjs.com/package/next-compose-plugins)它的整体结构应该如下

```js
// vue.config.js
const withPlugins = require('next-compose-plugins');

const nextConfig = {
    distDir: 'build',
    webpack: (config, options) => {
        return config;
    }
}

module.exports = withPlugins([
    // add plugins here...
], nextConfig)
```

[example](https://www.npmjs.com/package/next-compose-plugins#examples)