<template>
  <div class="container-wrap">
    <!-- <div>{{ objPageDetailInfo?.type || strPageType }}</div> -->
    <!-- <div>{{ objPageDetailInfo?.title }}</div> -->
    <component
      :is="objPageDetailInfo?.type || strPageType"
      :title="objPageDetailInfo?.title"
      @onDetailBackClick="handleDetailBackClick"
      @onCardBlockClick="handleCardBlockClick"
    />
  </div>
</template>

<script>
import DetailEmpty from "@/views/DetailEmpty";
import DetailTime from "@/views/DetailTime";
import PageTool from "@/views/PageTool";

export default {
  name: "Container",
  components: { DetailEmpty, DetailTime, PageTool },
  props: {
    strPageType: {
      type: String,
      default: "PageEmpty",
    },
  },
  data() {
    return {
      objPageDetailInfo: {},
    };
  },
  watch: {
    strPageType: {
      handler() {
        this.objPageDetailInfo = {};
      },
      immediate: true,
    },
  },
  methods: {
    // 点击返回
    handleDetailBackClick() {
      console.log("handleDetailBackClick");
      this.objPageDetailInfo = {};
    },
    // 点击卡片
    handleCardBlockClick(info) {
      console.log("handleCardBlockClick", info);
      this.objPageDetailInfo = info;
    },
  },
};
</script>

<style lang="less" scoped>
.container-wrap {
  width: 100%;
  height: 100%;
}
</style>
