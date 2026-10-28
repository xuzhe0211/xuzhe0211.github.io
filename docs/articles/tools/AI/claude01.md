---
autoGroup-0: claude
title: 快速开发指南
category:
  - 开发工具
tag:
  - ai
  - 工具
---

## 步骤1: 安装Claude Code

### Npm安装
如果您已安装Node.js 18或更新版本
```bash
npm install -g @anthropic/claude-code
```
### 原生安装
或者，尝试我们新的原生安装，现在处于测试版

MacOS、Linux、WSL
```js
curl -fsSL claude.ai/install.sh | bash
```

window PowerShell
```
irm https://claude.ai/install.ps1 | iex
```

## 步骤2：开始你的第一个会话
在任何项目目录中打开终端并启动Claude Code: 
```shell
cd /path/to/your/project
claude
```
您将在新的交互式会话中看到Claude Code提示符
```shell
* 欢迎使用 Claude Code

...

> 尝试"create a util loggin.py that..."
```
## 步骤3：提出您的第一个问题
让我们从了解您的代码库开始。尝试这些命令之一
```shell
> what does this project do?
```
Claude 将分析您的文件并提供摘要。您也可以提出更具体的问题：

:::tip
> what technologies does this project use?

> where is th main entry point?

> explain the folder structure
:::

你也可以询问 Claude 关于其自身功能的问题

:::tip
> what can claude code do?

> how do I use slash commands in Claude Code?

> can Claude Code work with Docker?
:::

> 注意：Claude Code 根据需要读取你的文件--您不必手动添加上下文。Claude 还可以访问其自己的文档那个，并可以回答有关其功能和能力的问题

## 步骤4：进行您的第一次代码更改
现在让Claude code 进行一些实际的编程。尝试一个简单的任务
```shell
> add a hello world function to the main file
```
Claude Code 将：
1. 找到何当的文件
2. 向您显示建议的更改
3. 请求您的批准
4. 进行编辑

> 注意：Claude Code 在修改文件之前总是请求许可。你可以批准单个更改或为会话启用"全部接受"模式

## 步骤5：在Claude Code 中使用Git
Claude Code使Git操作变得对话式
```shell
> what files have I changed?

> commit my changes with a desciptive message
```
你也可以提示更复杂的git操作
```shell
> create a new branch called feature/quickstart

> show me the last 5 commits

> help me resolve merge conflicts
```
## 步骤6：修复错误或添加功能
Claude 擅长调试和功能实现

用自然语言描述您想要的
```shell
> add input validation to the user registration form
```

或修复现有问题
```shell
> there's a bug in the user registration form, please fix it
```
Claude Code将：
- 定位相关代码
- 理解上下文
- 试试解决方案
- 如果可用，运行测试

## 步骤7：测试其他常见工作流程
有多种方式与Claude协作：
- 重构代码

- 编写测试

- 更新文档

- 代码审查

    ```shell
    > review my changes and suggest improvements
    ```

> 记住：Claude Code是您的AI结对编程伙伴。像与有用的同事交谈一样与它交谈--描述您想实现的目标，它将帮助您达到目标

## 基本命令

命令| 功能 | 示例
---|---|---
claude | 启动交互模式 | claude
claude "task" | 运行一次性任务 | claude "fix the build error"
claude -p 'query' | 运行一次查询，然后退出 | claude -p 'explain this function'
claude -c | 继续最近的对话 | claude -c
claude -r | 恢复之前的对话 | claude -r
claude commit | 创建git提交 | claude commit
/clear | 清楚对话历史 | /clear
/help | 显示帮助 | /help
exit 或Ctrl + c | 退出Claude Code | exit


[原文](https://www.claude-cn.org/claude-code-docs-zh/getting-started/quickstart.html)