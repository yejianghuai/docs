---
title: "Svn 用法介绍"
date: 2019-01-28
categories:
 - svn
tags:
 - svn
---
<Boxx/>
# SVN学习笔记

svn解决三大问题

- 协作开发
- 远程开发
- 版本回退

和SVN一样的软件

- SCM：软件配置管理---》对软件源代码直接进行控制管理

- CVS：元老级产品

- VSS：入门级产品---》微软开发

- ClearCase：专业开发软件（IBM公司提供技术支持）



### SVN属于C/S结构软件（客户端/服务端）

服务器端软件(server--VisualSvn)：http://www.visualsvn.com/

客户端软件（client--Tortoisesvn）：http://tortoisessvn.net/downloads

### 

### SVN三大指令：

- （Checkout）检出指令：1、链接到svn服务器端    2、更新服务器端数据到本地

  注意：Checkout指令只在第一次链接时操作一次，以后如果更新操作请使用（update）更新指令

- （commit）提交操作：1、提交本地数据到服务端 

![1556415991620](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1556415991620.png)

根据公司要求填写备注信息

