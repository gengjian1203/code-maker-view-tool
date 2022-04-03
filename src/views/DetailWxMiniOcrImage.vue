<template>
  <v-t-wrap-detail :title="info?.title">
    <template #body>
      <!-- 第一步：获取access_token -->
      <v-t-card-module title="第一步：获取access_token" :btnTipList="['fold']">
        <template #body>
          <v-t-item
            label="appid"
            type="select"
            strSelectStroageName="arrOcrImageAppidList"
            v-model:strSelectValue="strOcrImageAppid"
            strSelectPlaceholder="小程序ID"
            v-model:arrSelectList="arrOcrImageAppidList"
          />

          <v-t-item
            label="secret"
            type="select"
            strSelectStroageName="arrOcrImageSecretList"
            v-model:strSelectValue="strOcrImageSecret"
            strSelectPlaceholder="小程序秘钥secret"
            v-model:arrSelectList="arrOcrImageSecretList"
          />

          <v-t-item label="" type="custom">
            <template #custom>
              <el-button
                type="primary"
                :loading="isOcrImageQueryAccessTokenBtnLoading"
                @click="handleOcrImageQueryAccessTokenClick"
              >
                获取access_token
              </el-button>
            </template>
          </v-t-item>
        </template>
      </v-t-card-module>

      <!-- 第二步：上传识别图片 -->
      <v-t-card-module title="第二步：上传识别图片" :btnTipList="['fold']">
        <template #body>
          <v-t-item label="access_token" type="custom">
            <template #custom>
              <el-input
                class="detail-tool-ocr-image-item"
                type="text"
                v-model="strOcrImageAccessToken"
                placeholder="调用接口凭证"
                clearable
              />
            </template>
          </v-t-item>

          <!-- 上传图片 -->
          <v-t-item
            label="上传图片"
            type="upload"
            @onUploadFileChange="handleOcrImageChange"
          />

          <v-t-item label="图片大小" type="text">
            <template #text>
              {{ strOcrImageSizeSource }}
            </template>
          </v-t-item>

          <v-t-item label="图片base64编码" type="custom">
            <template #custom>
              <div class="flex-between-h detail-tool-ocr-image-item">
                <el-input
                  class="detail-tool-ocr-image-base64"
                  type="textarea"
                  v-model="strOcrImageBase64Source"
                  placeholder="图片内容的base64编码"
                />
                <el-button
                  type="primary"
                  @click="handleOcrImageBase64SourceCopyClick"
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
                :loading="isOcrImageDealBtnLoading"
                @click="handleOcrImageDealBtnClick"
                >识别图片</el-button
              >
            </template>
          </v-t-item>
        </template>
      </v-t-card-module>

      <!-- 第三步：识别结果 -->
      <v-t-card-module title="第三步：识别结果" :btnTipList="['fold']">
        <template #body>
          <v-t-item label="识别结果" type="text">
            <template #text>
              {{ strOcrImageSizeDeal }}
            </template>
          </v-t-item>
        </template>
      </v-t-card-module>
    </template>
  </v-t-wrap-detail>
</template>

<script>
import Api from "@/api";
import { ElMessage } from "element-plus";
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
  name: "DetailWxMiniOcrImage",
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
      // 第一步：获取access_token
      strOcrImageAppid: "",
      arrOcrImageAppidList: [],
      strOcrImageSecret: "",
      arrOcrImageSecretList: [],
      isOcrImageQueryAccessTokenBtnLoading: false, // 获取access_token按钮loading状态控制
      // 第二步：
      strOcrImageAccessToken: "",
      strOcrImageSizeSource: "",
      strOcrImageBase64Source: "",
      objOcrImageSource: null,
      isOcrImageDealBtnLoading: false,
      // 压缩后
      strOcrImageSizeDeal: "",
      strOcrImageBase64Deal: "",
    };
  },
  methods: {
    // 点击获取access_token按钮
    // @VerifyParams(["strOcrImageAppid", "strOcrImageSecret"])
    @AutoStatusLoading("isOcrImageQueryAccessTokenBtnLoading")
    async handleOcrImageQueryAccessTokenClick() {
      // console.log("handleOcrImageQueryAccessTokenClick");
      const params = {
        appid: this.strOcrImageAppid,
        secret: this.strOcrImageSecret,
      };
      const res = await Api.DetailWxMini.getAccessTokenMini(params);
      console.log("handleOcrImageQueryAccessTokenClick", res);
      if (res?.body?.access_token) {
        this.strOcrImageAccessToken = res?.body?.access_token;
      }
    },
    // 上传图片
    async handleOcrImageChange(file, fileList) {
      console.log("DetailWxMiniOcrImage handleUploadImageChange", file?.raw);
      const image = file?.raw;
      if (image) {
        const size = image?.size; // image?.size - (image?.size / 8) * 2;
        this.strOcrImageSizeSource =
          `${size}字节` +
          `(${(size / 1000).toFixed(2)}KB)` +
          `(${(size / 1000 / 1000).toFixed(2)}MB)`;
        this.strOcrImageBase64Source = await file2Base64(image);
        this.objOcrImageSource = image;
      } else {
        this.strOcrImageSizeSource = "";
        this.strOcrImageBase64Source = "";
        this.objOcrImageSource = null;
      }
    },
    // 复制原图图片base64
    handleOcrImageBase64SourceCopyClick() {
      console.log("handleOcrImageBase64SourceCopyClick");
      setClipboardData(this.strOcrImageBase64Source);
    },
    // 点击识别图片
    @AutoStatusLoading("isOcrImageDealBtnLoading")
    async handleOcrImageDealBtnClick() {
      console.log("handleOcrImageDealBtnClick");

      const params = new FormData();
      params.append("appid", this.strOcrImageAppid);
      params.append("secret", this.strOcrImageSecret);
      params.append("accessToken", this.strOcrImageAccessToken);
      params.append("image", this.objOcrImageSource);

      const res = await Api.DetailWxMini.ocrImageCommon(params);
      console.log("handleOcrImageDealBtnClick", res);
      if (res?.body?.errcode === 0) {
      } else if (res?.body?.message) {
        ElMessage.error(res?.body?.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.detail-tool-ocr-image-item {
  width: 100%;

  .detail-tool-ocr-image-preview {
    width: 100%;
    max-height: 300px;
  }
}

.detail-tool-ocr-image-preview + .el-button {
  margin-left: var(--margin-xs);
}

.detail-tool-ocr-image-base64 + .el-button {
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
