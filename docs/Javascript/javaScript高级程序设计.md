---
 title: JS 高级程序设计
---
# 第一章--认识JavaScript

## JavaScript包含三部分：

- 一、核心也是标准（ECMAScript）
- 二、文本对象模型（DOM）
- 三、浏览器对象模型(BOM)

### 1、ECMAScript：

指一种标准，JavaScript的标准即是ECMAScript规定的，那么ECMAScript规定了哪些标准呢？

- 语法
- 类型
- 语句
- 关键字
- 保留字
- 操作符
- 对象

ECMAScript就是对现该标准规定的各个方面的内容的语言的描述。JavaScript实现了ECMAScript，Adobe ActionScript同样也实现了ECMAScript

### 2、DOM:

- DOM1(DOM level1):主要目标是映射文档的结构，为两个模块组成：
  - DOM核心（DOM Core）
  - DOM HTML

- DOM2，在DOM1的基础上扩充了鼠标和用户界面时间、范围、遍历等细分的模块：
  - DOM视图（DOM Views）：定义了跟踪不同文档视图的接口
  - DOM事件（DOM Events）：定义了事件和事件处理的接口
  - DOM样式（DOM Styles）：定义了基于CSS为元素应用样式的接口
  - DOM遍历和范围（DOM Traversal and Range）：定义了遍历和操作文档树的接口

- DOM3，进一步扩展了DOM，引入了统一方式加载和保存文档的方法--在DOM加载和保存（DOM Load and Save）模块中定义；新增了验证文档的方法--在DOM验证（DOM Validation）模块中定义。DOM3也对DOM核心进行了扩展，开始支持XML 1.0规范，设计XML Infoset 、 XPath 和 XML Base。
- 其他DOM标准
  - 除了DOM核心和DOM HTML接口之外，另外集中语言还发布了只针对自己的DOM标准。下面列出的都是基于XML的
    - SVG（Scalable Vector Graphic ，可伸缩矢量图）
    - MathML（Mathematical Markup Language，数学标记语言）
    - SMIL（Synchronized Multimedia Integration Language，同步多媒体集成语言）

### BOM：

从根本上讲，BOM只处理浏览器窗口和框架；但人们习惯上也把所有针对浏览器的JavaScript扩展算作BOM的一部分。下面就是这样的一些扩展：

- 弹出新的浏览器窗口的功能
- 移动、缩放和关闭浏览器窗口的功能
- 提供浏览器详情信息的navigator对象
- 提供浏览器所加载页面的详细信息的location对象
- 提供用户显示器分辨率详细信息的screen对象
- 对cookies的支持
- 想xMLHttpRequest 和IE 的 ActiveXObject这样的自定义对象



# 第二章--在HTML中使用JavaScript

使用
```js
<script type="text/javascript" src="" ><script>
```
引入外部的js文件

使用script标签内部直接写js代码

# 第三章--JavaScript的基本概念

```javascript
var floatNum = 3.125e7  //等于31250000--->3.125 * 10的7次方
```

