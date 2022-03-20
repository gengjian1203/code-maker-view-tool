import { createApp } from "vue";
import VueWechatTitle from "vue-wechat-title";
import { GlobalCmComponent } from "codemirror-editor-vue3";
import ElementPlus from "element-plus";
import * as ElIconModules from "@element-plus/icons-vue";

import App from "./App.vue";
import router from "./router";

import "element-plus/theme-chalk/index.css";
import "./style/app.less";
import "./style/iconfont.less";
import "./style/ui.less";

const app = createApp(App);

app
  .use(router)
  .use(VueWechatTitle)
  .use(GlobalCmComponent)
  .use(ElementPlus, { size: "default", zIndex: 3000 })
  .mount("#app");

//  统一注册el-icon图标
for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = ElIconModules[iconName];
    app.component(iconName, item);
  }
}

// 不稳定暂不使用
// // 统一注册全局组件
// const requireComponents = require.context(
//   "./components/", // 想要全局注册的组件父文件夹
//   false, // 遍历文件夹（如果你的组件是被一个个文件夹包裹的话）
//   /\w+\.vue$/ // 匹配vue后缀的文件
// );
// requireComponents.keys().forEach((fileName) => {
//   const componentConfig = requireComponents(fileName); // 获取组件
//   app.component(
//     componentConfig.default.name,
//     componentConfig.default || componentConfig
//   ); // 全局注册组件（componentConfig.default.name：组件的名称，componentConfig.default：组件本身）
// });

// // 统一注册页面组件
const requirePages = require.context(
  "./views/", // 想要全局注册的组件父文件夹
  false, // 遍历文件夹（如果你的组件是被一个个文件夹包裹的话）
  /\w+\.vue$/ // 匹配vue后缀的文件
);
requirePages.keys().forEach((fileName) => {
  const componentConfig = requirePages(fileName); // 获取组件
  // console.log("requirePages", componentConfig);
  app.component(
    componentConfig.default.name,
    componentConfig.default || componentConfig
  ); // 全局注册组件（componentConfig.default.name：组件的名称，componentConfig.default：组件本身）
});
