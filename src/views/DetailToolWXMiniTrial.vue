<template>
  <v-t-wrap-detail :title="info?.title">
    <template #body>
      <v-t-card-module title="拼接微信小程序体验版链接" :btnTipList="['fold']">
        <template #body>
          <v-t-item label="小程序appid" type="select" strSelectStroageName="arrTrialAppidList"
            v-model:strSelectValue="strTrialAppid" strSelectPlaceholder="小程序appid(以wx开头)"
            v-model:arrSelectList="arrTrialAppidList" />

          <v-t-item label="小程序path" type="select" strSelectStroageName="arrTrialPathList"
            v-model:strSelectValue="strTrialPath" strSelectPlaceholder="小程序path(不以/开头，以.html结尾)"
            v-model:arrSelectList="arrTrialPathList" />

          <v-t-item label="参数数量" type="custom">
            <template #custom>
              <div class="flex-start-h detail-tool-trial-item">
                <el-button type="primary" @click="handleTrialParamsAddClick">
                  <span class="iconfont icon-add-select" />
                </el-button>
                <el-button type="primary" :disabled="arrTrialParams.length <= 0" @click="handleTrialParamsSamiClick">
                  <span class="iconfont icon-sami-select" />
                </el-button>
              </div>
            </template>
          </v-t-item>

          <template v-if="true">
            <template v-for="(item, index) in arrTrialParams" :key="index">
              <v-t-item :label="`参数【${index + 1}】`" type="custom">
                <template #custom>
                  <div class="flex-around-h detail-tool-trial-item">
                    <el-input class="detail-tool-trial-item-block" type="text" v-model="item.key" placeholder="key"
                      clearable />
                    <el-input class="detail-tool-trial-item-block" type="text" v-model="item.value" placeholder="value"
                      clearable />
                    <el-button class="detail-tool-trial-item-btn" type="primary"
                      @click="handleTrialParamsItemSamiClick(index)">
                      <span class="iconfont icon-sami-select" />
                    </el-button>
                  </div>
                </template>
              </v-t-item>
            </template>
          </template>

          <v-t-item label="" type="custom">
            <template #custom>
              <el-button type="primary" :loading="isTrialCreateLinkBtnLoading" @click="handleTrialCreateLinkBtnClick">
                生成
              </el-button>
            </template>
          </v-t-item>

          <v-t-item v-if="strTrialLink" label="体验版链接" type="custom">
            <template #custom>
              <div class="flex-between-h detail-tool-trial-item">
                <div class="text-wrap text-break detail-tool-trial-link">
                  {{ strTrialLink }}
                </div>
                <el-button type="primary" @click="handleTrialLinkCopyBtnClick">复制</el-button>
              </div>
            </template>
          </v-t-item>
        </template>
      </v-t-card-module>

      <v-t-card-module v-show="isShowCanvas" title="生成结果" :btnTipList="['fold']">
        <template #body>
          <v-t-item label="二维码预览" type="custom">
            <template #custom>
              <div class="flex-between-h detail-tool-trial-item">
                <v-t-canvas-draw canvasId="qrCodeLogo" :canvasWidth="CANVAS_SIZE" :canvasHeight="CANVAS_SIZE"
                  canvasBGColor="#ffffff" canvasQuality="0.92" canvasScale="1" :canvasConfig="qrCodeCanvasConfig"
                  @onCanvasDrawComplete="handleCanvasDrawComplete" />
                <el-button v-show="!!strQRCodeFinishBase64" type="primary"
                  @click="handleQRCodeFinishBase64DownloadClick">
                  下载
                </el-button>
              </div>
            </template>
          </v-t-item>

          <v-t-item label="二维码 base64编码" type="custom">
            <template #custom>
              <div class="flex-between-h detail-tool-trial-item">
                <el-input class="detail-tool-trial-item-content" type="textarea" v-model="strQRCodeFinishBase64"
                  placeholder="二维码内容的base64编码" />
                <el-button type="primary" @click="handleQRCodeFinishCopyClick">
                  复制
                </el-button>
              </div>
            </template>
          </v-t-item>
        </template>
      </v-t-card-module>

      <v-t-card-module title="历史记录" :btnTipList="['fold']">
        <template #body>
          <el-empty v-if="arrTrialHistoryLinkList.length === 0" description="暂无数据" />
          <template v-for="(item, index) in arrTrialHistoryLinkList" :key="index">
            <v-t-item :label="item.time" type="custom">
              <template #custom>
                <div class="flex-between-h detail-tool-trial-item">
                  <div class="text-wrap text-break detail-tool-trial-link" @click="handleTrialHistoryLinkClick(index)">
                    {{ item.link }}
                  </div>
                  <el-button type="primary" @click="handleTrialHistoryLinkCopyBtnClick(index)">复制</el-button>
                  <el-button type="primary" @click="handleTrialHistoryLinkDeleteBtnClick(index)">删除</el-button>
                </div>
              </template>
            </v-t-item>
          </template>
        </template>
      </v-t-card-module>
    </template>
  </v-t-wrap-detail>
</template>

<script>
import tcQrcode from "tc-qrcode";
import VTCanvasDraw from "@/components/VTCanvasDraw";
import VTCardModule from "@/components/VTCardModule";
import VTItem from "@/components/VTItem";
import VTWrapDetail from "@/components/VTWrapDetail";
import AutoStatusLoading from "@/decorator/AutoStatusLoading";
import {
  endsWith,
  downloadFile,
  file2Base64,
  getStringDate,
  routerAppendParams,
  setClipboardData,
  startsWith,
} from "@/kits";
import StorageManager from "@/services/StorageManager";

