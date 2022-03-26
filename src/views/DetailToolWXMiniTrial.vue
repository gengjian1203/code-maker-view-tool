<template>
  <v-t-wrap-detail :title="info?.title">
    <template #body>
      <v-t-card-module title="拼接微信小程序体验版链接" :btnTipList="['fold']">
        <template #body>
          <v-t-item
            label="小程序appid"
            type="select"
            strSelectStroageName="arrTrialAppidList"
            v-model:strSelectValue="strTrialAppid"
            strSelectPlaceholder="小程序appid(以wx开头)"
            v-model:arrSelectList="arrTrialAppidList"
          />

          <v-t-item
            label="小程序path"
            type="select"
            strSelectStroageName="arrTrialPathList"
            v-model:strSelectValue="strTrialPath"
            strSelectPlaceholder="小程序path(不以/开头，以.html结尾)"
            v-model:arrSelectList="arrTrialPathList"
          />

          <v-t-item label="参数数量" type="custom">
            <template #custom>
              <div class="flex-start-h detail-tool-trial-item">
                <el-button type="primary" @click="handleTrialParamsAddClick">
                  <span class="iconfont icon-add-select" />
                </el-button>
                <el-button
                  type="primary"
                  :disabled="arrTrialParams.length <= 0"
                  @click="handleTrialParamsSamiClick"
                >
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
                    <el-input
                      class="detail-tool-trial-item-block"
                      type="text"
                      v-model="item.key"
                      placeholder="key"
                      clearable
                    />
                    <el-input
                      class="detail-tool-trial-item-block"
                      type="text"
                      v-model="item.value"
                      placeholder="value"
                      clearable
                    />
                    <el-button
                      class="detail-tool-trial-item-btn"
                      type="primary"
                      @click="handleTrialParamsItemSamiClick(index)"
                    >
                      <span class="iconfont icon-sami-select" />
                    </el-button>
                  </div>
                </template>
              </v-t-item>
            </template>
          </template>

          <v-t-item label="" type="custom">
            <template #custom>
              <el-button
                type="primary"
                :loading="isTrialCreateLinkBtnLoading"
                @click="handleTrialCreateLinkBtnClick"
                >生成</el-button
              >
            </template>
          </v-t-item>

          <v-t-item v-if="strTrialLink" label="体验版链接" type="custom">
            <template #custom>
              <div class="flex-between-h detail-tool-trial-item">
                <div class="text-wrap text-break detail-tool-trial-link">
                  {{ strTrialLink }}
                </div>
                <el-button type="primary" @click="handleTrialLinkCopyBtnClick"
                  >复制</el-button
                >
              </div>
            </template>
          </v-t-item>
        </template>
      </v-t-card-module>

      <v-t-card-module title="历史记录" :btnTipList="['fold']">
        <template #body>
          <template
            v-for="(item, index) in arrTrialHistoryLinkList"
            :key="index"
          >
            <v-t-item :label="item.time" type="custom">
              <template #custom>
                <div class="flex-between-h detail-tool-trial-item">
                  <div class="text-wrap text-break detail-tool-trial-link">
                    {{ item.link }}
                  </div>
                  <el-button
                    type="primary"
                    @click="handleTrialHistoryLinkCopyBtnClick(index)"
                    >复制</el-button
                  >
                  <el-button
                    type="primary"
                    @click="handleTrialHistoryLinkDeleteBtnClick(index)"
                    >删除</el-button
                  >
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
import VTCardModule from "@/components/VTCardModule";
import VTItem from "@/components/VTItem";
import VTWrapDetail from "@/components/VTWrapDetail";
import AutoStatusLoading from "@/decorator/AutoStatusLoading";
import {
  endsWith,
  getStringDate,
  routerAppendParams,
  setClipboardData,
  startsWith,
} from "@/kits";
import StorageManager from "@/services/StorageManager";

export default {
  name: "DetailToolWXMiniTrial",
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
      strTrialAppid: "",
      arrTrialAppidList: [],
      strTrialPath: "",
      arrTrialPathList: [],
      arrTrialParams: [],
      isTrialCreateLinkBtnLoading: false,
      strTrialLink: "",
      // 历史记录
      arrTrialHistoryLinkList: [],
    };
  },
  methods: {
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
        trialPath + encodeURIComponent(routerAppendParams("", params));

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
    // 点击复制链接
    handleTrialLinkCopyBtnClick() {
      setClipboardData(this.strTrialLink);
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

.detail-tool-trial-item-block + .detail-tool-trial-item-block {
  margin-left: var(--margin-xs);
}

.detail-tool-trial-item-block + .detail-tool-trial-item-btn {
  flex: 0 0 auto;
  margin-left: var(--margin-xs);
}

.detail-tool-trial-link + .el-button {
  margin-left: var(--margin-xs);
}
</style>
