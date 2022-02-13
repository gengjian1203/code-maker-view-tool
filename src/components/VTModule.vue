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
        <el-tooltip effect="dark" content="复制代码" placement="top">
          <el-button type="primary">
            <span class="iconfont icon-experiment" />
          </el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="展示代码" placement="top">
          <el-button type="primary">
            <span class="iconfont icon-experiment" />
          </el-button>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          :content="isFold ? '收起' : '展开'"
          placement="top"
        >
          <el-button type="primary" @click="handleFoldClick">
            <el-icon size="16px">
              <span v-if="isFold" class="iconfont icon-experiment" />
              <span v-else class="iconfont icon-bulb" />
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
  name: "VTModule",
  components: {},
  props: {
    title: { type: String, default: "" },
  },
  data() {
    return {
      isFold: true,
    };
  },
  methods: {
    handleFoldClick() {
      console.log("handleFoldClick");
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
    flex: 0 0 24px;
    height: 24px;

    .vt-module-header-left {
      .vt-module-header-title {
        box-sizing: border-box;
        padding-left: 12px;
        position: relative;
        color: #313131;
        font-weight: 600;
      }
      .vt-module-header-title::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 6px;
        height: 20px;
        border-radius: 0 6px 6px 0;
        background-color: #6cacf8;
      }
    }

    .vt-module-header-right {
    }
  }

  .vt-module-body {
    margin-top: var(--margin-base);
    flex: 1 1 auto;
  }
}
</style>
