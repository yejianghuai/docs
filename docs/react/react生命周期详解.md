---
title: "React 生命周期"
date: 2019-04-10
categories:
 - react
tags:
 - react
---
<Boxx/>
# React生命周期详解

## 子组件生命周期详解代码：

```jsx
import React, { Component } from 'react'

export default class Life extends Component {
  // 组件挂在的时候触发的几个生命周期函数
  constructor(props) {
    console.log('1、首先执行构造函数');
    super(props)
    this.state = {
      msg: ''
    }
  }

  componentWillMount() {
    console.log('2、然后执行willmount函数--组件将要挂在');
  }
  componentDidMount() {
    //这个生命周期函数一般用来执行dom的操作
    // 获取数据axios或者fetch-jsonp也是再这个函数
    console.log('4、再执行didmount函数--组件也是将要挂在');
    console.log('以上四个为组件将要挂载触发的生命周期函数');
    console.log('-------------------------------');
  }
  // ---------------------------------------------------------------------------------------
  // 组件更新数据的时候触发的几个生命周期函数
  shouldComponentUpdate(nextProps, nextState) {
    // nextProps指的是更新前的数据
    // nextState指的是更新后的数据
    console.log('1、判断是否更新数据');
    console.log(nextProps);
    console.log(nextState);


    return true
  }
  componentWillUpdate() {
    console.log('2、组件将要更新');
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('4、组件正在更新');
  }
  // --------------------------------------------------------------------
  // 组件销毁的时候触发  用在组件销毁的时候执行的操作

  componentWillUnmount() {
    console.log('组件销毁了');

  }
  // -----------------------------------------------------------------------------
  componentWillReceiveProps() {
    console.log('父子组件传值，父组件里面改变了props传值的方法');

  }
  render() {
    console.log('3、执行render函数渲染页面');
    return (
      <div>
        <h2>我是组件，are you ok ! hello! thankyou!thankyou  ver much!</h2>
        {this.state.msg}
        <button onClick={this.changeMsg}>改变</button>
      </div>
    )
  }
  changeMsg = () => {
    this.setState({
      msg: '改变了'
    })
  }
}

```



## 父组件调用代码：

```jsx
import React, { Component } from 'react'
import './App.css'
// import Todolist from '@/Todolist/todolist'
// import Test from '@/test/test'
// import Home from '@/axios/Home'
import Life from '@/Life/Life'

// react根组件
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      flag: true,
      title: '我是一个title'
    }
  }
  chgFlag = () => {
    this.setState({
      flag: !this.state.flag
    })
  }
  setTitle = () => {
    this.setState({
      title: '我改变了'
    })
  }
  render() {
    return (
      <div className="App">
        {/* <Todolist></Todolist> */}
        {/* <Test></Test> */}
        {/* <Home></Home> */}
        {this.state.flag ? <Life title={this.state.title}></Life> : ''}
        <button onClick={this.chgFlag}>销毁组件</button>
        <button onClick={this.setTitle}>改变父组件title的值</button>
      </div>
    );
  }
}

export default App;

```

## 最常用的生命周期：

##### ***  （重点）组件加载的时候：componentWillMount、render、componentDidMount

组件更新数据的时候：componentWillUpdate、render、componentDidUpdate

##### ***（重点） 组件销毁的时候：componentWillUnmount