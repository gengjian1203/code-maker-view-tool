<template>
  <el-card
    shadow="hover"
    class="flex-center-v text-noselect vt-block-wrap"
    @click="handleCardBlockClick"
  >
    <div class="flex-center-h vt-block-title">{{ info?.title }}</div>
    <div :class="`flex-center-h iconfont ${info?.icon} vt-block-icon`"></div>
    <div class="flex-center-h text-center vt-block-desc">{{ info?.desc }}</div>
  </el-card>
</template>

<script>
export default {
  name: "VTCardBlock",
  components: {},
  props: {
    info: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  watch: {},
  methods: {
    handleCardBlockClick() {
      this.$emit("onCardBlockClick", this.info);
    },
  },
};
</script>

<style lang="less" scoped>
.vt-block-wrap {
  box-sizing: border-box;
  height: 2rem;

  .vt-block-title {
    // margin-top: var(--margin-base);
    font-size: var(--font-size-sm);
    font-weight: 500;
    color: var(--color-gray-2);
  }

  .vt-block-icon {
    margin-top: var(--margin-base);
    font-size: var(--font-size-hd);
    color: var(--color-gray-3);
  }

  .vt-block-desc {
    margin-top: var(--margin-base);
    font-size: var(--font-size-xs);
    color: var(--color-gray-4);
    white-space: pre-wrap;
  }
}
</style>
