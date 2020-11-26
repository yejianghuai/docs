---
 title: JS Object
 date: 2019-12-28
 categories:
 - javascript
 tags:
 - javascript
---
<Boxx/>
# JavaScript Object的方法的应用

## Object.assign

```javascript
//Object.assign(target,source1,source2)
//改方法用于对象的合并，将对象（数据源）的所有可枚举属性，复制到目标对象（target）中。拷贝的属性有限制，只拷贝原对象的自身属性，不拷贝继承的属性，也不会拷贝不可枚举的属性（浅拷贝）
const target = {a:1,b:1};
const source1 = {b:2,c:2};
const source2 = {c:3};
console.log(Object.assign(target,source1,source2)); //{a:1,b:2,c:3} -->后面的会把前面的值覆盖掉
//特殊的情况
let obj = {a:1};
Object.assign(obj,undefined) === obj //true
Object.assign(obj,null) === obj //true

Object.assign([1,2,3],[4,5]); //[4,5,3] -->1对应下标为0，4对应下标也是0，所以4把1覆盖，同理5和2也是

//Object.assign()方法实行的是浅拷贝，而不是深拷贝

const obj1 = {a:{b:1}};
const obj2 = Object.assign({},obj1);
obj.a.b = 2;
console.log(obj.a.b);//2
obj.a.b = 3;
console.log(obj.a.b);//3
```

## Object.create  

```javascript
// Object.create ：创建一个对象
const obj = Object.create({a:1},{b:{value:2}});
//第一个参数是对象，对象为函数调用之后返回新对象的原型对象，第二个参数是对象本身的实例方法（默认是不能修改的，不能枚举）
Object.__proter__.a === 1;  //true
obj.b = 3;
console.log(obj.b);//2   ->不能修改，从定义是const也能看出是个常数，无法修改
//创建一个可写的，可枚举的，可配置的属性p
obj2 = Object.create({},{
    p:{
        value:2,//属性值
        writable:true,//是否可以重写值
        enumerable:true,//是否可枚举
        configurable:true //是否可以修改以上的几项配置
    }
})
obj2.p = 3
console.log(obj2.p); // 3 ->此时的object2是可以配置的可以重写值
//注意：enumerable会影响以下for……in遍历，包括对象原型上的属性
Object.keys  //只能遍历自身属性
JSON.stringfy //只能序列化自身属性
```

## Object.defineProperties

```javascript
//Object.defineProperties(object,{prop1:descriptor,prop2:descriptor})
//第一个参数是对象，第二个参数是传入的新的对象名和对应的配置项
let obj ={}
Object.defineProperties(obj,{
    "property1":{
        value:false,
        writable:true
    },
    "prop2":{
        value:1,
        writable:false
    }
})
console.log(obj.Property1);//false
console.log(obj.Prop2);//1
```

## Object.defineProperty

```javascript
//Object.defineProperty(object,prop,descriptor)--->定义对象属性（Vue 2.x的核心思想之一）
//第一个参数是对象，第二个参数是传入的新的对象名，第三个为配置项

//添加数据属性
let obj = {};
//1.添加一个数据属性
Object.defineProperty(obj,"newData",{
    value:110,
    writable:true,//是否可写
    enumerable:true,//是否可枚举
    configurable:true //是否可以更改以上配置项
});

console.log(obj.newData) //110

//2、修改数据属性
Object.defineProperty(obj,"newData",{
    writable:false
})
//添加访问属性
let obj2 = {}
//注意哦：
//1、第一参数必须是对象
//2、descriptor 不能同时具有（value或者writeable特性）（get 或者 set 特性）
//3、configurable 为false时，不能修改以上的配置
Object.defineProperty(obj2,"newDataSourse",{
    set:function(){
        this.otherProperty = x
    },
    get:function(){
        return this.otherProperty
    },
    enumerable:true,
    configurable:true
})

```

## Object.entries

```javascript
// Object.entries ：分割对象
const obj = {foo:'bar',size:111};
console.log(Object.entries(obj)); // [['foo','bar'],['size',111]]
console.log(Object.entries("abc")) //[["0","a"],["1","b"],["2","c"]]
console.log(Object.entries(100)); //[]
//总结：
//1、如果是对象，则将键值对分别做成数组输出：[[键，值],[键，值]]
//2、如果是字符串，则将对应的每个字符和对应的下标输出：'abc'===[["0","a"],["1","b"],["2","c"]]
//3、如果是数字，则直接谁出空数组，无法切割数字
```

