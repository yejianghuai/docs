(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{629:function(e,t,r){"use strict";r.r(t);var a=r(7),_=Object(a.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("Boxx"),e._v(" "),r("h1",{attrs:{id:"移动端相关"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#移动端相关"}},[e._v("#")]),e._v(" 移动端相关")]),e._v(" "),r("h2",{attrs:{id:"_1-移动端兼容适配"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1-移动端兼容适配"}},[e._v("#")]),e._v(" 1. 移动端兼容适配")]),e._v(" "),r("ul",[r("li",[r("meta",{attrs:{name:"viewport",content:"width=device-width, initial-scale=1.0"}})]),e._v(" "),r("li",[e._v("rem, em, 百分比")]),e._v(" "),r("li",[e._v("框架的栅格布局")]),e._v(" "),r("li",[e._v("media query媒体查询")]),e._v(" "),r("li",[e._v("手淘团队的一套flexible.js, 自动判断dpr进行整个布局视口的放缩")])]),e._v(" "),r("h2",{attrs:{id:"_2-flexible如何实现自动判断dpr"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-flexible如何实现自动判断dpr"}},[e._v("#")]),e._v(" 2. flexible如何实现自动判断dpr")]),e._v(" "),r("p",[e._v("判断机型, 找出样本机型去适配. 比如iphone以6为样本, 宽度375px, dpr是2")]),e._v(" "),r("h2",{attrs:{id:"_3-为什么以iphone6为标准的设计稿的尺寸是以750px宽度来设计的呢？"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_3-为什么以iphone6为标准的设计稿的尺寸是以750px宽度来设计的呢？"}},[e._v("#")]),e._v(" 3. 为什么以iPhone6为标准的设计稿的尺寸是以750px宽度来设计的呢？")]),e._v(" "),r("p",[e._v("iPhone6的满屏宽度是375px，而iPhone6采用的视网膜屏的物理像素是满屏宽度的2倍，也就是dpr(设备像素比)为2, 并且设计师所用的PS设计软件分辨率和像素关系是1:1。所以为了做出的清晰的页面，设计师一般给出750px的设计图，我们再根据需求对元素的尺寸设计和压缩。")]),e._v(" "),r("h2",{attrs:{id:"_4-如何处理异形屏iphone-x"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_4-如何处理异形屏iphone-x"}},[e._v("#")]),e._v(" 4. 如何处理异形屏iphone X")]),e._v(" "),r("ul",[r("li",[r("code",[e._v("safe area")]),e._v(": 默认放置在安全区域以避免遮挡, 但会压缩")]),e._v(" "),r("li",[e._v("在meta中添加"),r("code",[e._v("viewport-fit=cover")]),e._v(": 告诉浏览器要讲整个页面渲染到浏览器中，不管设备是圆角与否，这个时候会造成页面的元素被圆角遮挡")]),e._v(" "),r("li",[r("code",[e._v("padding: constant(env)")]),e._v(": 解决遮挡问题")])]),e._v(" "),r("h2",{attrs:{id:"_5-移动端首屏优化"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_5-移动端首屏优化"}},[e._v("#")]),e._v(" 5. 移动端首屏优化")]),e._v(" "),r("ul",[r("li",[e._v("采用服务器渲染ssr")]),e._v(" "),r("li",[e._v("按需加载配合"),r("a",{attrs:{href:"https://www.jb51.net/article/119160.htm",target:"_blank",rel:"noopener noreferrer"}},[e._v("webpack分块打包"),r("OutboundLink")],1),e._v(", 通过entry和commonChunkPlugin")]),e._v(" "),r("li",[e._v("很有必要将script标签➕异步")]),e._v(" "),r("li",[e._v("有轮播图 最好给个默认 另外要处理图片懒加载")]),e._v(" "),r("li",[r("a",{attrs:{href:"https://www.jianshu.com/p/bd202dca29ad",target:"_blank",rel:"noopener noreferrer"}},[e._v("打包线上也要注意去掉map 文件"),r("OutboundLink")],1)]),e._v(" "),r("li",[e._v("组件, 路由懒加载")]),e._v(" "),r("li",[e._v("webpack的一切配置 肯定是必须的")]),e._v(" "),r("li",[e._v("压缩图片 "),r("a",{attrs:{href:"https://tinypng.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://tinypng.com/"),r("OutboundLink")],1)]),e._v(" "),r("li",[e._v("建议还是用webpack的图片压缩插件")]),e._v(" "),r("li",[e._v("骨架屏")]),e._v(" "),r("li",[e._v("Loading页面")])]),e._v(" "),r("h2",{attrs:{id:"_6-pwa全称progressive-web-app，即渐进式web应用"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_6-pwa全称progressive-web-app，即渐进式web应用"}},[e._v("#")]),e._v(" 6. "),r("a",{attrs:{href:"https://segmentfault.com/a/1190000012353473?utm_source=tag-newest",target:"_blank",rel:"noopener noreferrer"}},[e._v("PWA全称Progressive Web App，即渐进式WEB应用"),r("OutboundLink")],1)]),e._v(" "),r("p",[e._v("一个 PWA 应用首先是一个网页, 可以通过 Web 技术编写出一个网页应用. 随后添加上 App Manifest 和 Service Worker 来实现 PWA 的安装和离线等功能\n解决了哪些问题？")]),e._v(" "),r("ul",[r("li",[e._v("可以添加至主屏幕，点击主屏幕图标可以实现启动动画以及隐藏地址栏")]),e._v(" "),r("li",[e._v("实现离线缓存功能，即使用户手机没有网络，依然可以使用一些离线功能")]),e._v(" "),r("li",[e._v("实现了消息推送\n它解决了上述提到的问题，这些特性将使得 Web 应用渐进式接近原生 App。")])]),e._v(" "),r("h2",{attrs:{id:"_7-离线包方案"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_7-离线包方案"}},[e._v("#")]),e._v(" 7. 离线包方案")]),e._v(" "),r("p",[e._v("现在 web 页面在移动端的地位越来越高，大部分主流 App 采用 native + webview 的 hybrid 模式，加载远程页面受限于网络，本地 webview 引擎，经常会出现渲染慢导致的白屏现象，体验很差，于是离线包方案应运而生。动态下载的离线包可以使得我们不需要走完整的 App 审核发布流程就完成了版本的更新")]),e._v(" "),r("h2",{attrs:{id:"_8-自适应和响应式布局的区别"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_8-自适应和响应式布局的区别"}},[e._v("#")]),e._v(" 8. "),r("a",{attrs:{href:"https://baijiahao.baidu.com/s?id=1627060039271152391&wfr=spider&for=pc",target:"_blank",rel:"noopener noreferrer"}},[e._v("自适应和响应式布局的区别"),r("OutboundLink")],1)]),e._v(" "),r("ol",[r("li",[r("p",[e._v("自适应布局通过检测视口分辨率，来判断当前访问的设备是：pc端、平板、手机，从而请求服务层，返回不同的页面；响应式布局通过检测视口分辨率，针对不同客户端在客户端做代码处理，来展现不同的布局和内容。")])]),e._v(" "),r("li",[r("p",[e._v("自适应布局需要开发多套界面，而响应式布局只需要开发一套界面就可以了。")])]),e._v(" "),r("li",[r("p",[e._v("自适应对页面做的屏幕适配是在一定范围：比如pc端一般要大于1024像素，手机端要小于768像素。而响应式布局是一套页面全部适应。")])]),e._v(" "),r("li",[r("p",[e._v("自适应布局如果屏幕太小会发生内容过于拥挤。而响应式布局正是为了解决这个问题而衍生出的概念，它可以自动识别屏幕宽度并做出相应调整的网页设计。")])])])],1)}),[],!1,null,null,null);t.default=_.exports}}]);