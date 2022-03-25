<template>
  <v-t-wrap-detail :title="info?.title">
    <template #body>
      <!-- 查询单一位置 -->
      <v-t-card-module title="企微机器人" :btnTipList="['fold']">
        <template #body>
          <v-t-item
            label="Webhook地址"
            type="select"
            strSelectStroageName="arrQwRobotWebhookList"
            v-model:strSelectValue="strQwRobotWebhook"
            strSelectPlaceholder="https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
            v-model:arrSelectList="arrQwRobotWebhookList"
          >
            <template #select />
          </v-t-item>

          <v-t-item label="消息类型" type="custom">
            <template #custom>
              <el-select
                class="detail-qw-robot-item"
                v-model="strQwRobotMsgtype"
              >
                <el-option
                  v-for="item in arrQwRobotMsgtypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
          </v-t-item>

          <!-- 文本类型 -->
          <v-t-item
            v-if="strQwRobotMsgtype === 'text'"
            label="文本内容"
            type="custom"
          >
            <template #custom>
              <el-input
                class="detail-qw-robot-item"
                type="text"
                v-model="strTextContent"
                placeholder="文本内容，最长不超过2048个字节，必须是utf8编码"
                clearable
              />
            </template>
          </v-t-item>

          <!-- markdown类型 -->
          <v-t-item
            v-if="strQwRobotMsgtype === 'markdown'"
            label="markdown内容"
            type="custom"
          >
            <template #custom>
              <el-input
                class="detail-qw-robot-item"
                type="textarea"
                v-model="strMarkdownContent"
                placeholder="markdown内容，最长不超过4096个字节，必须是utf8编码"
                clearable
              />
            </template>
          </v-t-item>

          <!-- 图片类型 -->
          <v-t-item
            v-if="strQwRobotMsgtype === 'image'"
            label="图片"
            type="custom"
          >
            <template #custom>
              <el-upload
                class="detail-qw-robot-item"
                drag
                action="#"
                list-type="picture"
                :multiple="false"
                :show-file-list="true"
                :file-list="arrImageFileList"
                :http-request="handleImageHttpRequest"
                :on-change="handleImageChange"
                :on-remove="handleImageRemove"
                :before-upload="handleImageBeforeUpload"
              >
                <div class="iconfont icon-cloud-upload" />
                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
              </el-upload>
            </template>
          </v-t-item>

          <v-t-item
            v-if="strQwRobotMsgtype === 'image' && arrImageFileList?.length > 0"
            label="base64编码"
            type="custom"
          >
            <template #custom>
              <el-input
                class="detail-qw-robot-item"
                type="textarea"
                v-model="strImageBase64"
                placeholder="图片内容的base64编码(注意不能携带图片头部data:image/png;base64)"
              />
            </template>
          </v-t-item>

          <v-t-item
            v-if="strQwRobotMsgtype === 'image' && arrImageFileList?.length > 0"
            label="md5值"
            type="custom"
          >
            <template #custom>
              <el-input
                class="detail-qw-robot-item"
                type="text"
                v-model="strImageMD5"
                placeholder="图片内容（base64编码前）的md5值"
                clearable
              />
            </template>
          </v-t-item>

          <!-- 图文类型 -->
          <v-t-item
            v-if="strQwRobotMsgtype === 'news'"
            label="图文数量"
            type="custom"
          >
            <template #custom>
              <div class="flex-start-h detail-qw-robot-item">
                <el-button
                  type="primary"
                  :disabled="arrNewsArticles.length >= 8"
                  @click="handleNewsArticlesAddClick"
                >
                  <span class="iconfont icon-add-select" />
                </el-button>
                <el-button
                  type="primary"
                  :disabled="arrNewsArticles.length <= 1"
                  @click="handleNewsArticlesSamiClick"
                >
                  <span class="iconfont icon-sami-select" />
                </el-button>
              </div>
            </template>
          </v-t-item>

          <template v-if="strQwRobotMsgtype === 'news'">
            <template v-for="(item, index) in arrNewsArticles" :key="index">
              <v-t-item :label="`图文标题【${index + 1}】`" type="custom">
                <template #custom>
                  <el-input
                    class="detail-qw-robot-item"
                    type="text"
                    v-model="item.title"
                    placeholder="标题，不超过128个字节，超过会自动截断"
                    clearable
                  />
                </template>
              </v-t-item>
              <v-t-item :label="`图文描述【${index + 1}】`" type="custom">
                <template #custom>
                  <el-input
                    class="detail-qw-robot-item"
                    type="text"
                    v-model="item.description"
                    placeholder="描述，不超过512个字节，超过会自动截断"
                    clearable
                  />
                </template>
              </v-t-item>
              <v-t-item :label="`图文链接【${index + 1}】`" type="custom">
                <template #custom>
                  <el-input
                    class="detail-qw-robot-item"
                    type="text"
                    v-model="item.url"
                    placeholder="点击后跳转的链接"
                    clearable
                  />
                </template>
              </v-t-item>
              <v-t-item :label="`图文图片【${index + 1}】`" type="custom">
                <template #custom>
                  <el-input
                    class="detail-qw-robot-item"
                    type="text"
                    v-model="item.picurl"
                    placeholder="图文消息的图片链接，支持JPG、PNG格式，较好的效果为大图 1068*455，小图150*150"
                    clearable
                  />
                </template>
              </v-t-item>
            </template>
          </template>

          <!-- 文件类型 -->
          <v-t-item
            v-if="strQwRobotMsgtype === 'file'"
            label="文件"
            type="custom"
          >
            <template #custom>
              <el-upload
                class="detail-qw-robot-item"
                drag
                action="#"
                list-type="picture"
                :multiple="false"
                :show-file-list="true"
                :file-list="arrFileFileList"
                :http-request="handleFileHttpRequest"
                :on-change="handleFileChange"
                :on-remove="handleFileRemove"
                :before-upload="handleFileBeforeUpload"
              >
                <div class="iconfont icon-cloud-upload" />
                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
              </el-upload>
            </template>
          </v-t-item>

          <v-t-item
            v-if="strQwRobotMsgtype === 'file'"
            label="文件id"
            type="custom"
          >
            <template #custom>
              <el-input
                class="detail-qw-robot-item"
                type="text"
                v-model="strFileMediaId"
                placeholder="文件id，通过上传接口获取"
                clearable
              />
            </template>
          </v-t-item>

          <!-- 模版卡片类型 -->

          <v-t-item label="" type="custom">
            <template #custom>
              <el-button
                type="primary"
                :loading="isQwRobotSendBtnLoading"
                @click="handleQwRobotSendBtnClick"
                >发送</el-button
              >
            </template>
          </v-t-item>
        </template>
      </v-t-card-module>
    </template>
  </v-t-wrap-detail>
