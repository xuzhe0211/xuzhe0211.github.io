---
autoGroup-6: 前端模块化
title: ESModule import
---
静态import语句用于导入由另一个模块导出的绑定。无论是否声明了strict mode,导入的模块都运行在严格模式下。在浏览器中，import语句只能在声明了type="module"的script的标签中使用

此外，还有一个类似函数的动态import()，它不需要依赖type="module"的script标签。

在script标签中使用nomodule属性，可以确保向后兼容。

在您希望按照一定的条件或者按需加载模块的时候，动态import()是非常有用的。而静态型的import是初始化加载依赖项的最优选择，使用静态import更容易从代码静态分析工具和tree shaking中收益

```js
import defaultExport from 'module-name';
import * as name from 'module-name';
import { export } from 'module-name';
import { export as alias } from 'module-name';
import { export1, export2 } from 'module-name';
import { foo, bar } from 'module-name/path/to/specific/un-exported/file';
import { export1, export2 as alias2, [...] } from 'module-name';
import defaultExport, { export [ , [...]] } from 'module-name';
import defaultExport, * as name from 'module-name';
import 'module-name';
var promise = import('module-name'); // 这是一个处于第三阶段的提案
```

- defaultExport

    导入模块的默认导出接口引用名

- module-name

    要导入的模块。通常是包含目标模块的.js文件的相对或绝对路径名，可以不包含.js扩展名。某些特定的打包工具可能允许或需要使用扩展或依赖文件，他会检查比对你的运行环境。只允许单引号和双引号的字符串

- name

    导入模块的对象整体的别名，在引入导入模块时，它将作为一个命名空间来使用

- export, exportN

    被导入模块的导出接口的名称

- alias, aliasN

    将引用指定的导入的名称

## 描述
name参数是"导入模块对象"的名称,它将用一种名称空间来引用导入模块的接口。export参数指定单个的命令导出,而import * as name语法导入所有导出接口，即导入模块整体。以下示例阐明该语法。


## 文档
[MDN imports](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)
