<template>
  <v-t-wrap-detail :title="title">
    <template #body>
      <div>DetailJs.......</div>
      <v-t-card-code :code="code" />
    </template>
  </v-t-wrap-detail>
</template>

<script>
import VTCardCode from "@/components/VTCardCode";
import VTWrapDetail from "@/components/VTWrapDetail";

export default {
  name: "DetailJs",
  components: {
    VTCardCode,
    VTWrapDetail,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      code: `function findSequence(goal) {
  function find(start, history) {
    if (start == goal)
      return history;
    else if (start > goal)
      return null;
    else
      return find(start + 5, "(" + history + " + 5)") ||
             find(start * 3, "(" + history + " * 3)");
  }
  return find(1, "1");
}`,
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.detail-js-wrap {
}
</style>
