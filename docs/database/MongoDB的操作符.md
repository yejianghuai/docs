---
title: "MongoDB"
autoPrev: "README"
---
# MongoDB 的操作符大全

# 1.查询和投影

## 1.1 比较操作符

### \$eq

> 语法：

```js
{ <field>: { $eq: <value> } }
```

> 释义：匹配等于（=）指定值的文档
> 举例：
>
> [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)
>
> 1. 查询 age=20 的文档：
> 2. db.person.find( { age: { \$eq: 20 } } )
> 3. 相当于：
> 4. db.person.find( { age: 20 } )

### \$gt

> 语法：

```js
{<field>: {$gt: <value>} }
```

> 释义：匹配大于（>）指定值的文档

### \$gte

> 语法：

```js
{<field>: {$gte: value} }
```

> 释义：匹配大于等于（>=）指定值的文档

### \$lt

> 语法：

```js
{<field>: {$lt: value} }
```

> 释义：匹配小于（<）指定值的文档

### \$lte

> 语法：

```js
{ <field>: { $lte: value} }
```

> 释义：匹配小于等于（<=）指定值的文档

### \$ne

> 语法：

```js
{<field>: {$ne: value} }
```

> 释义：匹配不等于（≠）指定值的文档

### \$in

> 语法：

```js
{ <field>: { $in: [<value1>, <value2>, ... <valueN> ] } }
```

> 释义：匹配数组中的任一值
>
> 举例：
>
> [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)
>
> 查询该集合中字段 qty 的值与数组中的任意值相等的文档：

```js
db.inventory.find({ qty: { $in: [5, 15] } });
```

>

### \$nin

> 语法：

```js
{ <field>: { $nin: [ <value1>, <value2> ... <valueN> ]} }
```

> 释义：不匹配数组中的值

## 1.2 逻辑操作符

### \$or

> 语法：

```js
{ $or: [ { <expression1> }, { <expression2> }, ... , { <expressionN> } ] }
```

> 释义：或 条件查询
>
> 举例：
>
> [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)
>
> 查询 age<20 或者 address 是 beijing 的文档：

```js
db.person.find({ $or: [{ age: { $lt: 20 } }, { address: "beijing" }] });
```

>

### \$and

> 语法：

```js
{ $and: [ { <expression1> }, { <expression2> } , ... , { <expressionN> } ] }
```

> 释义：与 条件查询

### \$not

> 语法：

```js
{ <field>: { $not: { <operator-expression> } } }
```

> 释义：查询与表达式不匹配的文档
>
> 举例：
>
> [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)
>
> 查询 age 不大于 20 的文档：

```js
db.person.find({ age: { $not: { $gt: 20 } } });
```

### \$nor

> 语法：

```js
{ $nor: [ { <expression1> }, { <expression2> }, ... { <expressionN> } ] }
```

> 释义：查询与任一表达式都不匹配的文档
>
> 举例：
>
> [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)
>
> 查询 age 既不等于 20，sex 也不是男的文档：

```js
db.person.find({ $nor: [{ age: 20 }, { sex: "男" }] });
```

## 1.3 元素操作符

### \$exists

> 语法：

```js
{ <field>: { $exists: <boolean> } }
```

> 释义：查询存在指定字段的文档
>
> 举例：
>
> [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)
>
> 查询存在 phone 字段的文档：

```js
db.person.find({ phone: { $exists: true } });
```

### \$type

> 语法：

```js
{ <field>: { $type: <BSON type number> | <String alias> } }
```

