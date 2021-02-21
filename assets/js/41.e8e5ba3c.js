(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{619:function(n,s,a){"use strict";a.r(s);var e=a(7),t=Object(e.a)({},(function(){var n=this,s=n.$createElement,a=n._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[a("Boxx"),n._v(" "),a("h1",{attrs:{id:"mongodb报错文档总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mongodb报错文档总结"}},[n._v("#")]),n._v(" MongoDB报错文档总结")]),n._v(" "),a("h2",{attrs:{id:"_1、mongodb-yaml＆＃30-无法识别的选项：安全＆＃30"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、mongodb-yaml＆＃30-无法识别的选项：安全＆＃30"}},[n._v("#")]),n._v(" 1、"),a("a",{attrs:{href:"https://www.thinbug.com/q/23345522",target:"_blank",rel:"noopener noreferrer"}},[n._v("MongoDB YAML＆＃30;无法识别的选项：安全＆＃30;"),a("OutboundLink")],1)]),n._v(" "),a("p",[a("strong",[n._v("当使用mongodb配置最高权限的root时，需要对bin文件下的mongod.cfg文件进行配置，开启权限配置，但是当我们配置完成需要重启后可能会遇到标题的问题，此时解决的办法为：")])]),n._v(" "),a("ul",[a("li",[n._v("重新配置mongod.cfg，可能是你配置的格式间距有问题（复制并覆盖就行）")])]),n._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("security:\n    authorization: enabled\n")])]),n._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[n._v("1")]),a("br"),a("span",{staticClass:"line-number"},[n._v("2")]),a("br")])]),a("ul",[a("li",[n._v("使用mongod --remove清除原有的服务")]),n._v(" "),a("li",[n._v('使用配置文件启动服务 mongod --config "D:\\MongoDB\\bin\\mongod.cfg" --serviceName "MongoDB" --install这里的路径是我的路径,自己需要修改(代码的意思是使用配置文件来安装服务)')]),n._v(" "),a("li",[n._v("不要动不动就重新安装，如果装在c盘没那么多事，没装C盘才需要这么配置")]),n._v(" "),a("li",[n._v("此时你的数据库可能在刚刚清除服务的时候被删除了，开启momgo的时候会失败（Error: couldn't connect to server 127.0.0.1:27017, connection attempt failed）")])]),n._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("这时候先去你的MongoDB目录的data下建立一个叫做db的文件夹存放表，再运行下面的命令行\nmongod.exe --dbpath D:\\MongoDB\\data\\db\n运行完后，再打开一个cmd输入mongo就可以开启服务了\n")])]),n._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[n._v("1")]),a("br"),a("span",{staticClass:"line-number"},[n._v("2")]),a("br"),a("span",{staticClass:"line-number"},[n._v("3")]),a("br")])]),a("h2",{attrs:{id:"_2、创建超级管理员"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2、创建超级管理员"}},[n._v("#")]),n._v(" 2、创建超级管理员")]),n._v(" "),a("ul",[a("li",[n._v("要先到bin目录下的mongod.cfg配置")])]),n._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("security:\n    authorization: enabled\n")])]),n._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[n._v("1")]),a("br"),a("span",{staticClass:"line-number"},[n._v("2")]),a("br")])]),a("ul",[a("li",[n._v("然后win+R输入services.msc，找到MongoDB，重启")]),n._v(" "),a("li",[n._v("重新打开一个cmd输入")])]),n._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("1、mongo\n2、show dbs (此时可能没有表，要自己再创建表)\n3、use admin\n4、输入创建超级管理员的指令\ndb.createUser({user:'admin',pwd:'123456',roles:[{role:'root',db:'admin'}]})\n")])]),n._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[n._v("1")]),a("br"),a("span",{staticClass:"line-number"},[n._v("2")]),a("br"),a("span",{staticClass:"line-number"},[n._v("3")]),a("br"),a("span",{staticClass:"line-number"},[n._v("4")]),a("br"),a("span",{staticClass:"line-number"},[n._v("5")]),a("br")])])],1)}),[],!1,null,null,null);s.default=t.exports}}]);