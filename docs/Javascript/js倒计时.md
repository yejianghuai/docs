---
 title: JavaScript 倒计时
 date: 2019-11-17
 categories:
 - javascript
 tags:
 - javascript
---
<Boxx/>
## JavaScript 倒计时

1、核心算法：输入时间减去现在的时间就是剩余的时间，只能拿毫秒运算
2、用时间戳来做，用户输入时间的总的毫秒减去现在时间的总的毫秒，得到的就是剩余的毫秒数
3、把剩余时间的总的毫秒数转为天、时、分、秒
转换公式如下：
- d =parseInt(总秒数/60/60/24); //  计算天数
- h =parseInt(总秒数/60/60%24); //  计算小时
- m=parseInt(总秒数/60%60); //  计算分数
- s =parseInt(总秒数%60); //  计算当前的秒数

```js
      function countDown(time) {
        let nowTime = +new Date(); // 当前时间毫秒数
        let inputTime = +new Date(time); //输入的毫秒数
        let times = (inputTime - nowTime) / 1000; //剩余的毫秒数
        let d = parseInt(times / 60 / 60 / 24); //  计算天数
        d = d < 10 ? "0" + d : d;
        let h = parseInt((times / 60 / 60) % 24); //  计算小时
        h = h < 10 ? "0" + h : h;
        let m = parseInt((times / 60) % 60); //  计算分数
        m = m < 10 ? "0" + m : m;
        let s = parseInt(times % 60); //  计算当前的秒数
        s = s < 10 ? "0" + s : s;
        return d + "天" + h + "时" + m + "分" + s + "秒";
      }
      console.log(countDown("2020-11-18 18:00"));
```



