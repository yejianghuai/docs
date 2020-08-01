module.exports =[
  // 注入到当前的页面的 HTML <head> 中的标签
  ["link", { rel: "icon", href: `/favicon.ico` }], //增加一个自定义的图表
  ["meta", { name: "author", content: "叶江怀" }],
  ["meta", { name: "keyword", content: "Mr.Ye's blog" }],
  ["link", { rel: "manifest", href: "/manifest.json" }],
  ["meta", { name: "theme-color", content: "#3eaf7c" }],
  ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
  [
    "meta",
    { name: "apple-mobile-web-app-status-bar-style", content: "black" },
  ],
  ["link", { rel: "apple-touch-icon", href: "/icons/icon-152x152.png" }],
  [
    "link",
    {
      rel: "mask-icon",
      href: "/icons/safari-pinned-tab.svg",
      color: "#3eaf7c",
    },
  ],
  [
    "meta",
    { name: "msapplication-TileImage", content: "/icons/icon-72x72.png" },
  ],
  ["meta", { name: "msapplication-TileColor", content: "#000000" }],
]