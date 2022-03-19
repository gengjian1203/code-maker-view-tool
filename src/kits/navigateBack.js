/**
 * 页面返回
 * @returns
 */
export const navigateBack = () => {
  console.debug("navigateBack");
  window.history.go(-1);
};

export default navigateBack;
