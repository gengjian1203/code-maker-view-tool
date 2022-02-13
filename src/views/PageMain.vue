<template>
  <div class="page-main-wrap">
    <v-t-module title="时间戳相关">
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
    </v-t-module>
    <v-t-module>
      <template #body>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
      </template>
    </v-t-module>
    <v-t-module>
      <template #body>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
        <p>ssss</p>
      </template>
    </v-t-module>
  </div>
</template>

<script>
import VTItem from "@/components/VTItem";
import VTModule from "@/components/VTModule";

export default {
  name: "PageMain",
  components: {
    VTItem,
    VTModule,
  },
  props: {},
  data() {
    return {
      strTimestampValue: "",
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.page-main-wrap {
}
</style>