## Object.freeze 

```javascript
// Object.freeze ：冻结一个对象&isFrozen判断一个对象是否已经被冻结
//冻结的对象是指那些不能添加新的属性，不能修改已有属性的值，不能删除已有属性，以及不能修改已有属性的可枚举性，可配置性，可写性的对象。也就是说，这个对象永远是不可变的。
//1、freeze方法：
let o3 = {a:1};
o3.b = 2 //添加b属性成功
Object.freeze(o3)
Object.isFrozen(o3) //true 对象已经冻结
o3.a = 2 //修改属性a失败
o3.c = 5 //添加属性c失败
delete o3.b //删除属性b失败

//2、isFrozen方法：
let o4 = {a:1}
o4.b = 2 //添加b属性成功
Object.priventExtensions(o4)
Object.defineProperties(o4,{
    a:{configurable:false,writable:false},
    b:{configurable:false,writable:false}
})
Object.isFrozen(o4) //true o4被冻结了
//总结：
//1、冻结对象的所有的自身属性都不能在以任何形式被修改
//2、任何尝试修改该对象的操作都会失败，可能是默认失败，也可能会抛出异常
//3、数据属性的值不能修改，访问器属性，（有getter和setter）也同样（但是由于是函数调用，给人的错觉是还可以修改这个属性，其实不行）
//4、如果一个属性的值是个对象，则这个对象中的属性是可以修改的，除非它也是个冻结对象

//浅冻结和深冻结
(function(){
    obj={
        internal:{}
    };
    Object.freeze(obj);//浅冻结
    obj.internal.a = "value";
    console.log(obj.internal.a);//'value'
    //想要让一个对象完全冻结，冻结所有对象中的对象，可以用以下的函数
    function deepFreeze(o){
        let prop,propKey;
        Object.freeze(o);//首先冻结第一层的对象
        for(propKey in o){
            prop=o[propKey];
            if(!o.hasOwnProperty(propKey) || !(typeof prop === 'object') || Object.isFrozen(prop)){
                continue
            }
            deepFreeze(prop);//递归,所有涉及到深的都需要运用到递归如：深拷贝也需要递归
        }
    }
    deepFreeze(obj);
    obj.internal.b = 'value';//默认失败
    console.log(obj.internal.b);//undefined 
})

```

## Object.fromEntries

```javascript
//Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。
Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }

// 例一
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);

Object.fromEntries(entries)
// { foo: "bar", baz: 42 }

// 例二
const map = new Map().set('foo', true).set('bar', false);
Object.fromEntries(map)
// { foo: true, bar: false }
```

## Object.getPrototypeOf 

```javascript
// Object.getPrototypeOf() ：获取指定对象的原型（内部[[getPrototypeOf]]属性的值
const prototype1 = {};
const object1 = Object.create(prototype1);
console.log(Object.getPrototypeOf(object1) === true); //true
//注意：
//Object.getPrototypeOf(Object)不是Object.prototype;
//Object.getPrototypeOf(Object)===Function.prototype;  ->true
```

## Object.setPrototypeOf

```javascript
//  Object.setPrototypeOf() ：设置一个指定的对象的原型
const obj = {a:1},proto = {b:2}
Object.setPrototypeOf(obj,proto)
obj.__proto__===proto //true
```

## Object.getOwnPropertyDescriptor 

```javascript
// Object.getOwnPropertyDescriptor ：获取该属性的描述对象
let obj = {foo:'123'};
Object.getOwmPropertyDescriptor(obj,'foo')
//{value:123,writable:true,enumerable:true,configurable:true}
```

## Object.getOwnPropertyDescriptors

```javascript
//Object.getOwnPropertyDescriptors ：返回指定对象的所有自身属性，
const obj = {
    foo:123,
    get bar(){return 'abc'}
};
console.log(Object.getOwnPropertyDescriptors(ob))
//{
//    foo:{
//        value:123,
//        writable:true,
//        enumerable:true,
//        configurable:true
//    },
//    bar:{
//        get:[Function:bar],
//        set:undefined,
//        enumerable:true,
//        configurable:true
//    }
//}
//使用场景：Object.assign()方法只可以拷贝源对象的可枚举的自身属性，同时拷贝时无法拷贝属性的特性，而且访问器属性会被转换成数据属性，也无法拷贝源对象的原型
//Object.create()方法可以实现上面说的，配合getPrototypeOf，以及getOwnPropertyDescriptors实现全面浅拷贝
//Object.create(
//	Object.getPrototypeOf(obj),
//    Object.getOwnPropertyDescriptors(obj)
//);
```

