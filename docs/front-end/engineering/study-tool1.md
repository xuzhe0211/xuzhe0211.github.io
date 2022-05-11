---
autoGroup-1: 公开课
title: 构建工具第一天-前端构建工具深度剖析01
---

第一天：Babel与weppack原理剖析

第二天:ESModule与Vite原理剖析

第三天：Rollup原理剖析

分层学习法

// ES5 不支持ESM=== type="module"


// 分号编译过程中可以自动加
// 分析依赖度大小 插件 vscode

**能力提高 --- 刻意练习**

```js
// TODO index.js import谁
const fs = require('fs');
const path = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

function getModuleInfo(file) {
    // 读取文件
    const body = fs.readFileSync(file, 'utf-8');

    // 文本 => 对象 正则
    // 抽象过程，去掉分隔符，用对象表示 => AST
    // 分析
    const ast = parser.parse(body, {
        sourceType: 'module'
    })
    console.log('ast', ast);

    // 如何分析-- 节点遍历
    // ast --对象 {a: [ a: [], b: {b: 123}]}
    const deps = {};
    traverse(ast, {
        // 访问者模式  访问所有的import
        ImportDeclaration({node}) {
            // 遇到import
            const dirname = path.dirname(file);
            const asbpath = '.' + path.join(dirname, node.source.value);
            deps[node.source.value] = asbpath;
        }
    })

    // ES6 -> ES5
    COSNNT {code} = babel.transformFromAst(ast, null, {
        presets: ['@babel/preset-env']
    }) 

    cosnt moduleInfo = {
        file,
        deps, 
        code
    }
    return moduleInfo;
}
/**
 cosnt info = getModuleInfo('./src/index.js');

console.log(info); 
*/

// 递归分析

function parseModule(file) {
    const entry = getMoudleInfo(file);
    const temp = [entry];
    cosnt depsGraph = {};

    getDeps(temp, entry);

    // 组成大的依赖树
    temp.forEach(info => {
        depsGraph[info.file] = {
            deps: info.deps, 
            code: info.code
        }
    })

    return depsGraph;
}

function getDeps(temp, {deps}) {
    // deps = {add, b, c}
    Object.keys(deps).forEach(key => {
        const child = getModuleInfo(deps[key]);
        temp.push[chid];
        getDeps(temp, child);
    })
}

<!-- const deps = parseModule('./src/index.js');
console.log(deps); -->

function bundle(file) {
    const depsGraph = JSON.stringify(parseModule(file));
    return `(function(graph) {
        function require(file) {
            function absRequire(relPath) {
                return require(graph[file].deps[relPath]);
            }
            var exports = {};
            (function (require, exports, code) {
                eval(code);
            })(absRequire, exports, graph[file].code);
            return exports;
        }
        require(`${file}`);
    })(${depsGraph})`
}
const content = bundle('./index.js')
!fs.existsSync('./dist') && fs.mkdirSync('./dist');
fs.writeFileSync('./dist/boundle.js', content);
```