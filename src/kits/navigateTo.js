import routerAppendParams from "./routerAppendParams";

/**
 * 页面跳转
 * @param {*} pageName
 * @param {*} params
 * @returns
 */
export const navigateTo = (pageName = "", params = {}) => {
  // console.log("navigateTo", window.location.href);
  const url = routerAppendParams(window.location.href, { pageName, ...params });
  console.debug("navigateTo", pageName, params, url);
  window.location.assign(url);
};

export default navigateTo;
