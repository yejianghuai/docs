const headConfig = require("./config/headConfig");
const pluginsConfig = require("./config/pluginsConfig");
const navConfig = require("./config/navConfig");
const secret = require("./config/secret");

module.exports = {
  title: "薛定猫的……饿!",
  description: "Hello, My Friend!",
  dest: "dists",
  // base: "/docs/", //换成个人网站时需要注释
  head: headConfig,
  plugins:pluginsConfig,
  theme: "reco",
  themeConfig: {
    nav: navConfig,
    lastUpdated: 'Last Updated',
    vssueConfig: {
      // 设置 `platform` 而不是 `api`
      platform: "github-v4",
      // 其他的 Vssue 配置
      owner: "yejianghuai",
      repo: "docs",
      clientId: secret.clientId,
      clientSecret: secret.clientSecret,
      autoCreateIssue: true,
    },
    sidebar: "auto",
    type: "blog",
    friendLink: [
      {
        title: "午后南杂",
        desc: "Enjoy when you can, and endure when you must.",
        email: "1156743527@qq.com",
        link: "https://www.recoluan.com",
      },
      {
        title: "网道",
        desc: "JavaScript 教程（阮一峰老师）",
        avatar:
          "https://wangdoc.com/javascript/assets/icons/apple-icon-60x60.png",
        link: "http://wangdoc.com/javascript/",
      },
      {
        title:'掘金',
        desc:'开发者 社区',
        avatar:'https://b-gold-cdn.xitu.io/favicons/v2/favicon-32x32.png',
        link:'https://juejin.im/'
      },
      {
        title: 'vuepress-theme-reco',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        logo: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: 'https://vuepress-theme-reco.recoluan.com'
      },
    ],
    logo: "/logo.png",
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "Last Updated",
    author: "叶江怀",
    authorAvatar: "/avatar.png",
    record: "这是我的记录",
    startYear: "2020",
    codeTheme: 'funky'
  },
  markdown: {
    lineNumbers: true,
  },
};
