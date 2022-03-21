<template>
  <v-t-wrap-detail :title="info?.title">
    <template #body>
      <!-- 查询单一位置 -->
      <v-t-card-module title="企微机器人" :btnTipList="['fold']">
        <template #body>
          <v-t-item label="Webhook地址" type="custom">
            <template #custom>
              <div class="flex-start-h width-fill">
                <el-input
                  class="detail-qw-robot-webhook"
                  type="text"
                  v-model="strQwRobotWebhook"
                  placeholder="https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
                  clearable
                />
              </div>
            </template>
          </v-t-item>

          <v-t-item label="消息类型" type="custom">
            <template #custom> </template>
          </v-t-item>

          <el-button
            type="primary"
            :loading="isQwRobotSendBtnLoading"
            @click="handleQwRobotSendBtnClick"
            >发送</el-button
          >
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
      strQwRobotWebhook: "",
      isQwRobotSendBtnLoading: false,
    };
  },
  methods: {
    // 点击发送消息按钮
    @AutoStatusLoading("isQwRobotSendBtnLoading")
    async handleQwRobotSendBtnClick() {
      // console.log("handleQwRobotSendBtnClick");
      const params = {
        webhook: this.strQwRobotWebhook,
        data: JSON.stringify({
          msgtype: "text", // msgtype,
          text: {
            content: "2222222222222",
          },
        }),
      };
      const res = await Api.DetailQwRobot.sendRobotMsg(params);
      console.log("handleQwRobotSendBtnClick", res);
      if (res?.body?.errcode === 0) {
        ElMessage.success("发送成功");
      } else {
        ElMessage.error("发送失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.detail-qw-robot-webhook {
  width: 100%;
}
</style>
