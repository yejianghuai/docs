---
 title: webpack
 date: 2019-11-28
 categories:
 - javascript
 tags:
 - webpack
---
<Boxx/>
## 安装webpack

- 安装本地webpack

- yarn add webpack webpack-cli -D

- 执行webpack    命令：npx  webpack

- npx webpack-dev-server  ---->配置localhost

- yarn add html-webpack-plugin    ------>配置html模板文件，并用此文件显示webpack压缩打包后的内容

- 安装loader配置文件:yarn add css-loader -D           (以此类推)

- css 抽离模板插件 yarn add mini-css-extract-plugin -D

- webpack.config.js文件简单的内容：

  ```jsx
  let path = require('path');
  let HtmlWebpackPlugin = require('html-webpack-plugin');//将压缩打包后的文件显示在src，目录下的index.html文件
  let MiniCssExtractPlugin = require('mini-css-extract-plugin')
  module.exports ={
  	devServer:{//开发服务器配置
          port:3000,
          proress:true,
          ontentBase:'./bulid' , //指定当前运行目录
          conpress:true,//执行压缩
  	},
      mode:'development',//模式，默认production(生产) development（开发）,要修改成开发环境而不是生产环境
      entry:'./src/index.js',//入口文件
      output:{//出口
          filename:'bundle.js',//打包后的文件名
          path:path.resolve(__dirname,'build'),//压缩打包后放置的文件名
      },
      plugins:[//数组  放着所有webpack的插件
          new HtmlWebpackPlugin({
              template:'./src/index.html',//模板index.html的位置
               filename:'index.html'
          }),
          new MiniCssExtractPlugin({//css样式抽离文件
              filename:'main.css'
          })
      ],
      module:{//模块
          //loader
          rules:[//规则   css-loader  解析 @import这种语法
              //style-loader  他是把css插入到head的标签中
              //必须将less/scss-->css-->style从右向左，从下向上
              //loader的特点，希望单一
              //loader的用法，字符串只用一个loader
              //多个loader需要[]
              //loader的顺序默认是从右向左执行
              //loader也可以写成对象的形式
               {test:/\.css$/,use[
               MiniCssExtractPlugin.loader,
              'css-loader']},
              {test:/\.css$/,use[
               {
               loader:'style-loader',
               options:{//设置
               	insertAt:'top'  设置style样式优先级
              	}
               },
              'css-loader']}
          ]
      },
  	"script":{
          "dev":"webpack-dev-server"
  	}
  	
  }
  ```

  

## 主要内容

```js
const path=require("path");

module.exports={
    entry:'./src/main.js',     //入口文件
    output:{                   //出口配置
        filename: 'bundle.js', //出口文件名
        path: path.resolve(__dirname, 'dist')  //出口文件路径
    },
    module: {},    //module.rules loader
    plugins:[],    //插件
    devServer:{}   //开发服务器
};
```

### 文件夹名称与内容:

```
├─dist
│      index.html        
└─src
        main.js
        
│  package.json
│  webpack.config.js

```

## Babel将ES6转换成ES5

bable可以将ES6转换成ES5并且给心得API注入polyfill

升级bable-upgrade

1、利用babel-grade -g

```
npm i babel-upgrade -g
babel-upgrade --write
```

2、重新安装包

3、修改配置文件的包名

配置：

1、本地安装Babel

```
npm i -D @babel/core @babel/preset-env babel-loader
@babel/plugin-transform-object-rest-spread @babel/plugin-transform-export-extensions @babel/plugin-transform-class-properties @babel/plugin-syntax-dynamic-import
```

2、配置webpack.config.js:

```js

在module.rules中添加如下：
module: {
        rules: [{
            test: /\.js$/,    //使用正则匹配所有需要使用babel-loader的文件
            use: {
                loader: "babel-loader",  //指明要使用的loader
                options: {               //传入loader的参数
                    presets: [           //用于解析一组语法特性
                        [
                            "@babel/preset-env",       //包含当前所有 ECMAScript 标准里的最新特性
                            {
                                "targets": {   //指定需要兼容的浏览器类型和版本
                                    "browsers": [
                                        "> 1%",     //支持市场份额超过1％的浏览器。
                                        "ie >= 9"   //支持IE9以上的版本
                                    ]
                                }
                            }
                        ]
                    ],
                    plugins: [         //用于解析某个语法特性
                        "@babel/plugin-proposal-object-rest-spread", //解析对象的扩展运算符（ES2018）
                        "@babel/plugin-proposal-export-default-from",  //解析额外的export语法:export v from "xx/xx"
                        "@babel/plugin-proposal-export-namespace-from", //解析额外的export语法:export v as vv from "xx/xx";
                        "@babel/plugin-proposal-class-properties",   //解析class中的静态属性
                        "@babel/plugin-syntax-dynamic-import"         //解析import方法
                    ]
                }
            }

        }]
    },
```

3、执行编译：

package.json 的 script字段添加如下：

```js
"build": "webpack"
```

执行 npm run build


### 使用webpack查看路由

在浏览器上输入localhost:4000/webpack-dev-server

可以查看路由途径

![1559790139399](C:\Users\Yejh\AppData\Roaming\Typora\typora-user-images\1559790139399.png)