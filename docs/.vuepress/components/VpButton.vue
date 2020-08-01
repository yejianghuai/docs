<template>
  <button
    :class="[
      'vp-button',
      `vp-button-${type}`,
      `vp-button-${size}`,
      { 'vp-button-plain': plain, 'vp-button-disabled': disabled },
      `vp-button-${shape}`,
    ]"
    :disabled="disabled"
    @click="clickHandler"
  >
    <i v-if="icon" :class="[ `icon iconfont vp-icon-${icon}`]"></i>
    <slot></slot>
  </button>
</template>
<script>
const Constant = {
  typeMap: {
    default: "default",
    primary: "primary",
    success: "success",
    warning: "warning",
    warning: "info",
    danger: "danger",
  },
  buttonSizeMap: {
    large: "large",
    normal: "normal",
    small: "small",
    mini: "mini",
  },
  shapeMap: {
    default: "default",
    round: "round",
    circle: "circle",
  },
};
export default {
  name: "VpButton",
  props: {
    type: {
      // 类型
      default: Constant.typeMap.default,
      type: String,
    },
    size: {
      // 大小
      default: Constant.buttonSizeMap.normal,
      type: String,
    },
    plain: {
      // 是否为浅色
      default: false,
      type: Boolean,
    },
    icon: String, // 图标
    loading: {
      // 是否为载入状态
      default: false,
      type: Boolean,
    },
    shape: {
      // 形状
      default: Constant.shapeMap.default,
      type: String,
    },
    disabled: Boolean,
  },
  methods: {
    clickHandler(event) {
      this.$emit("click", event);
    },
  },
};
</script>
<style lang="css" scoped>
@import "../css/common.css";
@import "../css/tool.css";
.icon{
  margin-right: 4px;
  margin-left: -4px;
}
/* 额外的基础变量 */
.vp-button {
  /* width :100px */
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.vp-button-info {
  color: #fff;
  background-color: #909399;
  border-color: #909399;
}
.vp-button-primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.vp-button-success {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
}
.vp-button-warning {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
}
.vp-button-danger {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}
.vp-button-large {
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.vp-button-mini {
  padding: 9px 15px;
  font-size: 12px;
  border-radius: 3px;
}
.vp-button-small {
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 3px;
}
</style>
