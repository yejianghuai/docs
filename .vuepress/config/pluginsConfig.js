const moment = require("moment");
moment.locale("zh-cn");
const secret = require("./secret");
module.exports = [
  // 这是 VuePress 默认主题使用这个插件的方式
  [
    "vuepress-plugin-container",
    {
      type: "tip",
      defaultTitle: {
        "/": "TIP",
        "/zh/": "提示",
      },
    },              
  ],
  ["copyright"],
  // 时间插件
  [
    "@vuepress/last-updated",
    {
      transformer: (timestamp) => {
        // 不要忘了安装 moment
        // const moment = require("moment");
        // // lang:指的是多语言。默认英文
        // moment.locale("zh-cn");
        return moment(timestamp).format("LLLL");
      },
    },
  ],
  // 弹窗提醒
  [
    "@vuepress/pwa",
    {
      serviceWorker: true,
      updatePopup: {
        message: "发现新内容啦，赶紧刷新下",
        buttonText: "刷 新",
        // popupComponent: "MySWUpdatePopup",
      },
    },
  ],
  ["@vuepress/back-to-top"], //回到最上
  //站点统计
  [
    //
    "@vuepress/google-analytics",
    {
      ga: secret.ga, // UA-00000000-0
    },
  ],
  // 自动化生成侧边栏插件
  ["vuepress-plugin-auto-sidebar", {}],
  // 图片放大插件
  ["@vuepress/medium-zoom", { selector: "img.custom" }],
  //引入插件 看板娘
  [
    "vuepress-plugin-helper-live2d",
    {
      live2d: {
        // 是否启用(关闭请设置为false)(default: true)
        enable: true,
        // 模型名称(default: hibiki)>>>取值请参考：
        // https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
        model: "hibiki", //hibiki epsilon2_1 izumi gf haru/01 haru/02 miku shizuku tsumiki z16
        display: {
          position: "right", // 显示位置：left/right(default: 'right')
          width: 135, // 模型的长度(default: 135) 宽:高 === 0.45:1
          height: 300, // 模型的高度(default: 300)
          hOffset: 168, //  水平偏移(default: 65)
          vOffset: 0, //  垂直偏移(default: 0)
        },
        mobile: {
          show: false, // 是否在移动设备上显示(default: false)
        },
        react: {
          opacity: 1, // 模型透明度(default: 0.8)
        },
      },
    },
  ],
  ["vuepress-plugin-boxx"],
];
