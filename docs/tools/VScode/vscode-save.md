---
title: VSCode支持.vue文件自动保存的格式设置
---
## 实现步骤- 1. 安装如下插件
1. ESLint: eslint编码规范
2. Vetur: vue格式化代码
2. Chinese (Simplified) Language Pack for Visual Studio Code： 中文包

## 实现步骤- 2. 打开配置文件
MacOS使用 Command + Shift + P, window 使用 Ctrl + Shift + P快捷键-->搜索“Configure Language Specific Settings”--->选择“Vue”--->打开配置文件--->将如下代码复制粘贴到配置文件中。

```js
{
    // 分号
    "prettier.semi": false,
    "prettier.eslintIntegration": true,
    // 单引号包裹字符串
    // 尽可能控制尾随逗号的打印
    "prettier.trailingComma": "all",
    "prettier.singleQuote": true,
    "prettier.tabWidth": 2,
    // 关闭自带的格式化
    "javascript.format.enable": false,
    // 让函数(名)和后面的括号之间加个空格
    "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
    // 启用eslint
    /*
      该代码为旧版本，已废弃。采用下面的新版本
      "eslint.enable": true, 
      "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
          "language": "vue",
          "autoFix": true
        }
      ],
    */
    "eslint.format.enable": true,
     //autoFix默认开启，只需输入字符串数组即可
     "eslint.validate": ["javascript", "vue", "html"],
    // 格式化.vue中html
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    // 让vue中的js按编辑器自带的ts格式进行格式化
    "vetur.format.defaultFormatter.js": "vscode-typescript",
    "vetur.format.defaultFormatterOptions": {
      "js-beautify-html": {
        // #vue组件中html代码格式化样式
        // "wrap_attributes": "force-expand-multiline"
        // "wrap_attributes": "force"
        // "wrap_attributes": "force-aligned",// 属性强制折行对齐
        "wrap_attributes": "auto"
      }
    },
    "vetur.format.enable": true,
    "eslint.options": {
      "extensions": [".js", ".vue"]
    },
    /*
    该版本为旧版本，已经废弃。采用下面的代码
     "eslint.autoFixOnSave": true,
    特别重要
    */ 
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
    "editor.tabSize": 2,
    // 开启行数提示
    "editor.lineNumbers": "on",
    // 去掉 vscode 自带的自动保存 ，vscode 默认也是 false
    "editor.formatOnSave": false,
    // vscode默认启用了根据文件类型自动设置tabsize的选项
    "editor.detectIndentation": false,
    "editor.quickSuggestions": {
      //开启自动显示建议
      "other": true,
      "comments": true,
      "strings": true
    },
    "extensions.ignoreRecommendations": false,
    "window.zoomLevel": 1,
    "files.autoGuessEncoding": false,
    "workbench.sideBar.location": "left"
  }

```

<span style="color: red">其中重要的一个</span>

```js
/*
    该版本为旧版本，已经废弃。采用下面的代码
     "eslint.autoFixOnSave": true,
    特别重要
    */ 
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
```


## 资料
[VSCode支持.vue文件自动保存的格式设置](https://juejin.cn/post/6988360578850881549)
