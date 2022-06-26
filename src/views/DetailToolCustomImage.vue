<template>
  <v-t-wrap-detail :title="info?.title">
    <template #body>
      <v-t-card-module title="生成信息" :btnTipList="['fold']">
        <template #body>
          <v-t-item label="背景宽度" type="custom">
            <template #custom>
              <div class="flex-between-h detail-tool-custom-image-item">
                <el-input
                  class="detail-tool-custom-image-item-content"
                  type="text"
                  v-model="strWidth"
                  placeholder="宽度"
                />
              </div>
              <div class="detail-tool-custom-image-item-content-text">px</div>
            </template>
          </v-t-item>

          <v-t-item label="背景高度" type="custom">
            <template #custom>
              <div class="flex-between-h detail-tool-custom-image-item">
                <el-input
                  class="detail-tool-custom-image-item-content"
                  type="text"
                  v-model="strHeight"
                  placeholder="高度"
                />
                <div class="detail-tool-custom-image-item-content-text">px</div>
              </div>
            </template>
          </v-t-item>

          <v-t-item label="背景颜色" type="custom">
            <template #custom>
              <div class="flex-between-h detail-tool-custom-image-item">
                <el-color-picker v-model="colorImage" />
              </div>
            </template>
          </v-t-item>

          <v-t-item label="文字内容" type="custom">
            <template #custom>
              <div class="flex-between-h detail-tool-custom-image-item">
                <el-input
                  class="detail-tool-custom-image-item-content"
                  type="text"
                  v-model="strText"
                  placeholder="字文字内容"
                />
              </div>
            </template>
          </v-t-item>

          <v-t-item label="文字字号" type="custom">
            <template #custom>
              <div class="flex-between-h detail-tool-custom-image-item">
                <el-input
                  class="detail-tool-custom-image-item-content"
                  type="text"
                  v-model="strFontSize"
                  placeholder="字号"
                />
                <div class="detail-tool-custom-image-item-content-text">px</div>
              </div>
            </template>
          </v-t-item>

          <v-t-item label="文字颜色" type="custom">
            <template #custom>
              <div class="flex-between-h detail-tool-custom-image-item">
                <el-color-picker v-model="colorText" />
              </div>
            </template>
          </v-t-item>

          <el-button type="primary" @click="handleDetailToolBtnClick"
            >生成</el-button
          >
        </template>
      </v-t-card-module>

      <v-t-card-module
        v-show="isShowCanvas"
        title="生成结果"
        :btnTipList="['fold']"
      >
        <template #body>
          <v-t-item label="图片预览" type="custom">
            <template #custom>
              <div class="flex-between-h detail-tool-custom-image-item">
                <div class="scroll-h">
                  <v-t-canvas-draw
                    canvasId="customImage"
                    :canvasWidth="strWidthReal"
                    :canvasHeight="strHeightReal"
                    :canvasBGColor="colorImage"
                    canvasQuality="0.92"
                    canvasScale="1"
                    :canvasConfig="imageCanvasConfig"
                    @onCanvasDrawComplete="handleCanvasDrawComplete"
                  />
                </div>
                <div class="btn-download">
                  <el-button
                    v-show="!!strImageFinishBase64"
                    type="primary"
                    @click="handleImageFinishBase64DownloadClick"
                  >
                    下载
                  </el-button>
                </div>
              </div>
            </template>
          </v-t-item>
        </template>
      </v-t-card-module>
    </template>
  </v-t-wrap-detail>
</template>

<script>
import VTCanvasDraw from "@/components/VTCanvasDraw";
import VTCardModule from "@/components/VTCardModule";
import VTItem from "@/components/VTItem";
import VTWrapDetail from "@/components/VTWrapDetail";
import { downloadFile } from "@/kits/index";

export default {
  name: "DetailToolCustomImage",
  components: {
    VTCanvasDraw,
    VTCardModule,
    VTItem,
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
      // 生成图片字段
      strWidth: "400",
      strHeight: "300",
      strWidthReal: "400",
      strHeightReal: "300",
      colorImage: "#ff0000",
      strText: "写点神马吧",
      strFontSize: "18",
      colorText: "#00ffff",

      //
      isShowCanvas: false, // 是否生成二维码
      imageCanvasConfig: [], // 绘制二维码元素
      strImageFinishBase64: "",
    };
  },
  methods: {
    // 点击生成按钮
    handleDetailToolBtnClick() {
      const imageCanvasConfigTmp = [
        {
          type: "text",
          text: this.strText,
          textAlign: "center",
          textBaseline: "middle",
          color: this.colorText,
          size: parseFloat(this.strFontSize),
          x: parseFloat(this.strWidth) / 2,
          y: parseFloat(this.strHeight) / 2,
        },
      ];

      this.isShowCanvas = true;
      this.imageCanvasConfig = imageCanvasConfigTmp;
    },
    // 二维码生成完毕回调
    handleCanvasDrawComplete(base64) {
      console.log("handleCanvasDrawComplete", base64);
      this.strImageFinishBase64 = base64;
    },
    // 下载生成好的二维码
    handleImageFinishBase64DownloadClick() {
      console.log("handleImageFinishBase64DownloadClick");
      downloadFile(`image_${new Date().getTime()}`, this.strImageFinishBase64);
    },
  },
  watch: {
    strWidth: {
      handler(newValue) {
        this.strWidthReal = newValue;
      },
      // immediate: true, // 为true，代表在声明这个方法之后，立即先去执行handler方法
      // deep: true, // 为true，表示深度监听
    },
    strHeight: {
      handler(newValue) {
        this.strHeightReal = newValue;
      },
      // immediate: true, // 为true，代表在声明这个方法之后，立即先去执行handler方法
      // deep: true, // 为true，表示深度监听
    },
  },
};
</script>

<style lang="less" scoped>
.detail-tool-custom-image-item {
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

.detail-tool-custom-image-item-content {
  width: 100%;
}

.detail-tool-custom-image-item-content + .el-button {
  margin-left: var(--margin-xs);
}

.detail-tool-custom-image-item-content-text {
  font-size: var(--font-size-xs);
}

.scroll-h + .btn-download {
  margin-left: var(--margin-xs);
}

.scroll-h {
  flex: 1 1 auto;
  width: 0;
  overflow-x: scroll;
}

.btn-download {
  flex: 0 0 auto;
}

:deep(.el-upload) {
  width: 100%;

  .el-upload-dragger {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .icon-cloud-upload {
      margin-bottom: var(--margin-mini);
      font-size: var(--font-size-bg);
    }
  }
}
</style>
