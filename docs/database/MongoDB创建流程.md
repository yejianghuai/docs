---
title: "MongoDB"
date: 2020-11-25
categories:
 - 数据库
tags:
 - MongoDB
---
<Boxx/>
# MongoDB 创建流程
## 1、创建超级管理员
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
## 2、关闭并重启mogo
- 重新打开mogo服务，并进入到超级管理员的数据库内
```
mongo admin -u 用户名 -p 密码   （本地调试）
mongo 192.168.1.200:27017/test(库名) -u 用户名 -p 密码      （线上调试）
```

## 3、MongoDB数据库角色
- 数据库用户角色：**read、readWrite**
- 数据库管理角色：**dbAdmin、dbOwner、userAdmin**
- 集群管理角色：**clusterAdmin、clusterManager、clusterMonitor、hostManager**
- 备份恢复角色：**backup、restore**
- 所有数据库橘色：**readAntDatabase、readWriteAnyDatabase、useAdminAnyDatabase、dbAdminAnyDatabase**
- 超级管理员：**root**
## 4、nodejs中使用MongoDB
```js
// 安装 yarn add mongodb |
const { MongoClient } = require("mongodb"); // 引入MongoDB

// 连接MongoDB数据库
// const url = "mongodb://127.0.0.1:27017";
const url =
  "mongodb://useradmin:pwd123456@localhost:27017/dbname?authSource=admin";
// 定义要操作的数据库
const dbName = "blog";
// 实例化MongoClient,并传入数据库地址
const client = new MongoClient(url, { useUnifiedTopology: true });
// 连接数据库
client.connect((err) => {
  if (err) return console.log(err);
  console.log("数据库连接成功");
  // 连接到相应的数据库
  let db = client.db(dbName);
  // // 操作完成后要关闭数据库连接
  // client.close();
  // 1、增加数据
  db.collection("user").insertOne(
    { username: "nodejs 操作 MongoDB 增加数据", age: 10 },
    (err, result) => {
      if (err) return console.log(err);
      console.log(result);
      console.log("增加成功");
      client.close();
    }
  );

  // 2、删除数据
  // 一条
  // db.collection("user").deleteOne({ age: 10 }, (err, result) => {
  //   if (err) return console.log(err);
  //   console.log(result);
  //   console.log("删除一条成功");
  //   client.close();
  // });
  // 多条
  // db.collection("user").deleteMany({ age: 10 }, (err, result) => {
  //   if (err) return console.log(err);
  //   console.log(result);
  //   console.log("删除多条成功");
  //   client.close();
  // });

  // 3、改写数据
  // db.collection("user").updateOne(
  //   { age: 10 },
  //   { $set: { age: 11 } },
  //   (err, result) => {
  //     if (err) return console.log(err);
  //     console.log(result);
  //     console.log("修改成功");
  //     client.close();
  //   }
  // );
**
  // 4、查找数据
  // db.collection("user")
  //   .find({})
  //   .toArray((err, data) => {
  //     console.log(data);
  //     client.close();
  //   });
});
```
