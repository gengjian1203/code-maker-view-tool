<template>
  <v-t-wrap-detail :title="info?.title">
    <template #body>
      <v-t-card-module title="压缩前" :btnTipList="['fold']">
        <template #body>
          <!-- 上传图片 -->
          <v-t-item
            label="上传图片"
            type="upload"
            @onUploadFileChange="handleTinifyImageChange"
          />

          <v-t-item label="图片大小" type="text">
            <template #text>
              {{ strTinifyImageSizeSource }}
            </template>
          </v-t-item>

          <v-t-item label="图片base64编码" type="custom">
            <template #custom>
              <div class="flex-between-h detail-tool-tinify-image-item">
                <el-input
                  class="detail-tool-tinify-image-base64"
                  type="textarea"
                  v-model="strTinifyImageBase64Source"
                  placeholder="图片内容的base64编码"
                />
                <el-button
                  type="primary"
                  @click="handleTinifyImageBase64SourceCopyClick"
                >
                  复制
                </el-button>
              </div>
            </template>
          </v-t-item>

          <v-t-item label="" type="custom">
            <template #custom>
              <el-button
                type="primary"
                :loading="isTinifyImageCompressBtnLoading"
                @click="handleTinifyImageCompressBtnClick"
                >压缩图片</el-button
              >
            </template>
          </v-t-item>
        </template>
      </v-t-card-module>

      <v-t-card-module title="压缩后" :btnTipList="['fold']">
        <template #body>
          <v-t-item label="图片预览" type="custom">
            <template #custom>
              <div class="flex-between-h detail-tool-tinify-image-item">
                <el-image
                  class="detail-tool-tinify-image-preview"
                  v-show="!!strTinifyImageBase64Compress"
                  :src="strTinifyImageBase64Compress"
                  fit="contain"
                />
                <el-button
                  v-show="!!strTinifyImageBase64Compress"
                  type="primary"
                  @click="handleTinifyImageBase64CompressDownloadClick"
                >
                  下载
                </el-button>
              </div>
            </template>
          </v-t-item>

          <v-t-item label="图片大小" type="text">
            <template #text>
              {{ strTinifyImageSizeCompress }}
            </template>
          </v-t-item>

          <v-t-item label="图片base64编码" type="custom">
            <template #custom>
              <div class="flex-between-h detail-tool-tinify-image-item">
                <el-input
                  class="detail-tool-tinify-image-base64"
                  type="textarea"
                  v-model="strTinifyImageBase64Compress"
                  placeholder="图片内容的base64编码"
                />
                <el-button
                  type="primary"
                  @click="handleTinifyImageBase64CompressCopyClick"
                >
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
import Api from "@/api";
import VTCardModule from "@/components/VTCardModule";
import VTItem from "@/components/VTItem";
import VTWrapDetail from "@/components/VTWrapDetail";
import AutoStatusLoading from "@/decorator/AutoStatusLoading";
import {
  downloadFile,
  file2Base64,
  getStringDate,
  setClipboardData,
} from "@/kits/index";

export default {
  name: "DetailToolTinifyImage",
  components: {
    VTItem,
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
      // 压缩前
      strTinifyImageSizeSource: "",
      strTinifyImageBase64Source: "",
      objTinifyImageSource: null,
      isTinifyImageCompressBtnLoading: false,
      // 压缩后
      strTinifyImageSizeCompress: "",
      strTinifyImageBase64Compress: "",
    };
  },
  methods: {
    // 上传图片
    async handleTinifyImageChange(file, fileList) {
      console.log("DetailToolTinifyImage handleUploadImageChange", file?.raw);
      const image = file?.raw;
      if (image) {
        const size = image?.size; // image?.size - (image?.size / 8) * 2;
        this.strTinifyImageSizeSource =
          `${size}字节` +
          `(${(size / 1000).toFixed(2)}KB)` +
          `(${(size / 1000 / 1000).toFixed(2)}MB)`;
        this.strTinifyImageBase64Source = await file2Base64(image);
        this.objTinifyImageSource = image;
      } else {
        this.strTinifyImageSizeSource = "";
        this.strTinifyImageBase64Source = "";
        this.objTinifyImageSource = null;
      }
    },
    // 复制原图图片base64
    handleTinifyImageBase64SourceCopyClick() {
      console.log("handleTinifyImageBase64SourceCopyClick");
      setClipboardData(this.strTinifyImageBase64Source);
    },
    // 点击压缩图片
    @AutoStatusLoading("isTinifyImageCompressBtnLoading")
    async handleTinifyImageCompressBtnClick() {
      console.log("handleTinifyImageCompressBtnClick");

      const params = new FormData();
      params.append("image", this.objTinifyImageSource);

      const res = await Api.DetailTool.tinifyImage(params);
      console.log("handleTinifyImageCompressBtnClick", res);
      if (res?.body?.errcode === 0) {
        this.strTinifyImageFilenameCompress = res?.body?.filename;
        this.strTinifyImageBase64Compress = res?.body?.data;

        //处理头部的东西，注意，逗号也必须去除。
        const strSize = this.strTinifyImageBase64Compress
          .replace("data:image/png;base64,", "")
          .replace("=", "");
        //这里计算出来的是字节大小 也即是B
        const size = Math.floor(strSize.length - (strSize.length / 8) * 2);
        this.strTinifyImageSizeCompress =
          `${size}字节` +
          `(${(size / 1000).toFixed(2)}KB)` +
          `(${(size / 1000 / 1000).toFixed(2)}MB)`;
      }
    },
    // 下载压缩后的图片
    handleTinifyImageBase64CompressDownloadClick() {
      console.log("handleTinifyImageBase64CompressDownloadClick");
      downloadFile(
        this.strTinifyImageFilenameCompress,
        this.strTinifyImageBase64Compress
      );
    },
    // 复制压缩后图片base64
    handleTinifyImageBase64CompressCopyClick() {
      console.log("handleTinifyImageBase64CompressCopyClick");
      setClipboardData(this.strTinifyImageBase64Compress);
    },
  },
};
</script>

<style lang="less" scoped>
.detail-tool-tinify-image-item {
  width: 100%;

  .detail-tool-tinify-image-preview {
    width: 100%;
    max-height: 300px;
  }
}

.detail-tool-tinify-image-preview + .el-button {
  margin-left: var(--margin-xs);
}

.detail-tool-tinify-image-base64 + .el-button {
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
