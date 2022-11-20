<template>
  <v-t-wrap-detail :title="info?.title">
    <template #body>
      <!-- 时间戳相关 -->
      <v-t-card-module title="时间戳转日期时间" :btnTipList="['fold']">
        <template #body>
          <v-t-item label="时间戳" type="custom">
            <template #custom>
              <div class="flex-start-h detail-tool-time-item">
                <el-input type="text" v-model="strTimestampValue" placeholder="1638108325790" clearable />
                <el-button v-if="strTimestampValue" type="primary" @click="handleTransformTimestampClick">转换当前时间
                </el-button>
                <el-button v-else type="primary" @click="handleGetTimestampClick">获取当前时间</el-button>
              </div>
            </template>
          </v-t-item>
          <v-t-item label="日期时间" type="text">
            <template #text>
              {{ strDate }}
            </template>
          </v-t-item>
          <v-t-item label="日期简写" type="text">
            <template #text>
              {{ strDateSimple }}
            </template>
          </v-t-item>
        </template>
      </v-t-card-module>

      <v-t-card-module title="日期时间转时间戳" :btnTipList="['fold']">
        <template #body>
          <v-t-item label="日期时间" type="custom">
            <template #custom>
              <div class="flex-start-h detail-tool-time-item">
                <el-date-picker v-model="strTimestampValue2" type="datetime" placeholder="请选择日期"
                  format="YYYY-MM-DD hh:mm:ss" value-format="x" />
              </div>
            </template>
          </v-t-item>
          <v-t-item label="时间戳" type="text">
            <template #text>
              {{ strTimestampValue2 }}
            </template>
          </v-t-item>
        </template>
      </v-t-card-module>
    </template>
  </v-t-wrap-detail>
</template>

<script>
import VTCardModule from "@/components/VTCardModule";
import VTItem from "@/components/VTItem";
import VTWrapDetail from "@/components/VTWrapDetail";
import { getStringDate } from "@/kits/index";

export default {
  name: "DetailToolTime",
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
      // 时间戳转日期时间
      strTimestampValue: "",
      strDate: "",
      strDateSimple: "",

      // 日期时间转时间戳
      strTimestampValue2: "",
    };
  },
  methods: {
    // 点击转换当前时间戳
    handleTransformTimestampClick() {
      console.log("handleTransformTimestampClick");
      const date = new Date(parseInt(this.strTimestampValue));
      this.strDate = date.toString();
      this.strDateSimple = getStringDate(date).timeString;
    },
    // 点击获取当前时间戳
    handleGetTimestampClick() {
      console.log("handleGetTimestampClick");
      const date = new Date();
      this.strTimestampValue = date.getTime();
      this.strDate = date.toString();
      this.strDateSimple = getStringDate(date).timeString;
    },
  },
};
</script>

<style lang="less" scoped>
.detail-tool-time-item {
  width: 100%;
}
</style>
