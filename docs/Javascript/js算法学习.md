---
title: "MongoDB"
date: 2020-12-01
categories:
 - javascript
tags:
 - 算法
---
<Boxx/>
# 算法学习
## 1、快速排序
```js
let arr = [31, 21, 1, 245, 22, 11, 456];
// 取一个数作为基准，每次和基准数相比，小的放左边，大的放右边
quickSort = (arr) => {
  // 1、找基准数,毕竟和基准数作比较，分成左右两个数组（左边小于基准数，右边大于基准数）
  let base_num = arr[0]; // 基准数
  let left_arr = [];
  let right_arr = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < base_num) {
      left_arr.push(arr[i]);
    } else {
      right_arr.push(arr[i]);
    }
  }
  // 2、对左右数组进行快速排序
  if (left_arr.length >= 2) {
    left_arr = quickSort(left_arr);
  }
  if (right_arr.length >= 2) {
    right_arr = quickSort(right_arr);
  }

  // 3、合并排序好之后的左数组、基准数和右数组
  return left_arr.concat(base_num, right_arr);
};
quickSort(arr)
```
## 2、重建二叉树
```js
```
## 3、两个栈实现一个队列
```js
```
## 4、跳台阶（记忆化递归）
```js
```
## 5、变态跳台阶
```js
```
## 7、二叉树的创建 - 层次遍历
```js
```
## **8、二叉树的创建** - 先序遍历
```js
```
## 9、二叉树的深度优先遍历
```js
```
##  10、二叉树的广度优先遍历
```js
```
## 11、字典树
```js
```
