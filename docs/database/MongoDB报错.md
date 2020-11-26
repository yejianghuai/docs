---
title: "MongoDB"
date: 2020-11-25
categories:
 - 数据库
tags:
 - MongoDB
---
<Boxx/>

# MongoDB报错文档总结
## 1、[MongoDB YAML＆＃30;无法识别的选项：安全＆＃30;](https://www.thinbug.com/q/23345522)
**当使用mongodb配置最高权限的root时，需要对bin文件下的mongod.cfg文件进行配置，开启权限配置，但是当我们配置完成需要重启后可能会遇到标题的问题，此时解决的办法为：**
- 重新配置mongod.cfg，可能是你配置的格式间距有问题（复制并覆盖就行）
```
security:
    authorization: enabled
```
- 使用mongod --remove清除原有的服务
- 使用配置文件启动服务 mongod --config "D:\MongoDB\bin\mongod.cfg" --serviceName "MongoDB" --install这里的路径是我的路径,自己需要修改(代码的意思是使用配置文件来安装服务)
- 不要动不动就重新安装，如果装在c盘没那么多事，没装C盘才需要这么配置
- 此时你的数据库可能在刚刚清除服务的时候被删除了，开启momgo的时候会失败（Error: couldn't connect to server 127.0.0.1:27017, connection attempt failed）
```
这时候先去你的MongoDB目录的data下建立一个叫做db的文件夹存放表，再运行下面的命令行
mongod.exe --dbpath D:\MongoDB\data\db
运行完后，再打开一个cmd输入mongo就可以开启服务了
 ```

## 2、创建超级管理员
- 要先到bin目录下的mongod.cfg配置
```
security:
    authorization: enabled
```
- 然后win+R输入services.msc，找到MongoDB，重启
-  重新打开一个cmd输入
```
1、mongo
2、show dbs (此时可能没有表，要自己再创建表)
3、use admin
4、输入创建超级管理员的指令
db.createUser({user:'admin',pwd:'123456',roles:[{role:'root',db:'admin'}]})
```
