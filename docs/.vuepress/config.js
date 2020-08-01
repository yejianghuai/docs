const headConfig = require("./config/headConfig");
const pluginsConfig = require("./config/pluginsConfig");
const navConfig = require("./config/navConfig");

module.exports = {
  base: "/my_blog/",
  title: "前端_踩坑日志",
  description: "Hello, My Friend!",
  // 在 head 中的 / 代表public ， 在路由中 / 表示docs
  head: headConfig,
  plugins: pluginsConfig,
  themeConfig: {
    logo: "/assets/logo.png", // 左上角的logo
    lastUpdated: "更新时间",
    nav: navConfig,
  },
};