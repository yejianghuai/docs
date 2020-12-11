---
title: "用react实现v-model"
date: 2019-05-11
categories:

- react
  tags:
- react
---
<Boxx/>

## React 性能优化

- 按需render整个页面

```js
 
class Test extends Component {
  constructor(props) {
    super(props);
    this.state = { arr: ["苹果", "香蕉"], value: "" };
  }
//当值完全改变了以后才允许更新数据，而不是在onchange实时监听的情况下，实时更新render
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.arr !== this.state.arr) return true;
    return false;
  }
  render() {
    return (
      <div>
        <input type="text" value={this.state.value} />
        <button onClick={() => this.btnHandle()}>添加</button>
        {this.state.arr.map((val, idx) => {
          return <div>{{ val }}</div>;
        })}
      </div>
    );
  }
  btnHandle() {
    let newArr = this.state.arr;
    this.setState({
      arr: newArr.push(this.state.value),
    });
  }
}

export default Test;
```
