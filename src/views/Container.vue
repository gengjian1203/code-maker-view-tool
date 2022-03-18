<template>
  <div class="container-wrap">
    <!-- <div>{{ objPageDetailInfo?.type || nPageIndex }}</div> -->
    <!-- <div>{{ objPageDetailInfo?.title }}</div> -->
    <!-- <div>{{ JSON.stringify(arrMenuList) }}</div> -->
    <!-- 卡片页面 -->
    <page-content
      v-if="!objPageDetailInfo?.type"
      :arrPageBlockList="arrMenuList[nPageIndex].list"
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
import { arrMenuListTemp } from "@/config/menuList";
import DetailCss from "@/views/DetailCss";
import DetailEmpty from "@/views/DetailEmpty";
import DetailJs from "@/views/DetailJs";
import DetailQwRobot from "@/views/DetailQwRobot";
import DetailToolCity from "@/views/DetailToolCity";
import DetailToolTime from "@/views/DetailToolTime";
import PageContent from "@/views/PageContent";

export default {
  name: "Container",
  components: {
    DetailCss,
    DetailEmpty,
    DetailJs,
    DetailQwRobot,
    DetailToolCity,
    DetailToolTime,
    PageContent,
  },
  props: {
    nPageIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      arrMenuList: arrMenuListTemp,
      objPageDetailInfo: {},
    };
  },
  watch: {
    nPageIndex: {
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