> 释义：查询类型为指定类型的文档，3.2 版本添加 alias 别名，各种类型的 Number 及 Alias 如下
>
> ![img](https://img-blog.csdn.net/20170228154236567?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMTYzMTMzNjU=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
>
> > > 举例：
> > >
> > > 假设存在这样一个集合：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)
> > >
> > > 1. { "\_id": 1, address: "2030 Martian Way",zipCode: "90698345"},
> > > 2. { "\_id": 2, address: "156 Lunar Place",zipCode: 43339374},
> > > 3. { "\_id": 3, address: "2324 Pluto Place",zipCode: NumberLong(3921412)},
> > > 4. { "\_id": 4, address: "55 Saturn Ring", zipCode: NumberInt(88602117)}
> > >
> > > 查询该集合中 zipCode 字段的数据类型为 String 类型的文档：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
db.addressBook.find({ zipCode: { $type: 2 } });
```

> > >

```js
db.addressBook.find({ zipCode: { $type: "string" } });
```

> > ## 1.4 评估操作符（Evaluation，不知道翻译成什么合适，暂且翻译成这样吧）
> >
> > ### \$mod
> >
> > > 语法：

```js
{ <field>: { \$mod: [ 除数, 余数 ] } }
```

> > > 释义：取余条件查询
> > >
> > > 举例：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)
> > >
> > > 查询 age 字段的值除以 2 余 0 的文档：

```js
db.person.find({ age: { \$mod: [2, 0] } });
```

> > ### \$regex
> >
> > > 语法：

```js
{ <field>: { $regex: /pattern/, $options: '<options>' } }
```

> > >

```js
{ <field>: { $regex: 'pattern', $options: '<options>' } }
```

> > >

```js
{ <field>: { \$regex: /pattern/<options> } }
```

> > > 释义：正则表达式查询
> > >
> > > 举例：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)
> > >
> > > 1. db.products.find( { sku: { \$regex: /^ABC/i } } )
> >
> > ### \$text
> >
> > > 语法：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
 {
 ​ \$text: {
 ​ \$search: <string>,
 ​ \$language: <string>,
 ​ \$caseSensitive: <boolean>,
 ​ \$diacriticSensitive: <boolean>
 ​ }
 }
```

> > - - \$search ——关键词
> >   - \$language ——语言，不支持中文！！！支持语言如下：[点击](https://docs.mongodb.com/manual/reference/text-search-languages/#text-search-languages)
> >   - \$caseSensitive——是否区分大小写，默认 false
> >   - \$diacriticSensitive——是否区分读音，默认 false
> >
> > > 释义：文本索引查询
> > >
> > > 举例：较为复杂，请参考官网
> >
> > ### \$where
> >
> > > 释义：把一个含有 JavaScript 表达式的字符串或者是整个 JavaScript 函数转换到查询系统中，对内嵌文档不起作用
> > >
> > > 举例：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
db.myCollection.find({ \$where: "this.credits == this.debits" });
```

> > >

```js
db.myCollection.find({
  \$where: function() {
    return obj.credits == obj.debits;
  },
});
```

> > ## 1.5 Geospatial Query Operators
> >
> > 请参考官网
> >
> > ## 1.6 数组操作符
> >
> > ### \$all
> >
> > > 语法：

```js
{ < field >： { \$ all ： [ < value1 > ， < value2 > ... ] } }
```

> > > 释义：匹配文档的数组字段中包含所有指定元素的文档
> > >
> > > 举例：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
//  查询 articles 集合中 tags 字段（是个数组）包含“ssl”和“security”的文档（包含，但并不是全部等于）
db.articles.find({ tags: { \$all: [["ssl", "security"]] } });
```

> > ### \$elemMatch（query）
> >
> > > 语法：

```js
{ <field>: { \$elemMatch: { <query1>, <query2>, ... } } }
```

> > > 释义：匹配内嵌文档或数组中的部分 field
> > >
> > > 举例：
> > >
> > > 假设现有集合：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
 { \_id: 1, results: [ 82, 85, 88 ] }
 { \_id: 2, results: [ 75, 88, 89 ] }
```

> > > 查询 results 数组中含有区间[80,85)元素的文档（结果为第一条）：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
db.scores.find({ results: { $elemMatch: { $gte: 80, \$lt: 85 } } });
```

> > ### \$size
> >
> > > 语法：

```js
{ <field>: { \$size: <number> }
```

> > > 释义：匹配数组长度为指定大小的文档
> > >
> > > 举例：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
//  查询已经集齐了 5 张福卡的文档：
db.person.find({ card: { \$size: 5 } });
```

> > ## 1.7 Bitwise Query Operators
> >
> > 请参考官网
> >
> > ## 1.8 投影操作符
> >
> > ### \$(projection)
> >
> > > 释义：查询数组中首个匹配条件的元素，相当于 findOne()方法
> > >
> > > 举例：
> > >
> > > 假设现有如下集合 students：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
{ "\_id" : 1, "semester" : 1, "grades" : [ 70, 87, 90 ] }
{ "\_id" : 2, "semester" : 1, "grades" : [ 90, 88, 92 ] }
{ "\_id" : 3, "semester" : 1, "grades" : [ 85, 100, 90 ] }
{ "\_id" : 4, "semester" : 2, "grades" : [ 79, 85, 80 ] }
{ "\_id" : 5, "semester" : 2, "grades" : [ 88, 88, 92 ] }
{ "\_id" : 6, "semester" : 2, "grades" : [ 95, 90, 96 ] }
```

> > > 查询 semester=1，并且 grades 中符合大于等于 85 的元素的第一个元素：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)
> > >
> > > 1. db.students.find( { semester: 1, grades: { $gte: 85 } },{ "grades.$": 1 } )
> > >
> > > 返回如下结果：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
{ "\_id" : 1, "grades" : [ 87 ] }{ "\_id" : 2, "grades" : [ 90 ] }{ "\_id" : 3, "grades" : [ 85 ] }
```

> > ### \$elemMatch(projection)
> >
> > > 释义：用于数组或内嵌文档中的元素匹配（子元素匹配），只会返回匹配的第一个元素！！！
> > >
> > > 举例：
> > >
> > > 假设现有如下集合：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
 {
 \_id: 1,
 zipcode: "63109",
 students: [
 ​ { name: "john", school: 102, age: 10 },
 ​ { name: "jess", school: 102, age: 11 },
 ​ { name: "jeff", school: 108, age: 15 }
 ​ ]
 }
 {
 \_id: 2,
 zipcode: "63110",
 students: [
 ​ { name: "ajax", school: 100, age: 7 },
 ​ { name: "achilles", school: 100, age: 8 },
 ​ ]
 }
 {
 \_id: 3,
 zipcode: "63109",
 students: [
 ​ { name: "ajax", school: 100, age: 7 },
 ​ { name: "achilles", school: 100, age: 8 },
 ​ ]
 }
```

