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
        globalError(`${name}-----start-----${error}`);
        globalLog(error);
        globalError(`${name}-----end-----${error}`);
        errorCb.call(this, error, this);
      } finally {
        this[loading] = false;
      }
    };
  };
};

export default AutoStatusLoading;
