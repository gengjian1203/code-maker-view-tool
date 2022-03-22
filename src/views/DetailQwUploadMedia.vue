<template>
  <v-t-wrap-detail :title="info?.title">
    <template #body>
      <!-- 第一步：获取access_token -->
      <v-t-card-module title="第一步：获取access_token" :btnTipList="['fold']">
        <template #body>
          <v-t-item label="corpid" type="custom">
            <template #custom>
              <el-input
                class="detail-qw-upload-media-item"
                type="text"
                v-model="strQwCorpid"
                placeholder="企业微信ID"
                clearable
              />
            </template>
          </v-t-item>

          <v-t-item label="corpsecret" type="custom">
            <template #custom>
              <el-input
                class="detail-qw-upload-media-item"
                type="text"
                v-model="strQwCorpsecret"
                placeholder="企业应用secret"
                clearable
              />
            </template>
          </v-t-item>

          <v-t-item label="" type="custom">
            <template #custom>
              <el-button
                type="primary"
                :loading="isQwQueryAccessTokenBtnLoading"
                @click="handleQwQueryAccessTokenClick"
              >
                获取access_token
              </el-button>
            </template>
          </v-t-item>
        </template>
      </v-t-card-module>

      <!-- 第二步：上传临时素材文件 -->
      <v-t-card-module title="第二步：上传临时素材文件" :btnTipList="['fold']">
        <template #body>
          <v-t-item label="access_token" type="custom">
            <template #custom>
              <el-input
                class="detail-qw-upload-media-item"
                type="text"
                v-model="strQwAccessToken"
                placeholder="调用接口凭证"
                clearable
              />
            </template>
          </v-t-item>

          <v-t-item label="type" type="custom">
            <template #custom>
              <el-select
                class="detail-qw-upload-media-item"
                v-model="strQwUploadType"
              >
                <el-option
                  v-for="item in arrQwUploadTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
          </v-t-item>

          <v-t-item label="media" type="custom">
            <template #custom>
              <el-upload
                class="detail-qw-upload-media-item"
                drag
                action="#"
                :multiple="false"
                :show-file-list="true"
                :http-request="handleQwUploadMediaHttpRequest"
                :file-list="arrQwUploadMediaFileList"
                :on-change="handleQwUploadMediaChange"
                :before-upload="handleQwUploadMediaBeforeUpload"
              >
                <div class="iconfont icon-cloud-upload" />
                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
              </el-upload>
            </template>
          </v-t-item>

          <v-t-item label="" type="custom">
            <template #custom>
              <el-button
                type="primary"
                :loading="isQwUploadMediaBtnLoading"
                @click="handleQwUploadMediaClick"
                >上传临时素材</el-button
              >
            </template>
          </v-t-item>
        </template>
      </v-t-card-module>
    </template>
  </v-t-wrap-detail>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
import Api from "@/api";
import VTCardModule from "@/components/VTCardModule";
import VTItem from "@/components/VTItem";
import VTWrapDetail from "@/components/VTWrapDetail";
import AutoStatusLoading from "@/decorator/AutoStatusLoading";
import StorageManager from "@/services/StorageManager";

export default {
  name: "DetailQwUploadMedia",
  components: {
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
      // 第一步
      strQwCorpid: "", // 企业微信ID
      strQwCorpsecret: "", // 企业应用secret
      isQwQueryAccessTokenBtnLoading: false, // 获取access_token按钮loading状态控制

      // 第二步
      strQwAccessToken: "", // access_token
      strQwUploadType: "image", // 上传媒体文件类型
      arrQwUploadTypeList: [
        { label: "image类型(10MB,支持JPG,PNG格式)", value: "image" },
        {
          label: "voice类型(2MB,播放长度不超过60s,仅支持AMR格式)",
          value: "voice",
        },
        { label: "video类型(10MB,支持MP4格式)", value: "video" },
        { label: "file类型(20MB)", value: "file" },
      ], // 上传媒体文件类型列表
      arrQwUploadMediaFileList: [], // 上传文件列表（只能有一个）
      objQwUploadMediaFile: null,
      isQwUploadMediaBtnLoading: false, // 上传临时素材按钮loading状态控制
    };
  },
  methods: {
    // 点击获取access_token按钮
    @AutoStatusLoading("isQwQueryAccessTokenBtnLoading")
    async handleQwQueryAccessTokenClick() {
      console.log("handleQwQueryAccessTokenClick");
      const params = {};
      const res = await Api.DetailQw.getAccessToken(params);
      console.log("handleQwQueryAccessTokenClick", res);
      if (res?.body?.access_token) {
        this.strQwAccessToken = res?.body?.access_token;
      }
    },
    // 覆盖element的默认上传文件
    handleQwUploadMediaHttpRequest(data) {
      // const reader = new FileReader();
      // reader.readAsText(data.file);
      // reader.onload = (res) => {
      //   console.log("handleQwUploadMediaHttpRequest", res);
      //   this.objQwUploadMediaFile = res?.currentTarget?.result;
      // };
      console.log("handleQwUploadMediaHttpRequest", data.file);
      this.objQwUploadMediaFile = data?.file;
    },
    // 限制文件上传的个数只有一个，获取上传列表的最后一个
    handleQwUploadMediaChange(file, fileList) {
      if (fileList.length > 0) {
        this.arrQwUploadMediaFileList = [fileList[fileList.length - 1]]; // 只取展示最后一次选择的文件
      }
    },
    // 上传文件之前的钩子，校验文件类型。参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    handleQwUploadMediaBeforeUpload(file) {
      // const fileType = file.name.substring(file.name.lastIndexOf("."));
      // if (
      //   fileType.toLowerCase() !== ".txt" &&
      //   fileType.toLowerCase() !== ".xml"
      // ) {
      //   this.$message.error("文件必须为.txt或.xml类型");
      //   this.fileList = [];
      //   return false;
      // }
      return true;
    },

    // 点击上传临时素材按钮
    @AutoStatusLoading("isQwUploadMediaBtnLoading")
    async handleQwUploadMediaClick() {
      console.log(
        "handleQwUploadMediaClick",
        this.strQwAccessToken,
        this.strQwUploadType
      );

      const params = new FormData();
      params.append("corpid", this.strQwCorpid);
      params.append("corpsecret", this.strQwCorpsecret);
      params.append("accessToken", this.strQwAccessToken);
      params.append("type", this.strQwUploadType);
      params.append("media", this.objQwUploadMediaFile);

      // const params = {
      //   corpid: this.strQwCorpid,
      //   corpsecret: this.strQwCorpsecret,
      //   accessToken: this.strQwAccessToken,
      //   type: this.strQwUploadType,
      //   fileMedia: this.objQwUploadMediaFile,
      // };

      const res = await Api.DetailQw.uploadQwMediaTmp(params);
      console.log("uploadQwMediaTmp", res);

      // const formData = new FormData();
      // formData.append("media", this.objQwUploadMediaFile);
      // axios
      //   .post(
      //     `https://qyapi.weixin.qq.com/cgi-bin/media/upload?access_token=${this.strQwAccessToken}&type=${this.strQwUploadType}`,
      //     formData,
      //     { headers: { "Content-Type": "multipart/form-data" } }
      //   )
      //   .then((resAxios) => {
      //     const { data } = resAxios;
      //     console.log("uploadQwMediaTmp res", data);
      //   });
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.detail-qw-upload-media-item {
  width: 100%;
}

::v-deep .el-upload {
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
