<template>
  <div class="flex-start-h page-content-wrap">
    <v-t-card-block
      v-for="(item, index) in arrPageBlockList"
      :key="index"
      :info="item"
      @onCardBlockClick="handleCardBlockClick"
    />
  </div>
</template>

<script>
import VTCardBlock from "@/components/VTCardBlock";

export default {
  name: "PageContent",
  components: {
    VTCardBlock,
  },
  props: {
    arrPageBlockList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    // 点击卡片
    handleCardBlockClick(info) {
      this.$emit("onCardBlockClick", info);
    },
  },
};
</script>

<style lang="less" scoped>
.page-content-wrap {
  flex-wrap: wrap;
}
</style>
