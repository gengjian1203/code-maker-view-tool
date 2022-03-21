/**
 * 自动注入loading状态装饰器
 * @param {*} loading
 * @returns
 */
const AutoStatusLoading = (loading = "") => {
  return function (target, property, descriptor) {
    const oldFn = descriptor.value;
    descriptor.value = async function (...args) {
      try {
        this[loading] = true;
        await oldFn.apply(this, args);
      } catch (error) {
        // 这里的globalError 等就是console.error 只是不会被打包摇树
        console.error(`${name}-----start-----${error}`);
        console.error(error);
        console.error(`${name}-----end-----${error}`);
      } finally {
        this[loading] = false;
      }
    };
  };
};

export default AutoStatusLoading;
