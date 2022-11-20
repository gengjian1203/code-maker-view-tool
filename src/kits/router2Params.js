/**
 * 路由字符串，转换为对象
 * @param {*} strRouter 完整路由+参数字符串
 * @returns 拆分路由+参数
 */

// 将字符串转换为对象核心方法
const router2ParamsCore = (strRouter) => {
  const strRouterTmp = strRouter || "";
  let strResultPath = strRouterTmp;
  const objResultParam = {};

  const nIndexPath = strRouterTmp.indexOf("?");
  if (nIndexPath >= 0) {
    strResultPath = strRouterTmp.substring(0, nIndexPath);
    const strParam = strRouterTmp.slice(nIndexPath + 1);
    const arrParam = strParam.split("&");

    arrParam.forEach((strItem) => {
      const nIndexParam = strItem.indexOf("=");
      if (nIndexParam >= 0) {
        const strParamKey = strItem.substring(0, nIndexParam);
        const strParamValue = strItem.slice(nIndexParam + 1);
        objResultParam[strParamKey] = strParamValue;
      }
    });
  }

  return {
    path: strResultPath,
    params: objResultParam,
  };
};

// 主方法，兼容#之前带参数的场景
export const router2Params = (strRouter) => {
  let path = "";
  let params = {};
  const resList = strRouter.split("#").map((item) => {
    const res = router2ParamsCore(item);
    path = path || res.path;
    params = {
      ...params,
      ...res.params,
    };
    return res;
  });

  return {
    path: path + `${resList.length > 0 ? "#" : ""}`,
    params: params,
    resList: resList,
  };
};

export default router2Params;
