<template>
  <v-t-wrap-detail :title="info?.title">
    <template #body>
      <!-- 查询单一位置 -->
      <v-t-card-module title="企微机器人" :btnTipList="['fold']">
        <template #body>
          <v-t-item label="Webhook地址" type="custom">
            <template #custom>
              <el-select
                ref="selectWebhook"
                class="detail-qw-robot-item"
                type="text"
                allow-create
                filterable
                default-first-option
                v-model="strQwRobotWebhook"
                placeholder="https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
                clearable
                @change="handleQwRobotWebhookChange"
              >
                <el-option
                  v-for="item in arrQwRobotWebhookList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <div class="flex-between-h">
                    <div class="text-ellipsis detail-webhook-label">
                      {{ item.label }}
                    </div>
                    <div
                      class="iconfont icon-close1 detail-webhook-icon"
                      :data-value="item.value"
                      @click="handleWebhookDelete"
                    />
                  </div>
                </el-option>
              </el-select>
            </template>
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

          <!-- 图片类型 -->

          <!-- 图文类型 -->

          <!-- 文件类型 -->

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
import Api from "@/api";
import VTCardModule from "@/components/VTCardModule";
import VTItem from "@/components/VTItem";
import VTWrapDetail from "@/components/VTWrapDetail";
import AutoStatusLoading from "@/decorator/AutoStatusLoading";
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
        { label: "文本类型", value: "text" },
        { label: "图片类型", value: "image" },
        { label: "图文类型", value: "news" },
        { label: "文件类型", value: "file" },
        { label: "模版卡片类型", value: "template_card" },
      ], // msgtype列表
      // 文本类型
      strTextContent: "",
      // 图片类型
      // 图文类型
      // 文件类型
      // 模版卡片类型
      isQwRobotSendBtnLoading: false,
    };
  },
  methods: {
    // 选中webhook
    async handleQwRobotWebhookChange(value) {
      const valueReal = value.trim();
      if (!valueReal) {
        return;
      }
      console.log("handleQwRobotWebhookChange", valueReal);
      const nIndex = this.arrQwRobotWebhookList.findIndex((item) => {
        return item.value === valueReal;
      });
      if (nIndex < 0) {
        this.arrQwRobotWebhookList.push({
          value: valueReal,
          label: valueReal,
        });
      }
      // 存入缓存
      StorageManager.setLocalStorageSync(
        "arrQwRobotWebhookList",
        this.arrQwRobotWebhookList
      );
    },
    // 删除webhook
    async handleWebhookDelete(e) {
      // 收起弹窗
      this.$refs.selectWebhook.visible = false;
      // console.log("handleWebhookDelete", e);
      e.preventDefault();
      e.stopPropagation();
      const value = e.currentTarget.getAttribute("data-value");
      console.log("handleWebhookDelete", value);
      this.arrQwRobotWebhookList = this.arrQwRobotWebhookList.filter((item) => {
        return item.value !== value;
      });
      if (this.strQwRobotWebhook === value) {
        this.strQwRobotWebhook = "";
      }
      // 存入缓存
      StorageManager.setLocalStorageSync(
        "arrQwRobotWebhookList",
        this.arrQwRobotWebhookList
      );
    },
    // 点击发送消息按钮
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
        case "image": {
          break;
        }
        case "news": {
          break;
        }
        case "file": {
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
  mounted() {
    // 读取缓存
    this.arrQwRobotWebhookList =
      StorageManager.getLocalStorageSync("arrQwRobotWebhookList") || [];
  },
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
</style>
