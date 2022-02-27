<template>
  <v-t-wrap-detail :title="title">
    <template #body>
      <div>empty.......</div>
    </template>
  </v-t-wrap-detail>
</template>

<script>
import VTWrapDetail from "@/components/VTWrapDetail";

export default {
  name: "DetailEmpty",
  components: {
    VTWrapDetail,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.detail-empty-wrap {
}
</style>
