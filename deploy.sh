#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build

# 进入生成的文件夹
cd dists

# 如果是发布到自定义域名
echo 'www.yejianghuai.store' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果你想要部署到 https://USERNAME.github.io
# git push -f git@github.com:yejianghuai/docs.git master

# 如果发布到 https://USERNAME.github.io/<REPO>  REPO=github上的项目
git push -f git@github.com:yejianghuai/docs.git master:gh-pages

cd -