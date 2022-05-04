<template>
  <v-t-wrap-detail :title="info?.title">
    <template #body>
      <v-t-card-module title="生成信息" :btnTipList="['fold']">
        <template #body>
          <v-t-item label="二维码信息" type="custom">
            <template #custom>
              <div class="flex-between-h detail-tool-qrcode-encode-item">
                <el-input
                  class="detail-tool-qrcode-encode-item-content"
                  type="textarea"
                  v-model="strQrcodeEncodeContent"
                  placeholder="请输入待生成二维码的信息"
                />
              </div>
            </template>
          </v-t-item>

          <!-- 上传图片 -->
          <v-t-item
            label="二维码Logo"
            type="upload"
            @onUploadFileChange="handleQrcodeEncodeLogoChange"
          />

          <v-t-item label="Logo base64编码" type="custom">
            <template #custom>
              <div class="flex-between-h detail-tool-qrcode-encode-item">
                <el-input
                  class="detail-tool-qrcode-encode-item-content"
                  type="textarea"
                  v-model="strQrcodeEncodeLogoBase64Source"
                  placeholder="logo内容的base64编码"
                />
                <el-button
                  type="primary"
                  @click="handleQrcodeEncodeLogoBase64SourceCopyClick"
                >
                  复制
                </el-button>
              </div>
            </template>
          </v-t-item>

          <el-button
            type="primary"
            @click="handleDetailToolQRCodeEncodeBtnClick"
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
          <v-t-item label="二维码预览" type="custom">
            <template #custom>
              <div class="flex-between-h detail-tool-qrcode-encode-item">
                <v-t-canvas-draw
                  canvasId="qrCodeLogo"
                  :canvasWidth="CANVAS_SIZE"
                  :canvasHeight="CANVAS_SIZE"
                  canvasBGColor="#ffffff"
                  canvasQuality="0.92"
                  canvasScale="1"
                  :canvasConfig="qrCodeCanvasConfig"
                  @onCanvasDrawComplete="handleCanvasDrawComplete"
                />
                <el-button
                  v-show="!!strQRCodeFinishBase64"
                  type="primary"
                  @click="handleQRCodeFinishBase64DownloadClick"
                >
                  下载
                </el-button>
              </div>
            </template>
          </v-t-item>

          <v-t-item label="二维码 base64编码" type="custom">
            <template #custom>
              <div class="flex-between-h detail-tool-qrcode-encode-item">
                <el-input
                  class="detail-tool-qrcode-encode-item-content"
                  type="textarea"
                  v-model="strQRCodeFinishBase64"
                  placeholder="二维码内容的base64编码"
                />
                <el-button type="primary" @click="handleQRCodeFinishCopyClick">
                  复制
                </el-button>
              </div>
            </template>
          </v-t-item>
        </template>
      </v-t-card-module>
    </template>
  </v-t-wrap-detail>
</template>

<script>
import tcQrcode from "tc-qrcode";
import Api from "@/api";
import { ElMessage } from "element-plus";
import VTCanvasDraw from "@/components/VTCanvasDraw";
import VTCardModule from "@/components/VTCardModule";
import VTItem from "@/components/VTItem";
import VTWrapDetail from "@/components/VTWrapDetail";
import { downloadFile, file2Base64, setClipboardData } from "@/kits/index";