> > > 查询 zipcode 为 63109 并且 students 数组中 school=102 的文档：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
db.schools.find(
  { zipcode: "63109" },
  { students: { \$elemMatch: { school: 102 } } }
);
```

> > > 返回如下结果：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
 { "\_id" : 1, "students" : [ { "name" : "john", "school" : 102, "age" : 10 } ] }{ "\_id" : 3 }
```

> > ### \$meta
> >
> > > 语法：

```js
{ \$meta: <metaDataKeyword> }
```

> > > 释义：请参考官网
> >
> > ### \$slice(projection)
> >
> > > 释义：在查询中将数组进行切片（类似于分页）
> > >
> > > 举例：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
//  （1）查询结果中，对于 comments 数组的元素只显示前 5 个：
db.posts.find({}, { comments: { \$slice: 5 } });
//  （2）查询结果中，对于 comments 数组的元素只显示后 5 个：
db.posts.find({}, { comments: { \$slice: -5 } });
//  （3）查询结果中，对于 comments 数组的元素跳过（skip）前 20 个，并只显示（limit）10 个元素（即 21-30）：
db.posts.find({}, { comments: { \$slice: [20, 10] } });
//  （4）同理，跳过后 20 个，并显示 10 个：
db.posts.find({}, { comments: { \$slice: [-20, 10] } });
```

> > # 2.更新操作符
> >
> > ## 2.1 字段更新
> >
> > ### \$inc
> >
> > > 语法：

```js
{ \$inc: { <field1>: <amount1>, <field2>: <amount2>, ... } }
```

> > > 释义：将文档中的某个 field 对应的 value 自增/减某个数字 amount
> > >
> > > 举例：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
// 将\_id 为 1 的文档的 age 字段在原来的基础上+1：
db.person.update({ \_id: 1 }, { \$inc: { age: 1 } });
```

