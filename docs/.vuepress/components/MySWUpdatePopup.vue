<template>
  <SWUpdatePopup v-slot="{ enabled, reload, message, buttonText }">
    <div v-if="enabled" class="my-sw-update-popup">
      {{ message }}
      <br />
      <vp-button @click="reload" size="small" type="warning">{{ buttonText }}</vp-button>
    </div>
  </SWUpdatePopup>
</template>

<script>
import SWUpdatePopup from "@vuepress/plugin-pwa/lib/SWUpdatePopup.vue";
import VpButton from "./VpButton";
export default {
  components: { SWUpdatePopup, VpButton },
};
</script>

<style>
.my-sw-update-popup {
  /* text-align: right;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #fff;
  font-size: 20px;
  padding: 20px;
  border: 5px solid #e6a23c; */
  display: flex;
  width: 330px;
  padding: 14px 26px 14px 13px;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  position: fixed;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s, transform 0.3s, left 0.3s, right 0.3s, top 0.4s,
    bottom 0.3s;
  overflow: hidden;
}

.my-sw-update-popup button {
  border: 1px solid #fefefe;
  border-radius: 4px;
}
</style>