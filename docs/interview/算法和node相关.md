---
title: "算法相关"
categories:
 - 面试
tags:
 - 算法
---
<Boxx/>
# 算法相关

## 1. [二分查找和冒泡排序](https://www.cnblogs.com/tine/p/5938844.html)

- 二分查找: 递归(分左右, 传递 start,end 参数)和非递归(使用 while(l < h))；要求有序数组
- 冒泡排序: 两个 for 循环

## 2. [快速排序](https://www.jianshu.com/p/e394f7012d75)

```javascript
function quickSort(arr) {
  if (arr.length < 2) return arr;
  var middle = Math.floor(arr.length / 2);
  var flag = arr.splice(middle, 1)[0];
  var left = [],
    right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < flag) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([flag], quickSort(right));
}
```

## 3. 最长公共子串

```javascript
function findSubStr(str1, str2) {
  if (str1.length > str2.length) {
    [str1, str2] = [str2, str1];
  }
  var result = "";
  var len = str1.length;
  for (var j = len; j > 0; j--) {
    for (var i = 0; i < len - j; i++) {
      result = str1.substr(i, j);
      if (str2.includes(result)) return result;
    }
  }
}
console.log(findSubStr("aabbcc11", "ppooiiuubcc123"));
```

## 4. [最长公共子序列(LCS 动态规划)](https://juejin.im/post/5b0c2583f265da08f50b4b33#heading-0)

