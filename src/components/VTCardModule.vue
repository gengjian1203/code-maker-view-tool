<template>
  <el-card shadow="hover" class="flex-start-v text-noselect vt-module-wrap">
    <!-- 头部 -->
    <div class="flex-between-h vt-module-header">
      <div class="flex-start-h vt-module-header-left">
        <span class="text-ellipsis text-nowrap vt-module-header-title">
          {{ title }}
        </span>
      </div>
      <el-button-group
        class="flex-start-h vt-module-header-right"
        type="primary"
        size="small"
      >
        <el-tooltip
          v-if="isShowBtnTipCopy"
          effect="dark"
          content="复制代码"
          placement="top"
        >
          <el-button type="primary" @click="handleCopyClick">
            <span class="iconfont icon-copy" />
          </el-button>
        </el-tooltip>

        <el-tooltip
          v-if="isShowBtnTipSwitch"
          effect="dark"
          :content="arrTipSwitchList[nTipSwitchIndex]?.name"
          placement="top"
        >
          <el-button type="primary" @click="handleSwitchClick">
            <span
              :class="`iconfont ${arrTipSwitchList[nTipSwitchIndex]?.icon}`"
            />
          </el-button>
        </el-tooltip>

        <el-tooltip
          v-if="isShowBtnTipFold"
          effect="dark"
          :content="isFold ? '展开' : '收起'"
          placement="top"
        >
          <el-button type="primary" @click="handleFoldClick">
            <el-icon size="16px">
              <span v-if="isFold" class="iconfont icon-folder-open" />
              <span v-else class="iconfont icon-folder" />
            </el-icon>
          </el-button>
        </el-tooltip>
      </el-button-group>
    </div>

    <!-- 身体 -->
    <div v-if="isFold" class="vt-module-body">
      <slot name="body"></slot>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "VTCardModule",
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
    btnTipList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    nTipSwitchIndex: {
      type: Number,
      default: 0,
    },
    arrTipSwitchList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      isFold: true,
      isShowBtnTipCopy: false,
      isShowBtnTipSwitch: false,
      isShowBtnTipFold: false,
    };
  },
  watch: {
    btnTipList: {
      handler(newValue) {
        // console.log("watch btnTipList", newValue, oldValue);
        this.isShowBtnTipCopy = newValue.includes("copy");
        this.isShowBtnTipSwitch = newValue.includes("switch");
        this.isShowBtnTipFold = newValue.includes("fold");
      },
      immediate: true, // 为true，代表在声明这个方法之后，立即先去执行handler方法
      // deep: true, // 为true，表示深度监听，这时候就能监测到a值变化
    },
  },
  methods: {
    // 点击拷贝按钮
    handleCopyClick() {
      // console.log("handleCopyClick");
      this.$emit("onCardModuleCopyClick");
    },
    // 点击切换按钮
    handleSwitchClick() {
      // this.$emit("onCardModuleCopyClick");
      // this.nTipSwitchIndex
      // this.arrTipSwitchList
      const nTipSwitchIndexTmp =
        (this.nTipSwitchIndex + 1) % this.arrTipSwitchList.length;
      console.log("handleSwitchClick", nTipSwitchIndexTmp);
      this.$emit("update:nTipSwitchIndex", nTipSwitchIndexTmp);
    },
    // 点击展开收起按钮
    handleFoldClick() {
      // console.log("handleFoldClick");
      this.isFold = !this.isFold;
    },
  },
};
</script>

<style lang="less" scoped>
.vt-module-wrap {
  --el-card-padding: 12px;

  box-sizing: border-box;
  padding: 0;
  margin-bottom: var(--margin-xs);

  .vt-module-header {
    margin-bottom: var(--margin-base);
    flex: 0 0 24px;
    height: 32px;
    line-height: 32px;

    .vt-module-header-left {
      flex: 1 1 auto;
      width: 0;

      .vt-module-header-title {
        box-sizing: border-box;
        padding-left: 12px;
        position: relative;
        color: #313131;
        font-weight: 600;
        font-size: var(--font-size-sm);
      }
      .vt-module-header-title::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 8px;
        height: 32px;
        border-radius: 0 6px 6px 0;
        background-color: #6cacf8;
      }
    }

    .vt-module-header-right {
      flex: 0 0 auto;
    }
  }

  .vt-module-body {
    margin-top: var(--margin-base);
    flex: 1 1 auto;
  }
}
</style>
