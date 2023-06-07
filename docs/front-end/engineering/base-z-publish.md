---
autoGroup-0: 基础
title: npm 发包技巧
---
写好包之后，如何发布呢？大部分会直接运行下面命令
```js
$ npm publish
```
太简单粗暴了，而且容易出问题，因为你可能不知道道理那些文件被打包进去了，所以建议大家在发包之前，务必先运行下面的语句查看那些文件被包含进去了
```js
$ npm publish --dry-run
npm notice 
npm notice 📦  package_name@1.0.0
npm notice === Tarball Contents === 
npm notice 1.1kB index.js    
npm notice 327B  package.json
npm notice 719B  index.d.ts  
npm notice === Tarball Details === 
npm notice name:          package_name                     
npm notice version:       1.0.0                                   
npm notice package size:  935 B                                   
npm notice unpacked size: 2.1 kB                                  
npm notice shasum:        4227f6f34876ef071f2127df369e681d
npm notice integrity:     sha512-ug/t3R8zCB+PbkU70XhGA==
npm notice total files:   3      
```
如果觉得命令行不直观，也可以用下面的语句直接打包成.tgz文件
```js
$ npm pack
```
<span style="color: red">注意该命令并不会发布到服务器，只会生成本地压缩包，所以可以放心使用</span>

其实大部分的工程项目，在发包的时候，不是直接把源代码上传就好了的，例如源文件一般在lib或src目录下，但生成的文件一般在dist或build目录下，<span style="color: orange">而我们会把这个构建目录在.gitignore中给忽略掉，导致发包之后也看不到，这是不对的</span>。那怎么办呢？此时有两种办法

- <span style="color: red">增加**.npmignore**文件，把忽略的文件写在这里，因为默认情况下，npm打包会根据.gitignore来忽略文件，如果发现.npmignore的话，则会使用这个文件</span>
- <span style="color: red">在package.json中增加files数组，把需要打包的文件写在这里，那么npm打包的时候只会按照你列出来的规则添加文件。它的优先级高于.npmignore和.gitignore，且支持通配符</span>

有时候，我们只想把dist木嘛生成的文件打包上传，并不像提供元代吗，因为源代码会增加下载体积；或者我们用TypeScript写的，发包的时候只发编译过的Javascript文件和d.ts文件。<span style="color: red">此时只需要把packge.json拷贝一份到dist目录，然后在该目录下运行npm publish即可。为了防止搞混且误提交，可以在源代码中的package.json添加private:true 字段，而在dist的package.json中去掉该字段</span>

## 自动修改发包版本号
```js
$ npm version patch/minor/major
```

## 判断npm 是否登录
```js
npm whoami
```


## 资料
[npm 发包技巧](https://juejin.cn/post/6988409950104092709)