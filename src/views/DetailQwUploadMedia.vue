<template>
  <v-t-wrap-detail :title="info?.title">
    <template #body>
      <!-- 第一步：获取access_token -->
      <v-t-card-module title="第一步：获取access_token" :btnTipList="['fold']">
        <template #body>
          <v-t-item
            label="corpid"
            type="select"
            strSelectStroageName="arrQwCorpidList"
            v-model:strSelectValue="strQwCorpid"
            strSelectPlaceholder="企业微信ID"
            v-model:arrSelectList="arrQwCorpidList"
          />

          <v-t-item
            label="corpsecret"
            type="select"
            strSelectStroageName="arrQwCorpsecretList"
            v-model:strSelectValue="strQwCorpsecret"
            strSelectPlaceholder="企业应用secret"
            v-model:arrSelectList="arrQwCorpsecretList"
          />

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

          <v-t-item
            label="media"
            type="upload"
            @onUploadFileChange="handleQwUploadMediaChange"
          />

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

          <v-t-item v-if="strResMediaId" label="media_id" type="custom">
            <template #custom>
              <div class="flex-between-h detail-qw-upload-media-item">
                <div class="text-ellipsis detail-qw-upload-media-mediaid">
                  {{ strResMediaId }}
                </div>
                <el-button type="primary" @click="handleQwMediaIdCopyClick"
                  >复制</el-button
                >
              </div>
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
import VerifyParams from "@/decorator/VerifyParams";
import { setClipboardData } from "@/kits";
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
      arrQwCorpidList: [], // 企业微信ID记忆列表
      strQwCorpsecret: "", // 企业应用secret
      arrQwCorpsecretList: [], // 企业应用secret记忆列表
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
      objQwUploadMediaFile: null,
      isQwUploadMediaBtnLoading: false, // 上传临时素材按钮loading状态控制

      // 结果展示
      strResMediaId: "",
      strResType: "",
    };
  },
  methods: {
    // 点击获取access_token按钮
    // @VerifyParams(["strQwCorpid", "strQwCorpsecret"])
    @AutoStatusLoading("isQwQueryAccessTokenBtnLoading")
    async handleQwQueryAccessTokenClick() {
      // console.log("handleQwQueryAccessTokenClick");
      const params = {
        corpid: this.strQwCorpid,
        corpsecret: this.strQwCorpsecret,
      };
      const res = await Api.DetailQw.getAccessToken(params);
      console.log("handleQwQueryAccessTokenClick", res);
      if (res?.body?.access_token) {
        this.strQwAccessToken = res?.body?.access_token;
      }
    },
    // 限制文件上传的个数只有一个，获取上传列表的最后一个
    handleQwUploadMediaChange(file, fileList) {
      this.objQwUploadMediaFile = file?.raw;
    },
    // 点击上传临时素材按钮
    @VerifyParams(["objQwUploadMediaFile"])
    @AutoStatusLoading("isQwUploadMediaBtnLoading")
    async handleQwUploadMediaClick() {
      const params = new FormData();
      params.append("corpid", this.strQwCorpid);
      params.append("corpsecret", this.strQwCorpsecret);
      params.append("accessToken", this.strQwAccessToken);
      params.append("type", this.strQwUploadType);
      params.append("media", this.objQwUploadMediaFile);

      const res = await Api.DetailQw.uploadQwMediaTmp(params);
      console.log("uploadQwMediaTmp", res);
      if (res?.body?.errcode === 0) {
        const { media_id, type } = res?.body || {};
        console.log("uploadQwMediaTmp", media_id, type);
        ElMessage.success("上传成功");
        this.strResMediaId = media_id;
        this.strResType = type;
      } else {
        ElMessage.error(`${res?.body?.errmsg}`);
      }

      // 直接请求企微api接口（会跨域）
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
    // 点击mediaid复制按钮
    handleQwMediaIdCopyClick() {
      setClipboardData(this.strResMediaId);
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.detail-qw-upload-media-item {
  width: 100%;

  .detail-qw-upload-media-mediaid {
    flex: 1 1 auto;
    width: 0;
  }
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
