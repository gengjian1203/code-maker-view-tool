<template>
  <div class="flex-start-h page-content-wrap">
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
      console.log("handleCardBlockClick", info);
      // this.$emit("onCardBlockClick", info);
      const { pageName } = info || {};
      navigateTo(pageName);
    },
  },
};
</script>

<style lang="less" scoped>
.page-content-wrap {
  flex-wrap: wrap;
}
</style>
