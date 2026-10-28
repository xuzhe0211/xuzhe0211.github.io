---
title: 掌握 .claude/ 目录：让 Claude Code 真正懂你的项目
category:
  - 开发工具
tag:
  - ai
  - 工具
---

Claude Code 开箱即用已经很强大了，但真正让它如虎添翼的，是学会配置.claude/目录。这个目录是你与Claude之间的"约定"--项目规范、自定义工具、工作流自动化，全部在这里

## 目录结构总览
```shell
your-project/
├── .claude/
│   ├── settings.json          # 权限、MCP、环境变量配置
│   ├── settings.local.json    # 本地私有配置（不提交 git）
│   ├── rules/                 # 自动加载的规则文件（补充 CLAUDE.md）
│   │   ├── security.md
│   │   └── style.md
│   ├── commands/              # 斜杠命令（简单指令）
│   │   ├── commit.md
│   │   └── test.md
│   └── skills/                # 斜杠命令（复杂工作流）
│       ├── review.md
│       └── deploy.md
└── CLAUDE.md                  # 项目说明书（自动加载）
```
:::tip
提交建议：CLAUDE.md、.claude/settings.json、.claude/commands/、.claude/skills/全部提交，团队共享。setting.local.json加入.gitignore,存放个人API Key等敏感信息
:::

## CLAUDE.md--项目说明书
CLAUDE.md是整个系统的核心。**每次启动Claude Code,它都会自动读取这个文件**，无需任何调用。

把它理解为『写给AI的README.md』---你希望Claude始终知道的一切，都写在这里

### 写什么？
```markdown
# 项目名称

## 技术栈
- React 18 + TypeScript + Vite
- 包管理器：pnpm（不要用 npm 或 yarn）
- 样式：Tailwind CSS

## 常用命令
pnpm dev        # 启动开发服务器（端口 3000）
pnpm build      # 构建生产版本
pnpm lint       # 代码检查

## 代码规范
- 组件文件：PascalCase（Button.tsx）
- 工具函数：camelCase（formatDate.ts）
- 新页面必须使用 React.lazy() 懒加载
- 禁止使用 any 类型

## 架构说明
- components/common/  → 通用基础组件
- components/features/ → 业务功能组件
- pages/              → 页面（懒加载）

## 注意事项
- 提交前必须通过 pnpm lint
- 不要修改 tailwind.config.js 的颜色变量
```
### 最佳实践
- 写"不要做什么"比"要做什么"更重要-- Claude的默认行为已经很好，主要用CLAUDE.md纠偏
- 保持简洁--超过200行会被阶段，重点突出
- 用代码块展示命令--Claude会直接复用这些命令
- 说明项目特殊约定--普通项目不需要说，但你项目里的"特殊规则"一定要写

## .claude/rules/---自动加载的补充规则
rules/ 目录里的所有.md文件会自动加载，和 CLAUDE.md一样无需手动调用

