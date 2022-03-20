<template>
  <v-t-wrap-detail :title="info?.title">
    <template #body>
      <div class="flex-start-h detail-css-wrap">
        <!-- 代码 -->
        <div class="flex-start-v detail-css-code">
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
        <!-- 预览 -->
        <div
          class="flex-center-v detail-css-preview"
          id="_detail-css-preview"
        />
      </div>
      <div class="hidden-far">
        {{ renderDomPreview }}
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
      content: [],
      // 渲染右侧预览模块使用
      isPageReady: false,
      domPreview: "",
    };
  },
  watch: {
    info: {
      handler(newValue) {
        // console.log("Watch info", newValue.pageName);
        try {
          const res = require(`@/config/code/${newValue.pageName}.js`);
          if (res) {
            // console.log("Watch info", res.content);
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
  computed: {
    renderDomPreview() {
      // console.log("renderDomPreview", this.isPageReady, this.domPreview);
      // 页面加载完毕 且 有需要渲染的dom信息
      if (this.isPageReady && this.domPreview) {
        const domDetailCssPreview = document.getElementById(
          "_detail-css-preview"
        );
        domDetailCssPreview.insertAdjacentHTML("beforeend", this.domPreview);
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    // 点击复制代码
    handleCardModuleCopyClick(item) {
      // console.log("handleCardModuleCopyClick", item);
      setClipboardData(item?.code);
    },
  },
  mounted() {
    this.isPageReady = true;
  },
};
</script>

<style lang="less" scoped>
.detail-css-wrap {
  .detail-css-code {
    margin-right: var(--margin-xs);
    // overflow: auto;
    flex: 1 1 auto;
    width: 0;
    height: 100%;
  }
  .detail-css-preview {
    align-items: center;
    // overflow: auto;
    flex: 1 1 auto;
    width: 0;
    height: 100%;
  }
}
</style>
