<template>
  <v-t-wrap-detail :title="title">
    <template #body>
      <div>city.......</div>
    </template>
  </v-t-wrap-detail>
</template>

<script>
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
  methods: {},
};
</script>

<style lang="less" scoped>
.detail-city-wrap {
}
</style>