</template>

<script>
import { ElMessage } from "element-plus";
import md5 from "js-md5";
import Api from "@/api";
import VTCardModule from "@/components/VTCardModule";
import VTItem from "@/components/VTItem";
import VTWrapDetail from "@/components/VTWrapDetail";
import AutoStatusLoading from "@/decorator/AutoStatusLoading";
import VerifyParams from "@/decorator/VerifyParams";
import { file2Base64, file2Buffer, router2Params } from "@/kits";
import StorageManager from "@/services/StorageManager";

export default {
  name: "DetailQwRobot",
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
      strQwRobotWebhook: "", // webhook值
      arrQwRobotWebhookList: [], // webhook列表
      strQwRobotMsgtype: "text", // msgtype值
      arrQwRobotMsgtypeList: [
        { label: "文本类型(最长不超过2048个字节)", value: "text" },
        { label: "markdown类型(最长不超过4096个字节)", value: "markdown" },
        { label: "图片类型(最大不能超过2M,支持JPG,PNG格式)", value: "image" },
        { label: "图文类型(支持1到8条图文)", value: "news" },
        { label: "文件类型(文件大小在5B~20M之间)", value: "file" },
        { label: "模版卡片类型（参数太多暂不支持）", value: "template_card" },
      ], // msgtype列表
      // 文本类型
      strTextContent: "",
      // markdown类型
      strMarkdownContent: "",
      // 图片类型
      strImageBase64: "",
      strImageMD5: "",
      arrImageFileList: [],
      // 图文类型
      arrNewsArticles: [
        {
          title: "",
          description: "",
          url: "",
          picurl: "",
        },
      ],
      // 文件类型
      arrFileFileList: [],
      strFileMediaId: "",
      // 模版卡片类型

      // 发送消息
      isQwRobotSendBtnLoading: false,
    };
  },
  watch: {
    strQwRobotMsgtype: {
      handler(newValue) {
        this.resetValue();
      },
      immediate: true, // 为true，代表在声明这个方法之后，立即先去执行handler方法
      // deep: true, // 为true，表示深度监听，这时候就能监测到a值变化
    },
  },
  methods: {
    // 初始化
    resetValue() {
      console.log("resetValue");
      // 文本类型
      this.strTextContent = "";
      // markdown类型
      this.strMarkdownContent = "";
      // 图片类型
      this.strImageBase64 = "";
      this.strImageMD5 = "";
      this.arrImageFileList = [];
      // 图文类型
      this.arrNewsArticles = [
        {
          title: "",
          description: "",
          url: "",
          picurl: "",
        },
      ];
      // 文件类型
      this.arrFileFileList = [];
      this.strFileMediaId = "";
      // 模版卡片类型
    },
    // 图片类型：覆盖element的默认上传文件
    async handleImageHttpRequest(data) {
      const image = data.file; // 获取文件域中选中的图片
      const base64 = await file2Base64(image);
      this.strImageBase64 = base64.split(";base64,")[1];
      const buffer = await file2Buffer(image);
      this.strImageMD5 = md5(buffer);
      // console.log(image);
      // console.log("handleImageHttpRequest base64", base64);
      // console.log("handleImageHttpRequest buffer", buffer);
    },
    // 图片类型：限制文件上传的个数只有一个，获取上传列表的最后一个
    handleImageChange(file, fileList) {
      if (fileList.length > 0) {
        this.arrImageFileList = [fileList[fileList.length - 1]]; // 只取展示最后一次选择的文件
      }
    },
    // 图片类型：移除文件列表
    handleImageRemove(file, fileList) {
      // console.log("handleQwUploadMediaRemove", file, fileList);
      this.arrImageFileList = [];
    },
    // 图片类型：
    handleImageBeforeUpload() {
      return true;
    },
    // 文件类型：覆盖element的默认上传文件
    async handleFileHttpRequest(data) {
      this.strFileMediaId = "";
      const objFileMediaFile = data?.file;
      console.log("handleFileHttpRequest");
      const params = new FormData();
      const { params: p } = router2Params(this.strQwRobotWebhook);
      const { key = "" } = p || {};
      params.append("key", key);
      params.append("type", this.strQwRobotMsgtype);
      params.append("media", objFileMediaFile);

      const res = await Api.DetailQw.uploadQwRobotMedia(params);
      console.log("handleFileHttpRequest", res);
      if (res?.body?.errcode === 0) {
        const { media_id, type } = res?.body || {};
        console.log("handleFileHttpRequest", media_id, type);
        ElMessage.success("上传成功");
        this.strFileMediaId = media_id;
      } else {
        ElMessage.error(`${res?.body?.errmsg}`);
      }
    },
    // 文件类型：限制文件上传的个数只有一个，获取上传列表的最后一个
    handleFileChange(file, fileList) {
      if (fileList.length > 0) {
        this.arrFileFileList = [fileList[fileList.length - 1]]; // 只取展示最后一次选择的文件
      }
    },
    // 文件类型：移除文件列表
    handleFileRemove(file, fileList) {
      // console.log("handleQwUploadMediaRemove", file, fileList);
      this.arrFileFileList = [];
    },
    // 文件类型：
    handleFileBeforeUpload() {
      return true;
    },
    // 图文类型：增加图文项
    handleNewsArticlesAddClick() {
      console.log("handleNewsArticlesAddClick");
      this.arrNewsArticles.push({
        title: "",
        description: "",
        url: "",
        picurl: "",
      });
    },
    // 图文类型：减少图文项
    handleNewsArticlesSamiClick() {
      console.log("handleNewsArticlesSamiClick");
      this.arrNewsArticles.pop();
    },
    // 点击发送消息按钮
    @VerifyParams(["strQwRobotWebhook"])
    @AutoStatusLoading("isQwRobotSendBtnLoading")
    async handleQwRobotSendBtnClick() {
      // console.log("handleQwRobotSendBtnClick");
      const params = {
        webhook: this.strQwRobotWebhook,
      };

      switch (this.strQwRobotMsgtype) {
        case "text": {
          params.data = JSON.stringify({
            msgtype: this.strQwRobotMsgtype, // msgtype,
            text: {
              content: this.strTextContent,
            },
          });
          break;
        }
        case "markdown": {
          params.data = JSON.stringify({
            msgtype: this.strQwRobotMsgtype, // msgtype,
            markdown: {
              content: this.strMarkdownContent,
            },
          });
          break;
        }
        case "image": {
          params.data = JSON.stringify({
            msgtype: this.strQwRobotMsgtype, // msgtype,
            image: {
              base64: this.strImageBase64,
              md5: this.strImageMD5,
            },
          });
          break;
        }
        case "news": {
          params.data = JSON.stringify({
            msgtype: this.strQwRobotMsgtype, // msgtype,
            news: {
              articles: this.arrNewsArticles.map((item) => {
                return item;
              }),
            },
          });
          break;
        }
        case "file": {
          params.data = JSON.stringify({
            msgtype: this.strQwRobotMsgtype, // msgtype,
            file: {
              media_id: this.strFileMediaId,
            },
          });
          break;
        }
        case "template_card": {
          break;
        }
        default: {
          break;
        }
      }

      const res = await Api.DetailQw.sendRobotMsg(params);
      console.log("handleQwRobotSendBtnClick", res);
      if (res?.body?.errcode === 0) {
        ElMessage.success("发送成功");
      } else {
        ElMessage.error("发送失败");
      }
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.el-select-dropdown__item {
  padding: 0 var(--padding-xs);
}

.detail-qw-robot-item {
  width: 100%;
}

.detail-webhook-label {
  flex: 1 1 auto;
  width: 0;
}

.detail-webhook-icon {
  box-sizing: border-box;
  padding-left: var(--padding-xs);
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
