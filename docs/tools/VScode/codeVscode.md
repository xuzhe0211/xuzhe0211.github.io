---
title: 解决VSCode与Cursor冲突
---

1. 恢复 code .关联到 VS CODE

    ```bash
    # 删除旧的符号链接（如果是被 Cursor 覆盖的）
    sudo rm /usr/local/bin/code

    # 重新安装 VS Code 的 CLI 命令
    打开 VS Code -> 按 `Cmd+Shift+P` -> 输入 "Shell Command: Install 'code' command in PATH"
    ```

2. 为Cursor设置独立的命令(可选)

    如果希望用 cursor . 打开 Cursor：
    ```bash
    # 检查 Cursor 是否已提供 CLI 工具（通常安装时会自动添加）
    which cursor

    # 如果未找到，手动创建符号链接（路径可能因安装方式不同）
    sudo ln -s /Applications/Cursor.app/Contents/Resources/app/bin/cursor /usr/local/bin/cursor
    ```

3. 验证结果

    ```bash
    # 检查命令指向
    which code    # 应指向 VS Code
    which cursor  # 应指向 Cursor

    # 测试命令
    code .    # 打开 VS Code
    cursor .  # 打开 Cursor
    ```

> 经过以上步骤如果还没有生效的话，需要经过一下检查

1. 删除别名
    
    检查你的 Shell 配置文件（如 ~/.zshrc 或 ~/.bash_profile）：

    ```bash
    # 查看配置文件内容
    cat ~/.zshrc  # 如果使用 zsh（macOS 默认）
    cat ~/.bash_profile  # 如果使用 bash

    # 用文本编辑器（如 VS Code）打开配置文件
    code ~/.zshrc  # 或用其他编辑器
    ```
    找到类似以下行并删除或注释掉：
    ```bash
    # 别名
    # alias code='open -a "Visual Studio Code"'
    alias cursor='open -a "Cursor"'
    ```
2. 重新加载配置(重要)
    
    ```bash
    source ~/.zshrc  # 或 source ~/.bash_profile
    ```
3. 验证修复

    ```bash
    which code  # 现在应该显示 `/usr/local/bin/code`（指向 VS Code）
    code .      # 应该打开 VS Code
    ```
4. 防止 Cursor 再次劫持（可选）

    如果 Cursor 的安装脚本自动添加了别名，可以通过以下方式阻止：
    ```bash
    # 在配置文件中添加保护（优先于别名）
    echo 'unalias code 2>/dev/null' >> ~/.zshrc  # 或 ~/.bash_profile
    ```
