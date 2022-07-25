import GlobalManager from "@/services/GlobalManager";
import FetchManager from "@/services/FetchManager";

/**
 * 测试请求
 * @returns
 */
const testDelay = async (params = {}) => {
  const { duration = 1000, ...paramsOther } = params || {};
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(paramsOther);
    }, duration);
  });
};

/**
 * 获取云托管的接口状态
 */
export const getActiveState = async (params) => {
  // console.log("getActiveState", params);
  const res = await FetchManager.execAxiosGET(
    `${GlobalManager.baseUrlWeiXinCloudrun}/api/get/getActiveState`,
    params
  );
  await testDelay({ duration: 2500 });
  return res?.data || {};
};

export default {
  testDelay,
  getActiveState,
};
