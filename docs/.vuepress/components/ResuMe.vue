<template>
  <section>
    <header>
      <section>
        <vp-button>按钮</vp-button>
        <vp-button @click="xxx" type="primary">按钮</vp-button>
        <vp-button @click="xxx" type="warning">按钮</vp-button>
        <vp-button @click="xxx" type="info">按钮</vp-button>
        <vp-button @click="xxx" type="danger">按钮</vp-button>
        <vp-button @click="xxx" type="success">按钮</vp-button>
      </section>
      <section>
        <vp-button size="large" type="success">size大小</vp-button>
        <vp-button @click="xxx" type="primary">size大小</vp-button>
        <vp-button size="mini" @click="xxx" type="warning">size大小</vp-button>
        <vp-button size="small" @click="xxx" type="info">size大小</vp-button>
        <vp-button size="large" @click="xxx" type="primary" icon="search">search</vp-button>
      </section>
      <section>
        <vp-input v-model="value" @onChange="xxx"></vp-input>
      </section>
      <section>
      </section>
    </header>
    <div>中</div>
    <footer>尾部</footer>
  </section>
</template>

<script>
import VpButton from "./VpButton";
import VpInput from "./VpInput";
export default {
  components: {
    VpButton,
    VpInput,
  },
  data() {
    return {
      value: "",
    };
  },
  methods: {
    xxx() {
      console.log(this.value);
    },
  },
};
</script>

<style scoped>
section {
  /* border: 1px solid #000; */
  width: 1000px;
  height: 100px;
}
</style>