### 和CLAUDE.md的区别
- | CLAUDE.md | .claude/rules/*.md
---|---|---
位置 | 项目根目录 | .claude/rules/ 目录
数量 | 一个文件 | 可以有多个文件
内容 | 项目整体说明 | 按主题拆分的具体规则
团队共享| 提交git | 提交git

**核心优势是拆分**---当规则很多时，按主题分文件，比把所有内容堆在CLAUDE.md里更清晰，也更容易维护。

### 示例：security.md

```markdown
# Security Rules

- 所有用户输入必须经过验证和转移，防止XSS
- 禁止在客户端代码中编码 API Key或密码
- SQL 查询必须使用参数化查询，禁止字符串拼接
- 敏感数据(密码、token)禁止写入 console.log
- fetch 请求必须处理错误状态码
```
### 示例：style.md

```markdown
# Code Style Rules

- 函数超过 50 行必须拆分
- 禁止嵌套超过 3 层的 fi/else,使用提前返回
- React 组件props必须用 interface 定义类型
- 禁止使用魔法数字，提取为具名常量
- 注释只写为什么，不写是什么
```
### 何时用rules/，何时用CLAUDE.md
- CLAUDE.md-- 项目介绍、技术栈、目录结构、常用命令，偏说明
- rules/- 强制性的约束和禁令，偏规则，尤其适合团队需要统一强调的内容

两者内容都会被Claude读取，实际上写在哪里效果相同，按团队习惯即可

## .claude/commands/--轻量斜杠命令
commands目录存放简单、单一职责的指令。文件名就是命令名： commit.md -> /commit;

### 示例：/commit

```markdown
# Commit

分析暂存区的改动，生成符合 Conventional Commits 规范的提交信息并提交

## 步骤
1. 运行 `git diff --staged` 查看改动
2. 根据改动类型选择 type: feat / fix /style / refactor /docs /chore
3. 用中文写subject，不超过30字
4. 执行 git commit
```

### 示例： /test
```markdown
# Test

运行测试套件并报告结果

- 执行 `pnpm test`
- 如有失败，分析原因并给出修复建议
- 不要自动修改测试文件，先询问用户
```

### 调用方式
在对话框直接输入
```markdown
/commit
/test
/commit 值提交 src/目录的改动
```
命令名后面可以副驾自然语言说明，Claude会结合命令定义和你的补充来执行

## .claude/skills/--复杂工作流
skills/ 和 commands/ 在功能上完全相同，但按管理用于更复杂、多步骤的工作流

### 示例：/review(代码审查)

```markdown
# Code Review

对当前改动进行全面的代码审查。

## 审查维度

### 1. 正确性
- 逻辑是否正确？边界条件是否处理？
- 有无潜在的 null/undefined 错误？

### 2. 安全性
- 是否存在 XSS、SQL 注入等风险？
- 用户输入是否经过验证？

### 3. 性能
- 是否有不必要的重渲染？
- 大列表是否做了虚拟化？

### 4. 可维护性
- 函数是否单一职责？
- 命名是否清晰？

## 输出格式
用 Markdown 表格列出问题，包含：文件、行号、问题描述、严重程度（高/中/低）、修复建议。
```

### 示例： /deploy(部署流程)
```markdown
# Deploy

执行完整的部署流程。

1. 运行 `pnpm lint` — 有错误则停止，不自动修复
2. 运行 `pnpm build` — 确认构建成功
3. 运行 `pnpm test` — 测试通过才继续
4. 询问用户确认：是否部署到生产环境？
5. 执行部署命令
6. 验证部署结果，访问健康检查接口
```

## commands/vs skills: 怎么选
两者功能完全相同，只是约定俗成的分工：

---| commands/ | skills
--|---|---
适合场景 | 简单、单一指令 | 复杂、多步骤工作流
典型例子| /commit、/lint、/format | /review、/deploy、/refactor
本质区别 | 没有区别 | 没有区别
 
实际上选哪个目录都行，统一用一个更好

## .claude/settings.json--权限与配置
控制Claude可以执行那些操作，配置MCP Server、环境变量等。

权限分两个文件：
- settings.json--提交git，团队共享的基础权限
- setting.local.json--不提交git，个人本地权限(API Key、私有工具)

### 权限语法
```shell
"Bash(pnpm *)"              # 允许所有 pnpm 命令
"Bash(git add:*)"           # 允许 git add（: 后为参数通配）
"WebFetch(domain:github.com)" # 只允许访问指定域名
"Skill(commit)"             # 允许调用指定 skill
"mcp__ide__getDiagnostics"  # 允许调用指定 MCP 工具
```
### 实际配置示例
以下是一个真实的前端项目配置
```shell
{
  "permissions": {
    "allow": [
      "Bash(pnpm install:*)",
      "Bash(pnpm dev:*)",
      "Bash(pnpm build:*)",
      "Bash(pnpm lint:*)",
      "Bash(pnpm add:*)",
      "Bash(pnpm tsc:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git rm:*)",
      "Bash(git mv:*)",
      "Bash(npx playwright:*)",
      "WebSearch",
      "WebFetch(domain:api.github.com)",
      "mcp__ide__getDiagnostics",
      "mcp__context7__query-docs",
      "Skill(update-config)"
    ]
  }
}
```
### 配置建议
- 最小权限原则：只开放项目实际用到的命令，不要写 "Bash(*)" 放开所有
- 危险命令不授权：rm -rf、git push --force、git reset --hard 等让 Claude 每次都弹确认
- MCP 工具按需开放：用哪个 MCP 就开放哪个工具，不用的不授权
- 本地 vs 团队：CI/CD 相关权限放 settings.json，个人工具和 Key 放 settings.local.json

## 完整工作流示例
假设你的项目有这样的.claude/ 配置：
```shell
.claude/
├── settings.json
├── commands/
│   ├── commit.md      →  /commit
│   └── lint.md        →  /lint
└── skills/
    ├── review.md      →  /review
    └── deploy.md      →  /deploy
```
典型的开发工作流
```markdown
你：帮我实现用户登录功能
Claude：（读取 CLAUDE.md 了解项目规范，按规范实现代码）

你：/review
Claude：（按 review.md 的维度进行代码审查，输出问题列表）

你：/lint
Claude：（运行 pnpm lint，修复发现的问题）

你：/commit
Claude：（分析改动，生成规范提交信息，执行 git commit）
```
## 快速上手模板

复制这个最小化模板到你的项目

### CLAUDE.md
```markdown
# 项目名

## 包管理器
pnpm（禁止使用 npm/yarn）

## 常用命令
pnpm dev / pnpm build / pnpm lint

## 规范
- TypeScript，禁止 any
- 组件 PascalCase，工具函数 camelCase
- 提交前必须通过 lint
```
### .claude/commands/commit.md
```markdown
# Commit
查看 git diff --staged，生成 Conventional Commits 格式提交信息（中文 subject），执行提交。
```
### .claude/commands/lint.md
```markdown
# Lint
运行 pnpm lint，自动修复可修复的问题，不可修复的列出并解释原因。

```


## 小结
文件 | 触发方式 | 用途
--|---|---
CLAUDE.md | 自动加载 | 项目整体说明、技术栈、常用命令
.claude/rules/*.md | 自动加载 | 按主题吃啊分的强制规则和约束
.claude/commands/*.md | /command-name | 简单斜杠命令
.claude/skills/*.md | /skill-name | 复杂多步骤工作流
.claude/settings.json | 自动加载 | 权限控制、MCP 配置
.claude/settings.local.json | 自动加载（不提交） | 私有配置、API Key


花 30 分钟配置好这些文件，Claude Code 就能真正理解你的项目，像一个熟悉代码库的老队友一样工作。

