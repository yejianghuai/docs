---
title: "React中：axios、fetch"
date: 2019-05-22
categories:
 - react
tags:
 - react
 - axios
---
<Boxx/>



# React中axios的安装与使用

官网：www.npmjs.com

搜索：axios便能出现axios的使用文档

##### axios对jsonp不太友好

首先安装：

npm install axios    --save

接下来在需要使用到axios的地方引入====》import axios from 'axios'

如：

```jsx
import React, { Component } from 'react'
import axios from 'axios'

export default class Axios extends Component {
  constructor() {
    super()
    this.state = {
      list: []
    }
  }
  render() {
    return (
      <div>
        <h2>获取服务器数据</h2>
        <button onClick={this.getData}>获取数据</button>

        <ul>
          {this.state.list.map((value, key) => {
            return <li key={key}>{value.title}</li>
          })}
        </ul>
      </div>
    )
  }
  getData = () => {
    let api = 'http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20';//接口必须支持后台跨域或者使用jsonp才可以实现，否则会请求失败
    axios.get(api)
      .then((response) => {
      
        console.log(response.data.result);
        this.setState({
          list: response.data.result
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

```

### 对照文档

使用方法为：

```js
axios.get('/user?ID=12345')
  .then(function (response) {
    //此处建议使用箭头函数确定this 的指向，不建议用原来的方法
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

# Fetch-jsonp的安装与使用方法

官网：www.npmjs.com      ---》搜索fetch-jsonp

安装： npm install fetch-jsonp --save

引入：import fetchJsonp from 'fetch-jsonp';

使用方法与axios基本一直，看文档操作即可
