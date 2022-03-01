<template>
  <div class="flex-start-h vt-item-wrap">
    <div class="flex-start-h vt-item-label">{{ label }}：</div>
    <!-- 文字展示 -->
    <div v-if="type === 'text'" class="flex-start-h text-select vt-item-text">
      <slot name="text"></slot>
    </div>
    <!-- 自定义 -->
    <div v-if="type === 'custom'" class="vt-item-custom">
      <slot name="custom"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "VTItem",
  components: {},
  props: {
    label: { type: String, default: "" },
    type: { type: String, default: "" }, //  'custom' - 自定义
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.vt-item-wrap {
  margin-bottom: var(--margin-base);

  .vt-item-label {
    margin-right: var(--margin-base);
    font-weight: 500;
    font-size: var(--font-size-xs);
    align-items: flex-start;
  }

  .vt-item-text {
    color: var(--color-text-primary);
    font-size: var(--font-size-xs);
    align-items: center;
    white-space: pre-wrap;
  }

  .vt-item-custom {
  }
}
</style>
