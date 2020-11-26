---
title: Lottie ： 前端SVG动画效果
date: 2020-09-07
categories:
  - plugins
tags:
  - lottie
---
<Boxx/>
## Lottie

### lottie-web

`with npm | yarn` </br>
`npm install lottie-web 或者 yarn add lottie-web`

```vue
<template>
  <div id="app">
    <div class="animation-style" ref="animation"></div>
    <button @click="stop" type="primary">停止</button>
    <button @click="pause" type="info">暂定</button>
    <button @click="play" type="default">开始</button>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import lottie from "lottie-web";
import Trophy from "./trophy.json"; // 导入json包

export default {
  name: "App",
  components: {},
  data() {
    return {
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 1,
      anim: {},
    };
  },
  mounted() {
    this.anim = lottie.loadAnimation({
      container: this.$refs.animation,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: Trophy, //动画json
    });
  },
  methods: {
    handleAnimation(anim) {
      this.anim = anim;
    },
    stop() {
      //  stop() 会直接回到初始的位置
      this.anim.stop();
    },
    play() {
      // play() 会开始转动
      this.anim.play();
    },
    pause() {
      // pause() 会暂停，再次点击play()会再次动起来
      this.anim.pause();
    },
    onSpeedChange() {
      // 调节速度
      this.anim.setSpeed(this.animationSpeed);
    },
  },
};
</script>
```

### vue-lottie

`with npm | yarn`</br>
`npm install vue-lottie 或者 yarn add vue-lottie`

#### app.vue

```vue
<template>
  <div id="app">
    <lottie :options="defaultOptions" @animCreated="handleAnimation" />
    <van-button @click="stop" type="primary">stop</van-button>
    <van-button @click="pause" type="info">pause</van-button>
    <van-button @click="play" type="default">play</van-button>
  </div>
</template>

<script>
import * as animationData from "./assets/dice4.json";
import pinjump from "./assets/pinjump.json";
export default {
  name: "app",
  data() {
    return {
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 1,
      anim: {},
    };
  },
  methods: {
    handleAnimation(anim) {
      this.anim = anim;
    },

    stop() {
      this.anim.stop();
    },

    play() {
      this.anim.play();
    },

    pause() {
      this.anim.pause();
    },
    onSpeedChange() {
      // 调节速度
      this.anim.setSpeed(this.animationSpeed);
    },
  },
};
</script>
```

#### main.js

```js
import Vue from "vue";
import App from "./App.vue";
import "vant/lib/button/style";
import lottie from "vue-lottie";
Vue.component("lottie", lottie);
Vue.use(Button);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

### lottie-vuejs

Add to lottie-vuejs to your project</br>
`npm install --save lottie-vuejs | yarn add lottie-vuejs`</br>
Install lottie-vuejs globally</br>
`npm install -g lottie-vuejs | yarn global add lottie-vuejs`</br>

#### main.js - 全局注册

```js
import Vue from "vue";
import LottieAnimation from "lottie-vuejs"; // import lottie-vuejs

Vue.use(LottieAnimation); // add lottie-animation to your global scope

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

#### OR - 按需引入

```vue
<script>
import LottieAnimation from 'lottie-vuejs' // import lottie-vuejs

export default {
  components: {
      LottieAnimation
  },
  data: () => ({
    ...
  })
};
</script>
```

#### app.vue

```vue
<template>
  <lottie-animation
    path="path/to/your/lottie-animation.json"
    :loop="false"
    :autoPlay="true"
    :loopDelayMin="2.5"
    :loopDelayMax="5"
    :speed="1"
    :width="256"
    :height="256"
    @AnimControl="setAnimController"
  />
</template>
```

- path:
  - The relative path to the animation object (starts in your public folder) e.g. animations/my-cool-animation.json or an absolute path e.g. http://www.mysite.com/animations/my-cool-animation.json.
- speed:
  - type: Number
  - required: false
  - default: 1
- width:
  - type: Number
  - required: false
  - default: -1 //defaults to 100%, Number is in pixels
- height:
  - type: Number
  - required: false
  - default: -1 //defaults to 100%, Number is in pixels
- loop:
  - type:Boolean
  - required: false
  - default: true
- autoPlay:
  - type:Boolean
  - required: false
  - default: true
- loopDelayMin:
  - type: Number
  - required: false
  - default: 0
- loopDelayMax:
  - type: Number
  - required: false
  - default: 0
- @AnimControl:
  - type: Event
  - required: false
  - Returns the lottie-web animation controller for custom event hookup & direct access to the lottie instance. Read the lottie-web usage section for more info