## Object.getOwnPropertyNames

```javascript
//该方法和Object.Keys()类似，单包含了遍历不可枚举的属性
let obj = Object.create({},{
    getFoo:{
        value:function(){return this.foo},
        enumerable:false
    }
});
obj.foo = 1
Object.getOwnPrototypeNames(obj).sort() //['foo','getFoo']
```

## Object.getOwnPropertySymbols

```javascript
var obj = {};
var a = Symbol("a");
var b = Symbol.for("b");

obj[a] = "localSymbol";
obj[b] = "globalSymbol";

var objectSymbols = Object.getOwnPropertySymbols(obj);

console.log(objectSymbols.length); // 2
console.log(objectSymbols)         // [Symbol(a), Symbol(b)]
console.log(objectSymbols[0])      // Symbol(a)
```

## Object.is 

```javascript
// Object.is ：用于判断两个值是否严格相等（===）
Object.is('foo','foo') //true
Object.os({},{}) //false
//和===不一样的地方
+0 === -0 //true
NaN === NaN // false

Object.is(+0,-0) //false
Object.is(NaN,NaN) //true
```

## Object.isFrozen

```javascript

```

## Object.isSealed

```javascript
//密封对象是指那些不能添加新的属性，不能删除已有属性，以及不能修改已有属性的可枚举性、可配置性、可写性，但可能可以修改已有属性的值的对象。

//1. 先讲seal 方法：
let o2 = {b:1}
o2.d = 2 //添加成功
let obj2 = Object.seal(o2);
obj2 === o2 //true 方法返回原对象，栈指针指向同一块内存
Object.isSealed(o2) //true
o2.b = 111 //修改b属性值成功
o2.f = 222 //静默失败，属性f没有成功添加
delete o2.b //静默失败，属性b没有成功删除

//2、讲下isSealed 方法：
let o = {};
Object.isSealed(o) // false
//之后通过Object.preventExtensions方法将空对象设置为不可扩展
Object.preventExtensions(o)
Object.isSealed(o) //true

//但是如果为非空的对象
let o2={a:1}
Object.preventExtensions(o2)
Object.isSealed(o2) //false

//因为属性a 是可配置的（configurable 为 true），所以不是密封的对象，修改方法如下：
let o2 = {a:1}
Object.preventExtensions(o2)
Object.defineProperty(o2,'a',{configurable:false})
Object.isSealed(o2) // true
//总结： 1.密封一个对象会让这个对象变的不能添加新属性，且所有已有属性会变的不可配置。
//      2.属性不可配置的效果就是属性变的不可删除，以及一个数据属性不能被重新定义成为访问器属性，或者反之。
//      3.但属性的值仍然可以修改。
//      4.尝试删除一个密封对象的属性或者将某个密封对象的属性从数据属性转换成访问器属性，结果会静默失败或抛出TypeError 异常（严格模式）。
```

## Object.keys 

```javascript
// Object.keys  ：遍历可枚举的属性，只包含对象本身可枚举属性，不包含原型链的可枚举属性--->常用属性
let arr = ["a","b","c"];
let obj = {foo:'bar',size:'111'};
let ArrayLike = {0:'a',1:'b',2:'c'};

console.log(Object.keys(arr));//["0","1","2"] -》给出下边
console.log(Object.keys(obj));//["foo","size"] -》给出对象名
console.log(Object.keys(ArrayLike));//["0","1","2"] -》给出对象名
//总结：
//1、若是遍历数组，则输出下标值
//2、若是遍历对象，则输出键名
```

## Object.values 

```javascript
// Object.values ：遍历可以枚举的属性值，只包含对象本身可以枚举的属性值，不包含原型链可枚举的属性值
let arr = ["a"."b","c"];
let obj = {foo:'bar',size:111};
let ArrayLike = {0:"a",1:"a",2:'c'};

console.log(Object.values(arr));// ["a"，"b","c"]
console.log(Object.values(arr));// {"bar",111}
console.log(Object.values(arr));// {"a","b","c"}
//总结：
//1、如果传入的数组，则返回值
//2、如果传入的对象，则返回值
//3、刚好和Object.Keys()完全相反
```

