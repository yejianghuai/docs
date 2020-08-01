---
 title: async和await
---

- 什么是async：

  -  async其实是ES7的才有的关键字，放在这里说，其实是和我们前面所说的Promise，Generator有很大关联的。async的意思是"异步"，顾名思义是有关异步操作有关的关键字。

  - ```js
    async function helloAsync(){
        return "helloAsync";
      }
      console.log(helloAsync())//Promise {<resolved>: "helloAsync"}
    ```

  - 申明async方法比较简单，只需要在普通的函数前加上"async"关键字即可。我们执行下这个函数，发现并没有返回字符串"helloAsync",而是通过Promise.resolved()将字符串封装成了一个Promise对象返回。

    

- 什么是await：

  - await关键字不能单独使用，是需要使用在async方法中。 await字面意思是"等待"，那它是在等什么呢？它是在等待后面表达式的执行结果。

  - ````js
    function testAwait(){
       return new Promise((resolve) => {
              setTimeout(function(){
              	console.log("testAwait");
              	resolve();
              }, 1000);
           });
      	}
      async function helloAsync(){
      	await testAwait();
      	console.log("helloAsync");
      }
      helloAsync();
    ````

  - 分析：

    - 1、testAwait()方法中new一个Promise对象返回，promise对象中用setTimeout模拟一个异步过程，即1s后打印"testAwait"。
    - 2、helloAsync()方法中，await testAwait(),表示将阻塞这里，等待testAwait这个异步方法执行并返回结果后，才继续下面的代码。
    - 由此可以看出await其实就是将asnyc阻塞等到promise函数执行完成之后才放行，也就是说await其实就是在等promise

- 最后看一个例子

  ```js
  //准备
     function prepare(){
     	   return new Promise((resolve) => {
             setTimeout(function(){
               console.log("prepare chicken");
               resolve();
           },500)
         });  
     }
   
     //炒鸡
     function fired(){
          return new Promise((resolve) => {
             setTimeout(function(){
               console.log("fired chicken");
               resolve();
           },500)
         }); 
     }
     //炖鸡
     function stewed(){
          return new Promise((resolve) => {
             setTimeout(function(){
               console.log("stewed chicken");
               resolve();
           },500)
         }); 
     }
     //上料
     function sdd(){
          return new Promise((resolve) => {
             setTimeout(function(){
               console.log("sdd chicken");
               resolve();
           },500)
         }); 
     }
     //上菜
     function serve(){
          return new Promise((resolve) => {
             setTimeout(function(){
               console.log("serve chicken");
               resolve();
           },500)
         });
     }
     async function task(){
     	console.log("start task");
    	await prepare();
    	await fired();
    	await stewed();
    	await sdd();
    	await serve();
    	console.log("end task");
    }
    task();
  ```

  最后会按顺序输出，这就是await的阻塞作用，完美实现异步请求
