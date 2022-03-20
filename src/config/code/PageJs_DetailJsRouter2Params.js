export const content = [
  {
    title: "路由字符串，转换为对象",
    lang: "text/javascript",
    code: `
/**
 * 路由字符串，转换为对象
 * @param {*} strRouter 完整路由+参数字符串
 * @returns 拆分路由+参数
 */
let router2Params = (strRouter) => {
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
}
    `,
  },
  {
    title: "路由字符串转换为对象 使用示例",
    lang: "text/javascript",
    code: `
router2Params('/pages/ArticleDetail/index?type=ZHIHU&articleId=1234567890')
    `,
  },
  {
    title: "构造路由字符串，可尾部追加传参",
    lang: "text/javascript",
    code: `
/**
 * 构造路由字符串，可尾部追加传参
 * @param {string} strPath 原路由字符串
 * @param {any} objParams 参数对象
 * @param {
 *    {string} order 参数覆盖优先级 'append' - 以追加参数优先级高 | 'source' - 以原路由携带参数优先级高
 *    {boolean} encode 参数是否编码 true - 将参数编码 | false - 将参数不编码
 * } objExtend 拓展功能对象
 * @returns 追加参数后的路由字符串
 */
let routerAppendParams = (
  strPath = '',
  objParams = {},
  objExtend = {},
) => {
  const { order = "append", encode = true } = objExtend || {};
  const { path: sourcePath, params: sourceParams } = router2Params(strPath);
  // console.log("routerAppendParams", sourcePath, sourceParams);
  let strResult = sourcePath;
  let mergeParams =
    order === "append"
      ? {
          ...sourceParams,
          ...objParams, // 以追加参数优先级高
        }
      : {
          ...objParams,
          ...sourceParams, // 以原路由携带参数优先级更高
        };

  if (sourcePath && mergeParams && JSON.stringify(mergeParams) !== "{}") {
    let isFirstParam = !sourcePath.includes("?");
    Object.keys(mergeParams).forEach((key) => {
      if (isFirstParam) {
        strResult += \`?\${key}=\${
          encode ? encodeURIComponent(mergeParams[key]) : mergeParams[key]
        }\`;
        isFirstParam = false;
      } else {
        strResult += \`&\${key}=\${
          encode ? encodeURIComponent(mergeParams[key]) : mergeParams[key]
        }\`;
      }
    });
  }
  return strResult;
}
    `,
  },
  {
    title: "对象转换为路由字符串 使用示例",
    lang: "text/javascript",
    code: `
routerAppendParams("/pages/ArticleDetail/index?type=DEFAULT&uuid=a0b1c2", {
  type: "ZHIHU",
  articleId: "1234567890",
}, {
  order: 'source'
});
    `,
  },
];
