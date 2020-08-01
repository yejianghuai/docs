<template>
  <div class="vpSelect">
    <label v-if="label">{{label}}</label>
    <select class="select-wrap">
      <option value="0" style="color: #b6b6b6" disabled selected>请选择证件类型</option>
      <option value="1">大陆居民身份证</option>
      <option value="2">海外身份证</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "vpSelect",
  props: {
    label: {
      default: "",
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {
    //监听输入框事件
    onChange: function ($event) {
      console.log(this);
      this.$emit("inputChanged", $event); //将值放在自定义的事件函数中作为参数
    },
  },
  computed: {},
};
</script>


<style scoped>
</style>

