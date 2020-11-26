---
title: vue3.0 学习
date: 2020-09-28
categories:
  - vue
tags:
  - vue
---
<Boxx/>
# Vue3.x 学习笔记

## Vue3.0 的六大亮点

- Performance：性能方面，比 vue 2.x 快 1.2-2 倍 （学客吧：大圣老师跟尤雨溪老师对讲可得出越复杂的项目，vue3 越能体现比 vue2 更快更强的性能）
- Tree shaking support ：按需编译，体积比 vue2 更小
- Composition API ：组合 API（类似 React Hooks）
- Better TypeScript support：更好的支持了 ts
- Custom Renderer
- Fragment，Teleport(Protal),Suspense：更先进的组件

## Vue3.0 是如何变快的

- diff 算法的优化：
  - Vue2 中的虚拟 dom 是进行全量的对比
  - Vue3 新增了静态标记（PatchFlag），和上一次的虚拟节点进行对比的时候，只对比带有 patchFlag 的节点，并且可以通过 flag 的信息得知当前节点要对比的具体内容
- hoistStatic 静态提升
  - Vue2 中的虚拟 dom 是进行全量的对比
  - Vue3 中对于不参与更新的元素，只会被创建一次，之后会在每次渲染的时候被不停地复用
- cacheHandlers 事件监听器缓存
  - 默认情况下 onClick 会被视为动态绑定，所以每次都会去追踪它的变化，但是因为是同一个函数，所以没有追踪变化，直接缓存起来复用即可
- ssr 渲染
  - 当有大量静态的内容的时候，这些内容会被当做纯字符串推进一个 buffer 里面，即使存在动态的绑定，会通过模板插值嵌入进去。这样会比通过虚拟 dom 来渲染快的多
  - 当静态内容大到一定量级的时候，会用 createStaticVNode 方法在客户端去生成一个 static node，这些静态的 node，会直接 innerHTML，就不需要再创建对象，然后进行渲染

## 创建 Vue 3 的方式

- vue-cli
- webpack
- Vite（尤雨溪强烈推荐）

### 什么是 Vite

- Vite 是 Vue 作者（尤雨溪）开发的一款意图取代 webpack 的工具
- 其实现原理是利用 ES6 的 import 会发送请求加载文件的特性，拦截这些请求，做一些预编译，省去 webpack 冗长的打包时间

```js
- 安装Vite
+ npm install -g create-vite-app
- 利用Vite创建Vue3项目
+ create-vite-app projectName
- 安装依赖运行项目
+ cd projectName
+ num install
+ npm run dev
```

- Vue3 向下兼容 Vue2.x 可以使用 vue2 的写法

## 组合 API

```vue
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="myFn">按钮</button>
    <ul>
      <li
        v-for="(item, index) in state.arr"
        :key="item.id"
        @click="removeItem(index)"
      >
        {{ item.name }} --- {{ item.age }}
      </li>
    </ul>
  </div>
</template>
<script>
import { ref, reactive } from "vue";
export default {
  name: "App",
  setup() {
    // setup函数式组合API的入口函数; 介于 beforeCreate 和 created 之间
    // ref函数注意点：
    // ref函数只能监听简单类型的变化，不能监听复杂类型的变化（对象/数组）
    let count = ref(0); // 定义了一个名称为count的变脸个，初始值为0
    let state = reactive({
      arr: [
        { id: 1, name: "张三", age: 10 },
        { id: 2, name: "李四", age: 20 },
        { id: 3, name: "王五", age: 30 },
      ],
    });
    function myFn() {
      count.value += 1; //使用ref定义的数据取值需要 .value
    }
    function removeItem(index) {
      state.arr = state.arr.filter((item, idx) => idx !== index); //使用reactive则不需要.value
    }
    // 注意点：
    // 在组合API中定义的变量或者方法，想要在外接使用，必须return出去
    return { count, myFn, state };
  },
};
</script>
```

### setup 组合 API 数据分离

