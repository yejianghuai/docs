---
title: "vue_tool"
---
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

```
