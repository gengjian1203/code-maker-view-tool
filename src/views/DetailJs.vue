<template>
  <v-t-wrap-detail :title="info?.title">
    <template #body>
      <div class="flex-start-h detail-js-wrap">
        <!-- 代码 -->
        <div class="flex-start-v detail-js-code">
          <template v-for="(item, index) in content" :key="index">
            <v-t-card-module
              :index="`code-${index}`"
              :title="item?.title"
              :btnTipList="['copy', 'fold']"
              @onCardModuleCopyClick="handleCardModuleCopyClick(item)"
            >
              <template #body>
                <v-t-card-code :code="item?.code" :lang="item?.lang" />
              </template>
            </v-t-card-module>
          </template>
        </div>
      </div>
    </template>
  </v-t-wrap-detail>
</template>

<script>
import VTCardCode from "@/components/VTCardCode";
import VTCardModule from "@/components/VTCardModule";
import VTWrapDetail from "@/components/VTWrapDetail";
import { setClipboardData } from "@/kits";

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
      content: [],
    };
  },
  watch: {
    info: {
      handler(newValue) {
        // console.log("Watch info", newValue.pageName);
        try {
          const res = require(`@/config/code/${newValue.pageName}.js`);
          if (res) {
            console.log("Watch info", res.content);
            this.content = res.content;
            this.domPreview = `
              ${this.content
                .map((itemContent) => {
                  return itemContent.code;
                })
                .join("\n")}
            `;
          }
        } catch (e) {
          console.log("require file Error", e);
        }
      },
      immediate: true, // 为true，代表在声明这个方法之后，立即先去执行handler方法
      deep: true, // 为true，表示深度监听
    },
  },
  methods: {
    // 点击复制代码
    handleCardModuleCopyClick(item) {
      // console.log("handleCardModuleCopyClick", item);
      setClipboardData(item?.code);
    },
  },
};
</script>

<style lang="less" scoped>
.detail-js-wrap {
  .detail-js-code {
    // margin-right: var(--margin-xs);
    // overflow: auto;
    flex: 1 1 auto;
    width: 0;
    height: 100%;
  }
}
</style>
