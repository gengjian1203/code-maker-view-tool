/**
 * 全局数据管理器
 */
class GlobalManager {
  static instance = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = new GlobalManager();
      const isProd = true;
      // 微信云托管的地址
      this.instance.baseUrlWeiXinCloudrun = isProd
        ? "https://code-maker-view-tool-service-1329250-1259256375.ap-shanghai.run.tcloudbase.com" // "https://code-maker-view-tool-1679438-1259256375.ap-shanghai.run.tcloudbase.com"
        : "http://localhost:80";
    }
    return this.instance;
  }
}

export default GlobalManager.getInstance();
