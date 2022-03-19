import routerAppendParams from "./routerAppendParams";

/**
 * 页面跳转
 * @param {*} pageName
 * @param {*} params
 * @returns
 */
export const navigateTo = (pageName = "", params = {}) => {
  console.debug("navigateTo", pageName, params);
  window.location.assign(routerAppendParams("#/", { pageName, ...params }));
};

export default navigateTo;
