<template>
  <v-t-wrap-detail :title="info?.title">
    <template #body>
      <v-t-card-module title="JS代码" :btnTipList="['copy', 'fold']">
        <template #body>
          <div class="flex-start-h detail-js-wrap">
            <div class="detail-js-block">
              <v-t-card-code :code="code" />
            </div>
            <!-- <div class="detail-css-block">
              <div id="preview" />
            </div> -->
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
  name: "DetailJs",
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
  .detail-js-block {
    overflow: auto;
    flex: 1 1 auto;
    width: 0;
  }
}
</style>
