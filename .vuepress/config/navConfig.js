module.exports = [
  //导航栏的配置
  { text: "首页", link: "/" },
  {
    text: "技术相关",
    items: [
      // { text: "面试专用", link: "/categories/interview/" },
      { text: "Css", link: "/categories/css/" },
      { text: "Javascript", link: "/categories/Javascript/" },
      { text: "Vue", link: "/categories/vue/" },
      { text: "React", link: "/categories/react/" },
      { text: "Node", link: "/categories/node/" },
      { text: "数据结构", link: "/categories/data_structure/" },
      { text: "数据库", link: "/categories/database/" },
      { text: "其他", link: "/categories/other/" },
    ]
  },
  {
    text:'导航',
    link:'https://yejianghuai.github.io/nav/#/',
    icon:'reco-category'
  },
  {
    text: "时间轴",
    link: "/timeline/",
    icon: "reco-date",
  },
  { text: "简历", link: "/docs/resume/" },
  {
    text: "掘金",
    link: "https://juejin.im/user/5c9c1b7d6fb9a070bd59b1bc/posts",
    icon: "reco-juejin"
  },
  {
    text: "github",
    link: "https://github.com/yejianghuai",
    icon: "reco-github",
  },
];
