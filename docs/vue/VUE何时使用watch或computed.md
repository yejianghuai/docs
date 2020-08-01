---
title: "watch 和 computed 详解"
---
## Vue watch 和 computed
## computed被叫做计算属性：

### 1.在页面中使用大量或是复杂的表达式去处理数据，对页面的维护会有很大的影响。这个时候就需要用到computed 计算属性来处理复杂的逻辑运算，这样在页面中就可以简单的写成{{bookmark}}，computed一般是改变data或者props里面的值为己用。
```javascript
computed: {
            bookmark() {
               //这里用了es6书写方法
                return this.$store.state.bookmarks.find(bookmark => bookmark.id === this.bookmarkId);
            },
}
<div>{{bookmark}}</div>
```
### 2.computed的值不可以在data中定义和赋值

## watch被叫做侦听器：
### 1.虽然计算属性在大多数情况下是非常适合的，但是在有些情况下我们需要自定义一个watcher，当需要在数据变化时执行异步或开销较大的操作时，这时watch是非常有用的。
```javascript
watch: {
            // 如果 `name` 发生改变，这个函数就会运行
            question: function(newQuestion) {
                this.answer = 'Waiting for you to stop typing...'
                this.getAnswer()
            }
        },
methods: {
            // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
            // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
            // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
            // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
            // 请参考：https://lodash.com/docs#debounce
            getAnswer: _.debounce(
                function() {
                    if(this.question.indexOf('?') === -1) {
                        this.answer = 'Questions usually contain a question mark. ;-)'
                        return
                    }
                    this.answer = 'Thinking...'
                    var vm = this
                    axios.get('https://yesno.wtf/api')
                        .then(function(response) {
                            vm.answer = _.capitalize(response.data.answer)
                        })
                        .catch(function(error) {
                            vm.answer = 'Error! Could not reach the API. ' + error
                        })
                },
                // 这是我们为判定用户停止输入等待的毫秒数
                500
            )
        }
```
在这个示例中，使用 watch 选项允许我们执行异步操作 (访问一个 API)，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。
### 2.watch可以进行深度监听，监听对象的变化。

```javascript
data() {
            return {
                group: {
                        data1: '1',
                        data2: '2',
                        data3:'3'
                },
            }
}
```
如果我们要监听group的data1的变化

```javascript
watch: {
     group: {
         data1: function() {
            //do something
         },
         deep: true
     }
}
```
里面的deep设为了true，这样的话，如果修改了这个group中的任何一个属性，都会执行handler这个方法。不过其实这样开销是蛮大的，尤其是对象里面结构嵌套过深的时候。而且有时候我们就想关心这个对象中的某个属性，比如data3，这个时候可以这样：


```javascript
'group.data3'(newVal) {
        console.log(newVal);
 },
```