export default {
  name: "DetailToolQRCodeEncode",
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
      // 绘制用常量
      QRCODE_SIZE: 236,
      QRCODE_PADDING: 32,
      QRCODE_BORDER_RADIUS: 10,
      LOGO_SIZE: 72,
      CANVAS_SIZE: 300,
      //
      strQrcodeEncodeContent: "", // 二维码存储信息
      strQrcodeEncodeLogoBase64Source: "", // 二维码Logo Base64
      //
      isShowCanvas: false, // 是否生成二维码
      qrCodeCanvasConfig: [], // 绘制二维码元素
      strQRCodeFinishBase64: "",
    };
  },
  methods: {
    // 点击复制logo Base64按钮
    handleQrcodeEncodeLogoBase64SourceCopyClick() {
      setClipboardData(this.strQrcodeEncodeLogoBase64Source);
    },
    // 点击生成按钮
    handleDetailToolQRCodeEncodeBtnClick() {
      const base64 = tcQrcode.encodeAsBase64({
        text: this.strQrcodeEncodeContent,
        width: this.QRCODE_SIZE, // 默认值 256
        height: this.QRCODE_SIZE, // 默认值 256
        typeNumber: 4, // 默认值 4
        colorDark: "#000000", // 默认值 '#000000'
        colorLight: "#ffffff", // 默认值 '#ffffff'
        correctLevel: 2, // 默认值 2
      });
      console.log("handleDetailToolQRCodeEncodeBtnClick", base64);

      const qrCodeCanvasConfigTmp = [
        {
          type: "rectArc",
          color: "#ffffff",
          lineColor: "#e0e0e0",
          lineWidth: 2,
          x: (this.CANVAS_SIZE - this.QRCODE_SIZE - this.QRCODE_PADDING) / 2,
          y: (this.CANVAS_SIZE - this.QRCODE_SIZE - this.QRCODE_PADDING) / 2,
          width: this.QRCODE_SIZE + this.QRCODE_PADDING,
          height: this.QRCODE_SIZE + this.QRCODE_PADDING,
          radius: this.QRCODE_BORDER_RADIUS,
        },
        {
          type: "image",
          src: base64,
          x: (this.CANVAS_SIZE - this.QRCODE_SIZE) / 2,
          y: (this.CANVAS_SIZE - this.QRCODE_SIZE) / 2,
          width: this.QRCODE_SIZE,
          height: this.QRCODE_SIZE,
        },
      ];
      if (this.strQrcodeEncodeLogoBase64Source) {
        qrCodeCanvasConfigTmp.push({
          type: "image",
          src: this.strQrcodeEncodeLogoBase64Source,
          x: (this.CANVAS_SIZE - this.LOGO_SIZE) / 2,
          y: (this.CANVAS_SIZE - this.LOGO_SIZE) / 2,
          width: this.LOGO_SIZE,
          height: this.LOGO_SIZE,
        });
      }

      this.isShowCanvas = true;
      this.qrCodeCanvasConfig = qrCodeCanvasConfigTmp;
    },
    // 上传图片
    async handleQrcodeEncodeLogoChange(file, fileList) {
      console.log(
        "DetailToolQRCodeEncode handleQrcodeEncodeLogoChange",
        file?.raw
      );
      const image = file?.raw;
      if (image) {
        this.strQrcodeEncodeLogoBase64Source = await file2Base64(image);
        // this.objQrcodeEncodeLogoSource = image;
      } else {
        this.strQrcodeEncodeLogoBase64Source = "";
        // this.objQrcodeEncodeLogoSource = null;
      }
    },
    // 二维码生成完毕回调
    handleCanvasDrawComplete(base64) {
      console.log("handleCanvasDrawComplete", base64);
      this.strQRCodeFinishBase64 = base64;
    },
    // 下载生成好的二维码
    handleQRCodeFinishBase64DownloadClick() {
      console.log("handleQRCodeFinishBase64DownloadClick");
      downloadFile(
        `qrcode_${new Date().getTime()}`,
        this.strQRCodeFinishBase64
      );
    },
    // 复制生成好的二维码Base64
    handleQRCodeFinishCopyClick() {
      console.log("handleQRCodeFinishCopyClick");
      setClipboardData(this.strQRCodeFinishBase64);
    },
  },
};
</script>

<style lang="less" scoped>
.detail-tool-qrcode-encode-item {
  width: 100%;
}

.detail-tool-qrcode-encode-item-content {
  width: 100%;
}

.detail-tool-qrcode-encode-item-content + .el-button {
  margin-left: var(--margin-xs);
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