## Object.length

```javascript
Object.length //1
```

## Object.name

```javascript
Object.name //'object'
```

## Object.preventExtensions

```javascript
//  Object.preventExtensions ：让一个对象变得不可扩展，也就是永远不能再添加新的属性&isExtensiable判断一个对象是否可扩展
let empty = {}
Object.isExtensiable(empty) //true--->可扩展
empty.a = 1  //添加成功
//将对象变成不可扩展
Object.preventExtensions(empty)
Object.isExtensiable(empty) //false --->不可扩展

empty.b = 2 //默认失败，但不会抛出错误
empty.a = 5 //修改成功
//总结：
//1、preventExtensions 可以让对象变成不可扩展
//2、不可扩展的对象属性中含有的值依然是可以修改的
//3、如果给一个不可扩展的对象加属性会默认失败，但是不抛出错误
//4、Object.preventExtensions 只能阻止一个对象不能再添加新的自身属性，仍然可以为该对象的原型添加属性
```



## Object.prevebtExtensions

```javascript
//将要变得不可扩展的对象
// Object.preventExtensions将原对象变的不可扩展,并且返回原对象.
var obj = {};
var obj2 = Object.preventExtensions(obj);
console.log(obj === obj2);  // true
 
// 字面量方式定义的对象默认是可扩展的.
var empty = {};
console.log(Object.isExtensible(empty)); // true
 
// 但可以改变.
Object.preventExtensions(empty);
console.log(Object.isExtensible(empty)); // false
```

## Object.prototype

```javascript

```

## Object.seal 

```javascript
// Object.seal ：将一个对象密封isSealed判断一个对象是否是密封的
//密封的对象是指那些不能添加新的属性，不能删除已有的属性，以及不能修改已有属性的可枚举行，可配置性，可写行，但可能可以修改有属性的值的对象
//1、seal方法
let o2 = {b:1};
o2.d = 2 //添加属性成功
let obj2 = Object.seal(o2);
obj2 === o2 //true 方法返回原对象，栈指针指向同一块内存
Object.isSealed(o2); //true
o2.b = 111; //修改属性成功
o2.f = 222; //默认失败，属性f没有添加成功
delete o2.b //默认失败，属性b没有删除成功

//2、isSealed方法：
let o = {};
Object.isSealed(o) //false
//之后通过Object.preventExtensions方法将空对象设置成不可扩展
Object.preventExtensions(o);
Object.isSealed(o);//true

//但是如果是非空的对象
let o2 = {a:1};
Object.preventExtensions(o2);
Object.isSealed(o2); //false

//因为属性 a 是可配置的，所以不是密封的对象，修改方法如下：
let o2 = {a:1};
Object.preventExtensions(o2);
Object.defineProperty(o2,"a",{configurable:false});
Object.isSealed(o2);//true
//总结：
//1、密封一个对象会让这个对象变的不能添加新的属性，且所有已有属性变得不可配置
//2、属性不可配置的效果就是变得不可删除，以及一个数据属性不能被重新定义成为访问器属性，或者相反
//3、但是属性的值仍然是可以修改的
//4、常识删除一个密封对象的属性，或者将某个密封对象的属性从数据属性转换成访问器属性，结果会默认失败或者抛出异常
```

## Object.setPrototypeOf

```javascript
const obj = {a: 1}, proto = {b:2}
Object.setPrototypeOf(obj, proto)
obj.__proto__ === proto     //true

```

## Object.apply

```javascript

```

## Object.arguments

```javascript

```

## Object.bind

```javascript

```

## Object.call

```javascript

```

## Object.caller

```javascript

```

## Object.constructor

```javascript

```

## Object.toString

```javascript

```

## Object.hasOwnProperty

```javascript
//该方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性
let o = {a:"1"};
o.hasOwnProperty('a') //true
o.hasOwnProperty('b') //false  对象自身没有属性b
o.hasOwnProperty('toString');// false 不可以检测对象原型链上的属性

//如何遍历一个对象的所有自身属性，例如：
let buz = {
    fog:'stack'
};
for(let name in buz){
    if(buz.hasOwnProperty(name)){
        console.log("this os fog (''+ name +'') for sure.Value"+buz[name] )
    }else{
        console.log(name);//toString or something else
    }
}
```

## Object.isPrototypeOf()