> > ### \$mul
> >
> > > 语法：

```js
{ \$mul: { field: <number> } }
```

> > > 释义：将文档中的某个 field 对于的 value 做乘法操作
> > >
> > > 举例：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
// <!-- 将\_id 为 1 的文档的 price 值乘以 1.25 并更新： -->
db.products.update({ \_id: 1 }, { \$mul: { price: 1.25 } });
```

> > ### \$rename
> >
> > > 语法：

```js
{\$rename: { <field1>: <newName1>, <field2>: <newName2>, ... } }
```

> > > 释义：重命名文档中的指定字段的名
> > >
> > > 举例：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
//  将\_id 为 1 的文档的 nickname 字段重命名为 alias，cell 字段重命名为 mobile
db.person.update(
  { \_id: 1 },
  { \$rename: { nickname: "alias", cell: "mobile" } }
);
```

> > ### \$setOnInsert
> >
> > > 语法：

```js
db.collection.update( <query>, { \$setOnInsert: { <field1>: <value1>, ... } }, { upsert: true })
```

> > > 释义：配合 upsert 操作，在作为 insert 时可以为新文档扩展更多的 field
> > >
> > > 举例：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
//  将\_id 为 1 的文档的 item 字段更改为 apple，并插入新字段 defaultQty，值为 100
db.products.update(
  { \_id: 1 },
  { $set: { item: "apple" }, $setOnInsert: { defaultQty: 100 } },
  { upsert: true }
);
```

> > ### \$set
> >
> > > 语法：

```js
{ \$set: { <field1>: <value1>, ... } }
```

> > > 释义：更新文档中的某一个字段，而不是全部替换
> > >
> > > 举例：
> > >
> > > 假设现有文档：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
 {\_id:1,name:"zhangsan",sex:"男"}
```

> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
// 如果这样写：
db.person.update({\_id:1},{sex:"女"});
// 则更改之后的结果是酱的：
{\_id:1,sex:"女"}
// 若只想更改 sex 字段，可以这样写：
db.person.update({\_id:1},{\$set:{sex:"女"}});
```

> > ### \$unset
> >
> > > 语法：

```js
{ \$unset: { <field1>: "", ... } }
```

> > > 释义：删除文档中的指定字段，若字段不存在则不操作
> > >
> > > 举例：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
//  删除\_id 为 1 的文档的 name 字段
db.person.update({ \_id: 1 }, { \$unset: { name: "" } });
```

> > ### \$min
> >
> > > 语法：

```js
{ \$min: { <field1>: <value1>, ... } }
```

> > > 释义：将文档中的某字段与指定值作比较，如果原值小于指定值，则不更新；若大于指定值，则更新
> > >
> > > 举例：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
//  假设现有文档：
 { \_id: 1, highScore: 800, lowScore: 200 }
//  执行：
 db.scores.update( { \_id: 1 }, { \$min: { lowScore: 150 } } )
//  执行结果：
 { \_id: 1, highScore: 800, lowScore: 150 }
```

> > ### \$max
> >
> > > 语法：

```js
{ \$max: { <field1>: <value1>, ... } }
```

> > > 释义：与\$min 功能相反
> >
> > ### \$currentDate
> >
> > > 语法：

```js
{ \$currentDate: { <field1>: <typeSpecification1>, ... } }
```

> > > 释义：设置指定字段为当前时间
> > >
> > > 举例：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)
> > >
> > > 1. db.person.update( { \_id: 1 }, { $currentDate: { "lastLogin": { $type: "timestamp" } } })
> >
> > ## 2.2 数组更新
> >
> > ### \$（update）
> >
> > > 语法：

```js
{ "<array>.\$" : value }
```

> > > 释义：请参考官网
> >
> > ### \$addToSet
> >
> > > 语法：

```js
{ \$ addToSet ： { < field1 >： < value1 > ， ... } }
```

> > > 释义：用于添加一个元素到 array 中，一般用于 update
> > >
> > > 举例：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
// 假设现有文档：
{ \_id: 1, letters: ["a", "b"] }
// 执行：
db.test.update({\_id:1},{\$addToSet:{letters:"c"}})
// 结果：
{ "\_id" : 1, "letters" : [ "a", "b", "c" ] }
// 执行：
db.test.update({\_id:1},{\$addToSet:{letters:["d","e"]}})
// 结果：
{ "\_id" : 1, "letters" : [ "a", "b", "c", [ "d", "e" ] ] }
// 注意，若想让添加的多个元素分开成单个元素的效果，请参考\$each 的使用方法
```

