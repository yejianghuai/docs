---
title: Typescipt Bug 指南
date: 2020-09-07
categories:
  - typescript
tags:
  - bug
---
<Boxx/>
#### Type 'Vue | Element | Vue[] | Element[]' is not assignable to type 'Element'. || Type 'Vue' is missing the following properties from type 'Element': assignedSlot, attributes, classList, className, and 123 more.Vetur(2322)

类型没有定义好，此时给值定个类型可以解决爆红的问题

```ts
export default class MidAutumn extends Vue {
  // defaultOptions = { animationData: animationData.default };
  // animationSpeed = 1;
  anim: any = {};
  mounted() {
    this.anim = lottie.loadAnimation({
      container: this.$refs.animation as HTMLElement, // 如果没有指定 this.$refs.animation 的类型，则container会爆红
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: dice4 //动画json
    });
  }
}
</script>
```
