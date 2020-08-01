---
title: "react 父子组件传值"
---
## 父组件向子组件传值---子组件向父组件获取数据

父组件：

```jsx
import React, { Component } from 'react'
import Son from './Son'
import SonTow from './SonTow'
export default class Daddy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: 'are you ok?'
    }
  }
  run = () => {
    alert('我是父组件的方法，我被子组件获取了')
  }
  render() {
    return (
      <div>
        <Son {...this.state} run={this.run}></Son>
        <p>当我们传多个state数据的时候可以用...this.state的展开方式</p>
        <h3>建议使用这种方法</h3>
        {<br />}
        <hr />
        <br />
        <h3>接下来中放推荐使用，只需要在标签中传入一个this，子组件便可以通过这个this获取到父组件所有的数据-----不推荐，不推荐，不推荐</h3>
        <SonTow daddy={this}></SonTow>
        <p>使用时只需要用this.props.daddy(这个名称自己命名).(方法就直接点方法名称)(数据就是state.数据的名称)</p>
      </div>
    )
  }
}
```

子组件：

```jsx
import React, { Component } from 'react'

export default class Son extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <div>
          {this.props.msg}
          <button onClick={this.props.run}>子组件获取父组件的数据</button>
        </div>
      </div>
    )
  }
}

```

子组件向父组件获取值和传函数的方式是一样的

在父组件的super和constructor传入props，并通过子组件{this.props.需要传入的东西}，这样子组件就能获取到父组件的值了

在父组件定义方法函数，并在子组件的标签中使用如：run:{this.run},然后再在子组件中绑定事件如：onClick={this.props.run}也是使用this.props进行传值

子组件2：

```jsx
import React, { Component } from 'react'

export default class SonTow extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    console.log(this.props.daddy);

    return (
      <div>
        {this.props.daddy.state.msg}
        <button onClick={this.props.daddy.run}>我第二个子组件，我来获取父组件了</button>
      </div>
    )
  }
}

```

当父组件的子组件标签中传入  xxx={this}的时候，我们在子组件中就可以调用到父组件里面的所有的属性和方法--->onClick={this.props.xxx.需要的属性或方法}

## 子组件向父组件传值---父组件获取子组的数据

#### 方法一：

父组件：

```jsx
import React, { Component } from 'react'
import Son from './son'

export default class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ok: 'Are you OK'
    }
  }

  getChildData = (result) => {
    alert(result)
  }
  render() {
    return (
      <div>
        <Son title={this.state.ok} run={this.run} news={this}></Son>
      </div>
    )
  }
}


```

子组件：

```jsx
import React, { Component } from 'react'

export default class Son extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.news.getChildData.bind(this, '我是子组件的数据')}>我能利用父组件的方法获取子组件的数据</button>

      </div>
    )
  }
}

```

#### 方法二

父组件主动获取子组件的数据和方法：

父组件代码：

```jsx
import React, { Component } from 'react'
import Girl2 from './Girl2'
export default class Dadd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ok: 'Are you OK'
    }
  }

  getSonData = () => {
    this.refs.girl.run()
    const girlData = this.refs.girl.state.msg
    console.log(girlData);

  }

  render() {
    return (
      <div>
        <button onClick={this.getSonData}>获取子组件的方法</button>
        <Girl2 ref="girl"></Girl2>
      </div>
    )
  }
}


```

子组件代码：

```jsx
import React, { Component } from 'react'

export default class Girl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: 'are you ok'
    }
  }
  run = () => {
    alert('我是子组件的run方法')
  }
  render() {
    return (
      <div>

      </div>
    )
  }
}


```

这边说下ref，官方并不推荐ref作为字符串来使用，官方推荐使用ref的回调函数，所以第二种父组件获取子组件数据的方式也不推荐