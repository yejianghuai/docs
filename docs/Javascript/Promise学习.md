---
 title: Promise
---
# Promise应用场景：

## 1、Promise.all(iterable):(参数是一个可以迭代的对象，如Array)

### 返回值：

```javascript
//如果传递的对象（iterable）是个空，则是已经解决的Promise
Promise.all([]).then(res=>{
	console.log(res) // []
})
//异步解析Promise（如果传递的iterable不包含Promise），在以下情况下，谷歌浏览器会返回已解决的承诺
Promise.all([1,2,3]).then(res=>{
    console.log(res);//[1,2,3]
})
//当给定的可迭代对象中的所有Promise已经解决，或者任何Promise均被拒绝时，此时返回的Promise将被异步解析/拒绝（堆栈为空时）
// 1、当给定的可迭代对象中的所有Promise已解决
let promise1 = new Promise((resolve,reject)=>{
    resolve(1) //返回成功
})
let promise2 = new Promise((resolve,reject)=>{
    reject(2) //返回失败
}})
Promise.all([promise1,promise2,3]).then(res=>{
    console.log(res)
}).catch(error=>{
    console.log(error) //2
})
//这个方法对于汇总多个Promise的结果很有用，在ES6中可以将多个Promise.all异步请求并行操作
//1、当所有结果成功返回时，按照请求顺序返回成功
//2、当其中一个方法失败时，则进入失败（所有应用Promise.all一般为枚举表请求，且保证改接口正确）


//应用场景1：多个请求合并在一起
//还有一种情况，当一个组件中的请求都需要loading的时候，每次请求都需要设置一次loading，但是如果这个时候我们用Promise.all就不需要每次请求都加载一次loading，而在Promise.all里面直接加一次loading就可以了

//1、获取身份枚举
function getUserEnums(){
    return new Promise((res,rej)={
        res("身份枚举")
    })
}
//2、获取公司枚举
function getCmpEnums(){
    return new Promise((res,rej)={
        res("公司枚举")
    })
}
//此时接口为1和2，然后我们应该用Promise.all来获取接口的内容
function initLoad(){
	//loading.show ->加载loading
    Promise.all([getUserEnums(),getCmpEnums()]).then(res=>{
        console.log(res) //res返回的是一个数组
        //loading.hide() ->关闭loading
    }).catch(err=>{
        //loading.hide() ->关闭loading
        console.log(err)
    })
}
initLoad() //初始化数据   
```

```JavaScript
//2、应用场景2：合并请求结果并处理错误
//将多个请求合并在一起，即使有的请求失败了，也要返回给我们，我们只需要在一个地方处理这些数据和错误的逻辑就可以了
//1、获取身份枚举
function getUserEnums(){
    return new Promise((res,rej)={
        res("身份枚举")
    })
}
//2、获取公司枚举
function getCmpEnums(){
    return new Promise((res,rej)={
        res("公司枚举")
    })
}
function initLoad(){
	//loading.show()
    Promise.all([
        getUserEnums().catch(err=>err),
        getCmpEnums().catch(err=>err)
    ]).then(res=>{
        console.log(res)//["用户身份枚举","公司枚举"]
        if(res[0]==="身份枚举"){
            //渲染
        }else if(res[1] === "公司枚举"){
            //渲染
        }
        //loading.hide()
    })
}  
initLoading()     ;
//有的时候页面挂了，可能是因为某个接口的异常，或许只是一个无关紧要的接口挂掉了，那样的话，会导致整个页面的数据都渲染不出来，Promise.all告诉我们，如果参数中的Promise有一个失败的reject，此时会回调失败的reject，就不再执行then方法的回调，以上用例正好可以解决这一问题   
```

```javascript
//应用场景3：验证多个请求的结果是否都满足条件

function verify1(content){
    return new Promise((res,rej)=>{
        res(true)
    })
}
function verify2(content){
    return new Promise((res,rej)=>{
        res(true)
    })
}
Promise.all([verity1('检验字段1的内容'),verity2('检验字段2的内容')]).then(res=>{
    console.log(res) //true,true,true
    let verifyResult = result.every(item=>item)
    //验证结果
    console.log(verifyResult?'通过验证':'未通过验证') //通过验证
}).catch(err=>{
    console.log(err)
})
```

## 2、Promise.race(iterable)：iterable可迭代对象如Array

### 返回值：Promise.racr(iterable)方法返回一个Promise，一旦迭代器中的某个Promise解决或者拒绝，返回的Promise就会解决或者拒绝