```javascript
//isPrototypeOf方法用于测试一个对象是否存在于另一个对象的原型上
function Foo(){}
function Bar(){}
function Baz(){}

Bar.prototype = Object.create(Foo.prototype); //将对象Bar放到对象Foo中
Baz.prototype = Object.create(Bar.prototype); //将对象Baz放到对象Bar中

let baz = new Baz();

function Foo(){}console.log(Baz.prototype.isPrototyprOf(baz));//true
function Foo(){}console.log(Bar.prototype.isPrototyprOf(baz));//true
function Foo(){}console.log(Foo.prototype.isPrototyprOf(baz));//true
function Foo(){}console.log(Object.prototype.isPrototyprOf(baz));//true
```



## Object.isPrototypety

```javascript

```

## Object.propertyIsEnumerable

```javascript
// Object.propertyIsEnumerable：指定的属性是否可枚举
obj.propertyIsEnumerable(prop) ;//prop为被测试的属性名
//1、一般情况下
let o = {};
let a = [];
o.prop ='is enumerable';
a[0] = 'is enumerable'; 

o.propertyIsEnumerable('prop');//true
a.propertyIsEnumerable(0);//true

//2、浏览器内置对象
let a =['is enumerable'];

a.propertyIsEnumerable(0);//true
a.propertyIsEnumerable('length');//false

Math.property

```

## Object.toLocaleString

```javascript
//toString 方法不做过多介绍
//区别：
//的值是个时间对象时，toLocaleString会将转化的结果以本地表示。

(new Date).toString(); //"Mon Nov 06 2017 13:02:46 GMT+0800 (China Standard Time)"

(new Date).toLocaleString();  //"2017/11/6 下午1:03:12"

//当被转化的值是个时间戳时，toLocaleString会把时间戳每三位添加一个逗号，代码如下。

(Date.parse(new Date())).toLocaleString() //"1,509,944,637,000"

(Date.parse(new Date())).toString() //"1509944643000"

```

## Object.valueOf

```javascript
//备注：js对象中的valueOf()方法和toString()方法非常类似，但是，当需要返回对象的原始值而非字符串的时候才调用它，尤其是转换为数字的时候。如果在需要使用原始值的上下文中使用了对象，JavaScript就会自动调用valueOf()方法。

const o = {a: 1, valueOf: function(){ return 123123 } }
Number(o)    //123123

// 给大家出一个题
const o2 = {
    x: 1,
    valueOf: function(){
        return this.x++
    }
}

if(o2 == 1 && o2 == 2 && o2 == 3){
    console.log('down')
    console.log(o2.x)
}else{
    console.log('faild')
}

// Array：返回数组对象本身
var array = ["CodePlayer", true, 12, -5];
array.valueOf() === array;   // true

// Date：当前时间距1970年1月1日午夜的毫秒数
var date = new Date(2013, 7, 18, 23, 11, 59, 230);
date.valueOf()     // 1376838719230

// Number：返回数字值
var num =  15.26540;
num.valueOf()     // 15.2654

// 布尔：返回布尔值true或false
var bool = true;
bool.valueOf() === bool    // true
// new一个Boolean对象
var newBool = new Boolean(true);
// valueOf()返回的是true，两者的值相等
newBool.valueOf() == newBool     // true
// 但是不全等，两者类型不相等，前者是boolean类型，后者是object类型
newBool.valueOf() === newBool     // false

// Function：返回函数本身
function foo(){ 
}
foo.valueOf() === foo      // true
var foo2 =  new Function("x", "y", "return x + y;");
foo2.valueOf() === foo2    // true

// Object：返回对象本身
var obj = {name: "张三", age: 18};
obj.valueOf() === obj        // true

// String：返回字符串值
var str = "http://www.365mini.com";
str.valueOf() === str       // true
// new一个字符串对象
var str2 = new String("http://www.365mini.com");
// 两者的值相等，但不全等，因为类型不同，前者为string类型，后者为object类型
str2.valueOf() === str2      // false

```

## Object.__defineGetter__

```javascript
//Object.__defineGetter__
```

## Object.__defineSetter__

```javascript
//Object.__defineSetter__
```

## Object.__lookupGetter__

```javascript
//Object.__lookupGetter__
```

## Object.__lookupSetter__

```javascript
//Object.__lookupSetter__
```

## Object.__proto__

```javascript
//Object.__proto__
```

