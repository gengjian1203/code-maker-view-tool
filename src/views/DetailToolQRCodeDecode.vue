<template>
  <v-t-wrap-detail :title="info?.title">
    <template #body>
      <v-t-card-module title="二维码" :btnTipList="['fold']">
        <template #body>
          <!-- 上传图片 -->
          <v-t-item
            label="二维码"
            type="upload"
            @onUploadFileChange="handleQrcodeDecodeChange"
          />

          <v-t-item label="Base64编码" type="custom">
            <template #custom>
              <div class="flex-between-h detail-tool-qrcode-decode-item">
                <el-input
                  class="detail-tool-qrcode-decode-item-content"
                  type="textarea"
                  v-model="strQrcodeDecodeBase64Source"
                  placeholder="二维码base64编码"
                />
                <el-button
                  type="primary"
                  @click="handleQrcodeEncodeBase64SourceCopyClick"
                >
                  复制
                </el-button>
              </div>
            </template>
          </v-t-item>

          <el-button
            type="primary"
            :loading="isDetailToolQRCodeDecodeBtnLoading"
            @click="handleDetailToolQRCodeDecodeBtnClick"
            >解码</el-button
          >
        </template>
      </v-t-card-module>

      <v-t-card-module
        v-show="strQrcodeDecodeContent"
        title="解析结果"
        :btnTipList="['fold']"
      >
        <template #body>
          <v-t-item label="二维码内容" type="custom">
            <template #custom>
              <div class="flex-between-h detail-tool-qrcode-decode-item">
                <el-input
                  class="detail-tool-qrcode-decode-item-content"
                  type="textarea"
                  v-model="strQrcodeDecodeContent"
                  placeholder="二维码内容"
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
import AutoStatusLoading from "@/decorator/AutoStatusLoading";
import { downloadFile, file2Base64, setClipboardData } from "@/kits/index";

export default {
  name: "DetailToolQRCodeDecode",
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
      //
      strQrcodeDecodeBase64Source: "", // 二维码Base64
      isDetailToolQRCodeDecodeBtnLoading: false, // 解码按钮状态
      strQrcodeDecodeContent: "", // 二维码存储信息
    };
  },
  methods: {
    // 点击复制二维码的Base64按钮
    handleQrcodeEncodeBase64SourceCopyClick() {
      setClipboardData(this.strQrcodeDecodeBase64Source);
    },
    // 点击解码按钮
    @AutoStatusLoading("isDetailToolQRCodeDecodeBtnLoading")
    async handleDetailToolQRCodeDecodeBtnClick() {
      if (this.strQrcodeDecodeBase64Source) {
        const res = await tcQrcode.decodeFromBase64(
          this.strQrcodeDecodeBase64Source
        );
        console.log("handleDetailToolQRCodeDecodeBtnClick", res);
        this.strQrcodeDecodeContent = res;
      }
    },
    // 上传图片
    async handleQrcodeDecodeChange(file, fileList) {
      console.log("DetailToolQRCodeDecode handleQrcodeDecodeChange", file?.raw);
      const image = file?.raw;
      if (image) {
        this.strQrcodeDecodeBase64Source = await file2Base64(image);
        // this.objQrcodeDecodeSource = image;
      } else {
        this.strQrcodeDecodeBase64Source = "";
        // this.objQrcodeDecodeSource = null;
      }
    },
    // 复制生成好的二维码内容
    handleQRCodeFinishCopyClick() {
      console.log("handleQRCodeFinishCopyClick");
      setClipboardData(this.strQrcodeDecodeContent);
    },
  },
};
</script>

<style lang="less" scoped>
.detail-tool-qrcode-decode-item {
  width: 100%;
}

.detail-tool-qrcode-decode-item-content {
  width: 100%;
}

.detail-tool-qrcode-decode-item-content + .el-button {
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
