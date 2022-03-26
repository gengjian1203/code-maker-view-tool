<template>
  <el-upload
    class="vt-upload-file-wrap"
    drag
    action="#"
    list-type="picture"
    :multiple="false"
    :show-file-list="true"
    :file-list="arrUploadFileList"
    :http-request="handleUploadFileHttpRequest"
    :on-change="handleUploadFileChange"
    :on-remove="handleUploadFileRemove"
    :before-upload="handleUploadFileBeforeUpload"
  >
    <div class="iconfont icon-cloud-upload" />
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  </el-upload>
</template>

<script>
export default {
  name: "VTUploadFile",
  components: {},
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
      arrUploadFileList: [],
    };
  },
  watch: {},
  methods: {
    handleUploadFileHttpRequest(data) {
      // console.log("handleUploadFileHttpRequest");
    },
    handleUploadFileChange(file, fileList) {
      // console.log("handleUploadFileChange");
      if (fileList.length > 0) {
        this.arrUploadFileList = [fileList[fileList.length - 1]]; // 只取展示最后一次选择的文件
      }
      this.$emit("onUploadFileChange", file, fileList);
    },
    handleUploadFileRemove(file, fileList) {
      // console.log("handleUploadFileRemove");
      this.arrUploadFileList = [];
      this.$emit("onUploadFileChange", null, []);
    },
    handleUploadFileBeforeUpload(file) {
      // console.log("handleUploadFileBeforeUpload");
      // const fileType = file.name.substring(file.name.lastIndexOf("."));
      // if (
      //   fileType.toLowerCase() !== ".txt" &&
      //   fileType.toLowerCase() !== ".xml"
      // ) {
      //   this.$message.error("文件必须为.txt或.xml类型");
      //   this.fileList = [];
      //   return false;
      // }
      return true;
    },
  },
};
</script>

<style lang="less" scoped>
.vt-upload-file-wrap {
  width: 100%;
}
</style>
