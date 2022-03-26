<template>
  <v-t-wrap-detail :title="info?.title">
    <template #body>
      <v-t-card-module title="压缩图片相关" :btnTipList="['fold']">
        <template #body>
          <!-- 上传图片 -->
          <v-t-item
            label="上传图片"
            type="upload"
            @onUploadFileChange="handleUploadFileChange"
          />
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
  name: "DetailToolTinifyImage",
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
    return {};
  },
  methods: {
    // 上传图片
    handleUploadFileChange(file, fileList) {
      console.log("DetailToolTinifyImage handleUploadFileChange", file?.raw);
    },
  },
};
</script>

<style lang="less" scoped>
.detail-tool-tinify-image-item {
  width: 100%;
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
