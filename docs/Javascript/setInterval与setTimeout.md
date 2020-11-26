---
 title: setInterval与setTimeout
 date: 2018-12-30
 categories:
 - javascript
 tags:
 - javascript
---
<Boxx/>
## setInterval与setTimeout的区别

setInterval()方法可以按照指定的周期调用函数或者计算表达式

setTimeout()方法用于指定毫秒数后调用函数或者计算表达式

**区别**

　　通过以上分析可以看出，setTimeout与setInterval的主要区别是:

　　setTimeout()方法只运行一次，也就是说当达到设定的时间后就出发运行指定的代码，运行完后就结束了，如果还想再次执行同样的函数，可以在函数体内再次调用setTimeout()，可以达到循环调用的效果。

　　setInterval()是循环执行的，即每达到指定的时间间隔就执行相应的函数或者表达式，是真正的定时器。

清楚两个方法：

- setInterval()会不停的调用函数，直到clearInterval()被调用或者窗口被关闭，由 setInterval()返回的ID值可用作clearInterval()方法的参数。
- setTimeout()只执行函数一次，如果需要多次调用可以使用setInterval(),或者在函数体内再次调用setTimeout()

在react中必须在

  componentWillUnmount 生命周期中清除方法

例子：

```js
class Clock extends Component {
  constructor () {
    super()
    this.state = {
      date: new Date()
    }
  }

  componentWillMount () {
    this.timer = setInterval(() => {
      this.setState({ date: new Date() })
    }, 1000)
  }
  ...
}
...
  componentWillUnmount () {
    clearInterval(this.timer)
  }
...
```

## JavaScript对象的属性和属性的值

在JavaScript中可以使用"."和"[ ]"来访问对象的属性。

区别："."表示法一般作为静态对象使用时来储存属性。"[ ]"表示法一般在动态存储属性的时候用。一般情况下属性都是常量，当属性出现变量的时候，就可以用"[ ]"表示法

```js
 data: {
                [sixMouthData.tjrqMouth]: sixMouthData.feedbackTimes
            },
```

sixMouthData.tjrqMouth是从后台获取的日期，是数组（变量），所以使用"[ ]"表示法

sixMouthData.feedbackTimes是所对应的值，所以可以使用"."表示法

