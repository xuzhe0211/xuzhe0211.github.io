---
autoGroup-13: TypeScript
title: TS开发相关问题
---

## tsconfig.json
```
{
    "compilerOptions": {
        "outDir": "./dist/out-tsc",//输出目录
        "baseUrl": "src",
        "removeComments": true,//编译 js 的时候，删除掉注释
        "target": "esnext", // 编译的目标是什么版本的
        "module": "esnext", // 指定生成哪个模块系统代码
        "strict": true, // 严格模式
        "jsx": "preserve", // 在.tsx文件里支持JSX
        "importHelpers": true, // 从tslib导入辅助工具函数（比如__extends，__rest等）
        "moduleResolution": "node", // 模块的解析 -- 决定如何处理模块。或者是"Node"对于Node.js/io.js，或者是"Classic"（默认）。查看模块解析了解详情。
        "experimentalDecorators": true, // 启用实验性的ES装饰器
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入。这并不影响代码的显示，仅为了类型检查。
        "sourceMap": true, // 是否生成map文件
        "emitDecoratorMetadata": true,//给源码里的装饰器声明加上设计类型元数据。查看issue #2577了解更多信息。
        "baseUrl": ".", // 工作根目录
        "types": [ // 指定引入的类型声明文件，默认是自动引入所有声明文件，一旦指定该选项，则会禁用自动引入，改为只韵如指定的类型声明文件，如果指定空数组[]则不引用任何文件
            "webpack-env",
            "jest",
            "bmapgl",
            "jQuery"
        ],
        "paths": { // 指定模块的路径，和baseUrl有关联，和webpack中resolve.alias配置一样
            "@/*": ["src/*"]
        },
        "lib": [ //编译过程中需要引入的库文件的列表
            "esnext",
            "dom",
            "dom.iterable",
            "scripthost"
        ],
        "noEmitOnError": true,
        "noImplicitAny": true
    },
    // 指定一个匹配列表(属于自动指定该路径下所有ts相关文件)
    "include": [ 
        "src/**/*.ts",
        "src/**/*.tsx",
        "src/**/*.vue",
        "tests/**/*.ts",
        "tests/**/*.tsx"
    ],
    // 指定一个排除列表(include的反向操作)
    "exclude": ["node_modules"],
    // 指定那些文件使用该配置(属于手动一个个指定文件)
    "files": ["demo.ts"]
}
```

- esnext

    esnext是一个Javascrpt库，可以将ES6草案规范语法转成今天的Javascript语法

- include

    指定需要编译的<u>ts</u>文件目录，如果没有指定，则默认包含当前目录以及子目录下的所有ts文件


[配置文档](https://www.typescriptlang.org/tsconfig)

## ts中实现注解风格装饰器
```
function decorate(target, property, descriptor) {
    let oldValue = descriptor.value;
    descriptor.value = msg => {
        msg = `[${msg}]`;
        return oldValue.apply(null, [msg]);
    }
    return descriptor;
}
class Log {
    @decorate
    print(msg) {
        console.log(msg);
    }
}
```

##  报错
在ts中实现报错Experimental support for decorators is a feature that is subject to change in a future release. Set the ‘experimentalDecorators’ option to remove this warning.”and“Unable to resolve signature of method decorator when called as an expression.

### 解决办法
先设置"实现装饰器选项"

若要启用实验性的装饰器特性，你必须在命令行或tsconfig.json里启用experimentalDecorators编译器选项：

命令行
```
tsc --target ES5 --experimentalDecorators
```

tsconfig.json
```
"compilerOptions": {
    "outDir": "./dist",
    "target": "esnext",
    "experimentalDecorators": true,
}
```

## 直接执行ts的文件
```
npm install -g ts-node

ts-node xxx.ts
```
**Error:connot find module 'typescript'**

问题：安装ts-node,编译报错，找不到模块'typescript'

解决方式
```
<!-- 重新安装 -->
npm install -g typescript

<!-- 重新 -->
ts-node xx.ts
```

## 资料
[深入理解TypeScript - 认识TypeScript&配置详解](https://blog.csdn.net/qq_41831345/article/details/106727200)