> > ### \$pop
> >
> > > 语法：

```js
{ \$pop: { <field>: <-1 | 1>, ... } }
```

> > > 释义：删除数组中的第一个或最后一个元素，-1 表示第一个，没错，第一个；1 表示最后一个！
> > >
> > > 举例：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
db.test.update({ \_id: 1 }, { \$pop: { letters: -1 } });
```

> > ### \$pullAll
> >
> > > 语法：

```js
{ \$pullAll: { <field1>: [ <value1>, <value2> ... ], ... } }
```

> > > 释义：删除数组或内嵌文档字段中所有指定的元素
> > >
> > > 举例：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
//  假设现有文档：
 { \_id: 1, scores: [ 0, 2, 5, 5, 1, 0 ] }
//  执行：
 db.test.update( { \_id: 1 }, { \$pullAll: { scores: [ 0, 5 ] } } )
//  结果：
 { "\_id" : 1, "scores" : [ 2, 1 ] }
```

> > ### \$pull
> >
> > > 语法：

```js
{ \$pull: { <field1>: <value|condition>, <field2>: <value|condition>, ... } }
```

> > > 释义：删除满足条件的元素
> > >
> > > 举例：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
// 假设现有文档：
{ \_id: 1, votes: [ 3, 5, 6, 7, 7, 8 ] }
// 执行：
db.test.update( { \_id: 1 }, { $pull: { votes: { $gte: 6 } } } )
//  结果：
 { \_id: 1, votes: [ 3, 5 ] }
```

> > > 更多用法及实例，请参考官网
> >
> > ### \$pushAll
> >
> > > 释义：自 v2.4 开始，方法弃用，请使用$push和$each 来配合实现
> >
> > ### \$push
> >
> > > 语法：

```js
{ \$push: { <field1>: <value1>, ... } }
```

> > > 释义：往数组中追加指定的元素，若文档中数组不存在，则创建并添加指定元素，自 v2.4 起，添加了对\$.each 的支持
> > >
> > > 举例：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
db.students.update({ \_id: 1 }, { \$push: { scores: 89 } });
```

> > ### \$each
> >
> > > 语法：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
{ $addToSet: { <field>: { $each: [ <value1>, <value2> ... ] } } }
{ $push: { <field>: { $each: [ <value1>, <value2> ... ] } } }
```

> > > 释义：需要搭配$addToSet或$push 方可使用
> >
> > ### \$sort
> >
> > > 语法：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
 {
  \$push: {
    ​ <field>: {
    ​ \$each: [ <value1>, <value2>, ... ],
    ​ \$sort: <sort specification>
    ​ }
  }
 }
```

> > > 释义：自 v2.4 加，配合\$push 使用，表示给文档中的指定数组元素排序，1 是升序，-1 是降序
> > >
> > > 举例：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
 db.students.update(
 { \_id: 1 },
  {
    ​ \$push: {
      ​ quizzes: {
        ​ \$each: [ { id: 3, score: 8 }, { id: 4, score: 7 }, { id: 5, score: 6 } ],
        ​ \$sort: { score: 1 }
      ​ }
  ​   }
  }
)
```

> > ### \$position
> >
> > > 语法：
> > >
> > > [plain][view plain](http://blog.csdn.net/qq_16313365/article/details/58599253#)

```js
 {
  \$push: {
    ​ <field>: {
    ​ \$each: [ <value1>, <value2>, ... ],
    ​ \$position: <num>
    ​ }
  }
 }
```

> > > 释义：自 v2.6 加，配合\$push 使用表示往数组元素中的指定位置插入元素
