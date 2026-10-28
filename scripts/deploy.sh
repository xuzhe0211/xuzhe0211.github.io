#!/usr/bin/env sh

# 部署脚本：构建 VuePress 2 站点并推送到 GitHub Pages 仓库
# 用法：npm run deploy
# 说明：源码仓库 → 构建产物 → 推送到 xuzhe0211.github.io 仓库的 master 分支

# 抛出错误即退出
set -e

echo "==> 构建站点（VuePress 2 + theme-hope）"
npm run build

echo "==> 进入构建产物目录"
cd docs/.vuepress/dist

# 如需自定义域名，取消下一行注释并填写
# echo 'www.example.com' > CNAME

echo "==> 初始化发布仓库"
git init
git checkout -b master
git add -A
git commit -m 'deploy: vuepress2 site'

echo "==> 推送到 xuzhe0211.github.io"
git push -f git@github.com:xuzhe0211/xuzhe0211.github.io.git master

cd -
echo "==> 部署完成"
