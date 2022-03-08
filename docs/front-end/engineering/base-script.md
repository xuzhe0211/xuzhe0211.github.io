---
autoGroup-0: 基础
title: npm scripts 使用方案
---

## 提出问题
一个项目中package.json中是这样的
```
"scripts": {
  "serve": "vue-cli-service serve",
  "build": "vue-cli-service build && rm -fr ./dist/js/*.map",
  "build:report": "vue-cli-service build  --report",
  "build:testdev": "vue-cli-service build --mode testdev --dest /opt/ks/containers/nginx/www/dist",
  "docker": "docker build .",
  "test:unit": "vue-cli-service test:unit",
  "test:e2e": "vue-cli-service test:e2e",
  "lint": "vue-cli-service lint",
  "prepare": "husky install",
  "precommit": "lint-staged"
},
```
--dest 打包到设置的文件路径(打包之后不包含dist目录)，这样一个引出的 npm scripts的相关问题

## 什么是npm脚本
npm允许在package.json文件里面，使用scripts字段定义脚本命令
```
{
  // ...
  "scripts": {
    "build": "node build.js"
  }
}
```
上面的代码是package.json文件的一个片段，里面的scripts字段是一个对象。它的每一个属性,对应一段脚本。比如，build命令对应的脚本就是node build.js

命令行下使用npm run命令，就可以执行这段脚本。

```
$ npm run build
# 等同于
$ node build.js
```

这些定义在package.json里面的脚本，就称为npm脚本。它的有点很多。
- 项目的相关脚本，可以集中在一个地方。
- 不同项目的脚本命令,只要功能相同，就可以有同样的对外接口。用户不需要知道怎么测试你的项目，只要运行 npm run test即可
- 可以利用npm提供的很多辅助功能

查看当前项目的所有npm脚本命令，可以使用不戴任何参数的npm run命令
```
npm run
```

## 原理
npm脚本的原理非常简单，每当执行npm run,就会自动新建一个shell，在这个shell里面执行指定的命令。因此，只要是shell(一般是Bash)可以运行的命令，就可以卸载npm脚本里面

比较特别的是，npm run新建的这个shell，会将当前目录的node_module/.bin子目录加入PATH变量，执行结束后，在讲PATH变量恢复成原样。

这意味着，当前目录的node_module/.bin子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。比如，当前项目的依赖里面有Mocha，只要直接写mocha test就可以了。
```
"test": "mocha test"
```
而不必写成下面这样
```
"test" :"./node_module/.bin/mocha test"
```
由于npm脚本的唯一要求就是可以在Shell执行，因此它不一定是Node脚本，任何可以执行文件都可以写在里面

npm脚本的退出码，也遵守Shell脚本规则。如果退出码不是0,npm默认就认为这个脚本执行失败。

## 通配符
由于npm脚本就是Shell脚本，因此可以使用Shell脚本
```
"lint": "jshint *.js"
"lint": "jshint **/*.js"
```
上面代码中，*表示任意文件名，**表示任意一层子目录。

如果要将通配符传入原始命令，防止被Shell转义，要将星号转义。

```
"test": "tap test/\*.js"
```

## 传参
向npm脚本传入参数，要使用--标明
```
"lint": "jshint **.js"
```
向上面的npm run lint命令传入参数，必须写成下面这样
```
$ npm run lint -- --reporter checkstyle > checkstyle.xml
```
也可以在package.json里面在封装一个命令。
```
"lint": "jshint **.js"
"lint:checkstyle": "npm run lint -- --reporter checkstyle > checkstyle.xml"
```
## 执行顺序
如果npm脚本里面需要执行多个任务，那么需要明确他们的执行顺序

如果是并行执行(即同时的平行执行),可以使用&符号
```
$ npm run script1.js & npm run script2.js
```