export default {
  name: "DetailToolWXMiniTrial",
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
      strTrialAppid: "",
      arrTrialAppidList: [],
      strTrialPath: "",
      arrTrialPathList: [],
      arrTrialParams: [],
      isTrialCreateLinkBtnLoading: false,
      strTrialLink: "",
      // 绘制用常量
      QRCODE_SIZE: 236,
      QRCODE_PADDING: 32,
      QRCODE_BORDER_RADIUS: 10,
      LOGO_SIZE: 72,
      CANVAS_SIZE: 300,
      //
      isShowCanvas: false, // 是否生成二维码
      qrCodeCanvasConfig: [], // 绘制二维码元素
      strQRCodeFinishBase64: "",
      // 历史记录
      arrTrialHistoryLinkList: [],
    };
  },
  watch: {
    strTrialLink: {
      handler(newValue) {
        this.genDetailToolQRCodeEncodeBtnClick(newValue)
      },
      immediate: false, // 为true，代表在声明这个方法之后，立即先去执行handler方法
      // deep: true, // 为true，表示深度监听，这时候就能监测到a值变化
    },
  },
  methods: {
    // 生成二维码
    genDetailToolQRCodeEncodeBtnClick(value) {
      const base64 = tcQrcode.encodeAsBase64({
        text: value,
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

      this.isShowCanvas = true;
      this.qrCodeCanvasConfig = qrCodeCanvasConfigTmp;
    },
    // 增加参数
    handleTrialParamsAddClick() {
      console.log("handleTrialParamsAddClick");
      this.arrTrialParams.push({
        key: "",
        value: "",
      });
    },
    // 减少参数
    handleTrialParamsSamiClick() {
      console.log("handleTrialParamsSamiClick");
      this.arrTrialParams.pop();
    },
    // 减少指定项的参数
    handleTrialParamsItemSamiClick(i) {
      this.arrTrialParams = this.arrTrialParams.filter((item, index) => {
        return index !== i;
      });
    },
    // 点击生成体验版链接
    @AutoStatusLoading("isQwRobotSendBtnLoading")
    async handleTrialCreateLinkBtnClick() {
      let trialPath = this.strTrialPath; // 如果path字段：开头带/则去掉，如果结尾未带.html则添加
      if (startsWith(trialPath, "/")) {
        trialPath = trialPath.slice(1);
      }
      if (!endsWith(trialPath, ".html")) {
        trialPath = `${trialPath}.html`;
      }

      const params = {};
      this.arrTrialParams.forEach((item, index) => {
        if (item.key && item.value) {
          params[item.key] = item.value;
        }
      });
      const path =
        trialPath + encodeURIComponent(routerAppendParams("", params).replace(/#/, ''));

      // console.log(
      //   "handleTrialCreateLinkBtnClick",
      //   this.strTrialAppid,
      //   this.strTrialPath,
      //   params,
      //   path
      // );
      // 体验版链接示例
      // https://open.weixin.qq.com/sns/getexpappinfo?appid=wx534b0be83d03a625&path=packages/taro-yum-common/start/index.html%3FactivityCode%3DGB1640082899762%26productType%3D1%26linkId%3D500023935%26userId%3DWangLei%26storeId%3DPS1729%26channelId%3Dqywx%26pageName%3DgrouponShareEntry
      this.strTrialLink =
        `https://open.weixin.qq.com/sns/getexpappinfo` +
        `?appid=${this.strTrialAppid}` +
        `&path=${path}`;

      this.arrTrialHistoryLinkList.unshift({
        time: getStringDate().timeString,
        link: this.strTrialLink,
      });
      StorageManager.setLocalStorageSync(
        "arrTrialHistoryLinkList",
        this.arrTrialHistoryLinkList
      );
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
    // 点击复制链接
    handleTrialLinkCopyBtnClick() {
      setClipboardData(this.strTrialLink);
    },
    // 点击历史记录的链接 
    handleTrialHistoryLinkClick(i) {
      this.strTrialLink = this.arrTrialHistoryLinkList[i]?.link
    },
    // 点击历史记录复制链接
    handleTrialHistoryLinkCopyBtnClick(i) {
      setClipboardData(this.arrTrialHistoryLinkList[i]?.link);
    },
    // 点击历史记录删除链接
    handleTrialHistoryLinkDeleteBtnClick(i) {
      this.arrTrialHistoryLinkList = this.arrTrialHistoryLinkList.filter(
        (item, index) => {
          return index !== i;
        }
      );
      StorageManager.setLocalStorageSync(
        "arrTrialHistoryLinkList",
        this.arrTrialHistoryLinkList
      );
    },
  },
  mounted() {
    this.arrTrialHistoryLinkList =
      StorageManager.getLocalStorageSync("arrTrialHistoryLinkList") || [];
  },
};
</script>

<style lang="less" scoped>
.detail-tool-trial-item {
  width: 100%;

  .detail-tool-trial-item-block {
    flex: 1 1 auto;
    width: 0;
  }
}

.detail-tool-trial-item-content {
  width: 100%;
}

.detail-tool-trial-item-content+.el-button {
  margin-left: var(--margin-xs);
}

.detail-tool-trial-item-block+.detail-tool-trial-item-block {
  margin-left: var(--margin-xs);
}

.detail-tool-trial-item-block+.detail-tool-trial-item-btn {
  flex: 0 0 auto;
  margin-left: var(--margin-xs);
}

.detail-tool-trial-link+.el-button {
  margin-left: var(--margin-xs);
}
</style>