[另一篇](https://segmentfault.com/a/1190000012864957)

```javascript
// dp[i][j] 计算去最大长度，记住口诀：相等左上角加一，不等取上或左最大值
function LCS(str1, str2) {
  var rows = str1.split("");
  rows.unshift("");
  var cols = str2.split("");
  cols.unshift("");
  var m = rows.length;
  var n = cols.length;
  var dp = [];
  for (var i = 0; i < m; i++) {
    dp[i] = [];
    for (var j = 0; j < n; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = 0;
        continue;
      }

      if (rows[i] === cols[j]) {
        dp[i][j] = dp[i - 1][j - 1] + 1; //对角＋1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); //对左边，上边取最大
      }
    }
    console.log(dp[i].join("")); //调试
  }
  return dp[i - 1][j - 1];
}
//!!!如果它来自左上角加一，则是子序列，否则向左或上回退。
//findValue过程，其实就是和 就是把T[i][j]的计算反过来。
// 求最长子序列
function findValue(input1, input2, n1, n2, T) {
  var i = n1 - 1,
    j = n2 - 1;
  var result = []; //结果保存在数组中
  console.log(i);
  console.log(j);
  while (i > 0 && j > 0) {
    if (input1[i] == input2[j]) {
      result.unshift(input1[i]);
      i--;
      j--;
    } else {
      //向左或向上回退
      if (T[i - 1][j] > T[i][j - 1]) {
        //向上回退
        i--;
      } else {
        //向左回退
        j--;
      }
    }
  }

  console.log(result);
}
```

## 5. [数组去重，多种方法](https://www.cnblogs.com/guangyan/articles/6682686.html)

- 双 for 循环, splice 剔除并 i--回退
- indexOf 等于 index
- filter indexOf === index
- 新数组 indexOf === index
- 使用空对象等

```js
function deleteObj(arr) {
  let result = [];
  result = arr.reduce((prev, cur, index, arr) => {
    prev.indexOf(JSON.stringfy(cur)) === -1 && prev.push(JSON.stringfy(cur));
    return prev;
  }, []);
  return result;
}
```

## 6. 实现一个函数功能：sum(1,2,3,4..n)转化为 sum(1)(2)(3)(4)…(n)

```javascript
// 使用柯里化 + 递归
function curry(fn) {
  var c = (...arg) =>
    fn.length === arg.length ? fn(...arg) : (...arg1) => c(...arg, ...arg1);
  return c;
}
```

[柯里化参考我的另一篇](https://www.jianshu.com/p/7fa99a4bee8b)

## 7. 反转二叉树

此题充满了嘲讽。。

```javascript
var invertTree = function(root) {
  if (root !== null) {
    [root.left, root.right] = [root.right, root.left];
    invertTree(root.left);
    invertTree(root.right);
  }
  return root;
};
```

## 8. 贪心算法解决背包问题

问题：给定背包容积，如何存放不同重量和价值物品，能获得最大价值？

```javascript
var items = ["A", "B", "C", "D"]; // 物品编号
var values = [50, 220, 60, 60]; // 物品价值
var weights = [5, 20, 10, 12]; // 物品重量
var capacity = 32; // 背包容积

greedy(values, weights, capacity); // 320

function greedy(values, weights, capacity) {
  var result = 0;
  var rest = capacity;
  var sortArray = [];
  var num = 0;
  values.forEach((v, i) => {
    sortArray.push({
      value: v,
      weight: weights[i],
      ratio: v / weights[i],
    });
  });
  // 按照性价比降序排序
  sortArray.sort((a, b) => b.ratio - a.ratio);
  sortArray.forEach((v, i) => {
    num = parseInt(rest / v.weight);
    rest -= num * v.weight;
    result += num * v.value;
  });
  return result;
}
```

## 9. 输入一个递增排序的数组和一个数字 S，在数组中查找两个数，使得他们的和正好是 S，如果有多对数字的和等于 S，输出两个数的乘积最小的。

```javascript
function FindNumbersWithSum(array, sum)
{
    var index = 0
    for (var i = 0; i < array.length - 1 && array[i] < sum / 2; i++) {
        for (var j = i + 1; j < array.length; j++) {
            if (array[i] + array[j] === sum) return [array[i], array[j]]
        }
        //index = array.indexOf(sum - array[i], i + 1)
       // if (index !== -1) {
       //     return [array[i], array[index]]
        //}
    }
    return []
```

### 10. [二叉树各种(层序)遍历](https://www.jianshu.com/p/3eee17f3c6f4)

[深度广度遍历](https://www.jianshu.com/p/5e9ea25a1aae)

```javascript
// 根据前序和中序重建二叉树
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function reConstructBinaryTree(pre, vin) {
  var result = null;
  if (pre.length === 1) {
    result = {
      val: pre[0],
      left: null,
      right: null,
    };
  } else if (pre.length > 1) {
    var root = pre[0];
    var vinRootIndex = vin.indexOf(root);
    var vinLeft = vin.slice(0, vinRootIndex);
    var vinRight = vin.slice(vinRootIndex + 1, vin.length);
    pre.shift();
    var preLeft = pre.slice(0, vinLeft.length);
    var preRight = pre.slice(vinLeft.length, pre.length);
    result = {
      val: root,
      left: reConstructBinaryTree(preLeft, vinLeft),
      right: reConstructBinaryTree(preRight, vinRight),
    };
  }
  return result;
}

// 递归
// 前序遍历
function prevTraverse(node) {
  if (node === null) return;

  console.log(node.data);
  prevTraverse(node.left);
  prevTraverse(node.right);
}

// 中序遍历
function middleTraverse(node) {
  if (node === null) return;

  middleTraverse(node.left);
  console.log(node.data);
  middleTraverse(node.right);
}

// 后序遍历
function lastTraverse(node) {
  if (node === null) return;

  lastTraverse(node.left);
  lastTraverse(node.right);
  console.log(node.data);
}

// 非递归
// 前序遍历
function preTraverse(tree) {
  var arr = [],
    node = null;
  arr.unshift(tree);
  while (arr.length) {
    node = arr.shift();
    console.log(node.root);
    if (node.right) arr.unshift(node.right);
    if (node.left) arr.unshift(node.left);
  }
}

// 中序遍历
function middleTraverseUnRecursion(root) {
  let arr = [],
    node = root;

  while (arr.length !== 0 || node !== null) {
    if (node === null) {
      node = arr.shift();
      console.log(node.data);
      node = node.right;
    } else {
      arr.unshift(node);
      node = node.left;
    }
  }
}

// 广度优先-层序遍历
// 递归
var result = [];
var stack = [tree];
var count = 0;
var bfs = function() {
  var node = stack[count];
  if (node) {
    result.push(node.value);
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
    count++;
    bfs();
  }
};
bfs();
console.log(result);
// 非递归
function bfs(node) {
  var result = [];
  var queue = [];
  queue.push(node);
  while (queue.length) {
    node = queue.shift();
    result.push(node.value);
    node.left && queue.push(node.left);
    node.right && queue.push(node.right);
  }
  return result;
}
```

### 11. [各种排序](https://www.jianshu.com/p/7e6589306a27)

```javascript
// 插入排序
function insertSort(arr) {
  var temp;
  for (var i = 1; i < arr.length; i++) {
    temp = arr[i];
    for (var j = i; j > 0 && temp < arr[j - 1]; j--) {
      arr[j] = arr[j - 1];
    }
    arr[j] = temp;
  }
  return arr;
}
console.log(insertSort([3, 1, 8, 2, 5]));

// 归并排序
function mergeSort(array) {
  var result = array.slice(0);
  function sort(array) {
    var length = array.length;
    var mid = Math.floor(length * 0.5);
    var left = array.slice(0, mid);
    var right = array.slice(mid, length);
    if (length === 1) return array;
    return merge(sort(left), sort(right));
  }
  function merge(left, right) {
    var result = [];

    while (left.length || right.length) {
      if (left.length && right.length) {
        if (left[0] < right[0]) {
          result.push(left.shift());
        } else {
          result.push(right.shift());
        }
      } else if (left.length) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
    return result;
  }
  return sort(result);
}
console.log(mergeSort([5, 2, 8, 3, 6]));

// 二分插入排序
function twoSort(array) {
  var len = array.length,
    i,
    j,
    tmp,
    low,
    high,
    mid,
    result;
  result = array.slice(0);
  for (i = 1; i < len; i++) {
    tmp = result[i];
    low = 0;
    high = i - 1;
    while (low <= high) {
      mid = parseInt((high + low) / 2, 10);
      if (tmp < result[mid]) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    for (j = i - 1; j >= high + 1; j--) {
      result[j + 1] = result[j];
    }
    result[j + 1] = tmp;
  }
  return result;
}
console.log(twoSort([4, 1, 7, 2, 5]));
```

### 12. [使用尾递归对斐波那契优化](http://es6.ruanyifeng.com/#docs/function#%E5%B0%BE%E8%B0%83%E7%94%A8%E4%BC%98%E5%8C%96)

递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。

```javascript
// 传统递归斐波那契, 会造成超时或溢出
function Fibonacci(n) {
  if (n <= 1) {
    return 1;
  }

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

Fibonacci(10); // 89
Fibonacci(100); // 超时
Fibonacci(500); // 超时

// 使用尾递归优化, 可规避风险
function Fibonacci2(n, ac1 = 1, ac2 = 1) {
  if (n <= 1) {
    return ac2;
  }

  return Fibonacci2(n - 1, ac2, ac1 + ac2);
}

Fibonacci2(100); // 573147844013817200000
Fibonacci2(1000); // 7.0330367711422765e+208
Fibonacci2(10000); // Infinity
```

### 13. 两个升序数组合并为一个升序数组

```javascript
function sort(A, B) {
  var i = 0,
    j = 0,
    p = 0,
    m = A.length,
    n = B.length,
    C = [];
  while (i < m || j < n) {
    if (i < m && j < n) {
      C[p++] = A[i] < B[j] ? A[i++] : B[j++];
    } else if (i < m) {
      C[p++] = A[i++];
    } else {
      C[p++] = B[j++];
    }
  }
  return C;
}
```

# node 相关

## 1. node 的 router 是什么

## 2. 数据库索引是啥

- 狭义上: 索引是数据库针对每条数据自动生成的内部唯一 id 标识, 用以快速搜索定位数据
- 广义上: 是数据库根据每条数据形成的关键字, 将划分为树形结构, 便于 sql 语句对数据的查找, 使算法复杂度降低到 O(logn)

## 3. [浏览器的事件循环和 node 事件循环有什么区别？](https://www.jianshu.com/p/b221e6e36dcb)

微任务执行时机不同：
Node 环境：微任务在事件循环的各个阶段的 空隙（中间）执行
浏览器：微任务在事件循环的宏任务执行完后执行

## 4. 关于 buffer

- node 中的核心对象：`Buffer.from(str)`
- 用来存储二进制数据的类数组
- 用两位十六进制数表示一个字符的`unicode`编码
- 连续存储空间，快
- 1 byte = 8 bit
- 英文字符 1 byte, 中文字符 2 byte

# 计算机基础

- 硬件：
  - CPU 是人的大脑，负责运算
  - 内存是人的记忆，负责临时存储
  - 硬盘是人的笔记本，负责永久存储
  - 输入设备是人的耳朵或眼睛，负责接受外部的信息传给 CPU
  - 以上所有的设备都通过总线连接，总线相当于人的神经
- 数据结构与算法：
  - 算法：
    - 定义：解决具体问题所需要的解决方法。
    - 最优算法：执行效率最快的，时间复杂度最低。
    - 特征：输入，输出，有穷性，确定性，可行性。
    - 类型：冒泡排序，二叉树遍历，最长回文，二分查找，指针，链表等，堆栈，队列等。
    - 途径：力扣，codewar，算法导论。
  - 数据结构：
    - 逻辑结构：集合、线性、树形、图形结构
    - 物理结构：顺序、链式存储结构
- 操作系统：
  - 定义：管理计算机硬件与软件资源的计算机程序，同时也是计算机系统的内核与基石
  - 功能：
    - 管理与配置内存
    - 决定系统资源供需的优先次序
    - 控制输入设备与输出设备
    - 操作网络
    - 管理文件系统
- 数据库：
  - 关系型数据库比如 MySQL、SQLServer、Oracle
  - 非关系型数据库 mongodb
- 计算机组成原理：硬件和软件
- 计算机网络：
  - 定义：一些相互连接的、以共享资源为目的的、自治的计算机的集合
  - 组成：计算机、网络操作系统、传输介质以及相应的应用软件四部分
  - 功能：数据通信、资源共享、集中管理、分布式处理、负载均衡
  - 分类：局域网 LAN、无线网
  - 网络协议 TCP/IP
