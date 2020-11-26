---
 title: JS 面向对象
 date: 2018-12-20
 categories:
 - javascript
 tags:
 - javascript
---
<Boxx/>
# JavaScript面向对象编程

## 1、单体模式

```javascript
let Teacher = {
	name:'Mrs.Ye',
	age:18,
	showName:function(){
		return this.name
	}
};
Teacher.showName();
```

## 2、原型模式

```javascript
//属性放在构造函数，方法放在原型上
function Teacher(name,age){
    this.name = name;
    this.age = age;
}
Teacher.prototype.showName = function(){
    return this.name;
}
let MrsYe = new Teacher('Mrs.Ye')
MrsYe.showName()
```

## 3、伪类模式

```javascript
class Teacher{
	constructor(name.age){
		this.name = name;
		this.age = age
	}
	showName(){
		return this.name
	}
}
let MrsYe = new Teacher("Mrs.Ye");
MrsYe.showName()
```

