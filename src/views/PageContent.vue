<template>
  <div class="page-content-wrap">
    <v-t-card-block
      v-for="(item, index) in info.list"
      :key="index"
      :info="item"
      @onCardBlockClick="handleCardBlockClick"
    />
  </div>
</template>

<script>
import { navigateTo, navigateBack } from "@/kits";
import VTCardBlock from "@/components/VTCardBlock";

export default {
  name: "PageContent",
  components: {
    VTCardBlock,
  },
  props: {
    info: {
      type: Object,
      default: () => {
        return {};
      },
    },
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
      // console.log("handleCardBlockClick", info);
      const { pageName } = info || {};
      navigateTo(pageName);
    },
  },
};
</script>

<style lang="less" scoped>
.page-content-wrap {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(2rem, 1fr));
  grid-gap: var(--margin-base) var(--margin-base);
  gap: var(--margin-base) var(--margin-base);
}
</style>
