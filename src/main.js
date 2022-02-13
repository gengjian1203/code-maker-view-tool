import { createApp } from "vue";
import VueWechatTitle from "vue-wechat-title";
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
  .use(ElementPlus, { size: "small", zIndex: 3000 })
  .mount("#app");

// console.log("ElIconModules", ElIconModules);

//  统一注册el-icon图标
for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = ElIconModules[iconName];
    app.component(iconName, item);
  }
}