如果是继发执行(即只有前一个任务成功，才执行下一个任务)，可以使用&&符号
```
$ npm run script1.js && npm run script2.js
```
这两个符号是Bash的功能。此外，还可以使用node的任务管理模块：[script-runner](https://github.com/paulpflug/script-runner)、[npm-run-all](https://github.com/mysticatea/npm-run-all)、[redrun](https://github.com/coderaiser/redrun)。

## 默认值
一般来说,npm脚本由用户提供。但是，npm对两个脚本提供了默认值。也就说，这两个脚本不用定义，就可以直接使用。
```
"start": "node server.js"，
"install": "node-gyp rebuild"
```
上面代码中，npm run start的默认值是node server.js，前提是项目根目录下有server.js这个脚本；npm run install的默认值是node-gyp rebuild，前提是项目根目录下有binding.gyp文件。

## 钩子
npm 脚本有pre和post两个钩子。举例来说，build脚本命令的钩子就是prebuild和postbuild

```
"prebuild": "echo I run before the build script",
"build": "cross-env NODE_ENV=production webpack",
"postbuild": "echo I run after the build script"
```
用户执行npm run build的时候，会自动按照下面的顺序执行
```
npm run prebuild && npm run build && npm run postbuild
```
因此,可以在这两个钩子里面，完成一些准备工作和清理工作。下面是一个例子
```
"clean": "rimraf ./dist && mkdir dist",
"prebuild": "npm run clean",
"build": "cross-env NODE_ENV=production webpack"
```
npm 默认提供下面这些钩子
```
prepublish，postpublish
preinstall，postinstall
preuninstall，postuninstall
preversion，postversion
pretest，posttest
prestop，poststop
prestart，poststart
prerestart，postrestart
```
自定义的脚本命令也可以加上pre和post钩子。比如，myscript这个脚本命令，也有premyscript和postmyscript钩子。不过，双重的pre和post无效，比如prepretest和postposttest是无效的。

npm提供了一个npm_lifecycle_event变量，返回当前正在运行的脚本名称，比如pretest、test、posttest等等。所以，可以利用这个变量，在同一个脚本文件里面，为不同的npm script命令编写代码。请看下面的例子
```
const TARGET = process.env.npm_lifecycle_event;
if (TARGET === 'test') {
  console.log('Running the test task!')
}
if (TARGET === 'pretest') {
  cosnole.log('Running the pretest task!')
}
if (TARGET === 'posttest') {
  console.log('Running the posttest task!')
}
```
:::danger
注意，prepublish这个钩子不仅不会npm publish命令之前运行，还会在npm install(不带任何参数)命令之前运行。这种行为很容易让用户感到困惑，所以npm4引入了一个新的钩子prepare，行为等同于prepublish，而从npm5开始，prepublish将只会在npm publish命令之前运行。
:::

## 简写形式
四个常用的npm脚本有简写形式
- npm start是npm run start
- npm stop是npm run stop 
- npm test 是npm run test
- npm restart是npm run stop && npm run restart && npm run start 的简写

npm start、npm stop和npm restart都比较好理解，而npm restart是一个符合命令，实际上会执行三个脚本命令:stop、restart、start。具体执行顺序如下。
```
prerestart
prestop
stop
poststop
restart
prestart
start
poststart
postrestart
```

## 变量
npm 脚本有一个非常强大的功能，就是可以使用npm的内部变量.

首先，通过npm_package_前缀，npm脚本可以拿到package.json里面的字段。比如下面这个package.json
```
{
  "name": "foo",
  "version": "1.2.5",
  "scripts": {
    "view": "node view.js"
  }
}
```
那么,变量npm_package_name返回foo，变量npm_package_version返回1.2.5
```
// view.js
console.log(process.env.npm_package_name); // foo
console.log(process.env.npm_package_version) // 1.2.5
```
上面代码中，我们通过环境变量process.env对象，拿到package.json的字段值。如果是Bash脚本，可以使用$npm_package_name和$npm_package_version取到这两个值。

npm_package_前缀也支持嵌套的package.json字段
```
"repository": {
  "type": "git",
  "url": "xxx"
},
scripts: {
  "view": "echo $npm_package_repository_type"
}
```
上面代码中，repository字段的type属性，可以通过npm_package_repository_type收到

下面是另外一个例子
```
"scripts": {
  "install": "foo.js"
}
```
上面代码中，nppm_package_scripts_install变量的值等于foo.js

然后，npm脚本还可以通过npm_config_前缀，拿到npm的配置变量，即npm config get xxx命令返回的值。比如，当前模块的发行标签，可以通过npm_config_tag取到
```
"view": "echo $npm_config_tag",
```
注意，package.json里面的config对象，可以被环境变量覆盖。
```
{ 
  "name" : "foo",
  "config" : { "port" : "8080" },
  "scripts" : { "start" : "node server.js" }
}
```
上面代码中，npm_package_config_port变量返回的是8080。这个值可以用下面的方法覆盖。
```
npm config set foo:port 80
```

最后，env命令可以列出所有环境变量。
```
"env":"env"
```
## 常用脚本示例
```
// 删除目录
"clean": "rimraf dist/*"

// 本地搭建一个 HTTP 服务
"serve": "http-server -p 9090 dist/",

// 打开浏览器
"open:dev": "opener http://localhost:9090",

// 实时刷新
 "livereload": "live-reload --port 9091 dist/",

// 构建 HTML 文件
"build:html": "jade index.jade > dist/index.html",

// 只要 CSS 文件有变动，就重新执行构建
"watch:css": "watch 'npm run build:css' assets/styles/",

// 只要 HTML 文件有变动，就重新执行构建
"watch:html": "watch 'npm run build:html' assets/html",

// 部署到 Amazon S3
"deploy:prod": "s3-cli sync ./dist/ s3://example-com/prod-site/",

// 构建 favicon
"build:favicon": "node scripts/favicon.js",
```


## npm run 的其他问题
1. 查看项目中依赖的包的所有版本 npm ls webpack
  ```
  ➜  zhiliao git:(pc_feat_space_setting) npm ls webpack
  zhiliao@0.1.0 /Users/xuzhe/Desktop/ks/zhiliao
  ├─┬ @vue/cli-plugin-babel@4.5.15
  │ └── webpack@4.46.0
  ├─┬ @vue/cli-plugin-eslint@4.5.15
  │ └── webpack@4.46.0  deduped
  ├─┬ @vue/cli-plugin-typescript@4.5.15
  │ └── webpack@4.46.0  deduped
  └─┬ @vue/cli-service@4.5.15
    └── webpack@4.46.0  deduped
  ```
2. npm install 报错

  解决：执行npm install gifsicle@4.0.1 --ignore-scripts

  使用--ignore-scripts,则会让npm避免执行package.json文件中的scripts脚本。而只进行打包
  

## 资料
[npm scripts使用指南](https://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)