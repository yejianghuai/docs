---
title: "SQL"
date: 2016-03-28
categories:
 - 数据库
tags:
 - sql
---
<Boxx/>
# SQL学习笔记-增删改查

## 增加操作

语句：

```
insert into 表明 values('数据1'，'数据2'，'数据3')
```

如果直接添加会在数据后面再添加一条数据(表名：test)：

![1560740586518](C:\Users\Win10\AppData\Roaming\Typora\typora-user-images\1560740586518.png)

```
insert into test values('test','test','1')
```

其实values后面加上的就是对应col的数据



当然也可以在指定的位置添加数据如：

```
insert into test(sno,age)values('彭宇','21')
```

这样的话就会在sno和age两个列中添加数据，而没有被添加的数据的列表则会显示null

![1560740932209](C:\Users\Win10\AppData\Roaming\Typora\typora-user-images\1560740932209.png)

## 删除操作

语句：

```
delete from 表明 where 字段名='需要删除的数据'
```

例如：

```
delete from test where sno = 'test'
```

通过上面的语句我们就能删除主键为test的整个row的数据，有一点，建议使用特定的主键，如学生列表有特定的学号之类的，不要使用名字，因为可能有人名字相同，会误删

批量删除：

假如我的数据表中有这么三条数据：test1，test2，test3，我想把它们都删除了，具体操作：

```
delete from test where sno in('test1','test2','test3',)
```

![1560741816971](C:\Users\Win10\AppData\Roaming\Typora\typora-user-images\1560741816971.png)

## 修改操作

语句：

```
update 表名 set字段 = '修改后的数据' where 字段 = '修改条件'
```

具体操作：

````
update test set sno='SQL 修改语句' where sno = 'test'
````

![1560741964692](C:\Users\Win10\AppData\Roaming\Typora\typora-user-images\1560741964692.png)

## 查询操作

查询所有：

```
select * from test
```

单条件查询

语句：

```
select * from test where sno = '彭宇'
```

多条件查询：

```
select * from test where sno='彭宇' and age='21'
```

这样的话必须 符合这两个条件才会输出出来