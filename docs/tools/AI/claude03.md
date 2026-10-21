---
autoGroup-0: claude
title: 设置配置
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
1. 企业管理粗略



[原文](https://www.claude-cn.org/claude-code-docs-zh/configuration/settings.html)

<!-- 国富论 
资本论 -->

1. 刷新报告状态