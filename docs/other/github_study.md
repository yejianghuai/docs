---
title: "git 学习"
date: 2019-01-28
categories:
 - git
tags:
 - git
---
<Boxx/>
## 安装git

- 第一步安装git，到git的官网下载安装
- 安装完成之后，打开git bash：
  - 设置用户名：$ global config user.name "Your name"
  - 设置用户名邮箱：$ global config user.email"email@email.com"
  - 查看设置：git config
  - git  config --list查看信息

- 添加命令：
  - mkdir  文件名   -----》创建文件
  - pwd   ----》当前位置
  - git init  ------>生成.git文件，存储本地信息
  - touch  ---->创建文件如：touch  a.php
  - git add  ----->将文件提交到暂存区域如：git add a.php
  - git status   ---->在暂存区域中查看文件
  - git commit -m(‘文件描述’)  ---->将文件提交到本地.git仓库上面如git commit -m ‘add a.php’

- 修改命令：
  - ls    -----》查看远程仓库的文件
  - vi   ------》修改文件内容如  vi  a.php   --->跳转之后修改文件
  - cat   ---->查看修改后的文件内容   如：cat  a.php
  - git add  ---->再次添加 如： git add a.php
  - git commit    ------>再次从暂存区域添加到远程仓库如：git commit a.php

- 删除命令：
  - rm -rf  ------>删除本地文件 如 rm-rf a.php
  - git rm   ------>删除git仓库文件  如：git rm a.php
  - git commit -m('文件描述') -------》提交操作并且描述操作如：git commit -m('我删除了a.php文件')

## 多人项目的git操作

- 首先先将整个项目clone到本地，命令：git clone  仓库地址

- 添加四步骤：

  - touch   文件名---->创建文件

  - git add  文件名------》添加文件到暂存区域

  - git commit -m "描述" -------------》添加到本地仓库

  - git push  ------->添加到远程git仓库

    

