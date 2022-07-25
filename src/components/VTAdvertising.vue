<template>
  <div class="vt-advertising-wrap">
    <span class="vt-advertising-text">诚招优质广告</span>
  </div>
</template>

<script>
export default {
  name: "VTAdvertising",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  methods: {},
};
</script>

<style lang="less" scoped>
.vt-advertising-wrap {
  margin-bottom: 4px;
  box-sizing: border-box;
  height: 80px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  border-radius: 4px;
  background-color: #5a9cf8;
  // border: 1px solid steelblue;
  color: #ffffff;
}

.vt-advertising-text {
  color: #cce7f8;
  font-size: 1.6rem;
  // font-family: "Pacifico", cursive;
  text-transform: uppercase;
  animation: shining 0.1s alternate infinite;
}

@keyframes shining {
  from {
    text-shadow: 0 0 6px rgba(182, 211, 207, 0.9),
      0 0 30px rgba(182, 211, 207, 0.3), 0 0 12px rgba(15, 115, 223, 0.5),
      0 0 21px rgba(15, 115, 223, 0.9), 0 0 34px rgba(15, 115, 223, 0.8),
      0 0 54px rgba(15, 115, 223, 0.9);
  }
  to {
    text-shadow: 0 0 6px rgba(182, 211, 207, 1),
      0 0 30px rgba(182, 211, 207, 0.4), 0 0 12px rgba(15, 115, 223, 0.6),
      0 0 22px rgba(15, 115, 223, 0.8), 0 0 38px rgba(15, 115, 223, 0.9),
      0 0 60px rgba(15, 115, 223, 1);
  }
}
</style>
