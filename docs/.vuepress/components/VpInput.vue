<template>
  <div class="vpInput">
    <input :type="type" class="inputstyle" :placeholder="placeholder" @input="onChange($event)" />
  </div>
</template>

<script>
export default {
  name: "vpInput",
  props: {
    type: {
      default: "text",
      type: String,
    },
    textName: {
      default: "",
      type: String,
    },
    placeholder: {
      default: "请输入",
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {
    //监听输入框事件
    onChange: function ($event) {
      this.$emit("inputChanged", $event); //将值放在自定义的事件函数中作为参数
    },
  },
  computed: {},
};
</script>


<style scoped>
input:focus {
  outline: none;
  /* border: 1px solid #fff; */
}
.vpInput {
  width: 100%;
  height: 60px;
  font-size: 18px;
  text-indent: 10px;
  letter-spacing: 10px;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  /* border-bottom: 1px solid #eceef1; */
}
.leftText {
  color: #757575;
  white-space: nowrap;
}

.inputstyle {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
</style>

