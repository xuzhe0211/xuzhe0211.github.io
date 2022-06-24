---
autoGroup-9: 自动化测试
title: Jest测试入门
---

## 什么是Jest
Jest是Facebook的一套开源的JavaScript测试框架，它自动集成了断言、JSDom、覆盖了报告等开发者所需要的所有测试工具，是一款几乎零配置的测试框架。并且它对同样是Facebook的开源框架React的测试十分友好

## 安装
1. 初始化前端项目生成package.json
  ```
  npm init -y
  ```
2. 安装jest及相关依赖
  ```
  npm install -D jest babel-jest bable-core babel-preset-env regenerator-runtime
  ```
  babel-jest、 babel-core、 regenerator-runtime、babel-preset-env这几个依赖是为了让我们可以使用ES6的语法特性进行单元测试，ES6提供的 import 来导入模块的方式，Jest本身是不支持的。

3. 添加.babelrc文件
  ```js
  {
    "presets": ["env"]
  }
  ```
4. 修改package.json中的test脚本
  ```
  "scripts": {
    "test": "jest"
  }
  ```
## 编写第一个Jest测试
创建src和test目录及相关文件

- 在项目根目录下创建src目录，并在src目录下添加functions.js文件
- 在项目根目录下创建test目录，并在test目录下创建functions.test.js文件

Jest会自动找到项目中所有使用.spec.js或.test。js文件命名的测试文件并执行，通常我们在编写测试文件时遵循的命名规范：**测试文件的文件名 = 被测试摸摸名 + .test.js**，例如呗测试模块为functions.js，那么对应的测试文件名为functions.test.js

**在src/functions.js创建被测试的模块**
```
export default {
  sum(a, b) {
    return a + b;
  }
}
```

**在test/functions.test.js中创建测试用例**
```
import functions from '../src/functions.js'

test('sum(2 + 2) 等于 4', () => {
  expect(sum(2, 2)).toBe(4);
})
```

**运行 npm run test,Jest会在控制台打印出一下信息**
```
 PASS  test/functions.test.js
  √ sum(2 + 2) 等于 4 (7ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        4.8s
```

## 常用的几个Jest断言
上面测试用例中的expect(functions.num(2, 2).toBe(4))为一句断言，Jest为我们提供了expect函数用来包装被测试的方法并返回一个对象，该对象中包含一系列的匹配器来让我们更方便的进行断言，上面的toBe函数即为一个匹配器。我们来介绍几种常用的Jest断言，其中会涉及多个匹配器

1. .not
  ```
  // functions.test.js
  import funcitions from '../src/functions';

  test('sum(2, 4) 不等于 5', () => {
    expect(functions.sum(2, 2).not.toBe(5))
  })
  ```
  .not修饰符允许你测试结果不等于某个值的情况，这和英语的语法几乎完全一样，很好理解
2. toEqual()
  ```
  // functions.js
  export default {
    getAuthor() {
      return {
        name: 'LITANGHUI',
        age: 24
      }
    }
  }
  // functions.test.js
  import functions from '../src/functions';

  test('getAuthor()返回对象深度相等', () => {
    
  })
  ```

## 资料
[原文档](https://www.jianshu.com/p/70a4f026a0f1)

[Jest官网](https://www.jestjs.cn/docs/getting-started)