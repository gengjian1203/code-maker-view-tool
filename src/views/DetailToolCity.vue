<template>
  <v-t-wrap-detail :title="title">
    <template #body>
      <div @click="handleTestClick">city.......</div>
    </template>
  </v-t-wrap-detail>
</template>

<script>
import Api from "@/api";
import VTWrapDetail from "@/components/VTWrapDetail";

export default {
  name: "DetailCity",
  components: {
    VTWrapDetail,
  },
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
    async handleTestClick() {
      const res = await Api.tool.getProvinceFromCity({ address: "上海" });
      console.log("handleTestClick", res);
    },
  },
};
</script>

<style lang="less" scoped>
.detail-city-wrap {
}
</style>
