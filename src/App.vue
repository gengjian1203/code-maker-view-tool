<template>
  <el-container class="app-wrap">
    <!-- 侧边导航 -->
    <el-scrollbar style="width: auto; height: 100%" wrap-style="width: 100%; height: 100%; box-sizing: border-box;">
      <v-t-menu :arrMenuList="arrMenuList" @onMenuChange="handleMenuChange" />
    </el-scrollbar>
    <!-- 内容 -->
    <el-container class="app-body">
      <el-scrollbar style="width: 100%; height: 100%"
        wrap-style="width: 100%; height: 100%; box-sizing: border-box; padding: var(--padding-base);">
        <el-alert v-if="!isApiActive" style="margin-bottom: 4px" title="后台接口激活中" type="warning" />
        <!-- <router-view v-wechat-title="$route.meta.title" /> -->
        <!-- <div>{{ objSelectInfo?.component }}</div> -->
        <!-- <v-t-advertising /> -->
        <component :is="objSelectInfo?.component" :info="objSelectInfo" />
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script>
import { ElMessage } from "element-plus";
import Api from "@/api";
import VTAdvertising from "@/components/VTAdvertising";
import VTMenu from "@/components/VTMenu";
import { arrMenuListTemp } from "@/config/menuList";
import { navigateTo, navigateBack } from "@/kits";

export default {
  components: {
    VTAdvertising,
    VTMenu,
  },
  data() {
    return {
      isApiActive: false,
      arrMenuList: arrMenuListTemp,
      objSelectInfo: {},
    };
  },
  watch: {
    $route() {
      this.pageName = this.$route.query.pageName;

      if (this.pageName) {
        const findPage = (list) => {
          list.map((item) => {
            if (item.pageName === this.pageName) {
              this.objSelectInfo = item;
            }
            if (item?.list?.length > 0) {
              findPage(item?.list);
            }
          });
        };

        findPage(arrMenuListTemp);
        console.log("Watch pageQuery", this.objSelectInfo);
      } else {
        const pageName = arrMenuListTemp[0]?.pageName || "empty";
        navigateTo(pageName);
      }
    },
  },
  methods: {
    handleMenuChange(info, index) {
      // console.log("handleMenuChange", item, index);
      const { pageName } = info || {};
      navigateTo(pageName);
    },
  },
  async mounted() {
    const con = require("@/services/lib/vconsole.min");
    const vConsole = new con();
    console.log("vConsole", vConsole);

    // 检测接口状态
    while (!this.isApiActive) {
      const res = await Api.Common.getActiveState();
      console.log("getActiveState", res);
      const { body } = res || {};
      if (body) {
        this.isApiActive = true;
        ElMessage({
          showClose: true,
          message: "后台接口已激活",
          type: "success",
        });
      }
    }
  },
};
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app-wrap {
  overflow: hidden;
  width: 100vw;
  height: 100vh;

  .app-aside {
    flex: 1 1 auto;
    max-width: 200px;
    height: 100%;
    background-color: #545c64; // var(--color-primary);
  }

  .app-body {
    flex: 1 1 auto;
    width: 0;
    height: 100%;
  }
}
</style>
