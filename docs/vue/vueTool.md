---
title: vue：自定义tool
date: 2020-07-18
categories:
  - vue
tags:
  - tool
  - vue
---
<Boxx/>

```ts
export const isType = (target: any, type: string): boolean => {
  typeof target === type;
};
export const addPx = (target: string | number): string =>
  isType(target, "number") ? (target += "px") : target.toString();

export const deepCopy = (e) => JSON.parse(JSON.stringify(e));

export const eqObj = (obj1: any, obj2: any) => {
  JSON.stringify(obj1) === JSON.stringify(obj2);
};


export const isUndef = (v: any): boolean => {
  return v === undefined || v === null;
};

export const isEmptyObj = (obj: any) => {
  return isUndef(obj) || Object.keys(obj).length === 0;
};
import { Notification } from "element-ui";
import { Obj } from "@/types";
import store from "@/store";


let timeout: number | null = null;
export const debounce = (fn: CallableFunction, wait: number) => {
  if (timeout !== null) clearTimeout(timeout);
  timeout = setTimeout(fn, wait);
};

export const checkObj = (Obj: Object, key: string, defalut?: any) => {
  let check = Object.prototype.hasOwnProperty.call(Obj, key);
  if (!check) {
    Object.defineProperty(Obj, key, { value: defalut, writable: true });
  }
};

export const recursionConvert = (data: Obj<any>[], top = 0) => {
  data.forEach((item) => {
    let p = data.find((_item) => _item.id === item.pid);
    if (p) {
      if (!p.children) {
        p.children = [];
      }
      p.children.push(item);
    }
  });
  return data.filter((item) => item.pid === top);
};

export const copyBoard = (value: string) => {
  let input: HTMLInputElement | null = document.createElement("input");
  input.value = value;
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  document.execCommand("Copy");
  document.body.removeChild(input);
  input = null;
  return value;
};

export const isDev = process.env.NODE_ENV === "development";
export const isProd = process.env.NODE_ENV === "production";

// export const darken = (color: string, amount: number) =>
//   Color(color)
//     .darkenByAmount(amount / 100)
//     .toString();

// export const lighten = (color: string, amount: number) =>
//   Color(color)
//     .lightenByAmount(amount / 100)
//     .toString();


export const defalutTrue = (v?: boolean) => (v === undefined ? true : v);

export const strSplice = (pre: string, types: string[]) => {
  return types.map((t) => pre + "-" + t);
};

export const decimalCount = (num: number) => {
  const l = (num + "").split(".");
  return l.length > 1 ? l[1].length : 0;
};

export const AddFloat = (args: number[]) => {
  const lenArr = Array(args.length + 1).fill(0);
  args.forEach((num, index) => {
    lenArr[index] = decimalCount(num);
  });
  const m = Math.pow(
    10,
    lenArr.reduce((a, b) => (a > b ? a : b))
  );
  return args.map((num) => num * m).reduce((a, b) => a + b) / m;
};
export const arrIndexUp = (arr: unknown[], index: number): void => {
  /** 数组左移 */
  if (index !== 0) {
    arr[index] = arr.splice(index - 1, 1, arr[index])[0];
  } else {
    arr.push(arr.shift());
  }
};

export const arrIndexDown = (arr: unknown[], index: number): void => {
  /** 数组右移 */
  if (index !== arr.length - 1) {
    arr[index] = arr.splice(index + 1, 1, arr[index])[0];
  } else {
    arr.unshift(arr.splice(index, 1)[0]);
  }
};
// 切割数组
export function chunkArray(array: any, size: number): any {
  //获取数组的长度，如果你传入的不是数组，那么获取到的就是undefined
  const length = array.length;
  //判断不是数组，或者size没有设置，size小于1，就返回空数组
  if (!length || !size || size < 1) {
    return [];
  }
  //核心部分
  let index = 0; //用来表示切割元素的范围start
  let resIndex = 0; //用来递增表示输出数组的下标

  //根据length和size算出输出数组的长度，并且创建它。
  let result = new Array(Math.ceil(length / size));
  //进行循环
  while (index < length) {
    //循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
    result[resIndex++] = array.slice(index, (index += size));
  }
  //输出新数组
  return result;

```
时间处理tool
```js
import dateformat from "dateformat";

enum DateFormate {
  f0 = "MM:ss",
  f1 = "yyyy/mm",
  f2 = "yyyy/mm/dd",
  f3 = "yyyy/mm/dd HH:MM",
  f4 = "yyyy/mm/dd HH:MM:ss",
  f5 = "mm/dd HH:MM",
  f6 = "HH:MM:ss",
  f7 = "HH点MM分ss秒 l毫秒",
  f8 = "yyyymmddHHMMssl",
  f9 = "yyyymm"
}
const DAY_1 = 24 * 3600 * 1000;
const DAY_30 = DAY_1 * 30;
const now = new Date();
const timestamp = now.getTime();
const DayOfWeek = now.getDay();

export const date = (date: Date | string | number, type = 2): string => {
  /**
   * @date 需要处理的时间
   * @type 处理方式，参考上方的 @DateFormate 默认是2
   */
  const _date = typeof date === "number" ? new Date(date) : date;
  if (!date) {
    return "无";
  }
  const key = `f${type}`;
  return dateformat(_date, DateFormate[key]);
};

export const $前天 = date(timestamp - DAY_1 * 2);
export const $昨天 = date(timestamp - DAY_1);
export const $今天 = date(now);
export const $明天 = date(timestamp + DAY_1);
export const $后天 = date(timestamp + DAY_1 * 2);
export const $本月1号 = date(now, 1) + "/01";
export const $上月1号 = now.getFullYear() + "/" + now.getMonth() + "/01";
export const $本周一 = date(timestamp - (DayOfWeek - 1) * DAY_1);
export const $本周日 = date(timestamp - (DayOfWeek - 7) * DAY_1);
export const $上周一 = date(timestamp - (DayOfWeek + 6) * DAY_1);
export const $上周日 = date(timestamp - (DayOfWeek - 0) * DAY_1);
export const $30天前 = date(timestamp - DAY_30);
export const $30天后 = date(timestamp + DAY_30);
export const $本月 = date(now, 1);

export const isExpired = (date: string | Date) => {
  /**
   * 检测时间是否超过现在
   * @date 需要检测的时间
   */
  if (typeof date === "string") {
    date = new Date(date);
  }
  let current = new Date();
  return current.getTime() - date.getTime() > 0;
};

export const enumerateTime = (
  time1: string | Date,
  time2: string | Date
): string[] | false => {
  /**
   * 批量生成日期数组
   * @time1 起始时间
   * @time2 结束时间
   */
  const t = (t: string | Date): number =>
    typeof t === "string" ? new Date(t).getTime() : t.getTime();
  const _time1 = t(time1);
  const _time2 = t(time2);
  if (_time1 > _time2) {
    return false;
  }
  let len = (_time2 - _time1) / DAY_1 + 1;
  const tar = [];
  while (len--) {
    tar.push(date(_time2 - DAY_1 * len));
  }
  return tar;
};

```
