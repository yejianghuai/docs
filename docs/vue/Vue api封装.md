---
title: "vue: axios封装"
---
## Vue使用axios对api进行封装处理

api.js

```js
import axios from './axios.js'
import Vue from 'vue'
let GET={
    getFunction:'api/xxx',
}
let POST={
    postFunction:'api/yyy'
}
Object.keys(GET).map(key => {
  api[key] = data => axios.$get(GET[key], data)
})
Object.keys(POST).map(key => {
  api[key] = data => axios.$post(POST[key], data)
})

Vue.prototype.$api = api
```

main.js

```js
import './js/api.js'
//引入这个包，暴露就能用了
```
//axios.js
```js
import axios from "axios";
import { Toast } from "vant";
let toastOptions = { duration: 0, closeOnClick: true };
// axios.defaults.baseURL = "https://webapi3.baidu.com/"
// axios.defaults.baseURL = "https://api.baidu.com/";
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "https://webapi3.baidu.com/"
    : "https://api.baidu.com/";
axios.defaults.headers = {
  "Content-Type": "application/json"
};
axios.defaults.withCredentials = true;
axios.defaults.timeout = 30000;

axios.interceptors.request.use(
  request => {
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);
let timeout: any;
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (
      error.code === "ECONNABORTED" &&
      error.message.indexOf("timeout") !== -1
    ) {
      Toast.fail("网络超时");
      return Promise.reject(error);
    }
    if (timeout) {
      clearTimeout(timeout);
    }
    if (error.response && error.response.status === 401) {
      setTimeout(() => {
        window.localStorage.setItem(
          "jumpRoute",
          document.location.href.split("#")[1]
        );
        window.location.href =
          "https://api.haobangni.com/auth/hbnls/weixin?authfor=crm";
      }, 500);
    } else if (error.response && error.response.status === 404) {
      //404，500等问题
      Toast.fail({ message: "404 not found", ...toastOptions });
    } else if (error.response && error.response.status === 403) {
      //404，500等问题
      Toast.fail({ message: "没有权限访问，请联系管理员", ...toastOptions });
    } else {
      Toast.fail({
        message: "服务器发生了错误，请稍后重试。",
        ...toastOptions
      });
    }
    return;
  }
);

export function $post(url: string, data: object) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(
        res => {
          if (!res) {
            return;
          }
          if (res.data && res.data.errorcode === 1) {
            Toast.fail({ message: res.data.errormsg, ...toastOptions });
            reject(res.data);
          } else {
            resolve(res.data);
          }
        },
        res => {
          reject(res);
        }
      )
      .catch((err: any) => {
        reject(err);
      });
  });
}

export function $get(url: string, params: object) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then(
        res => {
          if (!res) {
            return;
          }
          if (res.data && res.data.errorcode === 1) {
            Toast.fail({ message: res.data.errormsg, ...toastOptions });
            reject(res.data);
          } else {
            resolve(res.data);
          }
        },
        res => {
          reject(res);
        }
      )
      .catch((err: any) => {
        reject(err);
      });
  });
}

```