### 描述：race函数返回一个Promise，它将与第一个传递的promise相同的完成方式被完成，它可以是完成（resolve），也可以是失败（reject），这要取决于第一个完成的方式是两个中的哪一个

### 如果传的迭代是空的，则返回promise将会永远等待

### 如果迭代包含一个或多个非承诺值和/或已解决/拒绝的承诺，则Promise.race将解析为迭代中找到的第一个值

```javascript
//应用场景1：图片请求超时
//请求摸个图片资源
function requestImg(){
	let p = new Promise((res,rej)=>{
		let img = new Image()
		img.onload = function(){
			res(img)
		}
		//img.src = "https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg"; 末尾不带1是正确的
		img.src = "https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg1"; //错误的
	})
	return p;
}
//延时函数，用于给请求计时
function timeout(){
	let p = new Promise((res,rej)=>{
		setTimeout(()=>{
			rej("图片请求超时")
		},5000)
	})
	return p
}
Promise.race([requestImg(),timeout()]).then(res=>{
	console.log(results)
}).catch(err=>{
	console.log(err)
})

//应用场景2：请求超时提示
//有些时候，我们前一秒刷着新闻，下一秒进电梯，手机会提示“网络不佳”，这是如何做到的

//请求
function request(){
    return new Promise((res,rej)=>{
        res("请求成功")
    }})
}
//请求超时
function timeout(){
    let p = new Promise((res,rej)=>{
        setTimeout(()=>{
            reject("网络不佳")
        },3000)
    })
    return p
}
Promise.race([request(),timeout()]).then(res=>{
    console.log(res) //请求成功
}).catch(err=>{
    console.log(err) //网络不佳
})
```

## 3、Promise.prototype.then

```javascript
//应用场景1：下个请求依赖上个请求的结果
//如：登录界面后每次的请求都必须带上token，既下一次的请求要依赖上一次请求返回的数据
function A(){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res("B的依赖数据")
        },300)
    })
}
function B(params){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res(params+"C依赖的数据")
        },500)
    })
}
function C(params){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            resolve(params)
        },1000)
    })
}
//此时我们期望是走try，由于A B C模拟的请求中没有用到reject，用try catch捕获错误
try{
    A().then(res=>B(res)).then(res=>C(res)).then(res=>{
        console.log(res) //B依赖的数据C依赖的数据
    })
}

//应用场景2：中间件功能的使用
//接口返回的数据量比较大，在一个then里面处理会显得臃肿，多个渲染数据分别给个then，让其各司其职
let result = {
    bannerList:[{img:'轮播图地址'}],
    storeList:[{name:'店铺列表'}],
    categoryList:[{name:'分类列表'}] 
    //……
}
function getInfo(){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res(result)
        })
    })
}
getInfo().then(res=>{
    let {bannerList} = res
    //渲染轮播图
    console.log(bannerList)
    return res
}).then(res=>{
    let {storeList} = res
    //渲染店铺列表
    console.log(storeList)
    return res
}).then(res=>{
    let {categoryList} = res
    //渲染分类列表
    console.log(categoryList)
    return res
})
```



## 4、async 和 await的使用：如果说Promise解决了地狱回调的问题，那么，async和await就是解决了Promise重复调用then的问题

### 在Es7中新增了异步编程的方法，async/await的实现是基于Promise的，简单而言，就是async函数返回Promise对象，是generator语法糖，很多人认为async/await的终极解决方案是：

- 语法简洁，更像是同步代码，也更符合普通的阅读习惯
- 改进了JavaScript中异步操作串行执行的代码组织方式，减少callback的嵌套
- Promise中不能自定义使用try/catch进行；错误捕获，但是在async/await中可以像处理同步代码处理错误

不过也存在一些缺陷，await会将异步代码的结构改成同步代码，如果多个异步代码没有依赖性，却使用了await会导致性能的下降，如：

```javascript
async function test(){
	//如果没有代码依赖性的话，完全可以使用Promise.all的方式
	//如果有代码依赖性建议使用async/await
	await fetch(url1)
	await fetch(url2)
	await fetch(url3)
}
```

其次，如果await等待的promise是个reject，那么这个await将会卡在那边，而且他下方的任何代码也将不在执行

```js
let p1 = Promise.reject(100)a
async function fn1(){
	let resylt = await p1 //此时的p1只有reject，而await只返回resolve，所以此时相当于return
	console.log(1) //不会执行，不会再控制台看到1
}
```

