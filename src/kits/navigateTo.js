import routerAppendParams from "./routerAppendParams";

/**
 * 页面跳转
 * @param {*} pageName
 * @param {*} params
 * @returns
 */
export const navigateTo = (pageName = "", params = {}) => {
  const url = routerAppendParams("#/", { pageName, ...params });
  console.debug("navigateTo", pageName, params, url);
  window.location.assign(url);
};

export default navigateTo;
