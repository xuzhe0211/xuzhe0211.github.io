---
autoGroup-0: claude
title: 设置配置
category:
  - 开发工具
tag:
  - ai
  - 工具
---

> 使用全局和项目级设置以及环境变量配置Claude Code

Claude Code 提供各种设置来配置其行为已满足您的需求。你可以通过在使用交互式REPL时运行/config 命令来配置Claude Code

## 设置文件
settings.json文件是我们通过分层设置配置 Claude Code 的官方机制：
- 用户设置--在~/.claude/settings.json中定义，适用于所有项目
- 项目设置-保存在您的项目目录中
    - .claude/settings.json 用于检入源代码控制并与团队共享的设置
    - .claude/settings.local.json 用于不检入的设置，对个人偏好和实现很有用。Claude Code会在创建时候配置git忽略.claude/settings.local.json
- 对于Claude Code 的企业部署，我们还支持企业管理策略设置。这些设置优先于用户和项目设置。系统管理员可以将策略部署到：
    - macOS：/Library/Application Support/ClaudeCode/managed-settings.json
    - Linux 和 WSL：/etc/claude-code/managed-settings.json
    - Windows：C:\ProgramData\ClaudeCode\managed-settings.json

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run lint)",
      "Bash(npm run test:*)",
      "Read(~/.zshrc)"
    ],
    "deny": [
      "Bash(curl:*)",
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)"
    ]
  },
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp"
  }
}
```

### 可用设置
settings.json 支持多个选项

键| 描述 | 示例
---|---|---
apiKeyHelper |  自定义脚本，在 /bin/sh 中执行，生成认证值。此值将作为 X-Api-Key 和 Authorization: Bearer 标头发送给模型请求 | /bin/generate_temp_api_key.sh
cleanupPeriodDays | 基于最后活动日期本地保留聊天记录的时长（默认30天） | 20
env | 将应用于每个会话的环境变量 | {"FOO": "bar"}
includeCoAuthoredBy | 是否在 git 提交和拉取请求中包含 co-authored-by Claude 署名（默认：true） | false
permissions | 权限结构见下表。 | -
hooks | 配置在工具执行前后运行的自定义命令。参见钩子文档 | {"PreToolUse": {"Bash": "echo 'Running command...'"}}
model | 覆盖 Claude Code 使用的默认模型 | "claude-3-5-sonnet-20241022" 
statusLine | 配置自定义状态行以显示上下文。参见statusLine 文档 | {"type": "command", "command": "~/.claude/statusline.sh"}
forceLoginMethod | 使用 claudeai 限制登录到 Claude.ai 账户，console 限制登录到 Anthropic Console（API 使用计费）账户 | claudeai 
enableAllProjectMcpServers | 自动批准项目 .mcp.json 文件中定义的所有 MCP 服务器 | true
enabledMcpjsonServers | 从 .mcp.json 文件中批准的特定 MCP 服务器列表 | ["memory", "github"] 
disabledMcpjsonServers | 从 .mcp.json 文件中拒绝的特定 MCP 服务器列表  | ["filesystem"]
awsAuthRefresh | 修改 .aws 目录的自定义脚本（参见高级凭据配置） | aws sso login --profile myprofile 
awsCredentialExport | 输出包含 AWS 凭据的 JSON 的自定义脚本（参见高级凭据配置） | /bin/generate_aws_grant.sh

### 权限设置
键 | 描述 | 示例
--- |---|---
allow | 允许工具使用权限规则数组 | ["Bash(git diff:*)"]
ask | 在工具使用时要求确认的权限规则数组 | [ "Bash(git push:*)" ]
deny | 拒绝工具使用的权限规则数组。使用此选项还可以排除Claude Code 访问的敏感文件 |  [ "WebFetch", "Bash(curl:*)", "Read(./.env)", "Read(./secrets/**)" ]
additionalDirectories | Claude 可以访问的额外工作目录 | [ "../docs/" ]
defaultMode | 打开Claude Code时的默认权限模式 | "acceptEdits"
disableBypassPermissionsMode | 设置为 "disable" 以防止激活 bypassPermissions 模式。参见管理策略设置 |  'disable'

### 设置优先级
设置按优先级顺序应用(从高到底)
1. 企业管理策略(managed-settings.json)
  - 由 IT/DevOps 部署
  - 无法被覆盖

2. 命令行参数
  - 特定会话的临时覆盖

3. 本项目设置（.claude/settings.local.json）
  - 个人项目特定设置
4. 共享项目设置(.claude/settings.json)
    - 源代码空置中的额团队共享项目设置
5. 用户设置(~/.claude/settings.json)
  - 个人全局设置

此层次结构确保企业安全策略始终得到执行，同时仍允许团队和个人自定义其体验。

### 配置系统的关键点
- **内存文件(CLAUDE.md)**:包含Claude在启动时加载的指令和上下文
- **设置文件(JSON)**:配置权限、环境变量和工具行为
- **斜杠命令**：可以在会话期间使用 /command-name 调用的自定义命令
- **MCP服务器**：使用额外工具和集成扩展Claude Code
- **优先级**：更搞级别的配置(企业)覆盖较低级别的配置(用户/项目)
- **集成**：设置被合并，更具体的设置添加到或覆盖更广泛的设置

### 系统提示可用性
> 注意：与claude.ai不同，我们不在此网站上发布Claude Code 的内部系统提示。使用 CLAUDE.md文件或 --append-system-prompt向 Claude Code 的行为添加自定义指令

### 排除敏感文件
要防止 Claude Code 访问包含敏感信息的文件(例如，API秘钥、机密、环境文件),请在你的 .claude/settings.json 文件中使用 permissions.deny设置：

```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Read(./config/credentials.json)",
      "Read(./build)"
    ]
  }
}
```
这替换了已弃用的 ignorePatterns配置。匹配这些模式的文件将对 Claude Code 完全不可见，防止任何异味暴露敏感数据。

## 子代码配置
Claude Code 支持可在用户和项目级别配置的自定义AI子代理。这些子代理存储为带有YAML前言Markdown文件：
- 用户子代理： ~/.claude/agents/ 在您的所有项目中可用
- 项目子代理： .claude/agents/ 特定于您的项目，可以与您的团队共享

子代理文件定义具有自定义提示和工具权限的专门AI助手。在[子代理文档](https://www.claude-cn.org/claude-code-docs-zh/building/sub-agents.html)中了解更多关于创建和使用子代理的信息



[原文](https://www.claude-cn.org/claude-code-docs-zh/configuration/settings.html)

<!-- 国富论 
资本论 -->

1. 刷新报告状态

<!-- 
effectScope 
 -->