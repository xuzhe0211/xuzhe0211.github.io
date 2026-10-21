---
autoGroup-0: claude
title: 常见工作流程
---
## 理解代码库
假设您刚加入一个新项目，需要快速了解其结构
1. 导航到项目根目录
 
    ```shell 
    cd /path/to/project
    ```
2. 启动Claude Code
 
    ```shell
    claude
    ```
3. 请求高层次概览

    ```shell
    > give me an overview of the codebase
    ```

4. 深入了解特定组件

    ```shell
    > explain the main architecture patterns used here

    > what are the key data models

    > how is authentication handled?
    ```

:::tip
- 从宽泛的问题开始，开始缩小到特定领域
- 询问项目中使用的编码约定和模式
- 请求项目特定术语的词汇表
:::

## 查找相关代码
假设你需要定位于特定功能或功能相关的代码

1. 让Claude查找相关文件

    ```shell 
    > find the files that handle user authentication
    ```

2. 了解组件如何交互的上下文

    ```shell
    > how do these authentication files work together?
    ```
3. 理解执行流程

    ```shell
    > trace the login process from front-end to database
    ```

:::tip
- 对您要查找的内容要具体
- 使用项目中的领域语言
:::

## 高效修复
假设你遇到了错误消息，需要找到并修复其源头
1. 与Claude分享错误

    ```shell
    > I'm seeing an error when I run npm test
    ```
2. 请求修复建议

    ```shell
    > suggest a few ways to fix the @ts-ignore in user.ts
    ```
3. 应用修复

    ```shell
    > update user.ts to add the null check you suggested
    ```

:::tip
- 告诉Claude重现问题的命令并获取堆栈跟踪
- 提及重现错误的任何步骤
- 让Claude知道错误是间歇性的还是一致的
:::

## 重构代码
假设您需要更新旧代码以使用现代模式和时间

1. 识别需要重构的遗留代码

    ```shell
    > find deprecated API usage in our codebase 
    ```
2. 获取重构建议

    ```shell
    > suggest how to refactor utils.js to use modern JavaScript features
    ```
3. 安全的应用更改

    ```shell
    > refactor utils.js to use ES2024 features while maintaining the same behavior
    ```
4. 验证重构

    ```shell
    > run tests for the refactored code
    ```

:::tip
- 让Claude解释现代方法的好处
- 在需要时请求更改保持向后兼容性
- 以小的、可测试的增量进行重构
:::
## 使用专门的子代理
假设你想使用专门的AI子代理来更有效的处理特定任务

1. 查看可用的子代理

    ```js
    > /agents
    ```
    这显示所有可用的子代理并让您创建新的子代理

2. 自动使用子代理

    Claude Code 将自动将适当的任务委托给专门的子代理
    ```shell
    > review my recent code changes for security issues

    > run all tests and fix any failures
    ```
3. 明确请求特定子代理

    ```shell
    > use the code-reviewer subagent to check the auth module

    > have the debugger subagent investigate why users can't log in
    ```
4. 为您的工作流程创建自定义子代理

    ```js
    > /agents
    ```
    然后选择"Create New subagent" 并按照提示定义：
    - 子代理类型(例如：api-designer、performance-optimizer)
    - 何时使用它
    - 它可以访问那些工具
    - 其专门的系统提示

:::tip
- 在 .claude/agents/中创建项目特定的子代理以供团队共享
- 使用描述性的 description 字段来启用自动委托
- 将工作访问限制为每个自带来实际需要的内容
- 查看[自定义子代理文档](https://www.claude-cn.org/claude-code-docs-zh/building/sub-agents.html)获取详细示例
:::

## 处理测试
假设你需要为未覆盖的代码添加测试

1. 识别未测试的代码

    ```shell
    > find functions in NotificationsService.swift that are not covered by tests 
    ```
2. 生成测试脚手架

    ```shell
    > add tests for the notification service
    ```
3. 添加有意义的测试用例

    ```shell
    > add test cases for edge conditions in the notification service
    ```
4. 运行并验证测试

    ```shell
    > run the new tests and fix any failures
    ```