<template>
  <div class="container-wrap">
    <!-- <div>{{ objPageDetailInfo?.type || strPageType }}</div> -->
    <!-- <div>{{ objPageDetailInfo?.title }}</div> -->
    <!-- <div>{{ JSON.stringify(objPageBlockList) }}</div> -->
    <!-- 卡片页面 -->
    <page-content
      v-if="!objPageDetailInfo?.type"
      :arrPageBlockList="objPageBlockList[strPageType]"
      @onCardBlockClick="handleCardBlockClick"
    />
    <!-- 详情页面 -->
    <component
      v-else
      :is="objPageDetailInfo?.type"
      :title="objPageDetailInfo?.title"
      @onDetailBackClick="handleDetailBackClick"
    />
  </div>
</template>

<script>
import { objPageBlockListTemp } from "@/config/pageBlockList";
import DetailCity from "@/views/DetailCity";
import DetailCss from "@/views/DetailCss";
import DetailEmpty from "@/views/DetailEmpty";
import DetailJs from "@/views/DetailJs";
import DetailQwRobot from "@/views/DetailQwRobot";
import DetailTime from "@/views/DetailTime";
import PageContent from "@/views/PageContent";

export default {
  name: "Container",
  components: {
    DetailCity,
    DetailCss,
    DetailEmpty,
    DetailJs,
    DetailQwRobot,
    DetailTime,
    PageContent,
  },
  props: {
    strPageType: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      objPageBlockList: objPageBlockListTemp,
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
