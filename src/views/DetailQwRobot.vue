<template>
  <v-t-wrap-detail :title="title">
    <template #body>
      <div>DetailQwRobot.......</div>
    </template>
  </v-t-wrap-detail>
</template>

<script>
import VTWrapDetail from "@/components/VTWrapDetail";

export default {
  name: "DetailQwRobot",
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
.detail-qw-robot-wrap {
}
</style>
