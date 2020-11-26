---
 title: async和await
 date: 2020-01-28
 categories:
  - javascript
 tags:
  - ES6
---
<Boxx/>
- 什么是 async：

  - async 其实是 ES7 的才有的关键字，放在这里说，其实是和我们前面所说的 Promise，Generator 有很大关联的。async 的意思是"异步"，顾名思义是有关异步操作有关的关键字。

  - ```js
    async function helloAsync() {
      return "helloAsync";
    }
    console.log(helloAsync()); //Promise {<resolved>: "helloAsync"}
    ```

  - 申明 async 方法比较简单，只需要在普通的函数前加上"async"关键字即可。我们执行下这个函数，发现并没有返回字符串"helloAsync",而是通过 Promise.resolved()将字符串封装成了一个 Promise 对象返回。

* 什么是 await：

  - await 关键字不能单独使用，是需要使用在 async 方法中。 await 字面意思是"等待"，那它是在等什么呢？它是在等待后面表达式的执行结果。

  - ```js
    function testAwait() {
      return new Promise((resolve) => {
        setTimeout(function() {
          console.log("testAwait");
          resolve();
        }, 1000);
      });
    }
    async function helloAsync() {
      await testAwait();
      console.log("helloAsync");
    }
    helloAsync();
    ```

  - 分析：

    - 1、testAwait()方法中 new 一个 Promise 对象返回，promise 对象中用 setTimeout 模拟一个异步过程，即 1s 后打印"testAwait"。
    - 2、helloAsync()方法中，await testAwait(),表示将阻塞这里，等待 testAwait 这个异步方法执行并返回结果后，才继续下面的代码。
    - 由此可以看出 await 其实就是将 asnyc 阻塞等到 promise 函数执行完成之后才放行，也就是说 await 其实就是在等 promise

* 最后看一个例子

  ```js
  //准备
  function prepare() {
    return new Promise((resolve) => {
      setTimeout(function() {
        console.log("prepare chicken");
        resolve();
      }, 500);
    });
  }

  //炒鸡
  function fired() {
    return new Promise((resolve) => {
      setTimeout(function() {
        console.log("fired chicken");
        resolve();
      }, 500);
    });
  }
  //炖鸡
  function stewed() {
    return new Promise((resolve) => {
      setTimeout(function() {
        console.log("stewed chicken");
        resolve();
      }, 500);
    });
  }
  //上料
  function sdd() {
    return new Promise((resolve) => {
      setTimeout(function() {
        console.log("sdd chicken");
        resolve();
      }, 500);
    });
  }
  //上菜
  function serve() {
    return new Promise((resolve) => {
      setTimeout(function() {
        console.log("serve chicken");
        resolve();
      }, 500);
    });
  }
  async function task() {
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

  最后会按顺序输出，这就是 await 的阻塞作用，完美实现异步请求
