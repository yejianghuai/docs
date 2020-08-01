---
 title: 静态实例、类、继承
---
# es5、es6中静态实例、类、继承分析

首先是在es5中，原生js实现类和继承

```js
/*
*es5实现通过原型链继承构造函数中的属性和方法
*es5实现通过静态方法继承构造函数中的属性和方法
*/
function Person(name,age){
    //构造函数中的方法属性
    this.name = name;
    this.age = age;
    this.run = function(){
        console.log(`${this.name}---${this.age}`);
    }
}
// 原型链上的属性和方法可以被多个实例共享
Person.prototype.sex='男';
Person.prototype.work = function(){
    console.log(`${this.name}---${this.age}---${this.sex}`);
}

// 静态方法
Person.setName = function(){
    console.log('静态方法');
}
var  p = new Person('张三','20')//实例方法是通过实例化来调用的，静态是通过类名直接调用

p.run();
p.work();
Person.setName();//执行静态方法

```

## es5继承

```js
// es5中的继承
/**
 * 原型链继承和对象冒充继承
 * 对象冒充继承：没法继承原型链上的属性和方法
 * 原型链继承：可以继承构造函数里面以及原型链上面的属性和方法，实例化子类的时候没办法给父类传参
 */
function Person(name,age){
    this.name=name;
    this.age=age;
    this.run=function(){
        console.log(`${this.name}---${this.age}`);
    }
}

Person.prototype.work=function(){
    console.log('我是work方法');
}
function Web(name,age){
    Person.call(this,name,age)//对象冒充实现继承
}
Web.prototype = new Person();
var w= new Web('李四',20);
w.run();
```

-----------------------------------------------------------------------------------------------------------------------------------------------------------

## es6继承、类、静态实例

```js
//es6中的类
// 定义Person类
class Person{
    constructor(name,age){
        this._name=name;
        this._age=age;
    }
    // 定义方法：     注意：在es6中方法之间没有逗号
    getName(){
        console.log(this._name);
    }
    setName(name){
        this._name = name
    }
}
var p =new Person('张三','22');

p.getName();
p.setName('李四');
p.getName();
```

```js
/**
 * es6继承  通过extends 继承
 */
class Person{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    getInfo(){
        console.log(`姓名：${this.name} --- 年龄：${this.age}`);
    }
    run(){
        console.log('run');
        
    }
}
class Web extends Person{//继承了Person  extends  super(name,age)
    constructor(name,age,sex){
        super(name,age);//实例化子类的时候把子类的数据传给父类
        this.sex = sex;
    }
    print(){
        console.log(this.sex);
        
    }
}
var w= new Web('张三','20','男');
w.getInfo();
// w.print()
```

```js
// es6中的静态方法
class Person{
    constructor(name) {
        this._name = name; //属性 
        
    }
    run(){//实例方法
        console.log(this._name);
    }
    static work(){
        //静态方法
        console.log('这是个静态方法');
        
    }
}

Person.instance = '这也是个静态方法' 

var p = new Person('张三');//实例化方法
p.run();
Person.work()
```

---------------------------------------------------------------------------------------------------------------------------------------------------------

## ES6通过单例实现一次记载数据库

```js
class Db{
    //单例--实例会只执行一次
    static getInstance(){
    //开始判断是否已经实例化过，没有的话实例一次，如果已经实例化就走下边的return，将第一次实例化的内容封装在instance中，实现了只执行一次实例化-------优化MongoDB数据库打开操作
        if (!Db.instance) {
            Db.instance = new Db();
        }
        return Db.instance;
    }
    constructor(){
        console.log('实例化会触发构造函数');
        this.connect();
    }
    connect(){
        console.log('链接数据库')
    }
    find(){
        console.log('查询数据库')
    }
}
var myDb = Db.getInstance();
```

