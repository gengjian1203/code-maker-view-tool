<template>
  <v-t-wrap-detail :title="info?.title">
    <template #body>
      <v-t-card-module title="测试VTItem的select" :btnTipList="['fold']">
        <template #body>
          <v-t-item
            label="type"
            type="select"
            :strSelectStroageName="strSelectStroageName"
            v-model:strSelectValue="strSelectValueTest"
            :strSelectPlaceholder="strSelectPlaceholder"
            v-model:arrSelectList="arrSelectListTest"
          />

          <v-t-item label="" type="custom">
            <template #custom>
              <el-button type="primary" @click="handleSelectTextClick"
                >测试按钮</el-button
              >
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
  name: "DetailEmpty",
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
      strSelectStroageName: "test",
      strSelectValueTest: "", // 需要配合.sync使用
      strSelectPlaceholder: "",
      arrSelectListTest: [],
    };
  },
  methods: {
    handleSelectTextClick() {
      console.log("handleSelectTextClick", this.strSelectStroageName);
      console.log("handleSelectTextClick", this.strSelectValueTest);
      console.log("handleSelectTextClick", this.strSelectPlaceholder);
      console.log("handleSelectTextClick", this.arrSelectListTest);
    },
  },
};
</script>

<style lang="less" scoped>
.detail-empty-wrap {
}
</style>
