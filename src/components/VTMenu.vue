<template>
  <el-menu
    class="menu-wrap text-noselect"
    active-text-color="var(--color-primary)"
    background-color="#545c64"
    text-color="#fff"
    :collapse="isCollapse"
    :default-active="strActiveMenuIndex"
    @select="handleMenuItemSelect"
  >
    <template v-for="(item, index) in arrMenuList" :key="index">
      <el-menu-item class="menu-item" :index="`${index}`">
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
      strActiveMenuIndex: "",
      screenWidth: document.body.clientWidth,
    };
  },
  watch: {
    strActiveMenuIndex(newValue, oldValue) {
      console.log("strActiveMenuIndex", newValue, oldValue);
      const item = this.arrMenuList[Number(newValue)] || {};
      console.log("strActiveMenuIndex", item);
      this.$emit("onMenuChange", item);
    },
  },
  computed: {
    isCollapse() {
      // console.log("screenWidth", this.screenWidth);
      return this.screenWidth < 500;
    },
  },
  methods: {
    handleMenuItemSelect(index) {
      this.strActiveMenuIndex = index;
    },
    handleWindowResize() {
      // console.log("resize", document.body.clientWidth);
      this.screenWidth = document.body.clientWidth;
    },
  },
  created() {
    this.strActiveMenuIndex = "0";
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
