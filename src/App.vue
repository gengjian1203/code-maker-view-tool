<template>
  <el-container class="app-wrap">
    <!-- 侧边导航 -->
    <el-scrollbar
      style="width: auto; height: 100%"
      wrap-style="width: 100%; height: 100%; box-sizing: border-box;"
    >
      <v-t-menu :arrMenuList="arrMenuList" @onMenuChange="handleMenuChange" />
    </el-scrollbar>
    <!-- 内容 -->
    <el-container class="app-body">
      <el-scrollbar
        style="width: 100%; height: 100%"
        wrap-style="width: 100%; height: 100%; box-sizing: border-box; padding: var(--padding-xs);"
      >
        <!-- <router-view v-wechat-title="$route.meta.title" /> -->
        <container :strPageType="strActiveMenuPageType" />
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script>
import VTMenu from "@/components/VTMenu";
import { arrMenuListTemp } from "@/config/menuList";
import Container from "@/views/Container";

export default {
  components: {
    VTMenu,
    Container,
  },
  data() {
    return {
      strActiveMenuPageType: "",
      arrMenuList: arrMenuListTemp,
    };
  },
  methods: {
    handleMenuChange(item) {
      console.log("handleMenuChange", item);
      this.strActiveMenuPageType = item.type;
    },
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
