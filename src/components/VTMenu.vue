<template>
  <el-menu
    class="menu-wrap text-noselect"
    active-text-color="var(--color-primary)"
    background-color="#545c64"
    text-color="#fff"
    :collapse="isCollapse"
    :default-active="activeMenu"
    @select="handleMenuItemSelect"
  >
    <template v-for="(item, index) in arrMenuList" :key="index">
      <el-menu-item class="menu-item" :index="`${item.pageName}`">
        <div :class="{ ...item.icon, iconfont: true, 'menu-icon': true }" />
        <template #title>
          <span>{{ item.name }}</span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: "VTMenu",
  components: {},
  props: {
    arrMenuList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      screenWidth: document.body.clientWidth,
      activeMenu: "",
    };
  },
  watch: {
    $route() {
      this.pageName = this.$route.query.pageName || "";
      this.activeMenu = this.pageName.split("_")[0];
    },
  },
  computed: {
    isCollapse() {
      // console.log("screenWidth", this.screenWidth);
      return this.screenWidth < 600;
    },
  },
  methods: {
    handleMenuItemSelect(pageName) {
      // console.log("handleMenuItemSelect", pageName);
      let index = this.arrMenuList.findIndex((item) => {
        return item.pageName === pageName;
      });
      index = index >= 0 ? index : 0;

      const info = this.arrMenuList[index] || {};
      this.$emit("onMenuChange", info, index);
    },
    handleWindowResize() {
      // console.log("resize", document.body.clientWidth);
      this.screenWidth = document.body.clientWidth;
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleWindowResize);
  },
  unmounted() {
    window.removeEventListener("resize", this.handleWindowResize);
  },
};
</script>

<style lang="less" scoped>
.menu-wrap {
  min-height: 100vh;
  .menu-item {
    box-sizing: border-box;
    padding: 0 var(--padding-md);
    .menu-icon {
      margin-right: var(--margin-mini);
    }
  }
}
</style>
