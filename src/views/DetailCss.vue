<template>
  <v-t-wrap-detail :title="title">
    <template #body>
      <div>DetailCss.......</div>
    </template>
  </v-t-wrap-detail>
</template>

<script>
import VTWrapDetail from "@/components/VTWrapDetail";

export default {
  name: "DetailCss",
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
  methods: {},
};
</script>

<style lang="less" scoped>
.detail-css-wrap {
}
</style>
