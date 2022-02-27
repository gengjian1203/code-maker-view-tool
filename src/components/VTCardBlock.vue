<template>
  <el-card
    shadow="hover"
    class="flex-center-v text-noselect vt-block-wrap"
    @click="handleCardBlockClick"
  >
    <div class="flex-center-h vt-block-title">{{ info?.title }}</div>
    <div :class="`flex-center-h iconfont ${info?.icon} vt-block-icon`"></div>
    <div class="flex-center-h vt-block-desc">{{ info?.desc }}</div>
  </el-card>
</template>

<script>
export default {
  name: "VTCardModule",
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
  flex: 0 0 auto;
  width: 160px;
  height: 160px;
  margin: var(--margin-base);
  align-items: center;

  .vt-block-title {
    font-size: var(--font-size-normal);
    font-weight: 500;
  }

  .vt-block-icon {
    margin-top: var(--margin-mini);
    font-size: var(--font-size-md);
  }

  .vt-block-desc {
    margin-top: var(--margin-mini);
    font-size: var(--font-size-mini);
    color: var(--color-gray-4);
  }
}
</style>
