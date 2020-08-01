---
title: "Pie-vue轮子"
---
# Echarts Pie-vue轮子
```js
<template>
  <div>
    <div id="bedroom"></div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  props: {
    option: {
      type: Object
    },
    source: {
      type: Array
    }, 
    event: {
      type: Object,
      defaultOption: () => {
        return {};
      }
    },
    height: {
      type: String
    }
  },
  data() {
    return {
      chart: null,
      defaultOption: {
        animation: true, //饼图初始的动画效果
        // title为：标题设置！！
        title: {
          // x 设置水平安放位置，默认左对齐，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
          x: "center",
          // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
          y: "top",
          // itemGap设置主副标题纵向间隔，单位px，默认为10，
          itemGap: 10,
          backgroundColor: "#EEE",
          // 主标题文本样式设置
          left: "center",
          top: "10px",
          textStyle: {
            fontSize: 14
          },
          // 副标题文本样式设置
          subtextStyle: {
            fontSize: 18,
            color: "#8B2323"
          }
        },
        // legend为： 图例设置 ！！
        legend: {
          data: [],
          // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
          orient: "horizontal",
          // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
          x: "left",
          // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
          y: "bottom",
          itemWidth: 24, // 设置图例图形的宽
          itemHeight: 18, // 设置图例图形的高
          textStyle: {
            color: "#333", // 图例文字颜色
            padding: [0, 15, 0, 0]
          },
          // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
          itemGap: 5
          //   backgroundColor: "#eee" // 设置整个图例区域背景颜色
        },
        // series为：值域设置！！
        series: [
          {
            name: "生源地",
            type: "pie", //类型为饼图
            // radius: ["0","40%"], // 设置饼状图大小，100%时，最大直径=整个图形的min(宽，高)
            // radius: ["0%", "60%"], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            radius: "40%",
            // 动画效果
            // 数据更新时的动画效果
            // 1、缩放型：
            // animationType:'scale',
            // animationEasing:'elasticOut',
            // 2、沿圆弧展开型： animationTypeUpdate: "expansion",
            animationTypeUpdate: "expansion",
            animation: true,
            animationDuration: function() {
              // 初始动画时长，越往后的数据延迟越大
              return 1000;
            },
            animationDelay: function() {
              // 初始动画延迟时间，越往后的数据延迟越大
              return 0;
            },
            animationDurationUpdate: function() {
              // 数据更新后动画效果展示的时间，越往后的数据延迟越大
              // return idx * 100;
              return 1000;
            },
            animationDelayUpdate: function() {
              // 数据更新后延迟动画效果，越往后的数据延迟越大
              return 0;
            },
            clockWise: false, // 默认逆时针
            startAngle: 90,
            minAngle: 0, // 最小角度改为0
            selectedOffset: 10, // 选中是扇区偏移量
            center: ["50%", "40%"], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
            // data: this.dataSource,
            // itemStyle 设置饼状图扇形区域样式
            itemStyle: {
              // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
              // emphasis：设置鼠标（点击）放到哪一块扇形上面的时候，扇形样式、阴影
              emphasis: {
                shadowBlur: 10, //背景阴影
                shadowOffsetX: 0, //点击时出现高亮，越小偏移和高亮越明显
                shadowColor: "rgba(0, 0, 0, 0.5)" //点击后高亮的外框border颜色
              }
            },
            // 设置值域的那指向线
            labelLine: {
              normal: {
                show: true // show设置线是否显示，默认为true，可选值：true ¦ false
              }
            },
            // 设置值域的标签
            label: {
              normal: {
                position: "outer", // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                // {a}指series.name  {b}指series.data的name
                // {c}指series.data的value  {d}%指这一部分占总数的百分比
                borderColor: "#aaa",
                formatter: function(data) {
                  if (data.value === 1) {
                    return 100 + "%";
                  } else {
                    let value = data.data.value;
                    let currentName = data.name;
                    let baifenbi = parseFloat(data.percent).toFixed(1) + "%";
                    return `${currentName}:${value}个\n${baifenbi}`;
                  }
                }
              }
            }
          }
        ],
        // tooltip 为: 提示框设置
        tooltip: {
          // trigger 设置触发类型，默认数据触发，可选值：'item' ¦ 'axis' ,item：有提示框 axis :无提示框
          trigger: "item",
          showDelay: 10, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
          hideDelay: 10, // 隐藏延迟，单位ms
          backgroundColor: "rgba(0,0,0,0.5)", // 提示框背景颜色
          textStyle: {
            fontSize: "14px",
            color: "#fff" // 设置文本颜色 默认#FFF
          },
          formatter: function(data) {
            if (data.value === 1) {
              return 100 + "%";
            } else {
              let value = data.data.value;
              let currentName = data.name;
              let baifenbi = parseFloat(data.percent).toFixed(1) + "%";
              return `${currentName}:${value}个\n${baifenbi}`;
            }
          }
          // formatter设置提示框显示内容
          // {a}指series.name  {b}指series.data的name
          // {c}指series.data的value  {d}%指这一部分占总数的百分比
          //   formatter: this.tooltipFormatter
          //     ? this.tooltipFormatter
          //     : "{a} <br/>{b} : {c}个 ({d}%)"
        }
      }
    };
  },
  watch: {
    // source: echartsUpdate(newVal,oldVal){
    //   if (newVal !=== oldVal) {
    //     this.chart.clear();
    //     this.setOption
    //   }
    // },
    source: "echartsUpdate",
    loading: function(to) {
      if (to) {
        this.echarts.showLoading({
          text: "loading",
          color: "#333",
          textColor: "#000",
          maskColor: "rgba(255, 255, 255, 0.5)",
          zlevel: 0
        });
      } else {
        this.echarts.hideLoading();
      }
    }
  },
  mounted() {
    this.drawPie("bedroom");
    this.optionInit();
    this.bindEvent();
  },
  methods: {
    drawPie(id) {
      this.chart = echarts.init(document.getElementById(id));
      //   this.chart.setOption(this.defaultOption);
    },
    bindEvent() {
      if (this.event.onClicktooltip) {
        this.chart.on("click", "series", e => {
          this.$emit("onClicktooltip", e.dataIndex);
        });
      }
    },
    optionInit() {
      let { legendData, seriesRadius, labelPosition } = this.option;
      let data = { data: legendData };
      let position = { position: labelPosition };
      let radius = { radius: seriesRadius };
      Object.assign(this.defaultOption.legend, data);
      Object.assign(this.defaultOption.series[0], radius);
      Object.assign(this.defaultOption.series[0].label.normal, position);
    },
    echartsUpdate() {
      this.chart.clear();
      this.defaultOption.title.text = this.option.titleText;
      this.chart.setOption({
        ...this.defaultOption,
        dataset: { source: this.source }
      });
      this.chart.getDom().style.height = this.height;
      this.chart.getDom().childNodes[0].style.height = this.height;
      this.chart.getDom().childNodes[0].childNodes[0].style.height = this.height;
      this.chart.resize();
    }
  }
};
</script>
<style scoped>
#bedroom {
  width: 100%;
  height: 100vh;
}
</style>

```

