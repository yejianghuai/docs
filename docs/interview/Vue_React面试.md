# vue相关
## 1.[ 生命周期](http://baijiahao.baidu.com/s?id=1603406094025961442&wfr=spider&for=pc)
![生命周期](https://upload-images.jianshu.io/upload_images/13102777-9983f5ab8e2b6fb3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 2 .双向数据绑定v-model。这个最好也是自己实现一下 理解更深
通过v-model
VUE实现双向数据绑定的原理就是利用了 Object.defineProperty() 这个方法重新定义了对象获取属性值(get)和设置属性值(set)的操作来实现的。
```javascript
// 依赖收集
// 简化版
var obj = { }
var name 
//第一个参数：定义属性的对象。
//第二个参数：要定义或修改的属性的名称。
//第三个参数：将被定义或修改的属性描述符。
Object.defineProperty(obj, "data", {
  //获取值
  get: function () {
    return name
  },
  //设置值
  set: function (val) {
    name = val
    console.log(val)
  }
})
//赋值调用set
obj.data = 'aaa'
//取值调用get
console.log(obj.data)

// 详细版
 myVue.prototype._obverse = function (obj) { // obj = {number: 0}
    var value;
    for (key in obj) {  //遍历obj对象
      if (obj.hasOwnProperty(key)) {
        value = obj[key]; 
        if (typeof value === 'object') {  //如果值是对象，则递归处理
          this._obverse(value);
        }
        Object.defineProperty(this.$data, key, {  //关键
          enumerable: true,
          configurable: true,
          get: function () {
            console.log(`获取${value}`);
            return value;
          },
          set: function (newVal) {
            console.log(`更新${newVal}`);
            if (value !== newVal) {
              value = newVal;
            }
          }
        })
      }
    }
  }
```

## 3.vue父子组件传递参数
- 父 -->子: 通过props
- 子 -->父: 通过 $$refs 或 $emit

## 4.[vue传递参数方法](https://www.imooc.com/article/257885)
- 父子组件传参如上, v-bind :    v-on @
- 兄弟组件传参:(通过EventBus事件总线实现) 
```javascript
// 1. 新建eventBus.js
import Vue from 'vue'
export default new Vue
// 或直接在main.js中初始化EventBus(全局)
Vue.prototype.$EventBus = new Vue()

// 2. 发射与接收
// 如果是定义在eventBus.js中
import eventBus from 'eventBus.js'
eventBus.$emit()
eventBus.$on()

// 如果是定义在main.js中
this.bus.$emit()
this.bus.$on()

// 3. 移除监听
eventBus.$off()
```

## 5.vue自定义组件
可以使用独立可复用的自定义组件来构成大型应用, 采用帕斯卡命名法或横线连接, 通过以上方式进行组件间通信. 每一个组件都是Vue实例, 可以使用生命周期钩子.

## 6. [vue自定义指令](http://baijiahao.baidu.com/s?id=1603883371090691442&wfr=spider&for=pc)
- 除核心指令之外的指令, 使用directive进行注册. 
- 指令自定义钩子函数: bind, inserted, update, componentUpdated, unbind

## 7.[vuex组成和原理](https://baijiahao.baidu.com/s?id=1618794879569468435&wfr=spider&for=pc)
- 组成: 组件间通信, 通过store实现全局存取
- 修改: 唯一途径, 通过commit一个mutations(同步)或dispatch一个actions(异步)
- 简写: 引入mapState、mapGetters、mapActions

## 8.vue-router的原理，例如hashhistory和History interface这些东西要弄明白。其实看一下源码就好了，看不懂可以直接看解析的相关技术博客。
- [vue-router用法](https://www.jianshu.com/p/e8b2529e472c): 
在router.js或者某一个路由分发页面配置path, name, component对应关系
  - 每个按钮一个value, 在watch功能中使用this.$router.push实现对应跳转, 类似react的this.history.push
  - 或直接用router-link to去跳转, 类似react的link to
- [vue-router原理](https://www.jianshu.com/p/4295aec31302): 通过**hash**和**History interface**两种方式实现前端路由
    - HashHistory: 利用URL中的hash（“#”）;replace()方法与push()方法不同之处在于，它并不是将新路由添加到浏览器访问历史的栈顶，而是替换掉当前的路由
    - History interface: 是浏览器历史记录栈提供的接口，通过back(), forward(), go()等方法，我们可以读取浏览器历史记录栈的信息，进行各种跳转操作. pushState(), replaceState() 这下不仅是读取了，还可以对浏览器历史记录栈进行修改

## 9.vue的seo问题
seo关系到网站排名, vue搭建spa做前后端分离不好做seo, 可通过其他方法解决:
- [SSR服务端渲染](https://ssr.vuejs.org/zh/#%E4%BB%80%E4%B9%88%E6%98%AF%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E6%B8%B2%E6%9F%93-ssr-%EF%BC%9F): 将同一个组件渲染为服务器端的 HTML 字符串.利于seo且更快.
- vue-meta-info, nuxt, prerender-spa-plugin页面预渲染等

## 10.预渲染和ssr
以上

### 11.生命周期内create和mounted的区别
- **created**: 在模板渲染成html前调用，即通常初始化某些数据，然后再渲染成视图。
- **mounted**: 在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作和方法。

## 12.监听watch
对应一个对象，键是观察表达式，值是对应回调。值也可以是methods的方法名，或者是对象，包含选项。在实例化时为每个键调用 $watch()

## 13.登录验证拦截(通过router)
- 先设置requireAuth:
```javascript
routes = [
    {
        name: 'detail',
        path: '/detail',
        meta: {
            requireAuth: true
        }
    },
    {
        name: 'login',
        path: '/login'
    }
]
```
- 再配置router.beforeEach:
```javascript
router.beforeEach((from, to, next) => {
    if (to.meta.requireAuth) { // 判断跳转的路由是否需要登录
        if (store.state.token) { // vuex.state判断token是否存在
            next() // 已登录
        } else {
            next({
                path: '/login',
                query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
       next()
    }
})
```

## 14. v-for key值
不写key值会报warning, 和react的array渲染类似. 根据diff算法, 修改数组后, 写key值会复用, 不写会重新生成, 造成性能浪费或某些不必要的错误

## 15. [vue3.0的更新和defineProperty优化](https://www.oschina.net/news/101906/vue-3-0-updates?from=singlemessage)
- 放弃 Object.defineProperty ，使用更快的原生 Proxy (访问对象拦截器, 也称代理器)
- 提速, 降低内存使用, Tree-shaking更友好
- 支持IE11等
- 使用Typescript

## 15. vue使用this获取变量
正常要通过vm.$options.data访问，但实例vm会遍历data中的变量，并挂在到this上， this.$root传参取值

## 16.  [jQuery的优缺点，与vue的不同，vue的优缺点？](https://www.jianshu.com/p/131c0d04dc1b)
- jq优点: 比原生js更易书写, 封装了很多api, 有丰富的插件库; 缺点: 每次升级与之前版本不兼容, 只能手动开发, 操作DOM很慢, 不方便, 变量名污染, 作用域混淆等.
- vue优缺点: 双向绑定, 虚拟DOM, diff算法, MVVM, 组件化, 通信方便, 路由分发等

## 17. vue解除双向绑定
`let obj = JSON.parse(JSON.stringify(this.temp1));`

## 18. vue异步组件
为了简化，Vue 允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染
```javascript
Vue.component(
  'async-webpack-example',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
```

## 19. [MVC与MVVM](http://baijiahao.baidu.com/s?id=1596277899370862119&wfr=spider&for=pc)
*   model-数据层 view-视图层 controller-控制层
*   MVC的目的是实现M和V的分离，单向通信，必须通过C来承上启下
*   MVVM中通过VM（vue中的实例化对象）的发布者-订阅者模式实现双向绑定，数据绑定，dom事件监听
*   区别：MVC和MVVM的区别并不是VM完全取代了C，ViewModel存在目的在于抽离Controller中展示的业务逻辑，而不是替代Controller，其它视图操作业务等还是应该放在Controller中实现。也就是说MVVM实现的是业务逻辑组件的重用

## 20. vue渐进式
小到可以只使用核心功能，比如单文件组件作为一部分嵌入；大到使用整个工程，vue init webpack my-project来构建项目；VUE的核心库及其生态系统也可以满足你的各式需求（core+vuex+vue-route）

# react相关
## 1. [新旧生命周期](https://segmentfault.com/a/1190000016617400)
- **旧**: will, did; mount, update...
- **新**: 16版本之后:
  -  `getDerivedStateFromProps`: 虚拟dom之后，实际dom挂载之前, 每次获取新的props或state之后, 返回新的state, 配合didUpdate可以替代willReceiveProps
  - `getSnapshotBeforeUpdate`: update发生的时候，组件更新前触发, 在render之后，在组件dom渲染之前；返回一个值，作为componentDidUpdate的第三个参数；配合componentDidUpdate, 可以覆盖componentWillUpdate的所有用法
  - `componentDidCatch`: 错误处理
- **对比**: 弃用了三个will, 新增两个get来代替will, 不能混用, 17版本会彻底删除. 新增错误处理

## 2. react核心
- [虚拟DOM, Diff算法, 遍历key值](http://www.cnblogs.com/mahmud/p/10099672.html)
- react-dom: 提供了针对DOM的方法，比如：把创建的虚拟DOM，渲染到页面上 或 配合ref来操作DOM
- react-router

## 3. fiber核心(react 16)
- 旧: 浏览器渲染引擎单线程, 计算DOM树时锁住整个线程, 所有行为同步发生, 有效率问题, 期间react会一直占用浏览器主线程，如果组件层级比较深，相应的堆栈也会很深，长时间占用浏览器主线程, 任何其他的操作（包括用户的点击，鼠标移动等操作）都无法执行
- 新: 重写底层算法逻辑, 引入fiber时间片, 异步渲染, react会在渲染一部分树后检查是否有更高优先级的任务需要处理(如用户操作或绘图), 处理完后再继续渲染, 并可以更新优先级, 以此管理渲染任务. 加入fiber的react将组件更新分为两个时期（phase 1 && phase 2），render前的生命周期为phase1，render后的生命周期为phase2, 1可以打断, 2不能打断一次性更新. 三个will生命周期可能会重复执行, 尽量避免使用

## 4. 渲染一个react
- 分为首次渲染和更新渲染
- 生命周期, 建立虚拟DOM, 进行diff算法
- 对比新旧DOM, 节点对比, 将算法复杂度从O(n^3)降低到O(n)
- key值优化, 避免用index作为key值, 兄弟节点中唯一就行

## 5. 高阶组件
高阶组件就是一个函数，且该函数(wrapper)接受一个组件作为参数，并返回一个新的组件。
高阶组件并不关心数据使用的方式和原因，而被包裹的组件也不关心数据来自何处.
- [react-dnd](https://segmentfault.com/a/1190000004006185?_ea=457266): 根组件, source, target等
`export default DragSource(type, spec, collect)(MyComponent)`
- 重构代码库使用HOC提升开发效率 

## 6. hook(v16.7测试)
在无状态组件(如函数式组件)中也能操作state以及其他react特性, 通过useState

## 7. redux和vuex以及dva：
- redux: 通过store存储，通过action唯一更改，reducer描述如何更改。dispatch一个action
- dva: 基于redux，结合redux-saga等中间件进行封装
- vuex：类似dva，集成化。action异步，mutation非异步

## 8. [react和vue的区别](https://www.jianshu.com/p/b7cd52868e95?from=groupmessage)
- **数据是否可变**: react整体是函数式的思想，把组件设计成纯组件，状态和逻辑通过参数传入，所以在react中，是单向数据流，推崇结合immutable来实现数据不可变; vue的思想是响应式的，也就是基于是数据可变的，通过对每一个属性建立Watcher来监听，当属性变化的时候，响应式的更新对应的虚拟dom。总之，react的性能优化需要手动去做，而vue的性能优化是自动的，但是vue的响应式机制也有问题，就是当state特别多的时候，Watcher也会很多，会导致卡顿，所以大型应用（状态特别多的）一般用react，更加可控。
- **通过js来操作一切，还是用各自的处理方式**: react的思路是all in js，通过js来生成html，所以设计了jsx，还有通过js来操作css，社区的styled-component、jss等; vue是把html，css，js组合到一起，用各自的处理方式，vue有单文件组件，可以把html、css、js写到一个文件中，html提供了模板引擎来处理。
- **类式的组件写法，还是声明式的写法**: react是类式的写法，api很少; 而vue是声明式的写法，通过传入各种options，api和参数都很多。所以react结合typescript更容易一起写，vue稍微复杂。
- **扩展不同**: react可以通过高阶组件（Higher Order Components--HOC）来扩展，而vue需要通过mixins来扩展
- **什么功能内置，什么交给社区去做**: react做的事情很少，很多都交给社区去做，vue很多东西都是内置的，写起来确实方便一些，
比如 redux的combineReducer就对应vuex的modules，
比如reselect就对应vuex的getter和vue组件的computed，
vuex的mutation是直接改变的原始数据，而redux的reducer是返回一个全新的state，所以redux结合immutable来优化性能，vue不需要。

## 9. react单向数据流怎么理解
　React是单向数据流，数据主要从父节点传递到子节点（通过props）。如果顶层（父级）的某个props改变了，React会重渲染所有的子节点。

## 10. React算法复杂度优化
react树对比是按照层级去对比的， 他会给树编号0,1,2,3,4.... 然后相同的编号进行比较。 所以复杂度是n，这个好理解。

关键是传统diff的复杂度是怎么算的？ 传统的diff需要出了上面的比较之外，还需要跨级比较。 他会将两个树的节点，两两比较，这就有n^2的复杂度了。 然后还需要编辑树，编辑的树可能发生在任何节点，需要对树进行再一次遍历操作，因此复杂度为n。加起来就是n^3了。

## 11. React优点
声明式, 组件化, 一次学习, 随处编写. 灵活, 丰富, 轻巧, 高效

## 12. React事件机制
- 合成事件：
    - 根据事件类型，采用不同的`SyntheticEvent`来构造不同的合成事件
    - `syntheticEvent` 和原生浏览器事件一样拥有同样的接口，也支持事件冒泡机制。可以通过`stopPropgation`和`preventDefault`中断
    - 如果需要访问原生事件对象，可以使用`nativeEvent`属性
- 实现机制：
    - react 的事件机制利用了事件委托机制
    - 没有绑定在真实的dom节点上，而是把事件都绑定在结构的最外层document，统一由这个监听器分发
    - 注册：组件挂载和更新时，将绑定事件分类放入`EventPluginHub`事件池
    - 触发：根据事件产生的Event对象找到触发事件的组件，再通过组件标识和事件类型从事件池里找到对应的事件监听回调并执行
- react中使用原生
    - 在`didmount`中对真实dom进行原生绑定，在`unmount`解绑，防止内存泄漏
    - `syntheticEvent`的`stopPropgation`无法阻止原生事件的冒泡，但原生可以组织合成，所以尽量不要混用，除非使用e.target判断
- 异步回调使用`syntheticEvent`：
    - 合成事件里，回调执行后会销毁事件对象
    - 异步回调需使用`event.persist()`告诉react不要回收
- 与原生冒泡捕获对比：
    - 原生的捕获机制并不常用，且具有 ie 的不兼容问题
    - react仅实现冒泡机制，无兼容问题，只有`document`节点上才有 DOM 事件也节约了内存
- 事件执行：
    1. 找到事件触发的`DOM`和`React Component`，调用`findParent`方法
    2. 遍历得到所有父组件，存在数组中
    3. 从该组件直到最后一个父组件，根据之前事件存储，用 React 事件名 + 组件 key，找到对应绑定回调方法


