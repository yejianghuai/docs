---
title: "用react实现v-model"
---
## 利用react实现类似vue的双向数据绑定的效果

#### 在使用vue的时候我们都知道，vue自身是双向数据绑定，所以使用自身带的v-model就可以实现双向数据的绑定，而react却是明摆的单向数据绑定，那么如何利用react实现类似的vue的双向数据绑定？

**方法如下：**

```jsx
import React, { Component } from 'react'

export default class componentName extends Component {
  constructor(props) {
    super(props)
    this.state = {
			msg:''
    }
  }
  render() {
    return (
      <div>
            <input value={this.state.msg} onChange={this.inputChange}/>
            {this.state.msg} 

      </div>
    )
  }
    changeHandle=(e)=>{
        this.setState({
            msg:e.target.value
        })
    }
    inputChange=()=>{
        
    }
}
```

- 首先在input标签中绑定value={this.state.msg}然后在onChange中用setState设置为e.target.value实现了view影响model---》视图影响模型
- 然后将{this.state.msg} 放在所对应的地方就可以实现model影响view
- 用这样的方法就能实现双向数据绑定