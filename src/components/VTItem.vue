<template>
  <div class="flex-start-h vt-item-wrap">
    <div class="vt-item-label">
      {{ label }}
    </div>
    <!-- 自定义 -->
    <div v-if="type === 'custom'" class="vt-item-body">
      <slot name="body"></slot>
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
  .vt-item-label {
    margin-right: var(--margin-base);
  }

  .vt-item-body {
  }
}
</style>
