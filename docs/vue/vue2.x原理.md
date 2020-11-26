---
title: vue：底层原理（简）
date: 2020-08-12
categories:
  - vue
tags:
  - vue
---
<Boxx/>
# vue 原理（简化）

- vue 是采用数据劫持配合发布者-订阅者模式的方式，通过 Object.definerProperty()来劫持各个属性的 setter 和 getter，在数据变动时，发布消息给依赖收集器，去通知观察者更新（做出对应的回调，更新视图）。
- MVVM 作为绑定入口，整合了 Observe 类，Compile 类和 Watcher 三者，通过 Observe 来监听 model 数据变化表，通过 Compile 类来解析编译模板指令，最终利用 Watcher 搭起 Observe，Compile 之间的通信桥梁，达到数据变化=》视图更新，视图交换变化=》数据 model 变更的双向绑定效果

  <img class='custom' src='../assets/vue/vueDep.jpg'/>

## MyVue

```js
class MVue {
  constructor(options) {
    this.$el = options.el; // node节点
    this.$data = options.data; //内容
    this.$options = options;
    if (this.$el) {
      //1、实现一个数据观察者
      new Observer(this.$data);
      //2、实现一个数据解析器
      new Compile(this.$el, this);
      // 3、实现this.$data代理
      this.proxyData(this.$data);
    }
  }
  proxyData(data) {
    for (const key in data) {
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(newVal) {
          data[key] = newVal;
        },
      });
    }
  }
}
```

## Compile

```js
const compileUtil = {
  text(node, expr, vm) {
    // <div v-text="msg"></div>
    // node:节点, expr:msg ,vm:vue实例
    let value;
    if (expr.indexOf("{{") !== -1) {
      value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
        // 绑定观察者，将来数据发生变化，触发这里的回调，进行更新
        new Watcher(vm, args[1], () => {
          this.Updater.textUpdate(node, this.getContentVal(expr, vm));
        });
        return this.getVal(args[1], vm);
      });
    } else {
      value = this.getVal(expr, vm);
    }
    this.Updater.textUpdate(node, value);
  },
  html(node, expr, vm) {
    const value = this.getVal(expr, vm);
    new Watcher(vm, expr, (newVal) => {
      this.Updater.htmlUpdate(node, newVal);
    });
    this.Updater.htmlUpdate(node, value);
  },
  model(node, expr, vm) {
    const value = this.getVal(expr, vm);
    // 绑定更新函数 数据驱动视图
    new Watcher(vm, expr, (newVal) => {
      this.Updater.modelUpdate(node, newVal);
    });
    // 视图驱动数据，然后再次更改视图
    node.addEventListener("input", (e) => {
      // 设置值
      this.setVal(expr, vm, e.target.value);
    });
    this.Updater.modelUpdate(node, value);
  },
  on(node, expr, vm, eventName) {
    let fn = vm.$options.methods && vm.$options.methods[expr];
    node.addEventListener(eventName, fn.bind(vm), false);
  },
  bind(node, expr, vm, attrName) {
    let attrVal = this.getVal(expr, vm);
    this.Updater.attrUpdater(node, attrName, attrVal);
  },
  //更新的函数
  Updater: {
    textUpdate(node, value) {
      node.textContent = value;
    },
    htmlUpdate(node, value) {
      node.innerHTML = value;
    },
    modelUpdate(node, value) {
      node.value = value;
    },
    attrUpdater(node, attrName, attrVal) {
      node.setAttribute(attrName, attrVal);
    },
  },
  getVal(expr, vm) {
    return expr.split(".").reduce((data, currentVal) => {
      return data[currentVal];
    }, vm.$data);
  },
  setVal(expr, vm, inputVal) {
    return expr.split(".").reduce((data, currentVal) => {
      data[currentVal] = inputVal;
    }, vm.$data);
  },
  getContentVal(expr, vm) {
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(args[1], vm);
    });
  },
};
class Compile {
  //数据解析器
  constructor(el, vm) {
    // 1、判断el是不是元素节点对象，如果不是就获取该元素节点对象
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    // 1、获取文档碎片对象，放入内存中会减少页面的回流和重绘，从而减少性能的消耗
    const fragment = this.node2Fragment(this.el);
    // 2、编译模板
    this.compileFragment(fragment);
    // 3、追加子元素到根元素
    this.el.appendChild(fragment);
  }
  isElementNode(node) {
    //判断是否为节点对象
    return node.nodeType === 1;
  }
  node2Fragment(el) {
    // 创建文档碎片
    const fragment = document.createDocumentFragment();
    let firstChild;
    while ((firstChild = el.firstChild)) {
      fragment.appendChild(firstChild);
    }
    return fragment;
  }
  compileFragment(fragment) {
    // 1、获取到每一个子节点
    const childNodes = fragment.childNodes;
    [...childNodes].forEach((child) => {
      if (this.isElementNode(child)) {
        // 判断是否为元素节点
        //是元素节点，编译元素节点
        this.compileElement(child);
      } else {
        //文本节点
        // 编译文本节点
        this.compileText(child);
      }
      if (child.childNodes && child.childNodes.length) {
        //递归该方法，确保能深度探测到每一个元素
        this.compileFragment(child);
      }
    });
  }
  compileElement(node) {
    // 编译元素节点
    const attributes = node.attributes;
    [...attributes].forEach((attr) => {
      const { name, value } = attr;
      // <div v-text="msg"></div> name:v-text  value:msg
      if (this.isDirective(name)) {
        // 判断是否为一个指令 v-text v-html v-model v-on:click
        const [, directive] = name.split("-"); //text,html model on:click
        const [dirName, eventName] = directive.split(":"); //text,html model on
        //数据驱动视图
        compileUtil[dirName](node, value, this.vm, eventName);
        // 删除有指令的标签
        node.removeAttribute("v-" + directive);
      } else if (this.isEventName(name)) {
        // 判断将v-on改为@符号
        const [, eventName] = name.split("@"); //text,html model on:click
        compileUtil["on"](node, value, this.vm, eventName);
      }
    });
  }
  compileText(node) {
    // 编译文本节点
    const content = node.textContent;
    if (/\{\{(.+?)\}\}/.test(content)) {
      // 取值，取双括号的内容如：{{msg}}--{{person.name}}--{{person.age}}
      compileUtil["text"](node, content, this.vm);
    }
  }
  isDirective(attrName) {
    return attrName.startsWith("v-");
  }
  isEventName(attrName) {
    return attrName.startsWith("@");
  }
}
```

