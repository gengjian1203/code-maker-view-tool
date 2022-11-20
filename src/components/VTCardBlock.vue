<template>
  <el-card shadow="hover" class="flex-center-v text-noselect vt-block-wrap" :body-style="{
    padding: 0,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }" @click="handleCardBlockClick">
    <div class="flex2 flex-center-v vt-block-up">
      <div class="flex-center-h vt-block-title">{{ info?.title }}</div>
      <div :class="`flex-center-h iconfont ${info?.icon} vt-block-icon`"></div>
    </div>
    <div class="flex1 flex-center-v vt-block-down">
      <div class="flex-center-h text-center vt-block-desc">{{ info?.desc }}</div>
    </div>
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

.vt-block-wrap:hover .vt-block-up .vt-block-icon {
  transform: scale(1.5);
}

.vt-block-wrap {
  box-sizing: border-box;
  height: 200px;

  .vt-block-up {
    box-sizing: border-box;
    height: 0;
    padding: var(--padding-base);
  }

  .vt-block-down {
    box-sizing: border-box;
    height: 0;
    padding: var(--padding-base);
    background-color: var(--color-primary);
  }

  .vt-block-title {
    // margin-top: var(--margin-base);
    font-size: var(--font-size-sm);
    font-weight: 500;
    color: var(--color-gray-2);
  }

  .vt-block-icon {
    margin-top: var(--margin-xs);
    font-size: var(--font-size-hd);
    color: var(--color-gray-3);
    transition: all 0.2s linear;
  }

  .vt-block-desc {
    font-size: var(--font-size-normal);
    color: var(--color-white);
    white-space: pre-wrap;
  }
}
</style>
