<template>
  <div class="flex-start-h page-tool-wrap">
    <v-t-card-block
      v-for="(item, index) in arrPageToolBlockList"
      :key="index"
      :info="item"
      @onCardBlockClick="handleCardBlockClick"
    />
  </div>
</template>

<script>
import VTCardBlock from "@/components/VTCardBlock";
import { arrPageToolBlockListTemp } from "@/config/pageBlockList";

export default {
  name: "PageTool",
  components: {
    VTCardBlock,
  },
  props: {},
  data() {
    return {
      arrPageToolBlockList: arrPageToolBlockListTemp,
    };
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
.page-tool-wrap {
  flex-wrap: wrap;
}
</style>