```vue
<script>
import { ref, reactive } from "vue";
export default {
  name: "App",
  setup() {
    let { state, removeItem } = useRemoveItem();
    let { count, myFn } = changeCount();
    return { state, removeItem, count, myFn };
  },
  useRemoveItem() {
    let state = reactive({
      arr: [
        { id: 1, name: "张三", age: 10 },
        { id: 2, name: "李四", age: 20 },
        { id: 3, name: "王五", age: 30 },
      ],
    });
    function removeItem(index) {
      state.arr = state.arr.filter((item, idx) => idx !== index);
    }
    return { state, removeItem };
  },
  changeCount() {
    let count = ref(0); // 定义了一个名称为count的变脸个，初始值为0
    function myFn() {
      count.value += 1; //使用ref定义的数据取值需要 .value
    }
    return { count, myFn };
  },
};
</script>
```

## Composition API 和 Option API 混合使用

```vue
<template>
  <div>
    <p>{{ name }}</p>
    <button @click="myFn">按钮</button>
    <p>{{ age }}</p>
    <button @click="myFn2">按钮2</button>
  </div>
</template>
<script>
import { ref, reactive } from "vue";
export default {
  name: "App",
  data: function() {
    return {
      name: "yjh",
    };
  },
  methods: {
    myFn() {
      console.log("这是Option API");
    },
  },
  setup() {
    // Composition API （组合API/注入API）：本质是将数据注入到data，将方法注入到methods
    let age = ref(18); // 定义了一个名称为count的变脸个，初始值为0
    function myFn2() {
      console.log("这是Composition API");
    }

    return { age, myFn2 };
  },
};
</script>
```

## setup 函数注意点

- setup 函数的执行时机实在 beforeCreate 和 created 之间
  - beforeCreate ：表示组件刚刚被创建出来，组件的 data 和 methods 还没有初始化好
  - created：表示组件刚刚被创建出来，组件内的 data 和 methods 已经初始化完成
- 注意点：
  - 由于执行 setup 函数的时候，还没有执行 created 生命周期函数，所以在 setup 函数中是无法使用 data 和 methods 的
  - 由于我们不能在 setup 函数中使用 data 和 methods，所以 Vue3 为了避免我们错误的使用，它直接将 setup 中的 this 修改成了 undefined
  - setup 只能是同步，不能是异步的

## 细讲 reactive

- 什么是 reactive？
  - reactive 是 Vue3 中提供的实现响应式数据的方法：
    - reactive 的本质是将传入的数据包装成一个 Proxy 对象
  - 在 Vue2 中响应式数据是通过 defineProperty 来实现的，而在 Vue3 中响应式数据是通过 ES6 的 Proxy 来实现的
- reactive 注意点：
  - reactive 参数必须是**对象**（json/arr）
  - 如果给 reactive 传递了其他的对象
    - 1、默认情况下修改对象，界面不会自动更新
    - 2、如果想要更新，可以通过重新赋值的方式

## 递归监听和非递归监听

```vue
<script>
import { ref, reactive } from "vue";
export default {
  name: "App",
  setup() {
    let state = reactive({
      a: "a",
      gf: {
        b: "b",
        f: {
          c: "c",
          s: {
            d: "d",
          },
        },
      },
    });
    console.log(state); // Proxy{a:'a',gf:{...}}，每一层都会被Proxy监听
    console.log(state.gf); // Proxy{gf:{b:'b',f:{...}}}，每一层都会被Proxy监听
    return { state };
  },
};
</script>
<script>
import { shallowRef, shallowReactive } from "vue";
export default {
  name: "App",
  setup() {
    let state = shallowReactive({
      a: "a",
      gf: {
        b: "b",
        f: { 
          c: "c",
          s: {
            d: "d",
          },
        },
      },
    });
    console.log(state); // Proxy{a:'a',gf:{...}}，只有第一层都会被Proxy监听
    console.log(state.gf); // gf:{b:'b',f:{...}}，只有第一层都会被Proxy监听
    return { state };
  },
};
</script>
```