## Observer

```js
class Observer {
  constructor(data) {
    this.observe(data);
  }
  observe(data) {
    if (data && data.typeof === "object") {
      Object.keys(data).forEach((key) => {
        this.defineReactive(data, key, data[key]);
      });
    }
  }
  defineReactive(obj, key, value) {
    // 递归遍历对象下一层可能还是个对象
    this.observe(value);
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: false,
      get() {
        // 订阅数据变化时，往Dep中添加观察者
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set: (newValue) => {
        this.observe(newValue);
        if (newValue !== value) {
          value = newValue;
        }
        //  更新数据后要告诉Dep数据的变化
        dep.notify();
      },
    });
  }
}
```

## Watcher

```js
class Watcher {
  constructor(vm, expr, callback) {
    this.vm = vm;
    this.expr = expr;
    this.callback = callback;
    // 保存旧值
    this.oldVal = this.getOldVal();
  }
  getOldVal() {
    Dep.target = this;
    const oldVal = compileUtil.getVal(this.expr, this.vm);
    Dep.target = null;
    return oldVal;
  }
  update() {
    const newVal = compileUtil.getVal(this.expr, this.vm);
    if (newVal !== this.oldVal) {
      this.callback(newVal);
    }
  }
}
```

## Dep

```js
class Dep {
  constructor() {
    this.subs = [];
  }
  // 收集观察者
  addSub(watcher) {
    this.subs.push(watcher);
  }
  // 通知观察者去更新
  notify() {
    this.subs.forEach((watcher) => watcher.update());
  }
}
```
