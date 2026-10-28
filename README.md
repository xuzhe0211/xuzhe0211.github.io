# xz · 个人博客

> 基于 **VuePress 2** + **vuepress-theme-hope** 搭建的个人博客与笔记站。前端为主，兼及源码阅读、后端基础、工具与生活随记。

[在线预览](https://xuzhe0211.github.io) · [个人主站](https://www.twis.uk) · [介绍页](https://xuzhe0211.github.io/intro.html)

## 技术栈

| 类别 | 选型 |
| --- | --- |
| 框架 | VuePress 2 (`2.0.0-rc.20`) |
| 主题 | vuepress-theme-hope (`2.0.0-rc.77`) |
| 打包 | `@vuepress/bundler-vite` |
| 搜索 | `@vuepress/plugin-slimsearch` + `nodejs-jieba`（中文分词） |
| 代码高亮 | `@vuepress/plugin-shiki` |
| 运行时 | Node `>=20.0.0` |

## 目录结构

```
.
├── docs/
│   ├── README.md            # 站点首页 (BlogHome)
│   ├── intro.md             # 个人介绍页 (portfolio)
│   ├── articles/            # 文章根目录
│   │   ├── front-end/       # 前端 (JS/CSS/HTML/Vue/React/Electron/Flutter…)
│   │   ├── back-end/        # 后端 (Docker/Nginx/Node/MySQL/Shell)
│   │   ├── source-vue/      # Vue 源码阅读
│   │   ├── source-react/    # React 源码阅读
│   │   ├── source-study/    # 课程学习
│   │   ├── tools/           # 开发工具 (Git/VSCode/Chrome/AI/Stock)
│   │   ├── wander/          # 随记 (生活/工作)
│   │   └── guide/           # 介绍 / 指引
│   └── .vuepress/
│       ├── config.ts        # 站点配置 (host/port/head/bundler/theme)
│       ├── theme.ts         # theme-hope 主题配置 (blog/markdown/plugins)
│       ├── navbar.ts        # 导航栏
│       ├── sidebar.ts       # 侧边栏 (structure 自动生成)
│       ├── vitebundler.ts   # vite bundler 与 sass 选项
│       ├── styles/          # palette.scss / index.scss
│       └── public/          # 静态资源
└── scripts/
    └── deploy.sh            # 构建并发布到 GitHub Pages
```

## 快速开始

### 环境要求

- **Node `>=20.0.0`**（低于 20 会因 vite 依赖报 `node:fs/promises` 导出错误而启动失败，可用 `nvm use 20` 切换）
- 包管理器：npm / pnpm / yarn 均可

### 安装与本地开发

```bash
# 安装依赖
npm install

# 本地开发（默认 http://localhost:8099）
npm run serve

# 清缓存后开发（修改了 config / theme / palette 时用）
npm run clean-dev
```

### 构建与部署

```bash
# 构建生产产物到 docs/.vuepress/dist
npm run build

# 一键部署：构建 + 推送到 GitHub Pages 仓库
npm run deploy
```

`npm run deploy` 会执行 `scripts/deploy.sh`：构建站点 → 进入 `docs/.vuepress/dist` → 初始化为 `master` 分支 → 强推到 `xuzhe0211/xuzhe0211.github.io` 仓库（即 GitHub Pages 源）。

如需自定义域名，取消 `deploy.sh` 中 `echo 'www.example.com' > CNAME` 一行的注释并填写。

## 写文章

1. 在 `docs/articles/` 下找到合适的子目录（或新建一个），丢一个 `.md` 进去即可。
2. 文件头建议带 frontmatter：

   ```markdown
   ---
   title: 文章标题
   date: 2026-01-01
   category: 前端
   tag:
     - Vue
   ---
   ```

3. **侧边栏由 `sidebar.ts` 的 `children: 'structure'` 自动按目录结构生成**，无需手动维护。
4. 若新建一个子目录，放一个 `README.md` 作为分组首页，frontmatter 里写 `title` / `icon` / `order` / `article: false`，侧边栏就会把它渲染成一个可折叠的子分组。

## 说明

- 评论模块已移除——这里更多是给自己看的笔记，没有太多讨论价值。
- 搜索为本地全文索引（slimsearch + jieba），首次启动会建索引，稍慢属正常。
- 代码高亮使用 shiki（服务端高亮），文章多时启动初始化需 30~50s。

## License

MIT（见 `package.json`，仓库根目录暂未单独放 LICENSE 文件）
