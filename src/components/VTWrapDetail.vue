<template>
  <div class="vt-wrap-detail-wrap">
    <!-- 头部 -->
    <div class="flex-between-h vt-wrap-detail-header">
      <div class="vt-wrap-detail-header-left">
        <el-button size="default" @click="handleBackClick">
          <span class="iconfont icon-left" />
          返回
        </el-button>
      </div>
      <div class="vt-wrap-detail-header-right">
        {{ title }}
      </div>
    </div>
    <!-- 身体 -->
    <slot name="body"></slot>
  </div>
</template>

<script>
export default {
  name: "VTWrapDetail",
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    handleBackClick() {
      console.log("handleBackClick");
      this.$emit("onDetailBackClick");
    },
  },
};
</script>

<style lang="less" scoped>
.vt-wrap-detail-wrap {
  .vt-wrap-detail-header {
    margin-bottom: var(--margin-base);
    width: 100%;
    height: 36px;
  }
}
</style>
