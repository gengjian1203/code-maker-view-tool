<template>
  <v-t-wrap-detail :title="title">
    <template #body>
      <v-t-card-module title="时间戳相关" :btnTipList="['code']">
        <template #body>
          <v-t-item label="时间戳" type="custom">
            <template #body>
              <div class="flex-start-h">
                <el-input
                  type="text"
                  v-model="strTimestampValue"
                  placeholder="1638108325790"
                  clearable
                />
              </div>
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

export default {
  name: "DetailTime",
  components: {
    VTItem,
    VTCardModule,
    VTWrapDetail,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.detail-time-wrap {
}
</style>
