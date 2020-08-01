---
title: "Echarts 配置"
---

## 一、使用方式

[！引入 Echarts 的两种方式](http://echarts.baidu.com/echarts2/doc/doc.html#%E5%BC%95%E5%85%A5ECharts1)

### 1.模块化包引入

    ```js
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>ECharts</title>

    </head>
    <body>
        <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
        <div id="main" style="width: 600px;height:400px;"></div>
        ...
        <!-- 引入 echarts.js -->
        <script src="echarts.min.js"></script>
        <script type="text/javascript">
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));

            // 指定图表的配置项和数据
            var option = {

            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            $(window).resize(function () {//图表随浏览器页面大小变化（响应式）
                myChart.resize();
            });
        </script>
    </body>
    </html>
    ```

### 2.模块化单文件引入（推荐）

#### Echarts 单文件

![Echarts单文件](https://leanote.com/api/file/getImage?fileId=5832aaa9ab6441366c00c18e)

    ```js
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>ECharts</title>
    </head>
    <body>
        <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
        <div id="main" style="width: 600px;height:400px;"></div> <div id="main" style="height:400px;"></div>
        ...
        <!-- 引入 require.js -->
        <script src="./js/require.js"></script>
        <!-- 引入 echarts.js -->
        <script src="./js/echarts.js"></script>
        <script type="text/javascript">
            require.config({
                paths: {
                    echarts: './js/dist'
                }
            });
            require(
                [
                    'echarts',
                    'echarts/chart/line',   // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
                    'echarts/chart/bar'
                ],
                function (ec) {
                    var myChart = ec.init(document.getElementById('main'));
                    var option = {
                        ...
                    }
                    myChart.setOption(option);
                    $(window).resize(function () {//图表随浏览器页面大小变化（响应式）
                        myChart.resize();
                    });
                }
            );
        </script>
    </body>
    </html>
    ```

## 二、option 配置参数——直角坐标系相关组件

Attention！如果不是最后一个属性，需在配置后添加逗号英文半角的逗号, 此外，在配置中所有字符也都必须是英文半角的。

    ```js
    option = {
                // /************************************ 标题***********************************/
                title: {
                    show: true,
                    x: 'center', //横轴位置
                    y: 'top', //竖轴位置
                    //或者方位词控制位置，例如left: 'center'
                    text: '折线图——主标题', //主标题内容

                    textStyle: {//主标题的具体样式fontFamily、fontWeight等
                        fontSize: '18', //字体大小
                        fontWeight: '600',//字体粗细 —— bold、bolder
                        fontStyle: 'normal',//字体样式——斜体（italic、oblique）、正常（normal）
                        fontFamily: 'SimSun',//标题字体
                        color: '#3b8bce'//标题颜色
                    },
                    backgroundColor: '#f02',//标题模块背景色
                    borderColor: '#ccc',
                    borderWidth: 10,
                    padding: 20,
                    margin: '20',

                    link: '', //主标题链接
                    target: 'blank', // 指定窗口打开主标题超链接 self（当前窗口） | blank（新窗口）


                    subtext: '纯属虚构', // 副标题内容
                    sublink: '', //副标题链接
                    subtextStyle: {//副标题的具体样式fontFamily、fontWeight等
                        //同主标题样式
                    },
                    subtarget: '',// 指定窗口打开副标题超链接 self（当前窗口） | blank（新窗口）
                    textAlign: 'left', //文本水平对齐
                    textBaseline: 'top', //垂直对齐

                    itemGrap: 10, //主标题和副标题的上下间距
                    shadowColor: 'rgba(0,0,0,.5)', //阴影颜色
                    shadowBlur: 10, //阴影模糊大小
                    shadowOffsetX: 10,//偏离水平位置
                    shadowOffsetY: 10//偏离垂直位置
                },
                // /*************************************样例***************************************/
                legend: {
                    show: true,
                    x: 'left',
                    y: 10,
                    textStyle: {//文字样式

                    },
                    width: 'auto',//宽高默认自适应
                    height: 'auto',
                    orient: 'vertical',//图例的布局 水平（horizontal） | 垂直（vertical）
                    align: 'left', //图例标记和文本的对齐，默认auto， 图例在左（left） | 图例文字都居中，重叠（center）| 图例在右（right）
                    itemWidth: 20,//图例大小样式
                    itemHeight: 10,
                    /*样例格式*/
                    formatter: '{name}就是这么任性',
                    formatter: function (name) {
                    // 对name参数进行操作，返回想要的样例格式
                        return echarts.format.truncateText(name + 'page', 50);//number控制样例的宽度
                    },
                    tooltip: { //提示框,可在样例过长被省略时使用
                        show: true,
                        position: [50, 50]
                    },

                    selectedMode: 'multiple',//图例选选择模式改变系列的显示状态，显示多个（multiple） 或者 单个（single）
                    inactiveColor: '#ccc',//图例关闭时的颜色

                    /*边框样式*/
                    borderColor: '#f02',//, '#545454','#999' 边框颜色
                    borderWidth: 1, //边框宽度
                    borderType: 'solid', //边框类型

                    /*投影样式*/
                    shadowColor: 'rgba(0,0,0,.5)', //投影颜色
                    shadowBlur: 10, //模糊程度
                    shadowOffsetX: 10, //偏离x的距离
                    shadowOffsetY: 10, //偏离y的距离
                    opacity: 0.5,//可在rbga中直接设置
                    data: ['邮件营销','联盟广告', '视频广告', '直接访问', '搜索引擎']//默认样式
                    data: [{
                            name:'邮件营销',
                         // 强制设置图形为圆。
                            icon: 'circle', //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                            //'image://url'设置为图片，其中 url 为图片的链接。
                         // 设置文本为红色
                            textStyle: {
                                color: 'blue'
                             }
                        }
                    },
                    ...
                    ]
                },
                // /*************************************网格***********************************/
                grid: {//整个图表的位置
                    x: '10%', //与容器左边的距离
                    x2: '10%',//与容器右边的距离
                    y: '20%',//与容器上边的距离
                    y2: '20%',//与容器下面的距离

                    //如果设置网格宽高则无需设置位置
                    width: '',//网格宽度
                    height: '',//网格高度
                     containLabel: true//是否包括 刻度标签（XY轴）

                     // /*边框样式*/
                    borderColor: '#f02',//, '#545454','#999' 边框颜色
                    borderWidth: 1, //边框宽度
                    borderType: 'solid', //边框类型

                    // /*投影样式*/
                    shadowColor: 'rgba(0,0,0,.5)', //投影颜色
                    shadowBlur: 10, //模糊程度
                    shadowOffsetX: 10, //偏离x的距离
                    shadowOffsetY: 10, //偏离y的距离
                    opacity: 0.5,//可在rbga中直接设置

                },
                // /************************************工具箱*************************************/
                toolbox: {
                    show: true,
                    x2: '10%',
                    y: '5%',
                    feature: {
                        // mark: {show: true},
                        dataView: {show: true, readOnly: false}, //数据视图
                        magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']}, //类型切换
                        restore: {show: true}, //还原视图
                        saveAsImage: {show: true}, //保存为图片
                        dataZoom: { //数据缩放
                            show: true
                        },
                        brush: {//选框组件的按键
                            show: true,
                            //对单个工具样式进行设置
                            iconStyle: {//图标样式
                                normal: {//正常情况下
                                    borderColor: '#545454',//, '#545454','#999'
                                    borderWidth: 1,
                                    borderType: 'solid',
                                    shadowColor: 'rgba(0,0,0,.5)',
                                    shadowBlur: 10,
                                    shadowOffsetX: 10,
                                    shadowOffsetY: 10,
                                    opacity: 0.5,
                                    textPosition: 'left' //文字位置

                                },
                                emphasis: {//鼠标经过时，样式属性同上

                                }

                            }

                        }
                    },
                    //对工具箱内所有工具进行相同的样式设置
                    iconStyle: {//图标样式
                        normal: {
                            borderColor: '#f02',//, '#545454','#999'
                            borderWidth: 1,
                            borderType: 'solid',
                            shadowColor: 'rgba(0,0,0,.5)',
                            shadowBlur: 10,
                            shadowOffsetX: 10,
                            shadowOffsetY: 10,
                            opacity: 0.5,
                            textPosition: 'left'

                        },
                        emphasis: {//鼠标经过时，样式属性同上

                        }

                    }

                },
                calculable: false,//是否能够拖拽重计，Echarts3不支持
                // /**************************************X轴*************************************/
                xAxis: [
                    {
                        type: 'category',//'value'数值轴，适用于连续数据。
                        'category'类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
                        'time'时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
                        'log' 对数轴。适用于对数数据。

                        min: 100,//类目轴中无效
                        max: 1000,
                        splitNumber: 5,//坐标轴的分割段数(预估值)，类目轴中无效

                          /*设置x轴名称及样式*/
                        name: '',//定义横轴名称,默认位置在横轴末端
                        nameLocation: 'start',//仅三个位置 middle | end
                        boundaryGap: false, //坐标轴两边留白 ,type 为数值型的时候可设置 [num, num] | [ '%','%']
                        nameTextStyle:{ /*坐标轴名称样式*/
                        },
                        nameGap:  16, //与坐标轴距离
                        nameRotate : 30,//旋转角度

                        inverse: false,//是否反向显示
                        silent: false,//静态不交互

                        // /*关于刻度线的样式*/
                        axisTick: {//是否显示刻度
                            show: true,
                            alignWithLabel: true,//类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐。
                            inside: false,
                            length: 5,
                            lineStyle:{
                            color: '#f03',
                            width: 1,
                            type: 'solid', //指示器类型 实线（solid） | 点线（dotted） | 虚线（dashed）;
                            shadowColor: 'rgba(0,0,0,.5)', //阴影颜色
                            shadowBlur:10, //阴影模糊大小
                            shadowOffsetX: 10,//偏离水平位置
                            shadowOffsetY: 10,//偏离垂直位置
                            opacity: 0.9
                            }
                        },
                        boundaryGap: false, //坐标轴两边留白 ,type 为数值型的时候可设置 [num, num]

                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],//默认样式

                        data: [//对单个数据进行样式配置
                        {
                            value: '周一',
                            textStyle:{
                               color: '#333',
                               align: 'right',
                               baseline: 'top'
                         }
                         }
                         ...
                         ],
                        axisLabel: {//坐标轴刻度标签的相关设置。
                            interval: 1, //刻度和数据间隔显示
                            textStyle: {
                                color: function (val) {
                                //对x轴数据进行判断，返回颜色字符串
                                    return val == '周一' ? 'red' : 'green';
                                }
                            },
                            formatter: function (val) {
                            //控制x轴参数名的格式输出
                                if (val == '周三') {
                                    return val + 'kg';
                                } else {
                                    return val;
                                }
                            }
                        }
                        splitLine: { //图表背景的横轴虚线
                            show: true
                        },
                        splitArea: { //分割区域
                            show: true

                        }
                    }
                ],
                // /**************************************Y轴*************************************/
                yAxis: [
                    {
                        //同x轴属性
                    }
                ],
                // /************************************提示框**********************************/
                tooltip: {
                    show: true,
                    trigger: 'item',// 触发类型 数据项图形触发（item） | 坐标轴（xAxis）
                    showContent: true, //是否显示提示框悬浮层
                    alwaysShowContent: false, //永远显示提示框内容
                    triggerOn: 'mousemove', //mousemove //提示框的触发形式 点击（click） | 鼠标移动（mousemove） |不触发（none）
                    showDelay: 0,//浮层显示延迟 ms——！在 triggerOn 为 'mousemove' 时有效。
                    hideDelay: 0,//浮层隐藏延迟 ms——！在 alwaysShowContent 为 'true' 时无效
                    enterable: false, //鼠标能否进入提示框
                    axisPointer: {   // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow', // 默认为直线，可选为：直线指示器'line'
                                        // 阴影指示器'shadow' | 十字准星指示器'cross'
                        axis: 'x',   //指示器坐标轴'x', 'y', 'radius', 'angle'
                        lineStyle: {//直线指示器样式
                            color: '#f03',
                            width: 1,
                            type: 'solid', //指示器类型 实线（solid） | 点线（dotted） | 虚线（dashed）;
                            shadowColor: 'rgba(0,0,0,.5)', //阴影颜色
                            shadowBlur:10, //阴影模糊大小
                            shadowOffsetX: 10,//偏离水平位置
                            shadowOffsetY: 10,//偏离垂直位置
                            opacity: 0.9

                        },
                        shadowStyle: {//阴影指示器样式，同上

                        },
                        crossStyle: {//十字准星指示器样式
                            //同上
                            textStyle: {// 提示文字的样式
                                fontSize: '18', //字体大小
                                fontWeight: '600',//字体粗细 —— bold、bolder
                                fontStyle: 'normal',//字体样式——斜体（italic、oblique）、正常（normal）
                                fontFamily: 'SimSun',//字体
                                color: '#3b8bce'//颜色
                            }

                        }
                    }

                    position: function (point, params, dom) {//返回格式必须是数组Array[]格式 [num, num]
                        // point:鼠标位置Array
                        console.info('提示框位置：', params);
                        return [point[0], 10];
                    },
                    //格式控制器
                    formatter: '{b}<br/>{a0}: {c0}<br />{a1}: {c1}<br/>' + '{a2}: {c2}<br />{a3}: {c3}<br />{a4}: {c4}', //a：系列名，b：数据名，c：数据值
                    formatter: function(params, ticket, callback){
                        console.info('formatter数据集:',params);
                    },

                    //为提示框浮层添加阴影
                    extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'

                },
                // /************************************数据缩放**********************************/
                dataZoom: [
                    {    type: 'inside'
                    }
                    {
                        id: 'dataZoomX',
                        type: 'slider',
                        xAxisIndex: [0],
                        filterMode: 'filter'
                    },
                    {
                        id: 'dataZoomY',
                        type: 'slider',
                        yAxisIndex: [0],
                        filterMode: 'empty'
                    }
                ],
                series: [
                    {
                        name: '邮件营销',//数据名
                        type: 'line',
                        stack: '总量',
                        symbolSize: 30,//折现图中控制拐点大小
                        label: {//针对柱状图 ，饼图
                            //显示数值标签
                            normal: {//正常情况下
                                show:true,
                                position:'inside',//'top''left''right''bottom''inside''insideLeft','insideRight''insideTop''insideBottom''insideTopLeft','insideBottomLeft''insideTopRight''insideBottomRight'

                            },
                            emphasis: {
                            //鼠标经过时
                            }
                        }
                        //系列中的数据标注内容
                        markPoint: {
                            symbol: 'circle',
                            //标注图标：'circle', 'rect', 'roundRect','triangle', 'diamond', 'pin', 'arrow','image://url'//标注图标或自定义图片
                            data: [
                                {type: 'max', name: '最大值', symbolSize: 200},
                                {type: 'min', name: '最小值'}
                            ]

                        },
                        //系列中的数据标线内容
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ],
                            lineStyle: {//数据标线样式
                                normal: {
                                    // show: true
                                    // type: 'solid'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                barBorderRadius: [5, 5, 0, 0]
                                color: '#2ec7c9'
                            }

                        },
                        data: [
                        {
                         value: msglossrate1, //值为变量
                         name: '邮件营销',
                         itemStyle: {
                            normal: {
                                color: '#00EE00',
                                label: {
                                    show: function () {
                                        if (msglossrate1 == 0) {
                                         return true;
                                        }
                                    }()
                                },
                                labelLine: {
                                    show: function () {
                                        if (msglossrate1 == 0) {
                                            return false;
                                        }
                                    }(),
                                    length: 5
                                }
                            }
                        }
                        }, 132, 101, 134, 90, 230, 210]

                    },
                    {
                        name: '联盟广告',
                        type: 'line',
                        stack: '总量',
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '视频广告',
                        type: 'line',
                        stack: '总量',
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '直接访问',
                        type: 'line',
                        stack: '总量',
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name: '搜索引擎',
                        type: 'line',
                        stack: '总量',
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            };
```


### 小结

    1.是否显示——>show: true | false， 所有组件都有的一级属性，其实当你在option中写出这个组件名时就已经默认显示true。

    2.文字样式
    凡是有文字或者数值输出显示的组件，都存在textStyle属性配置文字样式
    textStyle:{
        color: '#333',//字体颜色
        fontSize: '12px',//字体大小
        fontWeight: 'normal',//字体粗细 —— bold、bolder
        fontStyle: 'normal', //字体样式——斜体（italic、oblique）、正常（normal）
        fontFamily: 'SimSun'//宋体
    },
    此外padding,margin,backgroundColor,borderColor,borderWidth等属性通常与textStyle同级

    3.位置
     1) position: left | right | center | [num, num] | ['%','%'] |...
     拥有此属性的组件有：tooltip(提示框), xAxis(x轴), yAxis(y轴)

     2)  x： , y:  ,x2: , y2:   ——>与容器边框的距离
          - x: '10%', //与容器左边的距离
          - x2: '10%',//与容器右边的距离
          - y: '20%',//与容器上边的距离
          - y2: '20%',//与容器下面的距离
     拥有此属性的组件有：title(标题), toolbox(辅助工具箱), grid(网格), legend(图例)

     3) left | right | top | bottom
     拥有此属性的组件有：title(标题), toolbox(辅助工具箱), grid(网格), legend(图例)

    4.待续......

### ADD OPTION
```js
//xAxis 中的 axisLabel 的过长换行
   formatter: function(value){
    console.info('params',value);
    var newParamsName = "";// 最终拼接成的字符串
    var paramsNameNumber = value.length;// 实际标签的个数
    var provideNumber = 8;// 每行能显示的字的个数
    var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
    /**
    * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
    */
    // 条件等同于rowNumber>1
    if (paramsNameNumber > provideNumber) {
    /** 循环每一行,p表示行 */
    for (var p = 0; p < rowNumber; p++) {
    var tempStr = "";// 表示每一次截取的字符串
    var start = p * provideNumber;// 开始截取的位置
    var end = start + provideNumber;// 结束截取的位置
    // 此处特殊处理最后一行的索引值
    if (p == rowNumber - 1) {
    // 最后一次不换行
    tempStr = value.substring(start, paramsNameNumber);
    } else {
    // 每一次拼接字符串并换行
    tempStr = value.substring(start, end) + "\n";
    }
    newParamsName += tempStr;// 最终拼成的字符串
    }

    } else {
    // 将旧标签的值赋给新标签
    newParamsName = value;
    }
    //将最终的字符串返回
    return newParamsName
    }

//formatter:function(val){
//    return val.split("").join("\n");
//}
```
