---
title: "common.css"
---
```css
body,
ol,
ul,
h1,
h2,
h3,
h4,
h5,
h6,
p,
th,
td,
dl,
dd,
form,
fieldset,
legend,
input,
textarea,
select {
  margin: 0;
  padding: 0;
}

body,
html {
  width: 100%;
  height: 100vh;

  -webkit-overflow-scrolling: touch;
}
html{
  overflow-y: overlay;
}
body {
  color: #333;
  background: #fff;

  font: 14px "Microsoft YaHei", 微软雅黑, Arial;

  -webkit-text-size-adjust: 100%;
}

a {
  color: inherit;

  text-decoration: none;
}

a:hover {
  color: inherit;

  text-decoration: none;
}

button {
  cursor: pointer;
}

em {
  font-style: normal;
}

li {
  list-style: none;
}

img {
  border: 0;

  vertical-align: middle;
}

p {
  word-wrap: break-word;
}

textarea {
  display: block;
  overflow-y: auto;

  box-sizing: border-box;
  width: 100%;
  height: 120px;
  min-height: 120px;
  padding: 12px 15px;

  color: #969799;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;

  font: 14px "Microsoft YaHei", 微软雅黑, Arial;
  line-height: 1.5;

  resize: none;
}

.clearfix::after {
  content: "";

  display: block;
  clear: both;
}
```