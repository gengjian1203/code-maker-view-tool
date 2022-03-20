<template>
  <v-t-wrap-detail :title="info?.title">
    <template #body>
      <v-t-card-module title="CSS代码" :btnTipList="['copy', 'fold']">
        <template #body>
          <div class="flex-start-h detail-css-wrap">
            <div class="detail-css-block">
              <v-t-card-code :code="code" />
            </div>
            <div class="detail-css-block">
              <div id="preview" />
            </div>
          </div>
        </template>
      </v-t-card-module>
    </template>
  </v-t-wrap-detail>
</template>

<script>
import VTCardCode from "@/components/VTCardCode";
import VTCardModule from "@/components/VTCardModule";
import VTWrapDetail from "@/components/VTWrapDetail";

export default {
  name: "DetailCss",
  components: {
    VTCardCode,
    VTCardModule,
    VTWrapDetail,
  },
  props: {
    info: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      code: `
function findSequence(goal) {
  function find(start, history) {
    if (start == goal)
      return history;
    else if (start > goal)
      return null;
    else
      return find(start + 5, "(" + history + " + 5)") || find(start * 3, "(" + history + " * 3)");
  }
  return find(1, "1");
}`,
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.detail-css-wrap {
  .detail-css-block {
    overflow: auto;
    flex: 1 1 auto;
    width: 0;
  }
}
</style>
