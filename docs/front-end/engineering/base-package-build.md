---
autoGroup-0: 基础
title: 打包 JavaScript 库的现代化指南
---
## 输出esm、cjs和umd格式
### 支持全部的生态
<mark>esm是EcmaScript module的缩写</mark>
<mark>cjs是CommonJS module的缩写</mark>
<mark>umd是"Universal Module Definition"的缩写，它可以在&lt;script&gt;标签中执行、被CommonJS模块加载器加载、被AMD模块加载器加载</mark>

esm被认为是未来，但cjs仍然在社区和生态系统中占有重要地位。esm对打包工具来说更容易正确的进行treeshaking，因此对于库来说，拥有这种格式很重要，或许在将来的某一天，你的库只需要输出esm。

<span style="color: red">你可能已经注意到，umd已经与CommonJS模块加载器兼容--所以为什么还要同时具备cjs和umd输出呢？一个原因是，**与umd文件相比，CommonJS文件在对依赖进行条件导入时通常表现更好**；例如</span>

```js
if(process.env.NODE_ENV === 'production') {
    module.exports = require('my-lib.production.js')
} else {
    module.exports = require('my-lib.development.js')
}
```
<span style="color: red">上面的例子，当使用CommonJS模块时，只会引入production或development包中的一个。但是对于UMD模块，最终可能会将两个包全部引入</span>。有关更多信息，请[参考讨论](https://github.com/frehner/modern-guide-to-packaging-js-library/issues/9)

<span style="color: orange">最后还需要注意是，开发者可能会在引用中同时使用cjs和esm，发生双包危险。[dual package hazard](https://nodejs.org/api/packages.html#dual-package-hazard)一文较少了一些缓解该问题的方法，利用package.json#exports进行package exports也可以防止这种情况发生</span>

## 输出多文件

<details>
<summary>通过保留文件结构更好的支持treeshaking</summary>
如果你对你的库使用了打包工具或编译器，可以对其进行配置以保留源文件目录结果。这样可以更容易的对特定文件进行side effects标记，有助于开发者的打包工具进行treeshaking.请参考<a href="https://levelup.gitconnected.com/code-splitting-for-libraries-bundling-for-npm-with-rollup-1-0-2522c7437697">这篇文章</a>

<p>一个例外是，如果你要创建一个不依赖任何打包工具可以直接在浏览器中使用的产出(通常是umd格式，但也可能是现代的esm格式)。在这种情况下，最好让浏览器请求一个大文件，而不是请求多个小文件。此外，你应该进行代码压缩为其创建sourcemap</p>
</details>

## 要不要压缩代码
<details>
<summary>确定你期望的代码压缩程度</summary>
<p>你可以将一些层面的代码压缩应用到你的库中，这取决于你对你的代码最终通过开发者的打包工具后的大小的追求程度。</p>

<p></p>
</details>



## 资料
[打包 JavaScript 库的现代化指南](https://github.com/frehner/modern-guide-to-packaging-js-library/blob/main/README-zh_CN.md)