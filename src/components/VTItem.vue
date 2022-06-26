<template>
  <div class="flex-start-h vt-item-wrap">
    <div v-if="!!label" class="flex-start-h vt-item-label">{{ label }}：</div>
    <!-- 文字类型 -->
    <div v-if="type === 'text'" class="flex-start-h text-select vt-item-text">
      <slot name="text" class="flex-start-h width-fill"></slot>
    </div>
    <!-- 选择器类型 -->
    <div v-if="type === 'select'" class="flex-start-h vt-item-custom">
      <el-select
        ref="refSelect"
        class="width-fill"
        type="text"
        allow-create
        filterable
        default-first-option
        v-model="strSelectValue"
        :placeholder="strSelectPlaceholder"
        clearable
        @change="handleSelectChange"
      >
        <el-option
          v-for="item in arrSelectList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <div class="flex-between-h">
            <div class="text-ellipsis vt-item-select-label">
              {{ item.label }}
            </div>
            <div
              class="iconfont icon-close1 vt-item-select-icon"
              :data-value="item.value"
              @click="handleSelectDeleteClick"
            />
          </div>
        </el-option>
      </el-select>
    </div>
    <!-- 上传文件类型 -->
    <div v-if="type === 'upload'" class="flex-start-h vt-item-custom">
      <v-t-upload-file @onUploadFileChange="handleUploadFileChange" />
    </div>
    <!-- 自定义 -->
    <div v-if="type === 'custom'" class="flex-start-h vt-item-custom">
      <slot name="custom" class="flex-start-h width-fill"></slot>
    </div>
  </div>
</template>

<script>
import VTUploadFile from "@/components/VTUploadFile";
import StorageManager from "@/services/StorageManager";

export default {
  name: "VTItem",
  components: {
    VTUploadFile,
  },
  props: {
    label: { type: String, default: "" },
    type: { type: String, default: "" }, // 'text' - 文字 | 'select' - 选择器 | 'upload' - 选择器 | 'custom' - 自定义
    // text使用
    // select使用
    strSelectStroageName: { type: String, default: "" },
    strSelectValue: { type: String, default: "" }, // 需要配合v-model:使用 // 需要配合.sync使用
    strSelectPlaceholder: { type: String, default: "" },
    arrSelectList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // upload使用
  },
  data() {
    return {};
  },
  methods: {
    //////////////////////////////////////////////////
    // text使用
    //////////////////////////////////////////////////
    // select使用
    handleSelectChange(value) {
      const valueReal = value.trim();
      if (!valueReal) {
        return;
      }
      console.log("handleSelectChange", valueReal);
      this.$emit("update:strSelectValue", valueReal);
      const nIndex = this.arrSelectList.findIndex((item) => {
        return item.value === valueReal;
      });
      if (nIndex < 0) {
        this.arrSelectList.push({
          value: valueReal,
          label: valueReal,
        });
        this.$emit("update:arrSelectList", this.arrSelectList);
      }
      if (this.strSelectStroageName) {
        // 存入缓存
        StorageManager.setLocalStorageSync(
          this.strSelectStroageName,
          this.arrSelectList
        );
      }
    },
    handleSelectDeleteClick(e) {
      // 收起弹窗
      this.$refs.refSelect.visible = false;
      // console.log("handleSelectDeleteClick", e);
      e.preventDefault();
      e.stopPropagation();
      const value = e.currentTarget.getAttribute("data-value");
      console.log("handleSelectDeleteClick", value);
      this.$emit(
        "update:arrSelectList",
        this.arrSelectList.filter((item) => {
          return item.value !== value;
        })
      );
      if (this.strSelectValue === value) {
        this.$emit("update:strSelectValue", "");
      }
      if (this.strSelectStroageName) {
        // 存入缓存
        StorageManager.setLocalStorageSync(
          this.strSelectStroageName,
          this.arrSelectList
        );
      }
    },
    //////////////////////////////////////////////////
    // upload使用
    //////////////////////////////////////////////////
    handleUploadFileChange(file, fileList) {
      // console.log("VTItem handleUploadFileChange", file, fileList);
      this.$emit("onUploadFileChange", file, fileList);
    },
  },
  mounted() {
    if (this.strSelectStroageName) {
      // 读取缓存
      this.$emit(
        "update:arrSelectList",
        StorageManager.getLocalStorageSync(this.strSelectStroageName) || []
      );
    }
  },
};
</script>

<style lang="less" scoped>
.vt-item-wrap {
  margin-top: var(--margin-xs);
  height: auto;
  min-height: 52px;
  line-height: 52px;
  align-items: flex-start;

  .vt-item-label {
    flex: 0 0 auto;
    margin-right: var(--margin-base);
    font-weight: 500;
    font-size: var(--font-size-sm);
    align-items: flex-start;
  }

  .vt-item-text {
    flex: 1 1 auto;
    width: 0;
    color: var(--color-text-primary);
    font-size: var(--font-size-xs);
    align-items: center;
    white-space: pre-wrap;
  }

  .vt-item-custom {
    flex: 1 1 auto;
    width: 0;
    min-height: 52px;
    line-height: 52px;
    align-items: center;
  }
}
</style>
